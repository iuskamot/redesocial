/* blocos menores que ficavam soltos no fim do documento */
function permConfirm(title, msg, onOk){
  let bd=document.getElementById('permConfirmBd');
  if(!bd){ bd=document.createElement('div'); bd.id='permConfirmBd'; bd.className='qp-back'; bd.innerHTML='<div class="qp-modal" style="width:min(440px,92%)"><div style="padding:24px 26px"><h3 id="pcfTitle" style="font-size:18px;font-weight:700;color:var(--ink);margin-bottom:8px"></h3><p id="pcfMsg" style="font-size:14px;color:var(--muted);line-height:1.55"></p><div style="display:flex;justify-content:flex-end;gap:10px;margin-top:22px"><button class="fo-btn ghost" id="pcfNo">Cancelar</button><button class="fo-btn" id="pcfYes">Confirmar</button></div></div></div>'; document.body.appendChild(bd); }
  bd.querySelector('#pcfTitle').textContent=title; bd.querySelector('#pcfMsg').textContent=msg; bd.classList.add('open');
  const close=()=>bd.classList.remove('open');
  bd.querySelector('#pcfNo').onclick=close;
  bd.onclick=(ev)=>{ if(ev.target===bd) close(); };
  bd.querySelector('#pcfYes').onclick=()=>{ close(); onOk&&onOk(); };
}
function syncTgTxt(){ document.querySelectorAll('.perm-tog input[type=checkbox]').forEach(c=>{ const t=c.parentNode.querySelector('.tgtxt'); if(t) t.textContent=c.checked?'Ativo':'Inativo'; }); }
document.addEventListener('change', e=>{ if(e.target.closest('.perm-tog')) syncTgTxt(); });
document.addEventListener('DOMContentLoaded', syncTgTxt); setTimeout(syncTgTxt,300);
(function(){
  var map={pmApproveUnit:'Comentários da unidade',pmApproveMatriz:'Comentários da matriz',pmPostApproveUnit:'Publicações da unidade',pmPostApproveMatriz:'Publicações da matriz',pmShortApproveUnit:'Shorts da unidade',pmShortApproveMatriz:'Shorts da matriz'};
  document.addEventListener('change', function(e){ var t=e.target; if(t&&map[t.id]&&typeof fgToast==='function') fgToast(map[t.id]+(t.checked?' passam a exigir aprovação':' não exigem mais aprovação')); });
})();
document.addEventListener('click',function __cmDropClose(e){ if(!e.target.closest('.comment-menu')){ document.querySelectorAll('.comment-drop').forEach(function(d){d.hidden=true;}); } });
function openCmLikes(count){
  count = count||0; if(count<=0) count=1;
  var el=document.getElementById('cmLikesList'); if(!el) return;
  document.getElementById('cmLikesTitle').textContent = count+(count===1?' curtida':' curtidas');
  var pool=(typeof PEOPLE!=='undefined')?PEOPLE:[];
  var rows='';
  for(var i=0;i<count;i++){ var p=pool[i%Math.max(pool.length,1)]||{name:'Colaborador',av:'av-rc',role:'SULTS'}; rows+='<div class="cml-row"><span class="avatar '+(p.av||'av-rc')+'"></span><div><b>'+p.name+'</b><span>'+(p.role||'SULTS')+'</span></div></div>'; }
  el.innerHTML=rows;
  document.getElementById('cmLikesModal').classList.add('open');
}
(function(){ var m=document.getElementById('cmLikesModal'); if(!m) return; var c=document.getElementById('cmLikesClose'); if(c)c.addEventListener('click',function(){m.classList.remove('open');}); m.addEventListener('click',function(e){ if(e.target===m) m.classList.remove('open'); }); })();
var cmApprCur=null;
function openCmAppr(e){
  cmApprCur=e;
  var $q=function(id){return document.getElementById(id);};
  $q('cmApprAv').className='avatar '+(e.av||'av-rc');
  $q('cmApprName').textContent=e.author||'';
  $q('cmApprUnit').textContent=e.unit||((typeof STORES!=='undefined')?STORES[(e.mid||1)%STORES.length].name:'');
  $q('cmApprText').textContent=e.text||'';
  $q('cmApprPost').textContent=e.post||'';
  var np=(typeof NEWS!=='undefined' && e.newsId)?NEWS.find(function(x){return x.id===e.newsId;}):null;
  var th=$q('cmApprThumb');
  if(np && np.image){ th.style.backgroundImage='url('+np.image+')'; th.className='cmappr-thumb'; th.innerHTML=''; }
  else { th.style.backgroundImage=''; th.className='cmappr-thumb ph'; th.innerHTML='<i class="fa-solid fa-'+((np&&np.article)?'newspaper':'align-left')+'"></i>'; }
  $q('cmApprPsub').textContent = np ? ((np.article?'Artigo':'Publicação')+' · '+(np.sub||'SULTS')) : 'Publicação';
  $q('cmApprPostCard').style.display = e.newsId ? '' : 'none';
  $q('cmApprWhen').textContent=e.dt||e.time||'agora';
  var pend=(typeof MOD_QUEUE!=='undefined') && MOD_QUEUE.some(function(x){return x.mid===e.mid;});
  $q('cmApprOk').style.display=pend?'':'none';
  $q('cmApprRej').style.display=pend?'':'none';
  $q('cmApprModal').classList.add('open');
}
function closeCmAppr(){ var m=document.getElementById('cmApprModal'); if(m) m.classList.remove('open'); cmApprCur=null; }
(function(){
  var m=document.getElementById('cmApprModal'); if(!m) return;
  document.getElementById('cmApprClose').addEventListener('click', closeCmAppr);
  m.addEventListener('click', function(ev){ if(ev.target===m) closeCmAppr(); });
  document.getElementById('cmApprPostCard').addEventListener('click', function(){ var e=cmApprCur; if(!e||!e.newsId) return; closeCmAppr(); focusPublication(e.newsId); });
  document.getElementById('cmApprOk').addEventListener('click', function(){ var e=cmApprCur; if(!e) return; if(e.approve) e.approve(); modRemove(e.mid,'aprovado'); fgToast('Comentário aprovado'); closeCmAppr(); });
  document.getElementById('cmApprRej').addEventListener('click', function(){ var e=cmApprCur; if(!e) return; askReject(function(motivo){ e.motivo=motivo; if(e.reject) e.reject(); modRemove(e.mid,'rejeitado'); fgToast('Comentário recusado'); closeCmAppr(); }); });
})();
var pubApprCur=null;
function openPubAppr(n){
  pubApprCur=n;
  var $q=function(id){return document.getElementById(id);};
  var th=$q('pubApprThumb');
  if(n.image){ th.style.backgroundImage='url('+n.image+')'; th.className='cmappr-thumb'; th.innerHTML=''; }
  else { th.style.backgroundImage=''; th.className='cmappr-thumb ph'; th.innerHTML='<i class="fa-solid fa-'+(n.article?'newspaper':'align-left')+'"></i>'; }
  $q('pubApprType').textContent = n.article?'Artigo':'Publicação';
  $q('pubApprTitle').textContent = n.title||'(sem título)';
  $q('pubApprSub').textContent = n.sub||'SULTS';
  $q('pubApprAv').className='avatar '+(n.av||'av-rc');
  $q('pubApprName').textContent=n.author||'SULTS';
  $q('pubApprUnit').textContent=n.unit||((typeof STORES!=='undefined')?STORES[(n.paid||1)%STORES.length].name:'');
  $q('pubApprText').textContent=(n.text||'').replace(/<[^>]+>/g,'').slice(0,400)||',';
  $q('pubApprWhen').textContent=n.date||'agora';
  var pend=(typeof PUB_APPR!=='undefined') && PUB_APPR.some(function(x){return x.paid===n.paid;});
  $q('pubApprActs').style.display=pend?'flex':'none';
  var _old=$q('pubApprModal').querySelector('#reelFailNote'); if(_old) _old.remove();
  if(!n.__story && (n.proc || n.procFail)){
    var _ok=$q('pubApprOk'), _acts=$q('pubApprActs');
    var _bd=$q('pubApprCard') && $q('pubApprCard').parentElement;
    if(n.procFail){ if(_acts) _acts.style.display='flex'; if(_ok) _ok.style.display='none';
      if(_bd) _bd.insertAdjacentHTML('afterbegin','<div class="reel-failnote" id="reelFailNote"><i class="fa-solid fa-triangle-exclamation"></i><div><b>Falha no processamento</b><span>Atenção: houve uma falha na formatação do arquivo enviado. Esta publicação não pode ser aprovada. É necessário que o autor reenvie o arquivo para aprovação.</span></div></div>');
    } else { if(_acts) _acts.style.display='none';
      if(_bd) _bd.insertAdjacentHTML('afterbegin','<div class="reel-failnote reel-procnote" id="reelFailNote"><span class="rl-spin"></span><div><b>Em processamento</b><span>A aprovação fica disponível quando o processamento terminar.</span></div></div>');
    }
  } else if(!n.__story){ var _ok2=$q('pubApprOk'); if(_ok2) _ok2.style.display=''; }
  var _h2=$q('pubApprModal').querySelector('.fg-head h2'); if(_h2 && !n.__story) _h2.textContent='Aprovar publicação';
  $q('pubApprModal').classList.add('open');
}
function closePubAppr(){ var m=document.getElementById('pubApprModal'); if(m) m.classList.remove('open'); pubApprCur=null; }
(function(){
  var m=document.getElementById('pubApprModal'); if(!m) return;
  document.getElementById('pubApprClose').addEventListener('click', closePubAppr);
  m.addEventListener('click', function(ev){ if(ev.target===m) closePubAppr(); });
  document.getElementById('pubApprCard').addEventListener('click', function(){
    var n=pubApprCur; if(!n) return;
    closePubAppr();
    if(n.__story){
      if(n.procFail || n.proc) { fgToast('Short indisponível: arquivo ainda não processado'); return; }
      var idx = (typeof n.rid==='number') ? n.rid : parseInt(String(n.paid||'').replace('short-',''),10);
      if(typeof openPlayer==='function' && typeof REELS_DATA!=='undefined' && REELS_DATA[idx]) { openPlayer(REELS_DATA, idx); return; }
    }
    reviewPub(n);
  });
  function storyDecide(n, ok, motivo){
    var rid = (typeof n.rid==='number') ? n.rid : parseInt(String(n.paid||'').replace('short-',''),10);
    var r = REEL_APPR.find(function(x){ return x.rid===rid; });
    REEL_APPR = REEL_APPR.filter(function(x){ return x.rid!==rid; });
    if(r){
      r.apprStatus = ok ? 'aprovado' : 'rejeitado';
      r.decidedBy = 'Rodrigo Caetano';
      r.decidedAt = (typeof aprDT==='function') ? aprDT() : r.date;
      if(!ok) r.motivo = motivo || (n.procFail ? 'Falha no processamento do arquivo.' : '');
      REEL_HIST.unshift(r);
    }
    if(typeof aprBadges==='function') aprBadges();
    renderReelAppr();
    fgToast(ok ? 'Short aprovado' : 'Short recusado');
  }
  document.getElementById('pubApprOk').addEventListener('click', function(){
    var n=pubApprCur; if(!n) return;
    closePubAppr();
    if(n.__story){ storyDecide(n, true); return; }
    reviewingPub=n; reviewDecide(true);
  });
  document.getElementById('pubApprRej').addEventListener('click', function(){
    var n=pubApprCur; if(!n) return;
    closePubAppr();
    if(n.__story){
      if(n.procFail){ storyDecide(n, false); return; }
      askReject(function(motivo){ storyDecide(n, false, motivo); });
      return;
    }
    reviewingPub=n;
    if(n.procFail){ window.__skipReject=true; reviewDecide(false); window.__skipReject=false; return; }
    reviewDecide(false);
  });
})();

