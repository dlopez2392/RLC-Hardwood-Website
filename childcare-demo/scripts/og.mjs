// Generates 1200×630 Open Graph cards for every page and language into public/og/.
// Requires the brand fonts installed for librsvg (see README › Open Graph images).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
mkdirSync('public/og', { recursive: true });
const pages = {
  home: { en: ['Where the whole day', 'is the curriculum.'], es: ['Aquí, cada momento', 'del día enseña.'] },
  programs: { en: ['Five rooms,', 'one philosophy.'], es: ['Cinco salones,', 'una filosofía.'] },
  day: { en: ['Seven o’clock to six.', 'Scroll slowly.'], es: ['De las siete a las seis.', 'Avance despacio.'] },
  teachers: { en: ['The people your child', 'will talk about at dinner.'], es: ['Las personas de las que', 'su hijo hablará en la cena.'] },
  safety: { en: ['Safety is a list of', 'specific things we do.'], es: ['La seguridad es una lista', 'de cosas concretas.'] },
  tuition: { en: ['Tuition,', 'up front.'], es: ['La colegiatura,', 'desde el principio.'] },
  tour: { en: ['Book a tour', 'in three taps.'], es: ['Agende una visita', 'en tres pasos.'] },
  portal: { en: ['You already know', 'how the day went.'], es: ['Usted ya sabe', 'cómo le fue en el día.'] },
  faq: { en: ['Questions parents', 'actually ask.'], es: ['Las preguntas que', 'de verdad hacen.'] },
  contact: { en: ['Come say', 'hello.'], es: ['Venga a', 'saludarnos.'] },
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sub = { en: 'Bilingual early learning · San Antonio, TX', es: 'Aprendizaje temprano bilingüe · San Antonio, TX' };
const demo = { en: 'Fictional portfolio demo', es: 'Demo ficticio de portafolio' };
for (const [key, langs] of Object.entries(pages)) {
  for (const lang of ['en', 'es']) {
    const [l1, l2] = langs[lang];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FBF6EE"/>
  <defs><clipPath id="a"><path d="M790 630V330c0-120 92-210 205-210s205 90 205 210v300Z"/></clipPath>
  <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6C49A"/><stop offset="1" stop-color="#FBF6EE"/></linearGradient></defs>
  <g clip-path="url(#a)"><rect x="780" y="100" width="440" height="540" fill="url(#s)"/>
    <circle cx="1000" cy="330" r="62" fill="#E2683C"/>
    <path d="M770 520c80-50 170-56 250-26s130 20 200-14v160H770Z" fill="#A9B99A"/>
    <path d="M770 560c100-34 190-30 270-8s120 10 180-6v90H770Z" fill="#6F8A64"/></g>
  <path d="M790 630V330c0-120 92-210 205-210s205 90 205 210v300" fill="none" stroke="#1F3A33" stroke-width="6"/>
  <g transform="translate(80 88)"><path d="M8 44V22C8 12.6 15.2 5 24 5s16 7.6 16 17v22Z" fill="#FBF6EE" stroke="#1F3A33" stroke-width="2.6"/>
    <path d="M15 34a9 9 0 0 1 18 0Z" fill="#E2683C"/><path d="M8 34h32" stroke="#1F3A33" stroke-width="2.6"/></g>
  <text x="138" y="122" font-family="Fraunces" font-size="34" fill="#1F3A33">Sunroom</text>
  <text x="80" y="300" font-family="Fraunces" font-size="68" fill="#1F3A33">${esc(l1)}</text>
  <text x="80" y="380" font-family="Fraunces" font-style="italic" font-size="68" fill="#A8431D">${esc(l2)}</text>
  <text x="80" y="470" font-family="Instrument Sans" font-weight="600" font-size="26" fill="#4A5C55">${esc(sub[lang])}</text>
  <rect x="80" y="520" width="${demo[lang].length * 9.6 + 40}" height="40" rx="20" fill="none" stroke="#1F3A33" stroke-dasharray="4 4"/>
  <text x="100" y="547" font-family="Instrument Sans" font-weight="700" font-size="18" fill="#1F3A33">${esc(demo[lang])}</text>
</svg>`;
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true, colors: 128 }).toFile(`public/og/${key}-${lang}.png`);
  }
}
console.log('OG images written to public/og/');
