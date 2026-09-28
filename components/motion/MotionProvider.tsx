"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
