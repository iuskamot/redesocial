/* ===================== Gerenciar da IA =====================
   O administrador monta aqui a base que a conversa consulta. Sete telas irmãs,
   uma acesa por vez, no mesmo esquema do Gerenciar da Rede Social.

   A regra que organiza tudo: a IA responde a partir do que a rede já escreveu,
   com a permissão de quem pergunta. Por isso Fontes vem antes de arquivo
   avulso, Escopos são camadas que se somam, e Perguntas sem resposta é a tela
   que faz a base crescer. */

/* ---------------- as fontes: o que a rede já escreveu ---------------- */
const IAG_FONTES = [
  { id:'com', nome:'Comunicados',              ic:'mdi-bullhorn-outline',        c:'#e0464f', on:true,  n:'248 comunicados',   sync:'hoje às 07:10',
    d:'Tudo que a matriz já publicou para a rede, com a data e o público de cada um.' },
  { id:'uni', nome:'Universidade Corporativa',  ic:'mdi-school-outline',          c:'#6d47b5', on:true,  n:'96 trilhas',        sync:'hoje às 07:10',
    d:'Trilhas, aulas e materiais de apoio. O vídeo entra pela descrição; a transcrição vem depois.' },
  { id:'pro', nome:'Processos',                 ic:'mdi-sitemap-outline',         c:'#575fd1', on:true,  n:'134 documentos',    sync:'ontem às 22:40',
    d:'Os procedimentos escritos da rede. É a fonte mais precisa que existe, porque já nasceu para ser seguida.' },
  { id:'dis', nome:'Disco Virtual',             ic:'mdi-cloud-outline',           c:'#1d6ede', on:true,  n:'1.284 arquivos',    sync:'hoje às 06:55',
    d:'Os arquivos da rede. Cada resposta respeita a permissão de pasta de quem perguntou.' },
  { id:'chk', nome:'Checklist',                 ic:'mdi-clipboard-check-outline', c:'#219348', on:true,  n:'18 modelos',        sync:'hoje às 07:10',
    d:'Os modelos de auditoria e o que cada item cobra. Não entram as respostas das visitas.' },
  { id:'cha', nome:'Chamados resolvidos',       ic:'mdi-message-text-outline',    c:'#2aa17e', on:false, n:'3.910 chamados',   sync:'nunca',
    d:'Respostas antigas viram conhecimento, mas trazem junto o que já mudou. Ligue quando a base estiver madura.' },
  { id:'imp', nome:'Implantação de Unidades',   ic:'mdi-flag-outline',            c:'#c2410c', on:false, n:'42 tarefas-modelo', sync:'nunca',
    d:'O roteiro de abertura de uma unidade nova, etapa por etapa.' }
];

/* ---------------- os escopos: três camadas que se somam ---------------- */
const IAG_CAMADAS = [
  { nivel:0, grupo:'Rede', nome:'Sua Marca', ic:'mdi-earth', c:'#00acac', n:42,
    d:'Vale para todo mundo, da matriz à última unidade. É onde mora quase tudo.' },

  { nivel:1, grupo:'Tipos de unidade', nome:'Academia',  ic:'mdi-dumbbell',      c:'#6d47b5', n:9,  d:'2 unidades neste tipo.' },
  { nivel:1, nome:'Food',      ic:'mdi-silverware-fork-knife', c:'#c2410c', n:12, d:'1 unidade neste tipo.' },
  { nivel:1, nome:'Loja de rua', ic:'mdi-storefront-outline',  c:'#1d6ede', n:7,  d:'2 unidades neste tipo.' },

  { nivel:2, grupo:'Unidades', nome:'A1 - Academia PHD',   ic:'mdi-map-marker-outline', c:'#575fd1', n:4, d:'Alvará, horário e o que só vale nesta loja.' },
  { nivel:2, nome:'Constance - Centro',    ic:'mdi-map-marker-outline', c:'#219348', n:3, d:'Alvará, horário e o que só vale nesta loja.' },
  { nivel:2, nome:'Sabor & Cia Shopping',  ic:'mdi-map-marker-outline', c:'#e0464f', n:4, d:'Alvará, horário e o que só vale nesta loja.' }
];

/* os escopos que um item de conhecimento pode receber */
const IAG_ESCOPOS = [
  { v:'rede',       t:'Rede · Sua Marca',        ic:'mdi-earth' },
  { v:'t:academia', t:'Tipo · Academia',         ic:'mdi-dumbbell' },
  { v:'t:food',     t:'Tipo · Food',             ic:'mdi-silverware-fork-knife' },
  { v:'t:loja',     t:'Tipo · Loja de rua',      ic:'mdi-storefront-outline' },
  { v:'u:873',      t:'Unidade · A1 - Academia PHD',  ic:'mdi-map-marker-outline' },
  { v:'u:205',      t:'Unidade · Constance - Centro', ic:'mdi-map-marker-outline' },
  { v:'u:061',      t:'Unidade · Sabor & Cia Shopping', ic:'mdi-map-marker-outline' }
];

