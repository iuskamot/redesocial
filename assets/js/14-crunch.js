/* cenario: funcionario Crunchyroll */
/* ============ Cenário: funcionário da Crunchyroll (só consome) ============
   Liga e desliga pelo ícone da Google Play no rodapé do menu. Troca a pessoa
   (Pikachu), a marca no cartão, as publicações (matérias da Crunchyroll
   News) e os shorts (canal oficial no YouTube). A pessoa vê, curte e comenta,
   mas não cria publicação nem short — o CSS esconde compositor, "Criar short"
   e Gerenciar enquanto body.demo-crunch estiver ligado.

   Os dados originais ficam guardados e voltam inteiros ao desligar: NEWS,
   NEWS_CATS e CATEGORIES são reatribuídos (são let); POSTS e REELS_DATA são
   const, então trocam o conteúdo no lugar. Textos vêm em resumo próprio a
   partir dos títulos, com link para a matéria — nada do corpo é copiado. */

const CRUNCH_URL = 'https://www.crunchyroll.com';
function crunchLink(caminho){
  return '\n\n<a href="' + CRUNCH_URL + caminho + '" target="_blank" rel="noopener">Ler na Crunchyroll News</a>';
}
/* o lead segue o padrão dos artigos do SULTS: sem o emoji do fim do resumo */
function crunchLead(s){ return String(s || '').replace(/\s*[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]+\s*$/u, '').trim(); }
function crunchPost(n){
  const artigo = n.article || {
    kicker: n.sub + ' · Crunchyroll News',
    lead: crunchLead(n.text),
    readTime: (2 + (n.id % 3)) + ' min de leitura',
    html: '<p>' + crunchLead(n.text) + '</p>' +
          '<p>A matéria completa, com todos os detalhes, imagens e declarações, está na Crunchyroll News.</p>' +
          '<p><a href="' + CRUNCH_URL + n.link + '" target="_blank" rel="noopener">Ler na Crunchyroll News</a></p>'
  };
  return Object.assign({
    author:'Crunchyroll', av:'av-crunch', ini:'', autorNome:'Crunchyroll', autorAv:'av-crunch',
    /* a linha abaixo do nome e o cargo, nao a categoria: 'Canal oficial · Crunchyroll' */
    cargo:'Canal oficial', unit:'Crunchyroll', reach:'rede', status:'pub', oficial:true
  }, n, { text: n.text + crunchLink(n.link), article: artigo, cmts: n.cmts || (CRUNCH_CMTS[n.id] || []) });
}

const CRUNCH_CATS = [
  { id:'anuncios', name:'Anúncios',         color:'#F47521', icon:'fa-bullhorn',        active:true },
  { id:'noticias', name:'Notícias',         color:'#0088FF', icon:'fa-newspaper',       active:true },
  { id:'artigos',  name:'Artigos',          color:'#8161d8', icon:'fa-pen-nib',         active:true },
  { id:'quizzes',  name:'Quizzes e testes', color:'#27a689', icon:'fa-circle-question', active:true },
  { id:'dublagem', name:'Dublagem',         color:'#e3444f', icon:'fa-microphone-lines',active:true },
  { id:'mangas',   name:'Mangás',           color:'#c98a00', icon:'fa-book-open',       active:true },
  { id:'games',    name:'Games',            color:'#2f6fe4', icon:'fa-gamepad',         active:true },
  { id:'filmes',   name:'Filmes',           color:'#c2185b', icon:'fa-film',            active:true },
  { id:'animes',   name:'Animes',           color:'#a93438', icon:'fa-tv',              active:true },
  { id:'time',     name:'Time Crunchyroll',  color:'#F47521', icon:'fa-users',           active:true }
];

/* As pessoas da rede são personagens: nome real do personagem, retrato como
   foto e a "unidade" é de onde ele vem. */
const CRUNCH_PESSOAS = {
  naruto:  { nome:'Naruto Uzumaki',  ini:'NU', cargo:'Sétimo Hokage',          unidade:'Konoha' },
  sasuke:  { nome:'Sasuke Uchiha',   ini:'SU', cargo:'Shinobi',                 unidade:'Konoha' },
  luffy:   { nome:'Monkey D. Luffy', ini:'ML', cargo:'Capitão',                 unidade:'Bando do Chapéu de Palha' },
  tanjiro: { nome:'Tanjiro Kamado',  ini:'TK', cargo:'Caçador de Onis',         unidade:'Corpo de Caçadores' },
  gojo:    { nome:'Satoru Gojo',     ini:'SG', cargo:'Professor',               unidade:'Escola Jujutsu de Tóquio' },
  levi:    { nome:'Levi Ackerman',   ini:'LA', cargo:'Capitão',                 unidade:'Tropa de Exploração' },
  anya:    { nome:'Anya Forger',     ini:'AF', cargo:'Estudante',               unidade:'Academia Eden' },
  spike:   { nome:'Spike Spiegel',   ini:'SS', cargo:'Caçador de recompensas',  unidade:'Bebop' },
  frieren: { nome:'Frieren',         ini:'F',  cargo:'Maga',                    unidade:'Grupo do Herói Himmel' },
  saitama: { nome:'Saitama',         ini:'S',  cargo:'Herói Classe B',          unidade:'Cidade Z' }
};
/* a linha abaixo do nome mostra cargo · unidade; a categoria (n.sub) segue
   "Time Crunchyroll" só para os filtros da coluna */
