import { FAQ, type FaqItem } from '@/data/faq';
import { href, ui } from '@/i18n';
import type { AssistantProvider, AskContext, Chunk } from './types';

/* ── Text normalisation ─────────────────────────────────────────── */
const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set(
  fold('a an the is are do does did you your i my me we our of to in on for at and or with what how when where who can will be it ' +
    'el la los las un una es son de del en y o con que como cuando donde quien puedo puede mi mis su sus se por para lo al hay me nos ' +
    'kid kids child children son daughter baby going get take tell know need want have has had hijo hija hijos niño niña bebe quiero necesito saber tiene tengo tienen ir va hacer si esta este esto').split(' '),
);
/** Light stemming that works acceptably for both English and Spanish. */
const stem = (w: string) => w.replace(/(ies|es|s)$/u, (m) => (w.length > 4 ? (m === 'ies' ? 'y' : '') : m));
export const tokens = (s: string) =>
  fold(s).replace(/[^a-z0-9ñ\s-]/g, ' ').split(/[\s-]+/).filter((w) => w.length > 1 && !STOP.has(w)).map(stem);

/** Synonyms bridge everyday parent phrasing to FAQ vocabulary. */
const SYN: Record<string, string[]> = {
  cost: ['tuition', 'price'], price: ['tuition'], expensive: ['tuition'], pay: ['tuition'], money: ['tuition'], much: ['tuition'], afford: ['tuition'],
  cuanto: ['colegiatura'], cobran: ['colegiatura'],
  park: ['parking'], parking: ['location'], estacionan: ['estacionamiento'], estacionar: ['estacionamiento'], estaciono: ['estacionamiento'], address: ['location'],
  sleep: ['nap'], dormir: ['siesta'], kid: ['child'], son: ['child'], daughter: ['child'], hijo: ['niño'], hija: ['niño'],
  costo: ['colegiatura'], precio: ['colegiatura'], cuesta: ['colegiatura'], pagar: ['colegiatura'],
  sick: ['illness', 'fever'], fever: ['illness'], enfermo: ['enfermedad', 'fiebre'], fiebre: ['enfermedad'],
  baby: ['infant'], babies: ['infant'], bebe: ['infant'], toddler: ['ratio', 'age'],
  safe: ['security'], seguro: ['seguridad'], nap: ['sleep'], siesta: ['dormir'],
  open: ['hours'], close: ['hours'], abren: ['horario'], cierran: ['horario'],
  food: ['meals'], eat: ['meals'], comer: ['comida'], lunch: ['meals'],
  visit: ['tour'], conocer: ['visita'], enroll: ['waitlist'], inscribir: ['inscripcion'],
};
const expand = (ts: string[]) => ts.flatMap((t) => [t, ...(SYN[t] ?? []).map(stem)]);

/* ── BM25-lite index over question, keywords and answer ─────────── */
interface Doc { item: FaqItem; tf: Map<string, number>; len: number }
const FIELD_WEIGHT = { q: 3, keywords: 2.5, a: 1 } as const;
const docs: Doc[] = FAQ.map((item) => {
  const tf = new Map<string, number>();
  const add = (text: string, w: number) => tokens(text).forEach((t) => tf.set(t, (tf.get(t) ?? 0) + w));
  add(`${item.q.en} ${item.q.es}`, FIELD_WEIGHT.q);
  add(item.keywords.join(' '), FIELD_WEIGHT.keywords);
  add(`${item.a.en} ${item.a.es}`, FIELD_WEIGHT.a);
  const len = [...tf.values()].reduce((s, v) => s + v, 0);
  return { item, tf, len };
});
const avgLen = docs.reduce((s, d) => s + d.len, 0) / docs.length;
const df = new Map<string, number>();
docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));
const idf = (t: string) => Math.log(1 + (docs.length - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));

