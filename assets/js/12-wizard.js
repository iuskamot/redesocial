/* wizard de nova publicacao e modais */
/* ---------- Wizard "Nova publicação" (Etapa A: casca + Tipo) ---------- */
const NV_STEPS = [['tipo','Tipo'],['destino','Destino'],['empresas','Empresas'],['pessoas','Pessoas'],['definicoes','Definições'],['content','Conteúdo'],['revisao','Revisão']];
let nvStep = 'tipo', nvDest = null;
const NV_EMP = new Set();
const NV_PEO = new Set();
const NV_CITIES = ['Curitiba - PR','Belo Horizonte - MG','Cascavel - PR','Umuarama - PR','Parobé - RS','São Paulo - SP','Uberaba - MG','Londrina - PR','Maringá - PR','Joinville - SC','Campinas - SP','Goiânia - GO','Recife - PE','Fortaleza - CE','Natal - RN','Vitória - ES'];
function nvFlow(){ const f=['tipo','destino']; if(nvDest==='unidades') f.push('empresas'); f.push('pessoas','definicoes','content','revisao'); return f; }
function renderNvSteps(){
  const cur = NV_STEPS.findIndex(s => s[0] === nvStep);
  const flow = nvFlow();
  $('#nvSteps').innerHTML = NV_STEPS.map((s,i) => {
    const inFlow = flow.indexOf(s[0]) >= 0;
    const cls = i < cur ? ' done' : (i === cur ? ' current' : (inFlow ? '' : ' disabled'));
    const inner = i < cur ? '<i class="fa-solid fa-check"></i>' : (i+1);
    return '<div class="nv-step'+cls+'" data-step="'+s[0]+'"><span class="nv-stepn">'+inner+'</span>'+s[1]+'</div>';
  }).join('');
}
function renderEmpresas(){
  const q = rxNorm(($('#nvEmpSearch').value||'').trim());
  const list = STORES.filter(s => !q || rxNorm(s.name).includes(q) || rxNorm(s.company).includes(q));
  $('#nvEmpList').innerHTML = '<table class="rxv-table"><thead><tr><th class="nv-emp-row-check"></th><th>Empresa</th><th>Cidade</th></tr></thead><tbody>'+
    list.map((s,i) => '<tr data-code="'+s.code+'"><td class="nv-emp-row-check"><input type="checkbox" '+(NV_EMP.has(s.code)?'checked':'')+'></td>'+
      '<td><div class="nv-emp-co"><span class="rxv-logo" style="background:'+s.color+'">'+s.ini+'</span><span><b>'+s.name+'</b><span>'+s.company+'</span></span></div></td>'+
      '<td class="rxv-tdate">'+NV_CITIES[STORES.indexOf(s)%NV_CITIES.length]+'</td></tr>').join('')+'</tbody></table>';
  $('#nvEmpCount').textContent = NV_EMP.size + (NV_EMP.size===1?' selecionada':' selecionadas');
}
function renderPessoas(){
  const q = rxNorm(($('#nvPeoSearch').value||'').trim());
  const list = PEOPLE.filter(p => !q || rxNorm(p.name).includes(q) || rxNorm(p.role).includes(q));
  $('#nvPeoList').innerHTML = '<table class="rxv-table"><thead><tr><th class="nv-emp-row-check"></th><th>Colaborador</th><th>Cargo</th></tr></thead><tbody>'+
    list.map(p => '<tr data-id="'+p.id+'"><td class="nv-emp-row-check"><input type="checkbox" '+(NV_PEO.has(p.id)?'checked':'')+'></td>'+
      '<td><div class="nv-emp-co"><span class="avatar '+p.av+'" style="width:38px;height:38px;font-size:0"></span><span><b>'+p.name+'</b><span>#'+p.id+'</span></span></div></td>'+
      '<td class="rxv-tdate">'+p.role+'</td></tr>').join('')+'</tbody></table>';
  $('#nvPeoCount').textContent = NV_PEO.size + (NV_PEO.size===1?' selecionada':' selecionadas');
}
function nvGoStep(key){
  nvStep = key;
  const _adv=$('#nvArtAdv'); if(_adv) _adv.style.display = (key==='content') ? '' : 'none';
  if(typeof nvArtAdvClose==='function') nvArtAdvClose();
  $$('#nvComposeScreen .nv-pane').forEach(p => p.classList.remove('active'));
  const pane = { tipo:'nvPaneTipo', destino:'nvPaneDestino', empresas:'nvPaneEmpresas', pessoas:'nvPanePessoas', definicoes:'nvPaneDefinicoes', content:'nvPaneContent', revisao:'nvPaneRevisao' }[key] || 'nvPaneContent';
  $('#'+pane).classList.add('active');
  if (key === 'empresas') renderEmpresas();
  if (key === 'pessoas') renderPessoas();
  if (key === 'revisao') renderRevisao();
  if (key === 'content'){
    const isArt = nvType === 'article';
    $('#nvCardPost').style.display = isArt ? 'none' : '';
    $('#nvCardArticle').style.display = isArt ? '' : 'none';
    $('#nvPvStd').style.display = isArt ? 'none' : '';
    $('#nvPvArt').style.display = isArt ? '' : 'none';
    nvUpdatePreview();
  }
  renderNvSteps();
  const flow = nvFlow(), idx = flow.indexOf(key);
  const prev = $('#nvWizPrev'), next = $('#nvWizNext'), pub = $('#nvComposePub'), draft = $('#nvComposeDraft');
  const onContent = key === 'content';
  prev.style.display = onContent ? 'none' : (idx > 0 ? '' : 'none');
  const hasNext = idx < flow.length - 1;
  next.style.display = (onContent || !hasNext) ? 'none' : '';
  next.disabled = (key === 'tipo' && !nvType) || (key === 'destino' && !nvDest);
  if(pub) pub.style.display = onContent ? '' : 'none';
  if(draft) draft.style.display = onContent ? '' : 'none';
}
$$('.nv-tipo-card[data-type]').forEach(card => card.addEventListener('click', () => {
  nvType = card.dataset.type;
  $$('.nv-tipo-card[data-type]').forEach(c => c.classList.toggle('sel', c === card));
  $('#nvWizNext').disabled = false;
}));
$$('.nv-tipo-card[data-dest]').forEach(card => card.addEventListener('click', () => {
  nvDest = card.dataset.dest;
  $$('.nv-tipo-card[data-dest]').forEach(c => c.classList.toggle('sel', c === card));
  $('#nvWizNext').disabled = false;
}));
(function(){
  const ov=$('#nvArtAdvOver'), slot=$('#nvArtAdvSlot');
  let home=null, catRow=null;
  window.nvArtAdvOpen = function(){
    const def=$('#nvPaneDefinicoes .nv-def'); if(!def||!ov) return;
    advMoveAud('nvArtAudSlot','nvArtAudBtn','nvArtAudMenu');
    home=def.parentElement; slot.appendChild(def);
    const sel=$('#nvDefCat');
    catRow = sel && sel.closest('.nv-def-row');
    if(catRow) catRow.style.display='none';
    ov.hidden=false;
  };
  window.nvArtAdvClose = function(){
    if(!ov || ov.hidden) return;
    if(catRow){ catRow.style.display=''; catRow=null; }
    const def=slot.querySelector('.nv-def');
    if(def) ($('#nvPaneDefinicoes')||home||document.body).appendChild(def);
    ov.hidden=true;
  };
  $('#nvArtAdv') && $('#nvArtAdv').addEventListener('click', ()=>window.nvArtAdvOpen());
  $('#nvArtAdvBack') && $('#nvArtAdvBack').addEventListener('click', ()=>{ fgToast('Nota DEV: esse botão de avançado aparece apenas para Unidade principal / Matriz. Nunca aparece para unidades'); window.nvArtAdvClose(); });
  $('#nvArtAdvCancel') && $('#nvArtAdvCancel').addEventListener('click', ()=>window.nvArtAdvClose());
  $('#nvArtAdvSave') && $('#nvArtAdvSave').addEventListener('click', ()=>{ window.nvArtAdvClose(); fgToast('Configurações salvas'); });
  ov && ov.addEventListener('click', e=>{ if(e.target===ov) window.nvArtAdvClose(); });
})();
function nvStepMove(dir){ const flow=nvFlow(), idx=flow.indexOf(nvStep), t=flow[idx+dir]; if(t) nvGoStep(t); }
$('#nvWizNext').addEventListener('click', () => nvStepMove(1));
$('#nvWizPrev').addEventListener('click', () => nvStepMove(-1));
$('#nvSteps').addEventListener('click', e => { const el = e.target.closest('.nv-step'); if(!el || el.classList.contains('disabled')) return; const key = el.dataset.step; const flow = nvFlow(); if(flow.indexOf(key) < 0) return; const ti = flow.indexOf(key), ci = flow.indexOf(nvStep); if(ti > ci){ if(!nvType) return; if(ti > flow.indexOf('destino') && !nvDest) return; } nvGoStep(key); });
$('#nvEmpAll').addEventListener('click', () => { STORES.forEach(s=>NV_EMP.add(s.code)); renderEmpresas(); });
$('#nvEmpNone').addEventListener('click', () => { NV_EMP.clear(); renderEmpresas(); });
$('#nvEmpSearch').addEventListener('input', renderEmpresas);
$('#nvPeoAll').addEventListener('click', () => { PEOPLE.forEach(p=>NV_PEO.add(p.id)); renderPessoas(); });
$('#nvPeoNone').addEventListener('click', () => { NV_PEO.clear(); renderPessoas(); });
$('#nvPeoSearch').addEventListener('input', renderPessoas);
$('#nvPeoList').addEventListener('change', e => { const tr=e.target.closest('tr'); if(!tr) return; const id=+tr.dataset.id; if(e.target.checked) NV_PEO.add(id); else NV_PEO.delete(id); $('#nvPeoCount').textContent = NV_PEO.size+(NV_PEO.size===1?' selecionada':' selecionadas'); });
$('#nvEmpList').addEventListener('change', e => { const tr=e.target.closest('tr'); if(!tr) return; const c=tr.dataset.code; if(e.target.checked) NV_EMP.add(c); else NV_EMP.delete(c); $('#nvEmpCount').textContent = NV_EMP.size+(NV_EMP.size===1?' selecionada':' selecionadas'); });
/* decisao sobre a publicacao pendente aberta no leitor */
function nvArtDecidir(ok){
  const n=npCurrent; if(!n) return;
  n.pendAppr=false;
  if(ok){ n.apprStatus='aprovado'; }
  else { n.apprStatus='rejeitado'; n.status='draft'; }
  const pend=document.getElementById('nvArtPend'); if(pend) pend.hidden=true;
  if(typeof renderNewsFeed==='function') renderNewsFeed();
  if(document.body.classList.contains('demo-crunch') && typeof crunchInjetaHome==='function') crunchInjetaHome();
  fgToast(ok ? 'Publicação aprovada' : 'Publicação reprovada');
  if(ok) openArticle(n); else newsShow('feed');
}
$('#nvArtPendApr') && $('#nvArtPendApr').addEventListener('click', () => nvArtDecidir(true));
$('#nvArtPendRej') && $('#nvArtPendRej').addEventListener('click', () => nvArtDecidir(false));
$('#nvArtBack').addEventListener('click', () => {
  /* na visao do funcionario o voltar devolve ao feed; no Gerenciar, a lista */
  if (newsView.classList.contains('env-social')){ newsShow('feed'); return; }
  newsView.classList.remove('user-mode'); newsView.classList.add('open','mod-mode'); newsShow('list');
});
$('#nvArtApr') && $('#nvArtApr').addEventListener('click', ()=>reviewDecide(true));
$('#nvArtRej') && $('#nvArtRej').addEventListener('click', ()=>reviewDecide(false));
/* arranque: posts da home desenhados antes de TEAM existir ganham o selo de
   administrador (casa pelo avatar do cabecalho) */
