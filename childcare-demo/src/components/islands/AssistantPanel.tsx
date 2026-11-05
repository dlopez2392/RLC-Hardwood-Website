import { useEffect, useRef, useState } from 'preact/hooks';
import { href, type Lang } from '@/i18n';
import { SITE } from '@/data/site';
import { getProvider, type Turn } from '@/lib/assistant';
import type { AssistantSource } from '@/lib/assistant/types';

const T = {
  en: {
    title: 'Ask Sunroom',
    sub: 'Answers from our family handbook',
    hello: 'Hi, I’m the Sunroom assistant. Ask me anything about hours, ratios, tuition, meals or our illness policy.',
    placeholder: 'Type a question…',
    send: 'Send',
    close: 'Close',
    from: 'From',
    thinking: 'Looking that up…',
    tour: 'Book a tour',
    call: 'Call',
    note: 'Demo assistant: answers come from a local FAQ and nothing you type leaves your browser.',
    starters: ['What are your hours?', 'What are your ratios?', 'How much is tuition?', 'What is your illness policy?'],
    you: 'You',
    bot: 'Sunroom',
  },
  es: {
    title: 'Pregúntele a Sunroom',
    sub: 'Respuestas de nuestro manual para familias',
    hello: 'Hola, soy el asistente de Sunroom. Pregúnteme lo que quiera sobre horario, proporción de maestros, colegiatura, comidas o la política de enfermedad.',
    placeholder: 'Escriba su pregunta…',
    send: 'Enviar',
    close: 'Cerrar',
    from: 'Fuente',
    thinking: 'Buscando la respuesta…',
    tour: 'Agende una visita',
    call: 'Llamar',
    note: 'Asistente de demostración: las respuestas vienen de preguntas frecuentes locales y nada de lo que escriba sale de su navegador.',
    starters: ['¿Cuál es su horario?', '¿Cuántos niños hay por maestro?', '¿Cuánto cuesta la colegiatura?', '¿Cuál es su política de enfermedad?'],
    you: 'Usted',
    bot: 'Sunroom',
  },
};

interface Msg extends Turn { id: number; source?: AssistantSource; suggestions?: string[]; handoff?: boolean; pending?: boolean }

