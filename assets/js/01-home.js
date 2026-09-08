/* resumo do dia, destaque, fileira de shorts e player */
/* ============================================================
   SULTS Home · Shorts + Feed
   ============================================================ */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- Resumo do dia (card de perfil) ---------- */
(function(){
  const h = new Date().getHours();
  const saud = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  const g = document.getElementById('dsGreet');
  const d = document.getElementById('dsDate');
  if (g) g.textContent = saud + ', Rodrigo';
  if (d) d.textContent = new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });
  const c = document.getElementById('dsClose');
  if (c) c.addEventListener('click', () => document.getElementById('daySummary').classList.add('hide'));
})();


/* ---------- Posts do "Em destaque" (mistura de shorts + shorts) ---------- */
const POSTS = [
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS',
    img:(window.__resources&&window.__resources.abfExpoDia4)||'uploads/reels/abf-expo-dia4.jpg', alt:'4º Dia · ABF Franchising Expo 2026',
    title:'ABF Franchising Expo · 4º dia', time:'Há 2 h' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS',
    img:(window.__resources&&window.__resources.abfExpoDia3)||'uploads/reels/abf-expo-dia3.jpg', alt:'3º Dia · ABF Franchising Expo 2026',
    title:'ABF Franchising Expo · 3º dia', time:'Há 1 d' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS',
    img:(window.__resources&&window.__resources.abfSummitDia2)||'uploads/reels/abf-summit-dia2.jpg', alt:'2º Dia · ABF Franchising Summit Brasil 2026',
    title:'ABF Franchising Summit · 2º dia', time:'Há 2 d' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS',
    img:(window.__resources&&window.__resources.abfExpoDia2)||'uploads/reels/abf-expo-dia2.jpg', alt:'2º Dia · ABF Franchising Expo 2026',
    title:'ABF Franchising Expo · 2º dia', time:'Há 2 d' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS',
    img:(window.__resources&&window.__resources.abfExpoDia1)||'uploads/reels/abf-expo-dia1.jpg', alt:'1º Dia · ABF Franchising Expo 2026',
    title:'ABF Franchising Expo · 1º dia', time:'Há 3 d' },
  { name:'Willer Matayoshi', label:'Willer', role:'CTO e Co-fundador', av:'av-wm', initials:'WM',
    img:(window.__resources&&window.__resources.comprasB2b)||'uploads/reels/compras-b2b.jpg', alt:'Software de Compras B2B · Catálogo digital, fornecedores e workflow de aprovação',
    title:'Software de Compras B2B 🛒', time:'Há 4 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF',
    img:(window.__resources&&window.__resources.casaConstrutor)||'uploads/reels/casa-construtor.jpg', alt:'Casa do Construtor · Toda informação do seu negócio centralizada no SULTS',
    video:'uploads/reels/shorts.mp4',
    title:'Casa do Construtor 💬', time:'Há 5 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF',
    img:(window.__resources&&window.__resources.mormaii)||'uploads/reels/mormaii.jpg', alt:'Mormaii · O SULTS facilita nosso processo de implantação',
    title:'Mormaii 💬', time:'Há 1 d' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF',
    img:(window.__resources&&window.__resources.bibi)||'uploads/reels/bibi.jpg', alt:'Bibi · O franqueado tem total autonomia para personalizar suas artes no SULTS',
    title:'Bibi 💬', time:'Há 2 d' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS', poster:'uploads/reels/abf-expo-dia4.jpg', video:'uploads/reels/v-abf-dia4.mp4', alt:'Último dia da ABF Franchising Expo 2026', title:'ABF Expo · último dia 🎬', time:'Há 1 h' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS', poster:'uploads/reels/abf-expo-dia2.jpg', video:'uploads/reels/v-abf-dia2.mp4', alt:'Segundo dia de ABF Franchising Expo 2026', title:'ABF Expo · 2º dia 🎬', time:'Há 3 d' },
  { name:'Ana Souza', label:'Ana', role:'Marketing · Pit Stop Barra', av:'av-as', initials:'AS', poster:'uploads/reels/abf-expo-dia3.jpg', video:'uploads/reels/v-abf-dia3.mp4', alt:'Terceiro dia de ABF Franchising Expo 2026', title:'ABF Expo · 3º dia 🎬', time:'Há 2 d' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/mormaii-historia.jpg', alt:'História de sucesso Mormaii', title:'História de sucesso · Mormaii', time:'Há 5 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/mormaii-enrico.jpg', alt:'Mormaii · O SULTS facilita nosso processo de implantação', title:'Mormaii · implantação 💬', time:'Há 6 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/casa-adriano.jpg', alt:'Casa do Construtor · Criamos projetos muito estratégicos com o SULTS', title:'Casa do Construtor · projetos 💬', time:'Há 7 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/lugano-historia.jpg', alt:'História de sucesso Lugano Gramado', title:'História de sucesso · Lugano', time:'Há 8 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/farmelhor-luciano.jpg', alt:'FarMelhor · Com o SULTS mantemos os treinamentos da rede sempre atualizados', title:'FarMelhor · treinamentos 💬', time:'Há 9 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/bibi-historia.jpg', alt:'História de sucesso Bibi', title:'História de sucesso · Bibi', time:'Há 1 d' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/farmelhor-historia.jpg', alt:'História de sucesso FarMelhor', title:'História de sucesso · FarMelhor', time:'Há 1 d' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/lugano-anibal.jpg', alt:'Lugano · O SULTS otimizou a comunicação interna da rede', title:'Lugano · comunicação interna 💬', time:'Há 1 d' },
  { name:'Willer Matayoshi', label:'Willer', role:'CTO e Co-fundador', av:'av-wm', initials:'WM', img:'uploads/reels/pitstop-historia.jpg', alt:'História de sucesso Rede PitStop', title:'História de sucesso · PitStop', time:'Há 2 d' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/bellacapri-historia.jpg', alt:'História de sucesso Bella Capri Pizzaria', title:'História de sucesso · Bella Capri', time:'Há 2 d' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/mormaii-frase.jpg', alt:'Mormaii · O SULTS atende 100% do gerenciamento da nossa rede de franquias', title:'Mormaii · gerenciamento 💬', time:'Há 2 d' },
  { name:'Willer Matayoshi', label:'Willer', role:'CTO e Co-fundador', av:'av-wm', initials:'WM', img:'uploads/reels/pitstop-frase.jpg', alt:'PitStop · Com o SULTS temos o controle efetivo de tudo que é feito dentro da rede', title:'PitStop · controle da rede 💬', time:'Há 3 d' },
  { name:'Willer Matayoshi', label:'Willer', role:'CTO e Co-fundador', av:'av-wm', initials:'WM', img:'uploads/reels/start-frase.jpg', alt:'Start · O SULTS centraliza e simplifica o acesso às informações', title:'Start · centraliza informações 💬', time:'Há 3 d' },
  { name:'Rodrigo Caetano', label:'Rodrigo', role:'CEO · SULTS', av:'av-rc', initials:'RC',
    img:'uploads/news/casa-construtor.jpg', alt:'Casa do Construtor · 780 lojas em 4 países',
    title:'Casa do Construtor · case', time:'Há 3 h' },
  { name:'Livia Fernandes', label:'Livia', role:'Head de Customer Success · SULTS', av:'av-lf', initials:'LF', img:'uploads/reels/bibi-frase.jpg', alt:'Bibi · O SULTS nos ajuda a trazer mais informações para os franqueados', title:'Bibi · mais informações 💬', time:'Há 3 d' }
];

/* ---------- Fileira de shorts da home (render em buildStories) ---------- */
const row = $('#storiesRow');

/* Arrastar para rolar os carrosséis de shorts */
(function(){
  var SEL='#storiesRow,#nvfStoriesRow';
  var el=null,x0=0,l0=0,moved=false,sb='';
  var pid=null,target=null,raf=0;
  document.addEventListener('pointerdown',function(e){
    if(e.button!==0) return;
    var t=e.target.closest(SEL); if(!t) return;
    if(t.scrollWidth<=t.clientWidth) return;
    el=t; x0=e.clientX; l0=t.scrollLeft; moved=false; pid=e.pointerId;
    sb=t.style.scrollBehavior; t.style.scrollBehavior='auto';
    t.style.userSelect='none'; t.style.webkitUserSelect='none';
    e.preventDefault();
  });
  document.addEventListener('pointermove',function(e){
    if(!el || e.pointerId!==pid) return;
    var dx=e.clientX-x0;
    if(!moved && Math.abs(dx)<3) return;
    if(!moved){ moved=true; el.style.cursor='grabbing'; }
    target=l0-dx;
    e.preventDefault();
    if(!raf) raf=requestAnimationFrame(function step(){ raf=0; if(el&&target!=null) el.scrollLeft=target; });
  });
  document.addEventListener('dragstart',function(e){ if(el) e.preventDefault(); });
  document.addEventListener('selectstart',function(e){ if(el&&moved) e.preventDefault(); });
  function end(){
    if(!el) return;
    if(raf){ cancelAnimationFrame(raf); raf=0; }
    if(target!=null) el.scrollLeft=target;
    target=null; pid=null;
    el.style.cursor=''; el.style.userSelect=''; el.style.webkitUserSelect=''; el.style.scrollBehavior=sb;
    if(moved){
      var c=function(ev){ ev.stopPropagation(); ev.preventDefault(); document.removeEventListener('click',c,true); };
      document.addEventListener('click',c,true);
      setTimeout(function(){ document.removeEventListener('click',c,true); },0);
    }
    moved=false; el=null;
  }
  document.addEventListener('pointerup',end);
  document.addEventListener('pointercancel',end);
})();

