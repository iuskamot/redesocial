/* =====================================================================
   GERENCIAR > SHORTS (admin) — assets/js/20-gerenciar-shorts.js

   Tabela e sidebar de filtro avançado da tela de gerenciamento de Shorts
   (aba "Shorts" do alternador "Gerenciar", e a rota alternativa pelo módulo
   avulso de Shorts > "Publicados"). Isolado num arquivo à parte para não
   mexer no comportamento da grade/feed social de Shorts nem da Home — os
   únicos pontos de contato com assets/js/01-home.js são:

     - renderGrid() chama renderGerenciarShortsList(list) só quando
       managed && curView==='lista' (ramo que já existia e já era exclusivo
       da tela de gerenciamento).
     - foBuildReelFilters() chama foBuildGerenciarShortsFilters() só quando
       curView==='lista', pelo mesmo motivo.
     - matchReel() ganhou condições extras (rxFormat/rxUnitFilter/rxReach/
       rxEndPeriod) que só filtram algo quando esta tela preenche essas
       variáveis — em qualquer outra tela elas ficam inertes.

   Tudo o mais (estado, helpers, disparo de eventos) vive aqui.
   ===================================================================== */

/* Estado exclusivo desta tela (os demais filtros — rxFormat, rxReach,
   rxStatus, rxMinViews, rxMinLikes, curFilter, curQuery, curPeriod,
   colSort — já existem em 01-home.js e são reaproveitados). */
let rxUnitFilter = '';
let rxEndPeriod = 'tudo', rxEndDateStart = '', rxEndDateEnd = '';
let rxPeriodDateStart = '', rxPeriodDateEnd = '';

/* GERENCIAR > SHORTS (admin): mesma unidade de sbUnidade(post)/SB_UNIDADES (01-home.js), só que
   devolvendo o objeto inteiro {name,company,color,ini} em vez do nome — usado pela pílula colorida
   da coluna "Unidade do autor". Mantém a mesma conta de índice (hash do nome do autor) para que a
   unidade mostrada aqui seja sempre a mesma já usada no player/feed. */
function sbUnitObjFor(post){
  if (post && post.unit){ const found = SB_UNIDADES.find(u => u.name === post.unit); if (found) return found; }
  const nome = String((post && post.name) || '');
  if (!nome) return SB_UNIDADES[0];
  let h = 0;
  for (let k = 0; k < nome.length; k++) h += nome.charCodeAt(k);
  return SB_UNIDADES[h % SB_UNIDADES.length];
}

/* "Publicado para" — reaproveita o mesmo vocabulário do filtro "Alcance" (rxReach) que já existia
   em 01-home.js, agora também usado para rotular a coluna própria da tabela de gerenciamento. */
const RX_REACH = ['unidades', 'matriz', 'rede'];
const RX_REACH_LABEL = { unidades: 'Unidades', matriz: 'Sua Marca (Matriz)', rede: 'Toda a rede' };
function rxReachFor(seed){ return RX_REACH[seed % RX_REACH.length]; }

/* "Há 5 h"/"Há 2 d" -> "Há 5 horas"/"Há 2 dias" (unidade por extenso, com plural), usado na coluna
   Data de publicação desta tabela — o resto do app continua com a forma curta. */
function rxSchedShort(d){ const dd=new Date(d), p=x=>String(x).padStart(2,'0'); return p(dd.getDate())+'/'+p(dd.getMonth()+1)+' às '+p(dd.getHours())+':'+p(dd.getMinutes()); }
function rxFullRel(t){
  const m = String(t).match(/^Há (\d+) (h|d)$/);
  if (!m) return t;
  const n = +m[1];
  const unit = m[2] === 'h' ? (n === 1 ? 'hora' : 'horas') : (n === 1 ? 'dia' : 'dias');
  return 'Há ' + n + ' ' + unit;
}

