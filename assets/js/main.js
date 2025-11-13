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

// Menu flutuante (mobile)
const menuFloat=document.querySelector('.menu-float');
const menuBtn=document.querySelector('.menu-btn');
if(menuBtn && menuFloat){
  menuBtn.addEventListener('click',()=>{
    const expanded=menuBtn.getAttribute('aria-expanded')==='true';
    menuBtn.setAttribute('aria-expanded',(!expanded).toString());
    if(menuFloat.hasAttribute('open')) menuFloat.removeAttribute('open');
    else menuFloat.setAttribute('open','');
  });
  document.addEventListener('click',(e)=>{
    if(!menuFloat.contains(e.target)){
      menuFloat.removeAttribute('open');
      menuBtn.setAttribute('aria-expanded','false');
    }
  });
}