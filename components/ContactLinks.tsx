"use client";

import type { CSSProperties } from "react";
import { ExternalIcon, MailIcon } from "./icons";
import { useReveal } from "./motion/useReveal";

const EMAIL = "olaidearikekaffo@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/olaide-arike-kaffo-2333b8169";

// Email opens the visitor's mail app with a new message to Olaide; LinkedIn opens in a new tab.
export default function ContactLinks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="split mt-4 flex flex-wrap items-center gap-x-[46px] gap-y-3 text-[14px] leading-4" style={{ "--d": "200ms" } as CSSProperties}>
      <span className="line">
        <span className="li" style={{ "--i": 0 } as CSSProperties}>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-[5px] transition-opacity hover:opacity-60">
            <MailIcon className="size-3.5" />
            {EMAIL}
          </a>
        </span>
      </span>
      <span className="line">
        <span className="li" style={{ "--i": 1 } as CSSProperties}>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[5px] transition-opacity hover:opacity-60">
            Connect on LinkedIn
            <ExternalIcon className="size-4" />
          </a>
        </span>
      </span>
    </div>
  );
}
