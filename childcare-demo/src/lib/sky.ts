/** Shared sky + sun model used by the time-aware hero and the A Day narrative. */
const SKY: [number, string, string, string][] = [
  // hour, sky top, sky bottom, window glow
  [0, '#1f2a44', '#3B4A6B', '#F7DFA6'],
  [5.5, '#3B4A6B', '#F2CDBF', '#F7DFA6'],
  [7, '#F6C49A', '#FBF6EE', '#CFE0E3'],
  [9, '#CFE0E3', '#FBF6EE', '#CFE0E3'],
  [15, '#CFE0E3', '#F7EEDC', '#CFE0E3'],
  [17.5, '#F6C49A', '#F2CDBF', '#F7DFA6'],
  [19, '#3B4A6B', '#E2683C', '#F7DFA6'],
  [20.5, '#1f2a44', '#3B4A6B', '#F7DFA6'],
  [24, '#1f2a44', '#3B4A6B', '#F7DFA6'],
];
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) =>
  '#' + hex(a).map((v, i) => Math.round(v + (hex(b)[i]! - v) * t).toString(16).padStart(2, '0')).join('');

export function skyAt(h: number): [string, string, string] {
  for (let i = 0; i < SKY.length - 1; i++) {
    const [h0, t0, b0, w0] = SKY[i]!;
    const [h1, t1, b1, w1] = SKY[i + 1]!;
    if (h >= h0 && h <= h1) {
      const t = (h - h0) / (h1 - h0);
      return [mix(t0, t1, t), mix(b0, b1, t), mix(w0, w1, t)];
    }
  }
  return [SKY[0]![1], SKY[0]![2], SKY[0]![3]];
}

/** Sun follows a half-ellipse from 6:00 (left horizon) to 19:00 (right horizon). */
export function sunAt(h: number) {
  if (h < 6 || h > 19.5) return { x: 420, y: 180, night: 1 };
  const p = Math.min(1, Math.max(0, (h - 6) / 13));
  const ang = Math.PI * (1 - p);
  const night = h > 19 ? (h - 19) / 0.5 : 0;
  return { x: 300 + Math.cos(ang) * 230, y: 470 - Math.sin(ang) * 330, night };
}

export function applySky(el: HTMLElement, h: number) {
  const [top, bottom, win] = skyAt(h);
  const sun = sunAt(h);
  el.style.setProperty('--sky-top', top);
  el.style.setProperty('--sky-bottom', bottom);
  el.style.setProperty('--window', win);
  el.style.setProperty('--night', String(sun.night));
  el.style.setProperty('--sun-x', `${sun.x}px`);
  el.style.setProperty('--sun-y', `${sun.y}px`);
  return sun;
}

export const fmtHour = (h: number, locale: string) => {
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60 / 5) * 5;
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(new Date(2026, 0, 1, hh + Math.floor(mm / 60), mm % 60));
};
