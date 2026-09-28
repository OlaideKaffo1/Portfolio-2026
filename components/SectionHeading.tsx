"use client";

import SplitLines from "./motion/SplitLines";
import { useReveal } from "./motion/useReveal";

// Section title then subtitle, each rising line by line as one unit.
export default function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <SplitLines as="h2" text={title} className="text-[20px] leading-[30px]" />
      <SplitLines text={subtitle} delay="80ms" className="mt-1 text-[16px] leading-[22px] text-muted" />
    </div>
  );
}
