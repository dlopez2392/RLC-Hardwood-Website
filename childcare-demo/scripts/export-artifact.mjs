// Portable export: turns dist/ into a self-contained, relative-URL copy in .artifact/
// so the site can be hosted under any base path (e.g. a private Claude Artifact preview).
//   npm run build && node scripts/export-artifact.mjs
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SRC = 'dist', OUT = '.artifact';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(SRC).map((f) => relative(SRC, f).split(sep).join('/'));

// Only what the pages need (skip OG cards, sitemap, manifest, raster icons).
const keep = (f) => f.endsWith('.html') || f.startsWith('_astro/') || f === 'favicon.svg';

const dataUri = (p, mime) => `data:${mime};base64,${readFileSync(join(SRC, p)).toString('base64')}`;
const FONTS = {
  '/fonts/fraunces.woff2': dataUri('fonts/fraunces.woff2', 'font/woff2'),
  '/fonts/fraunces-italic.woff2': dataUri('fonts/fraunces-italic.woff2', 'font/woff2'),
  '/fonts/instrument-sans.woff2': dataUri('fonts/instrument-sans.woff2', 'font/woff2'),
};
const NOISE = dataUri('noise.png', 'image/png');

/** Inline fonts + grain texture wherever CSS references them. */
const inlineAssets = (s) => {
  for (const [p, uri] of Object.entries(FONTS)) s = s.split(`url(${p})`).join(`url(${uri})`).split(`url("${p}")`).join(`url("${uri}")`);
  return s.split('url(/noise.png)').join(`url(${NOISE})`).split('url("/noise.png")').join(`url("${NOISE}")`);
};

/** "/programs/#x" → "<prefix>programs/index.html#x" ; "/_astro/a.js" → "<prefix>_astro/a.js" */
const localize = (url, prefix) => {
  const m = url.match(/^\/([^?#]*)([?#].*)?$/);
  if (!m) return url;
  let path = m[1];
  if (path === '' || path.endsWith('/')) path += 'index.html';
  return prefix + path + (m[2] ?? '');
};

for (const f of files.filter(keep)) {
  const src = join(SRC, f), dst = join(OUT, f);
  mkdirSync(join(dst, '..'), { recursive: true });
  if (f.endsWith('.css')) { writeFileSync(dst, inlineAssets(readFileSync(src, 'utf8'))); continue; }
  if (f.includes('preload-helper')) {
    // Vite prefixes preloaded chunk paths with "/"; resolve them from the site root instead.
    const js = readFileSync(src, 'utf8').replace('return`/`+e', 'return(document.querySelector(`meta[name="site-root"]`)?.content??`/`)+e');
    writeFileSync(dst, js); continue;
  }
  if (!f.endsWith('.html')) { cpSync(src, dst); continue; }

  const depth = f.split('/').length - 1;
  const prefix = depth ? '../'.repeat(depth) : './';
  let html = readFileSync(src, 'utf8');
  html = html.replace(/<link rel="preload" href="\/fonts\/[^"]+"[^>]*>/g, '');
  html = html.replace(/<link rel="(manifest|sitemap|apple-touch-icon)"[^>]*>/g, '').replace(/<link rel="icon" href="\/favicon\.ico"[^>]*>/g, '');
  html = html.replace(/\s(href|src|component-url|renderer-url|before-hydration-url)="(\/[^"/][^"]*|\/)"/g, (_, a, u) => ` ${a}="${localize(u, prefix)}"`);
  html = inlineAssets(html);
  html = html.replace('<head>', `<head><meta name="site-root" content="${prefix}">`);

  if (f === 'index.html') {
    // The artifact host wraps its main page in its own document skeleton: ship the
    // home page as a fragment and give it a product-style name for the gallery.
    const lang = html.match(/<html lang="([^"]+)"/)?.[1] ?? 'en-US';
    html = html.replace(/<!doctype html>/i, '').replace(/<html[^>]*>/, '').replace('</html>', '')
      .replace('<head>', '').replace('</head>', '').replace(/<body[^>]*>/, '').replace('</body>', '')
      .replace(/<title>[^<]*<\/title>/, '<title>Sunroom Early Learning Studio</title>');
    html = `<script>document.documentElement.lang=${JSON.stringify(lang)};document.body&&document.body.classList.add('min-h-dvh','flex','flex-col');</script>\n` + html;
  }
  writeFileSync(dst, html);
}

// Some hosts reserve names starting with "_": move _astro/ → assets/ and update every reference.
cpSync(join(OUT, '_astro'), join(OUT, 'assets'), { recursive: true });
rmSync(join(OUT, '_astro'), { recursive: true, force: true });
for (const f of walk(OUT).filter((x) => /\.(html|js|css)$/.test(x))) {
  const t = readFileSync(f, 'utf8');
  if (t.includes('_astro/')) writeFileSync(f, t.split('_astro/').join('assets/'));
}

const out = walk(OUT);
const bytes = out.reduce((s, f) => s + statSync(f).size, 0);
console.log(`Exported ${out.length} files (${(bytes / 1024).toFixed(0)} KB) to ${OUT}/`);
if (!existsSync(join(OUT, 'index.html'))) process.exit(1);
