/* busca global e tela de quem interagiu */
/* ---------- Busca global no topo (command palette) ----------
   O índice abaixo simula o registro de rotas gerado a partir do menu.
   Em produção: GS_INDEX = JSON vindo do menu/permissões do usuário. */
const escapeHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const GS_ORDER = ['Recentes','Módulos','Telas'];
const GS_INDEX = [
  {cat:'Módulos', t:'Expansão', sub:'Módulo', icon:'fa-up-right-and-down-left-from-center', c:'#e0392c', k:'crm captação leads funil franquia crescimento'},
  {cat:'Módulos', t:'Implantação de Unidades', sub:'Módulo', icon:'fa-flag', c:'#2aa17e', k:'abertura obras cronograma inauguração'},
  {cat:'Módulos', t:'Unidades', sub:'Módulo', icon:'fa-store', c:'#00918a', k:'lojas filiais rede cadastro'},
  {cat:'Módulos', t:'Chamados', sub:'Módulo', icon:'fa-comment-dots', c:'#1d6ede', k:'ticket suporte atendimento sac', r:1},
  {cat:'Módulos', t:'Checklist', sub:'Módulo', icon:'fa-clipboard-check', c:'#219348', k:'auditoria vistoria supervisão visita formulário', r:1},
  {cat:'Módulos', t:'Asgard', sub:'Módulo', icon:'fa-building', c:'#2e7ed4', k:'administração backoffice matriz'},
  {cat:'Módulos', t:'Universidade Corporativa', sub:'Módulo', icon:'fa-chalkboard-user', c:'#6d47b5', k:'ead treinamento cursos lms capacitação aula'},
  {cat:'Módulos', t:'Comunicado', sub:'Módulo', icon:'fa-bullhorn', c:'#575fd1', k:'aviso mural anúncio'},
  {cat:'Módulos', t:'NES', sub:'Módulo', icon:'fa-face-smile', c:'#00a08a', k:'pesquisa satisfação engajamento clima'},
  {cat:'Módulos', t:'Enquete', sub:'Módulo', icon:'fa-clipboard-question', c:'#7c4cc4', k:'pesquisa votação formulário'},
  {cat:'Módulos', t:'Projetos', sub:'Módulo', icon:'fa-file-lines', c:'#e0392c', k:'tarefas kanban gestão cronograma'},
  {cat:'Módulos', t:'Marketing', sub:'Módulo', icon:'fa-palette', c:'#d6285f', k:'campanhas artes materiais trade'},
  {cat:'Módulos', t:'Agenda', sub:'Módulo', icon:'fa-calendar-days', c:'#9c2b2b', k:'calendário compromissos reuniões'},
  {cat:'Módulos', t:'Powerups', sub:'Módulo', icon:'fa-rocket', c:'#1460c4', k:'integrações extensões complementos'},
  {cat:'Módulos', t:'Disco Virtual', sub:'Módulo', icon:'fa-cloud', c:'#2b74dd', k:'drive arquivos nuvem armazenamento upload'},
  {cat:'Módulos', t:'Analytics', sub:'Módulo', icon:'fa-chart-line', c:'#e08e00', k:'indicadores kpi dashboards bi dados', r:1},
  {cat:'Módulos', t:'Notícias', sub:'Módulo', icon:'fa-newspaper', c:'#6ba838', k:'novidades imprensa'},
  {cat:'Módulos', t:'Jornada', sub:'Módulo', icon:'fa-chart-simple', c:'#283593', k:'onboarding etapas trilha caminho'},
  {cat:'Módulos', t:'Compras', sub:'Módulo', icon:'fa-cart-shopping', c:'#00918a', k:'pedidos fornecedores cotação suprimentos b2b'},
  {cat:'Módulos', t:'NPS', sub:'Módulo', icon:'fa-gauge-high', c:'#2ea44f', k:'nota satisfação promotores detratores'},
  {cat:'Módulos', t:'Termos LGPD', sub:'Módulo', icon:'fa-file-contract', c:'#5d4037', k:'privacidade consentimento dados aceite'},
  {cat:'Módulos', t:'Certificações', sub:'Módulo', icon:'fa-award', c:'#d99e00', k:'certificado selo qualidade'},
  {cat:'Módulos', t:'Segurança', sub:'Módulo', icon:'fa-shield-halved', c:'#1565c0', k:'permissões acessos senha autenticação'},
  {cat:'Módulos', t:'Processos', sub:'Módulo', icon:'fa-arrows-rotate', c:'#7c4cc4', k:'workflow fluxos bpm aprovações'},
  {cat:'Módulos', t:'Tarefas', sub:'Módulo', icon:'fa-list-check', c:'#1f3f63', k:'atividades pendências afazeres'},
  {cat:'Módulos', t:'PDI', sub:'Módulo', icon:'fa-users', c:'#66727d', k:'desenvolvimento individual carreira avaliação desempenho'},
  {cat:'Módulos', t:'Vendas', sub:'Módulo', icon:'fa-handshake', c:'#f4511e', k:'comercial pipeline negociação pedidos'},
  {cat:'Módulos', t:'Integração Expansão', sub:'Módulo', icon:'fa-signs-post', c:'#e0392c', k:'leads portais captação integrações'},
  {cat:'Módulos', t:'Cofre de Senhas', sub:'Módulo', icon:'fa-vault', c:'#6a82b0', k:'credenciais senhas acessos vault'},

  {cat:'Telas', t:'Novo chamado', sub:'Chamados', icon:'fa-plus', c:'#1d6ede', k:'abrir ticket'},
  {cat:'Telas', t:'Aplicar checklist', sub:'Checklist', icon:'fa-list-check', c:'#219348', k:'iniciar auditoria visita', r:1},
  {cat:'Telas', t:'Relatório de NPS', sub:'NPS', icon:'fa-chart-line', c:'#2ea44f', k:'satisfação nota'},
  {cat:'Telas', t:'Nova tarefa', sub:'Tarefas', icon:'fa-plus', c:'#1f3f63', k:'criar atividade pendência'},
  {cat:'Telas', t:'Publicar comunicado', sub:'Comunicado', icon:'fa-paper-plane', c:'#575fd1', k:'enviar aviso'},
  {cat:'Telas', t:'Calendário de eventos', sub:'Agenda', icon:'fa-calendar-days', c:'#9c2b2b', k:'compromissos'},
  {cat:'Telas', t:'Funil de expansão', sub:'Expansão', icon:'fa-filter', c:'#e0392c', k:'leads pipeline captação'},
  {cat:'Telas', t:'Gestão de usuários', sub:'Segurança', icon:'fa-users-gear', c:'#1565c0', k:'permissões acessos perfis colaboradores'}
];

