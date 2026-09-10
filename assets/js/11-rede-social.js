/* modulo Rede Social */
/* ---------- Módulo Notícias ---------- */
const SULTS_LOGO = '<svg viewBox="0 0 76.6 76.6" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M59.4 28.2 28.2 59.4c-.4.4-1.2.4-1.6 0L17.2 50c-.4-.4-.4-1.2 0-1.6l31.2-31.2c.4-.4 1.2-.4 1.6 0l9.3 9.3c.4.4.4 1.1 0 1.7z"/><path fill="currentColor" d="M32.6.2 5.5 27.4c-3 3-3 7.9 0 10.9l5 5c.2.2.6.2.9 0L53.6 1.1C54 .7 53.8 0 53.2 0H33.1c-.2 0-.3.1-.5.2z"/><path fill="currentColor" d="M65.2 33.3 22.9 75.5c-.4.4-.1 1.1.4 1.1h20.1c.2 0 .3-.1.4-.2l27.2-27.2c3-3 3-7.9 0-10.9l-5-5c-.3-.3-.7-.3-.9 0z"/></svg>';
let NEWS = [
  { id:1, title:'Bem-vindos, Boatlux e Constance!', author:'SULTS', av:null, sub:'Comunicados oficiais', date:'2 h', reactions:128, comments:24, status:'pub',
    text:'',
    banner:{ title:'Bem-vindos, Boatlux e Constance!', sub:'+1.647 marcas · +92.000 unidades · +600.000 usuários' } },
  { id:2, title:'NPS 87 no Customer Success', author:'Livia Fernandes', av:'av-lf', ini:'LF', sub:'Head de Customer Success', cat:'Histórias de sucesso', date:'5 h', reactions:96, comments:18, status:'pub',
    text:'Fechamos o trimestre com NPS 87 no Customer Success! 🚀 Esse número é resultado de um time que trata cada rede como se fosse a única, todos os dias.\n\nCliente feliz é a nossa melhor métrica, e o melhor ainda está por vir. 💙' },
  { id:3, title:'SULTS Open entra em beta', cat:'Produto', author:'Willer Matayoshi', av:'av-wm', ini:'WM', sub:'CTO e Co-fundador', date:'ontem', reactions:154, comments:31, status:'pub',
    text:'Bora de SULTS Open! 🔓 API completa e MCP server para conectar a plataforma a agentes de IA e a qualquer sistema da sua stack. Quem quiser participar dos primeiros testes de integração, chama o time de Produto.' },
  { id:4, title:'Aniversário do Breno!', cat:'Gente & Cultura', author:'Gente & Cultura', av:'av-gc', ini:'GC', sub:'Recursos Humanos · SULTS', date:'1 d', reactions:210, comments:45, status:'pub',
    text:'',
    banner:{ variant:'bday', emoji:'🎂', title:'Feliz aniversário, Breno!', sub:'Deixe sua mensagem no mural' } },
  { id:5, title:'Resultados do 2º trimestre', cat:'Comunicados oficiais', author:'Matheus Scussel', av:'av-ms', ini:'MS', sub:'COO', date:'3 d', reactions:0, comments:0, status:'draft',
    text:'Prévia dos resultados do 2º trimestre. Ainda em revisão.' },
  { id:6, author:'SULTS', av:null, sub:'Histórias de sucesso', date:'22/07/2026', reactions:342, comments:57, status:'pub', pinned:true,
    title:'Como a Casa do Construtor centraliza a gestão de mais de 780 lojas em 4 países com a SULTS',
    image:'uploads/news/casa-construtor.jpg',
    article:{
      kicker:'Histórias de sucesso · Case',
      lead:'Informações estratégicas centralizadas, economia em licenciamento de plataformas e tomada de decisão orientada por dados para toda a rede de franqueados.',
      readTime:'6 min de leitura',
      author:{ name:'Adriano Bicalho', role:'Vice-presidente Corporativo · Casa do Construtor', ini:'AB' },
      stats:[['780+','Lojas em operação'],['4 países','Brasil, Paraguai, Uruguai e Argentina'],['400 mil+','Contratos por mês'],['5.000+','Colaboradores diretos']]
    } },
  { id:7, author:'Ana Souza', av:'av-as', ini:'AS', autorNome:'Ana Souza', autorAv:'av-as', sub:'Eventos', reach:'rede', date:'22/07/2026', datetime:'22/07/26 18:20', reactions:214, comments:39, status:'pub', image:'uploads/reels/abf-expo-dia4.jpg',
    text:'Encerramos a ABF Franchising Expo 2026 com o estande lotado nos quatro dias! 🚀 Obrigado a cada franqueado, parceiro e visitante que passou por lá. Levamos muito aprendizado e novas conexões para toda a rede. Até a próxima! 💙' },
  { id:8, author:'SULTS', av:null, sub:'Produto', reach:'rede', date:'21/07/2026', datetime:'21/07/26 10:05', reactions:167, comments:28, status:'pub', image:'uploads/reels/compras-b2b.jpg',
    text:'Chegou o novo Compras B2B! 🛒 Catálogo digital, cotação automática e aprovação em poucos cliques, tudo integrado ao seu fluxo. Menos planilha, mais controle. Já disponível para as unidades participantes do piloto.' },
  { id:9, author:'SULTS', av:null, sub:'Histórias de sucesso', reach:'rede', date:'20/07/2026', datetime:'20/07/26 09:30', reactions:189, comments:22, status:'pub', pinned:false,
    title:'Mormaii: como a rede unificou a comunicação de mais de 200 lojas',
    image:'uploads/reels/mormaii-historia.jpg',
    article:{ kicker:'Histórias de sucesso · Case', lead:'A Mormaii passou a centralizar comunicados, checklists e treinamentos em um só lugar, ganhando agilidade na operação de ponta a ponta.', readTime:'5 min de leitura', author:{name:'Enrico Ferrari', role:'Diretor de Expansão · Mormaii', ini:'EF'}, stats:[['200+','Lojas'],['1 canal','Comunicação unificada'],['-35%','Tempo de resposta'],['98%','Adesão às rotinas']] } },
  { id:10, author:'Livia Fernandes', av:'av-lf', ini:'LF', autorNome:'Livia Fernandes', autorAv:'av-lf', sub:'Gente & Cultura', reach:'matriz', date:'19/07/2026', datetime:'19/07/26 14:12', reactions:96, comments:15, status:'pub',
    text:'Nosso time de Customer Success cresceu! 🎉 Damos as boas-vindas a 4 novas pessoas que vão cuidar ainda mais de perto de cada rede. Preparem o café e o abraço de sempre. ☕💙' },
  { id:11, author:'SULTS', av:null, sub:'Histórias de sucesso', reach:'rede', date:'18/07/2026', datetime:'18/07/26 11:00', reactions:143, comments:19, status:'pub',
    title:'FarMelhor: treinamento padronizado em toda a rede de drogarias',
    image:'uploads/reels/farmelhor-historia.jpg',
    article:{ kicker:'Histórias de sucesso · Case', lead:'Com a Universidade Corporativa da SULTS, a FarMelhor padronizou o treinamento de novos colaboradores e reduziu o tempo de ramp-up nas lojas.', readTime:'4 min de leitura', author:{name:'Luciano Sampaio', role:'Gerente de Operações · FarMelhor', ini:'LS'}, stats:[['+300','Colaboradores treinados'],['-40%','Tempo de onboarding'],['100%','Lojas cobertas'],['4.8','Nota média das trilhas']] } },
  { id:12, author:'Willer Matayoshi', av:'av-wm', ini:'WM', autorNome:'Willer Matayoshi', autorAv:'av-wm', sub:'Produto', reach:'rede', date:'17/07/2026', datetime:'17/07/26 16:45', reactions:201, comments:47, status:'pub',
    text:'SULTS Open agora com webhooks! 🔌 Dá para disparar eventos da plataforma direto para os seus sistemas em tempo real. A documentação já está no ar e o time de Produto está de plantão para ajudar nas primeiras integrações.' },
  { id:13, author:'Ana Souza', av:'av-as', ini:'AS', autorNome:'Ana Souza', autorAv:'av-as', sub:'Eventos', reach:'rede', date:'16/07/2026', datetime:'16/07/26 08:50', reactions:158, comments:26, status:'pub', image:'uploads/reels/abf-summit-dia2.jpg',
    text:'Dia 2 do ABF Franchising Summit Brasil 2026! 🎤 Painéis sobre expansão, tecnologia e o futuro do franchising. Quem está por aqui, passa no nosso espaço para trocar ideia sobre gestão de redes. 👊' },
  { id:14, author:'SULTS', av:null, sub:'Comunicados oficiais', reach:'rede', date:'15/07/2026', datetime:'15/07/26 09:00', reactions:88, comments:12, status:'pub',
    text:'Manutenção programada 🛠️ No próximo domingo, das 2h às 5h, a plataforma pode ficar instável por conta de melhorias na infraestrutura. Nenhuma ação é necessária da sua parte. Obrigado pela compreensão!' },
  { id:15, author:'SULTS', av:null, sub:'Histórias de sucesso', reach:'rede', date:'14/07/2026', datetime:'14/07/26 10:40', reactions:176, comments:33, status:'pub',
    title:'Bella Capri: gestão de qualidade em cada pizzaria da rede',
    image:'uploads/reels/bellacapri-historia.jpg',
    article:{ kicker:'Histórias de sucesso · Case', lead:'A Bella Capri usa checklists e planos de ação da SULTS para manter o mesmo padrão de qualidade em todas as unidades.', readTime:'4 min de leitura', author:{name:'Equipe Bella Capri', role:'Franqueadora', ini:'BC'}, stats:[['120+','Pizzarias'],['+22%','Notas de auditoria'],['1 padrão','Em toda a rede'],['Semanal','Acompanhamento']] } },
  { id:16, author:'Livia Fernandes', av:'av-lf', ini:'LF', autorNome:'Livia Fernandes', autorAv:'av-lf', sub:'Gente & Cultura', reach:'rede', date:'13/07/2026', datetime:'13/07/26 12:15', reactions:132, comments:20, status:'pub',
    text:'Sextou com reconhecimento! 🏆 Parabéns ao time de Implantação, que bateu a meta de onboarding de novas unidades neste mês. Vocês são demais. Bora comemorar! 🎉' },
  { id:17, author:'SULTS', av:null, sub:'Produto', reach:'rede', date:'12/07/2026', datetime:'12/07/26 15:30', reactions:154, comments:31, status:'pub',
    text:'Novidade no Checklist ✅ Agora dá para anexar fotos com marcação e gerar plano de ação automático a partir de itens reprovados. Atualização já disponível para todos. Conta pra gente o que achou!' },
  { id:18, author:'SULTS', av:null, sub:'Histórias de sucesso', reach:'rede', date:'11/07/2026', datetime:'11/07/26 09:20', reactions:121, comments:17, status:'pub',
    title:'Lugano: chocolates com operação sincronizada em todo o Brasil',
    image:'uploads/reels/lugano-historia.jpg',
    article:{ kicker:'Histórias de sucesso · Case', lead:'A Lugano conectou comunicação, projetos e indicadores em uma só plataforma e passou a decidir com base em dados.', readTime:'5 min de leitura', author:{name:'Anibal Martins', role:'Diretor · Lugano', ini:'AM'}, stats:[['150+','Lojas'],['1 visão','Rede inteira'],['+18%','Eficiência operacional'],['Diário','Acompanhamento de KPIs']] } },
  { id:19, author:'Matheus Scussel', av:'av-ms', ini:'MS', autorNome:'Matheus Scussel', autorAv:'av-ms', sub:'Expansão', reach:'matriz', date:'10/07/2026', datetime:'10/07/26 17:05', reactions:110, comments:14, status:'pub',
    text:'Fechamos julho com 3 novas marcas na base! 🤝 Seguimos crescendo com consistência e cuidado. Obrigado ao time comercial e de implantação por mais um mês histórico. Rumo ao próximo! 📈' },
  { id:20, author:'SULTS', av:null, sub:'Eventos', reach:'rede', date:'09/07/2026', datetime:'09/07/26 13:00', reactions:99, comments:21, status:'pub', image:'uploads/reels/abf-expo-dia2.jpg',
    text:'Dia 2 da ABF Expo 2026 foi intenso! 🔥 Muitas conversas sobre padronização, tecnologia e crescimento sustentável de redes. Amanhã tem mais, vem com a gente!' },
  { id:21, author:'Ellen Rocha', av:'av-gc', ini:'ER', autorNome:'Ellen Rocha', autorAv:'av-gc', sub:'Gente & Cultura', reach:'rede', date:'08/07/2026', datetime:'08/07/26 10:30', reactions:145, comments:29, status:'pub',
    text:'Setembro chega com a Convenção SULTS 2026! 🎊 Programe-se: três dias de conteúdo, networking e muita energia. Em breve abrimos as inscrições. Bora juntos? 💙' },
  { id:22, author:'SULTS', av:null, sub:'Comunicados oficiais', reach:'unidades', date:'07/07/2026', datetime:'07/07/26 08:00', reactions:73, comments:9, status:'pub',
    text:'Atenção, gestores de unidade 📌 O novo modelo de relatório mensal já está disponível no módulo de Relatórios. Ele traz visão consolidada de chamados, checklists e tarefas. Deem uma olhada!' },
  { id:23, author:'Willer Matayoshi', av:'av-wm', ini:'WM', autorNome:'Willer Matayoshi', autorAv:'av-wm', sub:'Produto', reach:'rede', date:'06/07/2026', datetime:'06/07/26 11:45', reactions:163, comments:36, status:'pub',
    text:'MCP Server da SULTS em beta! 🤖 Agora agentes de IA podem consultar e agir na plataforma com segurança. É a base para automações inéditas na gestão da sua rede. Quem quer testar?' },
  { id:24, author:'Ana Souza', av:'av-as', ini:'AS', autorNome:'Ana Souza', autorAv:'av-as', sub:'Eventos', reach:'rede', date:'05/07/2026', datetime:'05/07/26 19:10', reactions:118, comments:16, status:'pub', image:'uploads/reels/abf-expo-dia1.jpg',
    text:'Começou a ABF Franchising Expo 2026! 🎉 Primeiro dia e o estande da SULTS já está recebendo muita gente boa. Passa por aqui para conhecer as novidades da plataforma!' },
  { id:25, author:'SULTS', av:null, sub:'Gente & Cultura', reach:'rede', date:'04/07/2026', datetime:'04/07/26 16:00', reactions:0, comments:0, status:'draft',
    text:'[Rascunho] Vagas internas abertas em Produto e CS. Revisar descrições antes de publicar.' },
  { id:26, author:'SULTS', av:null, sub:'Histórias de sucesso', reach:'rede', date:'03/07/2026', datetime:'03/07/26 09:00', reactions:0, comments:0, status:'draft',
    title:'PitStop: controle efetivo da operação em cada unidade',
    image:'uploads/reels/pitstop-historia.jpg',
    article:{ kicker:'Histórias de sucesso · Case', lead:'Rascunho do case PitStop. Validar números com o cliente antes de publicar.', readTime:'4 min de leitura', author:{name:'Equipe PitStop', role:'Franqueadora', ini:'PS'}, stats:[['80+','Unidades'],['1 painel','Operação'],[',','A confirmar'],[',','A confirmar']] } }
];
const newsView = $('#newsView'), nmodSide = $('#nmodSide');

let newsEditId = null, newsQuery = '', nvBanner = false, nvFrom = 'feed';
let composeImg = null, nvEvent = false, composePoll = false, nvType = null;
(function(){
  const un=["Shopping Plazza Rio","Bella Capri Centro","Lugano Gramado","Boatlux Marina Sul","Pit Stop Barra","FarMelhor Savassi","Mormaii Balneário","Casa do Construtor Norte"];
  NEWS.filter(n=>n.status==='pub' && n.author && n.author!=='SULTS').forEach((n,i)=>{
    if(i%3===2) return;
    n.unit = un[i%un.length];
    /* uma em cada tres vale para varias unidades, para o cabecalho ter onde
       mostrar o "+N unidades" */
    if(i%3===0) n.units = [n.unit, un[(i+1)%un.length], un[(i+2)%un.length]];
  });
})();
const newsLiked = new Set();
(function(){ NEWS.filter(n=>n.status==='pub').slice(0,3).forEach(n=>newsLiked.add(n.id)); })();
let NEWS_CATS = [
  { id:'oficiais', name:'Comunicados oficiais', color:'#2f6fe4', icon:'fa-bullhorn', active:true },
  { id:'eventos', name:'Eventos', color:'#a93438', icon:'fa-calendar-day', active:true },
  { id:'cultura', name:'Gente & Cultura', color:'#e08a1e', icon:'fa-hand-holding-heart', active:true },
  { id:'produto', name:'Produto', color:'#8161d8', icon:'fa-box', active:true },
  { id:'expansao', name:'Expansão', color:'#27a689', icon:'fa-arrow-trend-up', active:false },
  { id:'sucesso', name:'Histórias de sucesso', color:'#00acac', icon:'fa-trophy', active:true },
  { id:'noticias', name:'Notícias', color:'#0088FF', icon:'fa-newspaper', active:false }
];

/* Cabecalho da publicacao, sempre nas mesmas tres linhas:
     nome
     cargo · empresa   (varias unidades viram "a primeira +N unidades")
     data · alcance · categoria                                        */
const AUTOR_CARGO = {
  'SULTS':'Canal oficial',
  'Livia Fernandes':'Head de Customer Success',
  'Willer Matayoshi':'CTO e Co-fundador',
  'Gente & Cultura':'Recursos Humanos',
  'Matheus Scussel':'COO',
  'Ana Souza':'Marketing',
  'Ellen Rocha':'Conteúdo'
};
function postCargo(n){
  /* um cargo so: o que vier depois de um "·" e especialidade, e a linha ja
     reserva esse separador para a unidade */
  const soUm = v => String(v||'').split('·')[0].trim();
  if (n.cargo) return soUm(n.cargo);
  /* o "sub" antigo guardava o cargo quando nao guardava a categoria */
  const s = soUm(n.sub);
  if (s && !postCatNome(n)) return s;
  return soUm(AUTOR_CARGO[String(n.author||n.autorNome||'').trim()]);
}
function postEmpresa(n){
  const lista = (Array.isArray(n.units) ? n.units : (n.unit ? [n.unit] : [])).filter(Boolean);
  if (!lista.length) return 'SULTS';
  if (lista.length === 1) return lista[0];
  const resto = lista.length - 1;
  return lista[0] + ' +' + resto + ' unidade' + (resto > 1 ? 's' : '');
}
/* a categoria vem do campo proprio; nas publicacoes antigas ela ainda mora no
   "sub", e o que decide e bater com a lista de NEWS_CATS */
function postCatNome(n){
  const nome = String(n.cat || '').trim() || String(n.sub||'').split('·')[0].trim();
  if (!nome) return '';
  /* NEWS_CATS e um let declarado mais adiante no script unico: ate typeof
     lanca ReferenceError enquanto ele esta na zona morta */
  let cats = null; try { cats = NEWS_CATS; } catch (e) { cats = null; }
  return (cats && cats.some(c => c.name === nome)) ? nome : '';
}
/* a categoria entra na linha da data, depois do icone de alcance */
function postCatMeta(n){
  const c = postCatNome(n);
  return c ? ' · <span class="post-cat">'+c+'</span>' : '';
}
/* Cada pedaco do cabecalho sai dentro de um .pm, que nao quebra por dentro e
   ja carrega o seu separador. A linha entao so pode quebrar ENTRE os pedacos:
   o horario nunca se parte no meio e nenhuma linha comeca com o separador. */
function pmPartes(lista){
  const p = lista.filter(Boolean);
  return p.map(function(x, i){
    return '<span class="pm">' + x + (i < p.length - 1 ? ' \u00b7' : '') + '</span>';
  }).join(' ');
}
function postSub(n){
  return pmPartes([postCargo(n), postEmpresa(n)]);
}
/* data · alcance · categoria */
function postMetaHTML(n, editado){
  return pmPartes([
    fmtQuando(n),
    editado ? '<span class="edited-tag">editado</span>' : '',
    '<i class="fa-solid fa-earth-americas"></i>',
    postCatNome(n)
  ]);
}
const BRAND_LOGO = '<svg viewBox="0 0 76.6 76.6" xmlns="http://www.w3.org/2000/svg"><path fill="#00acac" d="M59.4 28.2 28.2 59.4c-.4.4-1.2.4-1.6 0L17.2 50c-.4-.4-.4-1.2 0-1.6l31.2-31.2c.4-.4 1.2-.4 1.6 0l9.3 9.3c.4.4.4 1.1 0 1.7z"/><path fill="#00acac" d="M32.6.2 5.5 27.4c-3 3-3 7.9 0 10.9l5 5c.2.2.6.2.9 0L53.6 1.1C54 .7 53.8 0 53.2 0H33.1c-.2 0-.3.1-.5.2z"/><path fill="#00acac" d="M65.2 33.3 22.9 75.5c-.4.4-.1 1.1.4 1.1h20.1c.2 0 .3-.1.4-.2l27.2-27.2c3-3 3-7.9 0-10.9l-5-5c-.3-.3-.7-.3-.9 0z"/></svg>';
const WHITE_LOGO = '<svg class="logo-mark" viewBox="0 0 76.6 76.6" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M59.4 28.2 28.2 59.4c-.4.4-1.2.4-1.6 0L17.2 50c-.4-.4-.4-1.2 0-1.6l31.2-31.2c.4-.4 1.2-.4 1.6 0l9.3 9.3c.4.4.4 1.1 0 1.7z"/><path fill="#fff" d="M32.6.2 5.5 27.4c-3 3-3 7.9 0 10.9l5 5c.2.2.6.2.9 0L53.6 1.1C54 .7 53.8 0 53.2 0H33.1c-.2 0-.3.1-.5.2z"/><path fill="#fff" d="M65.2 33.3 22.9 75.5c-.4.4-.1 1.1.4 1.1h20.1c.2 0 .3-.1.4-.2l27.2-27.2c3-3 3-7.9 0-10.9l-5-5c-.3-.3-.7-.3-.9 0z"/></svg>';
NEWS.filter(n=>n.status==='pub' && n.id>=7).forEach(n=>addHomePost(n, true));
function newsAvatarHTML(n){ return n.av ? '<span class="avatar '+n.av+'"></span>' : '<span class="nv-logo">'+SULTS_LOGO+'</span>'; }
function nmodSetActive(id){ $$('.nmod-tab').forEach(t=>t.classList.remove('active')); const cfg=(id==='nmodCats'||id==='nmodPerm'||id==='nmodParams'); const apr=(id==='nmodMod'||id==='nmodPubAppr'); const inter=(id==='nmodInter'); newsView.classList.toggle('intermode',inter); if(inter&&$('#nmtInter'))$('#nmtInter').classList.add('active'); const aprhome=(id==='nmodApr'); newsView.classList.toggle('aprhome',aprhome); if(aprhome){ if($('#nmtApr'))$('#nmtApr').classList.add('active'); } newsView.classList.toggle('cfg',cfg); newsView.classList.toggle('apr',apr); newsView.classList.toggle('export', id==='nmodExport'); newsView.classList.toggle('catmode', id==='nmodCats'); if(cfg){ if(id==='nmodCats'){ if($('#nmtCfg'))$('#nmtCfg').classList.add('active'); } else { if($('#nmtPerm'))$('#nmtPerm').classList.add('active'); } } else if(apr){ if($('#nmtApr'))$('#nmtApr').classList.add('active'); } else { if(id==='nmodPub'&&$('#nmtPub'))$('#nmtPub').classList.add('active'); if(id==='nmodNew'&&$('#nmtFeed'))$('#nmtFeed').classList.add('active'); } $$('.nv-cfgitem').forEach(t=>t.classList.remove('active')); if(id==='nmodCats'&&$('#nvcfgCats'))$('#nvcfgCats').classList.add('active'); if(id==='nmodPerm'&&$('#nvcfgPerm'))$('#nvcfgPerm').classList.add('active'); if(id==='nmodParams'&&$('#nvcfgParams'))$('#nvcfgParams').classList.add('active'); if(id==='nmodPerm'&&$('#nvcfgPermPub'))$('#nvcfgPermPub').classList.add('active'); if(id==='nmodParams'&&$('#nvcfgPermCom'))$('#nvcfgPermCom').classList.add('active'); if(id==='nmodMod'&&$('#nvaprCom'))$('#nvaprCom').classList.add('active'); if(id==='nmodPubAppr'&&$('#nvaprPub'))$('#nvaprPub').classList.add('active'); if(id==='nmodStories'&&$('#nmtStories'))$('#nmtStories').classList.add('active'); if(id==='nmodShortsB'&&$('#nmtStories'))$('#nmtStories').classList.add('active'); if(id==='nmodMgShorts'&&$('#nmtMgShorts'))$('#nmtMgShorts').classList.add('active'); if(id==='nmodCm'&&$('#nmtCmts'))$('#nmtCmts').classList.add('active'); if(id==='nmodExport'){ if($('#nmtExport'))$('#nmtExport').classList.add('active'); if($('#nvcfgExport'))$('#nvcfgExport').classList.add('active'); } }
function nvSetEnv(env){
  const social = env==='social';
  newsView.classList.toggle('env-social', social);
  const gm=$('#nmodGrpManage'), gs=$('#nmodGrpSocial');
  if(gm) gm.classList.toggle('on', !social);
  if(gs) gs.classList.toggle('on', social);
  const nm=$('#nmodEnvName'); if(nm) nm.textContent = social ? 'Social' : 'Gerenciar';
  const sw=$('#nmodEnvSwitch');
  if(sw) sw.innerHTML = social
    ? '<i class="fa-solid fa-gear"></i><span class="lbl">Gerenciar</span>'
    : '<i class="fa-solid fa-users-rectangle"></i><span class="lbl">Acessar Social</span>';
}
$('#nmodEnvSwitch') && $('#nmodEnvSwitch').addEventListener('click', ()=>{
  if(newsView.classList.contains('env-social')) newsShow('list');
  else newsShow('feed');
});
$('#nmtStories') && $('#nmtStories').addEventListener('click', ()=>newsShow('shorts'));
$('#nmtShortsB') && $('#nmtShortsB').addEventListener('click', ()=>newsShow('shortsb'));
$('#sbNew') && $('#sbNew').addEventListener('click', ()=>{ if(typeof crOpen==='function') crOpen(); });
[3,9].forEach(function(i){ const r=REELS_DATA[i]; if(r&&POSTS[r.p]){ POSTS[r.p].name='Rodrigo Caetano'; POSTS[r.p].av='av-rc'; } });
[1,5].forEach(function(i){ if(REELS_DATA[i]) REELS_DATA[i].proc=true; });
[7,12].forEach(function(i){ if(REELS_DATA[i]) REELS_DATA[i].removido=true; });
let sbFmt='', sbAuthorPage=1, sbTab='todos', sbQuery='', sbAct='', sbAuthor='', sbAuthorQuery='', sbShown=12, sbPeriod='';
function sbTabs(){
  /* {id, label, icon, cor}. A cor pinta o selo do icone; com a aba aberta o
     fundo e o texto sao sempre verdigris. A lista sai do NEWS_CATS, que e a
     mesma que se gerencia em Categorias e que o feed de publicacoes usa —
     antes o tab tinha uma lista propria de tres itens. A aba fixa
     "Histórias de sucesso" saiu porque agora ela e uma categoria de verdade. */
  const t = [{ id:'todos', label:'Todos os shorts', icon:'fa-layer-group', cor:'#00ACAC' }];
  const lista = (typeof NEWS_CATS !== 'undefined') ? NEWS_CATS : CATEGORIES;
  lista.forEach(function(c){
    t.push({ id:'cat:'+c.id, label:c.name, icon:c.icon || 'fa-tag', cor:c.color });
  });
  return t;
}
/* Os shorts foram cadastrados com a lista antiga (depoimentos/eventos/
   produtos) e o tab agora usa a de publicacoes. Este mapa liga uma na outra:
   sem ele so "Eventos" casaria e as demais abas viriam vazias sem motivo.
   As categorias sem short nenhum ficam vazias de verdade, e o estado vazio
   da tela cobre isso. */
