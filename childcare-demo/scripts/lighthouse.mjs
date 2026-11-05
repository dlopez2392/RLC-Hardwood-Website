// Usage: node scripts/lighthouse.mjs [baseUrl] [paths...]   (env: FORM=mobile|desktop)
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { mkdirSync, writeFileSync } from 'node:fs';
const base = process.argv[2] ?? 'http://localhost:4321';
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
const form = process.env.FORM ?? 'mobile';
mkdirSync('.verify/lighthouse', { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});
const rows = [];
let worst = 100;
for (const p of paths) {
  const config = form === 'desktop'
    ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } }
    : { extends: 'lighthouse:default' };
  const r = await lighthouse(base + p, { port: chrome.port, output: 'json', logLevel: 'error' }, config);
  const c = r.lhr.categories;
  const s = (k) => Math.round((c[k]?.score ?? 0) * 100);
  const row = { path: p, perf: s('performance'), a11y: s('accessibility'), bp: s('best-practices'), seo: s('seo'),
    lcp: r.lhr.audits['largest-contentful-paint']?.displayValue, cls: r.lhr.audits['cumulative-layout-shift']?.displayValue, tbt: r.lhr.audits['total-blocking-time']?.displayValue };
  worst = Math.min(worst, row.perf, row.a11y, row.bp, row.seo);
  rows.push(row);
  const failing = Object.values(r.lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable').map((a) => `   - ${a.id}: ${a.title}${a.displayValue ? ' (' + a.displayValue + ')' : ''}`);
  console.log(`${form} ${p}  P${row.perf} A${row.a11y} BP${row.bp} SEO${row.seo}  LCP ${row.lcp} CLS ${row.cls} TBT ${row.tbt}`);
  if (failing.length) console.log(failing.join('\n'));
}
await chrome.kill();
writeFileSync(`.verify/lighthouse/${form}.json`, JSON.stringify(rows, null, 2));
console.log(`\nLowest score across ${paths.length} page(s): ${worst}`);
