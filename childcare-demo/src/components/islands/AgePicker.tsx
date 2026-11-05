import { useEffect, useState } from 'preact/hooks';
import { fmtMoney, href, type Lang } from '@/i18n';
import { PROGRAMS, type ProgramId } from '@/data/programs';
import { fmtTime, isoDay, nextOpenSlot } from '@/lib/tour';

const T = {
  en: {
    q: 'How old is your child?',
    hint: 'Choose one. We will show you their room, their teachers’ ratio, tuition and the next open tour.',
    options: { infants: 'Under 1', toddlers: '1 year old', preschool: '2 or 3', prek: '4 or 5', schoolage: '5 to 10' } as Record<ProgramId, string>,
    room: 'Their room',
    ratio: 'Teacher ratio',
    ratioVal: (n: number, min: number) => `1 : ${n}  ·  Texas allows 1 : ${min}`,
    from: 'Tuition from',
    perMo: '/month, full-time',
    tour: 'Next open tour',
    see: 'See their day',
    book: 'Book this tour',
    sample: 'Sample rate',
  },
  es: {
    q: '¿Qué edad tiene su hijo?',
    hint: 'Elija una opción. Le mostraremos su salón, la proporción de maestros, la colegiatura y la próxima visita disponible.',
    options: { infants: 'Menos de 1', toddlers: '1 año', preschool: '2 o 3', prek: '4 o 5', schoolage: '5 a 10' } as Record<ProgramId, string>,
    room: 'Su salón',
    ratio: 'Proporción',
    ratioVal: (n: number, min: number) => `1 : ${n}  ·  Texas permite 1 : ${min}`,
    from: 'Colegiatura desde',
    perMo: '/mes, tiempo completo',
    tour: 'Próxima visita disponible',
    see: 'Vea su día',
    book: 'Agende esta visita',
    sample: 'Tarifa de muestra',
  },
};

const KEY = 'sunroom:age';

export default function AgePicker({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [sel, setSel] = useState<ProgramId | null>('preschool');
  const [slot, setSlot] = useState<ReturnType<typeof nextOpenSlot>>(null);

  useEffect(() => {
    setSlot(nextOpenSlot());
    try { const v = localStorage.getItem(KEY) as ProgramId | null; if (v && PROGRAMS.some((p) => p.id === v)) setSel(v); } catch { /* storage unavailable */ }
  }, []);
  const choose = (id: ProgramId) => {
    setSel(id);
    try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  };
  const p = PROGRAMS.find((x) => x.id === sel);
  const slotText = slot
    ? `${new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(slot.date)} · ${fmtTime(slot.time, lang)}`
    : '';
  const tourHref = p && slot ? `${href('tour', lang)}?program=${p.id}&date=${isoDay(slot.date)}&time=${slot.time}` : href('tour', lang);

  return (
    <div class="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
      <fieldset>
        <legend class="font-display text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05]" style="font-weight:420">{t.q}</legend>
        <p class="mt-3 max-w-md text-[var(--color-ink-soft)]">{t.hint}</p>
        <div class="mt-6 flex flex-wrap gap-2">
          {PROGRAMS.map((x) => (
            <label key={x.id} class="age-chip">
              <input type="radio" name="age" value={x.id} checked={sel === x.id} onChange={() => choose(x.id)} class="peer sr-only" />
              <span class="inline-flex min-h-12 cursor-pointer items-center rounded-full border-[1.5px] border-[var(--color-ink)] px-4 text-[1rem] font-semibold transition peer-checked:border-[var(--color-sun-ink)] peer-checked:bg-[var(--color-sun-ink)] peer-checked:text-[var(--color-cream)] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[var(--color-sun-ink)] hover:bg-[var(--color-paper)] peer-checked:hover:bg-[var(--color-sun-deep)]">
                {t.options[x.id]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" class="min-h-[15rem]">
        {p ? (
          <div class="paper grid gap-5 p-6 sm:grid-cols-2 sm:p-7" style={{ background: p.tone.bg }}>
            <div class="sm:col-span-2 flex flex-wrap items-baseline justify-between gap-2">
              <p class="font-display text-[2rem] leading-none" style="font-weight:450">
                {p.room} <span class="text-[1.125rem] font-sans font-semibold">· {p.name[lang]}</span>
              </p>
              <p class="text-[0.9375rem] font-semibold">{p.ages[lang]}</p>
            </div>
            <dl class="contents">
              <div>
                <dt class="text-[0.8125rem] font-bold uppercase tracking-[0.1em]">{t.ratio}</dt>
                <dd class="mt-1 text-[1.0625rem] font-semibold">{t.ratioVal(p.ratio, p.texasMin)}</dd>
              </div>
              <div>
                <dt class="text-[0.8125rem] font-bold uppercase tracking-[0.1em]">{t.from}</dt>
                <dd class="mt-1 text-[1.0625rem] font-semibold">
                  {fmtMoney(Math.round(p.monthly * 0.48), lang)}–{fmtMoney(p.monthly, lang)}
                  <span class="block text-[0.8125rem] font-normal">{t.perMo} · <span class="sample-badge !py-0">{t.sample}</span></span>
                </dd>
              </div>
              {slotText && (
                <div class="sm:col-span-2">
                  <dt class="text-[0.8125rem] font-bold uppercase tracking-[0.1em]">{t.tour}</dt>
                  <dd class="mt-1 text-[1.0625rem] font-semibold">{slotText}</dd>
                </div>
              )}
            </dl>
            <div class="flex flex-wrap gap-2.5 sm:col-span-2">
              <a href={tourHref} class="btn btn-ink">{t.book}</a>
              <a href={href('programs', lang, p.id)} class="btn btn-ghost">{t.see}</a>
            </div>
          </div>
        ) : (
          <div class="grid h-full min-h-[15rem] place-items-center rounded-[var(--radius-paper)] border-2 border-dashed border-[rgb(31_58_51/.2)] p-8 text-center">
            <p class="max-w-xs font-display text-[1.5rem] leading-snug text-[var(--color-ink-soft)]" style="font-style:italic">
              {lang === 'en' ? 'Their room, ratio, tuition and next tour will appear here.' : 'Aquí aparecerán su salón, la proporción, la colegiatura y la próxima visita.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