/* ---------------- a base ---------------- */
/* origem: escrito | arquivo | modulo — é o que decide o ícone da linha */
let IAG_BASE = [
  { id:'b1', t:'Prazo de SLA por prioridade de chamado', o:'escrito', of:'Escrito por Rodrigo Caetano', e:'rede',       s:'ativo',      val:'30/06/27', at:'02/09/26' },
  { id:'b2', t:'Padrão de Loja: os 48 itens da auditoria', o:'arquivo', of:'padrao-de-loja-2026.pdf',    e:'rede',       s:'ativo',      val:'31/12/26', at:'28/08/26' },
  { id:'b3', t:'Janela de pedidos e estoque mínimo',     o:'modulo',  of:'Processos',                   e:'rede',       s:'ativo',      val:'30/06/27', at:'01/09/26' },
  { id:'b4', t:'Documentos para abrir uma unidade nova', o:'arquivo', of:'checklist-abertura.docx',     e:'rede',       s:'ativo',      val:'31/03/27', at:'19/08/26' },
  { id:'b5', t:'Layout de fachada para academias',       o:'escrito', of:'Escrito por Marina Alves',    e:'t:academia', s:'ativo',      val:'31/12/26', at:'26/08/26' },
  { id:'b6', t:'Ficha técnica do mix de food',           o:'arquivo', of:'mix-food-v4.xlsx',            e:'t:food',     s:'rascunho',   val:'',          at:'05/09/26' },
  { id:'b7', t:'Horário de funcionamento e feriados',    o:'escrito', of:'Escrito por Paulo Menezes',   e:'u:873',      s:'ativo',      val:'31/12/26', at:'12/08/26' },
  { id:'b8', t:'Tabela de preços sugeridos 2025',        o:'arquivo', of:'precos-2025.xlsx',            e:'rede',       s:'vencido',    val:'31/12/25', at:'14/01/25' },
  { id:'b9', t:'Manual de marca v3',                     o:'arquivo', of:'manual-marca-v3.pdf',         e:'rede',       s:'arquivado',  val:'',          at:'03/07/25' }
];

/* ---------------- quem administra ---------------- */
const IAG_PAPEIS = [
  { id:'usuario', nome:'Usuário',                ic:'mdi-account-outline',        c:'#1d6ede', on:true,
    d:'Pergunta à IA e enxerga as próprias conversas. Não vê a base nem o histórico de ninguém.',
    quem:'Todos com acesso ao módulo · 214 pessoas' },
  { id:'editor',  nome:'Editor de conhecimento', ic:'mdi-text-box-edit-outline',  c:'#6d47b5', on:true,
    d:'Adiciona e edita conhecimento dentro do escopo dele, e responde as perguntas sem resposta.',
    quem:'Consultores de campo, Gestores de rede · 12 pessoas' },
  { id:'admin',   nome:'Administrador da IA',    ic:'mdi-shield-account-outline', c:'#219348', on:true,
    d:'Tudo do editor, mais fontes, escopos, permissões, limites e os relatórios de uso.',
    quem:'3 pessoas' }
];

/* ---------------- lacunas: o que a base ainda não sabe ---------------- */
let IAG_LACUNAS = [
  { id:'l1', p:'Posso vender pelo iFood sem avisar a matriz?',              u:'Sabor & Cia Shopping', q:'há 6 dias', v:8 },
  { id:'l2', p:'Qual o prazo para devolver produto com avaria?',            u:'Constance - Centro',   q:'hoje',      v:9 },
  { id:'l3', p:'Como funciona o rateio da verba de marketing?',             u:'A1 - Academia PHD',    q:'ontem',     v:6 },
  { id:'l4', p:'Qual a meta de NPS da minha unidade neste trimestre?',      u:'Constance - Centro',   q:'hoje',      v:5 },
  { id:'l5', p:'Posso trocar o fornecedor de embalagem por conta própria?', u:'Sabor & Cia Shopping', q:'há 2 dias', v:4 },
  { id:'l6', p:'Quem aprova uma reforma de fachada?',                       u:'Boatlux Marina Sul',   q:'há 3 dias', v:3 },
  { id:'l7', p:'Tem modelo de contrato de estágio?',                        u:'Corpore Fit Barra',    q:'há 5 dias', v:2 }
];

