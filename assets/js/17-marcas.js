/* conteudo por marca: home customizavel */
/* ============ Conteúdo por marca (home customizável) ============
   Os clientes da versão customizável que usam a home do SULTS como base
   (Casa do Construtor, Fini, Habib's, Petlove, Piticas) ganham aqui o próprio
   conteúdo: categorias, shorts (do canal da marca no YouTube, incorporados
   pelo embed, com a miniatura do próprio YouTube como capa), publicações
   oficiais (matéria, vídeo do YouTube dentro do post, texto) e posts das
   pessoas da rede. Mesmo mecanismo do cenário Crunchyroll: guarda o que é
   do SULTS, troca no lugar e devolve inteiro ao desligar.

   Casa, Fini, Habib's e Petlove: canal oficial da marca. Piticas não publica
   Shorts no canal próprio, então entram shorts da comunidade sobre a marca,
   compartilhados pelo Marketing. */

function ytThumb(id, nome){ return 'https://i.ytimg.com/vi/' + id + '/' + (nome || 'hq720') + '.jpg'; }
/* publicacao com video do YouTube: o player entra no lugar da imagem, em 16:9 */
function ytPostHTML(id, titulo){
  return '<div class="post-img post-yt"><iframe src="https://www.youtube.com/embed/' + id + '?rel=0" title="' + String(titulo || 'Vídeo').replace(/"/g, '&quot;') + '" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
}
function marcaOficial(m, n){
  return Object.assign({ author:m.nome, av:m.av, ini:'', autorNome:m.nome, autorAv:m.av,
    cargo:'Canal oficial', unit:m.nome, reach:'rede', status:'pub', oficial:true }, n);
}
function marcaPessoa(m, chave, n){
  const q = m.pessoas[chave];
  const base = { author:q.nome, av:q.av, ini:q.ini, autorNome:q.nome, autorAv:q.av,
    cargo:q.cargo, unit:q.unidade, sub:'Gente & Cultura', reach:'rede', status:'pub' };
  /* quem responde por mais de uma unidade: "a primeira +N unidades" */
  if (q.unidades && q.unidades.length > 1) base.units = q.unidades;
  return Object.assign(base, n);
}
function marcaComent(m, chave, texto, quando){
  const q = m.pessoas[chave];
  const und = (q.unidades && q.unidades.length > 1) ? q.unidades[0] + ' +' + (q.unidades.length - 1) + ' unidades' : q.unidade;
  return { author:q.nome, av:q.av, ini:q.ini, role:q.cargo + ' · ' + und, text:texto, time:quando, dt:quando };
}
/* as pessoas da rede, com as fotos que o protótipo já tem */
function marcaPessoas(def){
  const base = {
    ana:      { nome:'Ana Souza',        ini:'AS', av:'av-as' },
    livia:    { nome:'Livia Fernandes',  ini:'LF', av:'av-lf' },
    guilherme:{ nome:'Guilherme Reis',   ini:'GR', av:'av-wm' },
    ellen:    { nome:'Ellen Martins',    ini:'EM', av:'av-gc' },
    matheus:  { nome:'Matheus Lima',     ini:'ML', av:'av-ms' },
    eduardo:  { nome:'Eduardo Prado',    ini:'EP', av:'av-bo' },
    gisele:   { nome:'Gisele Moura',     ini:'GM', av:'av-cm' }
  };
  const out = {};
  Object.keys(def).forEach(function(k){ out[k] = Object.assign({}, base[k], def[k]); });
  return out;
}

const MARCAS = {};

/* ---------------------------------------------------------------- Casa do Construtor */
MARCAS.casa = {
  nome:'Casa do Construtor', av:'av-marca-casa', canal:'https://www.youtube.com/@CasadoConstrutorOficial',
  cats:[
    { id:'oficiais',     name:'Comunicados oficiais', color:'#013E8F', icon:'fa-bullhorn',            active:true },
    { id:'equipamentos', name:'Equipamentos',         color:'#e08a1e', icon:'fa-toolbox',             active:true },
    { id:'dicas',        name:'Dicas de obra',        color:'#27a689', icon:'fa-helmet-safety',       active:true },
    { id:'campanhas',    name:'Campanhas',            color:'#c2185b', icon:'fa-bullseye',            active:true },
    { id:'rede',         name:'Rede de franquias',    color:'#2f6fe4', icon:'fa-store',               active:true },
    { id:'cultura',      name:'Gente & Cultura',      color:'#8161d8', icon:'fa-hand-holding-heart',  active:true }
  ],
  shortCats:[
    { id:'dicas',        name:'Dicas de obra', color:'#013E8F', icon:'fa-helmet-safety', active:true },
    { id:'equipamentos', name:'Equipamentos',  color:'#e08a1e', icon:'fa-toolbox',       active:true },
    { id:'campanhas',    name:'Campanhas',     color:'#c2185b', icon:'fa-bullseye',      active:true }
  ],
  shortsRole:'Canal oficial · YouTube',
  shorts:[
    { id:'aRte8e3Yr38', t:'Você já viu um rompedor de 10 kg que pesa só 5,9 kg? 🤯', views:'26 mil',  likes:'1,8 mil', c:96, time:'Há 3 h',  cat:'equipamentos' },
    { id:'bXdTPKQCw8E', t:'Coisas que parecem óbvias para nós sobre obra, mas que as pessoas não sabem', views:'7,1 mil', likes:'610', c:54, time:'Há 8 h', cat:'dicas' },
    { id:'B36TcLWLeFo', t:'Ninguém te conta isso sobre alugar equipamentos…', views:'6,4 mil', likes:'540', c:41, time:'Há 1 d', cat:'dicas' },
    { id:'qHwuBQvhORU', t:'10 coisas que você deve fazer antes de alugar equipamentos', views:'1,4 mil', likes:'120', c:18, time:'Há 1 d', cat:'dicas' },
    { id:'iaWG19w1wLI', t:'Fazer massa na mão? Nunca mais!', views:'1,2 mil', likes:'98', c:12, time:'Há 2 d', cat:'equipamentos' },
    { id:'-R5JppG6yXc', t:'Por que essa rampa é melhor que a de madeira?', views:'1,1 mil', likes:'87', c:9, time:'Há 2 d', cat:'equipamentos' },
    { id:'Tv5jaCtFyeM', t:'Como fazer o concreto render mais', views:'758', likes:'64', c:7, time:'Há 3 d', cat:'dicas' },
    { id:'svTZQ5J2ub0', t:'Se quiser alugar... 😐😂', views:'618', likes:'71', c:11, time:'Há 4 d', cat:'campanhas' },
    { id:'uWaWJIshOSg', t:'O segredo que deixa a massa muito melhor 🤯', views:'567', likes:'49', c:6, time:'Há 5 d', cat:'dicas' },
    { id:'QQygb2dh7OM', t:'3 cortadoras de parede: qual é a ideal para sua obra? 🔥', views:'337', likes:'31', c:4, time:'Há 6 d', cat:'equipamentos' },
    { id:'R5BxvH_GiB0', t:'Betoneira limpa é concreto bem feito!', views:'233', likes:'22', c:3, time:'Há 7 d', cat:'dicas' },
    { id:'biYVkkel6JY', t:'Descontos exclusivos para clientes PJ 💸', views:'63', likes:'9', c:1, time:'Há 8 d', cat:'campanhas' }
  ],
  pessoas: marcaPessoas({
    guilherme:{ cargo:'Franqueado',          unidade:'Ribeirão Preto', unidades:['Ribeirão Preto', 'Sertãozinho', 'Franca'] },
    ana:      { cargo:'Gerente de loja',     unidade:'Uberaba' },
    ellen:    { cargo:'Treinamento',         unidade:'Matriz' },
    matheus:  { cargo:'Logística',           unidade:'CD Rio Claro' },
    eduardo:  { cargo:'Franqueado',          unidade:'Sorocaba' }
  }),
  comunicados:[
    { c1:'#4f8bd6', c2:'#013E8F', ic:'fa-users',           t:'Convenção da Rede 2026: inscrições até 20/09',       d:'Campinas, 22 e 23/10. Hotel e transporte por conta da franqueadora para um representante por loja.', q:'08/09/2026 09:00', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-file-shield',     t:'Locação Garantida: nova política a partir de 1º/10',  d:'Cobertura ampliada para equipamentos acima de R$ 5 mil. Leia o manual atualizado antes de aplicar.',   q:'05/09/2026 14:30', novo:true },
    { c1:'#66bb6a', c2:'#2e7d32', ic:'fa-helmet-safety',   t:'NR-35: turma de setembro confirmada',                 d:'Dias 16 e 17/09 na Matriz. Operadores de plataforma devem ser inscritos até sexta.',                  q:'04/09/2026 09:15', novo:true },
    { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-tag',             t:'Black Friday da locação: cronograma',                 d:'Materiais chegam em 20/10; ofertas válidas de 20 a 30/11. Reserve estoque de misturadores e rompedores.', q:'01/09/2026 11:40' },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-calendar-check',  t:'Recesso de fim de ano definido',                     d:'Lojas fechadas em 25/12 e 1º/01. Plantão de devolução das 8h às 12h nos dias 24 e 31.',                q:'28/08/2026 16:00' }
  ],
  comentarios: function(m){ return {
    9202:[ marcaComent(m, 'eduardo', 'Ficou ótimo. Quando chega o adesivo de vitrine?', '07/09/2026 às 15:05'),
           marcaComent(m, 'ana', 'Cliente já citou o filme no balcão hoje. Funciona!', '07/09/2026 às 16:20') ],
    9203:[ marcaComent(m, 'guilherme', 'Mandei pro grupo dos clientes da loja. Reduz devolução com haste errada.', '05/09/2026 às 12:10'),
           marcaComent(m, 'matheus', 'Poderia ter um desses para a betoneira também. 🙏', '05/09/2026 às 13:02') ],
    9204:[ marcaComent(m, 'ana', 'Emocionou o time aqui. Parabéns a quem fez. 👷💙', '02/09/2026 às 09:00'),
           marcaComent(m, 'ellen', 'Vai entrar na abertura do treinamento de novos consultores.', '02/09/2026 às 10:15') ],
    9205:[ marcaComent(m, 'eduardo', 'Obrigado, rede! Contagem regressiva para o dia 15. 🎉', '29/08/2026 às 17:00'),
           marcaComent(m, 'guilherme', 'Bem-vindo, Eduardo! Qualquer dúvida de abertura, chama.', '29/08/2026 às 17:40') ],
    9301:[ marcaComent(m, 'ana', 'Aqui foi igual. O pessoal não acredita no peso.', '08/09/2026 às 08:30'),
           marcaComent(m, 'matheus', 'Segunda remessa sai do CD na quarta.', '08/09/2026 às 09:05') ],
    9303:[ marcaComent(m, 'guilherme', 'Inscrevi dois operadores. Confirma recebimento?', '04/09/2026 às 09:30'),
           marcaComent(m, 'ellen', 'Recebido, Guilherme! Vagas garantidas.', '04/09/2026 às 09:45') ],
    9304:[ marcaComent(m, 'ana', 'Sentimos na loja: nenhum equipamento atrasado em agosto. Obrigada! 🚚', '01/09/2026 às 14:00'),
           marcaComent(m, 'eduardo', 'Parabéns ao time do CD!', '01/09/2026 às 15:10') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9201, sub:'Comunicados oficiais', date:'08/09/2026', datetime:'08/09/26 09:10', reactions:412, comments:38, pinned:true,
      title:'Há 33 anos mostrando que alugar é mais inteligente',
      image:ytThumb('FM5zSSFmGuM', 'maxresdefault'),
      text:'Trinta e três anos de Casa do Construtor. O filme de aniversário conta como a locação de equipamentos virou a escolha inteligente da obra brasileira. 🏗️',
      article:{ kicker:'Comunicados oficiais · Institucional', readTime:'3 min de leitura',
        lead:'De uma loja em Rio Claro à maior rede de locação de equipamentos da América Latina: o que mudou na obra em 33 anos e o que continua igual.',
        html:'<p>Em 1993 a primeira Casa do Construtor abriu as portas em Rio Claro com uma ideia simples: o profissional da obra não precisa comprar uma máquina que vai usar por três dias. Precisa dela funcionando, na hora certa, com alguém para orientar o uso.</p>' +
             '<p>Trinta e três anos depois são mais de 780 lojas em quatro países, um catálogo que vai do rompedor à plataforma elevatória e a mesma conversa no balcão: qual é a obra, qual é o prazo, qual é o equipamento certo.</p>' +
             '<p>O filme de aniversário está no canal oficial. Compartilhe com a sua equipe e com os clientes da loja.</p>' +
             '<p><a href="https://www.youtube.com/watch?v=FM5zSSFmGuM" target="_blank" rel="noopener">Assistir no YouTube</a></p>' },
      cmts:[ marcaComent(m, 'guilherme', 'Estou desde 2011 na rede. Orgulho de fazer parte dessa história. 💙', '08/09/2026 às 09:40'),
             marcaComent(m, 'ana', 'Já passei o filme na TV da loja. Cliente parou pra ver!', '08/09/2026 às 10:12') ] }),
    marcaOficial(m, { id:9202, sub:'Campanhas', date:'07/09/2026', datetime:'07/09/26 14:00', reactions:268, comments:21,
      title:'Alugar com a Casa do Construtor é mais INTELIGENTE! 🧠',
      yt:'RKP6er0-C_U',
      text:'Novo filme da campanha no ar. Trinta segundos para explicar por que comprar equipamento para usar uma vez não faz sentido. Já está na TV e nas redes; o material para ponto de venda chega nas lojas esta semana.',
      cmts:[ marcaComent(m, 'eduardo', 'Ficou ótimo. Quando chega o adesivo de vitrine?', '07/09/2026 às 15:05') ] }),
    marcaOficial(m, { id:9203, sub:'Dicas de obra', date:'05/09/2026', datetime:'05/09/26 11:30', reactions:154, comments:12,
      title:'Como usar o misturador do jeito certo na obra (passo a passo)',
      yt:'vrXkk2xIsB8',
      text:'Vídeo novo da série de dicas: o passo a passo do misturador, da escolha da haste ao cuidado com a rotação. Bom para mandar ao cliente que aluga pela primeira vez. 🔧' }),
    marcaOficial(m, { id:9204, sub:'Campanhas', date:'02/09/2026', datetime:'02/09/26 08:20', reactions:301, comments:27,
      title:'O Herói da Obra: nossa homenagem no Dia do Pedreiro',
      image:ytThumb('1x7IwgCIWJ4', 'maxresdefault'),
      text:'Sem ele a obra não sai do chão. O filme do Dia do Pedreiro está no canal e a arte para as redes das lojas está na pasta de campanhas. 👷' }),
    marcaOficial(m, { id:9205, sub:'Rede de franquias', date:'29/08/2026', datetime:'29/08/26 16:45', reactions:187, comments:19,
      text:'Inauguração confirmada: Casa do Construtor Sorocaba Norte abre dia 15/09. É a 12ª loja do interior paulista só neste ano. Bem-vindos, Eduardo e equipe! 🎉' })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'guilherme', { id:9301, date:'08/09/2026', datetime:'08/09/26 07:50', reactions:96, comments:11,
      text:'O rompedor de 5,9 kg chegou na loja. Primeiro cliente que testou já ligou perguntando se dá pra alugar por mais uma semana. 😄' }),
    marcaPessoa(m, 'ana', { id:9302, date:'06/09/2026', datetime:'06/09/26 18:10', reactions:142, comments:23,
      text:'Meta do mês batida em Uberaba com 4 dias de antecedência! Time, vocês são demais. Pizza garantida na sexta. 🍕',
      cmts:[ marcaComent(m, 'guilherme', 'Parabéns, Ana! Ribeirão vem atrás.', '06/09/2026 às 18:40') ] }),
    marcaPessoa(m, 'ellen', { id:9303, date:'04/09/2026', datetime:'04/09/26 09:00', reactions:73, comments:8,
      text:'Turma nova de NR-35 (trabalho em altura) confirmada para 16 e 17/09, na Matriz. Franqueados, inscrevam os operadores de plataforma até sexta. 🧗' }),
    marcaPessoa(m, 'matheus', { id:9304, date:'01/09/2026', datetime:'01/09/26 13:25', reactions:58, comments:6,
      text:'Frota do CD com 100% das entregas dentro do prazo em agosto. Obrigado, pessoal da expedição. 🚚' })
  ]; }
};

