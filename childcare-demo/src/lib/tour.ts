/** Mock tour availability shared by the home personaliser and the scheduler. */
export const TOUR_TIMES = ['9:30', '10:30', '16:00'] as const;
export type TourTime = (typeof TOUR_TIMES)[number];
export const TOUR_DAYS = [2, 3, 4]; // Tue, Wed, Thu

/** Deterministic pseudo-availability so the demo looks real but stable. */
export function spotsLeft(date: Date, time: TourTime): number {
  const seed = date.getFullYear() * 400 + date.getMonth() * 31 + date.getDate() + TOUR_TIMES.indexOf(time) * 7;
  const v = Math.abs(Math.sin(seed) * 10000) % 1;
  return v < 0.18 ? 0 : v < 0.45 ? 1 : v < 0.7 ? 2 : 3;
}

export function upcomingTourDays(from = new Date(), count = 10): Date[] {
  const out: Date[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (out.length < count) {
    if (TOUR_DAYS.includes(d.getDay())) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function nextOpenSlot(from = new Date()): { date: Date; time: TourTime } | null {
  for (const date of upcomingTourDays(from, 12)) {
    for (const time of TOUR_TIMES) if (spotsLeft(date, time) > 0) return { date, time };
  }
  return null;
}

export const fmtTime = (t: TourTime, lang: 'en' | 'es') => {
  const [h, m] = t.split(':').map(Number) as [number, number];
  const d = new Date(2026, 0, 1, h, m);
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-US', { hour: 'numeric', minute: '2-digit' }).format(d);
};

/** yyyy-mm-dd in local time (toISOString would shift the day in some timezones). */
export const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const parseIsoDay = (s: string) => { const [y, m, d] = s.split('-').map(Number) as [number, number, number]; return new Date(y, m - 1, d); };
