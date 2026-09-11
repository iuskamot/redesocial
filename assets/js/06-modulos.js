/* grade de modulos, busca, animacao e organizar */
/* ---------- Expandir grade de aplicativos ---------- */
const appsToggle = $('#appsToggle');
appsToggle.addEventListener('click', () => {
  animaModulos(() => {
    $('#appsGrid').classList.toggle('expanded');
    appsToggle.classList.toggle('open');
    const _l=$('#appsToggleLbl'); if(_l && appsToggle.classList.contains('open')) _l.textContent = 'Ver menos';
    applyFold();
  });
});

/* ---------- Busca de módulos ---------- */
const appSearch  = $('#appSearch');
const appsPanel  = $('#appsPanel');
const appsGrid   = $('#appsGrid');
const appsEmpty  = $('#appsEmpty');
const appsExpand = $('.apps-expand');
const appTiles   = $$('#appsGrid .tile');
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/* Colapsado mostra apenas 2 linhas (calculado pelo nº real de colunas) */
appTiles.forEach(t => t.classList.remove('extra'));
function applyFold(){
  /* organizando, todos os módulos ficam à mostra: sem limpar o over-fold
     aqui, as classes da dobra anterior sobreviviam e a grade continuava
     recolhida mesmo com a classe expanded. */
  if (appsPanel.classList.contains('editing')){
    appTiles.forEach(t => t.classList.remove('over-fold'));
    return;
  }
  const searching = appsGrid.classList.contains('searching');
  const expanded  = appsGrid.classList.contains('expanded');
  appTiles.forEach(t => t.classList.remove('over-fold'));
  /* a ordem que vale e a do DOM agora, nao a da carga: depois de arrastar no
     Organizar os nos mudam de lugar, e a lista appTiles continua na ordem
     original. Lendo de novo aqui, a dobra passa a respeitar a ordem nova. */
  const atuais = Array.prototype.slice.call(appsGrid.querySelectorAll('.tile'));
  /* duas linhas cheias: o nº de colunas vem do próprio grid, então o limite
     acompanha os breakpoints (7 no desktop, 5 e 4 nas telas menores) */
  const colunas = getComputedStyle(appsGrid).gridTemplateColumns.split(' ').filter(Boolean).length || 7;
  /* uma linha fechada, na home e em Enquetes: o resto vem no "Ver +N modulos" */
  const limit = colunas;
  const elig = atuais.filter(t => t.style.display !== 'none');
  const _l=document.getElementById('appsToggleLbl');
  if(_l && !appsToggle.classList.contains('open')) _l.textContent = 'Ver +'+Math.max(0, elig.length-limit)+' módulos';
  if (!searching) appsExpand.hidden = elig.length <= limit;
  if (expanded || searching) return;
  elig.forEach((t, i) => { if (i >= limit) t.classList.add('over-fold'); });
}
applyFold();
window.addEventListener('resize', applyFold);

/* ---------- Abrir e fechar os módulos com transição ----------
   A altura da grade é medida antes e depois da mudança e animada entre os
   dois valores — é só isso, os cartões não têm animação própria. Quem sai
   fica preso na tela por '.saindo' para a altura descer sobre os cartões em
   vez de sobre um espaço já vazio. */
const CURVA = 'cubic-bezier(.22,1,.36,1)';
let animGrade = null;

function animaModulos(aplica){
  const podeAnimar = appsGrid.animate &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!podeAnimar){ aplica(); return; }

  /* um clique novo cancela o anterior em vez de empilhar */
  if (animGrade){ animGrade.cancel(); animGrade = null; }
  appTiles.forEach(t => t.classList.remove('saindo'));

  const naTela = () => appTiles.filter(t => t.offsetParent);
  const antesLista = naTela();
  const antes = appsGrid.getBoundingClientRect().height;

  aplica();

  const depoisLista = naTela();
  const depois = appsGrid.getBoundingClientRect().height;
  if (Math.abs(depois - antes) < 1){ appsGrid.style.clipPath = ''; return; }

  const saem = antesLista.filter(t => !depoisLista.includes(t) && !t.classList.contains('hide'));

  /* devolve os que saem para a tela, para eles sumirem junto com a altura */
  saem.forEach(t => t.classList.add('saindo'));

  /* recorta so a base: overflow:hidden cortaria tambem os badges de
     notificacao, que ficam 7px acima do topo do cartao */
  appsGrid.style.clipPath = 'inset(-24px -24px 0 -24px)';
  const esta = appsGrid.animate(
    [{ height: antes + 'px' }, { height: depois + 'px' }],
    { duration: depois > antes ? 380 : 340, easing: CURVA }
  );
  animGrade = esta;
  /* 'finished' resolve no fim e rejeita no cancelamento — os dois caem aqui.
     O guarda evita que a limpeza de uma animação já substituída apague o
     estado da que acabou de começar, em cliques rápidos. */
  const limpa = () => {
    if (animGrade !== esta) return;
    appsGrid.style.clipPath = '';
    appTiles.forEach(t => t.classList.remove('saindo'));
    animGrade = null;
  };
  esta.finished.then(limpa, limpa);
}

