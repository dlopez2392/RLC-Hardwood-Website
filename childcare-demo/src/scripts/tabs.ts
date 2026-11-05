/** Accessible tabs (WAI-ARIA APG pattern) for any [data-tabs] container. */
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls') ?? ''));
  const select = (i: number, focus = true) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => p && (p.hidden = i !== j));
    if (focus) tabs[i]?.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(k)) return;
      e.preventDefault();
      select(k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : (i + (k === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length);
    });
  });
});
