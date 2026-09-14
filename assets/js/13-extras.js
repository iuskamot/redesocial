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

/* No celular o "Ver N módulos" desce para o fim do cartão dos aplicativos,
   abaixo da grade; no desktop ele volta para a linha do "Organizar", que é
   onde nasce no markup. Só o DOM muda — o comportamento é o mesmo. */
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

/* ---- As variantes da home ----
   Duas telas do menu mostram a mesma home com outro arranjo. E variante, e nao
   copia do markup: duplicar significaria manter duas copias de ~400 linhas que
   divergiriam na primeira mudanca. O que muda e uma classe no body — o CSS faz
   o resto — e os poucos blocos que trocam de coluna de verdade.

   Enquetes: o cartao de perfil volta ao formato simples e a fileira de Shorts
   desce para baixo dele, na coluna da direita.

   Powerups: o feed vem primeiro. O painel de modulos e a fileira de Shorts
   saem da coluna do meio e viram cartoes da coluna da direita, entao a coluna
   central comeca no campo de publicar — a primeira publicacao aparece sem
   rolagem, que era a queixa. Os dois lados ficam grudados no topo enquanto o
   feed rola.

   Sair para qualquer outro item do menu devolve tudo ao lugar. */
(function(){
  const colDir = document.querySelector('.col-right');
  const colMain = document.querySelector('.col-main');
  const card = document.getElementById('homeProfileCard');
  const shorts = document.getElementById('homeShorts');
  const painel = document.getElementById('appsPanel');
  if (!colDir || !colMain || !card || !shorts || !painel) return;

  /* onde cada bloco nasce, para devolver no mesmo lugar */
  const lugares = [shorts, painel].map(function(el){
    return { el: el, pai: el.parentElement, depois: el.nextElementSibling };
  });
  const CLASSES = ['home-enquetes', 'home-powerups'];

  function restaurar(){
    lugares.forEach(function(l){
      if (l.el.parentElement !== l.pai || l.el.nextElementSibling !== l.depois){
        l.pai.insertBefore(l.el, l.depois);
      }
    });
    CLASSES.forEach(function(c){ document.body.classList.remove(c); });
  }
  function assentar(){
    if (typeof window.pcSincronizaAltura === 'function') window.pcSincronizaAltura();
    if (typeof applyFold === 'function') applyFold();
  }
  function abrir(nome){
    if (document.body.classList.contains(nome)) return;
    restaurar();
    if (nome === 'home-enquetes'){
      colDir.insertBefore(shorts, card.nextElementSibling);
    } else if (nome === 'home-powerups'){
      colDir.insertBefore(painel, card.nextElementSibling);
      colDir.insertBefore(shorts, painel.nextElementSibling);
    }
    document.body.classList.add(nome);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    assentar();
  }
  function sair(){
    if (!CLASSES.some(function(c){ return document.body.classList.contains(c); })) return;
    restaurar();
    assentar();
  }

  const itens = { 'home-enquetes': document.getElementById('navEnquetes'),
                  'home-powerups': document.getElementById('navPowerups') };
  Object.keys(itens).forEach(function(nome){
    const item = itens[nome];
    if (!item) return;
    item.addEventListener('click', function(e){
      e.preventDefault();
      if (typeof setNav === 'function') setNav(item);
      abrir(nome);
    });
  });
  /* qualquer outro item do menu volta para a home normal */
  document.querySelectorAll('.hm-side .hm-navitem').forEach(function(n){
    if (n === itens['home-enquetes'] || n === itens['home-powerups']) return;
    n.addEventListener('click', sair);
  });
})();

/* ---- Os filtros da Rede Social tambem na home ----
   A faixa da esquerda da home recebe uma copia da coluna de filtros da Rede
   Social — as duas colunas dela. E copia, e
   nao o elemento de la, por dois motivos: a tela da Rede Social continua
   precisando dele inteiro, e o clique dos filtros e delegado no .nvf-layout
   — tirar o bloco de dentro desse pai o deixaria mudo.
   Os id saem da copia: eles sao unicos por documento, e a home vem antes no
   markup, entao um #nvfCats duplicado roubaria do original tudo o que o
   11-rede-social.js escreve la. A copia e tirada depois que ele ja montou
   categorias e contadores, entao vem com o conteudo pronto.
   O cartao de perfil da coluna nao vem junto: a home ja tem o dela. */
(() => {
  const destino = document.getElementById('homeFiltros');
  /* as duas colunas de filtros da Rede Social, na ordem em que aparecem la:
     a da esquerda (atividade, feed, categorias) e a da direita (ordenar,
     autor, periodo) */
  const origens = ['#nvFeedScreen .nvf-profile', '#nvFeedScreen .nvf-side']
    .map(function(s){ return document.querySelector(s); }).filter(Boolean);
  if (!destino || !origens.length) return;
  /* categorias e contadores so sao montados quando a Rede Social abre. Como a
     copia sai daqui na carga, o bloco de Categorias viria vazio: uma passada
     no renderizador de la resolve, e ele e idempotente. */
  if (typeof renderNvfFilters === 'function') { try { renderNvfFilters(); } catch (e) {} }
  /* Tudo num cartao so, os grupos separados por um fio. La sao cartoes
     soltos porque a coluna tem outras coisas entre eles; aqui so ha filtros,
     e tres caixas empilhadas viravam tres molduras seguidas. O Localizar fica
     de fora: a home ja tem a busca da plataforma no topo. */
  const cartao = document.createElement('div');
  cartao.className = 'nvf-side-card';
  origens.forEach(function(origem){
  Array.prototype.forEach.call(origem.children, function(bloco){
    if (bloco.classList.contains('nvf-pclick')) return;   /* o cartao de perfil */
    if (bloco.hidden) return;                              /* os que nascem ocultos */
    if (bloco.querySelector('.nvf-busca')) return;         /* o Localizar */
    if (cartao.children.length){
      const fio = document.createElement('div');
      fio.className = 'hf-div';
      cartao.appendChild(fio);
    }
    /* cada grupo mantem a sua caixa propria: e ela que delimita ate onde vai
       o realce de um item escolhido */
    const grupo = document.createElement('div');
    grupo.className = 'hf-grupo';
    const copia = bloco.cloneNode(true);
    while (copia.firstChild) grupo.appendChild(copia.firstChild);
    cartao.appendChild(grupo);
  });
  });
  cartao.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });
  destino.appendChild(cartao);
  /* o clique de la e delegado no .nvf-layout, que nao alcanca esta copia:
     aqui o realce do item escolhido fica por conta deste bloco, cada grupo
     do cartao unico respondendo por si. */
  destino.addEventListener('click', function(e){
    const item = e.target.closest('.nvf-fitem, .nvf-cat');
    if (!item || !destino.contains(item)) return;
    const grupo = item.closest('.hf-grupo') || destino;
    grupo.querySelectorAll('.nvf-fitem, .nvf-cat').forEach(function(o){ o.classList.remove('active'); });
    item.classList.add('active');
  });
})();


