const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const PAGES={
 index:['Accueil','Tout ce dont un étudiant a besoin, au même endroit','🏠'],
 studybox:['StudyBox','Cours, résumés, examens, quiz et flashcards','📚','Apprends efficacement'],
 studymatch:['StudyMatch','Trouve ton équipe de révision','👥','Trouve ton équipe'],
 unitalk:['UniTalk','Forum : pose tes questions, partage tes conseils','💬','Échange & partage'],
 uniguide:['UniGuide','Universités, masters et orientation','🎓','Tout sur ton université'],
 unireview:['UniReview','Avis sur les professeurs et les matières','⭐','Donne ton avis'],
 studenttrip:['StudentTrip','Voyages, sorties, formations et événements','✈️','Explore le monde']};
const page=document.body.dataset.page;
$('#nav').innerHTML=`<nav class="navbar navbar-expand-lg shadow-sm bg-white"><div class="container"><a class="navbar-brand fw-bold" href="index.html">🎓 UniLife</a><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#m"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="m"><ul class="navbar-nav ms-auto">${Object.entries(PAGES).map(([k,v])=>`<li><a class="nav-link ${k==page?'active fw-bold':''}" href="${k}.html">${v[0]}</a></li>`).join('')}</ul></div></div></nav>`;
$('#foot').innerHTML='© 2026 UniLife — plus qu’un site, une communauté';
if(page!='index')$('#head').innerHTML=`<div class="page-head"><h1>${PAGES[page][2]} ${PAGES[page][0]}</h1><p>${PAGES[page][1]}</p></div>`;
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const toast=m=>alert(m);

// Liste filtrable (recherche + catégories)
function list(items,cats,draw){
 let c='Tous',q='';
 $('#app').innerHTML=`<div class="d-flex flex-wrap gap-2 mb-4"><input id="q" class="form-control w-auto" placeholder="Rechercher..."><div id="cats" class="d-flex flex-wrap gap-2">${['Tous',...cats].map(x=>`<button class="btn btn-outline-primary btn-sm ${x=='Tous'?'on':''}" data-c="${x}">${x}</button>`).join('')}</div></div><div class="row g-3" id="L"></div><div id="extra"></div>`;
 const go=()=>$('#L').innerHTML=items.filter(i=>(c=='Tous'||i.cat==c)&&JSON.stringify(i).toLowerCase().includes(q)).map((i,n)=>`<div class="col-md-4"><div class="card service-card shadow-sm p-3 h-100 tint${n%3}">${draw(i)}</div></div>`).join('')||'<p>Aucun résultat. Essaie un autre mot-clé.</p>';
 $('#q').oninput=e=>{q=e.target.value.toLowerCase();go()};
 $('#cats').onclick=e=>{if(!e.target.dataset.c)return;c=e.target.dataset.c;document.querySelectorAll('#cats .btn').forEach(b=>b.classList.toggle('on',b==e.target));go()};
 go();
}
const btn=(t,m)=>`<button class="btn btn-primary btn-sm mt-auto" onclick="toast('${m}')">${t}</button>`;

