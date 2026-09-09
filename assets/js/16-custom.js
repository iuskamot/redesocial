/* ============================================================
   Home customizável
   Liga e desliga pelo ícone da Microsoft no rodapé do menu. É o cenário da
   Crunchyroll (Pikachu) com a classe body.demo-custom por cima: tudo o que
   for mudado nessa versão fica em assets/css/14-custom.css (e aqui, se
   precisar de comportamento), sem tocar na home original.
   ============================================================ */
function customLigado(){ return document.body.classList.contains('demo-custom'); }

/* Os clientes da versao customizavel. O icone da Microsoft roda a lista:
   desligado -> Crunchyroll -> Casa do Construtor -> Fini -> Habib's -> Petlove -> Piticas -> desligado. Cada cliente
   traz a cor da marca (tudo deriva dela no CSS), a logo, a capa do cartao e
   qual cenario e a base (o da Crunchyroll e o Pikachu; a Casa do Construtor
   usa a home do SULTS). */
const CUSTOM_CLIENTES = [
  { id:'crunch', nome:'Crunchyroll',        marca:'#F47521', logo:'uploads/crunch/logo.webp',
    capa:'uploads/crunch/capa.jpg', capaPos:'center 60%', base:'crunch' },
  { id:'casa',   nome:'Casa do Construtor', marca:'#013E8F', logo:'uploads/casa/logo.svg',
    capa:'uploads/casa/capa.jpg', capaPos:'center 30%', base:'sults', cargo:'Administrador · Casa do Construtor' },
  /* a logo da Fini e um oval azul com letras brancas: fica nas cores originais
     (logoCor), sem o filtro que deixa as outras brancas */
  { id:'fini',   nome:'Fini',               marca:'#E73478', logo:'uploads/fini/logo.png', logoCor:true,
    capa:'uploads/fini/capa.jpg', capaPos:'center 45%', base:'sults', cargo:'Administrador · Fini' },
  { id:'habibs', nome:"Habib's",            marca:'#FE0C18', logo:'uploads/habibs/logo.svg',
    capa:'uploads/habibs/capa.jpg', base:'sults', cargo:"Administrador · Habib's" },
  /* a logo da Petlove e branca com o coracao vermelho: fica nas cores originais */
  { id:'petlove', nome:'Petlove',           marca:'#4E2096', logo:'uploads/petlove/logo.svg', logoCor:true,
    capa:'uploads/petlove/capa.jpg', capaPos:'center 55%', base:'sults', cargo:'Administrador · Petlove' },
  { id:'piticas', nome:'Piticas',           marca:'#ED7E0A', logo:'uploads/piticas/logo.svg',
    capa:'uploads/piticas/capa.jpg', capaPos:'center 55%', base:'sults', cargo:'Administrador · Piticas' },
  /* empresa ficticia: rede de lojas para gatos. A pessoa da vez tambem muda
     (nome, cargo e foto), e a logo e provisoria ate a oficial chegar */
  { id:'marvel',  nome:'Marvel',            marca:'#000000', logo:'uploads/marvel/logo.svg', logoCor:true,
    capa:'uploads/marvel/capa.jpg', capaPos:'center', base:'sults', cargo:'Amigo da vizinhança · Marvel',
    pessoa:{ nome:'Homem-Aranha', foto:'uploads/marvel/perfil.jpg' } },
  { id:'gatitos', nome:'Gatitos',           marca:'#F06292', logo:'uploads/gatitos/logo.svg',
    capa:'uploads/gatitos/capa.jpg', capaPos:'center 45%', base:'sults', cargo:'Arranhador · Gatitos',
    pessoa:{ nome:'Senhor Bigode', foto:'uploads/gatitos/perfil.jpg' } }
];
let customClienteAtual = null;
/* endereco absoluto a partir da pagina: ver o comentario em --capa-src */
function customEndereco(u){
  if (!u || /^(data:|blob:|https?:)/.test(u)) return u;
  try { return new URL(u, document.baseURI).href; } catch (e) { return u; }
}
function customCliente(){ return CUSTOM_CLIENTES.find(c => c.id === customClienteAtual) || null; }
function customAplicaCliente(c){
  document.body.style.setProperty('--marca', c.marca);
  document.body.dataset.cliente = c.id;
  if (c.logoCor) document.body.dataset.logoCor = ''; else delete document.body.dataset.logoCor;
  if (c.logoFundoPreto) document.body.dataset.logoFundoPreto = ''; else delete document.body.dataset.logoFundoPreto;
  document.querySelectorAll('.hm-logo-cliente, .top-logo-cliente img').forEach(function(img){ img.src = c.logo; img.alt = c.nome; });
  /* a capa fica no body: o cartao da home, o bloco de perfil dos modulos e a
     tela "Ver meu perfil" leem a mesma variavel */
  document.body.style.setProperty('--capa-src', 'url("' + customEndereco(c.capa) + '")');
  if (c.capaPos) document.body.style.setProperty('--capa-pos', c.capaPos); else document.body.style.removeProperty('--capa-pos');
  document.querySelectorAll('.profile-banner').forEach(function(b){ b.style.removeProperty('--capa-src'); b.style.removeProperty('--capa-pos'); });
  const ppLogo = document.querySelector('.pp-logo-cliente');
  if (ppLogo){ ppLogo.src = c.logo; ppLogo.alt = c.nome; ppLogo.hidden = false; }
  /* o conteudo da marca (shorts, publicacoes, categorias) para quem usa a home do SULTS */
  if (typeof marcaLigar === 'function'){ if (c.base === 'sults' && MARCAS[c.id]) marcaLigar(c.id); else marcaDesligar(); }
  /* a pessoa da vez, quando o cliente traz uma (o Senhor Bigode da Gatitos) */
  document.querySelectorAll('.profile-name, .nvf-pname, #topUserChip .uname, #ppTopUser .uname').forEach(function(el){
    if (c.pessoa){ if (!el.dataset.nomeOrig) el.dataset.nomeOrig = el.textContent; el.textContent = c.pessoa.nome; }
    else if (el.dataset.nomeOrig){ el.textContent = el.dataset.nomeOrig; delete el.dataset.nomeOrig; }
  });
  /* o cargo da pessoa neste cliente (na Crunchyroll o proprio cenario cuida) */
  document.querySelectorAll('.profile-role, .nvf-prole').forEach(function(el){
    if (c.cargo){ if (!el.dataset.cargoOrig) el.dataset.cargoOrig = el.textContent; el.textContent = c.cargo; }
    else if (el.dataset.cargoOrig){ el.textContent = el.dataset.cargoOrig; delete el.dataset.cargoOrig; }
  });
}
function customLimpaCliente(){
  document.body.style.removeProperty('--marca');
  delete document.body.dataset.cliente;
  delete document.body.dataset.logoCor;
  delete document.body.dataset.logoFundoPreto;
  if (typeof marcaDesligar === 'function') marcaDesligar();
  document.body.style.removeProperty('--capa-src'); document.body.style.removeProperty('--capa-pos');
  document.querySelectorAll('.profile-banner').forEach(function(b){ b.style.removeProperty('--capa-src'); b.style.removeProperty('--capa-pos'); });
  const ppLogo = document.querySelector('.pp-logo-cliente'); if (ppLogo) ppLogo.hidden = true;
  document.querySelectorAll('.profile-role, .nvf-prole').forEach(function(el){
    if (el.dataset.cargoOrig){ el.textContent = el.dataset.cargoOrig; delete el.dataset.cargoOrig; }
  });
  document.querySelectorAll('.profile-name, .nvf-pname, #topUserChip .uname, #ppTopUser .uname').forEach(function(el){
    if (el.dataset.nomeOrig){ el.textContent = el.dataset.nomeOrig; delete el.dataset.nomeOrig; }
  });
}