/* Setas de rolagem horizontal */
const stL = $('#stLeft'), stR = $('#stRight');
function updArrows(){
  const overflow = row.scrollWidth > row.clientWidth + 4;
  stL.hidden = !overflow || row.scrollLeft < 8;
  stR.hidden = !overflow || row.scrollLeft > row.scrollWidth - row.clientWidth - 8;
}
row.addEventListener('scroll', updArrows);
window.addEventListener('resize', updArrows);
stL.addEventListener('click', () => row.scrollBy({ left:-280, behavior:'smooth' }));
stR.addEventListener('click', () => row.scrollBy({ left: 280, behavior:'smooth' }));
updArrows();

/* ---------- Tela de Shorts · Explorar + Player ---------- */
const REELS_DATA = [
  { p:0, cat:'eventos', pendAppr:true, cap:'4º dia de ABF Franchising Expo 2026! Bora conhecer o SULTS no estande. 🚀', likes:'3,1 mil', comments:212, views:'62,4 mil', rec:true, music:'SULTS · ABF 2026' },
  { p:25, format:'imagem', cat:'depoimentos', cap:'Casa do Construtor: 780 lojas em 4 países com a gestão centralizada no SULTS. 🏗️', likes:'2,6 mil', comments:129, views:'47,3 mil', rec:true, music:'Casa do Construtor · Case' },
  { p:10, cat:'eventos',    cap:'ABF Expo 2026 · 2º dia. O time SULTS no meio de tudo. 💙', likes:'2,2 mil', comments:118, views:'44,9 mil', rec:false, music:'SULTS · ABF 2026' },
  { p:7, cat:'depoimentos', cap:'Mormaii: o SULTS facilita nosso processo de implantação. 🌊', likes:'1,2 mil', comments:64, views:'22,1 mil', rec:false, music:'Mormaii · Depoimento' },
  { p:15, format:'imagem', cat:'depoimentos', cap:'História de sucesso: Lugano Gramado. 🍰', likes:'860', comments:33, views:'15,4 mil', rec:false, music:'Lugano · História' },
  { p:16, cat:'depoimentos', cap:'Luciano Sampaio (FarMelhor): treinamentos da rede sempre atualizados.', likes:'740', comments:29, views:'13,8 mil', rec:false, music:'FarMelhor · Depoimento' },
  { p:5, cat:'produtos',    cap:'Software de Compras B2B: catálogo digital, fornecedores e workflow de aprovação. 🛒', likes:'2,4 mil', comments:184, views:'48,2 mil', rec:false, music:'SULTS · Áudio original' },
  { p:9, cat:'eventos',     cap:'ABF Expo 2026 · último dia. Foram quatro dias na maior feira de franquias. 🚀', likes:'2,8 mil', comments:143, views:'51,6 mil', rec:false, music:'SULTS · ABF 2026' },
  { p:11, cat:'eventos',    cap:'ABF Expo 2026 · 3º dia, lado a lado com as marcas da nossa jornada. 🎬', likes:'1,7 mil', comments:95, views:'33,4 mil', rec:false, music:'SULTS · ABF 2026' },
  { p:8, format:'imagem', cat:'depoimentos', cap:'Bibi: o franqueado tem autonomia total para personalizar suas artes no SULTS. 👟', likes:'980', comments:41, views:'18,9 mil', rec:true, music:'Bibi · Depoimento' },
  { p:2, cat:'eventos',     cap:'ABF Franchising Summit Brasil 2026 · 2º dia. Conteúdo de alto nível! 🎤', likes:'2,7 mil', comments:151, views:'54,0 mil', rec:false, music:'SULTS · ABF Summit' },
  { p:1, format:'imagem', cat:'eventos',     cap:'ABF Expo 2026 · 3º dia. Que energia! Obrigado a todos que passaram. 💚', likes:'1,6 mil', comments:88, views:'29,8 mil', rec:true, music:'SULTS · ABF 2026' },
  { p:3, cat:'eventos',     cap:'ABF Expo 2026 · 2º dia. O futuro do franchising passa por aqui. ✨', likes:'1,4 mil', comments:73, views:'26,3 mil', rec:false, music:'SULTS · ABF 2026' },
  { p:4, cat:'eventos',     cap:'ABF Expo 2026 · 1º dia. Começou! Vem com a gente. 🎉', likes:'2,0 mil', comments:120, views:'40,5 mil', rec:true, music:'SULTS · ABF 2026' },
  { p:12, cat:'depoimentos', cap:'História de sucesso: Mormaii e SULTS. 🌊', likes:'1,5 mil', comments:64, views:'27,3 mil', rec:true,  music:'Mormaii · História' },
  { p:13, cat:'depoimentos', cap:'Enrico Ferrari (Mormaii): o SULTS facilita nossa implantação.', likes:'980', comments:41, views:'18,2 mil', rec:false, music:'Mormaii · Depoimento' },
  { p:14, cat:'depoimentos', cap:'Adriano Bicalho (Casa do Construtor): projetos estratégicos com o SULTS.', likes:'1,1 mil', comments:52, views:'21,6 mil', rec:true,  music:'Casa do Construtor · Depoimento' },
  { p:17, cat:'depoimentos', cap:'História de sucesso: Bibi Calçados. 👟', likes:'1,3 mil', comments:58, views:'24,1 mil', rec:true,  music:'Bibi · História' },
  { p:18, cat:'depoimentos', cap:'História de sucesso: Drogarias FarMelhor. 💊', likes:'690', comments:27, views:'12,9 mil', rec:false, music:'FarMelhor · História' },
  { p:19, format:'imagem', cat:'depoimentos', cap:'Anibal Martins (Lugano): o SULTS otimizou a comunicação interna da rede.', likes:'610', comments:22, views:'11,3 mil', rec:false, music:'Lugano · Depoimento' },
  { p:20, cat:'depoimentos', cap:'História de sucesso: Rede PitStop. 🏎️', likes:'1,0 mil', comments:47, views:'19,7 mil', rec:true,  music:'PitStop · História' },
  { p:21, format:'imagem', cat:'depoimentos', cap:'História de sucesso: Bella Capri Pizzaria. 🍕', likes:'880', comments:36, views:'16,2 mil', rec:false, music:'Bella Capri · História' },
  { p:22, cat:'depoimentos', cap:'Mormaii: o SULTS atende 100% do gerenciamento da rede de franquias.', likes:'920', comments:39, views:'17,5 mil', rec:false, music:'Mormaii · Depoimento' },
  { p:23, cat:'depoimentos', cap:'PitStop: controle efetivo de tudo que é feito dentro da rede.', likes:'560', comments:19, views:'10,1 mil', rec:false, music:'PitStop · Depoimento' },
  { p:24, cat:'depoimentos', cap:'Start: o SULTS centraliza e simplifica o acesso às informações.', likes:'640', comments:24, views:'11,8 mil', rec:true,  music:'Start · Depoimento' },
  { p:26, cat:'depoimentos', cap:'Bibi: mais informações para os franqueados. 🧡', likes:'720', comments:28, views:'13,2 mil', rec:false, music:'Bibi · Depoimento' }
];

const reelsView   = $('#reelsView');
const reelsPlayer = $('#reelsPlayer');
const rvFeed      = $('#rvFeed');
const rxGrid      = $('#rxGrid');
let curFilter = 'todos', curQuery = '';

/* Vistos / não vistos: vale só enquanto a página está aberta. Um refresh
   devolve todos os shorts a não vistos — a chave antiga do localStorage sai
   para não sobrar estado de versões anteriores. */
