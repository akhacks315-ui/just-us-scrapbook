const $=s=>document.querySelector(s);

function renderTimeline(){const el=$("#timeline");if(!el||typeof timeline==="undefined")return;el.innerHTML=timeline.map(x=>`<article class="timeline-item reveal"><div class="timeline-date">${x.date}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join("")}
function gallery(){const g=$("#gallery"),empty=$("#photoEmpty");if(!g||typeof memories==="undefined")return;const a=memories.filter(x=>x.src);if(empty)empty.style.display=a.length?"none":"block";g.innerHTML=a.map(x=>`<article class="photo" data-src="${x.src}" data-title="${x.title||""}"><img loading="lazy" src="${x.src}" alt="${x.title||"Memory"}"><div class="photo-info"><strong>${x.title||""}</strong><small>${x.date||""}</small></div></article>`).join("");g.querySelectorAll(".photo").forEach(x=>x.onclick=()=>media(x.dataset.src,"img",x.dataset.title))}
function vids(){const g=$("#videosGrid"),empty=$("#videoEmpty");if(!g||typeof videos==="undefined")return;if(empty)empty.style.display=videos.length?"none":"block";g.innerHTML=videos.map(x=>`<article class="video" data-src="${x.src}" data-title="${x.title||""}"><div class="video-thumb">▶</div><h3>${x.title||"A moment"}</h3><p>${x.date||""} · ${x.description||""}</p></article>`).join("");g.querySelectorAll(".video").forEach(x=>x.onclick=()=>media(x.dataset.src,"video",x.dataset.title))}
function cards(){if(typeof letters!=="undefined"&&$("#lettersGrid"))$("#lettersGrid").innerHTML=letters.map(x=>`<article class="card reveal" data-text="${encodeURIComponent(x.text)}"><div class="tag">${x.tag}</div><h3>${x.title}</h3></article>`).join("");if(typeof openWhen!=="undefined"&&$("#openGrid"))$("#openGrid").innerHTML=openWhen.map(x=>`<article class="card reveal" data-text="${encodeURIComponent(x.text)}"><div class="tag">${x.tag}</div><h3>${x.title}</h3></article>`).join("");document.querySelectorAll(".card:not(.music-card)").forEach(x=>x.onclick=()=>text(decodeURIComponent(x.dataset.text),x.querySelector("h3").textContent))}
function renderThings(){const el=$("#things");if(!el||typeof things==="undefined")return;el.innerHTML=things.map((x,i)=>`<div class="thing reveal"><span>${String(i+1).padStart(2,"0")}</span><p>${x}</p></div>`).join("")}
function media(src,type,title){const content=$("#modalContent"),modal=$("#modal");if(!content||!modal)return;content.innerHTML=type==="img"?`<img src="${src}" alt="${title}">`:`<video src="${src}" controls autoplay playsinline></video>`;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function text(t,title){const content=$("#modalContent"),modal=$("#modal");if(!content||!modal)return;content.innerHTML=`<div class="modal-text"><p class="micro">${title}</p><p>${t}</p></div>`;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function close(){const modal=$("#modal"),content=$("#modalContent");if(modal){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}if(content)content.innerHTML=""}
const closeBtn=$("#close");if(closeBtn)closeBtn.onclick=close;const modal=$("#modal");if(modal)modal.onclick=e=>{if(e.target.id==="modal")close()};document.onkeydown=e=>{if(e.key==="Escape")close()};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});function observe(){document.querySelectorAll(".reveal").forEach((x,i)=>{x.style.transitionDelay=(Math.min(i%5,4)*75)+"ms";io.observe(x)})}
function days(){const el=$("#days");if(!el)return;const start=new Date("2026-02-17T00:00:00+05:30");const n=Math.max(0,Math.floor((Date.now()-start)/86400000));el.textContent=n.toLocaleString("en-IN")}
const begin=$("#begin");if(begin)begin.onclick=()=>{startBackgroundMusic();$("#story")?.scrollIntoView({behavior:"smooth"})};const replay=$("#replay");if(replay)replay.onclick=()=>scrollTo({top:0,behavior:"smooth"});
let clicks=0;const secretBtn=$("#secretBtn"),secretHint=$("#secretHint"),secretDots=$("#secretProgress");if(secretBtn)secretBtn.onclick=()=>{if(clicks>=3)return;clicks++;if(secretDots)secretDots.querySelectorAll("span").forEach((dot,i)=>dot.classList.toggle("active",i<clicks));if(clicks<3){secretBtn.textContent=clicks===1?"one more ✦":"last little try ✦";if(secretHint)secretHint.textContent=clicks===1?"A little closer...": "Okay, moon. One final try.";return}if(secretDots)secretDots.querySelectorAll("span").forEach(dot=>{dot.classList.remove("active");dot.classList.add("complete")});if(secretHint)secretHint.textContent="You found the note I hid for you. ♡";secretBtn.textContent="you found it ♡";secretBtn.disabled=true;text("If you are reading this, you explored every little corner I made for you. I hope you know that you never have to earn a place in my life. You already have it. I love you, my moon. And when life gets busy or difficult, come back here and remember: I am on your side. Always. ♡","A SECRET FOR MY BABY")};
document.addEventListener("mousemove",e=>{const c=$(".cursor-glow");if(c){c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"}});
let musicAudioContext=null,musicMaster=null,musicTimer=null,musicStep=0,musicPlaying=false;
const pianoNotes=[60,64,67,71,67,64,62,65,69,72,69,65,60,64,67,71,59,62,67,71,55,59,62,67,57,60,64,69,53,57,60,65];
function playPianoTone(midi,when,duration=.95,velocity=.12){
 if(!musicAudioContext||!musicMaster)return;
 const f=440*Math.pow(2,(midi-69)/12),now=when,voice=musicAudioContext.createGain();
 voice.gain.setValueAtTime(.0001,now);voice.gain.exponentialRampToValueAtTime(velocity,now+.012);voice.gain.exponentialRampToValueAtTime(velocity*.28,now+.16);voice.gain.exponentialRampToValueAtTime(.0001,now+duration);voice.connect(musicMaster);
 [[1,1],[2,.22],[3,.075],[4,.025]].forEach(([harmonic,level])=>{const osc=musicAudioContext.createOscillator(),g=musicAudioContext.createGain();osc.type=harmonic===1?"triangle":"sine";osc.frequency.setValueAtTime(f*harmonic,now);g.gain.value=level;osc.connect(g);g.connect(voice);osc.start(now);osc.stop(now+duration+.03)});
}
function playWarmPad(root,when){
 if(!musicAudioContext||!musicMaster)return;
 [root,root+7,root+12].forEach((n,i)=>{const osc=musicAudioContext.createOscillator(),gain=musicAudioContext.createGain();osc.type="sine";osc.frequency.value=440*Math.pow(2,(n-69)/12);gain.gain.setValueAtTime(.0001,when);gain.gain.linearRampToValueAtTime(i===0?.018:.009,when+1.1);gain.gain.setTargetAtTime(.0001,when+3.35,.65);osc.connect(gain);gain.connect(musicMaster);osc.start(when);osc.stop(when+5.8)});
}
function musicTick(){if(!musicAudioContext||!musicPlaying)return;const step=musicStep%32,roots=[48,43,45,41],root=roots[Math.floor(step/8)],note=pianoNotes[step],t=musicAudioContext.currentTime+.04;playPianoTone(note,t,.9,step%4===0?.105:.075);if(step%8===0)playWarmPad(root,t);musicStep++}
async function startBackgroundMusic(){
 const mb=$("#musicBtn");if(!musicAudioContext){const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx){if(mb)mb.title="This browser does not support background audio";return}musicAudioContext=new AudioCtx();musicMaster=musicAudioContext.createGain();musicMaster.gain.value=(Number($("#musicVolume")?.value||24)/100)*.55;musicMaster.connect(musicAudioContext.destination)}
 await musicAudioContext.resume();if(musicPlaying)return;musicPlaying=true;musicTick();musicTimer=setInterval(musicTick,690);if(mb){mb.textContent="♫";mb.setAttribute("aria-label","Pause background music");mb.title="Pause background music"}
}
function pauseBackgroundMusic(){musicPlaying=false;if(musicTimer){clearInterval(musicTimer);musicTimer=null}if(musicAudioContext?.state==="running")musicAudioContext.suspend();const mb=$("#musicBtn");if(mb){mb.textContent="♪";mb.setAttribute("aria-label","Play background music");mb.title="Play background music"}}
function setupMusic(){const mb=$("#musicBtn"),volume=$("#musicVolume");if(mb)mb.onclick=()=>musicPlaying?pauseBackgroundMusic():startBackgroundMusic().catch(()=>pauseBackgroundMusic());if(volume)volume.oninput=()=>{if(musicMaster)musicMaster.gain.setTargetAtTime((Number(volume.value)/100)*.55,musicAudioContext.currentTime,.08)}}
function setupMenu(){const menu=$("#mobileMenu"),open=$("#menuBtn"),closeBtn=$("#mobileClose");if(!menu||!open)return;const toggle=v=>{menu.classList.toggle("open",v);menu.setAttribute("aria-hidden",String(!v))};open.onclick=()=>toggle(true);if(closeBtn)closeBtn.onclick=()=>toggle(false);menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>toggle(false)))}
function setupProgress(){const bar=$("#progress");if(!bar)return;const update=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+"%"};addEventListener("scroll",update,{passive:true});update()}


function setupBirthdayCountdown(){
 const target=new Date("2026-12-03T00:00:00+05:30").getTime();
 const ids={days:$("#birthdayDays"),hours:$("#birthdayHours"),minutes:$("#birthdayMinutes"),seconds:$("#birthdaySeconds")};
 const status=$("#birthdayStatus");
 if(!ids.days||!ids.hours||!ids.minutes||!ids.seconds)return;
 const pad=n=>String(n).padStart(2,"0");
 const update=()=>{
  const now=Date.now(),remaining=target-now;
  if(remaining<=0){
   Object.values(ids).forEach(el=>el.textContent="00");
   if(status)status.textContent=now<target+86400000?"Today is your day. Happy birthday, my moon. ♡":"03 December — still celebrating you.";
   return;
  }
  const days=Math.floor(remaining/86400000);
  const hours=Math.floor(remaining%86400000/3600000);
  const minutes=Math.floor(remaining%3600000/60000);
  const seconds=Math.floor(remaining%60000/1000);
  ids.days.textContent=String(days);
  ids.hours.textContent=pad(hours);
  ids.minutes.textContent=pad(minutes);
  ids.seconds.textContent=pad(seconds);
 };
 update();
 setInterval(update,1000);
}

function setupEnding(){const curtain=$("#ending"),open=$("#openEnding"),close=$("#closeEnding");if(!curtain||!open||!close)return;const set=v=>{curtain.classList.toggle("open",v);curtain.setAttribute("aria-hidden",String(!v));document.body.classList.toggle("ending-open",v)};open.onclick=()=>set(true);close.onclick=()=>set(false);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&curtain.classList.contains("open"))set(false)})}
function setupHeroDrift(){if(matchMedia("(prefers-reduced-motion: reduce)").matches||matchMedia("(pointer: coarse)").matches)return;const hero=$(".hero");if(!hero)return;hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty("--orbit-x",(x*-13)+"px");hero.style.setProperty("--orbit-y",(y*-13)+"px")});hero.addEventListener("pointerleave",()=>{hero.style.setProperty("--orbit-x","0px");hero.style.setProperty("--orbit-y","0px")})}
function init(){document.documentElement.classList.add("js-ready");try{renderTimeline()}catch(e){console.error("timeline",e)}try{gallery()}catch(e){console.error("gallery",e)}try{vids()}catch(e){console.error("videos",e)}try{cards()}catch(e){console.error("cards",e)}try{renderThings()}catch(e){console.error("things",e)}try{days()}catch(e){console.error("days",e)}try{observe();setTimeout(()=>document.querySelectorAll(".reveal").forEach(x=>x.classList.add("visible")),1800)}catch(e){console.error("observe",e);document.querySelectorAll(".reveal").forEach(x=>x.classList.add("visible"))}try{setupMusic()}catch(e){console.error("music",e)}try{setupMenu()}catch(e){console.error("menu",e)}try{setupProgress()}catch(e){console.error("progress",e)}try{setupHeroDrift()}catch(e){console.error("hero drift",e)}try{setupEnding()}catch(e){console.error("ending",e)}try{setupBirthdayCountdown()}catch(e){console.error("birthday countdown",e)}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
