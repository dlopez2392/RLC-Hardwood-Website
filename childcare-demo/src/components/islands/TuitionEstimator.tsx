import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { fmtMoney, type Lang } from '@/i18n';
import { PROGRAMS, type ProgramId } from '@/data/programs';
import { TUITION } from '@/data/site';

type Days = 2 | 3 | 4 | 5;
interface Child { key: number; program: ProgramId; days: Days }

const T = {
  en: {
    child: (n: number) => `Child ${n}`,
    program: 'Program', days: 'Days per week', remove: 'Remove', add: 'Add a sibling',
    perMonth: 'Estimated monthly tuition', weekly: 'per week', annual: 'per year',
    breakdown: 'How we got there', discount: 'Sibling discount (10%)', fees: 'One-time & annual fees',
    reg: 'Registration (due only when a space is accepted)', materials: 'Annual materials fee (per child)',
    sample: 'Sample rates for a fictional center', join: 'Join the waitlist', tour: 'Book a tour',
    note: 'Discount applies to each additional child; the highest tuition is charged in full.',
    d: (n: number) => `${n} days`,
  },
  es: {
    child: (n: number) => `Niño ${n}`,
    program: 'Programa', days: 'Días por semana', remove: 'Quitar', add: 'Agregar un hermano',
    perMonth: 'Colegiatura mensual estimada', weekly: 'por semana', annual: 'por año',
    breakdown: 'Cómo se calcula', discount: 'Descuento de hermanos (10 %)', fees: 'Cuotas únicas y anuales',
    reg: 'Inscripción (solo al aceptar un lugar)', materials: 'Cuota anual de materiales (por niño)',
    sample: 'Tarifas de muestra de un centro ficticio', join: 'Únase a la lista de espera', tour: 'Agende una visita',
    note: 'El descuento aplica a cada hijo adicional; la colegiatura más alta se cobra completa.',
    d: (n: number) => `${n} días`,
  },
};

const monthlyFor = (c: Child) => Math.round(PROGRAMS.find((p) => p.id === c.program)!.monthly * TUITION.dayFactor[c.days]);

/** Smoothly counts to a number; jumps straight there with reduced motion. */
function useCountUp(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(value); from.current = value; return; }
    const start = performance.now(), a = from.current, dur = 550;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(a + (value - a) * e));
      if (t < 1) raf = requestAnimationFrame(tick); else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

