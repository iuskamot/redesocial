/* perfil de pessoa e visualizador de publicacao */
/* ---------- Perfil de pessoa ---------- */
const PROFILE_EXTRA = {
  'Rodrigo Caetano Silva':{civil:'Casado',school:'Pós-graduação',rg:'23.456.789-0',addr:{cep:'38400-116',rua:'Av. Floriano Peixoto',num:'1450',bairro:'Centro',cidade:'Uberlândia',uf:'MG',comp:''},docs:[['Identidade',1,'Atualizado em 08/01/2026'],['CPF',1,'Atualizado em 08/01/2026'],['Carteira de trabalho',0,''],['Título de eleitor',1,'Atualizado em 20/11/2025'],['Comprovante de escolaridade',0,'']],role:'CEO e Co-fundador',bio:'Lidera a estratégia da rede e a visão de produto da SULTS. Apaixonado por franquias e tecnologia.',bday:'28 de dezembro',sex:'Masculino',cell:'(34) 99999-0001',phone:'(34) 3322-0001',email:'rodrigo@sults.com.br',loc:'Uberaba/MG',since:'2015',posts:128,seguidores:'2,4 mil',skills:['Estratégia','Franquias','Produto','Liderança','Growth'],links:[['SUA MARCA - FRANQUEADORA','#00acac','Proprietário','CEO'],['SULTS','#2f6fe4','Sócio','Co-fundador']]},
  'Rodrigo Caetano':{ref:'Rodrigo Caetano Silva'},
  'Ana Souza':{role:'Marketing · Pit Stop Barra',bio:'Responsável pelas campanhas e comunicação da rede. Criativa e movida a dados.',bday:'12 de março',sex:'Feminino',cell:'(11) 98888-1122',phone:'(11) 3344-1122',email:'ana.souza@sults.com.br',loc:'São Paulo/SP',since:'2019',posts:42,seguidores:'880',links:[['SUA MARCA - FRANQUEADORA','#ba68c8','Colaborador','Analista de Marketing']]},
  'Livia Fernandes':{civil:'Casada',school:'Pós-graduação',rg:'12.345.678-9',addr:{cep:'80420-090',rua:'Av. Sete de Setembro',num:'2775',bairro:'Rebouças',cidade:'Curitiba',uf:'PR',comp:'Sala 1204'},docs:[['Identidade',2,'Atualizado em 14/03/2026'],['CPF',1,'Atualizado em 14/03/2026'],['Carteira de trabalho',1,'Atualizado em 02/02/2026'],['Título de eleitor',0,''],['Comprovante de escolaridade',0,'']],role:'Head de Customer Success · SULTS',bio:'Cuida para que cada rede extraia o máximo da plataforma. NPS é a métrica favorita.',bday:'5 de julho',sex:'Feminino',cell:'(41) 97777-3344',phone:'(41) 3333-3344',email:'livia@sults.com.br',loc:'Curitiba/PR',since:'2018',posts:37,seguidores:'1,1 mil',links:[['SUA MARCA - FRANQUEADORA','#f06292','Colaborador','Head de CS']]},
  'Willer Matayoshi':{role:'CTO e Co-fundador',bio:'Comanda a engenharia e a arquitetura da SULTS. Entusiasta de IA e automações.',bday:'19 de setembro',sex:'Masculino',cell:'(34) 96666-5566',phone:'(34) 3322-5566',email:'willer@sults.com.br',loc:'Uberaba/MG',since:'2015',posts:64,seguidores:'1,8 mil',skills:['Arquitetura','IA & Automação','Node.js','Cloud','Segurança'],links:[['SULTS','#00acac','Sócio','CTO']]},
  'Willer Paim Matayoshi':{ref:'Willer Matayoshi'},
  'Matheus Scussel':{role:'COO',bio:'Responsável pela operação e expansão da rede. Foco em processos e resultado.',bday:'2 de fevereiro',sex:'Masculino',cell:'(51) 95555-7788',phone:'(51) 3131-7788',email:'matheus@sults.com.br',loc:'Porto Alegre/RS',since:'2017',posts:29,seguidores:'760',links:[['SUA MARCA - FRANQUEADORA','#26a69a','Sócio','COO']]},
  'Ellen Rocha':{role:'Gente & Cultura',bio:'Cuida das pessoas, cultura e clima da SULTS. Organiza os melhores eventos da rede.',bday:'23 de novembro',sex:'Feminino',cell:'(34) 94444-9900',phone:'(34) 3322-9900',email:'ellen@sults.com.br',loc:'Uberaba/MG',since:'2020',posts:51,seguidores:'640',links:[['SUA MARCA - FRANQUEADORA','#546e7a','Colaborador','Analista de RH']]},
  'Gente & Cultura':{ref:'Ellen Rocha'}
};
function personProfile(name, av){
  let ex=PROFILE_EXTRA[name]||{}; if(ex.ref) ex=PROFILE_EXTRA[ex.ref];
  const p=(typeof PEOPLE!=='undefined')?PEOPLE.find(x=>x.name===name):null;
  const av2=av||(p&&p.av)||'av-rc';
  const ini=name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  return Object.assign({name:name, av:av2, ini:ini, role:(p&&p.role)||'Colaborador', bio:'Colaborador da rede SULTS.', bday:',', sex:',', cell:',', phone:',', email:(name.toLowerCase().replace(/[^a-z]+/g,'.')+'@sults.com.br'), loc:'Brasil', since:'2022', posts:0, seguidores:'0', links:[['SUA MARCA - FRANQUEADORA','#00acac','Colaborador',(p&&p.role)||'Colaborador']]}, ex||{});
}
function openPersonProfile(name, av){
  const d=personProfile(name, av);
  $('#ppAvatar').className='pp-avatar avatar '+d.av; $('#ppAvatar').innerHTML='<span class="pp-online"></span>'+(d.av?'':d.ini);
  $('#ppName').innerHTML=d.name+' <i class="fa-solid fa-circle-check pp-verif"></i>'; $('#ppRole').textContent=d.role;
  $('#ppMeta').innerHTML='<span><i class="fa-solid fa-location-dot"></i>'+d.loc+'</span><span class="pp-dot"></span><span><i class="fa-solid fa-calendar"></i>Na rede desde '+d.since+'</span><span class="pp-dot"></span><span><i class="fa-solid fa-envelope"></i>'+d.email+'</span>';
  $('#ppStats').innerHTML='<div class="pp-stat"><b>'+d.posts+'</b><span>Publicações</span></div>'+
    '<div class="pp-stat"><b>'+(d.reacoes||'1,4 mil')+'</b><span>Reações</span></div>'+
    '<div class="pp-stat"><b>'+(d.comentarios||'286')+'</b><span>Comentários</span></div>'+
    '<div class="pp-stat"><b>'+d.since+'</b><span>Na rede desde</span></div>'+
    '<div class="pp-stat"><b>'+(d.links?d.links.length:1)+'</b><span>Unidades</span></div>';
  const info=[['fa-cake-candles','#e0398b','Aniversário',d.bday],['fa-venus-mars','#2f6fe4','Sexo',d.sex],['fa-mobile-screen','#00acac','Celular',d.cell],['fa-phone','#e0392c','Telefone',d.phone],['fa-envelope','#6f6ae0','E-mail',d.email],['fa-location-dot','#7c4cc4','Localização',d.loc]];
  $('#ppInfo').innerHTML=info.map(i=>'<div class="pp-inforow"><span class="pp-iic" style="background:'+i[1]+'22;color:'+i[1]+'"><i class="fa-solid '+i[0]+'"></i></span><div><b>'+i[2]+'</b><span>'+i[3]+'</span></div></div>').join('');
  const fld=(k,v,wide)=>'<div class="pp-field'+(wide?' wide':'')+'"><b>'+k+'</b><span'+(v?'':' class="empty"')+'>'+(v||'Não informado')+'</span></div>';
  $('#ppBasic').innerHTML=[
    fld('Nome completo', d.name), fld('Data de nascimento', d.bday),
    fld('Sexo', d.sex), fld('Estado civil', d.civil||''),
    fld('Escolaridade', d.school||''), fld('RG', d.rg||'')
  ].join('');
  const ad=d.addr||{};
  $('#ppAddr').innerHTML=[
    fld('CEP', ad.cep||''), fld('Bairro', ad.bairro||''),
    fld('Logradouro', ad.rua ? ad.rua+(ad.num?', '+ad.num:'') : '', true),
    fld('Cidade', ad.cidade||d.loc), fld('Estado', ad.uf||''),
    fld('Complemento', ad.comp||'', true)
  ].join('');
  const docs=d.docs||[['Identidade',2],['CPF',1],['Carteira de trabalho',1],['Título de eleitor',0],['Comprovante de escolaridade',0]];
  $('#ppDocs').innerHTML=docs.map(dc=>'<div class="pp-doc"><span class="pp-docic"><i class="fa-solid fa-file-lines"></i></span>'+
    '<div class="pp-docmain"><b>'+dc[0]+'</b><span>'+(dc[2]||'Sem atualização registrada')+'</span></div>'+
    '<span class="pp-doccount'+(dc[1]?'':' none')+'"><i class="fa-solid fa-paperclip"></i> '+dc[1]+(dc[1]===1?' anexo':' anexos')+'</span>'+
    '<button class="pp-docbtn" data-ppdoc="'+dc[0]+'">'+(dc[1]?'<i class="fa-solid fa-eye"></i> Ver anexos':'<i class="fa-solid fa-plus"></i> Anexar')+'</button></div>').join('');
  $('#ppLinks').innerHTML=d.links.map(l=>'<div class="pp-link"><span class="pp-linklogo" style="background:'+l[1]+'">'+l[0][0]+'</span>'+
    '<div class="pp-linkmain"><b>'+l[0]+'</b><span>'+(l[3]||'—')+'</span><span class="pp-linkq">'+(l[2]||'Colaborador')+'</span></div></div>').join('');
  $('#personProfile').hidden=false; document.body.style.overflow='hidden'; $('.pp-scroll').scrollTop=0;
}
/* A foto e a capa passam pelo modal de recorte (13-extras.js): aqui ficam so
   os ganchos que abrem esse modal e o que fecha. O tratador antigo do campo de
   arquivo saiu — ele escutava o mesmo campo e transformava a capa escolhida em
   foto de perfil. */
