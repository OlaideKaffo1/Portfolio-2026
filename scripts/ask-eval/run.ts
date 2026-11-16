// Runs the Ask Olaide test questions through Claude exactly as the live chat does (same model, settings,
// system prompt and knowledge files) and saves the answers, so a change can be compared before and after.
// Usage: node --experimental-strip-types scripts/ask-eval/run.ts <label>   (needs ANTHROPIC_API_KEY)
// On GitHub: Actions > Ask Olaide tests > Run workflow (uses the repository secret ANTHROPIC_API_KEY).
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { Answer, systemPrompt } from "../../lib/ask/prompt.ts";

const label = process.argv[2] ?? new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
const dir = path.join(process.cwd(), "scripts/ask-eval");
const questions: { id: string; group: string; q: string }[] = JSON.parse(fs.readFileSync(path.join(dir, "questions.json"), "utf8"));
const client = new Anthropic();
const words = (a: Answer) => a.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;

const results = [];
for (const { id, group, q } of questions) {
  const t = Date.now();
  const msg = await client.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    output_config: { effort: "low", format: zodOutputFormat(Answer) },
    system: [{ type: "text", text: systemPrompt(), cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: q }],
  }).finalMessage();
  if (msg.stop_reason === "max_tokens" || msg.stop_reason === "refusal") throw new Error(`${id}: stopped with ${msg.stop_reason}`);
  const text = msg.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  const answer = Answer.parse(JSON.parse(text));
  results.push({ id, group, q, answer, words: words(answer), ms: Date.now() - t, usage: msg.usage });
  console.log(`${id.padEnd(16)} ${String(words(answer)).padStart(3)} words  ${answer.links.join(",")}`);
  console.log("RESULT " + JSON.stringify({ id, answer }));
}
fs.mkdirSync(path.join(dir, "results"), { recursive: true });
fs.writeFileSync(path.join(dir, "results", `${label}.json`), JSON.stringify(results, null, 2));
console.log(`saved scripts/ask-eval/results/${label}.json`);
