"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMotion } from "./motion/MotionProvider";
import { useReveal } from "./motion/useReveal";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  // Opens the PDF in a new tab
  { label: "Resume", href: "/resume/Olaide-Arike-Kaffo-Resume.pdf", newTab: true },
];

// Each item sits in its own mask and rises in order: logo, About, Contact, Resume.
function Items({ logoId }: { logoId?: string }) {
  return (
    <>
      <Link href="/" id={logoId} className="line transition-opacity hover:opacity-60">
        <span className="li">Olaide</span>
      </Link>
      <nav className="flex items-center gap-5 sm:gap-7">
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            {...("newTab" in link && link.newTab ? { target: "_blank", rel: "noopener" } : {})}
            className="line transition-opacity hover:opacity-60"
          >
            <span className="li" style={{ "--i": i + 1 } as CSSProperties}>
              {link.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}

const row = "split flex items-center justify-between text-[14px] leading-6";

// Top nav: revealed as the first step of the page composition.
export function SiteHeader() {
  const { stage } = useMotion();
  return (
    <header className={`${row} ${stage >= 1 ? "is-in" : ""}`}>
      <Items logoId="site-logo" />
    </header>
  );
}

// Footer: the divider draws across, then the links rise.
export function SiteFooter() {
  const ref = useReveal<HTMLElement>();
  return (
    <footer ref={ref} className="mt-8">
      <div className="rule" />
      <div className={`${row} pt-6`} style={{ "--d": "200ms" } as CSSProperties}>
        <Items />
      </div>
    </footer>
  );
}