export default function AssistantPanel({ lang, onClose, initialQuestion }: { lang: Lang; onClose: () => void; initialQuestion?: string }) {
  const t = T[lang];
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'assistant', text: t.hello, suggestions: t.starters }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [announce, setAnnounce] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);
  const nextId = useRef(1);

  useEffect(() => {
    inputRef.current?.focus();
    if (initialQuestion) void ask(initialQuestion);
    return () => abort.current?.abort();
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const patch = (id: number, fn: (m: Msg) => Msg) => setMsgs((ms) => ms.map((m) => (m.id === id ? fn(m) : m)));

  async function ask(q: string) {
    const question = q.trim();
    if (!question || busy) return;
    setBusy(true);
    setInput('');
    const history: Turn[] = msgs.map(({ role, text }) => ({ role, text }));
    const uid = nextId.current++;
    const aid = nextId.current++;
    setMsgs((ms) => [...ms, { id: uid, role: 'user', text: question }, { id: aid, role: 'assistant', text: '', pending: true }]);
    abort.current = new AbortController();
    let full = '';
    try {
      for await (const c of getProvider().ask(question, { lang, history, signal: abort.current.signal })) {
        if (c.type === 'text') { full += c.text; patch(aid, (m) => ({ ...m, text: m.text + c.text })); }
        else if (c.type === 'source') patch(aid, (m) => ({ ...m, source: c.source }));
        else if (c.type === 'suggestions') patch(aid, (m) => ({ ...m, suggestions: c.items }));
        else if (c.type === 'handoff') patch(aid, (m) => ({ ...m, handoff: true }));
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') patch(aid, (m) => ({ ...m, text: m.text || '…', handoff: true }));
    } finally {
      patch(aid, (m) => ({ ...m, pending: false }));
      setAnnounce(full);
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const last = msgs[msgs.length - 1];

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-title"
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
      class="assistant-panel fixed inset-x-2 bottom-20 z-50 flex max-h-[min(36rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-[1.5rem] border border-[rgb(31_58_51/.1)] bg-[#fffdf9] shadow-[0_30px_80px_-30px_rgb(31_58_51/.55)] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[25rem]"
    >
      <div class="flex items-start justify-between gap-3 bg-[var(--color-ink)] px-5 py-4 text-[var(--color-cream)]">
        <div>
          <h2 id="assistant-title" class="font-display text-xl" style="font-weight:450">{t.title}</h2>
          <p class="text-[0.8125rem] text-[#d9cfbf]">{t.sub}</p>
        </div>
        <button type="button" onClick={onClose} class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgb(251_246_238/.12)] hover:bg-[rgb(251_246_238/.22)]">
          <span class="sr-only">{t.close}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <p class="sr-only" aria-live="polite">{announce}</p>
      <div ref={logRef} role="log" aria-live="off" tabIndex={0} aria-label={t.title} class="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {msgs.map((m) => (
          <div key={m.id} class={m.role === 'user' ? 'flex justify-end' : 'flex flex-col items-start'}>
            <span class="sr-only">{m.role === 'user' ? t.you : t.bot}: </span>
            <div
              class={
                m.role === 'user'
                  ? 'max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-sun-ink)] px-4 py-2.5 text-[0.9375rem] text-[var(--color-cream)]'
                  : 'max-w-[92%] rounded-2xl rounded-bl-md bg-[var(--color-paper)] px-4 py-3 text-[0.9375rem] leading-relaxed'
              }
            >
              {m.pending && !m.text ? (
                <span class="inline-flex items-center gap-2 text-[var(--color-ink-soft)]">
                  <span class="live-dot" aria-hidden="true" /> {t.thinking}
                </span>
              ) : (
                m.text
              )}
              {m.source && (
                <a href={m.source.href} class="link-draw mt-2 block w-fit text-[0.8125rem]">
                  {t.from}: {m.source.label} →
                </a>
              )}
            </div>
            {m.handoff && !m.pending && (
              <div class="mt-2 flex flex-wrap gap-2">
                <a href={href('tour', lang)} class="btn btn-primary !min-h-10 !px-4 !text-sm">{t.tour}</a>
                <a href={SITE.phoneHref} class="btn btn-ghost !min-h-10 !px-4 !text-sm">{t.call} {SITE.phone}</a>
              </div>
            )}
            {m.suggestions && m === last && !m.pending && (
              <ul class="mt-2.5 flex flex-wrap gap-1.5" aria-label={lang === 'en' ? 'Suggested questions' : 'Preguntas sugeridas'}>
                {m.suggestions.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => void ask(s)} class="min-h-9 rounded-full border border-[rgb(31_58_51/.2)] bg-white px-3 py-1.5 text-left text-[0.8125rem] font-semibold transition hover:border-[var(--color-sun-ink)] hover:text-[var(--color-sun-ink)]">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <form
        class="border-t border-[rgb(31_58_51/.1)] p-3"
        onSubmit={(e) => { e.preventDefault(); void ask(input); }}
      >
        <div class="flex items-center gap-2">
          <label for="assistant-input" class="sr-only">{t.placeholder}</label>
          <input
            id="assistant-input"
            ref={inputRef}
            value={input}
            onInput={(e) => setInput((e.target as HTMLInputElement).value)}
            placeholder={t.placeholder}
            autocomplete="off"
            maxLength={300}
            class="min-h-12 flex-1 rounded-full border border-[rgb(31_58_51/.2)] bg-white px-4 text-[1rem] placeholder:text-[#6b7a74] focus-visible:border-[var(--color-sun-ink)]"
          />
          <button type="submit" disabled={busy || !input.trim()} class="inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] transition disabled:opacity-40">
            <span class="sr-only">{t.send}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
        <p class="mt-2 px-2 text-[0.6875rem] leading-snug text-[var(--color-ink-soft)]">{t.note}</p>
      </form>
    </div>
  );
}
