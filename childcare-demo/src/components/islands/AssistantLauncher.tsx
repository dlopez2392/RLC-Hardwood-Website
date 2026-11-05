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

  // Step aside (fade out) while the footer, a CTA band or a form's submit area is on screen.
  const [aside, setAside] = useState(false);
  useEffect(() => {
    const targets = document.querySelectorAll('footer, [data-fab-avoid]');
    if (!targets.length || !('IntersectionObserver' in window)) return;
    // Watch only the button's own corner (bottom-right ~300×110 px): it steps aside
    // when a form, CTA band or the footer actually sits underneath it, not merely on screen.
    let io: IntersectionObserver | null = null;
    const seen = new Set<Element>();
    const observe = () => {
      io?.disconnect(); seen.clear();
      const top = Math.max(0, innerHeight - 110), left = Math.max(0, innerWidth - 300);
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setAside(seen.size > 0);
      }, { rootMargin: `-${top}px 0px 0px -${left}px` });
      targets.forEach((t) => io!.observe(t));
    };
    observe();
    addEventListener('resize', observe);
    return () => { io?.disconnect(); removeEventListener('resize', observe); };
  }, []);

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
        tabIndex={aside && !open ? -1 : 0}
        aria-hidden={aside && !open ? true : undefined}
        class={`assistant-fab group fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[var(--color-ink)] p-2 text-[var(--color-cream)] shadow-[0_18px_40px_-16px_rgb(31_58_51/.7)] ring-2 ring-[rgb(251_246_238/.55)] transition-[transform,opacity] duration-300 sm:right-6 sm:bottom-6 sm:pr-5 ${aside && !open ? 'pointer-events-none translate-y-6 opacity-0' : 'opacity-100 hover:-translate-y-0.5'}`}
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
