/* ================= CONFIGURAÇÕES (edite aqui) ================= */
const CONFIG = {
  whatsapp: '5562991412416',
  pixKey: '+5562991412416',   // chave PIX (tipo telefone). Confirme se é este número.
  landingUrl: 'https://rcinvestimentoss.com.br/?utm_source=instagram&utm_medium=bio&utm_campaign=link_na_bio'  // landing de simulação. Se vazio, o card abre o WhatsApp.
};
/* ============================================================== */

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const waUrl = m => 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(m);

/* Rastreamento */
function track(label){
  try{ if(window.fbq) fbq('trackCustom','Clique_Bio',{botao:label}); }catch(e){}
  try{ if(window.gtag) gtag('event','clique_bio',{botao:label}); }catch(e){}
  try{ (window.dataLayer = window.dataLayer || []).push({event:'Clique_Bio', botao:label}); }catch(e){}
}
$$('[data-track]').forEach(el => el.addEventListener('click', () => track(el.dataset.track)));

/* WhatsApp */
$$('[data-wa]').forEach(a => a.href = waUrl(a.dataset.wa));

/* Card de destaque */
const feat = $('#featureLink');
if (CONFIG.landingUrl) { feat.href = CONFIG.landingUrl; feat.removeAttribute('target'); }
else { feat.href = waUrl('Olá, Rafael! Vim pelo seu Instagram e quero fazer uma simulação de consórcio imobiliário.'); }

/* Toast */
const toast = $('#toast'); let tt;
function say(msg){ toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(()=>toast.classList.remove('show'), 2200); }
async function copy(text, msg){
  try{ await navigator.clipboard.writeText(text); }
  catch(e){ const t=document.createElement('textarea'); t.value=text; document.body.appendChild(t); t.select(); try{document.execCommand('copy')}catch(_){} t.remove(); }
  say(msg);
}
$('#copyPix').addEventListener('click', () => copy(CONFIG.pixKey, 'Chave PIX copiada'));

/* Carrossel */
const track_ = $('#track'), dots = $$('#dots i');
if (track_) track_.addEventListener('scroll', () => {
  const i = Math.round(track_.scrollLeft / track_.clientWidth);
  dots.forEach((d, n) => d.classList.toggle('on', n === i));
}, {passive:true});
// imagens que falharem em carregar são removidas sem quebrar o layout
$$('.track img, .media img').forEach(img => img.addEventListener('error', () => img.style.display = 'none'));

/* Compartilhar */
const url = location.origin.startsWith('http') ? location.origin + location.pathname : location.href;
const text = 'Acesse o cartão de visitas digital do Rafael Corrêa';
const dlg = $('#share');
$('#shUrl').value = url;
$('#shWa').href = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url);
$('#shFb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
$('#shTg').href = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text);
$('#shMail').href = 'mailto:?subject=' + encodeURIComponent('Rafael Corrêa') + '&body=' + encodeURIComponent(text + ' ' + url);
$('#openShare').addEventListener('click', async () => {
  track('Compartilhar');
  if (navigator.share) { try { await navigator.share({title:'Rafael Corrêa', text, url}); return; } catch(e){ if(e.name==='AbortError') return; } }
  dlg.showModal();
});
$('#shClose').onclick = () => dlg.close();
$('#shCopy').onclick = () => copy(url, 'Link copiado');
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

/* Reveal */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.1});
  $$('.reveal').forEach(el => io.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('in')); }
