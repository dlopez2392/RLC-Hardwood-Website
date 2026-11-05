import type { Bi } from '@/i18n';

export interface Portrait {
  skin: string;
  hair: string;
  style: 'bun' | 'short' | 'curls' | 'long' | 'bob' | 'crop' | 'wrap' | 'waves';
  bg: string;
  glasses?: boolean;
  beard?: boolean;
  top: string;
}

export interface Teacher {
  name: string;
  role: Bi<string>;
  room?: string;
  years: number;
  languages: Bi<string>;
  credentials: string[];
  quote: Bi<string>;
  loves: Bi<string>;
  portrait: Portrait;
}

/** Fictional staff. Credentials are realistic in form, invented in fact. */
/** Spanish renderings of credentials (degree abbreviations and program names stay as issued). */
export const CREDENTIAL_ES: Record<string, string> = {
  'CPR / First Aid': 'RCP / Primeros auxilios',
  'M.Ed. Early Childhood': 'Maestría en Educación Temprana (M.Ed.)',
  'Texas Director Credential': 'Credencial de Directora de Texas',
  'CDA, Infant/Toddler': 'CDA, bebés y niños pequeños',
  'RIE Foundations': 'Fundamentos RIE',
  'Safe Sleep certified': 'Certificada en sueño seguro',
  'B.S. Human Development': 'Lic. en Desarrollo Humano',
  'B.A. Child Development': 'Lic. en Desarrollo Infantil',
  'Reggio Emilia study tour': 'Viaje de estudio a Reggio Emilia',
  'B.A. Early Childhood Ed.': 'Lic. en Educación Temprana',
  'Texas EC-6 Certified': 'Certificación EC-6 de Texas',
  'B.F.A. Studio Art': 'Lic. en Artes Plásticas',
  'Forest School Leader, Level 3': 'Líder de Forest School, nivel 3',
  'Wilderness First Aid': 'Primeros auxilios en la naturaleza',
  'Registered Nurse (BSN)': 'Enfermera titulada (BSN)',
  'Pediatric First Aid Instructor': 'Instructora de primeros auxilios pediátricos',
  'Allergy & Anaphylaxis trainer': 'Capacitadora en alergias y anafilaxia',
  'ServSafe Manager': 'Gerente certificada ServSafe',
  'Pediatric nutrition course': 'Curso de nutrición pediátrica',
};

