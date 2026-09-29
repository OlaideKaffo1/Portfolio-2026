"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first line rises, e.g. "160ms" or "calc(var(--c) + 350ms)". */
  delay?: string;
  /** Extra class on each line's inner span. */
  lineClassName?: string;
};

// Breaks text into its rendered lines so each can rise from behind its own mask.
// Lines are measured after layout and re-measured when the width changes.
export default function SplitLines({ text, as: Tag = "p", className = "", delay, lineClassName = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    if (lines !== null || !ref.current) return;
    const out: string[][] = [];
    let top: number | null = null;
    ref.current.querySelectorAll<HTMLElement>("[data-w]").forEach((w) => {
      if (w.offsetTop !== top) {
        out.push([]);
        top = w.offsetTop;
      }
      out[out.length - 1].push(w.textContent ?? "");
    });
    // Keep a trailing space on every line but the last so the text still reads correctly
    // (screen readers, copy-paste).
    setLines(out.map((l, i) => l.join(" ") + (i < out.length - 1 ? " " : "")));
  }, [lines]);

  // Re-measure once web fonts have loaded, in case lines were measured with the fallback font.
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && setLines(null));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let width = window.innerWidth;
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (window.innerWidth !== width) {
          width = window.innerWidth;
          setLines(null);
        }
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const style = delay ? ({ "--d": delay } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} className={`split ${className}`} style={style}>
      {lines === null ? (
        <span className="line">
          <span className={`li ${lineClassName}`}>
            {words.map((w, i) => (
              // The space sits between word spans so lines can break only at spaces.
              <Fragment key={i}>
                <span data-w="">{w}</span>
                {i < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </span>
        </span>
      ) : (
        lines.map((l, i) => (
          <span key={i} className="line">
            <span className={`li measured ${lineClassName}`} style={{ "--i": i } as CSSProperties}>
              {l}
            </span>
          </span>
        ))
      )}
    </Tag>
  );
}