function crunchPessoa(chave, n){
  const q = CRUNCH_PESSOAS[chave];
  return Object.assign({ author:q.nome, av:'av-cr-'+chave, ini:q.ini, autorNome:q.nome, autorAv:'av-cr-'+chave,
    cargo:q.cargo, unit:q.unidade, sub:'Time Crunchyroll', reach:'rede', status:'pub' }, n);
}
function crunchComent(chave, texto, quando){
  const q = CRUNCH_PESSOAS[chave];
  /* dt e a data pronta que o componente de comentario mostra; time fica para quem le o campo cru */
  return { author:q.nome, av:'av-cr-'+chave, ini:q.ini, role:q.cargo + ' · ' + q.unidade, text:texto, time:quando, dt:quando };
}
/* ordena por data e hora, da mais nova para a mais antiga; o fixado vai na frente */
function crunchTs(s){
  const d = s.split(' ')[0].split('/'), h = s.split(' ')[1].split(':');
  return new Date(2000 + +d[2], +d[1] - 1, +d[0], +h[0], +h[1]).getTime();
}
function crunchOrdena(lista){
  return lista.slice().sort(function(a, b){ return (b.pinned?1:0) - (a.pinned?1:0) || crunchTs(b.datetime) - crunchTs(a.datetime); });
}
const CRUNCH_SHORT_CATS = [
  { id:'animes', name:'Animes', color:'#F47521', icon:'fa-tv', active:true }
];

/* Comentários dos personagens nas matérias (dois por matéria) */
const CRUNCH_CMTS = {
  9001: [ crunchComent('anya',    'waku waku! mangá novo! 📚', '02/09/2026 às 11:40'),
          crunchComent('frieren', 'Espero esse tempo todo por um capítulo e ainda dizem que sou lenta.', '02/09/2026 às 12:15') ],
  9002: [ crunchComent('spike',   'A abertura tem cara de bebop. Aprovado.', '02/09/2026 às 10:30'),
          crunchComent('tanjiro', 'Coloquei o som no máximo na copa. Desculpa, pessoal do 2º andar. 🙏', '02/09/2026 às 10:52') ],
  9003: [ crunchComent('anya',    'FOCA! 🦭🦭🦭', '01/09/2026 às 15:31'),
          crunchComent('levi',    'Bonitinho. Agora voltem ao trabalho.', '01/09/2026 às 15:58') ],
  9004: [ crunchComent('gojo',    'DLC pago e atualização grátis no mesmo dia. Equilíbrio, gosto disso.', '01/09/2026 às 15:10'),
          crunchComent('saitama', 'Vou esperar a promoção.', '01/09/2026 às 16:02') ],
  9005: [ crunchComent('luffy',   'Deu que eu governaria a nação da carne. Faz sentido. 🍖', '28/08/2026 às 13:22'),
          crunchComent('sasuke',  'Não respondo quiz.', '28/08/2026 às 14:05') ],
  9006: [ crunchComent('luffy',   'AS MENINAS DO MEU BANDO DUBLADAS!!! 🏴‍☠️', '24/08/2026 às 13:45'),
          crunchComent('naruto',  'Dá pra fazer a dublagem do Sasuke também? Só pra ele falar mais.', '24/08/2026 às 14:20') ],
  9007: [ crunchComent('gojo',    'Guerra de orgulho é a minha especialidade. Vou rever dublado.', '21/08/2026 às 12:48'),
          crunchComent('anya',    'a moça ganha no final? não conta. ou conta.', '21/08/2026 às 13:10') ],
  9008: [ crunchComent('frieren', 'Bruxa na Mongólia. Finalmente uma colega de profissão.', '15/08/2026 às 13:30'),
          crunchComent('tanjiro', 'Parabéns ao elenco! Dublagem boa faz a história chegar em mais gente. 🙌', '15/08/2026 às 14:02') ],
  9009: [ crunchComent('saitama', 'Dez animes sobre não fazer nada. Finalmente uma lista pra mim.', '14/08/2026 às 13:25'),
          crunchComent('levi',    'Pausa? Quem escreveu isso não viu o estado da copa.', '14/08/2026 às 13:50') ],
  9010: [ crunchComent('spike',   'Shinkai no cinema de novo. Vou guardar uns woolongs pro ingresso.', '12/08/2026 às 10:40'),
          crunchComent('frieren', 'Filme novo. Dez anos depois eu assisto.', '12/08/2026 às 11:15') ],
  9011: [ crunchComent('sasuke',  'Lara? Nunca ouvi falar.', '08/08/2026 às 12:20'),
          crunchComent('naruto',  'Mentira, ele já viu a primeira temporada inteira. 😏', '08/08/2026 às 12:26') ],
  9012: [ crunchComent('gojo',    'Meu time é só tanque. O quiz me mandou assistir shounen de pancadaria. Justo.', '06/08/2026 às 12:30'),
          crunchComent('tanjiro', 'Montei um time equilibrado e ganhei um slice of life. Tá certo. ☕', '06/08/2026 às 13:05') ]
};