function customSemAvisos(fn){
  const t = window.fgToast; window.fgToast = function(){};
  try { fn(); } finally { window.fgToast = t; }
}
function customLigar(id){
  const c = CUSTOM_CLIENTES.find(x => x.id === (id || 'crunch')) || CUSTOM_CLIENTES[0];
  customSemAvisos(function(){
    if (typeof basicoDesligar === 'function' && document.body.classList.contains('demo-basico')) basicoDesligar();
    /* a base do cliente: o cenario da Crunchyroll (Pikachu) ou a home do SULTS */
    const noCrunch = document.body.classList.contains('demo-crunch');
    if (c.base === 'crunch' && !noCrunch && typeof crunchLigar === 'function') crunchLigar();
    /* na versao customizavel o Pikachu ja entra como administrador */
    if (c.base === 'crunch' && typeof crunchAdmin === 'function' && !document.body.classList.contains('crunch-admin')) crunchAdmin(true);
    if (c.base === 'sults' && noCrunch && typeof crunchDesligar === 'function'){ document.body.classList.remove('demo-custom'); crunchDesligar(); }
  });
  customClienteAtual = c.id;
  customAplicaCliente(c);
  document.body.classList.add('demo-custom');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (typeof fgToast === 'function') fgToast('Home customizável: ' + c.nome);
}

