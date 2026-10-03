// Limits and logging for Ask Olaide: per-visitor rate limits, a monthly spend cap, and the conversation log.
// With Supabase configured, both the limits and the log live there (see supabase/ask.sql). Without it
// (local development), limits are kept in memory and nothing is saved.
import { createHash } from "node:crypto";

export const LIMITS = {
  perMinute: 5,
  perHour: 30,
  perDay: 60,
  // Dollars per calendar month (UTC). Set ASK_MONTHLY_CAP_USD to change it.
  monthlyCapUsd: Number(process.env.ASK_MONTHLY_CAP_USD ?? 20),
};

// Claude Opus 5.5, dollars per million tokens
const PRICE = { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 5 };

export type Usage = {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
};

export function costUsd(u: Usage) {
  return (
    (u.input_tokens * PRICE.input +
      u.output_tokens * PRICE.output +
      (u.cache_read_input_tokens ?? 0) * PRICE.cacheRead +
      (u.cache_creation_input_tokens ?? 0) * PRICE.cacheWrite) /
    1e6
  );
}

// Visitors are counted by a salted hash of their IP address; the address itself is never stored.
export function visitorId(ip: string) {
  return createHash("sha256").update(`${process.env.ASK_IP_SALT ?? "ask-olaide"}:${ip}`).digest("hex").slice(0, 32);
}

const SB_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = SB_URL && SB_KEY;

async function sb(pathname: string, body: unknown) {
  const res = await fetch(`${SB_URL}/rest/v1/${pathname}`, {
    method: "POST",
    headers: {
      apikey: SB_KEY!,
      // Older service_role keys are JWTs and also go in Authorization; newer sb_secret_ keys go in apikey only
      ...(SB_KEY!.startsWith("eyJ") ? { Authorization: `Bearer ${SB_KEY}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${pathname}: ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

// In-memory fallback for local development
const memory = { hits: new Map<string, number[]>(), month: "", spent: 0 };
const monthKey = () => new Date().toISOString().slice(0, 7);

export type Verdict = { ok: true } | { ok: false; reason: "rate" | "cap" };

export async function check(visitor: string): Promise<Verdict> {
  let minute: number, hour: number, day: number, month: number;
  if (supabase) {
    const u = (await sb("rpc/ask_usage", { p_visitor: visitor })) as { minute: number; hour: number; day: number; month_cost: number };
    ({ minute, hour, day } = u);
    month = Number(u.month_cost);
  } else {
    const now = Date.now();
    const hits = (memory.hits.get(visitor) ?? []).filter((t) => now - t < 86_400_000);
    memory.hits.set(visitor, hits);
    minute = hits.filter((t) => now - t < 60_000).length;
    hour = hits.filter((t) => now - t < 3_600_000).length;
    day = hits.length;
    if (memory.month !== monthKey()) Object.assign(memory, { month: monthKey(), spent: 0 });
    month = memory.spent;
  }
  if (month >= LIMITS.monthlyCapUsd) return { ok: false, reason: "cap" };
  if (minute >= LIMITS.perMinute || hour >= LIMITS.perHour || day >= LIMITS.perDay) return { ok: false, reason: "rate" };
  return { ok: true };
}

export type LogEntry = {
  visitor: string;
  conversation: string;
  page: string;
  question: string;
  answer: unknown;
  status: "ok" | "error";
  ms: number;
  usage?: Usage;
};

// One row per question. Rows without usage (errors) still count towards the rate limit.
export async function log(e: LogEntry) {
  const cost = e.usage ? costUsd(e.usage) : 0;
  if (!supabase) {
    memory.hits.set(e.visitor, [...(memory.hits.get(e.visitor) ?? []), Date.now()]);
    memory.spent += cost;
    return;
  }
  await sb("ask_log", {
    visitor: e.visitor,
    conversation: e.conversation,
    page: e.page,
    question: e.question,
    answer: e.answer,
    status: e.status,
    ms: e.ms,
    input_tokens: e.usage?.input_tokens ?? 0,
    output_tokens: e.usage?.output_tokens ?? 0,
    cache_read_tokens: e.usage?.cache_read_input_tokens ?? 0,
    cache_write_tokens: e.usage?.cache_creation_input_tokens ?? 0,
    cost_usd: cost,
  });
}