/* Matérias da Crunchyroll News (pt-BR), lidas em 02/09/2026 */
const CRUNCH_MATERIAS = [
  { id:9001, sub:'Mangás', date:'02/09/2026', datetime:'02/09/26 11:17', reactions:388, comments:29,
    title:"Harada, popular autora de boys' love, anuncia novo mangá",
    image:'uploads/crunch/news-harada-manga.jpg',
    text:"Harada, um dos nomes mais conhecidos do boys' love, tem obra nova a caminho. A matéria reúne o que já se sabe sobre o anúncio. 📚",
    link:'/pt-br/news/latest/2026/9/2/akuen-harada-novo-manga' },
  { id:9002, sub:'Notícias', date:'02/09/2026', datetime:'02/09/26 10:07', reactions:476, comments:33,
    title:'Anime de From Far Away ganha trailer com prévias das músicas-tema',
    image:'uploads/crunch/news-from-far-away.webp',
    text:'Saiu um novo trailer do anime de From Far Away, com trechos das músicas de abertura e encerramento. Vale assistir com o som ligado. 🎶',
    link:'/pt-br/news/latest/2026/9/2/from-far-away-trailer-abertura-encerramento' },
  { id:9003, sub:'Notícias', date:'01/09/2026', datetime:'01/09/26 15:20', reactions:421, comments:26,
    title:'Anime de Sirotan ganha data de lançamento e arte promocional',
    image:'uploads/crunch/news-sirotan.webp',
    text:'O anime de Sirotan já tem data de estreia e ganhou uma nova arte promocional. Os detalhes estão na matéria completa. 🦭',
    link:'/pt-br/news/latest/2026/9/1/anime-sirotan-estreia-3-de-outubro-arte' },
  { id:9004, sub:'Games', date:'01/09/2026', datetime:'01/09/26 14:56', reactions:297, comments:18,
    title:'Code Vein II ganha vídeo preparando os jogadores para seu DLC pago e atualização gratuita',
    image:'uploads/crunch/news-code-vein-2.webp',
    text:'A equipe de Code Vein II publicou um vídeo apresentando o que vem por aí: um DLC pago e uma atualização gratuita. Confira o resumo do que muda no jogo. 🗡️',
    link:'/pt-br/news/latest/2026/9/1/code-vein-2-mensagem-desenvolvedores-dlc-atualizacao' },
  { id:9005, sub:'Quizzes e testes', date:'28/08/2026', datetime:'28/08/26 13:00', reactions:869, comments:121,
    title:'Qual nação de That Time I Got Reincarnated as a Slime você governaria?',
    image:'uploads/crunch/news-quiz-slime.webp',
    text:'Quiz da semana: responda algumas perguntas e descubra qual nação do mundo de Tensura você governaria. Compartilhe o resultado com o time! 🧪',
    link:'/pt-br/news/quizzes/2026/8/28/that-time-i-got-reincarnated-as-a-slime-nacoes-quiz' },
  { id:9006, sub:'Dublagem', date:'24/08/2026', datetime:'24/08/26 13:30', reactions:1284, comments:96, pinned:true,
    title:'Dublagem brasileira de ONE PIECE HEROINES chega à Crunchyroll em breve',
    image:'uploads/crunch/news-one-piece-heroines.webp',
    text:'A versão dublada em português de ONE PIECE HEROINES foi confirmada para o catálogo. Quem prefere acompanhar as heroínas do bando do Chapéu de Palha em PT-BR já pode se preparar. 🏴‍☠️',
    link:'/pt-br/news/announcements/2026/8/24/one-piece-heroines-dublagem-brasileira-data-lancamento' },
  { id:9007, sub:'Dublagem', date:'21/08/2026', datetime:'21/08/26 12:30', reactions:932, comments:71,
    title:'Dublagem de Kaguya-sama: Love Is War -Stairway to Adulthood- está disponível na Crunchyroll',
    image:'uploads/crunch/news-kaguya-sama.webp',
    text:'A dublagem de Kaguya-sama: Love Is War -Stairway to Adulthood- já está no ar. Boa hora para rever a guerra de orgulho entre Kaguya e Miyuki com as vozes brasileiras. 💘',
    link:'/pt-br/news/announcements/2026/8/21/dublagem-kaguya-sama-love-is-war-stairway-to-adulthood-disponivel-crunchyroll' },
  { id:9008, sub:'Dublagem', date:'15/08/2026', datetime:'15/08/26 13:02', reactions:743, comments:58,
    title:'Conheça os dubladores brasileiros de Jaadugar: A Witch in Mongolia',
    image:'uploads/crunch/news-jaadugar-dubladores.webp',
    text:'O elenco brasileiro de Jaadugar: A Witch in Mongolia foi revelado. A matéria apresenta quem dá voz a cada personagem na versão em português. 🎙️',
    link:'/pt-br/news/announcements/2026/8/15/dubladores-jaadugar-a-witch-in-mongolia' },
  { id:9009, sub:'Artigos', date:'14/08/2026', datetime:'14/08/26 13:00', reactions:654, comments:42,
    title:'10 animes sobre fazer uma pausa',
    image:'uploads/crunch/news-animes-pausa.webp',
    text:'Nem todo anime precisa de batalha épica. Nesta lista, dez séries que celebram o descanso, a rotina e o prazer de não fazer nada — perfeitas para um fim de semana tranquilo. ☕',
    link:'/pt-br/news/features/2026/8/14/animes-sobre-fazer-uma-pausa',
    article:{ kicker:'Artigos · Lista', readTime:'6 min de leitura',
      lead:'Nem todo anime precisa de batalha épica. Dez séries que celebram o descanso, a rotina e o prazer de não fazer nada — perfeitas para um fim de semana tranquilo.',
      html:'<p>Há um gênero inteiro de anime dedicado a desacelerar: personagens que cozinham, caminham, cuidam de uma horta ou simplesmente observam o dia passar. A lista da Crunchyroll News reúne dez títulos assim, do slice of life clássico às histórias mais recentes sobre viver devagar.</p>' +
           '<p>A ideia por trás da seleção é simples: pausar também faz parte da história. São animes que funcionam como companhia para um fim de semana sem compromisso, com episódios curtos e um ritmo que convida a ficar mais um pouco.</p>' +
           '<p>A matéria completa apresenta cada uma das dez séries, com o que esperar de cada uma e onde assistir.</p>' +
           '<p><a href="' + CRUNCH_URL + '/pt-br/news/features/2026/8/14/animes-sobre-fazer-uma-pausa" target="_blank" rel="noopener">Ler na Crunchyroll News</a></p>' } },
  { id:9010, sub:'Filmes', date:'11/08/2026', datetime:'11/08/26 20:00', reactions:2107, comments:188,
    title:'Crunchyroll e Sony Pictures Entertainment se juntam para distribuir o novo filme de Makoto Shinkai',
    image:'uploads/crunch/news-shinkai-sony.webp',
    text:'Parceria fechada: Crunchyroll e Sony Pictures Entertainment vão distribuir o próximo longa de Makoto Shinkai, diretor de Your Name e Suzume. Mais um grande lançamento de cinema no nosso radar. 🎬',
    link:'/pt-br/news/announcements/2026/8/11/makoto-shinkai-novo-filme-crunchyroll-sony-pictures-entertainment' },
  { id:9011, sub:'Anúncios', date:'10/08/2026', datetime:'10/08/26 16:00', reactions:615, comments:44,
    title:"Young Ladies Don't Play Fighting Games, Goodbye, Lara e mais músicas de anime chegam à Crunchyroll",
    image:'uploads/crunch/news-musicas-anime.webp',
    text:"Novos videoclipes e músicas de anime entraram no catálogo, incluindo temas de Young Ladies Don't Play Fighting Games e Goodbye, Lara. Playlist atualizada para o expediente. 🎧",
    link:'/pt-br/news/announcements/2026/8/10/young-ladies-dont-play-fighting-games-goodbye-lara-anime-videos-musicais-crunchyroll' },
  { id:9012, sub:'Artigos', date:'06/08/2026', datetime:'06/08/26 12:00', reactions:512, comments:37,
    title:'Descubra qual anime assistir baseado no seu time em MARVEL Tokon: Fighting Souls',
    image:'uploads/crunch/news-marvel-tokon.webp',
    text:'Montou seu time em MARVEL Tokon: Fighting Souls? A matéria cruza o estilo de cada equipe com um anime que combina com ela. Um guia divertido para a próxima maratona. 🎮',
    link:'/pt-br/news/features/2026/8/6/animes-tipo-marvel-tokon-fighting-souls',
    article:{ kicker:'Artigos · Guia', readTime:'5 min de leitura',
      lead:'Montou seu time em MARVEL Tokon: Fighting Souls? A matéria cruza o estilo de cada equipe com um anime que combina com ela — um guia para a próxima maratona.',
      html:'<p>MARVEL Tokon: Fighting Souls é o jogo de luta em equipe da Arc System Works com os heróis da Marvel, e cada composição de time diz algo sobre quem joga: tem quem prefira pressão constante, quem aposte em defesa e contra-ataque, quem monte o time só pelo visual.</p>' +
           '<p>A matéria parte desses perfis e sugere, para cada estilo de equipe, um anime que segue a mesma lógica — de shounen de ação frenética a histórias mais táticas e cerebrais.</p>' +
           '<p>O texto completo traz as combinações uma a uma, com o porquê de cada escolha.</p>' +
           '<p><a href="' + CRUNCH_URL + '/pt-br/news/features/2026/8/6/animes-tipo-marvel-tokon-fighting-souls" target="_blank" rel="noopener">Ler na Crunchyroll News</a></p>' } }
].map(crunchPost);

