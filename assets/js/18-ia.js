/* ============ Módulo Inteligência Artificial ============
   A conversa com a IA da rede. Aqui não há modelo nenhum atrás: as respostas
   são escritas à mão e escolhidas por assunto, e o efeito de digitação existe
   para o protótipo ter o mesmo ritmo do produto — quem testa espera ver a
   resposta nascer, não aparecer pronta.

   Quem pergunta não escolhe onde a IA procura: a base vem do que o
   administrador montar para cada tipo de unidade, na tela que o botão
   Gerenciar vai abrir. */

/* ---------------------------------------------------------------- dados --- */

/* quantos documentos a base tem — vira dado do administrador depois */
const IA_DOCS = 128;

/* As respostas. `k` é o assunto que a pergunta precisa tocar; `blocos` é o
   corpo da resposta: parágrafo ou lista. */
const IA_BASE = [
  {
    k: /chamad|ticket|sla|prazo de atendimento|suporte/,
    blocos: [
      { t:'p', x:'O chamado nasce em <b>Chamados &rarr; Novo chamado</b>. Quem abre escolhe o assunto, e é o assunto que decide para qual fila ele vai e qual prazo passa a valer.' },
      { t:'p', x:'Os prazos em vigor na rede são estes:' },
      { t:'ul', x:[
        '<b>Crítico</b> &mdash; 4 horas para a primeira resposta e 1 dia útil para a solução.',
        '<b>Alto</b> &mdash; 8 horas úteis para responder e 3 dias úteis para resolver.',
        '<b>Normal</b> &mdash; 1 dia útil para responder e 5 dias úteis para resolver.'
      ]},
      { t:'p', x:'O relógio para enquanto o chamado estiver aguardando a unidade, e volta a correr assim que ela responde. O que estoura o prazo aparece no painel de atrasos da matriz no mesmo dia.' }
    ]
  },
  {
    k: /checklist|auditor|vistoria|supervis|nota da loja|plano de a/,
    blocos: [
      { t:'p', x:'A auditoria mensal roda o modelo <b>Padrão de Loja</b>, com 48 itens divididos em cinco blocos:' },
      { t:'ul', x:[
        'Fachada e vitrine &mdash; 6 itens',
        'Atendimento e experiência &mdash; 12 itens',
        'Estoque e validade &mdash; 11 itens',
        'Limpeza e conservação &mdash; 9 itens',
        'Documentação e alvarás &mdash; 10 itens'
      ]},
      { t:'p', x:'A nota de corte é <b>85%</b>. Abaixo disso o sistema abre um plano de ação com prazo de 15 dias, já com o responsável da unidade no topo. Item marcado como crítico reprova a visita sozinho, mesmo que a média feche acima do corte.' }
    ]
  },
  {
    k: /nova unidade|abrir.*unidade|implanta|invent|inaugur|abertura/,
    blocos: [
      { t:'p', x:'A abertura corre em <b>Implantação de Unidades</b>, em quatro etapas encadeadas: viabilidade, obra, treinamento e inauguração. Cada etapa só libera a seguinte quando todas as tarefas obrigatórias estão concluídas.' },
      { t:'p', x:'Os documentos que a etapa de viabilidade exige são:' },
      { t:'ul', x:[
        'Contrato social e cartão CNPJ da nova operação',
        'Contrato de locação assinado, com a planta do ponto',
        'Alvará de funcionamento e licença sanitária, quando o ramo pedir',
        'Termo de adesão à franquia, assinado pelos sócios'
      ]},
      { t:'p', x:'O prazo médio da rede entre a assinatura e a inauguração é de <b>112 dias</b>. As unidades que atrasam quase sempre param na licença sanitária, então vale começar por ela.' }
    ]
  },
  {
    k: /comunicad|aviso|novidade|semana|n[aã]o li/,
    blocos: [
      { t:'p', x:'Saíram três comunicados para a sua unidade nesta semana:' },
      { t:'ul', x:[
        '<b>Convenção SULTS 2026</b> &mdash; encontro geral do time, com trilhas por área e festa de encerramento. Confirmação até 30/09.',
        '<b>Nova trilha: Atendimento 2.0</b> &mdash; disponível na Universidade Corporativa, com certificado ao concluir.',
        '<b>Atualização da plataforma v10.4</b> &mdash; melhorias de desempenho no Checklist e novos filtros nos relatórios.'
      ]},
      { t:'p', x:'Você ainda não abriu a trilha <b>Atendimento 2.0</b>, e ela é obrigatória para quem atende balcão. O prazo termina em 20/09.' }
    ]
  },
  {
    k: /treinament|universidade|trilha|curso|certific/,
    blocos: [
      { t:'p', x:'A sua unidade tem <b>4 trilhas obrigatórias</b> no ciclo de 2026. Três estão concluídas; falta a <b>Atendimento 2.0</b>, com prazo em 20/09.' },
      { t:'p', x:'O time da unidade está assim:' },
      { t:'ul', x:[
        '9 de 12 pessoas concluíram todas as trilhas do cargo',
        '2 estão em andamento, ambas na trilha nova',
        '1 pessoa ainda não começou &mdash; entrou há duas semanas e o prazo dela conta a partir da admissão'
      ]},
      { t:'p', x:'O certificado sai sozinho quando a pessoa fecha a avaliação com 70% ou mais, e vai para o perfil dela na rede.' }
    ]
  },
  {
    k: /estoque|pedido|compra|fornecedor|reposi|mix/,
    blocos: [
      { t:'p', x:'O pedido à matriz sai por <b>Compras &rarr; Novo pedido</b>, sempre dentro do mix aprovado para o seu tipo de unidade. Item fora do mix precisa de liberação da matriz antes de entrar no carrinho.' },
      { t:'ul', x:[
        'A janela de pedidos abre toda segunda e fecha na quarta às 18h.',
        'O pedido mínimo é de R$ 1.200 por fornecedor.',
        'A entrega prevista é de 7 a 12 dias úteis, conforme a região.'
      ]},
      { t:'p', x:'Hoje há <b>3 itens</b> abaixo do estoque mínimo na sua unidade. Eles já entram sugeridos quando você abre o pedido.' }
    ]
  }
];

