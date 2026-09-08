/* =====================================================================
   BUILD — monta o index.html e as páginas a partir dos pedaços.

       node build.js

   A FONTE são os pedaços:

       head.html       o <head> compartilhado (metas e libs externas)
       assets/css/     as folhas, na ordem numérica
       screens/        os fragmentos de markup, na ordem numérica
       assets/js/      os scripts, na ordem numérica

   O index.html é SAÍDA, não fonte. Não edite ele à mão: rode o build.
   É isso que permite duas pessoas mexerem em telas diferentes sem
   disputar o mesmo arquivo.

   O que sai:

       index.html      tudo embutido, abre direto do disco (file://)
       home.html …     uma por tela, leem os pedaços com fetch
   ===================================================================== */
const fs = require('fs');
const path = require('path');

const RAIZ = __dirname;
const ler = p => fs.readFileSync(path.join(RAIZ, p), 'utf8');
const listar = d => fs.readdirSync(path.join(RAIZ, d))
  .filter(f => /\.(css|js|html)$/.test(f)).sort();

const CSS   = listar('assets/css');
const TELAS = listar('screens');
const JS    = listar('assets/js');
const CABECA = ler('head.html').replace(/\n$/, '');

/* Nas folhas os url() apontam para ../../uploads, porque resolvem a partir
   de assets/css/. Embutidos no index.html eles resolvem da raiz. */
