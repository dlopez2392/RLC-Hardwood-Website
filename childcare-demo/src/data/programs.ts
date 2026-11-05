import type { Bi } from '@/i18n';

export type ProgramId = 'infants' | 'toddlers' | 'preschool' | 'prek' | 'schoolage';

export interface Program {
  id: ProgramId;
  room: string; // classroom name — proper noun, same in both languages
  /** Spanish name of the bird, shown as a gloss on Spanish pages */
  bird: string;
  name: Bi<string>;
  ages: Bi<string>;
  /** Sunroom ratio: 1 teacher for N children */
  ratio: number;
  /** Texas minimum for the same age (26 TAC Ch. 746) — 1 caregiver for N */
  texasMin: number;
  groupMax: number;
  /** SAMPLE monthly full-time (5-day) tuition in USD */
  monthly: number;
  tone: { bg: string; ink: string; accent: string };
  illo: 'nest' | 'blocks' | 'paint' | 'books' | 'kite';
  focusTitle: Bi<string>;
  focus: Bi<string>;
  highlights: Bi<string[]>;
  schedule: { time: string; label: Bi<string> }[];
}

export const PROGRAMS: Program[] = [
  {
    id: 'infants',
    room: 'Wrens',
    bird: 'reyezuelos',
    name: { en: 'Infants', es: 'Bebés' },
    ages: { en: '6 weeks – 12 months', es: '6 semanas a 12 meses' },
    ratio: 3,
    texasMin: 4,
    groupMax: 9,
    monthly: 1980,
    tone: { bg: '#F2CDBF', ink: '#1F3A33', accent: '#E2683C' },
    illo: 'nest',
    focusTitle: { en: 'Secure attachment, on your baby’s rhythm', es: 'Apego seguro, al ritmo de su bebé' },
    focus: {
      en: 'Every Wren has a primary caregiver who learns their cues: the hungry fuss, the tired rub, the “talk to me” coo. Feeding and sleep follow your home schedule, not ours. Floor time, tummy time and slow, narrated care routines are the curriculum.',
      es: 'Cada Wren tiene una cuidadora principal que aprende a leer sus señales: el quejido de hambre, el frotarse los ojos de cansancio, el balbuceo de “platícame”. La alimentación y el sueño siguen el horario de su casa, no el nuestro. El tiempo en el piso, el tiempo boca abajo y las rutinas de cuidado narradas con calma son el plan de estudios.',
    },
    highlights: {
      en: ['Primary-caregiver model', 'Feeding & naps on your schedule', 'Safe-sleep certified room', 'Breast milk & formula friendly'],
      es: ['Cuidadora principal asignada', 'Comidas y siestas según su horario', 'Sala certificada en sueño seguro', 'Aceptamos leche materna y fórmula'],
    },
    schedule: [
      { time: '7:00', label: { en: 'Warm hand-off & feeding notes', es: 'Recepción cálida y notas de alimentación' } },
      { time: '8:30', label: { en: 'Floor play & tummy time', es: 'Juego en el piso y tiempo boca abajo' } },
      { time: '9:30', label: { en: 'Stroller walk in the garden', es: 'Paseo en carriola por el jardín' } },
      { time: '10:30', label: { en: 'Nap on your baby’s cue', es: 'Siesta según las señales del bebé' } },
      { time: '12:00', label: { en: 'Bottle, solids & songs', es: 'Biberón, papillas y canciones' } },
      { time: '2:00', label: { en: 'Sensory basket & mirror play', es: 'Canasta sensorial y juego con espejo' } },
      { time: '4:00', label: { en: 'Story lap time', es: 'Cuentos en el regazo' } },
      { time: '5:00', label: { en: 'Pick-up with your daily report', es: 'Salida con su reporte del día' } },
    ],
  },
  {
    id: 'toddlers',
    room: 'Finches',
    bird: 'pinzones',
    name: { en: 'Toddlers', es: 'Niños pequeños' },
    ages: { en: '12 – 24 months', es: '12 a 24 meses' },
    ratio: 4,
    texasMin: 5,
    groupMax: 12,
    monthly: 1840,
    tone: { bg: '#F7DFA6', ink: '#1F3A33', accent: '#A8431D' },
    illo: 'blocks',
    focusTitle: { en: 'Big movement, first words, “I do it”', es: 'Mucho movimiento, primeras palabras y “yo solito”' },
    focus: {
      en: 'Finches are scientists of cause and effect. We set the room for climbing, pouring, carrying and dumping — on purpose — and give real words to every experience in English and Spanish. Self-help skills like washing hands and serving a snack start here.',
      es: 'Los Finches son científicos de la causa y el efecto. Preparamos el salón para trepar, verter, cargar y vaciar —a propósito— y ponemos palabras a cada experiencia en inglés y en español. Aquí empiezan las habilidades de autonomía, como lavarse las manos y servirse la merienda.',
    },
    highlights: {
      en: ['Bilingual language immersion', 'Gross-motor gym, indoors & out', 'Gentle potty-learning partnership', 'Family-style snack'],
      es: ['Inmersión bilingüe', 'Gimnasio de motricidad gruesa, adentro y afuera', 'Acompañamiento respetuoso para dejar el pañal', 'Merienda en estilo familiar'],
    },
    schedule: [
      { time: '7:00', label: { en: 'Arrival & breakfast', es: 'Llegada y desayuno' } },
      { time: '8:30', label: { en: 'Song circle (5 minutes, tops)', es: 'Círculo de canciones (5 minutos, máximo)' } },
      { time: '9:15', label: { en: 'Garden, sandbox & push-carts', es: 'Jardín, arenero y carritos de empuje' } },
      { time: '10:30', label: { en: 'Pouring, scooping & stacking', es: 'Verter, recoger con cuchara y apilar' } },
      { time: '11:15', label: { en: 'Family-style lunch', es: 'Almuerzo en estilo familiar' } },
      { time: '12:00', label: { en: 'Nap', es: 'Siesta' } },
      { time: '2:30', label: { en: 'Music & movement', es: 'Música y movimiento' } },
      { time: '3:30', label: { en: 'Snack & outdoor play', es: 'Merienda y juego al aire libre' } },
      { time: '4:30', label: { en: 'Books & pick-up', es: 'Libros y salida' } },
    ],
  },
  {
    id: 'preschool',
    room: 'Larks',
    bird: 'alondras',
    name: { en: 'Preschool', es: 'Preescolar' },
    ages: { en: '2 – 4 years', es: '2 a 4 años' },
    ratio: 7,
    texasMin: 11,
    groupMax: 14,
    monthly: 1560,
    tone: { bg: '#E7EDDD', ink: '#1F3A33', accent: '#6F8A64' },
    illo: 'paint',
    focusTitle: { en: 'Projects that start with their questions', es: 'Proyectos que nacen de sus preguntas' },
    focus: {
      en: 'Larks learn through long, unhurried projects. A question about why the pecan tree drops its leaves becomes three weeks of collecting, sorting, painting and counting. Teachers document the thinking on the walls so children can see their own ideas grow.',
      es: 'Los Larks aprenden con proyectos largos y sin prisa. Una pregunta sobre por qué el nogal tira sus hojas se convierte en tres semanas de recolectar, clasificar, pintar y contar. Las maestras documentan las ideas en las paredes para que los niños vean crecer su propio pensamiento.',
    },
    highlights: {
      en: ['Reggio-inspired project work', 'Daily atelier (art studio) time', 'Social-emotional coaching', 'Weekly Spanish storytelling'],
      es: ['Proyectos inspirados en Reggio Emilia', 'Tiempo diario en el atelier (taller de arte)', 'Acompañamiento socioemocional', 'Cuentacuentos en español cada semana'],
    },
    schedule: [
      { time: '7:00', label: { en: 'Arrival, breakfast & free choice', es: 'Llegada, desayuno y juego libre' } },
      { time: '8:30', label: { en: 'Morning circle', es: 'Círculo de la mañana' } },
      { time: '9:00', label: { en: 'Project time in small groups', es: 'Proyectos en grupos pequeños' } },
      { time: '10:00', label: { en: 'Outdoors: garden & mud kitchen', es: 'Afuera: jardín y cocinita de lodo' } },
      { time: '11:30', label: { en: 'Family-style lunch', es: 'Almuerzo en estilo familiar' } },
      { time: '12:30', label: { en: 'Rest', es: 'Descanso' } },
      { time: '2:30', label: { en: 'Atelier: paint, clay & light table', es: 'Atelier: pintura, barro y mesa de luz' } },
      { time: '3:30', label: { en: 'Snack & outdoor play', es: 'Merienda y juego al aire libre' } },
      { time: '4:45', label: { en: 'Story & pick-up', es: 'Cuento y salida' } },
    ],
  },
  {
    id: 'prek',
    room: 'Kestrels',
    bird: 'cernícalos',
    name: { en: 'Pre-K', es: 'Prekínder' },
    ages: { en: '4 – 5 years', es: '4 a 5 años' },
    ratio: 9,
    texasMin: 18,
    groupMax: 18,
    monthly: 1420,
    tone: { bg: '#CFE0E3', ink: '#1F3A33', accent: '#3B4A6B' },
    illo: 'books',
    focusTitle: { en: 'Kindergarten-ready, still allowed to be five', es: 'Listos para kínder, sin dejar de tener cinco años' },
    focus: {
      en: 'Kestrels build early literacy and number sense through play that is deliberately planned: a classroom post office, a market with real prices, a garden journal. We assess gently three times a year and share a clear readiness portrait with you.',
      es: 'Los Kestrels desarrollan lectoescritura inicial y sentido numérico con juegos planeados a propósito: una oficina de correos en el salón, un mercado con precios de verdad, un diario del jardín. Evaluamos con delicadeza tres veces al año y le compartimos un retrato claro de su preparación.',
    },
    highlights: {
      en: ['Kindergarten-readiness portfolio', 'Phonics through play', 'Math with real objects', 'Leadership jobs & classroom meetings'],
      es: ['Portafolio de preparación para kínder', 'Fonética a través del juego', 'Matemáticas con objetos reales', 'Responsabilidades de liderazgo y asambleas'],
    },
    schedule: [
      { time: '7:00', label: { en: 'Arrival & breakfast', es: 'Llegada y desayuno' } },
      { time: '8:30', label: { en: 'Class meeting & calendar', es: 'Asamblea y calendario' } },
      { time: '9:00', label: { en: 'Literacy centers', es: 'Centros de lectoescritura' } },
      { time: '10:00', label: { en: 'Outdoors & garden science', es: 'Afuera y ciencia en el jardín' } },
      { time: '11:30', label: { en: 'Lunch (they serve themselves)', es: 'Almuerzo (se sirven solos)' } },
      { time: '12:30', label: { en: 'Quiet rest & audiobooks', es: 'Descanso tranquilo y audiolibros' } },
      { time: '1:45', label: { en: 'Math workshop', es: 'Taller de matemáticas' } },
      { time: '2:45', label: { en: 'Enrichment: music, Spanish or movement', es: 'Enriquecimiento: música, español o movimiento' } },
      { time: '4:00', label: { en: 'Snack, play & pick-up', es: 'Merienda, juego y salida' } },
    ],
  },
  {
    id: 'schoolage',
    room: 'Swifts',
    bird: 'vencejos',
    name: { en: 'After-School & Summer', es: 'Después de clases y verano' },
    ages: { en: '5 – 10 years', es: '5 a 10 años' },
    ratio: 12,
    texasMin: 22,
    groupMax: 24,
    monthly: 640,
    tone: { bg: '#F6C49A', ink: '#1F3A33', accent: '#A8431D' },
    illo: 'kite',
    focusTitle: { en: 'Homework done, then something worth doing', es: 'Primero la tarea, luego algo que valga la pena' },
    focus: {
      en: 'Swifts arrive by our walking bus from two neighborhood elementary schools. A calm homework hour comes first, then clubs they choose: robotics, garden crew, theater, Spanish chess. Summer is ten themed weeks with field trips across San Antonio.',
      es: 'Los Swifts llegan en nuestro “camión a pie” desde dos primarias del vecindario. Primero viene una hora tranquila de tarea y después clubes que ellos eligen: robótica, equipo de jardinería, teatro y ajedrez en español. El verano son diez semanas temáticas con excursiones por San Antonio.',
    },
    highlights: {
      en: ['Walking pick-up from 2 schools', 'Homework hour with a tutor', 'Rotating clubs', '10-week summer camp'],
      es: ['Recogida a pie en 2 escuelas', 'Hora de tarea con tutor', 'Clubes que rotan', 'Campamento de verano de 10 semanas'],
    },
    schedule: [
      { time: '3:00', label: { en: 'Walking bus from school', es: 'Camión a pie desde la escuela' } },
      { time: '3:20', label: { en: 'Snack & decompress', es: 'Merienda y un respiro' } },
      { time: '3:45', label: { en: 'Homework hour', es: 'Hora de tarea' } },
      { time: '4:45', label: { en: 'Clubs: robotics, garden, theater', es: 'Clubes: robótica, jardín, teatro' } },
      { time: '5:30', label: { en: 'Free play & pick-up', es: 'Juego libre y salida' } },
    ],
  },
];

export const programById = (id: ProgramId) => PROGRAMS.find((p) => p.id === id)!;
