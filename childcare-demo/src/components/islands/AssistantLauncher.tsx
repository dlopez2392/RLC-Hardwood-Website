import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentType } from 'preact';
import type { Lang } from '@/i18n';

const L = {
  en: { open: 'Ask Sunroom', hint: 'Questions? Ask me', close: 'Close assistant' },
  es: { open: 'Pregúntele a Sunroom', hint: '¿Preguntas? Escríbame', close: 'Cerrar asistente' },
};

type PanelProps = { lang: Lang; onClose: () => void; initialQuestion?: string };

/**
 * Tiny always-present launcher (~1 kB). The chat panel and FAQ index are only
 * downloaded the first time a parent opens it.
 */
export default function AssistantLauncher({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [Panel, setPanel] = useState<ComponentType<PanelProps> | null>(null);
  const [initial, setInitial] = useState<string | undefined>();
  const btn = useRef<HTMLButtonElement>(null);
  const t = L[lang];

  const load = async () => {
    if (!Panel) {
      const mod = await import('./AssistantPanel');
      setPanel(() => mod.default);
    }
  };
  const openPanel = async (q?: string) => { setInitial(q); await load(); setOpen(true); };

  // Any element with [data-ask] (e.g. FAQ page buttons) can open the assistant with a question.
  useEffect(() => {
    const onClick = (e: Event) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-ask]');
      if (el) { e.preventDefault(); void openPanel(el.dataset.ask || undefined); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [Panel]);

  return (
    <div class="no-print">
      {open && Panel ? (
        <Panel lang={lang} initialQuestion={initial} onClose={() => { setOpen(false); requestAnimationFrame(() => btn.current?.focus()); }} />
      ) : null}
      <button
        ref={btn}
        type="button"
        onClick={() => (open ? setOpen(false) : void openPanel())}
        onPointerEnter={() => void load()}
        onFocus={() => void load()}
        aria-expanded={open}
        aria-haspopup="dialog"
        class="assistant-fab group fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[var(--color-ink)] p-2 sm:pr-5 text-[var(--color-cream)] shadow-[0_18px_40px_-16px_rgb(31_58_51/.7)] transition-transform duration-300 hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
      >
        <span class="relative inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-sun)]">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 18a8 8 0 0 1 16 0Z" fill="#FBF6EE" />
            <g stroke="#FBF6EE" stroke-width="2" stroke-linecap="round"><path d="M12 6V3.5M5.6 8.6 3.9 6.9M18.4 8.6l1.7-1.7" /></g>
          </svg>
        </span>
        <span class="sr-only sm:not-sr-only text-[0.9375rem] font-semibold">{open ? t.close : t.open}</span>
      </button>
    </div>
  );
}
