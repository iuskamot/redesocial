/* =====================================================================
   GERENCIAR > PUBLICAÇÕES (admin) — assets/js/21-gerenciar-publicacoes.js

   Tabela e sidebar de filtro avançado da aba "Publicações" do alternador
   "Gerenciar" (#nmtPub / newsShow('list')). Espelha a estrutura da tela
   irmã de Shorts (assets/js/20-gerenciar-shorts.js) — mesma sidebar de
   filtro avançado, mesmos cartões de situação, mesma tabela com colunas
   congeladas e menu de Ações — só trocando os dados (NEWS em vez de
   REELS_DATA/POSTS) e as colunas específicas de publicação (Reações,
   Comentários, Data de encerramento).

   Isolado num arquivo à parte, no mesmo espírito do de Shorts, para não
   mexer em assets/js/11-rede-social.js além do único ponto de contato:

     - newsShow('list') chama pglRefresh() em vez de renderNewsList()
       quando esta tela existe (ver o guard em 11-rede-social.js).

   A sidebar antiga (#nvListScreen aside com <select> nativos, #nvList)
   continua no DOM, só oculta — não foi apagada porque #nvSearch ainda é
   referenciado sem guarda em assets/js/12-wizard.js.

   Reaproveita, por referência (sem duplicar), helpers já existentes:
     - assets/js/01-home.js: $, $$, fgToast, SB_UNIDADES, numVal, rxSchedDT, rxSchedIn
     - assets/js/20-gerenciar-shorts.js: sbUnitObjFor, RX_REACH_LABEL, rxSchedShort,
       rxEndInPeriod, rxDDMenu, rxDDWrap, rxDateField (helpers genéricos, não
       exclusivos de Shorts — só carregam antes por causa da ordem alfabética)
     - assets/js/11-rede-social.js: NEWS, NEWS_CATS, newsCatByName, nvFmtDateTime,
       AUTOR_CARGO, SULTS_LOGO, nvEdit, openInterModal
     - assets/js/13-extras.js: openNewsInfo
     - assets/js/07-busca.js: openReactions, nvRxIndex
   ===================================================================== */

/* Dados extras só para as colunas "Situação"/"Data de encerramento" desta tabela — mesmo
   espírito da seed de REELS_DATA em 01-home.js. Aditivo: quem já lê NEWS sem conhecer esses
   campos continua funcionando igual. */
(function seedPglDemoFields(){
  const agendaPlan = [[1, 2], [4, 5], [8, 9], [11, 14]];
  agendaPlan.forEach(function(p){ const n = NEWS.find(function(x){ return x.id === p[0]; }); if (n) n.agendado = Date.now() + p[1] * 86400000; });
  const apr = NEWS.find(function(x){ return x.id === 2; }); if (apr) apr.aprovacao = true;
  const proc = NEWS.find(function(x){ return x.id === 3; }); if (proc) proc.proc = true;
  NEWS.forEach(function(n, i){ if (!n.agendado && !n.proc && !n.aprovacao && i % 3 === 0) n.encerra = Date.now() + (((i * 41) % 150) + 7) * 86400000; });
})();

/* Estado exclusivo desta tela */
let pglQuery = '', pglStatus = '', pglType = '', pglCat = '', pglAuthor = '', pglUnit = '', pglReach = '';
let pglPeriod = 'tudo', pglEndPeriod = 'tudo', pglEndDateStart = '', pglEndDateEnd = '';
let pglColSort = { key: null, dir: 0 };