(function(){
  document.querySelectorAll('.col-main > .feed > .post').forEach(function(p){
    const nome = p.querySelector('.post-name'); if (!nome || nome.querySelector('.verified')) return;
    const av = p.querySelector('.post-head .avatar'); const cls = av ? [...av.classList].find(function(c){ return c.indexOf('av-') === 0 && c !== 'av-brand'; }) : '';
    if (!cls) return;
    if (ehAdminPost({ autorAv: cls, autorNome: nome.firstChild && nome.firstChild.nodeType === 3 ? nome.firstChild.textContent : nome.textContent })){
      const chip = nome.querySelector('.nvf-pinchip');
      if (chip) chip.insertAdjacentHTML('beforebegin', verificadoSVG()); else nome.insertAdjacentHTML('beforeend', verificadoSVG());
    }
  });
})();
/* arranque: na home, os artigos ja desenhados (o fixo e os do primeiro render,
   que rodou antes de NEWS_CATS existir) trocam o nome da categoria pela pilula */
(function(){ document.querySelectorAll('.col-main .nvf-artkicker').forEach(k => { if(!k.querySelector('.art-catpill')) k.innerHTML=catPillHTML(k.textContent); }); })();
['homeArtOpen','homeArtOpen2','homeArtOpen3'].forEach(id => { const el=$('#'+id); if(el) el.addEventListener('click', () => { const n=NEWS.find(x=>x.article); if(!n) return; openNewsModule(); openArticle(n); }); });
function catInk(hex){
  const m=/^#?([\da-f]{6})$/i.exec(hex||''); if(!m) return '#1C1C1E';
  let r=parseInt(m[1].slice(0,2),16), g=parseInt(m[1].slice(2,4),16), b=parseInt(m[1].slice(4,6),16);
  const lum=c=>{c/=255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)};
  const ratio=()=>{const L=.2126*lum(r)+.7152*lum(g)+.0722*lum(b);return 1.05/(L+.05)};
  let k=0;
  while(ratio()<5 && k++<40){ r=Math.round(r*.9); g=Math.round(g*.9); b=Math.round(b*.9); }
  return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}
/* Quem esta logado. O avatar e sempre a classe av-rc (o cenario troca a foto
   por CSS); nome, iniciais e cargo mudam com o cenario. */
function usuarioAtual(){
  if (document.body.classList.contains('demo-crunch')) return { nome:'Pikachu', ini:'P', cargo:(typeof crunchPapel === 'function' ? crunchPapel() : 'Funcionário · Crunchyroll'), av:'av-rc' };
  return { nome:'Rodrigo Caetano', ini:'RC', cargo:'CEO · SULTS', av:'av-rc' };
}
/* Selo de verificado no desenho do Twitter (dentado, com o check dentro).
   Vai para a conta oficial e para quem esta na equipe de administradores. */
function verificadoSVG(){
  return '<svg class="verified" viewBox="0 0 24 24" aria-label="Verificado" role="img"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>';
}
/* A pessoa que publicou esta em TEAM (administradores da rede)? Casa pelo
   avatar e, na falta, pelo nome (o post diz "Rodrigo Caetano", a lista diz
   "Rodrigo Caetano Silva"). TEAM e um let declarado depois do primeiro desenho
   da home, por isso o try: na zona morta a resposta e "nao", e o arranque
   abaixo completa os selos. */
function ehAdminPost(n){
  let time = null; try { time = TEAM; } catch (e) { return false; }
  if (!time || typeof PEOPLE === 'undefined') return false;
  const av = n.autorAv || n.av || '', nome = String(n.autorNome || n.author || '').trim().toLowerCase();
  return time.some(function(id){
    const p = PEOPLE.find(function(x){ return x.id === id; }); if (!p) return false;
    if (av && p.av === av) return true;
    const pn = p.name.toLowerCase();
    return !!nome && (pn === nome || pn.indexOf(nome + ' ') === 0);
  });
}
/* nome + selo quando for a conta oficial ou um administrador */
function nomeComSelo(n){
  /* conta oficial: a do SULTS (sem avatar de pessoa) ou a marcada como oficial pelo cenario */
  const oficial = !!n.oficial || !(n.autorAv || n.av);
  const nome = oficial ? (n.author || 'SULTS') : (n.autorNome || n.author || '');
  return nome + ((oficial || ehAdminPost(n)) ? ' ' + verificadoSVG() : '');
}
/* pilula de categoria (icone redondo + nome); devolve so o nome quando a
   categoria nao existe na lista */
function catPillHTML(nome){
  const name=(nome||'').split('·')[0].trim();
  /* NEWS_CATS e um let declarado mais adiante no script unico; se alguem chamar
     antes dele existir, ate typeof lanca ReferenceError na zona morta */
  let cats = null; try { cats = NEWS_CATS; } catch (e) { cats = null; }
  const c = cats ? cats.find(x=>x.name===name) : null;
  if(!c) return name;
  return '<span class="art-catpill" style="background:'+c.color+'1F;color:'+catInk(c.color)+'"><span class="art-catic" style="background:'+c.color+'"><i class="fa-solid '+c.icon+'"></i></span>'+c.name+'</span>';
}
function artCatPill(kicker){
  const name=(kicker||'').split('·')[0].trim();
  const c=(typeof NEWS_CATS!=='undefined') ? NEWS_CATS.find(x=>x.name===name) : null;
  if(!c) return '<div class="art-kicker">'+(kicker||'Artigo')+'</div>';
  return '<div class="art-kicker">'+catPillHTML(name)+'</div>';
}
function openArticle(n){
  npCurrent=n;
  const tt=document.getElementById('nvArtTitulo'); if(tt) tt.textContent = n.article ? 'Artigo' : 'Publicação';
  /* pendente e quem le pode aprovar: aviso e botoes no canto direito da barra */
  const pend=document.getElementById('nvArtPend');
  if(pend){
    pend.hidden = !(n.pendAppr && (typeof podeAprovar!=='function' || podeAprovar()));
    const tx=document.getElementById('nvArtPendTx');
    const quando=(typeof fmtQuando==='function') ? fmtQuando(n) : (n.date||'');
    if(tx) tx.textContent = quando ? 'Aguardando aprovação desde '+quando : 'Aguardando aprovação';
  }
  if (!n.article){
    const liked=newsLiked.has(n.id); const rc=(n.reactions||0)+(liked?1:0);
    const cc=(n.comments||0)+((n.cmts&&n.cmts.length)||0);
    const av=n.av?'<span class="avatar '+n.av+'">'+(n.ini||'')+'</span>':'<span class="avatar av-brand">'+BRAND_LOGO+'</span>';
    const nm=nomeComSelo(n);
    let media='';
    if(n.images&&n.images.length>1) media='<div class="post-img" style="margin:16px 0 0">'+nvImgCollage(n.images,'post-imggrid')+'</div>';
    else if(n.video) media='<div class="post-img" style="margin:16px 0 0"><video src="'+n.video+'" controls style="width:100%;border-radius:12px;max-height:520px;background:#000"></video></div>';
    else if(n.colorBg) media='<div class="post-img" style="margin:16px 0 0"><div class="banner" style="background:'+n.color+'">'+(n.bigEmoji?'<span class="big-emoji">'+n.bigEmoji+'</span>':'')+'<h4>'+(n.title||'')+'</h4>'+(n.colorSub?'<p>'+n.colorSub+'</p>':'')+'</div></div>';
    else if(n.image) media='<div class="post-img" style="margin:16px 0 0"><img src="'+n.image+'" style="width:100%;border-radius:12px;max-height:520px;object-fit:cover"></div>';
    const cat=(typeof newsCatByName==='function')?newsCatByName(n.sub):null;
    const catChip=cat?'<span class="np-cat" style="background:'+cat.color+'"><i class="fa-solid '+(cat.icon||'fa-tag')+'"></i> '+cat.name+'</span>':'';
    const txt=(n.text||'').replace(/\n/g,'<br>');
    $('#nvArtBody').innerHTML=
      '<div class="np-head">'+av+'<div class="np-id"><div class="np-name">'+nm+'</div><div class="np-sub">'+postSub(n)+'</div><div class="np-meta">'+((typeof fmtQuando==='function')?fmtQuando(n):(n.date||'agora'))+' · <i class="fa-solid fa-earth-americas"></i>'+(n.edited?' · <span class="np-edited">Editado</span>':'')+'</div></div>'+catChip+'</div>'+
      (n.title&&!n.colorBg?'<h1 class="np-title">'+n.title+'</h1>':'')+
      (txt?'<div class="np-text">'+txt+'</div>':'')+media+
      npBlocoSocial(n);
    npCurrent=n; renderNpComments(n);
    newsShow('article'); $('.nv-artscroll').scrollTop=0; return;
  }
  const a = n.article;
  if (a.paras || a.html){
    /* o ramo montava o HTML e descartava: faltava a atribuicao */
    $('#nvArtBody').innerHTML =
      (n.image ? '<div class="art-herowrap"><img src="'+n.image+'" alt=""></div>' : '') +
      artCatPill(a.kicker)+
      '<h1>'+n.title+'</h1>'+
      (a.lead ? '<p class="art-lead">'+a.lead+'</p>' : '')+
      npAssinatura(n, a)+
      '<div class="art-body">'+(a.html ? a.html : a.paras.map(p=>'<p>'+p.replace(/</g,'&lt;')+'</p>').join(''))+'</div>'+
      npBlocoSocial(n);
    renderNpComments(n);
    newsShow('article'); $('.nv-artscroll').scrollTop = 0; return;
  }
  const stats = a.stats.map(s => '<div class="art-stat"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>').join('');
  const mods = [
    ['#6f6ae0','fa-bullhorn','Portal de Comunicação','Base da relação franqueadora-franqueado','Centraliza toda a comunicação da rede em um único canal. Para uma operação com mais de 780 lojas em quatro países e mais de 5.000 colaboradores, a comunicação unificada sustenta o alinhamento de toda a rede.'],
    ['#27a689','fa-clipboard-check','Checklist','Padronização em escala nacional','Garante a padronização de processos em uma rede que cresceu de 250 para mais de 800 lojas, acompanhando a execução de cada unidade nos quatro países onde a Casa do Construtor atua.'],
    ['#e3444f','fa-file-lines','Projetos','Gestão de iniciativas estratégicas','A rede criou projetos estratégicos que vão além do operacional. Pelo controle de usuários e a estrutura funcional da plataforma, entrega informações que ajudam cada franqueado a decidir melhor.'],
    ['#2f6fe4','fa-bolt','PowerUps','Uso estratégico e diferenciado','Usados de forma única para centralizar dashboards e informações estratégicas. Economizaram licenciamento de plataformas externas e unificaram as atualizações, transformando dados em execução na ponta.']
  ].map(m => '<div class="art-mod"><div class="art-mod-ic" style="background:'+m[0]+'"><i class="fa-solid '+m[1]+'"></i></div><h4>'+m[2]+'</h4><div class="art-mod-sub">'+m[3]+'</div><p>'+m[4]+'</p></div>').join('');
  $('#nvArtBody').innerHTML =
    '<div class="art-herowrap"><img src="'+n.image+'" alt=""></div>'+
    artCatPill(a.kicker)+
    '<h1>'+n.title+'</h1>'+
    '<p class="art-lead">'+a.lead+'</p>'+
    npAssinatura(n, a)+
    '<div class="art-stats">'+stats+'</div>'+
    '<div class="art-body">'+
      '<div class="art-eyebrow">O desafio</div><h2>Organizar informações estratégicas para uma rede em expansão acelerada</h2>'+
      '<p>A Casa do Construtor, maior player de locação de equipamentos em nível nacional, viveu uma fase de crescimento intenso: de 250 lojas em 25 anos para mais de 800 lojas nos últimos anos, com expansão para quatro países. O mercado de construção acelerou, e com ele veio o desafio de como organizar e entregar informações estratégicas para cada franqueado da rede.</p>'+
      '<p>Adriano Bicalho, Vice-presidente Corporativo, precisava decidir: criar um novo produto para o franqueado acessar ou aproveitar a plataforma de comunicação que a rede já utilizava?</p>'+
      '<div class="art-quote"><p>“O desafio de vir pra cá é: como a gente conseguiria organizar e dar informações cruciais para o franqueado? Informações estratégicas. Para onde eu vou e disponibilizo isso para o meu franqueado?”</p><cite><span class="avatar av-wm">AB</span><span><b>Adriano Bicalho</b><span>Vice-presidente Corporativo</span></span></cite></div>'+
      '<div class="art-eyebrow">A solução</div><h2>A SULTS como ferramenta estratégica, não apenas de comunicação</h2>'+
      '<p>A Casa do Construtor decidiu olhar a SULTS não apenas como meio de comunicação ou ferramenta operacional, mas como uma plataforma para agregar valor e estratégia direto na ponta. Além do portal de comunicação, checklists e projetos, a rede transformou a SULTS em uma ferramenta de inteligência para o negócio.</p>'+
      '<p>Através dos PowerUps, a equipe criou projetos estratégicos onde, usando o controle de usuários e a estrutura funcional da SULTS, entrega informações que ajudam o franqueado a tomar as melhores decisões. Hoje, o franqueado tem qualquer tipo de informação do seu negócio centralizada em um único lugar.</p>'+
      '<div class="art-quote"><p>“A gente tentou olhar a SULTS não apenas como meio de comunicação, mas para agregar valor e estratégia lá na ponta. A gente usa os PowerUps de uma maneira muito diferente.”</p><cite><span class="avatar av-wm">AB</span><span><b>Adriano Bicalho</b><span>Vice-presidente Corporativo</span></span></cite></div>'+
      '<div class="art-eyebrow">Os resultados</div><h2>Centralização que mudou a percepção do franqueado sobre o próprio negócio</h2>'+
      '<p>Com a centralização proporcionada pela SULTS, a Casa do Construtor economizou em licenciamento de plataformas e unificou a atualização de dashboards estratégicos. Mais do que eficiência operacional, o impacto foi transformador: a forma como o franqueado enxerga o próprio negócio mudou.</p>'+
      '<p>Hoje, o franqueado consegue, em um único lugar, buscar informações do passado, do presente e do futuro, e transformá-las em execuções práticas para a sua operação. A SULTS criou uma centralização clara, objetiva e detalhada de como a rede funciona e de como a franqueadora presta contas ao franqueado.</p>'+
      '<div class="art-pull"><div class="art-mark">'+WHITE_LOGO+'</div><p>“SULTS entendeu o case, entendeu a dificuldade e se colocou muito à disposição. Esse case mudou a percepção da Casa do Construtor para o franqueado, mudou a forma dele enxergar o business dele.”</p><cite>Adriano Bicalho · Vice-presidente Corporativo</cite></div>'+
      '<div class="art-eyebrow">Plataforma SULTS</div><h2>Módulos utilizados pela Casa do Construtor</h2>'+
      '<div class="art-mods">'+mods+'</div>'+
      '<div class="art-tags"><span class="art-tag">#HistóriasDeSucesso</span><span class="art-tag">#Franquias</span><span class="art-tag">#Gestão</span><span class="art-tag">#PowerUps</span></div>'+
    '</div>'+
    npBlocoSocial(n);
  renderNpComments(n);
  newsShow('article');
  $('.nv-artscroll').scrollTop = 0;
}
function newsShowArticle(){ $('#nvArticleScreen').classList.add('active'); }
let npCurrent=null, reviewingPub=null;
function npRefreshStats(n){
  var st=document.querySelector('#nvArtBody .post-stats'); if(!st||!n) return;
  var liked=newsLiked.has(n.id);
  var rc=(n.reactions||0)+(liked?1:0);
  var cc=(n.comments||0)+((n.cmts&&n.cmts.length)||0);
  var rcEl=st.querySelector('.rx-count'), ccEl=st.querySelector('.right');
  if(rcEl) rcEl.textContent=rc;
  if(ccEl) ccEl.textContent=(cc?'Ver ':'')+cc+' comentários';
}
/* Bloco de curtidas, botoes e comentarios do leitor: os mesmos componentes do
   feed (.post-stats, .post-actions e .nvf-cm), com o mesmo respiro. */
