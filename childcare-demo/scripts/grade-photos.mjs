// Applies one shared "Sunroom" grade to every raw frame so the set reads as a single shoot:
// a touch of warmth, slightly lifted (matte) blacks, gently reduced saturation.
//   node scripts/grade-photos.mjs   (src/assets/photos/raw/*.jpeg → src/assets/photos/*.jpg)
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
const RAW = 'src/assets/photos/raw', OUT = 'src/assets/photos';
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(RAW).filter((x) => /\.(jpe?g|png|webp)$/i.test(x)).sort()) {
  const slug = f.replace(/^\d+-/, '').replace(/\.\w+$/, '');
  await sharp(`${RAW}/${f}`)
    .modulate({ saturation: 0.92, brightness: 1.01 })
    .recomb([[1.03, 0.01, 0], [0, 1.0, 0], [0, 0.01, 0.95]]) // warm: lift reds, cool the blues a touch
    .linear(0.95, 8) // matte film blacks
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${OUT}/${slug}.jpg`);
  console.log(`graded ${f} → ${slug}.jpg`);
}