const SEEN_KEY = 'sults_seen_stories';
localStorage.removeItem(SEEN_KEY);
let seenShorts = new Set();
function isSeen(p){ return seenShorts.has(p); }
function markReelSeen(p){ if(!seenShorts.has(p)){ seenShorts.add(p); if(typeof updateShortsNavBadge==='function') updateShortsNavBadge(); } }
/* Curtidas (persistente) */
const LIKED_KEY = 'sults_liked_stories';
let likedShorts = new Set(JSON.parse(localStorage.getItem(LIKED_KEY) || '[]'));
function isLiked(p){ return likedShorts.has(p); }
function setLiked(p, on){ if(on) likedShorts.add(p); else likedShorts.delete(p); localStorage.setItem(LIKED_KEY, JSON.stringify([...likedShorts])); }
function likeDisplay(r){
  if (!isLiked(r.p)) return r.likes;
  return /^\d+$/.test(String(r.likes)) ? String(parseInt(r.likes, 10) + 1) : r.likes;
}
/* Gestão: helpers numéricos e estado da toolbar */
function numVal(s){ s = String(s); const n = parseFloat(s.replace(/\./g,'').replace(',','.')) || 0; return /mil/.test(s) ? n * 1000 : n; }
function hoursVal(t){ t = String(t); if (/agora|hoje/i.test(t)) return 0; const m = t.match(/(\d+)\s*(h|d)/i); if (!m) return 0; return m[2].toLowerCase() === 'd' ? +m[1] * 24 : +m[1]; }
function fmtK(n){ return n >= 1000 ? (n/1000).toLocaleString('pt-BR',{maximumFractionDigits:1}) + ' mil' : String(Math.round(n)); }
const PERIOD_H = { '24h':24, '7d':168, '30d':720, '90d':2160 };
const PERIOD_LABEL = { '24h':'últimas 24 h', '7d':'últimos 7 dias', '30d':'últimos 30 dias', '90d':'últimos 90 dias' };
const CAT_COLORS = ['#00acac','#2f6fe4','#27a689','#8161d8','#6f6ae0','#a93438','#e3444f','#9c4ec9','#e08a1e','#34597a'];
let CATEGORIES = [
  { id:'eventos', name:'Eventos', color:'#2f6fe4', icon:'fa-calendar-day', active:true },
  { id:'depoimentos', name:'Depoimentos', color:'#27a689', icon:'fa-comment-dots', active:true },
  { id:'produtos', name:'Produtos', color:'#8161d8', icon:'fa-box', active:true }
];
/* Rotulo de unidade, estavel por autor: o mesmo nome cai sempre na mesma.
   Nao uso o sufixo do cargo porque ali a unidade vem como "SULTS" ou como
   nome de rede ("Pit Stop Barra"), e a faixa do card quer dizer a unidade de
   onde a pessoa publicou. */
const SB_UNIDADES = ['Unidade Shopping','Unidade Centro','Unidade Vila Nova',
                     'Unidade Litoral','Unidade Barra','Unidade Savassi'];
function sbUnidade(post){
  if (post && post.unit) return post.unit;   /* quem declara a unidade nao entra no sorteio */
  const nome = String((post && post.name) || '');
  if (!nome) return SB_UNIDADES[0];
  let h = 0;
  for (let k = 0; k < nome.length; k++) h += nome.charCodeAt(k);
  return SB_UNIDADES[h % SB_UNIDADES.length];
}
function catById(id){ return CATEGORIES.find(c => c.id === id) || null; }
function rFormat(r){ return r.format || ((POSTS[r.p] && POSTS[r.p].video) ? 'video' : 'imagem'); }
function rxSchedDT(d){ const dd=new Date(d), p=x=>String(x).padStart(2,'0'); return p(dd.getDate())+'/'+p(dd.getMonth()+1)+'/'+dd.getFullYear()+' '+p(dd.getHours())+':'+p(dd.getMinutes()); }
function rxSchedIn(d){ const days=Math.max(1,Math.round((d-Date.now())/86400000)); return 'Em '+days+(days===1?' dia':' dias'); }
function catReelCount(id){ return REELS_DATA.filter(r => r.cat === id).length; }
[2,6].forEach(function(i,k){ if(REELS_DATA[i]) REELS_DATA[i].agendado = Date.now() + (k?5:2)*86400000; });
let curSort = 'relevancia', curPeriod = 'tudo', curView = 'grade';
let rxFormat='', rxDur='', rxReach='', rxStatus='', rxMinViews='', rxMinLikes='';
let colSort = { key:null, dir:1 };
const AUTH_PAGE = 8, CAT_PAGE = 6;
let authorQueryRaw = '', authorShown = AUTH_PAGE, catQueryRaw = '', catShown = CAT_PAGE, navFocus = null;
function rxNorm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
var nvSearchQuery='';
var newsSeen = new Set();
/* Como no Instagram: quem ainda não foi visto fica na frente, na ordem curada
   de REELS_DATA; os já vistos vão para o fim, na ordem em que foram assistidos
   (o Set seenShorts guarda a ordem de inserção). vistosNoFim=false devolve a
   ordem curada pura, para quem precisa dela. */
/* a fileira nao filtra por busca: quem pesquisa em Publicacoes esta buscando
   publicacoes, e a busca de Shorts age na tela de Shorts */
function orderedShorts(vistosNoFim){
  /* short aguardando aprovacao so aparece para quem pode aprovar, como ja
     acontece com a publicacao pendente */
  const lista = REELS_DATA.filter(function(r){
    if (r.removido) return false;
    if (r.pendAppr && typeof podeAprovar === 'function' && !podeAprovar()) return false;
    return true;
  });
  if (vistosNoFim === false) return lista;
  const vistos = [...seenShorts];
  const posicao = r => isSeen(r.p) ? 1 + vistos.indexOf(r.p) : 0;
  return lista.sort((a,b) => posicao(a) - posicao(b));
}
let playerList = [];

function reelCardHTML(r){
  const post = POSTS[r.p];
  const seen = isSeen(r.p);
  return '<div class="rx-card' + (seen ? ' seen' : '') + '">' +
    ((post.img||post.poster) ? '<img src="' + (post.img||post.poster) + '" alt="' + post.alt + '" loading="lazy">'
              : '<video src="' + post.video + '" muted preload="metadata"></video>') +
    (seen ? '<span class="rx-seen"><i class="fa-solid fa-check"></i> Visto</span>'
          : '') +
    (isLiked(r.p) ? '<span class="rx-views"><i class="fa-solid fa-heart" style="color:#ff3040"></i></span>' : '') +
    '<span class="rx-play"><i class="fa-solid fa-play"></i></span>' +
    '<div class="rx-meta">' +
      '<div class="rx-author"><span class="avatar ' + post.av + '">' + post.initials + '</span>' +
        '<span class="rx-aname">' + post.name + '</span></div>' +
      '<div class="rx-cap">' + r.cap + '</div>' +
    '</div>' +
  '</div>';
}

/* Aprovacao dentro do player: faixa no topo do card e a caixa com "Enviado
   em" + Aprovar/Reprovar. No desktop ela mora na coluna da esquerda, acima da
   autora (e a informacao do short); abaixo de 1100px essa coluna nao existe,
   entao a mesma caixa nasce dentro do card, no canto inferior esquerdo. As
   duas sao renderizadas e o CSS mostra uma por vez. */
function rvModboxHTML(r){
  const post = POSTS[r.p];
  return '<div class="rv-modbox">' +
      '<span class="rv-sent"><i class="fa-solid fa-clock"></i> Enviado ' + fmtQuando(post) + '</span>' +
      '<button type="button" class="cmod-ok" data-rvapr><i class="fa-solid fa-check"></i> Aprovar</button>' +
      '<button type="button" class="cmod-no" data-rvrej><i class="fa-solid fa-xmark"></i> Reprovar</button>' +
    '</div>';
}
function reelSlideHTML(r, idx, total){
  const post = POSTS[r.p];
  const pend = !!r.pendAppr;
  const timer = '<div class="rv-timer'+(post.video?' isvid':'')+'"><span></span></div>';
  return '<div class="rv-reel' + (pend ? ' is-pend' : '') + '"><div class="rv-card">' +
    (pend ? '<div class="rv-pend"><i class="fa-solid fa-clock"></i> Aguardando aprovação</div>' + rvModboxHTML(r) : '') +
    (post.embed ? '<iframe data-src="https://www.youtube.com/embed/' + post.embed + '?autoplay=1&mute=1&loop=1&playlist=' + post.embed + '&controls=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1" title="' + post.alt + '" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
     : post.video ? '<video data-src="' + post.video + '"' + ((post.img||post.poster) ? ' poster="' + (post.img||post.poster) + '"' : '') + ' preload="none" muted loop playsinline></video>'
                : '<img src="' + post.img + '" alt="' + post.alt + '">') +
    timer + (post.video ? '<div class="rv-audio" data-rvaudio><button class="rv-mute" data-rvmute title="Ativar som"><i class="fa-solid fa-volume-xmark"></i></button><input class="rv-vol" type="range" min="0" max="100" step="1" value="70" data-rvvol aria-label="Volume"></div>' : '') +
    '<div class="rv-tap"></div><div class="rv-pauseic"><i class="fa-solid fa-play"></i></div>' +
  '</div>' +
    (pend ? '' : '<div class="rv-rail">' +
      '<div class="rv-act share" data-rvshare><button title="Compartilhar" aria-label="Compartilhar"><i class="fa-solid fa-paper-plane"></i></button><span>Compartilhar</span></div>' +
      '<div class="rv-act like' + (isLiked(r.p) ? ' on' : '') + '" data-p="' + r.p + '"><button><i class="fa-solid fa-heart"></i></button><span>' + likeDisplay(r) + '</span></div>' +
    '</div>') +
    '<div class="rv-footer">' +
      (pend ? rvModboxHTML(r) : '') +
      '<div class="rv-author"><span class="avatar ' + post.av + '">' + post.initials + '</span>' +
        '<div class="rv-authorinfo">' +
          '<span class="rv-name">' + post.name + '</span>' +
          '<span class="rv-unit">' + sbUnidade(post) + '</span>' +
        '</div></div>' +
      '<div class="rv-caption" data-rvcap>' + r.cap + '</div>' +
      '<div class="rv-date">' + fmtQuando(post) + '</div>' +
    '</div>' +
  '</div>';
}

