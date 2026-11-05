// Usage: node scripts/a11y.mjs [baseUrl] [paths...]  — axe-core WCAG 2.0/2.1/2.2 A+AA at 375 and 1280.
import { chromium } from './pw.mjs';
import { AxeBuilder } from '@axe-core/playwright';
const base = process.argv[2] ?? 'http://localhost:4321';
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
const browser = await chromium.launch();
let total = 0;
for (const width of [375, 1280]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in')));
    await page.waitForTimeout(300);
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    total += res.violations.length;
    console.log(`${width}px ${p}: ${res.violations.length} violation(s)`);
    for (const v of res.violations) {
      console.log(`  - [${v.impact}] ${v.id}: ${v.help}`);
      v.nodes.slice(0, 3).forEach((n) => console.log(`      ${n.target.join(' ')} :: ${n.failureSummary?.split('\n')[1]?.trim() ?? ''}`));
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`\nTotal violations: ${total}`);
process.exitCode = total ? 1 : 0;
