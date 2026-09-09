/* ============ Módulo Inteligência Artificial ============
   A conversa com a IA da rede. Aqui não há modelo nenhum atrás: as respostas
   são escritas à mão e escolhidas por assunto, e o efeito de digitação existe
   para o protótipo ter o mesmo ritmo do produto — quem testa espera ver a
   resposta nascer, não aparecer pronta.

   Quem pergunta não escolhe onde a IA procura: a base vem do que o
   administrador montar para cada tipo de unidade, na tela que o botão
   Gerenciar vai abrir. */

/* ---------------------------------------------------------------- dados --- */

/* As respostas. `k` é o assunto que a pergunta precisa tocar; `blocos` é o
   corpo da resposta: parágrafo ou lista. */
const IA_BASE = [
  {
    k: /chamad|ticket|sla|prazo de atendimento|suporte/,
    blocos: [
      { t:'p', x:'O chamado nasce em <b>Chamados &rarr; Novo chamado</b>. Quem abre escolhe o assunto, e é o assunto que decide para qual fila ele vai e qual prazo passa a valer.' },
      { t:'p', x:'Os prazos em vigor na rede são estes:' },
      { t:'ul', x:[
        '<b>Crítico</b>: 4 horas para a primeira resposta e 1 dia útil para a solução.',
        '<b>Alto</b>: 8 horas úteis para responder e 3 dias úteis para resolver.',
        '<b>Normal</b>: 1 dia útil para responder e 5 dias úteis para resolver.'
      ]},
      { t:'p', x:'O relógio para enquanto o chamado estiver aguardando a unidade, e volta a correr assim que ela responde. O que estoura o prazo aparece no painel de atrasos da matriz no mesmo dia.' }
    ]
  },
  {
    k: /checklist|auditor|vistoria|supervis|nota da loja|plano de a/,
    blocos: [
      { t:'p', x:'A auditoria mensal roda o modelo <b>Padrão de Loja</b>, com 48 itens divididos em cinco blocos:' },
      { t:'ul', x:[
        'Fachada e vitrine: 6 itens',
        'Atendimento e experiência: 12 itens',
        'Estoque e validade: 11 itens',
        'Limpeza e conservação: 9 itens',
        'Documentação e alvarás: 10 itens'
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
        '<b>Convenção SULTS 2026.</b> Encontro geral do time, com trilhas por área e festa de encerramento. Confirmação até 30/09.',
        '<b>Nova trilha de Atendimento 2.0.</b> Já está na Universidade Corporativa, com certificado ao concluir.',
        '<b>Atualização da plataforma v10.4.</b> Melhorias de desempenho no Checklist e novos filtros nos relatórios.'
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
        '1 pessoa ainda não começou. Ela entrou há duas semanas, e o prazo dela conta a partir da admissão'
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
      { t:'p', x:'Procurei na base de conhecimento da rede e não achei nada que responda isso com segurança.' },
      { t:'p', x:'Isso costuma ter dois motivos:' },
      { t:'ul', x:[
        'A pergunta é da rede, mas ficou genérica. Me conte o que você precisa resolver e em que situação, que eu procuro de novo.',
        'O assunto ainda não foi documentado. Nesse caso vale abrir um chamado para a matriz: a resposta vira documento e passa a valer para todo mundo.'
      ]},
      { t:'p', x:'E se for assunto de fora da rede, esse eu não tenho como responder por aqui.' }
    ]
  };
}

function iaResponder(pergunta){
  const q = norm(pergunta);
  return IA_BASE.find(b => b.k.test(q)) || iaRespostaPadrao();
}

/* As conversas guardadas. Só as perguntas ficam salvas: a resposta é montada
   pela mesma função da conversa ao vivo, então as duas nunca divergem. */
/* Cada conversa pertence a uma unidade: de onde se pergunta muda o que se
   pergunta, e trocar de unidade troca a lista inteira. O campo u casa com o
   id em IA_UNIDADES. */
const IA_CONVERSAS = [
  /* Matriz · Sua Marca: as perguntas da rede */
  { id:'m1', u:'matriz', g:'Hoje',            d:0,  h:'09:12', t:'Prazo de SLA dos chamados críticos', p:['Qual é o prazo de SLA para um chamado crítico?'] },
  { id:'m2', u:'matriz', g:'Hoje',            d:0,  h:'08:40', t:'Comunicados da semana',              p:['Resuma os comunicados desta semana'] },
  { id:'m3', u:'matriz', g:'Ontem',           d:1,  h:'16:14', t:'Itens da auditoria mensal',          p:['O que cai na auditoria mensal da loja?'] },
  { id:'m4', u:'matriz', g:'Últimos 7 dias',  d:3,  h:'11:05', t:'Documentos para abrir uma unidade',  p:['Quais documentos preciso para abrir uma unidade nova?'] },

  /* A1 - Academia PHD */
  { id:'a1', u:'873', g:'Hoje',            d:0,  h:'10:05', t:'Trilhas obrigatórias do time',       p:['Quem do meu time ainda não fez as trilhas obrigatórias?'] },
  { id:'a2', u:'873', g:'Últimos 7 dias',  d:4,  h:'08:52', t:'Janela de pedidos e estoque mínimo', p:['Como funciona a janela de pedidos para a matriz?'] },
  { id:'a3', u:'873', g:'Últimos 30 dias', d:19, h:'16:31', t:'Nota de corte da auditoria',         p:['O que cai na auditoria mensal da loja?'] },

  /* Boatlux Marina Sul */
  { id:'b1', u:'412', g:'Ontem',           d:1,  h:'15:02', t:'Chamado crítico da doca',            p:['Qual é o prazo de SLA para um chamado crítico?'] },
  { id:'b2', u:'412', g:'Últimos 7 dias',  d:6,  h:'09:48', t:'Itens de fachada na vistoria',       p:['O que cai na auditoria mensal da loja?'] },

  /* Constance - Centro */
  { id:'c1', u:'205', g:'Hoje',            d:0,  h:'07:40', t:'Comunicados que faltam ler',         p:['Resuma os comunicados desta semana'] },
  { id:'c2', u:'205', g:'Últimos 7 dias',  d:5,  h:'11:26', t:'Mix aprovado e pedido mínimo',       p:['Como funciona a janela de pedidos para a matriz?'] },
  { id:'c3', u:'205', g:'Últimos 30 dias', d:22, h:'14:10', t:'Trilhas do time do balcão',          p:['Quem do meu time ainda não fez as trilhas obrigatórias?'] },

  /* Corpore Fit Barra */
  { id:'f1', u:'158', g:'Últimos 7 dias',  d:3,  h:'10:40', t:'Certificados do ciclo 2026',         p:['Quem do meu time ainda não fez as trilhas obrigatórias?'] },
  { id:'f2', u:'158', g:'Últimos 30 dias', d:21, h:'16:55', t:'Plano de ação da última visita',     p:['O que cai na auditoria mensal da loja?'] },

  /* Sabor & Cia Shopping */
  { id:'s1', u:'061', g:'Ontem',           d:1,  h:'13:20', t:'Prazo para um chamado alto',         p:['Qual é o prazo de SLA para um chamado crítico?'] },
  { id:'s2', u:'061', g:'Últimos 30 dias', d:26, h:'09:05', t:'Documentos da segunda unidade',      p:['Quais documentos preciso para abrir uma unidade nova?'] }
];

/* Quem está usando vem do app, não daqui: o cenário da vez troca a pessoa e
   a unidade, e o módulo só lê. */
function iaEu(){
  let nome = '';
  const cli = (typeof customCliente === 'function') ? customCliente() : null;
  if (cli && cli.pessoa && cli.pessoa.nome) nome = cli.pessoa.nome;
  if (!nome && typeof usuarioAtual === 'function'){ const u = usuarioAtual(); nome = (u && u.nome) || ''; }
  if (!nome){ const el = document.querySelector('.profile-name'); nome = el ? el.textContent.trim() : ''; }
  nome = nome || 'Rodrigo Caetano';
  /* Fora dos cenarios a pessoa fala pela rede, e a unidade e a Matriz. A
     unidade do cartao (Uberaba, Kanto, Queens) so vale dentro deles. */
  const cenario = document.body.classList.contains('demo-custom') ||
                  document.body.classList.contains('demo-crunch');
  const unidade = (cenario && typeof customUnidadeDe === 'function') ? (customUnidadeDe(nome) || '') : '';
  return { nome: nome, unidade: unidade };
}

function iaIniciais(texto){
  const partes = String(texto).split(/[\s·-]+/).filter(Boolean);
  return ((partes[0] || '?')[0] + (partes[1] ? partes[1][0] : '')).toUpperCase();
}

/* As unidades que essa pessoa alcança. A cor e as iniciais saem de STORES,
   a mesma tabela que desenha a unidade nas outras telas, para a bolinha ser
   a mesma em todo lugar. */
const IA_UNIDADES = [
  /* a franqueadora vem primeiro: e de la que se pergunta pela rede inteira */
  { id:'matriz', nome:'Matriz · Sua Marca', cor:'#00acac', ini:'SM' },
  { id:'873', nome:'A1 - Academia PHD' },
  { id:'412', nome:'Boatlux Marina Sul' },
  { id:'205', nome:'Constance - Centro' },
  { id:'158', nome:'Corpore Fit Barra' },
  { id:'061', nome:'Sabor & Cia Shopping' }
].map(u => {
  if (u.cor) return u;
  const s = (typeof STORES !== 'undefined' ? STORES : []).find(x => x.code === u.id);
  u.cor = (s && s.color) || '#5b6672';
  u.ini = (s && s.ini) || '??';
  return u;
});

const IA_SUGESTOES = {
  /* Matriz: perguntas de quem enxerga a rede inteira */
  matriz: [
    { ic:'mdi-clipboard-check-outline', c:'#219348', t:'Quais unidades ficaram abaixo da nota na auditoria?' },
    { ic:'mdi-message-text-outline',    c:'#1d6ede', t:'Quantos chamados estouraram o SLA esta semana?' },
    { ic:'mdi-school-outline',          c:'#6d47b5', t:'Como está a adesão das unidades à trilha nova?' },
    { ic:'mdi-flag-outline',            c:'#2aa17e', t:'Quais unidades estão em implantação e em que etapa?' }
  ],
  /* Unidade: perguntas de quem toca a operação no dia */
  unidade: [
    { ic:'mdi-message-text-outline',    c:'#1d6ede', t:'Como abrir um chamado para a matriz?' },
    { ic:'mdi-cart-outline',            c:'#00918a', t:'Como fazer o pedido mensal para a matriz?' },
    { ic:'mdi-clipboard-check-outline', c:'#219348', t:'Como aplicar o checklist da minha loja?' },
    { ic:'mdi-school-outline',          c:'#6d47b5', t:'Como concluir as trilhas obrigatórias?' }
  ]
};

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

/* A unidade dos cenarios (Kanto, Queens) nao tem conversas proprias nas
   amostras: cai na Matriz, que e a lista da rede. */
function iaUnidadeChave(){
  return IA_CONVERSAS.some(c => c.u === iaUnidade) ? iaUnidade : 'matriz';
}
function iaConvsDaUnidade(){
  const chave = iaUnidadeChave();
  return iaConvs().filter(c => (c.u || 'matriz') === chave);
}
function iaConv(id){ return iaConvs().find(c => c.id === id) || null; }

/* --------------------------------------------------------------- montagem --- */

function iaEscapa(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function iaSaudacao(){
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}

const IA_TRATAMENTOS = ['senhor','senhora','sr','sra','dr','dra','seu','dona'];
function iaPrimeiroNome(){
  const p = iaEu().nome.split(/\s+/);
  const um = (p[0] || '').toLowerCase().replace(/\.$/, '');
  return (IA_TRATAMENTOS.indexOf(um) >= 0 && p[1]) ? p[0] + ' ' + p[1] : p[0];
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
  el.innerHTML = '<div class="ia-resp"><div class="ia-corpo"></div></div>';
  iaThread.appendChild(el);
  return el;
}

/* ---------- quando ----------
   O carimbo entra quando o dia muda, não a cada mensagem: dentro do mesmo dia
   ele viraria ruído. Perto, diz o dia por nome; longe, a data. */

const IA_DIAS = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
let iaDiaNoFio = null;   /* dia do último carimbo já posto no fio */

function iaDataDaConversa(c){
  const d = new Date();
  d.setDate(d.getDate() - (c.d || 0));
  const [hh, mm] = String(c.h || '09:00').split(':');
  d.setHours(+hh, +mm, 0, 0);
  return d;
}

function iaQuando(d){
  const dois = n => String(n).padStart(2, '0');
  const hora = dois(d.getHours()) + ':' + dois(d.getMinutes());
  const so = x => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const dias = Math.round((so(new Date()) - so(d)) / 86400000);
  if (dias <= 0) return 'hoje às ' + hora;
  if (dias === 1) return 'ontem às ' + hora;
  if (dias < 7)  return IA_DIAS[d.getDay()] + ' às ' + hora;
  return dois(d.getDate()) + '/' + dois(d.getMonth() + 1) + '/' + String(d.getFullYear()).slice(2) + ' às ' + hora;
}

function iaCarimbo(d){
  const chave = d.toDateString();
  if (chave === iaDiaNoFio) return;
  iaDiaNoFio = chave;
  const el = document.createElement('div');
  el.className = 'ia-quando';
  el.textContent = iaQuando(d);
  iaThread.appendChild(el);
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
  const lista = iaConvsDaUnidade().filter(c => (iaVerArq ? iaArquivadas.has(c.id) : !iaArquivadas.has(c.id)) && casa(c));

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

/* A lista do drop começa pela unidade de quem está no app. Nos cenários ela
   não é uma das lojas do SULTS (o Pikachu fala de Kanto), então entra na
   frente em vez de sumir. */
function iaUnidades(){
  const minha = iaEu().unidade;
  const lista = IA_UNIDADES.slice();
  if (minha && !lista.some(u => u.nome === minha)){
    lista.unshift({ id:'eu', nome:minha, cor:'var(--marca, var(--teal))', ini:iaIniciais(minha) });
  }
  return lista;
}

function iaUnidadeAtual(){
  const lista = iaUnidades();
  return lista.find(u => u.id === iaUnidade) || lista[0];
}

function iaRenderUsuario(){
  const eu = iaEu();
  const lista = iaUnidades();
  if (!lista.some(u => u.id === iaUnidade)) iaUnidade = lista[0].id;
  $('#iaUserNome').textContent = eu.nome;
  $('#iaUserSub').textContent = iaUnidadeAtual().nome;
  $('#iaUserMenu').innerHTML =
    '<div class="ia-umlbl">Unidade</div>' +
    lista.map(x =>
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
  iaDiaNoFio = null;
  iaThread.innerHTML = '';
  iaThread.hidden = true;
  iaZero.hidden = false;
  $('#iaHead').hidden = true;
  $('#iaDock').hidden = true;
  $('#iaHello').textContent = iaSaudacao() + ', ' + iaPrimeiroNome();
  iaRenderSugestoes();
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
  iaDiaNoFio = null;
  const quando = iaDataDaConversa(c);
  c.p.forEach(pergunta => {
    iaCarimbo(quando);
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
    const agora = new Date();
    const dois = n => String(n).padStart(2, '0');
    const c = {
      id: 'n' + Date.now(),
      u: iaUnidadeChave(),
      g: 'Hoje',
      d: 0,
      h: dois(agora.getHours()) + ':' + dois(agora.getMinutes()),
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
  iaCarimbo(new Date());
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
  iaUnidade = iaEu().unidade ? 'eu' : 'matriz';   /* o cenário manda; fora deles, a Matriz */
  iaRenderUsuario();
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
let vzFluxo = null, vzAudio = null, vzAnalise = null, vzQuadro = null;
const vzNiveis = [];

/* Sem microfone — navegador que não transcreve, permissão negada, máquina sem
   entrada de áudio — a gravação passa a ser simulada, para o fluxo continuar
   demonstrável. A onda é sintetizada e a fala sai desta lista. */
let vzFalso = false, vzAvisou = false, vzTique = 0, vzDitado = 0;
const IA_DITADOS = [
  'Qual é o prazo de SLA para um chamado crítico?',
  'Resuma os comunicados desta semana',
  'O que cai na auditoria mensal da loja?',
  'Quais documentos preciso para abrir uma unidade nova?',
  'Como funciona a janela de pedidos para a matriz?'
];

function vzSimular(){
  if (vzFalso) return;
  vzFalso = true;
  try { vzRec && vzRec.stop(); } catch (x) {}
  vzRec = null;
  if (!vzAvisou){
    vzAvisou = true;
    fgToast('Sem microfone disponível: a gravação está sendo simulada.');
  }
}

/* uma envoltória com ritmo de sílaba e respiros no meio, só para a onda ter
   a cara de fala e não de ruído constante */
function vzNivelFalso(){
  const k = vzTique++;
  const silaba = Math.abs(Math.sin(k * 0.34));
  const frase  = 0.35 + 0.55 * Math.abs(Math.sin(k * 0.045));
  const respiro = Math.sin(k * 0.09) > 0.93 ? 0.12 : 1;
  return Math.min(1, (silaba * frase * respiro) + Math.random() * 0.06);
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
    /* o texto não entra no campo agora: ele aparece de uma vez ao concluir,
       depois do "Transcrevendo…", que é como o modelo funciona */
  };

  vzRec.onerror = e => {
    if (e.error === 'no-speech' || e.error === 'aborted') return;  /* o onend resolve */
    /* sem permissão, sem entrada de áudio ou sem serviço: simula */
    vzSimular();
  };

  vzRec.onend = () => {
    vzFirme += vzSessao;
    vzSessao = '';
    if (vzEstado === 'gravando' && !vzFalso && vzRec){ try { vzRec.start(); } catch (x) {} }
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
  }).catch(() => { /* sem medidor: a onda fica na linha de base */ });
}

function vzDesenhar(){
  const cv = $('#iaRecWave');
  const dpr = window.devicePixelRatio || 1;
  const cx = cv.getContext('2d');
  let dados = null;
  const LARG = 3, VAO = 2;
  let salto = 0;

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

    if (vzEstado === 'gravando' && (salto++ % 3 === 0)){
      if (vzAnalise){
        if (!dados || dados.length !== vzAnalise.frequencyBinCount) dados = new Uint8Array(vzAnalise.frequencyBinCount);
        vzAnalise.getByteTimeDomainData(dados);
        let soma = 0;
        for (let i = 0; i < dados.length; i++){ const v = (dados[i] - 128) / 128; soma += v * v; }
        vzNiveis.push(Math.min(1, Math.sqrt(soma / dados.length) * 3.4));
      } else {
        vzNiveis.push(vzNivelFalso());
      }
      while (vzNiveis.length > cabem) vzNiveis.shift();
    }

    cx.clearRect(0, 0, L, A);
    /* o trecho ainda não gravado é um trilho de pontinhos */
    cx.fillStyle = '#CDD4DB';
    for (let i = 0; i < cabem - vzNiveis.length; i++){
      cx.beginPath();
      cx.arc(i * (LARG + VAO) + LARG / 2, A / 2, 1.4, 0, Math.PI * 2);
      cx.fill();
    }
    /* e o que já entrou vira barra, encostando na direita */
    cx.fillStyle = vzEstado === 'gravando' ? '#5b6672' : '#B8C0C9';
    for (let i = 0; i < vzNiveis.length; i++){
      const h = Math.max(3, vzNiveis[i] * (A - 2));
      const x = L - (vzNiveis.length - i) * (LARG + VAO);
      cx.beginPath();
      cx.roundRect(x, (A - h) / 2, LARG, h, LARG / 2);
      cx.fill();
    }
  }
  quadro();
}

function vzAbrir(){
  if (vzEstado !== 'off') return;
  vzFalso  = false;
  vzTique  = 0;
  vzBase   = iaText.value.trim() ? iaText.value.trim() + ' ' : '';
  vzFirme  = '';
  vzSessao = '';
  vzNiveis.length = 0;
  vzEstado = 'gravando';
  iaText.readOnly = true;          /* o texto é reescrito a cada resultado */
  $('#iaCompRow').hidden = true;
  $('#iaRec').hidden = false;
  $('#iaRec').classList.remove('pausado');
  $('#iaRecPause').innerHTML = '<i class="mdi mdi-pause"></i>';
  $('#iaRecPause').title = 'Pausar';
  $('#iaRec').classList.remove('carregando');
  $('#iaComp').classList.add('gravando');
  if (IA_FALA) vzOuvir(); else vzSimular();
  vzDesenhar();
  vzMedidor();
}

function vzPausar(){
  if (vzEstado === 'gravando'){
    vzEstado = 'pausado';                       /* antes do stop: o onend lê isto */
    try { vzRec && vzRec.stop(); } catch (x) {}
    $('#iaRec').classList.add('pausado');
    $('#iaRecPause').innerHTML = '<i class="mdi mdi-microphone"></i>';
    $('#iaRecPause').title = 'Continuar';
  } else if (vzEstado === 'pausado'){
    vzEstado = 'gravando';
    if (!vzFalso) vzOuvir();
    $('#iaRec').classList.remove('pausado');
    $('#iaRecPause').innerHTML = '<i class="mdi mdi-pause"></i>';
    $('#iaRecPause').title = 'Pausar';
  }
}

/* Concluir para de ouvir e espera o reconhecimento entregar o que ficou
   pendente — é aí que a última frase vira texto. A espera é real, não enfeite;
   o piso de 700ms existe só para o aviso não piscar quando ela é curta. */
function vzConcluir(){
  if (vzEstado === 'off' || vzEstado === 'transcrevendo') return;
  const parado = vzEstado === 'pausado';
  vzEstado = 'transcrevendo';
  $('#iaRec').classList.add('carregando');

  const inicio = Date.now();
  let fechado = false;
  const encerra = () => {
    if (fechado) return;
    fechado = true;
    setTimeout(() => vzFechar(true), Math.max(0, 700 - (Date.now() - inicio)));
  };

  if (vzFalso){
    /* o texto sai da lista; frases curtas para gravações curtas */
    const fala = IA_DITADOS[vzDitado++ % IA_DITADOS.length];
    vzFirme = vzNiveis.length < 40 ? fala.split(' ').slice(0, 5).join(' ') : fala;
    encerra();
    return;
  }
  if (parado || !vzRec){ encerra(); return; }
  vzRec.onend = () => { vzFirme += vzSessao; vzSessao = ''; encerra(); };
  try { vzRec.stop(); } catch (x) { encerra(); }
  setTimeout(encerra, 2500);   /* rede de segurança se o onend não vier */
}

function vzFechar(manter){
  if (vzEstado === 'off') return;
  vzEstado = 'off';
  try { vzRec && vzRec.stop(); } catch (x) {}
  vzRec = null;
  if (vzQuadro){ cancelAnimationFrame(vzQuadro); vzQuadro = null; }
  if (vzFluxo){ vzFluxo.getTracks().forEach(x => x.stop()); vzFluxo = null; }
  if (vzAudio){ try { vzAudio.close(); } catch (x) {} vzAudio = null; }
  vzAnalise = null;
  vzNiveis.length = 0;
  iaText.readOnly = false;
  $('#iaRec').hidden = true;
  $('#iaRec').classList.remove('pausado', 'carregando');
  $('#iaCompRow').hidden = false;
  $('#iaComp').classList.remove('gravando');
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
$('#iaRecOk').addEventListener('click', vzConcluir);
$('#iaRecCancel').addEventListener('click', () => vzFechar(false));
/* fechar o módulo ou trocar de conversa não deixa o microfone ligado */
window.addEventListener('beforeunload', () => vzFechar(false));

/* --------------------------------------------------------------- eventos --- */

function iaRenderSugestoes(){
  const quais = iaUnidadeChave() === 'matriz' ? IA_SUGESTOES.matriz : IA_SUGESTOES.unidade;
  $('#iaChips').innerHTML = quais.map(s =>
    '<button type="button" class="ia-chip" data-iasug="' + iaEscapa(s.t) + '">' +
    '<span class="ia-chip-ic" style="--c:' + s.c + '"><i class="mdi ' + s.ic + '"></i></span>' +
    '<span class="ia-chip-tx"><b>' + iaEscapa(s.t) + '</b></span></button>'
  ).join('');
}
iaRenderSugestoes();

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
  if (u.dataset.iaunidade === iaUnidade){ $('#iaUserMenu').hidden = true; return; }
  iaUnidade = u.dataset.iaunidade;
  fgToast('Unidade: ' + iaUnidadeAtual().nome);
  iaRenderUsuario();
  iaNovaConversa();
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
$('#iaAttach').addEventListener('click', () => fgToast('Anexar arquivo à pergunta: em breve'));
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

iaRenderUsuario();
iaRenderLista();
$('#iaZeroDock').appendChild($('#iaComp'));