document.addEventListener('click',function(e){ if(e.target.closest('#rxHeaderNew')||e.target.closest('#rxSocialNew')){ if(typeof crOpen==='function') crOpen(); else { var b=document.getElementById('rmodNew'); if(b) b.click(); } } });

document.addEventListener('click',function(e){
  if(e.target.closest('#rmodFeed')){
    document.querySelectorAll('#rmodSide .rmod-item').forEach(function(b){ b.classList.remove('active'); });
    var f=document.getElementById('rmodFeed'); if(f) f.classList.add('active');
    try{
      curView='grade';
      var g=document.getElementById('rxVGrade'), l=document.getElementById('rxVLista');
      if(g) g.classList.add('active'); if(l) l.classList.remove('active');
      closeCats(); closePerm();
      openStories();
      document.querySelectorAll('#rmodSide .rmod-item').forEach(function(b){ b.classList.remove('active'); });
      if(f) f.classList.add('active');
    }catch(err){}
  }
});
(function(){
  var r=document.getElementById('nvfStoriesRow');
  var l=document.getElementById('nvfStLeft'), rt=document.getElementById('nvfStRight');
  if(r){
    r.addEventListener('scroll', function(){ if(typeof updNvfArrows==='function') updNvfArrows(); });
    if(l) l.addEventListener('click', function(){ r.scrollBy({left:-r.clientWidth*0.8, behavior:'smooth'}); });
    if(rt) rt.addEventListener('click', function(){ r.scrollBy({left:r.clientWidth*0.8, behavior:'smooth'}); });
  }
  document.addEventListener('click', function(e){
    if(e.target.closest('#nvfStoriesAll')){ e.preventDefault(); if(typeof newsShow==='function') newsShow('shorts'); return; }
    if(e.target.closest('#nmtFeed')||e.target.closest('#tileNews')||e.target.closest('#navNews')) setTimeout(function(){ if(typeof buildStories==='function') buildStories(); },150);
  });
  setTimeout(function(){ if(typeof buildStories==='function') buildStories(); }, 700);
})();
function openRailAll(title, arr){
  var grid=document.getElementById('rxGrid'); if(!grid) return;
  grid.style.display='block';
  var head='<div class="rail-allhd"><button class="rail-back" id="railBack"><i class="fa-solid fa-arrow-left"></i></button>'+
    '<div><h3>'+title+'</h3><small>'+arr.length+' shorts</small></div></div>';
  grid.innerHTML=head+'<div class="rail-allgrid"></div>';
  var g=grid.querySelector('.rail-allgrid');
  arr.forEach(function(r,i){ var w=document.createElement('div'); w.innerHTML=reelCardHTML(r); var c=w.firstElementChild;
    c.addEventListener('click', function(){ openPlayer(arr, i); });
    g.appendChild(c); });
  var bk=document.getElementById('railBack');
  if(bk) bk.addEventListener('click', function(){ renderGrid(); });
  var main=document.querySelector('.rx-main'); if(main) main.scrollTop=0;
}
document.addEventListener('click', function(e){
  var m=document.getElementById('railAllModal'); if(!m) return;
  if(e.target.closest('#railAllClose') || e.target===m) m.classList.remove('open');
});
function openReelInfo(r){
  var post=POSTS[r.p], cat=(typeof catById==='function'?catById(r.cat):null);
  var m=document.getElementById('reelInfoModal'), b=document.getElementById('riBody'); if(!m||!b) return;
  var v=numVal(r.views), l=numVal(likeDisplay(r));
  var cm=r.comments||Math.max(3,Math.round(v/900));
  var eng=v?(((l+cm)/v)*100).toFixed(1)+'%':',';
  var emp=post.company||post.store||post.label||'SULTS';
  var kpi=function(ic,val,lb){return '<div class="ri-kpi"><i class="fa-solid '+ic+'"></i><b>'+val+'</b><span>'+lb+'</span></div>';};
  var row=function(k,val){return '<div class="ri-row"><b>'+k+'</b><span>'+val+'</span></div>';};
  var stat=function(v,lb,act,lbl){
    if(!act) return '<div class="dv-stat"><b>'+v+'</b><span>'+lb+'</span></div>';
    return '<div class="dv-stat dv-statcard"><b>'+v+'</b><span>'+lb+'</span>'+
      '<button type="button" class="dv-statlink" data-ri="'+act+'">'+(lbl||('Ver '+lb.toLowerCase()))+' <i class="fa-solid fa-chevron-right"></i></button></div>'; };
  var field=function(k,v){return '<div class="dv-field"><span class="dv-fk">'+k+'</span><span class="dv-fv">'+v+'</span></div>';};
  b.innerHTML='<div class="dv">'+
      '<div class="dv-head">'+
        '<div class="dv-thumb portrait" style="background-image:url('+(post.img||'')+')" data-ri="play"><i class="fa-solid fa-play"></i></div>'+
        '<div class="dv-headmain">'+
          '<h3 class="dv-title">'+(post.title||post.alt||'Short')+'</h3>'+
          '<p class="dv-sub">'+(post.caption||post.alt||'')+'</p>'+
          '<div class="dv-fields">'+
            field('Categoria', cat?'<span class="dv-catdot" style="background:'+cat.color+'"></span>'+cat.name:'Sem categoria')+
            field('Formato', rFormat(r)==='imagem'?'Imagem':'Vídeo')+
            field('Situação','Publicado')+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="dv-byline"><span class="avatar '+post.av+'"></span>'+
        '<div class="dv-bytxt"><b>'+post.name+'</b><span>'+emp+'</span></div>'+
        '<span class="dv-when">'+rxPubDT(post.time)+'</span></div>'+
      '<div class="dv-stats">'+
        stat(r.views,'Visualizações','views','Ver quem assistiu')+stat(likeDisplay(r),'Curtidas','likes','Ver quem curtiu')+
      '</div>'+
    '</div>'+
    '<div class="dv-foot">'+
      '<span style="flex:1"></span>'+
      '<button class="dv-primary" data-ri="play"><i class="fa-solid fa-play"></i> Assistir short</button></div>';
  b.onclick=function(e){ var t=e.target.closest('[data-ri]'); if(!t) return; var a=t.dataset.ri;
    if(a==='play'){ m.classList.remove('open'); openPlayer([r],0); }
    else { m.classList.remove('open'); openReelAudience(r, a); } };
  m.classList.add('open');
}
document.addEventListener('click', function(e){
  var ft=e.target.closest('[data-fltoggle]');
  if(ft){
    var scope=ft.closest('.nv-screen')||ft.closest('#reelsView');
    if(scope){
      var off=scope.classList.toggle('nofilters');
      ft.querySelector('span').textContent = off ? 'Mostrar filtros' : 'Esconder filtros';
      ft.querySelector('.fl-carat').className = 'fa-solid fa-chevron-'+(off?'down':'up')+' fl-carat';
    }
    return;
  }
  var cap=e.target.closest('[data-rvcap]');
  if(cap){ var cm=document.getElementById('rvCapModal'); document.getElementById('rvCapBody').textContent=cap.textContent.trim(); cm.classList.add('open'); return; }
  var cm2=document.getElementById('rvCapModal');
  if(cm2 && (e.target.closest('#rvCapClose')||e.target===cm2)) cm2.classList.remove('open');
  var m=document.getElementById('reelInfoModal'); if(!m) return;
  if(e.target.closest('#riClose')||e.target===m) m.classList.remove('open');
});
function openNewsInfo(n){
  var m=document.getElementById('newsInfoModal'), b=document.getElementById('niBody'); if(!m||!b) return;
  var cat=(typeof newsCatByName==='function'?newsCatByName(n.sub):null);
  var title=n.title || (n.text? n.text.replace(/<[^>]+>/g,'').slice(0,70) : 'Publicação');
  var rx=n.reactions||0, cm=(n.comments||0)+((n.cmts&&n.cmts.length)||0);
  var views=(typeof newsViews==='function')?newsViews(n):(rx*7+cm*11+140);
  var eng=views?(((rx+cm)/views)*100).toFixed(1)+'%':',';
  var au=n.autorNome||n.author||'SULTS', av=n.autorAv||n.av||'av-brand';
  var reach={rede:'Toda a rede',unidades:'Unidades',matriz:'Sua Marca (Matriz)'}[n.reach||'rede']||'Toda a rede';
  var kpi=function(ic,val,lb){return '<div class="ri-kpi"><i class="fa-solid '+ic+'"></i><b>'+val+'</b><span>'+lb+'</span></div>';};
  var row=function(k,v){return '<div class="ri-row"><b>'+k+'</b><span>'+v+'</span></div>';};
  var pill=function(ic,txt,col){return '<span class="ri-chip" style="color:'+col+';background:'+col+'16"><i class="fa-solid '+ic+'"></i> '+txt+'</span>';};
  var stat=function(v,lb,act,lbl){
    if(!act) return '<div class="dv-stat"><b>'+v+'</b><span>'+lb+'</span></div>';
    return '<div class="dv-stat dv-statcard"><b>'+v+'</b><span>'+lb+'</span>'+
      '<button type="button" class="dv-statlink" data-ni="'+act+'">'+(lbl||('Ver '+lb.toLowerCase()))+' <i class="fa-solid fa-chevron-right"></i></button></div>'; };
  var field=function(k,v){return '<div class="dv-field"><span class="dv-fk">'+k+'</span><span class="dv-fv">'+v+'</span></div>';};
  var cover = n.image ? '<div class="dv-thumb" style="background-image:url('+n.image+')"></div>'
    : '<div class="dv-thumb ph"><i class="fa-solid fa-'+(n.article?'newspaper':'align-left')+'"></i></div>';
  b.innerHTML='<div class="dv">'+
      '<div class="dv-head">'+cover+
        '<div class="dv-headmain">'+
          '<h3 class="dv-title">'+title+'</h3>'+
          '<p class="dv-sub">'+((n.article&&n.article.lead)||(n.text?n.text.replace(/<[^>]+>/g,'').slice(0,160):''))+'</p>'+
          '<div class="dv-fields">'+
            field('Categoria', cat?'<span class="dv-catdot" style="background:'+cat.color+'"></span>'+cat.name:'Sem categoria')+
            field('Tipo', n.article?'Artigo':'Post')+
            field('Situação', n.status==='pub'?'Publicada':'Rascunho')+
            (n.pinned?field('Destaque','Fixada no feed'):'')+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="dv-byline"><span class="avatar '+av+'"></span>'+
        '<div class="dv-bytxt"><b>'+au+'</b><span>'+reach+'</span></div>'+
        '<span class="dv-when">'+(n.date||'')+'</span></div>'+
      '<div class="dv-stats">'+
        stat(views.toLocaleString('pt-BR'),'Visualizações','views','Ver quem visualizou')+stat(rx,'Reações','rx','Ver reações')+stat(cm,'Comentários','cm','Ver comentários')+
      '</div>'+
    '</div>'+
    '<div class="dv-foot">'+
      '<span style="flex:1"></span>'+
      '<button class="dv-primary" data-ni="open"><i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir publicação</button></div>';
  b.onclick=function(e){ var t=e.target.closest('[data-ni]'); if(!t) return; var a=t.dataset.ni;
    m.classList.remove('open');
    if(a==='open') openArticle(n);
    else if(a==='views') openNewsViewers(n, views.toLocaleString('pt-BR'));
    else if(a==='rx') openReactions(0);
    else if(a==='cm') openInterModal(title);
    else if(a==='edit') nvEdit(n.id); };
  m.classList.add('open');
}
document.addEventListener('click', function(e){
  var m=document.getElementById('newsInfoModal'); if(!m) return;
  if(e.target.closest('#niClose')||e.target===m) m.classList.remove('open');
});
document.addEventListener('click', function(e){
  if(e.target.closest('#tileSocial')){ e.preventDefault(); var t=document.getElementById('tileNews'); if(t) t.click(); }
});
/* Arrastar para rolar horizontalmente as tabelas */
(function(){
  var SEL='.rl-tblwrap,.nv-listmain .rlist,#interList.rlist,#modQueue .rlist,#pubApprQueue .rlist,#reelApprQueue .rlist';
  var el=null,x0=0,l0=0,moved=false;
  document.addEventListener('pointerdown',function(e){
    if(e.button!==0) return;
    var t=e.target.closest(SEL); if(!t) return;
    if(t.scrollWidth<=t.clientWidth) return;
    if(e.target.closest('button,a,input,select,textarea,label')) return;
    el=t; x0=e.clientX; l0=t.scrollLeft; moved=false;
  });
  document.addEventListener('pointermove',function(e){
    if(!el) return;
    var dx=e.clientX-x0;
    if(!moved && Math.abs(dx)<4) return;
    if(!moved){ moved=true; el.style.cursor='grabbing'; el.style.userSelect='none'; }
    el.scrollLeft=l0-dx;
    e.preventDefault();
  });
  function end(){ if(!el) return; el.style.cursor=''; el.style.userSelect='';
    if(moved){ var c=function(ev){ ev.stopPropagation(); document.removeEventListener('click',c,true); };
      document.addEventListener('click',c,true);
      setTimeout(function(){ document.removeEventListener('click',c,true); },0); }
    el=null; }
  document.addEventListener('pointerup',end);
  document.addEventListener('pointercancel',end);
})();