/* Quando nada casa: uma resposta honesta, que diz onde procurou e o que achou. */
function iaRespostaPadrao(){
  return {
    blocos: [
      { t:'p', x:'Procurei nos <b>' + IA_DOCS + ' documentos</b> da base de conhecimento da rede e não achei nada que responda isso com segurança.' },
      { t:'p', x:'O que dá para fazer agora:' },
      { t:'ul', x:[
        'Refazer a pergunta com o nome do módulo ou do documento &mdash; a busca fica bem mais precisa.',
        'Abrir um chamado para a matriz, que aí a resposta vira documento e passa a valer para a rede toda.'
      ]},
      { t:'p', x:'Se quiser, me conte o que você precisa resolver e eu indico por onde começar.' }
    ]
  };
}

function iaResponder(pergunta){
  const q = norm(pergunta);
  return IA_BASE.find(b => b.k.test(q)) || iaRespostaPadrao();
}

/* As conversas guardadas. Só as perguntas ficam salvas: a resposta é montada
   pela mesma função da conversa ao vivo, então as duas nunca divergem. */
const IA_CONVERSAS = [
  { id:'c1', g:'Hoje',            t:'Prazo de SLA dos chamados críticos', p:['Qual é o prazo de SLA para um chamado crítico?'] },
  { id:'c2', g:'Hoje',            t:'Comunicados da semana',              p:['Resuma os comunicados desta semana'] },
  { id:'c3', g:'Ontem',           t:'Itens da auditoria mensal',          p:['O que cai na auditoria mensal da loja?'] },
  { id:'c4', g:'Últimos 7 dias',  t:'Documentos para abrir uma unidade',  p:['Quais documentos preciso para abrir uma unidade nova?'] },
  { id:'c5', g:'Últimos 7 dias',  t:'Trilhas obrigatórias do time',       p:['Quem do meu time ainda não fez as trilhas obrigatórias?'] },
  { id:'c6', g:'Últimos 30 dias', t:'Janela de pedidos e estoque mínimo', p:['Como funciona a janela de pedidos para a matriz?'] }
];

/* Quem está usando */
const IA_PESSOA = { nome:'Rodrigo Caetano' };

/* As unidades que essa pessoa alcança. A cor e as iniciais saem de STORES,
   a mesma tabela que desenha a unidade nas outras telas, para a bolinha ser
   a mesma em todo lugar. */
const IA_UNIDADES = [
  { id:'873', nome:'A1 - Academia PHD' },
  { id:'412', nome:'Boatlux Marina Sul' },
  { id:'205', nome:'Constance - Centro' },
  { id:'158', nome:'Corpore Fit Barra' },
  { id:'061', nome:'Sabor & Cia Shopping' }
].map(u => {
  const s = (typeof STORES !== 'undefined' ? STORES : []).find(x => x.code === u.id);
  u.cor = (s && s.color) || '#5b6672';
  u.ini = (s && s.ini) || '??';
  return u;
});

const IA_SUGESTOES = [
  { ic:'mdi-message-text-outline',    c:'#1d6ede', t:'Qual é o prazo de SLA para um chamado crítico?' },
  { ic:'mdi-clipboard-check-outline', c:'#219348', t:'O que cai na auditoria mensal da loja?' },
  { ic:'mdi-bullhorn-outline',        c:'#575fd1', t:'Resuma os comunicados desta semana' },
  { ic:'mdi-flag-outline',            c:'#2aa17e', t:'Quais documentos preciso para abrir uma unidade?' }
];

/* ---------------------------------------------------------------- estado --- */

const iaView   = $('#iaView');
const iaThread = $('#iaThread');
const iaZero   = $('#iaZero');
const iaScroll = $('#iaScroll');
const iaText   = $('#iaText');
const iaSend   = $('#iaSend');

let iaAtual    = null;       /* id da conversa aberta, ou null no estado inicial */
let iaFiltro   = '';         /* busca na coluna das conversas */
let iaArquivadas = new Set();/* ids fora da lista principal */
let iaVerArq   = false;      /* a seção "Arquivadas" está aberta? */
let iaMenuAlvo = null;       /* conversa cujo menu de linha está aberto */
let iaUnidade  = '873';      /* unidade em uso */
let iaNovas    = [];         /* conversas criadas nesta sessão */
let iaEscrevendo = null;     /* controle da resposta que está sendo digitada */