/* Filtro "Período de encerramento" — r.encerra é um timestamp futuro (ms) */
function rxPubInPeriod(timeStr, ds, de){
  const t = Date.now() - hoursVal(timeStr) * 3600000;
  if (ds && t < new Date(ds + 'T00:00:00').getTime()) return false;
  if (de && t > new Date(de + 'T23:59:59').getTime()) return false;
  return true;
}
function rxEndInPeriod(encerra, period, ds, de){
  if (period === 'naoencerra') return !encerra;
  if (!encerra) return false;
  if (period === 'hoje') return new Date(encerra).toDateString() === new Date().toDateString();
  if (period === '7d' || period === '30d'){ const days = period === '7d' ? 7 : 30; const diff = (encerra - Date.now()) / 86400000; return diff >= 0 && diff <= days; }
  if (period === 'custom'){
    if (ds && encerra < new Date(ds + 'T00:00:00').getTime()) return false;
    if (de && encerra > new Date(de + 'T23:59:59').getTime()) return false;
    return true;
  }
  return true;
}

function rxActiveFilterCount(){
  let n = 0;
  if (curFilter && curFilter !== 'todos') n++;
  if (curQuery) n++;
  if (curPeriod && curPeriod !== 'tudo') n++;
  if (rxStatus) n++;
  if (rxFormat) n++;
  if (rxUnitFilter) n++;
  if (rxReach) n++;
  if (rxEndPeriod && rxEndPeriod !== 'tudo') n++;
  return n;
}

/* Dropdown customizado do filtro avançado (Tipo/Categoria/Autor/Unidade/Publicado para/Períodos) —
   substitui o <select> nativo por um botão + menu para ter o mesmo hover/gap/sombra em todos os
   campos, com ícone colorido por item só na Categoria. */
function rxDDMenu(items){
  return items.map(it => {
    const icon = it.color ? '<span class="rl-ddicon" style="background:' + it.color + '"><i class="fa-solid ' + (it.icon || 'fa-tag') + '"></i></span>' : '';
    return '<button type="button" class="rl-dditem' + (it.selected ? ' sel' : '') + '" data-value="' + it.value + '">' + icon + '<span>' + it.label + '</span></button>';
  }).join('');
}
function rxDDWrap(id, label, items, leftIcon, rightIcon){
  return '<div class="rl-ddwrap" data-dd="' + id + '">' +
    '<button type="button" class="nv-ffield" id="' + id + '">' + (leftIcon ? '<i class="fa-solid ' + leftIcon + ' ico-l"></i>' : '') +
      '<span class="rl-ddbtn-label">' + label + '</span><i class="fa-solid ' + (rightIcon || 'fa-chevron-down') + ' ico-r"></i></button>' +
    '<div class="rl-ddmenu" id="' + id + 'Menu" hidden>' + rxDDMenu(items) + '</div></div>';
}
function rxDateField(id, value){
  const ph = id.indexOf('Start') > -1 ? 'Data inicial' : 'Data final';
  return '<div class="nv-fdaterow"><div class="nv-fdatewrap' + (value ? ' has-value' : '') + '"><input type="date" class="nv-fdateinput" id="' + id + '" value="' + (value || '') + '"><span class="nv-fdateph">' + ph + '</span></div>' +
    '<button type="button" class="nv-fdatebtn" data-datefor="' + id + '"><i class="mdi mdi-calendar-month"></i></button></div>';
}

/* =====================================================================
   Componente genérico de tabela "Gerenciar" — usado por Publicações (#pubGrid),
   Shorts (#rxGrid), Comentários (#cmgGrid) e Reações (#rcnGrid). Cada tela só entra
   com o que muda de fato: a lista de colunas (chave + rótulo + se é ordenável), o
   HTML já pronto de cada <tr> (a linha em si varia demais de tela pra tela pra valer
   a pena genericizar) e o estado de ordenação (a própria tela guarda esse objeto
   {key,dir} e re-renderiza quando ele muda). O que é sempre igual entra aqui: montar
   o <thead> com seta de ordenação de 3 estados, o wrapper .rlist.rl-tblwrap, e —
   quando opts.freeze não é false — o colapso animado da 1ª coluna (ID) ao rolar
   horizontalmente, com a 2ª grudada (sticky) do lado dela. Uma tela cuja coluna
   flexível não é a 2ª (caso de Reações, onde é a última) passa freeze:false e usa
   scroll horizontal simples, sem colunas congeladas.

   opts:
     grid       - elemento container onde a tabela é anexada (a tela já deve ter
                  limpado/decidido o estado vazio antes de chamar)
     columns    - [{key,label,sortable=true,thAttrs?}], na ordem das colunas
     rowsHTML   - string com todos os <tr>...</tr> já prontos
     sort       - {key,dir} atual (referência guardada pela tela)
     onSort(key)- chamado ao clicar num <th> ordenável
     onRowClick(e) - opcional, listener de clique delegado no <tbody>
     wrapClass  - classe extra opcional na <div class="rlist rl-tblwrap">
     gridColumn - opcional, valor de style.gridColumn do wrapper (telas que reaproveitam
                  um container CSS-grid, como #rxGrid)
     freeze     - default true; false pula o colapso/sticky das 2 primeiras colunas
   Devolve o wrapper (<div class="rlist rl-tblwrap">) já anexado a opts.grid. */