function npBlocoSocial(n){
  const liked=newsLiked.has(n.id); const rc=(n.reactions||0)+(liked?1:0);
  const cc=(n.comments||0)+((n.cmts&&n.cmts.length)||0);
  const clap=(n.reactions||0)>=120?'<span class="rxs" data-rx="celebrate"></span>':'';
  return '<div class="art-social">'+
    '<div class="post-stats"><span class="rx"><span class="rxs" data-rx="like"></span><span class="rxs" data-rx="love"></span>'+clap+'</span><span class="rx-count">'+rc+'</span><span class="right nvf-cc" data-np="cmt">'+(cc?'Ver ':'')+cc+' comentários</span></div>'+
    '<div class="post-actions"><button class="p-act like'+(liked?' liked':'')+'" data-np="like"><i class="fa-'+(liked?'solid':'regular')+' fa-thumbs-up"></i> Gostei</button><button class="p-act" data-np="cmt"><i class="fa-regular fa-comment"></i> Comentar</button></div>'+
    '<div class="nvf-cm" id="npComments"></div>'+
  '</div>';
}
/* assinatura: autor, data completa e "Copiar link" */
function npAssinatura(n, a){
  const av = n.av ? '<span class="avatar '+n.av+'"></span>' : '<span class="avatar av-brand">'+BRAND_LOGO+'</span>';
  const quando = (typeof fmtQuando==='function') ? fmtQuando(n) : (n.date||'');
  return '<div class="art-byline">'+av+'<div><b>'+(n.author||'SULTS')+'</b><span>'+quando+(a&&a.readTime?' · '+a.readTime:'')+'</span></div>'+
    '<div class="art-share"><button type="button" data-copiar title="Copiar link"><i class="fa-regular fa-copy"></i> Copiar link</button></div></div>';
}
/* quem comenta quando o post so tem a contagem: na visao Crunchyroll, os
   personagens; fora dela, as pessoas do SULTS */
