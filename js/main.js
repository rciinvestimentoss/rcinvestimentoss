/* ================= CONFIGURAÇÕES (edite aqui) ================= */
const CONFIG = {
  whatsapp: '5562991412416',
  cnpj: '',            // ex.: '00.000.000/0001-00' (aparece no rodapé quando preenchido)
  webhookUrl: '',      // IMPORTANTE: URL do CRM / planilha / Make / Zapier que recebe o lead (POST JSON)
  testimonials: [      // adicione SOMENTE depoimentos reais e autorizados. Ex.:
    // {text:'Texto do depoimento', name:'Nome', role:'Cidade / objetivo'}
  ]
};
/* ============================================================== */

const HERO_SRC='assets/rafael.jpg';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});

$$('img[data-clone]').forEach(i=>i.src=HERO_SRC);
$$('[data-plaque]').forEach(d=>d.style.backgroundImage='url('+HERO_SRC+')');
$$('[data-avatar]').forEach(d=>{d.style.backgroundImage='url('+HERO_SRC+')';d.style.backgroundSize='230px auto';d.style.backgroundPosition='-108px -18px'});

const utm={}; new URLSearchParams(location.search).forEach((v,k)=>{if(/^(utm_|gclid|fbclid)/.test(k))utm[k]=v});

function track(name,data={}){
  try{if(window.fbq){['Lead','Contact'].includes(name)?fbq('track',name,data):fbq('trackCustom',name,data)}}catch(e){}
  try{if(window.gtag){gtag('event',name.toLowerCase(),data)}}catch(e){}
  try{(window.dataLayer=window.dataLayer||[]).push({event:name,...data})}catch(e){}
}
const waUrl=m=>'https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(m);
$$('[data-wa]').forEach(a=>{a.href=waUrl(a.dataset.wa);a.target='_blank';a.rel='noopener';a.addEventListener('click',()=>track('Contact',{origem:a.dataset.track||'wa'}))});
$$('[data-track]:not([data-wa])').forEach(a=>a.addEventListener('click',()=>track('Clique_CTA',{origem:a.dataset.track})));

if(CONFIG.cnpj){const l=$('#cnpjLine');l.textContent='CNPJ: '+CONFIG.cnpj;l.style.display='block'}
if(CONFIG.testimonials.length){
  $('#depoimentos').style.display='block';
  $('#tgrid').innerHTML=CONFIG.testimonials.map(t=>`<div class="tcard"><p>“${t.text}”</p><footer>${t.name}<span>${t.role||''}</span></footer></div>`).join('');
}
const dlg=$('#privacy');$('#openPrivacy').onclick=()=>dlg.showModal();$('#closePrivacy').onclick=()=>dlg.close();

if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  $$('.reveal').forEach(el=>io.observe(el));
  const st=$('#sticky'), hero=$('#inicio');
  new IntersectionObserver(es=>es.forEach(e=>st.classList.toggle('show',!e.isIntersecting)),{threshold:0}).observe(hero);
}else{$$('.reveal').forEach(el=>el.classList.add('in'))}

/* ================= Formulário em etapas ================= */
const TOTAL=4;
const state={objetivo:'',valor:400000,quando:'',lance:'',nome:'',fone:'',contato:'WhatsApp'};
const stage=$('#stage'),bar=$('#barFill');
let step=1,started=false;

const objetivos=['Comprar minha casa própria','Investir em imóvel para renda','Terreno ou construção','Imóvel comercial','Quitar meu financiamento imobiliário'];
const quandos=['O quanto antes','Em 1 a 2 anos','Em 3 anos ou mais','Sem pressa, quero planejar'];
const lances=['Tenho recursos para lance','Tenho FGTS disponível','Ainda não sei','Prefiro apenas as parcelas'];

function progress(){
  const s=Math.min(step,TOTAL), pct=Math.round(s/TOTAL*100);
  $('#stepLabel').textContent=step<=TOTAL?`Passo ${s} de ${TOTAL}`:'Concluído';
  const p=step>TOTAL?100:pct; bar.style.width=p+'%'; $('#stepPct').textContent=p+'%';
}
const opts=(list,key,cls='')=>`<div class="opts ${cls}">`+list.map(t=>`<button type="button" class="opt" data-key="${key}" data-val="${t}" aria-pressed="${state[key]===t}">${t}</button>`).join('')+`</div>`;
const nav=(label='Continuar')=>`<div class="q-nav">${step>1&&step<=TOTAL?'<button type="button" class="back" id="bk">Voltar</button>':''}<button type="button" class="btn btn-red" id="nx">${label}</button></div>`;
const estimate=()=>{const lo=state.valor*1.15/240,hi=state.valor*1.25/120;return [Math.round(lo/10)*10,Math.round(hi/10)*10]};

