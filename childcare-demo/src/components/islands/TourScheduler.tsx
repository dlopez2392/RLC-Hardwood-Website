import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Lang } from '@/i18n';
import { PROGRAMS, type ProgramId } from '@/data/programs';
import { SITE } from '@/data/site';
import { TOUR_TIMES, fmtTime, isoDay, parseIsoDay, spotsLeft, upcomingTourDays, type TourTime } from '@/lib/tour';

const T = {
  en: {
    s1: 'Pick a day', s2: 'Pick a time', s3: 'Who’s coming?', full: 'Full', left: (n: number) => (n === 1 ? '1 spot left' : `${n} spots left`),
    type: 'Tour type', inPerson: 'In person', virtual: 'Video call', name: 'Your name', email: 'Email', program: 'Interested in',
    kid: 'Bring your child? They’re welcome.', confirm: 'Confirm tour', choose: 'Choose a day and time first',
    required: 'Please enter your name and a valid email.',
    doneTitle: 'You’re booked.', doneLede: (d: string) => `We’ll see you ${d}. A confirmation would be emailed in production.`,
    ics: 'Add to calendar', change: 'Change booking', expect: 'What to expect',
    exp: ['Park in the covered drop-off lane; we will meet you at the blue door.', 'You will see two classrooms in full swing and the garden yard.', 'Elena walks through tuition, the waitlist and your questions: about 45 minutes.'],
    demo: 'Demo only: no booking was made and nothing left your browser.', summary: 'Your selection',
    days: 'Available days', times: 'Available times',
  },
  es: {
    s1: 'Elija un día', s2: 'Elija una hora', s3: '¿Quién viene?', full: 'Lleno', left: (n: number) => (n === 1 ? 'Queda 1 lugar' : `Quedan ${n} lugares`),
    type: 'Tipo de visita', inPerson: 'En persona', virtual: 'Videollamada', name: 'Su nombre', email: 'Correo electrónico', program: 'Le interesa',
    kid: '¿Viene con su hijo? Es bienvenido.', confirm: 'Confirmar visita', choose: 'Primero elija día y hora',
    required: 'Por favor escriba su nombre y un correo válido.',
    doneTitle: 'Su visita está agendada.', doneLede: (d: string) => `Lo esperamos el ${d}. En producción le llegaría una confirmación por correo.`,
    ics: 'Agregar al calendario', change: 'Cambiar la cita', expect: 'Qué esperar',
    exp: ['Estaciónese en el carril techado; lo recibimos en la puerta azul.', 'Verá dos salones en plena actividad y el jardín.', 'Elena le explica la colegiatura, la lista de espera y responde sus preguntas: unos 45 minutos.'],
    demo: 'Solo demostración: no se hizo ninguna cita y nada salió de su navegador.', summary: 'Su selección',
    days: 'Días disponibles', times: 'Horarios disponibles',
  },
};

