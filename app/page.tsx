import type { CSSProperties } from "react";
import { ArrowDownIcon } from "@/components/icons";
import ArticleCard, { type Article } from "@/components/ArticleCard";
import ContactLinks from "@/components/ContactLinks";
import Hero from "@/components/Hero";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteNav";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import VideoFrame from "@/components/motion/VideoFrame";

// Project cards open the case study pages; article cards open the article pages.
const PROJECTS: Project[] = [
  {
    company: "STRATEGYZER . AI",
    title: "Solving the first-step problem",
    description:
      "How Strategyzer’s AI assistant went from a full conversational companion to a three-question Playbook Recommender, and why shipping the Recommender first was the right call.",
    image: "/images/projects/strategyzer-finder.webp",
    imageAlt: "The Playbook Recommender open on the Projects page, asking what you want to work on",
    href: "case-studies/strattie/index.html",
    slug: "strattie",
    hero: "case-studies/strattie/images/finder-hero-v5.webp",
  },
  {
    company: "STRATEGYZER . SAAS",
    title: "Cutting a two-day workflow to thirty minutes",
    description:
      "A redesign of Strategyzer’s program admin that gave program designers days back on every delivery and helped the business commit to six-figure enterprise deals.",
    image: "/images/projects/strategyzer-saas.webp",
    imageAlt: "Strategyzer program admin showing a cohort playbook instance with weekly events",
    href: "case-studies/strategyzer-saas/index.html",
    slug: "strategyzer-saas",
    hero: "case-studies/strategyzer-saas/images/saas-hero.webp?v=2",
  },
  {
    company: "FOUNT . ENTERPRISE SAAS",
    title: "Making speaking up at work worth it",
    description:
      "Employees kept speaking up, and nothing changed. I designed Fount, and a year later Fount AI, to show HR what to fix first. Fount earned $3M+ in its first year.",
    image: "/images/projects/fount.webp",
    imageAlt: "The Fount welcome screen, with pulse micro surveys and a data-driven dashboard",
    href: "case-studies/fount/index.html",
    slug: "fount",
    hero: "case-studies/fount/images/fount-hero.webp",
  },
  {
    company: "MACROMETA . DEVELOPER TOOLING",
    title: "No developer left to figure it out alone",
    description:
      "I led a new onboarding for Macrometa’s developer platform, built on templates, sample data and tutorials. Customer retention rose 54%.",
    image: "/images/projects/macrometa-welcome.webp",
    imageAlt: "The Macrometa welcome, with a short intro video and three places to start: a quickstart guide, developer tools and tutorials",
    href: "case-studies/macrometa/index.html",
    slug: "macrometa",
    hero: "case-studies/macrometa/images/hero.webp",
  },
];

const ARTICLES: Article[] = [
  {
    tag: "AI Transformation",
    title: "The Only Designer in the Room: How I Scaled Design Across Sales, Marketing and Client Delivery",
    readTime: "10 Min Read",
    date: "September 2026",
    href: "articles/only-designer/index.html",
    slug: "only-designer",
  },
  {
    tag: "AI Transformation",
    title: "Prototypes That Ship: How I Moved Strategyzer’s Product Discovery into Code",
    readTime: "10 Min Read",
    date: "September 2026",
    href: "articles/prototypes-that-ship/index.html",
    slug: "prototypes-that-ship",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1512px] px-4 pb-7 sm:px-6 lg:px-9">
      <div className="pt-6 lg:pt-7">
        <SiteHeader />
      </div>

      <main>
        <Hero />

        {/* Selected Work */}
        <section className="mt-14 lg:mt-[46px]">
          <Reveal className="flex items-center gap-1.5">
            <SplitLines as="h2" text="Selected Work" className="text-[14px] leading-6 text-muted" />
            {/* Points down to the case studies; rises with the heading, then nudges gently */}
            <span className="split" aria-hidden="true" style={{ "--d": "90ms" } as CSSProperties}>
              <span className="line">
                <span className="li">
                  <ArrowDownIcon className="nudge-down size-3.5 text-muted" />
                </span>
              </span>
            </span>
          </Reveal>
          <div className="mt-3 grid grid-cols-1 gap-x-[30px] gap-y-12 md:grid-cols-2 lg:gap-y-10">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} priority={i < 2} column={i % 2} />
            ))}
          </div>
        </section>

        {/* Recent thoughts */}
        <section className="mt-16 lg:mt-[76px]">
          <SectionHeading
            title="My recent thoughts"
            subtitle="The process behind recent results: sales decks in 30 minutes, design decisions in hours."
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[30px]">
            {ARTICLES.map((article, i) => (
              <ArticleCard key={article.title} article={article} column={i % 2} />
            ))}
          </div>
        </section>

        {/* Meet Olaide: the intro video */}
        <section id="about" className="mt-16 scroll-mt-6 lg:mt-[76px]">
          <SectionHeading title="Meet Olaide" subtitle="Under two minutes, so you can put a face to the work." />
          <VideoFrame />
        </section>

        {/* Contact */}
        <section id="contact" className="mt-16 scroll-mt-6 lg:mt-[76px]">
          <SectionHeading
            title="Let’s get things done"
            subtitle="Whatever it is you’re building, I want to hear about it. Let’s start here."
          />
          <ContactLinks />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