/* ---------------------------------------------------------------- Fini */
MARCAS.fini = {
  nome:'Fini', av:'av-marca-fini', canal:'https://www.youtube.com/@FiniBrasil',
  cats:[
    { id:'lancamentos', name:'Lançamentos',          color:'#E73478', icon:'fa-star',                active:true },
    { id:'receitas',    name:'Receitas',             color:'#e08a1e', icon:'fa-cake-candles',        active:true },
    { id:'campanhas',   name:'Campanhas',            color:'#8161d8', icon:'fa-bullseye',            active:true },
    { id:'lojas',       name:'Lojas',                color:'#2f6fe4', icon:'fa-store',               active:true },
    { id:'cultura',     name:'Gente & Cultura',      color:'#27a689', icon:'fa-hand-holding-heart',  active:true },
    { id:'oficiais',    name:'Comunicados oficiais', color:'#0088FF', icon:'fa-bullhorn',            active:true }
  ],
  alias:{ produtos:'lancamentos' },
  shortCats:[
    { id:'produtos',  name:'Produtos',  color:'#E73478', icon:'fa-candy-cane',   active:true },
    { id:'receitas',  name:'Receitas',  color:'#e08a1e', icon:'fa-cake-candles', active:true },
    { id:'campanhas', name:'Campanhas', color:'#8161d8', icon:'fa-bullseye',     active:true }
  ],
  shortsRole:'Canal oficial · YouTube',
  shorts:[
    { id:'NWP1RS3yYBc', t:'O que são alguns espirros perto de comer vários Marshmallows nesse inverno?! NADA. ⛄🍬😋', views:'910 mil', likes:'41 mil', c:820, time:'Há 2 h', cat:'produtos', thumb:'oardefault' },
    { id:'cVcRCcWBMH4', t:'Você viu meu novo sabor de gelatina com a Dr. Oetker? 😜', views:'11 mil', likes:'890', c:64, time:'Há 6 h', cat:'produtos', thumb:'oardefault' },
    { id:'uhPDDPRG_Ks', t:'Fogueira + frio + Marsh Camping 🔥❄️', views:'17 mil', likes:'1,3 mil', c:97, time:'Há 1 d', cat:'campanhas', thumb:'oardefault' },
    { id:'uD1IhAvAKoA', t:'Esse é o meu verdadeiro amor junino: Marsh com Paçoquita. 🥜❤️', views:'6,3 mil', likes:'520', c:38, time:'Há 1 d', cat:'produtos', thumb:'oardefault' },
    { id:'JigEn9Ihkxw', t:'Sempre tem um espacinho para o Marsh Paçoquita, né? 🤭', views:'5,1 mil', likes:'430', c:29, time:'Há 2 d', cat:'produtos', thumb:'oardefault' },
    { id:'psg6O9wvo3U', t:'O date perfeito tinha que ter MUITA Fini de sobremesa. 🥰', views:'3,8 mil', likes:'310', c:22, time:'Há 3 d', cat:'campanhas', thumb:'oardefault' },
    { id:'4cK-GR2Jg08', t:'O verdadeiro significado de fofo & cremoso. 😋', views:'3,6 mil', likes:'290', c:18, time:'Há 3 d', cat:'produtos', thumb:'oardefault' },
    { id:'oMB52hrVqKY', t:'Que mesa bonita, sô!!! O clima junino com todas essas delícias. 🔥😋', views:'3,6 mil', likes:'270', c:15, time:'Há 4 d', cat:'campanhas', thumb:'oardefault' },
    { id:'KRKKk9Nt0Gk', t:'Será que a galera descobriu o meu lançamento? 👀🍓🤭', views:'3 mil', likes:'240', c:19, time:'Há 5 d', cat:'produtos', thumb:'oardefault' },
    { id:'jnnCg4DTycM', t:'Qualquer coisa que pinta a língua: A. Eu: 🤪💙', views:'3 mil', likes:'230', c:12, time:'Há 6 d', cat:'produtos', thumb:'oardefault' },
    { id:'X4YhWm5Lhpc', t:'Apareceu, piscou… sumiu. 🍓👀', views:'2,4 mil', likes:'180', c:9, time:'Há 7 d', cat:'produtos', thumb:'oardefault' },
    { id:'REzUAChOLvY', t:'#FiniCrunchyKisses ✨', views:'1,7 mil', likes:'140', c:7, time:'Há 8 d', cat:'produtos', thumb:'oardefault' }
  ],
  pessoas: marcaPessoas({
    ana:    { cargo:'Gerente de loja',   unidade:'Fini Store Ibirapuera' },
    gisele: { cargo:'Trade marketing',   unidade:'Matriz' },
    eduardo:{ cargo:'Franqueado',        unidade:'Fini Store Curitiba', unidades:['Fini Store Curitiba', 'Fini Store Joinville'] },
    livia:  { cargo:'Gente & Cultura',   unidade:'Matriz' },
    matheus:{ cargo:'Fábrica',           unidade:'Jundiaí' }
  }),
  comunicados:[
    { c1:'#f06292', c2:'#E73478', ic:'fa-users',           t:'Convenção Fini Stores 2026',                          d:'Jundiaí, 15 e 16/10. Inscrições abertas para franqueados e gerentes até 25/09.',                   q:'08/09/2026 10:00', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-truck',           t:'Gelatina Fini + Dr. Oetker: cronograma de distribuição', d:'Primeira remessa nas lojas entre 10 e 12/09. Ponto extra obrigatório na entrada.',              q:'05/09/2026 09:30', novo:true },
    { c1:'#81c784', c2:'#2e7d32', ic:'fa-seedling',        t:'Kit primavera nas lojas de 12 a 15/09',               d:'Display de balcão e adesivo de vitrine. Recolher os materiais de Festa Junina antes.',              q:'04/09/2026 14:10', novo:true },
    { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-ghost',           t:'Halloween: pedidos da coleção até 25/09',             d:'Dentaduras, Minhocas e o novo multipack temático. Pedido único por loja no portal.',                 q:'01/09/2026 11:00' },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-clock',           t:'Feriado de 7/9: horários das lojas',                  d:'Shoppings abertos das 14h às 20h. Lojas de rua a critério do franqueado, avise no portal.',          q:'03/09/2026 08:30' }
  ],
  comentarios: function(m){ return {
    9212:[ marcaComent(m, 'ana', 'Testei na degustação de sábado. Sumiu em 5 minutos. 🍫', '06/09/2026 às 16:00'),
           marcaComent(m, 'matheus', 'A copa da fábrica confirma: rende 30 e some em 10.', '06/09/2026 às 16:30') ],
    9213:[ marcaComent(m, 'eduardo', 'É o mais pedido em Curitiba também. Dá pra ter versão sem lactose?', '04/09/2026 às 12:00'),
           marcaComent(m, 'gisele', 'Boa, Eduardo. Passei pro time de receitas!', '04/09/2026 às 12:40') ],
    9214:[ marcaComent(m, 'ana', 'Já está na vitrine do Ibirapuera. Linda mesmo. 🍰', '01/09/2026 às 10:30'),
           marcaComent(m, 'livia', 'Alguém traz uma fatia pra Matriz? 😅', '01/09/2026 às 11:00') ],
    9215:[ marcaComent(m, 'eduardo', 'Sabor surpresa até dia 10? A criançada não vai aguentar. 😂', '28/08/2026 às 09:10'),
           marcaComent(m, 'ana', 'Já separei o ponto extra na entrada da loja.', '28/08/2026 às 09:45') ],
    9312:[ marcaComent(m, 'ana', 'Recolhido aqui. O kit de primavera vem com display de balcão?', '05/09/2026 às 14:40'),
           marcaComent(m, 'gisele', 'Vem sim, Ana: display e adesivo de vitrine.', '05/09/2026 às 15:00') ],
    9313:[ marcaComent(m, 'gisele', 'O short vazou nada, foi a Fini que piscou. 👀', '03/09/2026 às 11:00'),
           marcaComent(m, 'ana', 'Aqui perguntam todo dia. Dia 10 vai ser fila.', '03/09/2026 às 11:30') ],
    9314:[ marcaComent(m, 'matheus', 'As crianças saíram da linha do Marsh com os bolsos cheios. Melhor dia do ano. 😄', '30/08/2026 às 10:00'),
           marcaComent(m, 'eduardo', 'Dá pra fazer no interior também? Curitiba quer!', '30/08/2026 às 10:35') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9211, sub:'Campanhas', date:'08/09/2026', datetime:'08/09/26 10:00', reactions:1240, comments:96, pinned:true,
      title:"Fini Fallin' in Love: o filme que passou de 10 milhões de views",
      image:ytThumb('JVvXHD_WJFM', 'maxresdefault'),
      text:'A campanha mais vista da história da Fini no YouTube passou de 10 milhões de visualizações. A gente fez um apanhado do que deu certo e do que vem por aí. 💗',
      article:{ kicker:'Campanhas · Resultados', readTime:'3 min de leitura',
        lead:'Dez milhões de visualizações, um sabor que virou hit e uma pergunta para as lojas: como levar esse clima para a gôndola?',
        html:'<p>"Fini Fallin\' in Love" nasceu como um filme de marca e virou trilha de festa. Em pouco mais de um ano passou de 10 milhões de visualizações no canal oficial, sem contar cortes e remixes da comunidade.</p>' +
             '<p>O que deu certo: humor, cor e o produto no centro da cena, sem discurso. É a fórmula que a gente quer repetir nos próximos lançamentos, e é o clima que as Fini Stores devem replicar em vitrine e ponto extra.</p>' +
             '<p>O kit de materiais da campanha está na pasta de trade. Dúvidas com o time de marketing.</p>' +
             '<p><a href="https://www.youtube.com/watch?v=JVvXHD_WJFM" target="_blank" rel="noopener">Assistir no YouTube</a></p>' },
      cmts:[ marcaComent(m, 'ana', 'A trilha toca na loja o dia inteiro e ninguém reclama. Isso diz tudo. 🎶', '08/09/2026 às 10:30'),
             marcaComent(m, 'eduardo', 'Em Curitiba o Beijos esgotou duas vezes desde o filme.', '08/09/2026 às 11:02') ] }),
    marcaOficial(m, { id:9212, sub:'Receitas', date:'06/09/2026', datetime:'06/09/26 15:20', reactions:388, comments:41,
      title:'Brigadeiro com recheio Fini',
      yt:'XPLJRnMAUZ0',
      text:'Receita nova da série: brigadeiro com recheio de Fini. Rende 30 unidades e some em 10 minutos, testado na copa da Matriz. 🍫' }),
    marcaOficial(m, { id:9213, sub:'Receitas', date:'04/09/2026', datetime:'04/09/26 11:15', reactions:276, comments:23,
      title:'Milkshake com calda de Beijos Fini',
      yt:'KrmBvbpVal4',
      text:'O milkshake com calda de Beijos Fini é o mais pedido das degustações. Vídeo no canal e ficha técnica na pasta de receitas. 🥤' }),
    marcaOficial(m, { id:9214, sub:'Receitas', date:'01/09/2026', datetime:'01/09/26 09:40', reactions:198, comments:17,
      title:'Cheesecake marmorizada com recheio e calda de Beijos Fini',
      image:ytThumb('FbFh82R24yk', 'maxresdefault'),
      text:'Para quem pediu uma sobremesa de fatia: cheesecake marmorizada com Beijos Fini. Fica linda na vitrine da Fini Store. 🍰' }),
    marcaOficial(m, { id:9215, sub:'Lançamentos', date:'28/08/2026', datetime:'28/08/26 08:30', reactions:534, comments:62,
      text:'Chegou o novo sabor de gelatina Fini com a Dr. Oetker! Distribuição para as lojas começa dia 10/09. Sabor: surpresa até lá. 😜🍓' })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'ana', { id:9311, date:'07/09/2026', datetime:'07/09/26 19:05', reactions:167, comments:21,
      text:'Domingo de shopping cheio e a Fini Store Ibirapuera bateu recorde de tickets. O Marsh Paçoquita foi o campeão. 🥜❤️',
      cmts:[ marcaComent(m, 'gisele', 'Mandando reposição extra amanhã cedo!', '07/09/2026 às 19:30') ] }),
    marcaPessoa(m, 'gisele', { id:9312, date:'05/09/2026', datetime:'05/09/26 14:10', reactions:89, comments:9,
      text:'Materiais de Festa Junina podem ser recolhidos. O kit de primavera chega nas lojas entre 12 e 15/09. 🌸' }),
    marcaPessoa(m, 'eduardo', { id:9313, date:'03/09/2026', datetime:'03/09/26 10:45', reactions:74, comments:12,
      text:'Alguém mais teve criança pedindo a gelatina nova antes de ela existir? O short vazou o segredo. 😂' }),
    marcaPessoa(m, 'livia', { id:9314, date:'30/08/2026', datetime:'30/08/26 09:00', reactions:212, comments:34,
      text:'Dia de Fini na fábrica: 40 filhos de colaboradores visitaram a linha do Marsh. Foto oficial sai na semana que vem. 👧🧒' })
  ]; }
};

