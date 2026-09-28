"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ExternalIcon, MailIcon } from "./icons";
import { useReveal } from "./motion/useReveal";

const EMAIL = "olaidearikekaffo@gmail.com";

// Email copies to the clipboard (handy for recruiters); LinkedIn is a placeholder for now.
export default function ContactLinks() {
  const ref = useReveal<HTMLDivElement>();
  const emailRef = useRef<HTMLSpanElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = (msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      show("Email copied");
    } catch {
      // Clipboard refused: select the address so it can be copied by hand.
      const range = document.createRange();
      if (emailRef.current) range.selectNodeContents(emailRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      show("Email selected, press Ctrl or ⌘ + C to copy");
    }
  };

  return (
    <>
      <div ref={ref} className="split mt-4 flex flex-wrap items-center gap-x-[46px] gap-y-3 text-[14px] leading-4" style={{ "--d": "200ms" } as CSSProperties}>
        <span className="line">
          <span className="li" style={{ "--i": 0 } as CSSProperties}>
            <button type="button" onClick={copy} className="flex cursor-pointer items-center gap-[5px] transition-opacity hover:opacity-60">
              <MailIcon className="size-3.5" />
              <span ref={emailRef}>{EMAIL}</span>
            </button>
          </span>
        </span>
        <span className="line">
          <span className="li" style={{ "--i": 1 } as CSSProperties}>
            {/* Placeholder until the LinkedIn URL is ready */}
            <a href="#" className="flex items-center gap-[5px] transition-opacity hover:opacity-60">
              Connect on Linkedin
              <ExternalIcon className="size-4" />
            </a>
          </span>
        </span>
      </div>
      <div role="status" aria-live="polite" className={`toast ${toast ? "is-on" : ""}`}>
        {toast}
      </div>
    </>
  );
}
