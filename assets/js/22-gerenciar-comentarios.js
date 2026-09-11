/* =====================================================================
   GERENCIAR > COMENTÁRIOS (admin) — assets/js/22-gerenciar-comentarios.js

   Tabela e sidebar de filtro avançado da tela "Comentários" do alternador
   "Gerenciar" (#nmtCmts / newsShow('cmgrid')). Espelha a estrutura das telas
   irmãs de Publicações/Shorts (assets/js/21-gerenciar-publicacoes.js /
   20-gerenciar-shorts.js) — mesma tabela com colunas congeladas, mesmo
   sistema de sidebar de filtro avançado — só trocando os dados (todos os
   comentários já publicados, achatados a partir de NEWS[*].cmts, em vez de
   NEWS/REELS_DATA em si) e as colunas específicas de comentário (Comentário,
   Comentado em, Autor, Unidade, Publicação).

   Isolado num arquivo à parte, no mesmo espírito dos de Shorts/Publicações,
   para não mexer em assets/js/11-rede-social.js além dos pontos de contato:

     - #nmtCmts chama newsShow('cmgrid') em vez de abrir a tela de
       Interações filtrada por comentário (que continua existindo no
       código, só deixou de ser alcançada por este botão).
     - newsShow('cmgrid') chama cmgRefresh().

   Reaproveita, por referência (sem duplicar), helpers já existentes:
     - assets/js/01-home.js: $, $$, fgToast, SB_UNIDADES
     - assets/js/20-gerenciar-shorts.js: sbUnitObjFor, rxDDMenu, rxDDWrap
       (helpers genéricos, não exclusivos de Shorts — só carregam antes por
       causa da ordem alfabética)
     - assets/js/11-rede-social.js: NEWS, AUTOR_CARGO, SULTS_LOGO, NV_SORT_ICONS
   ===================================================================== */

/* Estado exclusivo desta tela */
let cmgQuery = '', cmgPeriod = 'tudo', cmgAuthor = '', cmgUnit = '', cmgPubQuery = '';
let cmgPeriodDateStart = '', cmgPeriodDateEnd = '';
let cmgColSort = { key: null, dir: 0 };

function cmgUnitFor(c){ return sbUnitObjFor({ unit: c.unit, name: c.author || c.name }); }

/* Mesma lógica de cmDT (assets/js/05-feed.js), devolvendo um Date em vez de string pronta —
   aceita tanto o "dt" absoluto já formatado (comentários semeados em 14-crunch.js/17-marcas.js,
   "DD/MM/AAAA às HH:MM") quanto o "time" relativo ("agora"/"hoje"/"ontem"/"N min"/"N h"/"N d"). */
