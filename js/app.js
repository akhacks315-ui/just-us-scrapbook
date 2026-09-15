const $=s=>document.querySelector(s);

function renderTimeline(){
  const el=$("#timeline");
  if(!el || typeof timeline==="undefined") return;
  el.innerHTML=timeline.map(x=>`<article class="timeline-item reveal"><div class="timeline-date">${x.date}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join("");
}

function gallery(){
  const g=$("#gallery"), empty=$("#photoEmpty");
  if(!g || typeof memories==="undefined") return;
  const a=memories.filter(x=>x.src);
  if(empty) empty.style.display=a.length?"none":"block";
  g.innerHTML=a.map(x=>`<article class="photo" data-src="${x.src}" data-title="${x.title||""}"><img loading="lazy" src="${x.src}" alt="${x.title||"Memory"}"><div class="photo-info"><strong>${x.title||""}</strong><small>${x.date||""}</small></div></article>`).join("");
  g.querySelectorAll(".photo").forEach(x=>x.onclick=()=>media(x.dataset.src,"img",x.dataset.title));
}

function vids(){
  const g=$("#videosGrid"), empty=$("#videoEmpty");
  if(!g || typeof videos==="undefined") return;
  if(empty) empty.style.display=videos.length?"none":"block";
  g.innerHTML=videos.map(x=>`<article class="video" data-src="${x.src}" data-title="${x.title||""}"><div class="video-thumb">▶</div><h3>${x.title||"A moment"}</h3><p>${x.date||""} · ${x.description||""}</p></article>`).join("");
  g.querySelectorAll(".video").forEach(x=>x.onclick=()=>media(x.dataset.src,"video",x.dataset.title));
}

function cards(){
  if(typeof letters!=="undefined" && $("#lettersGrid")) $("#lettersGrid").innerHTML=letters.map(x=>`<article class="card reveal" data-text="${encodeURIComponent(x.text)}"><div class="tag">${x.tag}</div><h3>${x.title}</h3></article>`).join("");
  if(typeof openWhen!=="undefined" && $("#openGrid")) $("#openGrid").innerHTML=openWhen.map(x=>`<article class="card reveal" data-text="${encodeURIComponent(x.text)}"><div class="tag">${x.tag}</div><h3>${x.title}</h3></article>`).join("");
  document.querySelectorAll(".card").forEach(x=>x.onclick=()=>text(decodeURIComponent(x.dataset.text),x.querySelector("h3").textContent));
}

function renderThings(){
  const el=$("#things");
  if(!el || typeof things==="undefined") return;
  el.innerHTML=things.map((x,i)=>`<div class="thing reveal"><span>0${i+1}</span><p>${x}</p></div>`).join("");
}

function media(src,type,title){
  const content=$("#modalContent"),modal=$("#modal");
  if(!content || !modal) return;
  content.innerHTML=type==="img"?`<img src="${src}" alt="${title}">`:`<video src="${src}" controls autoplay playsinline></video>`;
  modal.classList.add("open");
}

function text(t,title){
  const content=$("#modalContent"),modal=$("#modal");
  if(!content || !modal) return;
  content.innerHTML=`<div class="modal-text"><p class="micro">${title}</p><p>${t}</p></div>`;
  modal.classList.add("open");
}

function close(){
  const modal=$("#modal"),content=$("#modalContent");
  if(modal) modal.classList.remove("open");
  if(content) content.innerHTML="";
}

const closeBtn=$("#close");
if(closeBtn) closeBtn.onclick=close;
const modal=$("#modal");
if(modal) modal.onclick=e=>{if(e.target.id==="modal")close()};
document.onkeydown=e=>{if(e.key==="Escape")close()};

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
function observe(){document.querySelectorAll(".reveal").forEach(x=>io.observe(x))}

function days(){
  const el=$("#days");
  if(!el) return;
  const n=Math.max(0,Math.floor((Date.now()-new Date("2026-02-17T00:00:00"))/86400000));
  el.textContent=n;
}

const begin=$("#begin");
if(begin) begin.onclick=()=>document.querySelector("#story")?.scrollIntoView({behavior:"smooth"});
const replay=$("#replay");
if(replay) replay.onclick=()=>scrollTo({top:0,behavior:"smooth"});

let clicks=0;
const secretBtn=$("#secretBtn");
if(secretBtn) secretBtn.onclick=()=>{clicks++;if(clicks<3)secretBtn.textContent=`again... ${clicks}/3`;else text("If you found this, congratulations, moon. You officially explored too much. I love you. ♡","A SECRET FOR MY BABY")};

document.addEventListener("mousemove",e=>{const c=$(".cursor-glow");if(c){c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"}});

const music=$("#music"),mb=$("#musicBtn");
if(music){
  music.src="assets/audio/background.mp3";
  music.loop=true;
  music.preload="auto";
  music.volume=0.28;
}
if(mb) mb.onclick=()=>{
  if(!music) return;
  if(music.paused){
    music.play().then(()=>{mb.textContent="♪ playing"}).catch(()=>{mb.textContent="♪ play"});
  }else{
    music.pause();
    mb.textContent="♪ music";
  }
};

function init(){
  try{renderTimeline()}catch(e){console.error("timeline",e)}
  try{gallery()}catch(e){console.error("gallery",e)}
  try{vids()}catch(e){console.error("videos",e)}
  try{cards()}catch(e){console.error("cards",e)}
  try{renderThings()}catch(e){console.error("things",e)}
  try{days()}catch(e){console.error("days",e)}
  try{observe()}catch(e){console.error("observe",e)}
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