/* Posts das pessoas: um de imagem (o Naruto achou o Sasuke) e o resto só texto */
const CRUNCH_POSTS_PESSOAS = [
  crunchPessoa('naruto', { id:9101, date:'02/09/2026', datetime:'02/09/26 12:05', reactions:212, comments:0,
    text:'Achei o Sasuke... 👀 Ele disse que estava "em reunião externa".',
    images:['uploads/crunch/sasuke-1.webp', 'uploads/crunch/sasuke-2.webp'],
    cmts:[ crunchComent('sasuke', 'Para de me seguir.', '02/09/2026 às 12:20'),
           crunchComent('luffy', 'Ele tá com cara de quem comeu o último onigiri da copa. 🍙', '02/09/2026 às 12:34') ] }),
  crunchPessoa('levi', { id:9102, date:'02/09/2026', datetime:'02/09/26 09:30', reactions:64, comments:9,
    text:'A copa do 3º andar está imunda. Faxina geral hoje às 18h. Sem exceções.' }),
  crunchPessoa('anya', { id:9103, date:'01/09/2026', datetime:'01/09/26 16:40', reactions:181, comments:23,
    text:'waku waku! hoje tem amendoim na cantina 🥜' }),
  crunchPessoa('gojo', { id:9104, date:'01/09/2026', datetime:'01/09/26 11:10', reactions:97, comments:12,
    text:'Lembrete: alinhamento do trimestre às 14h. Vou de venda nos olhos mesmo assim, não estranhem. 🕶️' }),
  crunchPessoa('luffy', { id:9105, date:'31/08/2026', datetime:'31/08/26 13:15', reactions:143, comments:31,
    text:'Alguém viu meu chapéu? Última vez foi no refeitório, perto da churrasqueira. 🍖 Recompensa: um pedaço de carne.' }),
  crunchPessoa('tanjiro', { id:9106, date:'28/08/2026', datetime:'28/08/26 08:50', reactions:58, comments:7,
    text:'Bom dia, time! Alguém do Suporte consegue me ajudar com o acesso ao Wi-Fi do 2º andar? Obrigado desde já 🙏' }),
  crunchPessoa('frieren', { id:9107, date:'26/08/2026', datetime:'26/08/26 15:00', reactions:120, comments:14,
    text:'Só passei para avisar que o projeto está indo bem. Voltamos a falar em 2036.' }),
  crunchPessoa('saitama', { id:9108, date:'22/08/2026', datetime:'22/08/26 07:45', reactions:76, comments:11,
    text:'Promoção no mercado da esquina: 3 kg de repolho por 10 reais. Corram, acaba antes do almoço. 🥬' }),
  crunchPessoa('spike', { id:9109, date:'18/08/2026', datetime:'18/08/26 19:20', reactions:44, comments:6,
    text:'Alguém tem um isqueiro? Perguntando por um amigo. Também aceito dica de onde almoçar com 3 woolongs.' }),
  crunchPessoa('sasuke', { id:9110, date:'12/08/2026', datetime:'12/08/26 10:00', reactions:88, comments:19,
    text:'Não estou desaparecido. Estou em home office.' }),
  /* artigo do Levi, ainda aguardando aprovação */
  crunchPessoa('levi', { id:9111, date:'03/09/2026', datetime:'03/09/26 08:15', reactions:0, comments:0, pendAppr:true, cmts:[],
    title:'Manual da copa do 3º andar: as 15 regras',
    image:'uploads/crunch/levi-copa.jpg',
    article:{ kicker:'Time Crunchyroll · Guia', readTime:'4 min de leitura',
      lead:'Quinze regras para a copa continuar limpa depois das 18h. Leitura obrigatória. A verificação é diária.',
      html:'<p>A copa do 3º andar não é um campo de batalha, mas anda parecendo um. Este manual existe para que ninguém mais precise perguntar de quem é a caneca com café de terça-feira. As regras valem para todos, sem exceção, inclusive para quem "só passou para pegar água".</p>' +
           '<p>Regra 1: lavou, secou, guardou. Regra 2: a geladeira não é arquivo morto — o que ficar depois de sexta vai para o lixo, com nome ou sem nome. Regra 3: a pia vazia não é uma sugestão. As outras doze seguem a mesma lógica: a copa fica como você gostaria de encontrá-la.</p>' +
           '<p>A verificação acontece todo dia às 18h. Quem for encontrado deixando louça para trás recebe um lembrete pessoal. Não vão gostar do lembrete.</p>' } })
];
const CRUNCH_NEWS = crunchOrdena(CRUNCH_MATERIAS.concat(CRUNCH_POSTS_PESSOAS));

