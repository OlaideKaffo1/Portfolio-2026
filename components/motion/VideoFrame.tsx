"use client";

import { useEffect, useRef, useState } from "react";
import { PlayCircleIcon } from "@/components/icons";

// The Meet Olaide video, 16:9 at every size. Nothing loads until it's played; the poster shows first. Its frame is tied to scroll: it starts inset with
// rounder corners and opens to full width as it reaches the middle of the screen,
// closing again when scrolling back up.
export default function VideoFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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

  const play = () => {
    setPlaying(true);
    video.current?.play().catch(() => setPlaying(false));
  };

  return (
    <div
      ref={ref}
      className="video-frame group relative mt-4 aspect-video w-full overflow-hidden rounded-lg bg-[#1c1c1c]"
    >
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover"
        poster="/video/meet-olaide-poster.webp"
        preload="none"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
        aria-label="Meet Olaide, a short introduction video"
      >
        {/* MP4 plays almost everywhere; WebM covers browsers without the MP4 codec */}
        <source src="/video/meet-olaide.mp4" type="video/mp4" />
        <source src="/video/meet-olaide.webm" type="video/webm" />
      </video>
      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Play the video"
          className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors duration-300 hover:bg-black/25"
        >
          <PlayCircleIcon className="size-12 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[var(--expo)] group-hover:scale-110 sm:size-[60px]" />
        </button>
      )}
    </div>
  );
}