const SB_CAT_ALIAS = { depoimentos:'sucesso', eventos:'eventos', produtos:'produto' };
function sbCatDe(r){ return SB_CAT_ALIAS[r.cat] || r.cat || ''; }
function sbList(){
  return REELS_DATA.filter(function(r){
    const p=POSTS[r.p]||{};
    if(r.removido) return false;
    if(r.pendAppr && typeof podeAprovar==='function' && !podeAprovar()) return false;
    if(sbFmt && rFormat(r)!==sbFmt) return false;
    if(sbAct==='naovistos' && isSeen(r.p)) return false;
    if(sbTab.indexOf('cat:')===0 && sbCatDe(r)!==sbTab.slice(4)) return false;
    if(sbAct==='curti' && !isLiked(r.p)) return false;
    if(sbAct==='meus' && p.name!=='Rodrigo Caetano') return false;
    if(sbAuthor && p.name!==sbAuthor) return false;
    if(sbPeriod!=='' && nvFeedDaysAgo(p.datetime||p.date||p.time) > +sbPeriod) return false;
    if(sbQuery){
      const q=rxNorm(sbQuery);
      const hay=rxNorm((p.title||'')+' '+(p.alt||'')+' '+(p.caption||'')+' '+(p.name||''));
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}
/* Rotulos legiveis dos filtros. Sem isto a ficha mostraria o valor cru que o
   estado guarda — "meus", "0", "cat:sucesso" — em vez do que a pessoa clicou. */
const SB_ROTULO_ATIVIDADE = { meus:'Publicados por mim', curti:'Que eu curti', naovistos:'Não vistos' };
const SB_ROTULO_TIPO      = { video:'Vídeo', imagem:'Imagem' };
const SB_ROTULO_PERIODO   = { '0':'Hoje', '7':'Últimos 7 dias', '30':'Últimos 30 dias' };
function sbFiltrosAtivos(){
  const f = [];
  if (sbQuery)        f.push({ chave:'query',  rotulo:'Pesquisa',  valor:sbQuery });
  if (sbTab !== 'todos'){
    const aba = sbTabs().find(t => t.id === sbTab);
    f.push({ chave:'tab', rotulo:'Categoria', valor:(aba ? aba.label : sbTab) });
  }
  if (sbAct)          f.push({ chave:'act',    rotulo:'Atividade', valor:SB_ROTULO_ATIVIDADE[sbAct] || sbAct });
  if (sbFmt)          f.push({ chave:'fmt',    rotulo:'Tipo',      valor:SB_ROTULO_TIPO[sbFmt] || sbFmt });
  if (sbAuthor)       f.push({ chave:'author', rotulo:'Autor',     valor:sbAuthor });
  if (sbPeriod !== '')f.push({ chave:'period', rotulo:'Período',   valor:SB_ROTULO_PERIODO[sbPeriod] || sbPeriod });
  return f;
}
function sbLimparFiltro(chave){
  if (chave === 'tab')    sbTab = 'todos';
  if (chave === 'act')    sbAct = '';
  if (chave === 'fmt')    sbFmt = '';
  if (chave === 'author'){ sbAuthor = ''; sbAuthorQuery = ''; sbAuthorPage = 1; }
  if (chave === 'period'){ sbPeriod = ''; const p = $('#sbPeriodSel'); if (p) p.value = ''; }
  if (chave === 'query'){ sbQuery = ''; const s = $('#sbSearch'); if (s) s.value = '';
    nvSearchQuery = ''; const h = $('#nmodSearchIn'); if (h) h.value = '';
    const l = $('#nvfSearch'); if (l) l.value = '';
    if (typeof renderNewsFeed === 'function') renderNewsFeed();
    if (typeof buildStories === 'function') buildStories(); }
  sbShown = 12;
  renderShortsB();
}
function sbActiveCount(){
  let n=0;
  if(sbTab!=='todos') n++;
  if(sbFmt) n++;
  if(sbAct) n++;
  if(sbAuthor) n++;
  if(sbQuery) n++;
  if(sbPeriod!=='') n++;
  return n;
}
function sbClearAll(){
  sbTab='todos'; sbAct=''; sbFmt=''; sbAuthor=''; sbQuery=''; sbAuthorQuery=''; sbAuthorPage=1; sbShown=12; sbPeriod='';
  const pe=$('#sbPeriodSel'); if(pe) pe.value='';
  const s=$('#sbSearch'); if(s) s.value='';
  /* a busca vem do header e vale para os dois feeds */
  nvSearchQuery=''; const hh=$('#nmodSearchIn'); if(hh) hh.value='';
  if(typeof renderNewsFeed==='function') renderNewsFeed();
  if(typeof buildStories==='function') buildStories();
  const a=$('#sbAuthorSearch'); if(a) a.value='';
  renderShortsB();
}
$('#sbClear') && $('#sbClear').addEventListener('click', sbClearAll);
$('#sbChips') && $('#sbChips').addEventListener('click', function(e){
  const b=e.target.closest('[data-sbchip]'); if(!b) return;
  sbLimparFiltro(b.dataset.sbchip);
});
$('#sbPeriodSel') && $('#sbPeriodSel').addEventListener('change', function(e){ sbPeriod=e.target.value; sbShown=12; renderShortsB(); });
/* Aprovacao do short: os botoes ficam numa linha propria abaixo da capa, e
   nao por cima dela — sobre a arte eles apagariam a capa e o titulo. O clique
   nao pode subir para o card, que abre o player. */
function sbDecidir(el, aprovar){
  const card = el.closest('.sb-card'); if(!card) return;
  const r = REELS_DATA[+card.dataset.sb]; if(!r) return;
  r.pendAppr = false;
  if(!aprovar) r.removido = true;
  if(typeof renderShortsB === 'function') renderShortsB();
  if(typeof buildStories === 'function') buildStories();
  if(typeof fgToast === 'function') fgToast(aprovar ? 'Short aprovado' : 'Short reprovado');
}
function renderShortsB(){
  /* as duas listas da coluna se sincronizam com o estado a cada desenho. A de
     atividade nao fazia isso: so o clique marcava o botao, entao limpar o
     filtro por outro caminho — a ficha ou o "Limpar filtros" — deixava a
     opcao antiga acesa na coluna. */
  $$('.sb-fmt').forEach(b=>b.classList.toggle('active', (b.dataset.sbfmt||'')===sbFmt));
  $$('.sb-act').forEach(b=>b.classList.toggle('active', (b.dataset.sbact||'')===sbAct));
  const filtros=sbFiltrosAtivos(), barra=$('#sbChipsBar');
  if(barra){
    barra.hidden = filtros.length===0;
    const lb=$('#sbClearLbl');
    if(lb) lb.textContent = 'Limpar filtros ('+filtros.length+')';
    const cx=$('#sbChips');
    if(cx) cx.innerHTML = filtros.map(function(f){
      return '<span class="sb-chip">'+f.rotulo+': <b>'+f.valor+'</b>'+
        '<button type="button" class="sb-chipx" data-sbchip="'+f.chave+'" aria-label="Remover filtro '+f.rotulo+'">'+
        '<i class="fa-solid fa-xmark"></i></button></span>';
    }).join('');
  }
  const pills=$('#sbPills');
  if(pills){
    pills.innerHTML = sbTabs().map(function(t){
      const selo = t.cor
        ? '<span class="sb-pill-ic" style="background:'+t.cor+'"><i class="fa-solid '+t.icon+'"></i></span>'
        : '<i class="fa-solid '+t.icon+'"></i>';
      return '<button class="sb-pill'+(sbTab===t.id?' on':'')+'" data-sbtab="'+t.id+'">'+selo+t.label+'</button>';
    }).join('');
    requestAnimationFrame(sbArrows);
  }
  const sbl=$('#sbAuthorBtnLbl'); if(sbl) sbl.textContent = sbAuthor || 'Todos os autores';
  const ab=$('#sbAuthors');
  if(ab){
    const q=rxNorm(sbAuthorQuery);
    const names=[...new Set(REELS_DATA.map(r=>(POSTS[r.p]||{}).name).filter(Boolean))].filter(n=>!q||rxNorm(n).includes(q));
    const per=6, pages=Math.max(1,Math.ceil(names.length/per));
    if(sbAuthorPage>pages) sbAuthorPage=pages;
    const pg=names.slice((sbAuthorPage-1)*per, sbAuthorPage*per);
    let ah = pg.map(function(n){
      const p=REELS_DATA.map(r=>POSTS[r.p]).find(x=>x&&x.name===n)||{};
      return '<button class="nvf-pickrow nvf-aitem'+(sbAuthor===n?' on':'')+'" data-sbauthor="'+n+'"><span class="avatar '+(p.av||'av-brand')+'"></span><span>'+n+'</span><span class="nvf-pickradio"></span></button>';
    }).join('') || '<div class="nvf-fnone">Nenhum autor</div>';
    if(names.length>per){
      let nums=''; for(let pn=1;pn<=pages;pn++) nums+='<button class="nvf-apgn'+(pn===sbAuthorPage?' on':'')+'" data-sbapgto="'+pn+'">'+pn+'</button>';
      ah+='<div class="nvf-apager">'+
        '<button class="nvf-apg" data-sbapgto="1"'+(sbAuthorPage===1?' disabled':'')+'><i class="fa-solid fa-angles-left"></i></button>'+
        '<button class="nvf-apg" data-sbapg="-1"'+(sbAuthorPage===1?' disabled':'')+'><i class="fa-solid fa-chevron-left"></i></button>'+
        nums+
        '<button class="nvf-apg" data-sbapg="1"'+(sbAuthorPage===pages?' disabled':'')+'><i class="fa-solid fa-chevron-right"></i></button>'+
        '<button class="nvf-apg" data-sbapgto="'+pages+'"'+(sbAuthorPage===pages?' disabled':'')+'><i class="fa-solid fa-angles-right"></i></button></div>';
    }
    ab.innerHTML = ah;
  }
  const el=$('#sbGrid'); if(!el) return;
  const all=sbList();
  const list=all.slice(0, sbShown);
  const em=$('#sbEmpty'); if(em) em.hidden = all.length>0;
  el.innerHTML = list.map(function(r){
    const post=POSTS[r.p]||{}, cat=(typeof catById==='function')?catById(r.cat):null;
    return '<article class="sb-card'+(r.pendAppr?' is-pend':'')+'" data-sb="'+REELS_DATA.indexOf(r)+'">'+
      '<div class="sb-media">'+
        (r.pendAppr?'<div class="sb-pend"><i class="fa-solid fa-clock"></i> <span class="sb-pend-full">Aguardando aprovação</span><span class="sb-pend-short">Aguardando</span></div>'+
          '<div class="sb-modbar">'+
            '<button class="cmod-ok" data-sbapr="1"><i class="fa-solid fa-check"></i> Aprovar</button>'+
            '<button class="cmod-no" data-sbrej="1"><i class="fa-solid fa-xmark"></i> Reprovar</button>'+
          '</div>':'')+
        ((post.img||post.poster)?'<img src="'+(post.img||post.poster)+'" alt="" loading="eager" decoding="async">'
          :(post.video?'<video src="'+post.video+'" muted loop playsinline preload="metadata"></video>':''))+
        (cat?'<span class="sb-cat"><i class="fa-solid '+cat.icon+'"></i><span class="sb-cat-tx">'+cat.name+'</span></span>':'')+
        (isSeen(r.p)?'':'<span class="sb-newdot"></span>')+
        '<span class="sb-likes"><i class="fa-solid fa-heart"></i> '+likeDisplay(r)+'</span>'+
        '<h3 class="sb-title">'+(post.title||post.alt||'Short')+'</h3>'+
      '</div>'+
      '<div class="sb-author"><span class="avatar '+(post.av||'av-brand')+'"></span>'+
        '<div class="sb-auid"><b>'+(post.name||'SULTS')+'</b>'+
        '<span class="sb-auunit">'+sbUnidade(post)+'</span></div></div>'+
    '</article>';
  }).join('');
  if(typeof ajustaFundoEm==='function') ajustaFundoEm(el, '.sb-media img,.sb-media video');
  if(typeof sbArrows==='function') sbArrows();
  const mw=$('#sbMore');
  if(mw) mw.hidden = all.length<=sbShown;
  if(typeof sbObserve==='function') sbObserve();
}
let sbIO=null;
function sbObserve(){
  const mw=document.getElementById('sbMore'); if(!mw) return;
  if(!sbIO){
    const root=document.querySelector('.sb-view');
    sbIO=new IntersectionObserver(function(en){
      if(en.some(x=>x.isIntersecting) && !mw.hidden){ sbShown+=12; renderShortsB(); }
    }, {root: root||null, rootMargin:'400px 0px'});
  }
  sbIO.disconnect();
  if(!mw.hidden) sbIO.observe(mw);
}
/* Traz a pill inteira para a vista rolando SO a faixa. O scrollIntoView nao
   serve aqui: ele rola tambem o ancestral vertical, jogando a pagina, e
   encosta a pill na borda — bem embaixo da bolinha e do esmaecido. A folga
   de 52px cobre a bolinha (34px + 8 de recuo) e o que sobra do degrade. */
function sbTrazPill(el){
  const faixa=$('#sbPills'); if(!faixa || !el) return;
  const folga=52;
  const r=el.getBoundingClientRect(), f=faixa.getBoundingClientRect();
  let d=0;
  if(r.right > f.right - folga)     d = r.right - (f.right - folga);
  else if(r.left < f.left + folga)  d = r.left - (f.left + folga);
  if(d) faixa.scrollTo({ left: faixa.scrollLeft + d, behavior:'smooth' });
}
$('#sbPills') && $('#sbPills').addEventListener('click', function(e){
  const b=e.target.closest('[data-sbtab]'); if(!b) return;
  sbTab=b.dataset.sbtab; sbShown=12; renderShortsB();
  sbTrazPill($('#sbPills [data-sbtab="'+sbTab+'"]'));
});
$('#sbPillLeft') && $('#sbPillLeft').addEventListener('click', ()=>{ $('#sbPills').scrollLeft -= 320; });
$('#sbPillRight') && $('#sbPillRight').addEventListener('click', ()=>{ $('#sbPills').scrollLeft += 320; });
function sbArrows(){
  const p=$('#sbPills'), l=$('#sbPillLeft'), r=$('#sbPillRight');
  if(!p||!l||!r) return;
  l.hidden = p.scrollLeft < 8;
  r.hidden = p.scrollLeft > p.scrollWidth - p.clientWidth - 8;
}
$('#sbPills') && $('#sbPills').addEventListener('scroll', sbArrows);
window.addEventListener('resize', sbArrows);
/* o campo da lateral e o do header mostram a mesma busca da aba */
$('#sbSearch') && $('#sbSearch').addEventListener('input', function(e){
  sbQuery=e.target.value.trim(); sbShown=12;
  const h=$('#nmodSearchIn'); if(h) h.value=sbQuery;
  renderShortsB();
});
/* o botao da lupa nao filtra nada novo — o campo ja filtra ao digitar — mas
   confirma a busca para quem colou o texto e procura onde clicar */
$('#sbSearchBtn') && $('#sbSearchBtn').addEventListener('click', function(){
  const c=$('#sbSearch'); if(!c) return;
  sbQuery=c.value.trim(); sbShown=12;
  const h=$('#nmodSearchIn'); if(h) h.value=sbQuery;
  renderShortsB();
  if(typeof fgToast==='function') fgToast(sbQuery ? 'Resultados para "'+sbQuery+'"' : 'Busca limpa');
});
function nvfBuscaAplica(termo){
  nvSearchQuery=termo;
  if(typeof nvfAuthorQuery!=='undefined') nvfAuthorQuery='';
  const h=$('#nmodSearchIn'); if(h) h.value=termo;
  if(typeof renderNewsFeed==='function') renderNewsFeed();
}
$('#nvfSearch') && $('#nvfSearch').addEventListener('input', function(e){ nvfBuscaAplica(e.target.value.trim()); });
$('#nvfSearchBtn') && $('#nvfSearchBtn').addEventListener('click', function(){
  const c=$('#nvfSearch'); if(!c) return;
  nvfBuscaAplica(c.value.trim());
  if(typeof fgToast==='function') fgToast(nvSearchQuery ? 'Resultados para "'+nvSearchQuery+'"' : 'Busca limpa');
});
$('#sbAuthorBtn') && $('#sbAuthorBtn').addEventListener('click', function(){ sbAuthorQuery=''; const s=$('#sbAuthorSearch'); if(s) s.value=''; sbAuthorPage=1; renderShortsB(); $('#sbAuthorPickModal').classList.add('open'); });
$('#sbAuthorPickClose') && $('#sbAuthorPickClose').addEventListener('click', ()=>$('#sbAuthorPickModal').classList.remove('open'));
$('#sbAuthorPickModal') && $('#sbAuthorPickModal').addEventListener('click', function(e){ if(e.target===$('#sbAuthorPickModal')) $('#sbAuthorPickModal').classList.remove('open'); });
$('#sbAuthorSearch') && $('#sbAuthorSearch').addEventListener('input', function(e){ sbAuthorQuery=e.target.value.trim(); sbAuthorPage=1; renderShortsB(); });
$('#sbAuthors') && $('#sbAuthors').addEventListener('click', function(e){ const to=e.target.closest('[data-sbapgto]'); if(to){ if(!to.disabled){ sbAuthorPage=+to.dataset.sbapgto; renderShortsB(); } e.stopPropagation(); return; } const pg=e.target.closest('[data-sbapg]'); if(pg){ if(!pg.disabled){ sbAuthorPage=Math.max(1,sbAuthorPage+ +pg.dataset.sbapg); renderShortsB(); } return; } const b=e.target.closest('[data-sbauthor]'); if(!b) return; sbAuthor = sbAuthor===b.dataset.sbauthor ? '' : b.dataset.sbauthor; sbShown=12; renderShortsB(); });
document.addEventListener('click', function(e){
  const sf=e.target.closest('[data-sbfmt]');
  if(sf){ sbFmt=sf.dataset.sbfmt||''; sbShown=12; renderShortsB(); return; }
  const sa=e.target.closest('[data-sbauthor]');
  if(sa){ sbAuthor = (sbAuthor===sa.dataset.sbauthor?'':sa.dataset.sbauthor); sbShown=12; $('#sbAuthorPickModal').classList.remove('open'); renderShortsB(); return; }
});
document.addEventListener('click', function(e){ const b=e.target.closest('[data-sbact]'); if(!b) return; sbAct=b.dataset.sbact; sbShown=12; $$('.sb-act').forEach(x=>x.classList.toggle('active', x===b)); renderShortsB(); });
$('#sbGrid') && $('#sbGrid').addEventListener('click', function(e){
  /* os botoes de aprovacao vem antes: o card inteiro abre o player */
  const ap=e.target.closest('[data-sbapr]'); if(ap){ e.stopPropagation(); sbDecidir(ap, true); return; }
  const re=e.target.closest('[data-sbrej]'); if(re){ e.stopPropagation(); sbDecidir(re, false); return; }
  const c=e.target.closest('[data-sb]'); if(!c) return;
  openPlayer(sbList(), sbList().findIndex(x=>x===REELS_DATA[+c.dataset.sb]));
});
function nvOpenCfgStories(){
  try{ closeCats(); closePerm(); }catch(e){}
  permView.classList.remove('in-cfg');
  reelsView.classList.remove('in-social');
  reelsView.classList.add('in-cfg','in-module');
  curView='lista';
  const g=$('#rxVGrade'), l=$('#rxVLista');
  if(l) l.classList.add('active'); if(g) g.classList.remove('active');
  openStories();
  renderGrid();
}
function nvOpenSocialStories(){
  try{ closeCats(); closePerm(); }catch(e){}
  reelsView.classList.remove('in-cfg','in-module');
  reelsView.classList.add('in-social');
  curView='grade';
  const g=$('#rxVGrade'), l=$('#rxVLista');
  if(g) g.classList.add('active'); if(l) l.classList.remove('active');
  openStories();
  renderGrid();
}
$('#nmtPub') && $('#nmtPub').addEventListener('click', ()=>newsShow('list'));
$('#nmtFeed') && $('#nmtFeed').addEventListener('click', ()=>newsShow('feed'));
$('#nmtPerm') && $('#nmtPerm').addEventListener('click', ()=>{ newsShow('perm'); const s1=$('#permPubSec'), ac=$('#permApprGrid'); if(s1)s1.style.display=''; permStoriesSecShow(true); if(ac)ac.style.display='none'; $$('#nvCfgSide .nv-cfgitem').forEach(x=>x.classList.remove('active')); const b=$('#nvcfgPubWho'); if(b) b.classList.add('active'); });
$('#nmtCfg') && $('#nmtCfg').addEventListener('click', ()=>{ cfgGo('who'); });
$('#nmtExport') && $('#nmtExport').addEventListener('click', ()=>newsShow('export'));
$('#nvcfgExport') && $('#nvcfgExport').addEventListener('click', ()=>newsShow('export'));

/* =====================================================================
   Modal "Exportar" (#expModal) — aberto pelos botões .exp-btn da tela de
   Exportações. Um modal só, com o corpo remontado a cada abertura porque os
   campos mudam por tipo (Publicações/Shorts têm "Tipo" + Autor/Unidade;
   Comentários só tem Autor; Reações tem "Tipo da reação" + Autor/Unidade) —
   ver os prints do Figma (nodes 1719-22628/29571/29652/29733). Reaproveita
   rxDDWrap/rxDateField (20-gerenciar-shorts.js), o shell fg-backdrop/fg-modal
   (05-forum.css) e SB_UNIDADES (01-home.js). */
const EXP_KINDS = {
  pub:      { title:'Exportar publicações', tipoLabel:'Tipo de publicação', tipoOptions:['Todas','Artigos','Postagens','Publicações coloridas'], autorLabel:'Autor da publicação', unidadeLabel:'Unidade do autor', dateLabel:'Publicado de:' },
  shorts:   { title:'Exportar shorts', tipoLabel:'Tipo do short', tipoOptions:['Todos','Vídeos','Imagens'], autorLabel:'Autor do short', unidadeLabel:'Unidade do autor', dateLabel:'Publicado de:' },
  comments: { title:'Exportar comentários', autorLabel:'Autor do comentário', dateLabel:'Publicado de:' },
  reactions:{ title:'Exportar reações', tipoLabel:'Tipo da reação', tipoOptions:['Todas','Gostei','Amei','Parabéns','Genial','Sensacional'], autorLabel:'Autor da reação', unidadeLabel:'Unidade do autor', dateLabel:'Reagido de:' }
};
let expKind = null, expTipo = '', expAutor = '', expUnidade = '', expDateStart = '', expDateEnd = '';
function expFmtDate(d){ const p=n=>('0'+n).slice(-2); return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate()); }
function expRenderBody(){
  const cfg = EXP_KINDS[expKind]; if(!cfg) return;
  const units = SB_UNIDADES.map(function(u){ return u.name; });
  let html = '';
  if(cfg.tipoOptions){
    const tipoItems = cfg.tipoOptions.map(function(t,i){ return { value:t, label:t, selected: expTipo ? expTipo===t : i===0 }; });
    html += '<div style="margin-bottom:18px"><label class="fg-label">'+cfg.tipoLabel+'</label>'+rxDDWrap('expFTipo', expTipo || cfg.tipoOptions[0], tipoItems)+'</div>';
  }
  const autorItems = [{ value:'', label:'Todos', selected:!expAutor }];
  if(cfg.unidadeLabel){
    const unidadeItems = [{ value:'', label:'Todas', selected:!expUnidade }].concat(units.map(function(u){ return { value:u, label:u, selected:expUnidade===u }; }));
    html += '<div class="nv-ffrow nv-ffrow-last" style="margin-bottom:18px">'+
      '<div class="nv-ffcol"><label class="fg-label">'+cfg.autorLabel+'</label>'+rxDDWrap('expFAutor', expAutor || 'Todos', autorItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div>'+
      '<div class="nv-ffcol"><label class="fg-label">'+cfg.unidadeLabel+'</label>'+rxDDWrap('expFUnidade', expUnidade || 'Todas', unidadeItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div>'+
    '</div>';
  } else {
    html += '<div style="margin-bottom:18px"><label class="fg-label">'+cfg.autorLabel+'</label>'+rxDDWrap('expFAutor', expAutor || 'Todos', autorItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div>';
  }
  html += '<label class="fg-label">'+cfg.dateLabel+'</label>'+
    '<div style="display:flex;align-items:center;gap:10px">'+rxDateField('expFDateStart', expDateStart)+'<span style="color:#5F666C;font-size:14px">até</span>'+rxDateField('expFDateEnd', expDateEnd)+'</div>'+
    '<div class="exp-warn"><i class="fa-solid fa-triangle-exclamation"></i> Intervalo máximo de: 3 meses</div>'+
    '<div style="margin-top:24px;display:flex;justify-content:flex-end;gap:10px">'+
      '<button class="fo-btn ghost" id="expCancel">Cancelar</button>'+
      '<button class="fo-btn" id="expSubmit"><i class="fa-solid fa-upload"></i> Exportar</button>'+
    '</div>';
  $('#expModalBody').innerHTML = html;
}
function expOpen(kind){
  const cfg = EXP_KINDS[kind]; if(!cfg) return;
  expKind = kind; expTipo=''; expAutor=''; expUnidade='';
  const hoje = new Date();
  expDateStart = expFmtDate(new Date(hoje.getFullYear(), hoje.getMonth()-3, hoje.getDate()));
  expDateEnd = expFmtDate(hoje);
  $('#expModalTitle').textContent = cfg.title;
  expRenderBody();
  $('#expModal').classList.add('open');
}
function expClose(){ $('#expModal').classList.remove('open'); }
$('#nvExportScreen') && $('#nvExportScreen').addEventListener('click', function(e){ const b=e.target.closest('.exp-btn'); if(b && b.dataset.expkind) expOpen(b.dataset.expkind); });
$('#expModalClose') && $('#expModalClose').addEventListener('click', expClose);
$('#expModal') && $('#expModal').addEventListener('click', function(e){
  if(e.target===$('#expModal')){ expClose(); return; }
  if(e.target.closest('#expCancel')){ expClose(); return; }
  if(e.target.closest('#expSubmit')){ expClose(); fgToast('Exportação solicitada'); return; }
  const db=e.target.closest('.nv-fdatebtn');
  if(db){ const inp=$('#'+db.dataset.datefor); if(inp){ if(inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem=e.target.closest('.rl-dditem');
  if(ddItem){
    const wrap=ddItem.closest('.rl-ddwrap'); const id=wrap.dataset.dd; const v=ddItem.dataset.value;
    if(id==='expFTipo'){ expTipo=v; } else if(id==='expFAutor'){ expAutor=v; } else if(id==='expFUnidade'){ expUnidade=v; }
    expRenderBody();
    return;
  }
  const ddBtn=e.target.closest('.rl-ddwrap > button.nv-ffield');
  if(ddBtn){
    const wrap=ddBtn.closest('.rl-ddwrap'); const menu=wrap.querySelector('.rl-ddmenu');
    const willOpen=menu.hidden;
    $$('#expModal .rl-ddmenu').forEach(m=>m.hidden=true);
    menu.hidden=!willOpen;
    return;
  }
});
$('#expModal') && $('#expModal').addEventListener('change', function(e){
  if(e.target.id==='expFDateStart'){ expDateStart=e.target.value; } else if(e.target.id==='expFDateEnd'){ expDateEnd=e.target.value; }
});
document.addEventListener('click', function(e){ if(!e.target.closest('#expModal .rl-ddwrap')) $$('#expModal .rl-ddmenu').forEach(m=>m.hidden=true); });
document.addEventListener('keydown', function(e){ if(e.key==='Escape' && $('#expModal').classList.contains('open')) expClose(); });
const TEAM_ADMINS = [1,56,978,992,12];
let TEAM = [1,56,978];
let teamQuery='', teamAddQuery='', teamAddUnitQuery='', teamAddSel=new Set();
function teamPhone(id){ const d=String(9000+(id*37)%9999).padStart(4,'0'); return '(34) 9'+String(8000+(id*13)%1999).slice(0,4)+'-'+d; }
function teamMail(name){ const p=name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(' '); return p[0]+'.'+p[p.length-1]+'@sults.com.br'; }
let teamSortCol=null, teamSortDir=0; // dir: 0 neutro, 1 asc (up), 2 desc (down)
function teamTh(label,col,style){
  const dir=(teamSortCol===col)?teamSortDir:0;
  const icon=dir===1?NV_SORT_ICONS.up:dir===2?NV_SORT_ICONS.down:NV_SORT_ICONS.swap;
  return '<th'+(style?' style="'+style+'"':'')+'><span class="cat-th-in"><span>'+label+'</span>'+
    '<button type="button" class="cat-sortbtn" data-sortcol="'+col+'" aria-label="Ordenar por '+label+'">'+icon+'</button></span></th>';
}
function teamRender(){
  const el=document.getElementById('teamList'); if(!el) return;
  let list=TEAM.map(id=>PEOPLE.find(p=>p.id===id)).filter(Boolean)
    .filter(p=>!teamQuery || p.name.toLowerCase().includes(teamQuery.toLowerCase()) || (p.role||'').toLowerCase().includes(teamQuery.toLowerCase()));
  if(!list.length){ el.innerHTML='<div class="cat-empty">Nenhum administrador ainda. Use "Novo administrador".</div>'; return; }
  if(teamSortDir){
    const dir=teamSortDir===1?1:-1;
    if(teamSortCol==='id') list=list.slice().sort((a,b)=>dir*(a.id-b.id));
    else if(teamSortCol==='name') list=list.slice().sort((a,b)=>dir*a.name.localeCompare(b.name));
    else if(teamSortCol==='phone') list=list.slice().sort((a,b)=>dir*teamPhone(a.id).localeCompare(teamPhone(b.id)));
    else if(teamSortCol==='mail') list=list.slice().sort((a,b)=>dir*teamMail(a.name).localeCompare(teamMail(b.name)));
  }
  const rows=list.map(p=>'<tr>'+
    '<td class="perm-id">#'+p.id+'</td>'+
    '<td><div class="perm-person"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>'+p.role+'</span></div></div></td>'+
    '<td style="white-space:nowrap">'+teamPhone(p.id)+'</td>'+
    '<td style="white-space:nowrap">'+teamMail(p.name)+'</td>'+
    '<td class="rl-acts"><div class="cat-actwrap"><button class="cat-arch" data-teamrm="'+p.id+'"><i class="fa-solid fa-xmark"></i> Remover</button></div></td></tr>').join('');
  el.innerHTML='<table><thead><tr>'+
    teamTh('ID','id','width:84px')+
    teamTh('Administrador ('+list.length+')','name')+
    teamTh('Celular','phone')+
    teamTh('E-mail','mail')+
    '<th class="rl-acts" style="text-align:center">Ações</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
$('#teamList') && $('#teamList').addEventListener('click', e=>{
  const btn=e.target.closest('.cat-sortbtn'); if(!btn) return;
  const col=btn.dataset.sortcol;
  if(teamSortCol!==col){ teamSortCol=col; teamSortDir=1; }
  else if(teamSortDir===1){ teamSortDir=2; }
  else { teamSortCol=null; teamSortDir=0; }
  teamRender();
});
let teamAddSortCol=null, teamAddSortDir=0; // dir: 0 neutro, 1 asc, 2 desc
const TEAM_UNIT_INFO = {
  'Matriz': { company:'Sua Marca Franquias LTDA', color:'#2e7ed4', ini:'MT' },
  'Pit Stop Barra': { company:'Pit Stop Barra Comércio LTDA', color:'#2aa17e', ini:'PS' }
};
function teamAddCountText(){
  const n=teamAddSel.size;
  return n===0 ? 'Nenhum selecionado' : 'Selecionados: '+n;
}
function teamAddSortIcon(col){
  const dir=(teamAddSortCol===col)?teamAddSortDir:0;
  return dir===1?NV_SORT_ICONS.up:dir===2?NV_SORT_ICONS.down:NV_SORT_ICONS.swap;
}
function teamAddFilteredList(){
  return TEAM_ADMINS.map(id=>PEOPLE.find(p=>p.id===id)).filter(p=>p && !TEAM.includes(p.id))
    .filter(p=>!teamAddQuery || p.name.toLowerCase().includes(teamAddQuery.toLowerCase()))
    .filter(p=>!teamAddUnitQuery || p.unidade===teamAddUnitQuery);
}
function teamAddRender(){
  const el=document.getElementById('teamAddList'); if(!el) return;
  let list=teamAddFilteredList();
  if(teamAddSortDir && teamAddSortCol){
    const dir=teamAddSortDir===1?1:-1;
    if(teamAddSortCol==='name') list=list.slice().sort((a,b)=>dir*a.name.localeCompare(b.name));
    else if(teamAddSortCol==='unit') list=list.slice().sort((a,b)=>dir*(a.unidade||'').localeCompare(b.unidade||''));
  }
  el.innerHTML = list.length ? list.map(p=>{
    const u=TEAM_UNIT_INFO[p.unidade]||{company:'',color:'#8e8e93',ini:(p.unidade||'?').slice(0,2).toUpperCase()};
    return '<div class="tadd-row'+(teamAddSel.has(p.id)?' on':'')+'" data-teamadd="'+p.id+'"><input type="checkbox" class="tadd-chk"'+(teamAddSel.has(p.id)?' checked':'')+'><span class="tadd-person"><span class="avatar '+p.av+'"></span><span class="tadd-info"><b>'+p.name+'</b><span>#'+p.id+' - '+p.role+'</span></span></span><span class="tadd-unit"><span class="tadd-unit-badge" style="background:'+u.color+'">'+u.ini+'</span><span class="tadd-unit-info"><b>'+(p.unidade||'')+'</b><span>'+u.company+'</span></span></span></div>';
  }).join('') : '<div class="perm-empty">Nenhum administrador disponível.</div>';
  const cnt=document.getElementById('teamAddCount'); if(cnt) cnt.textContent=teamAddCountText();
  const hc=document.getElementById('teamAddHeadCount'); if(hc) hc.textContent='('+list.length+')';
  const sb=document.getElementById('teamAddSortBtn'); if(sb) sb.innerHTML=teamAddSortIcon('name');
  const sbu=document.getElementById('teamAddSortBtnUnit'); if(sbu) sbu.innerHTML=teamAddSortIcon('unit');
  const clr=document.getElementById('teamAddSelClear'); if(clr) clr.disabled=teamAddSel.size===0;
}
document.addEventListener('click', e=>{
  if(e.target.closest('#teamAdd')){ teamAddQuery=''; teamAddUnitQuery=''; teamAddSel=new Set(); teamAddSortCol=null; teamAddSortDir=0; const s=document.getElementById('teamAddSearch'); if(s) s.value=''; const ul=document.getElementById('teamAddUnitLbl'); if(ul) ul.textContent='Todas as unidades'; teamAddRender(); document.getElementById('teamAddModal').classList.add('open'); return; }
  if(e.target.closest('#teamAddClose') || e.target.closest('#teamAddCancel') || e.target===document.getElementById('teamAddModal')){ document.getElementById('teamAddModal').classList.remove('open'); return; }
  if(e.target.closest('#teamAddUnitFilter')){ document.getElementById('teamAddUnitModal').classList.add('open'); return; }
  if(e.target.closest('#teamAddUnitModalClose') || e.target===document.getElementById('teamAddUnitModal')){ document.getElementById('teamAddUnitModal').classList.remove('open'); return; }
  if(e.target.closest('#teamAddSelAll')){ teamAddFilteredList().forEach(p=>teamAddSel.add(p.id)); teamAddRender(); return; }
  if(e.target.closest('#teamAddSelClear')){ teamAddSel=new Set(); teamAddRender(); return; }
  const taSortBtn=e.target.closest('#teamAddModal .tadd-sortbtn');
  if(taSortBtn){
    const col=taSortBtn.dataset.sortcol;
    if(teamAddSortCol!==col){ teamAddSortCol=col; teamAddSortDir=1; }
    else if(teamAddSortDir===1){ teamAddSortDir=2; }
    else { teamAddSortCol=null; teamAddSortDir=0; }
    teamAddRender();
    return;
  }
  if(e.target.closest('#teamAddConfirm')){
    if(!teamAddSel.size) return;
    const n=teamAddSel.size;
    teamAddSel.forEach(id=>{ if(!TEAM.includes(id)) TEAM.push(id); });
    teamAddSel=new Set();
    teamRender();
    document.getElementById('teamAddModal').classList.remove('open');
    fgToast(n>1?'Administradores adicionados':'Administrador adicionado');
    return;
  }
  const add=e.target.closest('[data-teamadd]');
  if(add){ const id=+add.dataset.teamadd; if(teamAddSel.has(id)) teamAddSel.delete(id); else teamAddSel.add(id); teamAddRender(); return; }
  const rm=e.target.closest('[data-teamrm]');
  if(rm){ TEAM=TEAM.filter(x=>x!==+rm.dataset.teamrm); teamRender(); fgToast('Administrador removido'); return; }
});
document.addEventListener('input', e=>{
  if(e.target.id==='teamSearch'){ teamQuery=e.target.value; teamRender(); }
  if(e.target.id==='teamAddSearch'){ teamAddQuery=e.target.value; teamAddRender(); }
});
document.getElementById('permTeamHelp') && document.getElementById('permTeamHelp').addEventListener('click', ()=>document.getElementById('permTeamHelpModal').classList.add('open'));
document.getElementById('permTeamHelpClose') && document.getElementById('permTeamHelpClose').addEventListener('click', ()=>document.getElementById('permTeamHelpModal').classList.remove('open'));
document.getElementById('permTeamHelpDoubt') && document.getElementById('permTeamHelpDoubt').addEventListener('click', ()=>document.getElementById('permTeamHelpModal').classList.remove('open'));
document.getElementById('permTeamHelpOk') && document.getElementById('permTeamHelpOk').addEventListener('click', ()=>document.getElementById('permTeamHelpModal').classList.remove('open'));
document.getElementById('permTeamHelpModal') && document.getElementById('permTeamHelpModal').addEventListener('click', e=>{ if(e.target===document.getElementById('permTeamHelpModal')) document.getElementById('permTeamHelpModal').classList.remove('open'); });
function cfgSetActive(id){ ['cfgNavWho','cfgNavApr','cfgNavTeam','nvcfgCats2'].forEach(x=>{ const b=document.getElementById(x); if(b) b.classList.toggle('active', x===id); }); }
const PERM_HELP = {
  who: {
    btn: 'Como usar?',
    art: 'uploads/tutorial/image-post.svg',
    title: 'Como usar quem pode postar?',
    body: 'Defina quem pode postar na sua rede social. Escolha se a matriz e as unidades podem criar publicações e shorts e se a permissão é para todos ou apenas para pessoas e unidades selecionadas.'
  },
  apr: {
    btn: 'Como usar?',
    art: 'uploads/tutorial/image-aprovals.svg',
    title: 'Como usar aprovações?',
    body: 'Ative a aprovação para publicações, shorts e comentários. Assim, cada conteúdo criado fica pendente até a análise de um administrador e só é disponibilizado após sua <b>aprovação</b>. O autor é notificado sobre a decisão e, em caso de <b>reprovação</b>, também recebe o motivo.'
  }
};
function permHelpFill(which){
  const d = PERM_HELP[which] || PERM_HELP.who;
  const b=document.getElementById('permHelpBtnLbl'); if(b) b.textContent = d.btn;
  const art=document.getElementById('permHelpArt'); if(art) art.src = d.art;
  const ti=document.getElementById('permHelpTitle'); if(ti) ti.textContent = d.title;
  const tx=document.getElementById('permHelpText'); if(tx) tx.innerHTML = d.body;
}
document.getElementById('permHelpBtn') && document.getElementById('permHelpBtn').addEventListener('click', ()=>document.getElementById('permHelpModal').classList.add('open'));
document.getElementById('permHelpClose') && document.getElementById('permHelpClose').addEventListener('click', ()=>document.getElementById('permHelpModal').classList.remove('open'));
document.getElementById('permHelpDoubt') && document.getElementById('permHelpDoubt').addEventListener('click', ()=>document.getElementById('permHelpModal').classList.remove('open'));
document.getElementById('permHelpOk') && document.getElementById('permHelpOk').addEventListener('click', ()=>document.getElementById('permHelpModal').classList.remove('open'));
document.getElementById('permHelpModal') && document.getElementById('permHelpModal').addEventListener('click', e=>{ if(e.target===document.getElementById('permHelpModal')) document.getElementById('permHelpModal').classList.remove('open'); });
const PERM_HEAD_ICON = {
  who: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" /></svg>',
  apr: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>'
};
function permHead(which){
  const ic=document.getElementById('permHeadIc'), t=document.getElementById('permHeadTtl');
  if(!ic||!t) return;
  const scr=document.getElementById('nvPermScreen'); if(scr) scr.dataset.permview = which||'who';
  permHelpFill(which||'who');
  const apr = which==='apr';
  ic.innerHTML = apr ? PERM_HEAD_ICON.apr : PERM_HEAD_ICON.who;
  t.textContent = apr ? 'Aprovações' : 'Quem pode postar';
}
function permStoriesSecShow(on){ const s=document.getElementById('permStoriesSec'); if(s) s.style.display = on ? '' : 'none'; if(on && typeof stPermFeet==='function') stPermFeet(); }
function cfgGo(which){
  if(which==='team'){ newsShow('team'); cfgSetActive('cfgNavTeam'); newsView.classList.add('catmode'); newsView.classList.add('cfg'); newsView.classList.remove('apr'); newsView.classList.remove('aprhome'); if($('#nmtCfg'))$('#nmtCfg').classList.add('active'); return; }
  permHead(which); permStoriesSecShow(which==='who'||!which);
  if(which==='cats'){ newsShow('cats'); cfgSetActive('nvcfgCats2'); }
  else { newsShow('perm'); const s1=$('#permPubSec'), ac=$('#permApprGrid'); if(which==='apr'){ if(s1)s1.style.display='none'; permStoriesSecShow(false); if(ac)ac.style.display='grid'; cfgSetActive('cfgNavApr'); } else { if(s1)s1.style.display=''; permStoriesSecShow(true); if(ac)ac.style.display='none'; cfgSetActive('cfgNavWho'); } }
  newsView.classList.add('catmode'); newsView.classList.add('cfg'); newsView.classList.remove('apr'); newsView.classList.remove('aprhome'); if($('#nmtCfg'))$('#nmtCfg').classList.add('active');
}
$('#cfgNavWho') && $('#cfgNavWho').addEventListener('click', ()=>cfgGo('who'));
$('#cfgNavApr') && $('#cfgNavApr').addEventListener('click', ()=>cfgGo('apr'));
$('#cfgNavTeam') && $('#cfgNavTeam').addEventListener('click', ()=>cfgGo('team'));
$('#nvcfgCats2') && $('#nvcfgCats2').addEventListener('click', ()=>cfgGo('cats'));
$('#nmtMgShorts') && $('#nmtMgShorts').addEventListener('click', ()=>newsShow('cfgstories'));
$('#nmtApr') && $('#nmtApr').addEventListener('click', ()=>{ newsView.classList.add('open'); pubFilter='pend'; newsShow('pubappr'); });
$('#nvaprCom') && $('#nvaprCom').addEventListener('click', ()=>newsShow('mod'));
$('#nvaprPub') && $('#nvaprPub').addEventListener('click', ()=>newsShow('pubappr'));
$('#nvcfgCats') && $('#nvcfgCats').addEventListener('click', ()=>newsShow('cats'));
$('#nvcfgPerm') && $('#nvcfgPerm').addEventListener('click', ()=>permShow('who'));
$('#nvcfgPermPub') && $('#nvcfgPermPub').addEventListener('click', ()=>permShow('who'));
function permShow(which){ permStoriesSecShow(which!=='apr'); newsShow('perm'); const s1=$('#permPubSec'), ac=$('#permApprGrid'); if(s1&&ac){ if(which==='apr'){ s1.style.display='none'; permStoriesSecShow(false); ac.style.display=''; } else { s1.style.display=''; permStoriesSecShow(true); ac.style.display='none'; } } $$('#nvCfgSide .nv-cfgitem').forEach(x=>x.classList.remove('active')); const b=which==='apr'?$('#nvcfgPubApr'):$('#nvcfgPubWho'); if(b) b.classList.add('active'); }
$('#nvcfgPubWho') && $('#nvcfgPubWho').addEventListener('click', ()=>permShow('who'));
$('#nvcfgPubApr') && $('#nvcfgPubApr').addEventListener('click', ()=>permShow('apr'));
$('#nvcfgPermCom') && $('#nvcfgPermCom').addEventListener('click', ()=>newsShow('params'));
$('#nvcfgParams') && $('#nvcfgParams').addEventListener('click', ()=>newsShow('params'));
$('#nvcfgMod') && $('#nvcfgMod').addEventListener('click', ()=>newsShow('mod'));
let MOD_QUEUE = [], modSeq = 0, MOD_HIST = [], modFilter = "pend";
let PUB_APPR = [], pubApprSeq = 0, PUB_HIST = [], pubFilter = "pend";
function aprBadges(){
  const c=MOD_QUEUE.length, p=PUB_APPR.length;
  const cA=(typeof MOD_HIST!=='undefined')?MOD_HIST.filter(e=>e.status==='aprovado').length:0;
  const cR=(typeof MOD_HIST!=='undefined')?MOD_HIST.filter(e=>e.status==='rejeitado').length:0;
  const pA=(typeof PUB_HIST!=='undefined')?PUB_HIST.filter(n=>n.apprStatus==='aprovado').length:0;
  const pR=(typeof PUB_HIST!=='undefined')?PUB_HIST.filter(n=>n.apprStatus==='rejeitado').length:0;
  if(typeof reelApprData==='function') reelApprData();
  const rq=(typeof REEL_APPR!=='undefined'&&REEL_APPR)?REEL_APPR.length:0;
  [['#aprComBadge',c],['#aprPubBadge',p],['#aprReelBadge',rq],['#aprTabBadge',c+p]].forEach(([sel,n])=>{ const b=$(sel); if(b){ b.hidden=!n; b.textContent=n; } });
}
function aprDT(d){ d=d||new Date(); const p=n=>('0'+n).slice(-2); return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+String(d.getFullYear()).slice(-2)+' '+p(d.getHours())+':'+p(d.getMinutes()); }
function modBadge(){ aprBadges(); }
function modAdd(entry){ entry.mid=++modSeq; MOD_QUEUE.push(entry); modBadge(); if($('#nvModScreen').classList.contains('active')) renderModQueue(); }
function modRemove(mid,status){ const e=MOD_QUEUE.find(x=>x.mid===mid); if(e&&status){ e.status=status; e.decidedBy='Rodrigo Caetano'; e.decidedAt=aprDT(); MOD_HIST.unshift(e); } MOD_QUEUE=MOD_QUEUE.filter(e=>e.mid!==mid); modBadge(); if($('#nvModScreen').classList.contains('active')) renderModQueue(); }
/* <colgroup> por variante de tabela — larguras exatas do Figma (ver comentário em
   07-rede-social.css). col-principal fica sem width de propósito: em table-layout:fixed
   ela absorve o espaço que sobra das colunas fixas. */
const COLG_PUB_PEND='<colgroup><col class="col-principal"><col class="col-tipo"><col class="col-autor"><col class="col-data"><col class="col-acoes"></colgroup>';
const COLG_PUB_APR='<colgroup><col class="col-principal"><col class="col-tipo"><col class="col-autor"><col class="col-data"><col class="col-aprovador"></colgroup>';
const COLG_PUB_REJ='<colgroup><col class="col-principal"><col class="col-tipo"><col class="col-autor"><col class="col-data"><col class="col-aprovador"><col class="col-motivo"></colgroup>';
const COLG_COM_PEND='<colgroup><col class="col-principal"><col class="col-autor"><col class="col-publicacao"><col class="col-data"><col class="col-acoes"></colgroup>';
const COLG_COM_APR='<colgroup><col class="col-principal"><col class="col-autor"><col class="col-publicacao"><col class="col-data"><col class="col-aprovador"><col class="col-decidido-em"></colgroup>';
const COLG_COM_REJ='<colgroup><col class="col-principal"><col class="col-autor"><col class="col-data"><col class="col-aprovador"><col class="col-decidido-em"><col class="col-motivo"></colgroup>';
let modSortIdx=null, modSortDir=1;
function modCellVal(e,i){
  if(modFilter==='pend'){ var mp=[ (e.text||'').toLowerCase(), (e.author||'').toLowerCase(), (e.post||'').toLowerCase(), (e.dt||e.time||'') ]; return mp[i]!==undefined?mp[i]:''; }
  var m=[ (e.text||'').toLowerCase(), (e.author||'').toLowerCase(), (e.post||'').toLowerCase(), (e.dt||e.time||''), (e.decidedBy||'').toLowerCase(), (e.decidedAt||'') ]; return m[i]!==undefined?m[i]:'';
}
function renderModQueue(){
  const el=$('#modQueue');
  const nPend=MOD_QUEUE.length, nApr=MOD_HIST.filter(e=>e.status==='aprovado').length, nRej=MOD_HIST.filter(e=>e.status==='rejeitado').length;
  if($('#modNPend')){ $('#modNPend').textContent=nPend; $('#modNApr').textContent=nApr; $('#modNRej').textContent=nRej; }
  $$('#modSeg button').forEach(b=>b.classList.toggle('on', b.dataset.f===modFilter));
  let list = modFilter==='pend' ? MOD_QUEUE : MOD_HIST.filter(e=>e.status===modFilter);
  const tot=list.length; $('#modCount').textContent = tot? tot+(tot===1?' item':' itens'):'';
  if(!list.length){
    el.innerHTML = modFilter==='pend'
      ? aprEmptyHTML('Nenhum comentário pendente','Todos os comentários já foram revisados. Novos itens aparecerão aqui assim que forem enviados para aprovação.')
      : modFilter==='aprovado'
      ? aprEmptyHTML('Nenhum comentário aprovado ainda','Comentários aprovados vão aparecer aqui.')
      : aprEmptyHTML('Nenhum comentário rejeitado','Comentários rejeitados vão aparecer aqui.');
    return;
  }
  const unitOf = e => e.unit || (typeof STORES!=='undefined' ? STORES[(e.mid||1)%STORES.length].name : '');
  const thumbM = e => { const n=(typeof findNewsByTitle==='function'? (findNewsByTitle(e.post)||{}) : {}); return n.image? '<span class="cmappr-thumb" style="width:44px;height:36px;background-image:url('+n.image+')"></span>' : '<span class="cmappr-thumb ph" style="width:44px;height:36px"><i class="fa-solid fa-'+(n.article?'newspaper':'align-left')+'"></i></span>'; };
  const base = e => '<td class="apr-cmt">'+e.text.replace(/</g,'&lt;')+'</td><td><div class="apr-person"><span class="avatar '+(e.av||'av-rc')+'"></span><div><b>'+e.author+'</b><span class="apr-unit">'+unitOf(e)+'</span></div></div></td><td><div class="pubttl">'+thumbM(e)+'<div><b'+(e.newsId?' class="apr-post" data-nav="'+e.newsId+'"':'')+'>'+e.post+'</b></div></div></td><td class="apr-when">'+(e.dt||e.time||'agora')+'</td>';
  const baseP = e => '<td class="apr-cmt">'+e.text.replace(/</g,'&lt;')+'</td><td><div class="apr-person"><span class="avatar '+(e.av||'av-rc')+'"></span><div><b>'+e.author+'</b><span class="apr-unit">'+unitOf(e)+'</span></div></div></td><td><div class="pubttl">'+thumbM(e)+'<div><b'+(e.newsId?' class="apr-post" data-nav="'+e.newsId+'"':'')+'>'+e.post+'</b></div></div></td><td class="apr-when">'+(e.dt||e.time||'agora')+'</td>';
  if(modSortIdx!=null){ list=list.slice().sort(function(a,b){ var ka=modCellVal(a,modSortIdx), kb=modCellVal(b,modSortIdx); return ka<kb?-modSortDir:ka>kb?modSortDir:0; }); }
  let head, rows, tblClass='modtbl', colg=COLG_COM_PEND;
  if(modFilter==='pend'){
    tblClass='modtbl modtbl-pend'; colg=COLG_COM_PEND;
    head='<th>Comentário</th><th>Autor</th><th>Publicação</th><th>Data/Hora</th><th style="text-align:right">Ações</th>';
    rows=list.map(e=>'<tr data-mid="'+e.mid+'">'+baseP(e)+'<td class="rl-acts"><button class="apr-view" data-view="'+(e.newsId||'')+'"><i class="fa-solid fa-eye"></i> Visualizar</button></td></tr>').join('');
  } else if(modFilter==='aprovado'){
    tblClass='modtbl modtbl-apr'; colg=COLG_COM_APR;
    head='<th>Comentário</th><th>Autor</th><th>Publicação</th><th>Data/Hora</th><th>Aprovado por</th><th>Aprovado em</th>';
    rows=list.map(e=>'<tr>'+base(e)+'<td class="apr-when"><div class="apr-person"><span class="avatar av-rc"></span>'+(e.decidedBy||',')+'</div></td><td class="apr-when">'+(e.decidedAt||',')+'</td></tr>').join('');
  } else {
    tblClass='modtbl modtbl-rej'; colg=COLG_COM_REJ;
    head='<th>Comentário</th><th>Autor</th><th>Data/Hora</th><th>Rejeitado por</th><th>Rejeitado em</th><th>Justificativa</th>';
    rows=list.map(e=>'<tr data-mid="'+e.mid+'"><td class="apr-cmt">'+e.text.replace(/</g,'&lt;')+'</td><td><div class="apr-person"><span class="avatar '+(e.av||'av-rc')+'"></span><div><b>'+e.author+'</b><span class="apr-unit">'+unitOf(e)+'</span></div></div></td><td class="apr-when">'+(e.dt||e.time||',')+'</td><td class="apr-when"><div class="apr-person"><span class="avatar av-rc"></span>'+(e.decidedBy||',')+'</div></td><td class="apr-when">'+(e.decidedAt||',')+'</td><td class="apr-cmt">'+(e.motivo?e.motivo.replace(/</g,'&lt;'):',')+'</td></tr>').join('');
  }
  el.innerHTML = '<div class="rlist"><table class="'+tblClass+'">'+colg+'<thead><tr>'+head+'</tr></thead><tbody>'+rows+'</tbody></table></div>';
  var ths=el.querySelectorAll('thead th');
  ths.forEach(function(th,i){ if(!th.textContent.trim()) return; th.classList.add('sortable'); if(modSortIdx===i) th.classList.add('active-sort'); th.innerHTML=th.innerHTML+' <span class="sort-ic"><i class="fa-solid fa-'+(modSortIdx===i?(modSortDir===1?'arrow-up-short-wide':'arrow-down-wide-short'):'sort')+'"></i></span>'; th.addEventListener('click', function(){ if(modSortIdx===i) modSortDir=-modSortDir; else { modSortIdx=i; modSortDir=1; } renderModQueue(); }); });
}
$('#modQueue') && $('#modQueue').addEventListener('click', e=>{ const vw=e.target.closest('[data-view]'); if(vw){ const rr=vw.closest('[data-mid]'); const en=rr?MOD_QUEUE.concat(MOD_HIST).find(x=>x.mid===+rr.dataset.mid):null; if(en){ openCmAppr(en); return; } if(vw.dataset.view) focusPublication(+vw.dataset.view); return; } const rowc=e.target.closest('tbody tr[data-mid]'); if(rowc && !e.target.closest('[data-act]')){ const ent=MOD_QUEUE.concat(MOD_HIST).find(x=>x.mid===+rowc.dataset.mid); if(ent){ openCmAppr(ent); return; } } const nav=e.target.closest('[data-nav]'); if(nav){ focusPublication(+nav.dataset.nav); return; } const b=e.target.closest('[data-act]'); if(!b) return; const mid=+b.closest('[data-mid]').dataset.mid; const entry=MOD_QUEUE.find(x=>x.mid===mid); if(!entry) return; if(b.dataset.act==='ok'){ entry.approve(); modRemove(mid,'aprovado'); } else { askReject(function(motivo){ entry.motivo=motivo; entry.reject(); modRemove(mid,'rejeitado'); fgToast('Comentário recusado'); }); } });
let rejCb=null;
function askReject(cb){ if(window.__skipReject){ cb(''); return; } return askRejectDlg(cb); }
function askRejectDlg(cb){ rejCb=cb; $('#rejText').value=''; $('#rejConfirm').disabled=false; $('#rejModal').classList.add('open'); setTimeout(()=>$('#rejText').focus(),30); }
function rejCloseM(){ $('#rejModal').classList.remove('open'); rejCb=null; }
$('#rejClose') && $('#rejClose').addEventListener('click', rejCloseM);
$('#rejCancel') && $('#rejCancel').addEventListener('click', rejCloseM);
$('#rejModal') && $('#rejModal').addEventListener('click', e=>{ if(e.target===$('#rejModal')) rejCloseM(); });
$('#rejConfirm') && $('#rejConfirm').addEventListener('click', ()=>{ const t=$('#rejText').value.trim(); if(!t){ $('#rejText').focus(); fgToast('Informe o motivo da recusa'); return; } const cb=rejCb; rejCloseM(); if(cb) cb(t); });
function focusPublication(newsId){
  const n=NEWS.find(x=>x.id===newsId); if(!n){ fgToast('Publicação não encontrada'); return; }
  openArticle(n);
  setTimeout(()=>{
    const list=$('#npCmList'); if(!list) return;
    MOD_QUEUE.filter(e=>e.newsId===newsId).forEach(e=>{
      if(list.querySelector('[data-mid="'+e.mid+'"]')) return;
      const it=document.createElement('div'); it.className='nvf-cm-item pending'; it.dataset.mid=e.mid;
      it.innerHTML='<span class="avatar '+(e.av||'av-rc')+'"></span><div><div class="nvf-cm-bub"><b>'+e.author+'</b><span>'+e.text.replace(/</g,'&lt;')+'</span></div><div class="comment-modbar"><span class="comment-pend"><i class="fa-solid fa-clock"></i> Aguardando aprovação</span><div class="comment-mod"><button class="cmod-no"><i class="fa-solid fa-xmark"></i> Recusar</button><button class="cmod-ok"><i class="fa-solid fa-check"></i> Aprovar</button></div></div></div>';
      list.insertBefore(it, list.firstChild);
      it.querySelector('.cmod-ok').addEventListener('click',()=>{ it.classList.remove('pending'); const pe=it.querySelector('.comment-pend'); if(pe)pe.remove(); const me=it.querySelector('.comment-mod'); if(me)me.remove(); (n.cmts=n.cmts||[]).push({author:e.author,av:e.av,text:e.text}); modRemove(e.mid); fgToast('Comentário aprovado'); });
      it.querySelector('.cmod-no').addEventListener('click',()=>{ askReject(function(motivo){ e.motivo=motivo; it.remove(); modRemove(e.mid); fgToast('Comentário recusado'); }); });
    });
  }, 90);
}
/* apr-sub click */
$$('#nvAprSide .apr-sub').forEach(b=> b.addEventListener('click', ()=>{
  const scope=b.dataset.scope;
  if(scope==='com') newsShow('mod');
  else if(scope==='reel') newsShow('reelappr');
  else newsShow('pubappr');
  $$('#nvAprSide .apr-sub').forEach(x=>x.classList.toggle('active', x===b));
}));
function aprSideSync(scope){ $$('#nvAprSide .apr-sub').forEach(x=>x.classList.toggle('active', x.dataset.scope===scope)); }
$('#modSeg') && $('#modSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;modFilter=b.dataset.f;renderModQueue();});
$('#reelSeg') && $('#reelSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;reelFilter=b.dataset.f;renderReelAppr();});
$('#pubSeg') && $('#pubSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;pubFilter=b.dataset.f;renderPubAppr();});
function pubApprAdd(n){ n.paid=++pubApprSeq; PUB_APPR.push(n); aprBadges(); if($('#nvPubApprScreen').classList.contains('active')) renderPubAppr(); }
let pubSortIdx=null, pubSortDir=1;
/* Colunas 0-2 (Publicação/Tipo/Autor) são iguais nas 3 abas; 3+ variam por aba, então
   pubCellVal olha pubFilter pra saber o que cada posição significa em cada uma. */
function pubCellVal(n,i){
  if(i===0) return (n.title||'').toLowerCase();
  if(i===1) return n.article?'artigo':'post';
  if(i===2) return (n.author||'').toLowerCase();
  if(i===3) return n.ts||0;
  if(pubFilter==='aprovado'){
    if(i===4) return (n.decidedBy||'').toLowerCase();
  } else if(pubFilter==='rejeitado'){
    if(i===4) return (n.decidedBy||'').toLowerCase();
    if(i===5) return (n.motivo||'').toLowerCase();
  }
  return '';
}
let reelFilter='pend', REEL_APPR=null, REEL_HIST=null;
function reelApprData(){
  if(REEL_APPR) return;
  const src=(typeof REELS_DATA!=='undefined'?REELS_DATA:[]);
  const mk=(r,i)=>{ const p=(typeof POSTS!=='undefined'?POSTS[r.p]:{})||{}; return {rid:i, title:p.title||p.alt||'Short', author:p.name||'SULTS', av:p.av||'av-rc', image:p.img||p.poster||'', unit:p.company||p.store||p.label||'SULTS', date:p.time||'agora', ts:Date.now()-(i+1)*1800000, cat:r.cat, desc:r.cap||p.caption||''}; };
  const all=src.map(mk);
  REEL_APPR=all.slice(0,4);
  if(REEL_APPR[1]) REEL_APPR[1].proc=true;
  if(REEL_APPR[3]) REEL_APPR[3].procFail=true;
  REEL_HIST=all.slice(4,10).map((x,i)=>Object.assign({}, x, {apprStatus: i%2?'rejeitado':'aprovado', decidedBy:'Rodrigo Caetano', decidedAt:x.date, motivo: i%2?'Conteúdo fora das diretrizes da marca.':''}));
}
/* Formata um timestamp em "dd/mm/aaaa hh:mm" — usado na coluna "Entrou na fila em" das duas
   filas de aprovação (Publicações e Shorts), junto com o texto relativo ("há 1 h") que já
   existia. */
function paFullDT(ts){ const d=new Date(ts||Date.now()), p=x=>('0'+x).slice(-2); return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear()+' '+p(d.getHours())+':'+p(d.getMinutes()); }
/* Filtro "Entrou na fila em" (Últimas 24h/7d/30d/90d) — mesmo formato de pglInPeriod
   (21-gerenciar-publicacoes.js), reaproveitado pelas duas filas de aprovação. */
function aprInPeriod(ts, period){
  if(!period || period==='tudo') return true;
  const days = period==='24h'?1:period==='7d'?7:period==='30d'?30:period==='90d'?90:null;
  if(days==null) return true;
  const diff=(Date.now()-(ts||0))/86400000;
  return diff>=0 && diff<=days;
}
/* Timestamp de decidedAt (formato aprDT "dd/mm/aa hh:mm") pro filtro de período da
   aprovação/reprovação — mesma ideia de pglDateOf (21-gerenciar-publicacoes.js), sem precisar
   guardar um campo numérico à parte em cada ponto que aprova/reprova. */
function aprDecidedTs(n){
  const m=/^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})$/.exec(n.decidedAt||'');
  return m ? new Date(2000+ +m[3], +m[2]-1, +m[1], +m[4], +m[5]).getTime() : 0;
}

/* Filtro avançado da fila "Publicações pendentes" (#pubApprFilters) — Título, Tipo, Autor e
   "Entrou na fila em". Mesmo padrão de campos de foBuildGerenciarPublicacoesFilters
   (21-gerenciar-publicacoes.js), só que aplicado a PUB_APPR/PUB_HIST em vez de NEWS, e com IDs
   próprios (paF...) para não colidir com os campos (pubF...) daquela outra tela. */
let paQuery='', paType='', paAuthor='', paQueuePeriod='tudo', paDecidedBy='', paDecidedPeriod='tudo';
function paActiveFilterCount(){
  let c=0; if(paQuery) c++; if(paType) c++; if(paAuthor) c++;
  if(paQueuePeriod && paQueuePeriod!=='tudo') c++;
  if(pubFilter!=='pend'){ if(paDecidedBy) c++; if(paDecidedPeriod && paDecidedPeriod!=='tudo') c++; }
  return c;
}
function paMatch(n){
  if(paType==='post' && n.article) return false;
  if(paType==='article' && !n.article) return false;
  if(paAuthor && (n.author||'')!==paAuthor) return false;
  if(!aprInPeriod(n.ts, paQueuePeriod)) return false;
  if(pubFilter!=='pend'){
    if(paDecidedBy && (n.decidedBy||'')!==paDecidedBy) return false;
    if(!aprInPeriod(aprDecidedTs(n), paDecidedPeriod)) return false;
  }
  if(paQuery && (n.title||'').toLowerCase().indexOf(paQuery)===-1) return false;
  return true;
}
function foBuildPubApprFilters(){
  const nav=$('#pubApprFilters'); if(!nav) return;
  const typeItems=[{value:'',label:'Todos',selected:paType===''},{value:'post',label:'Postagem',selected:paType==='post'},{value:'article',label:'Artigo',selected:paType==='article'}];
  const typeLabel=(typeItems.filter(i=>i.selected)[0]||typeItems[0]).label;
  const authors=Array.from(new Set(PUB_APPR.concat(PUB_HIST).map(n=>n.author).filter(Boolean)));
  const authorItems=[{value:'',label:'Todos',selected:!paAuthor}].concat(authors.map(a=>({value:a,label:a,selected:paAuthor===a})));
  const authorLabel=paAuthor||'Todos';
  let html='<div class="nv-fsec"><div class="nv-fsec-hd">Publicação <i class="fa-solid fa-chevron-up"></i></div>'+
    '<div class="nv-ffcol" style="margin-bottom:12px"><label>Título</label><div class="nv-ffield"><input type="text" id="paFTitulo" placeholder="Pesquisar publicação..." value="'+(paQuery||'')+'" autocomplete="off"></div></div>'+
    '<div class="nv-ffrow nv-ffrow-last">'+
      '<div class="nv-ffcol"><label>Tipo</label>'+rxDDWrap('paFTipo', typeLabel, typeItems)+'</div>'+
      '<div class="nv-ffcol"><label>Autor</label>'+rxDDWrap('paFAutor', authorLabel, authorItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div>'+
    '</div></div>';
  const periodDefs=[['tudo','Qualquer período'],['24h','Últimas 24 h'],['7d','Últimos 7 dias'],['30d','Últimos 30 dias'],['90d','Últimos 90 dias']];
  const periodItems=periodDefs.map(p=>({value:p[0],label:p[1],selected:paQueuePeriod===p[0]}));
  const periodLabel=(periodDefs.filter(p=>p[0]===paQueuePeriod)[0]||periodDefs[0])[1];
  html+='<div class="nv-fsec"><div class="nv-fsec-hd">Entrou na fila em <i class="fa-solid fa-chevron-up"></i></div><div class="nv-ffcol"><label>Selecione um período</label>'+rxDDWrap('paFQueuePeriod', periodLabel, periodItems)+'</div></div>';
  if(pubFilter!=='pend'){
    const decLabel=pubFilter==='aprovado'?'Aprovação':'Reprovação';
    const decByLabel=pubFilter==='aprovado'?'Aprovado por':'Reprovado por';
    const decByOpts=Array.from(new Set(PUB_HIST.map(n=>n.decidedBy).filter(Boolean)));
    const decByItems=[{value:'',label:'Todos',selected:!paDecidedBy}].concat(decByOpts.map(a=>({value:a,label:a,selected:paDecidedBy===a})));
    const decByItemLabel=paDecidedBy||'Todos';
    const decPeriodItems=periodDefs.map(p=>({value:p[0],label:p[1],selected:paDecidedPeriod===p[0]}));
    const decPeriodLabel=(periodDefs.filter(p=>p[0]===paDecidedPeriod)[0]||periodDefs[0])[1];
    html+='<div class="nv-fsec"><div class="nv-fsec-hd">'+decLabel+' <i class="fa-solid fa-chevron-up"></i></div>'+
      '<div class="nv-ffcol" style="margin-bottom:12px"><label>'+decByLabel+'</label>'+rxDDWrap('paFDecidido', decByItemLabel, decByItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div>'+
      '<div class="nv-ffcol"><label>Selecione um período</label>'+rxDDWrap('paFDecididoPeriod', decPeriodLabel, decPeriodItems)+'</div></div>';
  }
  const activeN=paActiveFilterCount();
  html+='<div class="nv-filters-ft"><button class="nv-fclear'+(activeN>0?' has-active':'')+'" id="paFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros'+(activeN>0?' ('+activeN+')':'')+'</button><button class="nv-fapply" id="paFApply">Aplicar filtros <i class="fa-solid fa-chevron-right"></i></button></div>';
  nav.innerHTML=html;
}
$('#pubApprFilters') && $('#pubApprFilters').addEventListener('click', function(e){
  if(e.target.closest('#paFClear')){ paQuery=''; paType=''; paAuthor=''; paQueuePeriod='tudo'; paDecidedBy=''; paDecidedPeriod='tudo'; renderPubAppr(); return; }
  if(e.target.closest('#paFApply')){ renderPubAppr(); fgToast('Filtros aplicados'); return; }
  const db=e.target.closest('.nv-fdatebtn');
  if(db){ const inp=$('#'+db.dataset.datefor); if(inp){ if(inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem=e.target.closest('.rl-dditem');
  if(ddItem){
    const wrap=ddItem.closest('.rl-ddwrap'); const id=wrap.dataset.dd; const v=ddItem.dataset.value;
    if(id==='paFTipo'){ paType=v; } else if(id==='paFAutor'){ paAuthor=v; } else if(id==='paFQueuePeriod'){ paQueuePeriod=v; }
    else if(id==='paFDecidido'){ paDecidedBy=v; } else if(id==='paFDecididoPeriod'){ paDecidedPeriod=v; }
    renderPubAppr();
    return;
  }
  const ddBtn=e.target.closest('.rl-ddwrap > button.nv-ffield');
  if(ddBtn){
    const wrap=ddBtn.closest('.rl-ddwrap'); const menu=wrap.querySelector('.rl-ddmenu');
    const willOpen=menu.hidden;
    $$('#pubApprFilters .rl-ddmenu').forEach(m=>m.hidden=true);
    menu.hidden=!willOpen;
    return;
  }
});
$('#pubApprFilters') && $('#pubApprFilters').addEventListener('input', function(e){ if(e.target.id==='paFTitulo'){ paQuery=e.target.value.trim().toLowerCase(); renderPubAppr(); } });

/* Filtro avançado da fila "Shorts pendentes" (#reelApprFilters) — mesma ideia da de Publicações
   acima, só sem o campo Tipo (todo item aqui já é um short) e com IDs próprios (raF...). */
let raQuery='', raAuthor='', raQueuePeriod='tudo', raDecidedBy='', raDecidedPeriod='tudo';
function raActiveFilterCount(){
  let c=0; if(raQuery) c++; if(raAuthor) c++; if(raQueuePeriod && raQueuePeriod!=='tudo') c++;
  if(reelFilter!=='pend'){ if(raDecidedBy) c++; if(raDecidedPeriod && raDecidedPeriod!=='tudo') c++; }
  return c;
}
function raMatch(r){
  if(raAuthor && (r.author||'')!==raAuthor) return false;
  if(!aprInPeriod(r.ts, raQueuePeriod)) return false;
  if(reelFilter!=='pend'){
    if(raDecidedBy && (r.decidedBy||'')!==raDecidedBy) return false;
    if(!aprInPeriod(aprDecidedTs(r), raDecidedPeriod)) return false;
  }
  if(raQuery && (r.title||'').toLowerCase().indexOf(raQuery)===-1) return false;
  return true;
}
function foBuildReelApprFilters(){
  const nav=$('#reelApprFilters'); if(!nav) return;
  const authors=Array.from(new Set((REEL_APPR||[]).concat(REEL_HIST||[]).map(r=>r.author).filter(Boolean)));
  const authorItems=[{value:'',label:'Todos',selected:!raAuthor}].concat(authors.map(a=>({value:a,label:a,selected:raAuthor===a})));
  const authorLabel=raAuthor||'Todos';
  let html='<div class="nv-fsec"><div class="nv-fsec-hd">Short <i class="fa-solid fa-chevron-up"></i></div>'+
    '<div class="nv-ffcol" style="margin-bottom:12px"><label>Título</label><div class="nv-ffield"><input type="text" id="raFTitulo" placeholder="Pesquisar short..." value="'+(raQuery||'')+'" autocomplete="off"></div></div>'+
    '<div class="nv-ffcol nv-ffrow-last"><label>Autor</label>'+rxDDWrap('raFAutor', authorLabel, authorItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div></div>';
  const periodDefs=[['tudo','Qualquer período'],['24h','Últimas 24 h'],['7d','Últimos 7 dias'],['30d','Últimos 30 dias'],['90d','Últimos 90 dias']];
  const periodItems=periodDefs.map(p=>({value:p[0],label:p[1],selected:raQueuePeriod===p[0]}));
  const periodLabel=(periodDefs.filter(p=>p[0]===raQueuePeriod)[0]||periodDefs[0])[1];
  html+='<div class="nv-fsec"><div class="nv-fsec-hd">Entrou na fila em <i class="fa-solid fa-chevron-up"></i></div><div class="nv-ffcol"><label>Selecione um período</label>'+rxDDWrap('raFQueuePeriod', periodLabel, periodItems)+'</div></div>';
  if(reelFilter!=='pend'){
    const decLabel=reelFilter==='aprovado'?'Aprovação':'Reprovação';
    const decByLabel=reelFilter==='aprovado'?'Aprovado por':'Reprovado por';
    const decByOpts=Array.from(new Set((REEL_HIST||[]).map(r=>r.decidedBy).filter(Boolean)));
    const decByItems=[{value:'',label:'Todos',selected:!raDecidedBy}].concat(decByOpts.map(a=>({value:a,label:a,selected:raDecidedBy===a})));
    const decByItemLabel=raDecidedBy||'Todos';
    const decPeriodItems=periodDefs.map(p=>({value:p[0],label:p[1],selected:raDecidedPeriod===p[0]}));
    const decPeriodLabel=(periodDefs.filter(p=>p[0]===raDecidedPeriod)[0]||periodDefs[0])[1];
    html+='<div class="nv-fsec"><div class="nv-fsec-hd">'+decLabel+' <i class="fa-solid fa-chevron-up"></i></div>'+
      '<div class="nv-ffcol" style="margin-bottom:12px"><label>'+decByLabel+'</label>'+rxDDWrap('raFDecidido', decByItemLabel, decByItems, 'fa-earth-americas', 'fa-magnifying-glass')+'</div>'+
      '<div class="nv-ffcol"><label>Selecione um período</label>'+rxDDWrap('raFDecididoPeriod', decPeriodLabel, decPeriodItems)+'</div></div>';
  }
  const activeN=raActiveFilterCount();
  html+='<div class="nv-filters-ft"><button class="nv-fclear'+(activeN>0?' has-active':'')+'" id="raFClear"><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros'+(activeN>0?' ('+activeN+')':'')+'</button><button class="nv-fapply" id="raFApply">Aplicar filtros <i class="fa-solid fa-chevron-right"></i></button></div>';
  nav.innerHTML=html;
}
$('#reelApprFilters') && $('#reelApprFilters').addEventListener('click', function(e){
  if(e.target.closest('#raFClear')){ raQuery=''; raAuthor=''; raQueuePeriod='tudo'; raDecidedBy=''; raDecidedPeriod='tudo'; renderReelAppr(); return; }
  if(e.target.closest('#raFApply')){ renderReelAppr(); fgToast('Filtros aplicados'); return; }
  const db=e.target.closest('.nv-fdatebtn');
  if(db){ const inp=$('#'+db.dataset.datefor); if(inp){ if(inp.showPicker) inp.showPicker(); else inp.focus(); } return; }
  const ddItem=e.target.closest('.rl-dditem');
  if(ddItem){
    const wrap=ddItem.closest('.rl-ddwrap'); const id=wrap.dataset.dd; const v=ddItem.dataset.value;
    if(id==='raFAutor'){ raAuthor=v; } else if(id==='raFQueuePeriod'){ raQueuePeriod=v; }
    else if(id==='raFDecidido'){ raDecidedBy=v; } else if(id==='raFDecididoPeriod'){ raDecidedPeriod=v; }
    renderReelAppr();
    return;
  }
  const ddBtn=e.target.closest('.rl-ddwrap > button.nv-ffield');
  if(ddBtn){
    const wrap=ddBtn.closest('.rl-ddwrap'); const menu=wrap.querySelector('.rl-ddmenu');
    const willOpen=menu.hidden;
    $$('#reelApprFilters .rl-ddmenu').forEach(m=>m.hidden=true);
    menu.hidden=!willOpen;
    return;
  }
});
$('#reelApprFilters') && $('#reelApprFilters').addEventListener('input', function(e){ if(e.target.id==='raFTitulo'){ raQuery=e.target.value.trim().toLowerCase(); renderReelAppr(); } });
document.addEventListener('click', function(e){
  if(!e.target.closest('#pubApprFilters .rl-ddwrap')) $$('#pubApprFilters .rl-ddmenu').forEach(m=>m.hidden=true);
  if(!e.target.closest('#reelApprFilters .rl-ddwrap')) $$('#reelApprFilters .rl-ddmenu').forEach(m=>m.hidden=true);
  if(!e.target.closest('#pubApprQueue .rl-actwrap')){ $$('#pubApprQueue .rl-actmenu').forEach(m=>m.hidden=true); $$('#pubApprQueue td.rl-actz').forEach(td=>td.classList.remove('rl-actz')); }
  if(!e.target.closest('#reelApprQueue .rl-actwrap')){ $$('#reelApprQueue .rl-actmenu').forEach(m=>m.hidden=true); $$('#reelApprQueue td.rl-actz').forEach(td=>td.classList.remove('rl-actz')); }
});
/* Menu "Ações" (Abrir em nova guia / Aprovar / Reprovar) das duas filas pendentes — mesmo
   desenho e mesmos data-pact de #pubGrid (18-gerenciar-publicacoes.css/21-gerenciar-
   publicacoes.js), só que aprovar/reprovar aqui de fato tira o item da fila em vez de editar. */
/* Célula "Aprovado por"/"Reprovado por" das filas de Publicações e Shorts — nome de quem
   decidiu com a data logo abaixo, mesmo padrão (rl-author + rl-emp) já usado na coluna
   "Autor" pra nome+unidade. Substitui as colunas "Aprovado em"/"Reprovado em" que existiam
   separadas. */
function aprDecidedCell(name, when){
  return '<div class="rl-author"><span class="avatar av-rc"></span><div><b>'+(name||',')+'</b><span class="rl-emp">'+(when||',')+'</span></div></div>';
}
function aprActsHTML(aprovarLbl, reprovarLbl){
  return '<div class="rl-actwrap">' +
    '<button type="button" class="rl-actbtn"><span>Ações</span><i class="fa-solid fa-chevron-down"></i></button>' +
    '<div class="rl-actmenu" hidden>' +
      '<button type="button" data-pact="tab"><i class="fa-solid fa-up-right-from-square"></i> Abrir em nova guia</button>' +
      '<button type="button" data-pact="ok"><i class="fa-solid fa-check"></i> '+aprovarLbl+'</button>' +
      '<button type="button" data-pact="no" class="danger"><i class="fa-solid fa-xmark"></i> '+reprovarLbl+'</button>' +
    '</div></div>';
}
/* Estado vazio das filas de aprovação (Publicações/Shorts/Comentários) — reaproveita o
   componente .demo-empty-state.de-resultado já usado no Feed (assets/css/08-feed.css, GIF
   uploads/illustra/nao-encontrado.gif), só trocando título/subtítulo conforme o contexto: sem
   resultado pra um filtro/busca aplicados, ou a fila genuinamente sem itens naquele estado. */
function aprEmptyHTML(title, sub){
  return '<div class="demo-empty-state de-resultado">'+
    '<img class="de-illu" src="uploads/illustra/nao-encontrado.gif" alt="" width="350" height="250">'+
    '<div class="de-title">'+title+'</div>'+
    '<div class="de-sub">'+sub+'</div>'+
  '</div>';
}

function renderReelAppr(){
  reelApprData();
  foBuildReelApprFilters();
  const el=$('#reelApprQueue'); if(!el) return;
  const pendList=REEL_APPR.filter(r=>!r.proc&&!r.procFail);
  const nPend=pendList.length, nApr=REEL_HIST.filter(r=>r.apprStatus==='aprovado').length, nRej=REEL_HIST.filter(r=>r.apprStatus==='rejeitado').length;
  if($('#reelNPend')){ $('#reelNPend').textContent=nPend; $('#reelNApr').textContent=nApr; $('#reelNRej').textContent=nRej; }
  $$('#reelSeg button').forEach(b=>b.classList.toggle('on', b.dataset.f===reelFilter));
  const statusList = reelFilter==='pend' ? pendList : REEL_HIST.filter(r=>r.apprStatus===reelFilter);
  const list = statusList.filter(raMatch);
  if(!list.length){
    el.innerHTML = statusList.length
      ? aprEmptyHTML('Nenhum resultado encontrado','Não encontramos shorts para os filtros aplicados. Tente ajustar sua busca.')
      : reelFilter==='pend'
      ? aprEmptyHTML('Nenhum short pendente','Todos os shorts já foram revisados. Novos itens aparecerão aqui assim que forem enviados para aprovação.')
      : reelFilter==='aprovado'
      ? aprEmptyHTML('Nenhum short aprovado ainda','Shorts aprovados vão aparecer aqui.')
      : aprEmptyHTML('Nenhum short reprovado','Shorts reprovados vão aparecer aqui.');
    return;
  }
  const thumb=r=> r.image? '<span class="cmappr-thumb" style="width:44px;height:36px;background-image:url('+r.image+')"></span>' : '<span class="cmappr-thumb ph" style="width:44px;height:36px"><i class="fa-solid fa-clapperboard"></i></span>';
  const base2=r=>'<td><div class="rl-reel">'+thumb(r)+'<div><b>'+r.title+'</b><span>#'+r.rid+' • Short</span></div></div></td>'+
    '<td style="text-align:center"><span class="apr-type">'+(rFormat(r)==='imagem'?'Imagem':'Vídeo')+'</span></td>'+
    '<td><div class="rl-author"><span class="avatar '+r.av+'"></span><div><b>'+r.author+'</b><span class="rl-emp">'+r.unit+'</span></div></div></td>';
  const whenCell=r=>'<td class="apr-when"><div class="rl-dt">'+paFullDT(r.ts)+'</div><span class="rl-rel">'+r.date+'</span></td>';
  let head, rows, tblClass='modtbl', colg=COLG_PUB_PEND;
  if(reelFilter==='pend'){
    tblClass='modtbl modtbl-pend'; colg=COLG_PUB_PEND;
    head='<th>Short ('+list.length+')</th><th style="text-align:center">Tipo</th><th>Autor</th><th>Entrou na fila em</th><th style="text-align:center" data-nosort="1">Ações</th>';
    rows=list.map(r=>'<tr data-rid="'+r.rid+'">'+base2(r)+whenCell(r)+'<td class="rl-acts">'+aprActsHTML('Aprovar short','Reprovar short')+'</td></tr>').join('');
  } else if(reelFilter==='aprovado'){
    tblClass='modtbl modtbl-apr'; colg=COLG_PUB_APR;
    head='<th>Short ('+list.length+')</th><th style="text-align:center">Tipo</th><th>Autor</th><th>Entrou na fila em</th><th>Aprovado por</th>';
    rows=list.map(r=>'<tr>'+base2(r)+whenCell(r)+'<td class="apr-when">'+aprDecidedCell(r.decidedBy,r.decidedAt)+'</td></tr>').join('');
  } else {
    tblClass='modtbl modtbl-rej'; colg=COLG_PUB_REJ;
    head='<th>Short ('+list.length+')</th><th style="text-align:center">Tipo</th><th>Autor</th><th>Entrou na fila em</th><th>Reprovado por</th><th>Motivo</th>';
    rows=list.map(r=>'<tr>'+base2(r)+whenCell(r)+'<td class="apr-when">'+aprDecidedCell(r.decidedBy,r.decidedAt)+'</td><td class="apr-cmt">'+(r.motivo||',')+'</td></tr>').join('');
  }
  const wrap=document.createElement('div');
  wrap.className='rlist';
  wrap.innerHTML='<table class="'+tblClass+'">'+colg+'<thead><tr>'+head+'</tr></thead><tbody>'+rows+'</tbody></table>';
  wrap.addEventListener('click', function(e){
    const actBtn=e.target.closest('.rl-actbtn');
    if(actBtn){
      const td=actBtn.closest('td'); const menu=actBtn.nextElementSibling; const willOpen=menu.hidden;
      wrap.querySelectorAll('.rl-actmenu').forEach(m=>m.hidden=true);
      wrap.querySelectorAll('td.rl-actz').forEach(c=>c.classList.remove('rl-actz'));
      menu.hidden=!willOpen; td.classList.toggle('rl-actz', willOpen);
      return;
    }
    const pact=e.target.closest('[data-pact]');
    if(pact){
      pact.closest('.rl-actmenu').hidden=true; pact.closest('td').classList.remove('rl-actz');
      const row=pact.closest('[data-rid]'); if(!row) return;
      const r=REEL_APPR.find(x=>String(x.rid)===row.dataset.rid); if(!r) return;
      const a=pact.dataset.pact;
      if(a==='tab'){ window.open(location.href,'_blank'); }
      else if(a==='ok'){ REEL_APPR=REEL_APPR.filter(x=>x.rid!==r.rid); r.apprStatus='aprovado'; r.decidedBy='Rodrigo Caetano'; r.decidedAt=aprDT(); REEL_HIST.unshift(r); aprBadges(); renderReelAppr(); fgToast('Short aprovado'); }
      else if(a==='no'){ askReject(function(motivo){ REEL_APPR=REEL_APPR.filter(x=>x.rid!==r.rid); r.apprStatus='rejeitado'; r.decidedBy='Rodrigo Caetano'; r.decidedAt=aprDT(); r.motivo=motivo; REEL_HIST.unshift(r); aprBadges(); renderReelAppr(); fgToast('Short recusado'); }); }
      return;
    }
    const row=e.target.closest('[data-rid]');
    if(row){ const r=REEL_APPR.find(x=>String(x.rid)===row.dataset.rid); if(r) openReelAppr(r); }
  });
  el.innerHTML='';
  el.appendChild(wrap);
}
function openReelAppr(r){
  if(typeof openPubAppr!=='function') return;
  openPubAppr({ paid:'short-'+r.rid, image:r.image, article:false, title:r.title, sub:'Short', av:r.av, author:r.author, unit:r.unit, text:r.desc||'', date:r.date, __story:true, rid:r.rid, proc:r.proc, procFail:r.procFail });
  const m=document.getElementById('pubApprModal'); if(!m) return;
  const h2=m.querySelector('.fg-head h2'); if(h2) h2.textContent='Aprovar short';
  const ty=document.getElementById('pubApprType'); if(ty) ty.textContent='Short';
  const acts=document.getElementById('pubApprActs');
  const body=m.querySelector('.fg-body') || (function(){ const c=document.getElementById('pubApprCard'); return c && c.parentElement; })() || m.querySelector('.fg-modal > div:not(.fg-head)');
  const old=m.querySelector('#reelFailNote'); if(old) old.remove();
  if(r.procFail){
    if(acts){ acts.style.display='flex'; const ok=document.getElementById('pubApprOk'); if(ok) ok.style.display='none'; }
    if(body) body.insertAdjacentHTML('afterbegin',
      '<div class="reel-failnote" id="reelFailNote">'+
        '<i class="fa-solid fa-triangle-exclamation"></i>'+
        '<div><b>Falha no processamento</b><span>Atenção: houve uma falha na formatação do arquivo enviado. Este short não pode ser aprovado. É necessário que o autor reenvie o arquivo para aprovação.</span></div>'+
      '</div>');
  } else if(r.proc){
    if(acts) acts.style.display='none';
    if(body) body.insertAdjacentHTML('afterbegin',
      '<div class="reel-failnote reel-procnote" id="reelFailNote">'+
        '<span class="rl-spin"></span>'+
        '<div><b>Em processamento</b><span>A aprovação fica disponível quando o processamento terminar.</span></div>'+
      '</div>');
  } else if(acts){ acts.style.display='flex'; const ok=document.getElementById('pubApprOk'); if(ok) ok.style.display=''; }
}
function renderPubAppr(){
  foBuildPubApprFilters();
  const el=$('#pubApprQueue');
  const pendP=PUB_APPR.filter(n=>!n.proc&&!n.procFail);
  const nPend=pendP.length, nApr=PUB_HIST.filter(n=>n.apprStatus==='aprovado').length, nRej=PUB_HIST.filter(n=>n.apprStatus==='rejeitado').length;
  if($('#pubNPend')){ $('#pubNPend').textContent=nPend; $('#pubNApr').textContent=nApr; $('#pubNRej').textContent=nRej; }
  $$('#pubSeg button').forEach(b=>b.classList.toggle('on', b.dataset.f===pubFilter));
  const statusList = pubFilter==='pend' ? pendP : PUB_HIST.filter(n=>n.apprStatus===pubFilter);
  let list = statusList.filter(paMatch);
  if(!list.length){
    el.innerHTML = statusList.length
      ? aprEmptyHTML('Nenhum resultado encontrado','Não encontramos publicações para os filtros aplicados. Tente ajustar sua busca.')
      : pubFilter==='pend'
      ? aprEmptyHTML('Nenhuma publicação pendente','Todas as publicações já foram revisadas. Novos itens aparecerão aqui assim que forem enviados para aprovação.')
      : pubFilter==='aprovado'
      ? aprEmptyHTML('Nenhuma publicação aprovada','Quando aprovadas, publicações irão aparecer aqui.')
      : aprEmptyHTML('Nenhuma publicação reprovada','Quando reprovadas, as publicações irão aparecer aqui.');
    return;
  }
  const av=n=>n.av?'<span class="avatar '+n.av+'">'+(n.ini||'')+'</span>':'<span class="nv-logo">'+SULTS_LOGO+'</span>';
  const unitOfP=n=>n.unit||((typeof STORES!=='undefined')?STORES[(n.paid||1)%STORES.length].name:'');
  const thumbP=n=> n.image? '<span class="cmappr-thumb" style="width:44px;height:36px;background-image:url('+n.image+')"></span>' : '<span class="cmappr-thumb ph" style="width:44px;height:36px"><i class="fa-solid fa-'+(n.article?'newspaper':'align-left')+'"></i></span>';
  const base3=n=>'<td><div class="rl-reel">'+thumbP(n)+'<div><b>'+(n.title||'(sem título)')+'</b><span>#'+n.paid+' • '+(n.article?'Artigo':'Postagem')+'</span></div></div></td><td style="text-align:center"><span class="apr-type">'+(n.article?'Artigo':'Postagem')+'</span></td><td><div class="rl-author">'+av(n)+'<div><b>'+(n.author||'SULTS')+'</b><span class="rl-emp">'+unitOfP(n)+'</span></div></div></td>';
  const whenCell=n=>'<td class="apr-when"><div class="rl-dt">'+paFullDT(n.ts)+'</div><span class="rl-rel">'+(n.date||'agora')+'</span></td>';
  if(pubSortIdx!=null){ list=list.slice().sort(function(a,b){ var ka=pubCellVal(a,pubSortIdx), kb=pubCellVal(b,pubSortIdx); return ka<kb?-pubSortDir:ka>kb?pubSortDir:0; }); }
  let head, rows, tblClass='modtbl', colg=COLG_PUB_PEND;
  if(pubFilter==='pend'){
    tblClass='modtbl modtbl-pend'; colg=COLG_PUB_PEND;
    head='<th>Publicação ('+list.length+')</th><th>Tipo</th><th>Autor</th><th>Entrou na fila em</th><th style="text-align:center" data-nosort="1">Ações</th>';
    rows=list.map(n=>'<tr data-paid="'+n.paid+'">'+base3(n)+whenCell(n)+'<td class="rl-acts">'+aprActsHTML('Aprovar publicação','Reprovar publicação')+'</td></tr>').join('');
  } else if(pubFilter==='aprovado'){
    tblClass='modtbl modtbl-apr'; colg=COLG_PUB_APR;
    head='<th>Publicação ('+list.length+')</th><th style="text-align:center">Tipo</th><th>Autor</th><th>Entrou na fila em</th><th>Aprovado por</th>';
    rows=list.map(n=>'<tr data-paid="'+n.paid+'">'+base3(n)+whenCell(n)+'<td class="apr-when">'+aprDecidedCell(n.decidedBy,n.decidedAt)+'</td></tr>').join('');
  } else {
    tblClass='modtbl modtbl-rej'; colg=COLG_PUB_REJ;
    head='<th>Publicação ('+list.length+')</th><th style="text-align:center">Tipo</th><th>Autor</th><th>Entrou na fila em</th><th>Reprovado por</th><th>Motivo</th>';
    rows=list.map(n=>'<tr data-paid="'+n.paid+'"><td class="apr-cmt"><b>'+(n.title||'(sem título)')+'</b></td><td style="text-align:center"><span class="apr-type">'+(n.article?'Artigo':'Postagem')+'</span></td><td><div class="rl-author">'+av(n)+'<div><b>'+(n.author||'SULTS')+'</b></div></div></td>'+whenCell(n)+'<td class="apr-when">'+aprDecidedCell(n.decidedBy,n.decidedAt)+'</td><td class="apr-cmt">'+(n.motivo?n.motivo.replace(/</g,'&lt;'):',')+'</td></tr>').join('');
  }
  el.innerHTML = '<div class="rlist"><table class="'+tblClass+'">'+colg+'<thead><tr>'+head+'</tr></thead><tbody>'+rows+'</tbody></table></div>';
  el.querySelectorAll('thead th').forEach(function(th,i){ if(!th.textContent.trim()||th.dataset.nosort) return; th.classList.add('sortable'); if(pubSortIdx===i) th.classList.add('active-sort'); const icon=pubSortIdx===i?(pubSortDir===1?NV_SORT_ICONS.up:NV_SORT_ICONS.down):NV_SORT_ICONS.swap; th.innerHTML=th.innerHTML+' <span class="sort-ic">'+icon+'</span>'; th.addEventListener('click', function(){ if(pubSortIdx===i) pubSortDir=-pubSortDir; else { pubSortIdx=i; pubSortDir=1; } renderPubAppr(); }); });
}
$('#pubApprQueue') && $('#pubApprQueue').addEventListener('click', e=>{
  const actBtn=e.target.closest('.rl-actbtn');
  if(actBtn){
    const td=actBtn.closest('td'); const menu=actBtn.nextElementSibling; const willOpen=menu.hidden;
    $$('#pubApprQueue .rl-actmenu').forEach(m=>m.hidden=true);
    $$('#pubApprQueue td.rl-actz').forEach(c=>c.classList.remove('rl-actz'));
    menu.hidden=!willOpen; td.classList.toggle('rl-actz', willOpen);
    return;
  }
  const pact=e.target.closest('[data-pact]');
  if(pact){
    pact.closest('.rl-actmenu').hidden=true; pact.closest('td').classList.remove('rl-actz');
    const row=pact.closest('[data-paid]'); if(!row) return;
    const n=PUB_APPR.find(x=>x.paid===+row.dataset.paid); if(!n) return;
    const a=pact.dataset.pact;
    if(a==='tab'){ window.open(location.href,'_blank'); }
    else if(a==='ok'){ PUB_APPR=PUB_APPR.filter(x=>x.paid!==n.paid); n.apprStatus='aprovado'; n.decidedBy='Rodrigo Caetano'; n.decidedAt=aprDT(); PUB_HIST.unshift(n); n.status='pub'; NEWS.unshift(n); addHomePost(n,true); if(typeof renderNewsList==='function') renderNewsList(); fgToast('Publicação aprovada'); aprBadges(); renderPubAppr(); }
    else if(a==='no'){ askReject(function(motivo){ PUB_APPR=PUB_APPR.filter(x=>x.paid!==n.paid); n.motivo=motivo; n.apprStatus='rejeitado'; n.decidedBy='Rodrigo Caetano'; n.decidedAt=aprDT(); PUB_HIST.unshift(n); fgToast('Publicação recusada'); aprBadges(); renderPubAppr(); }); }
    return;
  }
  const row=e.target.closest('[data-paid]');
  if(row){ const src=pubFilter==='pend'?PUB_APPR:PUB_HIST; const n=src.find(x=>x.paid===+row.dataset.paid); if(n) reviewPub(n); }
});
function reviewPub(n){ reviewingPub=n; openArticle(n); const bar=$('#nvArtReview'); if(bar) bar.hidden=false; const ed=$('#nvArtEdit'); if(ed) ed.hidden=true; }
function reviewDecide(ok){ const n=reviewingPub; if(!n) return; PUB_APPR=PUB_APPR.filter(x=>x.paid!==n.paid); function finish(){ aprBadges(); reviewingPub=null; const bar=$('#nvArtReview'); if(bar) bar.hidden=true; const ed=$('#nvArtEdit'); if(ed) ed.hidden=false; newsShow('pubappr'); } if(ok){ n.apprStatus='aprovado'; n.decidedBy='Rodrigo Caetano'; n.decidedAt=aprDT(); PUB_HIST.unshift(n); n.status='pub'; NEWS.unshift(n); addHomePost(n,true); if(typeof renderNewsList==='function') renderNewsList(); fgToast('Publicação aprovada'); finish(); } else { askReject(function(motivo){ n.motivo=motivo; n.apprStatus='rejeitado'; n.decidedBy='Rodrigo Caetano'; n.decidedAt=aprDT(); PUB_HIST.unshift(n); fgToast('Publicação recusada'); finish(); }); } }
/* Seed: 40 comentários na primeira publicação */
(function seedFirstPostComments(){
  try{
    var first = NEWS.find(function(x){return x.id===1;}) || NEWS[0];
    if(!first) return;
    var people=[['Ana Souza','av-as'],['Pedro Lima','av-pl'],['Livia Fernandes','av-lf'],['Matheus Scussel','av-ms'],['Willer Matayoshi','av-wm'],['Carla Mendes','av-cm'],['João Santos','av-js'],['Beatriz Lopes','av-bo'],['Rafael Nunes','av-rc'],['Gustavo Costa','av-gc'],['Marina Dias','av-lf'],['Thiago Melo','av-pl'],['Fernanda Rocha','av-cm'],['Lucas Prado','av-ms'],['Bruna Alves','av-as']];
    var txt=['Que notícia incrível! Parabéns a todos. 👏','Fico muito feliz em fazer parte dessa rede. 💙','Boas-vindas aos novos parceiros! 🚀','Isso mostra o quanto estamos crescendo.','Sensacional, seguimos juntos!','Orgulho de trabalhar aqui.','Vamos com tudo, time! 🔥','Que marco histórico para a rede.','Parabéns pela conquista, merecido demais.','Ansioso pelos próximos capítulos.','Excelente trabalho de todos os envolvidos.','A união faz a força! 💪','Muito bom ver a rede se expandindo.','Continuem com o ótimo trabalho.','Isso sim é resultado de time. 👏','Bora crescer ainda mais em 2026!','Que orgulho dessa família SULTS.','Show de bola, parabéns!','Notícia que alegra o dia. 😀','Vamos comemorar essa vitória!','Simplesmente espetacular.','Feliz demais com essa novidade.','Rede cada vez mais forte!','Parabéns, resultado de muito esforço.','Top demais, seguimos evoluindo.','Que venham as próximas conquistas!','Muito merecido, time incrível.','Isso é só o começo! 🚀','Sensação de dever cumprido.','Que energia boa essa notícia traz.','Contem comigo para o que precisar!','Vamos manter esse ritmo.','Orgulho em cada detalhe.','Time nota 10, parabéns!','Que crescimento impressionante.','Feliz por testemunhar esse momento.','Rumo ao topo, juntos! 🏆','Parabéns pela dedicação de sempre.','Isso motiva demais a equipe.','Melhor rede para se trabalhar! 💙'];
    var roles=['Comercial','Marketing','Customer Success','Produto','Financeiro','Expansão','RH','Suporte','Operações','Design'];
    var arr=[];
    var unis=["SULTS","Shopping Plazza Rio","Bella Capri Centro","Lugano Gramado","Boatlux Marina Sul","Pit Stop Barra","FarMelhor Savassi","Mormaii Balneário","Casa do Construtor Norte"];
    for(var i=0;i<40;i++){ var p=people[i%people.length]; arr.push({author:p[0],av:p[1],role:roles[i%roles.length]+' · '+unis[i%unis.length],text:txt[i%txt.length],time:(i<8?(i+1)+' h':((i%20)+1)+' d'),likes:(i*3)%18}); }
    first.cmts = arr; first.comments = 0;
    var art = NEWS.find(function(x){return x.article && x.pinned;});
    if(art){
      var aArr=[];
      for(var k=0;k<9;k++){ var pp=people[(k+3)%people.length]; aArr.push({author:pp[0],av:pp[1],role:roles[(k+2)%roles.length]+' · '+unis[(k+1)%unis.length],text:txt[(k*4+5)%txt.length],time:(k<4?(k+2)+' h':(k)+' d'),likes:(k*5)%22}); }
      var pend={author:'Fernanda Rocha',av:'av-cm',role:'Expansão · '+unis[3],text:'Podemos usar esse case na próxima convenção de franqueados?',time:'25 min',likes:0,pend:true};
      if(typeof modAdd==='function'){ modAdd({author:pend.author, av:pend.av, role:pend.role, text:pend.text, post:art.title||'Publicação', when:'25 min'}); pend.mid=modSeq; }
      aArr.unshift(pend);
      art.cmts=aArr; art.comments=0;
    }
  }catch(e){}
})();
/* Seeds de teste: 10 comentários + 7 publicações pendentes */
(function seedApprovals(){
  const cAuthors=[['Ana Souza','av-as'],['Pedro Lima','av-pl'],['Livia Fernandes','av-lf'],['Matheus Scussel','av-ms'],['Willer Matayoshi','av-wm'],['Carla Mendes','av-cm'],['João Santos','av-js'],['Beatriz Lopes','av-bo'],['Rafael Nunes','av-rc'],['Gustavo Costa','av-gc']];
  const cPosts=['Convenção SULTS 2026','Novo cliente: Boatlux','NPS 87 no CS','SULTS Open em beta','ABF Expo 2026','História Bibi','Aniversário do Breno','Trends News','Franquias em alta','Bella Capri'];
  const cTexts=['Parabéns pelo trabalho, ficou excelente! 👏','Vamos com tudo, time! 🚀','Que orgulho fazer parte disso.','Alguém sabe se vai ter transmissão ao vivo?','Show de bola, muito bom mesmo.','Congratulações a todos os envolvidos! 💙','Isso vai ajudar demais na operação.','Top demais, ansioso pela próxima edição.','Sensacional, parabéns pela conquista!','Muito bom, vamos compartilhar com a equipe.'];
  for(let k=0;k<10;k++){ const nid=[1,2,3,6,4,1,2,3,6,4][k]; const nn=NEWS.find(x=>x.id===nid)||{}; modAdd({author:cAuthors[k][0],av:cAuthors[k][1],text:cTexts[k],post:(nn.title||cPosts[k]),newsId:nid,time:(k+1)+' h',dt:aprDT(new Date(Date.now()-(k+1)*3600000)),approve:()=>{},reject:()=>{}}); }
  const pubs=[
    {title:'Resultados do 1º semestre superam a meta em 18%',author:'Matheus Scussel',av:'av-ms',ini:'MS',date:'há 20 min',ts:Date.now()-20*60000,text:'Fechamos o semestre com crescimento acima do esperado em toda a rede.',sub:'Expansão'},
    {title:'Nova unidade inaugurada em Florianópolis',author:'Lucas Prado',av:'av-pl',ini:'LP',date:'há 40 min',ts:Date.now()-40*60000,text:'Mais uma loja da rede abre as portas no litoral catarinense.',sub:'Expansão'},
    {title:'Treinamento de atendimento 2.0 disponível',author:'Carla Mendes',av:'av-cm',ini:'CM',date:'há 1 h',ts:Date.now()-60*60000,text:'Nova trilha na Universidade Corporativa com certificado.',sub:'Universidade'},
    {title:'Campanha de inverno começa na próxima semana',author:'Ana Souza',av:'av-as',ini:'AS',date:'há 2 h',ts:Date.now()-2*3600000,text:'Materiais de PDV já disponíveis no Disco Virtual.',sub:'Produto'},
    {title:'Bella Capri: a história por trás do sucesso',author:'Ellen Rocha',av:'av-gc',ini:'ER',date:'há 3 h',ts:Date.now()-3*3600000,text:'Um mergulho na trajetória de uma das maiores redes de pizzarias.',sub:'Histórias de sucesso',article:true},
    {title:'Atualização da plataforma v10.5',author:'Willer Matayoshi',av:'av-wm',ini:'WM',date:'há 5 h',ts:Date.now()-5*3600000,text:'Melhorias de performance e novos filtros nos relatórios.',sub:'Produto'},
    {title:'Vagas internas abertas em Produto e CS',author:'Beatriz Lopes',av:'av-bo',ini:'BL',date:'ontem',ts:Date.now()-25*3600000,text:'Candidate-se pelo RH até sexta-feira.',sub:'Gente & Cultura'}
  ];
  pubs.forEach(p=>pubApprAdd(Object.assign({status:'draft',reactions:0,comments:0},p)));
})();
$('#pmSave') && $('#pmSave').addEventListener('click', ()=>fgToast('Parâmetros salvos'));
$('#nmtApps') && $('#nmtApps').addEventListener('click', ()=>{ closeNewsModule(); setNav($('#navHome')); });
/* a logo leva para a home, como em qualquer site: e o gesto que se tenta
   antes de procurar o botao de Modulos */
$('#nmodLogo') && $('#nmodLogo').addEventListener('click', ()=>{ closeNewsModule(); setNav($('#navHome')); });
$('#nmtInter') && $('#nmtInter').addEventListener('click', ()=>{ newsView.classList.add('open'); interFilter='reacao'; newsShow('inter'); setTimeout(function(){ INTERACTIONS.forEach(function(x){ interSeen.add(x.id); }); var tb=document.getElementById('interTabBadge'); if(tb) tb.hidden=true; var nn=document.getElementById('interNewN'); if(nn) nn.textContent='0'; },1200); });
$('#nmtCmts') && $('#nmtCmts').addEventListener('click', ()=>newsShow('cmgrid'));
function interSetBadge(){ if(!INTERACTIONS.length) buildInteractions(); var tb=document.getElementById('interTabBadge'); var un=INTERACTIONS.filter(function(z){return !interSeen.has(z.id);}).length; if(tb){ tb.textContent=un; tb.hidden=!un; } }
setTimeout(interSetBadge, 200);
let interFilter='reacao', INTERACTIONS=[];
function interDT(mins){ const d=new Date(Date.now()-mins*60000); const p=x=>('0'+x).slice(-2); return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear()+' · '+p(d.getHours())+':'+p(d.getMinutes()); }
function interRel(mins){ if(mins<60) return 'há '+mins+' min'; if(mins<1440) return 'há '+Math.floor(mins/60)+' h'; return 'há '+Math.floor(mins/1440)+' d'; }
function buildInteractions(){
  INTERACTIONS=[];
  var reactTxt=['Curtiu','Amou','Achou incrível','Apoiou','Comemorou'];
  var reactIco=REACTIONS.map(function(r){ return [r.key, r.color, r.label]; });
  var cTexts=['Parabéns pelo trabalho! 👏','Que notícia incrível!','Muito bom, seguimos juntos! 🚀','Orgulho da rede. 💙','Sensacional, time!','Vamos com tudo!','Isso motiva demais.','Excelente novidade.','Show de bola! 🔥','Que marco histórico.'];
  var pub = NEWS.filter(function(n){return n.status==='pub';});
  var id=0;
  for(var i=0;i<48;i++){
    var p=PEOPLE[i%PEOPLE.length];
    var st=STORES[i%STORES.length];
    var n=pub[i%pub.length]||{title:'Publicação'};
    var isC=(i%3===0);
    var mins=8+i*17;
    if(isC){ INTERACTIONS.push({id:++id,tipo:'comentario',person:p.name,av:p.av,role:p.role,store:st.name,storeCo:st.company,storeIni:st.ini,storeColor:st.color,post:n.title||'Publicação',content:cTexts[i%cTexts.length],mins:mins}); }
    else { var r=i%reactIco.length; INTERACTIONS.push({id:++id,tipo:'reacao',reacao:reactIco[r],reacaoLabel:reactTxt[r%reactTxt.length],person:p.name,av:p.av,role:p.role,store:st.name,storeCo:st.company,storeIni:st.ini,storeColor:st.color,post:n.title||'Publicação',content:'',mins:mins}); }
  }
}
let interQuery='', interPerson='', interStore='', interPeriod='', interPage=1, interOnlyNewOn=false, interReact='', interPost='', interRole='';
let interSeen=new Set(), interOpen=new Set();
function interFillSelects(){
  if(!INTERACTIONS.length) buildInteractions();
  var ps=$('#interFPerson'), ss=$('#interFStore');
  if(ps && ps.children.length<=0){ var names=[...new Set(INTERACTIONS.map(x=>x.person))]; ps.innerHTML='<option value="">Todas as pessoas</option>'+names.map(n=>'<option>'+n+'</option>').join(''); }
  if(ss && ss.children.length<=0){ var st=[...new Set(INTERACTIONS.map(x=>x.store))]; ss.innerHTML='<option value="">Todas as lojas</option>'+st.map(n=>'<option>'+n+'</option>').join(''); }
  var po=$('#interFPost'); if(po && po.children.length<=0){ var ps=[...new Set(INTERACTIONS.map(x=>x.post))]; po.innerHTML='<option value="">Todas as publicações</option>'+ps.map(n=>'<option>'+n+'</option>').join(''); }
  var ro=$('#interFRole'); if(ro && ro.children.length<=0){ var rs=[...new Set(INTERACTIONS.map(x=>x.role))]; ro.innerHTML='<option value="">Todos os cargos</option>'+rs.map(n=>'<option>'+n+'</option>').join(''); }
  var nn=$('#interNewN'); if(nn) nn.textContent=INTERACTIONS.filter(function(z){return !interSeen.has(z.id);}).length;
  var ob=$('#interOnlyNew'); if(ob) ob.classList.toggle('active', interOnlyNewOn);
}
function interListFor(post){
  var q=(interQuery||'').toLowerCase();
  return INTERACTIONS.filter(function(x){
    if(post && x.post!==post) return false;
    if(interFilter && x.tipo!==interFilter) return false;
    if(interPerson && x.person!==interPerson) return false;
    if(interStore && x.store!==interStore) return false;
    if(interPeriod && x.mins>+interPeriod) return false;
    if(interOnlyNewOn && interSeen.has(x.id)) return false;
    if(interReact && (x.tipo!=='reacao' || x.reacao[2]!==interReact)) return false;
    if(interPost && x.post!==interPost) return false;
    if(interRole && x.role!==interRole) return false;
    if(q && !((x.person+' '+x.store+' '+x.storeCo+' '+x.post+' '+(x.content||'')).toLowerCase().includes(q))) return false;
    return true;
  });
}
(function(){ const s=document.getElementById('interFReact'); if(s) s.innerHTML='<option value="">Todas as reações</option>'+REACTIONS.map(r=>'<option>'+r.label+'</option>').join(''); })();
function renderInteractions(){
  if(!INTERACTIONS.length) buildInteractions();
  interFillSelects();
  var list=interListFor(null);
  var el=$('#interList'); if(!el) return;
  var rw=$('#interFReactWrap'); if(rw) rw.style.display = interFilter==='reacao' ? '' : 'none';
  var fh=$('#interFSecHd'); if(fh) fh.textContent = interFilter==='comentario' ? 'Comentário' : 'Reação';
  var ht=$('#nvInterScreen .rx-title'); if(ht) ht.innerHTML = interFilter==='comentario'
    ? '<i class="fa-solid fa-comment"></i><h2>Comentários</h2>'
    : '<i class="fa-solid fa-heart"></i><h2>Reações</h2>';
  var ta=$('#nmtInter'), tc=$('#nmtCmts');
  if(ta) ta.classList.toggle('active', interFilter==='reacao');
  if(tc) tc.classList.toggle('active', interFilter==='comentario');
  // Agrupar por publicação
  var groups=[]; var byPost={};
  list.forEach(function(x){ if(!byPost[x.post]){ byPost[x.post]={post:x.post,items:[]}; groups.push(byPost[x.post]); } byPost[x.post].items.push(x); });
  groups.sort(function(a,b){
    var na=a.items.filter(function(x){return !interSeen.has(x.id);}).length;
    var nb=b.items.filter(function(x){return !interSeen.has(x.id);}).length;
    if(nb!==na) return nb-na;
    return Math.min.apply(null,a.items.map(function(x){return x.mins;})) - Math.min.apply(null,b.items.map(function(x){return x.mins;}));
  });
  var flat=list.slice().sort(function(a,b){ var ua=!interSeen.has(a.id),ub=!interSeen.has(b.id); if(ua!==ub) return ua?-1:1; return a.mins-b.mins; });
  $('#interCount').textContent='';
  if(!flat.length){ el.innerHTML='<div class="mod-empty"><i class="fa-regular fa-face-smile"></i><b>Nenhuma interação</b><span>Ajuste os filtros.</span></div>'; return; }
  var per=15, pages=Math.max(1,Math.ceil(flat.length/per));
  if(interPage>pages) interPage=pages;
  var page=flat.slice((interPage-1)*per, interPage*per);
  var isView = true, isReact = interFilter==='reacao', isCmt = interFilter==='comentario';
  var whenLbl = isCmt ? 'Comentado em' : 'Reagiu em';
  var rows=page.map(function(x){
    var n=findNewsByTitle(x.post)||{};
    var unseen=!interSeen.has(x.id);
    var thumb = n.image? '<span class="cmappr-thumb" style="width:42px;height:34px;background-image:url('+n.image+')"></span>' : '<span class="cmappr-thumb ph" style="width:42px;height:34px"><i class="fa-solid fa-'+(n.article?'newspaper':'align-left')+'"></i></span>';
    var td = '';
    if(!isView) td += '<td>'+(unseen?'<span class="itbl-seen new"><i class="fa-solid fa-circle"></i> Não visto</span>':'<span class="itbl-seen"><i class="fa-solid fa-check"></i> Visto</span>')+'</td>';
    td += '<td class="itbl-when"><div>'+interDT(x.mins)+'</div><span>'+interRel(x.mins)+'</span></td>';
    if(isReact) td += '<td><span class="il-pill" style="background:'+x.reacao[1]+'18;color:'+x.reacao[1]+'"><i class="fa-solid '+x.reacao[0]+'"></i> '+x.reacao[2]+'</span></td>';
    td += '<td><div class="apr-person"><span class="avatar '+x.av+'"></span><div><b>'+x.person+'</b><span class="itbl-prole">'+x.role+'</span></div></div></td>';
    if(isCmt) td += '<td class="itbl-cmtcell"><div class="itbl-cmt">"'+x.content+'"</div></td>';
    td += '<td><div class="itbl-store"><span class="itbl-logo" style="background:'+x.storeColor+'">'+x.storeIni+'</span><div><b>'+x.store+'</b><span>'+x.storeCo+'</span></div></div></td>';
    td += '<td><div class="pubttl">'+thumb+'<div><b>'+x.post+'</b><span>'+(n.article?'Artigo':'Publicação')+' · '+(n.sub||'SULTS')+'</span></div></div></td>';
    return '<tr class="'+(unseen&&!isView?'is-new':'')+'" data-post="'+x.post.replace(/"/g,'&quot;')+'">'+td+'</tr>';
  }).join('');
  var pager='';
  if(flat.length>per){
    var btns='';
    for(var p=1;p<=pages;p++) btns+='<button class="itbl-pg'+(p===interPage?' on':'')+'" data-ipg="'+p+'">'+p+'</button>';
    pager='<div class="itbl-pager"><span class="itbl-pginfo">'+((interPage-1)*per+1)+'–'+Math.min(interPage*per,flat.length)+' de '+flat.length+'</span><div class="itbl-pgbtns"><button class="itbl-pg nav" data-ipg="prev"'+(interPage===1?' disabled':'')+'><i class="fa-solid fa-chevron-left"></i></button>'+btns+'<button class="itbl-pg nav" data-ipg="next"'+(interPage===pages?' disabled':'')+'><i class="fa-solid fa-chevron-right"></i></button></div></div>';
  }
  var th = '';
  if(!isView) th += '<th style="width:130px;min-width:130px;max-width:130px">Status</th>';
  th += '<th style="width:242px;min-width:242px">'+whenLbl+'</th>';
  if(isReact) th += '<th style="width:150px">Reação</th>';
  th += '<th>Colaborador</th>';
  if(isCmt) th += '<th style="width:312px;min-width:312px">Comentário</th>';
  th += '<th>Unidade</th><th>Publicação</th>';
  el.innerHTML='<div class="rlist"><table class="itbl"><thead><tr>'+th+'</tr></thead><tbody>'+rows+'</tbody></table>'+pager+'</div>';
}
function findNewsByTitle(t){ return NEWS.find(function(n){return (n.title||'')===t;}); }
/* ---- Popup de interações de uma publicação ---- */
let interModalPost=null, interModalNewOnly=false, interModalPage=1;
function openInterModal(post){
  interModalPost=post; interModalNewOnly=false; interModalPage=1;
  var n=findNewsByTitle(post)||{};
  $('#interMTitle').textContent=post;
  $('#interMSub').textContent=(n.article?'Artigo':'Publicação')+' · '+(n.sub||'SULTS');
  renderInterModal();
  $('#interModal').classList.add('open');
}
function renderInterModal(){
  var all=interListFor(interModalPost);
  var newN=all.filter(function(x){return !interSeen.has(x.id);}).length;
  var list=interModalNewOnly?all.filter(function(x){return !interSeen.has(x.id);}):all;
  list.sort(function(a,b){ var ua=!interSeen.has(a.id),ub=!interSeen.has(b.id); if(ua!==ub) return ua?-1:1; return a.mins-b.mins; });
  $$('#interMSeg button').forEach(function(b){ b.classList.toggle('on', (b.dataset.f==='novas')===interModalNewOnly); });
  var nb=$('#interMSeg button[data-f="novas"] .seg-n'); if(nb) nb.textContent=newN;
  var per=8, pages=Math.max(1,Math.ceil(list.length/per));
  if(interModalPage>pages) interModalPage=pages;
  var page=list.slice((interModalPage-1)*per, interModalPage*per);
  var rows=page.map(function(x){
    var unseen=!interSeen.has(x.id);
    var tipo = x.tipo==='comentario'
      ? '<span class="il-pill" style="background:#eef2f5;color:#5b6672"><i class="fa-solid fa-comment"></i> Comentou</span>'
      : '<span class="il-pill" style="background:'+x.reacao[1]+'18;color:'+x.reacao[1]+'"><span class="rxs-ic" data-rx="'+x.reacao[0]+'"></span> '+x.reacao[2]+'</span>';
    var cmt = x.content ? '<button class="itbl-cmtbtn" data-cmt="'+x.id+'"><i class="fa-regular fa-comment-dots"></i> Ver comentário</button>' : '';
    return '<tr class="'+(unseen?'is-new':'')+'">'+
      '<td>'+(unseen?'<span class="itbl-newtag"><span class="itbl-newpulse"></span> NOVA</span>':'')+tipo+cmt+'</td>'+
      '<td><div class="apr-person"><span class="avatar '+x.av+'"></span><div><b>'+x.person+'</b><span class="itbl-prole">'+x.role+'</span></div></div></td>'+
      '<td><div class="itbl-store"><span class="itbl-logo" style="background:'+x.storeColor+'">'+x.storeIni+'</span><div><b>'+x.store+'</b><span>'+x.storeCo+'</span></div></div></td>'+
      '<td class="itbl-when"><div>'+interDT(x.mins)+'</div><span>'+interRel(x.mins)+'</span></td>'+
    '</tr>';
  }).join('');
  var pager='';
  if(list.length>per){
    var btns='';
    for(var p=1;p<=pages;p++) btns+='<button class="itbl-pg'+(p===interModalPage?' on':'')+'" data-pg="'+p+'">'+p+'</button>';
    pager='<div class="itbl-pager"><span class="itbl-pginfo">'+((interModalPage-1)*per+1)+'–'+Math.min(interModalPage*per,list.length)+' de '+list.length+'</span><div class="itbl-pgbtns"><button class="itbl-pg nav" data-pg="prev"'+(interModalPage===1?' disabled':'')+'><i class="fa-solid fa-chevron-left"></i></button>'+btns+'<button class="itbl-pg nav" data-pg="next"'+(interModalPage===pages?' disabled':'')+'><i class="fa-solid fa-chevron-right"></i></button></div></div>';
  }
  $('#interMBody').innerHTML = list.length? '<table class="itbl"><thead><tr><th>Interação</th><th>Colaborador</th><th>Loja</th><th style="width:150px">Data e hora</th></tr></thead><tbody>'+rows+'</tbody></table>'+pager : '<div class="mod-empty"><i class="fa-regular fa-circle-check"></i><b>Nada por aqui</b><span>Nenhuma interação nova.</span></div>';
}
function closeInterModal(){
  $('#interModal').classList.remove('open');
  if(interModalPost){ interListFor(interModalPost).forEach(function(x){ interSeen.add(x.id); }); interSetBadge(); renderInteractions(); }
  interModalPost=null;
}
$('#interSeg') && $('#interSeg').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; interFilter=b.dataset.f; interPage=1; if(interFilter!=='reacao'){ interReact=''; var s=$('#interFReact'); if(s) s.value=''; } renderInteractions(); });
$('#interList') && $('#interList').addEventListener('click', function(e){ var pg=e.target.closest('[data-ipg]'); if(pg && !pg.disabled){ var v=pg.dataset.ipg; if(v==='prev') interPage--; else if(v==='next') interPage++; else interPage=+v; renderInteractions(); return; } var tr=e.target.closest('tr[data-post]'); if(!tr) return; var n=(typeof findNewsByTitle==='function')?findNewsByTitle(tr.dataset.post):null; if(n){ if(typeof openArticle==='function') openArticle(n); } });
$('#interMClose') && $('#interMClose').addEventListener('click', closeInterModal);
$('#interModal') && $('#interModal').addEventListener('click', function(e){ if(e.target===this) closeInterModal(); });
$('#interMSeg') && $('#interMSeg').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; interModalNewOnly=(b.dataset.f==='novas'); interModalPage=1; renderInterModal(); });
$('#interMBody') && $('#interMBody').addEventListener('click', function(e){ var pg=e.target.closest('.itbl-pg'); if(pg && !pg.disabled){ var v=pg.dataset.pg; if(v==='prev') interModalPage--; else if(v==='next') interModalPage++; else interModalPage=+v; renderInterModal(); $('#interMBody').scrollTop=0; return; } });
$('#interMBody') && $('#interMBody').addEventListener('click', function(e){ var b=e.target.closest('[data-cmt]'); if(!b) return; var x=INTERACTIONS.find(function(i){return i.id===+b.dataset.cmt;}); if(!x) return; $('#cmtPopAv').className='avatar '+x.av; $('#cmtPopName').textContent=x.person; $('#cmtPopRole').textContent=x.role+' · '+x.store; $('#cmtPopText').textContent=x.content; $('#cmtPopWhen').textContent=interDT(x.mins); $('#cmtPop').classList.add('open'); });
$('#cmtPopClose') && $('#cmtPopClose').addEventListener('click', function(){ $('#cmtPop').classList.remove('open'); });
$('#cmtPop') && $('#cmtPop').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
$('#interSearch') && $('#interSearch').addEventListener('input', function(e){ interQuery=e.target.value.trim(); renderInteractions(); });
$('#interFPerson') && $('#interFPerson').addEventListener('change', function(e){ interPerson=e.target.value; renderInteractions(); });
$('#interFStore') && $('#interFStore').addEventListener('change', function(e){ interStore=e.target.value; renderInteractions(); });
$('#interFPeriod') && $('#interFPeriod').addEventListener('change', function(e){ interPeriod=e.target.value; interPage=1; renderInteractions(); });
$('#interOnlyNew') && $('#interOnlyNew').addEventListener('click', function(){ interOnlyNewOn=!interOnlyNewOn; interPage=1; renderInteractions(); });
$('#interFReact') && $('#interFReact').addEventListener('change', function(e){ interReact=e.target.value; interPage=1; renderInteractions(); });
$('#interFPost') && $('#interFPost').addEventListener('change', function(e){ interPost=e.target.value; interPage=1; renderInteractions(); });
$('#interFRole') && $('#interFRole').addEventListener('change', function(e){ interRole=e.target.value; interPage=1; renderInteractions(); });
$('#interFApply') && $('#interFApply').addEventListener('click', function(){ interPage=1; renderInteractions(); fgToast('Filtros aplicados'); });
$('#interFClear') && $('#interFClear').addEventListener('click', function(){ interQuery=''; interPerson=''; interStore=''; interPeriod=''; interOnlyNewOn=false; interReact=''; interPost=''; interRole=''; interPage=1; ['interFReact','interFPost','interFRole'].forEach(function(id){var el=document.getElementById(id); if(el)el.value='';}); var s=$('#interSearch'); if(s)s.value=''; ['interFPerson','interFStore','interFPeriod'].forEach(function(id){ var el=document.getElementById(id); if(el)el.value=''; }); renderInteractions(); });
/* relocate appr screens */
(function(){ const nv=document.getElementById('newsView'); ['nvInterScreen','nvArticleScreen','nvCatsScreen','nvTeamScreen','nvPermScreen','nvParamsScreen','nvAprHomeScreen','nvModScreen','nvPubApprScreen','nvReelApprScreen'].forEach(id=>{ const el=document.getElementById(id); if(nv&&el&&!nv.contains(el)) nv.appendChild(el); }); })();
function newsShow(screen){
  if(typeof nvArtAdvClose==='function') nvArtAdvClose();
  $$('.nv-screen').forEach(s => s.classList.remove('active'));
  newsView.classList.toggle('reelsmode', screen==='shorts');
  if (screen!=='compose' && screen!=='article') nvSetEnv((screen==='shorts'||screen==='shortsb'||screen==='feed'||!screen) ? 'social' : 'gerenciar');
  /* ler um artigo e coisa da visao do funcionario: header branco. So a revisao
     de uma publicacao pendente (vinda de Aprovacoes) fica no Gerenciar. */
  if (screen==='article') nvSetEnv((typeof reviewingPub!=='undefined' && reviewingPub) ? 'gerenciar' : 'social');
  if (screen==='shorts') screen='shortsb';
  /* o campo diz onde a busca vai agir, e o escopo e sempre a aba aberta */
  const campoBusca = $('#nmodSearchIn');
  if (campoBusca){
    campoBusca.placeholder = screen==='shortsb' ? 'Pesquisar em shorts' : 'Pesquisar em publicações';
    /* cada aba tem a sua busca: o campo mostra a da aba que abriu, para nao
       ficar com um termo escrito que nao esta filtrando nada ali */
    if (screen==='shortsb' || screen==='feed') campoBusca.value =
      screen==='shortsb' ? (typeof sbQuery!=='undefined' ? sbQuery : '') : nvSearchQuery;
  }
  /* os campos "Localizar" das laterais mostram a mesma busca da aba */
  const campoLado = $('#nvfSearch'); if (campoLado) campoLado.value = nvSearchQuery;
  const campoLadoS = $('#sbSearch'); if (campoLadoS && typeof sbQuery!=='undefined') campoLadoS.value = sbQuery;
  /* a fileira de shorts so tem largura depois que a tela aparece: e aqui
     que da para saber se ha o que rolar */
  if (typeof updNvfArrows==='function') requestAnimationFrame(updNvfArrows);
  if (screen==='shortsb'){
    newsView.classList.remove('catmode','cfg','apr','aprhome','intermode');
    reelsView.classList.remove('open','in-social','in-cfg','in-module');
    nmodSetActive('nmodShortsB');
    $('#nvShortsBScreen').classList.add('active');
    renderShortsB();
    return;
  }
  if (screen==='cfgstories'){ newsView.classList.remove('catmode','cfg','apr','aprhome'); nmodSetActive('nmodMgShorts'); nvOpenCfgStories(); return; }
  reelsView.classList.remove('open','in-social','in-cfg','in-module');
  if(typeof permView!=='undefined'&&permView){ permView.classList.remove('open','in-cfg'); }
  if (screen==='compose'){ $('#nvComposeScreen').classList.add('active'); nmodSetActive('nmodNew'); }
  else if (screen==='perm'){ $('#nvPermScreen').classList.add('active'); nmodSetActive('nmodPerm'); renderNewsPerm(); }
  else if (screen==='inter'){ $('#nvInterScreen').classList.add('active'); nmodSetActive('nmodInter'); if (typeof rcnRefresh==='function') rcnRefresh(); else renderInteractions(); }
  else if (screen==='cats'){ $('#nvCatsScreen').classList.add('active'); nmodSetActive('nmodCats'); renderNewsCats(); }
  else if (screen==='team'){ $('#nvTeamScreen').classList.add('active'); nmodSetActive('nmodPerm'); newsView.classList.add('catmode'); if($('#nmtPerm'))$('#nmtPerm').classList.remove('active'); if($('#nmtCfg'))$('#nmtCfg').classList.add('active'); cfgSetActive('cfgNavTeam'); teamRender(); }
  else if (screen==='params'){ $('#nvParamsScreen').classList.add('active'); nmodSetActive('nmodParams'); }
  else if (screen==='aprhome'){ $('#nvAprHomeScreen').classList.add('active'); nmodSetActive('nmodApr'); renderAprHome(); }
  else if (screen==='mod'){ $('#nvModScreen').classList.add('active'); nmodSetActive('nmodMod'); renderModQueue(); if(typeof aprSideSync==='function') aprSideSync('com'); }
  else if (screen==='pubappr'){ $('#nvPubApprScreen').classList.add('active'); nmodSetActive('nmodPubAppr'); renderPubAppr(); if(typeof aprSideSync==='function') aprSideSync('pub'); }
  else if (screen==='reelappr'){ $('#nvReelApprScreen').classList.add('active'); nmodSetActive('nmodPubAppr'); renderReelAppr(); if(typeof aprSideSync==='function') aprSideSync('reel'); }
  else if (screen==='article'){ $('#nvArticleScreen').classList.add('active'); nmodSetActive('nmodNew'); }
  else if (screen==='list'){ $('#nvListScreen').classList.add('active'); nmodSetActive('nmodPub'); if (typeof pglRefresh==='function') pglRefresh(); else renderNewsList(); }
  else if (screen==='cmgrid'){ $('#nvCmGridScreen').classList.add('active'); nmodSetActive('nmodCm'); if (typeof cmgRefresh==='function') cmgRefresh(); }
  else if (screen==='export'){ $('#nvExportScreen').classList.add('active'); nmodSetActive('nmodExport'); }
  else { $('#nvFeedScreen').classList.add('active'); nmodSetActive('nmodNew'); renderNewsFeed(); }
}

function renderAprHome(){ const cP=(MOD_QUEUE||[]).length; const pP=(PUB_APPR||[]).length; const a=$('#aprCardComN'); if(a)a.textContent=cP+' pendente'+(cP===1?'':'s'); const b=$('#aprCardPubN'); if(b)b.textContent=pP+' pendente'+(pP===1?'':'s'); }
$('#aprCardCom') && $('#aprCardCom').addEventListener('click', ()=>{ modFilter='pend'; newsShow('mod'); });
$('#aprCardPub') && $('#aprCardPub').addEventListener('click', ()=>{ pubFilter='pend'; newsShow('pubappr'); });
(function(){ NEWS.filter(n=>n.status==='pub').slice(0,6).forEach(n=>newsSeen.add(n.id)); })();
let nvfAuthorPage=1, nvFeedType='todos', nvFeedCat='', nvFeedAuthor='', nvfAuthorQuery='', nvFeedPeriod='', nvFeedReach='', nvFeedSort='recentes', nvFeedMine='', nvFeedText='';
function nvFeedDaysAgo(dstr){
  if(!dstr) return 0;
  /* Passa pelo fmtQuando, que resolve tanto "2 h" e "ontem" quanto 22/07/2026
     — antes as formas relativas nao casavam com a expressao e caiam no
     return 0, passando por qualquer janela. E compara com o agora do
     prototipo, nao com Date.now(), que hoje esta 41 dias a frente dos dados:
     era isso que fazia "Hoje", "7 dias" e "30 dias" devolverem a mesma lista. */
  var s = (typeof fmtQuando === 'function') ? fmtQuando({ date: dstr }) : String(dstr);
  var q = s.split(' ')[0].split('/');
  if (q.length !== 3) return 0;
  var d = new Date(+q[2], +q[1] - 1, +q[0]);
  var a = (typeof agoraProto === 'function') ? agoraProto() : new Date();
  var hoje = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  return Math.round((hoje - d) / 86400000);
}
/* Rotulos legiveis dos filtros do feed, como no Shorts: o estado guarda
   "minhas", "artigo", "7", e a ficha precisa mostrar o que a pessoa clicou. */
const NVF_ROTULO_TIPO    = { artigo:'Artigos', post:'Posts', midia:'Com mídia', enquete:'Enquetes' };
const NVF_ROTULO_MINHA   = { minhas:'Publicados por mim', curti:'Que eu curti',
                             comentei:'Que eu comentei', naovistos:'Não vistos' };
const NVF_ROTULO_ORDEM   = { curtidas:'Mais curtidas', comentadas:'Mais comentadas' };
const NVF_ROTULO_PERIODO = { '0':'Hoje', '1':'Hoje', '7':'Últimos 7 dias', '30':'Últimos 30 dias' };
function nvfFiltrosAtivos(){
  const f = [];
  /* a busca do header entra como ficha junto das outras, em vez do aviso
     solto de "Limpar busca" que existia embaixo dos filtros */
  if (nvSearchQuery)                         f.push({ chave:'pesquisa', rotulo:'Pesquisa', valor:nvSearchQuery });
  if (nvFeedType && nvFeedType !== 'todos') f.push({ chave:'tipo',    rotulo:'Tipo',      valor:NVF_ROTULO_TIPO[nvFeedType] || nvFeedType });
  if (nvFeedMine)                            f.push({ chave:'mine',    rotulo:'Atividade', valor:NVF_ROTULO_MINHA[nvFeedMine] || nvFeedMine });
  if (nvFeedCat)                             f.push({ chave:'cat',     rotulo:'Categoria', valor:nvFeedCat });
  if (nvFeedAuthor)                          f.push({ chave:'autor',   rotulo:'Autor',     valor:nvFeedAuthor });
  if (nvFeedPeriod)                          f.push({ chave:'periodo', rotulo:'Período',   valor:NVF_ROTULO_PERIODO[nvFeedPeriod] || nvFeedPeriod });
  if (nvFeedSort && nvFeedSort !== 'recentes') f.push({ chave:'ordem', rotulo:'Ordem',     valor:NVF_ROTULO_ORDEM[nvFeedSort] || nvFeedSort });
  if (nvFeedText)                            f.push({ chave:'texto',   rotulo:'Busca',     valor:nvFeedText });
  return f;
}
function nvfLimparFiltro(chave){
  if (chave === 'tipo')    nvFeedType = 'todos';
  if (chave === 'mine')    nvFeedMine = '';
  if (chave === 'cat')     nvFeedCat = '';
  if (chave === 'autor'){  nvFeedAuthor = ''; nvfAuthorQuery = ''; }
  if (chave === 'periodo'){ nvFeedPeriod = ''; const p = document.getElementById('nvfPeriod'); if (p) p.value = ''; }
  if (chave === 'ordem')   nvFeedSort = 'recentes';
  if (chave === 'texto'){  nvFeedText = ''; const t = document.getElementById('nvfTextSearch'); if (t) t.value = ''; }
  if (chave === 'pesquisa') nvfLimparPesquisa();
  renderNewsFeed();
}
/* a busca do header alimenta os dois feeds ao mesmo tempo, entao limpar de um
   lado tem de limpar do outro */
function nvfLimparPesquisa(){
  nvSearchQuery = '';
  const i = document.getElementById('nmodSearchIn'); if (i) i.value = '';
  const l = document.getElementById('nvfSearch'); if (l) l.value = '';
  if (typeof sbQuery !== 'undefined'){
    sbQuery = ''; sbShown = 12;
    const s = document.getElementById('sbSearch'); if (s) s.value = '';
    if (typeof renderShortsB === 'function') renderShortsB();
  }
  if (typeof buildStories === 'function') buildStories();
}
/* "Limpar filtros" e o botao do estado vazio zeram tudo, busca inclusive */
function nvfLimparTudo(){
  nvFeedType='todos'; nvFeedCat=''; nvFeedAuthor=''; nvfAuthorQuery=''; nvFeedPeriod='';
  nvFeedReach=''; nvFeedSort='recentes'; nvFeedMine=''; nvFeedText='';
  const ts=$('#nvfTextSearch'); if(ts) ts.value='';
  const hh=$('#nvfSearchHint'); if(hh) hh.hidden=true;
  const s=$('#nvfAuthorSearch'); if(s) s.value='';
  const p=$('#nvfPeriod'); if(p) p.value='';
  nvfLimparPesquisa();
  renderNewsFeed();
}
function nvfClearVis(){
  const barra = document.getElementById('nvfChipsBar'); if (!barra) return;
  const filtros = nvfFiltrosAtivos();
  barra.hidden = filtros.length === 0;
  const lb = document.getElementById('nvfClearLbl');
  if (lb) lb.textContent = 'Limpar filtros (' + filtros.length + ')';
  const cx = document.getElementById('nvfChips');
  if (cx) cx.innerHTML = filtros.map(function(f){
    return '<span class="sb-chip">' + f.rotulo + ': <b>' + f.valor + '</b>' +
      '<button type="button" class="sb-chipx" data-nvfchip="' + f.chave + '" aria-label="Remover filtro ' + f.rotulo + '">' +
      '<i class="fa-solid fa-xmark"></i></button></span>';
  }).join('');
}
document.addEventListener('click', function(e){
  const b = e.target.closest('[data-nvfchip]'); if (!b) return;
  nvfLimparFiltro(b.dataset.nvfchip);
});
function renderNvfFilters(){
  var pub=NEWS.filter(n=>n.status==='pub');
  var mine=NEWS.filter(n=>n.status==='pub' && ((n.author||'SULTS')==='SULTS' || n.article));
  var setT=function(id,v){ var e=$('#'+id); if(e) e.textContent=v; };
  setT('nvfPostTotal', mine.length);
  setT('nvfPostRede', mine.filter(n=>!n.reach || n.reach==='rede').length);
  setT('nvfPostUni', mine.filter(n=>n.reach==='unidades').length);
  setT('nvfPostArt', mine.filter(n=>n.article).length);
  var set=function(id,v){ var e=$('#'+id); if(e) e.textContent=v; };
  set('nvfnTodos', pub.length); set('nvfnArt', pub.filter(n=>n.article).length); set('nvfnPost', pub.filter(n=>!n.article).length);
  setT('nvfnMidia', pub.filter(n=>n.image||n.video||(n.images&&n.images.length)).length);
  setT('nvfnPoll', pub.filter(n=>n.poll).length);
  $$('.nvf-fitem').forEach(b=>{ if(b.dataset.fq!==undefined && b.dataset.fq!=='') b.classList.toggle('active', b.dataset.fq===nvFeedType); });
  $$('.nvf-reach').forEach(b=>b.classList.toggle('active', (b.dataset.reach||'')===nvFeedReach));
  setT('nvfnCurti', pub.filter(n=>newsLiked.has(n.id)).length);
  setT('nvfnComentei', pub.filter(n=>(n.cmts||[]).some(c=>(c.author||'').indexOf('Rodrigo')===0)).length);
  setT('nvfnMinhas', pub.filter(n=>(n.author||'SULTS')==='SULTS').length);
  setT('nvfnMinhas2', pub.filter(n=>(n.author||'SULTS')==='SULTS').length);
  setT('nvfnCurti2', pub.filter(n=>newsLiked.has(n.id)).length);
  $$('.nvf-mine').forEach(b=>b.classList.toggle('active', (b.dataset.mine||'')===nvFeedMine));
  $$('.nvf-sort').forEach(b=>b.classList.toggle('active', b.dataset.sort===nvFeedSort));
  var catBox=$('#nvfCats');
  if(catBox){
    catBox.innerHTML='<button class="nvf-fitem nvf-cli'+(nvFeedCat===''?' active':'')+'" data-cat=""><i class="fa-solid fa-layer-group"></i> Todas <span class="nvf-fn">'+pub.length+'</span></button>'+NEWS_CATS.map(function(c){
      var n=pub.filter(function(x){return (x.sub||'')===c.name;}).length;
      return '<button class="nvf-fitem nvf-cli'+(nvFeedCat===c.name?' active':'')+'" data-cat="'+c.name+'"><span class="nvf-cico" style="background:'+c.color+'"><i class="fa-solid '+(c.icon||'fa-tag')+'"></i></span> '+c.name+' <span class="nvf-fn">'+n+'</span></button>';
    }).join('');
  }
  nvfClearVis();
  var authBox=$('#nvfAuthors');
  if(authBox){
    var authors=[...new Set(pub.map(n=>n.article?'SULTS':(n.author||'SULTS')))];
    var q=(nvfAuthorQuery||'').toLowerCase();
    authors=authors.filter(a=>a.toLowerCase().includes(q));
    var per=6, pages=Math.max(1,Math.ceil(authors.length/per));
    if(nvfAuthorPage>pages) nvfAuthorPage=pages;
    var page=authors.slice((nvfAuthorPage-1)*per, nvfAuthorPage*per);
    var html=page.map(function(a){
      var p=PEOPLE.find(x=>x.name===a); var av=p?p.av:'av-brand';
      return '<button class="nvf-pickrow nvf-aitem'+(nvFeedAuthor===a?' on':'')+'" data-author="'+a+'"><span class="avatar '+av+'"></span><span>'+a+'</span><span class="nvf-pickradio"></span></button>';
    }).join('')||'<div class="nvf-fnone">Nenhum autor</div>';
    if(authors.length>per){
      var nums=''; for(var pn=1;pn<=pages;pn++) nums+='<button class="nvf-apgn'+(pn===nvfAuthorPage?' on':'')+'" data-apgto="'+pn+'">'+pn+'</button>';
      html+='<div class="nvf-apager">'+
        '<button class="nvf-apg" data-apgto="1"'+(nvfAuthorPage===1?' disabled':'')+'><i class="fa-solid fa-angles-left"></i></button>'+
        '<button class="nvf-apg" data-apg="-1"'+(nvfAuthorPage===1?' disabled':'')+'><i class="fa-solid fa-chevron-left"></i></button>'+
        nums+
        '<button class="nvf-apg" data-apg="1"'+(nvfAuthorPage===pages?' disabled':'')+'><i class="fa-solid fa-chevron-right"></i></button>'+
        '<button class="nvf-apg" data-apgto="'+pages+'"'+(nvfAuthorPage===pages?' disabled':'')+'><i class="fa-solid fa-angles-right"></i></button></div>';
    }
    authBox.innerHTML=html;
  }
  var ab=$('#nvfAuthorBtnLbl'); if(ab) ab.textContent = nvFeedAuthor || 'Todos os autores';
}
function feedCmList(n){
  return (n.cmts||[]).map((c,ci)=>'<div class="comment'+(c.pend?' pending':'')+'" data-ci="'+ci+'">'+
      '<span class="avatar '+(c.av||'av-rc')+'">'+(c.ini||'')+'</span>'+
      '<div class="comment-main">'+
        '<div class="comment-bubble">'+
          '<div class="comment-top"><span class="comment-name">'+(c.author||c.name||'')+'</span>'+
          '<span class="comment-time">'+(c.time||'agora')+'</span>'+
          '<div class="comment-menu"><button class="comment-dots" title="Opções"><i class="fa-solid fa-ellipsis"></i></button><div class="comment-drop" hidden><button class="comment-del" data-cmdel="'+ci+'"><i class="fa-solid fa-trash-can"></i> Excluir</button></div></div></div>'+
          '<div class="comment-role">'+(c.role||'SULTS')+'</div>'+
          '<div class="comment-text">'+String(c.text||'').replace(/</g,'&lt;')+'</div>'+
          (c.pend?'<div class="comment-modbar">'+
            '<span class="comment-pend"><i class="fa-solid fa-clock"></i> Aguardando aprovação</span>'+
            '<div class="comment-mod">'+
              '<button class="cmod-no" data-cmrej="'+ci+'"><i class="fa-solid fa-xmark"></i> Recusar</button>'+
              '<button class="cmod-ok" data-cmapr="'+ci+'"><i class="fa-solid fa-check"></i> Aprovar</button>'+
            '</div></div>':'')+
        '</div>'+
        '<div class="comment-actions"'+(c.pend?' style="display:none"':'')+'>'+
          '<button class="comment-act clike'+(c.liked?' liked':'')+'" data-cmlike="'+ci+'">Gostei</button>'+
          '<span class="comment-sep"'+(c.likes?'':' style="display:none"')+'></span>'+
          '<span class="comment-likes"'+(c.likes?'':' style="display:none"')+'><span class="rxs" data-rx="like"></span><b>'+(c.likes||0)+'</b></span>'+
        '</div>'+
      '</div></div>').join('');
}
/* barra de publicacao pendente: a mesma no post comum e no cartao de artigo */
function pendBarHTML(){
  return '<div class="nvf-modbar"><span class="nvf-modtx"><i class="fa-solid fa-clock"></i> Aguardando aprovação</span><span style="flex:1"></span><div class="comment-mod"><button class="cmod-no" data-act="pubrej"><i class="fa-solid fa-xmark"></i> Reprovar</button><button class="cmod-ok" data-act="pubapr"><i class="fa-solid fa-check"></i> Aprovar</button></div></div>';
}
function renderNewsFeed(){
  const el = $('#nvFeed');
  var q=(nvfAuthorQuery||'').toLowerCase();
  const list = NEWS.filter(n => {
    if(n.status!=='pub') return false;
    /* publicacao aguardando aprovacao so aparece para quem pode aprovar */
    if(n.pendAppr && typeof podeAprovar==='function' && !podeAprovar()) return false;
    if(nvSearchQuery){
      const t=rxNorm(nvSearchQuery);
      const hay=rxNorm([n.title||'',n.text||'',n.author||'',(n.article&&n.article.lead)||''].join(' '));
      if(!hay.includes(t)) return false;
    }
    if(n.removido) return false;
    if(nvFeedType==='artigo' && !n.article) return false;
    if(nvFeedType==='post' && n.article) return false;
    if(nvFeedType==='pinned' && !n.pinned) return false;
    if(nvFeedType==='midia' && !(n.image||n.video||(n.images&&n.images.length))) return false;
    if(nvFeedType==='enquete' && !n.poll) return false;
    if(nvFeedReach && (n.reach||'rede')!==nvFeedReach) return false;
    if(nvFeedMine==='curti' && !newsLiked.has(n.id)) return false;
    if(nvFeedMine==='comentei' && !((n.cmts||[]).some(c=>(c.author||'')===usuarioAtual().nome))) return false;
    if(nvFeedMine==='minhas' && !((n.author||'SULTS')==='SULTS')) return false;
    if(nvFeedMine==='naovistos' && newsSeen.has(n.id)) return false;
    if(nvFeedText){ var hay=((n.title||'')+' '+(n.text||'')+' '+(n.sub||'')+' '+(n.author||'')+' '+((n.article&&n.article.lead)||'')).toLowerCase(); if(!hay.includes(nvFeedText.toLowerCase())) return false; }
    if(nvFeedCat && (n.sub||'')!==nvFeedCat) return false;
    if(nvFeedAuthor && (n.article?'SULTS':(n.author||'SULTS'))!==nvFeedAuthor) return false;
    if(q){ var au=(n.article?'SULTS':(n.author||'SULTS')).toLowerCase(); if(!au.includes(q)) return false; }
    if(nvFeedPeriod){ var days=nvFeedDaysAgo(n.date); if(days>+nvFeedPeriod) return false; }
    return true;
  }).slice().sort((a,b)=>{
    if(nvFeedSort==='curtidas') return (b.reactions||0)-(a.reactions||0);
    if(nvFeedSort==='comentadas') return ((b.comments||0)+((b.cmts&&b.cmts.length)||0))-((a.comments||0)+((a.cmts&&a.cmts.length)||0));
    if(nvFeedType==='pinned') return 0;
    return (b.pinned?1:0)-(a.pinned?1:0);
  });
  renderNvfFilters();
  if (!list.length){
    el.innerHTML =
      '<div class="demo-empty-state de-resultado">' +
        '<img class="de-illu" src="uploads/illustra/nao-encontrado.gif" alt="" width="350" height="250">' +
        '<div class="de-title">Nenhuma publicação encontrada</div>' +
        '<div class="de-sub">Não encontramos publicações para a sua busca. Tente outros termos ou veja todas as publicações.</div>' +
        '<button type="button" class="de-btn" data-nvfvertodas>Ver todas as publicações</button>' +
      '</div>';
    return;
  }
  el.innerHTML = list.map(n => {
    const liked = newsLiked.has(n.id); const rc = n.reactions + (liked?1:0);
    const cc = n.comments + ((n.cmts&&n.cmts.length)||0);
    if (n.article){
      const menuA = '<div class="nvf-menu" hidden><button data-menu="pin"><i class="fa-solid fa-thumbtack"></i> '+(n.pinned?'Desafixar':'Fixar no topo')+'</button><button data-menu="copy"><i class="fa-solid fa-link"></i> Copiar link</button></div>';
      const pinA = (n.pinned && nvFeedType!=='pinned') ? '<span class="nvf-pinchip"><i class="fa-solid fa-thumbtack"></i> Fixado</span>' : '';
      const clapA = n.reactions>=120 ? '<span class="rxs" data-rx="celebrate"></span>' : '';
      return '<article class="card post nvf-artcard'+(n.pendAppr?' is-pend':'')+'" data-id="'+n.id+'">'+
        (n.pendAppr ? pendBarHTML() : '')+
        '<div class="post-head">'+(n.av?'<span class="avatar '+n.av+'"></span>':'<span class="avatar av-brand">'+BRAND_LOGO+'</span>')+'<div class="post-id"><div class="post-name">'+nomeComSelo(n)+pinA+'</div><div class="post-sub">'+postSub(n)+'</div><div class="post-meta">'+postMetaHTML(n)+'</div></div><button class="post-more" data-act="more"><i class="fa-solid fa-ellipsis"></i></button>'+menuA+'</div>'+
        '<div class="nvf-arthero" data-act="read"><img src="'+n.image+'"></div>'+
        '<div class="nvf-artbody"><div class="nvf-artkicker">'+catPillHTML(n.sub||'')+'</div><div class="nvf-arttitle" data-act="read">'+n.title+'</div><div class="nvf-artlead">'+n.article.lead+'</div>'+
        '<div class="nvf-artread" data-act="read">Ler artigo completo <i class="fa-solid fa-arrow-right"></i></div></div>'+
        (n.pendAppr ? '' :
        '<div class="post-stats"><span class="rx"><span class="rxs" data-rx="like"></span><span class="rxs" data-rx="love"></span>'+clapA+'</span><span class="rx-count">'+rc+'</span><span class="right nvf-cc">'+(cc?'Ver ':'')+cc+' comentários</span></div>'+
        '<div class="post-actions"><button class="p-act like'+(liked?' liked':'')+'" data-act="like"><i class="fa-'+(liked?'solid':'regular')+' fa-thumbs-up"></i> Gostei</button><button class="p-act" data-act="comment"><i class="fa-regular fa-comment"></i> Comentar</button></div>'+
        '<div class="nvf-cm" hidden><div class="nvf-cm-box"><span class="avatar av-rc"></span><div class="nvf-cm-field"><input class="nvf-cm-in" placeholder="Adicione um comentário..."><button class="nvf-cm-send" data-act="cmsend" disabled><i class="mdi mdi-send"></i></button></div></div><div class="nvf-cm-list">'+feedCmList(n)+'</div></div>')+
      '</article>';
    }
    const av = n.av ? '<span class="avatar '+n.av+'">'+(n.ini||'')+'</span>' : '<span class="avatar av-brand">'+BRAND_LOGO+'</span>';
    const nm = nomeComSelo(n);
    const pin = (n.pinned && nvFeedType!=='pinned') ? '<span class="nvf-pinchip"><i class="fa-solid fa-thumbtack"></i> Fixado</span>' : '';
    let banner = '';
    if (n.banner) banner = n.banner.variant==='bday'
      ? '<div class="post-img"><div class="banner bday"><span class="big-emoji">'+(n.banner.emoji||'🎉')+'</span><h4>'+n.banner.title+'</h4>'+(n.banner.sub?'<p>'+n.banner.sub+'</p>':'')+'</div></div>'
      : '<div class="post-img"><div class="banner">'+WHITE_LOGO+'<h4>'+n.banner.title+'</h4>'+(n.banner.sub?'<p>'+n.banner.sub+'</p>':'')+'</div></div>';
    const image = n.video ? '<div class="post-img"><video class="nvf-img" src="'+n.video+'" controls playsinline style="max-height:560px;background:#000"></video></div>' : n.yt ? ytPostHTML(n.yt, n.title) : ((n.images && n.images.length>1) ? '<div class="post-img">'+nvImgCollage(n.images,'post-imggrid')+'</div>' : (n.image ? '<div class="post-img"><img class="nvf-img" src="'+n.image+'"></div>' : ''));
    const event = n.event ? '<div class="nvf-event"><div class="ev-cal"><b>'+(n.event.day||'12')+'</b><span>'+(n.event.mon||'AGO')+'</span></div><div><h4>'+n.event.title+'</h4><p>'+(n.event.sub||'Clique para ver detalhes')+'</p></div></div>' : '';
    let poll = '';
    if (n.poll){ const tot=n.poll.options.reduce((s,o)=>s+o.v,0); const voted=n.poll.voted!=null; poll = '<div class="nvf-poll">'+n.poll.options.map((o,i)=>{ const pct=tot?Math.round(o.v/tot*100):0; return '<div class="nvf-poll-opt'+(n.poll.voted===i?' voted':'')+'" data-poll="'+i+'"><span class="nvf-poll-fill" style="width:'+(voted?pct:0)+'%"></span><span>'+o.t+'</span>'+(voted?'<span class="nvf-poll-pct">'+pct+'%</span>':'')+'</div>'; }).join('')+'</div>'; }
    const clap = n.reactions>=120 ? '<span class="rxs" data-rx="celebrate"></span>' : '';
    const txt = (n.text||'').replace(/\n/g,'<br>');
    const colored = n.colorBg ? '<div class="post-img"><div class="banner" style="background:'+n.colorBg+'">'+(n.colorEmoji?'<span class="big-emoji">'+n.colorEmoji+'</span>':'')+'<h4 style="font-size:24px">'+(n.text||'')+'</h4>'+(n.colorSub?'<p>'+n.colorSub+'</p>':'')+'</div></div>' : '';
    const bodyTxt = n.colorBg ? '' : txt;
    const cmList = feedCmList(n);
    const menu = '<div class="nvf-menu" hidden><button data-menu="edit"><i class="fa-solid fa-pen"></i> Editar publicação</button><button data-menu="pin"><i class="fa-solid fa-thumbtack"></i> '+(n.pinned?'Desafixar':'Fixar no topo')+'</button><button data-menu="copy"><i class="fa-solid fa-link"></i> Copiar link</button><button class="danger" data-menu="del"><i class="fa-solid fa-trash"></i> Excluir</button></div>';
    const pendBar = n.pendAppr ? pendBarHTML() : '';
    return '<article class="card post'+(n.pendAppr?' is-pend':'')+'" data-id="'+n.id+'">'+
      pendBar + '<div class="post-head">'+av+'<div class="post-id"><div class="post-name">'+nm+pin+'</div><div class="post-sub">'+postSub(n)+'</div><div class="post-meta">'+postMetaHTML(n, n.edited)+'</div></div><button class="post-more" data-act="more"><i class="fa-solid fa-ellipsis"></i></button>'+menu+'</div>'+
      (bodyTxt?'<p class="post-text nvf-postlink" data-act="open">'+bodyTxt+'</p>':'') + colored + banner + image + event + poll +
      (n.pendAppr ? '' :
      '<div class="post-stats"><span class="rx"><span class="rxs" data-rx="like"></span><span class="rxs" data-rx="love"></span>'+clap+'</span><span class="rx-count">'+rc+'</span><span class="right nvf-cc">'+(cc?'Ver ':'')+cc+' comentários</span></div>'+
      '<div class="post-actions"><button class="p-act like'+(liked?' liked':'')+'" data-act="like"><i class="fa-'+(liked?'solid':'regular')+' fa-thumbs-up"></i> Gostei</button><button class="p-act" data-act="comment"><i class="fa-regular fa-comment"></i> Comentar</button></div>'+
      '<div class="nvf-cm" hidden><div class="nvf-cm-box"><span class="avatar av-rc"></span><div class="nvf-cm-field"><input class="nvf-cm-in" placeholder="Adicione um comentário..."><button class="nvf-cm-send" data-act="cmsend" disabled><i class="mdi mdi-send"></i></button></div></div><div class="nvf-cm-list">'+cmList+'</div></div>') +
    '</article>';
  }).join('');
}
[[0,2],[3,5],[6,9],[9,14]].forEach(function(x,i){ const n=NEWS.filter(y=>y.status==='pub')[i*3]; if(n){ n.agendado = Date.now() + x[1]*86400000; } });
(function seedFeedPending(){
  try{
    const pub = NEWS.filter(n=>n.status==='pub' && !n.article)[1];
    if(pub){
      pub.pendAppr=true;
      if(typeof pubApprAdd==='function' && pub.paid==null) pubApprAdd(pub);
    }
    const alvo = NEWS.filter(n=>n.status==='pub' && !n.article && !n.pendAppr)[1];
    if(alvo){
      if(!alvo.cmts) alvo.cmts=[];
      const p=(typeof PEOPLE!=='undefined')?PEOPLE[3]:null;
      const cm={author:(p&&p.name)||'Marina Alves', av:(p&&p.av)||'av-ms', role:(p&&p.role)||'Operações',
        text:'Podemos divulgar isso para as unidades ainda esta semana?', time:'12 min', likes:0, pend:true};
      if(typeof modAdd==='function'){ modAdd({author:cm.author, av:cm.av, role:cm.role, text:cm.text, post:alvo.title||'Publicação', when:'12 min'}); cm.mid=modSeq; }
      alvo.cmts.unshift(cm);
    }
  }catch(e){}
})();
(function(){ try{
  if(typeof PUB_APPR!=='undefined' && PUB_APPR.length){
    if(PUB_APPR[0]) PUB_APPR[0].proc=true;
    if(PUB_APPR[1]) PUB_APPR[1].procFail=true;
  }
  var pubs = NEWS.filter(function(n){ return n.status==='pub' && !n.article && !n.proc && !n.procFail; });
  if(pubs[2]) pubs[2].proc=true;
  if(pubs[7]) pubs[7].removido=true;
  if(pubs[9]) pubs[9].removido=true;
}catch(e){} })();
let newsListFilter = 'todas';
let nlSort = { key:null, dir:1 };
function nvFmtDateTime(n){
  if(n.datetime && /\d{2}:\d{2}/.test(n.datetime)){ return n.datetime.replace(' às ',' ').replace(/(\d{2})\/(\d{2})\/\d{2}(\d{2})/,'$1/$2/$3'); }
  const now=new Date(2026,6,23,13,40); let d=new Date(now);
  const s=String(n.date||'').trim();
  let m;
  if((m=s.match(/^(\d+)\s*h/))) d=new Date(now-(+m[1])*3600000);
  else if(/agora/i.test(s)) d=now;
  else if(/ontem/i.test(s)) d=new Date(now-86400000);
  else if((m=s.match(/^(\d+)\s*d/))) d=new Date(now-(+m[1])*86400000);
  else if((m=s.match(/(\d{2})\/(\d{2})\/(\d{4})/))) d=new Date(+m[3],+m[2]-1,+m[1],9,14);
  const p=x=>('0'+x).slice(-2);
  return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+String(d.getFullYear()).slice(-2)+' '+p(d.getHours())+':'+p(d.getMinutes());
}
function renderNewsList(){
  let list = NEWS.slice();
  const fS=$('#nvFStatus')&&$('#nvFStatus').value, fC=$('#nvFCat')&&$('#nvFCat').value, fR=$('#nvFReach')&&$('#nvFReach').value, fA=$('#nvFAutor')&&$('#nvFAutor').value;
  list = list.filter(n=>n.status!=='draft');
  if(fS==='removido') list = list.filter(n=>n.removido);
  else { list = list.filter(n=>!n.removido); if(fS) list=list.filter(n=> n.agendado ? fS==='agendado' : fS==='pub'); }
  if(fC) list=list.filter(n=>(n.sub||'')===fC);
  if(fR) list=list.filter(n=>(n.reach||'rede')===fR);
  if(fA) list=list.filter(n=>(n.autorNome||'Rodrigo Caetano')===fA);
  if (newsListFilter==='post') list = list.filter(n=>!n.article);
  else if (newsListFilter==='article') list = list.filter(n=>!!n.article);
  if (newsQuery) list = list.filter(n => rxNorm(n.title).includes(rxNorm(newsQuery)) || rxNorm(n.author).includes(rxNorm(newsQuery)));
  const T=$('#nvNTodas'), P=$('#nvNPub'), D=$('#nvNDraft');
  if(T){ T.textContent=NEWS.length; P.textContent=NEWS.filter(n=>!n.article).length; D.textContent=NEWS.filter(n=>!!n.article).length; }
  $$('#nvListSeg button').forEach(b=>b.classList.toggle('active', b.dataset.f===newsListFilter));
  const el = $('#nvList');
  if (!list.length){ el.innerHTML = '<div class="cat-empty">Nenhuma publicação encontrada.</div>'; return; }
  if(nlSort.key){ const val=n=>{ switch(nlSort.key){ case 'title':return (n.title||n.text||'').toLowerCase(); case 'id':return n.id; case 'tipo':return n.article?'1':'0'; case 'views':return (n.views!=null?n.views:((n.reactions||0)*37+(n.comments||0)*112+240+(n.id||0)*53)); case 'autor':return (n.autorNome||'Rodrigo Caetano').toLowerCase(); case 'reach':return n.reach||'rede'; case 'cat':return (n.sub||'').toLowerCase(); case 'data':return n.id; case 'rx':return n.reactions||0; case 'cm':return n.comments||0; case 'status':return n.status; default:return 0; } }; list=list.slice().sort((a,b)=>{const x=val(a),y=val(b);return x<y?-nlSort.dir:x>y?nlSort.dir:0;}); }
  const thumb = n => n.procFail
    ? '<span class="rl-procthumb rl-failthumb" style="width:60px;height:46px"><i class="fa-solid fa-triangle-exclamation"></i></span>'
    : n.proc
    ? '<span class="rl-procthumb" style="width:60px;height:46px"><span class="rl-spin"></span></span>'
    : n.image
    ? '<span class="nv-lt-thumb" style="background-image:url('+n.image+')"></span>'
    : '<span class="nv-lt-thumb ph"><i class="fa-solid fa-'+(n.article?'newspaper':'align-left')+'"></i></span>';
  const rows = list.map(n => {
    const cat = newsCatByName(n.sub);
    const catCell = cat
      ? '<span class="nv-lt-cat"><span class="nv-lt-catic" style="background:'+cat.color+'"><i class="fa-solid '+(cat.icon||'fa-tag')+'"></i></span>'+cat.name+'</span>'
      : '<span style="color:#b8c2cc">,</span>';
    const dispTitle = n.title || (n.text ? n.text.replace(/<[^>]+>/g,'').replace(/\n/g,' ').slice(0,60) : 'Publicação');
    const tipo = n.article ? '<span class="nv-tp is-art"><i class="fa-solid fa-newspaper"></i> Artigo</span>' : '<span class="nv-tp is-post"><i class="fa-solid fa-align-left"></i> Post</span>';
    const reachMap = { rede:['fa-earth-americas','Toda a rede'], unidades:['fa-store','Unidades'], matriz:['fa-building','Sua Marca (Matriz)'] };
    const rc = reachMap[n.reach||'rede'];
    const reachCell = '<span class="nv-reach"><i class="fa-solid '+rc[0]+'"></i> '+rc[1]+'</span>';
    const autorNome = n.autorNome || 'Rodrigo Caetano';
    const autorAv = n.autorAv || 'av-rc';
    const autorOrig = (n.reach==='unidades') ? 'Unidade' : 'Matriz';
    const autorCell = '<span class="nv-author-cell"><span class="avatar '+autorAv+'"></span><span class="nv-author-txt"><b>'+autorNome+'</b><span>'+autorOrig+'</span></span></span>';
    const nvAgo = s => { const m=/(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/.exec(s||''); if(!m) return ''; const d=new Date(2000+ +m[3], +m[2]-1, +m[1], +m[4], +m[5]); const mins=Math.round((Date.now()-d)/60000); if(mins<1) return 'agora'; if(mins<60) return 'há '+mins+' min'; const hrs=Math.round(mins/60); if(hrs<24) return 'há '+hrs+(hrs===1?' hora':' horas'); const days=Math.round(hrs/24); if(days<30) return 'há '+days+(days===1?' dia':' dias'); const mo=Math.round(days/30); return 'há '+mo+(mo===1?' mês':' meses'); };
    const dtRaw = nvFmtDateTime(n);
    const dt = '<div>'+dtRaw+'</div><span>'+nvAgo(dtRaw)+'</span>';
    const nvIn = d => { const days=Math.max(1,Math.round((d-Date.now())/86400000)); const dd=new Date(d); const p=x=>String(x).padStart(2,'0'); return '<div>'+p(dd.getDate())+'/'+p(dd.getMonth()+1)+'/'+dd.getFullYear()+' '+p(dd.getHours())+':'+p(dd.getMinutes())+'</div><span>Em '+days+(days===1?' dia':' dias')+'</span>'; };
    const nvViews = x => { const v = x.views != null ? x.views : ((x.reactions||0)*37 + (x.comments||0)*112 + 240 + (x.id||0)*53); return typeof v==='number' ? v.toLocaleString('pt-BR') : v; };
    const rx = n.reactions||0;
    let rxIcons='<span class="nv-rxc"><span class="rxs" data-rx="like"></span>';
    if(rx>=90) rxIcons+='<span class="rxs" data-rx="love"></span>';
    if(rx>=120) rxIcons+='<span class="rxs" data-rx="celebrate"></span>';
    rxIcons+='</span> '+rx;
    return '<tr data-id="'+n.id+'">'+
      '<td class="perm-id">#'+n.id+'</td>'+
      '<td><div class="nv-list-title">'+thumb(n)+'<div><b>'+dispTitle+'</b>'+(n.procFail?'<span class="rl-failpill">Falha no processamento</span>':(n.proc?'<span class="rl-procpill">Em processamento</span>':''))+'</div></div></td>'+
      '<td class="nv-dtcell'+(n.agendado?' agendado':'')+'">'+(n.agendado? nvIn(n.agendado) : dt)+'</td>'+
      '<td>'+tipo+'</td>'+
      '<td>'+autorCell+'</td>'+
      '<td>'+reachCell+'</td>'+
      '<td>'+catCell+'</td>'+
      '<td style="white-space:nowrap">'+nvViews(n)+'</td>'+
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-open="rx" title="Ver quem interagiu"><span class="nv-rx-cell">'+rxIcons+'</span></button></td>'+
      '<td style="white-space:nowrap"><button class="nv-cellbtn" data-open="cm" title="Ver comentários"><i class="fa-solid fa-comment" style="font-size:13px;color:#2f6fe4"></i> '+n.comments+'</button></td>'+
      '<td><span class="nv-status '+(n.agendado?'agendado':n.status)+'">'+(n.agendado?'Agendado':(n.status==='pub'?'Publicada':'Rascunho'))+'</span></td>'+
      '<td class="rl-acts nv-actcell">'+
        '<button class="nv-actbtn danger" data-act="del"><i class="fa-solid fa-trash"></i> Excluir</button>'+
      '</td></tr>';
  }).join('');
  const cols=[['id','ID'],['title','Publicação'],['data','Dt. Publicação'],['tipo','Tipo'],['autor','Autor'],['reach','Alcance'],['cat','Categoria'],['views','Vistos'],['rx','Interações'],['cm','Comentários'],['status','Situação']];
  const ths=cols.map(c=>{const a=nlSort.key===c[0];const ar=a?(nlSort.dir===1?'<i class="fa-solid fa-arrow-up-short-wide"></i>':'<i class="fa-solid fa-arrow-down-wide-short"></i>'):'<i class="fa-solid fa-sort"></i>';return '<th class="nl-sortable'+(a?' active-sort':'')+'" data-sort="'+c[0]+'">'+c[1]+' <span class="sort-ic">'+ar+'</span></th>';}).join('')+'<th>Ações</th>';
  el.innerHTML = '<table><thead><tr>'+ths+'</tr></thead><tbody>'+rows+'</tbody></table>';
  el.querySelector('thead').addEventListener('click', ev=>{ const th=ev.target.closest('th.nl-sortable'); if(!th)return; const k=th.dataset.sort; if(nlSort.key===k) nlSort.dir=-nlSort.dir; else { nlSort.key=k; nlSort.dir=(k==='rx'||k==='cm'||k==='data')?-1:1; } renderNewsList(); });
}
$('#nvListSeg') && $('#nvListSeg').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b) return; newsListFilter=b.dataset.f; renderNewsList(); });
function nvUpdatePreview(){
  if (nvType === 'article'){ nvUpdateArtPreview(); return; }
}
let artCover = null, postColor = null, postImg = null;
function nvUpdateArtPreview(){
  const t = $('#nvArtTitle').value.trim(), s = $('#nvArtSub').value.trim(), b = ($('#nvArtBodyIn')?$('#nvArtBodyIn').innerText:'').trim();
  const pv = $('#nvArtPv');
  if (!pv) return;
  const firstPar = b ? b.split(/\n{2,}/)[0] : '';
  pv.innerHTML =
    (artCover ? '<img class="pv-cover" src="'+artCover+'">' : '') +
    '<div class="nv-pv-top"><span class="nv-logo">'+SULTS_LOGO+'</span><div><b>SULTS <svg class="verified" viewBox="0 0 24 24" aria-label="Verificado" role="img"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg></b><small>Artigo · agora</small></div></div>' +
    '<h4>'+(t||'Título do artigo')+'</h4>' +
    (s ? '<div class="pv-sub">'+s+'</div>' : '') +
    '<div class="pvtext'+(b?'':' empty')+'">'+(firstPar ? firstPar.replace(/</g,'&lt;') : 'O conteúdo do artigo aparece aqui.')+'</div>' +
    '<div class="nv-pv-foot"><span><i class="fa-regular fa-thumbs-up"></i> Gostei</span><span><i class="fa-regular fa-comment"></i> Comentar</span></div>';
}
function nvResetCompose(){
  if(typeof nvArtAdvClose==='function') nvArtAdvClose(); newsEditId=null; nvBanner=false; composeImg=null; nvEvent=false; composePoll=false; postColor=null; postImg=null; nvType=null; nvDest=null; NV_EMP.clear(); NV_PEO.clear(); if($('#nvpText'))$('#nvpText').value=''; if($('#nvpSub'))$('#nvpSub').value=''; if($('#nvpImgWrap'))$('#nvpImgWrap').hidden=true; if($('#nvpImgFile'))$('#nvpImgFile').value=''; if($('#nvpColors'))$('#nvpColors').classList.add('hidden'); if($('#nvpBody')){$('#nvpBody').classList.remove('colored');$('#nvpBody').style.background='';} artCover=null; if($('#nvArtTitle')){$('#nvArtTitle').value='';$('#nvArtSub').value='';$('#nvArtBodyIn').value='';$('#nvArtCover').classList.remove('has');$('#nvArtCoverFile').value='';} $$('.nv-tool').forEach(b=>b.classList.remove('active')); $$('.nv-tipo-card').forEach(c=>c.classList.remove('sel')); $('#nvComposeTitle').textContent='Novo artigo'; if($('#nvDefStartSeg')){ $$('#nvDefStartSeg button').forEach(x=>x.classList.toggle('on',x.dataset.s==='now')); $('#nvDefStartRow').style.display='none'; $('#nvDefStart').value=''; $$('#nvDefEndSeg button').forEach(x=>x.classList.toggle('on',x.dataset.s==='never')); $('#nvDefEndRow').style.display='none'; $('#nvDefEnd').value=''; } nvGoStep('tipo'); }
function nvEdit(id){ const n = NEWS.find(x=>x.id===id); if(!n) return; if(n.article){ newsEditId=id; nvType='article'; nvFrom='list'; openNewsModule(); nvResetCompose(); newsEditId=id; nvType='article'; $('#nvArtTitle').value=n.title||''; $('#nvArtSub').value=(n.article.lead)||''; if($('#nvArtBodyIn')) $('#nvArtBodyIn').innerHTML=n.article.html||(n.article.paras?n.article.paras.map(p=>'<p>'+p+'</p>').join(''):''); artCover=n.image||null; if(artCover){$('#nvArtCoverImg').src=artCover;$('#nvArtCover').classList.add('has');} $('#nvComposeTitle').textContent='Editar artigo'; newsShow('compose'); nvGoStep('content'); nvUpdateArtPreview(); return; } qpOpenEdit(n); }
function qpOpenEdit(n){ qpOpen(); qpEditId=n.id; $('#qpText').value=(n.text||'').replace(/<br>/g,'\n'); qpImgs=(n.images?n.images.slice():(n.image&&!n.colorBg?[n.image]:[])); qpVideo=n.video||null; if(n.colorBg){ qpRenderColors(); qpSetColor(n.colorBg); $('#qpToolColor').classList.add('on'); $('#qpColors').classList.remove('hidden'); $('#qpSub').value=n.colorSub||''; qpBig=n.colorEmoji||null; if(qpBig)(document.getElementById('qpBigEmojiVal')||{}).textContent=qpBig; } qpRenderImgs(); if(n.sub) qpCatSel=n.sub, qpCatRender(); $('#qpPub').disabled=false; }
function openNewsModule(){ closeStories(); closeForum(); newsView.classList.remove('user-mode'); newsView.classList.add('open','mod-mode'); nmodSide.classList.remove('open'); document.body.style.overflow='hidden'; setNav(null); newsQuery=''; const s=$('#nvSearch'); if(s)s.value=''; newsShow('list'); }
function closeNewsModule(){ if(typeof nvArtAdvClose==='function') nvArtAdvClose(); nmodSide.classList.remove('open'); newsView.classList.remove('open','user-mode','mod-mode'); reelsView.classList.remove('in-social','in-cfg','in-module'); closeStories(); if(!reelsPlayer.classList.contains('open')) document.body.style.overflow=''; }
function openNewsUser(){ closeStories(); closeForum(); nmodSide.classList.remove('open'); newsView.classList.remove('mod-mode'); newsView.classList.add('open','user-mode'); document.body.style.overflow='hidden'; setNav($('#navNews')); newsShow('feed'); }
$('#navNews') && $('#navNews').addEventListener('click', e => { e.preventDefault(); openNewsUser(); });
$('#tileNews').addEventListener('click', e => { e.preventDefault(); openNewsModule(); newsShow('feed'); });
$('#homeSeeAllPubs') && $('#homeSeeAllPubs').addEventListener('click', e => { e.preventDefault(); if(typeof abrirModuloSocial==='function'){ abrirModuloSocial('feed'); } else { openNewsModule(); newsShow('feed'); } });
$('#nvManageBtn') && $('#nvManageBtn').addEventListener('click', openNewsModule);
$('#homePublish') && $('#homePublish').addEventListener('click', e => { e.preventDefault(); qpOpen(); });
$('#homeStart') && $('#homeStart').addEventListener('click', () => qpOpen());
$('#homeQImg') && $('#homeQImg').addEventListener('click', () => qpOpen('img'));
$('#homeQColor') && $('#homeQColor').addEventListener('click', () => qpOpen('color'));
$('#homeQAdv') && $('#homeQAdv').addEventListener('click', () => { qpOpen(); $('#qpAdv').click(); });
$('#homeQVideo') && $('#homeQVideo').addEventListener('click', () => qpOpen('video'));
$('#homeQArt') && $('#homeQArt').addEventListener('click', () => { openNewsModule(); nvFrom='feed'; nvResetCompose(); nvType='article'; $$('.nv-tipo-card[data-type]').forEach(c=>c.classList.toggle('sel',c.dataset.type==='article')); newsShow('compose'); nvGoStep('content'); });
$('#nmodApps').addEventListener('click', () => { closeNewsModule(); setNav($('#navHome')); });
$('#nmodPub').addEventListener('click', () => newsShow('list'));
$('#nmodPerm').addEventListener('click', () => newsShow('perm'));
$('#nmodCats').addEventListener('click', () => newsShow('cats'));
const NEWS_CAT_ICONS = ['fa-bullhorn','fa-calendar-day','fa-hand-holding-heart','fa-box','fa-arrow-trend-up','fa-trophy','fa-newspaper','fa-star','fa-lightbulb','fa-graduation-cap','fa-users','fa-gift','fa-fire','fa-bell','fa-briefcase','fa-heart'];
let nvCatQuery='', nvCatEditId=null, nvCatColor=CAT_COLORS[0], nvCatIcon=NEWS_CAT_ICONS[0];
function newsCatByName(name){ return NEWS_CATS.find(c=>c.name===name); }
function newsCatCount(name){ return NEWS.filter(n=>(n.sub||'')===name).length; }
const NV_ICON_EDIT='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"/></svg>';
const NV_ICON_CANCEL='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z"/></svg>';
const NV_SORT_ICONS = {
  swap:'<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12,6L7,11H17L12,6M7,13L12,18L17,13H7Z"/></svg>',
  up:'<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7,15L12,10L17,15H7Z"/></svg>',
  down:'<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7,10L12,15L17,10H7Z"/></svg>'
};
let nvCatSortCol=null, nvCatSortDir=0; // dir: 0 neutro, 1 asc (up), 2 desc (down)
function nvCatTh(label,col,style){
  const dir=(nvCatSortCol===col)?nvCatSortDir:0;
  const icon=dir===1?NV_SORT_ICONS.up:dir===2?NV_SORT_ICONS.down:NV_SORT_ICONS.swap;
  return '<th'+(style?' style="'+style+'"':'')+'><span class="cat-th-in"><span>'+label+'</span>'+
    '<button type="button" class="cat-sortbtn" data-sortcol="'+col+'" aria-label="Ordenar por '+label+'">'+icon+'</button></span></th>';
}
function renderNewsCats(){
  const q=rxNorm(nvCatQuery);
  const list=NEWS_CATS.filter(c=>(nvCatStatus==='inativos' ? c.active===false : c.active!==false) && (!q||rxNorm(c.name).includes(q)));
  const el=$('#nvCatList');
  if(!list.length){ el.innerHTML='<div class="cat-empty">Nenhuma categoria '+(nvCatStatus==='inativos'?'inativa':'ativa')+'.</div>'; return; }
  const reelCount = name => { const cat=(typeof CATEGORIES!=='undefined'?CATEGORIES.find(x=>x.name===name):null); return (cat&&typeof REELS_DATA!=='undefined') ? REELS_DATA.filter(r=>r.cat===cat.id).length : 0; };
  if(nvCatSortDir){
    const dir=nvCatSortDir===1?1:-1;
    if(nvCatSortCol==='name') list.sort((a,b)=>dir*a.name.localeCompare(b.name));
    else if(nvCatSortCol==='pub') list.sort((a,b)=>dir*(newsCatCount(a.name)-newsCatCount(b.name)));
    else if(nvCatSortCol==='shorts') list.sort((a,b)=>dir*(reelCount(a.name)-reelCount(b.name)));
  }
  el.innerHTML='<table><thead><tr>'+
    nvCatTh('Categoria ('+list.length+')','name')+
    nvCatTh('Publicações','pub')+
    nvCatTh('Shorts','shorts')+
    '<th style="text-align:center">Ações</th></tr></thead><tbody>'+
    list.map(c=>'<tr data-id="'+c.id+'"><td><div class="cat-name"><span class="cat-ic" style="background:'+c.color+'"><i class="fa-solid '+(c.icon||'fa-tag')+'"></i></span><span class="cat-nm">'+c.name+'</span></div></td>'+
      '<td style="white-space:nowrap">'+newsCatCount(c.name)+' publicações</td>'+
      '<td style="white-space:nowrap">'+reelCount(c.name)+' shorts</td>'+
      '<td class="rl-acts"><div class="cat-actwrap"><button class="cat-editbtn" data-act="edit" title="Editar">'+NV_ICON_EDIT+'<span class="cat-btl">Editar</span></button>'+
      '<button class="cat-arch" data-act="arch" title="'+(c.active!==false?'Inativar':'Reativar')+'">'+(c.active!==false?NV_ICON_CANCEL:'<i class="fa-solid fa-rotate-left"></i>')+'<span class="cat-btl">'+(c.active!==false?'Inativar':'Reativar')+'</span></button></div></td></tr>').join('')+'</tbody></table>';
}
function nvCatSwatches(){ $('#nvCatSw').innerHTML=CAT_COLORS.map(c=>'<span class="cat-sw'+(c===nvCatColor?' sel':'')+'" data-col="'+c+'" style="background:'+c+'">'+(c===nvCatColor?'<i class="fa-solid fa-check"></i>':'')+'</span>').join(''); }
function nvCatIcons(){ $('#nvCatIcons').innerHTML=NEWS_CAT_ICONS.map(ic=>'<span class="cat-icpick'+(ic===nvCatIcon?' sel':'')+'" data-ic="'+ic+'"><i class="fa-solid '+ic+'"></i></span>').join(''); }
function nvCatOpenModal(id){ nvCatEditId=id||null; const c=id?NEWS_CATS.find(x=>x.id===id):null; $('#nvCatModalTitle').textContent=c?'Editar categoria':'Nova categoria'; $('#nvCatName').value=c?c.name:''; nvCatColor=c?c.color:CAT_COLORS[0]; nvCatIcon=c?(c.icon||NEWS_CAT_ICONS[0]):NEWS_CAT_ICONS[0]; nvCatSwatches(); nvCatIcons(); $('#nvCatModal').classList.add('open'); setTimeout(()=>$('#nvCatName').focus(),30); }
$('#nvCatAdd').addEventListener('click', ()=>nvCatOpenModal());
let nvCatStatus='ativos';
$('#nvCatSeg') && $('#nvCatSeg').addEventListener('change', e=>{ nvCatStatus=e.target.value; renderNewsCats(); });
$('#nvCatSearch').addEventListener('input', e=>{ nvCatQuery=e.target.value; renderNewsCats(); });
$('#nvCatList').addEventListener('click', e=>{ const _tr=e.target.closest('tr'), _a=e.target.closest('[data-act]');
  if(_tr && _a && _a.dataset.act==='arch'){ const c=NEWS_CATS.find(x=>x.id===_tr.dataset.id); if(c){ c.active = c.active===false; renderNewsCats(); syncNewsCatSelect(); fgToast(c.active===false?'Categoria inativada':'Categoria reativada'); } return; }
  const tr=e.target.closest('tr'); if(!tr) return; const act=e.target.closest('[data-act]'); if(!act) return; const id=tr.dataset.id; if(act.dataset.act==='edit') nvCatOpenModal(id); else { NEWS_CATS=NEWS_CATS.filter(c=>c.id!==id); renderNewsCats(); fgToast('Categoria excluída'); } });
$('#nvCatList').addEventListener('click', e=>{
  const btn=e.target.closest('.cat-sortbtn'); if(!btn) return;
  const col=btn.dataset.sortcol;
  if(nvCatSortCol!==col){ nvCatSortCol=col; nvCatSortDir=1; }
  else if(nvCatSortDir===1){ nvCatSortDir=2; }
  else { nvCatSortCol=null; nvCatSortDir=0; }
  renderNewsCats();
});
$('#nvCatSw').addEventListener('click', e=>{ const s=e.target.closest('.cat-sw'); if(!s) return; nvCatColor=s.dataset.col; nvCatSwatches(); });
$('#nvCatIcons').addEventListener('click', e=>{ const s=e.target.closest('.cat-icpick'); if(!s) return; nvCatIcon=s.dataset.ic; nvCatIcons(); });
$('#nvCatModalClose').addEventListener('click', ()=>$('#nvCatModal').classList.remove('open'));
$('#nvCatCancel').addEventListener('click', ()=>$('#nvCatModal').classList.remove('open'));
$('#nvCatModal').addEventListener('click', e=>{ if(e.target===$('#nvCatModal')) $('#nvCatModal').classList.remove('open'); });
$('#nvCatHelpClose').addEventListener('click', ()=>$('#nvCatHelpModal').classList.remove('open'));
$('#nvCatHelpDoubt').addEventListener('click', ()=>$('#nvCatHelpModal').classList.remove('open'));
$('#nvCatHelpOk').addEventListener('click', ()=>$('#nvCatHelpModal').classList.remove('open'));
$('#nvCatHelpModal').addEventListener('click', e=>{ if(e.target===$('#nvCatHelpModal')) $('#nvCatHelpModal').classList.remove('open'); });
$('#nvCatSave').addEventListener('click', ()=>{ const name=$('#nvCatName').value.trim(); if(!name){ $('#nvCatName').focus(); return; } if(nvCatEditId){ const c=NEWS_CATS.find(x=>x.id===nvCatEditId); if(c){c.name=name;c.color=nvCatColor;c.icon=nvCatIcon;} fgToast('Categoria atualizada'); } else { NEWS_CATS.push({id:rxNorm(name).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||('cat-'+Date.now()),name:name,color:nvCatColor,icon:nvCatIcon}); fgToast('Categoria criada'); } $('#nvCatModal').classList.remove('open'); renderNewsCats(); syncNewsCatSelect(); });
function syncNewsCatSelect(){ if(typeof nvArtCatRender==='function') nvArtCatRender(); if(typeof crCatRender==='function') crCatRender();
  const sel=$('#nvDefCat'); if(sel){ const cur=sel.value; sel.innerHTML='<option value="">Sem categoria</option>'+NEWS_CATS.map(c=>'<option>'+c.name+'</option>').join(''); sel.value=cur; } if($('#qpCatBtn')){ if(!qpCatSel||!NEWS_CATS.find(c=>c.name===qpCatSel)) qpCatSel=NEWS_CATS[0].name; qpCatRender(); } }
let qpAud='rede';
$('#qpAudBtn') && $('#qpAudBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#qpAudMenu'); m.hidden=!m.hidden; });
$('#qpAudMenu') && $('#qpAudMenu').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b) return; fgToast('Nota DEV: mostra apenas para EMPRESA PRINCIPAL / MATRIZ. Unidades sempre publica para TODOS'); qpAud=b.dataset.aud; $('#qpAudLbl').textContent=b.textContent.trim(); $('#qpAudIc').className='fa-solid '+b.dataset.ic; $('#qpAudMenu').hidden=true; });
document.addEventListener('click', e=>{
  const rl=e.target.closest('.post-sub,.comment-role,.nv-author-txt>span,.sb-author b,.itbl-prole,.rl-emp,.profile-role,.nvf-prole,.pp-role');
  if(rl){ e.stopPropagation(); fgToast('Nota DEV: se mais de uma relação empresarial trazer como N unidades vinculadas, sem o cargo'); return; }
});
document.addEventListener('click', e=>{ const m=$('#qpAudMenu'); if(m && !e.target.closest('.qp-audwrap') && !e.target.closest('.nv-def-aud')) m.hidden=true; });
let nvArtAud='rede';
$('#nvArtAudBtn') && $('#nvArtAudBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#nvArtAudMenu'); m.hidden=!m.hidden; });
$('#nvArtAudMenu') && $('#nvArtAudMenu').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b) return; fgToast('Nota DEV: mostra apenas para EMPRESA PRINCIPAL / MATRIZ. Unidades sempre publica para TODOS'); nvArtAud=b.dataset.aud; $('#nvArtAudLbl').textContent=b.textContent.trim(); $('#nvArtAudIc').className='fa-solid '+b.dataset.ic; $('#nvArtAudMenu').hidden=true; });
document.addEventListener('click', e=>{ const m=$('#nvArtAudMenu'); if(m && !e.target.closest('.qp-audwrap') && !e.target.closest('.nv-def-aud')) m.hidden=true; });
let nvArtUnit=null;
function nvArtUnitRender(){
  const m=$('#nvArtUnitMenu'); if(!m) return;
  m.innerHTML='<button type="button" data-unit=""><i class="fa-solid fa-ban"></i>Não vincular unidade</button>'+
    STORES.map(s=>'<button type="button" data-unit="'+s.code+'"><span class="qp-unitini" style="background:'+s.color+'">'+s.ini+'</span>'+s.name+'</button>').join('');
}
$('#nvArtUnitBtn') && $('#nvArtUnitBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#nvArtUnitMenu'); if(!m.innerHTML) nvArtUnitRender(); m.hidden=!m.hidden; });
$('#nvArtUnitMenu') && $('#nvArtUnitMenu').addEventListener('click', e=>{
  const b=e.target.closest('button'); if(!b) return;
  fgToast('Nota DEV: apareço apenas para unidades quando elas têm mais de um vínculo empresarial');
  nvArtUnit=b.dataset.unit||null;
  const s=STORES.find(x=>x.code===nvArtUnit);
  $('#nvArtUnitLbl').textContent = s ? s.name : 'Não vincular unidade';
  $('#nvArtUnitMenu').hidden=true;
});
document.addEventListener('click', e=>{ const m=$('#nvArtUnitMenu'); if(m && !e.target.closest('.qp-unitwrap')) m.hidden=true; });
function advMoveAud(slotId, btnId, menuId){
  const s=document.getElementById(slotId), b=document.getElementById(btnId), m=document.getElementById(menuId);
  if(!s||!b||s.contains(b)) return;
  b.classList.remove('qp-audhidden');
  s.appendChild(b); if(m) s.appendChild(m);
}
let qpUnit=null;
function qpUnitRender(){
  const m=$('#qpUnitMenu'); if(!m) return;
  m.innerHTML='<button type="button" data-unit=""><i class="fa-solid fa-ban"></i>Não vincular unidade</button>'+
    STORES.map(s=>'<button type="button" data-unit="'+s.code+'"><span class="qp-unitini" style="background:'+s.color+'">'+s.ini+'</span>'+s.name+'</button>').join('');
}
$('#qpUnitBtn') && $('#qpUnitBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#qpUnitMenu'); if(!m.innerHTML) qpUnitRender(); m.hidden=!m.hidden; });
$('#qpUnitMenu') && $('#qpUnitMenu').addEventListener('click', e=>{
  const b=e.target.closest('button'); if(!b) return;
  fgToast('Nota DEV: apareço apenas para unidades quando elas têm mais de um vínculo empresarial');
  qpUnit=b.dataset.unit||null;
  const s=STORES.find(x=>x.code===qpUnit);
  $('#qpUnitLbl').textContent = s ? s.name : 'Não vincular unidade';
  $('#qpUnitIc').className = s ? 'fa-solid fa-store' : 'fa-solid fa-store';
  $('#qpUnitMenu').hidden=true;
});
document.addEventListener('click', e=>{ const m=$('#qpUnitMenu'); if(m && !e.target.closest('.qp-unitwrap')) m.hidden=true; });
let qpCatSel=null;
var nvArtCatSel=null;
function qpCatRender(){ const c=NEWS_CATS.find(x=>x.name===qpCatSel)||NEWS_CATS[0]; $('#qpCatLbl').textContent=c.name; $('#qpCatIc').style.background=c.color; $('#qpCatIc').innerHTML='<i class="fa-solid '+(c.icon||'fa-tag')+'"></i>'; $('#qpCatMenu').innerHTML=NEWS_CATS.map(x=>'<button data-cat="'+x.name+'"><span class="qp-cat-ic" style="background:'+x.color+'"><i class="fa-solid '+(x.icon||'fa-tag')+'"></i></span>'+x.name+'</button>').join(''); }
$('#qpCatBtn') && $('#qpCatBtn').addEventListener('click', e=>{ e.stopPropagation(); $('#qpCatMenu').hidden=!$('#qpCatMenu').hidden; });
$('#qpCatMenu') && $('#qpCatMenu').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b)return; fgToast('Nota DEV: esse botão de categoria aparece apenas para matriz / unidade principal. Unidades fazem post com categoriaId NULL'); qpCatSel=b.dataset.cat; qpCatRender(); $('#qpCatMenu').hidden=true; });
document.addEventListener('click', e=>{ if($('#qpCatMenu') && !e.target.closest('.qp-catwrap')) $('#qpCatMenu').hidden=true; });
var crAud='rede';
$('#crAudBtn') && $('#crAudBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#crAudMenu'); m.hidden=!m.hidden; });
$('#crAudMenu') && $('#crAudMenu').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b) return; fgToast('Nota DEV: mostra apenas para EMPRESA PRINCIPAL / MATRIZ. Unidades sempre publica para TODOS'); crAud=b.dataset.aud; $('#crAudLbl').textContent=b.textContent.trim(); $('#crAudIc').className='fa-solid '+b.dataset.ic; $('#crAudMenu').hidden=true; });
document.addEventListener('click', e=>{ if($('#crAudMenu') && !e.target.closest('.cr-audwrap')) $('#crAudMenu').hidden=true; });
var crCatSel=null;
function crCatRender(){
  const list=(typeof CATEGORIES!=='undefined')?CATEGORIES.filter(c=>c.active!==false):[];
  const c=list.find(x=>x.name===crCatSel)||list[0]; if(!c||!$('#crCatLbl')) return;
  crCatSel=c.name;
  $('#crCatLbl').textContent=c.name;
  $('#crCatIc').style.background=c.color;
  $('#crCatIc').innerHTML='<i class="fa-solid '+c.icon+'"></i>';
  $('#crCatMenu').innerHTML=list.map(x=>'<button type="button" data-cat="'+x.name+'"><span class="qp-cat-ic" style="background:'+x.color+'"><i class="fa-solid '+x.icon+'"></i></span>'+x.name+'</button>').join('');
}
$('#crCatBtn') && $('#crCatBtn').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#crCatMenu'); m.hidden=!m.hidden; });
$('#crCatMenu') && $('#crCatMenu').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b) return; fgToast('Nota DEV: esse botão de categoria aparece apenas para matriz / unidade principal. Unidades fazem post com categoriaId NULL'); crCatSel=b.dataset.cat; crCatRender(); $('#crCatMenu').hidden=true; });
document.addEventListener('click', e=>{ if($('#crCatMenu') && !e.target.closest('.cr-catwrap')) $('#crCatMenu').hidden=true; });
crCatRender();
syncNewsCatSelect();
function newsViews(n){ return n.reactions*7 + (n.comments+((n.cmts&&n.cmts.length)||0))*11 + 140; }
$('#nmodNew') && $('#nmodNew').addEventListener('click', () => newsShow('feed'));
$('#nvNewBtn') && $('#nvNewBtn').addEventListener('click', () => qpOpen());
(function(){ const c=$('#nvFCat'); if(c) c.innerHTML='<option value="">Todas as categorias</option>'+NEWS_CATS.map(x=>'<option>'+x.name+'</option>').join(''); const a=$('#nvFAutor'); if(a){ const autores=[...new Set(NEWS.map(n=>n.autorNome||'Rodrigo Caetano'))]; a.innerHTML='<option value="">Todos os autores</option>'+autores.map(x=>'<option>'+x+'</option>').join(''); } ['nvFStatus','nvFCat','nvFReach','nvFAutor'].forEach(id=>{ const el=$('#'+id); if(el) el.addEventListener('change', renderNewsList); }); const cl=$('#nvFClear'); if(cl) cl.addEventListener('click', ()=>{ ['nvFStatus','nvFCat','nvFReach','nvFAutor'].forEach(id=>{const el=$('#'+id); if(el)el.value='';}); renderNewsList(); }); const ap=$('#nvFApply'); if(ap) ap.addEventListener('click', renderNewsList); })();
$('#nvfStart') && $('#nvfStart').addEventListener('click', () => qpOpen());
$('#nvfClear') && $('#nvfClear').addEventListener('click', nvfLimparTudo);
document.addEventListener('click', function(e){
  if(e.target.closest('[data-nvfvertodas]')) nvfLimparTudo();
  if(e.target.closest('[data-sbvertodos]')){ nvfLimparPesquisa(); sbClearAll(); }
});
function nvfFiltroClick(e){
  var fi=e.target.closest('.nvf-fitem'); if(fi && fi.dataset.cat===undefined && fi.dataset.fq!==undefined){ nvFeedType=fi.dataset.fq; renderNewsFeed(); return; }
  var rc=e.target.closest('.nvf-reach'); if(rc){ nvFeedReach=rc.dataset.reach||''; renderNewsFeed(); return; }
  var mi=e.target.closest('.nvf-mine'); if(mi){ nvFeedMine=mi.dataset.mine||''; renderNewsFeed(); return; }
  var so=e.target.closest('.nvf-sort'); if(so){ nvFeedSort=so.dataset.sort; renderNewsFeed(); return; }
  var cc=e.target.closest('[data-cat]'); if(cc){ nvFeedCat=cc.dataset.cat; renderNewsFeed(); return; }
  var ai=e.target.closest('.nvf-aitem'); if(ai){ nvFeedAuthor = (nvFeedAuthor===ai.dataset.author?'':ai.dataset.author); renderNewsFeed(); return; }
}
/* o mesmo handler na coluna lateral e na folha de filtros do celular, para
   onde os cartoes sao movidos */
