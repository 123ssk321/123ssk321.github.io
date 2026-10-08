// DOM checks for static routes, search and generated plot initialization.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(process.argv[2] || 'build');
const site = path.join(root, 'trading-lab');
const gallery = new JSDOM(fs.readFileSync(path.join(site, 'index.html'), 'utf8'), { runScripts: 'dangerously' });
const document = gallery.window.document;
const visible = () => [...document.querySelectorAll('.card')].filter(c => !c.hidden).length;
assert.equal(visible(), 4);
const query = document.getElementById('query');
query.value = 'ridge';
query.dispatchEvent(new gallery.window.Event('input'));
assert.equal(visible(), 2);
query.value = '';
query.dispatchEvent(new gallery.window.Event('input'));
const kind = document.getElementById('kind');
kind.value = 'eda';
kind.dispatchEvent(new gallery.window.Event('change'));
assert.equal(visible(), 1);
query.value = 'no matching report';
query.dispatchEvent(new gallery.window.Event('input'));
assert.equal(visible(), 0);
assert.equal(document.getElementById('empty').hidden, false);
let charts = 0;
for (const link of document.querySelectorAll('.card a')) {
  const reportPath = path.resolve(site, link.getAttribute('href'));
  assert.ok(reportPath.startsWith(site + path.sep));
  const report = new JSDOM(fs.readFileSync(reportPath, 'utf8'), { runScripts: 'outside-only' });
  for (const script of report.window.document.querySelectorAll('script[src]')) {
    assert.ok(fs.existsSync(path.resolve(path.dirname(reportPath), script.getAttribute('src'))));
  }
  report.window.Plotly = { newPlot: (id, data) => {
    assert.ok(report.window.document.getElementById(id));
    for (const trace of data) assert.ok(trace.x.length <= 2000);
    charts++;
    return Promise.resolve();
  }};
  for (const script of report.window.document.querySelectorAll('script:not([src])')) report.window.eval(script.textContent);
  assert.equal(report.window.document.querySelector('nav a').getAttribute('href'), '../index.html');
  assert.ok(fs.existsSync(path.resolve(path.dirname(reportPath), '../../index.html')));
  report.window.close();
}
assert.equal(charts, 3); // The short paper run has no equity/bar observations.
assert.ok(fs.existsSync(path.join(root, 'index.html')));
gallery.window.close();
console.log('Gallery: 4 deep links, search/type/empty filters, 3 plot initializations, portfolio return links passed.');
