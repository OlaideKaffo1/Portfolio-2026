(function(){var d=document.documentElement,w=window;
function fromUrl(){try{var a=w.navigation&&navigation.activation&&navigation.activation.from;if(a&&a.url)return a.url}catch(e){}return document.referrer||""}
function navType(){try{return navigation.activation.navigationType}catch(e){return""}}
try{sessionStorage.setItem("olaide-intro-seen","1")}catch(e){}
if("scrollRestoration"in history)history.scrollRestoration="manual";
function top(){if(scrollX||scrollY)scrollTo(0,0)}
var from=fromUrl(),site=from&&from.split("#")[0].indexOf(location.origin)===0,forward=site&&navType()!=="traverse"&&"onpagereveal"in w;
if(forward)d.classList.add("vt-arrive");
top();addEventListener("DOMContentLoaded",top);
addEventListener("pagereveal",function(e){top();var p=document.querySelector(".ahead-bg");
if(!e.viewTransition){d.classList.remove("vt-arrive");return}
if(!forward||!p){e.viewTransition.types.add("back");d.classList.remove("vt-arrive");return}
p.style.viewTransitionName="panel";
e.viewTransition.finished.finally(function(){p.style.viewTransitionName="";p.classList.add("in");d.classList.remove("vt-arrive")})});
addEventListener("pageshow",function(e){if(e.persisted){top();document.querySelectorAll(".ahead-bg,.acard > *").forEach(function(x){x.style.viewTransitionName=""})}});
addEventListener("pageswap",function(e){if(!e.viewTransition)return;var to="";try{to=e.activation.entry.url}catch(x){}
var a=document.querySelector("a.acard"),b=a&&a.querySelector(".card-bg");
if(b&&to&&to.indexOf(a.getAttribute("href").replace(/^\.\.\//,""))>-1){var r=b.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){b.style.viewTransitionName="panel";[].slice.call(a.children).filter(function(c){return c!==b}).forEach(function(c,i){c.style.viewTransitionName="pt"+i})}}});
addEventListener("load",function(){setTimeout(function(){var a=document.querySelector("a.acard");if(!a)return;var l=document.createElement("link");l.rel="prefetch";l.href=a.getAttribute("href");document.head.appendChild(l)},2500)});
})();