function pglUnitFor(n){ return sbUnitObjFor({ unit: n.unit, name: n.autorNome || n.author }); }
function pglViewsNum(n){ return n.views != null ? n.views : ((n.reactions || 0) * 37 + (n.comments || 0) * 112 + 240 + (n.id || 0) * 53); }
function pglViews(n){ const v = pglViewsNum(n); return typeof v === 'number' ? v.toLocaleString('pt-BR') : v; }
function pglAgo(n){
  const s = nvFmtDateTime(n);
  const m = /^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})$/.exec(s || ''); if (!m) return '';
  const d = new Date(2000 + +m[3], +m[2] - 1, +m[1], +m[4], +m[5]);
  const mins = Math.round((Date.now() - d) / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return 'há ' + mins + ' min';
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return 'há ' + hrs + (hrs === 1 ? ' hora' : ' horas');
  const days = Math.round(hrs / 24);
  if (days < 30) return 'há ' + days + (days === 1 ? ' dia' : ' dias');
  const mo = Math.round(days / 30);
  return 'há ' + mo + (mo === 1 ? ' mês' : ' meses');
}
function pglDateOf(n){
  const m = /^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})$/.exec(nvFmtDateTime(n) || '');
  return m ? new Date(2000 + +m[3], +m[2] - 1, +m[1], +m[4], +m[5]).getTime() : Date.now();
}
function pglInPeriod(n, period){
  if (!period || period === 'tudo') return true;
  const days = period === '24h' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : period === '90d' ? 90 : null;
  if (days == null) return true;
  const diff = (Date.now() - pglDateOf(n)) / 86400000;
  return diff >= 0 && diff <= days;
}
function matchPub(n){
  if (n.status === 'draft') return false;
  if (pglStatus === 'pub' && (n.agendado || n.proc || n.procFail || n.aprovacao)) return false;
  if (pglStatus === 'agendado' && !n.agendado) return false;
  if (pglStatus === 'aprovacao' && !n.aprovacao) return false;
  if (pglType === 'post' && n.article) return false;
  if (pglType === 'article' && !n.article) return false;
  if (pglCat && (n.sub || '') !== pglCat) return false;
  const autorNome = n.autorNome || n.author;
  if (pglAuthor && autorNome !== pglAuthor) return false;
  if (pglUnit && (n.unit || '') !== pglUnit) return false;
  if (pglReach && (n.reach || 'rede') !== pglReach) return false;
  if (!pglInPeriod(n, pglPeriod)) return false;
  if (pglEndPeriod !== 'tudo' && !rxEndInPeriod(n.encerra, pglEndPeriod, pglEndDateStart, pglEndDateEnd)) return false;
  if (pglQuery){
    const q = pglQuery.toLowerCase();
    const t = (n.title || n.text || '').toLowerCase();
    if (t.indexOf(q) === -1 && String(n.id).indexOf(q) === -1) return false;
  }
  return true;
}
function pglActiveFilterCount(){
  let c = 0;
  if (pglStatus) c++; if (pglQuery) c++; if (pglType) c++; if (pglCat) c++; if (pglAuthor) c++; if (pglUnit) c++;
  if (pglReach) c++; if (pglPeriod && pglPeriod !== 'tudo') c++; if (pglEndPeriod && pglEndPeriod !== 'tudo') c++;
  return c;
}

/* Sidebar de filtro avançado — mesma estrutura de foBuildGerenciarShortsFilters (19-gerenciar-
   shorts.js), só trocando os textos/campos para o vocabulário de Publicações. */
