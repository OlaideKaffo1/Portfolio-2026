// One scroll watcher for every reveal on the page. Units register as they mount,
// but nothing is watched until the page is "armed" (after the intro hands over),
// so content under the intro never plays early. Each unit plays once.

const pending = new Set<Element>();
const watched = new Set<Element>();
let io: IntersectionObserver | null = null;
let armed = false;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function show(el: Element) {
  el.classList.add("is-in");
  io?.unobserve(el);
  watched.delete(el);
}

// At the very bottom of the page nothing can scroll further into view, so play what's left.
function checkBottom() {
  const doc = document.documentElement;
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) watched.forEach(show);
}

function watch(el: Element) {
  if (reducedMotion()) return show(el);
  watched.add(el);
  io?.observe(el);
}

export function registerReveal(el: Element) {
  if (armed) watch(el);
  else pending.add(el);
  return () => {
    pending.delete(el);
    watched.delete(el);
    io?.unobserve(el);
  };
}

export function armReveals() {
  if (armed) return;
  armed = true;
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
    { threshold: 0, rootMargin: "0px 0px -18% 0px" },
  );
  pending.forEach(watch);
  pending.clear();
  window.addEventListener("scroll", checkBottom, { passive: true });
  checkBottom();
}