$('#ppAvEdit') && $('#ppAvEdit').addEventListener('click', e=>{ e.stopPropagation(); if (typeof ppAvAbrir === 'function') ppAvAbrir('foto'); });
$('#ppAvClose') && $('#ppAvClose').addEventListener('click', ()=>$('#ppAvModal').classList.remove('open'));
$('#ppAvModal') && $('#ppAvModal').addEventListener('click', e=>{ if(e.target===$('#ppAvModal')) $('#ppAvModal').classList.remove('open'); });
$('#ppMore') && $('#ppMore').addEventListener('click', e=>{ e.stopPropagation(); const m=$('#ppMoreMenu'); m.hidden=!m.hidden; });
document.addEventListener('click', e=>{ const m=$('#ppMoreMenu'); if(m && !e.target.closest('.pp-morewrap')) m.hidden=true; });
(function(){
  /* desfaz a busca sem mexer na aba aberta: o go() forca newsShow('feed'),
     e limpar estando em Shorts nao deveria jogar a pessoa para Publicacoes */
  const limpar=()=>{
    nvSearchQuery='';
    if(typeof sbQuery!=='undefined'){ sbQuery=''; sbShown=12; const si=$('#sbSearch'); if(si) si.value=''; }
    const li=$('#nvfSearch'); if(li) li.value='';
    if(typeof renderNewsFeed==='function') renderNewsFeed();
    if(typeof renderShortsB==='function') renderShortsB();
    if(typeof buildStories==='function') buildStories();
  };
  const go=()=>{
    const q=(($('#nmodSearchIn')||{}).value||'').trim();
    /* o escopo e a aba aberta, como diz o placeholder do campo: em Shorts a
       busca age na tela de Shorts, em Publicacoes age no feed — e nunca na
       fileira de shorts do topo */
    const emShorts = !!($('#nvShortsBScreen') && $('#nvShortsBScreen').classList.contains('active'));
    if(!q){
      /* campo vazio + Enter desfaz a busca. Antes so avisava, e a unica
         saida era o X do aviso de resultados — apagar o texto e dar Enter
         e o caminho que a pessoa tenta primeiro. */
      if(nvSearchQuery || (typeof sbQuery!=='undefined' && sbQuery)){ limpar(); fgToast('Busca limpa'); }
      else fgToast('Digite o que você busca');
      return;
    }
    if(emShorts){
      if(typeof sbQuery!=='undefined'){ sbQuery=q; sbShown=12; const si=$('#sbSearch'); if(si) si.value=q; }
      if(typeof renderShortsB==='function') renderShortsB();
    } else {
      /* o termo entra antes do newsShow: e ele que sincroniza o campo com a
         busca da aba, e leria o valor antigo se viesse primeiro */
      nvSearchQuery=q;
      if(typeof nvfAuthorQuery!=='undefined'){ nvfAuthorQuery=''; }
      const li=$('#nvfSearch'); if(li) li.value=q;
      newsShow('feed');
      if(typeof renderNewsFeed==='function') renderNewsFeed();
    }
    fgToast('Resultados para "'+q+'"');
  };
  $('#nmodSearchBtn') && $('#nmodSearchBtn').addEventListener('click', go);
  $('#nmodSearchIn') && $('#nmodSearchIn').addEventListener('keydown', e=>{ if(e.key==='Enter') go(); });
})();
$('#topUserChip') && $('#topUserChip').addEventListener('click', ()=>openPersonProfile('Rodrigo Caetano Silva','av-rc'));
$('#homeProfileCard') && $('#homeProfileCard').addEventListener('click', ()=>openPersonProfile('Rodrigo Caetano Silva','av-rc'));
document.addEventListener('click', e=>{ if(e.target.closest('.nvf-pclick')) openPersonProfile('Rodrigo Caetano Silva','av-rc'); });
$('#ppEdit') && $('#ppEdit').addEventListener('click', ()=>fgToast('Alterar senha'));
$('#ppConnect') && $('#ppConnect').addEventListener('click', ()=>fgToast('Conectar a uma nova marca'));
document.addEventListener('click', e=>{
  const dc=e.target.closest('[data-ppdoc]');
  if(dc){ fgToast('Anexos de '+dc.dataset.ppdoc); return; }
  const mi=e.target.closest('[data-ppmenu]'); if(!mi) return;
  const mm=$('#ppMoreMenu'); if(mm) mm.hidden=true;
  const map={perfil:'Meu perfil',seguranca:'Segurança',termos:'Meus termos',sair:'Sair'};
  fgToast(map[mi.dataset.ppmenu]||'');
});
$('#topUserChip') && $('#topUserChip').addEventListener('click', ()=>openPersonProfile('Rodrigo Caetano Silva','av-rc'));
$('#homeProfileCard') && $('#homeProfileCard').addEventListener('click', ()=>openPersonProfile('Rodrigo Caetano Silva','av-rc'));
document.addEventListener('click', e=>{ if(e.target.closest('.nvf-pclick')) openPersonProfile('Rodrigo Caetano Silva','av-rc'); });
$('#ppEdit') && $('#ppEdit').addEventListener('click', ()=>fgToast('Alterar senha'));
$('#ppConnect') && $('#ppConnect').addEventListener('click', ()=>fgToast('Conectar a uma nova marca'));
document.addEventListener('click', e=>{
  const dc=e.target.closest('[data-ppdoc]');
  if(dc){ fgToast('Anexos de '+dc.dataset.ppdoc); return; }
  const mi=e.target.closest('[data-ppmenu]'); if(!mi) return;
  const mm=$('#ppMoreMenu'); if(mm) mm.hidden=true;
  const map={perfil:'Meu perfil',seguranca:'Segurança',termos:'Meus termos',sair:'Sair'};
  fgToast(map[mi.dataset.ppmenu]||'');
});
$('#ppBack').addEventListener('click', ()=>{ $('#personProfile').hidden=true; document.body.style.overflow=''; });
/* o botao Modulos do cabecalho tambem fecha o perfil e volta para a home */
$('#ppTopApps') && $('#ppTopApps').addEventListener('click', ()=>{ $('#personProfile').hidden=true; document.body.style.overflow=''; window.scrollTo({top:0,behavior:'smooth'}); });
document.addEventListener('click', e=>{
  const nm=e.target.closest('.post-name, .comment-name, .nvf-cm-bub b, .np-name');
  if(nm){ let name=nm.textContent.replace(/\s+/g,' ').replace(/✓|Fixado|Editado/g,'').trim(); if(name==='SULTS'||!name) return; const art=nm.closest('[data-id],.post,.nvf-cm-item,.comment'); let av=''; const avEl=art&&art.querySelector('.avatar'); if(avEl){ av=[...avEl.classList].find(c=>/^av-/.test(c))||''; } if(av==='av-brand') return; e.preventDefault(); openPersonProfile(name, av); }
});

