(() => {
  const banner=document.querySelector('.service-banner');if(!banner)return;
  const slides=[
    {id:'envios',label:'ESTADOS UNIDOS → ECUADOR',title:'Tus compras.<br>Más cerca.',description:'Recibimos tus paquetes en Nueva York y coordinamos su envío a Ecuador.',cta:'Acceder a mi cuenta →',url:'cliente.html'},
    {id:'compras',label:'COMPRAS PERSONALIZADAS',title:'Tú lo eliges.<br>Nosotros lo compramos.',description:'Te ayudamos a encontrar y comprar tus productos favoritos en tiendas de Estados Unidos.',cta:'Conocer el servicio →',url:'#shopper'},
    {id:'maritimo',label:'CARGA MARÍTIMA',title:'Más espacio para<br>tus grandes planes.',description:'Coordinamos el envío de cajas grandes y compras para tu negocio hacia Ecuador.',cta:'Consultar opciones →',url:'https://wa.me/19726070561?text=Hola%20BELOURA%2C%20quiero%20consultar%20el%20servicio%20de%20carga%20mar%C3%ADtima.'},
    {id:'perfumes',label:'BELOURA · PERFUMERÍA',title:'Tu próxima<br>esencia.',description:'Descubre nuestra selección de 20 perfumes de diseñador y árabes.',cta:'Explorar perfumes →',url:'perfumes/'}
  ];
  const order=slides.map((_,i)=>i);for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  let current=0,timer,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pause=document.querySelector('#banner-pause');
  function show(){const s=slides[order[current]];banner.dataset.service=s.id;const image=document.querySelector('#banner-image');image.src='images/banner-'+s.id+'.jpg';image.alt={envios:'Paquetes preparados para envío',compras:'Ropa y accesorios en una tienda',maritimo:'Contenedores para transporte de carga',perfumes:'Perfumes Dior Sauvage y Lattafa Yara'}[s.id];document.querySelector('#banner-label').textContent=s.label;document.querySelector('#banner-title').innerHTML=s.title;document.querySelector('#banner-description').textContent=s.description;const link=document.querySelector('#banner-link');link.textContent=s.cta;link.href=s.url;document.querySelector('#banner-count').textContent=`${current+1} / ${slides.length}`;}
  function schedule(){clearInterval(timer);if(!paused&&!document.hidden&&!banner.matches(':hover')&&!banner.contains(document.activeElement))timer=setInterval(()=>{current=(current+1)%slides.length;show();},7000);}
  function state(){pause.textContent=paused?'Reanudar':'Pausar';pause.setAttribute('aria-pressed',String(paused));schedule();}
  document.querySelector('#banner-next').addEventListener('click',()=>{current=(current+1)%slides.length;show();schedule();});
  document.querySelector('#banner-prev').addEventListener('click',()=>{current=(current+slides.length-1)%slides.length;show();schedule();});
  pause.addEventListener('click',()=>{paused=!paused;state();});
  banner.addEventListener('mouseenter',()=>clearInterval(timer));banner.addEventListener('mouseleave',schedule);banner.addEventListener('focusin',()=>clearInterval(timer));banner.addEventListener('focusout',()=>setTimeout(schedule,0));document.addEventListener('visibilitychange',schedule);
  function reveal(hash){if(!hash||hash==='#')return;const target=document.getElementById(hash.slice(1));const panel=target?.closest('details');if(panel){panel.open=true;target.scrollIntoView({behavior:'auto',block:'start'});}}
  document.addEventListener('click',event=>{const link=event.target.closest('a[href^="#"]');if(link)reveal(link.getAttribute('href'));});
  window.addEventListener('hashchange',()=>reveal(location.hash));reveal(location.hash);show();state();
})();
