"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";
import { lockScroll, unlockScroll } from "./SmoothScroll";

// Departure-board intro. Plays on the first visit in a session, skips on any click
// or key press, and never plays for reduced motion. It asks the question the hero
// answers ("I know which one to ship"), then the board's OLAIDE shrinks into the nav
// logo while the screen splits open. A soft click marks each line; browsers only allow
// sound after a click, so it stays off until the visitor presses "Sound on".

const SESSION_KEY = "olaide-intro-seen";
const WORDS = ["EVERYONE HAS AI.", "EVERYONE HAS SCREENS.", "WHO HAS JUDGMENT?", "OLAIDE"];
const HOLDS = WORDS.slice(0, -1).map((w) => 520 + w.length * 18); // long enough to read each line
const NAME_HOLD = 700;
const SLOTS = 21; // EVERYONE HAS SCREENS. is the longest line
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const EXPO = "cubic-bezier(0.19, 1, 0.22, 1)";
const LIFT = "cubic-bezier(0.76, 0, 0.24, 1)";
const REEL = "cubic-bezier(0.3, 0.9, 0.3, 1)";

// The "Softer" click: a short, rounded tap per line, and a two-note confirm when the name lands
function makeClick() {
  let ctx: AudioContext | null = null;
  const tone = (t: number, f: number, end: number, len: number, gain: number) => {
    const o = ctx!.createOscillator();
    o.frequency.setValueAtTime(f, t);
    o.frequency.exponentialRampToValueAtTime(end, t + len);
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(ctx!.destination);
    o.start(t);
    o.stop(t + len + 0.02);
  };
  return {
    on: () => {
      ctx ??= new AudioContext();
      void ctx.resume();
    },
    off: () => void ctx?.suspend(),
    play: (delayMs: number, confirm: boolean) => {
      if (!ctx || ctx.state !== "running") return;
      const t = ctx.currentTime + delayMs / 1000;
      if (confirm) {
        tone(t, 620, 500, 0.05, 0.14);
        tone(t + 0.08, 930, 780, 0.07, 0.1);
      } else tone(t, 760, 520, 0.04, 0.14);
    },
    close: () => void ctx?.close(),
  };
}

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
    const click = makeClick();
    const sound = el("button", "intro-sound", "Sound off") as HTMLButtonElement;
    sound.type = "button";
    sound.setAttribute("aria-label", "Sound");
    sound.tabIndex = -1; // the intro is hidden from screen readers; any key skips it anyway
    sound.setAttribute("aria-pressed", "false");
    sound.addEventListener("click", () => {
      const on = sound.getAttribute("aria-pressed") !== "true";
      sound.setAttribute("aria-pressed", String(on));
      sound.textContent = on ? "Sound on" : "Sound off";
      if (on) click.on();
      else click.off();
    });
    root.append(top, bottom, seam, count, meta, skip, sound, board);
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
    const spin = (word: string, confirm: boolean) => {
      const target = pad(word);
      let land = 0;
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
        land = Math.max(land, i * 10 + (280 + hops * 14) * 0.7);
      });
      click.play(land, confirm);
    };

    // ---- Timeline ----
    const at = [0];
    HOLDS.forEach((h) => at.push(at[at.length - 1] + h));
    WORDS.forEach((w, i) => later(() => spin(w, i === WORDS.length - 1), at[i]));
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
    [count, meta, skip, sound].forEach((n) => anim(n, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: splitAt, fill: "forwards" }));
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
      setTimeout(click.close, 1000);
    };

    later(unlockScroll, splitAt + 600);
    later(startCompose, splitAt + 450);
    later(() => {
      markSeen();
      finish();
    }, splitAt + 1100);

    // Skip straight to the page (except when pressing the sound button).
    const onSkip = (e: Event) => {
      if (e.target instanceof Element && e.target.closest(".intro-sound")) return;
      if (e instanceof KeyboardEvent && document.activeElement === sound && (e.key === "Enter" || e.key === " ")) return;
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
