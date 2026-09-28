"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "./useReveal";

// Generic reveal unit for markup that doesn't need its own component.
export default function Reveal({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
