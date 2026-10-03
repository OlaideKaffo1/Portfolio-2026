"use client";

import { useEffect, useRef } from "react";
import { PlayCircleIcon } from "@/components/icons";

// The intro video placeholder, 16:9 at every size so a normal video fits uncropped. Its frame is tied to scroll: it starts inset with
// rounder corners and opens to full width as it reaches the middle of the screen,
// closing again when scrolling back up.
export default function VideoFrame() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom > -50 && r.top < vh + 50) {
        // Fully open by the time the whole frame is on screen (with a little room below),
        // so it always completes, even on short pages or tall screens.
        const distance = Math.min(vh * 0.75, r.height + vh * 0.08);
        const p = Math.max(0, Math.min(1, (vh - r.top) / distance));
        const e = 1 - (1 - p) * (1 - p);
        const side = (8 * (1 - e)).toFixed(3);
        el.style.clipPath = `inset(0 ${side}% 0 ${side}% round ${(24 - 16 * e).toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Play intro video (coming soon)"
      className="video-frame group relative mt-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#2b2b2b] via-[#4a4a4a] to-[#1c1c1c]"
    >
      <PlayCircleIcon className="size-12 text-white transition-transform duration-500 ease-[var(--expo)] group-hover:scale-110 sm:size-[60px]" />
    </button>
  );
}
