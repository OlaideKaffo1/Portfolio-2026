"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon } from "./icons";
import SplitLines from "./motion/SplitLines";
import { useReveal } from "./motion/useReveal";

export type Article = {
  tag: string;
  title: string;
  readTime: string;
  date: string;
  href: string;
};

// The card background sweeps down, then the content rises.
export default function ArticleCard({ article, column }: { article: Article; column: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link ref={ref} href={article.href} className={`article group relative isolate flex min-h-[159px] flex-col p-4 ${column ? "col-right" : ""}`}>
      <span className="article-bg" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4">
        <span className="split" style={{ "--d": "calc(var(--c) + 250ms)" } as CSSProperties}>
          <span className="line">
            <span className="li">
              <span className="inline-block rounded bg-tag-bg px-2 py-1 text-[11px] leading-4 text-tag">{article.tag}</span>
            </span>
          </span>
        </span>
        <SplitLines as="span" text={article.readTime} delay="calc(var(--c) + 250ms)" className="text-[13px] font-light leading-5 text-muted" />
      </div>
      <SplitLines as="h3" text={article.title} delay="calc(var(--c) + 320ms)" className="mt-4 max-w-[381px] text-[16px] leading-[1.2]" />
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <SplitLines as="span" text={article.date} delay="calc(var(--c) + 420ms)" className="text-[13px] font-light leading-5 text-muted" />
        <span className="split" style={{ "--d": "calc(var(--c) + 460ms)" } as CSSProperties}>
          <span className="line">
            <span className="li">
              <span className="flex items-center gap-1 text-[14px] leading-4">
                Read Article
                <ArrowRightIcon className="size-3.5 transition-transform duration-300 ease-[var(--expo)] group-hover:translate-x-[3px]" />
              </span>
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}
