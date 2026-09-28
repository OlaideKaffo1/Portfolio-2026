"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon, SparkleIcon } from "./icons";

const PROMPTS = [
  "Ask Olaide anything…",
  "What can Olaide do for your team?",
  "What problem do you have for Olaide to solve?",
  "How does Olaide go from design to code?",
  "What has Olaide shipped recently?",
  "Is Olaide a good fit for your role?",
  "How does Olaide work with engineers?",
  "What makes Olaide different?",
];

const TYPE_MS = 55; // per character while typing
const DELETE_MS = 25; // per character while deleting
const HOLD_MS = 2000; // how long a finished phrase stays
const GAP_MS = 400; // pause on the empty input before the next phrase

type Phase = "typing" | "holding" | "deleting";

// Entry point for the AI version of Olaide. The chat itself is built later;
// for now this is the input with a typewriter placeholder.
export default function AskOlaide() {
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
  }, [paused, reducedMotion, phase, length, phrase]);

  const shown = reducedMotion ? phrase : phrase.slice(0, length);

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative flex h-11 w-full max-w-[331px] items-center rounded-lg bg-black pl-3 pr-1"
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
            {!focused && !reducedMotion && (
              <span className={phase === "holding" ? "ask-caret ask-caret-blink" : "ask-caret"} />
            )}
          </span>
        )}
      </div>
      <button
        type="submit"
        aria-label="Send"
        className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-md bg-white text-black transition-opacity hover:opacity-90"
      >
        <ArrowUpIcon className="size-4" />
      </button>
    </form>
  );
}
