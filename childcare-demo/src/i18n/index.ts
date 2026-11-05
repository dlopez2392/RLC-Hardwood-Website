/**
 * i18n core. English lives at `/`, Spanish at `/es/` with localized slugs.
 * Every dictionary is declared as `{ en, es }` where `es` is typed as `typeof en`,
 * so a missing or misspelled Spanish key fails `astro check` — not production.
 */
export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const LOCALE: Record<Lang, string> = { en: 'en-US', es: 'es-US' };

export type Bi<T> = { en: T; es: T };
/** Pick the active-language value from a bilingual record. */
export const pick = <T>(v: Bi<T>, lang: Lang): T => v[lang];

/** Define a bilingual dictionary whose Spanish side must mirror the English shape. */
export function dict<T>(en: T, es: NoInfer<T>): Bi<T> {
  return { en, es };
}

export const ROUTES = {
  home: { en: '/', es: '/es/' },
  programs: { en: '/programs/', es: '/es/programas/' },
  day: { en: '/a-day/', es: '/es/un-dia/' },
  teachers: { en: '/teachers/', es: '/es/maestros/' },
  safety: { en: '/safety/', es: '/es/seguridad/' },
  tuition: { en: '/tuition/', es: '/es/colegiatura/' },
  tour: { en: '/tour/', es: '/es/visita/' },
  portal: { en: '/portal/', es: '/es/portal/' },
  faq: { en: '/faq/', es: '/es/preguntas/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
} as const satisfies Record<string, Bi<string>>;
export type RouteKey = keyof typeof ROUTES;

/**
 * Client-side root for portable static exports (e.g. a preview hosted under an unknown
 * base path): when the page carries <meta name="site-root" content="../">, links are
 * built relative to it with explicit index.html files. Normal builds are unaffected.
 */
const SITE_ROOT = typeof document !== 'undefined' ? document.querySelector<HTMLMetaElement>('meta[name="site-root"]')?.content : undefined;
const localize = (path: string) => (SITE_ROOT === undefined ? path : SITE_ROOT + path.slice(1) + (path.endsWith('/') ? 'index.html' : ''));
export const href = (key: RouteKey, lang: Lang, hash = '') => localize(ROUTES[key][lang]) + (hash ? `#${hash}` : '');

export const ui = dict(
  {
    brand: 'Sunroom',
    brandFull: 'Sunroom Early Learning Studio',
    skip: 'Skip to main content',
    nav: {
      programs: 'Programs',
      day: 'A Day Here',
      teachers: 'Teachers',
      safety: 'Safety',
      tuition: 'Tuition',
      portal: 'Parent App',
      faq: 'FAQ',
      contact: 'Contact',
      tour: 'Book a tour',
      menu: 'Menu',
      close: 'Close menu',
      primary: 'Primary',
    },
    lang: { label: 'Español', short: 'ES', switchTo: 'Ver este sitio en español', current: 'English' },
    demo: {
      text: 'Portfolio demo — Sunroom is a fictional business. Reviews, numbers and the license are sample content.',
      short: 'Fictional demo · sample content',
    },
    cta: {
      tour: 'Book a tour',
      tuition: 'See tuition',
      programs: 'Explore programs',
      learnMore: 'Learn more',
      call: 'Call us',
    },
    footer: {
      tagline: 'Where the whole day is the curriculum.',
      visit: 'Visit',
      hours: 'Hours',
      hoursValue: 'Monday–Friday, 7:00 a.m.–6:00 p.m.',
      closed: 'Closed weekends and major holidays',
      explore: 'Explore',
      families: 'Families',
      follow: 'Follow along',
      mapLabel: 'Illustrated map: Sunroom sits on Arbor Light Lane, two blocks from Olmos Park.',
      mapCaption: 'Map placeholder: an interactive map would load here in production.',
      legal: '© 2026 Sunroom Early Learning Studio (fictional). Built as a portfolio demonstration.',
      photo: 'Illustrations are original artwork created for this demo.',
      license: 'Texas HHSC license no. DEMO-000000 (placeholder)',
      privacy: 'Nothing you type on this site is sent anywhere.',
    },
    sample: 'Sample content',
    sampleShort: 'Sample',
    breadcrumbHome: 'Home',
  },
  {
    brand: 'Sunroom',
    brandFull: 'Sunroom Early Learning Studio',
    skip: 'Saltar al contenido principal',
    nav: {
      programs: 'Programas',
      day: 'Un día aquí',
      teachers: 'Maestros',
      safety: 'Seguridad',
      tuition: 'Colegiatura',
      portal: 'App familiar',
      faq: 'Preguntas',
      contact: 'Contacto',
      tour: 'Agende una visita',
      menu: 'Menú',
      close: 'Cerrar menú',
      primary: 'Principal',
    },
    lang: { label: 'English', short: 'EN', switchTo: 'View this site in English', current: 'Español' },
    demo: {
      text: 'Demo de portafolio: Sunroom es un negocio ficticio. Las reseñas, las cifras y la licencia son contenido de muestra.',
      short: 'Demo ficticio · contenido de muestra',
    },
    cta: {
      tour: 'Agende una visita',
      tuition: 'Ver colegiatura',
      programs: 'Conozca los programas',
      learnMore: 'Más información',
      call: 'Llámenos',
    },
    footer: {
      tagline: 'Aquí, cada momento del día enseña.',
      visit: 'Visítenos',
      hours: 'Horario',
      hoursValue: 'Lunes a viernes, 7:00 a. m. a 6:00 p. m.',
      closed: 'Cerrado fines de semana y días festivos principales',
      explore: 'Explorar',
      families: 'Familias',
      follow: 'Síganos',
      mapLabel: 'Mapa ilustrado: Sunroom está en Arbor Light Lane, a dos cuadras de Olmos Park.',
      mapCaption: 'Mapa de muestra: en producción aquí se cargaría un mapa interactivo.',
      legal: '© 2026 Sunroom Early Learning Studio (ficticio). Creado como demostración de portafolio.',
      photo: 'Las ilustraciones son obras originales creadas para este demo.',
      license: 'Licencia HHSC de Texas n.º DEMO-000000 (de muestra)',
      privacy: 'Nada de lo que escriba en este sitio se envía a ningún lado.',
    },
    sample: 'Contenido de muestra',
    sampleShort: 'Muestra',
    breadcrumbHome: 'Inicio',
  },
);

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

export const fmtMoney = (n: number, lang: Lang) =>
  new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