function render(){
  progress();
  if(step===1){
    stage.innerHTML=`<div class="q">Qual é o seu objetivo?</div>${opts(objetivos,'objetivo')}`;
  }else if(step===2){
    stage.innerHTML=`<div class="q">Qual valor de crédito você imagina?</div><div class="range-val" id="rv">${brl(state.valor)}</div><input type="range" id="rg" min="80000" max="1500000" step="10000" value="${state.valor}" aria-label="Valor do crédito"><div class="range-scale"><span>R$ 80 mil</span><span>R$ 1,5 milhão</span></div>${nav()}`;
    $('#rg').oninput=e=>{state.valor=+e.target.value;$('#rv').textContent=brl(state.valor)};
  }else if(step===3){
    stage.innerHTML=`<div class="group-l">Quando pretende usar o crédito?</div>${opts(quandos,'quando')}<div class="group-l">Possui recursos para lance?</div>${opts(lances,'lance')}<div class="err" id="er" role="alert"></div>${nav()}`;
  }else if(step===4){
    const [lo,hi]=estimate();
    stage.innerHTML=`<div class="est"><small>Faixa ilustrativa de parcela inicial para ${brl(state.valor)}</small><b>${brl(lo)} a ${brl(hi)}</b><small>por mês, conforme o prazo. Estimativa genérica, sem valor contratual. A simulação real vem do consultor.</small></div>
      <div class="q" style="font-size:1.02rem">Receba sua simulação real, com todos os custos</div>
      <div class="field"><label for="nm">Nome</label><input type="text" id="nm" autocomplete="name" value="${state.nome}" placeholder="Seu nome"></div>
      <div class="field"><label for="fn">WhatsApp com DDD</label><input type="tel" id="fn" inputmode="tel" autocomplete="tel" value="${state.fone}" placeholder="(62) 90000-0000"></div>
      <div class="group-l" style="margin-top:4px">Como prefere ser atendido?</div>
      <div class="pref">${['WhatsApp','Ligação'].map(t=>`<button type="button" class="opt" data-key="contato" data-val="${t}" aria-pressed="${state.contato===t}">${t}</button>`).join('')}</div>
      <label class="check"><input type="checkbox" id="ck"><span>Concordo em ser contatado pelo consultor sobre esta simulação e aceito a <a href="#" id="pv" style="color:var(--red-dark)">Política de Privacidade</a>.</span></label>
      <div class="err" id="er" role="alert"></div>
      <div class="q-nav"><button type="button" class="back" id="bk">Voltar</button><button type="button" class="btn btn-red" id="nx">Enviar e receber minha simulação</button></div>`;
    $('#fn').oninput=e=>{let d=e.target.value.replace(/\D/g,'').slice(0,11);e.target.value=d.length>10?d.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3'):d.length>6?d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3'):d.length>2?d.replace(/(\d{2})(\d*)/,'($1) $2'):d};
    $('#pv').onclick=e=>{e.preventDefault();dlg.showModal()};
  }else{
    const nome=state.nome.split(' ')[0];
    const msg=`Olá, Rafael! Fiz a simulação na sua página.\n\nNome: ${state.nome}\nObjetivo: ${state.objetivo}\nCrédito desejado: ${brl(state.valor)}\nQuando pretendo usar: ${state.quando}\nLance/FGTS: ${state.lance}\n\nPode me enviar a análise completa?`;
    const call=state.contato==='Ligação';
    stage.innerHTML=`<div class="done"><div class="seal"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <h3>Obrigado, ${nome}.</h3>
      <p>${call?'O Rafael vai ligar para você em horário comercial.':'O Rafael vai chamar você no WhatsApp em horário comercial.'} Para adiantar, envie suas respostas agora e receba a análise mais rápido.</p>
      <a class="btn btn-red" target="_blank" rel="noopener" href="${waUrl(msg)}" id="sendWa">Enviar minhas respostas no WhatsApp</a>
      <p class="fine" style="margin-top:12px">O WhatsApp abrirá com a mensagem pronta. Basta tocar em enviar.</p></div>`;
    $('#sendWa').addEventListener('click',()=>track('Contact',{origem:'pos_formulario'}));
  }
  bind();
}
function bind(){
  $$('.opt',stage).forEach(b=>b.onclick=()=>{
    const k=b.dataset.key;state[k]=b.dataset.val;
    $$(`.opt[data-key="${k}"]`,stage).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(!started){started=true;track('StartSimulation')}
    if(step===1) setTimeout(()=>{step=2;render()},200);
  });
  const nx=$('#nx'),bk=$('#bk');
  if(bk)bk.onclick=()=>{step--;render()};
  if(nx)nx.onclick=()=>{
    const er=$('#er');
    if(step===3){ if(!state.quando||!state.lance){er.textContent='Selecione uma opção em cada pergunta.';return} }
    if(step===4){
      const nm=$('#nm').value.trim(),dg=$('#fn').value.replace(/\D/g,''),ok=$('#ck').checked;
      if(nm.length<2){er.textContent='Informe seu nome.';return}
      if(dg.length<10){er.textContent='Informe um WhatsApp válido com DDD.';return}
      if(!ok){er.textContent='É preciso concordar com o contato para continuar.';return}
      state.nome=nm;state.fone=$('#fn').value;
      const payload={...state,faixa_parcela:estimate(),...utm,pagina:location.href,data:new Date().toISOString()};
      track('Lead',{content_name:'simulacao_consorcio_imobiliario',value:state.valor,currency:'BRL'});
      if(CONFIG.webhookUrl){fetch(CONFIG.webhookUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true}).catch(()=>{})}
      else console.warn('Configure CONFIG.webhookUrl para salvar os leads automaticamente.');
    }
    step++;render();
    if(innerWidth<980)$('#simulacao').scrollIntoView({behavior:'smooth',block:'start'});
  };
}
render();
