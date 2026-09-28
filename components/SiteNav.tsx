import Link from "next/link";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  // Placeholder until the resume link is ready
  { label: "Resume", href: "#" },
];

export default function SiteNav({ as: Tag = "header" }: { as?: "header" | "footer" }) {
  return (
    <Tag className="flex items-center justify-between text-[14px] leading-6">
      <Link href="/" className="transition-opacity hover:opacity-60">
        Olaide
      </Link>
      <nav className="flex items-center gap-5 sm:gap-7">
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} className="transition-opacity hover:opacity-60">
            {link.label}
          </a>
        ))}
      </nav>
    </Tag>
  );
}
