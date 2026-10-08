"""Publish exact selected Lab sessions with the journal product's public projection.

Run with both trading_lab and trading_journal installed/on PYTHONPATH. Private
source manifests and the journal database stay outside the portfolio public tree.
"""
import argparse
import hashlib
import json
from pathlib import Path
from trading_lab.public_reports import public_view
from trading_lab.catalog import digest
from trading_journal.adapters import import_trading_lab
from trading_journal.journal import Journal
from trading_journal.public_sessions import publish_session


def publish(source_manifest, public_root, database, visibility=None):
    source_manifest=Path(source_manifest).resolve()
    public_root=Path(public_root).resolve()
    database=Path(database).resolve()
    if public_root==database or public_root in database.parents:
        raise ValueError('journal database must stay outside the public tree')
    source_entries=json.loads(source_manifest.read_text(encoding='utf-8'))['reports']
    gallery_path=public_root/'trading-lab'/'manifest.json'
    gallery=json.loads(gallery_path.read_text(encoding='utf-8'))
    reports={r['report_id']:r for r in gallery['reports']}
    plan_path=public_root/'trading-lab'/'journal-publication.json'
    plan={}
    if plan_path.exists():
        publication_plan=json.loads(plan_path.read_text(encoding='utf-8'))
        if publication_plan.get('schema')!='journal-publication-plan-v1':
            raise ValueError('unsupported Lab publication plan')
        for item in publication_plan['reports']:
            if item['public_report_id'] in plan:
                raise ValueError('duplicate Lab publication selections')
            plan[item['public_report_id']]=item['journal_visibility']
    selected=[]
    for entry in source_entries:
        source=(source_manifest.parent/entry['source']).resolve()
        raw=source.read_bytes()
        if hashlib.sha256(raw).hexdigest()!=entry['source_sha256']:
            raise ValueError('reviewed source bytes changed')
        report_id=digest(public_view(entry,json.loads(raw)))
        if report_id not in reports:
            raise ValueError('source does not match an existing published report')
        # Preserve the Lab CLI's resolved explicit override from its plan.
        desired=visibility or plan.get(report_id) or entry.get('journal_visibility') or reports[report_id].get('journal_visibility','public')
        if desired not in ('public','private'):
            raise ValueError('journal visibility must be public or private')
        selected.append((entry,source,report_id,desired))
    if len({r[2] for r in selected})!=len(selected):
        raise ValueError('duplicate report selections')
    directory=public_root/'trading-journal'/'sessions'
    directory.mkdir(parents=True,exist_ok=True)
    manifest_path=directory/'manifest.json'
    existing=json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {'schema':'published-session-journals-v1','sessions':[]}
    if existing['schema']!='published-session-journals-v1':
        raise ValueError('unsupported session manifest')
    sessions={s['report_id']:s for s in existing['sessions']}
    journal=Journal(database)
    try:
        for entry,source,report_id,desired in selected:
            result=import_trading_lab(journal,source,entry.get('symbol'))
            journal.associate_public_report(report_id,[result['report_id']])
            page=directory/(report_id+'.html')
            # Migrate only the former generated public status placeholder.
            if page.exists() and not page.with_suffix('.publication.json').exists():
                old=page.read_text(encoding='utf-8')
                if 'REPORT-BOUND SESSION' in old and 'This public entry establishes navigation and report association.' in old:
                    page.unlink()
            publish_session(journal,page,public_report_id=report_id,
                            visibility=desired,title=reports[report_id]['title'],
                            report_kind=entry['kind'],public_root=public_root,
                            private_output=database.parent/'sessions'/(report_id+'.private.html'))
            sessions[report_id]={'report_id':report_id,'visibility':desired,
                                 'title':reports[report_id]['title'],'kind':entry['kind']}
            reports[report_id]['journal_visibility']=desired
        manifest_path.write_text(json.dumps({'schema':'published-session-journals-v1','sessions':list(sessions.values())},indent=2)+'\n',encoding='utf-8')
        gallery_path.write_text(json.dumps(gallery,indent=2)+'\n',encoding='utf-8')
    finally:
        journal.close()
    return len(selected)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-manifest',required=True)
    parser.add_argument('--public-root',default='public')
    parser.add_argument('--db',required=True)
    parser.add_argument('--visibility',choices=['public','private'],help='Explicit override; otherwise each entry defaults to public')
    args=parser.parse_args()
    count=publish(args.source_manifest,args.public_root,args.db,args.visibility)
    print('Published visibility selection for '+str(count)+' exact report sessions. Run link-journal-sessions.cjs, then build/deploy the full site.')
