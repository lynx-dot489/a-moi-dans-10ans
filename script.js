(()=>{'use strict';
const panels=[...document.querySelectorAll('.panel')];
const navButtons=[...document.querySelectorAll('.chapter-nav button')];
const ids=['home','gift','letter','reasons','universe','secret','finale'];

function go(id){
  const target=document.getElementById(id); if(!target)return;
  panels.forEach(p=>p.classList.toggle('active',p===target));
  navButtons.forEach(b=>b.classList.toggle('active',b.dataset.go===id));
  window.scrollTo({top:0,behavior:'smooth'});
  target.queryScroll?.();
  if(id==='finale')celebrate(55);
}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

const giftBox=document.getElementById('giftBox');
function openGift(){
  if(giftBox.classList.contains('open'))return;
  giftBox.classList.add('open');
  document.getElementById('giftHint').textContent='Une petite surprise vient de s’allumer...';
  celebrate(34);
  setTimeout(()=>go('letter'),1500);
}
giftBox.addEventListener('click',openGift);

const envelope=document.getElementById('envelope');
const letter=document.getElementById('letterPaper');
function openEnvelope(){envelope.classList.add('open');letter.classList.add('open');envelope.setAttribute('aria-expanded','true')}
envelope.addEventListener('click',openEnvelope);
document.querySelector('.close-letter').addEventListener('click',()=>{letter.classList.remove('open');setTimeout(()=>envelope.classList.remove('open'),300)});
letter.querySelector('.letter-copy').addEventListener('dblclick',()=>go('reasons'));letter.addEventListener('wheel',(e)=>{if(e.deltaY>0&&letter.scrollTop+letter.clientHeight>=letter.scrollHeight-20)setTimeout(()=>go('reasons'),700)},{passive:true});

const reasons=[
 ['Tu es mon soleil','Même en journée pluvieuse, tu trouves le moyen de faire revenir un rayon.'],
 ['Ton rire est contagieux','Une vraie sonnette d’alarme contre les mauvaises journées.'],
 ['Tu sais écouter','Pas seulement avec les oreilles. Avec tout ce que tu es.'],
 ['Tu es honnête','Tu dis les choses avec cette franchise douce qui fait grandir.'],
 ['Tu transformes l’ordinaire','Même une simple conversation devient une histoire à raconter.'],
 ['Tu es courageuse','Même quand personne ne voit les batailles que tu dois gagner.'],
 ['Tu es profondément vraie','Dans un monde qui joue des rôles, tu restes merveilleusement toi.'],
 ['Tu sais rendre heureux','Souvent sans le savoir, juste avec ta façon d’exister.'],
 ['Tu es ma personne','La phrase est simple. La valeur qu’elle porte ne l’est pas.'],
 ['Tu es irremplaçable','Parce qu’il n’existe qu’une seule Flore — heureusement pour nous.']
];
const grid=document.getElementById('reasonGrid');
reasons.forEach((r,i)=>{const b=document.createElement('button');b.className='reason-card';b.type='button';b.setAttribute('aria-label','Retourner la raison '+(i+1));b.innerHTML=`<div class="reason-inner"><div class="reason-front"><span>${String(i+1).padStart(2,'0')}</span><strong>${r[0]}</strong></div><div class="reason-back">${r[1]}</div></div>`;b.addEventListener('click',()=>b.classList.toggle('flipped'));grid.appendChild(b)});

const secretButton=document.getElementById('secretButton');
const secretMessage=document.getElementById('secretMessage');
secretButton.addEventListener('click',()=>{secretButton.classList.add('open');secretMessage.classList.add('open');secretMessage.setAttribute('aria-hidden','false');document.querySelector('.secret-panel').style.background='linear-gradient(135deg,#2f2526,#52383a)';celebrate(40)});

const music=document.getElementById('music');
const musicToggle=document.getElementById('musicToggle');
const volume=document.getElementById('volume');music.volume=Number(volume.value);
volume.addEventListener('input',()=>music.volume=Number(volume.value));
musicToggle.addEventListener('click',async()=>{try{if(music.paused){await music.play();musicToggle.classList.add('playing');musicToggle.setAttribute('aria-pressed','true');musicToggle.setAttribute('aria-label','Mettre la musique en pause')}else{music.pause();musicToggle.classList.remove('playing');musicToggle.setAttribute('aria-pressed','false');musicToggle.setAttribute('aria-label','Activer la musique')}}catch(e){musicToggle.title='Ajoute ton fichier assets/music.mp3'}});

const canvas=document.getElementById('petals');const ctx=canvas.getContext('2d');let petals=[];
function sizeCanvas(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}sizeCanvas();addEventListener('resize',sizeCanvas);
function petal(){return{x:Math.random()*innerWidth,y:-20,vy:.35+Math.random()*1.1,vx:(Math.random()-.5)*.45,size:5+Math.random()*7,angle:Math.random()*6.28,spin:(Math.random()-.5)*.05,life:0}} 
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);petals.forEach(p=>{p.y+=p.vy;p.x+=p.vx;p.angle+=p.spin;p.life++;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle='rgba(220,158,167,.38)';ctx.beginPath();ctx.ellipse(0,0,p.size,p.size*.55,0,0,Math.PI*2);ctx.fill();ctx.restore()});petals=petals.filter(p=>p.y<innerHeight+30&&p.life<900);requestAnimationFrame(animate)}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!reduced)setInterval(()=>{if(petals.length<18&&document.getElementById('home').classList.contains('active'))petals.push(petal())},600);animate();

function celebrate(amount){if(reduced)return;for(let i=0;i<amount;i++){setTimeout(()=>{const p=document.createElement('i');p.style.cssText=`position:fixed;z-index:100;left:${30+Math.random()*40}%;top:45%;width:${3+Math.random()*5}px;height:${7+Math.random()*8}px;border-radius:70%;background:${['#d9a75f','#c98790','#fff4ec','#9d626b'][i%4]};pointer-events:none`;const dx=(Math.random()-.5)*innerWidth*.8,dy=-180-Math.random()*innerHeight*.7;p.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*720-360}deg)`,opacity:0}],{duration:1800+Math.random()*900,easing:'cubic-bezier(.1,.7,.2,1)',fill:'forwards'});p.addEventListener('animationend',()=>p.remove());document.body.appendChild(p)},i*12)}}
document.getElementById('celebrate').addEventListener('click',()=>celebrate(80));

navButtons[0].classList.add('active');
})();