let PERM = { mode:'todos', members:[1027,978,992,1007,1036,1] };
const permView = $('#permView');
const permModal = $('#permModal');
let permSearchVal = '', permPickSearch = '';
function personById(id){ return PEOPLE.find(p => p.id === id) || null; }
const STORY_PERM = { centralOn:true, unitOn:false, mode:'todos', unitMode:'todos', unitRoles:['franqueado','gerente'] };
function stPermFeet(){
  const cF=document.getElementById('stPermCentralFoot'), uF=document.getElementById('stPermUnitFoot');
  if(cF){
    const cCard=cF.closest('.perm-card'); if(cCard) cCard.classList.toggle('on', STORY_PERM.centralOn);
    if(STORY_PERM.centralOn){
      const some = STORY_PERM.mode!=='todos';
      const n = typeof PERM!=='undefined'?PERM.members.length:0;
      cF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" checked data-stdisable="central"><span class="nv-tk"></span> Ativo</label>'+
        '<div class="perm-who"><div class="perm-who-lbl">Quem pode publicar</div><div class="perm-radiogrp">'+
        '<div class="perm-radio'+(!some?' on':'')+'" data-stseg="central-todos"><span class="pr-dot"></span><span class="pr-body"><b>Todos da matriz</b><span>Qualquer colaborador vinculado à matriz.</span></span></div>'+
        '<div class="perm-radio'+(some?' on':'')+'" data-stseg="central-alguns"><span class="pr-dot"></span><span class="pr-body"><b>Somente pessoas selecionadas</b><span>Você escolhe os colaboradores que publicam.</span>'+
        (some?'<div class="perm-pickwrap"><button type="button" class="perm-pickbtn" data-stwhich="central">'+NV_ICON_EDIT+' Selecionar pessoas</button><span class="perm-who-count">'+n+' pessoa(s) selecionada(s)</span></div>':'')+
        '</span></div></div></div>';
    } else cF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" data-stenable="central"><span class="nv-tk"></span> <span class="tgtxt">Inativo</span></label>';
  }
  if(uF){
    const uCard=uF.closest('.perm-card'); if(uCard) uCard.classList.toggle('on', STORY_PERM.unitOn);
    if(STORY_PERM.unitOn){
      const some = STORY_PERM.unitMode!=='todos';
      const n = UNIT_SEL.story.length;
      uF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" checked data-stdisable="unit"><span class="nv-tk"></span> Ativo</label>'+
        '<div class="perm-who"><div class="perm-who-lbl">Quem pode publicar</div><div class="perm-radiogrp">'+
        '<div class="perm-radio'+(!some?' on':'')+'" data-stseg="unit-todos"><span class="pr-dot"></span><span class="pr-body"><b>Todas as unidades</b><span>Qualquer unidade vinculada à rede.</span></span></div>'+
        '<div class="perm-radio'+(some?' on':'')+'" data-stseg="unit-alguns"><span class="pr-dot"></span><span class="pr-body"><b>Unidades selecionadas</b><span>Você escolhe as unidades que publicam.</span>'+
        (some?'<div class="perm-pickwrap"><button type="button" class="perm-pickbtn" data-unitpick="story">'+NV_ICON_EDIT+' Selecionar unidades</button><span class="perm-who-count">'+n+' unidade(s) selecionada(s)</span></div>':'')+
        '</span></div></div></div>';
    } else uF.innerHTML='<label class="perm-tog nv-toggle"><input type="checkbox" data-stenable="unit"><span class="nv-tk"></span> <span class="tgtxt">Inativo</span></label>';
  }
}
document.addEventListener('change', e=>{
  const en=e.target.closest('[data-stenable]'), di=e.target.closest('[data-stdisable]');
  if(en){ const w=en.dataset.stenable; en.checked=false;
    permConfirm('Ativar publicação de shorts', 'Deseja permitir que '+(w==='unit'?'as unidades':'a matriz')+' publiquem shorts?', ()=>{
      STORY_PERM[w==='unit'?'unitOn':'centralOn']=true; stPermFeet();
      fgToast(w==='unit'?'Unidades ativadas para publicar shorts':'Matriz ativada para publicar shorts');
    }); }
  if(di){ const w=di.dataset.stdisable; di.checked=true;
    permConfirm('Desativar publicação de shorts', 'Deseja impedir que '+(w==='unit'?'as unidades':'a matriz')+' publiquem shorts?', ()=>{
      STORY_PERM[w==='unit'?'unitOn':'centralOn']=false; stPermFeet();
      fgToast(w==='unit'?'Unidades desativadas':'Matriz desativada');
    }); }
});
document.addEventListener('click', e=>{
  const up=e.target.closest('[data-unitpick]');
  if(up){ if(typeof openUnitPick==='function') openUnitPick(up.dataset.unitpick); return; }
  const wc=e.target.closest('[data-stwhich]');
  if(wc){ if(wc.dataset.stwhich==='central'){ if(typeof openPermShortsWho==='function') openPermShortsWho(); }
    else { const um=document.getElementById('uroleModal'); if(um){ if(typeof renderUrolePick==='function') renderUrolePick(); um.classList.add('open'); } } return; }
  const sg=e.target.closest('[data-stseg]');
  if(sg){ const v=sg.dataset.stseg;
    if(v==='central-todos') STORY_PERM.mode='todos';
    else if(v==='central-alguns') STORY_PERM.mode='selecionados';
    else if(v==='unit-todos') STORY_PERM.unitMode='todos';
    else STORY_PERM.unitMode='selecionados';
    stPermFeet(); if(typeof PERM!=='undefined'){ PERM.mode=STORY_PERM.mode; } return; }
});
function renderPermList(){
  $$('input[name="permMode"]').forEach(r => { r.checked = (r.value === PERM.mode); });
  const _sel = PERM.mode === 'selecionados';
  const _inModal = $('#permMembers').parentElement && $('#permMembers').parentElement.id==='permWhoBody';
  $('#permMembers').style.display = (_sel && (_inModal || permStoriesOpen)) ? '' : 'none';
  if(typeof stPermFeet==='function') stPermFeet();
  const _n=$('#permNote'); if(_n && !_n.hasAttribute('hidden')) _n.style.display = PERM.mode === 'todos' ? '' : 'none';
  $('#permCount').textContent = PERM.members.length;
  let list = PERM.members.map(personById).filter(Boolean);
  if (permSearchVal) list = list.filter(p => rxNorm(p.name).includes(rxNorm(permSearchVal)));
  const el = $('#permList');
  if (!list.length){ el.innerHTML = '<div class="perm-empty">Nenhuma pessoa autorizada. Clique em “Adicionar membro”.</div>'; return; }
  const rows = list.map(p => '<tr data-id="'+p.id+'">'+
    '<td class="perm-id">#'+p.id+'</td>'+
    '<td><div class="perm-person"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>'+p.role+'</span></div></div></td>'+
    '<td style="text-align:right"><button class="perm-remove" data-id="'+p.id+'"><i class="fa-solid fa-trash-can"></i> Remover</button></td></tr>').join('');
  el.innerHTML = '<table><thead><tr><th style="width:90px">ID</th><th>Colaborador</th><th style="width:130px;text-align:right">Remover</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function openPerm(){ rmodSetActive($('#rmodPerm')); reelsView.classList.remove('open'); closeCats(); permView.classList.add('open'); document.body.style.overflow='hidden'; renderPermList(); }
function closePerm(){ permView.classList.remove('open'); }
function renderPermPick(){
  const avail = PEOPLE.filter(p => PERM.members.indexOf(p.id) < 0 && rxNorm(p.name).includes(rxNorm(permPickSearch)));
  const el = $('#permPickList');
  if (!avail.length){ el.innerHTML = '<div class="perm-empty">Todos já foram adicionados.</div>'; return; }
  el.innerHTML = avail.map(p => '<div class="perm-pickrow" data-id="'+p.id+'"><span class="avatar '+p.av+'"></span><div><b>'+p.name+'</b><span>#'+p.id+' · '+p.role+'</span></div><span class="perm-addic"><i class="fa-solid fa-circle-plus"></i></span></div>').join('');
}
let permStoriesOpen=false, permStoriesParent=null, permStoriesNext=null;
function openPermShortsWho(){
  const body=$('#permMembers'); if(!body) return;
  permStoriesParent=body.parentElement; permStoriesNext=body.nextSibling; permStoriesOpen=true;
  $('#permWhoTitle').textContent='Quem pode publicar · Shorts';
  body.style.display=''; $('#permWhoBody').appendChild(body);
  $('#permWhoModal').classList.add('open');
  renderPermList();
}
function closePermShortsWho(){
  const body=$('#permMembers');
  if(permStoriesOpen && permStoriesParent && body) permStoriesParent.insertBefore(body, permStoriesNext);
  permStoriesOpen=false; $('#permWhoModal').classList.remove('open'); renderPermList();
}
document.addEventListener('click', e=>{ if(e.target.closest('#permStoriesPick')) openPermShortsWho(); });
function openPermModal(){ permPickSearch=''; $('#permPickSearch').value=''; renderPermPick(); permModal.classList.add('open'); setTimeout(()=>$('#permPickSearch').focus(),30); }
function closePermModal(){ permModal.classList.remove('open'); }
$$('input[name="permMode"]').forEach(r => r.addEventListener('change', () => { PERM.mode = r.value; fgToast(r.value==='todos'?'Todos podem publicar':'Somente pessoas selecionadas'); renderPermList(); }));
(function(){
  const slot=document.getElementById('permStoriesSlot'), pv=document.getElementById('permView');
  if(slot&&pv){ const b=pv.querySelector('.perm-body'); while(b&&b.firstChild) slot.appendChild(b.firstChild); }
})();
$('#rmodPerm').addEventListener('click', ()=>{ if(typeof cfgGo==='function'){ document.getElementById('newsView').classList.add('open','mod-mode'); cfgGo('who'); } });
$('#permAdd').addEventListener('click', openPermModal);
$('#permModalClose').addEventListener('click', closePermModal);
permModal.addEventListener('click', e => { if (e.target === permModal) closePermModal(); });
$('#permSearch').addEventListener('input', e => { permSearchVal = e.target.value; renderPermList(); });
$('#permPickSearch').addEventListener('input', e => { permPickSearch = e.target.value; renderPermPick(); });
$('#permPickList').addEventListener('click', e => { const row = e.target.closest('.perm-pickrow'); if(!row) return; const id = +row.dataset.id; if (PERM.members.indexOf(id)<0){ PERM.members.push(id); fgToast('Membro adicionado'); } renderPermPick(); renderPermList(); });
$('#permList').addEventListener('click', e => { const btn = e.target.closest('.perm-remove'); if(!btn) return; const id = +btn.dataset.id; PERM.members = PERM.members.filter(m => m !== id); fgToast('Membro removido'); renderPermList(); });
$('#rpClose').addEventListener('click', closePlayer);
(function(){ let t=null; rvFeed.addEventListener('scroll', ()=>{ clearTimeout(t); t=setTimeout(rvArmTimer, 160); }); })();

/* ---- Rolagem infinita ----
   A lista tem fim, mas o gesto nao: insistir para baixo no ultimo short leva
   ao primeiro, e insistir para cima no primeiro leva ao ultimo. E a mesma
   volta que as setas ja davam, agora tambem na roda do mouse e no dedo.
   O intervalo evita que um unico gesto (que dispara varios eventos) de mais
   de uma volta. */
(function(){
  let ultimaVolta = 0;
  function pontaDaLista(dir){
    const alt = rvFeed.clientHeight || 1;
    const fim = (playerList.length - 1) * alt;
    if (dir > 0 && rvFeed.scrollTop >= fim - 2) return 1;    /* passou do ultimo */
    if (dir < 0 && rvFeed.scrollTop <= 2) return -1;         /* subiu do primeiro */
    return 0;
  }
  function volta(dir){
    if (!playerList.length || playerList.length < 2) return;
    const d = pontaDaLista(dir); if (!d) return;
    const agora = Date.now(); if (agora - ultimaVolta < 700) return;
    ultimaVolta = agora;
    playerGo(d);
  }
  rvFeed.addEventListener('wheel', e => { volta(e.deltaY); }, { passive:true });
  let toqueY = null;
  rvFeed.addEventListener('touchstart', e => { toqueY = e.touches[0].clientY; }, { passive:true });
  rvFeed.addEventListener('touchmove', e => {
    if (toqueY === null) return;
    const d = toqueY - e.touches[0].clientY;      /* arrastar para cima = avancar */
    if (Math.abs(d) < 40) return;
    volta(d);
  }, { passive:true });
  rvFeed.addEventListener('touchend', () => { toqueY = null; }, { passive:true });
})();
let rvMuted = true;
function rvSyncAudio(){
  const slides=rvFeed.querySelectorAll('.rv-reel');
  const w=rvFeed.clientHeight||1;
  const i=Math.min(Math.max(Math.round(rvFeed.scrollTop/w),0),Math.max(0,slides.length-1));
  slides.forEach((s,k)=>{
    const v=s.querySelector('video'); if(v){ v.muted = rvMuted || k!==i; v.volume = rvVol; }
    /* o embed do YouTube nao tem propriedade: recebe comando */
    const f=s.querySelector('iframe[data-src]');
    if(f && typeof rvComandaEmbed === 'function'){
      const mudo = rvMuted || k!==i;
      rvComandaEmbed(f, mudo ? 'mute' : 'unMute');
      if(!mudo) rvComandaEmbed(f, 'setVolume', [Math.round(rvVol*100)]);
    }
  });
  rvFeed.querySelectorAll('[data-rvmute]').forEach(b=>{
    const ic = rvMuted ? 'xmark' : (rvVol<.5 ? 'low' : 'high');
    b.innerHTML='<i class="fa-solid fa-volume-'+ic+'"></i>';
    b.title = rvMuted ? 'Ativar som' : 'Desativar som';
  });
  rvFeed.querySelectorAll('[data-rvvol]').forEach(s=>{ if(s!==document.activeElement) s.value = rvMuted ? 0 : Math.round(rvVol*100); });
}
rvFeed.addEventListener('mousedown', e => { if(!e.target.closest('[data-rvvol]')) e.preventDefault(); });
rvFeed.addEventListener('focusin', e => { if(e.target.closest('[data-rvvol]')) return; if(e.target.blur) e.target.blur(); });
let rvVol = .7;
function rvLockScroll(){
  const t=rvFeed.scrollTop, until=Date.now()+500;
  const keep=()=>{ if(Math.abs(rvFeed.scrollTop-t)>1) rvFeed.scrollTop=t; if(Date.now()<until) requestAnimationFrame(keep); };
  requestAnimationFrame(keep);
}
document.addEventListener('click', e => {
  const b=e.target.closest('[data-rvmute]'); if(!b) return;
  e.stopPropagation(); e.preventDefault(); b.blur(); rvLockScroll();
  rvMuted=!rvMuted; rvSyncAudio();
});
document.addEventListener('input', e => {
  const s=e.target.closest('[data-rvvol]'); if(!s) return;
  rvVol=(+s.value)/100; rvMuted = rvVol===0; rvLockScroll(); rvSyncAudio();
});
document.addEventListener('pointerup', e => { const s=e.target.closest('[data-rvvol]'); if(s) setTimeout(()=>s.blur(), 60); });
document.addEventListener('mouseleave', e => { const w=e.target.closest&&e.target.closest('[data-rvaudio]'); if(!w) return; const s=w.querySelector('[data-rvvol]'); if(s) s.blur(); }, true);
document.addEventListener('pointerdown', e => { if(e.target.closest('[data-rvaudio]')) rvLockScroll(); });
$('#rvUp').addEventListener('click', () => playerGo(-1));
$('#rvDown').addEventListener('click', () => playerGo(1));
document.addEventListener('keydown', e => {
  if (reelsPlayer.classList.contains('open')){
    if (e.key === 'Escape'){ closePlayer(); return; }
    if (e.key === 'ArrowLeft'){ playerGo(-1); return; }
    if (e.key === 'ArrowRight'){ playerGo(1); return; }
    return;
  }
  if (e.key === 'Escape'){
    if (permModal.classList.contains('open')){ closePermModal(); return; }
    if (catModal.classList.contains('open')){ catCloseModal(); return; }
    if (permView.classList.contains('open')){ closeStoriesModule(); return; }
    if (catView.classList.contains('open')){ closeStoriesModule(); return; }
    if (reelsView.classList.contains('open')){ if (rmodSide.classList.contains('open')) closeStoriesModule(); else closeStories(); }
  }
});

reelsPlayer.addEventListener('pointerup', e => {
  if(e.pointerType!=='mouse') return;
  const t=rvFeed.scrollTop;
  requestAnimationFrame(()=>{ if(Math.abs(rvFeed.scrollTop-t)>2) rvFeed.scrollTop=t; });
});
/* o botao de pausar do topo, na mesma linha do fechar */
reelsPlayer.addEventListener('click', e => {
  const bp = e.target.closest('[data-rvplay]');
  if (bp){ e.preventDefault(); e.stopPropagation(); rvTogglePause(bp.closest('.rv-reel')); return; }
  const bs = e.target.closest('[data-rvshare]');
  if (bs && typeof rvShareAbrir === 'function'){ e.preventDefault(); e.stopPropagation(); rvShareAbrir(bs.closest('.rv-reel')); }
}, true);
reelsPlayer.addEventListener('click', e => {
  if (!e.target.closest('.rv-rail,.rv-info,.rv-nav,.rp-close,.rv-audio,.rv-ctl,[data-rvvol],input,button,a')){
    e.preventDefault(); e.stopPropagation();
    const alvo = rvFeed.querySelector('.rv-reel.playing') || rvFeed.querySelector('.rv-reel');
    const emb = alvo && alvo.querySelector('iframe[data-src]');
    if (emb && !alvo.classList.contains('embed-ok') && !alvo.classList.contains('paused')){
      /* o video nunca chegou a andar: o toque e a autorizacao que faltava */
      if (typeof rvComandaEmbed === 'function'){ rvComandaEmbed(emb, 'unMute'); rvComandaEmbed(emb, 'mute'); rvComandaEmbed(emb, 'playVideo'); }
      return;
    }
    rvTogglePause(alvo);
    return;
  }
  /* aprovar/reprovar: o slide diz qual short e, pela posicao na lista */
  const dec = e.target.closest('[data-rvapr],[data-rvrej]');
  if (dec){
    const slide = dec.closest('.rv-reel');
    const i = slide ? [...rvFeed.children].indexOf(slide) : -1;
    if (i > -1 && typeof rvDecidir === 'function') rvDecidir(playerList[i], dec.hasAttribute('data-rvapr'));
    return;
  }
  const like = e.target.closest('.rv-act.like');
  if (like){
    const p = parseInt(like.dataset.p, 10);
    const on = !isLiked(p);
    setLiked(p, on);
    like.classList.toggle('on', on);
    const r = REELS_DATA.find(x => x.p === p);
    if (r) like.querySelector('span').textContent = likeDisplay(r);
    const btn = like.querySelector('button');
    btn.style.transform = 'scale(1.25)';
    setTimeout(() => { btn.style.transform = ''; }, 150);
    return;
  }
  const save = e.target.closest('.rv-act.save');
  if (save){
    save.classList.toggle('on');
    const ic = save.querySelector('i');
    ic.className = save.classList.contains('on') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
    return;
  }
  const follow = e.target.closest('.rv-follow');
  if (follow){
    follow.classList.toggle('following');
    follow.textContent = follow.classList.contains('following') ? 'Seguindo' : 'Seguir';
  }
});

let seenT;
rvFeed.addEventListener('scroll', () => { clearTimeout(seenT); seenT = setTimeout(markVisibleSeen, 500); });

function buildStories(){
  renderShortsInto(row);
  const alt = document.getElementById('nvfStoriesRow');
  if (alt) renderShortsInto(alt);
  updArrows();
  updateShortsNavBadge();
  updNvfArrows();
}
const SHORT_SUGESTOES = [
  { ic:'fa-bullhorn', txt:'Clique para divulgar suas campanhas' },
  { ic:'fa-trophy',   txt:'Clique para compartilhar conquistas' },
  { ic:'fa-box-open', txt:'Clique para anunciar um lançamento' },
  { ic:'fa-star',     txt:'Clique para compartilhar um momento' },
  /* uma sugestao a mais: com o "Criar short" na frente, sao seis cartoes,
     que o space-between do .shorts espalha ate a borda sem rolagem */
  { ic:'fa-lightbulb',    txt:'Clique para mostrar uma novidade' },
];
function renderShortsInto(row){
  row.innerHTML = '';
  const create = document.createElement('button');
  create.className = 'reel reel-create';
  create.innerHTML = '<span class="rc-bg"><span class="rc-plus2"><i class="fa-solid fa-plus"></i></span>' +
    '<span class="rc-label">Criar short</span></span>';
  create.addEventListener('click', crOpen);
  row.appendChild(create);
  /* Sem nenhum short publicado, a fileira não fica vazia: sobra o "Criar short"
     e, ao lado, sugestões do que gravar — cada uma abre o mesmo criador. */
  if (document.body.classList.contains('demo-empty')) {
    SHORT_SUGESTOES.forEach(s => {
      const b = document.createElement('button');
      b.className = 'reel reel-sugestao';
      b.innerHTML = '<span class="rs-ic"><i class="fa-solid ' + s.ic + '"></i></span>' +
                    '<span class="rs-txt">' + s.txt + '</span>';
      b.addEventListener('click', crOpen);
      row.appendChild(b);
    });
    return;
  }
  /* Como no Instagram: até 10 não vistos na frente, na ordem curada, e os já
     assistidos no fim da fila, na ordem em que foram vistos. O visto não some:
     desce para o fim e o próximo não visto entra no lugar dele. */
  const ordem = orderedShorts(true);
  const list = ordem.filter(r => !isSeen(r.p)).slice(0, 10).concat(ordem.filter(r => isSeen(r.p)));
  list.forEach((r, i) => {
    const post = POSTS[r.p];
    const b = document.createElement('button');
    b.className = 'reel' + (isSeen(r.p) ? ' seen' : '') + (r.pendAppr ? ' is-pend' : '');
    b.innerHTML =
      (r.pendAppr ? '<span class="reel-pend" title="Aguardando aprovação"><i class="fa-solid fa-clock"></i> Aguardando</span><span class="pend-borda"></span>' : '') +
      '<span class="reel-fundo"></span>' +
      ((post.img||post.poster) ? '<img class="reel-img" src="' + (post.img||post.poster) + '" alt="' + post.alt + '" loading="lazy">'
                : '<video class="reel-img" src="' + post.video + '" muted preload="metadata"></video>') +
      '<span class="reel-av"><span class="avatar ' + post.av + '">' + post.initials + '</span></span>' +
      '<span class="reel-body"><span class="reel-title">' + post.title + '</span>' +
      '<span class="reel-meta">' + post.label + '</span></span>';
    b.addEventListener('click', () => openPlayer(list, i));
    ajustaFundo(b.querySelector('.reel-img'));
    row.appendChild(b);
  });
}
function updNvfArrows(){
  const r = document.getElementById('nvfStoriesRow'); if(!r) return;
  const l = document.getElementById('nvfStLeft'), rt = document.getElementById('nvfStRight');
  if(!l||!rt) return;
  /* Com a tela fechada a fileira mede 0x0, entao scrollWidth e clientWidth
     empatam e a seta da direita se escondia — e nada refazia a conta quando
     a tela abria. O mesmo teste de transbordo que a home usa resolve. */
  const transborda = r.scrollWidth > r.clientWidth + 4;
  const max = r.scrollWidth - r.clientWidth - 2;
  l.hidden  = !transborda || r.scrollLeft <= 2;
  rt.hidden = !transborda || r.scrollLeft >= max;
}
function updateShortsNavBadge(){
  const b = document.getElementById('navStoriesBadge'); if(!b) return;
  const unseen = REELS_DATA.filter(r=>!isSeen(r.p)).length;
  b.textContent = unseen>99?'99+':unseen;
  b.style.display = unseen>0 ? '' : 'none';
}
buildStories();

/* ---------- Visualizador (navega post a post) ---------- */
const viewer   = $('#storyViewer');
const svContent= $('#svContent');
const svProg   = $('#svProgress');
const svAv     = $('#svAv');
const svName   = $('#svName');
const svTime   = $('#svTime');
const DUR = 5000;
let cur = 0, timer = null;

function markSeen(i){
  const post = POSTS[i];
  if (post) post.el.classList.add('seen');
}

function openPost(i){
  cur = i;
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  markSeen(cur);
  showPost();
}

function closeViewer(){
  viewer.hidden = true;
  document.body.style.overflow = '';
  clearTimeout(timer);
}

function showPost(){
  const post = POSTS[cur];

  svContent.style.background = '#0a1016';
  svContent.innerHTML = '<img class="sv-img" src="' + post.img + '" alt="' + post.alt + '">';

  svAv.className = 'avatar ' + post.av;
  svAv.textContent = post.initials;
  svName.textContent = post.name;
  svTime.textContent = post.role;

  svProg.innerHTML = POSTS
    .map((_, k) => '<div class="sv-seg' + (k < cur ? ' done' : '') + '"><span class="fill"></span></div>')
    .join('');
  const seg  = svProg.children[cur];
  seg.classList.add('active');
  const fill = seg.querySelector('.fill');
  fill.style.transitionDuration = DUR + 'ms';
  requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = '100%'; }));

  clearTimeout(timer);
  timer = setTimeout(nextPost, DUR);
}

function nextPost(){
  if (cur < POSTS.length - 1){ cur++; markSeen(cur); showPost(); }
  else { closeViewer(); }
}

function prevPost(){
  if (cur > 0){ cur--; showPost(); }
}

$('#svClose').addEventListener('click', closeViewer);
$('#svBackdrop').addEventListener('click', closeViewer);
$('#svNext').addEventListener('click', nextPost);
$('#svPrev').addEventListener('click', prevPost);
$('#tapR').addEventListener('click', nextPost);
$('#tapL').addEventListener('click', prevPost);

document.addEventListener('keydown', e => {
  if (viewer.hidden) return;
  if (e.key === 'Escape') closeViewer();
  if (e.key === 'ArrowRight') nextPost();
  if (e.key === 'ArrowLeft') prevPost();
});