function iaConvs(){ return iaNovas.concat(IA_CONVERSAS); }
function iaConv(id){ return iaConvs().find(c => c.id === id) || null; }

/* --------------------------------------------------------------- montagem --- */

function iaEscapa(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function iaSaudacao(){
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}

/* o primeiro nome de quem está logado — muda junto com o cliente da vez */
function iaPrimeiroNome(){
  const el = document.querySelector('#topUserChip .uname');
  const nome = (el && el.textContent.trim()) || 'por aqui';
  return nome.split(/\s+/)[0];
}

function iaBlocosHTML(blocos){
  return blocos.map(b => b.t === 'ul'
    ? '<ul>' + b.x.map(i => '<li>' + i + '</li>').join('') + '</ul>'
    : '<p>' + b.x + '</p>').join('');
}

function iaAcoesHTML(){
  return '<div class="ia-acts">' +
    '<button type="button" class="ia-act" data-iact="copiar"><i class="mdi mdi-content-copy"></i> Copiar</button>' +
    '<button type="button" class="ia-act" data-iact="refazer"><i class="mdi mdi-refresh"></i> Refazer</button>' +
    '</div>';
}

function iaAddPergunta(txt){
  const el = document.createElement('div');
  el.className = 'ia-msg eu';
  el.innerHTML = '<div class="ia-bolha">' + iaEscapa(txt) + '</div>';
  iaThread.appendChild(el);
  return el;
}

/* a casca da resposta: marca da IA à esquerda e o corpo, vazio, à direita */
function iaAddResposta(){
  const el = document.createElement('div');
  el.className = 'ia-msg ia';
  el.innerHTML = '<div class="ia-resp"><span class="ia-mark" aria-hidden="true"></span><div class="ia-corpo"></div></div>';
  iaThread.appendChild(el);
  return el;
}

function iaRolar(){
  iaScroll.scrollTop = iaScroll.scrollHeight;
}

/* ------------------------------------------------------------- digitação ---
   O bloco entra pronto no DOM e depois é revelado caractere a caractere pelos
   nós de texto. Fatiar a string cortaria as tags no meio; percorrer os nós
   preserva qualquer marcação. */

function iaDigita(corpo, resp, aoTerminar){
  const cursor = document.createElement('span');
  cursor.className = 'ia-cursor';
  let bi = 0, timer = null;

  function encerra(){
    if (timer) clearInterval(timer);
    timer = null;
    cursor.remove();
    iaEscrevendo = null;
    aoTerminar && aoTerminar();
  }

  /* o botão Parar e o fim natural caem os dois aqui: o que falta aparece
     inteiro, sem deixar a resposta pela metade */
  function completa(){
    if (timer) clearInterval(timer);
    timer = null;
    corpo.innerHTML = iaBlocosHTML(resp.blocos);
    encerra();
  }

  function proximo(){
    if (bi >= resp.blocos.length) return encerra();
    const b = resp.blocos[bi++];
    if (b.t === 'ul'){
      const ul = document.createElement('ul');
      corpo.appendChild(ul);
      let li = 0;
      (function item(){
        if (li >= b.x.length) return proximo();
        const el = document.createElement('li');
        ul.appendChild(el);
        revela(el, b.x[li++], item);
      })();
    } else {
      const p = document.createElement('p');
      corpo.appendChild(p);
      revela(p, b.x, proximo);
    }
  }

  function revela(el, html, fim){
    el.innerHTML = html;
    const nos = [];
    (function anda(n){
      Array.prototype.forEach.call(n.childNodes, c => {
        if (c.nodeType === 3){ nos.push({ no:c, txt:c.nodeValue }); c.nodeValue = ''; }
        else anda(c);
      });
    })(el);
    el.appendChild(cursor);
    let ni = 0, ci = 0;
    timer = setInterval(() => {
      let passos = 4;
      while (passos-- > 0){
        if (ni >= nos.length){ clearInterval(timer); timer = null; return fim(); }
        const n = nos[ni];
        if (ci >= n.txt.length){ ni++; ci = 0; continue; }
        ci++;
        n.no.nodeValue = n.txt.slice(0, ci);
      }
      iaRolar();
    }, 18);
  }

  iaEscrevendo = { completa: completa };
  proximo();
}

/* ------------------------------------------------------------- conversas --- */

function iaLinhaHTML(c){
  return '<div class="ia-linha' + (c.id === iaAtual ? ' on' : '') + '" data-ialinha="' + c.id + '">' +
    '<button type="button" class="ia-conv" data-iaconv="' + c.id + '">' +
      '<span class="ia-conv-cx"><span class="ia-conv-tx">' + iaEscapa(c.t) + '</span></span>' +
    '</button>' +
    '<button type="button" class="ia-convmais" data-iamais="' + c.id + '" title="Mais ações" aria-label="Mais ações">' +
      '<i class="mdi mdi-dots-horizontal"></i></button>' +
  '</div>';
}

/* A lista mostra uma coisa de cada vez: as conversas ou o arquivo. Misturar
   as duas no mesmo rolamento não escala — com milhares de conversas o arquivo
   ficaria a um quilômetro do fim da lista. */
function iaRenderLista(){
  const q = norm(iaFiltro.trim());
  const casa = c => !q || norm(c.t).includes(q);
  const lista = iaConvs().filter(c => (iaVerArq ? iaArquivadas.has(c.id) : !iaArquivadas.has(c.id)) && casa(c));

  let out = '', grupo = null;
  lista.forEach(c => {
    if (c.g !== grupo){ grupo = c.g; out += '<div class="ia-grp">' + iaEscapa(grupo) + '</div>'; }
    out += iaLinhaHTML(c);
  });
  if (!lista.length){
    out += '<div class="ia-vazio">' + (
      q ? '<b>Nenhuma conversa com esse nome</b>'
        : iaVerArq ? '<b>Nada arquivado por aqui</b><span>Arquivar tira a conversa da lista sem apagar nada.</span>'
                   : '<b>Ainda não há conversas</b><span>Faça a primeira pergunta ali ao lado.</span>') + '</div>';
  }
  $('#iaList').innerHTML = out;

  /* as duas entradas marcam a visão aberta; a busca diz onde está procurando */
  $('#iaArqBtn').classList.toggle('on', iaVerArq);
  $('#iaTodasBtn').classList.toggle('on', !iaVerArq);
  $('#iaFind').placeholder = iaVerArq ? 'Buscar nas arquivadas' : 'Buscar conversa';

  iaMedeTitulos();
}

/* ---------- perfil e unidade, no pé da coluna ---------- */

function iaUnidadeAtual(){ return IA_UNIDADES.find(u => u.id === iaUnidade) || IA_UNIDADES[0]; }

function iaRenderUsuario(){
  $('#iaUserNome').textContent = IA_PESSOA.nome;
  $('#iaUserSub').textContent = iaUnidadeAtual().nome;
  $('#iaUserMenu').innerHTML =
    '<div class="ia-umlbl">Unidade</div>' +
    IA_UNIDADES.map(x =>
      '<button type="button" data-iaunidade="' + x.id + '"' + (x.id === iaUnidade ? ' class="on"' : '') + '>' +
        '<span class="ia-umav" style="background:' + x.cor + '">' + iaEscapa(x.ini) + '</span>' +
        '<span class="ia-umtx"><b>' + iaEscapa(x.nome) + '</b></span>' +
        '<i class="mdi mdi-check-circle"></i></button>').join('');
}

/* Quanto falta para o título caber: é esse valor que o hover desliza, e a
   duração acompanha a distância para o passeio ter sempre o mesmo ritmo. */
function iaMedeTitulos(){
  requestAnimationFrame(() => {
    $$('#iaList .ia-linha').forEach(b => {
      const tx = b.querySelector('.ia-conv-tx');
      if (!tx) return;
      const sobra = tx.scrollWidth - tx.clientWidth;
      if (sobra <= 2) return;
      b.classList.add('corta');
      b.style.setProperty('--desl', (-sobra) + 'px');
      b.style.setProperty('--dur', Math.max(0.6, sobra / 45).toFixed(2) + 's');
    });
  });
}

/* ---------- renomear, arquivar e excluir ---------- */

function iaExcluir(id){
  iaNovas = iaNovas.filter(c => c.id !== id);
  const i = IA_CONVERSAS.findIndex(c => c.id === id);
  if (i >= 0) IA_CONVERSAS.splice(i, 1);
  iaArquivadas.delete(id);
  if (iaAtual === id) iaNovaConversa(); else iaRenderLista();
  fgToast('Conversa excluída');
}

function iaArquivar(id){
  const guardar = !iaArquivadas.has(id);
  if (guardar) iaArquivadas.add(id); else iaArquivadas.delete(id);
  if (guardar && iaAtual === id) iaNovaConversa(); else iaRenderLista();
  fgToast(guardar ? 'Conversa arquivada' : 'Conversa desarquivada');
}

/* Renomear acontece na própria linha: a linha vira campo, o Enter confirma e
   o Esc desiste. Sem caixa de diálogo para uma edição de duas palavras. */
function iaRenomear(id){
  const conv = iaConv(id);
  const linha = document.querySelector('[data-ialinha="' + id + '"]');
  if (!conv || !linha || linha.querySelector('.ia-ren')) return;
  const cx = linha.querySelector('.ia-conv-cx');
  const antes = conv.t;
  cx.innerHTML = '<input class="ia-ren" type="text" maxlength="80">';
  const campo = cx.querySelector('.ia-ren');
  campo.value = antes;
  campo.focus();
  campo.select();
  let fechado = false;
  function fecha(salvar){
    if (fechado) return;
    fechado = true;
    const novo = campo.value.trim();
    if (salvar && novo && novo !== antes){
      conv.t = novo;
      if (iaAtual === id) $('#iaHeadTt').textContent = novo;
      fgToast('Conversa renomeada');
    }
    iaRenderLista();
  }
  campo.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.key === 'Enter'){ e.preventDefault(); fecha(true); }
    else if (e.key === 'Escape'){ e.preventDefault(); fecha(false); }
  });
  campo.addEventListener('blur', () => fecha(true));
  campo.addEventListener('click', e => e.stopPropagation());
}