export default function TuitionEstimator({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [kids, setKids] = useState<Child[]>([{ key: 1, program: 'toddlers', days: 5 }]);
  const nextKey = useRef(2);

  useEffect(() => {
    const p = new URLSearchParams(location.search).get('program') as ProgramId | null;
    if (p && PROGRAMS.some((x) => x.id === p)) setKids([{ key: 1, program: p, days: 5 }]);
  }, []);

  const calc = useMemo(() => {
    const lines = kids.map((k) => ({ k, amount: monthlyFor(k) }));
    const sorted = [...lines].sort((a, b) => b.amount - a.amount);
    const discount = sorted.slice(1).reduce((s, l) => s + Math.round(l.amount * TUITION.siblingDiscount), 0);
    const subtotal = lines.reduce((s, l) => s + l.amount, 0);
    const monthly = subtotal - discount;
    return { lines, discount, monthly, weekly: Math.round((monthly * 12) / TUITION.weeksPerYear), annual: monthly * 12 };
  }, [kids]);
  const shown = useCountUp(calc.monthly);
  // On small screens the total lives below the inputs; keep it visible in a sticky bar meanwhile.
  const inputsRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLElement>(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !inputsRef.current || !totalRef.current) return;
    let inputs = false, total = false;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.target === inputsRef.current) inputs = e.isIntersecting; else total = e.isIntersecting; });
      setShowBar(inputs && !total);
    });
    io.observe(inputsRef.current); io.observe(totalRef.current);
    return () => io.disconnect();
  }, []);

  const update = (key: number, patch: Partial<Child>) => setKids((ks) => ks.map((k) => (k.key === key ? { ...k, ...patch } : k)));
  const add = () => setKids((ks) => (ks.length >= 4 ? ks : [...ks, { key: nextKey.current++, program: 'preschool', days: 5 }]));
  const remove = (key: number) => setKids((ks) => ks.filter((k) => k.key !== key));

  return (
    <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div ref={inputsRef} class="space-y-4">
        {kids.map((k, i) => (
          <fieldset key={k.key} class="paper p-5 sm:p-6">
            <legend class="sr-only">{t.child(i + 1)}</legend>
            <div class="flex items-center justify-between gap-3">
              <p class="font-display text-[1.5rem]" style="font-weight:450" aria-hidden="true">{t.child(i + 1)}</p>
              {kids.length > 1 && (
                <button type="button" onClick={() => remove(k.key)} class="min-h-10 rounded-full px-3 text-[0.875rem] font-semibold underline underline-offset-4 hover:text-[var(--color-sun-ink)]">
                  {t.remove}<span class="sr-only"> {t.child(i + 1)}</span>
                </button>
              )}
            </div>
            <div class="mt-4 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <label class="field-label" for={`prog-${k.key}`}>{t.program}</label>
                <select id={`prog-${k.key}`} class="field-input" value={k.program} onChange={(e) => update(k.key, { program: (e.target as HTMLSelectElement).value as ProgramId })}>
                  {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.room} · {p.name[lang]}</option>)}
                </select>
              </div>
              <div role="radiogroup" aria-labelledby={`days-${k.key}`}>
                <p id={`days-${k.key}`} class="field-label">{t.days}</p>
                <div class="seg">
                  {([2, 3, 4, 5] as Days[]).map((d) => (
                    <label key={d}>
                      <input type="radio" name={`days-${k.key}`} value={d} checked={k.days === d} onChange={() => update(k.key, { days: d })} aria-label={t.d(d)} />
                      <span aria-hidden="true">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
        ))}
        {kids.length < 4 && (
          <button type="button" onClick={add} class="flex min-h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-paper)] border-2 border-dashed border-[rgb(31_58_51/.3)] font-bold transition hover:border-[var(--color-sun-ink)] hover:text-[var(--color-sun-ink)]">
            <span class="grid size-6 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-cream)]" aria-hidden="true">+</span>{t.add}
          </button>
        )}
      </div>

      <aside ref={totalRef} data-fab-avoid class="on-dark grain overflow-hidden rounded-[1.75rem] bg-[var(--color-ink)] text-[var(--color-cream)] lg:sticky lg:top-28" aria-labelledby="est-total-label">
        <div class="relative z-[2] p-6 sm:p-8">
          <p id="est-total-label" class="eyebrow">{t.perMonth}</p>
          <p class="mt-3 font-display text-[clamp(3rem,7vw,4.5rem)] leading-none tabular-nums" style="font-weight:420" aria-hidden="true">{fmtMoney(shown, lang)}</p>
          <p class="sr-only" aria-live="polite">{fmtMoney(calc.monthly, lang)}</p>
          <p class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[#e6ddcd]">
            <span><strong class="text-[var(--color-cream)]">{fmtMoney(calc.weekly, lang)}</strong> {t.weekly}</span>
            <span><strong class="text-[var(--color-cream)]">{fmtMoney(calc.annual, lang)}</strong> {t.annual}</span>
          </p>
          <span class="sample-badge mt-4">{t.sample}</span>

          <h3 class="mt-7 border-t border-[rgb(251_246_238/.15)] pt-5 font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[var(--color-apricot)]">{t.breakdown}</h3>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            {calc.lines.map(({ k, amount }, i) => {
              const p = PROGRAMS.find((x) => x.id === k.program)!;
              return (
                <li key={k.key} class="flex justify-between gap-4">
                  <span>{t.child(i + 1)}: {p.room}, {t.d(k.days)}</span><span class="tabular-nums">{fmtMoney(amount, lang)}</span>
                </li>
              );
            })}
            {calc.discount > 0 && (
              <li class="flex justify-between gap-4 text-[var(--color-apricot)]"><span>{t.discount}</span><span class="tabular-nums">−{fmtMoney(calc.discount, lang)}</span></li>
            )}
          </ul>
          {kids.length > 1 && <p class="mt-2 text-[0.8125rem] text-[#d9cfbf]">{t.note}</p>}
          <h3 class="mt-6 font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[var(--color-apricot)]">{t.fees}</h3>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            <li class="flex justify-between gap-4"><span>{t.reg}</span><span class="tabular-nums">{fmtMoney(TUITION.registrationFee, lang)}</span></li>
            <li class="flex justify-between gap-4"><span>{t.materials}</span><span class="tabular-nums">{fmtMoney(TUITION.annualMaterials * kids.length, lang)}</span></li>
          </ul>
          <div class="mt-7 flex flex-wrap gap-3">
            <a href="#waitlist" class="btn bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-white">{t.join}</a>
            <a href={lang === 'en' ? '/tour/' : '/es/visita/'} class="btn btn-ghost">{t.tour}</a>
          </div>
        </div>
      </aside>
      <a
        href="#est-total-label"
        aria-hidden={!showBar}
        tabIndex={showBar ? 0 : -1}
        class={`fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl bg-[var(--color-ink)] py-3 pr-20 pl-5 text-[var(--color-cream)] shadow-[0_18px_40px_-16px_rgb(31_58_51/.8)] transition-[transform,opacity] duration-300 lg:hidden ${showBar ? 'opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        <span class="text-[0.8125rem] font-semibold">{t.perMonth}</span>
        <span class="font-display text-[1.5rem] tabular-nums" style="font-weight:450">{fmtMoney(shown, lang)}</span>
      </a>
    </div>
  );
}