function matchReel(r){
  const post = POSTS[r.p];
  if (curFilter === 'naovistos' && isSeen(r.p)) return false;
  if (curFilter === 'recomendados' && !r.rec) return false;
  if (curFilter.indexOf('autor:') === 0 && post.name !== curFilter.slice(6)) return false;
  if (curPeriod !== 'tudo' && PERIOD_H[curPeriod] && hoursVal(post.time) > PERIOD_H[curPeriod]) return false;
  if (rxStatus==='removido'){ if(!r.removido) return false; }
  else {
    if(r.removido) return false;
    if(rxStatus==='agendado' && !r.agendado) return false;
    if(rxStatus==='pub' && (r.agendado||r.proc||r.procFail)) return false;
    if(rxStatus==='rascunho' && !r.rascunho) return false;
  }
  if (curFilter.indexOf('fmt:')===0 && rFormat(r)!==curFilter.slice(4)) return false;
  if (curFilter==='vistos' && !isSeen(r.p)) return false;
  if (curFilter==='curtidos' && !isLiked(r.p)) return false;
  if (rxMinViews && numVal(r.views) < +rxMinViews) return false;
  if (rxMinLikes && numVal(r.likes) < +rxMinLikes) return false;
  if (catById(curFilter) && r.cat !== curFilter) return false;
  if (curQuery){
    if (!(r.cap + ' ' + post.name + ' ' + r.music).toLowerCase().includes(curQuery)) return false;
  }
  return true;
}