function iaAcao(nome, id){
  if (nome === 'excluir') return iaExcluir(id);
  if (nome === 'arquivar') return iaArquivar(id);
  if (nome === 'renomear') return iaRenomear(id);
}

/* volta ao estado inicial: saudação, compositor no meio e sugestões */
function iaNovaConversa(){
  if (iaEscrevendo) iaEscrevendo.completa();
  iaAtual = null;
  iaVerArq = false;
  iaView.classList.add('ia-inicio');
  iaThread.innerHTML = '';
  iaThread.hidden = true;
  iaZero.hidden = false;
  $('#iaHead').hidden = true;
  $('#iaDock').hidden = true;
  $('#iaHello').textContent = iaSaudacao() + ', ' + iaPrimeiroNome();
  $('#iaZeroDock').appendChild($('#iaComp'));
  iaRenderLista();
  iaText.value = '';
  iaAltura();
  iaBotao();
  setTimeout(() => iaText.focus(), 40);
}

/* tira o compositor do centro e prende no rodapé */
function iaModoConversa(titulo){
  iaView.classList.remove('ia-inicio');
  iaZero.hidden = true;
  iaThread.hidden = false;
  $('#iaHead').hidden = false;
  $('#iaHeadTt').textContent = titulo;
  $('#iaDock').hidden = false;
  $('#iaDock').appendChild($('#iaComp'));
}

