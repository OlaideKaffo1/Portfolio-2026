"use client";

import AskOlaide from "./AskOlaide";
import { useMotion } from "./motion/MotionProvider";
import SplitLines from "./motion/SplitLines";

// Headline and intro rise line by line, then the Ask bar opens left to right.
export default function Hero() {
  const { stage } = useMotion();
  return (
    <section className="mt-24 sm:mt-32 lg:mt-[181px]">
      <SplitLines
        as="h1"
        text="Anyone can generate a screen now. I know which one to ship."
        className={`max-w-[446px] text-[24px] leading-[28px] sm:text-[28px] sm:leading-[30px] ${stage >= 2 ? "is-in" : ""}`}
      />
      <SplitLines
        text="I’m Olaide, a senior product designer. I prototype in code with AI, test with real people, and back the ideas that work for users and the business."
        delay="160ms"
        className={`mt-3 max-w-[454px] text-[16px] leading-6 text-body sm:text-[18px] ${stage >= 2 ? "is-in" : ""}`}
      />
      <div className={`ask-reveal mt-6 w-full max-w-[331px] ${stage >= 3 ? "is-in" : ""}`}>
        <AskOlaide started={stage >= 4} />
      </div>
    </section>
  );
}