function updateUnseenCount(){
  const el = document.getElementById('rxUnseenCount');
  if (!el) return;
  const n = REELS_DATA.filter(r => !isSeen(r.p)).length;
  el.textContent = n;
  el.style.display = n ? 'inline-flex' : 'none';
}
function foBuildSocialFilters(){
  const nav = $('#rxFilters'); if(!nav) return;
  const activeCats = (typeof CATEGORIES!=='undefined'?CATEGORIES.filter(c=>c.active):[]);
  const authors = [...new Set(REELS_DATA.map(r=>POSTS[r.p].name))];
  const unseen = REELS_DATA.filter(r=>!isSeen(r.p)).length;
  const liked = REELS_DATA.filter(r=>isLiked(r.p)).length;
  let html = '<button class="rxs-newbtn" id="rxSocialNew"><span class="rc-plus2"><i class="fa-solid fa-plus"></i></span><span class="rc-label">Criar short</span></button>';
  html += '<div class="rxs-search"><i class="fa-solid fa-magnifying-glass"></i><input type="text" id="rxSearch" placeholder="Buscar shorts" autocomplete="off" value="'+(curQuery||'').replace(/"/g,'&quot;')+'"></div>';
  const nav1 = [['todos','fa-house','Para você',REELS_DATA.length],['naovistos','fa-circle-play','Não vistos',unseen],['curtidos','fa-heart','Curtidos',liked],['vistos','fa-clock-rotate-left','Já assistidos',REELS_DATA.length-unseen]];
  html += '<div class="rxs-nav">'+nav1.map(n=>'<button class="rxs-item'+(curFilter===n[0]?' on':'')+'" data-f="'+n[0]+'"><i class="fa-solid '+n[1]+'"></i><span>'+n[2]+'</span><em>'+n[3]+'</em></button>').join('')+'</div>';
  html += '<div class="rxs-sec"><div class="rxs-hd">Categorias</div><div class="rxs-nav">'+
    activeCats.map(c=>'<button class="rxs-item'+(curFilter===c.id?' on':'')+'" data-f="'+c.id+'"><span class="rxs-cdot" style="background:'+c.color+'"><i class="fa-solid '+(c.icon||'fa-tag')+'"></i></span><span>'+c.name+'</span><em>'+REELS_DATA.filter(r=>r.cat===c.id).length+'</em></button>').join('')+'</div></div>';
  html += '<div class="rxs-sec"><div class="rxs-hd">Pessoas</div><div class="rxs-nav">'+
    authors.map(a=>{ const p=POSTS.find(x=>x.name===a)||{av:''}; const n=REELS_DATA.filter(r=>POSTS[r.p].name===a).length;
      return '<button class="rxs-item'+(curFilter==='autor:'+a?' on':'')+'" data-f="autor:'+a+'"><span class="avatar '+p.av+' rxs-av"></span><span>'+a+'</span><em>'+n+'</em></button>'; }).join('')+'</div></div>';
  html += '<div class="rxs-sec"><div class="rxs-hd">Refinar</div><div class="nv-fgrid">'+
    '<div><label>Período</label><select class="nv-fsel" id="rxFPeriod">'+[['tudo','Todo o período'],['24h','Últimas 24 h'],['7d','Últimos 7 dias'],['30d','Últimos 30 dias'],['90d','Últimos 90 dias']].map(p=>'<option value="'+p[0]+'"'+(curPeriod===p[0]?' selected':'')+'>'+p[1]+'</option>').join('')+'</select></div>'+
    '<div><label>Ordenar por</label><select class="nv-fsel" id="rxFSort">'+[['relevancia','Relevância'],['recentes','Mais recentes'],['antigos','Mais antigos'],['vistos','Mais visualizados'],['curtidos','Mais curtidos']].map(o=>'<option value="'+o[0]+'"'+(curSort===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div></div></div>';
  nav.innerHTML = html;
}

function foBuildAdvFilters(){
  const nav = $('#rxFilters'); if(!nav) return;
  const activeCats = (typeof CATEGORIES!=='undefined'?CATEGORIES.filter(c=>c.active):[]);
  const authors = [...new Set(REELS_DATA.map(r=>POSTS[r.p].name))];
  const unseen = REELS_DATA.filter(r=>!isSeen(r.p)).length;
  const liked = REELS_DATA.filter(r=>isLiked(r.p)).length;
  const nVid = REELS_DATA.filter(r=>rFormat(r)==='video').length;
  const sit = [['todos','fa-layer-group','Todos',REELS_DATA.length],['fmt:video','fa-video','Vídeo',nVid],['fmt:imagem','fa-image','Imagem',REELS_DATA.length-nVid]];
  let html = '<div class="rx-search rx-fsearch"><i class="fa-solid fa-magnifying-glass"></i><input type="text" id="rxSearch" placeholder="Buscar shorts" autocomplete="off" value="'+(curQuery||'').replace(/"/g,'&quot;')+'"></div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Quais shorts você quer ver? <i class="fa-solid fa-chevron-up"></i></div><div class="cv-seg nv-sitcards nv-sit2" id="rxSitCards">'+
    sit.map(s=>'<button data-f="'+s[0]+'" class="rxs-item2 '+(curFilter===s[0]?'active':'')+'"><i class="fa-solid '+s[1]+'"></i>'+s[2]+'</button>').join('')+'</div></div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Short <i class="fa-solid fa-chevron-up"></i></div><div class="nv-fgrid">'+
    '<div><label>Categoria</label><select class="nv-fsel" id="rxFCat"><option value="">Todas as categorias</option>'+activeCats.map(c=>'<option value="'+c.id+'"'+(curFilter===c.id?' selected':'')+'>'+c.name+'</option>').join('')+'</select></div>'+
    '<div><label>Período</label><select class="nv-fsel" id="rxFPeriod">'+[['tudo','Todo o período'],['24h','Últimas 24 h'],['7d','Últimos 7 dias'],['30d','Últimos 30 dias'],['90d','Últimos 90 dias']].map(p=>'<option value="'+p[0]+'"'+(curPeriod===p[0]?' selected':'')+'>'+p[1]+'</option>').join('')+'</select></div>'+
    '<div><label>Formato</label><select class="nv-fsel" id="rxFFormat">'+[['','Todos os formatos'],['video','Vídeo'],['imagem','Imagem']].map(o=>'<option value="'+o[0]+'"'+(rxFormat===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div>'+'<div><label>Situação</label><select class="nv-fsel" id="rxFStatus">'+[['','Todas as situações'],['pub','Publicado'],['rascunho','Rascunho'],['agendado','Agendado'],['removido','Removidos']].map(o=>'<option value="'+o[0]+'"'+(rxStatus===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div>'+'</div></div>';
  html += '<div class="nv-fsec"><div class="nv-fsec-hd">Distribuição <i class="fa-solid fa-chevron-up"></i></div><div class="nv-fgrid">'+
    '<div><label>Autor</label><select class="nv-fsel" id="rxFAutor"><option value="">Todos os autores</option>'+authors.map(a=>'<option'+(curFilter==='autor:'+a?' selected':'')+'>'+a+'</option>').join('')+'</select></div>'+
    '<div><label>Alcance</label><select class="nv-fsel" id="rxFReach">'+[['','Todos os alcances'],['rede','Toda a rede'],['unidades','Unidades'],['matriz','Sua Marca (Matriz)']].map(o=>'<option value="'+o[0]+'"'+(rxReach===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div>'+
    '</div></div>';
  html += '<div class="nv-filters-ft"><button class="nv-fclear" id="rxFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros</button><button class="nv-fapply" id="rxFApply">Aplicar filtros</button></div>';
  nav.innerHTML = html;
}
function foBuildReelFilters(){
  const nav = $('#rxFilters'); if(!nav) return;
  const adv = (curView === 'lista');
  nav.classList.toggle('rx-advmode', adv);
  if(adv) foBuildAdvFilters(); else foBuildSocialFilters();
}

function foFilterLabel(){
  if (curFilter.indexOf('autor:') === 0) return 'Shorts de ' + curFilter.slice(6);
  const c = catById(curFilter); if (c) return c.name;
  return {todos:'Todos os shorts',naovistos:'Não vistos'}[curFilter] || 'Shorts';
}
function updateKpis(){
  const el = document.getElementById('rxKpis');
  if (!el) return;
  const tot = REELS_DATA.length;
  const v = REELS_DATA.reduce((s,r) => s + numVal(r.views), 0);
  const l = REELS_DATA.reduce((s,r) => s + numVal(likeDisplay(r)), 0);
  const kpi = (ic,label,val) => '<div class="rx-kpi"><i class="fa-solid '+ic+'"></i><div><b>'+val+'</b><span>'+label+'</span></div></div>';
  el.innerHTML = kpi('fa-clapperboard','Shorts publicados',tot) + kpi('fa-play','Visualizações',fmtK(v)) +
    kpi('fa-heart','Curtidas',fmtK(l)) + kpi('fa-chart-line','Média de views por short',fmtK(v/Math.max(tot,1)));
}
function renderGrid(){
  updateUnseenCount();
  updateKpis();
  const managed = reelsView.classList.contains('in-module');
  const list = REELS_DATA.filter(matchReel);
  if (curSort === 'recentes') list.sort((a,b) => hoursVal(POSTS[a.p].time) - hoursVal(POSTS[b.p].time));
  else if (curSort === 'vistos') list.sort((a,b) => numVal(b.views) - numVal(a.views));
  else if (curSort === 'curtidos') list.sort((a,b) => numVal(b.likes) - numVal(a.likes));
  else list.sort((a,b) => (isSeen(a.p)?1:0) - (isSeen(b.p)?1:0));
  rxGrid.innerHTML = '';
  rxGrid.hidden = list.length === 0;
  $('#rxEmpty').hidden = list.length > 0;
  const head = document.createElement('div');
  head.className = 'rx-current'; head.style.gridColumn = '1/-1';
  const showClear = curFilter !== 'todos' || curQuery || curPeriod !== 'tudo';
  if(!showClear) head.style.display='none';
  head.innerHTML = '<div><div class="rc-title">'+foFilterLabel()+(curQuery?' · “'+curQuery+'”':'')+'</div>'+
    '<div class="rc-sub">'+list.length+(list.length===1?' short':' shorts')+(curPeriod!=='tudo'?' · '+PERIOD_LABEL[curPeriod]:'')+'</div></div>'+
    (showClear ? '<button class="rx-clear"><i class="fa-solid fa-xmark"></i> Limpar filtro</button>' : '');
  if (showClear) head.querySelector('.rx-clear').addEventListener('click', () => {
    curFilter='todos'; curQuery=''; curPeriod='tudo';
    const s=$('#rxSearch'); if(s) s.value='';
    const pp=$('#rxPeriod'); if(pp) pp.value='tudo';
    foBuildReelFilters(); renderGrid();
  });
  rxGrid.appendChild(head);
  const unseen = REELS_DATA.filter(r=>!isSeen(r.p)).length;
  if (false){
    const bn = document.createElement('button');
    bn.className = 'rx-unseen-banner'; bn.style.gridColumn = '1/-1';
    bn.innerHTML = '<i class="fa-solid fa-circle-play"></i> Você tem '+unseen+' '+(unseen===1?'short não visto':'shorts não vistos')+' · Ver agora';
    bn.addEventListener('click', () => { curFilter='naovistos'; foBuildReelFilters(); renderGrid(); });
    rxGrid.appendChild(bn);
  }
  if (managed && curView === 'lista'){ rxGrid.style.display='block'; renderList(list); return; }
  const plain = (curFilter!=='todos') || curQuery || curPeriod!=='tudo' || rxMinViews || rxMinLikes;
  if (plain){
    rxGrid.style.display='';
    list.forEach((r, idx) => {
      const wrap = document.createElement('div');
      wrap.innerHTML = reelCardHTML(r);
      const card = wrap.firstElementChild;
      card.addEventListener('click', () => openPlayer(list, idx));
      rxGrid.appendChild(card);
    });
    ajustaFundoEm(rxGrid, '.rx-card img,.rx-card video');
    return;
  }
  rxGrid.style.display='block';
  renderSocialFeed(list);
  ajustaFundoEm(rxGrid, '.rx-card img,.rx-card video');
}
function attachCard(el, list, idx){ el.addEventListener('click', () => openPlayer(list, idx)); }
function renderSocialFeed(list){
  // HERO: reel em destaque (primeiro não visto, senão o mais visto)
  const hero = null;
  if (hero){
    const p = POSTS[hero.p];
    const hi = document.createElement('div');
    hi.className = 'rxh';
    hi.innerHTML = '<div class="rxh-media"><img src="'+p.img+'" alt=""><span class="rxh-play"><i class="fa-solid fa-play"></i></span></div>'+
      '<div class="rxh-info"><span class="rxh-tag"><i class="fa-solid fa-bolt"></i> Em destaque</span>'+
      '<h3>'+(p.title||p.alt||'Short')+'</h3>'+
      '<p>'+(p.caption||p.alt||'')+'</p>'+
      '<div class="rxh-meta"><span class="avatar '+p.av+'"></span><b>'+p.name+'</b><span class="rxh-dot">·</span>'+
      '<span><i class="fa-solid fa-play"></i> '+hero.views+'</span><span class="rxh-dot">·</span><span><i class="fa-solid fa-heart"></i> '+likeDisplay(hero)+'</span></div>'+
      '<button class="rxh-btn"><i class="fa-solid fa-play"></i> Assistir agora</button></div>';
    hi.addEventListener('click', ()=>openPlayer(list, list.indexOf(hero)));
    rxGrid.appendChild(hi);
  }
  // TRILHAS
  const rails = [
    ['Não vistos','fa-circle-play', list.filter(r=>!isSeen(r.p))],
    ['Em alta esta semana','fa-fire', list.slice().sort((a,b)=>numVal(b.views)-numVal(a.views)).slice(0,12)],
    ['Histórias de sucesso','fa-trophy', list.filter(r=>/hist[óo]ria/i.test((POSTS[r.p].title||POSTS[r.p].alt||'')))],
    ['Todos os shorts','fa-layer-group', list.slice()]
  ].filter(t=>t[2].length);
  rails.forEach(t=>{
    const sec = document.createElement('section');
    sec.className='rxr';
    const subs = {'Todos os shorts':'Os 15 últimos publicados','Não vistos':'Comece por aqui','Em alta esta semana':'Os mais assistidos da rede','Histórias de sucesso':'Cases de franqueados','Continue assistindo':'Você já viu estes'};
    sec.innerHTML = '<div class="rxr-hd"><div class="rxr-ttl"><span class="rxr-ic"><i class="fa-solid '+t[1]+'"></i></span>'+
        '<div><h4>'+t[0]+' <span>'+t[2].length+'</span></h4><small>'+(subs[t[0]]||'')+'</small></div></div>'+
      '<div class="rxr-nav">'+(t[2].length>15?'<button class="rxr-all" data-all="'+t[0].replace(/"/g,'&quot;')+'">Ver todos ('+t[2].length+') <i class="fa-solid fa-arrow-right"></i></button>':'')+
        '<button class="rxr-arrow" data-d="-1" disabled><i class="fa-solid fa-chevron-left"></i></button><button class="rxr-arrow" data-d="1"><i class="fa-solid fa-chevron-right"></i></button></div></div>'+
      '<div class="rxr-scroll"><div class="rxr-track"></div></div>';
    const track = sec.querySelector('.rxr-track');
    const shown = t[2].slice(0,15);
    shown.forEach((r,i)=>{
      const w=document.createElement('div'); w.innerHTML=reelCardHTML(r);
      const c=w.firstElementChild; c.classList.add('rxr-card');
      const p=POSTS[r.p];
      const soc=document.createElement('div'); soc.className='rxc-social';
      soc.innerHTML='<span><i class="fa-solid fa-heart"></i> '+likeDisplay(r)+'</span><span><i class="fa-solid fa-comment"></i> '+(r.comments||Math.max(3,Math.round(numVal(r.views)/900)))+'</span>'+
        '<span class="rxc-acts"><button class="rxc-a" data-a="like" title="Curtir"><i class="fa-regular fa-heart"></i></button><button class="rxc-a" data-a="save" title="Salvar"><i class="fa-regular fa-bookmark"></i></button><button class="rxc-a" data-a="share" title="Compartilhar"><i class="fa-solid fa-share-nodes"></i></button></span>';
      c.appendChild(soc);
      soc.addEventListener('click', ev=>{ const b=ev.target.closest('.rxc-a'); if(!b) return; ev.stopPropagation(); const ic=b.querySelector('i');
        if(b.dataset.a==='like'){ const on=ic.classList.toggle('fa-solid'); ic.classList.toggle('fa-regular',!on); b.classList.toggle('on',on); setLiked(r.p,on); }
        else if(b.dataset.a==='save'){ const on=ic.classList.toggle('fa-solid'); ic.classList.toggle('fa-regular',!on); b.classList.toggle('on',on); fgToast(on?'Short salvo':'Removido dos salvos'); }
        else fgToast('Link do short copiado');
      });
      attachCard(c, shown, i);
      track.appendChild(c);
    });
    const wrap = sec.querySelector('.rxr-scroll');
    const arrows = sec.querySelectorAll('.rxr-arrow');
    function syncArrows(){
      const max = track.scrollWidth - track.clientWidth - 2;
      const atStart = track.scrollLeft <= 22;
      arrows[0].disabled = atStart;
      arrows[1].disabled = track.scrollLeft >= max;
      wrap.classList.toggle('at-start', atStart);
      wrap.classList.toggle('at-end', track.scrollLeft >= max);
    }
    const allBtn = sec.querySelector('.rxr-all');
    if(allBtn) allBtn.addEventListener('click', ev=>{ ev.stopPropagation(); openRailAll(t[0], t[2]); });
    sec.querySelector('.rxr-nav').addEventListener('click', ev=>{ const b=ev.target.closest('.rxr-arrow'); if(!b||b.disabled) return; track.scrollBy({left:(+b.dataset.d)*(track.clientWidth*0.85), behavior:'smooth'}); });
    track.addEventListener('scroll', syncArrows);
    rxGrid.appendChild(sec);
    setTimeout(syncArrows, 60);
  });
}
function rxPubDT(rel){
  var mins=0, m;
  if(/agora|hoje/i.test(rel)) mins=0;
  else if((m=rel.match(/(\d+)\s*min/i))) mins=+m[1];
  else if((m=rel.match(/(\d+)\s*h/i))) mins=+m[1]*60;
  else if((m=rel.match(/(\d+)\s*d/i))) mins=+m[1]*1440;
  var d=new Date(Date.now()-mins*60000), p=function(x){return ('0'+x).slice(-2);};
  return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear()+' '+p(d.getHours())+':'+p(d.getMinutes());
}
function openNewsViewers(n, views){
  var m=document.getElementById('interModal'); if(!m) return;
  document.getElementById('interMTitle').textContent=(n.title||'Publicação');
  document.getElementById('interMSub').textContent='Quem visualizou · '+views;
  var total=Math.min(30,Math.max(6,Math.round((typeof views==='string'?parseInt(views.replace(/\D/g,''),10):views)/220)));
  var rows='';
  for(var i=0;i<total;i++){
    var p=PEOPLE[i%PEOPLE.length], st=STORES[i%STORES.length], mins=7+i*19;
    var d=new Date(Date.now()-mins*60000), pad=function(x){return ('0'+x).slice(-2);};
    var dt=pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+' '+pad(d.getHours())+':'+pad(d.getMinutes());
    var rel=mins<60?('há '+mins+' min'):(mins<1440?('há '+Math.floor(mins/60)+' h'):('há '+Math.floor(mins/1440)+' d'));
    rows+='<tr><td><span class="il-pill" style="background:#eef2f5;color:#5b6672"><i class="fa-solid fa-eye"></i> Visualizou</span></td>'+
      '<td><div class="apr-person"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>'+p.role+'</span></div></div></td>'+
      '<td><div class="itbl-store"><span class="itbl-logo" style="background:'+st.color+'">'+st.ini+'</span><div><b>'+st.name+'</b><span>'+st.company+'</span></div></div></td>'+
      '<td class="itbl-when"><div>'+dt+'</div><span>'+rel+'</span></td></tr>';
  }
  document.getElementById('interMBody').innerHTML='<div class="rlist"><table class="itbl"><thead><tr><th style="width:150px">Interação</th><th>Colaborador</th><th>Unidade</th><th style="width:200px">Data e hora</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  m.classList.add('open');
}
function openReelAudience(r, mode){
  var post=POSTS[r.p];
  var m=document.getElementById('interModal'); if(!m) return;
  document.getElementById('interMTitle').textContent=(post.title||post.alt||'Short');
  document.getElementById('interMSub').textContent=(mode==='likes'?'Quem curtiu':'Quem assistiu')+' · '+(mode==='likes'?likeDisplay(r):r.views);
  var total=mode==='likes'?Math.min(24,Math.max(4,Math.round(numVal(r.likes)/60))):Math.min(30,Math.max(6,Math.round(numVal(r.views)/2200)));
  var rows='';
  for(var i=0;i<total;i++){
    var p=PEOPLE[i%PEOPLE.length], st=STORES[i%STORES.length], mins=9+i*23;
    var d=new Date(Date.now()-mins*60000), pad=function(x){return ('0'+x).slice(-2);};
    var dt=pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+' '+pad(d.getHours())+':'+pad(d.getMinutes());
    var rel=mins<60?('há '+mins+' min'):(mins<1440?('há '+Math.floor(mins/60)+' h'):('há '+Math.floor(mins/1440)+' d'));
    rows+='<tr><td>'+(mode==='likes'?'<span class="il-pill" style="background:#e0245e18;color:#e0245e"><i class="fa-solid fa-heart"></i> Curtiu</span>':'<span class="il-pill" style="background:#eef2f5;color:#5b6672"><i class="fa-solid fa-play"></i> Visualizou</span>')+'</td>'+
      '<td><div class="apr-person"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>'+p.role+'</span></div></div></td>'+
      '<td><div class="itbl-store"><span class="itbl-logo" style="background:'+st.color+'">'+st.ini+'</span><div><b>'+st.name+'</b><span>'+st.company+'</span></div></div></td>'+
      '<td class="itbl-when"><div>'+dt+'</div><span>'+rel+'</span></td></tr>';
  }
  document.getElementById('interMBody').innerHTML='<table class="itbl"><thead><tr><th>Ação</th><th>Colaborador</th><th>Loja</th><th style="width:150px">Data e hora</th></tr></thead><tbody>'+rows+'</tbody></table>';
  var seg=document.getElementById('interMSeg'); if(seg) seg.style.display='none';
  m.classList.add('open');
}
function renderList(list){
  const wrap = document.createElement('div');
  wrap.className = 'rlist rl-tblwrap'; wrap.style.gridColumn = '1/-1';
  if (colSort.key){
    const val = r => { const p = POSTS[r.p]; switch(colSort.key){
      case 'title': return (p.title||p.alt||'').toLowerCase();
      case 'author': return p.name.toLowerCase();
      case 'time': return hoursVal(p.time);
      case 'views': return numVal(r.views);
      case 'likes': return numVal(likeDisplay(r));
      case 'cat': { const c=catById(r.cat); return (c?c.name:'').toLowerCase(); }
      default: return 0; } };
    list = list.slice().sort((a,b)=>{ const va=val(a), vb=val(b); return va<vb ? -colSort.dir : va>vb ? colSort.dir : 0; });
  }
  const rows = list.map((r, idx) => {
    const post = POSTS[r.p];
    const cat = catById(r.cat);
    const emp = post.company || post.store || post.label || 'SULTS';
    const orig = (post.store || (post.company && post.company!=='SULTS')) ? 'Unidade' : 'Matriz';
    return '<tr data-i="'+idx+'">'+
      '<td class="perm-id">#'+(1000+r.p)+'</td>'+
      '<td><div class="rl-reel">'+
        (r.proc ? '<span class="rl-procthumb"><span class="rl-spin"></span></span>'
                : '<img src="'+(post.img||post.poster||'')+'" alt="">')+
        '<div><b>'+(post.title||post.alt)+'</b>'+
        (r.proc ? '<span class="rl-procpill">Em processamento</span>' : '')+
        '</div></div></td>'+
      '<td style="white-space:nowrap" class="'+(r.agendado?'rl-dtag':'')+'"><div class="rl-dt">'+(r.agendado?rxSchedDT(r.agendado):rxPubDT(post.time))+'</div><span class="rl-rel">'+(r.agendado?rxSchedIn(r.agendado):post.time)+'</span></td>'+
      '<td>'+(rFormat(r)==='imagem'
        ? '<span class="nv-tp is-post"><i class="fa-solid fa-image"></i> Imagem</span>'
        : '<span class="nv-tp is-art"><i class="fa-solid fa-video"></i> Vídeo</span>')+'</td>'+
      '<td><div class="rl-author"><span class="avatar '+post.av+'"></span><div><b>'+post.name+'</b><span class="rl-emp">'+orig+'</span></div></div></td>'+
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-rx="views"><i class="fa-solid fa-play" style="font-size:10px;color:#8a94a0"></i> '+r.views+'</button></td>'+
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-rx="likes"><i class="fa-solid fa-heart" style="font-size:10px;color:'+(isLiked(r.p)?'#ff3040':'#8a94a0')+'"></i> '+likeDisplay(r)+'</button></td>'+
      '<td>'+(cat?'<span class="rl-cat"><span class="rl-cat-dot" style="background:'+cat.color+'"><i class="fa-solid '+(cat.icon||'fa-tag')+'"></i></span>'+cat.name+'</span>':'<span style="color:#b8c2cc">,</span>')+'</td>'+
      '<td class="rl-acts">'+
        '<button class="rl-act" data-act="ver"><i class="fa-solid fa-play"></i> Assistir</button>'+
        '<button class="rl-act danger" data-act="del"><i class="fa-solid fa-trash"></i> Excluir</button>'+
      '</td></tr>';
  }).join('');
  const cols = [['id','ID'],['title','Short'],['time','Dt. Publicação'],['format','Tipo'],['author','Autor'],['views','Vistos'],['likes','Curtidas'],['cat','Categoria']];
  const ths = cols.map(function(c){ const k=c[0], active=colSort.key===k; const ar = active ? (colSort.dir===1?'<i class="fa-solid fa-arrow-up-short-wide"></i>':'<i class="fa-solid fa-arrow-down-wide-short"></i>') : '<i class="fa-solid fa-sort"></i>'; return '<th class="sortable'+(active?' active-sort':'')+'" data-sort="'+k+'">'+c[1]+' <span class="sort-ic">'+ar+'</span></th>'; }).join('') + '<th></th>';
  wrap.innerHTML = '<table><thead><tr>'+ths+'</tr></thead><tbody>'+rows+'</tbody></table>';
  wrap.querySelector('tbody').addEventListener('click', e => {
    const tr = e.target.closest('tr'); if (!tr) return;
    const idx = +tr.dataset.i; const r = list[idx];
    const rxb = e.target.closest('[data-rx]');
    if (rxb){ e.stopPropagation(); openReelAudience(r, rxb.dataset.rx); return; }
    if (!e.target.closest('.rl-act')){ openReelInfo(r); return; }
    const act = e.target.closest('.rl-act');
    if (act){
      if (act.dataset.act === 'ver') openPlayer(list, idx);
      else if (act.dataset.act === 'rec'){ r.rec = !r.rec; renderGrid(); fgToast(r.rec ? 'Short marcado como Recomendado' : 'Recomendação removida'); }
      else { const gi = REELS_DATA.indexOf(r); if (gi > -1) REELS_DATA.splice(gi, 1); buildStories(); renderGrid(); fgToast('Short excluído'); }
      return;
    }
    openPlayer(list, idx);
  });
  wrap.querySelector('thead').addEventListener('click', ev => {
    const th = ev.target.closest('th.sortable'); if (!th) return;
    const k = th.dataset.sort;
    if (colSort.key === k) colSort.dir = -colSort.dir;
    else { colSort.key = k; colSort.dir = (k==='views'||k==='likes') ? -1 : 1; }
    renderGrid();
  });
  rxGrid.appendChild(wrap);
}

function openStories(){ reelsView.classList.add('open'); document.body.style.overflow='hidden'; curFilter='todos'; curQuery=''; curPeriod='tudo'; authorQueryRaw=''; authorShown=AUTH_PAGE; catQueryRaw=''; catShown=CAT_PAGE; const s=$('#rxSearch'); if(s)s.value=''; const pp=$('#rxPeriod'); if(pp)pp.value='tudo'; const so=$('#rxSort'); if(so)so.value='relevancia'; curSort='relevancia'; colSort.key=null; foBuildReelFilters(); renderGrid(); }
function closeStories(){ reelsView.classList.remove('open'); if(!reelsPlayer.classList.contains('open')) document.body.style.overflow=''; }
function openPlayer(list, startIdx){
  playerList = list;
  rvFeed.innerHTML = list.map((r,i) => reelSlideHTML(r, i, list.length)).join('');
  rvFitMedia();
  reelsPlayer.classList.add('open');
  document.body.style.overflow='hidden';
  rvFeed.style.scrollBehavior='auto';
  requestAnimationFrame(() => {
    rvFeed.scrollTop = startIdx * rvFeed.clientHeight;
    requestAnimationFrame(()=>{ rvFeed.style.scrollBehavior=''; rvArmTimer(); });
  });
  if (list[startIdx]) markReelSeen(list[startIdx].p);
}
function rvTogglePause(slide){
  if(!slide) return;
  const on = slide.classList.toggle('paused');
  const v = slide.querySelector('video');
  if(v){ if(on){ v.pause(); } else { const p=v.play(); if(p&&p.catch) p.catch(()=>{}); } }
  if(on){ clearTimeout(window.__rvT); }
  else if(slide.querySelector('.rv-timer')){
    const el = slide.querySelector('.rv-timer span');
    const left = Math.max(1000, 30000 * (1 - (el.getBoundingClientRect().width / Math.max(1, el.parentElement.getBoundingClientRect().width))));
    window.__rvT = setTimeout(()=>rvArmTimer(), left);
  }
}
/* Uma fonte fora do 9:16 encaixa pela largura e deixa o resto do quadro vazio.
   Em vez de tarja preta, o vazio recebe a própria imagem coberta e desfocada.
   Vale para o player, para a miniatura da fileira e para a grade do módulo: os
   três marcam 'tem-fundo' e leem a fonte de --fundo-src, mudando só o raio do
   desfoque, que acompanha o tamanho do cartão. */
function ajustaFundo(el){
  if(!el) return;
  const set=()=>{
    const w=el.videoWidth||el.naturalWidth, hh=el.videoHeight||el.naturalHeight; if(!w||!hh) return;
    const largo = (w/hh) > 0.85;
    el.classList.toggle('wide', largo);
    const card = el.closest('.rv-card,.reel,.rx-card,.sb-media'); if(!card) return;
    /* a fonte do fundo é a mesma da mídia: currentSrc no <img>, poster no
       <video> que ainda não baixou o arquivo */
    const fonte = el.tagName==='VIDEO' ? (el.poster||el.currentSrc||el.src) : (el.currentSrc||el.src);
    if(largo && fonte){ card.style.setProperty('--fundo-src','url("'+fonte+'")'); card.classList.add('tem-fundo'); }
    else { card.classList.remove('tem-fundo'); card.style.removeProperty('--fundo-src'); }
  };
  if(el.tagName==='VIDEO'){ el.readyState>=1 ? set() : el.addEventListener('loadedmetadata', set, {once:true}); }
  else { el.complete ? set() : el.addEventListener('load', set, {once:true}); }
}
function ajustaFundoEm(raiz, seletor){
  (raiz||document).querySelectorAll(seletor).forEach(ajustaFundo);
}
function rvFitMedia(root){
  ajustaFundoEm(root||rvFeed, '.rv-card>img,.rv-card>video');
}
/* Só o short em tela baixa vídeo. Antes todo slide nascia com src e autoplay,
   então abrir o player disparava o download de vários vídeos ao mesmo tempo —
   eles disputavam banda e o primeiro quadro demorava a aparecer. */
function rvCarregaVideo(v, tocar){
  if(!v) return;
  const s = v.getAttribute('data-src');
  if(s && !v.getAttribute('src')){ v.setAttribute('src', s); v.preload = tocar ? 'auto' : 'metadata'; v.load(); }
  else if(tocar && v.preload !== 'auto'){ v.preload = 'auto'; }
}
/* Fala com o player do YouTube ja carregado, em vez de tirar e repor o src —
   repor recomeca o download e e ele que causa a espera ao trocar de short. */
function rvComandaEmbed(f, comando){
  if(!f || !f.contentWindow) return;
  try { f.contentWindow.postMessage(JSON.stringify({ event:'command', func:comando, args:[] }), '*'); } catch(e){}
}
/* Quantos shorts ficam prontos de cada lado do que esta em tela. Um de cada
   lado cobre o gesto normal (subir ou descer um) sem pesar a rede. */
const RV_VIZINHOS = 1;
function rvArmTimer(){
  clearTimeout(window.__rvT);
  const w=rvFeed.clientHeight||1;
  const i=Math.min(Math.max(Math.round(rvFeed.scrollTop/w),0),playerList.length-1);
  const slides=rvFeed.querySelectorAll('.rv-reel');
  slides.forEach((s,k)=>{ s.classList.toggle('playing', k===i); s.classList.remove('paused'); });
  const cur=slides[i];
  /* O short em tela e os vizinhos ficam montados; o resto e descarregado. O
     que esta em tela toca, os vizinhos ficam parados no primeiro quadro. */
  slides.forEach((s,k)=>{
    const perto = Math.abs(k - i) <= RV_VIZINHOS;
    const f = s.querySelector('iframe[data-src]');
    if(f){
      if(perto){
        if(!f.getAttribute('src')) f.setAttribute('src', f.getAttribute('data-src'));
        else rvComandaEmbed(f, k===i ? 'playVideo' : 'pauseVideo');
      } else if(f.getAttribute('src')) f.removeAttribute('src');
    }
    const v = s.querySelector('video');
    if(v && perto && k!==i){ rvCarregaVideo(v, false); try{ v.pause(); }catch(e){} }
  });
  const vid=cur&&cur.querySelector('video');
  if(vid){ rvCarregaVideo(vid, true); try{ vid.currentTime=0; const p=vid.play(); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }
  if(typeof rvSyncAudio==='function') rvSyncAudio();
  if(vid){
    const bar=cur.querySelector('.rv-timer span');
    if(bar && !vid.__rvBound){
      vid.__rvBound=true;
      vid.addEventListener('timeupdate', ()=>{ if(vid.duration) bar.style.width=(vid.currentTime/vid.duration*100)+'%'; });
    }
    return;
  }
  if(cur && cur.querySelector('.rv-timer')){
    const bar=cur.querySelector('.rv-timer span');
    bar.style.animation='none'; void bar.offsetWidth; bar.style.animation='';
    window.__rvT=setTimeout(()=>rvArmTimer(), 30000);
  }
}
function playerGo(dir){
  const w = rvFeed.clientHeight || 1;
  const i = Math.round(rvFeed.scrollTop / w);
  const last = playerList.length - 1;
  const next = i + dir;
  if(next > last || next < 0){
    const target = next > last ? 0 : last;
    rvFeed.style.scrollBehavior='auto';
    rvFeed.scrollTop = target * w;
    requestAnimationFrame(()=>{ rvFeed.style.scrollBehavior=''; });
  } else {
    rvFeed.scrollBy({ top: dir * w, behavior:'smooth' });
  }
  setTimeout(()=>{ markVisibleSeen(); rvArmTimer(); }, 450);
}
function markVisibleSeen(){
  if (!playerList.length) return;
  const w = rvFeed.clientHeight || 1;
  const i = Math.min(Math.max(Math.round(rvFeed.scrollTop / w), 0), playerList.length - 1);
  if (playerList[i]) markReelSeen(playerList[i].p);
}
function rvDecidir(r, aprovar){
  if (!r) return;
  r.pendAppr = false;
  if (!aprovar) r.removido = true;
  closePlayer();
  if (typeof renderShortsB === 'function') renderShortsB();
  if (typeof fgToast === 'function') fgToast(aprovar ? 'Short aprovado' : 'Short reprovado');
}
function closePlayer(){
  clearTimeout(window.__rvT);
  rvFeed.querySelectorAll('video').forEach(v=>{ try{ v.pause(); v.currentTime=0; v.muted=true; }catch(e){} });
  reelsPlayer.classList.remove('open');
  if(!reelsView.classList.contains('open')) document.body.style.overflow='';
  buildStories();
  if(reelsView.classList.contains('open')) renderGrid();
}

$('#rxFilters').addEventListener('click', e => {
  const b = e.target.closest('.rxs-item, #rxSitCards button'); if(b){ curFilter=b.dataset.f; foBuildReelFilters(); renderGrid(); return; }
  if(e.target.closest('#rxFApply')){ renderGrid(); fgToast('Filtros aplicados'); return; }
  if(e.target.closest('#rxFClear')){ curFilter='todos'; curQuery=''; curPeriod='tudo'; curSort='relevancia'; colSort.key=null; rxFormat=''; rxDur=''; rxReach=''; rxStatus=''; rxMinViews=''; rxMinLikes=''; const s=$('#rxSearch'); if(s)s.value=''; foBuildReelFilters(); renderGrid(); }
});
$('#rxFilters').addEventListener('input', e => { if(e.target.id==='rxSearch'){ curQuery=e.target.value.trim().toLowerCase(); renderGrid(); } });
$('#rxFilters').addEventListener('change', e => {
  const t=e.target;
  if(t.id==='rxFCat'){ curFilter = t.value || 'todos'; }
  else if(t.id==='rxFPeriod'){ curPeriod = t.value; }
  else if(t.id==='rxFAutor'){ curFilter = t.value ? ('autor:'+t.value) : 'todos'; }
  else if(t.id==='rxFSort'){ curSort = t.value; colSort.key=null; }
  else if(t.id==='rxFFormat'){ rxFormat=t.value; }
  else if(t.id==='rxFDur'){ rxDur=t.value; }
  else if(t.id==='rxFReach'){ rxReach=t.value; }
  else if(t.id==='rxFStatus'){ rxStatus=t.value; }
  else if(t.id==='rxFMinV'){ rxMinViews=t.value; }
  else if(t.id==='rxFMinL'){ rxMinLikes=t.value; }
  else return;
  foBuildReelFilters(); renderGrid();
});
$('#rxSort') && $('#rxSort').addEventListener('change', e => { curSort = e.target.value; colSort.key=null; renderGrid(); });
$('#rxPeriod') && $('#rxPeriod').addEventListener('change', e => { curPeriod = e.target.value; renderGrid(); });
$('#rxVGrade') && $('#rxVGrade').addEventListener('click', () => { curView='grade'; $('#rxVGrade').classList.add('active'); $('#rxVLista').classList.remove('active'); renderGrid(); });
$('#rxVLista') && $('#rxVLista').addEventListener('click', () => { curView='lista'; $('#rxVLista').classList.add('active'); $('#rxVGrade').classList.remove('active'); renderGrid(); });

function setNav(el){ $$('.hm-side .hm-navitem').forEach(n => n.classList.remove('is-active')); if (el) el.classList.add('is-active'); posSideSel(); }
/* Indicador que desliza no menu lateral (portado de menu.js do protótipo do menu).
   offsetTop, e não getBoundingClientRect: o indicador vive DENTRO do .hm-side__nav. */
const hmNavBox = $('.hm-side__nav');
const hmSel = document.createElement('span');
hmSel.className = 'hm-sel';
hmSel.innerHTML = '<span class="hm-sel__bar"></span>';
if (hmNavBox) hmNavBox.prepend(hmSel);
function posSideSel(){
  if (!hmNavBox) return;
  /* o item ativo pode estar na lista de cima ou no rodapé do menu (Novidades,
     suporte). offsetTop só serviria para o primeiro caso, porque o indicador
     vive dentro do .hm-side__nav — então a distância é medida na tela e
     convertida para a coordenada dele. */
  const lado = hmNavBox.closest('.hm-side') || document;
  const ativo = lado.querySelector('.hm-navitem.is-active');
  if (!ativo){ hmSel.style.visibility = 'hidden'; return; }
  const r = ativo.getBoundingClientRect();
  const base = hmNavBox.getBoundingClientRect();
  if (!r.height){ hmSel.style.visibility = 'hidden'; return; }
  hmSel.style.visibility = '';
  hmSel.style.transform = 'translateY(' + Math.round(r.top - base.top) + 'px)';
  hmSel.style.height = Math.round(r.height) + 'px';
  requestAnimationFrame(() => hmSel.classList.add('is-ready'));
}
window.addEventListener('resize', posSideSel);
posSideSel();
/* Itens sem destino próprio (Aplicativos, Powerups…) só movem o indicador.
   Os que têm id abrem um módulo pelo seu próprio handler, e o de suporte é
   um link para fora — nos dois casos a delegação sai do caminho. */
$$('.hm-side__nav, .hm-side__foot').forEach(caixa => {
  caixa.addEventListener('click', e => {
    const item = e.target.closest('.hm-navitem');
    if (!item || item.id || item.target === '_blank') return;
    e.preventDefault();
    setNav(item);
  });
});