const D={
studybox:[
 {t:'Cours de Algorithmique',cat:'Cours PDF',s:'Semestre 1 · Informatique'},{t:'Cours de Base de données',cat:'Cours PDF',s:'Semestre 2 · Informatique'},
 {t:'Résumé de Marketing',cat:'Résumés',s:'Fiche de 2 pages · Gestion'},{t:'Résumé de Comptabilité',cat:'Résumés',s:'Fiche de 3 pages · Gestion'},
 {t:'Examen Java 2025',cat:'Examens',s:'Avec correction'},{t:'Examen Réseaux 2024',cat:'Examens',s:'Session principale'},
 {t:'Exercices SQL',cat:'Exercices',s:'20 exercices corrigés'},{t:'Exercices Probabilités',cat:'Exercices',s:'Séries TD 1 à 4'}],
studymatch:[
 {n:'Yasmine B.',cat:'Informatique',s:'Cherche un partenaire pour réviser Java',u:'ISET Tunis'},{n:'Mohamed A.',cat:'Gestion',s:'Révision de comptabilité le soir',u:'ISG Tunis'},
 {n:'Salma K.',cat:'Informatique',s:'Projet web en binôme',u:'ISSAT Sousse'},{n:'Amine T.',cat:'Maths',s:'Prépare l’examen d’analyse',u:'FST Tunis'},
 {n:'Ines M.',cat:'Gestion',s:'Groupe marketing, 4 places',u:'ISG Sousse'},{n:'Rami S.',cat:'Maths',s:'Entraide en probabilités',u:'ENIT'}],
uniguide:[
 {n:'ISET Rades',cat:'ISET',s:'Licences appliquées en technologie et informatique'},{n:'ISET Sousse',cat:'ISET',s:'Génie électrique, informatique, mécanique'},
 {n:'ISG Tunis',cat:'ISG',s:'Gestion, finance, comptabilité, marketing'},{n:'ISG Sousse',cat:'ISG',s:'Gestion et commerce international'},
 {n:'ISSAT Sousse',cat:'ISSAT',s:'Sciences appliquées et technologie'},{n:'ISSAT Gabès',cat:'ISSAT',s:'Informatique, électronique, génie civil'},
 {n:'Master Data Science',cat:'Masters',s:'Master de recherche · 2 ans'},{n:'Master Marketing Digital',cat:'Masters',s:'Master professionnel · 2 ans'}],
studenttrip:[
 {n:'Week-end à Tabarka',cat:'Voyages',s:'12 – 14 novembre · 120 DT'},{n:'Sortie à Hammamet',cat:'Sorties',s:'Samedi · plage et football'},
 {n:'Formation Excel',cat:'Formations',s:'3 séances · gratuit'},{n:'Hackathon UniLife',cat:'Événements',s:'20 novembre · équipes de 4'},
 {n:'Randonnée Zaghouan',cat:'Sorties',s:'Dimanche · 15 DT'},{n:'Forum de l’emploi',cat:'Événements',s:'5 décembre · Tunis'}]};

if(page=='index'){
 $('#app').innerHTML=Object.entries(PAGES).slice(1).map(([k,v],n)=>`<div class="col-md-4"><div class="card service-card shadow-sm p-4 text-center h-100 tint${n%3}"><h3>${v[2]} ${v[0]}</h3><p>${v[3]}</p><a href="${k}.html" class="btn btn-primary mt-auto">Explorer</a></div></div>`).join('');
 $('#s').oninput=e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('#app>div').forEach(d=>d.style.display=d.textContent.toLowerCase().includes(q)?'':'none')};
}
if(page=='studybox'){
 list(D.studybox,['Cours PDF','Résumés','Examens','Exercices'],i=>`<h5>${i.t}</h5><p class="small">${i.s}</p>${btn('Voir',"Document bientôt disponible")}`);
 const Q=[['Que signifie HTML ?',['HyperText Markup Language','High Tech Modern Language'],0],['Quelle balise crée un lien ?',['<link>','<a>'],1],['Quel langage met en forme une page web ?',['CSS','SQL'],0]];
 const F=[['Clé primaire','Identifiant unique d’une ligne dans une table'],['Boucle for','Répète un bloc un nombre connu de fois'],['Marché cible','Groupe de clients visé par une offre']];
 let sc=0,n=0;
 const quiz=()=>{if(n>=Q.length){$('#qz').innerHTML=`<h5>Score : ${sc}/${Q.length}</h5><button class="btn btn-primary" onclick="sc=0;n=0;quiz()">Recommencer</button>`;return}
  $('#qz').innerHTML=`<h5>${esc(Q[n][0])}</h5>`+Q[n][1].map((o,i)=>`<button class="btn btn-outline-primary d-block mb-2" data-i="${i}">${esc(o)}</button>`).join('');
  $('#qz').onclick=e=>{if(e.target.dataset.i==null)return;if(+e.target.dataset.i==Q[n][2])sc++;n++;quiz()}};
 $('#extra').innerHTML=`<h3 class="mt-5">Quiz</h3><div class="card service-card shadow-sm p-4" id="qz"></div><h3 class="mt-5">FlashCards <small class="text-muted fs-6">(clique pour retourner)</small></h3><div class="row g-3">${F.map(f=>`<div class="col-md-4"><div class="card service-card shadow-sm p-3 flash tint2" data-a="${esc(f[1])}" data-q="${esc(f[0])}">${esc(f[0])}</div></div>`).join('')}</div>`;
 quiz();
 $('#extra').addEventListener('click',e=>{const f=e.target.closest('.flash');if(f)f.textContent=f.textContent==f.dataset.q?f.dataset.a:f.dataset.q});
}
if(page=='studymatch')list(D.studymatch,['Informatique','Gestion','Maths'],i=>`<h5>${i.n}</h5><p class="small mb-1">${i.u} · ${i.cat}</p><p>${i.s}</p>${btn('Contacter',"Demande envoyée à "+i.n)}`);
if(page=='uniguide')list(D.uniguide,['ISET','ISG','ISSAT','Masters'],i=>`<h5>${i.n}</h5><p>${i.s}</p>${btn('En savoir plus','Fiche détaillée bientôt disponible')}`);
if(page=='studenttrip')list(D.studenttrip,['Voyages','Sorties','Formations','Événements'],i=>`<h5>${i.n}</h5><p>${i.s}</p>${btn('Participer','Inscription enregistrée')}`);