/* No celular, escolher um vídeo abre o preview em tela cheia em vez de jogá-lo
   dentro do editor. Este listener é registrado depois dos originais, então
   quando ele roda o qpVideo já foi preenchido por eles. */
(() => {
  const soMobile = () => window.matchMedia('(max-width:640px)').matches;
  const prev = document.getElementById('mvidPrev');
  const video = document.getElementById('mvidVideo');
  if (!prev || !video) return;

  const imagem = document.getElementById('mvidImg');
  let aoFechar = null;   /* o que o X desfaz, definido por quem abriu */

  const abrir = ({ src, ehVideo, canto, fechar }) => {
    aoFechar = fechar || null;
    prev.classList.toggle('tem-img', !ehVideo);
    prev.classList.toggle('mvid--canto', !!canto);
    if (ehVideo) video.src = src; else imagem.src = src;
    prev.hidden = false;
    prev.classList.add('open');
    if (ehVideo) video.play().catch(() => {});   /* autoplay barrado fica no 1º quadro */
  };
  const esconder = () => {
    prev.classList.remove('open');
    prev.hidden = true;
    video.pause();
    video.removeAttribute('src');
    video.load();
    imagem.removeAttribute('src');
  };

  /* alguns navegadores recusam o autoplay mesmo mudo; o toque resolve */
  video.addEventListener('click', () => { if (video.paused) video.play().catch(() => {}); else video.pause(); });

  /* Próximo: só sai da frente — o fluxo de quem abriu continua atrás */
  document.getElementById('mvidNext').addEventListener('click', esconder);

  /* X: sai e desfaz, do jeito que quem abriu definiu */
  document.getElementById('mvidX').addEventListener('click', () => {
    const desfazer = aoFechar;
    esconder();
    if (desfazer) desfazer();
  });

  /* 1) editor de publicação: vídeo escolhido em Imagem/Vídeo */
  ['#qpVideoFile', '#qpImgFile'].forEach(sel => {
    const inp = document.querySelector(sel);
    if (!inp) return;
    inp.addEventListener('change', () => {
      if (!soMobile() || !qpVideo) return;
      abrir({ src: qpVideo, ehVideo: true, canto: false, fechar: () => {
        qpVideo = null;
        ['#qpVideoFile', '#qpImgFile'].forEach(s => { const i = document.querySelector(s); if (i) i.value = ''; });
        if (typeof qpRenderImgs === 'function') qpRenderImgs();
        if (typeof qpClose === 'function') qpClose();
      } });
    });
  });

  /* O short nao passa por aqui: no celular ele segue o mesmo caminho do
     desktop -- carregamento e, logo depois, a tela de editar. */
})();

