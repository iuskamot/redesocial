/* =====================================================================
   GERENCIAR > REAÇÕES (admin) — assets/js/23-gerenciar-reacoes.js

   Tabela e sidebar de filtro avançado da tela "Reações" do alternador "Gerenciar"
   (#nmtInter / newsShow('inter')). Espelha a estrutura das telas irmãs de
   Publicações/Shorts/Comentários (21/20/22-gerenciar-*.js) — mesmo componente
   genérico de tabela (renderGridTable, 20-gerenciar-shorts.js), mesmas colunas
   ID+Reação congeladas/sticky ao rolar (freeze padrão) e mesmo padrão de sidebar.

   A origem da reação (Publicações ou Shorts) é escolhida por dois cartões de
   atalho no topo do painel — mutuamente exclusivos, sem opção "Todas" (só um
   dado por vez, igual pedido). Reaproveita, sem duplicar:
     - INTERACTIONS/buildInteractions/interDT/interRel (11-rede-social.js) para
       as reações de Publicações;
     - REELS_DATA/POSTS (01-home.js) + PEOPLE (03-shorts.js) + STORES
       (07-busca.js) para sintetizar, no mesmo espírito, reações de Shorts —
       essa segunda fonte não existia antes (INTERACTIONS só cobria
       Publicações); rcnShortInteractions() replica localmente a mesma lógica
       de buildInteractions() para Shorts, sem tocar no array/função
       compartilhados.
   Único ponto de contato com 11-rede-social.js: newsShow('inter') chama
   rcnRefresh() no lugar de renderInteractions() (cujo código continua no
   lugar, só deixou de ser chamado por esse caminho).
   ===================================================================== */

let rcnColSort = { key: null, dir: 0 };
let rcnSource = 'pub';
let rcnPeriodDateStart = '', rcnPeriodDateEnd = '';

/* Reações de Shorts — mesma forma de objeto que INTERACTIONS (person/av/role/store/reacao/
   mins), só que sorteadas sobre REELS_DATA/POSTS em vez de NEWS. Construída uma vez, sob
   demanda (só quando o cartão "Shorts" é aberto pela 1ª vez). */
let RCN_SHORT_INTER = null;
function rcnShortInteractions(){
  if (RCN_SHORT_INTER) return RCN_SHORT_INTER;
  const reactIco = REACTIONS.map(function(r){ return [r.key, r.color, r.label]; });
  RCN_SHORT_INTER = REELS_DATA.map(function(r, i){
    const p = POSTS[r.p] || {};
    const person = PEOPLE[i % PEOPLE.length];
    const st = STORES[i % STORES.length];
    return {
      id: 500000 + i, tipo: 'reacao', person: person.name, av: person.av, role: person.role,
      store: st.name, storeCo: st.company, storeIni: st.ini, storeColor: st.color,
      post: p.title || p.alt || 'Short', reacao: reactIco[i % reactIco.length], mins: 9 + i * 23,
      __short: true, __post: p, __reel: r
    };
  });
  return RCN_SHORT_INTER;
}
function rcnPool(){
  if (rcnSource === 'short') return rcnShortInteractions();
  if (!INTERACTIONS.length) buildInteractions();
  return INTERACTIONS.filter(function(x){ return x.tipo === 'reacao'; });
}
function rcnMatch(x){
  if (interPerson && x.person !== interPerson) return false;
  if (interReact && x.reacao[2] !== interReact) return false;
  if (interPeriod === 'custom'){
    const t = Date.now() - x.mins * 60000;
    if (rcnPeriodDateStart && t < new Date(rcnPeriodDateStart + 'T00:00:00').getTime()) return false;
    if (rcnPeriodDateEnd && t > new Date(rcnPeriodDateEnd + 'T23:59:59').getTime()) return false;
  } else if (interPeriod && x.mins > +interPeriod) return false;
  if (interQuery){ const q = interQuery.toLowerCase(); if ((x.post || '').toLowerCase().indexOf(q) === -1) return false; }
  return true;
}
function rcnActiveFilterCount(){
  return (interQuery ? 1 : 0) + (interPerson ? 1 : 0) + (interPeriod ? 1 : 0) + (interReact ? 1 : 0);
}

