const $=s=>document.querySelector(s);
function timeline(){ $("#timeline").innerHTML=window.timeline.map(x=>`<article class="timeline-item reveal"><div class="timeline-date">${x.date}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join("") }
function gallery(){const a=memories.filter(x=>x.src),g=$("#gallery");$("#photoEmpty").style.display=a.length?"none":"block";g.innerHTML=a.map(x=>`<article class="photo" data-src="${x.src}" data-title="${x.title||""}"><img loading="lazy" src="${x.src}" alt="${x.title||"Memory"}><div class="photo-info"><strong>${x.title||""}</strong><small>${x.date||""}</small></div></article>`).join("");g.querySelectorAll(".photo").forEach(x=>x.onclick=()=>media(x.dataset.src,"img",x.dataset.title))}
function vids(){const g=$("#videosGrid");$("#videoEmpty").style.display=videos.length?"none":"block";g.innerHTML=videos.map(x=>`<article class="video" data-src="${x.src}" data-title="${x.title||""}"><div class="video-thumb">▶</div><h3>${x.title||"A moment"}</h3><p>${x.date||""} · ${x.description||""}</p></article>`).join("");g.querySelectorAll(".video").forEach(x=>x.onclick=()=>media(x.dataset.src,"video",x.dataset.title))}
function cards(){ $("#lettersGrid").innerHTML=letters.map(x=>`<article class="card reveal" data-text="${encodeURIComponent(x.text)}"><div class="tag">${x.tag}</div><h3>${x.title}</h3></article>`).join("");$("#openGrid").innerHTML=openWhen.map(x=>`<article class="card reveal" data-text="${encodeURIComponent(x.text)}"><div class="tag">${x.tag}</div><h3>${x.title}</h3></article>`).join("");document.querySelectorAll(".card").forEach(x=>x.onclick=()=>text(decodeURIComponent(x.dataset.text),x.querySelector("h3").textContent))}
function things(){ $("#things").innerHTML=thingsData.map((x,i)=>`<div class="thing reveal"><span>0${i+1}</span><p>${x}</p></div>`).join("") }
const thingsData=window.things;
function media(src,type,title){$("#modalContent").innerHTML=type==="img"?`<img src="${src}" alt="${title}">`:`<video src="${src}" controls autoplay playsinline></video>`;$("#modal").classList.add("open")}
function text(t,title){$("#modalContent").innerHTML=`<div class="modal-text"><p class="micro">${title}</p><p>${t}</p></div>`;$("#modal").classList.add("open")}
function close(){ $("#modal").classList.remove("open");$("#modalContent").innerHTML="" }
$("#close").onclick=close;$("#modal").onclick=e=>{if(e.target.id==="modal")close()};document.onkeydown=e=>{if(e.key==="Escape")close()};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
function observe(){document.querySelectorAll(".reveal").forEach(x=>io.observe(x))}
function days(){const n=Math.max(0,Math.floor((Date.now()-new Date("2026-02-17T00:00:00"))/86400000));$("#days").textContent=n}
$("#begin").onclick=()=>document.querySelector("#story").scrollIntoView({behavior:"smooth"});
$("#replay").onclick=()=>scrollTo({top:0,behavior:"smooth"});
let clicks=0;$("#secretBtn").onclick=()=>{clicks++;if(clicks<3)$("#secretBtn").textContent=`again... ${clicks}/3`;else text("If you found this, congratulations, moon. You officially explored too much. I love you. ♡","A SECRET FOR MY BABY")};
document.addEventListener("mousemove",e=>{const c=$(".cursor-glow");c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"});
const music=$("#music"),mb=$("#musicBtn");mb.onclick=()=>{if(!music.src){alert("Add your song to assets/audio and set music.src in js/app.js.");return}music.paused?music.play():music.pause()};
timeline();gallery();vids();cards();things();days();observe();