const gsBox   = $('#gsBox');
const gsInput = $('#gsInput');
const gsPanel = $('#gsPanel');
let gsSel = 0;

function gsMark(t, q){
  if (!q) return t;
  const i = norm(t).indexOf(q);
  if (i < 0) return t;
  return t.slice(0, i) + '<mark>' + t.slice(i, i + q.length) + '</mark>' + t.slice(i + q.length);
}

function gsRender(){
  const q = norm(gsInput.value.trim());
  const lista = !q
    ? GS_INDEX.filter(it => it.r).map(it => Object.assign({}, it, { cat:'Recentes' }))
    : GS_INDEX.filter(it =>
        norm(it.t).includes(q) || norm(it.sub || '').includes(q) || norm(it.k || '').includes(q));

  const grupos = {};
  lista.forEach(it => { (grupos[it.cat] = grupos[it.cat] || []).push(it); });

  let out = '', n = 0;
  GS_ORDER.forEach(cat => {
    const its = (grupos[cat] || []).slice(0, 6);
    if (!its.length) return;
    out += '<div class="gs-label">' + (cat === 'Recentes' ? 'Acessados recentemente' : cat) + '</div>';
    its.forEach(it => {
      const ic = '<span class="gs-ic" style="--c:' + it.c + '"><i class="fa-solid ' + it.icon + '"></i></span>';
      out += '<button class="gs-item' + (n === 0 ? ' sel' : '') + '">' + ic +
        '<span class="gs-txt"><span class="gs-title">' + gsMark(it.t, q) + '</span>' +
        '<span class="gs-sub">' + (it.sub || '') + '</span></span>' +
        '<span class="gs-enter">Enter</span></button>';
      n++;
    });
  });
  if (!n) out = '<div class="gs-empty">Nenhum resultado para "' + escapeHtml(gsInput.value.trim()) + '"</div>';
  out += '<div class="gs-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Esc</kbd> fechar</span></div>';
  gsPanel.innerHTML = out;
  gsSel = 0;
}

