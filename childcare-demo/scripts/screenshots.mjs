// Usage: node scripts/screenshots.mjs [baseUrl] [paths...]  (env: WIDTHS=375,1280 FULL=1 REDUCED=1)
import { chromium } from './pw.mjs';
import { mkdirSync } from 'node:fs';
const base = process.argv[2] ?? 'http://localhost:4321';
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
const widths = (process.env.WIDTHS ?? '375,768,1280,1920').split(',').map(Number);
const out = process.env.OUT ?? '.verify/shots';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const issues = [];
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 600 ? 812 : w < 1000 ? 1024 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference',
    timezoneId: 'America/Chicago',
  });
  const page = await ctx.newPage();
  if (process.env.HOUR) await page.clock.setFixedTime(new Date(`2026-11-05T${process.env.HOUR.padStart(2, '0')}:20:00-06:00`));
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      // trigger reveal-on-scroll everywhere, then return to top
      document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'));
      await document.fonts.ready;
    });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) issues.push(`${p} @${w}: horizontal overflow ${overflow}px`);
    const name = `${p.replace(/\//g, '_') || '_'}${process.env.REDUCED ? '-rm' : ''}-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: process.env.FULL !== '0' });
  }
  await ctx.close();
}
await browser.close();
console.log(issues.length ? 'ISSUES:\n' + issues.join('\n') : 'No horizontal overflow detected.');
