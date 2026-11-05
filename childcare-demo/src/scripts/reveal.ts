import { inView } from 'motion';

/**
 * Progressive reveal: elements with [data-reveal] fade/slide in once.
 * `data-reveal-delay` (ms) staggers siblings. Without JS or with reduced motion,
 * content is simply visible (see global.css).
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce) {
  els.forEach((el) => el.classList.add('is-in'));
} else {
  els.forEach((el) => {
    const delay = Number(el.dataset.revealDelay ?? 0);
    if (delay) el.style.transitionDelay = `${delay}ms`;
    inView(el, () => { el.classList.add('is-in'); }, { margin: '0px 0px -8% 0px', amount: 0.15 });
  });
}