function customDesligar(){
  if (!customLigado()) return;
  document.body.classList.remove('demo-custom');
  customClienteAtual = null;
  customLimpaCliente();
  /* sair da versao customizavel e voltar ao SULTS */
  customSemAvisos(function(){ if (typeof crunchDesligar === 'function' && document.body.classList.contains('demo-crunch')) crunchDesligar(); });
  if (typeof fgToast === 'function') fgToast('Home customizável desligada');
}

/* o icone roda: desligado -> 1o cliente -> 2o cliente -> ... -> desligado */
function customAlternar(){
  if (!customLigado()){ customLigar(CUSTOM_CLIENTES[0].id); return; }
  const i = CUSTOM_CLIENTES.findIndex(c => c.id === customClienteAtual);
  if (i < 0 || i === CUSTOM_CLIENTES.length - 1) customDesligar();
  else customLigar(CUSTOM_CLIENTES[i + 1].id);
}

(function(){
  const ic = document.querySelector('.hm-store--windows');
  if (ic) ic.addEventListener('click', function(e){ e.preventDefault(); customAlternar(); });
  /* no celular o rodape do menu nao aparece: a logo do header (a do SULTS ou a
     do cliente) e que roda os clientes */
  document.querySelectorAll('.top-logo, .top-logo-cliente').forEach(function(el){
    el.addEventListener('click', function(e){
      if (!window.matchMedia('(max-width: 640px)').matches) return;
      e.preventDefault(); e.stopPropagation(); customAlternar();
    });
  });

  /* os pedacos que so existem nesta versao ficam com [hidden] fora dela; o
     CSS de body.demo-custom os mostra, e o hidden e retirado ao ligar para o
     display do CSS valer */
  const soDaVersao = ['.top-logo-cliente', '.hm-logo-cliente', '.hm-sults-mark', '#capaTrocar', '#ppCapaTrocar', '.pc-extra'];

  /* Os numeros e o contexto da pessoa. Sao dados de demonstracao, como as
     curtidas e os comentarios do resto do prototipo. */
  const PC_PESSOA = {
    'Pikachu':          { unidade:'Cidade de Pallet · Kanto', desde:'2024', pubs:'12', shorts:'4', reacoes:'286',     comentarios:'31',  unidades:'2 unidades',
                          streak:'7',  recorde:'21', semana:[1,1,1,1,1,1,0], hoje:5 },
    'Homem-Aranha':     { unidade:'Queens · Nova York',       desde:'2016',     pubs:'62', shorts:'18', reacoes:'12,4 mil', comentarios:'980', unidades:'1 unidade',
                          streak:'23', recorde:'31', semana:[1,1,1,1,1,1,0], hoje:5 },
    'Senhor Bigode':    { unidade:'Telhado da Vila Madalena', desde:'2021',     pubs:'9',  shorts:'7', reacoes:'900',     comentarios:'77',  unidades:'9 unidades',
                          streak:'973', recorde:'973', semana:[1,1,1,1,1,1,0], hoje:5 },
    'Rodrigo Caetano':  { unidade:'Uberaba · MG',             desde:'2019',     pubs:'48', shorts:'9', reacoes:'1,2 mil', comentarios:'120', unidades:'3 unidades',
                          streak:'12', recorde:'40', semana:[1,1,1,1,1,1,0], hoje:5 }
  };
  /* o módulo de IA também precisa saber de onde a pessoa fala */
  window.customUnidadeDe = function(nome){
    const d = PC_PESSOA[nome] || PC_PESSOA['Rodrigo Caetano'];
    return d ? d.unidade : '';
  };
  function pcPreenche(){
    const eu = (typeof usuarioAtual === 'function') ? usuarioAtual() : { nome:'Rodrigo Caetano' };
    const cli = (typeof customCliente === 'function') ? customCliente() : null;
    const nomeEu = (cli && cli.pessoa && cli.pessoa.nome) || eu.nome;
    const d = PC_PESSOA[nomeEu] || PC_PESSOA['Rodrigo Caetano'];
    document.querySelectorAll('.pc-extra [data-pc]').forEach(function(el){ el.textContent = d[el.dataset.pc] || ''; });
    /* a meta: quantos dias faltam para bater o recorde; se ja bateu, e recorde novo */
    const faltam = parseInt(d.recorde, 10) - parseInt(d.streak, 10);
    document.querySelectorAll('.pc-extra [data-pc-meta]').forEach(function(el){
      el.innerHTML = faltam > 0
        ? 'Recorde: <span data-pc="recorde">' + d.recorde + '</span> dias · faltam <span data-pc="faltam">' + faltam + '</span>'
        : 'Novo recorde! <span data-pc="recorde">' + d.streak + '</span> dias ativos 🔥';
    });
    /* a semana: S T Q Q S S D, cheia nos dias ativos, anel no dia de hoje */
    const letras = ['S','T','Q','Q','S','S','D'];
    document.querySelectorAll('.pc-extra [data-pc-week]').forEach(function(w){
      w.innerHTML = letras.map(function(l, i){
        const on = d.semana && d.semana[i], hoje = d.hoje === i;
        return '<span class="pc-day' + (on ? ' on' : '') + (hoje ? ' hoje' : '') + '"><i>' + (on ? '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.3l2.6 2.6 4.6-5.2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') + '</i>' + l + '</span>';
      }).join('');
    });
  }
  /* a mesma altura do painel de modulos, a esquerda: o cartao cresce ate la e
     a linha de atalhos vai para o pe */
  /* O cartao acompanha a altura do painel de modulos, mas so com a grade
     fechada. Abrir "Ver +N modulos" faz o painel triplicar de altura, e segui-lo
     deixava o cartao esticado, com um vazio enorme entre os blocos: a altura
     entao fica a ultima medida com a grade fechada. */
  let pcAlturaFixa = 0;
  function pcGradeAberta(){
    const b = document.getElementById('appsToggle');
    return !!(b && b.classList.contains('open'));
  }
  function pcSincronizaAltura(){
    const card = document.getElementById('homeProfileCard'), painel = document.getElementById('appsPanel');
    if (!card || !painel) return;
    if (!customLigado() || window.matchMedia('(max-width: 640px)').matches){ card.style.minHeight = ''; return; }
    if (!pcGradeAberta()) pcAlturaFixa = Math.round(painel.getBoundingClientRect().height);
    if (pcAlturaFixa) card.style.minHeight = pcAlturaFixa + 'px';
  }
  window.addEventListener('resize', pcSincronizaAltura);
  /* o painel muda de altura sozinho (fonte carregada, grade redesenhada): com
     a grade fechada, a medida nova vale */
  const _painel = document.getElementById('appsPanel');
  if (_painel && window.ResizeObserver) new ResizeObserver(pcSincronizaAltura).observe(_painel);
  const mostrar = function(sim){
    soDaVersao.forEach(function(s){ document.querySelectorAll(s).forEach(function(el){ el.hidden = !sim; }); });
  };
  const ligarOrig = customLigar, desligarOrig = customDesligar;
  window.customLigar = function(id){ ligarOrig(id); mostrar(customLigado()); pcPreenche(); requestAnimationFrame(pcSincronizaAltura); };

  /* A tela "Ver meu perfil" e montada com os dados do Rodrigo; na versao
     customizavel ela passa a mostrar a pessoa da vez (nome, cargo, cidade,
     numeros) e o vinculo com a marca. Roda depois da montagem original. */
  if (typeof openPersonProfile === 'function'){
    const abrirOrig = openPersonProfile;
    window.openPersonProfile = function(name, av){
      abrirOrig(name, av);
      if (name !== 'Rodrigo Caetano Silva') return;
      const noCrunch = document.body.classList.contains('demo-crunch');
      if (!customLigado() && !noCrunch) return;
      const c = customCliente() || CUSTOM_CLIENTES.find(function(x){ return x.id === 'crunch'; });
      if (!c) return;
      const q = function(s){ return document.querySelector(s); };
      const nome = q('.profile-name') ? q('.profile-name').textContent.trim() : name;
      const cargo = q('.profile-role') ? q('.profile-role').textContent.trim() : '';
      const d = PC_PESSOA[nome] || PC_PESSOA['Rodrigo Caetano'];
      if (q('#ppName')) q('#ppName').innerHTML = nome + ' <i class="fa-solid fa-circle-check pp-verif"></i>';
      if (q('#ppRole')) q('#ppRole').textContent = cargo;
      if (q('#ppMeta')) q('#ppMeta').innerHTML =
        '<span><i class="fa-solid fa-location-dot"></i>' + d.unidade + '</span><span class="pp-dot"></span>' +
        '<span><i class="fa-solid fa-calendar"></i>Na rede desde ' + d.desde + '</span><span class="pp-dot"></span>' +
        '<span><i class="fa-solid fa-store"></i>' + d.unidades + '</span>';
      if (q('#ppStats')) q('#ppStats').innerHTML =
        '<div class="pp-stat"><b>' + d.pubs + '</b><span>Publicações</span></div>' +
        '<div class="pp-stat"><b>' + d.reacoes + '</b><span>Reações</span></div>' +
        '<div class="pp-stat"><b>' + d.comentarios + '</b><span>Comentários</span></div>' +
        '<div class="pp-stat"><b>' + d.desde + '</b><span>Na rede desde</span></div>' +
        '<div class="pp-stat"><b>' + parseInt(d.unidades, 10) + '</b><span>Unidades</span></div>';
      if (q('#ppLinks')) q('#ppLinks').innerHTML =
        '<div class="pp-link"><span class="pp-linklogo ' + ((typeof MARCAS !== 'undefined' && MARCAS[c.id]) ? MARCAS[c.id].av : 'av-crunch') + '"></span>' +
        '<div class="pp-linkmain"><b>' + c.nome + '</b><span>' + d.unidade + '</span><span class="pp-linkq">' + cargo.split(' · ')[0] + '</span></div></div>';
      const nomeCampo = q('#ppBasic .pp-field span');
      if (nomeCampo) nomeCampo.textContent = nome;
    };
  }
  window.customDesligar = function(){ desligarOrig(); mostrar(false); pcSincronizaAltura(); };

  /* os atalhos do cartao: numeros abrem a tela do modulo, "Minha atividade"
     abre Publicacoes ja em "Que eu curti", "Ver meu perfil" abre o perfil
     (o mesmo clique do cartao). Nada aqui pode subir para o cartao, que
     tambem abre o perfil ao ser clicado. */
  /* Nesta versao o cartao inteiro nao abre mais o perfil: so o botao "Ver meu
     perfil". O clique em qualquer outro ponto do cartao morre aqui, na captura,
     antes de chegar ao handler do proprio cartao. O botao abre o perfil
     disparando o clique do cartao com a bandeira levantada. */
  let pcAbrindoPerfil = false;
  document.addEventListener('click', function(e){
    if (!customLigado()) return;
    const card = e.target.closest('#homeProfileCard'); if (!card) return;
    if (pcAbrindoPerfil) return;
    const b = e.target.closest('.pc-extra [data-pcgo]');
    if (e.target.closest('#capaTrocar, #capaFile')) return;   /* o Trocar capa cuida de si */
    if (!b){ e.stopPropagation(); e.preventDefault(); return; }
    e.preventDefault(); e.stopPropagation();
    const go = b.dataset.pcgo;
    if (go === 'perfil'){ pcAbrindoPerfil = true; try { card.click(); } finally { pcAbrindoPerfil = false; } return; }
    if (typeof abrirModuloSocial !== 'function') return;
    if (go === 'shorts'){ abrirModuloSocial('shorts'); return; }
    abrirModuloSocial('feed');
    if (go === 'atividade' && typeof nvFeedMine !== 'undefined'){ nvFeedMine = 'curti'; if (typeof renderNewsFeed === 'function') renderNewsFeed(); }
  }, true);

  /* Trocar capa: a imagem escolhida vira o fundo da faixa do cartao */
  const bt = document.getElementById('capaTrocar'), arq = document.getElementById('capaFile');
  /* o mesmo botao vive em dois lugares: no cartao da home e na capa do perfil */
  const btPerfil = document.getElementById('ppCapaTrocar');
  /* os dois botoes abrem o mesmo modal de recorte, na proporcao da capa */
  if (btPerfil) btPerfil.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); if (typeof ppAvAbrir === 'function') ppAvAbrir('capa'); });
  if (bt && arq){
    /* o cartao inteiro abre o perfil ao clicar: o botao nao pode deixar subir */
    bt.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); if (typeof ppAvAbrir === 'function') ppAvAbrir('capa'); else arq.click(); });
    arq.addEventListener('click', function(e){ e.stopPropagation(); });
    arq.addEventListener('change', function(){
      const f = arq.files && arq.files[0]; if (!f) return;
      const url = URL.createObjectURL(f);
      document.body.style.setProperty('--capa-src', 'url("' + customEndereco(url) + '")'); document.body.style.removeProperty('--capa-pos');
      if (typeof fgToast === 'function') fgToast('Capa atualizada');
      arq.value = '';
    });
  }
})();