export const TEACHERS: Teacher[] = [
  {
    name: 'Elena Ruiz-Whitaker',
    role: { en: 'Founder & Director', es: 'Fundadora y directora' },
    years: 12,
    languages: { en: 'English · Spanish', es: 'Inglés · español' },
    credentials: ['M.Ed. Early Childhood', 'Texas Director Credential', 'CPR / First Aid'],
    quote: {
      en: 'A good classroom should feel like the best room in a home: light, unhurried, and arranged so a child can say “I can do this myself.”',
      es: 'Un buen salón debe sentirse como el mejor cuarto de una casa: luminoso, sin prisas y acomodado para que un niño pueda decir “esto lo puedo hacer yo”.',
    },
    loves: { en: 'Morning drop-off. She greets every child by name at the door.', es: 'La llegada de la mañana. Saluda a cada niño por su nombre en la puerta.' },
    portrait: { skin: '#C98E6B', hair: '#2B1B14', style: 'bun', bg: '#F6C49A', glasses: true, top: '#1F3A33' },
  },
  {
    name: 'Priya Raman',
    role: { en: 'Lead Teacher, Infants', es: 'Maestra titular, bebés' },
    room: 'Wrens',
    years: 9,
    languages: { en: 'English · Tamil · learning Spanish', es: 'Inglés · tamil · aprendiendo español' },
    credentials: ['CDA, Infant/Toddler', 'RIE Foundations', 'Safe Sleep certified', 'CPR / First Aid'],
    quote: {
      en: 'Babies tell us everything. Our job is to slow down enough to listen.',
      es: 'Los bebés nos lo dicen todo. Nuestro trabajo es ir lo bastante despacio para escucharlos.',
    },
    loves: { en: 'Lullabies in four languages, learned from Wren families.', es: 'Canciones de cuna en cuatro idiomas, aprendidas de las familias Wren.' },
    portrait: { skin: '#9C6A4A', hair: '#15100D', style: 'long', bg: '#F2CDBF', top: '#A8431D' },
  },
  {
    name: 'Sofía Delgado',
    role: { en: 'Lead Teacher, Toddlers', es: 'Maestra titular, niños pequeños' },
    room: 'Finches',
    years: 7,
    languages: { en: 'Spanish · English', es: 'Español · inglés' },
    credentials: ['CDA, Infant/Toddler', 'B.S. Human Development', 'CPR / First Aid'],
    quote: {
      en: 'Toddlers are not “terrible.” They are learning that they are separate people, and that is brave work.',
      es: 'Los niños pequeños no son “terribles”. Están aprendiendo que son personas distintas, y eso es un trabajo valiente.',
    },
    loves: { en: 'Puddle days. She keeps spare rain boots in four sizes.', es: 'Los días de charcos. Guarda botas de lluvia de repuesto en cuatro tallas.' },
    portrait: { skin: '#D9A27E', hair: '#5A2E1A', style: 'curls', bg: '#F7DFA6', top: '#3B4A6B' },
  },
  {
    name: 'Hannah Okafor',
    role: { en: 'Lead Teacher, Preschool', es: 'Maestra titular, preescolar' },
    room: 'Larks',
    years: 6,
    languages: { en: 'English · Igbo', es: 'Inglés · igbo' },
    credentials: ['B.A. Child Development', 'Reggio Emilia study tour', 'CPR / First Aid'],
    quote: {
      en: 'I try never to answer a question a child can still enjoy wondering about.',
      es: 'Procuro no contestar nunca una pregunta que a un niño todavía le divierte descifrar por su cuenta.',
    },
    loves: { en: 'The light table, and anything made of clay.', es: 'La mesa de luz y todo lo que se pueda hacer con barro.' },
    portrait: { skin: '#6E4530', hair: '#120C0A', style: 'wrap', bg: '#E7EDDD', top: '#E2683C' },
  },
  {
    name: 'Marcus Bell',
    role: { en: 'Lead Teacher, Pre-K', es: 'Maestro titular, prekínder' },
    room: 'Kestrels',
    years: 8,
    languages: { en: 'English · Spanish', es: 'Inglés · español' },
    credentials: ['B.A. Early Childhood Ed.', 'Texas EC-6 Certified', 'CPR / First Aid'],
    quote: {
      en: 'Kindergarten readiness is not worksheets. It is a child who can wait, try again, and ask for help.',
      es: 'Estar listo para el kínder no es llenar hojas de trabajo. Es un niño que sabe esperar, volver a intentar y pedir ayuda.',
    },
    loves: { en: 'Running the classroom post office. Stamps are serious business.', es: 'Dirigir la oficina de correos del salón. Las estampillas son asunto serio.' },
    portrait: { skin: '#7A4E36', hair: '#16100C', style: 'crop', bg: '#CFE0E3', beard: true, top: '#A9B99A' },
  },
  {
    name: 'James Whitfield',
    role: { en: 'Atelier & Outdoor Educator', es: 'Educador de atelier y exteriores' },
    years: 5,
    languages: { en: 'English', es: 'Inglés' },
    credentials: ['B.F.A. Studio Art', 'Forest School Leader, Level 3', 'Wilderness First Aid'],
    quote: {
      en: 'Children need a few things that are real: real clay, real tools, real weather.',
      es: 'Los niños necesitan algunas cosas de verdad: barro de verdad, herramientas de verdad, clima de verdad.',
    },
    loves: { en: 'The mud kitchen. He is its head chef.', es: 'La cocinita de lodo. Él es el chef principal.' },
    portrait: { skin: '#EDC6A8', hair: '#B5762F', style: 'short', bg: '#F6C49A', glasses: true, top: '#6F8A64' },
  },
  {
    name: 'Mei Lin Chen, RN',
    role: { en: 'Health & Wellness Coordinator', es: 'Coordinadora de salud y bienestar' },
    years: 10,
    languages: { en: 'English · Mandarin', es: 'Inglés · mandarín' },
    credentials: ['Registered Nurse (BSN)', 'Pediatric First Aid Instructor', 'Allergy & Anaphylaxis trainer'],
    quote: {
      en: 'Calm is a safety skill. Every adult here practices it before they need it.',
      es: 'La calma es una habilidad de seguridad. Todos los adultos aquí la practican antes de necesitarla.',
    },
    loves: { en: 'Teaching four-year-olds to say “anaphylaxis.”', es: 'Enseñar a niños de cuatro años a decir “anafilaxia”.' },
    portrait: { skin: '#E8C3A0', hair: '#0F0D0C', style: 'bob', bg: '#E7EDDD', top: '#3B4A6B' },
  },
  {
    name: 'Rosa Villanueva',
    role: { en: 'Kitchen Lead', es: 'Jefa de cocina' },
    years: 11,
    languages: { en: 'Spanish · English', es: 'Español · inglés' },
    credentials: ['ServSafe Manager', 'Pediatric nutrition course', 'CPR / First Aid'],
    quote: {
      en: 'If I cook it like it is for my own grandchildren, they eat it. Every time.',
      es: 'Si lo cocino como si fuera para mis propios nietos, se lo comen. Siempre.',
    },
    loves: { en: 'Friday fideo soup. It has a fan club.', es: 'La sopa de fideo de los viernes. Tiene club de fans.' },
    portrait: { skin: '#B07856', hair: '#8C8C8C', style: 'waves', bg: '#F2CDBF', top: '#A8431D' },
  },
];
