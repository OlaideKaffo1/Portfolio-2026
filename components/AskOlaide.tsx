"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon, SparkleIcon } from "./icons";

// The four welcome questions from the chat card, then the open invitation
const PROMPTS = [
  "How do you design with code and AI?",
  "How do you decide what’s worth building?",
  "Has your work moved revenue?",
  "How do you tackle a complex problem?",
  "Ask Olaide anything…",
];

const TYPE_MS = 55; // per character while typing
const DELETE_MS = 25; // per character while deleting
const HOLD_MS = 2000; // how long a finished phrase stays
const GAP_MS = 400; // pause on the empty input before the next phrase

type Phase = "typing" | "holding" | "deleting";

// Entry point for the AI version of Olaide: the input with a typewriter placeholder, which starts
// once the page has finished composing (`started`). Sending opens the chat card (public/ask/ask.js)
// with the question; the card's pill appears once this bar scrolls away.
export default function AskOlaide({ started = true }: { started?: boolean }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reducedMotion, setReducedMotion] = useState(false);

  const paused = focused || value.length > 0;
  const phrase = PROMPTS[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (paused) {
      // Finish the current phrase so it can be read, then hold it on resume.
      setLength(phrase.length);
      setPhase("holding");
      return;
    }

    // Without motion, show each phrase in full and swap it every HOLD_MS.
    if (reducedMotion) {
      const id = setTimeout(() => setIndex((i) => (i + 1) % PROMPTS.length), HOLD_MS);
      return () => clearTimeout(id);
    }

    let id: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      id =
        length < phrase.length
          ? setTimeout(() => setLength((l) => l + 1), TYPE_MS)
          : setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      id = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (length > 0) {
      id = setTimeout(() => setLength((l) => l - 1), DELETE_MS);
    } else {
      id = setTimeout(() => {
        setIndex((i) => (i + 1) % PROMPTS.length);
        setPhase("typing");
      }, GAP_MS);
    }
    return () => clearTimeout(id);
  }, [started, paused, reducedMotion, phase, length, phrase]);

  const shown = !started ? "" : reducedMotion ? phrase : phrase.slice(0, length);

  return (
    <form
      role="search"
      data-ask-hero
      onSubmit={(e) => {
        e.preventDefault();
        const question = value.trim();
        const chat = (window as Window & { AskOlaide?: { ask: (q?: string) => void } }).AskOlaide;
        if (!chat) return;
        chat.ask(question || undefined);
        setValue("");
      }}
      className="relative flex h-11 w-full max-w-[331px] items-center rounded-lg bg-black pl-3 pr-1 transition-shadow duration-[250ms] focus-within:shadow-[0_0_0_4px_rgba(119,131,142,0.25)]"
    >
      <SparkleIcon className="size-3.5 shrink-0 text-subtle" />
      <div className="relative ml-[7px] h-5 min-w-0 flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Ask Olaide anything"
          className="absolute inset-0 w-full bg-transparent text-[12px] leading-5 text-white outline-none"
        />
        {value.length === 0 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 truncate text-[12px] leading-5 text-subtle"
          >
            {shown}
            {started && !focused && !reducedMotion && (
              <span className={phase === "holding" ? "ask-caret ask-caret-blink" : "ask-caret"} />
            )}
          </span>
        )}
      </div>
      <button
        type="submit"
        aria-label="Send"
        className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-md bg-white text-black transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.92]"
      >
        <ArrowUpIcon className="size-4" />
      </button>
    </form>
  );
}
