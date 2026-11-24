(()=>{'use strict';
const ids=['home','gift','letter','reasons','universe','secret','finale'];
let activeIndex=0;
const setIndex=()=>{activeIndex=ids.findIndex(id=>document.getElementById(id)?.classList.contains('active'));};
document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>setIndex()));

document.addEventListener('keydown',event=>{
  setIndex();
  if(event.key==='ArrowRight'||event.key==='PageDown'){
    event.preventEvent?.();
    const next=Math.min(ids.length-1,activeIndex+1);
    document.querySelector(`[data-go="${ids[next]}"]`)?.click();
  }
  if(event.key==='ArrowLeft'||event.key==='PageUp'){
    const previous=Math.max(0,activeIndex-1);
    document.querySelector(`[data-go="${ids[previous]}"]`)?.click();
  }
});

const music=document.getElementById('music');
const musicToggle=document.getElementById('musicToggle');
music?.addEventListener('error',()=>{if(musicToggle)musicToggle.title='Ajoutez assets/music.mp3 pour activer la musique'});

const memories=[...document.querySelectorAll('.memory')];
memories.forEach((memory,index)=>{
  memory.style.transitionDelay=`${index*90}ms`;
  const placeholder=memory.querySelector('.photo-placeholder');
  if(placeholder)placeholder.setAttribute('role','img');
});

const letter=document.getElementById('letterPaper');
letter?.addEventListener('scroll',()=>{
  const progress=letter.scrollHeight>letter.clientHeight?letter.scrollTop/(letter.scrollHeight-letter.clientHeight):1;
  if(progress>.92)letter.style.boxShadow='0 30px 90px #5f414633, inset 0 -24px 28px rgba(128,61,71,.05)';
});

setIndex();
})();
