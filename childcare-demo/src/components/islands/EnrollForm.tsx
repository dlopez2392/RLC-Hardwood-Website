import { useEffect, useRef, useState } from 'preact/hooks';
import type { Lang } from '@/i18n';
import { PROGRAMS, type ProgramId } from '@/data/programs';

const T = {
  en: {
    steps: ['Your child', 'Your family'], step: (n: number, of: number) => `Step ${n} of ${of}`,
    childName: 'Child’s first name', dob: 'Birth date or due date', dobHint: 'Expecting? Use your due date — many families join before birth.',
    start: 'Ideal start month', program: 'Program', auto: 'Suggested from age', days: 'Days per week',
    parent: 'Your name', email: 'Email', phone: 'Phone (optional)', langPref: 'Preferred language for updates', en: 'English', es: 'Spanish',
    notes: 'Anything we should know? (optional)', next: 'Continue', back: 'Back', submit: 'Join the waitlist',
    errTitle: 'Please fix the following:', required: 'This field is required.', emailBad: 'Enter an email like name@example.com.', dateBad: 'Enter a valid date.',
    doneTitle: 'You’re on the list.', done: (n: string) => `We’ll email ${n} within one business day with your place in line and a few times to tour.`,
    ref: 'Reference', demo: 'Demo only: nothing was sent or stored. In production this would go to the center’s CRM.', again: 'Add another child',
  },
  es: {
    steps: ['Su hijo', 'Su familia'], step: (n: number, of: number) => `Paso ${n} de ${of}`,
    childName: 'Nombre del niño', dob: 'Fecha de nacimiento o fecha probable de parto', dobHint: '¿Espera un bebé? Use la fecha probable de parto: muchas familias se inscriben antes del nacimiento.',
    start: 'Mes ideal para empezar', program: 'Programa', auto: 'Sugerido según la edad', days: 'Días por semana',
    parent: 'Su nombre', email: 'Correo electrónico', phone: 'Teléfono (opcional)', langPref: 'Idioma preferido para avisos', en: 'Inglés', es: 'Español',
    notes: '¿Algo que debamos saber? (opcional)', next: 'Continuar', back: 'Regresar', submit: 'Únase a la lista de espera',
    errTitle: 'Por favor corrija lo siguiente:', required: 'Este campo es obligatorio.', emailBad: 'Escriba un correo como nombre@ejemplo.com.', dateBad: 'Escriba una fecha válida.',
    doneTitle: 'Ya está en la lista.', done: (n: string) => `Le escribiremos a ${n} en menos de un día hábil con su lugar en la lista y algunos horarios para visitarnos.`,
    ref: 'Referencia', demo: 'Solo demostración: no se envió ni guardó nada. En producción esto llegaría al sistema del centro.', again: 'Agregar otro hijo',
  },
};

type Field = 'childName' | 'dob' | 'start' | 'parent' | 'email';
type Errors = Partial<Record<Field, string>>;

function suggest(dob: string): ProgramId | null {
  const d = new Date(dob + 'T12:00:00');
  if (isNaN(d.getTime())) return null;
  const months = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  if (months < 12) return 'infants';
  if (months < 24) return 'toddlers';
  if (months < 48) return 'preschool';
  if (months < 60) return 'prek';
  return 'schoolage';
}

