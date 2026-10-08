// Uses already-public gallery metadata only. Never reads Trading Lab sources or private journals.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const root=path.resolve(process.argv[2]||'public');
const lab=path.join(root,'trading-lab');
const journal=path.join(root,'trading-journal');
const manifest=JSON.parse(fs.readFileSync(path.join(lab,'manifest.json'),'utf8'));
assert.equal(manifest.schema,'public-gallery-v1');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const kinds={
 backtest:['Historical simulation session','This backtest is associated with its historical simulation journal. The private journal separates strategy decisions, order requests, individual fills and later outcomes.'],
 evaluation:['Evaluation session group','An evaluation contains several runs: strategy, benchmark and cost stress. The local session journal keeps these components separate so benchmark activity is not counted as strategy trades.'],
 eda:['Dataset analysis session','This report explores market data and does not execute trades. Trade reasons, orders, fills and trading outcomes are not applicable to this analysis session.'],
 paper:['Local paper session','This report is associated with a simulated paper observation. A short session can have no decisions or fills; a recorded market observation is not a trade.']
};
const cards=[];
fs.mkdirSync(path.join(journal,'sessions'),{recursive:true});
for(const report of manifest.reports){
 const id=report.report_id;
 assert.match(id,/^[a-f0-9]{64}$/);
 assert.ok(Object.hasOwn(kinds,report.kind));
 assert.ok(typeof report.title==='string' && report.title.length<=120);
 const sourcePath=path.join(lab,'reports',id+'.html');
 const original=fs.readFileSync(sourcePath,'utf8');
 // Immutable original stays byte-for-byte unchanged. A named companion adds navigation.
 const nav=`<a class="session-journal-link" href="../../trading-journal/sessions/${id}.html">Session journal →</a>`;
 assert.ok(original.includes('</nav>'));
 const companion=original.replace('</nav>',nav+'</nav>');
 fs.writeFileSync(path.join(lab,'reports',id+'.session.html'),companion);
 const [label,description]=kinds[report.kind];
 const contents=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; connect-src 'none'"><title>${esc(report.title)} · Session journal</title><style>*{box-sizing:border-box}body{margin:0;background:#101820;color:#edf4f3;font:16px system-ui}main{max-width:980px;margin:auto;padding:36px 24px}nav{display:flex;gap:22px;flex-wrap:wrap}a{color:#8de2c2}h1{font-size:clamp(30px,6vw,48px);letter-spacing:-.035em}p{line-height:1.7}section{padding:24px;background:#18272e;border:1px solid #30484b;border-radius:12px;margin:24px 0}small{color:#a7bcb7}.badge{color:#e7c585}.button{display:inline-block;padding:12px 16px;border:1px solid #8de2c2;border-radius:6px}code{overflow-wrap:anywhere}@media(max-width:600px){main{padding:24px 16px}section{padding:18px}}</style></head><body><main><nav><a href="../index.html">Trading Journal</a><a href="../../trading-lab/index.html">Trading Lab reports</a></nav><header><small>REPORT-BOUND SESSION · ${esc(label.toUpperCase())}</small><h1>${esc(report.title)}</h1><p>${esc(description)}</p></header><section><h2>Associated report</h2><p>This session entry belongs to the report above. It never substitutes the newest run or another strategy's journal.</p><a class="button report-backlink" href="../../trading-lab/reports/${id}.session.html">Open this report →</a></section><section><h2>${report.kind==='eda'?'No execution journal is applicable':'Trade details stay in the private journal'}</h2><p class="badge">${report.kind==='eda'?'Analysis only · no trading activity':'Private/local evidence · not hosted on this public site'}</p><p>${report.kind==='eda'?'The local session record preserves the analysis report association without fabricating a trade lifecycle.':'The local journal shows each recorded action, its original decision reason, available context and execution timeline. Older records may lack native links or reasons; they show “Reason not recorded” rather than an invented explanation.'}</p><p>This public entry establishes navigation and report association. It does not publish private rows, reasons or even a hidden journal dataset.</p></section><section><h2>See how a session journal works</h2><p>A separate synthetic example demonstrates explained counts, entry and exit reasons, partial fills and missing evidence. It is not the journal for this report.</p><a class="button synthetic-link" href="../synthetic-session.html">Explore the synthetic session →</a></section><footer><p><a href="../index.html">Back to journal insights</a> · Public Pages is never a private journal backend.</p></footer></main></body></html>`;
 fs.writeFileSync(path.join(journal,'sessions',id+'.html'),contents);
 cards.push(`<article class="session-card"><small>${esc(label)}</small><h3>${esc(report.title)}</h3><p>${report.kind==='eda'?'Analysis only · no trade lifecycle':'Private journal details are viewed locally'}</p><a href="sessions/${id}.html">Associated session →</a></article>`);
}
const galleryPath=path.join(lab,'index.html');
const dom=new JSDOM(fs.readFileSync(galleryPath,'utf8'));
const doc=dom.window.document;
if(!doc.querySelector('.journal-home-link')){
 const link=doc.createElement('a');link.className='journal-home-link';link.href='../trading-journal/';link.textContent='Trading Journal';doc.querySelector('nav').append(link);
}
for(const card of doc.querySelectorAll('.card')){
 const explore=card.querySelector('a');
 const match=explore.getAttribute('href').match(/^reports\/([a-f0-9]{64})(?:\.session)?\.html$/);
 assert.ok(match,'gallery report link must bind an exact approved public report');
 const id=match[1];assert.ok(manifest.reports.some(r=>r.report_id===id));
 explore.setAttribute('href','reports/'+id+'.session.html');explore.setAttribute('data-report-link','');
 if(!card.querySelector('.session-link')){
  const link=doc.createElement('a');link.className='session-link';link.href='../trading-journal/sessions/'+id+'.html';link.textContent='Session journal →';link.style.display='block';link.style.marginTop='12px';card.append(link);
 }
}
fs.writeFileSync(galleryPath,dom.serialize());dom.window.close();
const journalPath=path.join(journal,'index.html');
let home=fs.readFileSync(journalPath,'utf8');
home=home.replace(/<section id="lab-sessions">[\s\S]*?<\/section>/,'');
const section='<section id="lab-sessions"><h2>Sessions behind Trading Lab reports</h2><p>Open the exact session associated with a report. The report links are public; full trade evidence is retained locally. Analysis reports have no trading lifecycle.</p><div class="grid">'+cards.join('')+'</div></section>';
assert.ok(home.includes('<footer>'));
home=home.replace('<footer>',section+'<footer>');
fs.writeFileSync(journalPath,home);
console.log('Linked '+manifest.reports.length+' public reports to companion views and private-session status entries. Immutable originals preserved.');