function iaAbrirConversa(id){
  const c = iaConv(id);
  if (!c) return;
  if (iaEscrevendo) iaEscrevendo.completa();
  iaAtual = id;
  iaModoConversa(c.t);
  iaThread.innerHTML = '';
  c.p.forEach(pergunta => {
    iaAddPergunta(pergunta);
    const el = iaAddResposta();
    const resp = iaResponder(pergunta);
    el.querySelector('.ia-corpo').innerHTML = iaBlocosHTML(resp.blocos) + iaAcoesHTML();
  });
  iaRenderLista();
  iaScroll.scrollTop = 0;
}

/* uma pergunta nova: cria a conversa se ainda não houver e responde */
function iaPerguntar(txt){
  const pergunta = String(txt || '').trim();
  if (!pergunta || iaEscrevendo) return;

  if (!iaAtual){
    const c = {
      id: 'n' + Date.now(),
      g: 'Hoje',
      t: pergunta.length > 42 ? pergunta.slice(0, 42).trim() + '…' : pergunta,
      p: []
    };
    iaNovas.unshift(c);
    iaAtual = c.id;
    iaModoConversa(c.t);
  }
  const conv = iaConv(iaAtual);
  conv.p.push(pergunta);

  iaText.value = '';
  iaAltura();
  iaAddPergunta(pergunta);
  iaRenderLista();

  /* os três pontinhos enquanto a resposta não começa */
  const msg = iaAddResposta();
  const corpo = msg.querySelector('.ia-corpo');
  corpo.innerHTML = '<div class="ia-pensando"><span></span><span></span><span></span></div>';
  iaBotao();
  iaRolar();

  setTimeout(() => {
    corpo.innerHTML = '';
    const resp = iaResponder(pergunta);
    iaDigita(corpo, resp, () => {
      corpo.insertAdjacentHTML('beforeend', iaAcoesHTML());
      iaBotao();
      iaRolar();
    });
    iaBotao();
  }, 620);
}

/* ------------------------------------------------------------ compositor --- */

function iaAltura(){
  iaText.style.height = 'auto';
  const cheio = iaText.scrollHeight;
  iaText.style.height = Math.min(cheio, 190) + 'px';
  iaText.style.overflowY = cheio > 190 ? 'auto' : 'hidden';
}

/* enquanto escreve, o botão vira Parar */
function iaBotao(){
  if (iaEscrevendo){
    iaSend.disabled = false;
    iaSend.classList.add('parar');
    iaSend.innerHTML = '<i class="mdi mdi-stop"></i>';
    iaSend.setAttribute('aria-label', 'Parar a resposta');
  } else {
    iaSend.classList.remove('parar');
    iaSend.innerHTML = '<i class="mdi mdi-arrow-up"></i>';
    iaSend.setAttribute('aria-label', 'Enviar pergunta');
    iaSend.disabled = !iaText.value.trim();
  }
}

/* ------------------------------------------------------ abrir e fechar --- */

function iaAbrirModulo(pergunta){
  if (typeof closeStories === 'function') closeStories();
  if (typeof closeForum === 'function') closeForum();
  if (typeof closeNewsModule === 'function') closeNewsModule();
  iaView.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (typeof setNav === 'function') setNav(null);
  iaNovaConversa();
  if (pergunta) setTimeout(() => iaPerguntar(pergunta), 90);
}
window.abrirModuloIA = iaAbrirModulo;

function iaFecharModulo(){
  if (typeof vzFechar === 'function') vzFechar(false);
  if (iaEscrevendo) iaEscrevendo.completa();
  iaView.classList.remove('open');
  document.body.style.overflow = '';
}


/* ============ Ditar ============
   A transcrição é de verdade: quem ouve é a API de fala do próprio navegador,
   em pt-BR, e o texto vai caindo no campo enquanto a pessoa fala. O medidor ao
   lado é um segundo fluxo do microfone, só para desenhar o que está entrando —
   sem ele a barra ficaria parada e ninguém saberia se o microfone pegou.

   Um aviso honesto: no Chrome essa API manda o áudio para o servidor da Google
   para reconhecer. Em produção isso vira o serviço de transcrição da própria
   rede; aqui serve para o protótipo funcionar sem back-end. */

