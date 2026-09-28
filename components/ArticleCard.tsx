import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export type Article = {
  tag: string;
  title: string;
  readTime: string;
  date: string;
  href: string;
};

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex min-h-[159px] flex-col rounded-lg bg-surface p-4 transition-colors hover:bg-[#f3f4f5]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded bg-tag-bg px-2 py-1 text-[11px] leading-4 text-tag">
          {article.tag}
        </span>
        <span className="text-[13px] font-light leading-5 text-muted">{article.readTime}</span>
      </div>
      <h3 className="mt-4 max-w-[381px] text-[16px] leading-[1.2]">{article.title}</h3>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <span className="text-[13px] font-light leading-5 text-muted">{article.date}</span>
        <span className="flex items-center gap-1 text-[14px] leading-4">
          Read Article
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
