// Visitor analytics with PostHog and Google Analytics, on every page (homepage, case studies and articles).
// Both are cookieless: no cookies or stored IDs, so there's no consent banner. PostHog events go through
// /ingest on this domain (see next.config.ts), so ad blockers that block analytics domains don't drop them.
// Google Analytics runs in consent mode with storage denied, so it sends cookieless pings.
// The page sets window.__an = { posthog, ga } at build time from the POSTHOG_KEY and GA_ID env vars;
// each tool runs only when its value is set.
// Other scripts report events with window.olaideTrack("event_name", { ...props }); calls made before this
// script loads are queued on olaideTrack.q and sent once it starts.
// Visiting any page with ?me=1 stops tracking in that browser (your own visits); ?me=0 turns it back on.
(function () {
  var cfg = window.__an || {};
  var queued = (window.olaideTrack && window.olaideTrack.q) || [];
  var me = /[?&]me=([01])\b/.exec(location.search);
  try {
    if (me) me[1] === "1" ? localStorage.setItem("olaide-me", "1") : localStorage.removeItem("olaide-me");
    if (localStorage.getItem("olaide-me") === "1") cfg = {};
  } catch (e) {}
  var senders = [];
  if (cfg.posthog) senders.push(posthog(cfg.posthog));
  if (cfg.ga) senders.push(ga(cfg.ga));
  if (!senders.length) { window.olaideTrack = function () {}; return; }

  // now: send straight away rather than with the next batch, for clicks that leave the page
  var send = function (event, props, now) { senders.forEach(function (f) { f(event, props || {}, now); }); };
  var track = (window.olaideTrack = function (event, props) { send(event, props); });
  queued.forEach(function (c) { track(c[0], c[1]); });

  // Clicks worth naming: project and article cards, the next case study, resume, email and LinkedIn
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var track = function (event, props) { send(event, props, true); };
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

  function load(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
    return s;
  }

  function posthog(key) {
  // PostHog's loader: a stub that queues calls until /ingest/static/array.js loads and replays them
    var ph = (window.posthog = []);
    ph._i = [];
    ph.__SV = 1;
    ["capture", "register"].forEach(function (m) {
      ph[m] = function () { ph.push([m].concat([].slice.call(arguments))); };
    });
    ph.init = function (k, opts, n) { ph._i.push([k, opts, n]); };
    load("/ingest/static/array.js").crossOrigin = "anonymous";
    ph.init(key, {
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
    return function (event, props, now) { window.posthog.capture(event, props, now ? { send_instantly: true } : undefined); };
  }

  function ga(id) {
    window.dataLayer = window.dataLayer || [];
    var gtag = (window.gtag = function () { window.dataLayer.push(arguments); });
    // Consent mode with storage denied: no cookies, Google sends cookieless pings and models the rest
    gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    gtag("js", new Date());
    gtag("config", id);
    load("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id));
    return function (event, props) { gtag("event", event, props); };
  }
})();