const IA_FALA = window.SpeechRecognition || window.webkitSpeechRecognition;

let vzEstado  = 'off';   /* off | gravando | pausado */
let vzRec     = null;    /* o reconhecedor da vez */
let vzBase    = '';      /* o que já estava escrito antes de gravar */
let vzFirme   = '';      /* o transcrito consolidado das sessões anteriores */
let vzSessao  = '';      /* o consolidado da sessão em curso */
let vzT0 = 0, vzAcum = 0, vzRelogio = null;
let vzFluxo = null, vzAudio = null, vzAnalise = null, vzQuadro = null;
const vzNiveis = [];

function vzTexto(interim){
  const bruto = vzBase + vzFirme + vzSessao + (interim || '');
  iaText.value = bruto.replace(/\s+/g, ' ').replace(/^ /, '');
  iaAltura();
  iaBotao();
}

/* uma sessão de escuta. O Chrome encerra sozinho depois de um tempo calado,
   então o fim de uma sessão abre a seguinte enquanto o estado for "gravando" */
function vzOuvir(){
  vzRec = new IA_FALA();
  vzRec.lang = 'pt-BR';
  vzRec.continuous = true;
  vzRec.interimResults = true;
  vzSessao = '';

  vzRec.onresult = e => {
    let firme = '', interim = '';
    for (let i = 0; i < e.results.length; i++){
      const r = e.results[i];
      if (r.isFinal) firme += r[0].transcript;
      else interim += r[0].transcript;
    }
    vzSessao = firme;
    vzTexto(interim);
  };

  vzRec.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed'){
      fgToast('Permita o microfone no navegador para ditar.');
      vzFechar(false);
    } else if (e.error === 'no-speech' || e.error === 'aborted'){
      /* silêncio ou parada nossa: o onend resolve */
    } else {
      fgToast('Não consegui ouvir agora (' + e.error + ').');
      vzFechar(false);
    }
  };

  vzRec.onend = () => {
    vzFirme += vzSessao;
    vzSessao = '';
    if (vzEstado === 'gravando'){ try { vzRec.start(); } catch (x) {} }
  };

  try { vzRec.start(); } catch (x) {}
}

/* o medidor: um segundo fluxo do microfone, só para a onda */
function vzMedidor(){
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  navigator.mediaDevices.getUserMedia({ audio:true }).then(fluxo => {
    if (vzEstado === 'off'){ fluxo.getTracks().forEach(x => x.stop()); return; }
    vzFluxo = fluxo;
    vzAudio = new (window.AudioContext || window.webkitAudioContext)();
    vzAnalise = vzAudio.createAnalyser();
    vzAnalise.fftSize = 512;
    vzAudio.createMediaStreamSource(fluxo).connect(vzAnalise);
    vzDesenhar();
  }).catch(() => { /* sem medidor: a onda fica na linha de base */ });
}

function vzDesenhar(){
  const cv = $('#iaRecWave');
  const dpr = window.devicePixelRatio || 1;
  const cx = cv.getContext('2d');
  const dados = new Uint8Array(vzAnalise.frequencyBinCount);
  const LARG = 3, VAO = 2;

  function quadro(){
    vzQuadro = requestAnimationFrame(quadro);
    const cai = cv.getBoundingClientRect();
    if (!cai.width) return;
    if (cv.width !== Math.round(cai.width * dpr)){
      cv.width  = Math.round(cai.width * dpr);
      cv.height = Math.round(cai.height * dpr);
    }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const L = cai.width, A = cai.height, cabem = Math.floor(L / (LARG + VAO));

    if (vzEstado === 'gravando'){
      vzAnalise.getByteTimeDomainData(dados);
      let soma = 0;
      for (let i = 0; i < dados.length; i++){ const v = (dados[i] - 128) / 128; soma += v * v; }
      vzNiveis.push(Math.min(1, Math.sqrt(soma / dados.length) * 3.4));
      while (vzNiveis.length > cabem) vzNiveis.shift();
    }

    cx.clearRect(0, 0, L, A);
    cx.fillStyle = vzEstado === 'pausado' ? '#C6CDD5' : '#00acac';
    for (let i = 0; i < vzNiveis.length; i++){
      const h = Math.max(2, vzNiveis[i] * (A - 2));
      const x = L - (vzNiveis.length - i) * (LARG + VAO);
      cx.beginPath();
      cx.roundRect(x, (A - h) / 2, LARG, h, LARG / 2);
      cx.fill();
    }
  }
  quadro();
}

function vzMarcar(liga){
  clearInterval(vzRelogio);
  vzRelogio = null;
  const pinta = () => {
    const s = Math.floor((vzAcum + (liga ? Date.now() - vzT0 : 0)) / 1000);
    $('#iaRecTime').textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };
  if (liga){ vzT0 = Date.now(); pinta(); vzRelogio = setInterval(pinta, 250); }
  else pinta();
}