/* ---------------------------------------------------------------- Habib's */
MARCAS.habibs = {
  nome:"Habib's", av:'av-marca-habibs', canal:'https://www.youtube.com/@HabibsOficial',
  cats:[
    { id:'campanhas', name:'Campanhas',            color:'#FE0C18', icon:'fa-bullseye',            active:true },
    { id:'cardapio',  name:'Cardápio',             color:'#e08a1e', icon:'fa-utensils',            active:true },
    { id:'lojas',     name:'Lojas',                color:'#2f6fe4', icon:'fa-store',               active:true },
    { id:'cultura',   name:'Gente & Cultura',      color:'#27a689', icon:'fa-hand-holding-heart',  active:true },
    { id:'oficiais',  name:'Comunicados oficiais', color:'#8161d8', icon:'fa-bullhorn',            active:true }
  ],
  shortCats:[
    { id:'campanhas', name:'Campanhas', color:'#FE0C18', icon:'fa-bullseye', active:true },
    { id:'cardapio',  name:'Cardápio',  color:'#e08a1e', icon:'fa-utensils', active:true }
  ],
  shortsRole:'Canal oficial · YouTube',
  shorts:[
    { id:'YeOnE3wyDD4', t:'Agosto do Gênio: agosto tem oferta todo dia', views:'124 mil', likes:'6,2 mil', c:310, time:'Há 2 h', cat:'campanhas', thumb:'oardefault' },
    { id:'vyRfaB3IjCw', t:"Bib'sfiha. O patrimônio brasileiro de comer", views:'186 mil', likes:'9,1 mil', c:420, time:'Há 5 h', cat:'cardapio', thumb:'oardefault' },
    { id:'OObuljTxo9w', t:"Bib'sfiha. O patrimônio brasileiro de comer", views:'120 mil', likes:'5,8 mil', c:265, time:'Há 1 d', cat:'cardapio', thumb:'oardefault' },
    { id:'kYeOSDxQr_M', t:'Agosto do Gênio', views:'86 mil', likes:'4,1 mil', c:190, time:'Há 1 d', cat:'campanhas', thumb:'oardefault' },
    { id:'_eAFgS9Y1L4', t:'Agosto do Gênio: desejou cupom?', views:'80 mil', likes:'3,9 mil', c:172, time:'Há 2 d', cat:'campanhas', thumb:'oardefault' },
    { id:'1Jqj4eMfaEE', t:"Agosto do Gênio: um mês de ofertas e muito Habib's", views:'75 mil', likes:'3,6 mil', c:150, time:'Há 2 d', cat:'campanhas', thumb:'oardefault' },
    { id:'qgFFw0ZsCEc', t:'Promocombos', views:'1,6 mi', likes:'72 mil', c:2400, time:'Há 3 d', cat:'cardapio', thumb:'oardefault' },
    { id:'wlPPitX9vQU', t:'Promocombos', views:'1,6 mi', likes:'70 mil', c:2100, time:'Há 4 d', cat:'cardapio', thumb:'oardefault' },
    { id:'KtYkAYlu8EU', t:"Bib'sfiha. O patrimônio brasileiro de comer", views:'16 mil', likes:'820', c:44, time:'Há 5 d', cat:'cardapio', thumb:'oardefault' },
    { id:'sVVJ9xOSjh8', t:"Agosto do Gênio: um mês de ofertas e muito Habib's", views:'11 mil', likes:'560', c:31, time:'Há 6 d', cat:'campanhas', thumb:'oardefault' },
    { id:'wfpzDOqlnkI', t:"Promocombo Habib's", views:'2,9 mil', likes:'160', c:12, time:'Há 7 d', cat:'cardapio', thumb:'oardefault' },
    { id:'OWjaPiIZTqU', t:"Minibolas Habib's: campanha Gênio da Rodada", views:'832', likes:'54', c:6, time:'Há 8 d', cat:'campanhas', thumb:'oardefault' }
  ],
  pessoas: marcaPessoas({
    guilherme:{ cargo:'Franqueado',        unidade:'Paulista', unidades:['Paulista', 'Consolação', 'Pinheiros'] },
    ana:      { cargo:'Gerente de loja',   unidade:'Uberaba' },
    matheus:  { cargo:'Operações',         unidade:'Matriz' },
    ellen:    { cargo:'Treinamento',       unidade:'Universidade do Gênio' },
    gisele:   { cargo:'Marketing',         unidade:'Matriz' }
  }),
  comunicados:[
    { c1:'#ff8a80', c2:'#FE0C18', ic:'fa-users',           t:'Convenção Gênio 2026: 20 e 21/10',                    d:'São Paulo, Expo Center Norte. Premiação das dez lojas que mais cresceram no Agosto do Gênio.',    q:'08/09/2026 08:00', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-ticket',          t:'Setembro do Gênio: nova mecânica de cupom',           d:'Cupom válido só no app, um por CPF por dia. Treine o caixa para conferir o QR code.',              q:'01/09/2026 09:00', novo:true },
    { c1:'#81c784', c2:'#2e7d32', ic:'fa-list-check',      t:'Checklist de abertura atualizado',                    d:'Entrou a conferência da câmara fria antes do turno. Já disponível no app desde 3/09.',              q:'03/09/2026 14:30', novo:true },
    { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-graduation-cap',  t:'Universidade do Gênio: turma de setembro',            d:'Início em 14/09. Gerentes novos devem confirmar presença até quarta.',                             q:'05/09/2026 09:15' },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-futbol',          t:'Escalas para os jogos de outubro',                    d:'Reforço de equipe e de massa nos dias de rodada. Planilha de escalas no portal até 20/09.',         q:'29/08/2026 16:20' }
  ],
  comentarios: function(m){ return {
    9222:[ marcaComent(m, 'ana', 'Coloquei na TV da loja. Sete segundos, o cliente pede o combo. ⚽', '06/09/2026 às 12:30'),
           marcaComent(m, 'gisele', 'Esse é o filme que mais converteu no app.', '06/09/2026 às 13:00') ],
    9223:[ marcaComent(m, 'guilherme', 'Reforço de massa chegou hoje na Paulista. Valeu, operações!', '04/09/2026 às 17:00'),
           marcaComent(m, 'matheus', 'Fim de semana de jogo tem pedido extra automático. Fiquem tranquilos.', '04/09/2026 às 17:20') ],
    9224:[ marcaComent(m, 'ana', 'O "odeia as segundas" acabou em dois dias aqui. 🐱', '01/09/2026 às 11:00'),
           marcaComent(m, 'ellen', 'Time inteiro querendo o preguiçoso. Nada a declarar.', '01/09/2026 às 11:30') ],
    9225:[ marcaComent(m, 'guilherme', 'Bem-vindos, Goiânia! Delivery próprio desde o dia 1 é o caminho.', '28/08/2026 às 09:30'),
           marcaComent(m, 'ellen', 'Turma de Goiânia formada na Universidade do Gênio semana passada. 🎓', '28/08/2026 às 10:00') ],
    9322:[ marcaComent(m, 'ana', 'Dois gerentes novos de Uberaba inscritos!', '05/09/2026 às 09:40'),
           marcaComent(m, 'guilherme', 'Confirmado o da Consolação.', '05/09/2026 às 10:10') ],
    9323:[ marcaComent(m, 'ana', 'Já apareceu no app aqui. Bem rápido mesmo.', '03/09/2026 às 15:00'),
           marcaComent(m, 'guilherme', 'Salvou uma perda na Pinheiros semana passada. Aprovado.', '03/09/2026 às 15:30') ],
    9324:[ marcaComent(m, 'ana', 'Postado! Uberaba com o Gênio de papelão na porta. 🧞', '31/08/2026 às 11:30'),
           marcaComent(m, 'guilherme', 'A Paulista fez um time de Gênios. Foto no grupo.', '31/08/2026 às 12:00') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9221, sub:'Campanhas', date:'08/09/2026', datetime:'08/09/26 08:30', reactions:2140, comments:187, pinned:true,
      title:'Agosto do Gênio fecha com recorde de vendas na rede',
      image:ytThumb('c3VB3ZB6tZU', 'maxresdefault'),
      text:'Um mês de oferta todo dia, cupom no app e o Gênio em todas as telas. O resultado: o melhor agosto da história da rede. Os números por loja estão no artigo. 🧞',
      article:{ kicker:'Campanhas · Resultados', readTime:'4 min de leitura',
        lead:'Oferta diária, cupom no app e mídia pesada: como o Agosto do Gênio virou o melhor mês de vendas da rede e o que fica para setembro.',
        html:'<p>O Agosto do Gênio partiu de uma mecânica simples: uma oferta diferente por dia, sempre no app, sempre com o Gênio apresentando. Os filmes de 16 segundos rodaram em TV aberta, streaming e redes; o cupom fechou o ciclo na loja.</p>' +
             "<p>A rede respondeu: crescimento de dois dígitos em transações sobre agosto do ano passado, com as Bib'sfihas puxando o ticket e os Promocombos garantindo frequência. As dez lojas que mais cresceram recebem o troféu do Gênio na convenção.</p>" +
             '<p>Para setembro, a mecânica de cupom continua no app. A campanha de mídia muda de tom, mas o Gênio segue no comando.</p>' +
             '<p><a href="https://www.youtube.com/watch?v=c3VB3ZB6tZU" target="_blank" rel="noopener">Assistir ao filme no YouTube</a></p>' },
      cmts:[ marcaComent(m, 'guilherme', 'A Paulista bateu recorde de delivery três sextas seguidas. O Gênio é bruxo. 🧞‍♂️', '08/09/2026 às 09:00'),
             marcaComent(m, 'ana', 'Uberaba cresceu 18%. Time em festa!', '08/09/2026 às 09:35') ] }),
    marcaOficial(m, { id:9222, sub:'Campanhas', date:'06/09/2026', datetime:'06/09/26 12:00', reactions:876, comments:64,
      title:'Combo Campeão: o Gênio da Rodada em 7 segundos',
      yt:'GhNHmJ4rykQ',
      text:'O filme mais visto da campanha Gênio da Rodada: 3,4 milhões de views em sete segundos de Combo Campeão. Vale colocar nas TVs das lojas nos dias de jogo. ⚽' }),
    marcaOficial(m, { id:9223, sub:'Cardápio', date:'04/09/2026', datetime:'04/09/26 16:10', reactions:1320, comments:98,
      title:"Bib'sfihas da Rodada",
      yt:'i96flshVBlE',
      text:"Quase 5 milhões de pessoas viram as Bib'sfihas da Rodada. Reforço de estoque de massa e carne já programado para os fins de semana de futebol. 🥟" }),
    marcaOficial(m, { id:9224, sub:'Cardápio', date:'01/09/2026', datetime:'01/09/26 10:20', reactions:640, comments:71,
      title:"Kit Habib's Garfield: quatro almofadas para colecionar",
      image:ytThumb('8wUUl9RbCu8', 'maxresdefault'),
      text:'O kit Garfield chegou: quatro almofadas, uma por semana, com o Combo Gênio. Odeia as segundas, sarcástico, comilão e preguiçoso. Qual é o seu? 🐱' }),
    marcaOficial(m, { id:9225, sub:'Lojas', date:'28/08/2026', datetime:'28/08/26 09:00', reactions:412, comments:39,
      text:"Nova loja: Habib's Goiânia Flamboyant abre dia 12/09 com o novo padrão de fachada e delivery próprio desde o primeiro dia. Bem-vindos à rede! 🎉" })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'guilherme', { id:9321, date:'07/09/2026', datetime:'07/09/26 22:40', reactions:188, comments:26,
      text:"Jogo do Brasil, loja lotada, 1.200 Bib'sfihas em uma noite. Equipe da Paulista, vocês são gigantes. 🥟⚽",
      cmts:[ marcaComent(m, 'ana', 'Em Uberaba foram 640. Bora buscar vocês na próxima rodada!', '07/09/2026 às 23:05') ] }),
    marcaPessoa(m, 'ellen', { id:9322, date:'05/09/2026', datetime:'05/09/26 09:15', reactions:94, comments:11,
      text:'Turma de setembro da Universidade do Gênio começa dia 14. Gerentes novos, confirmem presença até quarta. 🎓' }),
    marcaPessoa(m, 'matheus', { id:9323, date:'03/09/2026', datetime:'03/09/26 14:30', reactions:67, comments:8,
      text:'Checklist de abertura atualizado no app: entrou a conferência da câmara fria antes do turno. Leva 2 minutos e evita perda. 🧊' }),
    marcaPessoa(m, 'gisele', { id:9324, date:'31/08/2026', datetime:'31/08/26 11:00', reactions:143, comments:19,
      text:'Último dia de Agosto do Gênio! Postem as fotos das lojas com a #AgostoDoGenio que a gente repostará as melhores. 📸🧞' })
  ]; }
};