function foBuildGerenciarPublicacoesFilters(){
  const nav = $('#pubFilters'); if (!nav) return;
  const activeCats = NEWS_CATS.filter(function(c){ return c.active; });
  const authors = Array.from(new Set(NEWS.map(function(n){ return n.autorNome || n.author; })));
  const SVG_ACCOUNT_CLOCK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.63,14.1C12.23,10.58 16.38,9.03 19.9,10.63C23.42,12.23 24.97,16.38 23.37,19.9C22.24,22.4 19.75,24 17,24C14.3,24 11.83,22.44 10.67,20H1V18C1.06,16.86 1.84,15.93 3.34,15.18C4.84,14.43 6.72,14.04 9,14C9.57,14 10.11,14.05 10.63,14.1V14.1M9,4C10.12,4.03 11.06,4.42 11.81,5.17C12.56,5.92 12.93,6.86 12.93,8C12.93,9.14 12.56,10.08 11.81,10.83C11.06,11.58 10.12,11.95 9,11.95C7.88,11.95 6.94,11.58 6.19,10.83C5.44,10.08 5.07,9.14 5.07,8C5.07,6.86 5.44,5.92 6.19,5.17C6.94,4.42 7.88,4.03 9,4M17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14Z"/></svg>';
  const sit = [['', 'mdi mdi-layers-triple', 'Todos', ''], ['pub', 'mdi mdi-check-circle', 'Publicadas', '#25B865'], ['agendado', 'fa-solid fa-clock', 'Agendadas', '#2F8EE5'], ['aprovacao', SVG_ACCOUNT_CLOCK, 'Em aprovação', '#FFB020']];
  let html = '<div class="nv-fsec"><div class="nv-fsec-hd">Quais publicações você quer ver? <i class="fa-solid fa-chevron-up"></i></div><div class="cv-seg nv-sitcards nv-sit2" id="pubSitCards">' +
    sit.map(function(s){ const isSvg = s[1].charAt(0) === '<'; const colorAttr = s[3] ? ' style="color:' + s[3] + '"' : ''; const icon = isSvg ? s[1].replace('<svg', '<svg' + colorAttr) : '<i class="' + s[1] + '"' + colorAttr + '></i>'; return '<button data-pglstatus="' + s[0] + '" class="rxs-item2 ' + (pglStatus === s[0] ? 'active' : '') + '">' + icon + s[2] + '</button>'; }).join('') + '</div></div>';
  const units = SB_UNIDADES.map(function(u){ return u.name; });
  const typeItems = [{ value: '', label: 'Todos', selected: pglType === '' }, { value: 'post', label: 'Post', selected: pglType === 'post' }, { value: 'article', label: 'Artigo', selected: pglType === 'article' }];
  const typeLabel = (typeItems.filter(function(i){ return i.selected; })[0] || typeItems[0]).label;
  const curCat = NEWS_CATS.find(function(c){ return c.name === pglCat; });
  const catItems = [{ value: '', label: 'Todas', selected: !curCat }].concat(activeCats.map(function(c){ return { value: c.name, label: c.name, icon: c.icon, color: c.color, selected: pglCat === c.name }; }));
  const catLabel = curCat ? curCat.name : 'Todas';
  const authorItems = [{ value: '', label: 'Todos', selected: !pglAuthor }].concat(authors.map(function(a){ return { value: a, label: a, selected: pglAuthor === a }; }));
  const authorLabel = pglAuthor || 'Todos';
  const unitItems = [{ value: '', label: 'Todas', selected: !pglUnit }].concat(units.map(function(u){ return { value: u, label: u, selected: pglUnit === u }; }));
  const unitLabel = pglUnit || 'Todas';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Publicação <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol" style="margin-bottom:12px"><label>Título ou ID</label><div class="nv-ffield"><input type="text" id="pubFTitulo" placeholder="Pesquisar publicação..." value="' + (pglQuery || '') + '" autocomplete="off"></div></div>' +
    '<div class="nv-ffrow">' +
      '<div class="nv-ffcol"><label>Tipo</label>' + rxDDWrap('pubFTipo', typeLabel, typeItems) + '</div>' +
      '<div class="nv-ffcol"><label>Categoria</label>' + rxDDWrap('pubFCat', catLabel, catItems) + '</div>' +
    '</div>' +
    '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>Autor</label>' + rxDDWrap('pubFAutor', authorLabel, authorItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
      '<div class="nv-ffcol"><label>Unidade do autor</label>' + rxDDWrap('pubFUnit', unitLabel, unitItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
    '</div></div>';
  const reachDefs = [['rede', 'Toda a rede'], ['unidades', 'Unidades'], ['matriz', 'Sua Marca (Matriz)']];
  const reachItems = [{ value: '', label: 'Todos', selected: !pglReach }].concat(reachDefs.map(function(v){ return { value: v[0], label: v[1], selected: pglReach === v[0] }; }));
  const reachLabel = pglReach ? (RX_REACH_LABEL[pglReach] || pglReach) : 'Todos';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Publicado para <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"><label>Selecione um destino</label>' + rxDDWrap('pubFReach', reachLabel, reachItems) + '</div>' +
    '</div>';
  const periodDefs = [['tudo', 'Qualquer período'], ['24h', 'Últimas 24 h'], ['7d', 'Últimos 7 dias'], ['30d', 'Últimos 30 dias'], ['90d', 'Últimos 90 dias']];
  const periodItems = periodDefs.map(function(p){ return { value: p[0], label: p[1], selected: pglPeriod === p[0] }; });
  const periodLabel = (periodDefs.filter(function(p){ return p[0] === pglPeriod; })[0] || periodDefs[0])[1];
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Período de publicação <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"><label>Selecione um período</label>' + rxDDWrap('pubFPeriod', periodLabel, periodItems) + '</div>' +
    '</div>';
  const endPeriodDefs = [['tudo', 'Qualquer período'], ['hoje', 'Hoje'], ['7d', 'Últimos 7 dias'], ['30d', 'Últimos 30 dias'], ['custom', 'Período personalizado'], ['naoencerra', 'Não se encerra']];
  const endPeriodItems = endPeriodDefs.map(function(p){ return { value: p[0], label: p[1], selected: pglEndPeriod === p[0] }; });
  const endPeriodLabel = (endPeriodDefs.filter(function(p){ return p[0] === pglEndPeriod; })[0] || endPeriodDefs[0])[1];
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Período de encerramento <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"' + (pglEndPeriod === 'custom' ? ' style="margin-bottom:12px"' : '') + '><label>Selecione um período</label>' + rxDDWrap('pubFEndPeriod', endPeriodLabel, endPeriodItems) + '</div>' +
    (pglEndPeriod === 'custom' ? '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>A partir de</label>' + rxDateField('pubFEndDateStart', pglEndDateStart) + '</div>' +
      '<div class="nv-ffcol"><label>Até quando</label>' + rxDateField('pubFEndDateEnd', pglEndDateEnd) + '</div>' +
    '</div>' : '') +
    '</div>';
  const activeN = pglActiveFilterCount();
  html += '<div class="nv-filters-ft"><button class="nv-fclear' + (activeN > 0 ? ' has-active' : '') + '" id="pubFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros' + (activeN > 0 ? ' (' + activeN + ')' : '') + '</button><button class="nv-fapply" id="pubFApply">Aplicar filtros <i class="fa-solid fa-chevron-right"></i></button></div>';
  nav.innerHTML = html;
}

/* Núcleo da tabela de gerenciamento — colunas ID, Publicação (+ menu de Ações), Situação, Data
   de publicação, Publicado para, Tipo, Autor, Unidade do autor, Visualizações, Reações,
   Comentários, Categoria e Data de encerramento; ordenação de 3 estados por coluna; colunas
   ID+Publicação congeladas (com colapso animado) ao rolar horizontalmente — mesmo comportamento
   de renderGerenciarShortsList (20-gerenciar-shorts.js). */
function renderGerenciarPublicacoesList(list){
  const grid = document.getElementById('pubGrid'); if (!grid) return;
  grid.innerHTML = '';
  if (!list.length){ grid.innerHTML = '<div class="cat-empty">Nenhuma publicação encontrada.</div>'; return; }
  if (pglColSort.key && pglColSort.dir){
    const val = function(n){ switch (pglColSort.key){
      case 'title': return (n.title || n.text || '').toLowerCase();
      case 'author': return (n.autorNome || n.author || '').toLowerCase();
      case 'time': return n.id || 0;
      case 'views': return pglViewsNum(n);
      case 'rx': return n.reactions || 0;
      case 'cm': return n.comments || 0;
      case 'unit': return pglUnitFor(n).name.toLowerCase();
      case 'cat': { const c = newsCatByName(n.sub); return c ? c.name.toLowerCase() : ''; }
      case 'enddate': return n.encerra || Infinity;
      case 'status': return n.aprovacao ? 'aprovacao' : n.agendado ? 'agendado' : n.proc ? 'proc' : 'publicada';
      case 'reach': return (RX_REACH_LABEL[n.reach || 'rede'] || '').toLowerCase();
      default: return 0; } };
    list = list.slice().sort(function(a, b){ const va = val(a), vb = val(b); return va < vb ? -pglColSort.dir : va > vb ? pglColSort.dir : 0; });
  }
  const rows = list.map(function(n, idx){
    const cat = newsCatByName(n.sub);
    const unit = pglUnitFor(n);
    const autorNome = n.autorNome || n.author || 'Rodrigo Caetano';
    const autorAv = n.autorAv || n.av;
    const autorSub = AUTOR_CARGO[n.author] || (n.reach === 'unidades' ? 'Unidade' : 'Matriz');
    const dispTitle = n.title || (n.text ? n.text.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').slice(0, 60) : 'Publicação');
    const tipo = n.article
      ? '<span class="nv-tp is-art"><i class="fa-solid fa-newspaper"></i> Artigo</span>'
      : '<span class="nv-tp is-post"><i class="fa-solid fa-align-left"></i> Post</span>';
    const rx = n.reactions || 0;
    let rxIcons = '<span class="nv-rxc' + (rx === 0 ? ' nv-rxc-zero' : '') + '"><span class="rxs" data-rx="like"></span>';
    if (rx >= 90) rxIcons += '<span class="rxs" data-rx="love"></span>';
    if (rx >= 120) rxIcons += '<span class="rxs" data-rx="celebrate"></span>';
    rxIcons += '</span> ' + rx;
    return '<tr data-i="' + idx + '">' +
      '<td class="perm-id">#' + n.id + '</td>' +
      '<td><div class="rl-reel">' +
        (n.proc ? '<span class="rl-procthumb"><svg class="rl-proc-ic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>cloud-upload</title><path d="M11 20H6.5Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20H13V12.85L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.85Z"/></svg></span>'
          : n.image ? '<img src="' + n.image + '" alt="">'
          : '<span class="rl-procthumb"><i class="fa-solid ' + (n.article ? 'fa-newspaper' : 'fa-align-left') + '" style="color:#9aa5b1"></i></span>') +
        '<div><b>' + dispTitle + '</b>' +
        (n.proc ? '<span class="rl-procpill"><span class="rl-spin"></span>Em processamento</span>' : '') +
        '</div>' +
        '<div class="rl-actwrap">' +
          '<button type="button" class="rl-actbtn"><span>Ações</span><i class="fa-solid fa-chevron-down"></i></button>' +
          '<div class="rl-actmenu" hidden>' +
            '<button type="button" data-pact="tab"><i class="fa-solid fa-up-right-from-square"></i> Abrir em nova guia</button>' +
            '<button type="button" data-pact="ver"><i class="fa-solid fa-eye"></i> Ver publicação</button>' +
            '<button type="button" data-pact="edit"><i class="fa-solid fa-pen"></i> Editar</button>' +
            '<button type="button" data-pact="del" class="danger"><i class="fa-solid fa-trash"></i> Excluir</button>' +
          '</div>' +
        '</div>' +
        '</div></td>' +
      '<td style="white-space:nowrap">' + (n.proc
        ? '<span class="rl-dash">—</span>'
        : n.aprovacao
        ? '<div class="rl-statrow"><span class="rl-statdot apr"></span><span class="rl-stattxt apr">Em aprovação</span></div>'
        : n.agendado
        ? '<div class="rl-statrow"><span class="rl-statdot ag"></span><span class="rl-stattxt ag">Agendado</span></div><span class="rl-rel">' + rxSchedShort(n.agendado) + '</span>'
        : '<div class="rl-statrow"><span class="rl-statdot pub"></span><span class="rl-stattxt pub">Publicada</span></div>') + '</td>' +
      '<td style="white-space:nowrap" class="' + (n.agendado ? 'rl-dtag' : '') + '">' + ((n.proc || n.aprovacao)
        ? '<span class="rl-dash">—</span>'
        : '<div class="rl-dt">' + (n.agendado ? rxSchedDT(n.agendado) : nvFmtDateTime(n)) + '</div><span class="rl-rel">' + (n.agendado ? rxSchedIn(n.agendado) : pglAgo(n)) + '</span>') + '</td>' +
      '<td><span class="rl-reach">' + (RX_REACH_LABEL[n.reach || 'rede']) + '</span></td>' +
      '<td>' + tipo + '</td>' +
      '<td><div class="rl-author">' + (autorAv ? '<span class="avatar ' + autorAv + '"></span>' : '<span class="nv-logo">' + SULTS_LOGO + '</span>') + '<div><b>' + autorNome + '</b><span class="rl-emp">' + autorSub + '</span></div></div></td>' +
      '<td><div class="rl-unitcell"><span class="rxv-logo" style="background:' + unit.color + '">' + unit.ini + '</span><div><b>' + unit.name + '</b><span>' + unit.company + '</span></div></div></td>' +
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-pglopen="views"><i class="fa-solid fa-play" style="font-size:10px;color:' + (pglViewsNum(n) > 0 ? '#43B3AE' : '#8a94a0') + '"></i> ' + pglViews(n) + '</button></td>' +
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-pglopen="rx">' + rxIcons + '</button></td>' +
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-pglopen="cm"><i class="fa-solid fa-comment" style="font-size:10px;color:' + (numVal(String(n.comments || 0)) > 0 ? '#2f6fe4' : '#8a94a0') + '"></i> ' + n.comments + '</button></td>' +
      '<td>' + (cat ? '<span class="rl-cat"><span class="rl-cat-dot" style="background:' + cat.color + '"><i class="fa-solid ' + (cat.icon || 'fa-tag') + '"></i></span>' + cat.name + '</span>' : '<span style="color:#b8c2cc">,</span>') + '</td>' +
      '<td style="white-space:nowrap">' + (n.encerra ? '<span class="rl-enddt">' + rxSchedDT(n.encerra) + '</span>' : '<span class="rl-noend">Não se encerra</span>') + '</td>' +
      '</tr>';
  }).join('');
  const cols = [['id', 'ID'], ['title', 'Publicação (' + list.length + ')']];
  const colsAfter = [['author', 'Autor'], ['unit', 'Unidade do autor'], ['views', 'Visualizações'], ['rx', 'Reações'], ['cm', 'Comentários'], ['cat', 'Categoria']];
  const thSort = function(c){
    const k = c[0], active = pglColSort.key === k && pglColSort.dir !== 0;
    const icon = !active ? NV_SORT_ICONS.swap : (pglColSort.dir === 1 ? NV_SORT_ICONS.up : NV_SORT_ICONS.down);
    return '<th class="sortable' + (active ? ' active-sort' : '') + '" data-sort="' + k + '">' + c[1] + ' <span class="sort-ic">' + icon + '</span></th>';
  };
  const thPlain = function(label){ return '<th>' + label + '</th>'; };
  const ths = cols.map(thSort).join('') + thSort(['status', 'Situação']) + thSort(['time', 'Data de publicação']) + thSort(['reach', 'Publicado para']) + thPlain('Tipo') + colsAfter.map(thSort).join('') + thSort(['enddate', 'Data de encerramento']);
  const wrap = document.createElement('div');
  wrap.className = 'rlist rl-tblwrap';
  wrap.innerHTML = '<table><thead><tr>' + ths + '</tr></thead><tbody>' + rows + '</tbody></table>';
  wrap.querySelector('tbody').addEventListener('click', function(e){
    const tr = e.target.closest('tr'); if (!tr) return;
    const idx = +tr.dataset.i; const n = list[idx];
    const ob = e.target.closest('[data-pglopen]');
    if (ob){ e.stopPropagation(); if (ob.dataset.pglopen === 'rx') openReactions(nvRxIndex(n.id)); else openInterModal(n.title || (n.text ? n.text.replace(/<[^>]+>/g, '').slice(0, 60) : 'Publicação')); return; }
    const actBtn = e.target.closest('.rl-actbtn');
    if (actBtn){
      e.stopPropagation();
      const td = actBtn.closest('td');
      const menu = actBtn.nextElementSibling;
      const willOpen = menu.hidden;
      wrap.querySelectorAll('.rl-actmenu').forEach(function(m){ m.hidden = true; });
      wrap.querySelectorAll('td.rl-actz').forEach(function(c){ c.classList.remove('rl-actz'); });
      menu.hidden = !willOpen;
      td.classList.toggle('rl-actz', willOpen);
      return;
    }
    const pact = e.target.closest('[data-pact]');
    if (pact){
      e.stopPropagation();
      pact.closest('.rl-actmenu').hidden = true;
      pact.closest('td').classList.remove('rl-actz');
      const a = pact.dataset.pact;
      if (a === 'ver') openNewsInfo(n);
      else if (a === 'tab') window.open(location.href, '_blank');
      else if (a === 'edit') nvEdit(n.id);
      else { NEWS = NEWS.filter(function(x){ return x.id !== n.id; }); pglRefresh(); fgToast('Publicação excluída'); }
      return;
    }
    if (e.target.closest('.rl-actwrap')) return;
    openNewsInfo(n);
  });
  wrap.querySelector('thead').addEventListener('click', function(ev){
    const th = ev.target.closest('th.sortable'); if (!th) return;
    const k = th.dataset.sort;
    if (pglColSort.key !== k){ pglColSort.key = k; pglColSort.dir = 1; }
    else if (pglColSort.dir === 1){ pglColSort.dir = -1; }
    else { pglColSort.key = null; pglColSort.dir = 0; }
    renderGerenciarPublicacoesList(list);
  });
  grid.appendChild(wrap);
  const PGL_COLLAPSE_PX = 90;
  let pglScrollTicking = false;
  function pglSyncFrozenCols(){
    const progress = Math.max(0, Math.min(1, wrap.scrollLeft / PGL_COLLAPSE_PX));
    const idW = PGL_COLLAPSE_PX * (1 - progress);
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
    if (pglScrollTicking) return; pglScrollTicking = true;
    requestAnimationFrame(function(){ pglSyncFrozenCols(); pglScrollTicking = false; });
  });
  pglSyncFrozenCols();
}

/* Ponto de entrada único: reconstrói a sidebar e a tabela juntas, a partir do estado atual dos
   filtros. Chamado por newsShow('list') e por todos os handlers abaixo. */
function pglRefresh(){
  foBuildGerenciarPublicacoesFilters();
  renderGerenciarPublicacoesList(NEWS.filter(matchPub));
}

/* Fecha o menu "Ações" da tabela e os dropdowns do filtro avançado ao clicar fora deles —
   listener próprio, escopado a #pubGrid/#pubFilters, não interfere no de #rxGrid/#rxFilters. */
document.addEventListener('click', function(e){
  if (!e.target.closest('.rl-actwrap')){
    $$('#pubGrid .rl-actmenu').forEach(function(m){ m.hidden = true; });
    $$('#pubGrid td.rl-actz').forEach(function(td){ td.classList.remove('rl-actz'); });
  }
  if (!e.target.closest('.rl-ddwrap')){
    $$('#pubFilters .rl-ddmenu').forEach(function(m){ m.hidden = true; });
  }
});

/* Cliques da sidebar de filtro avançado (cartões de situação, dropdowns customizados, botão de
   calendário, limpar/aplicar filtros). */
$('#pubFilters') && $('#pubFilters').addEventListener('click', function(e){
  const st = e.target.closest('#pubSitCards button');
  if (st){ pglStatus = st.dataset.pglstatus; pglRefresh(); return; }
  if (e.target.closest('#pubFClear')){
    pglQuery = ''; pglStatus = ''; pglType = ''; pglCat = ''; pglAuthor = ''; pglUnit = ''; pglReach = '';
    pglPeriod = 'tudo'; pglEndPeriod = 'tudo'; pglEndDateStart = ''; pglEndDateEnd = '';
    pglColSort.key = null; pglColSort.dir = 0;
    pglRefresh();
    return;
  }
  if (e.target.closest('#pubFApply')){ pglRefresh(); fgToast('Filtros aplicados'); return; }
  const db = e.target.closest('.nv-fdatebtn');
  if (db){ const inp = $('#' + db.dataset.datefor); if (inp){ if (inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem = e.target.closest('.rl-dditem');
  if (ddItem){
    const wrap = ddItem.closest('.rl-ddwrap'); const id = wrap.dataset.dd; const v = ddItem.dataset.value;
    if (id === 'pubFCat'){ pglCat = v; }
    else if (id === 'pubFPeriod'){ pglPeriod = v; }
    else if (id === 'pubFEndPeriod'){ pglEndPeriod = v; }
    else if (id === 'pubFAutor'){ pglAuthor = v; }
    else if (id === 'pubFUnit'){ pglUnit = v; }
    else if (id === 'pubFReach'){ pglReach = v; }
    else if (id === 'pubFTipo'){ pglType = v; }
    pglRefresh();
    return;
  }
  const ddBtn = e.target.closest('.rl-ddwrap > button.nv-ffield');
  if (ddBtn){
    const wrap = ddBtn.closest('.rl-ddwrap'); const menu = wrap.querySelector('.rl-ddmenu');
    const willOpen = menu.hidden;
    $$('#pubFilters .rl-ddmenu').forEach(function(m){ m.hidden = true; });
    menu.hidden = !willOpen;
    return;
  }
});
$('#pubFilters') && $('#pubFilters').addEventListener('input', function(e){
  if (e.target.id === 'pubFTitulo'){ pglQuery = e.target.value.trim().toLowerCase(); renderGerenciarPublicacoesList(NEWS.filter(matchPub)); }
});
$('#pubFilters') && $('#pubFilters').addEventListener('change', function(e){
  const t = e.target;
  if (t.id === 'pubFEndDateStart'){ pglEndDateStart = t.value; }
  else if (t.id === 'pubFEndDateEnd'){ pglEndDateEnd = t.value; }
  else return;
  pglRefresh();
});