/* Comunicados do cenário: só a lista corrida; o destaque some via CSS */
const CRUNCH_COMUNICADOS = [
  { c1:'#ff8a65', c2:'#d84315', ic:'fa-film',           t:'Maratona Frieren no auditório',             d:'Sexta, episódios 1 a 6 a partir das 18h. Pipoca por conta do RH; traga a manta.', q:'01/09/2026 10:00', novo:true },
  { c1:'#ba68c8', c2:'#6a1b9a', ic:'fa-mask',           t:'Cosplay Day 2026: inscrições abertas',      d:'Concurso interno dia 25/09. Vale traje de qualquer anime do catálogo.',            q:'31/08/2026 14:20', novo:true },
  { c1:'#4fc3f7', c2:'#0277bd', ic:'fa-store',          t:'Anime Friends: voluntários para o estande', d:'Precisamos de 12 pessoas no fim de semana. Inscreva-se até sexta.',                q:'29/08/2026 09:15', novo:true },
  { c1:'#ffb74d', c2:'#ef6c00', ic:'fa-comment-slash',  t:'Nova política de spoilers no chat',         d:'Use a tag #spoiler e respeite 24h após o lançamento do episódio.',                  q:'27/08/2026 11:40' },
  { c1:'#66bb6a', c2:'#2e7d32', ic:'fa-calendar-check', t:'Recesso de fim de ano definido',            d:'De 24/12 a 02/01. As escalas de plantão saem na próxima semana.',                   q:'25/08/2026 16:05' }
];
function crunchComunicadosHTML(){
  return CRUNCH_COMUNICADOS.map(function(c){
    return '<a href="#" class="com-item' + (c.novo ? ' unread' : '') + '" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '">' +
      '<span class="com-ico"><i class="fa-solid ' + c.ic + '"></i></span>' +
      '<div class="com-body"><h4>' + c.t + '</h4><p>' + c.d + '</p><span class="com-meta">' + c.q + '</span></div>' +
      (c.novo ? '<span class="com-dot"></span>' : '') + '</a>';
  }).join('');
}
function crunchComunicados(ligar){
  const lista = document.querySelector('#homeComPanel .com-list');
  const cont  = document.querySelector('#homeComPanel .com-count');
  if (!lista) return;
  if (ligar){
    if (lista.dataset.sults == null) lista.dataset.sults = lista.innerHTML;
    lista.innerHTML = crunchComunicadosHTML();
    if (cont){
      if (cont.dataset.sults == null) cont.dataset.sults = cont.textContent;
      cont.textContent = CRUNCH_COMUNICADOS.filter(function(c){ return c.novo; }).length + ' novos';
    }
  } else {
    if (lista.dataset.sults != null){ lista.innerHTML = lista.dataset.sults; delete lista.dataset.sults; }
    if (cont && cont.dataset.sults != null){ cont.textContent = cont.dataset.sults; delete cont.dataset.sults; }
  }
}

