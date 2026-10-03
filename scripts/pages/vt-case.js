(function(){var d=document.documentElement,w=window;
function fromUrl(){try{var a=w.navigation&&navigation.activation&&navigation.activation.from;if(a&&a.url)return a.url}catch(e){}return document.referrer||""}
function navType(){try{return navigation.activation.navigationType}catch(e){return""}}
try{sessionStorage.setItem("olaide-intro-seen","1")}catch(e){}
if("scrollRestoration"in history)history.scrollRestoration="manual";
function top(){if(scrollX||scrollY)scrollTo(0,0)}
var from=fromUrl(),site=from&&from.split("#")[0].indexOf(location.origin)===0,forward=site&&navType()!=="traverse"&&"onpagereveal"in w;
if(forward)d.classList.add("vt-arrive");
top();addEventListener("DOMContentLoaded",top);
addEventListener("pagereveal",function(e){top();var h=document.querySelector(".hero-img");
if(!e.viewTransition){d.classList.remove("vt-arrive");return}
if(!forward||!h){e.viewTransition.types.add("back");d.classList.remove("vt-arrive");return}
var img=h.querySelector("img");if(img&&!(img.complete&&img.naturalWidth))d.classList.add("vt-hold");
h.style.viewTransitionName="hero";
e.viewTransition.finished.finally(function(){h.style.viewTransitionName="";d.classList.remove("vt-hold");h.classList.add("in");d.classList.remove("vt-arrive")})});
addEventListener("pageshow",function(e){if(e.persisted){top();document.querySelectorAll(".hero-img,.next .thumb").forEach(function(x){x.style.viewTransitionName=""})}});
var clicked=null;document.addEventListener("click",function(e){clicked=e.target.closest&&e.target.closest("a")},true);
addEventListener("pageswap",function(e){if(!e.viewTransition)return;var to="";try{to=e.activation.entry.url}catch(x){}
var t=document.querySelector(".next .thumb"),n=document.querySelector("a.next");
if(t&&n&&(to?to.indexOf(n.getAttribute("href").replace(/^\.\.\//,""))>-1:clicked===n)){var r=t.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)t.style.viewTransitionName="hero"}});
var nx=document.querySelector("a.next");function warmNext(){var a=document.querySelector("a.next");if(!a||a.dataset.warm)return;a.dataset.warm=1;var i=new Image();i.src=a.getAttribute("data-hero")||"";var l=document.createElement("link");l.rel="prefetch";l.href=a.getAttribute("href");document.head.appendChild(l)}
addEventListener("load",function(){setTimeout(warmNext,2500)});
})();