/* ---------------- uso do mês ---------------- */
const IAG_USO = {
  consultas: 4128, limite: 6000, mes: 'setembro de 2026',
  unidades: 5, unidadesTotal: 6, pessoas: 87,
  topUnidades: [
    { n:'Constance - Centro',   v:1204 },
    { n:'A1 - Academia PHD',    v:968 },
    { n:'Sabor & Cia Shopping', v:742 },
    { n:'Corpore Fit Barra',    v:610 },
    { n:'Boatlux Marina Sul',   v:411 }
  ],
  topPerguntas: [
    { n:'Qual é o prazo de SLA para um chamado crítico?', v:186 },
    { n:'O que cai na auditoria mensal da loja?',         v:154 },
    { n:'Como funciona a janela de pedidos?',             v:131 },
    { n:'Quais documentos preciso para abrir uma unidade?', v:98 },
    { n:'Resuma os comunicados desta semana',             v:87 }
  ]
};

/* ================= estado ================= */
let iagTela = 'base';
let iagBaseFiltro = 'ativo';
let iagBaseQ = '';
let iagLacQ = '';
let iagBaseCol = null, iagBaseDir = 0;   /* 0 neutro · 1 crescente · 2 decrescente */
let iagGapId = null;

const IAG_ORIGEM = {
  escrito: { ic:'mdi-text-box-outline',   c:'#00acac' },
  arquivo: { ic:'mdi-file-document-outline', c:'#575fd1' },
  modulo:  { ic:'mdi-transit-connection-variant', c:'#219348' }
};
const IAG_STATUS = { ativo:'Ativo', rascunho:'Rascunho', vencido:'Vencido', arquivado:'Arquivado' };
const IAG_SETAS = { neutro:'mdi-unfold-more-horizontal', cima:'mdi-menu-up', baixo:'mdi-menu-down' };

