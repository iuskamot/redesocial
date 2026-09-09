/* barra inferior do mobile */
/* ---------- Nav inferior do mobile ----------
   Cada item leva a uma seção que a home já tem; o "+" abre as mesmas ações
   rápidas do header. Rolagem descontando o header, que é sticky. */
(() => {
  const mnav = $('#mnav');
  if (!mnav) return;
  const alvos = { home: null, comunicados: '#homeComPanel' };
  const fecharModulos = () => {
    ['closeStories', 'closeForum', 'closeNewsModule'].forEach(f => { if (typeof window[f] === 'function') window[f](); });
  };
  /* a folha copia o que o painel da home mostraria agora: assim ela acompanha
     o cenario ligado (SULTS, Crunchyroll, vazio) sem duplicar conteudo */
  window.comSheetAbrir = function(){
    const painel = $('#homeComPanel'), corpo = $('#comSheetBody'), fundo = $('#comSheetBack');
    if (!painel || !corpo || !fundo) return;
    corpo.innerHTML = '';
    painel.querySelectorAll(':scope > *').forEach(el => {
      if (el.classList.contains('com-head')) return;
      if (getComputedStyle(el).display === 'none') return;
      corpo.appendChild(el.cloneNode(true));
    });
    /* a barra de baixo e fixa e fica por cima da folha, e o "+" ainda sobe
       acima dela. O fim da lista reserva a barra mais essa saliencia, senao o
       "Ver todos os comunicados" fica escondido atras dos dois. */
    const barra = $('#mnav'), fab = $('#mnav .fab');
    const rb = barra ? barra.getBoundingClientRect() : null;
    const alturaBarra = rb ? Math.round(rb.height) : 64;
    const saliencia = (rb && fab) ? Math.max(0, Math.round(rb.top - fab.getBoundingClientRect().top)) : 0;
    corpo.style.paddingBottom = (alturaBarra + saliencia + 32) + 'px';
    fundo.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  window.comSheetFechar = function(){
    const fundo = $('#comSheetBack'); if (!fundo) return;
    fundo.hidden = true;
    document.body.style.overflow = '';
  };
  /* folha de "Criar nova publicação": as mesmas opções do compositor da home,
     mais o short, para o "+" da barra virar uma escolha e não um atalho unico */
  window.novoSheetAbrir = function(){
    const fundo = $('#novoSheetBack'), corpo = $('#novoSheetBody'); if (!fundo || !corpo) return;
    const barra = $('#mnav'), fab = $('#mnav .fab');
    const rb = barra ? barra.getBoundingClientRect() : null;
    const alturaBarra = rb ? Math.round(rb.height) : 64;
    const saliencia = (rb && fab) ? Math.max(0, Math.round(rb.top - fab.getBoundingClientRect().top)) : 0;
    corpo.style.paddingBottom = (alturaBarra + saliencia + 32) + 'px';
    fundo.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  window.novoSheetFechar = function(){
    const fundo = $('#novoSheetBack'); if (!fundo) return;
    fundo.hidden = true; document.body.style.overflow = '';
  };
  $('#novoSheetClose') && $('#novoSheetClose').addEventListener('click', novoSheetFechar);
  $('#novoSheetBack') && $('#novoSheetBack').addEventListener('click', e => { if (e.target.id === 'novoSheetBack') novoSheetFechar(); });
  $('#novoSheetBody') && $('#novoSheetBody').addEventListener('click', e => {
    const b = e.target.closest('[data-novo]'); if (!b) return;
    const tipo = b.dataset.novo;
    novoSheetFechar();
    if (tipo === 'short'){ if (typeof crOpen === 'function') crOpen(); return; }
    if (tipo === 'art'){ const alvo = $('#homeQArt'); if (alvo) alvo.click(); return; }
    if (typeof qpOpen !== 'function') return;
    if (tipo === 'pub') qpOpen(); else qpOpen(tipo);
  });
  /* Filtros: os cartoes de filtro da coluna lateral sao MOVIDOS para a folha
     (nao clonados), para os listeners presos a eles — Autor, Periodo, o
     Localizar — continuarem funcionando; ao fechar voltam ao lugar. */
  let filtroOrigem = [];   /* [{el, pai, depois}] para devolver na ordem */
  let filtroTela = null;
  const filtroCartoes = tela => {
    const sel = tela === 'shorts'
      ? '#nvShortsBScreen .sb-side .nvf-side-card'
      : '#nvFeedScreen .nvf-profile .nvf-side-card, #nvFeedScreen .nvf-side .nvf-side-card';
    return [...document.querySelectorAll(sel)].filter(c => !c.hidden);
  };
  const filtrosAtivos = tela => {
    try {
      if (tela === 'shorts' && typeof sbFiltrosAtivos === 'function') return sbFiltrosAtivos().length;
      if (tela === 'feed' && typeof nvfFiltrosAtivos === 'function') return nvfFiltrosAtivos().length;
    } catch (e) {}
    return 0;
  };
  window.filtrosBadge = function(){
    document.querySelectorAll('.mfiltro-btn').forEach(b => {
      const tela = b.dataset.mfiltro, n = filtrosAtivos(tela);
      const lbl = b.querySelector('.mfiltro-lbl');
      if (lbl) lbl.textContent = n ? 'Filtrando (' + n + ')' : 'Filtros';
      b.classList.toggle('on', n > 0);
      const x = b.parentNode.querySelector('[data-mfiltrox="' + tela + '"]');
      if (x) x.hidden = n === 0;
    });
  };
  /* o "x" limpa todos os filtros da tela, com as mesmas funcoes das fichas */
  document.addEventListener('click', e => {
    const x = e.target.closest('[data-mfiltrox]'); if (!x) return;
    if (x.dataset.mfiltrox === 'shorts' && typeof sbClearAll === 'function') sbClearAll();
    if (x.dataset.mfiltrox === 'feed' && typeof nvfLimparTudo === 'function') nvfLimparTudo();
    setTimeout(filtrosBadge, 0);
  });
  window.filtrosAbrir = function(tela){
    const fundo = $('#filtroSheetBack'), corpo = $('#filtroSheetBody'); if (!fundo || !corpo) return;
    filtroTela = tela;
    filtroOrigem = filtroCartoes(tela).map(el => ({ el, pai: el.parentNode, depois: el.nextSibling }));
    filtroOrigem.forEach(o => corpo.appendChild(o.el));
    /* a barra de baixo e fixa e passa por cima da folha: o fim reserva a altura dela */
    const barra = $('#mnav'), fab = $('#mnav .fab');
    const rb = barra ? barra.getBoundingClientRect() : null;
    const alturaBarra = rb ? Math.round(rb.height) : 64;
    const saliencia = (rb && fab) ? Math.max(0, Math.round(rb.top - fab.getBoundingClientRect().top)) : 0;
    corpo.style.paddingBottom = (alturaBarra + saliencia + 24) + 'px';
    fundo.hidden = false; document.body.style.overflow = 'hidden';
    filtrosBadge();
  };
  window.filtrosFechar = function(){
    const fundo = $('#filtroSheetBack'); if (!fundo || fundo.hidden) return;
    /* de volta, na ordem inversa, cada um antes do irmao que tinha */
    filtroOrigem.slice().reverse().forEach(o => { if (o.pai) o.pai.insertBefore(o.el, o.depois && o.depois.parentNode === o.pai ? o.depois : null); });
    filtroOrigem = []; filtroTela = null;
    fundo.hidden = true; document.body.style.overflow = '';
    filtrosBadge();
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('.mfiltro-btn'); if (!b) return;
    filtrosAbrir(b.dataset.mfiltro);
  });
  $('#filtroSheetClose') && $('#filtroSheetClose').addEventListener('click', filtrosFechar);
  $('#filtroSheetBack') && $('#filtroSheetBack').addEventListener('click', e => { if (e.target.id === 'filtroSheetBack') filtrosFechar(); });
  /* qualquer toque num filtro dentro da folha atualiza o numero do botao */
  $('#filtroSheetBody') && $('#filtroSheetBody').addEventListener('click', () => setTimeout(filtrosBadge, 0));
  $('#filtroSheetBody') && $('#filtroSheetBody').addEventListener('change', () => setTimeout(filtrosBadge, 0));
  $('#comSheetClose') && $('#comSheetClose').addEventListener('click', comSheetFechar);
  $('#comSheetBack') && $('#comSheetBack').addEventListener('click', e => { if (e.target.id === 'comSheetBack') comSheetFechar(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#comSheetBack').hidden) comSheetFechar();
    if (!$('#novoSheetBack').hidden) novoSheetFechar();
    if ($('#filtroSheetBack') && !$('#filtroSheetBack').hidden) filtrosFechar();
  });
  const irPara = sel => {
    const el = sel && $(sel);
    if (!el) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const header = $('.topbar');
    const desconto = (header ? header.getBoundingClientRect().height : 0) + 12;
    const y = el.getBoundingClientRect().top + window.scrollY - desconto;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  };
  mnav.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const t = b.dataset.t;
    /* o "+" e os Comunicados sobem por cima da tela em que a pessoa esta:
       vem antes de fecharModulos(), que os mandaria de volta para a home, e
       nao trocam o item aceso, porque sao sobreposicoes e nao destinos */
    if (t === 'novo') { novoSheetAbrir(); return; }
    if (t === 'comunicados') {
      if (document.body.classList.contains('demo-basico') && !$('#newsView').classList.contains('open')) {
        mnav.querySelectorAll('button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        fecharModulos(); irPara('#homeComPanel'); return;
      }
      comSheetAbrir(); return;
    }
    /* numa barra de abas, tocar em Shorts abre o Shorts — nao rola ate um
       pedaco da home. Vem antes de fecharModulos(), que desfaria a abertura. */
    if (t === 'shorts' || t === 'feed') {
      if (typeof filtrosFechar === 'function') filtrosFechar();
      mnav.querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      if (typeof abrirModuloSocial === 'function') abrirModuloSocial(t);
      if (typeof filtrosBadge === 'function') setTimeout(filtrosBadge, 50);
      return;
    }
    mnav.querySelectorAll('button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    fecharModulos();
    /* sobrou a Home, que rola ate o topo */
    if (t === 'home') {
      document.body.classList.remove('demo-suporte');
      if (document.body.classList.contains('demo-empty') && typeof demoToggle !== 'undefined') demoToggle.click();
      setNav($('#navHome'));
    }
    irPara(alvos[t]);
  });
})();
$('#navStories') && $('#navStories').addEventListener('click', e => { e.preventDefault(); setNav($('#navStories')); closeNewsModule(); openStories(); });
$('#navHome').addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.remove('demo-suporte');
  if (document.body.classList.contains('demo-empty')) demoToggle.click();
  setNav($('#navHome'));
  closeStories(); closeForum(); closeNewsModule();
});
$('#reelsSeeAll') && $('#reelsSeeAll').addEventListener('click', e => { e.preventDefault(); if(typeof abrirShorts==='function'){ abrirShorts(); } else if(typeof openNewsModule==='function'){ openNewsModule(); newsShow('shorts'); } });