function renderGridTable(opts){
  const sort = opts.sort;
  const thCell = function(col){
    if (col.sortable === false) return '<th' + (col.thAttrs || '') + '>' + col.label + '</th>';
    const active = sort.key === col.key && sort.dir !== 0;
    const icon = !active ? NV_SORT_ICONS.swap : (sort.dir === 1 ? NV_SORT_ICONS.up : NV_SORT_ICONS.down);
    return '<th class="sortable' + (active ? ' active-sort' : '') + '"' + (col.thAttrs || '') + ' data-sort="' + col.key + '">' + col.label + ' <span class="sort-ic">' + icon + '</span></th>';
  };
  const ths = opts.columns.map(thCell).join('');
  const wrap = document.createElement('div');
  wrap.className = 'rlist rl-tblwrap' + (opts.wrapClass ? ' ' + opts.wrapClass : '');
  if (opts.gridColumn) wrap.style.gridColumn = opts.gridColumn;
  wrap.innerHTML = '<table><thead><tr>' + ths + '</tr></thead><tbody>' + opts.rowsHTML + '</tbody></table>';
  if (opts.onRowClick) wrap.querySelector('tbody').addEventListener('click', opts.onRowClick);
  wrap.querySelector('thead').addEventListener('click', function(ev){
    const th = ev.target.closest('th.sortable'); if (!th) return;
    opts.onSort(th.dataset.sort);
  });
  opts.grid.appendChild(wrap);
  if (opts.freeze !== false) gridFreezeCols(wrap);
  return wrap;
}
/* Colapso animado da 1ª coluna (ID) + 2ª coluna (a "principal", sticky) ao rolar a tabela na
   horizontal — mesmo comportamento nas 3 telas que já usavam isso antes desta função existir
   (pglSyncFrozenCols/rxSyncFrozenCols/cmgSyncFrozenCols), só que agora numa cópia só. */
function gridFreezeCols(wrap){
  const COLLAPSE_PX = 90;
  let ticking = false;
  function sync(){
    const progress = Math.max(0, Math.min(1, wrap.scrollLeft / COLLAPSE_PX));
    const idW = COLLAPSE_PX * (1 - progress);
    wrap.querySelectorAll('th:nth-child(1),td:nth-child(1)').forEach(function(el){
      el.style.setProperty('width', idW + 'px', 'important');
      el.style.setProperty('min-width', idW + 'px', 'important');
      el.style.setProperty('max-width', idW + 'px', 'important');
      el.style.paddingLeft = (9 * (1 - progress)) + 'px'; el.style.paddingRight = (9 * (1 - progress)) + 'px';
      el.style.opacity = String(1 - progress); el.style.overflow = 'hidden';
    });
    wrap.querySelectorAll('th:nth-child(2),td:nth-child(2)').forEach(function(el){ el.style.left = idW + 'px'; });
    wrap.classList.toggle('rx-scrolled', wrap.scrollLeft > 0);
  }
  wrap.addEventListener('scroll', function(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){ sync(); ticking = false; });
  });
  sync();
}

/* GERENCIAR > SHORTS (admin): sidebar de filtro avançado — "Quais shorts você quer ver?" (situação),
   Short (título/ID, Tipo, Categoria, Autor, Unidade do autor), Publicado para, Período de publicação
   e Período de encerramento. Só é montada quando curView==='lista' (ver foBuildReelFilters). */
