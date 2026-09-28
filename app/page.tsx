import AskOlaide from "@/components/AskOlaide";
import ArticleCard, { type Article } from "@/components/ArticleCard";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SiteNav from "@/components/SiteNav";
import { ExternalIcon, MailIcon, PlayCircleIcon } from "@/components/icons";

// Project and article pages are built later; links are placeholders for now.
const PROJECTS: Project[] = [
  {
    company: "STRATEGYZER . AI",
    title: "Solving the first-step problem",
    description:
      "How Strategyzer's AI assistant went from a full conversational companion to a three-question playbook finder, and why cutting it was the right call.",
    image: "/images/projects/strategyzer-ai.webp",
    imageAlt: "Strattie, Strategyzer's AI assistant, recommending a customer interview playbook",
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

const EMAIL = "olaidearikekaffo@gmail.com";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 lg:px-9">
      <div className="pt-6 lg:pt-7">
        <SiteNav />
      </div>

      <main>
        {/* Hero */}
        <section className="mt-24 sm:mt-32 lg:mt-[181px]">
          <h1 className="max-w-[446px] text-[24px] leading-[28px] sm:text-[28px] sm:leading-[30px]">
            Hi! I’m Olaide, a product designer who engineers
          </h1>
          <p className="mt-3 max-w-[454px] text-[16px] leading-6 text-muted sm:text-[18px]">
            I have spent the past six years delivering value, shipping products that drive revenue
            and transforming orgs.
          </p>
          <div className="mt-6">
            <AskOlaide />
          </div>
        </section>

        {/* Selected Work */}
        <section className="mt-14 lg:mt-[46px]" aria-labelledby="selected-work">
          <h2 id="selected-work" className="text-[14px] leading-6 text-muted">
            Selected Work
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-x-[30px] gap-y-12 md:grid-cols-2 lg:gap-y-10">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} priority={i < 2} />
            ))}
          </div>
        </section>

        {/* Recent thoughts */}
        <section className="mt-16 lg:mt-[76px]">
          <SectionHeading
            title="My recent thoughts"
            subtitle="Documenting my learnings, process and Impact on recent transformative projects I executed."
          />
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[30px]">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>
        </section>

        {/* Who am I? */}
        <section id="about" className="mt-16 scroll-mt-6 lg:mt-[76px]">
          <SectionHeading title="Who am I?" subtitle="A summary of all i have done, In two minutes." />
          {/* Video placeholder until the intro video is recorded */}
          <button
            type="button"
            aria-label="Play intro video (coming soon)"
            className="group relative mt-5 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#2b2b2b] via-[#4a4a4a] to-[#1c1c1c] lg:aspect-[1440/536]"
          >
            <PlayCircleIcon className="size-12 text-white transition-transform duration-300 group-hover:scale-110 sm:size-[60px]" />
          </button>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-16 scroll-mt-6 lg:mt-[76px]">
          <SectionHeading
            title="Let’s get things done"
            subtitle="Whatever it is you’re building, I want to hear about it. Let’s start here."
          />
          <div className="mt-4 flex flex-wrap items-center gap-x-[46px] gap-y-3 text-[14px] leading-4">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-[5px] transition-opacity hover:opacity-60">
              <MailIcon className="size-3.5" />
              {EMAIL}
            </a>
            {/* Placeholder until the LinkedIn URL is ready */}
            <a href="#" className="flex items-center gap-[5px] transition-opacity hover:opacity-60">
              Connect on Linkedin
              <ExternalIcon className="size-4" />
            </a>
          </div>
        </section>
      </main>

      <div className="mt-8 border-t border-divider pt-6 pb-7">
        <SiteNav as="footer" />
      </div>
    </div>
  );
}
