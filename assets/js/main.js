const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if(navToggle){navToggle.addEventListener('click',()=>{navList.classList.toggle('open')});}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id)||document.querySelector(`[id="${id}"]`);
    if(el){e.preventDefault();el.scrollIntoView({behavior: prefersReduced?'auto':'smooth'});} 
  });
});

const revealEls=[...document.querySelectorAll('section, .card, .quote-list blockquote')];
revealEls.forEach(el=>el.setAttribute('data-reveal',''));
if(!prefersReduced && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target);}});
  },{threshold:.12});
  revealEls.forEach(el=>io.observe(el));
}else{revealEls.forEach(el=>el.classList.add('visible'));}

// carrossel removido

// painel de inserção e imagens removidos

// drop zone removida


const menuFloat=document.querySelector('.menu-float');
const menuBtn=document.querySelector('.menu-btn');
if(menuFloat&&menuBtn){
  menuBtn.addEventListener('click',()=>{
    const open=menuFloat.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open?'true':'false');
  });
  document.addEventListener('click',e=>{
    if(!menuFloat.contains(e.target)) menuFloat.classList.remove('open');
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape') menuFloat.classList.remove('open')});
  menuFloat.querySelectorAll('a[role="menuitem"]').forEach(a=>a.addEventListener('click',()=>menuFloat.classList.remove('open')));
}

const emailBtn=document.querySelector('.form-actions a[aria-label="Enviar e-mail"]');
if(emailBtn){
  emailBtn.addEventListener('click',async e=>{
    e.preventDefault();
    const form=document.getElementById('contato-form');
    const status=document.getElementById('contato-status');
    const endpoint=form?.dataset?.formEndpoint||'';
    const nome=form?.nome?.value?.trim()||'';
    const tel=form?.telefone?.value?.trim()||'';
    const mail=form?.email?.value?.trim()||'';
    const msg=form?.mensagem?.value?.trim()||'';
    if(endpoint){
      try{
        status.textContent='Enviando...';
        const fd=new FormData();
        fd.append('nome',nome);
        fd.append('telefone',tel);
        fd.append('email',mail);
        fd.append('mensagem',msg);
        fd.append('_replyto',mail);
        fd.append('_subject','Atendimento domiciliar');
        const res=await fetch(endpoint,{method:'POST',body:fd,headers:{'Accept':'application/json'}});
        if(res.ok){
          status.textContent='Mensagem enviada com sucesso!';
          form.reset();
        }else{
          status.textContent='Não foi possível enviar. Tente novamente.';
        }
      }catch(err){
        status.textContent='Erro ao enviar. Verifique sua conexão.';
      }
    }else{
      const subject='Atendimento domiciliar';
      const lines=[];
      if(nome) lines.push(`Nome: ${nome}`);
      if(tel) lines.push(`Telefone: ${tel}`);
      if(mail) lines.push(`E-mail: ${mail}`);
      if(msg) lines.push(`Mensagem: ${msg}`);
      const body=encodeURIComponent(lines.join('\n'));
      const mailto=`mailto:tatynevesqq@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href=mailto;
    }
  });
}