/* Shorts do canal oficial da Crunchyroll no YouTube. A capa é a miniatura
   vertical salva em uploads/crunch; o player incorpora o vídeo pelo embed. */
const CRUNCH_SHORTS = [
  { id:'kawz_WnPek8', t:'Left and Right Funny Moments',                  s:'Daemons do Reino das Sombras',      views:'20 mil',  likes:'1,4 mil', c:96, time:'Há 2 h' },
  { id:'jR-Wc8ms2iw', t:"Shu's Philosophy Is Quite Dangerous",          s:'Though I Am an Inept Villainess',   views:'18 mil',  likes:'1,2 mil', c:74, time:'Há 5 h' },
  { id:'IY4-CMhrVKM', t:'Ito Better Prepare Herself',                   s:'Please Excuse My Younger Brothers', views:'15 mil',  likes:'980',     c:61, time:'Há 9 h' },
  { id:'DzcjuHsmIL4', t:'Enjoy Your Last Full Moon!',                   s:'Daemons do Reino das Sombras',      views:'15 mil',  likes:'1,0 mil', c:58, time:'Há 1 d' },
  { id:'VZdScKk9B2o', t:"She's Healthy For The First Time In Her Life", s:'Though I Am an Inept Villainess',   views:'13 mil',  likes:'870',     c:49, time:'Há 1 d' },
  { id:'3TiILZh82fE', t:'She Met Leelee For The First Time',            s:'Though I Am an Inept Villainess',   views:'13 mil',  likes:'840',     c:45, time:'Há 2 d' },
  { id:'WHEcI4p_6I0', t:'Asa Is EXTREMELY Powerful',                    s:'Daemons do Reino das Sombras',      views:'12 mil',  likes:'790',     c:52, time:'Há 2 d' },
  { id:'fdMsXys1i14', t:'This Is A Warning, Keigetsu!',                 s:'Though I Am an Inept Villainess',   views:'12 mil',  likes:'760',     c:38, time:'Há 3 d' },
  { id:'WbwiAZuCuus', t:'Reirin Is Living THE BEST Life',               s:'Though I Am an Inept Villainess',   views:'11 mil',  likes:'720',     c:41, time:'Há 3 d' },
  { id:'vGa0JXkCHbM', t:'Kou Was THIS Sick In Secret?',                 s:'Though I Am an Inept Villainess',   views:'11 mil',  likes:'690',     c:35, time:'Há 4 d' },
  { id:'iAHM5D2gni8', t:'Is Syu Going to Accept the Friend Request?',   s:'Please Excuse My Younger Brothers', views:'9,5 mil', likes:'610',     c:29, time:'Há 5 d' },
  { id:'YthGOCKyBQU', t:'Reiya Better Not Know About This',             s:"The Ogre's Bride",                  views:'8,1 mil', likes:'530',     c:24, time:'Há 6 d' },
  { id:'N-F97hw0tCw', t:'A Great Mishoki Plan!',                        s:'The Elusive Samurai',               views:'5,8 mil', likes:'390',     c:17, time:'Há 7 d' },
  { id:'K6VTrfJkefg', t:'Ayako Vs. Kojiro',                             s:'The Elusive Samurai',               views:'5,4 mil', likes:'350',     c:15, time:'Há 8 d' }
];
const CRUNCH_POSTS = CRUNCH_SHORTS.map(function(s){
  return { name:'Crunchyroll', label:'Crunchyroll', role:'Canal oficial · YouTube', unit:'Canal oficial · YouTube',
    av:'av-crunch', initials:'', img:'uploads/crunch/short-' + s.id + '.jpg',
    alt:s.t + ' · ' + s.s, title:s.t, time:s.time, embed:s.id };
});
const CRUNCH_REELS = CRUNCH_SHORTS.map(function(s, i){
  /* o terceiro chega aguardando aprovacao: o Pikachu funcionario nao o ve, o
     Pikachu administrador ve e decide */
  return { p:i, format:'video', cat:'animes', cap:s.t + ' 🎬 ' + s.s, likes:s.likes, comments:s.c,
    views:s.views, rec:i < 6, music:'Crunchyroll · YouTube Shorts', pendAppr: i === 2 };
});