export function search(question: string) {
  const original = tokens(question);
  const q = expand(original);
  const k1 = 1.4, b = 0.7;
  return docs
    .map((d) => {
      let score = 0;
      for (const t of q) {
        const f = d.tf.get(t);
        if (!f) continue;
        score += idf(t) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
      }
      // coverage: share of the parent's own words this answer actually addresses
      const hit = original.filter((t) => d.tf.has(t) || (SYN[t] ?? []).some((s) => d.tf.has(stem(s)))).length;
      return { item: d.item, score, coverage: original.length ? hit / original.length : 0 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/* ── Small talk ─────────────────────────────────────────────────── */
const GREET = /^(hi|hello|hey|hola|buenas|buenos dias|buenas tardes)\b/;
const THANKS = /\b(thanks|thank you|gracias|thx)\b/;

const COPY = {
  en: {
    greet: 'Hello! I can answer questions about hours, ratios, tuition, meals, naps, safety and more. What would you like to know?',
    thanks: 'You’re very welcome. Anything else I can help with?',
    unsure: 'I don’t have a confident answer to that one, and I’d rather not guess. Our director, Elena, answers every question personally on a tour or by phone.',
    alsoAsked: 'Families also ask:',
  },
  es: {
    greet: '¡Hola! Puedo responder preguntas sobre horario, proporción de maestros, colegiatura, comidas, siestas, seguridad y más. ¿Qué le gustaría saber?',
    thanks: 'Con mucho gusto. ¿Le ayudo con algo más?',
    unsure: 'No tengo una respuesta segura para eso, y prefiero no adivinar. Nuestra directora, Elena, responde cada pregunta en persona durante una visita o por teléfono.',
    alsoAsked: 'Otras familias preguntan:',
  },
};

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((res, rej) => {
    const id = setTimeout(res, ms);
    signal?.addEventListener('abort', () => { clearTimeout(id); rej(new DOMException('aborted', 'AbortError')); });
  });

/** Streams text word-by-word so the local engine feels like the eventual LLM. */
async function* stream(text: string, ctx: AskContext): AsyncGenerator<Chunk> {
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { yield { type: 'text', text }; return; }
  const parts = text.split(/(\s+)/);
  for (let i = 0; i < parts.length; i += 2) {
    yield { type: 'text', text: parts[i]! + (parts[i + 1] ?? '') };
    await sleep(14 + Math.random() * 22, ctx.signal);
  }
}

export const localFaqProvider: AssistantProvider = {
  id: 'local-faq',
  async *ask(question, ctx) {
    const { lang } = ctx;
    const c = COPY[lang];
    const f = fold(question.trim());
    await sleep(350, ctx.signal); // a beat of "thinking"
    if (GREET.test(f) && f.split(' ').length <= 3) { yield* stream(c.greet, ctx); return; }
    if (THANKS.test(f) && f.split(' ').length <= 4) { yield* stream(c.thanks, ctx); return; }

    const results = search(question);
    // Weekend questions: the truthful answer is always "we're closed", whatever else matches.
    if (/\b(saturday|sunday|weekend|weekends|sabado|sabados|domingo|domingos|fin de semana|fines de semana)\b/.test(f)) {
      const hours = results.find((r) => r.item.id === 'hours') ?? { item: FAQ.find((x) => x.id === 'hours')!, score: 9, coverage: 1 };
      results.unshift(hours);
    }
    const top = results[0];
    // Decline rather than guess: low score, or the best answer ignores most of the question
    // (e.g. "can I bring a puppy to the tour" matches "tour" but nothing about pets).
    if (!top || top.score < 2.2 || top.coverage < 0.5) {
      yield* stream(c.unsure, ctx);
      yield { type: 'handoff' };
      yield { type: 'suggestions', items: FAQ.slice(0, 3).map((x) => x.q[lang]) };
      return;
    }
    yield* stream(top.item.a[lang], ctx);
    const nav = ui[lang].nav as Record<string, string>;
    const label = top.item.source === 'home' ? ui[lang].breadcrumbHome : top.item.source === 'tour' ? nav.tour! : nav[top.item.source] ?? '';
    yield { type: 'source', source: { label, href: href(top.item.source, lang) } };
    const related = results.slice(1, 3).filter((r) => r.score > 1.5).map((r) => r.item.q[lang]);
    if (related.length) yield { type: 'suggestions', items: related };
  },
};
