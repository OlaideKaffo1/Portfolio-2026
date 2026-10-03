// Ask Olaide: takes a visitor's question, answers it from the knowledge files with Claude, and streams
// the answer back as JSON text (the shape in lib/ask/prompt.ts) for the chat card to draw as it arrives.
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { after } from "next/server";
import { z } from "zod";
import { check, log, visitorId, type Usage } from "@/lib/ask/guard";
import { Answer, systemPrompt } from "@/lib/ask/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const Body = z.object({
  question: z.string().trim().min(1).max(500),
  // Earlier turns: the question and the answer JSON exactly as it was streamed
  history: z.array(z.object({ q: z.string().max(500), a: z.string().max(6000) })).max(12).default([]),
  conversation: z.string().max(64).default(""),
  page: z.string().max(200).default(""),
});

// Only the most recent turns are sent, to keep each request small
const HISTORY_TURNS = 4;

const client = new Anthropic({ baseURL: process.env.ANTHROPIC_API_URL ?? "https://api.anthropic.com" });

const reply = (status: number, message: string) => Response.json({ message }, { status });

export async function POST(req: Request) {
  // Only pages on this site may call the chat: the listed addresses, or whichever address served this
  // request (so the chat also works on the Vercel address that earlier links point to)
  const origin = req.headers.get("origin");
  const allowed = (process.env.ASK_ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (origin && allowed.length && !allowed.includes(origin) && origin !== new URL(req.url).origin) return reply(403, "Not allowed.");

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return reply(400, "That question couldn't be read. Please try again.");
  const { question, history, conversation, page } = parsed.data;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  const visitor = visitorId(ip);
  const verdict = await check(visitor).catch((e) => {
    console.error(e);
    return { ok: true } as const;
  });
  if (!verdict.ok) {
    return verdict.reason === "cap"
      ? reply(503, "I'm taking a short break from answering here. You can reach me at olaidearikekaffo@gmail.com, or on LinkedIn.")
      : reply(429, "You've asked a lot of questions in a short time. Give it a few minutes, or email me at olaidearikekaffo@gmail.com.");
  }

  const messages: Anthropic.MessageParam[] = [
    ...history.slice(-HISTORY_TURNS).flatMap((t) => [
      { role: "user" as const, content: t.q },
      { role: "assistant" as const, content: t.a },
    ]),
    { role: "user", content: page ? `[The visitor is reading: ${page}]\n\n${question}` : question },
  ];

  const t0 = Date.now();
  const stream = client.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    output_config: { effort: "low", format: zodOutputFormat(Answer) },
    system: [{ type: "text", text: systemPrompt(), cache_control: { type: "ephemeral" } }],
    messages,
  });

  const encoder = new TextEncoder();
  let text = "";
  let usage: Usage | undefined;
  let status: "ok" | "error" = "ok";

  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            text += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        usage = final.usage;
        if (final.stop_reason !== "end_turn") status = "error";
      } catch (e) {
        console.error(e);
        status = "error";
        // A marker the card recognises, after whatever arrived so far
        controller.enqueue(encoder.encode("\n\u0000error"));
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  after(async () => {
    let answer: unknown = text;
    try {
      answer = Answer.parse(JSON.parse(text));
    } catch {
      status = "error";
    }
    await log({ visitor, conversation, page, question, answer, status, ms: Date.now() - t0, usage }).catch((e) => console.error(e));
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