/* No celular os dois seletores do editor (unidade e categoria) ganham uma linha
   só para eles, abaixo da foto/nome. Para isso precisam ser filhos diretos do
   cabeçalho — no HTML a unidade mora dentro do bloco do autor. No desktop cada
   um volta para o lugar de origem. São os mesmos nós, então listeners e menus
   seguem valendo. */
(() => {
  const head = document.querySelector('#qpBack .qp-head');
  const uni = document.querySelector('#qpBack .qp-unitwrap');
  const cat = document.querySelector('#qpBack .qp-catwrap');
  if (!head || !uni || !cat) return;
  const casaDaUni = uni.parentElement, depoisDaUni = uni.nextElementSibling;
  const casaDaCat = cat.parentElement, depoisDaCat = cat.nextElementSibling;
  const mq = window.matchMedia('(max-width:640px)');
  const posicionar = () => {
    if (mq.matches) {
      if (uni.parentElement !== head) head.appendChild(uni);
      if (cat.parentElement !== head) head.appendChild(cat);
    } else {
      if (uni.parentElement !== casaDaUni) casaDaUni.insertBefore(uni, depoisDaUni);
      if (cat.parentElement !== casaDaCat) casaDaCat.insertBefore(cat, depoisDaCat);
    }
  };
  mq.addEventListener('change', posicionar);
  posicionar();
})();

