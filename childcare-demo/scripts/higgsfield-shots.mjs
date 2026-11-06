// Generate the site's photography through the Higgsfield API (see docs/photo-shot-list.md).
// Auth: the session proxy injects `Authorization: Key <id>:<secret>` for api.higgsfield.ai.
// Locally, export HF_KEY="<id>:<secret>" instead.
//   node scripts/higgsfield-shots.mjs estimate      # price every shot, spend nothing
//   node scripts/higgsfield-shots.mjs run [1,3,5]   # generate all (or listed) shots
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const API = 'https://api.higgsfield.ai';
const MODEL = process.env.HF_MODEL ?? 'bytedance/seedream/v4/text-to-image';
const OUT = 'src/assets/photos/raw';
const auth = process.env.HF_KEY ? { Authorization: `Key ${process.env.HF_KEY}` } : {};

const STYLE =
  'Candid documentary photograph, soft natural window light, cream plaster walls, oak and linen materials, muted sage-green and terracotta accents, gentle film grain, Kodak Portra 400 color, 35mm lens, shallow depth of field, calm and warm, no text, no logos.';

export const SHOTS = [
  { id: 1, slot: 'hero', aspect: '3:4', prompt: 'Sunlit early-learning classroom, two toddlers seen from behind at a low oak table stacking natural wooden blocks, a teacher\'s hands helping, tall arched window' },
  { id: 2, slot: 'day-arrival', aspect: '3:2', prompt: 'Parent kneeling to hug a preschooler goodbye at a classroom cubby with name labels, morning light, seen from the side' },
  { id: 3, slot: 'day-circle', aspect: '3:2', prompt: 'Small group of preschoolers sitting on a round woven rug seen from behind, a smiling teacher with a guitar facing them' },
  { id: 4, slot: 'day-outdoors', aspect: '3:2', prompt: 'Children in rain boots at a wooden mud kitchen under a large pecan tree in a garden yard, seen from behind' },
  { id: 5, slot: 'day-lunch', aspect: '3:2', prompt: 'Long low oak table set family style, small hands pouring water from a little glass pitcher, bowls of soup and warm tortillas' },
  { id: 6, slot: 'day-rest', aspect: '3:2', prompt: 'Quiet nap room with low cots and linen sheets, curtains drawn, warm dim light, a teacher reading softly in a chair' },
  { id: 7, slot: 'day-studio', aspect: '3:2', prompt: 'Child\'s hands painting with watercolor at an easel in a bright art studio, jars of brushes, paint palette' },
  { id: 8, slot: 'day-pickup', aspect: '3:2', prompt: 'Golden-hour light, a parent and toddler walking hand in hand away from a cream building with an arched blue door' },
  { id: 9, slot: 'program-infants', aspect: '4:3', prompt: 'Teacher in her forties gently holding a baby during floor play on a sage mat beside a wooden mirror, soft light' },
  { id: 10, slot: 'safety', aspect: '4:3', prompt: 'Calm teacher checking a photo-ID pickup list on a tablet at a bright entry with a blue door, parent in soft focus' },
  { id: 11, slot: 'portal-photo', aspect: '1:1', prompt: 'Toddler\'s hands holding a small watering can over a raised garden bed, water droplets catching the light' },
  { id: 12, slot: 'gallery', aspect: '16:9', prompt: 'Wide view of a light-filled classroom with low shelves of natural materials and plants, children at play in soft focus' },
];

const body = (s) => ({ prompt: `${s.prompt}. ${STYLE}`, aspect_ratio: s.aspect, resolution: '2K' });
const call = async (method, path, data) => {
  const r = await fetch(API + path, { method, headers: { 'Content-Type': 'application/json', ...auth }, body: data ? JSON.stringify(data) : undefined });
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${text.slice(0, 300)}`);
  return json;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const [mode = 'estimate', only] = process.argv.slice(2);
const pick = only ? SHOTS.filter((s) => only.split(',').map(Number).includes(s.id)) : SHOTS;

if (mode === 'estimate') {
  let total = 0;
  for (const s of pick) {
    const e = await call('POST', `/estimate/${MODEL}`, body(s));
    total += Number(e.usd ?? 0);
    console.log(`#${s.id} ${s.slot.padEnd(16)} $${e.usd}`);
  }
  console.log(`Total for ${pick.length} shot(s) on ${MODEL}: $${total.toFixed(3)}`);
} else {
  mkdirSync(OUT, { recursive: true });
  const jobs = [];
  for (const s of pick) {
    const r = await call('POST', `/${MODEL}`, body(s));
    const id = r.request_id ?? r.id;
    console.log(`#${s.id} submitted → ${id}`);
    jobs.push({ s, id });
  }
  for (const { s, id } of jobs) {
    for (let i = 0; i < 90; i++) {
      const st = await call('GET', `/requests/${id}/status`);
      const status = String(st.status ?? '').toLowerCase();
      if (['completed', 'succeeded', 'success'].includes(status)) {
        const url = st.images?.[0]?.url ?? st.output?.images?.[0]?.url ?? st.result?.images?.[0]?.url;
        if (!url) { console.log(`#${s.id} completed but no image URL: ${JSON.stringify(st).slice(0, 300)}`); break; }
        const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
        const ext = url.split('?')[0].split('.').pop() || 'png';
        const file = `${OUT}/${String(s.id).padStart(2, '0')}-${s.slot}.${ext}`;
        writeFileSync(file, buf);
        console.log(`#${s.id} saved ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
        break;
      }
      if (['failed', 'error', 'nsfw', 'canceled', 'cancelled'].includes(status)) { console.log(`#${s.id} ${status}: ${JSON.stringify(st).slice(0, 300)}`); break; }
      await sleep(4000);
    }
  }
  if (!existsSync(OUT)) process.exit(1);
}