function ics(date: Date, time: TourTime, virtual: boolean, lang: Lang) {
  const [h, m] = time.split(':').map(Number) as [number, number];
  const pad = (n: number) => String(n).padStart(2, '0');
  const d = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const start = `${d}T${pad(h)}${pad(m)}00`, end = `${d}T${pad(h + (m + 45 >= 60 ? 1 : 0))}${pad((m + 45) % 60)}00`;
  const title = lang === 'en' ? 'Tour: Sunroom Early Learning Studio (demo)' : 'Visita: Sunroom Early Learning Studio (demo)';
  const loc = virtual ? 'Video call' : `${SITE.street}, ${SITE.city}, ${SITE.region} ${SITE.postal}`;
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sunroom demo//EN', 'BEGIN:VEVENT', `UID:${Date.now()}@sunroom-demo`, `DTSTAMP:${d}T000000Z`,
    `DTSTART;TZID=America/Chicago:${start}`, `DTEND;TZID=America/Chicago:${end}`, `SUMMARY:${title}`, `LOCATION:${loc}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}

export default function TourScheduler({ lang }: { lang: Lang }) {
  const t = T[lang];
  const locale = lang === 'en' ? 'en-US' : 'es-US';
  // initial render (incl. static HTML) shows real days so the layout never jumps
  const [days, setDays] = useState<Date[]>(() => upcomingTourDays(new Date(), 10));
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<TourTime | null>(null);
  const [virtual, setVirtual] = useState(false);
  const [program, setProgram] = useState<ProgramId>('toddlers');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [booked, setBooked] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = upcomingTourDays(new Date(), 10);
    setDays(list);
    const q = new URLSearchParams(location.search);
    const p = q.get('program') as ProgramId | null;
    if (p && PROGRAMS.some((x) => x.id === p)) setProgram(p);
    const qd = q.get('date'), qt = q.get('time') as TourTime | null;
    if (qd && list.some((d) => isoDay(d) === qd)) setDate(qd);
    if (qt && (TOUR_TIMES as readonly string[]).includes(qt)) setTime(qt);
  }, []);
  useEffect(() => { if (booked) doneRef.current?.focus(); }, [booked]);

  const dateObj = date ? parseIsoDay(date) : null;
  const longDate = dateObj ? new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }).format(dateObj) : '';
  const icsHref = useMemo(() => (dateObj && time ? `data:text/calendar;charset=utf-8,${encodeURIComponent(ics(dateObj, time, virtual, lang))}` : ''), [date, time, virtual]);

  const submit = (e: Event) => {
    e.preventDefault();
    if (!date || !time) { setError(t.choose); return; }
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t.required); return; }
    setError('');
    setBooked(true);
  };

  if (booked && dateObj && time) {
    return (
      <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="on-dark grain overflow-hidden rounded-[1.75rem] bg-[var(--color-ink)] p-8 text-[var(--color-cream)] sm:p-10">
          <div class="relative z-[2]">
            <p class="eyebrow">{virtual ? t.virtual : t.inPerson}</p>
            <h3 ref={doneRef} tabIndex={-1} class="mt-3 text-[2.5rem] outline-none">{t.doneTitle}</h3>
            <p class="mt-3 font-display text-[1.5rem] text-[var(--color-apricot)]" style="font-style:italic">{longDate} · {fmtTime(time, lang)}</p>
            <p class="mt-4 text-[#e6ddcd]">{t.doneLede(longDate)}</p>
            <div class="mt-7 flex flex-wrap gap-3">
              <a class="btn bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-white" href={icsHref} download="sunroom-tour.ics">{t.ics}</a>
              <button type="button" class="btn btn-ghost" onClick={() => setBooked(false)}>{t.change}</button>
            </div>
            <p class="mt-6 text-[0.8125rem] text-[#d9cfbf]">{t.demo}</p>
          </div>
        </div>
        <div class="paper p-8">
          <h3 class="text-[1.75rem]">{t.expect}</h3>
          <ol class="mt-5 space-y-4">
            {t.exp.map((x, i) => <li key={i} class="flex gap-4"><span class="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-sage-soft)] font-bold" aria-hidden="true">{i + 1}</span><span>{x}</span></li>)}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start [&>*]:min-w-0">
      <div class="space-y-6">
        <fieldset class="paper p-5 sm:p-7">
          <legend class="float-left mb-4 flex w-full items-center gap-3 font-display text-[1.5rem]" style="font-weight:450">
            <span class="grid size-8 place-items-center rounded-full bg-[var(--color-ink)] font-sans text-sm font-bold text-[var(--color-cream)]" aria-hidden="true">1</span>{t.s1}
          </legend>
          <div class="scroll-x clear-both -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="radiogroup" aria-label={t.days}>
            {days.map((d) => {
              const id = isoDay(d);
              const open = TOUR_TIMES.some((tm) => spotsLeft(d, tm) > 0);
              const sel = date === id;
              return (
                <label key={id} class={`relative shrink-0 ${open ? 'cursor-pointer' : 'cursor-not-allowed opacity-45'}`}>
                  <input type="radio" name="tour-date" value={id} disabled={!open} checked={sel} class="peer sr-only"
                    onChange={() => { setDate(id); setTime(null); requestAnimationFrame(() => timeRef.current?.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus()); }} />
                  <span class={`flex w-[4.75rem] flex-col items-center rounded-2xl border-[1.5px] py-3 transition peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-sun-ink)] ${sel ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]' : 'border-[rgb(31_58_51/.2)] bg-white hover:border-[var(--color-ink)]'}`}>
                    <span class="text-[0.75rem] font-bold uppercase tracking-[0.1em]">{new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d).replace('.', '')}</span>
                    <span class="font-display text-[1.75rem] leading-tight" style="font-weight:450">{d.getDate()}</span>
                    <span class="text-[0.75rem]">{new Intl.DateTimeFormat(locale, { month: 'short' }).format(d).replace('.', '')}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset class={`paper p-5 sm:p-7 transition-opacity ${date ? '' : 'opacity-55'}`} disabled={!date}>
          <legend class="float-left mb-4 flex w-full items-center gap-3 font-display text-[1.5rem]" style="font-weight:450">
            <span class="grid size-8 place-items-center rounded-full bg-[var(--color-ink)] font-sans text-sm font-bold text-[var(--color-cream)]" aria-hidden="true">2</span>{t.s2}
          </legend>
          <div ref={timeRef} class="clear-both grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={t.times}>
            {TOUR_TIMES.map((tm) => {
              const n = dateObj ? spotsLeft(dateObj, tm) : 3;
              const sel = time === tm;
              return (
                <label key={tm} class={`relative ${n ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                  <input type="radio" name="tour-time" value={tm} disabled={!n || !date} checked={sel} onChange={() => setTime(tm)} class="peer sr-only" />
                  <span class={`flex min-h-16 flex-col justify-center rounded-2xl border-[1.5px] px-4 py-2.5 transition peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-sun-ink)] ${sel ? 'border-[var(--color-sun-ink)] bg-[var(--color-sun-ink)] text-[var(--color-cream)]' : 'border-[rgb(31_58_51/.2)] bg-white hover:border-[var(--color-ink)]'}`}>
                    <span class="text-[1.125rem] font-bold">{fmtTime(tm, lang)}</span>
                    <span class="text-[0.8125rem]">{date ? (n ? t.left(n) : t.full) : '—'}</span>
                  </span>
                </label>
              );
            })}
          </div>
          <div class="mt-5" role="radiogroup" aria-labelledby="tour-type-label">
            <p id="tour-type-label" class="field-label">{t.type}</p>
            <div class="seg">
              <label><input type="radio" name="tour-type" checked={!virtual} onChange={() => setVirtual(false)} /><span>{t.inPerson}</span></label>
              <label><input type="radio" name="tour-type" checked={virtual} onChange={() => setVirtual(true)} /><span>{t.virtual}</span></label>
            </div>
          </div>
        </fieldset>
      </div>

      <fieldset class="paper p-5 sm:p-7 lg:sticky lg:top-28">
        <legend class="float-left mb-4 flex w-full items-center gap-3 font-display text-[1.5rem]" style="font-weight:450">
          <span class="grid size-8 place-items-center rounded-full bg-[var(--color-ink)] font-sans text-sm font-bold text-[var(--color-cream)]" aria-hidden="true">3</span>{t.s3}
        </legend>
        <div class="clear-both space-y-4">
          <div class="rounded-2xl bg-[var(--color-paper)] px-4 py-3" aria-live="polite">
            <p class="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">{t.summary}</p>
            <p class="font-semibold">{date && time ? `${longDate} · ${fmtTime(time, lang)}` : t.choose}</p>
          </div>
          <div><label class="field-label" for="tour-name">{t.name}</label><input id="tour-name" class="field-input" autoComplete="name" value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)} /></div>
          <div><label class="field-label" for="tour-email">{t.email}</label><input id="tour-email" type="email" class="field-input" autoComplete="email" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)} /></div>
          <div>
            <label class="field-label" for="tour-program">{t.program}</label>
            <select id="tour-program" class="field-input" value={program} onChange={(e) => setProgram((e.target as HTMLSelectElement).value as ProgramId)}>
              {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.room} · {p.name[lang]}</option>)}
            </select>
            <span class="field-hint">{t.kid}</span>
          </div>
          {error && <p role="alert" class="field-error">{error}</p>}
          <button type="submit" class="btn btn-primary w-full">{t.confirm}</button>
        </div>
      </fieldset>
    </form>
  );
}
