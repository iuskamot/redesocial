/* ============================================================
   Cenário "sem Shorts e sem Feed"
   Liga e desliga pelo ícone da Apple no rodapé do menu. Simula a empresa que
   não tem esses dois módulos: a coluna principal perde a fileira de shorts, o
   compositor e os posts. No desktop a grade de módulos abre inteira para
   ocupar o espaço; no celular, onde não há lateral, os Comunicados viram o
   conteúdo da home. O resto está em assets/css/13-basico.css.
   ============================================================ */
function basicoLigado(){ return document.body.classList.contains('demo-basico'); }

/* so recolhe no fim quem foi aberto aqui: se o usuario ja tinha expandido a
   grade antes de entrar no cenario, ela continua como ele deixou */
let BASICO_ABRIU_GRADE = false;

/* a grade abre pelo mesmo caminho do botao — classe no grid, estado no botao e
   o rotulo virando "Ver menos" — para continuar dando para recolher */
function basicoAbrirGrade(){
  if (window.matchMedia('(max-width:640px)').matches) return;   /* no celular a lista ficaria longa demais */
  const grade = document.getElementById('appsGrid');
  if (!grade || grade.classList.contains('expanded')) return;
  grade.classList.add('expanded');
  const bt = document.getElementById('appsToggle');
  if (bt) bt.classList.add('open');
  const rot = document.getElementById('appsToggleLbl');
  if (rot) rot.textContent = 'Ver menos';
  BASICO_ABRIU_GRADE = true;
}
function basicoFecharGrade(){
  if (!BASICO_ABRIU_GRADE) return;
  BASICO_ABRIU_GRADE = false;
  const grade = document.getElementById('appsGrid');
  if (grade) grade.classList.remove('expanded');
  const bt = document.getElementById('appsToggle');
  if (bt) bt.classList.remove('open');
}

function basicoLigar(){
  if (basicoLigado()) return;
  /* os dois cenários não convivem: um substitui o outro */
  if (typeof crunchDesligar === 'function' && document.body.classList.contains('demo-crunch')) crunchDesligar();
  if (typeof customDesligar === 'function') customDesligar();

  /* o Rede Social e justamente o modulo que traz o feed e os shorts. Sai pelo
     style inline, e nao por folha de estilo: e assim que a dobra da grade
     conta quem esta a mostra — escondido pelo CSS ele continuaria ocupando
     uma das vagas das duas linhas */
  const tile = document.getElementById('tileSocial');
  if (tile) tile.style.display = 'none';
  basicoAbrirGrade();
  if (typeof applyFold === 'function') applyFold();

  document.body.classList.add('demo-basico');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (typeof fgToast === 'function') fgToast('Cenário: sem Shorts e sem Feed');
}

function basicoDesligar(){
  if (!basicoLigado()) return;
  const tile = document.getElementById('tileSocial');
  if (tile) tile.style.display = '';
  basicoFecharGrade();
  if (typeof applyFold === 'function') applyFold();

  document.body.classList.remove('demo-basico');
  if (typeof fgToast === 'function') fgToast('Cenário: de volta ao completo');
}

function basicoAlternar(){ if (basicoLigado()) basicoDesligar(); else basicoLigar(); }

(function(){
  const ic = document.querySelector('.hm-store--apple');
  /* o mesmo aqui: quem estava na home customizável sai dela primeiro */
  if (ic) ic.addEventListener('click', function(e){
    e.preventDefault();
    if (typeof customLigado === 'function' && customLigado()){ customDesligar(); basicoLigar(); return; }
    basicoAlternar();
  });
})();