function gsOpen(){ gsRender(); gsPanel.hidden = false; }
function gsClose(){ gsPanel.hidden = true; }

gsInput.addEventListener('focus', gsOpen);
gsInput.addEventListener('input', gsOpen);
document.addEventListener('click', e => { if (!gsBox.contains(e.target)) gsClose(); });
gsPanel.addEventListener('click', e => {
  if (e.target.closest('.gs-item')){ gsClose(); gsInput.blur(); }
});

function gsMove(d){
  const els = gsPanel.querySelectorAll('.gs-item');
  if (!els.length) return;
  els[gsSel] && els[gsSel].classList.remove('sel');
  gsSel = (gsSel + d + els.length) % els.length;
  els[gsSel].classList.add('sel');
  els[gsSel].scrollIntoView({ block:'nearest' });
}

gsInput.addEventListener('keydown', e => {
  if (gsPanel.hidden) return;
  if (e.key === 'ArrowDown'){ e.preventDefault(); gsMove(1); }
  else if (e.key === 'ArrowUp'){ e.preventDefault(); gsMove(-1); }
  else if (e.key === 'Enter'){ const el = gsPanel.querySelectorAll('.gs-item')[gsSel]; if (el) el.click(); }
  else if (e.key === 'Escape'){ gsClose(); gsInput.blur(); }
});

document.addEventListener('keydown', e => {
  const digitando = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); gsInput.focus(); }
  else if (e.key === '/' && !digitando){ e.preventDefault(); gsInput.focus(); }
});

/* ---------- Tela "quem interagiu" (reações estilo LinkedIn) ---------- */
const RX_MAP = {};
REACTIONS.forEach(r => RX_MAP[r.key] = r);

const CAST = null;
const STORES = [
  { code:'873', name:'A1 - ACADEMIA PHD',      company:'PHD BUSINESS E FITNESS LTDA', color:'#1d4ed8', ini:'PH' },
  { code:'412', name:'Boatlux Marina Sul',     company:'BOATLUX NÁUTICA LTDA',        color:'#0277bd', ini:'BX' },
  { code:'205', name:'Constance - Centro',     company:'YE NO PAN PANIFICADORA LTDA',  color:'#ef6c00', ini:'YP' },
  { code:'158', name:'Corpore Fit Barra',      company:'CORPORE FITNESS LTDA',        color:'#2e7d32', ini:'CF' },
  { code:'061', name:'Sabor & Cia Shopping',   company:'SABOR E CIA ALIMENTOS ME',    color:'#c2185b', ini:'SC' },
  { code:'327', name:'Vitta Odonto Centro',    company:'VITTA SAÚDE LTDA',            color:'#00838f', ini:'VO' },
  { code:'744', name:'Bella Estética Sul',     company:'BELLA GROUP LTDA',            color:'#7c4cc4', ini:'BE' },
  { code:'489', name:'Fast Burger Norte',      company:'FB ALIMENTAÇÃO LTDA',         color:'#d99e00', ini:'FB' },
  { code:'512', name:'Pet Vida Center',        company:'PET VIDA COMÉRCIO LTDA',      color:'#2aa17e', ini:'PV' },
  { code:'630', name:'EducaMais Unidade I',    company:'EDUCAMAIS ENSINO LTDA',       color:'#575fd1', ini:'EM' },
  { code:'218', name:'Café Aroma Praça',       company:'AROMA CAFETERIA ME',          color:'#6d4c41', ini:'CA' },
  { code:'905', name:'MegaAuto Peças',         company:'MEGA AUTO LTDA',              color:'#455a64', ini:'MA' },
  { code:'077', name:'Doce Lar Móveis',        company:'DOCE LAR LTDA',               color:'#ad1457', ini:'DL' },
  { code:'341', name:'TechCell Assistência',   company:'TECHCELL LTDA',               color:'#1565c0', ini:'TC' },
  { code:'656', name:'Verde Hortifruti',       company:'VERDE ALIMENTOS LTDA',        color:'#388e3c', ini:'VH' },
  { code:'199', name:'Studio Pilates Zen',     company:'ZEN WELLNESS LTDA',           color:'#00897b', ini:'SP' }
];