/* ---------- liga / desliga ---------- */
let CRUNCH_BK = null;
/* O Pikachu comeca so consumindo; um clique no nome dele no header o torna
   administrador (e outro clique desfaz). Quem pode aprovar ve as publicacoes
   pendentes e ganha de volta compositor, "Criar short" e Gerenciar. */
function crunchEhAdmin(){ return document.body.classList.contains('crunch-admin'); }
function crunchPapel(){ return crunchEhAdmin() ? 'Administrador · Crunchyroll' : 'Funcionário · Crunchyroll'; }
function podeAprovar(){ return !document.body.classList.contains('demo-crunch') || crunchEhAdmin(); }
const CRUNCH_TEXTOS = [
  ['.profile-name', 'Pikachu'], ['.profile-role', crunchPapel],
  ['.nvf-pname', 'Pikachu'],    ['.nvf-prole', crunchPapel],
  ['#topUserChip .uname', 'Pikachu'], ['#ppTopUser .uname', 'Pikachu'], ['#ppName', 'Pikachu'], ['#ppRole', crunchPapel]
];
function crunchTextos(ligar){
  CRUNCH_TEXTOS.forEach(function(par){
    document.querySelectorAll(par[0]).forEach(function(el){
      if (ligar){ if (el.dataset.sults == null) el.dataset.sults = el.textContent; el.textContent = (typeof par[1] === 'function') ? par[1]() : par[1]; }
      else if (el.dataset.sults != null){ el.textContent = el.dataset.sults; delete el.dataset.sults; }
    });
  });
}
function crunchRedesenha(){
  /* limpar filtros e busca: uma categoria da outra empresa deixaria o feed vazio */
  if (typeof nvfLimparTudo === 'function') nvfLimparTudo();
  if (typeof sbClearAll === 'function') sbClearAll();
  if (typeof buildStories === 'function') buildStories();
  if (typeof renderNewsFeed === 'function') renderNewsFeed();
  if (typeof renderShortsB === 'function') renderShortsB();
}
function crunchLigar(){
  if (document.body.classList.contains('demo-crunch')) return;
  /* os cenários não se somam */
  document.body.classList.remove('demo-suporte');
  if (document.body.classList.contains('demo-empty') && typeof demoToggle !== 'undefined') demoToggle.click();

  CRUNCH_BK = { news:NEWS, cats:NEWS_CATS, scats:CATEGORIES, posts:POSTS.slice(), reels:REELS_DATA.slice() };
  NEWS = CRUNCH_NEWS; NEWS_CATS = CRUNCH_CATS; CATEGORIES = CRUNCH_SHORT_CATS;
  POSTS.splice(0, POSTS.length); CRUNCH_POSTS.forEach(function(p){ POSTS.push(p); });
  REELS_DATA.splice(0, REELS_DATA.length); CRUNCH_REELS.forEach(function(r){ REELS_DATA.push(r); });
  SB_CAT_ALIAS.animes = 'animes';

  document.body.classList.add('demo-crunch');
  crunchTextos(true);
  crunchComunicados(true);
  crunchInjetaHome();
  crunchRedesenha();
  if (typeof fgToast === 'function') fgToast('Cenário: funcionário da Crunchyroll (só consome)');
}
/* feed da home: os posts do SULTS ficam escondidos e as matérias entram no fim.
   Pendentes so para quem pode aprovar. Chamado de novo ao mudar o papel. */
