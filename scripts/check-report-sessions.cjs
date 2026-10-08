const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {JSDOM}=require('jsdom');
const root=path.resolve(process.argv[2]||'build'),gallery=path.join(root,'trading-lab');
const manifest=JSON.parse(fs.readFileSync(path.join(gallery,'manifest.json'),'utf8'));
const publication=JSON.parse(fs.readFileSync(path.join(root,'trading-journal','sessions','manifest.json'),'utf8'));
assert.equal(publication.schema,'published-session-journals-v1');
const sessions=new Map(publication.sessions.map(s=>[s.report_id,s]));
const index=new JSDOM(fs.readFileSync(path.join(gallery,'index.html'),'utf8'));
assert.ok(index.window.document.querySelector('.journal-home-link'));
assert.equal(index.window.document.querySelectorAll('.session-link').length,publication.sessions.filter(s=>s.visibility==='public').length);
const known=new Set(manifest.reports.map(r=>r.report_id));
for(const report of manifest.reports){
 const id=report.report_id,session=sessions.get(id);assert.ok(session);
 const original=fs.readFileSync(path.join(gallery,'reports',id+'.html'),'utf8');
 const companion=fs.readFileSync(path.join(gallery,'reports',id+'.session.html'),'utf8');
 const nav=`<a class="session-journal-link" href="../../trading-journal/sessions/${id}.html">Session journal →</a>`;
 const target=path.join(root,'trading-journal','sessions',id+'.html');
 if(session.visibility==='private'){
  assert.ok(!fs.existsSync(target));assert.ok(!fs.existsSync(target.replace(/\.html$/,'.publication.json')));
  assert.equal(companion,original);continue;
 }
 assert.ok(companion.includes(nav));assert.equal(companion.replace(nav,''),original);
 const bytes=fs.readFileSync(target),page=bytes.toString('utf8'),dom=new JSDOM(page),doc=dom.window.document;
 assert.ok(page.includes('PUBLIC SESSION JOURNAL'));assert.ok(page.includes('ACTUAL RECORDED EVIDENCE'));
 assert.ok(!page.includes('This public entry establishes navigation'));assert.ok(!page.includes('FICTIONAL TRADES'));
 assert.equal(doc.querySelector('h1').textContent,report.title);
 assert.equal(doc.querySelector('.report-backlink').getAttribute('href'),`../../trading-lab/reports/${id}.session.html`);
 const count=key=>Number(doc.querySelector(`[data-metric="${key}"]`).textContent.split(' / ')[0]);
 for(const type of ['decision','fill','close'])assert.equal(doc.querySelectorAll(`[data-event-type="${type}"]`).length,count({decision:'decisions',fill:'fills',close:'closed_positions'}[type]));
 assert.equal(doc.querySelectorAll('[data-component]').length,count('intents'));
 assert.ok(count('known_reasons')<=count('decisions'));assert.ok(count('known_contexts')<=count('decisions'));
 if(report.kind==='eda'){assert.ok(page.includes('Research session'));assert.equal(count('decisions'),0);assert.equal(count('fills'),0);}
 for(const token of ['source_sha256','source_relative_path','candidate_id','model_id','run_id','trade_id','order_id','fill_id','event_id','journal.sqlite','C:/Users','file://','fetch(','XMLHttpRequest','WebSocket','Source lineage and full event timeline'])assert.ok(!page.includes(token),token);
 for(const hash of page.match(/[a-f0-9]{64}/g)||[])assert.ok(known.has(hash),'internal hash disclosed');
 assert.equal(doc.querySelectorAll('script,iframe,img').length,0);assert.ok(page.includes("connect-src 'none'"));
 const metadata=JSON.parse(fs.readFileSync(target.replace(/\.html$/,'.publication.json'),'utf8'));
 assert.deepEqual(Object.keys(metadata).sort(),['html_sha256','kind','report_id','schema','title','visibility']);
 assert.equal(metadata.visibility,'public');assert.equal(metadata.report_id,id);
 assert.equal(metadata.html_sha256,crypto.createHash('sha256').update(bytes).digest('hex'));
 dom.window.close();
}
const home=new JSDOM(fs.readFileSync(path.join(root,'trading-journal','index.html'),'utf8'));
assert.equal(home.window.document.querySelectorAll('#lab-sessions .session-card').length,manifest.reports.length);
assert.ok(home.window.document.querySelector('#lab-sessions').textContent.includes('public by default'));
console.log('Report journals: actual evidence, exact counts/links, private exclusions, immutable originals and safe metadata passed.');