/* Distribuição total por post (soma = contador do feed) */
const RX_MIX = [
  { like:84, love:22, celebrate:19, insight:2, sensational:1 },   /* 128 */
  { like:60, love:20, celebrate:14, insight:2 },            /* 96  */
  { like:96, love:24, celebrate:24, insight:10 },           /* 154 */
  { love:92, celebrate:68, like:44, sensational:6 }               /* 210 */
];

/* Reações em destaque [store, reação, pessoa que interagiu] */
const RX_PEOPLE = [
  [
    {s:0,r:'celebrate',p:'Rodrigo Caetano'},{s:1,r:'like',p:'Pedro Lima'},{s:2,r:'like',p:'Marina Dias'},
    {s:3,r:'celebrate',p:'Matheus Scussel'},{s:4,r:'love',p:'Ana Souza'},{s:5,r:'like',p:'Thiago Melo'},
    {s:6,r:'like',p:'Carla Mendes'},{s:7,r:'celebrate',p:'João Santos'},{s:8,r:'like',p:'Breno Alves'},
    {s:9,r:'love',p:'Livia Fernandes'},{s:10,r:'like',p:'Rafael Nunes'},{s:11,r:'celebrate',p:'Lucas Prado'},
    {s:12,r:'insight',p:'Fernanda Rocha'},{s:13,r:'sensational',p:'Beatriz Lopes'}
  ],
  [
    {s:3,r:'celebrate',p:'Matheus Scussel'},{s:0,r:'celebrate',p:'Rodrigo Caetano'},{s:2,r:'like',p:'Willer Matayoshi'},
    {s:4,r:'like',p:'Ana Souza'},{s:5,r:'like',p:'Pedro Lima'},{s:6,r:'love',p:'Carla Mendes'},
    {s:7,r:'like',p:'João Santos'},{s:9,r:'love',p:'Fernanda Rocha'},{s:11,r:'insight',p:'Lucas Prado'},
    {s:14,r:'like',p:'Beatriz Lopes'},{s:1,r:'like',p:'Livia Fernandes'},{s:12,r:'celebrate',p:'Marina Dias'}
  ],
  [
    {s:2,r:'celebrate',p:'Willer Matayoshi'},{s:0,r:'like',p:'Rodrigo Caetano'},{s:1,r:'like',p:'Livia Fernandes'},
    {s:3,r:'insight',p:'Matheus Scussel'},{s:4,r:'like',p:'Ana Souza'},{s:5,r:'like',p:'Pedro Lima'},
    {s:7,r:'like',p:'João Santos'},{s:8,r:'like',p:'Breno Alves'},{s:11,r:'like',p:'Lucas Prado'},
    {s:13,r:'celebrate',p:'Rafael Nunes'},{s:6,r:'love',p:'Carla Mendes'},{s:15,r:'insight',p:'Thiago Melo'}
  ],
  [
    {s:1,r:'love',p:'Livia Fernandes'},{s:3,r:'celebrate',p:'Matheus Scussel'},{s:4,r:'love',p:'Ana Souza'},
    {s:5,r:'celebrate',p:'Pedro Lima'},{s:6,r:'love',p:'Carla Mendes'},{s:7,r:'celebrate',p:'João Santos'},
    {s:9,r:'love',p:'Fernanda Rocha'},{s:10,r:'like',p:'Rafael Nunes'},{s:12,r:'celebrate',p:'Marina Dias'},
    {s:13,r:'like',p:'Thiago Melo'},{s:14,r:'love',p:'Beatriz Lopes'},{s:15,r:'sensational',p:'Lucas Prado'},
    {s:0,r:'celebrate',p:'Rodrigo Caetano'}
  ]
];

const rxViewer = $('#rxViewer');
const rxvTabs  = $('#rxvTabs');
const rxvList  = $('#rxvList');
let rxCurPost = 0, rxCurTab = 'all';

function rxTotal(pi){ return Object.values(RX_MIX[pi]).reduce((a,b) => a + b, 0); }