function foBuildGerenciarReacoesFilters(){
  const nav = $('#rcnFilters'); if (!nav) return;
  const pool = rcnPool();
  const persons = Array.from(new Set(pool.map(function(x){ return x.person; })));
  const personItems = [{ value: '', label: 'Todos', selected: !interPerson }].concat(persons.map(function(p){ return { value: p, label: p, selected: interPerson === p }; }));
  const personLabel = interPerson || 'Todos';
  const units = Array.from(new Set(pool.map(function(x){ return x.store; })));
  const unitItems = [{ value: '', label: 'Todas', selected: !interStore }].concat(units.map(function(u){ return { value: u, label: u, selected: interStore === u }; }));
  const unitLabel = interStore || 'Todas';
  const reactItems = [{ value: '', label: 'Todos os tipos', selected: !interReact }].concat(REACTIONS.map(function(r){ return { value: r.label, label: r.label, selected: interReact === r.label }; }));
  const reactLabel = interReact || 'Todos os tipos';
  const periodDefs = [['', 'Qualquer período'], ['60', 'Última hora'], ['1440', 'Últimas 24 h'], ['10080', 'Últimos 7 dias'], ['custom', 'Período personalizado']];
  const periodItems = periodDefs.map(function(p){ return { value: p[0], label: p[1], selected: interPeriod === p[0] }; });
  const periodLabel = (periodDefs.filter(function(p){ return p[0] === interPeriod; })[0] || periodDefs[0])[1];

  /* Cartões "Publicações"/"Shorts" — mesmo componente das outras telas (.rxs-item2 dentro de
     .nv-sitcards.nv-sit2, ver #pubSitCards/#mgSitCards), só que 1x2 em vez de 2x2, com os
     mesmos ícones dos itens de menu "Publicações"/"Shorts". Escolhem a origem dos dados
     (rcnSource), mutuamente exclusivos, sem opção "Todas". */
  const sourceDefs = [['pub', 'Publicações', 'fa-solid fa-rectangle-list'], ['short', 'Shorts', 'fa-solid fa-clapperboard']];
  let html = '<div class="nv-fsec"><div class="nv-fsec-hd">Quais reações você quer ver? <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="cv-seg nv-sitcards nv-sit2" id="rcnSitCards">' +
    sourceDefs.map(function(s){ return '<button data-rcnsource="' + s[0] + '" class="rxs-item2 ' + (rcnSource === s[0] ? 'active' : '') + '"><i class="' + s[2] + '"></i>' + s[1] + '</button>'; }).join('') +
    '</div></div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Reação <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol" style="margin-bottom:12px"><label>Tipo</label>' + rxDDWrap('rcnFReact', reactLabel, reactItems) + '</div>' +
    '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>Autor</label>' + rxDDWrap('rcnFPerson', personLabel, personItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
      '<div class="nv-ffcol"><label>Unidade do autor</label>' + rxDDWrap('rcnFUnit', unitLabel, unitItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
    '</div></div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">' + (rcnSource === 'short' ? 'Short' : 'Publicação') + ' <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"><label>Título</label><div class="nv-ffield"><input type="text" id="rcnFTitulo" placeholder="' + (rcnSource === 'short' ? 'Pesquisar short...' : 'Pesquisar publicação...') + '" value="' + (interQuery || '') + '" autocomplete="off"></div></div>' +
    '</div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Período de reação <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"' + (interPeriod === 'custom' ? ' style="margin-bottom:12px"' : '') + '><label>Selecione uma opção</label>' + rxDDWrap('rcnFPeriod', periodLabel, periodItems) + '</div>' +
    (interPeriod === 'custom' ? '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>A partir de</label>' + rxDateField('rcnFPeriodDateStart', rcnPeriodDateStart) + '</div>' +
      '<div class="nv-ffcol"><label>Até quando</label>' + rxDateField('rcnFPeriodDateEnd', rcnPeriodDateEnd) + '</div>' +
    '</div>' : '') +
    '</div>';
  const activeN = rcnActiveFilterCount();
  html += '<div class="nv-filters-ft"><button class="nv-fclear' + (activeN > 0 ? ' has-active' : '') + '" id="rcnFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros' + (activeN > 0 ? ' (' + activeN + ')' : '') + '</button><button class="nv-fapply" id="rcnFApply">Aplicar filtros <i class="fa-solid fa-chevron-right"></i></button></div>';
  nav.innerHTML = html;
}

/* Núcleo da tabela — colunas ID, Reação, Reagiu em, Autor, Unidade do autor e Publicação;
   ordenação de 3 estados por coluna; ID+Reação congeladas (com colapso animado) ao rolar
   horizontalmente, igual Comentários/Shorts/Publicações — "Publicação" é a coluna flexível
   (só min-width), no fim da tabela. */
function renderGerenciarReacoesList(list){
  const grid = document.getElementById('rcnGrid'); if (!grid) return;
  grid.innerHTML = '';
  if (!list.length){ grid.innerHTML = '<div class="cat-empty">Nenhuma reação encontrada.</div>'; return; }
  if (rcnColSort.key && rcnColSort.dir){
    const val = function(x){ switch (rcnColSort.key){
      case 'id': return x.id;
      case 'reacao': return (x.reacao[2] || '').toLowerCase();
      case 'person': return (x.person || '').toLowerCase();
      case 'unit': return (x.store || '').toLowerCase();
      case 'time': return -x.mins;
      case 'pub': return (x.post || '').toLowerCase();
      default: return 0; } };
    list = list.slice().sort(function(a, b){ const va = val(a), vb = val(b); return va < vb ? -rcnColSort.dir : va > vb ? rcnColSort.dir : 0; });
  }
  const rowsHTML = list.map(function(x, idx){
    const rDef = REACTIONS.find(function(r){ return r.key === x.reacao[0]; });
    let thumb, typeLabel;
    if (x.__short){
      const p = x.__post || {};
      const img = p.img || p.poster || '';
      thumb = img ? '<img src="' + img + '" alt="">' : '<span class="rl-procthumb"><i class="fa-solid fa-clapperboard" style="color:#9aa5b1"></i></span>';
      typeLabel = 'Short';
    } else {
      const n = findNewsByTitle(x.post) || {};
      thumb = n.image ? '<img src="' + n.image + '" alt="">' : '<span class="rl-procthumb"><i class="fa-solid ' + (n.article ? 'fa-newspaper' : 'fa-align-left') + '" style="color:#9aa5b1"></i></span>';
      typeLabel = n.article ? 'Artigo' : 'Publicação';
    }
    return '<tr data-i="' + idx + '">' +
      '<td class="perm-id">#' + x.id + '</td>' +
      '<td><div class="rl-reel"><span class="il-pill" style="background:' + x.reacao[1] + '18;color:' + x.reacao[1] + '">' + (rDef ? rDef.emoji : '') + ' ' + x.reacao[2] + '</span>' +
        '<button type="button" class="rl-actbtn"><span>Acessar</span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><title>arrow-right</title><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/></svg></button>' +
      '</div></td>' +
      '<td><div class="rl-author"><span class="avatar ' + x.av + '"></span><div><b>' + x.person + '</b><span class="rl-emp">' + x.role + '</span></div></div></td>' +
      '<td><div class="rl-unitcell"><span class="rxv-logo" style="background:' + x.storeColor + '">' + x.storeIni + '</span><div><b>' + x.store + '</b><span>' + x.storeCo + '</span></div></div></td>' +
      '<td style="white-space:nowrap"><div class="rl-dt">' + interDT(x.mins) + '</div><span class="rl-rel">' + interRel(x.mins) + '</span></td>' +
      '<td><div class="rl-pubcell' + (x.__short ? ' rl-pubcell-short' : '') + '">' + thumb + '<div><b>' + x.post + '</b><span>' + typeLabel + '</span></div></div></td>' +
      '</tr>';
  }).join('');
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'reacao', label: 'Reação (' + list.length + ')' },
    { key: 'person', label: 'Autor' },
    { key: 'unit', label: 'Unidade do autor' },
    { key: 'time', label: 'Reagiu em' },
    { key: 'pub', label: rcnSource === 'short' ? 'Shorts' : 'Publicações' }
  ];
  renderGridTable({
    grid, columns, rowsHTML, sort: rcnColSort,
    onSort: function(k){
      if (rcnColSort.key !== k){ rcnColSort.key = k; rcnColSort.dir = 1; }
      else if (rcnColSort.dir === 1){ rcnColSort.dir = -1; }
      else { rcnColSort.key = null; rcnColSort.dir = 0; }
      /* Sempre recomeça de rcnPool()+rcnMatch (ordem natural), nunca da lista já ordenada da
         renderização anterior — senão, ao voltar pro estado "sem ordenação" (3º clique), a
         tabela ficava presa na última ordem aplicada em vez de voltar à original. */
      renderGerenciarReacoesList(rcnPool().filter(rcnMatch));
    },
    onRowClick: function(e){
      const tr = e.target.closest('tr'); if (!tr) return;
      const x = list[+tr.dataset.i]; if (!x) return;
      if (x.__short){ if (typeof openReelInfo === 'function') openReelInfo(x.__reel); return; }
      const n = findNewsByTitle(x.post);
      if (n && typeof openArticle === 'function') openArticle(n);
    }
  });
}

