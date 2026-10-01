const {chromium}=require('playwright-core');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1000,height:600},deviceScaleFactor:2});
await p.goto('file://'+process.env.SP+'/oldway/oldway.html');await p.waitForTimeout(400);
for(const id of ['s04a','s05a','s06a','s07a','s09a','s10a']){await p.locator('#'+id).screenshot({path:`${process.env.SP}/oldway/${id}.png`});}
await b.close();})();