function npPoolComentaristas(){
  if (document.body.classList.contains('demo-crunch') && typeof CRUNCH_PESSOAS!=='undefined'){
    return Object.keys(CRUNCH_PESSOAS).map(function(k){ const q=CRUNCH_PESSOAS[k]; return { name:q.nome, av:'av-cr-'+k, role:q.cargo+' · '+q.unidade }; });
  }
  return (typeof PEOPLE!=='undefined') ? PEOPLE : [];
}
function renderNpComments(n){
  const el=$('#npComments'); if(!el) return;
  const pool = npPoolComentaristas();
  if((!n.cmts||!n.cmts.length) && (n.comments||0)>0 && pool.length){
    var texts=['Parabéns pelo trabalho! 👏','Que notícia incrível!','Muito bom, seguimos juntos! 🚀','Orgulho da rede. 💙','Sensacional, time!','Vamos com tudo!','Isso motiva demais.','Excelente novidade.','Show de bola! 🔥','Que marco histórico.'];
    n.cmts=[]; var qt=Math.min(n.comments||0, 8);
    for(var i=0;i<qt;i++){ var p=pool[(i+(n.id||1))%pool.length]; n.cmts.push({author:p.name,av:p.av,role:p.role,text:texts[(i+(n.id||0))%texts.length],time:(i+1)*17+' min',likes:(i*3)%7}); }
    n.comments=Math.max(0,(n.comments||0)-qt);
  }
  /* o mesmo compositor do feed: avatar + campo com o botao de enviar dentro */
  el.innerHTML='<div class="nvf-cm-box"><span class="avatar av-rc"></span><div class="nvf-cm-field"><input class="nvf-cm-in" id="npCmIn" placeholder="Adicione um comentário..."><button class="nvf-cm-send" id="npCmSend" disabled><i class="mdi mdi-send"></i></button></div></div><div class="nvf-cm-list" id="npCmList"></div>';
  const list=$('#npCmList');
  (n.cmts||[]).forEach(c=>list.appendChild(buildComment({av:c.av||'av-rc',ini:c.ini||'',name:c.author||c.name,role:c.role||n.sub||'SULTS',text:c.text,dt:c.dt,time:c.time,likes:c.likes||0,replies:c.replies},false)));
}
$('#nvArtBody') && $('#nvArtBody').addEventListener('click', e=>{
  const b=e.target.closest('[data-np]'); const n=npCurrent; if(!n) return;
  if(b){ if(b.dataset.np==='like'){ if(newsLiked.has(n.id)) newsLiked.delete(n.id); else newsLiked.add(n.id); const on=newsLiked.has(n.id); b.classList.toggle('liked',on); b.innerHTML='<i class="fa-'+(on?'solid':'regular')+' fa-thumbs-up"></i> Gostei'; npRefreshStats(n); } else { $('#npCmIn') && $('#npCmIn').focus(); } return; }
  const cp=e.target.closest('[data-copiar]');
  if(cp){ const url=(n.link && typeof CRUNCH_URL!=='undefined' && n.link.indexOf('/')===0) ? CRUNCH_URL+n.link : (location.href.split('#')[0]+'#pub-'+n.id);
    const ok=()=>fgToast('Link copiado'); if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok,ok); else ok(); return; }
  const rs=e.target.closest('.post-stats .rx, .post-stats .rx-count'); if(rs){ e.stopPropagation(); openReactions(nvRxIndex(n.id)); return; }
  const s=e.target.closest('#npCmSend'); if(s){ const inp=$('#npCmIn'); const v=inp.value.trim(); if(!v) return; const pend=pmNeedsApproval(); const eu=usuarioAtual(); (n.cmts=n.cmts||[]).unshift({author:eu.nome,av:eu.av,ini:eu.ini,role:eu.cargo,text:v,time:'agora'}); renderNpComments(n); npRefreshStats(n); if(pend) fgToast('Comentário enviado para aprovação'); }
});
$('#nvArtBody') && $('#nvArtBody').addEventListener('input', e=>{ const inp=e.target.closest('#npCmIn'); if(inp) $('#npCmSend').disabled=!inp.value.trim(); });
$('#nvArtBody') && $('#nvArtBody').addEventListener('keydown', e=>{ const inp=e.target.closest('#npCmIn'); if(inp&&e.key==='Enter'){ e.preventDefault(); if(!$('#npCmSend').disabled) $('#npCmSend').click(); } });
$('#nvSearch').addEventListener('input', e => { newsQuery = e.target.value.trim(); renderNewsList(); });
/* Post simples inline (estilo quick post) */
function nvpSetColor(c){ postColor=c||null; const body=$('#nvpBody'), sub=$('#nvpSub'); if(postColor){ body.classList.add('colored'); body.style.background=postColor; sub.hidden=false; if(postImg){postImg=null;$('#nvpImgWrap').hidden=true;$('#nvpImgFile').value='';} } else { body.classList.remove('colored'); body.style.background=''; sub.hidden=true; sub.value=''; } nvpRenderColors(); }
function nvpRenderColors(){ $('#nvpColors').innerHTML='<span class="qp-color none'+(postColor===null?' sel':'')+'" data-c=""><i class="fa-solid fa-ban"></i></span>'+QP_COLORS.map(c=>'<span class="qp-color'+(postColor===c?' sel':'')+'" data-c="'+c+'" style="background:'+c+'"></span>').join('')+'<label class="qp-color custom" title="Escolher cor"><i class="fa-solid fa-eye-dropper"></i><input type="color" id="nvpColorPick" value="#00acac"></label>'; }
$('#nvpToolColor').addEventListener('click', ()=>{ const h=$('#nvpColors').classList.toggle('hidden'); if(!h){ nvpRenderColors(); if(!postColor) nvpSetColor(QP_COLORS[0]); } else { nvpSetColor(null); } });
$('#nvpColors').addEventListener('click', e=>{ const s=e.target.closest('.qp-color'); if(!s||s.classList.contains('custom')) return; nvpSetColor(s.dataset.c); });
$('#nvpColors').addEventListener('input', e=>{ const p=e.target.closest('#nvpColorPick'); if(!p) return; nvpSetColor('linear-gradient(135deg,'+p.value+','+p.value+')'); });
$('#nvpToolImg').addEventListener('click', ()=>$('#nvpImgFile').click());
$('#nvpImgFile').addEventListener('change', e=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; postImg=URL.createObjectURL(f); $('#nvpImgPreview').src=postImg; $('#nvpImgWrap').hidden=false; nvpSetColor(null); $('#nvpColors').classList.add('hidden'); });
$('#nvpImgX').addEventListener('click', ()=>{ postImg=null; $('#nvpImgFile').value=''; $('#nvpImgWrap').hidden=true; });
$('#nvpEmojis').innerHTML=QP_EMOJIS.map(x=>'<span>'+x+'</span>').join('');
$('#nvpToolEmoji').addEventListener('click', e=>{ e.stopPropagation(); $('#nvpEmojis').hidden=!$('#nvpEmojis').hidden; });
$('#nvpEmojis').addEventListener('click', e=>{ const s=e.target.closest('span'); if(!s) return; const ta=$('#nvpText'); const st=ta.selectionStart||ta.value.length, en=ta.selectionEnd||ta.value.length; ta.value=ta.value.slice(0,st)+s.textContent+ta.value.slice(en); const pos=st+s.textContent.length; ta.focus(); ta.setSelectionRange(pos,pos); $('#nvpEmojis').hidden=true; });
document.addEventListener('click', e=>{ if(!e.target.closest('#nvpToolEmoji')&&!e.target.closest('#nvpEmojis')){ const ep=$('#nvpEmojis'); if(ep) ep.hidden=true; } });
$('#nvArtCover').addEventListener('click', e => { if(e.target.closest('#nvArtCoverX')) return; $('#nvArtCoverFile').click(); });
$('#nvArtCoverFile').addEventListener('change', e => { const f=e.target.files&&e.target.files[0]; if(!f) return; artCover=URL.createObjectURL(f); $('#nvArtCoverImg').src=artCover; $('#nvArtCover').classList.add('has'); nvUpdateArtPreview(); });
$('#nvArtCoverX').addEventListener('click', () => { artCover=null; $('#nvArtCoverFile').value=''; $('#nvArtCover').classList.remove('has'); nvUpdateArtPreview(); });
['nvArtTitle','nvArtSub'].forEach(id => $('#'+id).addEventListener('input', nvUpdateArtPreview));
function nvArtCatRender(){
  const c=NEWS_CATS.find(x=>x.name===nvArtCatSel)||NEWS_CATS[0]; if(!c) return;
  nvArtCatSel=c.name;
  $('#nvArtCatLbl').textContent=c.name;
  $('#nvArtCatIc').style.background=c.color;
  $('#nvArtCatIc').innerHTML='<i class="fa-solid '+c.icon+'"></i>';
  $('#nvArtCatMenu').innerHTML=NEWS_CATS.map(x=>'<button type="button" data-cat="'+x.name+'"><span class="qp-cat-ic" style="background:'+x.color+'"><i class="fa-solid '+x.icon+'"></i></span>'+x.name+'</button>').join('');
  const d=$('#nvDefCat'); if(d) d.value=c.name;
}
$('#nvArtCatBtn') && $('#nvArtCatBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#nvArtCatMenu'); m.hidden=!m.hidden; });
$('#nvArtCatMenu') && $('#nvArtCatMenu').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b) return; fgToast('Nota DEV: esse botão de categoria aparece apenas para matriz / unidade principal. Unidades fazem post com categoriaId NULL'); nvArtCatSel=b.dataset.cat; nvArtCatRender(); $('#nvArtCatMenu').hidden=true; });
document.addEventListener('click', e=>{ if($('#nvArtCatMenu') && !e.target.closest('.art-catwrap')) $('#nvArtCatMenu').hidden=true; });
nvArtCatRender();
$('#nvArtBodyIn').addEventListener('input', nvUpdateArtPreview);
$('#nvArtToolbar').addEventListener('click', e => { const bt=e.target.closest('button[data-cmd]'); if(!bt) return; e.preventDefault(); $('#nvArtBodyIn').focus(); const cmd=bt.dataset.cmd; if(cmd==='createLink'){ const u=prompt('URL do link:'); if(u) document.execCommand('createLink',false,u); } else document.execCommand(cmd,false,null); });
$('#nvArtToolbar').addEventListener('change', e => { const sel=e.target.closest('select[data-size]'); if(!sel) return; $('#nvArtBodyIn').focus(); document.execCommand('fontSize',false,sel.value); });
$('#nvArtRtImg').addEventListener('click', ()=>$('#nvArtImgFile').click());
$('#nvArtImgFile').addEventListener('change', e=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; const url=URL.createObjectURL(f); $('#nvArtBodyIn').focus(); document.execCommand('insertHTML',false,'<p><img src="'+url+'" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px"></p>'); e.target.value=''; return; }); ($('#nvArtImgFileLegacy')||{addEventListener(){}}).addEventListener('change', e=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; const url=URL.createObjectURL(f); $('#nvArtBodyIn').focus(); document.execCommand('insertImage',false,url); e.target.value=''; nvUpdateArtPreview(); });
$('#nvArtRtVid').addEventListener('click', ()=>{ const u=prompt('URL do vídeo (YouTube/Vimeo/MP4):'); if(!u) return; $('#nvArtBodyIn').focus(); document.execCommand('insertHTML',false,'<p><a href="'+u+'" target="_blank">'+u+'</a></p>'); nvUpdateArtPreview(); });
function nvDoPublish(){
  const pin = $('#nvDefPin') && $('#nvDefPin').checked;
  if (nvType === 'article'){
    const t=$('#nvArtTitle').value.trim(), s=$('#nvArtSub').value.trim(), b=($('#nvArtBodyIn')?$('#nvArtBodyIn').innerHTML.trim():''), bPlain=($('#nvArtBodyIn')?$('#nvArtBodyIn').innerText.trim():'');
    if(!t){ nvGoStep('content'); $('#nvArtTitle').focus(); fgToast('Dê um título ao artigo'); return; }
    const item = { id:Date.now(), title:t, author:'SULTS', av:null, sub:'Histórias de sucesso', date:'agora', datetime:nvNowStr(), reach:(nvDest||'rede'), reactions:0, comments:0, status:'pub', pinned:pin,
      image: artCover || 'uploads/news/casa-construtor.jpg',
      article:{ kicker:(nvArtCatSel||(($('#nvDefCat')||{}).value)||'Artigo'), lead:s||bPlain.slice(0,140), readTime:Math.max(1,Math.round((bPlain.split(/\s+/).length)/200))+' min de leitura', html: b } };
    NEWS.unshift(item); addHomePost(item); fgToast('Artigo publicado'); nvResetCompose(); closeNewsModule(); openNewsUser(); openArticle(item); return;
  }
  const txt = $('#nvpText').value.trim();
  const x = txt.replace(/\n/g,'<br>');
  if (!txt && !postImg){ nvGoStep('content'); $('#nvpText').focus(); fgToast('Escreva algo na publicação'); return; }
  const catSub = (($('#nvDefCat')||{}).value) || 'Comunicados oficiais';
  if (newsEditId){ const n = NEWS.find(y=>y.id===newsEditId); if(n){ n.text=x; n.image=postColor?null:(postImg||null); n.colorBg=postColor||null; n.colorSub=(postColor?$('#nvpSub').value.trim():''); n.pinned=pin; n.status='pub'; n.edited=true; } fgToast('Publicação atualizada'); }
  else { const item = { id:Date.now(), text:x, image:postColor?null:(postImg||null), colorBg:postColor||null, colorSub:(postColor?$('#nvpSub').value.trim():''), author:'SULTS', av:null, sub:catSub, date:'agora', datetime:nvNowStr(), reach:(nvDest||'rede'), reactions:0, comments:0, status:'pub', pinned:pin }; NEWS.unshift(item); addHomePost(item); fgToast('Publicação criada'); }
  nvResetCompose(); newsShow(nvFrom);
}
$('#nvRevDraft') && $('#nvRevDraft').addEventListener('click', ()=>fgToast('Rascunho salvo'));
$('#nvRevPublish').addEventListener('click', nvDoPublish);
$('#nvComposeDraft') && $('#nvComposeDraft').addEventListener('click', ()=>fgToast('Rascunho salvo'));
$('#nvComposePub').addEventListener('click', nvDoPublish);
$('#nvDefStartSeg').addEventListener('click', e => { const b=e.target.closest('button'); if(!b) return; $$('#nvDefStartSeg button').forEach(x=>x.classList.toggle('on',x===b)); const sched=b.dataset.s==='sched'; $('#nvDefStartRow').style.display=sched?'flex':'none'; if(!sched) $('#nvDefStart').value=''; });
$('#nvDefEndSeg').addEventListener('click', e => { const b=e.target.closest('button'); if(!b) return; $$('#nvDefEndSeg button').forEach(x=>x.classList.toggle('on',x===b)); const dt=b.dataset.s==='date'; $('#nvDefEndRow').style.display=dt?'flex':'none'; if(!dt) $('#nvDefEnd').value=''; });
function renderRevisao(){
  const destLbl = { rede:'Toda a rede', unidades:'Unidades selecionadas', matriz:'Sua Marca (Matriz)' }[nvDest] || ',';
  const tipoLbl = nvType === 'article' ? 'Artigo' : 'Post simples';
  const titulo = nvType === 'article' ? ($('#nvArtTitle').value.trim()||',') : (($('#nvpText')&&$('#nvpText').value.trim())? $('#nvpText').value.trim().slice(0,60) : ',');
  const cat = (nvType==='article' && nvArtCatSel) || (($('#nvDefCat')||{}).value) || 'Sem categoria';
  const ini = $('#nvDefStart').value ? $('#nvDefStart').value.split('-').reverse().join('/') : 'Imediato';
  const fim = $('#nvDefEnd').value ? $('#nvDefEnd').value.split('-').reverse().join('/') : 'Sem expiração';
  const flags = [];
  if ($('#nvDefEmail').checked) flags.push('E-mail');
  if ($('#nvDefPin').checked) flags.push('Fixado no topo');
  if ($('#nvDefInter').checked) flags.push('Reações e comentários');
  const chips = flags.length ? flags.map(f=>'<span class="nv-rev-chip">'+f+'</span>').join(' ') : '<span style="color:var(--muted)">Nenhuma</span>';
  const rows = [
    ['Tipo', tipoLbl],
    ['Título', titulo],
    ['Destino', destLbl + (nvDest==='unidades' ? ' · '+NV_EMP.size+' empresa(s)' : '')],
    ['Pessoas', NV_PEO.size ? NV_PEO.size+' selecionada(s)' : 'Todas as pessoas do destino'],
    ['Categoria', cat],
    ['Início', ini],
    ['Encerra', fim],
    ['Opções', chips]
  ];
  $('#nvRevBody').innerHTML = rows.map(r=>'<div class="nv-rev-row"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>').join('');
}
$('#nvList').addEventListener('click', e => {
  const tr = e.target.closest('tr'); if(!tr) return; const id = +tr.dataset.id;
  const ob = e.target.closest('[data-open]');
  if(ob){ e.stopPropagation(); const n0=NEWS.find(x=>x.id===id);
    if(ob.dataset.open==='rx'){ openReactions(nvRxIndex(id)); }
    else { openInterModal((n0&&n0.title)|| (n0&&n0.text? n0.text.replace(/<[^>]+>/g,'').slice(0,60):'Publicação')); }
    return; }
  const act = e.target.closest('.rl-act,.nv-actbtn,[data-act]');
  if (act){ if (act.dataset.act==='del'){ NEWS = NEWS.filter(n=>n.id!==id); renderNewsList(); fgToast('Publicação excluída'); } return; }
  const n=NEWS.find(x=>x.id===id); if(n){ openNewsInfo(n); }
});
/* Permissões de Notícias */
let NEWS_PERM = { unitOn:false, unitMode:'todos', unitRoles:['gerente'], centralOn:true, mode:'todos', members:[1027,978,1] };
const UNIT_ROLES = [['franqueado','Franqueado','fa-crown'],['gerente','Gerente de unidade','fa-user-tie'],['colaborador','Colaborador','fa-user']];
const npermModal = $('#npermModal');
let npermSearchVal = '', npermPickSearch = '';
function renderNewsPerm(){
  var _u=$('#permUnitOn'); if(_u) _u.checked = NEWS_PERM.unitOn;
  $$('input[name="npermUnitMode"]').forEach(r=>{ r.checked = (r.value===NEWS_PERM.unitMode); });
  var _urw=$('#permUnitRolesWrap'); if(_urw) _urw.style.display = (NEWS_PERM.unitMode==='especificos') ? '' : 'none';
  const rc=$('#unitRoleCount'); if(rc) rc.textContent=NEWS_PERM.unitRoles.length; var _ur=$('#permUnitRoles'); if(_ur) _ur.innerHTML = (NEWS_PERM.unitRoles.length?('<table><tbody>'+NEWS_PERM.unitRoles.map(rid=>{const u=UNIT_ROLES.find(x=>x[0]===rid)||[rid,rid,'fa-user'];return '<tr><td><div class="perm-person"><span class="avatar" style="background:linear-gradient(135deg,#4d96e8,#1e4fb0)"><i class="fa-solid '+u[2]+'"></i></span><div><b>'+u[1]+'</b></div></div></td><td style="text-align:right"><button class="perm-remove" data-role="'+rid+'"><i class="fa-solid fa-trash-can"></i> Remover</button></td></tr>';}).join('')+'</tbody></table>'):'<div class="perm-empty">Nenhum cargo. Clique em \u201cAdicionar cargo\u201d.</div>');
  var _c=$('#permCentralOn'); if(_c) _c.checked = NEWS_PERM.centralOn;
  $$('input[name="npermMode"]').forEach(r => { r.checked = (r.value === NEWS_PERM.mode); });
  var _pm=$('#npermMembers'); if(_pm) _pm.style.display = NEWS_PERM.mode==='selecionados' ? '' : 'none';
  var _pc=$('#npermCount'); if(_pc) _pc.textContent = NEWS_PERM.members.length;
  let list = NEWS_PERM.members.map(personById).filter(Boolean);
  if (npermSearchVal) list = list.filter(p => rxNorm(p.name).includes(rxNorm(npermSearchVal)));
  const el = $('#npermList');
  if (!el) return;
  if (!list.length){ el.innerHTML = '<div class="perm-empty">Nenhuma pessoa autorizada. Clique em “Adicionar membro”.</div>'; }
  else el.innerHTML = '<table><thead><tr><th style="width:90px">ID</th><th>Colaborador</th><th style="width:130px;text-align:right">Remover</th></tr></thead><tbody>'+
    list.map(p => '<tr data-id="'+p.id+'"><td class="perm-id">#'+p.id+'</td>'+
      '<td><div class="perm-person"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>'+p.role+'</span></div></div></td>'+
      '<td style="text-align:right"><button class="perm-remove" data-id="'+p.id+'"><i class="fa-solid fa-trash-can"></i> Remover</button></td></tr>').join('')+'</tbody></table>';
  // summaries (card mode)
  if(!permWhoOpen){ $('#permUnitBody').style.display='none'; $('#permCentralBody').style.display='none'; }
  const uCard=$('#permUnitFoot')?$('#permUnitFoot').closest('.perm-card'):null; if(uCard) uCard.classList.toggle('on',NEWS_PERM.unitOn);
  const cCard=$('#permCentralFoot')?$('#permCentralFoot').closest('.perm-card'):null; if(cCard) cCard.classList.toggle('on',NEWS_PERM.centralOn);
  const uF=$('#permUnitFoot'); if(uF){ if(NEWS_PERM.unitOn){ const some=NEWS_PERM.unitMode!=='todos'; const n=UNIT_SEL.pub.length; uF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" checked data-disable="unit"><span class="nv-tk"></span> Ativo</label><div class="perm-who"><div class="perm-who-lbl">Quem pode publicar</div><div class="perm-radiogrp">'+
    '<div class="perm-radio'+(!some?' on':'')+'" data-seg="unit-todos"><span class="pr-dot"></span><span class="pr-body"><b>Todas as unidades</b><span>Qualquer unidade vinculada à rede.</span></span></div>'+
    '<div class="perm-radio'+(some?' on':'')+'" data-seg="unit-alguns"><span class="pr-dot"></span><span class="pr-body"><b>Unidades selecionadas</b><span>Você escolhe as unidades que publicam.</span>'+
    (some?'<div class="perm-pickwrap"><button type="button" class="perm-pickbtn" data-unitpick="pub">'+NV_ICON_EDIT+' Selecionar unidades</button><span class="perm-who-count">'+n+' unidade(s) selecionada(s)</span></div>':'')+
    '</span></div></div></div>'; } else uF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" data-enable="unit"><span class="nv-tk"></span> <span class="tgtxt">Inativo</span></label>'; }
  const cF=$('#permCentralFoot'); if(cF){ if(NEWS_PERM.centralOn){ const some=NEWS_PERM.mode!=='todos'; const n=NEWS_PERM.members.length; cF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" checked data-disable="central"><span class="nv-tk"></span> Ativo</label><div class="perm-who"><div class="perm-who-lbl">Quem pode publicar</div><div class="perm-radiogrp">'+
    '<div class="perm-radio'+(!some?' on':'')+'" data-seg="central-todos"><span class="pr-dot"></span><span class="pr-body"><b>Todos da matriz</b><span>Qualquer colaborador vinculado à matriz.</span></span></div>'+
    '<div class="perm-radio'+(some?' on':'')+'" data-seg="central-alguns"><span class="pr-dot"></span><span class="pr-body"><b>Somente pessoas selecionadas</b><span>Você escolhe os colaboradores que publicam.</span>'+
    (some?'<div class="perm-pickwrap"><button type="button" class="perm-pickbtn" data-which="central">'+NV_ICON_EDIT+' Selecionar pessoas</button><span class="perm-who-count">'+n+' pessoa(s) selecionada(s)</span></div>':'')+
    '</span></div></div></div>'; } else cF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" data-enable="central"><span class="nv-tk"></span> <span class="tgtxt">Inativo</span></label>'; }
}
let permWhoOpen=null, permWhoParent=null, permWhoNext=null;
function openPermWho(which){
  const body = which==='unit'?$('#permUnitBody'):$('#permCentralBody');
  permWhoOpen=which; permWhoParent=body.parentNode; permWhoNext=body.nextSibling;
  $('#permWhoTitle').textContent = which==='unit'?'Quem pode publicar · Unidades':'Quem pode publicar · Sua Marca (Matriz)';
  body.style.display=''; $('#permWhoBody').appendChild(body);
  $('#permWhoModal').classList.add('open');
}
function closePermWho(){ if(permStoriesOpen){ closePermShortsWho(); return; } if(permWhoOpen){ const body=permWhoOpen==='unit'?$('#permUnitBody'):$('#permCentralBody'); if(permWhoParent){ permWhoParent.insertBefore(body, permWhoNext); } } permWhoOpen=null; $('#permWhoModal').classList.remove('open'); renderNewsPerm(); }
document.addEventListener('click', e=>{ const en=e.target.closest('[data-enable]'); if(en){ const w=en.dataset.enable; permConfirm('Ativar publicação', 'Deseja permitir que '+(w==='unit'?'as unidades':'a central')+' publiquem na rede?', ()=>{ if(w==='unit') NEWS_PERM.unitOn=true; else NEWS_PERM.centralOn=true; renderNewsPerm(); }); return; } const b=e.target.closest('[data-which]'); if(b && !b.closest('#nvAprSide')){ openPermWho(b.dataset.which); return; } const sg=e.target.closest('[data-seg]'); if(sg){ const v=sg.dataset.seg; if(v==='unit-todos')NEWS_PERM.unitMode='todos'; else if(v==='unit-alguns')NEWS_PERM.unitMode='especificos'; else if(v==='central-todos')NEWS_PERM.mode='todos'; else if(v==='central-alguns')NEWS_PERM.mode='selecionados'; renderNewsPerm(); return; } const d=e.target.closest('[data-disable]'); if(d){ const w=d.dataset.disable; permConfirm('Desativar publicação', 'Deseja bloquear a publicação '+(w==='unit'?'pelas unidades':'pela central')+'? Quem tinha permissão deixará de poder publicar.', ()=>{ if(w==='unit') NEWS_PERM.unitOn=false; else NEWS_PERM.centralOn=false; renderNewsPerm(); }); } });
$('#permWhoClose') && $('#permWhoClose').addEventListener('click', closePermWho);
$('#permWhoModal') && $('#permWhoModal').addEventListener('click', e=>{ if(e.target===$('#permWhoModal')) closePermWho(); });
function renderNewsPermPick(){
  const avail = PEOPLE.filter(p => NEWS_PERM.members.indexOf(p.id)<0 && rxNorm(p.name).includes(rxNorm(npermPickSearch)));
  const el = $('#npermPickList');
  if (!avail.length){ el.innerHTML = '<div class="perm-empty">Todos já foram adicionados.</div>'; return; }
  el.innerHTML = avail.map(p => '<div class="perm-pickrow" data-id="'+p.id+'"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>#'+p.id+' · '+p.role+'</span></div><span class="perm-addic"><i class="fa-solid fa-circle-plus"></i></span></div>').join('');
}
$$('input[name="npermMode"]').forEach(r => r.addEventListener('change', () => { NEWS_PERM.mode = r.value; renderNewsPerm(); }));
$('#permUnitOn') && $('#permUnitOn').addEventListener('change', e=>{ NEWS_PERM.unitOn=e.target.checked; renderNewsPerm(); fgToast(e.target.checked?'Unidades ativadas para publicar':'Unidades desativadas'); });
$$('input[name="npermUnitMode"]').forEach(r=> r.addEventListener('change', ()=>{ NEWS_PERM.unitMode=r.value; renderNewsPerm(); }));
$('#permCentralOn') && $('#permCentralOn').addEventListener('change', e=>{ NEWS_PERM.centralOn=e.target.checked; renderNewsPerm(); fgToast(e.target.checked?'Central ativada para publicar':'Central desativada'); });
$('#permUnitRoles') && $('#permUnitRoles').addEventListener('click', e=>{ const b=e.target.closest('[data-role]'); if(!b) return; NEWS_PERM.unitRoles=NEWS_PERM.unitRoles.filter(x=>x!==b.dataset.role); renderNewsPerm(); });
const UNIT_SEL = { pub:[], story:[] };
let unitPickScope='pub', unitPickQuery='';
function renderUnitPick(){
  const el=$('#unitPickList'); if(!el) return;
  const sel=UNIT_SEL[unitPickScope];
  const list=STORES.filter(s=>!unitPickQuery || rxNorm(s.name).includes(rxNorm(unitPickQuery)) || rxNorm(s.company).includes(rxNorm(unitPickQuery)));
  const chosen = list.filter(s=>sel.includes(s.code));
  const cnt=$('#unitSelCount'); if(cnt) cnt.textContent = sel.length ? sel.length+' unidade(s)' : '';
  if(!chosen.length){ el.innerHTML='<div class="perm-empty">Nenhuma unidade autorizada ainda. Use “Adicionar unidade”.</div>'; return; }
  const rows = chosen.map(s=>'<tr data-unit="'+s.code+'">'+
    '<td class="perm-id">#'+s.code+'</td>'+
    '<td><div class="perm-person"><span class="avatar" style="background:'+s.color+';color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">'+s.ini+'</span><div><b>'+s.name+'</b><span>'+s.company+'</span></div></div></td>'+
    '<td style="text-align:right"><button class="perm-remove" data-unitrm="'+s.code+'"><i class="fa-solid fa-xmark"></i> Remover</button></td></tr>').join('');
  el.innerHTML = '<table><thead><tr><th style="width:90px">Código</th><th>Unidade</th><th style="width:140px;text-align:right">Ações</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function openUnitPick(scope){ unitPickScope=scope; unitPickQuery=''; const s=$('#unitPickSearch'); if(s) s.value=''; renderUnitPick(); $('#unitPickModal').classList.add('open'); }
$('#unitPickClose') && $('#unitPickClose').addEventListener('click', ()=>$('#unitPickModal').classList.remove('open'));
$('#unitPickModal') && $('#unitPickModal').addEventListener('click', e=>{ if(e.target===$('#unitPickModal')) $('#unitPickModal').classList.remove('open'); });
$('#unitPickSearch') && $('#unitPickSearch').addEventListener('input', e=>{ unitPickQuery=e.target.value; renderUnitPick(); });
function unitSelSync(){ if(unitPickScope==='pub'){ if(typeof renderNewsPerm==='function') renderNewsPerm(); } else if(typeof stPermFeet==='function') stPermFeet(); }
$('#unitPickList') && $('#unitPickList').addEventListener('click', e=>{
  const rm=e.target.closest('[data-unitrm]'); if(!rm) return;
  const sel=UNIT_SEL[unitPickScope], i=sel.indexOf(rm.dataset.unitrm);
  if(i>-1) sel.splice(i,1);
  renderUnitPick(); unitSelSync();
});
let unitAddQuery='';
function renderUnitAdd(){
  const el=$('#unitAddList'); if(!el) return;
  const sel=UNIT_SEL[unitPickScope];
  const list=STORES.filter(s=>!sel.includes(s.code) && (!unitAddQuery || rxNorm(s.name).includes(rxNorm(unitAddQuery)) || rxNorm(s.company).includes(rxNorm(unitAddQuery))));
  el.innerHTML = list.length ? list.map(s=>'<div class="perm-pickrow" data-unitadd="'+s.code+'"><span class="avatar" style="background:'+s.color+';color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">'+s.ini+'</span><div><b>'+s.name+'</b><span>'+s.company+'</span></div><span class="perm-add"><i class="fa-solid fa-plus"></i></span></div>').join('') : '<div class="perm-empty">Nenhuma unidade disponível.</div>';
}
$('#unitPickAdd') && $('#unitPickAdd').addEventListener('click', ()=>{ unitAddQuery=''; const s=$('#unitAddSearch'); if(s) s.value=''; renderUnitAdd(); $('#unitAddModal').classList.add('open'); });
$('#unitAddClose') && $('#unitAddClose').addEventListener('click', ()=>$('#unitAddModal').classList.remove('open'));
$('#unitAddModal') && $('#unitAddModal').addEventListener('click', e=>{ if(e.target===$('#unitAddModal')) $('#unitAddModal').classList.remove('open'); });
$('#unitAddSearch') && $('#unitAddSearch').addEventListener('input', e=>{ unitAddQuery=e.target.value; renderUnitAdd(); });
$('#unitAddList') && $('#unitAddList').addEventListener('click', e=>{
  const row=e.target.closest('[data-unitadd]'); if(!row) return;
  UNIT_SEL[unitPickScope].push(row.dataset.unitadd);
  renderUnitAdd(); renderUnitPick(); unitSelSync(); fgToast('Unidade adicionada');
});
function unitSelLabel(scope){ const sel=UNIT_SEL[scope]; return sel.length ? sel.length+' unidade(s) selecionada(s)' : 'Nenhuma unidade selecionada'; }
const uroleModal=$('#uroleModal');
function renderUrolePick(){ const avail=UNIT_ROLES.filter(u=>!NEWS_PERM.unitRoles.includes(u[0])); const el=$('#urolePickList'); el.innerHTML= avail.length? avail.map(u=>'<div class="perm-pickrow" data-role="'+u[0]+'"><span class="avatar" style="background:linear-gradient(135deg,#4d96e8,#1e4fb0)"><i class="fa-solid '+u[2]+'"></i></span><div><b>'+u[1]+'</b></div><span class="perm-add"><i class="fa-solid fa-plus"></i></span></div>').join('') : '<div class="perm-empty">Todos os cargos já foram adicionados.</div>'; }
$('#unitRoleAdd') && $('#unitRoleAdd').addEventListener('click', ()=>{ renderUrolePick(); uroleModal.classList.add('open'); });
$('#uroleModalClose') && $('#uroleModalClose').addEventListener('click', ()=>uroleModal.classList.remove('open'));
uroleModal && uroleModal.addEventListener('click', e=>{ if(e.target===uroleModal) uroleModal.classList.remove('open'); });
$('#urolePickList') && $('#urolePickList').addEventListener('click', e=>{ const row=e.target.closest('[data-role]'); if(!row) return; if(!NEWS_PERM.unitRoles.includes(row.dataset.role)) NEWS_PERM.unitRoles.push(row.dataset.role); renderUrolePick(); renderNewsPerm(); });
$('#permSave') && $('#permSave').addEventListener('click', ()=>fgToast('Permissões salvas'));
$$('.perm-tab').forEach(t=> t.addEventListener('click', ()=>{ $$('.perm-tab').forEach(x=>x.classList.toggle('on',x===t)); const s=t.dataset.step; $('#permStep1').style.display=(s==='1')?'':'none'; $('#permApprCard').style.display=(s==='2')?'':'none'; }));
$('#npermAdd').addEventListener('click', () => { npermPickSearch=''; $('#npermPickSearch').value=''; renderNewsPermPick(); npermModal.classList.add('open'); setTimeout(()=>$('#npermPickSearch').focus(),30); });
$('#npermModalClose').addEventListener('click', () => npermModal.classList.remove('open'));
npermModal.addEventListener('click', e => { if(e.target===npermModal) npermModal.classList.remove('open'); });
$('#npermSearch').addEventListener('input', e => { npermSearchVal = e.target.value; renderNewsPerm(); });
$('#npermPickSearch').addEventListener('input', e => { npermPickSearch = e.target.value; renderNewsPermPick(); });
$('#npermPickList').addEventListener('click', e => { const row = e.target.closest('.perm-pickrow'); if(!row) return; const id=+row.dataset.id; if(NEWS_PERM.members.indexOf(id)<0){ NEWS_PERM.members.push(id); fgToast('Membro adicionado'); } renderNewsPermPick(); renderNewsPerm(); });
$('#npermList').addEventListener('click', e => { const btn = e.target.closest('.perm-remove'); if(!btn) return; const id=+btn.dataset.id; NEWS_PERM.members = NEWS_PERM.members.filter(m=>m!==id); fgToast('Membro removido'); renderNewsPerm(); });

foBody.addEventListener('click', e => {
  if (e.target.closest('[data-reply-focus]')){ const inp=$('#foReplyInput'); if(inp) inp.focus(); return; }
  if (e.target.closest('#foReplyBtn')){
    const inp=$('#foReplyInput'); const txt=(inp&&inp.value||'').trim(); if(!txt) return;
    const t=(FO_TOPICS[foState.group]||[]).find(x=>x.id===foState.topic);
    FO_REPLIES[foState.topic]=FO_REPLIES[foState.topic]||[];
    FO_REPLIES[foState.topic].push({name:'Rodrigo Caetano',av:'av-rc',role:'CEO · SULTS',text:txt});
    if(t) t.replies=(t.replies||0)+1;
    renderForum(); foScroll.scrollTop=foScroll.scrollHeight;
    return;
  }
  const join = e.target.closest('.fo-join');
  if (join){ e.stopPropagation(); if(!join.classList.contains('sent')){ join.classList.add('sent'); join.textContent = join.textContent==='Participar'?'Participando':'Pedido enviado'; } return; }
  const tabBtn = e.target.closest('.fo-tab');
  if (tabBtn){ foState.tab = tabBtn.dataset.tab; renderForum(); return; }
  const fchip = e.target.closest('.fo-fchip');
  if (fchip){ foState.filter = fchip.dataset.filter; renderForum(); return; }
  if (e.target.closest('#foCreate')){ fgOpen(); return; }
  if (e.target.closest('#foNewTopic')){ ntOpen(); return; }
  const back = e.target.closest('[data-back]');
  if (back){ foState.screen = back.dataset.back === 'group' ? 'group' : 'home'; renderForum(); return; }
  const like = e.target.closest('.fo-plike, .fo-rlike');
  if (like){ like.classList.toggle('liked'); like.style.color = like.classList.contains('liked') ? 'var(--teal)' : ''; return; }
  const topicRow = e.target.closest('[data-topic]');
  if (topicRow){ foState.screen='topic'; foState.topic = topicRow.dataset.topic; renderForum(); return; }
  const gcard = e.target.closest('[data-group]');
  if (gcard){ foState.screen='group'; foState.group = gcard.dataset.group; foState.tab='disc'; foState.filter='todos'; renderForum(); return; }
});

/* ---------- Modal Criar grupo ---------- */
const fgModal = $('#fgModal');
const FG_COLORS = ['#00acac','#2f6fe4','#27a689','#7a52c7','#f0327e','#e08e00','#d9453e','#34597a'];
const FG_ICONS = ['fa-comments','fa-store','fa-palette','fa-graduation-cap','fa-cart-shopping','fa-chart-line','fa-handshake','fa-clipboard-check','fa-rocket','fa-users','fa-bullhorn','fa-gear'];
let fgStep = 1, fgColor = '#00acac', fgIcon = 'fa-comments', fgPriv = 'aberto';

function fgBuildPickers(){
  $('#fgSwatches').innerHTML = FG_COLORS.map(c=>'<span class="fg-sw'+(c===fgColor?' on':'')+'" data-color="'+c+'" style="background:'+c+'">'+(c===fgColor?'<i class="fa-solid fa-check"></i>':'')+'</span>').join('');
  $('#fgIcons').innerHTML = FG_ICONS.map(ic=>'<button class="fg-ic'+(ic===fgIcon?' on':'')+'" data-icon="'+ic+'"><i class="fa-solid '+ic+'"></i></button>').join('');
  fgUpdatePreview();
}
function fgUpdatePreview(){
  const name = ($('#fgName').value || 'Nome do grupo');
  const desc = ($('#fgDesc').value || 'Descrição do grupo');
  $('#fgPreview').innerHTML =
    '<div class="fo-gcard" style="cursor:default"><div class="fo-cover" style="background:'+fgColor+'"><i class="fa-solid '+fgIcon+' fo-wm"></i></div>'+
    '<div class="fo-gchip" style="background:'+fgColor+'"><i class="fa-solid '+fgIcon+'"></i></div>'+
    '<div class="fo-gbody"><div class="fo-gname">'+name+'</div><div class="fo-gdesc">'+desc+'</div></div></div>';
}
function fgGoStep(s){
  fgStep = s;
  $$('#fgModal .fg-pane').forEach(p=>p.classList.toggle('on', +p.dataset.p===s));
  $$('#fgModal .fg-step').forEach(p=>p.classList.toggle('on', +p.dataset.s===s));
  $('#fgBack').style.display = s===1 ? 'none' : 'inline-flex';
  $('#fgNext').textContent = s===3 ? 'Criar grupo' : 'Continuar';
}
function fgOpen(){ fgStep=1; fgColor='#00acac'; fgIcon='fa-comments'; fgPriv='aberto'; $('#fgName').value=''; $('#fgDesc').value=''; fgBuildPickers(); fgGoStep(1); fgModal.classList.add('open'); }
function fgClose(){ fgModal.classList.remove('open'); }
function fgToast(msg){
  const w = $('#toastWrap'); if(!w) return;
  const el = document.createElement('div'); el.textContent = msg;
  const dev = /^Nota DEV:/.test(msg);
  el.style.cssText='pointer-events:auto;background:'+(dev?'#FFB020':'#12C55B')+';color:'+(dev?'#3D2600':'#fff')+';padding:12px 18px;border-radius:6px;font-size:13px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,.1);animation:toastIn .2s cubic-bezier(.4,0,.2,1)';
  w.appendChild(el);
  setTimeout(()=>{ el.style.animation='toastOut .2s cubic-bezier(.4,0,.2,1) forwards'; setTimeout(()=>el.remove(), 220); }, 3300);
}

$('#fgClose').addEventListener('click', fgClose);
fgModal.addEventListener('click', e => { if (e.target === fgModal) fgClose(); });
$('#fgBack').addEventListener('click', () => fgGoStep(Math.max(1, fgStep-1)));
$('#fgNext').addEventListener('click', () => {
  if (fgStep < 3){ fgGoStep(fgStep+1); return; }
  const name = $('#fgName').value.trim() || 'Novo grupo';
  fgClose(); fgToast('Grupo '+name+' criado · Ver grupo');
});
$('#fgSwatches').addEventListener('click', e => { const s=e.target.closest('[data-color]'); if(!s)return; fgColor=s.dataset.color; fgBuildPickers(); });
$('#fgIcons').addEventListener('click', e => { const b=e.target.closest('[data-icon]'); if(!b)return; fgIcon=b.dataset.icon; fgBuildPickers(); });
$$('#fgModal input').forEach(i=>{}); 
fgModal.addEventListener('input', e => { if(e.target.id==='fgName'||e.target.id==='fgDesc') fgUpdatePreview(); });
fgModal.addEventListener('click', e => {
  const r = e.target.closest('.fg-radio'); if(r){ $$('#fgModal .fg-radio').forEach(x=>x.classList.remove('on')); r.classList.add('on'); fgPriv=r.dataset.priv; }
  const tg = e.target.closest('#fgAuto'); if(tg){ tg.classList.toggle('on'); }
});
document.addEventListener('keydown', e => { if(e.key==='Escape' && fgModal.classList.contains('open')) fgClose(); });

/* ---------- Modal Novo tópico ---------- */
const ntModal = $('#ntModal');
function ntOpen(){ $('#ntTitle').value=''; $('#ntBody').value=''; $('#ntTags').value=''; ntModal.classList.add('open'); setTimeout(()=>$('#ntTitle').focus(), 60); }
function ntClose(){ ntModal.classList.remove('open'); }
$('#ntClose').addEventListener('click', ntClose);
ntModal.addEventListener('click', e => { if (e.target === ntModal) ntClose(); });
$('#ntPublish').addEventListener('click', () => {
  const title = $('#ntTitle').value.trim();
  if (!title){ $('#ntTitle').focus(); return; }
  const body = $('#ntBody').value.trim();
  const tags = $('#ntTags').value.split(',').map(s=>s.trim()).filter(Boolean);
  const g = foGroupById(foState.group);
  const id = 'n' + Date.now();
  const topic = { id, title, snippet: body || 'Novo tópico', author:'Rodrigo Caetano', av:'av-rc', role:'CEO', unit:'SULTS', time:'agora', replies:0, views:1, resolved:false, unanswered:true, tags, body };
  FO_TOPICS[g.id] = FO_TOPICS[g.id] || [];
  const idx = FO_TOPICS[g.id].findIndex(t => !t.pinned);
  FO_TOPICS[g.id].splice(idx < 0 ? FO_TOPICS[g.id].length : idx, 0, topic);
  g.topics += 1;
  ntClose();
  foState.screen='topic'; foState.topic=id; renderForum();
  fgToast('Tópico publicado');
});
document.addEventListener('keydown', e => { if(e.key==='Escape' && ntModal.classList.contains('open')) ntClose(); });

/* ---------- Modal Criar reel (estilo Instagram, sem etapa de edição) ---------- */
const crModal = $('#crModal');
let crURL = null, crIsVideo = false;
function crOpen(){ crURL=null; crIsVideo=false; crCoverURL=null; crCapaAuto=false; crTab='video'; const _up=document.getElementById('crStepUp'); if(_up) _up.style.display='none'; const _x=document.getElementById('crClose'); if(_x) _x.hidden=false; const _pv=document.getElementById('crPreviewVid'); if(_pv) _pv.style.display='none'; const _p=document.getElementById('crPreview'); if(_p) _p.style.display=''; const sc=$('#crStepCrop'); if(sc) sc.style.display='none'; $('#crStep1').style.display='flex'; $('#crStep2').style.display='none'; $('#crTitle').textContent='Novo short'; $('#crCaption').value=''; $('#crTitleInput').value=''; if(typeof crCatRender==='function') crCatRender(); $('#crShare').disabled=true; $('#crFile').value=''; crModal.classList.add('open'); }
function crClose(){ crModal.classList.remove('open'); const u=document.getElementById('crStepUp'); if(u) u.style.display='none'; }
$('#crClose').addEventListener('click', crClose);
crModal.addEventListener('click', e => { if (e.target === crModal) crClose(); });
$('#crPick').addEventListener('click', () => $('#crFile').click());

$('#crFile').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  crIsVideo = /^video\//.test(f.type);
  crURL = URL.createObjectURL(f);
  $('#crPreview').src = crURL;
  $('#crStep1').style.display='none';
  crShowLoading(crIsVideo?'Carregando seu vídeo…':'Carregando sua imagem…', (crIsVideo?'Estamos preparando a pré-visualização do seu vídeo.':'Estamos preparando a pré-visualização da sua imagem.')+' Não feche esta janela.');
  setTimeout(function(){ crHideLoading(); crOpenCrop(); }, 2100);
});
function crShowLoading(t,s){
  const u=$('#crStepUp'); if(!u) return;
  $('#crStep1').style.display='none';
  const s2=$('#crStep2'); if(s2) s2.style.display='none';
  u.querySelector('.cr-uptitle').textContent=t;
  u.querySelector('.cr-upsub').textContent=s;
  u.style.display='flex';
  /* nada de fechar no meio do carregamento */
  const x=$('#crClose'); if(x) x.hidden=true;
}
function crHideLoading(){
  const u=$('#crStepUp'); if(u) u.style.display='none';
  const x=$('#crClose'); if(x) x.hidden=false;
}
let crcZoomV=100, crcX=0, crcY=0, crcDrag=null;
function crcMedia(){ return crIsVideo ? $('#crcVid') : $('#crcImg'); }
function crcClamp(){
  const im=crcMedia(), f=$('#crcFrame'); if(!im||!f) return;
  const s=crcZoomV/100;
  const nw=im.naturalWidth||im.videoWidth||1, nh=im.naturalHeight||im.videoHeight||1;
  const w=(parseFloat(im.style.width)||nw)*s;
  const hgt=(parseFloat(im.style.height)||nh)*s;
  const maxX=Math.max(0,(w-f.clientWidth)/2), maxY=Math.max(0,(hgt-f.clientHeight)/2);
  crcX=Math.min(maxX,Math.max(-maxX,crcX));
  crcY=Math.min(maxY,Math.max(-maxY,crcY));
}
function crcApply(){ const im=crcMedia(); if(!im) return; crcClamp(); im.style.transform='translate(-50%,-50%) translate('+crcX+'px,'+crcY+'px) scale('+(crcZoomV/100)+')'; }
function crOpenCrop(){ crGoStep2(); }
function crGoStep2(){
  crHideLoading();
  $('#crStep1').style.display='none';
  const st=$('#crStepCrop'); if(st) st.style.display='none';
  $('#crStep2').style.display='';
  $('#crTitle').textContent='Novo short';
  crPreviaMonta();
}
function crOpenCropLegacy(){
  $('#crStep2').style.display='none';
  const st=$('#crStepCrop'); st.style.display='flex';
  $('#crTitle').textContent='Ajustar imagem';
  const img=$('#crcImg'), vid=$('#crcVid');
  img.hidden=crIsVideo; vid.hidden=!crIsVideo;
  crcX=0; crcY=0; crcZoomV=100; $('#crcZoom').value=100; const lb=$('#crcZoomV'); if(lb) lb.textContent='100%';
  const fit=function(el,nw,nh){ const f=$('#crcFrame'); if(!nw||!nh) return; const sc=Math.max(f.clientWidth/nw, f.clientHeight/nh); el.style.width=(nw*sc)+'px'; el.style.height=(nh*sc)+'px'; crcApply(); };
  const tr=$('#crcTrim'); if(tr) tr.hidden=!crIsVideo;
  if(crIsVideo){ vid.src=crURL; vid.onloadedmetadata=function(){ fit(vid, vid.videoWidth, vid.videoHeight); crTrimInit(); vid.play().catch(function(){}); }; if(vid.videoWidth) vid.onloadedmetadata(); }
  else { img.src=crURL; img.onload=function(){ fit(img, img.naturalWidth, img.naturalHeight); }; if(img.complete && img.naturalWidth) img.onload(); }
}
function crcSetZoom(v){ crcZoomV=Math.min(300,Math.max(100,v)); $('#crcZoom').value=crcZoomV; const lb=$('#crcZoomV'); if(lb) lb.textContent=Math.round(crcZoomV)+'%'; crcApply(); }
$('#crcZoom') && $('#crcZoom').addEventListener('input', e=>crcSetZoom(+e.target.value));
$('#crcFrame') && $('#crcFrame').addEventListener('wheel', e=>{ e.preventDefault(); crcSetZoom(crcZoomV + (e.deltaY<0?8:-8)); }, {passive:false});
$('#crcReset') && $('#crcReset').addEventListener('click', ()=>{ crcX=0; crcY=0; crcSetZoom(100); });
let crTrimA=0, crTrimB=0, crDur=0;
function fmtT(s){ s=Math.max(0,s); const m=Math.floor(s/60), r=Math.floor(s%60); return m+':'+('0'+r).slice(-2); }
function crTrimRender(){
  const bar=$('#crcTrimBar'), sel=$('#crcTrimSel'), L=$('#crcTrimL'), R=$('#crcTrimR');
  if(!bar||!crDur) return;
  const w=bar.clientWidth;
  const a=(crTrimA/crDur)*w, b=(crTrimB/crDur)*w;
  sel.style.left=a+'px'; sel.style.width=Math.max(4,b-a)+'px';
  L.style.left=Math.max(0,a-8)+'px'; R.style.left=Math.min(w-16,b-8)+'px';
  $('#crcTrimInfo').textContent='· '+fmtT(crTrimA)+' → '+fmtT(crTrimB)+' ('+fmtT(crTrimB-crTrimA)+')';
}
function crTrimInit(){
  const v=$('#crcVid'); crDur=v.duration||0; crTrimA=0; crTrimB=crDur; crTrimRender();
  v.ontimeupdate=function(){ if(v.currentTime>crTrimB-0.05||v.currentTime<crTrimA-0.05){ v.currentTime=crTrimA; } };
}
(function(){
  let drag=null;
  const bar=$('#crcTrimBar'); if(!bar) return;
  function pos(e){ const r=bar.getBoundingClientRect(); return Math.min(1,Math.max(0,(e.clientX-r.left)/r.width))*crDur; }
  ['crcTrimL','crcTrimR'].forEach(function(id){
    const el=document.getElementById(id); if(!el) return;
    el.addEventListener('pointerdown', function(e){ e.preventDefault(); drag=id; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', function(e){ if(drag!==id) return; const t=pos(e);
      if(id==='crcTrimL') crTrimA=Math.min(t, crTrimB-0.5); else crTrimB=Math.max(t, crTrimA+0.5);
      const v=$('#crcVid'); if(v) v.currentTime=(id==='crcTrimL'?crTrimA:Math.max(crTrimA,crTrimB-0.1));
      crTrimRender(); });
    el.addEventListener('pointerup', function(){ drag=null; });
  });
})();
$('#crcFrame') && $('#crcFrame').addEventListener('pointerdown', e=>{ crcDrag={x:e.clientX-crcX,y:e.clientY-crcY}; $('#crcFrame').classList.add('drag'); $('#crcFrame').setPointerCapture(e.pointerId); });
$('#crcFrame') && $('#crcFrame').addEventListener('pointermove', e=>{ if(!crcDrag) return; crcX=e.clientX-crcDrag.x; crcY=e.clientY-crcDrag.y; crcApply(); });
$('#crcFrame') && $('#crcFrame').addEventListener('pointerup', ()=>{ crcDrag=null; $('#crcFrame').classList.remove('drag'); });
$('#crcBack') && $('#crcBack').addEventListener('click', ()=>{ $('#crStepCrop').style.display='none'; $('#crStep1').style.display='flex'; $('#crTitle').textContent='Novo short'; $('#crFile').value=''; });
$('#crcNext') && $('#crcNext').addEventListener('click', ()=>{
  $('#crStepCrop').style.display='none'; $('#crStep2').style.display=''; $('#crTitle').textContent='Nova publicação';
  const v=$('#crcVid'); if(v) v.pause();
  crPreviaMonta();
});
let crCoverURL = null, crCapaAuto = false, crTab = 'video';
/* A previa fica num palco de tamanho fixo (formato do short): o video e a capa
   se sobrepoem, entao trocar de aba nao redimensiona nada. O video mostra os
   controles nativos para pausar e avancar. */
function crPreviaMonta(){
  const pv=document.getElementById('crPreview'), palco=document.getElementById('crStage');
  if(!pv || !palco) return;
  let pvv=document.getElementById('crPreviewVid');
  if(crIsVideo){
    if(!pvv){ pvv=document.createElement('video'); pvv.id='crPreviewVid'; pvv.muted=true; pvv.loop=true;
      pvv.autoplay=true; pvv.playsInline=true; palco.insertBefore(pvv, pv); crVideoLiga(pvv); }
    if(pvv.getAttribute('src')!==crURL) pvv.src=crURL;
    crCapaPrimeiroFrame();
  } else if(pvv){ pvv.removeAttribute('src'); pvv.load(); }
  crMostra(crIsVideo ? crTab : 'video');
}
/* Capa padrao: o primeiro quadro do video, tirado num elemento separado para
   nao mexer na previa que esta tocando. So substitui a capa automatica. */
function crCapaPrimeiroFrame(){
  if(!crIsVideo || !crURL || (crCoverURL && !crCapaAuto)) return;
  const v=document.createElement('video');
  v.muted=true; v.playsInline=true; v.preload='auto'; v.src=crURL;
  let pego=false;
  function pega(){
    if(pego) return; pego=true;
    try{
      const c=document.createElement('canvas');
      c.width=v.videoWidth||720; c.height=v.videoHeight||1280;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      crCoverURL=c.toDataURL('image/jpeg', .86); crCapaAuto=true;
      if(crTab==='capa') crMostra('capa');
    }catch(e){}
    v.removeAttribute('src'); v.load();
  }
  v.addEventListener('loadeddata', function(){
    const alvo=Math.min(.1, (v.duration||1)/10);
    if(v.currentTime<alvo){ try{ v.currentTime=alvo; }catch(e){ pega(); } } else pega();
  });
  v.addEventListener('seeked', pega);
  v.addEventListener('error', pega);
}
/* Controles proprios, como na referencia: play grande no meio, play e som no
   topo e uma barra fina embaixo para avancar. */
function crVideoLiga(v){
  const big=document.getElementById('crVbig'), barra=document.getElementById('crVbarIn');
  function pinta(){
    const tocando=!v.paused && !v.ended;
    if(big) big.hidden = tocando || !(crIsVideo && crTab==='video');
    document.querySelectorAll('#crVctl [data-vplay] i').forEach(function(i){ i.className='fa-solid fa-'+(tocando?'pause':'play'); });
    document.querySelectorAll('#crVctl [data-vmute] i').forEach(function(i){ i.className='fa-solid fa-volume-'+(v.muted?'xmark':'high'); });
  }
  v.addEventListener('play', pinta); v.addEventListener('pause', pinta);
  v.addEventListener('volumechange', pinta);
  v.addEventListener('timeupdate', function(){ if(barra && v.duration) barra.style.width=(v.currentTime/v.duration*100)+'%'; });
  v.addEventListener('click', function(){ crVideoPlay(); });
  const bar=document.getElementById('crVbar');
  if(bar) bar.addEventListener('click', function(e){
    const r=bar.getBoundingClientRect();
    if(v.duration) v.currentTime = Math.max(0, Math.min(1, (e.clientX-r.left)/r.width)) * v.duration;
  });
  pinta();
}
function crVideoPlay(){
  const v=document.getElementById('crPreviewVid'); if(!v) return;
  if(v.paused) v.play().catch(function(){}); else v.pause();
}
/* Ajuste da midia no palco. Diferente dos cards, aqui nada e recortado: se a
   proporcao nao for a do short (9:16, com 2% de tolerancia), a midia aparece
   inteira e a sobra fica com ela mesma desfocada atras. O 0.85 do ajustaFundo
   deixava passar tudo entre 9:16 e 0.85 no modo recorte, que era o caso das
   fotos 3:4 e 4:5 cortadas em cima e embaixo. */
function crAjustaPalco(el){
  const palco=document.getElementById('crStage'); if(!el || !palco) return;
  function aplica(){
    const w=el.videoWidth||el.naturalWidth, h=el.videoHeight||el.naturalHeight;
    if(!w || !h) return;
    const alvo=9/16, fora=Math.abs((w/h)-alvo)/alvo > .02;
    el.classList.toggle('wide', fora);
    const fonte = el.tagName==='VIDEO' ? (el.poster||el.currentSrc||el.src) : (el.currentSrc||el.src);
    if(fora && fonte){ palco.style.setProperty('--fundo-src','url("'+fonte+'")'); palco.classList.add('tem-fundo'); }
    else { palco.classList.remove('tem-fundo'); palco.style.removeProperty('--fundo-src'); }
  }
  if(el.tagName==='VIDEO'){ el.readyState>=1 ? aplica() : el.addEventListener('loadedmetadata', aplica, {once:true}); }
  else { (el.complete && el.naturalWidth) ? aplica() : el.addEventListener('load', aplica, {once:true}); }
}
function crTabsSync(){
  const tabs=document.getElementById('crTabs'); if(!tabs) return;
  tabs.hidden = !crIsVideo;
  if(!crIsVideo) crTab='video';
  tabs.querySelectorAll('[data-crtab]').forEach(function(b){ b.classList.toggle('on', b.dataset.crtab===crTab); });
  const bt=document.getElementById('crAltCapa');
  if(bt){
    bt.hidden = !(crIsVideo && crTab==='capa');
    /* com capa enviada, o botao passa a remover; sem ela, volta a enviar */
    const propria = !!crCoverURL && !crCapaAuto;
    const tx=document.getElementById('crAltCapaTx'); if(tx) tx.textContent = propria ? 'Remover capa' : 'Enviar personalizada';
    const ic=bt.querySelector('i'); if(ic) ic.className = 'fa-solid ' + (propria ? 'fa-trash-can' : 'fa-cloud-arrow-up');
    bt.classList.toggle('remover', propria);
  }
  const noVideo = crIsVideo && crTab==='video';
  const v=document.getElementById('crPreviewVid');
  ['crVctl','crVbar'].forEach(function(id){ const e=document.getElementById(id); if(e) e.hidden=!noVideo; });
  const big=document.getElementById('crVbig'); if(big) big.hidden = !noVideo || !!(v && !v.paused && !v.ended);
}
function crMostra(qual){
  crTab = qual;
  const pv=document.getElementById('crPreview'), pvv=document.getElementById('crPreviewVid');
  if(crIsVideo && qual==='video'){
    if(pvv){ pvv.style.display=''; pvv.play().catch(function(){}); }
    if(pv) pv.style.display='none';
    crAjustaPalco(pvv);
  } else {
    if(pvv){ pvv.pause(); pvv.style.display='none'; }
    if(pv){
      pv.style.display='';
      const nova = crIsVideo ? (crCoverURL || crURL) : crURL;
      if(pv.getAttribute('src')!==nova) pv.src=nova;
      /* o fundo desfocado e recalculado para a midia que esta na tela */
      pv.classList.remove('wide'); crAjustaPalco(pv);
    }
  }
  crTabsSync();
}
document.addEventListener('click', function(e){
  const b=e.target.closest('#crTabs [data-crtab]'); if(b){ crMostra(b.dataset.crtab); return; }
  if(e.target.closest('#crAltCapa')){
    if(crCoverURL && !crCapaAuto) crCapaRemove(); else $('#crCoverFile').click();
    return;
  }
  if(e.target.closest('#crVbig,#crVctl [data-vplay]')){ crVideoPlay(); return; }
  const mu=e.target.closest('#crVctl [data-vmute]');
  if(mu){ const v=document.getElementById('crPreviewVid'); if(v) v.muted=!v.muted; }
});
$('#crCoverFile') && $('#crCoverFile').addEventListener('change', e=>{
  const f=e.target.files[0]; if(!f) return;
  crCoverURL=URL.createObjectURL(f); crCapaAuto=false;
  crMostra('capa');
  fgToast('Capa atualizada');
});
/* volta para o primeiro quadro do video */
function crCapaRemove(){
  crCoverURL=null; crCapaAuto=false;
  const inp=$('#crCoverFile'); if(inp) inp.value='';
  crCapaPrimeiroFrame();
  crMostra('capa');
  fgToast('Capa personalizada removida');
}
$('#crTitleInput') && $('#crTitleInput').addEventListener('input', e=>{ $('#crShare').disabled = !e.target.value.trim(); });
$('#crShare').addEventListener('click', () => {
  if (!crURL) return;
  const titulo = $('#crTitleInput').value.trim();
  if (!titulo){ $('#crTitleInput').focus(); fgToast('Informe o título do short'); return; }
  const desc = $('#crCaption').value.trim();
  const cap = desc || titulo;
  const catName = crCatSel || (NEWS_CATS[0]&&NEWS_CATS[0].name);
  const catObj = (typeof CATEGORIES!=='undefined') ? CATEGORIES.find(c=>c.name===catName) : null;
  const cat = catObj ? catObj.id : 'eventos';
  POSTS.push({ name:'Rodrigo Caetano', label:'Rodrigo', role:'CEO · SULTS', av:'av-rc', initials:'RC', img:(crIsVideo?crCoverURL:crURL), video:(crIsVideo?crURL:null), alt:titulo, title:(titulo.length>34?titulo.slice(0,34)+'…':titulo), time:'agora' });
  REELS_DATA.unshift({ p:POSTS.length-1, cat:cat, cap:cap, format:(crIsVideo?'video':'imagem'), likes:'0', comments:0, views:'0', rec:false, music:'Rodrigo Caetano · Áudio original' });
  seenShorts.delete(POSTS.length-1);
  crShowLoading('Enviando seu short…','Isso leva alguns minutos. Não feche esta janela.');
  $('#crTitle').textContent='Enviando short';
  setTimeout(function(){
    crHideLoading();
    crClose(); buildStories();
    if (reelsView.classList.contains('open')){ foBuildReelFilters(); renderGrid(); }
    fgToast('Short publicado');
  }, 3400);
});
document.addEventListener('keydown', e => { if(e.key==='Escape' && crModal.classList.contains('open')) crClose(); });
(function(){
  var adv=document.getElementById('crAdv'), panel=document.getElementById('crAdvPanel');
  if(adv&&panel) adv.addEventListener('click', function(){ advMoveAud('crAudSlot','crAudBtn','crAudMenu'); panel.hidden=false; adv.classList.add('on'); });
  var back=document.getElementById('crAdvBack');
  if(back&&panel) back.addEventListener('click', function(){ fgToast('Nota DEV: esse botão de avançado aparece apenas para Unidade principal / Matriz. Nunca aparece para unidades'); panel.hidden=true; if(adv) adv.classList.remove('on'); });
  var ss=document.getElementById('crDefStartSeg'), es=document.getElementById('crDefEndSeg');
  if(ss) ss.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; ss.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)}); document.getElementById('crDefStartRow').style.display = b.dataset.s==='sched' ? 'flex' : 'none'; });
  if(es) es.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; es.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)}); document.getElementById('crDefEndRow').style.display = b.dataset.s==='date' ? 'flex' : 'none'; });
})();
