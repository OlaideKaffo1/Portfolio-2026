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

const ROTATE_EVERY_MS = 2000;

// Entry point for the AI version of Olaide. The chat itself is built later;
// for now this is the input with a rotating placeholder.
export default function AskOlaide() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);

  const paused = focused || value.length > 0;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PROMPTS.length),
      ROTATE_EVERY_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

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
            key={index}
            aria-hidden="true"
            className="ask-placeholder pointer-events-none absolute inset-0 truncate text-[12px] leading-5 text-subtle"
          >
            {PROMPTS[index]}
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
