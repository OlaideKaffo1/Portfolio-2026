const {chromium}=require('playwright-core');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1000,height:653},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve('flow.html'));await p.waitForTimeout(800);await p.evaluate(()=>document.fonts.ready);
for(const t of process.argv.slice(2)){await p.evaluate(t=>render(+t),t);await p.screenshot({path:`k-${t}.png`,clip:{x:0,y:0,width:1000,height:652.5}});}
console.log(errs);await b.close();})();