/* ---------------------------------------------------------------- Petlove */
MARCAS.petlove = {
  nome:'Petlove', av:'av-marca-petlove', canal:'https://www.youtube.com/@PetloveBrasil',
  cats:[
    { id:'saude',     name:'Saúde pet',            color:'#27a689', icon:'fa-stethoscope',         active:true },
    { id:'produtos',  name:'Produtos',             color:'#e08a1e', icon:'fa-bone',                active:true },
    { id:'plano',     name:'Plano de saúde',       color:'#4E2096', icon:'fa-heart-pulse',         active:true },
    { id:'campanhas', name:'Campanhas',            color:'#c2185b', icon:'fa-bullseye',            active:true },
    { id:'cultura',   name:'Gente & Cultura',      color:'#0088FF', icon:'fa-hand-holding-heart',  active:true },
    { id:'oficiais',  name:'Comunicados oficiais', color:'#2f6fe4', icon:'fa-bullhorn',            active:true }
  ],
  shortCats:[
    { id:'produtos', name:'Produtos',       color:'#e08a1e', icon:'fa-bone',        active:true },
    { id:'saude',    name:'Saúde pet',      color:'#27a689', icon:'fa-stethoscope', active:true },
    { id:'plano',    name:'Plano de saúde', color:'#4E2096', icon:'fa-heart-pulse', active:true }
  ],
  shortsRole:'Canal oficial · YouTube',
  shorts:[
    { id:'rfk3yVAwaOE', t:'Por que o Plano de Saúde Petlove vale tanto a pena?', views:'88 mil', likes:'4,2 mil', c:210, time:'Há 3 h', cat:'plano', thumb:'hq720' },
    { id:'hw-krekIEfw', t:'Brindes do Clube Petlove', views:'74 mil', likes:'3,5 mil', c:180, time:'Há 7 h', cat:'produtos', thumb:'oardefault' },
    { id:'y_ChJ4acG0o', t:'Plano de saúde Petlove tem carência?', views:'5,9 mil', likes:'410', c:36, time:'Há 1 d', cat:'plano', thumb:'oardefault' },
    { id:'QIqKfAsvBWM', t:'Ração seca Guabi Natural Sensitive', views:'7,2 mil', likes:'380', c:22, time:'Há 1 d', cat:'produtos', thumb:'oardefault' },
    { id:'Z7wFs4C8XLg', t:'Como funciona o atendimento pelo plano de saúde', views:'4,5 mil', likes:'290', c:27, time:'Há 2 d', cat:'plano', thumb:'hq720' },
    { id:'xQTt4xKScP8', t:'Ração Guabi Natural para gatos sênior castrados', views:'3,9 mil', likes:'240', c:14, time:'Há 3 d', cat:'produtos', thumb:'oardefault' },
    { id:'c2y9haQamas', t:'Como agir em emergências com pets?', views:'3,4 mil', likes:'310', c:41, time:'Há 3 d', cat:'saude', thumb:'hq720' },
    { id:'u-SDq0lkboo', t:'GranPlus Menu', views:'2,1 mil', likes:'130', c:8, time:'Há 4 d', cat:'produtos', thumb:'oardefault' },
    { id:'00CIukHnQ24', t:'Royal Canin Obesity', views:'2,1 mil', likes:'120', c:9, time:'Há 5 d', cat:'produtos', thumb:'oardefault' },
    { id:'Fq0bb12EvNM', t:'Royal Canin porte médio', views:'1,9 mil', likes:'110', c:6, time:'Há 6 d', cat:'produtos', thumb:'oardefault' },
    { id:'ZISFt8HmglE', t:'Nossos Pets: Alérgicos (trailer)', views:'1,5 mil', likes:'140', c:17, time:'Há 7 d', cat:'saude', thumb:'hq720' },
    { id:'31_28MuCWDk', t:'Purina Pro Plan pele sensível', views:'1,2 mil', likes:'80', c:5, time:'Há 8 d', cat:'produtos', thumb:'oardefault' }
  ],
  pessoas: marcaPessoas({
    livia:  { cargo:'Médica-veterinária', unidade:'Clínica Moema' },
    ana:    { cargo:'Gerente de loja',    unidade:'Petlove Store Pinheiros' },
    eduardo:{ cargo:'Logística',          unidade:'CD Extrema' },
    gisele: { cargo:'Atendimento',        unidade:'Matriz' },
    matheus:{ cargo:'Produto',            unidade:'Matriz' }
  }),
  comunicados:[
    { c1:'#b39ddb', c2:'#4E2096', ic:'fa-syringe',         t:'Setembro: campanha de vacinação antirrábica',         d:'Dose gratuita para pets do plano e desconto para os demais. Agenda aberta no app.',                q:'08/09/2026 09:00', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-bone',            t:'Nova linha Pro Plan: treinamento do time de loja',    d:'Vídeo e quiz na Academia Petlove até 15/09. Fórmulas por porte, idade e sensibilidade.',           q:'04/09/2026 14:00', novo:true },
    { c1:'#81c784', c2:'#2e7d32', ic:'fa-mobile-screen',   t:'App Petlove 6.2 já nas lojas',                        d:'Carteirinha do plano na tela inicial e agendamento de vacina em dois toques. Mostre ao tutor.',      q:'30/08/2026 15:40', novo:true },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-heart-pulse',     t:'Plano de saúde: reajuste em outubro',                 d:'Comunicação ao tutor começa em 15/09. Roteiro de atendimento e perguntas frequentes no portal.',    q:'02/09/2026 10:20' },
    { c1:'#ff8a65', c2:'#d84315', ic:'fa-calendar-check',  t:'Recesso de fim de ano nas clínicas',                  d:'Plantão 24h mantido nas unidades Moema e Pinheiros. Demais clínicas fechadas em 25/12 e 1º/01.',    q:'28/08/2026 16:00' }
  ],
  comentarios: function(m){ return {
    9232:[ marcaComent(m, 'gisele', 'Esse episódio resolve 80% das ligações. 💜', '06/09/2026 às 12:00'),
           marcaComent(m, 'ana', 'Coloquei o QR code no balcão. Tutor assiste enquanto espera.', '06/09/2026 às 12:40') ],
    9233:[ marcaComent(m, 'livia', 'Boa fórmula para pele sensível. Já indiquei na clínica.', '04/09/2026 às 14:30'),
           marcaComent(m, 'eduardo', 'Estoque no CD com a linha completa desde ontem.', '04/09/2026 às 15:00') ],
    9234:[ marcaComent(m, 'gisele', 'Material de balcão novo ficou muito mais claro. Obrigada!', '01/09/2026 às 10:40'),
           marcaComent(m, 'livia', 'A rede de clínicas parceiras cresceu bastante. Tutores perguntam muito por isso.', '01/09/2026 às 11:15') ],
    9235:[ marcaComent(m, 'livia', 'Agenda da Moema já está 60% cheia. 💉🐾', '29/08/2026 às 09:30'),
           marcaComent(m, 'matheus', 'Agendamento pelo app com dois toques. Testem!', '29/08/2026 às 10:00') ],
    9332:[ marcaComent(m, 'eduardo', 'Reposição sai amanhã do CD Extrema, Ana.', '05/09/2026 às 13:00'),
           marcaComent(m, 'livia', 'A Pro Plan nova tem sido bem aceita pelos pacientes alérgicos.', '05/09/2026 às 13:30') ],
    9333:[ marcaComent(m, 'ana', 'Sentimos na loja! Pedido de terça chegou quarta cedo. 📦', '02/09/2026 às 09:00'),
           marcaComent(m, 'gisele', 'O 100% vem em setembro. Confiança total.', '02/09/2026 às 09:30') ],
    9334:[ marcaComent(m, 'gisele', 'A carteirinha na tela inicial acabou com metade das perguntas do chat. 🙌', '30/08/2026 às 16:00'),
           marcaComent(m, 'livia', 'Feedback: dá pra mostrar a próxima vacina do pet na mesma tela?', '30/08/2026 às 16:30') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9231, sub:'Campanhas', date:'08/09/2026', datetime:'08/09/26 09:00', reactions:1560, comments:132, pinned:true,
      title:'Xuxa + Petlove: juntas pelo cuidado com os pets',
      image:ytThumb('0oHeKLkpb80', 'maxresdefault'),
      text:'A Xuxa é a nova embaixadora do Plano de Saúde Petlove. A série "Xuxa Responde" tira as dúvidas mais comuns dos tutores em vídeos de um minuto. 💜🐾',
      article:{ kicker:'Campanhas · Plano de saúde', readTime:'3 min de leitura',
        lead:'Carência, coparticipação, atendimento em casa: as perguntas que mais chegam ao atendimento agora têm resposta em vídeo, com a Xuxa.',
        html:'<p>A parceria com a Xuxa nasceu de um dado do atendimento: metade das dúvidas sobre o Plano de Saúde Petlove são as mesmas cinco perguntas. A série "Xuxa Responde" transforma cada uma em um vídeo curto, direto e com o tom de quem cuida de bicho há décadas.</p>' +
             '<p>Os episódios já passaram de 500 mil visualizações somadas. O mais visto, "Tem atendimento em casa?", ultrapassou 200 mil em um mês.</p>' +
             '<p>Para as lojas e clínicas: o QR code da série está no novo folheto do plano. Aponte o tutor para o vídeo antes de explicar a tabela.</p>' +
             '<p><a href="https://www.youtube.com/watch?v=0oHeKLkpb80" target="_blank" rel="noopener">Assistir no YouTube</a></p>' },
      cmts:[ marcaComent(m, 'gisele', 'As ligações perguntando o que é carência caíram pela metade. Obrigada, Xuxa! 💜', '08/09/2026 às 09:40'),
             marcaComent(m, 'livia', 'Os tutores chegam na clínica já sabendo como funciona. Facilita demais a consulta.', '08/09/2026 às 10:15') ] }),
    marcaOficial(m, { id:9232, sub:'Plano de saúde', date:'06/09/2026', datetime:'06/09/26 11:30', reactions:720, comments:58,
      title:'Xuxa Responde: qual plano escolher?',
      yt:'tFZKoluYSuM',
      text:'Episódio novo: qual plano escolher para cada pet e cada bolso. Um minuto que resolve a conversa mais longa do balcão. 🐶🐱' }),
    marcaOficial(m, { id:9233, sub:'Produtos', date:'04/09/2026', datetime:'04/09/26 14:00', reactions:340, comments:27,
      title:'Nova linha Pro Plan chegou às lojas e ao app',
      yt:'nHi34Ac9KsQ',
      text:'A nova linha Purina Pro Plan já está no app e nas Petlove Stores. O vídeo explica as fórmulas por porte, idade e sensibilidade. 🦴' }),
    marcaOficial(m, { id:9234, sub:'Plano de saúde', date:'01/09/2026', datetime:'01/09/26 10:10', reactions:498, comments:44,
      title:'Plano de Saúde Petlove: para todo tipo de pet e de bolso',
      image:ytThumb('KJ_gHt2GlZE', 'maxresdefault'),
      text:'Novo filme do plano no ar, com as três faixas de cobertura e a rede de clínicas parceiras. Material de balcão atualizado na pasta do plano. 💜' }),
    marcaOficial(m, { id:9235, sub:'Saúde pet', date:'29/08/2026', datetime:'29/08/26 08:45', reactions:610, comments:53,
      text:'Setembro é mês de vacinação antirrábica nas clínicas Petlove: dose gratuita para pets de clientes do plano e desconto para os demais. Agenda aberta no app. 💉🐾' })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'livia', { id:9331, date:'07/09/2026', datetime:'07/09/26 17:20', reactions:231, comments:29,
      text:'Sábado de 62 atendimentos na clínica Moema e nenhuma emergência grave. Prevenção funciona, gente. 🩺💜',
      cmts:[ marcaComent(m, 'gisele', 'Recorde da unidade? Parabéns, Livia!', '07/09/2026 às 17:50') ] }),
    marcaPessoa(m, 'ana', { id:9332, date:'05/09/2026', datetime:'05/09/26 12:30', reactions:118, comments:14,
      text:'A Pro Plan nova chegou em Pinheiros e o primeiro pallet acabou em dois dias. Pedido de reposição já no sistema. 🦴' }),
    marcaPessoa(m, 'eduardo', { id:9333, date:'02/09/2026', datetime:'02/09/26 08:10', reactions:76, comments:7,
      text:'CD Extrema com 99,2% de pedidos entregues no prazo em agosto. Quase lá no 100%. 📦' }),
    marcaPessoa(m, 'matheus', { id:9334, date:'30/08/2026', datetime:'30/08/26 15:40', reactions:164, comments:22,
      text:'Versão nova do app: carteirinha do plano na tela inicial e agendamento de vacina em dois toques. Testem e mandem feedback! 📱' })
  ]; }
};