/* No celular o "Ver +N módulos" mora dentro do cartão dos aplicativos; no
   desktop ele volta para baixo dele. Só o DOM muda — o comportamento é o mesmo. */
(() => {
  const painel = document.getElementById('appsPanel');
  const expand = document.querySelector('.apps-expand');
  if (!painel || !expand) return;
  const foraDoPainel = expand.parentElement;
  const proximoIrmao = expand.nextElementSibling;
  const mq = window.matchMedia('(max-width:640px)');
  const posicionar = () => {
    if (mq.matches) { if (expand.parentElement !== painel) painel.appendChild(expand); }
    else if (expand.parentElement !== foraDoPainel) foraDoPainel.insertBefore(expand, proximoIrmao);
  };
  mq.addEventListener('change', posicionar);
  posicionar();
})();

/* Dentro de Rede Social o modo vazio vale igual à home: a grade de shorts vira
   o "Criar short" com as sugestões, e o feed fica só com o compositor e a
   mensagem. Envolve as funções de render em vez de mexer dentro de cada uma. */
(() => {
  const vazio = () => document.body.classList.contains('demo-empty');

  const rsb = window.renderShortsB;
  if (typeof rsb === 'function') window.renderShortsB = function (...a) {
    const r = rsb.apply(this, a);
    if (!vazio()) return r;
    const el = document.getElementById('sbGrid');
    if (!el) return r;
    const em = document.getElementById('sbEmpty');
    if (em) em.hidden = true;
    el.innerHTML = '';
    const criar = document.createElement('button');
    criar.className = 'reel reel-create';
    criar.innerHTML = '<span class="rc-bg"><span class="rc-plus2"><i class="fa-solid fa-plus"></i></span>' +
                      '<span class="rc-label">Criar short</span></span>';
    criar.addEventListener('click', crOpen);
    el.appendChild(criar);
    SHORT_SUGESTOES.forEach(s => {
      const b = document.createElement('button');
      b.className = 'reel reel-sugestao';
      b.innerHTML = '<span class="rs-ic"><i class="fa-solid ' + s.ic + '"></i></span>' +
                    '<span class="rs-txt">' + s.txt + '</span>';
      b.addEventListener('click', crOpen);
      el.appendChild(b);
    });
    return r;
  };

  const rnf = window.renderNewsFeed;
  if (typeof rnf === 'function') window.renderNewsFeed = function (...a) {
    const r = rnf.apply(this, a);
    const lista = document.getElementById('nvFeed');
    const msg = document.getElementById('nvFeedVazio');
    if (!lista || !msg) return r;
    const semNada = vazio();
    if (semNada) lista.innerHTML = '';
    lista.hidden = semNada;
    msg.hidden = !semNada;
    return r;
  };
})();

/* ============================================================================
   No celular a home é a única tela.
   Em vez de caçar cada botão que leva a um módulo, as próprias funções que
   abrem tela cheia ficam inertes abaixo de 640px — assim qualquer caminho até
   elas (tile, "ver todos", card de perfil, post) para no mesmo lugar. O editor
   de publicação NÃO entra na lista: ele é um modal da própria home.
   Roda por último, quando todas essas funções já foram declaradas.
   ========================================================================== */
(() => {
  const soHome = () => window.matchMedia('(max-width:640px)').matches;
  const saemDaHome = [
    'openStories', 'openStoriesModule', 'openForum', 'openNewsModule',
    'openNewsUser', 'openPersonProfile', 'openArticle', 'openCats', 'openPerm',
  ];
  const semBloqueio = {};
  saemDaHome.forEach(nome => {
    const original = window[nome];
    if (typeof original !== 'function') return;
    semBloqueio[nome] = original;
    window[nome] = function (...args) {
      if (soHome()) return;
      return original.apply(this, args);
    };
  });

  /* A barra é a mesma dentro e fora do módulo; o que muda é qual item fica
     aceso. Um observer cobre todos os caminhos que abrem, fecham ou trocam de
     tela dentro dele. */
  (() => {
    const nv = document.getElementById('newsView');
    const mnav = document.getElementById('mnav');
    if (!nv || !mnav) return;
    const sincroniza = () => {
      const aberto = nv.classList.contains('open');
      mnav.classList.toggle('mnav--modulo', aberto);
      if (!aberto) return;
      const emShorts = !!document.querySelector('#nvShortsBScreen.active');
      mnav.querySelectorAll('button').forEach(b => b.classList.remove('on'));
      const alvo = mnav.querySelector(emShorts ? '[data-t="shorts"]' : '[data-t="feed"]');
      if (alvo) alvo.classList.add('on');
    };
    new MutationObserver(sincroniza).observe(nv, { attributes: true, attributeFilter: ['class'], subtree: true });
    sincroniza();
  })();

  /* Shorts e Publicações são as telas do módulo já adaptadas ao celular, então
     têm uma porta própria que passa por fora do bloqueio. As demais (compor,
     aprovações, configurações, artigo) seguem barradas. */
  window.abrirModuloSocial = function (tela) {
    const abre = semBloqueio.openNewsModule || window.openNewsModule;
    if (typeof abre !== 'function') return;
    abre();
    newsShow(tela || 'shorts');
    /* cada tela do modulo rola por conta propria e lembraria onde parou;
       trocar de aba na barra sempre comeca do topo */
    requestAnimationFrame(function(){
      const s = (tela === 'feed') ? document.querySelector('#nvFeedScreen .nvf-body')
                                  : document.getElementById('nvShortsBScreen');
      if (s) s.scrollTop = 0;
    });
  };
  window.abrirShorts = function () { window.abrirModuloSocial('shorts'); };
})();

/* No celular o toque curto no "Gostei" da o like, e o toque longo abre as
   reacoes. A barra vai para o centro da tela: alinhada ao botao, que fica na
   ponta esquerda do post, ela nao caberia em 375px.
   A classe .rx-toque marca que quem abriu foi o toque — sem ela o mouseover
   que o navegador emula no tap abriria a barra em qualquer toque. */
