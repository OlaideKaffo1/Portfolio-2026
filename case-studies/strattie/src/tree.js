  // Routing tree, drawn to its real counts
  document.querySelectorAll("[data-tree] svg").forEach((svg) => {
    const H = 340, X = [8, 300, 600, 892];
    const L = [5, 17, 45, 19].map((n, li) => Array.from({ length: n }, (_, i) => ({ x: X[li], y: 8 + (i * (H - 16)) / (n - 1) })));
    const par = (i, n, pn) => Math.min(pn - 1, Math.floor(((i + 0.5) * pn) / n));
    const pb = (i) => Math.min(18, Math.floor(((i + 0.5) * 19) / 45));
    const hot = [0, 0, 0, 6];
    hot[2] = L[2].findIndex((_, i) => pb(i) === hot[3]); hot[1] = par(hot[2], 45, 17); hot[0] = par(hot[1], 17, 5);
    const curve = (a, b, on, l) => { const m = (a.x + b.x) / 2; return `<path pathLength="1" class="${on ? "hot" : ""}" style="--l:${l}" d="M${a.x},${a.y} C${m},${a.y} ${m},${b.y} ${b.x},${b.y}"/>`; };
    let out = "";
    for (let li = 1; li < 3; li++) L[li].forEach((p, i) => { const pi = par(i, L[li].length, L[li - 1].length); out += curve(L[li - 1][pi], p, hot[li] === i && hot[li - 1] === pi, li - 1); });
    L[2].forEach((p, i) => (out += curve(p, L[3][pb(i)], hot[2] === i, 2)));
    L.forEach((layer, li) => layer.forEach((p, i) => (out += `<circle class="${hot[li] === i ? "hot" : ""}" style="--l:${li}" cx="${p.x}" cy="${p.y}" r="${li === 2 ? 2.6 : 4.5}"/>`)));
    svg.innerHTML = out;
  });

