import Image from "next/image";
import Link from "next/link";

export type Project = {
  company: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

export default function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <Link href={project.href} className="group block">
      <div className="relative aspect-[705/601] overflow-hidden rounded-xl bg-surface">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
      </div>
      <p className="mt-5 text-[13px] leading-6 text-muted">{project.company}</p>
      <h3 className="mt-1 text-[16px] leading-[30px]">{project.title}</h3>
      <p className="mt-0.5 max-w-[521px] text-[14px] leading-[22px] text-muted">
        {project.description}
      </p>
    </Link>
  );
}
