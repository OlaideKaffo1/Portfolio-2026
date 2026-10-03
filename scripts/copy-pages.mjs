// Before each build: prepares the finished case studies and articles and copies them into public/,
// so Vercel serves them next to the homepage. For each page it links the nav and "next" buttons,
// adds the page transitions from the homepage cards (scripts/pages/), hides the review-only control
// bar, adds the Ask Olaide button, and copies only the images the page uses.
import fs from "node:fs";
import path from "node:path";

const read = (f) => fs.readFileSync(f, "utf8");
const VT_CSS = read("scripts/pages/vt.css");
const ASK = '<script src="../../ask/ask.js" data-mode="read" defer></script>';
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

// Top nav on every page: About and Contact go to the homepage sections (Resume stays a placeholder, as on the homepage)
const nav = (h) => h.replace('<a href="#">About', '<a href="../../#about">About').replace('<a href="#">Contact', '<a href="../../#contact">Contact');

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
    `<style>${VT_CSS}${BASE_CSS}
/* Arriving from a card: the grey panel is already in place (the transition carries it), so skip its sweep */
html.vt-arrive .ahead-bg { transform: none !important; transition: none !important; }</style>` +
    `<script>document.documentElement.setAttribute("data-article","${slug}");${articleJs}</script>`;
  console.log(`articles/${slug}: ${write("articles", slug, head + h)} images`);
}
