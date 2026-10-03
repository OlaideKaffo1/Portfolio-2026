// Visitor analytics with PostHog, on every page (homepage, case studies and articles).
// Cookieless: no cookies or stored IDs, so there's no consent banner. Events go through /ingest on this
// domain (see next.config.ts), so ad blockers that block analytics domains don't drop them.
// The page sets window.__ph = { key } at build time from the POSTHOG_KEY env var; without it, nothing runs.
// Other scripts report events with window.olaideTrack("event_name", { ...props }); calls made before this
// script loads are queued on olaideTrack.q and sent once it starts.
// Visiting any page with ?me=1 stops tracking in that browser (your own visits); ?me=0 turns it back on.
(function () {
  var cfg = window.__ph;
  var queued = (window.olaideTrack && window.olaideTrack.q) || [];
  var me = /[?&]me=([01])\b/.exec(location.search);
  try {
    if (me) me[1] === "1" ? localStorage.setItem("olaide-me", "1") : localStorage.removeItem("olaide-me");
    if (localStorage.getItem("olaide-me") === "1") cfg = null;
  } catch (e) {}
  if (!cfg || !cfg.key) { window.olaideTrack = function () {}; return; }

  // PostHog's loader: a stub that queues calls until /ingest/static/array.js loads and replays them
  var ph = (window.posthog = []);
  ph._i = [];
  ph.__SV = 1;
  ["capture", "register"].forEach(function (m) {
    ph[m] = function () { ph.push([m].concat([].slice.call(arguments))); };
  });
  ph.init = function (key, opts, name) { ph._i.push([key, opts, name]); };
  var s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "/ingest/static/array.js";
  document.head.appendChild(s);

  ph.init(cfg.key, {
    api_host: "/ingest",
    defaults: "2026-01-30",
    cookieless_mode: "always",
    person_profiles: "identified_only",
    capture_pageleave: true, // the page-leave event carries how far down the page the visitor scrolled
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
  });

  // window.posthog, not ph: once loaded, PostHog replaces the stub with the real thing
  var track = (window.olaideTrack = function (event, props) { window.posthog.capture(event, props || {}); });
  queued.forEach(function (c) { track(c[0], c[1]); });

  // Clicks worth naming: project and article cards, the next case study, resume, email and LinkedIn.
  // These often leave the page, so they're sent straight away rather than with the next batch.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var track = function (event, props) { window.posthog.capture(event, props, { send_instantly: true }); };
    var href = a.getAttribute("href");
    var where = a.closest("#ask-olaide") ? "chat" : "page";
    if (a.closest("#ask-olaide .ao-lk")) track("chat_link_clicked", { to: href });
    if (a.dataset.slug) track("card_clicked", { kind: "case study", slug: a.dataset.slug });
    else if (a.dataset.article) track("card_clicked", { kind: "article", slug: a.dataset.article });
    else if (a.classList.contains("next")) track("next_case_clicked", { to: href });
    if (/\.pdf$/i.test(href)) track("resume_opened", { where: where });
    else if (/^mailto:/i.test(href)) track("email_clicked", { where: where });
    else if (/linkedin\.com/i.test(href)) track("linkedin_clicked", { where: where });
  }, true);

  // Videos a visitor chooses to play (not the looping screen recordings): plays and how far they watch
  var marks = [25, 50, 75, 90];
  var watched = new WeakMap();
  var name = function (v) { return (v.currentSrc || "").split("/").pop().replace(/\.\w+$/, ""); };
  var chosen = function (v) { return v.tagName === "VIDEO" && !v.loop && !v.autoplay; };
  document.addEventListener("play", function (e) {
    var v = e.target;
    if (!chosen(v)) return;
    if (!watched.has(v)) watched.set(v, {});
    track("video_played", { video: name(v), from_second: Math.round(v.currentTime) });
  }, true);
  document.addEventListener("timeupdate", function (e) {
    var v = e.target, seen = watched.get(v);
    if (!seen || !chosen(v) || !v.duration) return;
    var pct = (v.currentTime / v.duration) * 100;
    marks.forEach(function (m) {
      if (pct >= m && !seen[m]) { seen[m] = 1; track("video_progress", { video: name(v), percent: m }); }
    });
  }, true);
  document.addEventListener("ended", function (e) {
    if (chosen(e.target)) track("video_completed", { video: name(e.target) });
  }, true);
})();