function crunchInjetaHome(){
  const feed = document.querySelector('.col-main > .feed');
  if (!feed || typeof addHomePost !== 'function') return;
  feed.querySelectorAll(':scope > .post[data-crunch]').forEach(function(p){ p.remove(); });
  feed.querySelectorAll(':scope > .post').forEach(function(p){ p.setAttribute('data-sults', ''); });
  CRUNCH_NEWS.forEach(function(n){
    if (n.status && n.status !== 'pub') return;      /* reprovada: fora do ar */
    if (n.pendAppr && !podeAprovar()) return;
    addHomePost(n, true);
    const novo = feed.lastElementChild;
    if (novo && !novo.hasAttribute('data-sults')) novo.setAttribute('data-crunch', '');
  });
}
function crunchAdmin(ligar){
  document.body.classList.toggle('crunch-admin', !!ligar);
  document.querySelectorAll('.profile-role, .nvf-prole').forEach(function(el){ el.textContent = crunchPapel(); });
  crunchInjetaHome();
  if (typeof renderNewsFeed === 'function') renderNewsFeed();
  if (typeof buildStories === 'function') buildStories();
  if (typeof renderShortsB === 'function') renderShortsB();
  if (typeof fgToast === 'function') fgToast(ligar ? 'Pikachu agora é administrador: publica e aprova' : 'Pikachu voltou a só consumir');
}
function crunchDesligar(){
  if (!document.body.classList.contains('demo-crunch') || !CRUNCH_BK) return;
  /* a home customizavel vive em cima deste cenario: sair dele e sair dela.
     customDesligar tira a classe antes de chamar de volta, entao nao recorre. */
  if (typeof customDesligar === 'function' && document.body.classList.contains('demo-custom') && document.body.dataset.cliente === 'crunch'){
    customDesligar();
    if (!document.body.classList.contains('demo-crunch') || !CRUNCH_BK) return;
  }
  NEWS = CRUNCH_BK.news; NEWS_CATS = CRUNCH_BK.cats; CATEGORIES = CRUNCH_BK.scats;
  POSTS.splice(0, POSTS.length); CRUNCH_BK.posts.forEach(function(p){ POSTS.push(p); });
  REELS_DATA.splice(0, REELS_DATA.length); CRUNCH_BK.reels.forEach(function(r){ REELS_DATA.push(r); });
  delete SB_CAT_ALIAS.animes;
  CRUNCH_BK = null;

  document.body.classList.remove('demo-crunch', 'crunch-admin');
  crunchTextos(false);
  crunchComunicados(false);
  document.querySelectorAll('.col-main > .feed > .post[data-crunch]').forEach(function(p){ p.remove(); });
  document.querySelectorAll('.col-main > .feed > .post[data-sults]').forEach(function(p){ p.removeAttribute('data-sults'); });
  crunchRedesenha();
  if (typeof fgToast === 'function') fgToast('Cenário: de volta ao SULTS');
}
function crunchAlternar(){
  if (document.body.classList.contains('demo-crunch')) crunchDesligar(); else crunchLigar();
}
(function(){
  const ic = document.querySelector('.hm-store--googleplay');
  if (ic) ic.addEventListener('click', function(e){ e.preventDefault(); crunchAlternar(); });
  /* no mobile o rodapé do menu não aparece: o Comunicados da barra de baixo
     liga e desliga o cenário, e a rolagem até o painel segue acontecendo */
  /* clique no nome do Pikachu no header alterna o papel; fora do cenario o
     chip segue abrindo o perfil (captura, para passar na frente desse handler) */
  const chip = document.getElementById('topUserChip');
  if (chip) chip.addEventListener('click', function(e){
    const noCelular = window.matchMedia('(max-width: 640px)').matches;
    const noCenario = document.body.classList.contains('demo-crunch');
    /* no celular o icone da Google Play nao aparece, entao a foto do header e
       que entra e sai do cenario; no desktop ela alterna o papel */
    if (noCelular){
      e.preventDefault(); e.stopImmediatePropagation();
      if (noCenario) crunchDesligar(); else crunchLigar();
      return;
    }
    if (!noCenario) return;
    e.preventDefault(); e.stopImmediatePropagation();
    crunchAdmin(!crunchEhAdmin());
  }, true);
  /* no celular quem entra e sai do cenario e a foto do header, logo acima */
})();