/* ---------------------------------------------------------------- Piticas */
MARCAS.piticas = {
  nome:'Piticas', av:'av-marca-piticas', canal:'https://www.youtube.com/@piticas',
  cats:[
    { id:'lancamentos', name:'Lançamentos',          color:'#ED7E0A', icon:'fa-shirt',               active:true },
    { id:'lojas',       name:'Lojas',                color:'#2f6fe4', icon:'fa-store',               active:true },
    { id:'comunidade',  name:'Comunidade geek',      color:'#8161d8', icon:'fa-gamepad',             active:true },
    { id:'campanhas',   name:'Campanhas',            color:'#c2185b', icon:'fa-bullseye',            active:true },
    { id:'cultura',     name:'Gente & Cultura',      color:'#27a689', icon:'fa-hand-holding-heart',  active:true },
    { id:'oficiais',    name:'Comunicados oficiais', color:'#0088FF', icon:'fa-bullhorn',            active:true }
  ],
  alias:{ colecoes:'lancamentos' },
  shortCats:[
    { id:'lojas',      name:'Lojas',      color:'#2f6fe4', icon:'fa-store',   active:true },
    { id:'colecoes',   name:'Coleções',   color:'#ED7E0A', icon:'fa-shirt',   active:true },
    { id:'comunidade', name:'Comunidade', color:'#8161d8', icon:'fa-gamepad', active:true }
  ],
  /* shorts da comunidade sobre a marca, compartilhados pelo Marketing */
  shortsRole:'Marketing · Matriz', shortsPrefixo:'Da comunidade 🧡 ',
  shorts:[
    { id:'wPv99rQAxxk', t:'Novo espaço Piticas 😱😍', views:'1,5 mil', likes:'140', c:12, time:'Há 3 h', cat:'lojas', thumb:'oardefault' },
    { id:'5q7d7IWGR4Y', t:'O dia que fui na Piticas 🤩', views:'5,8 mil', likes:'430', c:38, time:'Há 6 h', cat:'comunidade', thumb:'hq720' },
    { id:'nfsIsEHEtfE', t:'Piticas… difícil até se desfazer', views:'3,6 mil', likes:'290', c:21, time:'Há 1 d', cat:'colecoes', thumb:'oardefault' },
    { id:'9ybbjvkQCrg', t:'Cadê os fãs de The Boys 🔥? Camiseta by Piticas', views:'2,5 mil', likes:'210', c:17, time:'Há 1 d', cat:'colecoes', thumb:'hq720' },
    { id:'yN_RiswQS6k', t:'Camisetas Marvel e DC: Capitão América, Hulk, Coringa e Batman', views:'2 mil', likes:'150', c:9, time:'Há 2 d', cat:'colecoes', thumb:'hqdefault' },
    { id:'p_qXtKUVWUE', t:'Piticas, loja geek incrível', views:'1,7 mil', likes:'130', c:8, time:'Há 3 d', cat:'lojas', thumb:'oardefault' },
    { id:'K4XBgCH5V0o', t:'A loja da Piticas é top para presentear quem você ama no mundo nerd', views:'827', likes:'70', c:5, time:'Há 4 d', cat:'lojas', thumb:'oardefault' },
    { id:'ZLqyrCQ-jys', t:'Camisetas estilosas da loja Piticas', views:'750', likes:'62', c:4, time:'Há 5 d', cat:'colecoes', thumb:'oardefault' },
    { id:'8HG91NZZfi4', t:'Piticas Outlet para quem gosta de camisetas de heróis', views:'686', likes:'55', c:3, time:'Há 6 d', cat:'lojas', thumb:'oardefault' },
    { id:'odpN4IlMHm0', t:'Viciados em cultura nerd mostram suas camisas favoritas na loja Piticas 😜', views:'389', likes:'34', c:6, time:'Há 7 d', cat:'comunidade', thumb:'oardefault' },
    { id:'mn57uLEgtS8', t:'Minhas novas camisetas nerd da Piticas', views:'328', likes:'29', c:2, time:'Há 8 d', cat:'colecoes', thumb:'oardefault' },
    { id:'PeN37yDEeLE', t:'Recebidos da loja Piticas, se liga nessa lindeza', views:'303', likes:'27', c:3, time:'Há 9 d', cat:'comunidade', thumb:'hq720' }
  ],
  pessoas: marcaPessoas({
    ana:      { cargo:'Gerente de loja', unidade:'Tietê Plaza' },
    guilherme:{ cargo:'Franqueado',      unidade:'Curitiba', unidades:['Curitiba', 'Joinville'] },
    gisele:   { cargo:'Marketing',       unidade:'Matriz' },
    matheus:  { cargo:'Fábrica',         unidade:'Barra Bonita' },
    ellen:    { cargo:'Expansão',        unidade:'Matriz' }
  }),
  comunicados:[
    { c1:'#ffcc80', c2:'#ED7E0A', ic:'fa-gamepad',         t:'CCXP 2026: escala de voluntários aberta',             d:'Estande de 200 m² e coleção exclusiva. Inscreva-se até 30/09; hospedagem por conta da Matriz.',   q:'08/09/2026 09:30', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-shirt',           t:'Coleção Dragon Ball: reposição extra',                d:'Lote adicional sai da fábrica em 10/09 para as 40 lojas com maior giro. Confira o seu pedido.',    q:'07/09/2026 20:30', novo:true },
    { c1:'#81c784', c2:'#2e7d32', ic:'fa-store',           t:'Novo padrão de vitrine a partir de setembro',         d:'Manual com fotos no portal. Checklist com foto obrigatório até 20/09.',                             q:'02/09/2026 11:00', novo:true },
    { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-users',           t:'Convenção de franqueados: 14/10 em Barra Bonita',     d:'Visita à fábrica, apresentação da coleção 2027 e premiação das lojas do ano.',                      q:'01/09/2026 09:00' },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-children',        t:'Dia das Crianças: campanha e materiais',              d:'Coleção infantil licenciada chega em 25/09. Materiais de vitrine junto com o lote.',                 q:'29/08/2026 15:10' }
  ],
  comentarios: function(m){ return {
    9242:[ marcaComent(m, 'ana', 'Vendedor novo assiste isso e já entende por que a malha é diferente. 👕', '06/09/2026 às 15:00'),
           marcaComent(m, 'matheus', 'Orgulho da fábrica! Venham visitar, o café é por nossa conta.', '06/09/2026 às 15:30') ],
    9243:[ marcaComent(m, 'guilherme', 'O cara filmou melhor que o nosso catálogo mesmo. 😂', '04/09/2026 às 11:30'),
           marcaComent(m, 'gisele', 'Já convidamos ele pra CCXP.', '04/09/2026 às 12:00') ],
    9244:[ marcaComent(m, 'ellen', 'Já chegaram 40 formulários na primeira semana. 🧡', '01/09/2026 às 10:00'),
           marcaComent(m, 'guilherme', 'Indiquei um amigo de Joinville. Ele respira Star Wars.', '01/09/2026 às 10:40') ],
    9245:[ marcaComent(m, 'ana', 'Me inscrevi como voluntária! Dezembro chega logo. 🎮', '28/08/2026 às 09:15'),
           marcaComent(m, 'matheus', 'A coleção exclusiva está linda. Não posso falar mais. 🤐', '28/08/2026 às 09:50') ],
    9342:[ marcaComent(m, 'ana', 'Isso é Piticas mesmo. Aqui teve cliente que chorou com a camiseta do Naruto.', '05/09/2026 às 13:30'),
           marcaComent(m, 'gisele', 'Manda essa história pro mural da CCXP!', '05/09/2026 às 14:00') ],
    9343:[ marcaComent(m, 'guilherme', 'Curitiba quer o primeiro lote! 🙏', '03/09/2026 às 10:20'),
           marcaComent(m, 'gisele', 'Lote da CCXP é exclusivo do evento, Guilherme. Depois a gente conversa. 😉', '03/09/2026 às 10:45') ],
    9344:[ marcaComent(m, 'guilherme', 'Florianópolis! Finalmente uma loja perto da praia. 🗺️', '30/08/2026 às 11:00'),
           marcaComent(m, 'ana', 'Manaus vai bombar. Cultura geek forte por lá.', '30/08/2026 às 11:30') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9241, sub:'Comunicados oficiais', date:'08/09/2026', datetime:'08/09/26 09:30', reactions:486, comments:47, pinned:true,
      title:'Piticas e SULTS: como a maior marca geek do Brasil conecta mais de 300 lojas',
      image:ytThumb('wwyMZtnfCY4', 'maxresdefault'),
      text:'A história de sucesso da Piticas com o SULTS virou vídeo: comunicação, checklist e treinamento da rede em um só lugar. Assista e compartilhe com a sua equipe. 🧡',
      article:{ kicker:'Comunicados oficiais · Rede', readTime:'3 min de leitura',
        lead:'De Barra Bonita para os shoppings do país inteiro: o que muda quando toda a rede fala pela mesma plataforma.',
        html:'<p>A Piticas cresceu rápido. Com mais de 300 lojas, a comunicação por grupo de mensagens e planilha deixou de dar conta: coleção nova chegava em uma loja e a vizinha nem sabia.</p>' +
             '<p>Hoje o lançamento sai como comunicado, o visual merchandising vira checklist com foto e o treinamento do vendedor acontece no mesmo lugar. Esta rede social é a próxima peça: o que acontece na loja aparece para a rede inteira.</p>' +
             '<p>O vídeo da história de sucesso, gravado com o time da Matriz, está no canal do SULTS.</p>' +
             '<p><a href="https://www.youtube.com/watch?v=wwyMZtnfCY4" target="_blank" rel="noopener">Assistir no YouTube</a></p>' },
      cmts:[ marcaComent(m, 'guilherme', 'Lembro da época da planilha. Não volto nem amarrado. 😂', '08/09/2026 às 10:00'),
             marcaComent(m, 'ana', 'O checklist com foto salvou a minha vitrine mais de uma vez.', '08/09/2026 às 10:35') ] }),
    marcaOficial(m, { id:9242, sub:'Comunicados oficiais', date:'06/09/2026', datetime:'06/09/26 14:20', reactions:312, comments:28,
      title:'Por dentro da fábrica Piticas',
      yt:'PNpQLQA2kSs',
      text:'Da malha ao cabide: o tour pela fábrica em Barra Bonita mostra como uma camiseta Piticas nasce. Bom para o treinamento de vendedor novo. 👕' }),
    marcaOficial(m, { id:9243, sub:'Lançamentos', date:'04/09/2026', datetime:'04/09/26 11:00', reactions:274, comments:31,
      title:'Novidades da Piticas: as camisetas que todo geek vai querer',
      yt:'KXTKSKu_9GI',
      text:'O SuperGeekTV passou uma hora na loja e mostrou a coleção nova peça por peça. Repostamos porque ficou melhor que o nosso catálogo. 😄' }),
    marcaOficial(m, { id:9244, sub:'Lojas', date:'01/09/2026', datetime:'01/09/26 09:15', reactions:198, comments:16,
      title:'Seja um franqueado Piticas',
      image:ytThumb('h7jytBU5W_s', 'maxresdefault'),
      text:'A campanha de expansão de 2026 está no ar. Se conhece alguém que respira cultura pop e quer empreender, o formulário está no site. 🧡' }),
    marcaOficial(m, { id:9245, sub:'Campanhas', date:'28/08/2026', datetime:'28/08/26 08:40', reactions:653, comments:72,
      text:'CCXP 2026 confirmada! Estande de 200 m², coleção exclusiva do evento e escala de voluntários da rede aberta a partir de hoje. Dezembro chegou mais cedo. 🎮🦸' })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'ana', { id:9341, date:'07/09/2026', datetime:'07/09/26 20:10', reactions:203, comments:24,
      text:'Domingo no Tietê Plaza: fila para a coleção de Dragon Ball. Repus a vitrine três vezes. Quem disse que geek não sai de casa? 🐉',
      cmts:[ marcaComent(m, 'gisele', 'Reposição extra da coleção sai amanhã pra vocês!', '07/09/2026 às 20:30') ] }),
    marcaPessoa(m, 'guilherme', { id:9342, date:'05/09/2026', datetime:'05/09/26 13:00', reactions:141, comments:17,
      text:'Cliente veio de Joinville só pra comprar a camiseta do The Boys. Deu um abraço na equipe e foi embora. Isso é Piticas. 🧡' }),
    marcaPessoa(m, 'matheus', { id:9343, date:'03/09/2026', datetime:'03/09/26 09:50', reactions:88, comments:9,
      text:'Fábrica em ritmo de CCXP: as primeiras peças da coleção exclusiva saem da estamparia semana que vem. 👕🏭' }),
    marcaPessoa(m, 'ellen', { id:9344, date:'30/08/2026', datetime:'30/08/26 10:30', reactions:117, comments:13,
      text:'Três novas lojas assinadas em agosto: Manaus, Campo Grande e Florianópolis. A Piticas chega a 27 estados. 🗺️' })
  ]; }
};

