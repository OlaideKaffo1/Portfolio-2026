// Ask Olaide: the floating chat card. Load it with
//   <script src="ask/ask.js" data-mode="home|read" defer></script>
// "home" shows the "Ask Olaide" pill once the hero's ask bar ([data-ask-hero]) has scrolled away;
// "read" (case studies and articles) shows the small "O." button. The chat carries across pages
// for the visit, and answers stream in from /api/ask.
(() => {
  if (window.AskOlaide && window.AskOlaide.ready) return;
  const script = document.currentScript;
  const ROOT = new URL("..", script.src).href; // the site root, from ask/ask.js
  const API = script.dataset.api || ROOT + "api/ask";
  const MODE = script.dataset.mode === "read" ? "read" : "home";
  const STORE = "ask-olaide";
  const EMAIL = "olaidearikekaffo@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/olaide-arike-kaffo-2333b8169";
  const CAP = 560;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SUGG = [
    ["The craft", "How do you design with code and AI?"],
    ["Judgment", "How do you decide what’s worth building?"],
    ["Impact", "Has your work moved revenue?"],
    ["Approach", "How do you tackle a complex problem?"],
  ];
  const POOL = [
    "How do you work with engineers and product?",
    "Walk me through a hard trade-off.",
    "How do you get a team behind a decision?",
    "Are you open to new roles?",
  ];
  const ALL = [...SUGG.map((s) => s[1]), ...POOL];

  // From knowledge/links.md
  const LINKS = {
    strattie: ["Solving the first-step problem", "Case study · Strategyzer AI", "case-studies/strattie/index.html", "images/projects/strategyzer-finder.webp"],
    "strategyzer-saas": ["Cutting a two-day workflow to thirty minutes", "Case study · Strategyzer", "case-studies/strategyzer-saas/index.html", "images/projects/strategyzer-saas.webp"],
    fount: ["Making speaking up at work worth it", "Case study · Fount", "case-studies/fount/index.html", "images/projects/fount.webp"],
    macrometa: ["No developer left to figure it out alone", "Case study · Macrometa", "case-studies/macrometa/index.html", "images/projects/macrometa-welcome.webp"],
    "only-designer": ["The Only Designer in the Room", "Article · 10 min read", "articles/only-designer/index.html", "articles/only-designer/images/skill-website-col.webp"],
    "prototypes-that-ship": ["Prototypes That Ship", "Article · 10 min read", "articles/prototypes-that-ship/index.html", "articles/prototypes-that-ship/images/fondui-skill.webp"],
  };
  const PROJECT = { strattie: "Strattie", "strategyzer-saas": "Strategyzer", fount: "Fount", macrometa: "Macrometa" };

  // ---------- State, kept for the visit so the chat follows the reader between pages ----------
  const load = () => {
    try { const s = JSON.parse(sessionStorage.getItem(STORE)); if (s && Array.isArray(s.turns)) return s; } catch (e) {}
    return null;
  };
  const newState = () => ({ id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random(), turns: [] });
  let state = load() || newState();
  const save = () => { try { sessionStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} };
  const answers = () => state.turns.length;

  // ---------- Markup ----------
  const icon = {
    min: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8h9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    close: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    x: '<svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    send: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 12.5v-9M4 7.5l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    fresh: '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.2 8a4.8 4.8 0 1 0 1.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4.4 2.4v2.4h2.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    more: '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  const ao = document.createElement("div");
  ao.id = "ask-olaide";
  ao.className = "ao-away" + (MODE === "read" ? " ao-mini" : "");
  ao.innerHTML = `
    <button class="ao-pill-undo" type="button">Undo</button>
    <div class="ao-pillwrap">
      <button class="ao-pill" type="button" aria-expanded="false" aria-controls="ao-card" aria-label="Ask Olaide"><span class="ao-av" aria-hidden="true">O.</span><span class="ao-pl"${MODE === "read" ? " hidden" : ""}>Ask Olaide</span><span class="ao-ct" hidden></span></button>
      <button class="ao-dismiss" type="button" aria-label="Hide Ask Olaide">${icon.x}</button>
    </div>
    <div class="ao-card" id="ao-card" role="dialog" aria-label="Ask Olaide" aria-modal="false">
      <div class="ao-ch"><span class="ao-av" aria-hidden="true">O.</span><span class="ao-nm">Ask Olaide</span>
        <div class="ao-ic">
          <button type="button" data-a="min" aria-label="Minimise, keeps your chat" title="Minimise">${icon.min}</button>
          <button type="button" data-a="end" aria-label="End chat" title="End chat">${icon.close}</button>
        </div>
      </div>
      <div class="ao-cb"></div>
      <button class="ao-latest" type="button">↓ Latest answer</button>
      <form class="ao-cf">
        <div class="ao-fubar" hidden></div>
        <label class="ao-inp"><input type="text" autocomplete="off" maxlength="500" placeholder="Ask about my work…" aria-label="Ask a question"><button type="submit" aria-label="Send" disabled>${icon.send}</button></label>
        <button type="button" class="ao-fresh" hidden>${icon.fresh}Start fresh</button>
      </form>
      <div class="ao-sr" role="status" aria-live="polite"></div>
    </div>`;
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("ask.css", script.src).href;
  document.head.appendChild(css);

  const $ = (s) => ao.querySelector(s);
  const card = $(".ao-card"), cb = $(".ao-cb"), pill = $(".ao-pill"), input = $(".ao-inp input"), send = $(".ao-inp button");
  const fubar = $(".ao-fubar"), fresh = $(".ao-fresh"), latest = $(".ao-latest"), sr = $(".ao-sr");
  const pillL = $(".ao-pl"), pillC = $(".ao-ct"), pillUndo = $(".ao-pill-undo");

  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // Bold figures, and the email and LinkedIn become links
  const curl = (t) => String(t).replace(/(\w)'(\w)/g, "$1’$2").replace(/(^|[\s(])"(?=\S)/g, "$1“").replace(/"/g, "”");
  const md = (t) =>
    esc(curl(t))
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\*\*/g, "")
      .replace(new RegExp(EMAIL.replace(/[.@]/g, "\\$&"), "g"), `<a href="mailto:${EMAIL}">${EMAIL}</a>`)
      .replace(/\bLinkedIn\b/g, `<a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>`);
  const stagger = (els, gap = 70) => els.forEach((el, i) => (reduced ? el.classList.add("ao-in") : setTimeout(() => el.classList.add("ao-in"), 40 + i * gap)));
  const rv = (el) => { el.classList.add("ao-rv"); return el; };
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  // ---------- Height: fit the content, stop at the cap ----------
  const isOpen = () => ao.classList.contains("ao-open");
  const fit = () => {
    if (!isOpen()) return;
    const kids = [...cb.children].filter((k) => !k.classList.contains("ao-pad"));
    const content = kids.length ? kids[kids.length - 1].offsetTop + kids[kids.length - 1].offsetHeight - kids[0].offsetTop + 42 : 0;
    const cap = Math.min(CAP, Math.round(innerHeight * 0.7));
    const h = $(".ao-ch").offsetHeight + content + $(".ao-cf").offsetHeight;
    card.style.height = Math.min(cap, Math.max(h, 280)) + "px";
  };

  // ---------- Welcome ----------
  const welcome = () => {
    cb.innerHTML = `<div class="ao-wl ao-rv"><div class="ao-hi">Hi, I’m Olaide! Think of this as a first conversation, whenever suits you.</div><p>Ask about my work, my thinking or my results.</p></div>
      <div class="ao-sugg">${SUGG.map(([l, t]) => `<button class="ao-sg ao-rv" type="button" data-q="${esc(t)}"><span><small>${l}</small>${esc(t)}</span><span class="ao-go" aria-hidden="true">↗</span></button>`).join("")}</div>
      <p class="ao-privacy ao-rv">Everything I share comes from my case studies and articles. I read these chats now and then to keep getting better at answering.</p>`;
    stagger([...cb.querySelectorAll(".ao-rv")], 60);
    requestAnimationFrame(fit);
  };

  // ---------- Drawing an answer (also while it streams) ----------
  const linkCard = (k) => {
    const L = LINKS[k];
    return `<a class="ao-lk" href="${ROOT}${L[2]}"><img src="${ROOT}${L[3]}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><span><span class="ao-tt" style="display:block">${esc(L[0])}</span><span class="ao-mt">${esc(L[1])}</span></span><span class="ao-go" aria-hidden="true">↗</span></a>`;
  };
  // Builds or updates the answer's blocks in place, so streamed text grows without redrawing
  const draw = (turn, a, done) => {
    let box = turn.querySelector(".ao-blocks");
    if (!box) { box = el("div", "ao-blocks"); turn.appendChild(box); }
    const added = [];
    const ensure = (sel, make) => { let e = box.querySelector(sel); if (!e) { e = rv(make()); box.appendChild(e); added.push(e); } return e; };
    if (a.source) ensure(".ao-src", () => el("div", "ao-src", esc(a.source))).textContent = a.source;
    const paras = (a.paragraphs || []).filter((p) => typeof p === "string" && p);
    if (paras.length) {
      const ans = ensure(".ao-ans", () => el("div", "ao-ans"));
      paras.forEach((p, i) => { let e = ans.children[i]; if (!e) { e = el("p"); ans.appendChild(e); } const h = md(p); if (e.innerHTML !== h) e.innerHTML = h; });
    }
    const rows = (a.fact_rows || []).filter((r) => r && PROJECT[r.project] && r.text);
    if (rows.length) {
      const pr = ensure(".ao-pr", () => el("div", "ao-pr"));
      rows.forEach((r, i) => {
        let e = pr.children[i];
        if (!e) { e = el("div", null, `<a href="${ROOT}${LINKS[r.project][2]}">${PROJECT[r.project]} <i aria-hidden="true">↗</i></a><p></p>`); pr.appendChild(e); }
        const h = md(r.text), p = e.querySelector("p"); if (p.innerHTML !== h) p.innerHTML = h;
      });
    }
    if (done) {
      const more = (a.more || []).filter(Boolean);
      if (more.length && !box.querySelector(".ao-tmore, .ao-moretext")) {
        const b = rv(el("button", "ao-tmore", `Tell me more ${icon.more}`)); b.type = "button"; box.appendChild(b); added.push(b);
      }
      [...new Set(a.links || [])].filter((k) => LINKS[k]).slice(0, 2).forEach((k) => {
        if (box.querySelector(`[data-k="${k}"]`)) return;
        const w = el("div", null, linkCard(k)).firstChild; w.dataset.k = k; rv(w); box.appendChild(w); added.push(w);
      });
    }
    if (added.length) stagger(added);
  };
  const expand = (turn, animate = true) => {
    const t = state.turns[+turn.dataset.i]; const b = turn.querySelector(".ao-tmore");
    if (!t || !b) return;
    const a = parse(t.raw) || {};
    const box = el("div", "ao-ans ao-moretext");
    (a.more || []).forEach((m) => box.appendChild(el("p", null, md(m))));
    b.replaceWith(box);
    t.expanded = true; save(); fit();
    if (animate) {
      rv(box); stagger([box]);
      setTimeout(() => { const top = box.offsetTop - cb.offsetTop - 60; if (top > cb.scrollTop) cb.scrollTo({ top, behavior: reduced ? "auto" : "smooth" }); }, 120);
    } else box.classList.add("ao-in");
  };

  // ---------- Reading streamed JSON before it's finished ----------
  // Closes any open string, array or object; if that still doesn't parse, trims back to the last
  // complete value and tries again.
  const parse = (s) => {
    try { return JSON.parse(s); } catch (e) {}
    for (let n = 0, cut = s; n < 6 && cut; n++) {
      let stack = [], str = false, escp = false;
      for (const c of cut) {
        if (str) { if (escp) escp = false; else if (c === "\\") escp = true; else if (c === '"') str = false; continue; }
        if (c === '"') str = true; else if (c === "{") stack.push("}"); else if (c === "[") stack.push("]"); else if (c === "}" || c === "]") stack.pop();
      }
      let t = cut;
      if (str) t = t.replace(/\\u[0-9a-fA-F]{0,3}$/, "").replace(/\\$/, "") + '"';
      try { return JSON.parse(t.replace(/[,:]\s*$/, "") + stack.reverse().join("")); } catch (e) {}
      const i = Math.max(cut.lastIndexOf(","), cut.lastIndexOf("["), cut.lastIndexOf("{"));
      cut = i < 0 ? "" : cut.slice(0, cut[i] === "," ? i : i + 1);
    }
    return null;
  };

  // ---------- Asking ----------
  let busy = false, ctrl = null;
  const page = () => (MODE === "read" ? document.title : "");
  const scrollToTurn = (turn) => cb.scrollTo({ top: turn.offsetTop - cb.offsetTop - 2, behavior: reduced ? "auto" : "smooth" });
  const keepRoom = (turn) => {
    // Room below the last answer, so the new question can sit at the top of the card
    let pad = cb.querySelector(".ao-pad"); if (!pad) { pad = el("div", "ao-pad"); pad.style.flex = "none"; }
    cb.appendChild(pad); pad.style.height = "0px"; fit();
    setTimeout(() => { const need = cb.clientHeight - (cb.scrollHeight - (turn.offsetTop - cb.offsetTop)) + 24; pad.style.height = Math.max(0, need) + "px"; scrollToTurn(turn); }, 440);
  };
  const turnEl = (q, i) => { const t = el("div", "ao-turn"); t.dataset.i = i; t.appendChild(el("div", "ao-ub", esc(q))); return t; };
  const errorText = (msg) => md(msg || `Something went wrong on my side. Please try again, or email me at ${EMAIL}.`);

  const ask = async (text) => {
    text = String(text || "").trim().slice(0, 500);
    if (!text || busy) return;
    if (/^tell me more\b/i.test(text)) { const last = [...cb.querySelectorAll(".ao-turn")].pop(); if (last && last.querySelector(".ao-tmore")) return expand(last); }
    busy = true; send.disabled = true;
    cb.querySelector(".ao-sugg")?.remove(); cb.querySelector(".ao-wl")?.remove(); cb.querySelector(".ao-privacy")?.remove();
    fubar.hidden = true;
    const i = state.turns.length;
    const turn = turnEl(text, i);
    const ub = rv(turn.firstChild);
    const wait = el("div", "ao-wait", "Looking through my case studies");
    turn.appendChild(wait);
    cb.appendChild(turn); stagger([ub], 0); fit();
    setTimeout(() => scrollToTurn(turn), 60);

    const history = state.turns.slice(-4).map((t) => ({ q: t.q, a: t.raw }));
    let raw = "", failed = null;
    ctrl = new AbortController();
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, history, conversation: state.id, page: page() }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        failed = (await res.json().catch(() => ({}))).message || "";
      } else {
        const reader = res.body.getReader(), dec = new TextDecoder();
        let drawn = false;
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          raw += dec.decode(value, { stream: true });
          if (raw.includes("\u0000error")) { raw = raw.split("\n\u0000error")[0]; failed = ""; break; }
          const a = parse(raw);
          if (a && ((a.paragraphs && a.paragraphs.length) || (a.fact_rows && a.fact_rows.length))) {
            if (!drawn) { wait.remove(); drawn = true; keepRoom(turn); }
            draw(turn, a, false); fit();
          }
        }
      }
    } catch (e) {
      if (e.name === "AbortError") return; // the chat was ended or restarted
      failed = "";
    } finally {
      ctrl = null;
    }

    wait.remove();
    let a = null;
    try { a = JSON.parse(raw); } catch (e) {}
    if (failed !== null || !a) {
      turn.querySelector(".ao-blocks")?.remove();
      const err = rv(el("p", "ao-err", errorText(failed)));
      turn.appendChild(err); stagger([err]); keepRoom(turn);
      sr.textContent = "The answer couldn't load.";
    } else {
      draw(turn, a, true);
      state.turns.push({ q: text, raw });
      save(); setPill();
      sr.textContent = "Answer ready.";
    }
    busy = false; send.disabled = !input.value.trim();
    bar(); fresh.hidden = !answers(); fit();
  };

  // Follow-ups pinned above the input: the suggested questions not yet asked
  const bar = () => {
    if (!answers()) { fubar.hidden = true; return; }
    const norm = (t) => t.toLowerCase().replace(/’/g, "'");
    const asked = new Set(state.turns.map((t) => norm(t.q)));
    let list = ALL.filter((t) => !asked.has(norm(t))); if (!list.length) list = ALL;
    fubar.innerHTML = list.map((t) => `<button class="ao-fu" type="button" data-q="${esc(t)}">${esc(t)}</button>`).join("");
    fubar.hidden = false; requestAnimationFrame(() => { fubar.scrollLeft = 0; fit(); });
  };

  // Rebuilds the conversation from the saved turns (opening on a new page, or after Undo)
  const rebuild = () => {
    cb.innerHTML = "";
    if (!answers()) return welcome();
    state.turns.forEach((t, i) => {
      const a = parse(t.raw); if (!a) return;
      const turn = turnEl(t.q, i); cb.appendChild(turn); draw(turn, a, true);
      if (t.expanded) expand(turn, false);
    });
    cb.querySelectorAll(".ao-rv").forEach((x) => x.classList.add("ao-in"));
    bar(); fresh.hidden = false;
  };

  // ---------- Open, minimise, end, start fresh ----------
  const setPill = (label) => {
    if (MODE === "read") { pillL.hidden = true; pillC.hidden = true; pill.setAttribute("aria-label", answers() ? `Continue chat, ${answers()} answers` : "Ask Olaide"); return; }
    pillL.textContent = label || (answers() ? "Continue chat" : "Ask Olaide");
    pillC.hidden = !answers() || !!label;
    pillC.textContent = "· " + answers() + (answers() === 1 ? " answer" : " answers");
  };
  const open = () => {
    if (isOpen()) return;
    ao.classList.add("ao-open"); pill.setAttribute("aria-expanded", "true");
    if (!cb.children.length) rebuild();
    requestAnimationFrame(() => { fit(); const last = [...cb.querySelectorAll(".ao-turn")].pop(); if (last) cb.scrollTop = cb.scrollHeight; });
    setTimeout(() => input.focus({ preventScroll: true }), 200);
    update();
  };
  const minimise = () => {
    ao.classList.remove("ao-open"); pill.setAttribute("aria-expanded", "false"); setPill();
    update(); if (!ao.classList.contains("ao-away")) pill.focus({ preventScroll: true });
  };
  let endSnap = null, endT;
  const endChat = () => {
    if (ctrl) ctrl.abort(); busy = false;
    if (!answers()) { cb.innerHTML = ""; return minimise(); }
    endSnap = state; state = newState(); save();
    cb.innerHTML = ""; fubar.hidden = true; fresh.hidden = true;
    ao.classList.remove("ao-open"); pill.setAttribute("aria-expanded", "false");
    setPill("Chat ended"); update();
    pillUndo.style.right = pill.offsetWidth + 8 + "px"; pillUndo.classList.add("ao-on");
    clearTimeout(endT);
    endT = setTimeout(() => { pillUndo.classList.remove("ao-on"); endSnap = null; setPill(); }, 6000);
  };
  pillUndo.addEventListener("click", () => {
    if (!endSnap) return; clearTimeout(endT);
    state = endSnap; endSnap = null; save(); pillUndo.classList.remove("ao-on");
    setPill(); open();
  });
  let freshSnap = null, freshT;
  const startFresh = () => {
    if (!answers()) return;
    if (ctrl) ctrl.abort(); busy = false;
    freshSnap = state; state = newState(); save();
    fubar.hidden = true; fresh.hidden = true; latest.classList.remove("ao-on");
    welcome(); setPill();
    cb.insertAdjacentHTML("afterbegin", `<div class="ao-undo-in" role="status"><span>Started fresh.</span><button type="button" data-undo>Undo</button></div>`); fit();
    clearTimeout(freshT);
    freshT = setTimeout(() => { const u = cb.querySelector(".ao-undo-in"); freshSnap = null; if (!u) return; u.classList.add("ao-out"); setTimeout(() => { u.remove(); fit(); }, 260); }, 6000);
  };
  const undoFresh = () => {
    if (!freshSnap) return; clearTimeout(freshT);
    state = freshSnap; freshSnap = null; save(); rebuild(); setPill(); fit();
    requestAnimationFrame(() => (cb.scrollTop = cb.scrollHeight));
  };

  // ---------- When the pill shows ----------
  // Home: after the hero's ask bar scrolls away. Everywhere: hidden near the footer, while scrolling
  // down on a phone, and after the hover ✕ (for this page view).
  let heroSeen = false, footerSeen = false, scrollingDown = false, dismissed = false;
  const phone = matchMedia("(max-width: 560px)");
  const update = () => {
    const away = !isOpen() && (dismissed || footerSeen || (phone.matches && scrollingDown) || (MODE === "home" && heroSeen && !answers()));
    ao.classList.toggle("ao-away", away);
    pill.tabIndex = away ? -1 : 0;
  };
  const watch = (target, fn) => { if (!target) return; new IntersectionObserver(([e]) => { fn(e.isIntersecting); update(); }).observe(target); };
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY, d = y - lastY;
    if (Math.abs(d) > 8) { scrollingDown = d > 0 && y > 80; lastY = y; update(); }
  }, { passive: true });
  $(".ao-dismiss").addEventListener("click", () => { dismissed = true; update(); });

  // ---------- Events ----------
  pill.addEventListener("click", open);
  ao.addEventListener("click", (e) => {
    const a = e.target.closest("[data-a]");
    if (a) return a.dataset.a === "min" ? minimise() : endChat();
    const q = e.target.closest(".ao-sg, .ao-fu"); if (q) return ask(q.dataset.q);
    const m = e.target.closest(".ao-tmore"); if (m) return expand(m.closest(".ao-turn"));
    if (e.target.closest("[data-undo]")) return undoFresh();
  });
  fresh.addEventListener("click", startFresh);
  input.addEventListener("input", () => { send.disabled = busy || !input.value.trim(); });
  $(".ao-cf").addEventListener("submit", (e) => { e.preventDefault(); const t = input.value.trim(); if (!t || busy) return; input.value = ""; send.disabled = true; ask(t); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen()) minimise(); });
  cb.addEventListener("scroll", () => { const t = [...cb.querySelectorAll(".ao-turn")].pop(); const below = t && t.offsetTop - cb.offsetTop > cb.scrollTop + cb.clientHeight - 60; latest.classList.toggle("ao-on", !!below); }, { passive: true });
  latest.addEventListener("click", () => { const t = [...cb.querySelectorAll(".ao-turn")].pop(); if (t) scrollToTurn(t); });
  addEventListener("resize", fit);

  // For the homepage's hero bar: window.AskOlaide.ask("question")
  const api = { ready: true, open, ask: (q) => { open(); if (q) setTimeout(() => ask(q), 120); } };

  const mount = () => {
    document.body.appendChild(ao);
    setPill();
    const hero = document.querySelector("[data-ask-hero]");
    heroSeen = MODE === "home" && !!hero;
    watch(hero, (v) => (heroSeen = v));
    const footers = document.querySelectorAll("footer"); watch(footers[footers.length - 1], (v) => (footerSeen = v));
    update();
    const queued = (window.AskOlaide && window.AskOlaide.q) || [];
    window.AskOlaide = api;
    queued.forEach((q) => api.ask(q));
  };
  document.body ? mount() : addEventListener("DOMContentLoaded", mount);
})();
