/* modulo Shorts, categorias e permissoes */
/* ---------- Módulo Shorts (sidebar própria) ---------- */
const rmodSide = $('#rmodSide');
function openStoriesModule(){
  rmodSide.classList.add('open');
  reelsView.classList.add('in-module');
  setNav(null);
  curView='lista';
  $('#rxVLista').classList.add('active');
  $('#rxVGrade').classList.remove('active');
  closeCats();
  closePerm();
  rmodSetActive($('#rmodPub'));
  openStories();
}
function closeStoriesModule(){
  rmodSide.classList.remove('open');
  reelsView.classList.remove('in-module');
  closeCats();
  closePerm();
  closeStories();
  setNav($('#navHome'));
}
$('#tileStories').addEventListener('click', e => { e.preventDefault(); openStoriesModule(); const f=$('#rmodFeed'); if(f) f.click(); });
$('#rmodApps').addEventListener('click', closeStoriesModule);
$('#rmodNew').addEventListener('click', () => crOpen());
$('#rmodPub').addEventListener('click', () => { closeCats(); closePerm(); rmodSetActive($('#rmodPub')); curView='lista'; $('#rxVLista').classList.add('active'); $('#rxVGrade').classList.remove('active'); openStories(); });

/* ---------- Categorias (gestão) ---------- */
const catView = $('#catView');
const catModal = $('#catModal');
let catFilterVal = 'ativas', catSearchVal = '', editingCatId = null, catDraftColor = CAT_COLORS[0];
function slugify(s){ return rxNorm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || ('cat-'+Date.now()); }
function rmodSetActive(el){ $$('#rmodSide .rmod-item').forEach(b => { if (b.id==='rmodPub'||b.id==='rmodCats'||b.id==='rmodPerm') b.classList.remove('active'); }); if (el) el.classList.add('active'); }
function renderCatList(){
  let list = CATEGORIES.slice();
  if (catFilterVal === 'ativas') list = list.filter(c => c.active);
  else if (catFilterVal === 'arquivadas') list = list.filter(c => !c.active);
  if (catSearchVal) list = list.filter(c => rxNorm(c.name).includes(rxNorm(catSearchVal)));
  const el = $('#catList');
  if (!list.length){ el.innerHTML = '<div class="cat-empty">Nenhuma categoria encontrada.</div>'; return; }
  const rows = list.map(c => '<tr data-id="'+c.id+'">'+
    '<td><div class="cat-name"><span class="cat-bar" style="background:'+c.color+'"></span>'+c.name+(c.active?'':' <span style="font-weight:600;color:#b8c2cc;font-size:12px">(arquivada)</span>')+'</div></td>'+
    '<td style="white-space:nowrap">'+catReelCount(c.id)+' shorts</td>'+
    '<td class="rl-acts"><button class="cat-editbtn" data-act="edit"><i class="fa-solid fa-pen"></i> Editar</button>'+
      '<button class="cat-arch" data-act="arch"><i class="fa-solid fa-'+(c.active?'box-archive':'rotate-left')+'"></i> '+(c.active?'Arquivar':'Reativar')+'</button></td></tr>').join('');
  el.innerHTML = '<table><thead><tr><th>Categoria</th><th>Shorts</th><th style="text-align:right;width:200px">Ações</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function openCats(){ rmodSetActive($('#rmodCats')); reelsView.classList.remove('open'); closePerm(); catView.classList.add('open'); document.body.style.overflow='hidden'; renderCatList(); }
function closeCats(){ catView.classList.remove('open'); }
function catRenderSwatches(){ $('#catSwatches').innerHTML = CAT_COLORS.map(col => '<span class="cat-sw'+(col===catDraftColor?' sel':'')+'" data-col="'+col+'" style="background:'+col+'">'+(col===catDraftColor?'<i class="fa-solid fa-check"></i>':'')+'</span>').join(''); }
function catOpenModal(id){
  editingCatId = id || null;
  const c = id ? catById(id) : null;
  $('#catModalTitle').textContent = c ? 'Editar categoria' : 'Adicionar categoria';
  $('#catNameInput').value = c ? c.name : '';
  catDraftColor = c ? c.color : CAT_COLORS[0];
  catRenderSwatches();
  catModal.classList.add('open');
  setTimeout(() => $('#catNameInput').focus(), 30);
}
function catCloseModal(){ catModal.classList.remove('open'); }
function catRefreshEverywhere(){ renderCatList(); if (reelsView.classList.contains('open')){ foBuildReelFilters(); renderGrid(); } }
$('#rmodCats').addEventListener('click', openCats);
$('#catAdd').addEventListener('click', () => catOpenModal());
$('#catModalClose').addEventListener('click', catCloseModal);
$('#catCancel').addEventListener('click', catCloseModal);
catModal.addEventListener('click', e => { if (e.target === catModal) catCloseModal(); });
$('#catSwatches').addEventListener('click', e => { const sw = e.target.closest('.cat-sw'); if (!sw) return; catDraftColor = sw.dataset.col; catRenderSwatches(); });
$('#catSave').addEventListener('click', () => {
  const name = $('#catNameInput').value.trim();
  if (!name){ $('#catNameInput').focus(); return; }
  if (editingCatId){ const c = catById(editingCatId); if (c){ c.name = name; c.color = catDraftColor; } fgToast('Categoria atualizada'); }
  else { CATEGORIES.push({ id:slugify(name), name:name, color:catDraftColor, icon:'fa-tag', active:true }); fgToast('Categoria criada'); }
  catCloseModal(); catRefreshEverywhere();
});
$('#catFilter').addEventListener('change', e => { catFilterVal = e.target.value; renderCatList(); });
$('#catSearch').addEventListener('input', e => { catSearchVal = e.target.value; renderCatList(); });
$('#catList').addEventListener('click', e => {
  const tr = e.target.closest('tr'); if (!tr) return;
  const act = e.target.closest('[data-act]'); if (!act) return;
  const id = tr.dataset.id;
  if (act.dataset.act === 'edit') catOpenModal(id);
  else { const c = catById(id); if (c){ c.active = !c.active; fgToast(c.active ? 'Categoria reativada' : 'Categoria arquivada'); } catRefreshEverywhere(); }
});

/* ---------- Permissões (quem pode publicar) ---------- */
const PEOPLE = [
  { id:1027, name:'Arthur Henrique Nunes', av:'av-wm', role:'Comercial', unidade:'Matriz' },
  { id:978,  name:'Eduardo Almeida', av:'av-bo', role:'Marketing · Pit Stop Barra', unidade:'Pit Stop Barra' },
  { id:992,  name:'Iumy Sakamoto', av:'av-js', role:'Produto', unidade:'Matriz' },
  { id:1007, name:'Mariana Áurea Martins', av:'av-cm', role:'Customer Success', unidade:'Matriz' },
  { id:1036, name:'Paulo Henrique Soares Costa', av:'av-pl', role:'Design', unidade:'Matriz' },
  { id:1,    name:'Rodrigo Caetano Silva', av:'av-rc', role:'CEO', unidade:'Matriz' },
  { id:12,   name:'Ana Souza', av:'av-as', role:'Marketing · Pit Stop Barra', unidade:'Pit Stop Barra' },
  { id:34,   name:'Livia Fernandes', av:'av-lf', role:'Customer Success', unidade:'Matriz' },
  { id:56,   name:'Matheus Scussel', av:'av-ms', role:'COO', unidade:'Matriz' },
  { id:78,   name:'Ellen Rocha', av:'av-gc', role:'Conteúdo', unidade:'Matriz' }
];

