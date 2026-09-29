import ArticleCard, { type Article } from "@/components/ArticleCard";
import ContactLinks from "@/components/ContactLinks";
import Hero from "@/components/Hero";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteNav";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import VideoFrame from "@/components/motion/VideoFrame";

// Project and article pages are built later; links are placeholders for now.
const PROJECTS: Project[] = [
  {
    company: "STRATEGYZER . AI",
    title: "Solving the first-step problem",
    description:
      "How Strategyzer's AI assistant went from a full conversational companion to a three-question playbook finder, and why cutting it was the right call.",
    image: "/images/projects/strategyzer-finder.webp",
    imageAlt: "The Playbook Recommender open on the Projects page, asking what you want to work on",
    href: "#",
  },
  {
    company: "STRATEGYZER . SAAS",
    title: "Cutting a two-day workflow to thirty minutes",
    description:
      "A redesign of Strategyzer's program admin that gave program designers days back on every delivery and helped the business commit to six-figure enterprise deals.",
    image: "/images/projects/strategyzer-saas.webp",
    imageAlt: "Strategyzer program admin showing a cohort playbook instance with weekly events",
    href: "#",
  },
  {
    company: "FOUNT . AI",
    title: "From 12 weeks of spreadsheets to 2 weeks of action",
    description:
      "It took HR 12 weeks to act on feedback, and by then people had already left. I led the end-to-end design of the AI partner that cut it to 2.",
    image: "/images/projects/fount-ai.webp",
    imageAlt: "Fount AI Agent surfacing challenges and solution recommendations for parental leave",
    href: "#",
  },
  {
    company: "FOUNT . ENTERPRISE SAAS",
    title: "From 20% to 82% : Making employees want to answer surveys again",
    description:
      "I led the design of Fount's Sass product from zero to one, turning ignored surveys into a product that cut turnover by 24%.",
    image: "/images/projects/fount-enterprise.webp",
    imageAlt: "Fount welcome dashboard with pulse micro surveys and a data-driven heatmap",
    href: "#",
  },
];

const ARTICLES: Article[] = [
  {
    tag: "AI Transformation",
    title: "The Only Designer in the Room: How I Scaled Design Across Sales, Marketing and Client Delivery",
    readTime: "8 Min Read",
    date: "September 2026",
    href: "#",
  },
  {
    tag: "AI Transformation",
    title: "Prototypes That Ship: How I Moved Strategyzer's Product Discovery into Code",
    readTime: "8 Min Read",
    date: "September 2026",
    href: "#",
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
          <Reveal>
            <SplitLines as="h2" text="Selected Work" className="text-[14px] leading-6 text-muted" />
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
            subtitle="Documenting my learnings, process and Impact on recent transformative projects I executed."
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[30px]">
            {ARTICLES.map((article, i) => (
              <ArticleCard key={article.title} article={article} column={i % 2} />
            ))}
          </div>
        </section>

        {/* Who am I? (video placeholder until the intro video is recorded) */}
        <section id="about" className="mt-16 scroll-mt-6 lg:mt-[76px]">
          <SectionHeading title="Who am I?" subtitle="A summary of all i have done, In two minutes." />
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
