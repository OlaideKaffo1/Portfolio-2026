"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";
import { lockScroll, unlockScroll } from "./SmoothScroll";

// Departure-board intro. Plays on the first visit in a session, skips on any click
// or key press, and never plays for reduced motion. At the end the board's OLAIDE
// shrinks into the nav logo while the screen splits open.

const SESSION_KEY = "olaide-intro-seen";
const WORDS = ["RESEARCHING", "STRATEGIZING", "EXPERIMENTING", "DESIGNING", "ENGINEERING", "SHIPPING", "LEADING", "IMPACT.", "OLAIDE"];
const HOLDS = [650, 470, 470, 470, 470, 470, 470, 600]; // first word holds, middle accelerates
const NAME_HOLD = 700;
const SLOTS = 13; // EXPERIMENTING is the longest word
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const EXPO = "cubic-bezier(0.19, 1, 0.22, 1)";
const LIFT = "cubic-bezier(0.76, 0, 0.24, 1)";
const REEL = "cubic-bezier(0.3, 0.9, 0.3, 1)";

function el(tag: string, cls?: string, text?: string) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { startCompose } = useMotion();

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced || !root || html.classList.contains("returning")) {
      html.classList.remove("intro-pending");
      startCompose();
      return;
    }
    // Marked seen only once it has actually played or been skipped.
    const markSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    const anims: Animation[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const anim = (n: Element, kf: Keyframe[], o: KeyframeAnimationOptions) => {
      const a = n.animate(kf, o);
      anims.push(a);
      return a;
    };
    const logo = document.getElementById("site-logo");
    const logoLine = logo?.querySelector<HTMLElement>(".li");
    let done = false;

    // ---- Build the board ----
    const top = el("div", "intro-half intro-top");
    const bottom = el("div", "intro-half intro-bottom");
    const board = el("div", "intro-board");
    const seam = el("div", "intro-seam");
    const count = el("div", "intro-count", "000");
    const meta = el("div", "intro-meta");
    meta.append(el("span", "", "Olaide"), el("span", "", "Portfolio ’26"));
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const skip = el("div", "intro-skip", touch ? "Tap anywhere to skip" : "Click or press any key to skip");
    root.append(top, bottom, seam, count, meta, skip, board);
    root.hidden = false;
    html.classList.remove("intro-pending");
    lockScroll();

    const probe = el("span", "", "W");
    board.appendChild(probe);
    const reelWidth = Math.ceil(probe.getBoundingClientRect().width + 1);
    probe.remove();
    const reels = Array.from({ length: SLOTS }, () => {
      const reel = el("span", "intro-reel");
      reel.style.width = `${reelWidth}px`;
      const strip = el("span", "intro-strip");
      strip.appendChild(el("b", "", " "));
      reel.appendChild(strip);
      board.appendChild(reel);
      return { reel, current: " " };
    });

    const pad = (w: string) => {
      const extra = SLOTS - w.length;
      const left = Math.floor(extra / 2);
      return " ".repeat(left) + w + " ".repeat(extra - left);
    };
    const spin = (word: string) => {
      const target = pad(word);
      reels.forEach((r, i) => {
        const to = target[i];
        if (to === r.current) return;
        const hops = 2 + (i % 3);
        const glyphs = [r.current];
        for (let k = 0; k < hops; k++) glyphs.push(ALPHA[Math.floor(Math.random() * 26)]);
        glyphs.push(to);
        const strip = el("span", "intro-strip");
        glyphs.forEach((g) => strip.appendChild(el("b", "", g)));
        r.reel.replaceChild(strip, r.reel.firstChild!);
        r.current = to;
        anim(strip, [{ transform: "translateY(0)" }, { transform: `translateY(${(-(glyphs.length - 1) * 100) / glyphs.length}%)` }], {
          duration: 280 + hops * 14,
          delay: i * 10,
          easing: REEL,
          fill: "forwards",
        });
      });
    };

    // ---- Timeline ----
    const at = [0];
    HOLDS.forEach((h) => at.push(at[at.length - 1] + h));
    WORDS.forEach((w, i) => later(() => spin(w), at[i]));
    const seamAt = at[at.length - 1] + NAME_HOLD;
    const splitAt = seamAt + 200;

    const t0 = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / (seamAt - 50));
      count.textContent = String(Math.round((1 - Math.pow(1 - p, 1.3)) * 100)).padStart(3, "0");
      if (p < 1) later(tick, 30);
    };
    tick();

    anim(seam, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 340, delay: seamAt, easing: EXPO, fill: "both" });
    [count, meta, skip].forEach((n) => anim(n, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: splitAt, fill: "forwards" }));
    anim(seam, [{ opacity: 0.35 }, { opacity: 0 }], { duration: 200, delay: splitAt, fill: "forwards" });
    const split: KeyframeAnimationOptions = { duration: 1000, delay: splitAt, easing: LIFT, fill: "forwards" };
    anim(top, [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], split);
    anim(bottom, [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }], split);

    // Hand-off: OLAIDE on the board shrinks into the nav logo as the screen opens.
    const nameStart = Math.floor((SLOTS - "OLAIDE".length) / 2);
    later(() => {
      if (!logo || !logoLine) return;
      const a = reels[nameStart].reel.getBoundingClientRect();
      const b = reels[nameStart + 5].reel.getBoundingClientRect();
      const m = board.getBoundingClientRect();
      const L = logoLine.getBoundingClientRect();
      const ux = (a.left + b.right) / 2;
      const uy = (a.top + a.bottom) / 2;
      const s = L.width / (b.right - a.left);
      const dx = L.left + L.width / 2 - ux;
      const dy = L.top + L.height / 2 - uy;
      board.style.transformOrigin = `${ux - m.left}px ${uy - m.top}px`;
      anim(
        board,
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1, color: "#fff" },
          { transform: `translate(${dx * 0.6}px, ${dy * 0.6}px) scale(${1 - (1 - s) * 0.6})`, opacity: 1, color: "#fff", offset: 0.55 },
          { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0, color: "#000" },
        ],
        { duration: 1000, easing: LIFT, fill: "forwards" },
      );
      logoLine.style.transform = "none";
      anim(logo, [{ opacity: 0 }, { opacity: 1 }], { duration: 380, delay: 620, easing: "ease-out", fill: "both" });
    }, splitAt);

    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      anims.forEach((a) => a.cancel());
      root.replaceChildren();
      root.hidden = true;
      if (logo) logo.style.opacity = "";
      if (logoLine) logoLine.style.transform = "";
      unlockScroll();
      removeSkip();
    };

    later(unlockScroll, splitAt + 600);
    later(startCompose, splitAt + 450);
    later(() => {
      markSeen();
      finish();
    }, splitAt + 1100);

    // Skip straight to the page.
    const onSkip = () => {
      markSeen();
      finish();
      startCompose();
    };
    const removeSkip = () => {
      window.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("keydown", onSkip);
    };
    window.addEventListener("pointerdown", onSkip);
    window.addEventListener("keydown", onSkip);

    return finish;
  }, [startCompose]);

  return <div ref={rootRef} className="intro" aria-hidden="true" hidden />;
}