/* Ponto de entrada único: reconstrói a sidebar e a tabela juntas, a partir do estado atual
   (rcnSource + interPerson/interStore/interPeriod/interReact/interQuery). Chamado por
   newsShow('inter') no lugar de renderInteractions(). */
function rcnRefresh(){
  foBuildGerenciarReacoesFilters();
  renderGerenciarReacoesList(rcnPool().filter(rcnMatch));
}

document.addEventListener('click', function(e){
  if (!e.target.closest('.rl-ddwrap')){
    $$('#rcnFilters .rl-ddmenu').forEach(function(m){ m.hidden = true; });
  }
});
$('#rcnFilters') && $('#rcnFilters').addEventListener('click', function(e){
  const src = e.target.closest('#rcnSitCards button');
  if (src){ rcnSource = src.dataset.rcnsource; interPerson = ''; interStore = ''; rcnRefresh(); return; }
  if (e.target.closest('#rcnFClear')){
    rcnSource = 'pub'; interQuery = ''; interPerson = ''; interStore = ''; interPeriod = ''; interReact = '';
    rcnPeriodDateStart = ''; rcnPeriodDateEnd = '';
    rcnColSort.key = null; rcnColSort.dir = 0;
    rcnRefresh();
    return;
  }
  if (e.target.closest('#rcnFApply')){ rcnRefresh(); fgToast('Filtros aplicados'); return; }
  const db = e.target.closest('.nv-fdatebtn');
  if (db){ const inp = $('#' + db.dataset.datefor); if (inp){ if (inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem = e.target.closest('.rl-dditem');
  if (ddItem){
    const wrap = ddItem.closest('.rl-ddwrap'); const id = wrap.dataset.dd; const v = ddItem.dataset.value;
    if (id === 'rcnFPerson'){ interPerson = v; }
    else if (id === 'rcnFUnit'){ interStore = v; }
    else if (id === 'rcnFPeriod'){ interPeriod = v; }
    else if (id === 'rcnFReact'){ interReact = v; }
    rcnRefresh();
    return;
  }
  const ddBtn = e.target.closest('.rl-ddwrap > button.nv-ffield');
  if (ddBtn){
    const wrap = ddBtn.closest('.rl-ddwrap'); const menu = wrap.querySelector('.rl-ddmenu');
    const willOpen = menu.hidden;
    $$('#rcnFilters .rl-ddmenu').forEach(function(m){ m.hidden = true; });
    menu.hidden = !willOpen;
    return;
  }
});
$('#rcnFilters') && $('#rcnFilters').addEventListener('input', function(e){
  if (e.target.id === 'rcnFTitulo'){ interQuery = e.target.value.trim(); renderGerenciarReacoesList(rcnPool().filter(rcnMatch)); }
});
$('#rcnFilters') && $('#rcnFilters').addEventListener('change', function(e){
  const t = e.target;
  if (t.id === 'rcnFPeriodDateStart'){ rcnPeriodDateStart = t.value; }
  else if (t.id === 'rcnFPeriodDateEnd'){ rcnPeriodDateEnd = t.value; }
  else return;
  rcnRefresh();
});
