import {products} from './catalog.js';
const $=s=>document.querySelector(s), money=c=>'$'+(c/100).toFixed(2), key='beloura-perfumes-v1';
const byId=new Map(products.map(p=>[p.id,p]));
let cart={},category='all',timer;
try {const saved=JSON.parse(localStorage.getItem(key));if(saved&&typeof saved==='object')for(const [id,q] of Object.entries(saved))if(byId.has(id)&&Number.isInteger(q)&&q>0&&q<=99)cart[id]=q;}catch{}
function save(){try{localStorage.setItem(key,JSON.stringify(cart));}catch{} renderCart();}
function announce(message){$('#toast').textContent=message;clearTimeout(timer);timer=setTimeout(()=>$('#toast').textContent='',2800);}
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function renderProducts(){
 const query=normalize($('#search').value.trim());
 let visible=products.filter(p=>(category==='all'||p.category===category)&&normalize(p.brand+' '+p.name).includes(query));
 const order=$('#sort').value;if(order!=='default')visible.sort((a,b)=>order==='low'?a.price-b.price:b.price-a.price);
 $('#result-count').textContent=`${visible.length} perfumes`;
 $('#no-results').hidden=visible.length>0;
 $('#products').innerHTML=visible.map(p=>`<article class="card"><div class="photo"><img src="images/${p.id}.jpg" alt="${p.brand} ${p.name}" loading="lazy" width="400" height="450"><span class="tag">${p.category==='designer'?'Diseñador':'Árabe'}</span></div><p class="brand">${p.brand}</p><h3>${p.name}</h3><p class="details">${p.type} · ${p.size}</p><div class="card-bottom"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}" aria-label="Agregar ${p.name} a mi selección">Agregar +</button></div></article>`).join('');
}
function renderCart(){
 const entries=Object.entries(cart);const count=entries.reduce((n,[,q])=>n+q,0);const total=entries.reduce((n,[id,q])=>n+byId.get(id).price*q,0);
 $('#cart-count').textContent=count;$('#cart-total').textContent=money(total);
 $('#cart-items').innerHTML=entries.length?entries.map(([id,q])=>{const p=byId.get(id);return `<div class="cart-row"><img src="images/${id}.jpg" alt=""><div><h3>${p.brand} · ${p.name}</h3><p>${p.type} · ${p.size}</p><p>${money(p.price)} × ${q} = <strong>${money(p.price*q)}</strong></p><div class="quantity"><button data-minus="${id}" aria-label="Quitar una unidad de ${p.name}">−</button><span aria-label="Cantidad">${q}</span><button data-plus="${id}" aria-label="Agregar una unidad de ${p.name}" ${q===99?'disabled':''}>+</button><button class="remove" data-remove="${id}" aria-label="Eliminar ${p.name}">Eliminar</button></div></div></div>`;}).join(''):'<p class="small">Tu selección está vacía. Explora la colección y agrega tus favoritos.</p>';
 const wa=$('#whatsapp');wa.setAttribute('aria-disabled',String(!count));wa.tabIndex=count?0:-1;$('#clear-cart').hidden=!count;
 if(count){const lines=entries.map(([id,q])=>{const p=byId.get(id);return `• ${q} × ${p.brand} ${p.name} ${p.type} (${p.size}) — ${money(p.price)} c/u; subtotal ${money(p.price*q)}`;});wa.href='https://wa.me/19726070561?text='+encodeURIComponent(`Hola BELOURA, quisiera consultar este pedido de perfumes:\n\n${lines.join('\n')}\n\nTotal: ${money(total)} USD\n\nPor favor, confirmen disponibilidad, presentación y fecha de entrega antes del pago.`);}else wa.removeAttribute('href');
}
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const id=b.dataset.add;if((cart[id]||0)>=99){announce('Máximo 99 unidades por perfume.');return;}cart[id]=(cart[id]||0)+1;save();announce(`${byId.get(id).name} agregado a tu selección.`);});
$('.categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;document.querySelectorAll('[data-category]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));renderProducts();});
$('#search').addEventListener('input',renderProducts);$('#sort').addEventListener('change',renderProducts);
$('#open-cart').addEventListener('click',()=>$('#cart').showModal());$('#close-cart').addEventListener('click',()=>$('#cart').close());
$('#cart-items').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const id=b.dataset.plus||b.dataset.minus||b.dataset.remove;if(!byId.has(id))return;const action=b.dataset.plus?'plus':b.dataset.minus?'minus':'remove';if(action==='plus')cart[id]=Math.min(99,cart[id]+1);else if(action==='minus'&&cart[id]>1)cart[id]--;else delete cart[id];save();const next=document.querySelector(`[data-${action}="${id}"]`);(next||$('#close-cart')).focus();});
$('#clear-cart').addEventListener('click',()=>{cart={};save();$('#close-cart').focus();});
renderProducts();renderCart();