function vzAbrir(){
  if (vzEstado !== 'off') return;
  if (!IA_FALA){ fgToast('Este navegador não transcreve voz. Use o Chrome ou o Edge.'); return; }
  vzBase   = iaText.value.trim() ? iaText.value.trim() + ' ' : '';
  vzFirme  = '';
  vzSessao = '';
  vzAcum   = 0;
  vzNiveis.length = 0;
  vzEstado = 'gravando';
  iaText.readOnly = true;          /* o texto é reescrito a cada resultado */
  $('#iaCompRow').hidden = true;
  $('#iaRec').hidden = false;
  $('#iaRec').classList.remove('pausado');
  $('#iaRecPause').innerHTML = '<i class="mdi mdi-pause"></i>';
  $('#iaRecPause').title = 'Pausar';
  $('#iaComp').classList.add('gravando');
  vzMarcar(true);
  vzOuvir();
  vzMedidor();
}

function vzPausar(){
  if (vzEstado === 'gravando'){
    vzEstado = 'pausado';                       /* antes do stop: o onend lê isto */
    vzAcum += Date.now() - vzT0;
    vzMarcar(false);
    try { vzRec && vzRec.stop(); } catch (x) {}
    $('#iaRec').classList.add('pausado');
    $('#iaRecPause').innerHTML = '<i class="mdi mdi-microphone"></i>';
    $('#iaRecPause').title = 'Continuar';
  } else if (vzEstado === 'pausado'){
    vzEstado = 'gravando';
    vzMarcar(true);
    vzOuvir();
    $('#iaRec').classList.remove('pausado');
    $('#iaRecPause').innerHTML = '<i class="mdi mdi-pause"></i>';
    $('#iaRecPause').title = 'Pausar';
  }
}

function vzFechar(manter){
  if (vzEstado === 'off') return;
  vzEstado = 'off';
  try { vzRec && vzRec.stop(); } catch (x) {}
  vzRec = null;
  clearInterval(vzRelogio); vzRelogio = null;
  if (vzQuadro){ cancelAnimationFrame(vzQuadro); vzQuadro = null; }
  if (vzFluxo){ vzFluxo.getTracks().forEach(x => x.stop()); vzFluxo = null; }
  if (vzAudio){ try { vzAudio.close(); } catch (x) {} vzAudio = null; }
  vzAnalise = null;
  vzNiveis.length = 0;
  iaText.readOnly = false;
  $('#iaRec').hidden = true;
  $('#iaRec').classList.remove('pausado');
  $('#iaCompRow').hidden = false;
  $('#iaComp').classList.remove('gravando');
  $('#iaRecTime').textContent = '0:00';
  if (manter){
    iaText.value = (vzBase + vzFirme + vzSessao).replace(/\s+/g, ' ').trim();
  } else {
    iaText.value = vzBase.trim();
  }
  vzBase = vzFirme = vzSessao = '';
  iaAltura();
  iaBotao();
  if (manter) iaText.focus();
}

$('#iaMic').addEventListener('click', vzAbrir);
$('#iaRecPause').addEventListener('click', vzPausar);
$('#iaRecOk').addEventListener('click', () => vzFechar(true));
$('#iaRecCancel').addEventListener('click', () => vzFechar(false));
/* fechar o módulo ou trocar de conversa não deixa o microfone ligado */
window.addEventListener('beforeunload', () => vzFechar(false));

/* --------------------------------------------------------------- eventos --- */

$('#iaChips').innerHTML = IA_SUGESTOES.map(s =>
  '<button type="button" class="ia-chip" data-iasug="' + iaEscapa(s.t) + '">' +
  '<span class="ia-chip-ic" style="--c:' + s.c + '"><i class="mdi ' + s.ic + '"></i></span>' +
  '<span class="ia-chip-tx"><b>' + iaEscapa(s.t) + '</b></span></button>'
).join('');

iaText.addEventListener('input', () => { iaAltura(); iaBotao(); });
iaText.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); if (!iaEscrevendo) iaPerguntar(iaText.value); }
});
iaSend.addEventListener('click', () => {
  if (iaEscrevendo){ iaEscrevendo.completa(); iaBotao(); return; }
  iaPerguntar(iaText.value);
});

$('#iaNew').addEventListener('click', iaNovaConversa);
$('#iaTodasBtn').addEventListener('click', () => { if (iaVerArq){ iaVerArq = false; iaRenderLista(); } });
$('#iaArqBtn').addEventListener('click', () => { if (!iaVerArq){ iaVerArq = true; iaRenderLista(); } });

$('#iaUser').addEventListener('click', e => {
  e.stopPropagation();
  const m = $('#iaUserMenu');
  m.hidden = !m.hidden;
  $('#iaUser').setAttribute('aria-expanded', String(!m.hidden));
});
$('#iaUserMenu').addEventListener('click', e => {
  const u = e.target.closest('[data-iaunidade]');
  if (!u) return;
  iaUnidade = u.dataset.iaunidade;
  fgToast('Unidade: ' + iaUnidadeAtual().nome);
  iaRenderUsuario();
  $('#iaUserMenu').hidden = true;
  $('#iaUser').setAttribute('aria-expanded', 'false');
});
$('#iaFind').addEventListener('input', e => { iaFiltro = e.target.value; iaRenderLista(); });
$('#iaList').addEventListener('click', e => {
  const mais = e.target.closest('[data-iamais]');
  if (mais){ e.stopPropagation(); iaAbreMenuLinha(mais, mais.dataset.iamais); return; }
  const b = e.target.closest('[data-iaconv]');
  if (b) iaAbrirConversa(b.dataset.iaconv);
});

