const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(process.argv[2]); await p.waitForTimeout(1200);
  await p.evaluate(() => window.deckPrint());
  await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  await p.waitForTimeout(800);
  const n = await p.evaluate(() => document.querySelectorAll('.slide').length);
  await p.pdf({ path: process.argv[3], width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
  console.log('slides', n); await b.close();
})();
