// Visitor analytics with Umami and Google Analytics, on every page (homepage, case studies and articles).
// Umami is cookieless. Google Analytics runs normally, with its own cookies: in cookieless consent mode it
// reports nothing for a site this size.
// The page sets window.__an = { umami, ga } at build time (see app/layout.tsx); each tool runs only when
// its value is set.
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
  if (cfg.umami) senders.push(umami(cfg.umami));
  if (cfg.ga) senders.push(ga(cfg.ga));
  if (!senders.length) { window.olaideTrack = function () {}; return; }

  var send = function (event, props) { senders.forEach(function (f) { f(event, props || {}); }); };
  var track = (window.olaideTrack = function (event, props) { send(event, props); });
  queued.forEach(function (c) { track(c[0], c[1]); });

  // Clicks worth naming: project and article cards, the next case study, resume, email and LinkedIn
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
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

  // How far down each page people read: 25, 50, 75 and 100%, once each per page view
  var depths = [25, 50, 75, 100], reached = {};
  addEventListener("scroll", function () {
    var max = document.documentElement.scrollHeight - innerHeight;
    if (max <= 0) return;
    var pct = (scrollY / max) * 100;
    depths.forEach(function (d) {
      if (pct >= d - 1 && !reached[d]) { reached[d] = 1; track("scroll_depth", { percent: d }); }
    });
  }, { passive: true });

  function load(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
    return s;
  }

  function umami(id) {
    // Umami's script counts page views itself; named events wait here until it has loaded
    var waiting = [];
    var s = load("https://cloud.umami.is/script.js");
    s.setAttribute("data-website-id", id);
    s.addEventListener("load", function () {
      waiting.forEach(function (e) { window.umami.track(e[0], e[1]); });
      waiting = [];
    });
    return function (event, props) {
      if (window.umami && window.umami.track) window.umami.track(event, props);
      else waiting.push([event, props]);
    };
  }

  function ga(id) {
    window.dataLayer = window.dataLayer || [];
    var gtag = (window.gtag = function () { window.dataLayer.push(arguments); });
    gtag("js", new Date());
    gtag("config", id);
    load("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id));
    return function (event, props) { gtag("event", event, props); };
  }
})();
