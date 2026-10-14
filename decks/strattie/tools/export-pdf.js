// Usage: node tools/export-pdf.js <deck url> <out.pdf> [lean|reading]
// lean: one 1920x1080 page per slide. reading: each slide with its speaker notes underneath.
const { chromium } = require('playwright');
(async () => {
  const [url, out, mode = 'lean'] = process.argv.slice(2);
  const h = mode === 'reading' ? 1560 : 1080;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(url); await p.waitForTimeout(1200);
  await p.evaluate(m => window.deckPrint(m), mode);
  await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  await p.waitForTimeout(800);
  await p.pdf({ path: out, width: '1920px', height: h + 'px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await b.close();
})();
