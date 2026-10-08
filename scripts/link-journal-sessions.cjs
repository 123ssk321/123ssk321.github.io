// Links rendered public journals; never reads private sources or databases.
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const root=path.resolve(process.argv[2]||'public');
const lab=path.join(root,'trading-lab'), journal=path.join(root,'trading-journal');
const manifest=JSON.parse(fs.readFileSync(path.join(lab,'manifest.json'),'utf8'));
assert.equal(manifest.schema,'public-gallery-v1');
const publication=JSON.parse(fs.readFileSync(path.join(journal,'sessions','manifest.json'),'utf8'));
assert.equal(publication.schema,'published-session-journals-v1');
const sessions=new Map();
for(const entry of publication.sessions){
 assert.match(entry.report_id,/^[a-f0-9]{64}$/);
 assert.ok(!sessions.has(entry.report_id),'duplicate session publication');
 assert.ok(['public','private'].includes(entry.visibility));
 sessions.set(entry.report_id,entry);
}
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const labels={backtest:'Historical simulation session',evaluation:'Evaluation session group',eda:'Dataset analysis session',paper:'Local paper session',review:'Combined review session'};
const cards=[];
for(const report of manifest.reports){
 const id=report.report_id;
 assert.match(id,/^[a-f0-9]{64}$/);
 assert.ok(Object.hasOwn(labels,report.kind));
 assert.ok(typeof report.title==='string' && report.title.length<=120);
 const entry=sessions.get(id);assert.ok(entry,'publish the exact session before linking its report');
 const visibility=report.journal_visibility||entry.visibility||'public';
 assert.equal(visibility,entry.visibility,'report and journal visibility must agree');
 const page=path.join(journal,'sessions',id+'.html');
 const original=fs.readFileSync(path.join(lab,'reports',id+'.html'),'utf8');
 let nav='';
 if(visibility==='public'){
  assert.ok(fs.existsSync(page),'public journal page missing');
  const contents=fs.readFileSync(page,'utf8');
  assert.ok(contents.includes('PUBLIC SESSION JOURNAL'),'publish actual journal, not a status placeholder');
  assert.ok(contents.includes(id),'journal must bind the exact public report');
  nav=`<a class="session-journal-link" href="../../trading-journal/sessions/${id}.html">Session journal →</a>`;
 }else{
  for(const file of [page,page.replace(/\.html$/,'.publication.json')])if(fs.existsSync(file))fs.unlinkSync(file);
 }
 assert.ok(original.includes('</nav>'));
 fs.writeFileSync(path.join(lab,'reports',id+'.session.html'),original.replace('</nav>',nav+'</nav>'));
 cards.push(`<article class="session-card"><small>${esc(labels[report.kind])} · ${visibility}</small><h3>${esc(report.title)}</h3><p>${report.kind==='eda'?'Analysis session · no trade lifecycle':visibility==='public'?'Recorded actions, available reasons and execution evidence':'Private journal · available locally'}</p>${visibility==='public'?`<a href="sessions/${id}.html">Open session journal →</a>`:'<span>Private session journal</span>'}</article>`);
}
assert.equal(sessions.size,manifest.reports.length,'unmatched journal publication');
const galleryPath=path.join(lab,'index.html');
const dom=new JSDOM(fs.readFileSync(galleryPath,'utf8'));const doc=dom.window.document;
if(!doc.querySelector('.journal-home-link')){
 const link=doc.createElement('a');link.className='journal-home-link';link.href='../trading-journal/';link.textContent='Trading Journal';doc.querySelector('nav').append(link);
}
for(const card of doc.querySelectorAll('.card')){
 const explore=card.querySelector('a[data-report-link]')||card.querySelector('a');
 const match=explore.getAttribute('href').match(/^reports\/([a-f0-9]{64})(?:\.session)?\.html$/);
 assert.ok(match,'gallery report link must bind an exact approved public report');
 const id=match[1];const entry=sessions.get(id);assert.ok(entry);
 explore.setAttribute('href','reports/'+id+'.session.html');explore.setAttribute('data-report-link','');
 card.querySelector('.session-link')?.remove();card.querySelector('.session-private')?.remove();
 const link=doc.createElement(entry.visibility==='public'?'a':'span');
 link.className=entry.visibility==='public'?'session-link':'session-private';
 if(entry.visibility==='public')link.href='../trading-journal/sessions/'+id+'.html';
 link.textContent=entry.visibility==='public'?'Session journal →':'Private session journal';
 link.style.display='block';link.style.marginTop='12px';card.append(link);
}
fs.writeFileSync(galleryPath,dom.serialize());dom.window.close();
const journalPath=path.join(journal,'index.html');
let home=fs.readFileSync(journalPath,'utf8').replace(/<section id="lab-sessions">[\s\S]*?<\/section>/,'');
const section='<section id="lab-sessions"><h2>Sessions behind Trading Lab reports</h2><p>Open the actual session that produced each report. Session journals are public by default; choose private explicitly when publishing. Missing historical reasons stay marked as unavailable.</p><div class="grid">'+cards.join('')+'</div></section>';
assert.ok(home.includes('<footer>'));home=home.replace('<footer>',section+'<footer>');fs.writeFileSync(journalPath,home);
console.log('Linked '+manifest.reports.length+' exact report journals with explicit visibility. Immutable originals preserved.');