/* ---- Links Externos: laboratorio do Partner Inicial adaptativo ----
   Estudo de como a home se compoe quando a rede nao depende da Rede Social.
   Dropdown no header troca entre os cenarios; a grade fica sempre em uma linha.

   cen-1  com conteudo | cen-2  sem publicacoes | cen-3  sem Rede Social
   cen-matriz / cen-franqueado / cen-colaborador -> painel de "Visao geral" por
   perfil, com aba de periodo (Mensal/Semanal/Anual). Os graficos e metricas
   seguem os dashboards reais dos modulos (checados no demonstracao). */
(function(){
  const item = document.getElementById('navLinks');
  const colMain = document.querySelector('.col-main');
  if (!item || !colMain) return;

  const CENARIOS = [
    { id:'cen-1', rotulo:'1 · Com conteúdo',    dica:'Rede Social ativa e com publicações. A experiência atual, intocada.' },
    { id:'cen-2', rotulo:'2 · Sem publicações', dica:'Tem Rede Social, mas nunca publicou: Shorts, feed e comunicados aparecem vazios.' },
    { id:'cen-3', rotulo:'3 · Sem Rede Social', dica:'A rede não usa o módulo: a home fica com a grade de aplicativos e os comunicados.' },
    { id:'cen-matriz',      rotulo:'4 · Matriz',      perfil:'matriz',      dica:'Sem Rede Social. Painel da franqueadora: visão geral das unidades.' },
    { id:'cen-franqueado',  rotulo:'5 · Franqueado',  perfil:'franqueado',  dica:'Sem Rede Social. Painel do dono da unidade: sua equipe e operação local.' },
    { id:'cen-colaborador', rotulo:'6 · Colaborador', perfil:'colaborador', dica:'Sem Rede Social. Painel de quem não é admin: chamados, cursos, materiais.' }
  ];
  const TODAS = CENARIOS.map(function(c){ return c.id; });
  const SEM_SOCIAL = ['cen-3','cen-matriz','cen-franqueado','cen-colaborador'];
  const COM_VISAO  = ['cen-matriz','cen-franqueado','cen-colaborador'];

  const PERIODOS = [ { id:'semanal', rotulo:'Semanal' }, { id:'mensal', rotulo:'Mensal' }, { id:'anual', rotulo:'Anual' } ];
  const MES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  function dataBR(d){ return String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0') + '/' + d.getFullYear(); }
  function rotulosTip(periodo){
    const hoje = new Date();
    if (periodo === 'mensal'){   /* um ponto por dia do mes corrente (28/30/31) */
      const arr = [], ano = hoje.getFullYear(), mes = hoje.getMonth();
      const nDias = new Date(ano, mes + 1, 0).getDate();
      for (let d = 1; d <= nDias; d++){ arr.push(dataBR(new Date(ano, mes, d))); }
      return arr;
    }
    if (periodo === 'semanal'){   /* os ultimos 7 dias, data completa, terminando hoje */
      const arr = [];
      for (let i = 6; i >= 0; i--){ const d = new Date(hoje); d.setDate(hoje.getDate() - i); arr.push(dataBR(d)); }
      return arr;
    }
    const arr = [];   /* anual = os ultimos 12 meses, mes por extenso */
    for (let i = 11; i >= 0; i--){ const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      arr.push(MES_FULL[d.getMonth()] + ' de ' + d.getFullYear()); }
    return arr;
  }
  /* O mensal agora e diario: a serie de 4 semanas vira n dias, interpolando os
     niveis com uma ondulacao deterministica (nao muda a cada render). */
  function expandeDiario(g, n){
    if (!Array.isArray(g) || g.length < 2 || n <= g.length) return g;
    const out = [];
    for (let d = 0; d < n; d++){
      const t = d / (n - 1) * (g.length - 1), i = Math.floor(t), f = t - i;
      const base = (i + 1 < g.length) ? g[i] * (1 - f) + g[i + 1] * f : g[i];
      const onda = Math.sin(d * 1.7 + g[0]) * 0.12;
      out.push(Math.max(0, Math.round(base * (1 + onda))));
    }
    return out;
  }

  /* ---------- Graficos ---------- */
  function barras(v, labels, fmt, sfx, tot){
    const max = Math.max.apply(null, v), w = 100 / (v.length * 1.6), g = w * 0.6;
    const svg = '<svg class="vg-svg" viewBox="0 0 ' + (v.length*(w+g)-g).toFixed(1) + ' 42" preserveAspectRatio="none" aria-hidden="true">' +
      v.map(function(n,i){
        const h = Math.max(3, Math.round(n/max*40));
        /* tot: quando o card tem inativas (Unidades, Pessoas), o tooltip mostra
           o total = ativas + inativas */
        const tip = tot
          ? (labels?labels[i]+': ':'') + n + ' ' + tot.ativas + ' + ' + tot.n + ' ' + tot.inativas + ' = ' + (n + tot.n)
          : (labels?labels[i]+': ':'') + (fmt?fmt(n):n) + sufixo(sfx,n);
        return '<rect x="' + (i*(w+g)).toFixed(1) + '" y="' + (42-h) + '" width="' + w.toFixed(1) + '" height="' + h + '" rx="1.5" fill="var(--c2)" opacity="' + (i===v.length-1?1:0.42) + '" data-tip="' + tip + '"/>';
      }).join('') + '</svg>';
    return svg;
  }
  function area(v, labels, fmt, sfx){
    const max = Math.max.apply(null, v), min = Math.min.apply(null, v), W = 120, H = 42;
    const pts = v.map(function(n,i){ return [ (i/(v.length-1))*W, H - ((n-min)/(max-min||1))*(H-8) - 4 ]; });
    const linha = pts.map(function(p){ return p[0].toFixed(1)+','+p[1].toFixed(1); }).join(' ');
    const areaPath = 'M0,'+H+' L'+linha.replace(/ /g,' L')+' L'+W+','+H+' Z';
    const svg = '<svg class="vg-svg" viewBox="0 0 120 42" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="'+areaPath+'" fill="var(--c2)" opacity=".14"/>' +
      '<polyline points="'+linha+'" fill="none" stroke="var(--c2)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    /* as bolinhas sao HTML sobre a linha: como o SVG estica na horizontal, um
       <circle> viraria elipse. Aqui cada ponto e posicionado em % — o eixo x
       bate com a fracao do SVG esticado e o y, em %, bate com a altura de 42px. */
    const dots = pts.map(function(p,i){
      return '<span class="vg-dot" style="left:'+((p[0]/W)*100).toFixed(2)+'%;top:'+((p[1]/H)*100).toFixed(2)+'%"' +
        (labels ? ' data-tip="'+labels[i]+': '+(fmt?fmt(v[i]):v[i])+sufixo(sfx,v[i])+'"' : '') + '><i></i></span>';
    }).join('');
    return '<div class="vg-arealayer">' + svg + dots + '</div>';
  }
  /* Rosca (NPS e funil de Expansao) separada em donut + legenda, para o card
     por na direita o donut e embaixo a legenda em linha. Cada fatia na sua cor
     semantica (verde=bom, vermelho=ruim...). */
  function segsDe(tipo, g){
    return tipo === 'nps'
      ? [{v:g.prom,c:'#43a047',n:'Promotores'},{v:g.neu,c:'#f0a500',n:'Neutros'},{v:g.det,c:'#e5443b',n:'Detratores'}]
      : [{v:g.ganhos,c:'#2ea44f',n:'Ganhos'},{v:g.abertos,c:'#4a9fe0',n:'Abertos'},{v:g.perdidos,c:'#e5443b',n:'Perdidos'}];
  }
  function roscaDonut(segs, unidade){
    const tot = unidade === '%' ? 100 : (segs.reduce(function(a, s){ return a + s.v; }, 0) || 1);
    const R = 15.5, C = 2 * Math.PI * R; let off = 0;
    const arcos = segs.map(function(s){
      const len = C * (s.v / tot);
      const el = '<circle cx="21" cy="21" r="' + R + '" fill="none" stroke="' + s.c + '" stroke-width="6" ' +
        'stroke-dasharray="' + len.toFixed(2) + ' ' + (C - len).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '" ' +
        'transform="rotate(-90 21 21)" data-tip="' + s.n + ' ' + s.v + (unidade || '') + '"/>';
      off += len; return el;
    }).join('');
    return '<svg class="vg-svg vg-donut" viewBox="0 0 42 42" aria-hidden="true">' +
      '<circle cx="21" cy="21" r="' + R + '" fill="none" stroke="#eef1f4" stroke-width="6"/>' + arcos + '</svg>';
  }
  function roscaLeg(segs, unidade){
    return segs.map(function(s){ return '<span><i style="background:' + s.c + '"></i>' + s.v + (unidade || '') + ' ' + s.n + '</span>'; }).join('');
  }
  function grafico(tipo, g, labels, fmt, sfx, tot){
    if (tipo==='bars') return barras(g, labels, fmt, sfx, tot);
    if (tipo==='area') return area(g, labels, fmt, sfx);
    /* nps, funil e donut tem layout proprio no card, montado em montaCardHTML */
    return '';
  }

  function moeda(m){ return m >= 1000 ? 'R$ ' + (m/1000).toFixed(2).replace('.',',') + ' mi' : 'R$ ' + m.toLocaleString('pt-BR') + ' mil'; }
  /* substantivo do tooltip por modulo: [singular, plural] ou uma string fixa.
     so aparece nos graficos de barra/area (donut e NPS nao usam). */
  const SFX = {
    'Chamados':['chamado','chamados'], 'Implantação':['unidade','unidades'],
    'Expansão':'no funil', 'Colaboradores':['colaborador ativo','colaboradores ativos'],
    'Pessoas':['pessoa ativa','pessoas ativas'],
    'Universidade':['conclusão','conclusões'], 'Marketing':['arquivo baixado','arquivos baixados'],
    'Comunicados':['comunicado','comunicados'], 'Checklist':['checklist','checklists'],
    'Enquetes':['enquete','enquetes'], 'Compras':'em pedidos',
    'Projetos':['tarefa','tarefas'], 'Unidades':['unidade','unidades']
  };
  function sufixo(sfx, n){ if (!sfx) return ''; if (typeof sfx === 'string') return ' ' + sfx; return ' ' + (Number(n) === 1 ? sfx[0] : sfx[1]); }
  /* zona do NPS, igual ao dashboard do SULTS: Critica / Aperfeicoamento / Qualidade / Excelencia */
  function zonaNPS(score){
    const s = parseInt(score, 10);
    if (s >= 75) return { nome:'Excelência',      cor:'#1f8f4e' };
    if (s >= 50) return { nome:'Qualidade',       cor:'#43a047' };
    if (s >= 0)  return { nome:'Aperfeiçoamento', cor:'#f0a500' };
    return { nome:'Zona crítica', cor:'#e5443b' };
  }
  function card(c1,c2,smi,nome,tipo,p,fmt){ return {c1:c1,c2:c2,smi:smi,nome:nome,tipo:tipo,p:p,fmt:fmt,sfx:SFX[nome]}; }

  const DADOS = {
    matriz: [
      card('#62a9ff','#1d6ede','smi-chamados','Chamados','bars',{
        mensal:{n:'42',u:'abertos',atraso:'8',g:[9,14,11,8]},
        semanal:{n:'11',u:'abertos',atraso:'3',g:[1,2,1,2,3,1,1]},
        anual:{n:'488',u:'abertos',atraso:'8',g:[52,48,60,44,50,42,46,40,38,44,41,33]}}),
      card('#5ecc7f','#219348','smi-checklist','Checklist','bars',{
        mensal:{n:'286',u:'aplicados',atraso:'14',g:[64,72,70,80]},
        semanal:{n:'72',u:'aplicados',atraso:'5',g:[10,12,11,9,10,11,9]},
        anual:{n:'3.410',u:'aplicados',atraso:'14',g:[260,280,300,290,310,300,320,310,300,290,280,286]}}),
      card('#43d6cd','#00918a','smi-compras','Compras','area',{
        mensal:{n:'R$ 1,2M',u:'valor de pedidos',d:'+12%',dir:'boa',g:[280,320,290,310]},
        semanal:{n:'R$ 280k',u:'valor de pedidos',d:'+8%',dir:'boa',g:[38,45,40,44,48,35,30]},
        anual:{n:'R$ 13,4M',u:'valor de pedidos',d:'+15%',dir:'boa',g:[1050,1100,1080,1150,1100,1200,1150,1250,1100,1300,1200,1300]}}, 'moeda'),
      card('#ffb060','#ef8b12','smi-unidades','Unidades','bars',{
        mensal:{n:'92',u:'ativas',inativo:'3',inativoLbl:'inativas',g:[86,88,90,92]},
        semanal:{n:'92',u:'ativas',inativo:'3',inativoLbl:'inativas',g:[91,91,92,92,92,92,92]},
        anual:{n:'92',u:'ativas',inativo:'3',inativoLbl:'inativas',g:[74,76,78,80,82,84,86,88,89,90,91,92]}}),
      card('#ff8a7a','#e0392c','smi-expancao','Expansão','funil',{
        mensal:{u:'negócios',g:{abertos:5,ganhos:41,perdidos:10}},
        semanal:{u:'negócios',g:{abertos:2,ganhos:6,perdidos:2}},
        anual:{u:'negócios',g:{abertos:5,ganhos:412,perdidos:98}}}),
      card('#6fe08f','#2ea44f','smi-nps','NPS','nps',{
        mensal:{u:'pontos',g:{prom:84,neu:10,det:6}},
        semanal:{u:'pontos',g:{prom:86,neu:9,det:5}},
        anual:{u:'pontos',g:{prom:82,neu:12,det:6}}})
    ],
    franqueado: [
      card('#62a9ff','#1d6ede','smi-chamados','Chamados','bars',{
        mensal:{n:'6',u:'abertos',atraso:'1',g:[2,1,2,1]},
        semanal:{n:'2',u:'abertos',atraso:'0',g:[1,0,1,0,0,0,1]},
        anual:{n:'71',u:'abertos',atraso:'1',g:[8,7,6,5,7,6,5,6,4,5,6,6]}}),
      card('#73beff','#0088FF','smi-rede-social','Pessoas','bars',{
        mensal:{n:'22',u:'ativas',inativo:'2',inativoLbl:'inativas',g:[20,21,22,22]},
        semanal:{n:'22',u:'ativas',inativo:'2',inativoLbl:'inativas',g:[22,22,21,22,22,22,22]},
        anual:{n:'24',u:'ativas',inativo:'2',inativoLbl:'inativas',g:[18,19,20,21,22,22,23,24,23,24,23,24]}}),
      card('#5ecc7f','#219348','smi-checklist','Checklist','bars',{
        /* volume aplicado como numero; a badge cinza traz a nota (aproveitamento
           = pontuacao alcancada/maxima) do ULTIMO checklist aplicado. "ultima
           nota" ja diz que e um score e que e o mais recente, sem ocupar a linha */
        mensal:{n:'92',u:'aplicados',d:'última nota: 70,18%',dir:'neutra',g:[20,24,22,26]},
        semanal:{n:'24',u:'aplicados',d:'última nota: 70,18%',dir:'neutra',g:[3,4,3,4,4,3,3]},
        anual:{n:'1.140',u:'aplicados',d:'última nota: 70,18%',dir:'neutra',g:[80,88,92,90,95,98,96,102,98,105,100,96]}}),
      card('#43d6cd','#00918a','smi-compras','Compras','area',{
        mensal:{n:'R$ 62k',u:'valor de pedidos',g:[14,16,15,17]},
        semanal:{n:'R$ 18k',u:'valor de pedidos',g:[2,3,2,3,3,2,3]},
        anual:{n:'R$ 720k',u:'valor de pedidos',g:[52,55,58,60,57,62,60,64,58,66,62,64]}}, 'moeda'),
      card('#b18ae6','#6d47b5','smi-universidade','Universidade','bars',{
        mensal:{n:'34',u:'conclusões',d:'120 disponíveis',dir:'neutra',g:[6,9,8,11]},
        semanal:{n:'9',u:'conclusões',d:'120 disponíveis',dir:'neutra',g:[1,2,1,2,1,1,1]},
        anual:{n:'312',u:'conclusões',d:'120 disponíveis',dir:'neutra',g:[18,22,20,26,24,28,26,30,28,32,30,28]}}),
      card('#ff77a9','#d6285f','smi-marketing','Marketing','bars',{
        mensal:{n:'86',u:'downloads',d:'62 disponíveis',dir:'neutra',g:[18,22,20,26]},
        semanal:{n:'22',u:'downloads',d:'62 disponíveis',dir:'neutra',g:[3,4,2,4,3,3,3]},
        anual:{n:'940',u:'downloads',d:'62 disponíveis',dir:'neutra',g:[60,68,72,70,78,82,80,88,85,92,90,95]}})
    ],
    colaborador: [
      card('#62a9ff','#1d6ede','smi-chamados','Chamados','bars',{
        mensal:{n:'3',u:'abertos',atraso:'1',g:[1,0,1,1]},
        semanal:{n:'1',u:'abertos',atraso:'0',g:[0,0,1,0,0,0,0]},
        anual:{n:'22',u:'abertos',atraso:'0',g:[3,2,1,2,2,1,2,1,3,2,1,2]}}),
      card('#b18ae6','#6d47b5','smi-universidade','Universidade','donut',{
        mensal:{n:'8',u:'de 12 concluídos',g:67},
        semanal:{n:'8',u:'de 12 concluídos',g:67},
        anual:{n:'12',u:'de 12 concluídos',g:100}}),
      card('#9ba1f4','#575fd1','smi-comunicados','Comunicados','bars',{
        mensal:{n:'12',u:'recebidos',naolido:'3',g:[2,4,3,3]},
        semanal:{n:'4',u:'recebidos',naolido:'3',g:[1,0,1,1,0,1,0]},
        anual:{n:'142',u:'recebidos',naolido:'3',g:[8,7,9,6,8,7,9,8,7,9,8,10]}}),
      card('#ff77a9','#d6285f','smi-marketing','Marketing','bars',{
        mensal:{n:'14',u:'downloads',d:'62 disponíveis',dir:'neutra',g:[2,4,3,5]},
        semanal:{n:'4',u:'downloads',d:'62 disponíveis',dir:'neutra',g:[1,0,1,1,0,1,0]},
        anual:{n:'162',u:'downloads',d:'62 disponíveis',dir:'neutra',g:[10,12,14,11,13,15,12,14,16,13,15,17]}}),
      card('#5cc0a0','#2aa17e','smi-projetos','Projetos','bars',{
        mensal:{n:'5',u:'tarefas',atraso:'2',g:[3,4,4,5]},
        semanal:{n:'2',u:'tarefas',atraso:'1',g:[1,1,0,1,1,0,0]},
        anual:{n:'98',u:'tarefas',atraso:'3',g:[7,8,6,9,8,7,9,8,9,8,9,10]}}),
      card('#bd90ec','#7c4cc4','smi-enquetes','Enquetes','bars',{
        mensal:{n:'6',u:'recebidas',d:'2 em aberto',dir:'neutra',g:[1,2,1,2]},
        semanal:{n:'2',u:'recebidas',d:'1 em aberto',dir:'neutra',g:[0,1,0,1,0,0,0]},
        anual:{n:'46',u:'recebidas',d:'3 em aberto',dir:'neutra',g:[3,4,3,5,4,3,4,3,4,5,4,4]}})
    ]
  };

  let barra = null, painelVisao = null;
  let perfilAtual = 'matriz', periodoAtual = 'semanal';

  function montaSeletor(){
    if (barra) return;
    const acoes = document.querySelector('.top-actions');
    if (!acoes) return;
    const ancora = document.getElementById('newWrap');
    barra = document.createElement('div');
    barra.className = 'links-sel';
    barra.innerHTML =
      '<button type="button" class="links-sel-btn" aria-haspopup="menu" aria-expanded="false">' +
      '<span class="ls-label">Cenário 1</span>' +
      '<i class="fa-solid fa-chevron-down"></i></button>' +
      '<div class="links-sel-menu" role="menu" hidden>' +
      CENARIOS.map(function(c){ return '<button type="button" role="menuitem" data-cen="' + c.id + '"><b>' + c.rotulo + '</b><span>' + c.dica + '</span></button>'; }).join('') +
      '</div>';
    if (ancora) acoes.insertBefore(barra, ancora); else acoes.insertBefore(barra, acoes.firstChild);
    const btn = barra.querySelector('.links-sel-btn'), menu = barra.querySelector('.links-sel-menu');
    btn.addEventListener('click', function(e){ e.stopPropagation(); const abrindo = menu.hidden; menu.hidden = !abrindo; btn.setAttribute('aria-expanded', String(abrindo)); });
    menu.addEventListener('click', function(e){ const b = e.target.closest('[data-cen]'); if (!b) return; seleciona(b.dataset.cen); menu.hidden = true; btn.setAttribute('aria-expanded','false'); });
    document.addEventListener('click', fechaMenuFora);
  }
  function fechaMenuFora(e){
    if (!barra || barra.contains(e.target)) return;
    const menu = barra.querySelector('.links-sel-menu'); if (menu) menu.hidden = true;
    const btn = barra.querySelector('.links-sel-btn'); if (btn) btn.setAttribute('aria-expanded','false');
  }

  function montaVisao(mostrar){
    if (mostrar){
      if (!painelVisao){
        painelVisao = document.createElement('section');
        painelVisao.className = 'links-visao';
        painelVisao.innerHTML =
          '<div class="lv-head"><h2>Visão geral</h2>' +
          '<div class="lv-seg2 lv-periodo" role="tablist">' +
          PERIODOS.map(function(x){ return '<button type="button" role="tab" data-periodo="' + x.id + '">' + x.rotulo + '</button>'; }).join('') +
          '</div></div><div class="lv-grid"></div><div class="lv-tip" hidden></div>';
        painelVisao.querySelector('.lv-periodo').addEventListener('click', function(e){ const b = e.target.closest('[data-periodo]'); if (!b) return; periodoAtual = b.dataset.periodo; pintaVisao(); });
        const tip = painelVisao.querySelector('.lv-tip');
        painelVisao.addEventListener('pointermove', function(e){
          const el = e.target.closest('[data-tip]');
          if (!el){ tip.hidden = true; return; }
          tip.textContent = el.getAttribute('data-tip'); tip.hidden = false;
          const r = painelVisao.getBoundingClientRect();
          tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px';
        });
        painelVisao.addEventListener('pointerleave', function(){ tip.hidden = true; });
      }
      const painel = document.getElementById('appsPanel');
      if (painel && painel.nextElementSibling !== painelVisao) painel.insertAdjacentElement('afterend', painelVisao);
      pintaVisao();
    } else if (painelVisao && painelVisao.parentElement){
      painelVisao.remove();
    }
  }
  function montaCardHTML(c, periodo, labels, prefixo){
    const v = c.p[periodo] || c.p.mensal;
    const gData = (periodo === 'mensal' && labels) ? expandeDiario(v.g, labels.length) : v.g;

    /* NPS, Expansao e Universidade (donut) usam o mesmo layout de rosca: o numero
       (e a zona, no NPS) na esquerda, o donut na direita e a legenda em linha no
       rodape do card. */
    if (c.tipo === 'nps' || c.tipo === 'funil' || c.tipo === 'donut'){
      let segs, unidade = '%', num, zona = '';
      if (c.tipo === 'nps'){
        /* NPS de verdade = % Promotores − % Detratores, calculado dos proprios
           dados da rosca; a zona sai do score, sempre em verdigris. */
        segs = segsDe('nps', v.g);
        const score = v.g.prom - v.g.det;
        num = score.toFixed(2);
        zona = '<span class="lv-zona">Zona de ' + zonaNPS(score).nome.toLowerCase() + '</span>';
      } else if (c.tipo === 'funil'){
        /* o numero grande e o total do funil (abertos + ganhos + perdidos) */
        segs = segsDe('funil', v.g); unidade = '';
        num = String(v.g.abertos + v.g.ganhos + v.g.perdidos);
      } else {
        /* donut: concluido x a concluir, a partir do proprio percentual */
        const p = Math.round(v.g);
        segs = [{v:p,c:'var(--c2)',n:'Concluído'},{v:100-p,c:'#dfe4ea',n:'A concluir'}];
        num = v.n;
      }
      return '<a class="lv-card lv-card-rosca" href="#" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '">' +
        '<div class="lv-top"><span class="lv-ic"><span class="smi ' + c.smi + '" aria-hidden="true"></span></span>' +
        '<span class="lv-nome">' + (prefixo || '') + c.nome + '</span>' + zona + '</div>' +
        '<div class="lv-rmid"><div class="lv-metric">' +
          '<span class="lv-numrow"><b class="lv-num">' + num + '</b><span class="lv-unit">' + v.u + '</span></span>' +
          '<div class="vg-nps-leg">' + roscaLeg(segs, unidade) + '</div></div>' +
        '<div class="lv-donut">' + roscaDonut(segs, unidade) + '</div></div></a>';
    }

    let extra = '', num = v.n;
    if (v.atraso !== undefined){
      extra = parseInt(v.atraso,10) > 0
        ? '<span class="lv-atraso">' + v.atraso + ' em atraso</span>'
        : '<span class="lv-emdia">em dia</span>';
    } else if (v.inativo !== undefined){
      /* rotulo configuravel pra concordar o genero (colaboradores inativos,
         unidades inativas) */
      extra = parseInt(v.inativo,10) > 0
        ? '<span class="lv-inativo">' + v.inativo + ' ' + (v.inativoLbl || 'inativos') + '</span>'
        : '<span class="lv-emdia">todos ativos</span>';
    } else if (v.naolido !== undefined){
      extra = parseInt(v.naolido,10) > 0
        ? '<span class="lv-inativo">' + v.naolido + ' não lidos</span>'
        : '<span class="lv-emdia">tudo lido</span>';
    } else if (v.d && !/^[+\-]\d/.test(v.d)){
      /* deltas puros "+1 / +3 / +8%" nao dizem nada num prototipo sem base de
         comparacao: so sobra o que tem significado proprio ("120 disponiveis",
         "8 concluidas", "boa leitura"...) */
      extra = '<span class="lv-delta ' + v.dir + '">' + v.d + '</span>';
    }
    /* cards com inativas (Unidades, Pessoas): o tooltip da barra soma o total */
    const tot = (v.inativo !== undefined && parseInt(v.inativo,10) > 0)
      ? { n: parseInt(v.inativo,10), ativas: v.u, inativas: v.inativoLbl || 'inativos' }
      : null;
    return '<a class="lv-card" href="#" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '">' +
      '<div class="lv-top"><span class="lv-ic"><span class="smi ' + c.smi + '" aria-hidden="true"></span></span>' +
      '<span class="lv-nome">' + (prefixo || '') + c.nome + '</span></div>' +
      '<div class="lv-metric"><b class="lv-num">' + num + '</b><span class="lv-unit">' + v.u + '</span>' + extra + '</div>' +
      '<div class="lv-chart">' + grafico(c.tipo, gData, labels, c.fmt==='moeda'?moeda:null, c.sfx, tot) + '</div></a>';
  }
  function pintaVisao(){
    if (!painelVisao) return;
    painelVisao.querySelectorAll('[data-periodo]').forEach(function(b){ b.setAttribute('aria-selected', String(b.dataset.periodo === periodoAtual)); });
    const cards = DADOS[perfilAtual] || [], labels = rotulosTip(periodoAtual);
    painelVisao.querySelector('.lv-grid').innerHTML = cards.map(function(c){ return montaCardHTML(c, periodoAtual, labels); }).join('');
  }

  function seleciona(cen){
    TODAS.forEach(function(c){ document.body.classList.remove(c); });
    document.body.classList.add(cen);
    document.body.classList.toggle('hl-sem-social', SEM_SOCIAL.indexOf(cen) >= 0);
    document.body.classList.toggle('hl-visao', COM_VISAO.indexOf(cen) >= 0);
    const info = CENARIOS.find(function(c){ return c.id === cen; });
    if (info && info.perfil) perfilAtual = info.perfil;
    if (barra){
      barra.querySelectorAll('[data-cen]').forEach(function(b){ b.setAttribute('aria-selected', String(b.dataset.cen === cen)); });
      const lab = barra.querySelector('.ls-label'); if (lab) lab.textContent = info ? 'Cenário ' + info.rotulo.split('·')[0].trim() : 'Cenário';
    }
    const grade = document.getElementById('appsGrid'); if (grade) grade.classList.remove('expanded');
    const t = document.getElementById('appsToggle'); if (t) t.classList.remove('open');
    if (typeof applyFold === 'function') applyFold();
    const querEmpty = (cen === 'cen-2');
    if (document.body.classList.contains('demo-empty') !== querEmpty){
      document.body.classList.toggle('demo-empty', querEmpty);
      if (typeof buildStories === 'function') buildStories();
    }
    montaVisao(COM_VISAO.indexOf(cen) >= 0);
    if (typeof window.pcSincronizaAltura === 'function') requestAnimationFrame(window.pcSincronizaAltura);
  }

  function entrar(){
    if (document.body.classList.contains('home-links')) return;
    document.body.classList.add('home-links');
    montaSeletor();
    seleciona('cen-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function sair(){
    if (!document.body.classList.contains('home-links')) return;
    document.body.classList.remove('home-links','hl-sem-social','hl-visao');
    TODAS.forEach(function(c){ document.body.classList.remove(c); });
    document.removeEventListener('click', fechaMenuFora);
    if (barra){ barra.remove(); barra = null; }
    if (document.body.classList.contains('demo-empty')){
      document.body.classList.remove('demo-empty');
      if (typeof buildStories === 'function') buildStories();
    }
    montaVisao(false);
    const grade = document.getElementById('appsGrid'); if (grade) grade.classList.remove('expanded');
    const t = document.getElementById('appsToggle'); if (t) t.classList.remove('open');
    if (typeof applyFold === 'function') applyFold();
    if (typeof window.pcSincronizaAltura === 'function') window.pcSincronizaAltura();
  }

  item.addEventListener('click', function(e){ e.preventDefault(); if (typeof setNav === 'function') setNav(item); entrar(); });
  document.querySelectorAll('.hm-side .hm-navitem').forEach(function(n){ if (n === item) return; n.addEventListener('click', sair); });

  /* ---- Visao geral na HOME normal: os mesmos cards por perfil, numa fileira
     que rola abaixo do cartao do usuario (coluna da direita); um drop de perfis
     no topo escolhe Matriz / Franqueado / Colaborador. Sai de cena nas variantes
     especiais (Links, Enquetes, Powerups), que tem composicao propria. ---- */
  /* a matriz de cenarios da home: papel (matriz/franqueado/funcionario) x estado
     (com conteudo / sem conteudo / sem rede social / sem permissao). Cada opcao
     do drop compoe a home por cima do layout atual. */
  const CEN_HOME = [
    { perfil:'matriz',      estado:'conteudo',      grupo:'Matriz',      rotulo:'com conteúdo',   dica:'A home cheia: publicações, shorts e comunicados.' },
    { perfil:'matriz',      estado:'vazio',         grupo:'Matriz',      rotulo:'sem conteúdo',   dica:'Tem Rede Social, mas ninguém publicou ainda.' },
    { perfil:'matriz',      estado:'sem-rs',        grupo:'Matriz',      rotulo:'sem rede social',dica:'A rede não usa a Rede Social, sem feed nem shorts.' },
    { perfil:'franqueado',  estado:'conteudo',      grupo:'Franqueado',  rotulo:'com conteúdo',   dica:'A unidade cheia, com o feed e os shorts da rede.' },
    { perfil:'franqueado',  estado:'vazio',         grupo:'Franqueado',  rotulo:'sem conteúdo',   dica:'A rede tem o módulo, mas ainda sem publicações.' },
    { perfil:'franqueado',  estado:'sem-rs',        grupo:'Franqueado',  rotulo:'sem rede social',dica:'Sem Rede Social, os módulos e a visão geral no lugar.' },
    { perfil:'colaborador', estado:'conteudo',      grupo:'Funcionário', rotulo:'com conteúdo',   dica:'Vê e interage com o feed e os shorts da rede.' },
    { perfil:'colaborador', estado:'vazio',         grupo:'Funcionário', rotulo:'sem conteúdo',   dica:'A rede tem o módulo, mas ainda sem publicações.' },
    { perfil:'colaborador', estado:'sem-permissao', grupo:'Funcionário', rotulo:'sem permissão',  dica:'Vê o feed, mas não pode criar publicação nem short.' },
    { perfil:'colaborador', estado:'vazio-sem-permissao', grupo:'Funcionário', rotulo:'sem permissão e sem conteúdo', dica:'Não pode criar e a rede ainda não publicou nada.' },
    { perfil:'colaborador', estado:'sem-rs',        grupo:'Funcionário', rotulo:'sem rede social',dica:'Sem Rede Social, os módulos e a visão geral no lugar.' }
  ];
  let selHome = null, carrHome = null, perfilHome = 'matriz', estadoHome = 'conteudo', periodoHome = 'semanal';

  function pintaCarrHome(){
    if (!carrHome) return;
    const cards = DADOS[perfilHome] || [], labels = rotulosTip(periodoHome);
    const html = cards.map(function(c){ return montaCardHTML(c, periodoHome, labels, 'Visão geral de '); }).join('');
    /* a sequencia entra duplicada: o loop segue sempre em frente e, ao alcancar
       a copia, salta de volta ao inicio sem animacao (invisivel, cards iguais) */
    const track = carrHome.querySelector('.hv-track');
    track.innerHTML = html + html;
    carrHome._n = cards.length;
    track.scrollLeft = 0;
    const tabs = carrHome.querySelector('.hv-periodo');
    if (tabs) tabs.querySelectorAll('[data-periodo]').forEach(function(b){ b.setAttribute('aria-selected', String(b.dataset.periodo === periodoHome)); });
  }
  function montaSelHome(){
    if (selHome) return;
    const acoes = document.querySelector('.top-actions');
    if (!acoes) return;
    const ancora = document.getElementById('newWrap');
    selHome = document.createElement('div');
    selHome.className = 'links-sel home-perfil-sel';
    let itens = '', grupoAtual = '';
    CEN_HOME.forEach(function(c, i){
      if (c.grupo !== grupoAtual){ grupoAtual = c.grupo; itens += '<div class="hps-grupo">' + c.grupo + '</div>'; }
      const marcado = (c.perfil === perfilHome && c.estado === estadoHome);
      itens += '<button type="button" role="menuitem" data-i="' + i + '" aria-selected="' + marcado + '"><b>' + c.rotulo + '</b><span>' + c.dica + '</span></button>';
    });
    selHome.innerHTML =
      '<button type="button" class="links-sel-btn" aria-haspopup="menu" aria-expanded="false">' +
      '<span class="ls-label">Matriz · com conteúdo</span><i class="fa-solid fa-chevron-down"></i></button>' +
      '<div class="links-sel-menu" role="menu" hidden>' + itens + '</div>';
    if (ancora) acoes.insertBefore(selHome, ancora); else acoes.insertBefore(selHome, acoes.firstChild);
    const btn = selHome.querySelector('.links-sel-btn'), menu = selHome.querySelector('.links-sel-menu');
    btn.addEventListener('click', function(e){ e.stopPropagation(); const ab = menu.hidden; menu.hidden = !ab; btn.setAttribute('aria-expanded', String(ab)); });
    menu.addEventListener('click', function(e){
      const b = e.target.closest('[data-i]'); if (!b) return;
      const c = CEN_HOME[+b.dataset.i];
      perfilHome = c.perfil; estadoHome = c.estado;
      selHome.querySelector('.ls-label').textContent = c.grupo + ' · ' + c.rotulo;
      menu.querySelectorAll('[data-i]').forEach(function(x){ const cc = CEN_HOME[+x.dataset.i]; x.setAttribute('aria-selected', String(cc.perfil === perfilHome && cc.estado === estadoHome)); });
      menu.hidden = true; btn.setAttribute('aria-expanded', 'false');
      pintaCarrHome(); atualizaHomeVisao();
      /* trocar de perfil dentro do "sem conteudo" nao mexe no demo-empty, entao
         as sugestoes dos Shorts nao se refazem sozinhas — refaz aqui */
      if (estadoHome.indexOf('vazio') === 0 && typeof buildStories === 'function') buildStories();
    });
    document.addEventListener('click', function(e){ if (selHome && !selHome.contains(e.target)){ menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
  }
  function montaCarrHome(){
    if (carrHome) return;
    const card = document.getElementById('homeProfileCard');
    if (!card) return;
    carrHome = document.createElement('section');
    carrHome.className = 'links-visao home-visao';
    carrHome.innerHTML =
      '<div class="hv-head">' +
        '<div class="lv-seg2 hv-periodo" role="tablist">' +
          PERIODOS.map(function(x){ return '<button type="button" role="tab" data-periodo="' + x.id + '">' + x.rotulo + '</button>'; }).join('') +
        '</div>' +
        '<div class="hv-nav-wrap">' +
          '<button type="button" class="hv-nav hv-prev" aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>' +
          '<button type="button" class="hv-nav hv-next" aria-label="Próximo"><i class="fa-solid fa-chevron-right"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="hv-track"></div><div class="lv-tip" hidden></div>';
    card.insertAdjacentElement('afterend', carrHome);
    const track = carrHome.querySelector('.hv-track');
    carrHome.querySelector('.hv-periodo').addEventListener('click', function(e){ const b = e.target.closest('[data-periodo]'); if (!b) return; periodoHome = b.dataset.periodo; pintaCarrHome(); });
    const tip = carrHome.querySelector('.lv-tip');
    carrHome.addEventListener('pointermove', function(e){
      const el = e.target.closest('[data-tip]');
      if (!el){ tip.hidden = true; return; }
      tip.textContent = el.getAttribute('data-tip'); tip.hidden = false;
      const r = carrHome.getBoundingClientRect();
      tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px';
    });
    /* passa sozinho de card em card; as setas navegam no clique e a fileira
       pausa enquanto o cursor esta sobre ela (para dar tempo de ler/tooltip) */
    function passo(dir){
      const step = track.clientWidth + 12;
      const period = (carrHome._n || 1) * step;
      /* ao entrar na copia (frente) ou antes do inicio (tras), salta um periodo
         inteiro sem animacao — como os cards sao iguais, o salto e invisivel */
      if (dir > 0 && track.scrollLeft >= period - 4) track.scrollLeft -= period;
      else if (dir < 0 && track.scrollLeft <= 4) track.scrollLeft += period;
      track.scrollTo({ left: track.scrollLeft + dir * step, behavior: 'smooth' });
    }
    carrHome.querySelector('.hv-prev').addEventListener('click', function(){ passo(-1); });
    carrHome.querySelector('.hv-next').addEventListener('click', function(){ passo(1); });
    let pausado = false;
    carrHome.addEventListener('pointerenter', function(){ pausado = true; });
    carrHome.addEventListener('pointerleave', function(){ pausado = false; tip.hidden = true; });
    setInterval(function(){ if (pausado || carrHome.hidden || !carrHome.offsetParent) return; passo(1); }, 4500);
    pintaCarrHome();
  }
  function atualizaHomeVisao(){
    const especial = document.body.classList.contains('home-links') ||
      document.body.classList.contains('home-enquetes') ||
      document.body.classList.contains('home-powerups');
    if (especial){
      if (selHome) selHome.hidden = true;
      if (carrHome) carrHome.hidden = true;
    } else {
      montaSelHome(); montaCarrHome();
      if (selHome) selHome.hidden = false;
      /* "sem rede social": o painel de Visao geral (o mesmo do Links) desce para
         baixo dos modulos e substitui o carrossel da direita */
      const semRs = (estadoHome === 'sem-rs');
      if (carrHome) carrHome.hidden = semRs;
      if (semRs){ perfilAtual = perfilHome; periodoAtual = periodoHome; montaVisao(true); pintaVisao(); }
      else { montaVisao(false); }
    }
    /* --- papel (matriz / franqueado / funcionario) --- */
    document.body.classList.toggle('perfil-colab', !especial && perfilHome === 'colaborador');
    document.body.classList.toggle('perfil-franqueado', !especial && perfilHome === 'franqueado');
    /* o ID do autor no Feed so aparece na visao da matriz */
    document.body.classList.toggle('ver-uids', !especial && perfilHome === 'matriz');
    /* --- estado da rede social --- */
    document.body.classList.toggle('estado-sem-rs', !especial && estadoHome === 'sem-rs');
    document.body.classList.toggle('estado-sem-permissao', !especial && (estadoHome === 'sem-permissao' || estadoHome === 'vazio-sem-permissao'));
    /* "sem conteudo" reusa o demo-empty (shorts, feed e comunicados vazios); so
       na home normal — no Links quem manda no demo-empty e o proprio controller */
    if (!especial){
      const querEmpty = (estadoHome === 'vazio' || estadoHome === 'vazio-sem-permissao');
      if (document.body.classList.contains('demo-empty') !== querEmpty){
        document.body.classList.toggle('demo-empty', querEmpty);
        if (typeof buildStories === 'function') buildStories();
      }
    }
  }
  atualizaHomeVisao();
  new MutationObserver(atualizaHomeVisao).observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* Os posts do feed inicial sao estaticos no HTML e nao passam pelo render do
     05-feed.js, entao nao tem o chip de ID. Aqui injetamos nesses (os posts e
     comentarios criados via JS ja vem com o chip). */
  function injetaUidsFeed(){
    if (typeof uidChip !== 'function') return;
    document.querySelectorAll('.feed .post-name, .feed .comment-name').forEach(function(el){
      if (el.querySelector(':scope > .post-uid')) return;
      let nome = '';
      for (let i = 0; i < el.childNodes.length; i++){ const nd = el.childNodes[i]; if (nd.nodeType === 3 && nd.textContent.trim()){ nome = nd.textContent.trim(); break; } }
      if (nome) el.insertAdjacentHTML('afterbegin', uidChip(nome));
    });
  }
  injetaUidsFeed();
})();