$('.nvf-layout') && $('.nvf-layout').addEventListener('click', nvfFiltroClick);
$('#filtroSheetBody') && $('#filtroSheetBody').addEventListener('click', nvfFiltroClick);
$('#nvfAuthorBtn') && $('#nvfAuthorBtn').addEventListener('click', function(){ nvfAuthorQuery=''; var s=$('#nvfAuthorSearch'); if(s) s.value=''; renderNvfFilters(); $('#authorPickModal').classList.add('open'); });
$('#authorPickClose') && $('#authorPickClose').addEventListener('click', ()=>$('#authorPickModal').classList.remove('open'));
$('#authorPickModal') && $('#authorPickModal').addEventListener('click', function(e){ if(e.target===$('#authorPickModal')) $('#authorPickModal').classList.remove('open'); });
$('#nvfAuthorSearch') && $('#nvfAuthorSearch').addEventListener('input', function(e){ nvfAuthorQuery=e.target.value.trim(); nvfAuthorPage=1; renderNvfFilters(); });
$('#nvfAuthors') && $('#nvfAuthors').addEventListener('click', function(e){
  var to=e.target.closest('[data-apgto]'); if(to){ if(to.disabled) return; e.stopPropagation(); nvfAuthorPage=+to.dataset.apgto; renderNvfFilters(); return; }
  var pick=e.target.closest('[data-author]');
  if(pick){ nvFeedAuthor = (nvFeedAuthor===pick.dataset.author?'':pick.dataset.author); $('#authorPickModal').classList.remove('open'); renderNewsFeed(); return; }
  var b=e.target.closest('[data-apg]'); if(!b||b.disabled) return; e.stopPropagation(); nvfAuthorPage=Math.max(1,nvfAuthorPage+ +b.dataset.apg); renderNvfFilters();
});
$('#nvfPeriod') && $('#nvfPeriod').addEventListener('change', function(e){ nvFeedPeriod=e.target.value; renderNewsFeed(); });
$('#nvfTextSearch') && $('#nvfTextSearch').addEventListener('input', function(e){ nvFeedText=e.target.value.trim(); renderNewsFeed(); var hint=$('#nvfSearchHint'); if(hint){ if(nvFeedText){ hint.hidden=false; hint.textContent=document.querySelectorAll('#nvFeed .post').length+' resultado(s) para "'+nvFeedText+'"'; } else hint.hidden=true; } });
$('#nvfMinhas') && $('#nvfMinhas').addEventListener('click', function(){ nvFeedAuthor='SULTS'; renderNewsFeed(); });
$('#nvqImg').addEventListener('click', () => qpOpen('img'));
$('#nvqColor').addEventListener('click', () => qpOpen('color'));
$('#nvqAdv') && $('#nvqAdv').addEventListener('click', () => { qpOpen(); $('#qpAdv').click(); });
$('#nvqVideo') && $('#nvqVideo').addEventListener('click', () => qpOpen('video'));
$('#nvqArt').addEventListener('click', () => { nvFrom='feed'; nvResetCompose(); nvType='article'; $$('.nv-tipo-card[data-type]').forEach(c=>c.classList.toggle('sel',c.dataset.type==='article')); newsShow('compose'); nvGoStep('content'); });
/* Quick post modal */
const QP_COLORS=['linear-gradient(135deg,#0f5a63,#1aa0a0)','linear-gradient(135deg,#2a2578,#4b3fc7)','linear-gradient(135deg,#8e1f24,#c0392f)','linear-gradient(135deg,#0b3d2e,#1a7a54)','linear-gradient(135deg,#5e35b1,#8161d8)','linear-gradient(135deg,#e08a1e,#c25e00)','#1c2f3c'];
let qpColor=null, qpImg=null, qpImgs=[], qpVideo=null, qpBig=null, qpEmojiTarget='text';
function qpRenderColors(){ $('#qpColors').innerHTML='<span class="qp-color none'+(qpColor===null?' sel':'')+'" data-c=""><i class="fa-solid fa-ban"></i></span>'+QP_COLORS.map(c=>'<span class="qp-color'+(qpColor===c?' sel':'')+'" data-c="'+c+'" style="background:'+c+'"></span>').join('')+'<label class="qp-color custom" title="Escolher cor"><i class="fa-solid fa-eye-dropper"></i><input type="color" id="qpColorPick" value="#00acac"></label>'; }
function qpSetColor(c){ qpColor=c||null; const body=$('#qpBody'); const sub=$('#qpSub'); if(qpColor){ body.classList.add('colored'); body.style.background=qpColor; sub.hidden=false; (document.getElementById('qpBigEmoji')||{}).hidden=false; } else { body.classList.remove('colored'); body.style.background=''; sub.hidden=true; sub.value=''; (document.getElementById('qpBigEmoji')||{}).hidden=true; } qpRenderColors(); }
function qpOpen(mode){
  qpUnit=null; if($('#qpUnitLbl')) $('#qpUnitLbl').textContent='Não vincular unidade'; if($('#qpUnitMenu')) $('#qpUnitMenu').hidden=true; $('#qpText').value=''; qpSetColor(null); qpImg=null; qpImgs=[]; qpVideo=null; qpBig=null; (document.getElementById('qpBigEmojiVal')||{}).innerHTML='<i class="fa-regular fa-face-smile"></i>'; $('#qpImgWrap').hidden=true; qpRenderImgs(); $('#qpImgFile').value=''; $('#qpVideoFile')&&($('#qpVideoFile').value=''); $('#qpAdvPanel').hidden=true; $('#qpBody').style.display=''; $('#qpAdv').classList.remove('on'); { const cx=$('#qpBody').closest('.qp-modal'); const tb=cx.querySelector('.qp-tools'); if(tb) tb.style.display=''; const pe=cx.querySelector('.qp-foot'); if(pe) pe.style.display=''; } if($('#qpDefStart')){$('#qpDefStart').value='';$('#qpDefStartRow').style.display='none';$$('#qpDefStartSeg button').forEach(x=>x.classList.toggle('on',x.dataset.s==='now'));$('#qpDefEnd').value='';$('#qpDefEndRow').style.display='none';$$('#qpDefEndSeg button').forEach(x=>x.classList.toggle('on',x.dataset.s==='never'));$('#qpDefEmail').checked=true;$('#qpDefPush').checked=true;var _qpp=$('#qpDefPin'); if(_qpp) _qpp.checked=false;} $('#qpColors').classList.toggle('hidden', mode!=='color'); if($('#qpEmojis'))$('#qpEmojis').hidden=true; $('#qpPub').disabled=true; $('#qpBack').classList.add('open'); if(mode==='color'){ qpRenderColors(); qpSetColor(QP_COLORS[0]); $('#qpToolColor').classList.add('on'); } else { $('#qpToolColor').classList.remove('on'); } setTimeout(()=>$('#qpText').focus(),40); if(mode==='img') $('#qpImgFile').click(); if(mode==='video') $('#qpVideoFile').click(); }