function iagEscapa(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function iagEscopoTexto(v){
  const e = IAG_ESCOPOS.find(x => x.v === v);
  return e ? e : { t:'Rede · Sua Marca', ic:'mdi-earth' };
}

/* ================= entrar e sair ================= */
/* O botão do cabeçalho é um só e troca de papel, como o "Acessar Social" da
   Rede Social: de um lado leva ao Gerenciar, do outro traz de volta. */
function iagAbrir(){
  const v = document.getElementById('iaView'); if (!v) return;
  v.classList.add('ia-admin');
  iagBotao();
  iagShow(iagTela);
}
function iagFechar(){
  const v = document.getElementById('iaView'); if (!v) return;
  v.classList.remove('ia-admin');
  iagBotao();
}
function iagAlternar(){
  const v = document.getElementById('iaView'); if (!v) return;
  v.classList.contains('ia-admin') ? iagFechar() : iagAbrir();
}
function iagBotao(){
  const b = document.getElementById('iaManage'); if (!b) return;
  const dentro = document.getElementById('iaView').classList.contains('ia-admin');
  b.innerHTML = dentro
    ? '<i class="fa-solid fa-wand-magic-sparkles"></i><span class="lbl">Acessar IA</span>'
    : '<i class="fa-solid fa-gear"></i><span class="lbl">Gerenciar</span>';
  b.title = dentro ? 'Voltar para a conversa' : 'Gerenciar a base de conhecimento';
}

/* ================= o roteador ================= */
const IAG_TELAS = {
  base:    { el:'iagBaseScreen',    render: iagRenderBase },
  fontes:  { el:'iagFontesScreen',  render: iagRenderFontes },
  escopos: { el:'iagEscoposScreen', render: iagRenderEscopos },
  perm:    { el:'iagPermScreen',    render: iagRenderPerm },
  lacunas: { el:'iagLacunasScreen', render: iagRenderLacunas },
  uso:     { el:'iagUsoScreen',     render: iagRenderUso },
  config:  { el:'iagConfigScreen',  render: null }
};
function iagShow(tela){
  if (!IAG_TELAS[tela]) tela = 'base';
  iagTela = tela;
  document.querySelectorAll('.iag-screen').forEach(s => s.classList.remove('active'));
  const alvo = document.getElementById(IAG_TELAS[tela].el);
  if (alvo) alvo.classList.add('active');
  document.querySelectorAll('.iag-item').forEach(b => b.classList.toggle('on', b.dataset.iag === tela));
  if (IAG_TELAS[tela].render) IAG_TELAS[tela].render();
  iagContador();
}
function iagContador(){
  const n = document.getElementById('iagLacN'); if (!n) return;
  n.textContent = IAG_LACUNAS.length;
  n.hidden = !IAG_LACUNAS.length;
}

/* ================= 1. base de conhecimento ================= */
function iagBaseTh(rotulo, col, largura){
  const dir = (iagBaseCol === col) ? iagBaseDir : 0;
  const ic = dir === 1 ? IAG_SETAS.cima : dir === 2 ? IAG_SETAS.baixo : IAG_SETAS.neutro;
  return '<th' + (largura ? ' style="width:' + largura + '"' : '') + '><span class="iag-th"><span>' + rotulo + '</span>' +
    '<button type="button" class="iag-sortbtn" data-iagsort="' + col + '" aria-label="Ordenar por ' + rotulo + '">' +
    '<i class="mdi ' + ic + '"></i></button></span></th>';
}
function iagRenderBase(){
  const el = document.getElementById('iagBaseList'); if (!el) return;
  const q = iagBaseQ.trim().toLowerCase();
  let lista = IAG_BASE.filter(b => (iagBaseFiltro === 'todos' || b.s === iagBaseFiltro))
                      .filter(b => !q || b.t.toLowerCase().includes(q) || b.of.toLowerCase().includes(q));
  if (iagBaseDir){
    const d = iagBaseDir === 1 ? 1 : -1;
    lista = lista.slice().sort((a, b) => {
      if (iagBaseCol === 'titulo') return d * a.t.localeCompare(b.t);
      if (iagBaseCol === 'escopo') return d * iagEscopoTexto(a.e).t.localeCompare(iagEscopoTexto(b.e).t);
      if (iagBaseCol === 'validade') return d * (a.val || '').split('/').reverse().join('').localeCompare((b.val || '').split('/').reverse().join(''));
      return d * (a.at || '').split('/').reverse().join('').localeCompare((b.at || '').split('/').reverse().join(''));
    });
  }
  if (!lista.length){
    el.innerHTML = '<div class="iag-vazio"><b>' +
      (q ? 'Nada com esse nome' : 'Nada aqui ainda') + '</b>' +
      (q ? 'Tente outro termo ou troque o filtro.' : 'Use "Adicionar conhecimento" para começar.') + '</div>';
    return;
  }
  const linhas = lista.map(b => {
    const o = IAG_ORIGEM[b.o] || IAG_ORIGEM.escrito;
    const e = iagEscopoTexto(b.e);
    return '<tr>' +
      '<td><div class="iag-item2"><span class="iag-ic" style="--c:' + o.c + '"><i class="mdi ' + o.ic + '"></i></span>' +
        '<div class="iag-item2-tx"><b title="' + iagEscapa(b.t) + '">' + iagEscapa(b.t) + '</b><span>' + iagEscapa(b.of) + '</span></div></div></td>' +
      '<td><span class="iag-esc"><i class="mdi ' + e.ic + '"></i>' + iagEscapa(e.t) + '</span></td>' +
      '<td><span class="iag-chip ' + b.s + '">' + IAG_STATUS[b.s] + '</span></td>' +
      '<td style="white-space:nowrap">' + (b.val || '—') + '</td>' +
      '<td style="white-space:nowrap">' + b.at + '</td>' +
      '<td><div class="iag-acts">' +
        '<button type="button" class="iag-bt" data-iagedit="' + b.id + '"><i class="mdi mdi-pencil-outline"></i> Editar</button>' +
        (b.s === 'arquivado'
          ? '<button type="button" class="iag-bt" data-iagrestaura="' + b.id + '"><i class="mdi mdi-archive-arrow-up-outline"></i> Restaurar</button>'
          : '<button type="button" class="iag-bt perigo" data-iagarq="' + b.id + '"><i class="mdi mdi-archive-arrow-down-outline"></i> Arquivar</button>') +
      '</div></td></tr>';
  }).join('');
  el.innerHTML = '<table><thead><tr>' +
    iagBaseTh('Conhecimento (' + lista.length + ')', 'titulo') +
    iagBaseTh('Escopo', 'escopo', '172px') +
    '<th style="width:100px">Status</th>' +
    iagBaseTh('Vale até', 'validade', '104px') +
    iagBaseTh('Atualizado', 'atualizado', '110px') +
    '<th style="width:208px;text-align:center">Ações</th>' +
    '</tr></thead><tbody>' + linhas + '</tbody></table>';
}

/* ================= 2. fontes ================= */
function iagRenderFontes(){
  const el = document.getElementById('iagFontesGrid'); if (!el) return;
  el.innerHTML = IAG_FONTES.map(f =>
    '<div class="iag-card">' +
      '<span class="iag-card-ic" style="--c:' + f.c + '"><i class="mdi ' + f.ic + '"></i></span>' +
      '<label class="nv-toggle iag-cardtog"><input type="checkbox" data-iagfonte="' + f.id + '"' + (f.on ? ' checked' : '') + '>' +
        '<span class="nv-tk"></span><span class="tgtxt">' + (f.on ? 'Ativa' : 'Inativa') + '</span></label>' +
      '<h3>' + iagEscapa(f.nome) + '</h3>' +
      '<p>' + iagEscapa(f.d) + '</p>' +
      '<div class="iag-card-pe"><i class="mdi mdi-database-outline"></i><b>' + f.n + '</b>' +
        '<span style="flex:1"></span>Sincronizado ' + f.sync + '</div>' +
    '</div>'
  ).join('');
}

/* ================= 3. escopos ================= */
function iagRenderEscopos(){
  const el = document.getElementById('iagEscoposLista'); if (!el) return;
  el.innerHTML = IAG_CAMADAS.map(c =>
    (c.grupo ? '<div class="iag-grp" style="color:#8a94a0;padding:10px 0 2px">' + c.grupo + '</div>' : '') +
    '<div class="iag-camada' + (c.nivel ? ' n' + c.nivel : '') + '">' +
      '<span class="iag-camada-ic" style="--c:' + c.c + '"><i class="mdi ' + c.ic + '"></i></span>' +
      '<div class="iag-camada-tx"><b>' + iagEscapa(c.nome) + '</b><span>' + iagEscapa(c.d) + '</span></div>' +
      '<div class="iag-camada-n"><b>' + c.n + '</b>itens</div>' +
    '</div>'
  ).join('');
}

/* ================= 4. permissões ================= */
function iagRenderPerm(){
  const el = document.getElementById('iagPermGrid'); if (!el) return;
  el.innerHTML = IAG_PAPEIS.map(p =>
    '<div class="iag-card">' +
      '<span class="iag-card-ic" style="--c:' + p.c + '"><i class="mdi ' + p.ic + '"></i></span>' +
      '<label class="nv-toggle iag-cardtog"><input type="checkbox" data-iagpapel="' + p.id + '"' + (p.on ? ' checked' : '') + '>' +
        '<span class="nv-tk"></span><span class="tgtxt">' + (p.on ? 'Ativo' : 'Inativo') + '</span></label>' +
      '<h3>' + iagEscapa(p.nome) + '</h3>' +
      '<p>' + iagEscapa(p.d) + '</p>' +
      '<div class="iag-card-pe"><i class="mdi mdi-account-group-outline"></i><b>' + iagEscapa(p.quem) + '</b>' +
        '<span style="flex:1"></span>' +
        '<button type="button" class="iag-bt" style="height:30px;font-size:13px" data-iagquem="' + p.id + '">Definir quem</button></div>' +
    '</div>'
  ).join('');
}

/* ================= 5. perguntas sem resposta ================= */
function iagRenderLacunas(){
  const el = document.getElementById('iagLacList'); if (!el) return;
  const q = iagLacQ.trim().toLowerCase();
  const lista = IAG_LACUNAS.filter(l => !q || l.p.toLowerCase().includes(q) || l.u.toLowerCase().includes(q));
  if (!lista.length){
    el.innerHTML = '<div class="iag-vazio"><b>' + (q ? 'Nada com esse nome' : 'Nenhuma lacuna aberta') + '</b>' +
      (q ? 'Tente outro termo.' : 'Toda pergunta feita este mês encontrou resposta na base.') + '</div>';
    return;
  }
  const linhas = lista.map(l =>
    '<tr>' +
      '<td><div class="iag-item2"><span class="iag-ic" style="--c:#E8A33D"><i class="mdi mdi-comment-question-outline"></i></span>' +
        '<div class="iag-item2-tx"><b>' + iagEscapa(l.p) + '</b><span>' + iagEscapa(l.u) + '</span></div></div></td>' +
      '<td style="white-space:nowrap">' + iagEscapa(l.q) + '</td>' +
      '<td style="white-space:nowrap"><b style="font-weight:700;color:#5b6672">' + l.v + '</b> vezes</td>' +
      '<td><div class="iag-acts">' +
        '<button type="button" class="iag-bt forte" data-iagresp="' + l.id + '"><i class="mdi mdi-check"></i> Responder e salvar</button>' +
        '<button type="button" class="iag-bt" data-iagdescarta="' + l.id + '"><i class="mdi mdi-close"></i> Descartar</button>' +
      '</div></td></tr>'
  ).join('');
  el.innerHTML = '<table><thead><tr>' +
    '<th>Pergunta (' + lista.length + ')</th>' +
    '<th style="width:126px">Última vez</th>' +
    '<th style="width:118px">Frequência</th>' +
    '<th style="width:322px;text-align:center">Ações</th>' +
    '</tr></thead><tbody>' + linhas + '</tbody></table>';
}

/* ================= 6. uso ================= */
function iagRenderUso(){
  const el = document.getElementById('iagUsoBox'); if (!el) return;
  const u = IAG_USO;
  const pct = Math.min(100, Math.round(u.consultas / u.limite * 100));
  const barras = lista => {
    const topo = Math.max.apply(null, lista.map(x => x.v)) || 1;
    return lista.map(x =>
      '<div class="iag-lin2"><span class="nome">' + iagEscapa(x.n) + '</span>' +
      '<span style="flex:none;width:88px;height:6px;border-radius:999px;background:#E9EAED;overflow:hidden">' +
      '<span style="display:block;height:100%;width:' + Math.round(x.v / topo * 100) + '%;background:var(--teal);border-radius:999px"></span></span>' +
      '<span class="qtd">' + x.v.toLocaleString('pt-BR') + '</span></div>'
    ).join('');
  };
  el.innerHTML =
    '<p class="iag-lead">A conta é de consultas, não de tokens: o que a rede compra é resposta. ' +
      'Ao bater o limite a matriz continua respondendo e a unidade recebe o caminho do chamado.</p>' +
    '<div class="iag-numeros">' +
      '<div class="iag-num"><span>Consultas em ' + u.mes + '</span>' +
        '<b>' + u.consultas.toLocaleString('pt-BR') + ' <span style="display:inline;font-size:15px;font-weight:400;color:#8a94a0;text-transform:none;letter-spacing:0">de ' + u.limite.toLocaleString('pt-BR') + '</span></b>' +
        '<div class="iag-barra' + (pct >= 80 ? ' alerta' : '') + '"><span style="width:' + pct + '%"></span></div>' +
        '<small>' + pct + '% do bolo do mês. A matriz é avisada em 80%.</small></div>' +
      '<div class="iag-num"><span>Unidades ativas</span><b>' + u.unidades + '</b><small>de ' + u.unidadesTotal + ' na rede</small></div>' +
      '<div class="iag-num"><span>Pessoas que perguntaram</span><b>' + u.pessoas + '</b><small>no mês</small></div>' +
      '<div class="iag-num"><span>Perguntas sem resposta</span><b>' + IAG_LACUNAS.length + '</b><small>o que falta escrever</small></div>' +
    '</div>' +
    '<div class="iag-duas">' +
      '<div class="iag-lista"><h3>Unidades que mais usam</h3>' + barras(u.topUnidades) + '</div>' +
      '<div class="iag-lista"><h3>Perguntas mais frequentes</h3>' + barras(u.topPerguntas) + '</div>' +
    '</div>';
}

/* ================= modais ================= */
function iagOpcoesEscopo(sel){
  return IAG_ESCOPOS.map(e => '<option value="' + e.v + '"' + (e.v === sel ? ' selected' : '') + '>' + e.t + '</option>').join('');
}
let iagEditId = null;
function iagAddAbrir(id){
  iagEditId = id || null;
  const b = id ? IAG_BASE.find(x => x.id === id) : null;
  document.getElementById('iagAddTitulo').textContent = b ? 'Editar conhecimento' : 'Escrever conhecimento';
  document.getElementById('iagAddTit').value = b ? b.t : '';
  document.getElementById('iagAddTxt').value = b ? 'Conteúdo já gravado para este item. Edite à vontade.' : '';
  document.getElementById('iagAddEsc').innerHTML = iagOpcoesEscopo(b ? b.e : 'rede');
  document.getElementById('iagAddModal').classList.add('open');
  setTimeout(() => document.getElementById('iagAddTit').focus(), 40);
}
function iagAddFechar(){ document.getElementById('iagAddModal').classList.remove('open'); }

function iagGapAbrir(id){
  const l = IAG_LACUNAS.find(x => x.id === id); if (!l) return;
  iagGapId = id;
  document.getElementById('iagGapPerg').innerHTML =
    '<b>A pergunta que ficou sem resposta</b><p>' + iagEscapa(l.p) + '</p>' +
    '<small>' + iagEscapa(l.u) + ' · ' + l.v + ' vezes · última ' + iagEscapa(l.q) + '</small>';
  document.getElementById('iagGapTxt').value = '';
  document.getElementById('iagGapEsc').innerHTML = iagOpcoesEscopo('rede');
  document.getElementById('iagGapModal').classList.add('open');
  setTimeout(() => document.getElementById('iagGapTxt').focus(), 40);
}
function iagGapFechar(){ document.getElementById('iagGapModal').classList.remove('open'); iagGapId = null; }

/* ================= eventos =================
   Um listener só no documento: as tabelas e os cartões são reescritos por
   innerHTML a cada render, então prender listener em cada botão não sobreviveria. */
document.addEventListener('click', e => {
  /* ----- navegação ----- */
  const nav = e.target.closest('.iag-item');
  if (nav){ iagShow(nav.dataset.iag); return; }

  /* ----- o menu de adicionar ----- */
  const abre = e.target.closest('#iagAdd');
  const menu = document.getElementById('iagAddMenu');
  if (abre && menu){ menu.hidden = !menu.hidden; return; }
  if (menu && !menu.hidden && !e.target.closest('#iagAddMenu')) menu.hidden = true;

  const novo = e.target.closest('[data-iagnovo]');
  if (novo){
    if (menu) menu.hidden = true;
    const tipo = novo.dataset.iagnovo;
    if (tipo === 'escrever') iagAddAbrir();
    else if (tipo === 'arquivo') fgToast('Enviar arquivo: PDF, Word, Excel e PowerPoint entram nesta etapa.');
    else { iagShow('fontes'); fgToast('Ligue aqui o módulo que deve alimentar a base.'); }
    return;
  }

  /* ----- ordenação da base ----- */
  const ord = e.target.closest('[data-iagsort]');
  if (ord){
    const col = ord.dataset.iagsort;
    if (iagBaseCol !== col){ iagBaseCol = col; iagBaseDir = 1; }
    else if (iagBaseDir === 1) iagBaseDir = 2;
    else { iagBaseCol = null; iagBaseDir = 0; }
    iagRenderBase();
    return;
  }

  /* ----- ações da base ----- */
  const ed = e.target.closest('[data-iagedit]');
  if (ed){ iagAddAbrir(ed.dataset.iagedit); return; }
  const arq = e.target.closest('[data-iagarq]');
  if (arq){
    const b = IAG_BASE.find(x => x.id === arq.dataset.iagarq);
    if (b){ b.s = 'arquivado'; b.val = ''; iagRenderBase(); fgToast('Arquivado. Ele sai das respostas, mas continua no histórico.'); }
    return;
  }
  const res = e.target.closest('[data-iagrestaura]');
  if (res){
    const b = IAG_BASE.find(x => x.id === res.dataset.iagrestaura);
    if (b){ b.s = 'rascunho'; iagRenderBase(); fgToast('Restaurado como rascunho. Defina a validade antes de ativar.'); }
    return;
  }

  /* ----- lacunas ----- */
  const resp = e.target.closest('[data-iagresp]');
  if (resp){ iagGapAbrir(resp.dataset.iagresp); return; }
  const desc = e.target.closest('[data-iagdescarta]');
  if (desc){
    IAG_LACUNAS = IAG_LACUNAS.filter(l => l.id !== desc.dataset.iagdescarta);
    iagRenderLacunas(); iagContador();
    fgToast('Descartada. Se voltarem a perguntar, ela reaparece.');
    return;
  }

  /* ----- permissões ----- */
  const quem = e.target.closest('[data-iagquem]');
  if (quem){ fgToast('Escolher perfis e escopo deste papel entra na próxima etapa.'); return; }

  /* ----- ajuda ----- */
  const aj = e.target.closest('[data-iagajuda]');
  if (aj){ fgToast(aj.dataset.iagajuda); return; }

  /* ----- modal: escrever ----- */
  if (e.target.closest('#iagAddClose') || e.target.closest('#iagAddCancel') || e.target === document.getElementById('iagAddModal')){
    iagAddFechar(); return;
  }
  if (e.target.closest('#iagAddSave')){
    const tit = document.getElementById('iagAddTit').value.trim();
    const txt = document.getElementById('iagAddTxt').value.trim();
    if (!tit){ document.getElementById('iagAddTit').focus(); return; }
    if (!txt){ document.getElementById('iagAddTxt').focus(); return; }
    const esc = document.getElementById('iagAddEsc').value;
    const val = iagDataBR(document.getElementById('iagAddVal').value);
    if (iagEditId){
      const b = IAG_BASE.find(x => x.id === iagEditId);
      if (b){ b.t = tit; b.e = esc; b.val = val; b.s = b.s === 'arquivado' ? 'ativo' : b.s; }
      fgToast('Conhecimento atualizado');
    } else {
      IAG_BASE.unshift({ id:'n' + IAG_BASE.length + Math.round(performance.now()), t:tit, o:'escrito',
        of:'Escrito por ' + iagEu(), e:esc, s:'ativo', val:val, at:iagHoje() });
      iagBaseFiltro = 'ativo';
      const sel = document.getElementById('iagBaseFiltro'); if (sel) sel.value = 'ativo';
      fgToast('Está na base. A próxima pergunta sobre isso já usa esta resposta.');
    }
    iagAddFechar(); iagRenderBase();
    return;
  }

  /* ----- modal: responder lacuna ----- */
  if (e.target.closest('#iagGapClose') || e.target.closest('#iagGapCancel') || e.target === document.getElementById('iagGapModal')){
    iagGapFechar(); return;
  }
  if (e.target.closest('#iagGapSave')){
    const txt = document.getElementById('iagGapTxt').value.trim();
    if (!txt){ document.getElementById('iagGapTxt').focus(); return; }
    const l = IAG_LACUNAS.find(x => x.id === iagGapId);
    if (l){
      IAG_BASE.unshift({ id:'g' + l.id, t:l.p, o:'escrito', of:'Escrito por ' + iagEu(),
        e:document.getElementById('iagGapEsc').value, s:'ativo',
        val:iagDataBR(document.getElementById('iagGapVal').value), at:iagHoje() });
      IAG_LACUNAS = IAG_LACUNAS.filter(x => x.id !== l.id);
    }
    iagGapFechar(); iagRenderLacunas(); iagContador();
    fgToast('Virou conhecimento. Quem perguntar de novo já recebe a resposta.');
    return;
  }

  /* ----- salvar configurações ----- */
  if (e.target.closest('#iagCfgSalvar')){ fgToast('Configurações salvas'); return; }
});

/* os toggles avisam o que mudou e acertam a palavra ao lado */
document.addEventListener('change', e => {
  const f = e.target.closest('[data-iagfonte]');
  if (f){
    const fonte = IAG_FONTES.find(x => x.id === f.dataset.iagfonte);
    if (fonte){
      fonte.on = f.checked;
      const tx = f.parentElement.querySelector('.tgtxt'); if (tx) tx.textContent = fonte.on ? 'Ativa' : 'Inativa';
      fgToast(fonte.on ? fonte.nome + ' passa a alimentar a base' : fonte.nome + ' sai da base');
    }
    return;
  }
  const p = e.target.closest('[data-iagpapel]');
  if (p){
    const papel = IAG_PAPEIS.find(x => x.id === p.dataset.iagpapel);
    if (papel){
      papel.on = p.checked;
      const tx = p.parentElement.querySelector('.tgtxt'); if (tx) tx.textContent = papel.on ? 'Ativo' : 'Inativo';
    }
    return;
  }
  /* os toggles das configurações só trocam a palavra */
  const t = e.target.closest('.iag-tog input');
  if (t){
    const tx = t.parentElement.querySelector('.tgtxt');
    if (tx && tx.textContent !== 'Sempre') tx.textContent = t.checked ? 'Ativo' : 'Inativo';
  }
});

/* filtros e buscas */
document.addEventListener('input', e => {
  if (e.target.id === 'iagBaseBusca'){ iagBaseQ = e.target.value; iagRenderBase(); }
  if (e.target.id === 'iagLacBusca'){ iagLacQ = e.target.value; iagRenderLacunas(); }
});
document.addEventListener('change', e => {
  if (e.target.id === 'iagBaseFiltro'){ iagBaseFiltro = e.target.value; iagRenderBase(); }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const a = document.getElementById('iagAddModal'), g = document.getElementById('iagGapModal');
  if (a && a.classList.contains('open')) iagAddFechar();
  else if (g && g.classList.contains('open')) iagGapFechar();
});

/* ================= apoio ================= */
/* dd/mm/aa a partir do valor de um <input type="date"> */
function iagDataBR(iso){
  if (!iso) return '';
  const p = iso.split('-');
  return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0].slice(2) : '';
}
function iagHoje(){
  const d = new Date(), z = n => String(n).padStart(2, '0');
  return z(d.getDate()) + '/' + z(d.getMonth() + 1) + '/' + String(d.getFullYear()).slice(2);
}
/* quem está assinando: a mesma identidade que a conversa usa */
function iagEu(){
  return (typeof iaEu === 'function') ? iaEu().nome : 'Rodrigo Caetano';
}

/* deixa a porta aberta para uma página própria do Gerenciar */
window.abrirGerenciarIA = function(){
  if (typeof abrirModuloIA === 'function') abrirModuloIA();
  iagAbrir();
};