(() => {
  const soMobile = () => window.matchMedia('(max-width:640px)').matches;
  const ESPERA = 420;      /* o que separa um toque de um toque longo */
  const TOLERANCIA = 8;    /* arrastar mais que isso e rolagem, nao toque longo */
  let timer = null, alvo = null, abriu = false, x0 = 0, y0 = 0;

  const fecha = () => document.querySelectorAll('.react-wrap.open,.react-wrap.rx-toque')
    .forEach(w => w.classList.remove('open', 'rx-toque'));

  const abre = btn => {
    let wrap = btn.closest('.react-wrap');
    /* no feed de publicacoes o wrap so nasce quando o picker roda a primeira vez */
    if (!wrap) {
      const art = btn.closest('.post[data-id]');
      const n = (art && typeof NEWS !== 'undefined') ? NEWS.find(x => x.id === +art.dataset.id) : null;
      if (n && typeof nvRxPicker === 'function') nvRxPicker(btn, art, n);
      wrap = btn.closest('.react-wrap');
    }
    if (!wrap) return;
    fecha();
    const r = btn.getBoundingClientRect();
    /* a barra sobe a partir do botao, mas nunca passa do topo da tela */
    const acima = window.innerHeight - r.top + 8;
    wrap.style.setProperty('--rx-bottom', Math.round(Math.min(acima, window.innerHeight - 84)) + 'px');
    wrap.classList.add('rx-toque', 'open');
    abriu = true;
    if (navigator.vibrate) navigator.vibrate(12);
  };

  const cancela = () => { clearTimeout(timer); alvo = null; };

  document.addEventListener('pointerdown', e => {
    if (!soMobile()) return;
    if (!e.target.closest('.react-wrap')) fecha();
    const btn = e.target.closest('.p-act.like'); if (!btn) return;
    const w = btn.closest('.react-wrap'); if (w) w.classList.remove('open', 'rx-toque');
    alvo = btn; abriu = false; x0 = e.clientX; y0 = e.clientY;
    clearTimeout(timer);
    timer = setTimeout(() => { if (alvo) abre(alvo); }, ESPERA);
  }, true);

  document.addEventListener('pointermove', e => {
    if (!alvo) return;
    if (Math.abs(e.clientX - x0) > TOLERANCIA || Math.abs(e.clientY - y0) > TOLERANCIA) cancela();
  }, true);
  document.addEventListener('pointerup', cancela, true);
  document.addEventListener('pointercancel', cancela, true);

  /* o clique que vem logo depois do toque longo nao pode virar um "Gostei" */
  document.addEventListener('click', e => {
    if (e.target.closest('.react-btn')) { abriu = false; setTimeout(fecha, 260); return; }
    if (!abriu) return;
    if (e.target.closest('.p-act.like')) { e.preventDefault(); e.stopImmediatePropagation(); }
    abriu = false;
  }, true);
})();

/* No celular o teclado nao encolhe a janela: o layout continua com a altura
   toda e as ferramentas e o Publicar ficam escondidos atras dele. O
   visualViewport diz quanto da tela sobrou de verdade; a sobra vira a
   variavel --teclado, que encurta os editores de tela cheia — o rodape sobe
   junto com o teclado, como num aplicativo. */
(() => {
  const vv = window.visualViewport;
  if (!vv) return;
  const raiz = document.documentElement;
  const ajusta = () => {
    const noCelular = window.matchMedia('(max-width:640px)').matches;
    /* offsetTop entra na conta porque o iOS rola a pagina por baixo da janela
       visivel em vez de encolhe-la */
    const coberto = noCelular ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop) : 0;
    raiz.style.setProperty('--teclado', Math.round(coberto) + 'px');
  };
  vv.addEventListener('resize', ajusta);
  vv.addEventListener('scroll', ajusta);
  window.addEventListener('orientationchange', ajusta);
  ajusta();
})();

/* ---- Compartilhar o short ----
   Uma folha com os aplicativos, como a do YouTube. Cada um recebe o link do
   short e o titulo ja montados; o WhatsApp leva titulo e link em linhas
   separadas, que e o que rende a previa bonita na conversa. */
const RV_APPS = [
  { id:'whatsapp', nome:'WhatsApp', ic:'fa-brands fa-whatsapp',  cor:'#25D366',
    url:(l,t)=>'https://api.whatsapp.com/send?text=' + encodeURIComponent(l) },
  { id:'instagram',nome:'Instagram',ic:'fa-brands fa-instagram', cor:'#E1306C',
    url:()=>'https://www.instagram.com/', copiar:true },
  { id:'facebook', nome:'Facebook', ic:'fa-brands fa-facebook-f',cor:'#1877F2',
    url:(l)=>'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(l) },
  { id:'linkedin', nome:'LinkedIn', ic:'fa-brands fa-linkedin-in', cor:'#0A66C2',
    url:(l)=>'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(l) }
];
let rvShareAtual = null;
function rvShareDados(reel){
  const r = (reel && playerList) ? playerList[[...rvFeed.querySelectorAll('.rv-reel')].indexOf(reel)] : null;
  const post = r ? POSTS[r.p] : null;
  const titulo = (post && (post.title || post.alt)) || (r && r.cap) || 'Short';
  /* O link e sempre o do proprio site, nunca o do YouTube: quem recebe entra
     na rede, nao sai dela. Cada short do YouTube tem a propria pagina em
     s/<id>.html, gerada no build, com a capa e o titulo nas etiquetas Open
     Graph — e dali que sai a previa bonita no WhatsApp. Os shorts do proprio
     projeto seguem pelo endereco da home. */
  const base = location.origin + location.pathname.replace(/[^/]*$/, '');
  const link = (post && post.embed)
    ? base + 's/' + post.embed
    : base + '?short=' + (r ? r.p : 0);
  return { titulo: String(titulo).replace(/\s+/g, ' ').trim(), link: link };
}
function rvShareAbrir(reel){
  const fundo = document.getElementById('rvShareBack'); if (!fundo) return;
  rvShareAtual = rvShareDados(reel);
  const apps = document.getElementById('rvShareApps');
  apps.innerHTML = RV_APPS.map(function(a){
    return '<button class="rvsh-app" data-rvapp="' + a.id + '">' +
      '<span class="rvsh-ic" style="background:' + a.cor + '"><i class="' + a.ic + '"></i></span>' +
      '<span class="rvsh-nome">' + a.nome + '</span></button>';
  }).join('');
  document.getElementById('rvShareUrl').textContent = rvShareAtual.link;
  fundo.hidden = false;
}
function rvShareFechar(){
  const fundo = document.getElementById('rvShareBack'); if (fundo) fundo.hidden = true;
}
function rvShareCopiar(){
  const txt = rvShareAtual ? rvShareAtual.link : '';
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).catch(function(){});
  if (typeof fgToast === 'function') fgToast('Link copiado');
}
(function(){
  const fundo = document.getElementById('rvShareBack'); if (!fundo) return;
  document.getElementById('rvShareClose').addEventListener('click', rvShareFechar);
  fundo.addEventListener('click', function(e){ if (e.target === fundo) rvShareFechar(); });
  document.getElementById('rvShareCopy').addEventListener('click', rvShareCopiar);
  fundo.addEventListener('click', function(e){
    const b = e.target.closest('[data-rvapp]'); if (!b) return;
    const a = RV_APPS.find(function(x){ return x.id === b.dataset.rvapp; }); if (!a || !rvShareAtual) return;
    /* o Instagram nao abre com texto por link: copia e leva para o aplicativo */
    if (a.copiar) rvShareCopiar();
    window.open(a.url(rvShareAtual.link, rvShareAtual.titulo), '_blank', 'noopener');
    rvShareFechar();
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !fundo.hidden) rvShareFechar(); });
})();

/* ---- Abrir o short que veio pelo link ----
   A pagina de compartilhamento encaminha para ?short=<id>. Aqui a rede
   descobre de qual cliente aquele short e, liga o cenario certo e abre o
   player nele. Sem isso o link cairia na home e o short ficaria perdido. */
