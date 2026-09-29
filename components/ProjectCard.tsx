"use client";

import Image from "next/image";
import Link from "next/link";
import SplitLines from "./motion/SplitLines";
import { useReveal } from "./motion/useReveal";

export type Project = {
  company: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

// The image wipes open from the bottom while settling from a slight zoom, then the
// company, title and description rise. `col-right` starts a beat later on two-column layouts.
export default function ProjectCard({ project, priority, column }: { project: Project; priority?: boolean; column: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link ref={ref} href={project.href} className={`project group block ${column ? "col-right" : ""}`}>
      <div className="media relative aspect-[705/601] overflow-hidden rounded-xl bg-surface">
        <Image src={project.image} alt={project.imageAlt} fill priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <SplitLines text={project.company} delay="calc(var(--c) + 350ms)" className="mt-5 text-[13px] leading-6 text-muted" />
      <SplitLines as="h3" text={project.title} delay="calc(var(--c) + 440ms)" lineClassName="title-line" className="mt-1 text-[16px] leading-[30px]" />
      <SplitLines text={project.description} delay="calc(var(--c) + 500ms)" className="mt-0.5 max-w-[521px] text-[14px] leading-[22px] text-body" />
    </Link>
  );
}
