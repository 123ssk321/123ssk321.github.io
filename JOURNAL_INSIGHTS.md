# Journal insight demonstration

`public/trading-journal/index.html` is an offline interactive aggregate demonstration generated entirely from synthetic records by the independent private Trading Journal product. It contains no Trading Lab artifacts, raw trade journal, account identities, contexts, reasons, model files or private datasets. The only portfolio layout change is an adjacent footer link. `/trading-lab/` is preserved.

Build the existing portfolio normally, then run both checks:

```powershell
npm run build
node scripts/check-trading-gallery.cjs build
node scripts/check-journal-insights.cjs build
```

Publish the complete existing build using `npm run deploy`; keep the original Pages branch/domain configuration. Never deploy this subdirectory as the site root. Future real-data insights require explicit human selection and review of the independent product's exact report/source/HTML-bound sanitized export. Copy only the approved HTML. Pages is public and is never a journal backend.