/* ---------------------------------------------------------------- Gatitos (ficticia) */
/* rede de ONGs de adocao de gatos: abrigos parceiros, lares temporarios,
   feiras de adocao e mutiroes. As pessoas da rede sao gatos, com avatares em
   gradiente (nao ha fotos). Os shorts sao os videos de gatos de verdade mais
   vistos do YouTube (nada gerado por IA). */
MARCAS.gatitos = {
  nome:'Gatitos', av:'av-marca-gatitos', canal:'https://www.youtube.com/results?search_query=gatos+fofos',
  cats:[
    { id:'miados',      name:'Miados oficiais', color:'#c2185b', icon:'fa-bullhorn',            active:true },
    { id:'adocao',      name:'Adoção',          color:'#e0398b', icon:'fa-heart',               active:true },
    { id:'abrigos',     name:'Abrigos',         color:'#2f6fe4', icon:'fa-house-chimney',       active:true },
    { id:'voluntarios', name:'Voluntariado',    color:'#27a689', icon:'fa-hand-holding-heart',  active:true },
    { id:'saude',       name:'Saúde',           color:'#e08a1e', icon:'fa-stethoscope',         active:true },
    { id:'cultura',     name:'Gente & Cultura', color:'#8161d8', icon:'fa-users',               active:true }
  ],
  alias:{ fofura:'adocao', travessura:'miados' },
  shortCats:[
    { id:'fofura',     name:'Fofura',     color:'#e0398b', icon:'fa-heart',           active:true },
    { id:'travessura', name:'Travessura', color:'#c2185b', icon:'fa-face-grin-tears', active:true }
  ],
  shortsRole:'Miados oficiais · YouTube',
  shorts:[
    { id:'KAtH5U8n_tU', t:'Os momentos mais fofos de filhotes 😻', views:'61 mi', likes:'3,4 mi', c:16000, time:'Há 1 h', cat:'fofura', thumb:'oardefault' },
    { id:'qa-qfo8AbD0', t:'Gatinhos e furiosos 😼', views:'58 mi', likes:'3,2 mi', c:15000, time:'Há 3 h', cat:'travessura', thumb:'hq720' },
    { id:'Z5Cpwn60ySI', t:'Funny cat videos 😂', views:'57 mi', likes:'3,1 mi', c:15000, time:'Há 6 h', cat:'travessura', thumb:'oardefault' },
    { id:'1UgJI6O8T2U', t:'Tente não rir: compilado de gatos 🐈', views:'57 mi', likes:'3 mi', c:14000, time:'Há 9 h', cat:'travessura', thumb:'oardefault' },
    { id:'TyFfmJVRAjE', t:'Quando seu gato só pensa em comer kkkk', views:'36 mi', likes:'2,4 mi', c:11000, time:'Há 1 d', cat:'travessura', thumb:'oardefault' },
    { id:'ih7q2SE5M18', t:'Ranking dos momentos mais engraçados de gatos com água 💦', views:'28 mi', likes:'2,2 mi', c:9800, time:'Há 1 d', cat:'travessura', thumb:'oardefault' },
    { id:'bebx5XjCd7w', t:'Eu disse a verdade para os meus gatos', views:'24 mi', likes:'1,9 mi', c:12000, time:'Há 1 d', cat:'travessura', thumb:'oardefault' },
    { id:'qDs6GLAWn4w', t:'Ranking dos melhores momentos de filhotes 🐾', views:'23 mi', likes:'1,6 mi', c:7400, time:'Há 2 d', cat:'fofura', thumb:'oardefault' },
    { id:'ViCD5WUpEr0', t:'Gatinho filhote miando 😽', views:'18 mi', likes:'1,1 mi', c:5600, time:'Há 2 d', cat:'fofura', thumb:'hqdefault' },
    { id:'CHNfTJGdBsc', t:'Olha o gato do mal 😱', views:'15 mi', likes:'980 mil', c:4900, time:'Há 2 d', cat:'travessura', thumb:'oardefault' },
    { id:'3s2bd6-BhK8', t:'Top 10 momentos mais fofos de gatinhos', views:'14 mi', likes:'920 mil', c:4300, time:'Há 3 d', cat:'fofura', thumb:'hq720' },
    { id:'MqppCgaND68', t:'Miado de gato super fofo 😻', views:'13 mi', likes:'870 mil', c:4100, time:'Há 3 d', cat:'fofura', thumb:'hq720' },
    { id:'70K1BhzWXBk', t:'O gatinho só queria jogar bola! ⚽', views:'13 mi', likes:'890 mil', c:5200, time:'Há 3 d', cat:'fofura', thumb:'hq720' },
    { id:'mt7K46UN_34', t:'Top 5 momentos engraçados de gatos', views:'11 mi', likes:'720 mil', c:3300, time:'Há 4 d', cat:'travessura', thumb:'oardefault' },
    { id:'ZBbOn4JzlMo', t:'Compilado: tente não rir! 😹', views:'8,8 mi', likes:'640 mil', c:3900, time:'Há 4 d', cat:'travessura', thumb:'hq720' },
    { id:'V4BxYUMBQag', t:'Gatinhos engraçados 😹', views:'4,6 mi', likes:'320 mil', c:1700, time:'Há 5 d', cat:'travessura', thumb:'oardefault' },
    { id:'s4rE5DOYLxE', t:'Gato preto no modo vampiro 🧛', views:'3,7 mi', likes:'260 mil', c:1400, time:'Há 5 d', cat:'travessura', thumb:'hq720' },
    { id:'UF5MLCkyGzs', t:'Top 10 gatinhos mais engraçados 😂', views:'3,2 mi', likes:'210 mil', c:1300, time:'Há 6 d', cat:'fofura', thumb:'oardefault' },
    { id:'Q8_xLSPtlms', t:'Que cheiro é esse??? 🤣', views:'2,2 mi', likes:'160 mil', c:900, time:'Há 6 d', cat:'travessura', thumb:'oardefault' },
    { id:'dX9IA2eyN9I', t:'Veja como seu gato reage a esse áudio 🔊', views:'2,1 mi', likes:'150 mil', c:1200, time:'Há 7 d', cat:'travessura', thumb:'hq720' },
    { id:'b4zPQX8Zyhs', t:'Gatos engraçados: tente não rir 😂😍', views:'1,7 mi', likes:'120 mil', c:700, time:'Há 7 d', cat:'travessura', thumb:'hq720' },
    { id:'kHjjz9Nyfm0', t:'Gatinho bebê fofinho na mão 🐾', views:'1,4 mi', likes:'110 mil', c:620, time:'Há 8 d', cat:'fofura', thumb:'hq720' },
    { id:'IAwpmNP27pg', t:'Top 5 sustos de gatos mais engraçados 😹', views:'415 mil', likes:'31 mil', c:640, time:'Há 9 d', cat:'travessura', thumb:'oardefault' },
    { id:'eVT-lPhS-LA', t:'Ele só queria fazer carinho kkkk 🐈', views:'281 mil', likes:'19 mil', c:410, time:'Há 10 d', cat:'fofura', thumb:'oardefault' }
  ],
  /* as pessoas da rede sao voluntarios de carne e osso, com as fotos que o
     prototipo ja tem; os gatos aparecem nas publicacoes, nao no crachá */
  pessoas: marcaPessoas({
    livia:    { cargo:'Coordenadora de abrigo', unidade:'Abrigo Vila Madalena' },
    guilherme:{ cargo:'Voluntário',             unidade:'Abrigo Copacabana', unidades:['Abrigo Copacabana', 'Abrigo Ipanema', 'Abrigo Leblon'] },
    gisele:   { cargo:'Lar temporário',         unidade:'Matriz' },
    eduardo:  { cargo:'Resgate noturno',        unidade:'Abrigo Ribeirão' },
    ellen:    { cargo:'Gente & Miados',         unidade:'Matriz' }
  }),
  comunicados:[
    { c1:'#f48fb1', c2:'#c2185b', ic:'fa-heart',           t:'Setembro da adoção: feiras em todos os abrigos',    d:'Sábados de setembro, das 10h às 16h. Kit de boas-vindas e primeira consulta por conta da Gatitos.',        q:'08/09/2026 09:00', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-syringe',         t:'Mutirão de castração: 20 e 21/09',                   d:'Vagas gratuitas para gatos resgatados e de tutores de baixa renda. Abrigos devem enviar a lista até 15/09.', q:'05/09/2026 14:30', novo:true },
    { c1:'#81c784', c2:'#2e7d32', ic:'fa-hand-holding-heart', t:'Voluntários para o fim de semana',               d:'Faltam 18 pessoas para as feiras de sábado. Duas horas já ajudam. Inscreva-se no portal.',                 q:'04/09/2026 10:15', novo:true },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-bowl-food',       t:'Campanha de ração: meta de 2 toneladas',             d:'Pontos de coleta em todas as lojas parceiras até 30/09. Já arrecadamos 800 kg.',                          q:'01/09/2026 11:40' },
    { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-moon',            t:'Soneca coletiva: nova política',                    d:'Das 13h às 15h ninguém atende telefone. Gato que miar mais alto é atendido primeiro.',                     q:'28/08/2026 16:00' }
  ],
  comentarios: function(m){ return {
    9251:[ marcaComent(m, 'guilherme', 'Quarenta abrigos e nenhum com sofá de couro. Falha grave. 🛋️', '08/09/2026 às 09:30'),
           marcaComent(m, 'livia', 'Orgulho da rede! O da Vila Madalena foi o terceiro, lembro como se fosse ontem.', '08/09/2026 às 10:00') ],
    9252:[ marcaComent(m, 'eduardo', 'Vi na ronda da noite. Ri demais e acordei o abrigo inteiro.', '06/09/2026 às 23:10'),
           marcaComent(m, 'ellen', 'Já está na TV da sala de espera. Ninguém mais reclama da fila. 😹', '07/09/2026 às 09:00') ],
    9253:[ marcaComent(m, 'gisele', 'Doze gatinhos do meu lar temporário adotados em um sábado. Casa vazia, coração cheio. 🧡', '02/09/2026 às 18:00'),
           marcaComent(m, 'guilherme', 'Copacabana fez 31! Recorde da zona sul.', '02/09/2026 às 18:20') ],
    9254:[ marcaComent(m, 'livia', 'Lista da Vila Madalena enviada: 26 gatos. Obrigada, veterinários!', '04/09/2026 às 15:00'),
           marcaComent(m, 'eduardo', 'Os resgatados da semana passada entram nessa leva. 🙏', '04/09/2026 às 15:40') ],
    9255:[ marcaComent(m, 'ellen', 'Pipoca sem manteiga, por favor. Pelo pelo.', '29/08/2026 às 17:00'),
           marcaComent(m, 'gisele', 'Levo os petiscos. Não prometo que sobra.', '29/08/2026 às 17:30') ],
    9351:[ marcaComent(m, 'ellen', 'Dona Mimi, a caixa é do abrigo. Devolve depois. 📦', '07/09/2026 às 19:00'),
           marcaComent(m, 'guilherme', 'Recorde de adoções e recorde de soneca no mesmo dia. Ícone.', '07/09/2026 às 19:30') ],
    9352:[ marcaComent(m, 'livia', 'Três abrigos e nenhuma janela pra mim? Vou reclamar no RH.', '05/09/2026 às 12:00'),
           marcaComent(m, 'ellen', 'O RH sou eu. Reclamação recebida e ignorada com carinho. 😽', '05/09/2026 às 12:20') ],
    9353:[ marcaComent(m, 'eduardo', 'Conheço o Pudim. Ronrona no volume máximo. Alguém adota logo.', '03/09/2026 às 10:00'),
           marcaComent(m, 'guilherme', 'Já mandei pra três amigos. Um vai amanhã conhecer.', '03/09/2026 às 10:15') ],
    9354:[ marcaComent(m, 'gisele', 'Os quatro chegam no meu lar temporário hoje. Já separei a caixa.', '01/09/2026 às 08:30'),
           marcaComent(m, 'livia', 'Herói. Descansa um pouco, Tom. 🧡', '01/09/2026 às 08:45') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9251, sub:'Miados oficiais', date:'08/09/2026', datetime:'08/09/26 09:00', reactions:940, comments:88, pinned:true,
      title:'Gatitos chega a 40 abrigos parceiros em 12 estados',
      image:ytThumb('ZBbOn4JzlMo', 'hq720'),
      text:'O quadragésimo abrigo entrou na rede em Curitiba, com 60 gatos esperando um lar. O que aprendemos em cinco anos de ONGs conectadas está no artigo. 🐾',
      article:{ kicker:'Miados oficiais · Rede', readTime:'3 min de leitura',
        lead:'De um lar temporário em São Paulo a 40 abrigos parceiros: como a Gatitos virou a maior rede de adoção de gatos do país.',
        html:'<p>A Gatitos começou em 2021 com um lar temporário e uma planilha de adoções. A tese era simples: abrigo sozinho resgata; abrigo em rede resgata, trata, castra e encontra família.</p>' +
             '<p>Cinco anos depois são 40 abrigos parceiros, mutirões mensais de castração, feiras de adoção todo sábado e mais de 9 mil gatos adotados. O que era planilha virou esta rede: o que acontece em um abrigo aparece para todos.</p>' +
             '<p>Bem-vindos, Curitiba. Miem à vontade.</p>' },
    }),
    marcaOficial(m, { id:9252, sub:'Gente & Cultura', date:'06/09/2026', datetime:'06/09/26 18:00', reactions:1210, comments:97,
      title:'Sessão pipoca de sexta: uma hora de gatos engraçados',
      yt:'3URtTIdnXIk',
      text:'A sala de espera da Matriz virou cinema. Uma hora de gatos fazendo gataria para assistir com voluntários e visitantes no fim do dia. Pipoca sem manteiga, por causa do pelo. 🍿' }),
    marcaOficial(m, { id:9253, sub:'Adoção', date:'02/09/2026', datetime:'02/09/26 10:00', reactions:1480, comments:123,
      title:'Primeiro sábado de setembro: 312 gatos adotados',
      image:'uploads/gatitos/adocao/irmaos.jpg',
      text:'Melhor sábado da história da rede. Kit de boas-vindas, primeira consulta e desconto vitalício em castração para quem adotou. Próxima feira: sábado que vem, em todos os abrigos. 🧡' }),
    marcaOficial(m, { id:9254, sub:'Saúde', date:'04/09/2026', datetime:'04/09/26 14:20', reactions:530, comments:41,
      title:'Mutirão de castração: como funciona',
      yt:'ZBbOn4JzlMo',
      text:'Dias 20 e 21/09, vagas gratuitas para gatos resgatados e de tutores de baixa renda. O vídeo mostra o passo a passo do mutirão, da triagem à recuperação. 🩺' }),
    marcaOficial(m, { id:9255, sub:'Miados oficiais', date:'29/08/2026', datetime:'29/08/26 16:30', reactions:376, comments:29,
      text:'Convenção Miau 2026 confirmada para 22 e 23/10 em Campos do Jordão. Coordenadores de abrigo, veterinários parceiros e voluntários. Frio, lareira e caixa de papelão individual. 📦' })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'livia', { id:9351, date:'07/09/2026', datetime:'07/09/26 18:40', reactions:312, comments:34,
      text:'Recorde de adoções na Vila Madalena e eu dormi 14 horas dentro da caixa do kit de boas-vindas. Multitarefa. 📦😼' }),
    marcaPessoa(m, 'guilherme', { id:9352, date:'05/09/2026', datetime:'05/09/26 11:30', reactions:187, comments:22,
      text:'Abrigo do Leblon inaugurado! Três abrigos na zona sul, três janelas ensolaradas. A vida de voluntário é dura, mas alguém tem que deitar nelas.' }),
    marcaPessoa(m, 'gisele', { id:9353, date:'03/09/2026', datetime:'03/09/26 09:45', reactions:264, comments:48,
      text:'Pudim, 2 anos, castrado, vacinado e ronronador profissional. Está no meu lar temporário esperando alguém. Quem leva? 🐟',
      image:'uploads/gatitos/adocao/pudim.jpg' }),
    marcaPessoa(m, 'livia', { id:9355, date:'06/09/2026', datetime:'06/09/26 16:20', reactions:341, comments:57,
      text:'Mel, 8 meses, chegou ao abrigo em maio com um irmão. Ele já foi adotado; ela ficou. Sábado ela estará na feira da Vila Madalena. 🎀',
      image:'uploads/gatitos/adocao/mel.jpg' }),
    marcaPessoa(m, 'eduardo', { id:9354, date:'01/09/2026', datetime:'01/09/26 07:15', reactions:98, comments:15,
      text:'Ronda da noite em Ribeirão: quatro filhotes resgatados de um terreno. Estão bem, aquecidos e já com nome. Lar temporário confirmado.',
      image:'uploads/gatitos/adocao/tigrinho.jpg' })
  ]; }
};

