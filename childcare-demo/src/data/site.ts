import type { Bi } from '@/i18n';

/** All business facts are fictional. Phone uses the reserved 555-01xx range. */
export const SITE = {
  name: 'Sunroom Early Learning Studio',
  short: 'Sunroom',
  street: '1408 Arbor Light Lane',
  city: 'San Antonio',
  region: 'TX',
  postal: '78209',
  country: 'US',
  phone: '(210) 555-0142',
  phoneHref: 'tel:+12105550142',
  email: 'hello@sunroom-demo.example.com',
  geo: { lat: 29.4889, lng: -98.4741 },
  opens: '07:00',
  closes: '18:00',
  license: 'DEMO-000000',
  founded: 2014,
  social: [
    { name: 'Instagram', href: 'https://instagram.com/', handle: '@sunroom.demo' },
    { name: 'Facebook', href: 'https://facebook.com/', handle: 'Sunroom Early Learning' },
    { name: 'Pinterest', href: 'https://pinterest.com/', handle: 'sunroomdemo' },
  ],
} as const;

/** SAMPLE aggregate rating — labelled as sample wherever it appears. */
export const RATING = { value: 4.9, count: 212 } as const;

export const TUITION = {
  /** share of the 5-day monthly rate charged for fewer days */
  dayFactor: { 2: 0.48, 3: 0.68, 4: 0.86, 5: 1 } as Record<2 | 3 | 4 | 5, number>,
  siblingDiscount: 0.1,
  registrationFee: 150,
  annualMaterials: 225,
  weeksPerYear: 50,
} as const;

export const INCLUDED: Bi<string[]> = {
  en: [
    'Breakfast, lunch & two snacks, cooked on site',
    'Diapers, wipes & organic sunscreen',
    'Music, Spanish & movement enrichment',
    'The Sunroom family app with daily reports',
    'Three family conferences a year',
    'All art & studio materials',
  ],
  es: [
    'Desayuno, almuerzo y dos meriendas preparados aquí',
    'Pañales, toallitas y protector solar orgánico',
    'Enriquecimiento en música, español y movimiento',
    'La app familiar de Sunroom con reportes diarios',
    'Tres reuniones con la familia al año',
    'Todos los materiales de arte y del atelier',
  ],
};

export interface Story {
  family: string;
  child: Bi<string>;
  since: Bi<string>;
  quote: Bi<string>;
  pull: Bi<string>;
  tone: string;
}

/** SAMPLE family stories — fictional families, clearly labelled. */
export const STORIES: Story[] = [
  {
    family: 'The Okonkwo-García family',
    child: { en: 'Ada, Larks room', es: 'Ada, salón Larks' },
    since: { en: 'Families since 2023', es: 'Familia desde 2023' },
    pull: { en: '“I know what she ate, how long she slept, and what made her laugh.”', es: '“Sé qué comió, cuánto durmió y qué la hizo reír.”' },
    quote: {
      en: 'We toured six centers. Sunroom was the only one where the director told us the tuition in the first five minutes and then spent forty minutes talking about our daughter. Two years later I still get a photo and a real sentence from her teacher every day — not “had a great day!”, but “Ada sorted the pecans by size and announced the biggest one was the grandma.”',
      es: 'Visitamos seis centros. Sunroom fue el único donde la directora nos dijo la colegiatura en los primeros cinco minutos y luego pasó cuarenta minutos hablando de nuestra hija. Dos años después, todavía recibo cada día una foto y una frase de verdad de su maestra; no un “¡tuvo un gran día!”, sino “Ada ordenó las nueces por tamaño y anunció que la más grande era la abuelita”.',
    },
    tone: '#E7EDDD',
  },
  {
    family: 'Marisol & Dev Patel-Ruiz',
    child: { en: 'Theo, Wrens room', es: 'Theo, salón Wrens' },
    since: { en: 'Families since 2025', es: 'Familia desde 2025' },
    pull: { en: '“They followed our feeding schedule from day one.”', es: '“Siguieron nuestro horario de comidas desde el primer día.”' },
    quote: {
      en: 'Going back to work at twelve weeks was the hardest thing I have done. Ms. Priya texted me a photo of Theo asleep on his back, arms up, at 9:42 on the first morning — exactly the reassurance I needed. They followed our feeding schedule from day one, and his Spanish lullabies come home with him.',
      es: 'Regresar al trabajo a las doce semanas fue lo más difícil que he hecho. La maestra Priya me mandó una foto de Theo dormido boca arriba, con los brazos para arriba, a las 9:42 de la primera mañana; justo la tranquilidad que necesitaba. Siguieron nuestro horario de comidas desde el primer día, y sus canciones de cuna en español ahora también se cantan en casa.',
    },
    tone: '#F2CDBF',
  },
  {
    family: 'The Whitaker family',
    child: { en: 'June & Wes, Kestrels and Swifts', es: 'June y Wes, salones Kestrels y Swifts' },
    since: { en: 'Families since 2021', es: 'Familia desde 2021' },
    pull: { en: '“June walked into kindergarten like she owned the place.”', es: '“June entró al kínder como si fuera su casa.”' },
    quote: {
      en: 'The readiness portrait they gave us in May was more useful than anything from our pediatrician. June walked into kindergarten like she owned the place, and her teacher asked where she had learned to run a class meeting. Wes still begs to go to Swifts on half-days.',
      es: 'El retrato de preparación que nos dieron en mayo fue más útil que cualquier cosa del pediatra. June entró al kínder como si fuera su casa, y su maestra preguntó dónde había aprendido a dirigir una asamblea. Wes todavía ruega ir a Swifts los días de medio turno.',
    },
    tone: '#CFE0E3',
  },
];

/** SAMPLE Pre-K readiness snapshot. */
export const READINESS = {
  cohort: { en: 'Kestrels class of 2026', es: 'Generación Kestrels 2026' } as Bi<string>,
  headline: 96,
  domains: [
    { label: { en: 'Language & early literacy', es: 'Lenguaje y lectoescritura inicial' } as Bi<string>, value: 94 },
    { label: { en: 'Math & number sense', es: 'Matemáticas y sentido numérico' } as Bi<string>, value: 92 },
    { label: { en: 'Social-emotional skills', es: 'Habilidades socioemocionales' } as Bi<string>, value: 97 },
    { label: { en: 'Physical development', es: 'Desarrollo físico' } as Bi<string>, value: 98 },
    { label: { en: 'Approaches to learning', es: 'Disposición para aprender' } as Bi<string>, value: 95 },
  ],
};