function foBuildGerenciarShortsFilters(){
  const nav = $('#rxFilters'); if (!nav) return;
  const activeCats = (typeof CATEGORIES !== 'undefined' ? CATEGORIES.filter(c => c.active) : []);
  const authors = [...new Set(REELS_DATA.map(r => POSTS[r.p].name))];
  const SVG_ACCOUNT_CLOCK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.63,14.1C12.23,10.58 16.38,9.03 19.9,10.63C23.42,12.23 24.97,16.38 23.37,19.9C22.24,22.4 19.75,24 17,24C14.3,24 11.83,22.44 10.67,20H1V18C1.06,16.86 1.84,15.93 3.34,15.18C4.84,14.43 6.72,14.04 9,14C9.57,14 10.11,14.05 10.63,14.1V14.1M9,4C10.12,4.03 11.06,4.42 11.81,5.17C12.56,5.92 12.93,6.86 12.93,8C12.93,9.14 12.56,10.08 11.81,10.83C11.06,11.58 10.12,11.95 9,11.95C7.88,11.95 6.94,11.58 6.19,10.83C5.44,10.08 5.07,9.14 5.07,8C5.07,6.86 5.44,5.92 6.19,5.17C6.94,4.42 7.88,4.03 9,4M17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14Z"/></svg>';
  const sit = [['', 'mdi mdi-layers-triple', 'Todos', ''], ['pub', 'mdi mdi-check-circle', 'Publicados', '#25B865'], ['agendado', 'fa-solid fa-clock', 'Agendados', '#2F8EE5'], ['aprovacao', SVG_ACCOUNT_CLOCK, 'Em aprovação', '#FFB020']];
  let html = '<div class="nv-fsec"><div class="nv-fsec-hd">Quais shorts você quer ver? <i class="fa-solid fa-chevron-up"></i></div><div class="cv-seg nv-sitcards nv-sit2" id="mgSitCards">' +
    sit.map(s => { const isSvg = s[1].charAt(0) === '<'; const colorAttr = s[3] ? ' style="color:' + s[3] + '"' : ''; const icon = isSvg ? s[1].replace('<svg', '<svg' + colorAttr) : '<i class="' + s[1] + '"' + colorAttr + '></i>'; return '<button data-rxstatus="' + s[0] + '" class="rxs-item2 ' + (rxStatus === s[0] ? 'active' : '') + '">' + icon + s[2] + '</button>'; }).join('') + '</div></div>';
  const units = SB_UNIDADES.map(u => u.name);
  const fmtItems = [{ value: '', label: 'Todos', selected: rxFormat === '' }, { value: 'video', label: 'Vídeo', selected: rxFormat === 'video' }, { value: 'imagem', label: 'Imagem', selected: rxFormat === 'imagem' }];
  const fmtLabel = (fmtItems.find(i => i.selected) || fmtItems[0]).label;
  const curCat = catById(curFilter);
  const catItems = [{ value: '', label: 'Todas', selected: !curCat }].concat(activeCats.map(c => ({ value: c.id, label: c.name, icon: c.icon, color: c.color, selected: curFilter === c.id })));
  const catLabel = curCat ? curCat.name : 'Todas';
  const isAutor = curFilter.indexOf('autor:') === 0;
  const authorItems = [{ value: '', label: 'Todos', selected: !isAutor }].concat(authors.map(a => ({ value: a, label: a, selected: curFilter === 'autor:' + a })));
  const authorLabel = isAutor ? curFilter.slice(6) : 'Todos';
  const unitItems = [{ value: '', label: 'Todas', selected: !rxUnitFilter }].concat(units.map(u => ({ value: u, label: u, selected: rxUnitFilter === u })));
  const unitLabel = rxUnitFilter || 'Todas';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Short <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol" style="margin-bottom:12px"><label>Título ou ID</label><div class="nv-ffield"><input type="text" id="rxFTitulo" placeholder="Pesquisar short..." value="' + (curQuery || '') + '" autocomplete="off"></div></div>' +
    '<div class="nv-ffrow">' +
      '<div class="nv-ffcol"><label>Tipo</label>' + rxDDWrap('rxFFormat', fmtLabel, fmtItems) + '</div>' +
      '<div class="nv-ffcol"><label>Categoria</label>' + rxDDWrap('rxFCat', catLabel, catItems) + '</div>' +
    '</div>' +
    '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>Autor</label>' + rxDDWrap('rxFAutor', authorLabel, authorItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
      '<div class="nv-ffcol"><label>Unidade do autor</label>' + rxDDWrap('rxFUnit', unitLabel, unitItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
    '</div></div>';
  const reachItems = [{ value: '', label: 'Todos', selected: !rxReach }].concat(RX_REACH.map(v => ({ value: v, label: RX_REACH_LABEL[v], selected: rxReach === v })));
  const reachLabel = rxReach ? RX_REACH_LABEL[rxReach] : 'Todos';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Publicado para <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"><label>Selecione um destino</label>' + rxDDWrap('rxFReach', reachLabel, reachItems) + '</div>' +
    '</div>';
  /* "Período de publicação" usa as opções de PERIOD_H (24h/7d/30d) já usadas em todo o app, mais
     "Período personalizado" (rxPeriodDateStart/rxPeriodDateEnd, avaliado só dentro de
     curView==='lista' — mesma mecânica/gate de "Período de encerramento" logo abaixo), num menu
     customizado em vez do <select> nativo, para o mesmo visual dos demais campos desta sidebar. */
  const periodDefs = [['tudo', 'Qualquer período'], ['24h', 'Últimas 24 h'], ['7d', 'Últimos 7 dias'], ['30d', 'Últimos 30 dias'], ['custom', 'Período personalizado']];
  const periodItems = periodDefs.map(p => ({ value: p[0], label: p[1], selected: curPeriod === p[0] }));
  const periodLabel = (periodDefs.find(p => p[0] === curPeriod) || periodDefs[0])[1];
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Período de publicação <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"' + (curPeriod === 'custom' ? ' style="margin-bottom:12px"' : '') + '><label>Selecione um período</label>' + rxDDWrap('rxFPeriod', periodLabel, periodItems) + '</div>' +
    (curPeriod === 'custom' ? '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>A partir de</label>' + rxDateField('rxFPeriodDateStart', rxPeriodDateStart) + '</div>' +
      '<div class="nv-ffcol"><label>Até quando</label>' + rxDateField('rxFPeriodDateEnd', rxPeriodDateEnd) + '</div>' +
    '</div>' : '') +
    '</div>';
  const endPeriodDefs = [['tudo', 'Qualquer período'], ['hoje', 'Hoje'], ['7d', 'Últimos 7 dias'], ['30d', 'Últimos 30 dias'], ['custom', 'Período personalizado'], ['naoencerra', 'Não se encerra']];
  const endPeriodItems = endPeriodDefs.map(p => ({ value: p[0], label: p[1], selected: rxEndPeriod === p[0] }));
  const endPeriodLabel = (endPeriodDefs.find(p => p[0] === rxEndPeriod) || endPeriodDefs[0])[1];
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Período de encerramento <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"' + (rxEndPeriod === 'custom' ? ' style="margin-bottom:12px"' : '') + '><label>Selecione um período</label>' + rxDDWrap('rxFEndPeriod', endPeriodLabel, endPeriodItems) + '</div>' +
    (rxEndPeriod === 'custom' ? '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>A partir de</label>' + rxDateField('rxFEndDateStart', rxEndDateStart) + '</div>' +
      '<div class="nv-ffcol"><label>Até quando</label>' + rxDateField('rxFEndDateEnd', rxEndDateEnd) + '</div>' +
    '</div>' : '') +
    '</div>';
  const activeN = rxActiveFilterCount();
  html += '<div class="nv-filters-ft"><button class="nv-fclear' + (activeN > 0 ? ' has-active' : '') + '" id="rxFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros' + (activeN > 0 ? ' (' + activeN + ')' : '') + '</button><button class="nv-fapply" id="rxFApply">Aplicar filtros <i class="fa-solid fa-chevron-right"></i></button></div>';
  nav.innerHTML = html;
}

/* GERENCIAR > SHORTS (admin): núcleo da tabela de gerenciamento — colunas ID, Short (+ menu de
   Ações), Situação, Data de publicação, Publicado para, Tipo, Autor, Unidade do autor,
   Visualizações, Curtidas, Categoria e Data de encerramento; ordenação de 3 estados por coluna;
   colunas ID+Short congeladas (com colapso animado) ao rolar horizontalmente. */
function renderGerenciarShortsList(list){
  if (colSort.key && colSort.dir){
    const val = r => { const p = POSTS[r.p]; switch (colSort.key){
      case 'title': return (p.title || p.alt || '').toLowerCase();
      case 'author': return p.name.toLowerCase();
      case 'time': return hoursVal(p.time);
      case 'views': return numVal(r.views);
      case 'likes': return numVal(likeDisplay(r));
      case 'unit': return sbUnitObjFor(p).name.toLowerCase();
      case 'cat': { const c = catById(r.cat); return (c ? c.name : '').toLowerCase(); }
      case 'enddate': return r.encerra || Infinity;
      case 'status': return r.aprovacao ? 'aprovacao' : r.agendado ? 'agendado' : 'publicado';
      case 'reach': return RX_REACH_LABEL[rxReachFor(r.p)].toLowerCase();
      default: return 0; } };
    list = list.slice().sort((a, b) => { const va = val(a), vb = val(b); return va < vb ? -colSort.dir : va > vb ? colSort.dir : 0; });
  }
  const rows = list.map((r, idx) => {
    const post = POSTS[r.p];
    const cat = catById(r.cat);
    const unit = sbUnitObjFor(post);
    return '<tr data-i="' + idx + '">' +
      '<td class="perm-id">#' + (1000 + r.p) + '</td>' +
      '<td><div class="rl-reel">' +
        (r.proc ? '<span class="rl-procthumb"><svg class="rl-proc-ic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>cloud-upload</title><path d="M11 20H6.5Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20H13V12.85L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.85Z"/></svg></span>'
                : '<img src="' + (post.img || post.poster || '') + '" alt="">') +
        '<div><b>' + (post.title || post.alt) + '</b>' +
        (r.proc ? '<span class="rl-procpill"><span class="rl-spin"></span>Em processamento</span>' : '') +
        '</div>' +
        '<div class="rl-actwrap">' +
          '<button type="button" class="rl-actbtn"><span>Ações</span><i class="fa-solid fa-chevron-down"></i></button>' +
          '<div class="rl-actmenu" hidden>' +
            '<button type="button" data-ract="tab"><i class="fa-solid fa-up-right-from-square"></i> Abrir em nova guia</button>' +
            '<button type="button" data-ract="ver"><i class="fa-solid fa-play"></i> Assistir short</button>' +
            '<button type="button" data-ract="del" class="danger"><i class="fa-solid fa-trash"></i> Remover short</button>' +
          '</div>' +
        '</div>' +
        '</div></td>' +
      '<td style="white-space:nowrap">' + (r.proc
        ? '<span class="rl-dash">—</span>'
        : r.aprovacao
        ? '<div class="rl-statrow"><span class="rl-statdot apr"></span><span class="rl-stattxt apr">Em aprovação</span></div>'
        : r.agendado
        ? '<div class="rl-statrow"><span class="rl-statdot ag"></span><span class="rl-stattxt ag">Agendado</span></div><span class="rl-rel">' + rxSchedShort(r.agendado) + '</span>'
        : '<div class="rl-statrow"><span class="rl-statdot pub"></span><span class="rl-stattxt pub">Publicado</span></div>') + '</td>' +
      '<td style="white-space:nowrap" class="' + (r.agendado ? 'rl-dtag' : '') + '">' + ((r.proc || r.aprovacao)
        ? '<span class="rl-dash">—</span>'
        : '<div class="rl-dt">' + (r.agendado ? rxSchedDT(r.agendado) : rxPubDT(post.time)) + '</div><span class="rl-rel">' + (r.agendado ? rxSchedIn(r.agendado) : rxFullRel(post.time)) + '</span>') + '</td>' +
      '<td><span class="rl-reach">' + RX_REACH_LABEL[rxReachFor(r.p)] + '</span></td>' +
      '<td>' + (rFormat(r) === 'imagem'
        ? '<span class="nv-tp is-post"><i class="fa-solid fa-image"></i> Imagem</span>'
        : '<span class="nv-tp is-art"><i class="fa-solid fa-video"></i> Vídeo</span>') + '</td>' +
      '<td><div class="rl-author"><span class="avatar ' + post.av + '"></span><div><b>' + post.name + '</b><span class="rl-emp">' + (post.role || '') + '</span></div></div></td>' +
      '<td><div class="rl-unitcell"><span class="rxv-logo" style="background:' + unit.color + '">' + unit.ini + '</span><div><b>' + unit.name + '</b><span>' + unit.company + '</span></div></div></td>' +
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-rx="views"><i class="fa-solid fa-play" style="font-size:10px;color:' + (!r.proc && numVal(r.views) > 0 ? '#43B3AE' : '#8a94a0') + '"></i> ' + (r.proc ? '0' : r.views) + '</button></td>' +
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-rx="likes"><i class="fa-solid fa-heart" style="font-size:10px;color:' + (!r.proc && numVal(likeDisplay(r)) > 0 ? '#ff3040' : '#8a94a0') + '"></i> ' + (r.proc ? '0' : likeDisplay(r)) + '</button></td>' +
      '<td>' + (cat ? '<span class="rl-cat"><span class="rl-cat-dot" style="background:' + cat.color + '"><i class="fa-solid ' + (cat.icon || 'fa-tag') + '"></i></span>' + cat.name + '</span>' : '<span style="color:#b8c2cc">,</span>') + '</td>' +
      '<td style="white-space:nowrap">' + (r.encerra ? '<span class="rl-enddt">' + rxSchedDT(r.encerra) + '</span>' : '<span class="rl-noend">Não se encerra</span>') + '</td>' +
      '</tr>';
  }).join('');
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Short (' + list.length + ')' },
    { key: 'status', label: 'Situação' },
    { key: 'time', label: 'Data de publicação' },
    { key: 'reach', label: 'Publicado para' },
    { key: 'tipo', label: 'Tipo', sortable: false },
    { key: 'author', label: 'Autor' },
    { key: 'unit', label: 'Unidade do autor' },
    { key: 'views', label: 'Visualizações' },
    { key: 'likes', label: 'Curtidas' },
    { key: 'cat', label: 'Categoria' },
    { key: 'enddate', label: 'Data de encerramento' }
  ];
  const wrap = renderGridTable({
    grid: rxGrid, gridColumn: '1/-1', columns, rowsHTML: rows, sort: colSort,
    onSort: function(k){
      if (colSort.key !== k){ colSort.key = k; colSort.dir = 1; }
      else if (colSort.dir === 1){ colSort.dir = -1; }
      else { colSort.key = null; colSort.dir = 0; }
      renderGrid();
    },
    onRowClick: e => {
      const tr = e.target.closest('tr'); if (!tr) return;
      const idx = +tr.dataset.i; const r = list[idx];
      const rxb = e.target.closest('[data-rx]');
      if (rxb){ e.stopPropagation(); openReelAudience(r, rxb.dataset.rx); return; }
      const actBtn = e.target.closest('.rl-actbtn');
      if (actBtn){
        e.stopPropagation();
        const td = actBtn.closest('td');
        const menu = actBtn.nextElementSibling;
        const willOpen = menu.hidden;
        wrap.querySelectorAll('.rl-actmenu').forEach(m => { m.hidden = true; });
        wrap.querySelectorAll('td.rl-actz').forEach(c => c.classList.remove('rl-actz'));
        menu.hidden = !willOpen;
        td.classList.toggle('rl-actz', willOpen);
        return;
      }
      const ract = e.target.closest('[data-ract]');
      if (ract){
        e.stopPropagation();
        ract.closest('.rl-actmenu').hidden = true;
        ract.closest('td').classList.remove('rl-actz');
        const a = ract.dataset.ract;
        if (a === 'ver') openPlayer(list, idx);
        else if (a === 'tab') window.open(location.href, '_blank');
        else { const gi = REELS_DATA.indexOf(r); if (gi > -1) REELS_DATA.splice(gi, 1); buildStories(); renderGrid(); fgToast('Short excluído'); }
        return;
      }
      if (e.target.closest('.rl-actwrap')) return;
      openReelInfo(r);
    }
  });
}

/* Fecha o menu "Ações" da tabela e os dropdowns do filtro avançado ao clicar fora deles.
   Listener próprio (não mexe nos já existentes em 01-home.js/13-extras.js). */
document.addEventListener('click', e => {
  if (!e.target.closest('.rl-actwrap')){
    $$('#rxGrid .rl-actmenu').forEach(m => { m.hidden = true; });
    $$('#rxGrid td.rl-actz').forEach(td => td.classList.remove('rl-actz'));
  }
  if (!e.target.closest('.rl-ddwrap')){
    $$('#rxFilters .rl-ddmenu').forEach(m => { m.hidden = true; });
  }
});

/* Cliques da sidebar de filtro avançado (cartões de situação, dropdowns customizados, botão de
   calendário). Listener adicional sobre o mesmo #rxFilters já escutado em 01-home.js — cada um
   trata só o que reconhece, então convivem sem conflito. */
$('#rxFilters').addEventListener('click', e => {
  const st = e.target.closest('#mgSitCards button');
  if (st){ rxStatus = st.dataset.rxstatus; foBuildReelFilters(); renderGrid(); return; }
  if (e.target.closest('#rxFClear')){
    /* o handler de #rxFClear em 01-home.js já limpa curFilter/curQuery/curPeriod/rxFormat/rxStatus/
       etc. e re-renderiza; aqui só falta zerar o que é exclusivo desta tela. */
    rxUnitFilter = ''; rxPeriodDateStart = ''; rxPeriodDateEnd = ''; rxEndPeriod = 'tudo'; rxEndDateStart = ''; rxEndDateEnd = '';
    colSort.key = null; colSort.dir = 0;
    foBuildReelFilters(); renderGrid();
    return;
  }
  const db = e.target.closest('.nv-fdatebtn');
  if (db){ const inp = $('#' + db.dataset.datefor); if (inp){ if (inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem = e.target.closest('.rl-dditem');
  if (ddItem){
    const wrap = ddItem.closest('.rl-ddwrap'); const id = wrap.dataset.dd; const v = ddItem.dataset.value;
    if (id === 'rxFCat'){ curFilter = v || 'todos'; }
    else if (id === 'rxFPeriod'){ curPeriod = v; }
    else if (id === 'rxFEndPeriod'){ rxEndPeriod = v; }
    else if (id === 'rxFAutor'){ curFilter = v ? ('autor:' + v) : 'todos'; }
    else if (id === 'rxFUnit'){ rxUnitFilter = v; }
    else if (id === 'rxFReach'){ rxReach = v; }
    else if (id === 'rxFFormat'){ rxFormat = v; }
    foBuildReelFilters(); renderGrid();
    return;
  }
  const ddBtn = e.target.closest('.rl-ddwrap > button.nv-ffield');
  if (ddBtn){
    const wrap = ddBtn.closest('.rl-ddwrap'); const menu = wrap.querySelector('.rl-ddmenu');
    const willOpen = menu.hidden;
    $$('#rxFilters .rl-ddmenu').forEach(m => { m.hidden = true; });
    menu.hidden = !willOpen;
    return;
  }
});
$('#rxFilters').addEventListener('input', e => {
  if (e.target.id === 'rxFTitulo'){ curQuery = e.target.value.trim().toLowerCase(); renderGrid(); }
});
$('#rxFilters').addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'rxFPeriodDateStart'){ rxPeriodDateStart = t.value; }
  else if (t.id === 'rxFPeriodDateEnd'){ rxPeriodDateEnd = t.value; }
  else if (t.id === 'rxFEndDateStart'){ rxEndDateStart = t.value; }
  else if (t.id === 'rxFEndDateEnd'){ rxEndDateEnd = t.value; }
  else return;
  foBuildReelFilters(); renderGrid();
});
