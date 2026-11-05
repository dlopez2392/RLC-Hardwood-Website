// node scripts/slice.mjs <png> <sliceHeight> -> writes <png>.<n>.png slices
import sharp from 'sharp';
const [file, hArg] = process.argv.slice(2);
const img = sharp(file); const { width, height } = await img.metadata();
const h = Number(hArg ?? 900); let n = 0;
for (let y = 0; y < height; y += h) {
  await sharp(file).extract({ left: 0, top: y, width, height: Math.min(h, height - y) }).toFile(`${file}.${n++}.png`);
}
console.log(file, width + 'x' + height, n, 'slices');
