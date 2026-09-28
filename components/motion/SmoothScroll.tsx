"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;

// Pause / resume page scrolling (used while the intro is on screen).
export function lockScroll() {
  document.documentElement.classList.add("intro-lock");
  lenis?.stop();
}
export function unlockScroll() {
  document.documentElement.classList.remove("intro-lock");
  lenis?.start();
}

// Light momentum scrolling. Skipped entirely for reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    if (document.documentElement.classList.contains("intro-lock")) lenis.stop();
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
