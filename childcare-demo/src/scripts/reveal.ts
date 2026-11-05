/**
 * Progressive reveal: elements with [data-reveal] fade/slide in once, via a single
 * IntersectionObserver (no animation library needed for this). `data-reveal-delay`
 * (ms) staggers siblings. Without JS or with reduced motion, content is simply visible.
 */
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        const delay = Number(el.dataset.revealDelay ?? 0);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
}