function qpClose(){ $('#qpBack').classList.remove('open'); }
$('#qpX').addEventListener('click', qpClose);
$('#qpBack').addEventListener('click', e=>{ if(e.target===$('#qpBack')) qpClose(); });
$('#qpText').addEventListener('input', e=>{ $('#qpPub').disabled=!e.target.value.trim(); });
$('#qpColorExit') && $('#qpColorExit').addEventListener('click', ()=>{ qpSetColor(null); $('#qpColors').classList.add('hidden'); $('#qpColorBack').classList.add('hidden'); $('#qpToolColor').classList.remove('on'); });
$('#qpToolColor').addEventListener('click', ()=>{ const h=$('#qpColors').classList.toggle('hidden'); $('#qpColorBack').classList.toggle('hidden',h); $('#qpToolColor').classList.toggle('on',!h); if(!h){ qpRenderColors(); if(!qpColor) qpSetColor(QP_COLORS[0]); } else { qpSetColor(null); } });
$('#qpToolArt') && $('#qpToolArt').addEventListener('click', ()=>{ qpClose(); openNewsModule(); nvFrom='feed'; nvResetCompose(); nvType='article'; $$('.nv-tipo-card[data-type]').forEach(c=>c.classList.toggle('sel',c.dataset.type==='article')); newsShow('compose'); nvGoStep('content'); });
$('#qpToolImg').addEventListener('click', ()=>$('#qpImgFile').click());
$('#qpToolVideo') && $('#qpToolVideo').addEventListener('click', ()=>$('#qpVideoFile').click());
$('#qpVideoFile') && $('#qpVideoFile').addEventListener('change', e=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; qpVideo=URL.createObjectURL(f); qpImgs=[]; qpImg=null; qpSetColor(null); $('#qpColors').classList.add('hidden'); qpRenderImgs(); $('#qpPub').disabled=false; });
$('#qpImgFile').addEventListener('change', e=>{ const fs=[...(e.target.files||[])]; if(!fs.length) return; const vid=fs.find(f=>f.type.startsWith('video')); if(vid){ qpVideo=URL.createObjectURL(vid); qpImgs=[]; qpImg=null; } else { fs.forEach(f=>qpImgs.push(URL.createObjectURL(f))); qpImg=qpImgs[0]; qpVideo=null; } qpRenderImgs(); qpSetColor(null); $('#qpColors').classList.add('hidden'); $('#qpPub').disabled=false; });
function qpRenderImgs(){ const g=$('#qpImgGrid'); $('#qpImgWrap').hidden=true; if(qpVideo){ g.hidden=false; g.className='qp-imggrid n1'; g.innerHTML='<div class="qp-imgcell"><video src="'+qpVideo+'" controls style="width:100%;max-height:380px;display:block;background:#000"></video><button class="qp-imgdel" data-vid="1"><i class="fa-solid fa-xmark"></i></button></div>'; return; } if(!qpImgs.length){ g.hidden=true; g.innerHTML=''; return; } g.hidden=false; g.className='qp-imggrid n'+Math.min(qpImgs.length,4); g.innerHTML=qpImgs.slice(0,4).map((src,i)=>{ const extra=(i===3&&qpImgs.length>4)?'<span class="qp-imgmore">+'+(qpImgs.length-4)+'</span>':''; return '<div class="qp-imgcell" draggable="true" data-i="'+i+'"><img src="'+src+'">'+extra+'<button class="qp-imgdel" data-i="'+i+'"><i class="fa-solid fa-xmark"></i></button></div>'; }).join(''); }
$('#qpImgGrid').addEventListener('click', e=>{ const d=e.target.closest('.qp-imgdel'); if(d){ if(d.dataset.vid){ qpVideo=null; $('#qpVideoFile')&&($('#qpVideoFile').value=''); qpRenderImgs(); $('#qpPub').disabled=!$('#qpText').value.trim(); return; } qpImgs.splice(+d.dataset.i,1); qpImg=qpImgs[0]||null; qpRenderImgs(); $('#qpPub').disabled=!$('#qpText').value.trim() && !qpImgs.length; return; } const cell=e.target.closest('.qp-imgcell'); if(cell && !qpVideo && qpImgs.length){ ieOpen(+cell.dataset.i||0); } });
/* Editor de imagens (reordenar) */
let ieSel=0;
function ieRender(){ if(ieSel>=qpImgs.length) ieSel=qpImgs.length-1; if(ieSel<0)ieSel=0; $('#ieMain').src=qpImgs[ieSel]||''; $('#ieCount').textContent=(ieSel+1)+' de '+qpImgs.length; $('#ieThumbs').innerHTML=qpImgs.map((src,i)=>'<div class="ie-thumb'+(i===ieSel?' sel':'')+'" data-i="'+i+'"><img src="'+src+'"><span class="ie-n">'+('0'+(i+1)).slice(-2)+'</span>'+(i>0?'<button class="ie-mv l" data-mv="l" data-i="'+i+'"><i class="fa-solid fa-arrow-left"></i></button>':'')+(i<qpImgs.length-1?'<button class="ie-mv r" data-mv="r" data-i="'+i+'"><i class="fa-solid fa-arrow-right"></i></button>':'')+'</div>').join(''); }
function ieOpen(i){ ieSel=i||0; $('#imgEditor').hidden=false; ieRender(); }
$('#ieClose').addEventListener('click', ()=>$('#imgEditor').hidden=true);
$('#ieDone').addEventListener('click', ()=>{ $('#imgEditor').hidden=true; qpImg=qpImgs[0]||null; qpRenderImgs(); });
$('#imgEditor').addEventListener('click', e=>{ if(e.target===$('#imgEditor')){ $('#imgEditor').hidden=true; qpRenderImgs(); } });
$('#ieThumbs').addEventListener('click', e=>{ const mv=e.target.closest('.ie-mv'); if(mv){ const i=+mv.dataset.i, to=mv.dataset.mv==='l'?i-1:i+1; if(to<0||to>=qpImgs.length)return; const m=qpImgs.splice(i,1)[0]; qpImgs.splice(to,0,m); ieSel=to; ieRender(); return; } const t=e.target.closest('.ie-thumb'); if(t){ ieSel=+t.dataset.i; ieRender(); } });
$('#ieDel').addEventListener('click', ()=>{ if(!qpImgs.length)return; qpImgs.splice(ieSel,1); if(!qpImgs.length){ $('#imgEditor').hidden=true; qpImg=null; qpRenderImgs(); return; } ieRender(); });
$('#ieDup').addEventListener('click', ()=>{ if(!qpImgs.length)return; qpImgs.splice(ieSel+1,0,qpImgs[ieSel]); ieRender(); });
$('#ieAdd').addEventListener('click', ()=>$('#ieFile').click());
$('#ieFile').addEventListener('change', e=>{ const fs=[...(e.target.files||[])]; fs.forEach(f=>qpImgs.push(URL.createObjectURL(f))); e.target.value=''; ieRender(); });
let qpDragI=null;
$('#qpImgGrid').addEventListener('dragstart', e=>{ const c=e.target.closest('.qp-imgcell'); if(!c) return; qpDragI=+c.dataset.i; c.classList.add('dragging'); });
$('#qpImgGrid').addEventListener('dragend', e=>{ const c=e.target.closest('.qp-imgcell'); if(c) c.classList.remove('dragging'); qpDragI=null; });
$('#qpImgGrid').addEventListener('dragover', e=>{ e.preventDefault(); });
$('#qpImgGrid').addEventListener('drop', e=>{ e.preventDefault(); const c=e.target.closest('.qp-imgcell'); if(c==null||qpDragI==null) return; const to=+c.dataset.i; if(to===qpDragI) return; const m=qpImgs.splice(qpDragI,1)[0]; qpImgs.splice(to,0,m); qpImg=qpImgs[0]||null; qpRenderImgs(); });
/* Lightbox de imagens */
let ilbList=[], ilbIdx=0;
function ilbShow(){ $('#ilbImg').src=ilbList[ilbIdx]; $('#ilbCount').textContent=(ilbIdx+1)+' de '+ilbList.length; $('#ilbPrev').style.display=$('#ilbNext').style.display=ilbList.length>1?'':'none'; }
function ilbOpen(list,i){ ilbList=list; ilbIdx=i||0; $('#imgLightbox').hidden=false; ilbShow(); }
$('#ilbClose').addEventListener('click', ()=>$('#imgLightbox').hidden=true);
$('#imgLightbox').addEventListener('click', e=>{ if(e.target===$('#imgLightbox')) $('#imgLightbox').hidden=true; });
$('#ilbPrev').addEventListener('click', ()=>{ ilbIdx=(ilbIdx-1+ilbList.length)%ilbList.length; ilbShow(); });
$('#ilbNext').addEventListener('click', ()=>{ ilbIdx=(ilbIdx+1)%ilbList.length; ilbShow(); });
document.addEventListener('keydown', e=>{ if($('#imgLightbox').hidden) return; if(e.key==='Escape')$('#imgLightbox').hidden=true; else if(e.key==='ArrowLeft')$('#ilbPrev').click(); else if(e.key==='ArrowRight')$('#ilbNext').click(); });
document.addEventListener('click', e=>{ const cell=e.target.closest('.post-imggrid .pig-cell'); if(!cell) return; const grid=cell.closest('.post-imggrid'); let imgs=[]; try{ imgs=JSON.parse((grid.getAttribute('data-imgs')||'[]').replace(/&#39;/g,"'")); }catch(_){} if(imgs.length) ilbOpen(imgs, +cell.dataset.i||0); });
$('#qpImgX').addEventListener('click', ()=>{ qpImgs=[]; qpImg=null; $('#qpImgFile').value=''; qpRenderImgs(); $('#qpPub').disabled=!$('#qpText').value.trim(); });
const QP_EMOJIS=['😀','😄','😁','🤣','😊','😍','😘','😉','🙌','👏','👍','🙏','💪','🔥','✨','🎉','🎊','❤️','💙','💚','🚀','⭐','✅','💡','📈','🎯','👋','🤝','🙋','😎','🥳','😂'];
$('#qpColors').addEventListener('click', e=>{ const s=e.target.closest('.qp-color'); if(!s||s.classList.contains('custom')) return; qpSetColor(s.dataset.c); });
$('#qpColors').addEventListener('input', e=>{ const p=e.target.closest('#qpColorPick'); if(!p) return; qpSetColor('linear-gradient(135deg,'+p.value+','+p.value+')'); });
$('#qpAdv').addEventListener('click', ()=>{ const p=$('#qpAdvPanel'); const show=p.hidden; p.hidden=!show; $('#qpBody').style.display=show?'none':''; $('#qpColors').classList.add('hidden'); $('#qpAdv').classList.toggle('on',show); const cx=$('#qpBody').closest('.qp-modal'); const tb=cx.querySelector('.qp-tools'); if(tb) tb.style.display=show?'none':''; const pe=cx.querySelector('.qp-foot'); if(pe) pe.style.display=show?'none':''; });
$('#qpAdvBack') && $('#qpAdvBack').addEventListener('click', ()=>{ fgToast('Nota DEV: esse botão de avançado aparece apenas para Unidade principal / Matriz. Nunca aparece para unidades'); $('#qpAdv').click(); });
$('#qpDefStartSeg').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b)return; $$('#qpDefStartSeg button').forEach(x=>x.classList.toggle('on',x===b)); const s=b.dataset.s==='sched'; $('#qpDefStartRow').style.display=s?'flex':'none'; if(!s)$('#qpDefStart').value=''; });
$('#qpDefEndSeg').addEventListener('click', e=>{ const b=e.target.closest('button'); if(!b)return; $$('#qpDefEndSeg button').forEach(x=>x.classList.toggle('on',x===b)); const d=b.dataset.s==='date'; $('#qpDefEndRow').style.display=d?'flex':'none'; if(!d)$('#qpDefEnd').value=''; });
$('#qpPub').addEventListener('click', ()=>{ const v=$('#qpText').value.trim(); if(!v && !qpImgs.length && !qpVideo) return; const item={ id:Date.now(), text:v, video:qpVideo||null, image:qpImgs[0]||null, images:qpImgs.length?qpImgs.slice():null, colorBg:(qpImgs.length||qpVideo)?null:qpColor, colorSub:((!qpImgs.length&&!qpVideo&&qpColor)?$('#qpSub').value.trim():''), colorEmoji:((!qpImgs.length&&!qpVideo&&qpColor)?qpBig:null), author:'SULTS', av:null, sub:qpCatSel||'Comunicados oficiais', date:'agora', datetime:nvNowStr(), reach:'rede', reactions:0, comments:0, status:'pub', pinned:($('#qpDefPin')&&(($('#qpDefPin')||{}).checked))||false }; if(pmPostNeedsApproval()){ item.status='draft'; item.pendingApproval=true; item.author='Rodrigo Caetano'; item.av='av-rc'; item.ini='RC'; pubApprAdd(item); qpClose(); fgToast('Publicação enviada para aprovação'); }
 else { NEWS.unshift(item); addHomePost(item); renderNewsFeed(); qpClose(); fgToast('Publicação criada'); } });
function pmPostNeedsApproval(){ return false; }
$('#nvFeed').addEventListener('click', e => {
  const art = e.target.closest('.post[data-id]'); if(!art) return; const id=+art.dataset.id; const n=NEWS.find(x=>x.id===id); if(!n) return;
  const pa = e.target.closest('[data-act="pubapr"],[data-act="pubrej"]');
  if(pa){
    e.stopPropagation();
    if(pa.dataset.act==='pubapr'){
      n.pendAppr=false;
      if(typeof PUB_APPR!=='undefined'){ PUB_APPR=PUB_APPR.filter(x=>x.paid!==n.paid); }
      n.apprStatus='aprovado'; n.decidedBy='Rodrigo Caetano'; n.decidedAt=aprDT();
      if(typeof PUB_HIST!=='undefined') PUB_HIST.unshift(n);
      if(typeof aprBadges==='function') aprBadges();
      renderNewsFeed(); fgToast('Publicação aprovada');
    } else {
      askReject(function(motivo){
        n.motivo=motivo; n.pendAppr=false; n.status='draft';
        if(typeof PUB_APPR!=='undefined'){ PUB_APPR=PUB_APPR.filter(x=>x.paid!==n.paid); }
        n.apprStatus='rejeitado'; n.decidedBy='Rodrigo Caetano'; n.decidedAt=aprDT();
        if(typeof PUB_HIST!=='undefined') PUB_HIST.unshift(n);
        if(typeof aprBadges==='function') aprBadges();
        renderNewsFeed(); fgToast('Publicação recusada');
      });
    }
    return;
  }
  const cd = e.target.closest('.comment-dots');
  if(cd){ e.stopPropagation(); const d=cd.nextElementSibling; const was=d.hidden; $$('#nvFeed .comment-drop').forEach(x=>x.hidden=true); d.hidden=!was; return; }
  const cdel = e.target.closest('[data-cmdel]');
  if(cdel){
    e.stopPropagation();
    n.cmts.splice(+cdel.dataset.cmdel,1);
    const row=cdel.closest('.comment'); if(row) row.remove();
    fgToast('Comentário excluído'); return;
  }
  const cl = e.target.closest('[data-cmlike]');
  if(cl){
    e.stopPropagation();
    const c=(n.cmts||[])[+cl.dataset.cmlike]; if(!c) return;
    c.liked=!c.liked; c.likes=(c.likes||0)+(c.liked?1:-1); if(c.likes<0) c.likes=0;
    cl.classList.toggle('liked', !!c.liked);
    const lw=cl.parentElement.querySelector('.comment-likes');
    const sp=cl.parentElement.querySelector('.comment-sep');
    if(lw){ lw.querySelector('b').textContent=c.likes||0; lw.style.display=c.likes?'':'none'; }
    if(sp) sp.style.display=c.likes?'':'none';
    return;
  }
  const ca = e.target.closest('[data-cmapr],[data-cmrej]');
  if(ca){
    e.stopPropagation();
    const ci=+(ca.dataset.cmapr!=null?ca.dataset.cmapr:ca.dataset.cmrej);
    const c=(n.cmts||[])[ci]; if(!c) return;
    const ok=ca.dataset.cmapr!=null;
    function done(status){
      if(c.mid!=null && typeof modRemove==='function') modRemove(c.mid, status);
      else if(typeof aprBadges==='function') aprBadges();
      renderNewsFeed();
    }
    if(ok){ c.pend=false; done('aprovado'); fgToast('Comentário aprovado'); }
    else { askReject(function(){ n.cmts=n.cmts.filter((x,k)=>k!==ci); done('rejeitado'); fgToast('Comentário recusado'); }); }
    return;
  }
  const mi = e.target.closest('[data-menu]');
  if (mi){ const a=mi.dataset.menu; art.querySelector('.nvf-menu').hidden=true; if(a==='edit') nvEdit(id); else if(a==='del'){ NEWS=NEWS.filter(x=>x.id!==id); renderNewsFeed(); fgToast('Publicação excluída'); } else if(a==='pin'){ n.pinned=!n.pinned; renderNewsFeed(); fgToast(n.pinned?'Fixada no topo':'Desafixada'); } else fgToast('Link copiado'); return; }
  const cc = e.target.closest('.post-stats .right');
  if(cc){ e.stopPropagation(); const cm=art.querySelector('.nvf-cm'); if(cm){ cm.hidden=!cm.hidden; if(!cm.hidden){ const inp=cm.querySelector('.nvf-cm-in'); if(inp) inp.focus(); } } return; }
  const rs = e.target.closest('.post-stats');
  if(rs && !e.target.closest('.post-stats .right')){ e.stopPropagation(); openReactions(nvRxIndex(id)); return; }
  const pollOpt = e.target.closest('[data-poll]');
  if (pollOpt && n.poll && n.poll.voted==null){ n.poll.options[+pollOpt.dataset.poll].v++; n.poll.voted=+pollOpt.dataset.poll; renderNewsFeed(); return; }
  const b = e.target.closest('[data-act]'); if(!b) return; const act=b.dataset.act;
  if (act==='read'){ openArticle(n); return; }
  if (act==='open'){ openArticle(n); return; }
  if (act==='like'){ e.stopPropagation(); nvRxPicker(b, art, n, true); }
  else if (act==='comment'){ const cm=art.querySelector('.nvf-cm'); cm.hidden=!cm.hidden; if(!cm.hidden) cm.querySelector('.nvf-cm-in').focus(); }
  else if (act==='cmsend'){ const inp=art.querySelector('.nvf-cm-in'); const v=inp.value.trim(); if(!v) return; const pend=pmNeedsApproval(); const list=art.querySelector('.nvf-cm-list'); if(pend){ const it=document.createElement('div'); it.className='nvf-cm-item pending'; it.innerHTML='<span class="avatar av-rc"></span><div><div class="nvf-cm-bub"><b>'+usuarioAtual().nome+'</b><span>'+v+'</span></div><div class="comment-modbar"><span class="comment-pend"><i class="fa-solid fa-clock"></i> Aguardando aprovação</span><div class="comment-mod"><button class="cmod-no"><i class="fa-solid fa-xmark"></i> Recusar</button><button class="cmod-ok"><i class="fa-solid fa-check"></i> Aprovar</button></div></div></div>'; list.appendChild(it); it.querySelector('.cmod-ok').addEventListener('click',()=>{ it.classList.remove('pending'); it.querySelector('.comment-pend').remove(); it.querySelector('.comment-mod').remove(); (n.cmts=n.cmts||[]).push({author:usuarioAtual().nome,av:'av-rc',role:usuarioAtual().cargo,text:v}); art.querySelector('.nvf-cc').textContent=(n.comments+n.cmts.length)+' comentários'; modRemove(mq.mid); fgToast('Comentário aprovado'); }); it.querySelector('.cmod-no').addEventListener('click',()=>{ it.remove(); modRemove(mq.mid); fgToast('Comentário recusado'); }); const mq={author:usuarioAtual().nome,av:'av-rc',role:usuarioAtual().cargo,text:v,post:(n.title||'Publicação'),approve:()=>{ it.classList.remove('pending'); const pe=it.querySelector('.comment-pend'); if(pe)pe.remove(); const me=it.querySelector('.comment-mod'); if(me)me.remove(); (n.cmts=n.cmts||[]).push({author:usuarioAtual().nome,av:'av-rc',role:usuarioAtual().cargo,text:v}); art.querySelector('.nvf-cc').textContent=(n.comments+n.cmts.length)+' comentários'; },reject:()=>it.remove()}; modAdd(mq); fgToast('Comentário enviado para aprovação'); } else { (n.cmts=n.cmts||[]).push({author:usuarioAtual().nome,av:'av-rc',role:usuarioAtual().cargo,text:v}); list.insertAdjacentHTML('beforeend','<div class="nvf-cm-item"><span class="avatar av-rc"></span><div class="nvf-cm-bub"><b>'+usuarioAtual().nome+'</b><span>'+v+'</span></div></div>'); art.querySelector('.nvf-cc').textContent=(n.comments+n.cmts.length)+' comentários'; } inp.value=''; b.disabled=true; }
  else if (act==='more'){ const m=art.querySelector('.nvf-menu'); const wasHidden=m.hidden; $$('#nvFeed .nvf-menu').forEach(x=>x.hidden=true); m.hidden=!wasHidden; }
});
$('#nvFeed').addEventListener('input', e => { const inp=e.target.closest('.nvf-cm-in'); if(!inp) return; inp.parentNode.querySelector('.nvf-cm-send').disabled=!inp.value.trim(); });
$('#nvFeed').addEventListener('keydown', e => { const inp=e.target.closest('.nvf-cm-in'); if(inp && e.key==='Enter'){ e.preventDefault(); const s=inp.parentNode.querySelector('.nvf-cm-send'); if(!s.disabled) s.click(); } });
document.addEventListener('click', e => { if(!e.target.closest('.post-more') && !e.target.closest('.nvf-menu')) $$('#nvFeed .nvf-menu').forEach(m=>m.hidden=true); });
$('#nvBack').addEventListener('click', () => newsShow(nvFrom));
