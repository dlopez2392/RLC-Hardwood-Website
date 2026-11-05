import { useRef, useState } from 'preact/hooks';
import type { Lang } from '@/i18n';

const T = {
  en: { title: 'Send us a note', name: 'Your name', email: 'Email', topic: 'Topic', topics: ['General question', 'Tours', 'Tuition & billing', 'Careers'], msg: 'Message', send: 'Send message',
    req: 'Please fill in your name, a valid email and a message.', done: 'Thank you. We’ll reply within one business day.', demo: 'Demo only: nothing was sent.' },
  es: { title: 'Escríbanos', name: 'Su nombre', email: 'Correo electrónico', topic: 'Tema', topics: ['Pregunta general', 'Visitas', 'Colegiatura y pagos', 'Empleo'], msg: 'Mensaje', send: 'Enviar mensaje',
    req: 'Por favor escriba su nombre, un correo válido y un mensaje.', done: 'Gracias. Le responderemos en menos de un día hábil.', demo: 'Solo demostración: no se envió nada.' },
};

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [v, setV] = useState({ name: '', email: '', topic: t.topics[0]!, msg: '' });
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const set = (k: keyof typeof v) => (e: Event) => setV((x) => ({ ...x, [k]: (e.target as HTMLInputElement).value }));
  const submit = (e: Event) => {
    e.preventDefault();
    if (!v.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) || !v.msg.trim()) { setErr(t.req); return; }
    setErr(''); setSent(true); requestAnimationFrame(() => doneRef.current?.focus());
  };
  if (sent) return (
    <div class="paper p-8 text-center"><p ref={doneRef} tabIndex={-1} class="font-display text-[1.75rem] outline-none">{t.done}</p><p class="mt-3 text-[0.875rem] text-[var(--color-ink-soft)]">{t.demo}</p></div>
  );
  return (
    <form noValidate onSubmit={submit} data-fab-avoid class="paper space-y-5 p-6 sm:p-9">
      <h2 class="text-[2rem]">{t.title}</h2>
      <div class="grid gap-5 sm:grid-cols-2">
        <div><label class="field-label" for="c-name">{t.name}</label><input id="c-name" class="field-input" autoComplete="name" value={v.name} onInput={set('name')} aria-invalid={err && !v.name.trim() ? 'true' : undefined} /></div>
        <div><label class="field-label" for="c-email">{t.email}</label><input id="c-email" type="email" class="field-input" autoComplete="email" value={v.email} onInput={set('email')} aria-invalid={err && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) ? 'true' : undefined} /></div>
      </div>
      <div><label class="field-label" for="c-topic">{t.topic}</label><select id="c-topic" class="field-input" value={v.topic} onChange={set('topic')}>{t.topics.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div><label class="field-label" for="c-msg">{t.msg}</label><textarea id="c-msg" rows={5} class="field-input" value={v.msg} onInput={set('msg')} aria-invalid={err && !v.msg.trim() ? 'true' : undefined} /></div>
      {err && <p role="alert" class="field-error">{err}</p>}
      <button type="submit" class="btn btn-primary">{t.send}</button>
    </form>
  );
}
