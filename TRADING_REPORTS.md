# Trading research reports

The original React portfolio remains at `/`. The static report gallery is an additional page at `/trading-lab/`; individual reports have immutable content-based filenames. The only homepage change is a link in its existing footer. No React routing change, custom-domain change or additional Pages workflow is needed.

`public/trading-lab/` contains four selected summaries from public BTC data: a baseline backtest, a ridge holdout/parameter sweep, development-period dataset EDA, and a 60-second simulated paper session. The gallery supports search and report-type filtering. Plotly is included locally, with no chart CDN requirement. Source model coefficients, private provenance, raw dataset observations and journals are excluded.

## Build, check and publish

```powershell
npm ci
npm run build
node scripts/check-trading-gallery.cjs build
# After reviewing/merging the portfolio changes, use the existing deployment:
npm run deploy
```

The existing `predeploy` script builds the whole React portfolio and `gh-pages -d build` publishes it to the existing `gh-pages` branch. This PR does not push a deployment or change Pages settings. Keep the current Pages branch/domain configuration. Before deploying, check the build's homepage and the added `/trading-lab/` route; never deploy the report directory alone as the site's root.

To add reports, use trading-lab's `export-public` command with a hash-pinned approval manifest, then copy only its generated `trading-lab` directory into `public/`. Keep earlier report files and `manifest.json` so old URLs continue to work. Do not copy raw research artifacts or journals into this public repository. The existing Plotly asset is pinned with the gallery; changing it requires an explicit migration.

The DOM check exercises filters, all report routes/asset links and plot initialization. It does not replace visual/mobile review in a browser. A paper run with no closed hourly bar/fill correctly shows no performance chart. All published results remain simulated evidence, not real-money deployment approval.