function filterApps(){
  const q = norm(appSearch.value.trim());
  let visiveis = 0;
  appTiles.forEach(t => {
    const nome = norm(t.querySelector('.tl').textContent);
    const ok = !q || nome.includes(q);
    t.classList.toggle('hide', !ok);
    if (ok) visiveis++;
  });
  appsGrid.classList.toggle('searching', !!q);   // busca enxerga também os módulos recolhidos
  appsEmpty.hidden = visiveis > 0;
  appsExpand.hidden = !!q;
  applyFold();
}
appSearch.addEventListener('input', filterApps);

/* ---------- Modo organizar (arrastar e soltar) ---------- */
const appsEdit = $('#appsEdit');
const appsCancel = $('#appsCancel');
let editing = false, estavaExpandido = false, dragEl = null;

/* guarda a ordem de antes para o Cancelar poder devolvê-la */
let ordemAntesDeOrganizar = null;

function organizar(ligar){
  editing = ligar;
  appsPanel.classList.toggle('editing', editing);
  appsEdit.classList.toggle('on', editing);
  appsEdit.innerHTML = editing
    ? '<i class="fa-solid fa-check"></i><span>Salvar</span>'
    : '<i class="fa-solid fa-arrows-up-down-left-right"></i><span>Organizar</span>';
  if (appsCancel) appsCancel.hidden = !editing;
  appSearch.disabled = editing;
  appsToggle.disabled = editing;

  if (editing){
    appSearch.value = '';
    filterApps();
    estavaExpandido = appsGrid.classList.contains('expanded');
    ordemAntesDeOrganizar = [...appsGrid.children];
    appsGrid.classList.add('expanded');        // mostra todos os módulos para organizar
    appsToggle.classList.add('open');
  } else if (!estavaExpandido){
    appsGrid.classList.remove('expanded');
    appsToggle.classList.remove('open');
  }
  appTiles.forEach(t => t.draggable = editing);
  applyFold();
}

appsEdit.addEventListener('click', () => organizar(!editing));

appsCancel && appsCancel.addEventListener('click', () => {
  /* devolve a ordem exatamente como estava ao abrir o modo */
  if (ordemAntesDeOrganizar) ordemAntesDeOrganizar.forEach(el => appsGrid.appendChild(el));
  organizar(false);
  fgToast('Reordenação cancelada');
});

appTiles.forEach(t => {
  t.addEventListener('click', e => { if (editing) e.preventDefault(); });

  t.addEventListener('dragstart', e => {
    if (!editing){ e.preventDefault(); return; }
    dragEl = t;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => t.classList.add('dragging'), 0);
  });

  t.addEventListener('dragend', () => {
    t.classList.remove('dragging');
    appsGrid.querySelectorAll('.drop-before,.drop-after').forEach(x=>x.classList.remove('drop-before','drop-after'));
    dragEl = null;
  });

  t.addEventListener('dragover', e => {
    if (!editing || !dragEl || dragEl === t) return;
    e.preventDefault();
    const r = t.getBoundingClientRect();
    const antes = (e.clientX - r.left) < r.width / 2;
    const cls = antes ? 'drop-before' : 'drop-after';
    if (t.classList.contains(cls)) return;
    appsGrid.querySelectorAll('.drop-before,.drop-after').forEach(x=>x.classList.remove('drop-before','drop-after'));
    t.classList.add(cls);
  });
  t.addEventListener('dragleave', e => { if(!t.contains(e.relatedTarget)) t.classList.remove('drop-before','drop-after'); });
  t.addEventListener('drop', e => {
    if (!editing || !dragEl || dragEl === t) return;
    e.preventDefault();
    const antes = t.classList.contains('drop-before');
    t.classList.remove('drop-before','drop-after');
    appsGrid.insertBefore(dragEl, antes ? t : t.nextSibling);
  });
});
appsGrid.addEventListener('dragover', e => { if (editing) e.preventDefault(); });
appsGrid.addEventListener('drop', () => appsGrid.querySelectorAll('.drop-before,.drop-after').forEach(x=>x.classList.remove('drop-before','drop-after')));

