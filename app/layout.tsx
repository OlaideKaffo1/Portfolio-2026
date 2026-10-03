import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import Intro from "@/components/motion/Intro";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

// Dot-matrix face for the departure-board intro
const doto = localFont({
  src: "../node_modules/@fontsource/doto/files/doto-latin-900-normal.woff2",
  weight: "900",
  variable: "--font-doto",
  display: "block",
});

const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://portfolio-2026-blush-pi.vercel.app";
const TITLE = "Olaide, Senior Product Designer";
const DESCRIPTION =
  "I prototype in code with AI, test with real people, and back the ideas that work for users and the business.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  // The link preview when the site is shared (public/og.png: the hero and the first two projects)
  openGraph: { type: "website", url: "/", title: TITLE, description: DESCRIPTION, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Olaide's portfolio: the hero and the first two case studies" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
};

// Runs before first paint: enables the motion styles (so the page still shows fully
// without JavaScript) and covers the page in black if the intro is about to play,
// so there's no flash of content before it starts. It also runs the page transitions to and from
// the case studies and articles: a clicked card's image grows into the case study's hero, an article
// card's grey panel grows into the article's header, and coming back
// lands on the top of the page, already composed.
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(sessionStorage.getItem("olaide-intro-seen")!=="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-pending")}catch(e){}})();(function(){var d=document.documentElement,w=window;
function fromUrl(){try{var a=w.navigation&&navigation.activation&&navigation.activation.from;if(a&&a.url)return a.url}catch(e){}return document.referrer||""}
function navType(){try{return navigation.activation.navigationType}catch(e){return""}}
var fu=fromUrl(),returning=fu.indexOf("/case-studies/")>-1||fu.indexOf("/articles/")>-1;
if("scrollRestoration"in history)history.scrollRestoration="manual";
if(returning){d.classList.add("returning");d.classList.remove("intro-pending");try{sessionStorage.setItem("olaide-intro-seen","1")}catch(e){}}
function top(){if(scrollX||scrollY)scrollTo(0,0)}
top();addEventListener("DOMContentLoaded",top);
addEventListener("pagereveal",function(e){top();if(e.viewTransition&&returning)e.viewTransition.types.add("back")});
addEventListener("pageshow",function(e){if(e.persisted){d.classList.add("returning");top()}document.querySelectorAll("a[data-slug] .media,a[data-article] > *").forEach(function(m){m.style.viewTransitionName=""})});
var done={};function warm(a){var u=a&&a.getAttribute("href");if(!u||done[u])return;done[u]=1;var h=a.getAttribute("data-hero");if(h){var i=new Image();i.decoding="async";i.src=h}
var l=document.createElement("link");l.rel="prefetch";l.href=a.getAttribute("href");document.head.appendChild(l)}
addEventListener("load",function(){setTimeout(function(){document.querySelectorAll("a[data-slug],a[data-article]").forEach(warm)},1500)});
document.addEventListener("pointerover",function(e){warm(e.target.closest&&e.target.closest("a[data-slug],a[data-article]"))},{passive:true});
document.addEventListener("touchstart",function(e){warm(e.target.closest&&e.target.closest("a[data-slug],a[data-article]"))},{passive:true});
addEventListener("pageswap",function(e){if(!e.viewTransition)return;var to="";try{to=e.activation.entry.url}catch(x){}
var a=[].slice.call(document.querySelectorAll("a[data-slug],a[data-article]")).filter(function(x){return to&&to.indexOf(x.getAttribute("href"))>-1})[0];
var m=a&&(a.querySelector(".media")||a.querySelector(".article-bg"));if(!m)return;var r=m.getBoundingClientRect();
if(r.bottom>0&&r.top<innerHeight){m.style.viewTransitionName=m.classList.contains("media")?"hero":"panel";if(m.classList.contains("article-bg"))[].slice.call(a.children).filter(function(c){return c!==m}).forEach(function(c,i){c.style.viewTransitionName="pt"+i})}});
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${doto.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* Ask Olaide, the chat card */}
        <link rel="stylesheet" href="/ask/ask.css" />
        <script src="/ask/ask.js" data-mode="home" defer />
      </head>
      <body>
        <MotionProvider>
          <SmoothScroll />
          <Intro />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