(function(){
  const alvo = new URLSearchParams(location.search).get('short');
  if (!alvo) return;
  function abre(){
    /* short do proprio projeto: o parametro e a posicao na lista */
    if (/^\d+$/.test(alvo)){
      if (typeof openPlayer === 'function' && typeof orderedShorts === 'function') openPlayer(orderedShorts(), +alvo);
      return;
    }
    /* short do YouTube: procura o cliente dono dele */
    let cliente = null;
    if (typeof MARCAS !== 'undefined'){
      for (const k of Object.keys(MARCAS)){
        if (MARCAS[k].shorts.some(s => s.id === alvo)){ cliente = k; break; }
      }
    }
    const noCrunch = (typeof CRUNCH_SHORTS !== 'undefined') && CRUNCH_SHORTS.some(s => s.id === alvo);
    if (cliente && typeof customLigar === 'function') customLigar(cliente);
    else if (noCrunch && typeof customLigar === 'function') customLigar('crunch');
    setTimeout(function(){
      if (typeof orderedShorts !== 'function' || typeof openPlayer !== 'function') return;
      const lista = orderedShorts();
      const i = lista.findIndex(r => { const p = POSTS[r.p]; return p && p.embed === alvo; });
      if (i >= 0) openPlayer(lista, i);
    }, 400);
  }
  /* espera a home terminar de montar */
  if (document.readyState === 'complete') setTimeout(abre, 300);
  else window.addEventListener('load', () => setTimeout(abre, 300));
})();

/* ---- Recorte da foto do perfil e da capa ----
   O mesmo modal atende aos dois: muda a proporcao da janela e para onde o
   recorte vai. A imagem e desenhada num quadro pelo canvas, na escala e na
   posicao que a pessoa escolheu, e o resultado vira a nova foto ou capa. */