/* o menu da linha é posicionado na hora: fica preso à tela, não à lista */
function iaAbreMenuLinha(botao, id){
  const m = $('#iaRowMenu');
  if (!m.hidden && iaMenuAlvo === id){ iaFechaMenuLinha(); return; }
  iaFechaMenuLinha();
  iaMenuAlvo = id;
  const arquivada = iaArquivadas.has(id);
  const alvo = m.querySelector('[data-iar="arquivar"]');
  alvo.innerHTML = arquivada
    ? '<i class="mdi mdi-archive-arrow-up-outline"></i> Desarquivar'
    : '<i class="mdi mdi-archive-arrow-down-outline"></i> Arquivar';
  m.hidden = false;
  const r = botao.getBoundingClientRect();
  const alt = m.offsetHeight, larg = m.offsetWidth;
  m.style.left = Math.min(r.left, window.innerWidth - larg - 12) + 'px';
  m.style.top = (r.bottom + 6 + alt > window.innerHeight ? r.top - alt - 6 : r.bottom + 6) + 'px';
  botao.closest('.ia-linha').classList.add('menu-on');
}

function iaFechaMenuLinha(){
  $('#iaRowMenu').hidden = true;
  iaMenuAlvo = null;
  $$('#iaList .ia-linha.menu-on').forEach(l => l.classList.remove('menu-on'));
}

$('#iaRowMenu').addEventListener('click', e => {
  const b = e.target.closest('[data-iar]');
  if (!b) return;
  const id = iaMenuAlvo;
  iaFechaMenuLinha();
  iaAcao(b.dataset.iar, id);
});
$('#iaList').addEventListener('scroll', iaFechaMenuLinha);
$('#iaChips').addEventListener('click', e => {
  const b = e.target.closest('[data-iasug]');
  if (b) iaPerguntar(b.dataset.iasug);
});
$('#iaApps').addEventListener('click', iaFecharModulo);
$('#iaLogo').addEventListener('click', iaFecharModulo);
$('#iaManage').addEventListener('click', () => fgToast('Gerenciar entra na próxima etapa: é onde o administrador monta a base de conhecimento de cada tipo de unidade.'));
$('#iaAttach').addEventListener('click', () => fgToast('Anexar arquivo à pergunta — em breve'));
$('#iaShare').addEventListener('click', () => fgToast('Link da conversa copiado'));

$('#iaMore').addEventListener('click', e => {
  e.stopPropagation();
  const m = $('#iaMenu');
  m.hidden = !m.hidden;
});
$('#iaMenu').addEventListener('click', e => {
  const b = e.target.closest('[data-iam]');
  if (!b || !iaAtual) return;
  $('#iaMenu').hidden = true;
  iaAcao(b.dataset.iam, iaAtual);
});

/* copiar, polegares e refazer */
iaThread.addEventListener('click', e => {
  const b = e.target.closest('[data-iact]');
  if (!b) return;
  const msg = b.closest('.ia-msg');
  const acao = b.dataset.iact;
  if (acao === 'copiar'){
    const corpo = msg.querySelector('.ia-corpo').cloneNode(true);
    const lixo = corpo.querySelector('.ia-acts'); if (lixo) lixo.remove();
    const txt = corpo.textContent.replace(/\n{3,}/g, '\n\n').trim();
    if (navigator.clipboard) navigator.clipboard.writeText(txt);
    fgToast('Resposta copiada');
  } else if (acao === 'refazer'){
    const pergunta = msg.previousElementSibling && msg.previousElementSibling.querySelector('.ia-bolha');
    if (!pergunta || iaEscrevendo) return;
    const corpo = msg.querySelector('.ia-corpo');
    corpo.innerHTML = '<div class="ia-pensando"><span></span><span></span><span></span></div>';
    iaBotao();
    setTimeout(() => {
      corpo.innerHTML = '';
      const resp = iaResponder(pergunta.textContent);
      iaDigita(corpo, resp, () => {
        corpo.insertAdjacentHTML('beforeend', iaAcoesHTML());
        iaBotao();
      });
      iaBotao();
    }, 500);
  }
});

document.addEventListener('click', e => {
  if (!e.target.closest('.ia-menuwrap')) $('#iaMenu').hidden = true;
  if (!e.target.closest('.ia-rowmenu') && !e.target.closest('[data-iamais]')) iaFechaMenuLinha();
  if (!e.target.closest('.ia-userwrap')){ $('#iaUserMenu').hidden = true; $('#iaUser').setAttribute('aria-expanded','false'); }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && iaView.classList.contains('open')){
    if (vzEstado !== 'off'){ vzFechar(false); return; }
    if (!$('#iaUserMenu').hidden){ $('#iaUserMenu').hidden = true; return; }
    if (!$('#iaRowMenu').hidden){ iaFechaMenuLinha(); return; }
    if (!$('#iaMenu').hidden){ $('#iaMenu').hidden = true; return; }
    iaFecharModulo();
  }
});

$('#tileIA') && $('#tileIA').addEventListener('click', e => { e.preventDefault(); iaAbrirModulo(); });
$('#navIA') && $('#navIA').addEventListener('click', e => { e.preventDefault(); iaAbrirModulo(); });

iaRenderUsuario();
iaRenderLista();
$('#iaZeroDock').appendChild($('#iaComp'));