// Forum et avis : formulaire + sauvegarde locale
function feed(key,defs,fields,draw){
 let data=load(key,defs);
 $('#app').innerHTML=`<div class="card service-card shadow-sm p-3 mb-4"><div class="row g-2">${fields.map(f=>`<div class="${f.w||'col-md-4'}"><${f.tag||'input'} id="f_${f.id}" class="form-control" placeholder="${f.p}">${f.tag=='select'?'':''}</${f.tag||'input'}></div>`.replace('<input id','<input id').replace('></input>','>')).join('')}<div class="col-12"><button id="add" class="btn btn-primary">Publier</button></div></div></div><div id="L"></div>`;
 const show=()=>$('#L').innerHTML=data.map(draw).join('');
 $('#add').onclick=()=>{const o={};for(const f of fields){o[f.id]=$('#f_'+f.id).value.trim();if(!o[f.id])return toast('Remplis tous les champs.')}data.unshift(o);save(key,data);fields.forEach(f=>$('#f_'+f.id).value='');show()};
 show();
}
if(page=='unitalk')feed('talk',[{a:'Yasmine',t:'Comment réviser les bases de données ?',c:'Je conseille de refaire les examens des années passées.'},{a:'Amine',t:'Conseils pour un stage en PFE',c:'Commence à chercher dès le mois de janvier.'}],
 [{id:'a',p:'Ton prénom'},{id:'t',p:'Titre de la question',w:'col-md-8'},{id:'c',p:'Ton message',tag:'textarea',w:'col-12'}],
 p=>`<div class="card service-card shadow-sm p-3 mb-3"><h5>${esc(p.t)}</h5><p class="mb-1">${esc(p.c)}</p><small class="text-muted">par ${esc(p.a)}</small></div>`);
if(page=='unireview')feed('rev',[{p:'Mme Ben Ali',m:'Base de données',n:'5',c:'Cours clair, exemples concrets.'},{p:'M. Trabelsi',m:'Réseaux',n:'4',c:'Exigeant mais juste.'}],
 [{id:'p',p:'Professeur ou matière'},{id:'m',p:'Matière'},{id:'n',p:'Note de 1 à 5'},{id:'c',p:'Ton avis',w:'col-12'}],
 r=>`<div class="card service-card shadow-sm p-3 mb-3"><h5>${esc(r.p)} <small class="text-muted fs-6">${esc(r.m)}</small></h5><div class="stars">${'★'.repeat(Math.min(5,Math.max(1,+r.n||1)))}</div><p class="mb-0">${esc(r.c)}</p></div>`);
