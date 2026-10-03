// Before each build: prepares the finished case studies and articles and copies them into public/,
// so Vercel serves them next to the homepage. For each page it links the nav and "next" buttons,
// adds the page transitions from the homepage cards (scripts/pages/), hides the review-only control
// bar, adds the Ask Olaide button, and copies only the images the page uses.
import fs from "node:fs";
import path from "node:path";

const read = (f) => fs.readFileSync(f, "utf8");
const SITE = "https://www.olaide.design"; // the live address, for link previews
const esc = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// Tab icon and link preview (title, description, image) for each page
// Descriptions match the homepage cards
const DESC = {
  strattie: "How Strategyzer’s AI assistant went from a full conversational companion to a three-question Playbook Recommender, and why shipping the Recommender first was the right call.",
  "strategyzer-saas": "A redesign of Strategyzer’s program admin that gave program designers days back on every delivery and helped the business commit to six-figure enterprise deals.",
  fount: "Employees kept speaking up, and nothing changed. I designed Fount, and a year later Fount AI, to show HR what to fix first. Fount earned $3M+ in its first year.",
  macrometa: "I led a new onboarding for Macrometa’s developer platform, built on templates, sample data and tutorials. Customer retention rose 54%.",
  "only-designer": "How I scaled design across sales, marketing and client delivery at Strategyzer.",
  "prototypes-that-ship": "How I moved Strategyzer’s product discovery into code.",
};
const meta = (section, slug, html) => {
  const title = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "Olaide").replace(/ · Olaide$/, "");
  const d = esc(DESC[slug]);
  return (
    '<link rel="icon" href="../../favicon.svg" type="image/svg+xml">' + ASK_CSS +
    `<meta name="description" content="${d}">` +
    `<meta property="og:type" content="article"><meta property="og:url" content="${SITE}/${section}/${slug}/index.html">` +
    `<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${d}">` +
    `<meta property="og:image" content="${SITE}/og.png"><meta name="twitter:card" content="summary_large_image">`
  );
};
const VT_CSS = read("scripts/pages/vt.css");
const ASK = '<script src="../../ask/ask.js" data-mode="read" defer></script>';
const ASK_CSS = '<link rel="stylesheet" href="../../ask/ask.css">';
const BASE_CSS = `
html, body { margin: 0; background: #fff; }
html { scroll-behavior: auto !important; }
/* The Motion / Desktop-Phone bar is for reviewing single pages only */
#ctrl { display: none !important; }`;

const CASES = ["strattie", "strategyzer-saas", "fount", "macrometa"];
const HERO = { strattie: "finder-hero-v5.webp", "strategyzer-saas": "saas-hero.webp?v=2", fount: "fount-hero.webp", macrometa: "hero.webp" };
const ARTICLES = ["only-designer", "prototypes-that-ship"];

function must(cond, msg) {
  if (!cond) throw new Error(msg);
}

// Top nav on every page: About and Contact go to the homepage sections, Resume opens the PDF in a new tab
const nav = (h) =>
  h
    .replace('<a href="#">About', '<a href="../../#about">About')
    .replace('<a href="#">Contact', '<a href="../../#contact">Contact')
    .replace('<a href="#">Resume', '<a href="../../resume/Olaide-Arike-Kaffo-Resume.pdf" target="_blank" rel="noopener">Resume');

function write(section, slug, html) {
  const from = path.join(section, slug);
  const to = path.join("public", section, slug);
  fs.mkdirSync(path.join(to, "images"), { recursive: true });
  fs.writeFileSync(path.join(to, "index.html"), `${nav(html).trimEnd()}\n${ASK}\n`);
  const used = new Set([...html.matchAll(/["(]images\/([\w.\-]+\.(?:webp|png|jpe?g|mp4|webm|gif|svg))/g)].map((m) => m[1]));
  for (const f of used) {
    const src = path.join(from, "images", f);
    must(fs.existsSync(src), `${from} uses images/${f}, which is missing`);
    fs.copyFileSync(src, path.join(to, "images", f));
  }
  return used.size;
}

for (const section of ["case-studies", "articles"]) fs.rmSync(path.join("public", section), { recursive: true, force: true });

const caseJs = read("scripts/pages/vt-case.js").trim();
CASES.forEach((slug, i) => {
  const next = CASES[(i + 1) % CASES.length];
  let h = read(`case-studies/${slug}/index.html`);
  h = h.replace('<a href="#">Olaide</a>', '<a href="../../">Olaide</a>').replace('class="back" href="#"', 'class="back" href="../../"');
  h = h.replace('<a class="next" href="#">', `<a class="next" href="../${next}/index.html" data-hero="../${next}/images/${HERO[next]}">`);
  // The hero loads first and decodes on the spot, so it's ready for the transition
  h = h.replace(/(<figure class="hero-img[^>]*><img )/, '$1fetchpriority="high" loading="eager" decoding="sync" ');
  must((h.match(/href="\.\.\/\.\.\/"/g) || []).length >= 2 && h.includes(`../${next}/index.html`), `case-studies/${slug}: links not found`);
  const head =
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    `<link rel="preload" as="image" href="images/${HERO[slug]}" fetchpriority="high">` +
    meta("case-studies", slug, h) +
    `<style>${VT_CSS}${BASE_CSS}
/* Arriving from a card: the hero is already in place (the transition carries it), so skip its own wipe */
html.vt-arrive .hero-img { clip-path: none !important; transition: none !important; }
html.vt-arrive .hero-img img { transform: none !important; transition: none !important; }</style>` +
    `<script>document.documentElement.setAttribute("data-slug","${slug}");${caseJs}</script>`;
  console.log(`case-studies/${slug}: ${write("case-studies", slug, head + h)} images`);
});

const articleJs = read("scripts/pages/vt-article.js").trim();
for (const slug of ARTICLES) {
  let h = read(`articles/${slug}/index.html`);
  must(h.split('href="#" data-home').length > 2, `articles/${slug}: home links not found`);
  h = h.replaceAll('href="#" data-home', 'href="../../" data-home');
  h = h.replace(/href="#" data-article="([\w-]+)"/g, 'href="../$1/index.html" data-article="$1"');
  const head =
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    meta("articles", slug, h) +
    `<style>${VT_CSS}${BASE_CSS}
/* Arriving from a card: the grey panel is already in place (the transition carries it), so skip its sweep */
html.vt-arrive .ahead-bg { transform: none !important; transition: none !important; }</style>` +
    `<script>document.documentElement.setAttribute("data-article","${slug}");${articleJs}</script>`;
  console.log(`articles/${slug}: ${write("articles", slug, head + h)} images`);
}