/* ---------------------------------------------------------------- Marvel */
/* o canal oficial da Marvel no YouTube; as pessoas da rede sao personagens,
   com avatares nas cores de cada um (nao ha retratos no projeto) */
MARCAS.marvel = {
  nome:'Marvel', av:'av-marca-marvel', canal:'https://www.youtube.com/@Marvel',
  cats:[
    { id:'oficiais',  name:'Comunicados oficiais', color:'#ED1D24', icon:'fa-bullhorn',            active:true },
    { id:'cinema',    name:'Cinema',               color:'#2f6fe4', icon:'fa-film',                active:true },
    { id:'series',    name:'Séries',               color:'#8161d8', icon:'fa-tv',                  active:true },
    { id:'quadrinhos',name:'Quadrinhos',           color:'#e08a1e', icon:'fa-book-open',           active:true },
    { id:'games',     name:'Games',                color:'#27a689', icon:'fa-gamepad',             active:true },
    { id:'cultura',   name:'Gente & Cultura',      color:'#c2185b', icon:'fa-hand-holding-heart',  active:true }
  ],
  alias:{ bastidores:'cultura', personagens:'quadrinhos' },
  shortCats:[
    { id:'personagens', name:'Personagens', color:'#ED1D24', icon:'fa-mask',        active:true },
    { id:'bastidores',  name:'Bastidores',  color:'#2f6fe4', icon:'fa-clapperboard', active:true },
    { id:'games',       name:'Games',       color:'#27a689', icon:'fa-gamepad',      active:true }
  ],
  shortsRole:'Canal oficial · YouTube',
  shorts:[
    { id:'rd8zBiitdmE', t:'Momentos épicos do MCU', views:'693 mil', likes:'42 mil', c:1900, time:'Há 1 h', cat:'personagens', thumb:'oardefault' },
    { id:'KB0khGh7sec', t:'Kevin Feige explica o aperto de mão do Peter e do Ned 🕸️', views:'424 mil', likes:'28 mil', c:1200, time:'Há 3 h', cat:'bastidores', thumb:'hq720' },
    { id:'bOreolmPxSI', t:'Glorious Purpose.', views:'254 mil', likes:'19 mil', c:860, time:'Há 6 h', cat:'personagens', thumb:'oardefault' },
    { id:'XnzKUvKd6UI', t:'VisionQuest: trailer oficial', views:'193 mil', likes:'14 mil', c:740, time:'Há 9 h', cat:'bastidores', thumb:'hq720' },
    { id:'etHM3e6uzT0', t:'Os mundos do MCU', views:'132 mil', likes:'9,8 mil', c:410, time:'Há 1 d', cat:'personagens', thumb:'oardefault' },
    { id:'3nAvnqaowZs', t:'Paul Bettany fala sobre o Visão em VisionQuest', views:'111 mil', likes:'8,1 mil', c:390, time:'Há 1 d', cat:'bastidores', thumb:'hq720' },
    { id:'Jjly2VfeUvg', t:'Nada como um cabelo do Loki ao vento 💚', views:'109 mil', likes:'12 mil', c:620, time:'Há 1 d', cat:'personagens', thumb:'hq720' },
    { id:'Na14ZezuTP8', t:'Capitão América vs. Caveira Vermelha', views:'109 mil', likes:'7,6 mil', c:340, time:'Há 2 d', cat:'personagens', thumb:'hq720' },
    { id:'yexpcS3Ugf0', t:'Iman Vellani mergulha na jornada de Ultron', views:'101 mil', likes:'7,2 mil', c:300, time:'Há 2 d', cat:'bastidores', thumb:'hq720' },
    { id:'-GrXJ5WXWME', t:'O segredo para desenhar o Homem-Aranha 🕷️', views:'100 mil', likes:'8,9 mil', c:520, time:'Há 2 d', cat:'bastidores', thumb:'oardefault' },
    { id:'tovoN_6iDvE', t:'A paixão do Justiceiro por sabonete é incomparável ⚡️', views:'98 mil', likes:'6,4 mil', c:280, time:'Há 3 d', cat:'personagens', thumb:'hq720' },
    { id:'vdtAR-bPXrw', t:'Unboxing Marvel Legends: a caixa da Marvel', views:'72 mil', likes:'4,8 mil', c:210, time:'Há 3 d', cat:'games', thumb:'oardefault' },
    { id:'Aiv3Fk6FSRw', t:'Como desenhar o Homem-Aranha e o Aranhaverso', views:'69 mil', likes:'5,1 mil', c:240, time:'Há 4 d', cat:'bastidores', thumb:'hq720' },
    { id:'h08IcnqlV0k', t:'Ei, bub! ⚔️', views:'68 mil', likes:'6,2 mil', c:330, time:'Há 4 d', cat:'personagens', thumb:'oardefault' },
    { id:'SirXoie9JZI', t:'Carregado de um propósito glorioso (e um podcast).', views:'64 mil', likes:'4,4 mil', c:190, time:'Há 5 d', cat:'personagens', thumb:'hq720' },
    { id:'OrjLlpXT1nk', t:'Professor X e Magneto: amigos ou rivais?', views:'63 mil', likes:'4,9 mil', c:270, time:'Há 5 d', cat:'personagens', thumb:'oardefault' },
    { id:'deaUcoq8huQ', t:'Hulks também precisam de abraço 💚', views:'60 mil', likes:'5,6 mil', c:310, time:'Há 6 d', cat:'personagens', thumb:'hq720' },
    { id:'lvvl5a6JhHQ', t:'No fim das contas, Clint Barton é um homem de família.', views:'58 mil', likes:'4,1 mil', c:180, time:'Há 7 d', cat:'personagens', thumb:'oardefault' },
    { id:'sWBGR228bkY', t:'MARVEL Tōkon: Fighting Souls, trailer de premiação', views:'102 mil', likes:'7,4 mil', c:360, time:'Há 8 d', cat:'games', thumb:'hq720' },
    { id:'s5uU7VERudo', t:'Marvel’s Wolverine: trailer de recursos do jogo', views:'73 mil', likes:'6,8 mil', c:420, time:'Há 9 d', cat:'games', thumb:'hq720' }
  ],
  pessoas:{
    tony:    { nome:'Tony Stark',        ini:'TS', av:'av-mv-tony',    cargo:'Engenharia',    unidade:'Torre dos Vingadores' },
    steve:   { nome:'Steve Rogers',      ini:'SR', av:'av-mv-steve',   cargo:'Capitão',       unidade:'Base Nova York', unidades:['Base Nova York', 'Base Washington', 'Complexo do Norte'] },
    natasha: { nome:'Natasha Romanoff',  ini:'NR', av:'av-mv-natasha', cargo:'Operações',     unidade:'S.H.I.E.L.D.' },
    bruce:   { nome:'Bruce Banner',      ini:'BB', av:'av-mv-bruce',   cargo:'Pesquisa',      unidade:'Laboratório Gama' },
    wanda:   { nome:'Wanda Maximoff',    ini:'WM', av:'av-mv-wanda',   cargo:'Treinamento',   unidade:'Complexo dos Vingadores' },
    thor:    { nome:'Thor Odinson',      ini:'TO', av:'av-mv-thor',    cargo:'Segurança',     unidade:'Nova Asgard' },
    loki:    { nome:'Loki',              ini:'L',  av:'av-mv-loki',    cargo:'Comunicação',   unidade:'AVT' }
  },
  comunicados:[
    { c1:'#ff6b6b', c2:'#ED1D24', ic:'fa-film',            t:'Avengers: Doomsday, contagem regressiva',        d:'Podcast oficial toda semana e material de campanha liberado para as lojas parceiras.',           q:'08/09/2026 09:00', novo:true },
    { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-gamepad',         t:"Marvel's Wolverine chega em 20/09",              d:'Kit de lançamento nas lojas, torneio interno e sorteio de 50 códigos para o time.',              q:'06/09/2026 14:30', novo:true },
    { c1:'#81c784', c2:'#2e7d32', ic:'fa-book-open',       t:'Midnight Universe: nova fase dos quadrinhos',    d:'Primeira edição em 25/09. A pré-venda começa na segunda para assinantes do Marvel Unlimited.',   q:'04/09/2026 10:15', novo:true },
    { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-tv',              t:'VisionQuest estreia em outubro',                 d:'Calendário de divulgação e cortes autorizados já no portal de imprensa.',                        q:'02/09/2026 11:40' },
    { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-users',           t:'CCXP 2026: escala do estande',                   d:'Painel no Thunder Arena, sala de imprensa e área de cosplay. Inscrições da equipe até 30/09.',    q:'29/08/2026 16:00' }
  ],
  comentarios: function(m){ return {
    9262:[ marcaComent(m, 'tony', 'Bom trailer. Meu contrato de imagem cobre essa cena? Perguntando por um amigo.', '06/09/2026 às 15:05'),
           marcaComent(m, 'natasha', 'Cobre. Eu li antes de você assinar.', '06/09/2026 às 15:30') ],
    9263:[ marcaComent(m, 'bruce', 'O modo foto do jogo está impressionante. Testei a noite inteira.', '04/09/2026 às 12:00'),
           marcaComent(m, 'thor', 'Onde fica a espada nesse jogo? Só garras? Curioso.', '04/09/2026 às 12:40') ],
    9264:[ marcaComent(m, 'wanda', 'A primeira edição já está na minha lista. Fase nova sempre me pega.', '02/09/2026 às 10:30'),
           marcaComent(m, 'loki', 'Já li. Não conto o final. Ainda.', '02/09/2026 às 11:00') ],
    9265:[ marcaComent(m, 'natasha', 'Escala do estande fechada pela minha equipe. Faltam dois turnos de sábado.', '29/08/2026 às 17:00'),
           marcaComent(m, 'steve', 'Pego o da manhã. Chego às 7h.', '29/08/2026 às 17:20') ],
    9361:[ marcaComent(m, 'tony', 'Reunião às 7h da manhã é agressão, Rogers.', '07/09/2026 às 08:00'),
           marcaComent(m, 'steve', 'É o horário em que todo mundo já está acordado. Menos você.', '07/09/2026 às 08:15') ],
    9362:[ marcaComent(m, 'bruce', 'A escada de incêndio da Torre agradece por não ser mais usada como atalho.', '05/09/2026 às 13:00'),
           marcaComent(m, 'wanda', 'Continuo usando. É mais rápido.', '05/09/2026 às 13:20') ],
    9363:[ marcaComent(m, 'thor', 'Nova Asgard sedia o próximo encontro. Trago a cerveja.', '03/09/2026 às 11:00'),
           marcaComent(m, 'loki', 'Meu irmão organizando eventos. O multiverso está mesmo em colapso.', '03/09/2026 às 11:30') ],
    9364:[ marcaComent(m, 'natasha', 'Relatório recebido. Arquivado. Não perguntem onde.', '01/09/2026 às 09:30'),
           marcaComent(m, 'tony', 'Eu sei onde.', '01/09/2026 às 09:45') ]
  }; },
  materias: function(m){ return [
    marcaOficial(m, { id:9261, sub:'Comunicados oficiais', date:'08/09/2026', datetime:'08/09/26 09:00', reactions:12400, comments:980, pinned:true,
      title:'Avengers: Endgame Encore volta aos cinemas em 25/09',
      image:ytThumb('L2NAh3CIdig', 'maxresdefault'),
      text:'A sessão comemorativa de Endgame volta às telas com material inédito. Os ingressos abrem na quinta e o kit de divulgação já está no portal. 🛡️',
      article:{ kicker:'Comunicados oficiais · Cinema', readTime:'3 min de leitura',
        lead:'Sete anos depois, o Encore leva Endgame de volta ao cinema com cenas que nunca saíram da sala de edição.',
        html:'<p>O trailer do Encore passou de 15 milhões de visualizações em duas semanas. A sessão traz a versão de cinema com um bloco inédito de cenas, apresentado antes dos créditos.</p>' +
             '<p>Para as equipes: a pré-venda abre quinta às 10h, o material de fachada chega às lojas na terça e o calendário de exibição está no portal de imprensa.</p>' +
             '<p>Quem estiver na CCXP em dezembro vai ver esse bloco na tela grande do painel.</p>' +
             '<p><a href="https://www.youtube.com/watch?v=L2NAh3CIdig" target="_blank" rel="noopener">Assistir ao trailer no YouTube</a></p>' },
    }),
    marcaOficial(m, { id:9262, sub:'Cinema', date:'06/09/2026', datetime:'06/09/26 14:00', reactions:4300, comments:312,
      title:'Quarteto Fantástico: a perseguição do Surfista Prateado',
      yt:'rFvPvizUvZ8',
      text:'Cinco minutos da sequência de perseguição do Surfista Prateado, liberados pelo estúdio. Vale ver com fone bom. 🌌' }),
    marcaOficial(m, { id:9263, sub:'Games', date:'04/09/2026', datetime:'04/09/26 11:20', reactions:3800, comments:264,
      title:"Marvel's Wolverine: trailer de lançamento",
      yt:'ZgLZE7LZZcc',
      text:'O trailer de lançamento do Wolverine passou de 900 mil visualizações no primeiro dia. Chegada em 20/09, com kit de loja e torneio interno. ⚔️' }),
    marcaOficial(m, { id:9264, sub:'Quadrinhos', date:'02/09/2026', datetime:'02/09/26 10:00', reactions:2100, comments:187,
      title:'Midnight Universe: o trailer da nova fase',
      yt:'gXA43tBXy_o',
      text:'Uma nova fase começa nas bancas. O trailer da Marvel Comics já passou de 1,9 milhão de visualizações. Primeira edição em 25/09. 📚' }),
    marcaOficial(m, { id:9265, sub:'Gente & Cultura', date:'29/08/2026', datetime:'29/08/26 16:00', reactions:1560, comments:143,
      text:'CCXP 2026 confirmada: painel no Thunder Arena, sala de imprensa e área de cosplay. As inscrições da equipe vão até 30/09. 🦸' })
  ]; },
  posts: function(m){ return [
    marcaPessoa(m, 'steve', { id:9361, date:'07/09/2026', datetime:'07/09/26 07:40', reactions:980, comments:76,
      text:'Alinhamento do time amanhã às 7h, no Complexo. Café por minha conta. Quem chegar atrasado corre comigo depois. 🛡️' }),
    marcaPessoa(m, 'tony', { id:9362, date:'05/09/2026', datetime:'05/09/26 12:30', reactions:1240, comments:98,
      text:'Elevador da Torre atualizado: agora sobe 40% mais rápido e toca a playlist que eu escolher. De nada. ⚡' }),
    marcaPessoa(m, 'thor', { id:9363, date:'03/09/2026', datetime:'03/09/26 10:15', reactions:860, comments:64,
      text:'Nova Asgard recebe o encontro de outubro. Tem espaço para todos, inclusive para quem chega de armadura. 🔨' }),
    marcaPessoa(m, 'natasha', { id:9364, date:'01/09/2026', datetime:'01/09/26 09:00', reactions:720, comments:51,
      text:'Relatório do trimestre entregue no prazo. Quem ainda não mandou o seu já sabe: eu tenho o histórico de todos. 🕷️' }),
    marcaPessoa(m, 'wanda', { id:9365, date:'30/08/2026', datetime:'30/08/26 15:20', reactions:640, comments:47,
      text:'Turma nova de treinamento começa segunda. Seis pessoas, seis semanas. Levem paciência e roupa confortável. ✨' })
  ]; }
};

/* ---------------------------------------------------------------- liga / desliga */
let MARCA_BK = null, MARCA_ATUAL = null;
function marcaPostsShorts(m){
  return m.shorts.map(function(s){
    return { name:m.nome, label:m.nome, role:m.shortsRole, unit:m.shortsRole, av:m.av, initials:'',
      img:ytThumb(s.id, s.thumb), alt:s.t, title:s.t, time:s.time, embed:s.id };
  });
}
function marcaReels(m){
  return m.shorts.map(function(s, i){
    /* o terceiro chega aguardando aprovacao, como no cenario Crunchyroll */
    return { p:i, format:'video', cat:s.cat, cap:(m.shortsPrefixo || '') + s.t, likes:s.likes, comments:s.c,
      views:s.views, rec:i < 6, music:m.nome + ' · YouTube Shorts', pendAppr: i === 2 };
  });
}
/* comunicados da marca: so a lista corrida (o destaque some via CSS), com os
   do SULTS guardados para voltarem ao desligar */
function marcaComunicadosHTML(lista){
  return lista.map(function(c){
    return '<a href="#" class="com-item' + (c.novo ? ' unread' : '') + '" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '">' +
      '<span class="com-ico"><i class="fa-solid ' + c.ic + '"></i></span>' +
      '<div class="com-body"><h4>' + c.t + '</h4><p>' + c.d + '</p><span class="com-meta">' + c.q + '</span></div>' +
      (c.novo ? '<span class="com-dot"></span>' : '') + '</a>';
  }).join('');
}
function marcaComunicados(ligar, m){
  const lista = document.querySelector('#homeComPanel .com-list');
  const cont  = document.querySelector('#homeComPanel .com-count');
  if (!lista) return;
  if (ligar && m && m.comunicados){
    if (lista.dataset.sults == null) lista.dataset.sults = lista.innerHTML;
    lista.innerHTML = marcaComunicadosHTML(m.comunicados);
    if (cont){
      if (cont.dataset.sults == null) cont.dataset.sults = cont.textContent;
      cont.textContent = m.comunicados.filter(function(c){ return c.novo; }).length + ' novos';
    }
  } else if (!ligar){
    if (lista.dataset.sults != null){ lista.innerHTML = lista.dataset.sults; delete lista.dataset.sults; }
    if (cont && cont.dataset.sults != null){ cont.textContent = cont.dataset.sults; delete cont.dataset.sults; }
  }
}
function marcaInjetaHome(m){
  const feed = document.querySelector('.col-main > .feed');
  if (!feed || typeof addHomePost !== 'function') return;
  feed.querySelectorAll(':scope > .post[data-marca]').forEach(function(p){ p.remove(); });
  feed.querySelectorAll(':scope > .post').forEach(function(p){ p.setAttribute('data-sults', ''); });
  NEWS.forEach(function(n){
    if (n.status && n.status !== 'pub') return;
    if (n.pendAppr && typeof podeAprovar === 'function' && !podeAprovar()) return;
    addHomePost(n, true);
    const novo = feed.lastElementChild;
    if (novo && !novo.hasAttribute('data-sults')) novo.setAttribute('data-marca', '');
  });
}
function marcaLigar(id){
  const m = MARCAS[id]; if (!m) return;
  if (MARCA_ATUAL) marcaDesligar();
  MARCA_BK = { news:NEWS, cats:NEWS_CATS, scats:CATEGORIES, posts:POSTS.slice(), reels:REELS_DATA.slice(), alias:Object.assign({}, SB_CAT_ALIAS) };
  const com = m.comentarios ? m.comentarios(m) : {};
  NEWS = crunchOrdena(m.materias(m).concat(m.posts(m))).map(function(n){ if (!n.cmts && com[n.id]) n.cmts = com[n.id]; return n; });
  NEWS_CATS = m.cats; CATEGORIES = m.shortCats;
  POSTS.splice(0, POSTS.length); marcaPostsShorts(m).forEach(function(p){ POSTS.push(p); });
  REELS_DATA.splice(0, REELS_DATA.length); marcaReels(m).forEach(function(r){ REELS_DATA.push(r); });
  m.shortCats.forEach(function(c){ SB_CAT_ALIAS[c.id] = (m.alias || {})[c.id] || c.id; });
  MARCA_ATUAL = id;
  document.body.classList.add('demo-marca');
  marcaComunicados(true, m);
  marcaInjetaHome(m);
  if (typeof crunchRedesenha === 'function') crunchRedesenha();
}
function marcaDesligar(){
  if (!MARCA_ATUAL || !MARCA_BK) return;
  NEWS = MARCA_BK.news; NEWS_CATS = MARCA_BK.cats; CATEGORIES = MARCA_BK.scats;
  POSTS.splice(0, POSTS.length); MARCA_BK.posts.forEach(function(p){ POSTS.push(p); });
  REELS_DATA.splice(0, REELS_DATA.length); MARCA_BK.reels.forEach(function(r){ REELS_DATA.push(r); });
  Object.keys(SB_CAT_ALIAS).forEach(function(k){ delete SB_CAT_ALIAS[k]; });
  Object.assign(SB_CAT_ALIAS, MARCA_BK.alias);
  MARCA_BK = null; MARCA_ATUAL = null;
  document.body.classList.remove('demo-marca');
  marcaComunicados(false);
  document.querySelectorAll('.col-main > .feed > .post[data-marca]').forEach(function(p){ p.remove(); });
  document.querySelectorAll('.col-main > .feed > .post[data-sults]').forEach(function(p){ p.removeAttribute('data-sults'); });
  if (typeof crunchRedesenha === 'function') crunchRedesenha();
}