export default function EnrollForm({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ childName: '', dob: '', start: '', program: 'toddlers' as ProgramId, days: '5', parent: '', email: '', phone: '', pref: lang, notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const touched = useRef(false);

  useEffect(() => { const s = suggest(v.dob); if (s) setV((x) => ({ ...x, program: s })); }, [v.dob]);
  useEffect(() => { if (touched.current) heading.current?.focus(); touched.current = true; }, [step, done]);

  const set = (k: keyof typeof v) => (e: Event) => {
    setV((x) => ({ ...x, [k]: (e.target as HTMLInputElement).value }));
    setErrors((er) => { if (!(k in er)) return er; const n = { ...er }; delete n[k as Field]; return n; });
  };

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!v.childName.trim()) e.childName = t.required;
      if (!v.dob) e.dob = t.required; else if (isNaN(new Date(v.dob).getTime())) e.dob = t.dateBad;
      if (!v.start) e.start = t.required;
    } else {
      if (!v.parent.trim()) e.parent = t.required;
      if (!v.email.trim()) e.email = t.required; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = t.emailBad;
    }
    return e;
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    if (step === 0) { setStep(1); return; }
    setDone(`SR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const labels: Record<Field, string> = { childName: t.childName, dob: t.dob, start: t.start, parent: t.parent, email: t.email };
  const err = (f: Field) => errors[f] ? (
    <p id={`${f}-err`} class="field-error"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#9f1f17" /><path d="M12 7v6M12 16.5v.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" /></svg>{errors[f]}</p>
  ) : null;
  const aria = (f: Field, hint?: string): { 'aria-invalid'?: boolean; 'aria-describedby'?: string } => ({
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': [errors[f] ? `${f}-err` : '', hint ?? ''].filter(Boolean).join(' ') || undefined,
  });

  if (done) {
    return (
      <div class="paper p-8 text-center sm:p-12">
        <div class="mx-auto grid size-16 place-items-center rounded-full bg-[var(--color-sage-soft)]" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#1F3A33" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </div>
        <h3 ref={heading} tabIndex={-1} class="mt-5 text-[2rem] outline-none">{t.doneTitle}</h3>
        <p class="mx-auto mt-3 max-w-md text-[var(--color-ink-soft)]">{t.done(v.email)}</p>
        <p class="mt-5 font-mono text-[1.125rem] font-bold">{t.ref}: {done}</p>
        <p class="mx-auto mt-5 max-w-md rounded-xl bg-[var(--color-paper)] px-4 py-3 text-[0.875rem]">{t.demo}</p>
        <button type="button" class="btn btn-ghost mt-6" onClick={() => { setDone(null); setStep(0); setV((x) => ({ ...x, childName: '', dob: '' })); }}>{t.again}</button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} data-fab-avoid class="paper p-6 sm:p-9">
      <div class="flex items-center gap-3" aria-hidden="true">
        {t.steps.map((s, i) => (
          <div key={s} class="flex flex-1 items-center gap-2">
            <span class={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${i <= step ? 'bg-[var(--color-ink)] text-[var(--color-cream)]' : 'bg-[var(--color-paper)]'}`}>{i + 1}</span>
            <span class="text-[0.9375rem] font-semibold">{s}</span>
            {i === 0 && <span class="h-[2px] flex-1 rounded bg-[var(--color-shadow)]"><span class="block h-full rounded bg-[var(--color-sun)] transition-all duration-500" style={{ width: step ? '100%' : '0%' }} /></span>}
          </div>
        ))}
      </div>
      <h3 ref={heading} tabIndex={-1} class="mt-6 text-[1.75rem] outline-none">
        <span class="sr-only">{t.step(step + 1, 2)}: </span>{t.steps[step]}
      </h3>

      {Object.keys(errors).length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" class="mt-5 rounded-2xl border-2 border-[#9f1f17] bg-[#fff8f7] p-4 outline-none">
          <p class="font-bold text-[#9f1f17]">{t.errTitle}</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            {(Object.keys(errors) as Field[]).map((f) => <li key={f}><a class="underline underline-offset-2" href={`#f-${f}`}>{labels[f]}: {errors[f]}</a></li>)}
          </ul>
        </div>
      )}

      {step === 0 ? (
        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label class="field-label" for="f-childName">{t.childName}</label>
            <input ref={firstField} id="f-childName" class="field-input" autoComplete="off" value={v.childName} onInput={set('childName')} {...aria('childName')} />
            {err('childName')}
          </div>
          <div>
            <label class="field-label" for="f-dob">{t.dob}</label>
            <input id="f-dob" type="date" class="field-input" value={v.dob} onInput={set('dob')} {...aria('dob', 'dob-hint')} />
            <span id="dob-hint" class="field-hint">{t.dobHint}</span>
            {err('dob')}
          </div>
          <div>
            <label class="field-label" for="f-start">{t.start}</label>
            <input id="f-start" type="month" class="field-input" value={v.start} onInput={set('start')} {...aria('start')} />
            {err('start')}
          </div>
          <div>
            <label class="field-label" for="f-program">{t.program}</label>
            <select id="f-program" class="field-input" value={v.program} onChange={set('program')} aria-describedby="prog-hint">
              {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.room} · {p.name[lang]}</option>)}
            </select>
            <span id="prog-hint" class="field-hint">{suggest(v.dob) ? `✓ ${t.auto}` : ' '}</span>
          </div>
          <div class="sm:col-span-2" role="radiogroup" aria-labelledby="f-days-label">
            <p id="f-days-label" class="field-label">{t.days}</p>
            <div class="seg">
              {['2', '3', '4', '5'].map((d) => (
                <label key={d}><input type="radio" name="f-days" value={d} checked={v.days === d} onChange={set('days')} /><span>{d}</span></label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label class="field-label" for="f-parent">{t.parent}</label>
            <input id="f-parent" class="field-input" autoComplete="name" value={v.parent} onInput={set('parent')} {...aria('parent')} />
            {err('parent')}
          </div>
          <div>
            <label class="field-label" for="f-email">{t.email}</label>
            <input id="f-email" type="email" class="field-input" autoComplete="email" value={v.email} onInput={set('email')} {...aria('email')} />
            {err('email')}
          </div>
          <div>
            <label class="field-label" for="f-phone">{t.phone}</label>
            <input id="f-phone" type="tel" class="field-input" autoComplete="tel" value={v.phone} onInput={set('phone')} />
          </div>
          <div role="radiogroup" aria-labelledby="f-pref-label">
            <p id="f-pref-label" class="field-label">{t.langPref}</p>
            <div class="seg">
              <label><input type="radio" name="f-pref" value="en" checked={v.pref === 'en'} onChange={set('pref')} /><span>{t.en}</span></label>
              <label><input type="radio" name="f-pref" value="es" checked={v.pref === 'es'} onChange={set('pref')} /><span>{t.es}</span></label>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label class="field-label" for="f-notes">{t.notes}</label>
            <textarea id="f-notes" rows={3} class="field-input" value={v.notes} onInput={set('notes')} />
          </div>
        </div>
      )}

      <div class="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step === 1 ? <button type="button" class="btn btn-ghost" onClick={() => { setErrors({}); setStep(0); }}>{t.back}</button> : <span />}
        <button type="submit" class="btn btn-primary">{step === 0 ? t.next : t.submit} <span aria-hidden="true">→</span></button>
      </div>
    </form>
  );
}
