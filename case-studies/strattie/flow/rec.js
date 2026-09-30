const {chromium}=require('playwright-core');const path=require('path');const {spawn}=require('child_process');
const F='/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1000,height:653},deviceScaleFactor:2});
await p.goto('file://'+path.resolve('flow.html'));await p.waitForTimeout(800);await p.evaluate(()=>document.fonts.ready);
const T=await p.evaluate(()=>T), fps=30, n=Math.round(T*fps);
const ff=spawn(F,['-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-i','-','-vf','crop=2000:1304:0:0,format=yuv420p','-c:v','libx264','-preset','slow','-crf','20','-movflags','+faststart','raw.mp4']);
for(let i=0;i<n;i++){await p.evaluate(t=>render(t),i/fps);const buf=await p.screenshot({type:'png',clip:{x:0,y:0,width:1000,height:652.5}});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('frames',n);await b.close();})();
