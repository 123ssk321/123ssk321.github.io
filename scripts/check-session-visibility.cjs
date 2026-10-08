const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const {JSDOM}=require('jsdom');
const source=path.resolve(process.argv[2]||'public');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'journal-visibility-'));
try{
 fs.cpSync(source,temp,{recursive:true});
 const file=path.join(temp,'trading-journal','sessions','manifest.json');
 const publication=JSON.parse(fs.readFileSync(file,'utf8'));
 const id=publication.sessions.find(s=>s.visibility==='public').report_id;
 publication.sessions.find(s=>s.report_id===id).visibility='private';
 fs.writeFileSync(file,JSON.stringify(publication));
 const galleryFile=path.join(temp,'trading-lab','manifest.json'),gallery=JSON.parse(fs.readFileSync(galleryFile,'utf8'));
 gallery.reports.find(r=>r.report_id===id).journal_visibility='private';fs.writeFileSync(galleryFile,JSON.stringify(gallery));
 execFileSync(process.execPath,[path.join(__dirname,'link-journal-sessions.cjs'),temp],{stdio:'pipe'});
 const page=path.join(temp,'trading-journal','sessions',id+'.html');
 assert.ok(!fs.existsSync(page));assert.ok(!fs.existsSync(page.replace(/\.html$/,'.publication.json')));
 const home=new JSDOM(fs.readFileSync(path.join(temp,'trading-journal','index.html'),'utf8'));
 assert.equal(home.window.document.querySelectorAll(`a[href="sessions/${id}.html"]`).length,0);
 const lab=new JSDOM(fs.readFileSync(path.join(temp,'trading-lab','index.html'),'utf8'));
 assert.equal(lab.window.document.querySelectorAll(`a[href="../trading-journal/sessions/${id}.html"]`).length,0);
 const companion=fs.readFileSync(path.join(temp,'trading-lab','reports',id+'.session.html'),'utf8');
 assert.ok(!companion.includes('session-journal-link'));
 execFileSync(process.execPath,[path.join(__dirname,'check-report-sessions.cjs'),temp],{stdio:'pipe'});
 console.log('Explicit private selection withdraws public HTML/metadata and removes journal links; unrelated sessions retained.');
}finally{
 // This path was created by mkdtemp within the OS temporary directory.
 assert.equal(path.dirname(temp),path.resolve(os.tmpdir()));
 fs.rmSync(temp,{recursive:true,force:true});
}