function cmgDateOf(c){
  if (c && c.dt){
    const m = /^(\d{2})\/(\d{2})\/(\d{2,4})[^\d]*(\d{2}):(\d{2})$/.exec(c.dt);
    if (m){ const ano = m[3].length === 2 ? '20' + m[3] : m[3]; return new Date(+ano, +m[2] - 1, +m[1], +m[4], +m[5]); }
  }
  const s = String((c && c.time) || 'agora');
  let mins = 0, mm;
  if (/agora/i.test(s)) mins = 0;
  else if (/hoje/i.test(s)) mins = 120;
  else if (/ontem/i.test(s)) mins = 1440;
  else if ((mm = s.match(/(\d+)\s*min/i))) mins = +mm[1];
  else if ((mm = s.match(/(\d+)\s*h/i))) mins = +mm[1] * 60;
  else if ((mm = s.match(/(\d+)\s*d/i))) mins = +mm[1] * 1440;
  return new Date(Date.now() - mins * 60000);
}
function cmgFullDT(c){ const d = cmgDateOf(c), p = x => ('0' + x).slice(-2); return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()); }
function cmgAgo(c){
  const mins = Math.round((Date.now() - cmgDateOf(c).getTime()) / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return 'há ' + mins + ' min';
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return 'há ' + hrs + (hrs === 1 ? ' hora' : ' horas');
  const days = Math.round(hrs / 24);
  if (days < 30) return 'há ' + days + (days === 1 ? ' dia' : ' dias');
  const mo = Math.round(days / 30);
  return 'há ' + mo + (mo === 1 ? ' mês' : ' meses');
}
function cmgInPeriod(c, period){
  if (!period || period === 'tudo') return true;
  if (period === 'custom'){
    const t = cmgDateOf(c).getTime();
    if (cmgPeriodDateStart && t < new Date(cmgPeriodDateStart + 'T00:00:00').getTime()) return false;
    if (cmgPeriodDateEnd && t > new Date(cmgPeriodDateEnd + 'T23:59:59').getTime()) return false;
    return true;
  }
  const days = period === '24h' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : null;
  if (days == null) return true;
  const diff = (Date.now() - cmgDateOf(c).getTime()) / 86400000;
  return diff >= 0 && diff <= days;
}

/* Lista achatada de todos os comentários de NEWS[*].cmts, um por linha, com a publicação de
   origem anexada. cid (id sintético = id da publicação * 1000 + índice do comentário nela) é
   estável entre renders enquanto a publicação e a posição do comentário nela não mudarem. */
function cmgAllComments(){
  const out = [];
  NEWS.forEach(function(n){
    (n.cmts || []).forEach(function(c, ci){ out.push({ cid: n.id * 1000 + ci, c: c, n: n }); });
  });
  return out;
}
function matchCmg(row){
  const c = row.c, n = row.n;
  const autor = c.author || c.name || 'SULTS';
  if (cmgAuthor && autor !== cmgAuthor) return false;
  if (cmgUnit && cmgUnitFor(c).name !== cmgUnit) return false;
  if (!cmgInPeriod(c, cmgPeriod)) return false;
  if (cmgPubQuery){
    const t = (n.title || n.text || '').toLowerCase();
    if (t.indexOf(cmgPubQuery) === -1) return false;
  }
  if (cmgQuery){
    const txt = (c.text || '').toLowerCase();
    if (txt.indexOf(cmgQuery) === -1 && String(row.cid).indexOf(cmgQuery) === -1) return false;
  }
  return true;
}
function cmgActiveFilterCount(){
  let n = 0;
  if (cmgQuery) n++; if (cmgAuthor) n++; if (cmgUnit) n++; if (cmgPubQuery) n++;
  if (cmgPeriod && cmgPeriod !== 'tudo') n++;
  return n;
}

/* Sidebar de filtro avançado — mesma estrutura de foBuildGerenciarPublicacoesFilters
   (21-gerenciar-publicacoes.js), com os 5 campos pedidos para Comentários organizados em
   3 seções (Comentário, Publicação, Período de comentário), igual à referência do Figma. */
function foBuildGerenciarComentariosFilters(){
  const nav = $('#cmgFilters'); if (!nav) return;
  const all = cmgAllComments();
  const authors = Array.from(new Set(all.map(function(r){ return r.c.author || r.c.name || 'SULTS'; })));
  const units = SB_UNIDADES.map(function(u){ return u.name; });
  const authorItems = [{ value: '', label: 'Todos', selected: !cmgAuthor }].concat(authors.map(function(a){ return { value: a, label: a, selected: cmgAuthor === a }; }));
  const authorLabel = cmgAuthor || 'Todos';
  const unitItems = [{ value: '', label: 'Todas', selected: !cmgUnit }].concat(units.map(function(u){ return { value: u, label: u, selected: cmgUnit === u }; }));
  const unitLabel = cmgUnit || 'Todas';
  let html = '<div class="nv-fsec"><div class="nv-fsec-hd">Qual comentário você quer ver? <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol" style="margin-bottom:12px"><label>Comentário ou ID</label><div class="nv-ffield"><input type="text" id="cmgFTexto" placeholder="Pesquisar comentário..." value="' + (cmgQuery || '') + '" autocomplete="off"></div></div>' +
    '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>Autor</label>' + rxDDWrap('cmgFAutor', authorLabel, authorItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
      '<div class="nv-ffcol"><label>Unidade do autor</label>' + rxDDWrap('cmgFUnit', unitLabel, unitItems, 'fa-earth-americas', 'fa-magnifying-glass') + '</div>' +
    '</div></div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Publicação <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"><label>Título da publicação</label><div class="nv-ffield"><input type="text" id="cmgFPub" placeholder="Pesquisar publicação..." value="' + (cmgPubQuery || '') + '" autocomplete="off"></div></div>' +
    '</div>';
  const periodDefs = [['tudo', 'Qualquer período'], ['24h', 'Últimas 24 h'], ['7d', 'Últimos 7 dias'], ['30d', 'Últimos 30 dias'], ['custom', 'Período personalizado']];
  const periodLabel = (periodDefs.filter(function(p){ return p[0] === cmgPeriod; })[0] || periodDefs[0])[1];
  const periodItems = periodDefs.map(function(p){ return { value: p[0], label: p[1], selected: cmgPeriod === p[0] }; });
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Período de comentário <i class="fa-solid fa-chevron-up"></i></div>' +
    '<div class="nv-ffcol"' + (cmgPeriod === 'custom' ? ' style="margin-bottom:12px"' : '') + '><label>Selecione uma opção</label>' + rxDDWrap('cmgFPeriod', periodLabel, periodItems) + '</div>' +
    (cmgPeriod === 'custom' ? '<div class="nv-ffrow nv-ffrow-last">' +
      '<div class="nv-ffcol"><label>A partir de</label>' + rxDateField('cmgFPeriodDateStart', cmgPeriodDateStart) + '</div>' +
      '<div class="nv-ffcol"><label>Até quando</label>' + rxDateField('cmgFPeriodDateEnd', cmgPeriodDateEnd) + '</div>' +
    '</div>' : '') +
    '</div>';
  const activeN = cmgActiveFilterCount();
  html += '<div class="nv-filters-ft"><button class="nv-fclear' + (activeN > 0 ? ' has-active' : '') + '" id="cmgFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros' + (activeN > 0 ? ' (' + activeN + ')' : '') + '</button><button class="nv-fapply" id="cmgFApply">Aplicar filtros <i class="fa-solid fa-chevron-right"></i></button></div>';
  nav.innerHTML = html;
}

/* Núcleo da tabela de gerenciamento — colunas ID, Comentário, Comentado em, Autor, Unidade e
   Publicação; ordenação de 3 estados por coluna; colunas ID+Comentário congeladas (com colapso
   animado) ao rolar horizontalmente — mesmo comportamento de renderGerenciarPublicacoesList. */
function renderGerenciarComentariosList(rows){
  const grid = document.getElementById('cmgGrid'); if (!grid) return;
  grid.innerHTML = '';
  if (!rows.length){ grid.innerHTML = '<div class="cat-empty">Nenhum comentário encontrado.</div>'; return; }
  if (cmgColSort.key && cmgColSort.dir){
    const val = function(row){ const c = row.c, n = row.n; switch (cmgColSort.key){
      case 'id': return row.cid;
      case 'text': return (c.text || '').toLowerCase();
      case 'time': return cmgDateOf(c).getTime();
      case 'author': return (c.author || c.name || '').toLowerCase();
      case 'unit': return cmgUnitFor(c).name.toLowerCase();
      case 'pub': return (n.title || n.text || '').toLowerCase();
      default: return 0; } };
    rows = rows.slice().sort(function(a, b){ const va = val(a), vb = val(b); return va < vb ? -cmgColSort.dir : va > vb ? cmgColSort.dir : 0; });
  }
  const thumbCmg = function(n){ return n.image ? '<img src="' + n.image + '" alt="">' : '<span class="rl-procthumb"><i class="fa-solid ' + (n.article ? 'fa-newspaper' : 'fa-align-left') + '" style="color:#9aa5b1"></i></span>'; };
  const rowsHTML = rows.map(function(row, idx){
    const c = row.c, n = row.n;
    const autorNome = c.author || c.name || 'SULTS';
    const autorSub = c.role || AUTOR_CARGO[autorNome] || 'Matriz';
    const unit = cmgUnitFor(c);
    const dispTitle = n.title || (n.text ? n.text.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').slice(0, 60) : 'Publicação');
    const tipo = n.article ? 'Artigo' : 'Postagem';
    return '<tr data-i="' + idx + '">' +
      '<td class="perm-id">#' + row.cid + '</td>' +
      '<td><div class="rl-reel"><span class="apr-cmt">"' + (c.text || '').replace(/</g, '&lt;') + '"</span>' +
        '<button type="button" class="rl-actbtn" data-cmgview="' + idx + '"><span>Acessar</span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><title>arrow-right</title><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/></svg></button>' +
      '</div></td>' +
      '<td><div class="rl-author">' + (c.av ? '<span class="avatar ' + c.av + '"></span>' : '<span class="nv-logo">' + SULTS_LOGO + '</span>') + '<div><b>' + autorNome + '</b><span class="rl-emp">' + autorSub + '</span></div></div></td>' +
      '<td><div class="rl-unitcell"><span class="rxv-logo" style="background:' + unit.color + '">' + unit.ini + '</span><div><b>' + unit.name + '</b><span>' + unit.company + '</span></div></div></td>' +
      '<td style="white-space:nowrap"><div class="rl-dt">' + cmgFullDT(c) + '</div><span class="rl-rel">' + cmgAgo(c) + '</span></td>' +
      '<td><div class="rl-pubcell">' + thumbCmg(n) + '<div><b>' + dispTitle + '</b><span>' + tipo + '</span></div></div></td>' +
      '</tr>';
  }).join('');
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'text', label: 'Comentário (' + rows.length + ')' },
    { key: 'author', label: 'Autor' },
    { key: 'unit', label: 'Unidade do autor' },
    { key: 'time', label: 'Comentado em' },
    { key: 'pub', label: 'Publicação' }
  ];
  renderGridTable({
    grid, columns, rowsHTML, sort: cmgColSort,
    onSort: function(k){
      if (cmgColSort.key !== k){ cmgColSort.key = k; cmgColSort.dir = 1; }
      else if (cmgColSort.dir === 1){ cmgColSort.dir = -1; }
      else { cmgColSort.key = null; cmgColSort.dir = 0; }
      /* Sempre recomeça de cmgAllComments()+matchCmg (ordem natural), nunca da lista já
         ordenada da renderização anterior — senão, ao voltar pro estado "sem ordenação"
         (3º clique), a tabela ficava presa na última ordem aplicada em vez de voltar à
         original. */
      renderGerenciarComentariosList(cmgAllComments().filter(matchCmg));
    },
    onRowClick: function(e){
      const btn = e.target.closest('[data-cmgview]'); if (!btn) return;
      const row = rows[+btn.dataset.cmgview]; if (!row) return;
      if (typeof openNewsInfo === 'function') openNewsInfo(row.n);
    }
  });
}

/* Ponto de entrada único: reconstrói a sidebar e a tabela juntas, a partir do estado atual dos
   filtros. Chamado por newsShow('cmgrid') e por todos os handlers abaixo. */
function cmgRefresh(){
  foBuildGerenciarComentariosFilters();
  renderGerenciarComentariosList(cmgAllComments().filter(matchCmg));
}

/* Fecha os dropdowns do filtro avançado ao clicar fora deles — escopado a #cmgFilters, não
   interfere no de #pubFilters/#rxFilters. */
document.addEventListener('click', function(e){
  if (!e.target.closest('.rl-ddwrap')){
    $$('#cmgFilters .rl-ddmenu').forEach(function(m){ m.hidden = true; });
  }
});

$('#cmgFilters') && $('#cmgFilters').addEventListener('click', function(e){
  if (e.target.closest('#cmgFClear')){
    cmgQuery = ''; cmgPeriod = 'tudo'; cmgAuthor = ''; cmgUnit = ''; cmgPubQuery = '';
    cmgPeriodDateStart = ''; cmgPeriodDateEnd = '';
    cmgColSort.key = null; cmgColSort.dir = 0;
    cmgRefresh();
    return;
  }
  if (e.target.closest('#cmgFApply')){ cmgRefresh(); fgToast('Filtros aplicados'); return; }
  const db = e.target.closest('.nv-fdatebtn');
  if (db){ const inp = $('#' + db.dataset.datefor); if (inp){ if (inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem = e.target.closest('.rl-dditem');
  if (ddItem){
    const wrap = ddItem.closest('.rl-ddwrap'); const id = wrap.dataset.dd; const v = ddItem.dataset.value;
    if (id === 'cmgFPeriod'){ cmgPeriod = v; }
    else if (id === 'cmgFAutor'){ cmgAuthor = v; }
    else if (id === 'cmgFUnit'){ cmgUnit = v; }
    cmgRefresh();
    return;
  }
  const ddBtn = e.target.closest('.rl-ddwrap > button.nv-ffield');
  if (ddBtn){
    const wrap = ddBtn.closest('.rl-ddwrap'); const menu = wrap.querySelector('.rl-ddmenu');
    const willOpen = menu.hidden;
    $$('#cmgFilters .rl-ddmenu').forEach(function(m){ m.hidden = true; });
    menu.hidden = !willOpen;
    return;
  }
});
$('#cmgFilters') && $('#cmgFilters').addEventListener('input', function(e){
  if (e.target.id === 'cmgFTexto'){ cmgQuery = e.target.value.trim().toLowerCase(); renderGerenciarComentariosList(cmgAllComments().filter(matchCmg)); }
  else if (e.target.id === 'cmgFPub'){ cmgPubQuery = e.target.value.trim().toLowerCase(); renderGerenciarComentariosList(cmgAllComments().filter(matchCmg)); }
});
$('#cmgFilters') && $('#cmgFilters').addEventListener('change', function(e){
  const t = e.target;
  if (t.id === 'cmgFPeriodDateStart'){ cmgPeriodDateStart = t.value; }
  else if (t.id === 'cmgFPeriodDateEnd'){ cmgPeriodDateEnd = t.value; }
  else return;
  cmgRefresh();
});