function renderRxTabs(pi){
  const mix = RX_MIX[pi];
  let html = '<button class="rxv-tab all' + (rxCurTab === 'all' ? ' on' : '') + '" data-tab="all">' +
             'Todos <span class="em">' + rxTotal(pi) + '</span></button>';
  REACTIONS.forEach(r => {
    if (!r || !mix[r.key]) return;
    html += '<button class="rxv-tab' + (rxCurTab === r.key ? ' on' : '') + '" data-tab="' + r.key + '">' +
            '<span class="em">' + r.emoji + '</span> ' + mix[r.key] + '</button>';
  });
  rxvTabs.innerHTML = html;
}

const RX_ROLES = {
  'Rodrigo Caetano':'CEO','Pedro Lima':'Comercial','Marina Dias':'Gerente de Unidade','Matheus Scussel':'COO',
  'Ana Souza':'Marketing','Thiago Melo':'Franqueado','Carla Mendes':'Universidade Corporativa','João Santos':'Suporte',
  'Breno Alves':'Produto','Livia Fernandes':'Head de CS','Rafael Nunes':'Financeiro','Lucas Prado':'Expansão',
  'Fernanda Rocha':'RH','Beatriz Lopes':'Design','Willer Matayoshi':'CTO'
};
function rxWhen(i){
  const start = new Date(2026,6,22,10,46);
  const mins = i*13 + 3;
  const d = new Date(start.getTime() - mins*60000);
  const data = d.toLocaleDateString('pt-BR');
  const hora = ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);
  const rel = mins < 60 ? 'há '+mins+' min' : 'há '+Math.floor(mins/60)+' h';
  return { data, hora, rel };
}

var RX_AVS=['av-rc','av-lf','av-wm','av-gc','av-ms','av-bo','av-as','av-pl','av-cm','av-js'];
function rxAvatarFor(name){
  if(typeof PEOPLE!=='undefined'){ var m=PEOPLE.find(function(pp){return pp.name===name;}); if(m&&m.av) return m.av; }
  var s=String(name||''), hsh=0;
  for(var i=0;i<s.length;i++) hsh=(hsh*31+s.charCodeAt(i))>>>0;
  return RX_AVS[hsh%RX_AVS.length];
}
function renderRxList(pi){
  const people = RX_PEOPLE[pi].filter(x => rxCurTab === 'all' || x.r === rxCurTab);
  const rows = people.map((x, i) => {
    const st = STORES[x.s], r = RX_MAP[x.r] || RX_MAP.like, w = rxWhen(i);
    const role = RX_ROLES[x.p] || 'Colaborador';
    return '<tr>' +
      '<td><span class="rxv-trx"><span class="em">' + r.emoji + '</span> ' + r.label + '</span></td>' +
      '<td><div class="rxv-store"><span class="rxv-logo" style="background:' + st.color + '">' + st.ini + '</span>' +
        '<span><b>' + st.name + '</b><span>' + st.company + '</span></span></div></td>' +
      '<td><div class="apr-person"><span class="avatar ' + rxAvatarFor(x.p) + '" style="width:38px;height:38px;font-size:0"></span><div class="rxv-pcell"><b>' + x.p + '</b><span>' + role + '</span></div></div></td>' +
      '<td class="rxv-twhen">' + w.rel + '</td>' +
      '<td class="rxv-tdate">' + w.data + ' · ' + w.hora + '</td>' +
    '</tr>';
  }).join('');
  rxvList.innerHTML = '<table class="rxv-table"><thead><tr>' +
    '<th>Reação</th><th>Loja</th><th>Colaborador</th><th>Quando</th><th>Data e hora</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>';
}

