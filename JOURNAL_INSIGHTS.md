# Journal insight demonstration

`public/trading-journal/index.html` contains a synthetic aggregate demonstration and links to actual report-bound session journals. The separate detailed example remains fictional. Selected session journals are **public by default**; use explicit private visibility when withholding a session. Real public sessions contain the product's closed presentation projection, never raw databases/source documents/model artifacts.

Build the existing portfolio normally, then run both checks:

```powershell
node scripts/link-journal-sessions.cjs public
npm run build
node scripts/check-trading-gallery.cjs build
node scripts/check-journal-insights.cjs build
node scripts/check-report-sessions.cjs build
node scripts/check-session-visibility.cjs build
```

Publish the complete existing build using `npm run deploy`; keep the original Pages branch/domain configuration. Never deploy this subdirectory as the site root. Future real-data insights require explicit human selection and review of the independent product's exact report/source/HTML-bound sanitized export. Copy only the approved HTML. Pages is public and is never a journal backend.

Before linking, run `scripts/publish-lab-sessions.py --source-manifest LOCAL_APPROVAL_MANIFEST --public-root public --db LOCAL_JOURNAL.sqlite3` with `trading_lab` and `trading_journal` installed/on `PYTHONPATH`. The database and source manifest must stay outside `public`. The bridge verifies original approved source hashes and public report identities before importing exact session scopes. Manifest entries accept `journal_visibility: public | private`, default public; `--visibility private` is an explicit command-wide override. The Lab exporter also accepts `--journal-visibility private` and emits its selection plan. Keep the same database and output mount paths for later managed republishing/withdrawal.

The bridge generates actual detailed public HTML and safe hash metadata. Private selection writes a full local review and withdraws managed public output. The linker reads public metadata only, retains actual public journals, and removes private HTML/metadata and links. Refresh both manifests and deploy the complete build to apply withdrawal; previously downloaded pages and Git history can remain accessible.

Evaluations keep independent final/stress/benchmark components, EDA has no execution, and old missing reasons stay unknown. Existing immutable report files and URLs remain unchanged; `reports/<public-report-id>.session.html` companions add navigation. `synthetic-session.html` remains unrelated to actual reports. Repeat the linker after journal publishing or updating the aggregate demonstration.
