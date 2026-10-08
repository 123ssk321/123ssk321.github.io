# Journal insight demonstration

`public/trading-journal/index.html` is an offline interactive aggregate demonstration generated entirely from synthetic records by the independent private Trading Journal product. The detailed example contains fictional entry and exit reasons. Real trade evidence remains private. The Trading Lab gallery and companion reports link to exact report session entries.

Build the existing portfolio normally, then run both checks:

```powershell
node scripts/link-journal-sessions.cjs public
npm run build
node scripts/check-trading-gallery.cjs build
node scripts/check-journal-insights.cjs build
node scripts/check-report-sessions.cjs build
```

Publish the complete existing build using `npm run deploy`; keep the original Pages branch/domain configuration. Never deploy this subdirectory as the site root. Future real-data insights require explicit human selection and review of the independent product's exact report/source/HTML-bound sanitized export. Copy only the approved HTML. Pages is public and is never a journal backend.

The session linker reads only already-public gallery metadata. Each report has a dedicated public session-status entry; the full journal remains local. Evaluations are session groups and EDA is analysis-only. Existing immutable report files and URLs remain unchanged. A `reports/<public-report-id>.session.html` companion adds a journal button to the same public report; gallery links use that companion. The linker is repeatable and should run after adding approved reports or updating the journal example. `synthetic-session.html` is generated internally by the journal product, is labeled synthetic, and never stands in for an actual report's private journal.