(function(){
  const modal = document.getElementById('ppAvModal');
  if (!modal) return;
  const palco  = document.getElementById('ppAvStage');
  const arq    = document.getElementById('ppAvFile');
  const zoomBx = document.getElementById('ppAvZoomWrap');
  const zoom   = document.getElementById('ppAvZoom');
  const titulo = document.getElementById('ppAvTitulo');
  const bSalvar= document.getElementById('ppAvSalvar');
  const bPick  = document.getElementById('ppAvPick');
  const bRem   = document.getElementById('ppAvRemove');

  /* a janela de cada tipo: proporcao na tela e tamanho do arquivo final */
  const TIPOS = {
    foto: { classe:'foto', titulo:'Foto do perfil', prop:1,    saida:[512, 512] },
    capa: { classe:'capa', titulo:'Foto de capa',   prop:3,    saida:[1200, 400] }
  };
  let tipo = 'foto', img = null, escala = 1, base = 1, x = 0, y = 0, janela = null;
  /* PNG sem fundo: guardamos se a imagem tem pixel transparente para pintar
     o vazio com a cor da marca, no lugar do preto que o JPEG produz. */
  let temAlfa = false;

  function corDaMarca(){
    const cs = getComputedStyle(document.body);
    return cs.getPropertyValue('--marca').trim()
        || cs.getPropertyValue('--teal').trim()
        || '#00acac';
  }
  /* uma amostra de 64x64 basta: se algum pixel nao for opaco, a imagem tem
     fundo transparente. O try existe porque um arquivo de outra origem
     contamina o canvas e o getImageData passa a lancar; nesse caso seguimos
     tratando como opaca, que e o comportamento de antes. */
  function temFundoTransparente(im){
    try {
      const n = 64, c = document.createElement('canvas');
      c.width = n; c.height = n;
      const g = c.getContext('2d');
      g.drawImage(im, 0, 0, n, n);
      const d = g.getImageData(0, 0, n, n).data;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 250) return true;
      return false;
    } catch (e) { return false; }
  }

  function medeJanela(){
    const j = palco.querySelector('.ppav-janela');
    if (!j) return { w:260, h:260 };
    const r = j.getBoundingClientRect();
    return { w:r.width, h:r.height };
  }
  function aplica(){
    if (!img) return;
    img.style.transform = 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px) scale(' + escala + ')';
  }
  function limites(){
    /* a imagem nunca deixa aparecer o fundo dentro da janela */
    if (!img || !janela) return;
    const lw = img.naturalWidth * base * escala, lh = img.naturalHeight * base * escala;
    const mx = Math.max(0, (lw - janela.w) / 2), my = Math.max(0, (lh - janela.h) / 2);
    x = Math.min(mx, Math.max(-mx, x));
    y = Math.min(my, Math.max(-my, y));
  }
  function monta(url){
    palco.innerHTML = '';
    const j = document.createElement('div');
    j.className = 'ppav-janela ' + TIPOS[tipo].classe;
    const el = new Image();
    el.className = 'ppav-img';
    el.onload = function(){
      /* a janela so tem tamanho depois de o modal estar na tela; enquanto nao
         tiver, tenta de novo no quadro seguinte */
      let tentativas = 0;
      (function encaixa(){
        janela = medeJanela();
        if ((!janela.w || !janela.h) && tentativas++ < 30) return requestAnimationFrame(encaixa);
        /* comeca cobrindo a janela por inteiro, sem deformar */
        base = Math.max(janela.w / el.naturalWidth, janela.h / el.naturalHeight);
        el.style.width = (el.naturalWidth * base) + 'px';
        el.style.height = (el.naturalHeight * base) + 'px';
        escala = 1; x = 0; y = 0; zoom.value = 100;
        temAlfa = temFundoTransparente(el);
        palco.classList.toggle('sem-fundo', temAlfa);
        aplica();
      })();
    };
    el.src = url;
    img = el;
    palco.appendChild(el);
    palco.appendChild(j);
    palco.classList.add('tem-imagem');
    zoomBx.hidden = false;
  }
  function vazio(){
    palco.innerHTML = '<span class="ppav-empty"><i class="fa-solid fa-image"></i> Nenhuma imagem selecionada</span>';
    palco.classList.remove('tem-imagem');
    palco.classList.remove('sem-fundo');
    temAlfa = false;
    zoomBx.hidden = true;
    img = null;
  }
  /* arrastar */
  let arrastando = false, px = 0, py = 0;
  palco.addEventListener('pointerdown', function(e){
    if (!img) return;
    arrastando = true; px = e.clientX; py = e.clientY;
    palco.setPointerCapture(e.pointerId);
  });
  palco.addEventListener('pointermove', function(e){
    if (!arrastando || !img) return;
    x += e.clientX - px; y += e.clientY - py; px = e.clientX; py = e.clientY;
    limites(); aplica();
  });
  palco.addEventListener('pointerup', function(e){ arrastando = false; try { palco.releasePointerCapture(e.pointerId); } catch(err){} });
  zoom.addEventListener('input', function(){
    escala = (+zoom.value) / 100;
    limites(); aplica();
  });

  /* recorta no tamanho de saida e devolve o endereco da imagem pronta */
  function recorta(){
    if (!img) return null;
    const [lw, lh] = TIPOS[tipo].saida;
    const c = document.createElement('canvas');
    c.width = lw; c.height = lh;
    const ctx = c.getContext('2d');
    /* o vazio de um PNG sem fundo sai na cor da marca; sem isto o JPEG,
       que nao tem canal alfa, entregaria preto */
    if (temAlfa){ ctx.fillStyle = corDaMarca(); ctx.fillRect(0, 0, lw, lh); }
    const fator = lw / janela.w;                    /* da tela para o arquivo */
    const dw = img.naturalWidth * base * escala * fator;
    const dh = img.naturalHeight * base * escala * fator;
    ctx.drawImage(img, (lw - dw) / 2 + x * fator, (lh - dh) / 2 + y * fator, dw, dh);
    return c.toDataURL('image/jpeg', 0.92);
  }

  /* o que ja esta no ar: a capa vem da variavel do corpo (ou do cliente da
     vez) e a foto, do fundo do proprio avatar */
  function imagemAtual(){
    if (tipo === 'capa'){
      const v = getComputedStyle(document.body).getPropertyValue('--capa-src').trim();
      if (v && v !== 'none'){ const m = v.match(/url\(["']?(.*?)["']?\)/); if (m) return m[1]; }
      const c = (typeof customCliente === 'function') ? customCliente() : null;
      if (c && c.capa) return c.capa;
      /* Fora dos cenarios a capa nao vem da variavel do corpo: ela esta na folha,
         como valor padrao da faixa. Entao vale ler do proprio elemento — o mesmo
         que ja se faz com a foto. Vence o primeiro que de fato tem imagem: a
         faixa do cartao da home ou a capa da tela de perfil. */
      const faixas = [document.querySelector('.profile-card .profile-banner'), document.querySelector('.pp-cover')];
      for (let k = 0; k < faixas.length; k++){
        if (!faixas[k]) continue;
        const mm = getComputedStyle(faixas[k]).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (mm) return mm[1];
      }
      return '';
    }
    /* O #ppAvatar existe no documento mesmo com a tela de perfil fechada, e
       ali ele esta sem retrato — so o gradiente padrao. Com um '||' ele ganhava
       sempre, e abrir o reposicionador pelo cartao da home caia no estado
       'nenhuma imagem' mesmo havendo foto. Agora os dois sao candidatos, na
       mesma ordem de preferencia, e vale o primeiro que de fato tem imagem;
       ao salvar os dois ficam em sincronia, entao quando ambos tem retrato e
       o mesmo. */
    const candidatos = [document.getElementById('ppAvatar'), document.querySelector('.profile-card .avatar.lg')];
    for (let k = 0; k < candidatos.length; k++){
      const av = candidatos[k];
      if (!av) continue;
      const m = getComputedStyle(av).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (m) return m[1];
    }
    return '';
  }
  window.ppAvAbrir = function(qual){
    tipo = TIPOS[qual] ? qual : 'foto';
    titulo.textContent = TIPOS[tipo].titulo;
    vazio();
    modal.classList.add('open');
    /* ja mostra a imagem que esta no ar, pronta para reenquadrar; o modal
       precisa estar aberto antes, senao a janela mede zero */
    const atual = imagemAtual();
    if (atual) monta(atual);
    /* o navegador so abre o seletor de arquivo em resposta a um clique da
       pessoa; abrir sozinho aqui era ignorado. O modal ja mostra o botao. */
  };
  bPick.addEventListener('click', function(){ arq.click(); });
  arq.addEventListener('change', function(){
    const f = arq.files && arq.files[0]; if (!f) return;
    monta(URL.createObjectURL(f));
    arq.value = '';
  });
  /* sem foto, sobra a inicial do nome sobre a cor da marca — o mesmo que a
     rede faz com quem nunca subiu retrato */
  function iniciaisDoNome(){
    const el = document.querySelector('.profile-name');
    const nome = (el ? el.textContent : 'SULTS').trim();
    /* nome e sobrenome: "Rodrigo Caetano" vira RC */
    /* nome e sobrenome: "Rodrigo Caetano" vira RC, "Homem-Aranha" vira HA */
    return nome.split(/[\s-]+/).filter(Boolean).slice(0, 2).map(function(p){ return p[0]; }).join('').toUpperCase();
  }
  bRem.addEventListener('click', function(){
    if (tipo === 'foto'){
      const ini = iniciaisDoNome();
      const marca = getComputedStyle(document.body).getPropertyValue('--marca').trim() || 'var(--teal)';
      document.querySelectorAll('#ppAvatar, .profile-card .avatar.lg, #topUserChip .avatar, .pp-topav, .nvf-pav, #nmodTopAv').forEach(function(el){
        el.style.background = marca;
        el.style.color = '#fff';
        el.textContent = ini;
      });
      const av = document.getElementById('ppAvatar');
      if (av) av.insertAdjacentHTML('beforeend', '<span class="pp-online"></span>');
      if (typeof fgToast === 'function') fgToast('Foto do perfil removida');
    } else {
      /* sem imagem, a faixa fica na cor da marca: o "none" vence o padrao da folha */
      document.body.style.setProperty('--capa-src', 'none');
      document.body.style.removeProperty('--capa-pos');
      if (typeof fgToast === 'function') fgToast('Capa removida');
    }
    vazio();
    modal.classList.remove('open');
  });
  bSalvar.addEventListener('click', function(){
    const url = recorta();
    if (!url){ modal.classList.remove('open'); return; }
    if (tipo === 'foto'){
      document.querySelectorAll('#ppAvatar, .profile-card .avatar.lg, #topUserChip .avatar, .pp-topav, .nvf-pav, #nmodTopAv').forEach(function(el){
        el.style.background = 'url(' + url + ') center/cover no-repeat';
        el.textContent = '';
      });
      const av = document.getElementById('ppAvatar');
      if (av && !av.querySelector('.pp-online')) av.insertAdjacentHTML('beforeend', '<span class="pp-online"></span>');
      if (typeof fgToast === 'function') fgToast('Foto do perfil atualizada');
    } else {
      document.body.style.setProperty('--capa-src', 'url(' + url + ')');
      document.body.style.removeProperty('--capa-pos');
      if (typeof fgToast === 'function') fgToast('Capa atualizada');
    }
    modal.classList.remove('open');
  });
})();

/* ---- Enquetes: a mesma home, com o cartao de perfil simples ----
   Uma variante para comparar os dois formatos sem duplicar o markup da home:
   duplicar significaria manter duas copias de ~400 linhas que divergiriam na
   primeira mudanca. Aqui o que muda e uma classe no body (o cartao volta ao
   formato antigo, de foto centrada) e um unico no que troca de lugar de
   verdade: a fileira de Shorts sai da coluna do meio e vai para baixo do
   cartao, na coluna da direita. Sair do item desfaz as duas coisas. */
(function(){
  const item = document.getElementById('navEnquetes');
  const shorts = document.getElementById('homeShorts');
  const colDir = document.querySelector('.col-right');
  const colMain = document.querySelector('.col-main');
  const card = document.getElementById('homeProfileCard');
  if (!item || !shorts || !colDir || !colMain || !card) return;
  /* de onde o Shorts saiu, para devolver no mesmo lugar */
  let vizinho = null;
  function entrar(){
    if (document.body.classList.contains('home-enquetes')) return;
    vizinho = shorts.nextElementSibling;
    colDir.insertBefore(shorts, card.nextElementSibling);
    document.body.classList.add('home-enquetes');
    if (typeof window.pcSincronizaAltura === 'function') window.pcSincronizaAltura();
    if (typeof applyFold === 'function') applyFold();
  }
  function sair(){
    if (!document.body.classList.contains('home-enquetes')) return;
    colMain.insertBefore(shorts, vizinho);
    document.body.classList.remove('home-enquetes');
    if (typeof window.pcSincronizaAltura === 'function') window.pcSincronizaAltura();
    if (typeof applyFold === 'function') applyFold();
  }
  item.addEventListener('click', function(e){
    e.preventDefault();
    if (typeof setNav === 'function') setNav(item);
    entrar();
  });
  /* qualquer outro item do menu volta para a home normal */
  document.querySelectorAll('.hm-side .hm-navitem').forEach(function(n){
    if (n === item) return;
    n.addEventListener('click', sair);
  });
})();