const newsRx = new Map();
function nvRxApply(btn, art, n){
  const r = newsRx.get(n.id);
  if(r){
    btn.classList.add('liked');
    btn.style.color = r.color;
    btn.innerHTML = '<span class="rx-emoji">'+r.emoji+'</span> ' + r.label;
    newsLiked.add(n.id);
  } else {
    btn.classList.remove('liked');
    btn.style.color = '';
    btn.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> Gostei';
    newsLiked.delete(n.id);
  }
  const c = art.querySelector('.rx-count');
  if(c) c.textContent = (n.reactions||0) + (r?1:0);
}
function nvRxPicker(btn, art, n, viaClick){
  let wrap = btn.closest('.react-wrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.className = 'react-wrap';
    btn.parentNode.insertBefore(wrap, btn);
    wrap.appendChild(btn);
    const bar = document.createElement('div');
    bar.className = 'react-bar';
    bar.innerHTML = REACTIONS.map((r,i) => '<button type="button" class="react-btn" data-key="'+r.key+'" aria-label="'+r.label+'" style="--i:'+i+'"><span class="rb-emoji">'+r.emoji+'</span><span class="rb-label">'+r.label+'</span></button>').join('');
    wrap.appendChild(bar);
    bar.addEventListener('click', ev => {
      ev.stopPropagation();
      const rb = ev.target.closest('.react-btn'); if(!rb) return;
      const cur = newsRx.get(n.id);
      const pick = REACTIONS.find(x => x.key===rb.dataset.key);
      if(cur && cur.key===pick.key) newsRx.delete(n.id); else newsRx.set(n.id, pick);
      rb.classList.add('rb-pick');
      setTimeout(()=>{ nvRxApply(btn, art, n); wrap.classList.remove('open'); rb.classList.remove('rb-pick'); }, 170);
    });
    let hoverT=null;
    wrap.addEventListener('mouseenter', ()=>{ clearTimeout(hoverT); hoverT=setTimeout(()=>wrap.classList.add('open'), 220); });
    wrap.addEventListener('mouseleave', ()=>{ clearTimeout(hoverT); hoverT=setTimeout(()=>wrap.classList.remove('open'), 260); });
  }
  if(viaClick && wrap.classList.contains('open')){
    const cur=newsRx.get(n.id);
    if(cur) newsRx.delete(n.id); else newsRx.set(n.id, REACTIONS[0]);
    nvRxApply(btn, art, n);
    wrap.classList.remove('open');
    return;
  }
  document.querySelectorAll('#nvFeed .react-wrap.open').forEach(w=>w.classList.remove('open'));
  wrap.classList.add('open');
}
document.addEventListener('click', e => { if(!e.target.closest('.react-wrap')) document.querySelectorAll('#nvFeed .react-wrap.open').forEach(w=>w.classList.remove('open')); if(!e.target.closest('.comment-menu')) document.querySelectorAll('#nvFeed .comment-drop').forEach(d=>d.hidden=true); });
(function(){
  let t=null;
  const feed=()=>document.getElementById('nvFeed');
  document.addEventListener('mouseover', e=>{
    const b=e.target.closest('#nvFeed .p-act.like'); if(!b) return;
    const art=b.closest('.post[data-id]'); if(!art) return;
    const n=(typeof NEWS!=='undefined')?NEWS.find(x=>x.id===+art.dataset.id):null; if(!n) return;
    clearTimeout(t); t=setTimeout(()=>nvRxPicker(b, art, n), 220);
  });
  document.addEventListener('mouseout', e=>{
    if(!e.target.closest('#nvFeed .react-wrap')) return;
    if(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.react-wrap')) return;
    clearTimeout(t); t=setTimeout(()=>{ const f=feed(); if(f) f.querySelectorAll('.react-wrap.open').forEach(w=>w.classList.remove('open')); }, 260);
  });
})();
function nvRxIndex(id){ const i=(typeof NEWS!=='undefined')?NEWS.findIndex(x=>x.id===id):0; const n=(typeof RX_MIX!=='undefined')?RX_MIX.length:1; return ((i<0?0:i)%n+n)%n; }
function openReactions(pi){
  rxCurPost = pi; rxCurTab = 'all';
  renderRxTabs(pi); renderRxList(pi);
  rxViewer.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeReactions(){
  rxViewer.hidden = true;
  document.body.style.overflow = '';
}

rxvTabs.addEventListener('click', e => {
  const tab = e.target.closest('.rxv-tab');
  if (!tab) return;
  rxCurTab = tab.dataset.tab;
  renderRxTabs(rxCurPost);
  renderRxList(rxCurPost);
});
$('#rxvClose').addEventListener('click', closeReactions);
$('#rxvBackdrop').addEventListener('click', closeReactions);
document.addEventListener('keydown', e => { if (!rxViewer.hidden && e.key === 'Escape') closeReactions(); });

$$('.feed .post').forEach((post, pi) => {
  post.querySelectorAll('.post-stats .rx, .post-stats .rx-count').forEach(el => {
    el.addEventListener('click', () => openReactions(pi));
  });
});

