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

export const metadata: Metadata = {
  title: "Olaide — Product Designer",
  description:
    "Olaide is a senior product designer who engineers. Six years delivering value, shipping products that drive revenue and transforming orgs.",
};

// Runs before first paint: enables the motion styles (so the page still shows fully
// without JavaScript) and covers the page in black if the intro is about to play,
// so there's no flash of content before it starts.
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(sessionStorage.getItem("olaide-intro-seen")!=="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-pending")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${doto.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
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