const paraRaiz = css => css.replace(/url\((['"]?)\.\.\/\.\.\//g, 'url($1');

/* ---------------------------------------------------------- index.html ---
   Um arquivo só: o CSS num <style>, o markup direto no body e o JS num
   <script>. O JS precisa ser um bloco único — função declarada num arquivo
   é usada antes disso em outro (04-perfil registra 'crOpen', declarada em
   12-wizard), e só o hoisting de um script único resolve. */
function monolito() {
  const estilo = CSS.map(f => paraRaiz(ler('assets/css/' + f))).join('\n');
  const markup = TELAS.map(f => ler('screens/' + f)).join('\n');
  const script = JS.map(f =>
    '/* ===================== assets/js/' + f + ' ===================== */\n' + ler('assets/js/' + f)
  ).join('\n');

  return [
    CABECA,
    '<style>',
    estilo.replace(/\n$/, ''),
    '</style>',
    '</head>',
    '<body>',
    '',
    markup.replace(/\n$/, ''),
    '',
    '<script>',
    script.replace(/\n$/, ''),
    '<\/script>',
    '</body>',
    '</html>',
    ''
  ].join('\n');
}

/* ------------------------------------------------------------- páginas ---
   arquivo, título, o que rodar depois que a aplicação sobe */
const PAGINAS = [
  ['home.html',          'SULTS | Home',           null],
  ['rede-social.html',   'SULTS | Rede Social',    "abrirModuloSocial('feed')"],
  ['shorts.html',        'SULTS | Shorts',         "abrirModuloSocial('shorts')"],
  ['publicacoes.html',   'SULTS | Publicações',    "abrirModuloSocial('list')"],
  ['configuracoes.html', 'SULTS | Configurações',  "openNewsModule(); newsShow('params')"],
  ['categorias.html',    'SULTS | Categorias',     "openNewsModule(); newsShow('cats')"],
  ['administradores.html','SULTS | Equipe administrativa', "openNewsModule(); newsShow('team')"],
  ['permissoes.html',    'SULTS | Permissões',     "openNewsModule(); newsShow('perm')"],
  ['forum.html',         'SULTS | Fórum',          'openForum()'],
];

const lista = arr => arr.map(f => "    '" + f + "',").join('\n');

function pagina(titulo, abrir) {
  const cabeca = CABECA.replace(/<title>[^<]*<\/title>/, '<title>' + titulo + '</title>');
  const passoAbrir = abrir
    ? `
      /* Esta página abre direto nesta tela. A chamada vai depois do boot
         porque só aí as funções existem. */
      try { ${abrir}; } catch (e) { console.warn('não abriu a tela:', e); }`
    : '';

  return cabeca + '\n' +
`
<!-- GERADO POR build.js — não edite à mão. A ordem do CSS importa: há regras
     tardias que sobrescrevem as do começo de propósito. -->
` + CSS.map(f => '<link rel="stylesheet" href="assets/css/' + f + '">').join('\n') + `
</head>
<body>

<script>
/* ============================================================
   CARREGADOR — ${titulo}     (gerado por build.js)

   Todas as páginas montam a mesma aplicação; o que muda é a tela em que cada
   uma abre. O index.html é a versão embutida, para abrir direto do disco;
   estas leem os pedaços com fetch e precisam de servidor.

   Por que toda página carrega TODAS as telas, e não só a sua: o JS faz 412
   consultas ao DOM no carregamento apontando para elementos de outras telas,
   sem proteção. Como é um script só, a primeira que falha aborta o resto —
   numa página sem a tela de Shorts, a fileira de shorts da home nem chega a
   ser montada. Carregar tudo mantém o comportamento intacto; são os mesmos
   arquivos em todas as páginas, então o navegador busca uma vez e reaproveita.

   Outros dois cuidados:

   - Os fragmentos são juntados ANTES de entrar no documento. Vários abrem uma
     tag que só fecha no seguinte — .main abre em 02-topbar e só fecha depois
     da home. Injetar um a um faria o parser fechar as tags sozinho.

   - O JS entra como UM script, e não como treze <script src>. Função
     declarada num arquivo é usada antes disso em outro: 04-perfil registra
     'crOpen' num clique e 'crOpen' só é declarada em 12-wizard. Num script
     único o hoisting resolve; separados, quebra.
   ============================================================ */
(function () {
  var TELAS = [
${lista(TELAS)}
  ].map(function (f) { return 'screens/' + f; });

  var SCRIPTS = [
${lista(JS)}
  ];

  function buscar(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + ' respondeu ' + r.status);
      return r.text();
    });
  }

  function avisar(erro) {
    document.body.insertAdjacentHTML('afterbegin',
      '<div style="font:15px/1.5 system-ui,sans-serif;color:#5b6672;padding:40px;max-width:640px;margin:0 auto">' +
      '<h1 style="font-size:19px;color:#24344a;margin:0 0 10px">Não foi possível montar a página</h1>' +
      '<p style="margin:0 0 10px">' + String(erro && erro.message || erro) + '</p>' +
      '<p style="margin:0">Esta versão lê as telas por <code>fetch</code>, então precisa ser servida por HTTP. ' +
      'Aberta direto do disco (<code>file://</code>) o navegador bloqueia a leitura dos pedaços — nesse caso use o ' +
      '<a href="index.html" style="color:#0c7d7d">index.html</a>, que é autocontido.</p></div>');
  }

  Promise.all(TELAS.map(buscar))
    .then(function (partes) {
      document.body.insertAdjacentHTML('afterbegin', partes.join('\\n'));
      return Promise.all(SCRIPTS.map(function (f) { return buscar('assets/js/' + f); }))
        .then(function (codigos) {
          var junto = codigos.map(function (src, i) {
            return '/* ===================== assets/js/' + SCRIPTS[i] + ' ===================== */\\n' + src;
          }).join('\\n');
          var s = document.createElement('script');
          s.textContent = junto;
          document.body.appendChild(s);   /* executa ao entrar no documento */
        });
    })
    .then(function () {
      /* O script entra depois do DOMContentLoaded já ter disparado, então
         quem escuta o evento nunca seria chamado. */
      document.dispatchEvent(new Event('DOMContentLoaded'));${passoAbrir}
    })
    .catch(avisar);
})();
<\/script>

</body>
</html>
`;
}

/* =================== executa =================== */
const kb = t => (t.length / 1024).toFixed(1).padStart(7) + ' KB';

const mono = monolito();
fs.writeFileSync(path.join(RAIZ, 'index.html'), mono, 'utf8');
console.log('index.html' + kb(mono) + '   (embutido, abre do disco)');

PAGINAS.forEach(([arq, titulo, abrir]) => {
  const txt = pagina(titulo, abrir);
  fs.writeFileSync(path.join(RAIZ, arq), txt, 'utf8');
  console.log(arq.padEnd(20) + kb(txt) + '   ' + (abrir || 'abre na home'));
});

console.log('\nfontes: ' + CSS.length + ' folhas · ' + TELAS.length + ' telas · ' + JS.length + ' scripts');
