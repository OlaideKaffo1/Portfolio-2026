"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { armReveals } from "./reveal";

// Stages of the page composition that follows the intro (or page load):
// 1 nav → 2 hero text → 3 Ask bar opens → 4 typewriter starts.
// Scroll reveals are armed between 3 and 4.
const TIMELINE = { nav: 0, hero: 120, ask: 620, arm: 700, typing: 1400 };

type Motion = { stage: number; startCompose: () => void };

const MotionContext = createContext<Motion>({ stage: 0, startCompose: () => {} });

export const useMotion = () => useContext(MotionContext);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState(0);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // The boot script marks <html> with "js" before first paint so hidden starting states
  // apply. If React ever re-renders the document root (for example after a hydration
  // mismatch when the page is embedded somewhere), it resets <html>'s classes; put the
  // marker back before the browser paints so no reveal is lost.
  useLayoutEffect(() => {
    document.documentElement.classList.add("js");
  });

  const startCompose = useCallback(() => {
    if (started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(4);
      armReveals();
      return;
    }
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    at(TIMELINE.nav, () => setStage(1));
    at(TIMELINE.hero, () => setStage(2));
    at(TIMELINE.ask, () => setStage(3));
    at(TIMELINE.arm, armReveals);
    at(TIMELINE.typing, () => setStage(4));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return <MotionContext.Provider value={{ stage, startCompose }}>{children}</MotionContext.Provider>;
}
