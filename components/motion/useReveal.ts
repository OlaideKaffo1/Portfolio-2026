"use client";

import { useEffect, useRef } from "react";
import { registerReveal } from "./reveal";

// Marks an element as a reveal unit: it gains `is-in` once it scrolls into view.
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    return registerReveal(ref.current);
  }, []);
  return ref;
}
