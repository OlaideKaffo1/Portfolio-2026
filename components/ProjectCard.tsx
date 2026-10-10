"use client";

import Image from "next/image";
import SplitLines from "./motion/SplitLines";
import { useReveal } from "./motion/useReveal";

export type Project = {
  company: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  slug: string;
  hero: string;
};

// Clicking a card hands its image to the case study: the image grows into the page's hero (see the
// page-transition script in app/layout.tsx). The image wipes open from the bottom while settling from a slight zoom, then the
// company, title and description rise. `col-right` starts a beat later on two-column layouts.
// On hover (or keyboard focus) a "View case study" pill rises into the image's bottom-left corner.
export default function ProjectCard({ project, priority, column }: { project: Project; priority?: boolean; column: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a ref={ref} href={project.href} data-slug={project.slug} data-hero={project.hero} className={`project group block ${column ? "col-right" : ""}`}>
      <div className="media relative aspect-[705/601] overflow-hidden rounded-xl bg-surface">
        <Image src={project.image} alt={project.imageAlt} fill priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        <span className="view-pill" aria-hidden="true">
          View case study
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <SplitLines text={project.company} delay="calc(var(--c) + 350ms)" className="mt-5 text-[13px] leading-6 text-muted" />
      <SplitLines as="h3" text={project.title} delay="calc(var(--c) + 440ms)" lineClassName="title-line" className="mt-1 text-[16px] leading-[30px]" />
      <SplitLines text={project.description} delay="calc(var(--c) + 500ms)" className="mt-0.5 max-w-[521px] text-[14px] leading-[22px] text-body" />
    </a>
  );
}
