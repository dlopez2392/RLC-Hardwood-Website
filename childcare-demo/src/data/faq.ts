import type { Bi, RouteKey } from '@/i18n';

export type FaqCategory = 'basics' | 'tuition' | 'health' | 'learning' | 'enrollment';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  q: Bi<string>;
  a: Bi<string>;
  /** extra retrieval terms (both languages are searched regardless of UI language) */
  keywords: string[];
  source: RouteKey;
}

export const FAQ_CATEGORIES: Record<FaqCategory, Bi<string>> = {
  basics: { en: 'The basics', es: 'Lo básico' },
  tuition: { en: 'Tuition & enrollment', es: 'Colegiatura e inscripción' },
  health: { en: 'Health & safety', es: 'Salud y seguridad' },
  learning: { en: 'Learning & daily life', es: 'Aprendizaje y vida diaria' },
  enrollment: { en: 'Visiting', es: 'Visitas' },
};

export const FAQ: FaqItem[] = [
  {
    id: 'hours', category: 'basics', source: 'contact',
    q: { en: 'What are your hours?', es: '¿Cuál es su horario?' },
    a: {
      en: 'We are open Monday through Friday, 7:00 a.m. to 6:00 p.m., year-round. We close on weekends, for one week at winter break, and on major holidays (the full calendar is shared at enrollment). A late pick-up after 6:00 is $1 per minute.',
      es: 'Abrimos de lunes a viernes, de 7:00 a. m. a 6:00 p. m., todo el año. Cerramos los fines de semana, una semana en las vacaciones de invierno y en los días festivos principales (el calendario completo se entrega al inscribirse). Recoger después de las 6:00 tiene un cargo de $1 por minuto.',
    },
    keywords: ['hours', 'open', 'close', 'time', 'schedule', 'when', 'late', 'pickup', 'horario', 'abren', 'cierran', 'hora', 'tarde', 'recoger'],
  },
  {
    id: 'ratios', category: 'health', source: 'safety',
    q: { en: 'What are your teacher-to-child ratios?', es: '¿Cuántos niños hay por maestro?' },
    a: {
      en: 'Ours are well below Texas minimums: 1:3 for infants (Texas allows 1:4), 1:4 for toddlers (Texas: 1:5), 1:7 for preschool (Texas: 1:11), 1:9 for Pre-K (Texas: 1:18) and 1:12 for school-age (Texas: 1:22). Floaters cover breaks, so ratios hold all day.',
      es: 'Están muy por debajo del mínimo de Texas: 1:3 en bebés (Texas permite 1:4), 1:4 en niños pequeños (Texas: 1:5), 1:7 en preescolar (Texas: 1:11), 1:9 en Pre-K (Texas: 1:18) y 1:12 en edad escolar (Texas: 1:22). Contamos con maestras de apoyo para los descansos, así que la proporción se mantiene todo el día.',
    },
    keywords: ['ratio', 'ratios', 'teachers', 'children', 'per', 'staff', 'class size', 'group', 'proporción', 'maestros', 'niños', 'cuántos', 'grupo', 'tamaño'],
  },
  {
    id: 'tuition', category: 'tuition', source: 'tuition',
    q: { en: 'How much is tuition?', es: '¿Cuánto cuesta la colegiatura?' },
    a: {
      en: 'Full-time (5-day) sample rates are $1,980/month for infants, $1,840 for toddlers, $1,560 for preschool, $1,420 for Pre-K and $640 for after-school. Part-time options run from 2 to 4 days. Siblings get 10% off. Meals, diapers and enrichment are included. Try the estimator on our Tuition page.',
      es: 'Las tarifas de muestra de tiempo completo (5 días) son $1,980 al mes para bebés, $1,840 para niños pequeños, $1,560 para preescolar, $1,420 para Pre-K y $640 para después de clases. Hay opciones de medio tiempo de 2 a 4 días. Los hermanos reciben 10 % de descuento. Las comidas, los pañales y las actividades de enriquecimiento están incluidos. Pruebe la calculadora en nuestra página de Colegiatura.',
    },
    keywords: ['tuition', 'cost', 'price', 'how much', 'fee', 'fees', 'monthly', 'pay', 'expensive', 'rate', 'colegiatura', 'costo', 'precio', 'cuánto', 'cuesta', 'cuota', 'mensual', 'pagar'],
  },
  {
    id: 'sibling', category: 'tuition', source: 'tuition',
    q: { en: 'Do you offer a sibling discount?', es: '¿Tienen descuento para hermanos?' },
    a: {
      en: 'Yes. Each additional sibling receives 10% off their tuition. Our estimator applies it automatically.',
      es: 'Sí. Cada hermano adicional recibe 10 % de descuento en su colegiatura. Nuestra calculadora lo aplica automáticamente.',
    },
    keywords: ['sibling', 'siblings', 'brother', 'sister', 'discount', 'two kids', 'second child', 'hermano', 'hermanos', 'hermana', 'descuento'],
  },
  {
    id: 'subsidy', category: 'tuition', source: 'tuition',
    q: { en: 'Do you accept childcare subsidies or employer benefits?', es: '¿Aceptan subsidios o beneficios del empleador?' },
    a: {
      en: 'Yes. We work with Texas Workforce Solutions childcare scholarships and most employer dependent-care FSA plans, and we provide year-end tax statements.',
      es: 'Sí. Trabajamos con las becas de cuidado infantil de Workforce Solutions de Texas y con la mayoría de los planes FSA de cuidado de dependientes, y entregamos estados de cuenta para impuestos al final del año.',
    },
    keywords: ['subsidy', 'subsidies', 'scholarship', 'fsa', 'employer', 'benefits', 'financial aid', 'assistance', 'tax', 'subsidio', 'beca', 'ayuda', 'beneficios', 'impuestos'],
  },
  {
    id: 'illness', category: 'health', source: 'safety',
    q: { en: 'What is your illness policy?', es: '¿Cuál es su política de enfermedad?' },
    a: {
      en: 'Children stay home with a fever of 100.4°F or higher, vomiting, diarrhea, or a contagious rash, and return after 24 hours symptom-free without fever-reducing medicine. If symptoms start at school, we call you, keep your child comfortable in our quiet room with our nurse, and ask for pick-up within an hour.',
      es: 'Los niños se quedan en casa si tienen fiebre de 100.4 °F o más, vómito, diarrea o un sarpullido contagioso, y regresan tras 24 horas sin síntomas y sin medicamento para la fiebre. Si los síntomas empiezan aquí, le llamamos, su hijo descansa cómodo en nuestro cuarto tranquilo con nuestra enfermera, y le pedimos recogerlo en menos de una hora.',
    },
    keywords: ['sick', 'illness', 'fever', 'ill', 'vomit', 'diarrhea', 'contagious', 'stay home', 'temperature', 'cold', 'flu', 'enfermo', 'enfermedad', 'fiebre', 'vómito', 'diarrea', 'contagioso', 'gripa', 'temperatura'],
  },
  {
    id: 'allergies', category: 'health', source: 'safety',
    q: { en: 'How do you handle food allergies?', es: '¿Cómo manejan las alergias alimentarias?' },
    a: {
      en: 'Our kitchen is nut-free. Every child with an allergy has a care plan reviewed by our RN, a photo allergy card in their room and the kitchen, and color-coded plates. Epinephrine auto-injectors travel with the child, including outdoors and on walks, and every teacher is trained to use them.',
      es: 'Nuestra cocina es libre de nueces. Cada niño con alergia tiene un plan de cuidado revisado por nuestra enfermera, una tarjeta con foto en su salón y en la cocina, y platos con código de color. Los autoinyectores de epinefrina acompañan al niño a todas partes, incluso afuera y en paseos, y todas las maestras saben usarlos.',
    },
    keywords: ['allergy', 'allergies', 'nut', 'peanut', 'epipen', 'epinephrine', 'anaphylaxis', 'food', 'gluten', 'alergia', 'alergias', 'nueces', 'cacahuate', 'maní', 'epinefrina'],
  },
  {
    id: 'security', category: 'health', source: 'safety',
    q: { en: 'How secure is the building?', es: '¿Qué tan seguro es el edificio?' },
    a: {
      en: 'Entry is by fingerprint for authorized adults only, and every pick-up is matched against a photo-ID list you control in the app. Classrooms have interior windows, cameras cover entrances and shared spaces, and we run monthly fire, shelter and lockdown drills.',
      es: 'Solo los adultos autorizados entran con su huella digital, y cada salida se verifica con una lista de personas con identificación con foto que usted controla en la app. Los salones tienen ventanas interiores, hay cámaras en las entradas y áreas comunes, y hacemos simulacros mensuales de incendio, refugio y encierro.',
    },
    keywords: ['secure', 'security', 'safe', 'safety', 'door', 'entry', 'camera', 'cameras', 'pickup', 'who can pick up', 'lockdown', 'drill', 'seguro', 'seguridad', 'puerta', 'entrada', 'cámaras', 'quién puede recoger', 'simulacro'],
  },
  {
    id: 'cpr', category: 'health', source: 'safety',
    q: { en: 'Are teachers trained in CPR and first aid?', es: '¿Las maestras están capacitadas en RCP y primeros auxilios?' },
    a: {
      en: 'Every staff member — including our cook and front desk — holds current pediatric CPR and First Aid certification, renewed every two years. Our Health & Wellness Coordinator is a registered nurse.',
      es: 'Todo el personal —incluidas la cocinera y la recepción— tiene certificación vigente en RCP pediátrica y primeros auxilios, renovada cada dos años. Nuestra coordinadora de salud y bienestar es enfermera titulada.',
    },
    keywords: ['cpr', 'first aid', 'training', 'certified', 'nurse', 'emergency', 'qualified', 'rcp', 'primeros auxilios', 'capacitación', 'certificado', 'enfermera', 'emergencia'],
  },
  {
    id: 'meals', category: 'learning', source: 'home',
    q: { en: 'Are meals included?', es: '¿Las comidas están incluidas?' },
    a: {
      en: 'Yes. Breakfast, lunch and two snacks are cooked from scratch on site and included in tuition. The weekly menu is posted on our homepage and in the app. We accommodate vegetarian, halal and medically required diets. Infants: we happily use your breast milk or formula.',
      es: 'Sí. El desayuno, el almuerzo y dos meriendas se preparan desde cero aquí y están incluidos en la colegiatura. El menú semanal se publica en nuestra página principal y en la app. Adaptamos dietas vegetarianas, halal y las que indique un médico. Para bebés, con gusto usamos su leche materna o fórmula.',
    },
    keywords: ['food', 'meals', 'lunch', 'breakfast', 'snack', 'menu', 'eat', 'vegetarian', 'halal', 'formula', 'breast milk', 'comida', 'comidas', 'almuerzo', 'desayuno', 'merienda', 'menú', 'vegetariano', 'fórmula'],
  },
  {
    id: 'naps', category: 'learning', source: 'day',
    q: { en: 'How do naps work?', es: '¿Cómo funcionan las siestas?' },
    a: {
      en: 'Infants nap on their own schedule, always on their back in a bare crib, with visual checks every 10 minutes. Older children rest after lunch on cots with their own sheet and comfort item. Non-sleepers move to quiet books after 45 minutes.',
      es: 'Los bebés duermen a su propio ritmo, siempre boca arriba y en una cuna sin objetos, con revisión visual cada 10 minutos. Los niños mayores descansan después del almuerzo en catres con su propia sábana y su objeto de apego. Quienes no duermen pasan a leer en silencio después de 45 minutos.',
    },
    keywords: ['nap', 'naps', 'sleep', 'rest', 'crib', 'cot', 'siesta', 'siestas', 'dormir', 'descanso', 'cuna', 'catre'],
  },
  {
    id: 'potty', category: 'learning', source: 'programs',
    q: { en: 'Do you help with potty training?', es: '¿Ayudan a dejar el pañal?' },
    a: {
      en: 'Yes, in partnership with you. We follow your child’s readiness cues, match the words and routine you use at home, and log every attempt in the app so you can see progress. Children do not need to be potty-trained to join any class.',
      es: 'Sí, en equipo con usted. Seguimos las señales de su hijo, usamos las mismas palabras y rutinas que en casa, y registramos cada intento en la app para que vea el avance. No es necesario que dejen el pañal para entrar a ningún salón.',
    },
    keywords: ['potty', 'toilet', 'diaper', 'diapers', 'training', 'bathroom', 'pañal', 'pañales', 'baño', 'bacinica'],
  },
  {
    id: 'curriculum', category: 'learning', source: 'programs',
    q: { en: 'What curriculum do you use?', es: '¿Qué plan de estudios usan?' },
    a: {
      en: 'Our approach is Reggio-inspired and play-based, aligned with the Texas Prekindergarten Guidelines. Projects grow from children’s questions; teachers plan intentionally for language, math, science, art and social-emotional growth. Pre-K includes a kindergarten-readiness portfolio.',
      es: 'Nuestro enfoque se inspira en Reggio Emilia y se basa en el juego, alineado con las Guías de Prekínder de Texas. Los proyectos nacen de las preguntas de los niños; las maestras planean con intención el lenguaje, las matemáticas, la ciencia, el arte y el desarrollo socioemocional. En Pre-K incluimos un portafolio de preparación para el kínder.',
    },
    keywords: ['curriculum', 'learn', 'learning', 'reggio', 'montessori', 'play-based', 'academic', 'kindergarten', 'ready', 'readiness', 'plan de estudios', 'aprender', 'aprendizaje', 'juego', 'kínder', 'preparación'],
  },
  {
    id: 'spanish', category: 'learning', source: 'programs',
    q: { en: 'Is the program bilingual?', es: '¿El programa es bilingüe?' },
    a: {
      en: 'Yes. Every classroom has at least one Spanish-speaking teacher, and children hear both languages through songs, stories and everyday conversation. It is immersion-style exposure rather than formal lessons, and families who speak Spanish at home are warmly welcomed.',
      es: 'Sí. Cada salón tiene al menos una maestra que habla español, y los niños escuchan ambos idiomas en canciones, cuentos y la plática de todos los días. Es exposición por inmersión, no clases formales, y las familias que hablan español en casa son muy bienvenidas.',
    },
    keywords: ['spanish', 'bilingual', 'language', 'languages', 'english', 'immersion', 'español', 'bilingüe', 'idioma', 'idiomas', 'inglés', 'inmersión'],
  },
  {
    id: 'app', category: 'learning', source: 'portal',
    q: { en: 'How will I know how my child’s day went?', es: '¿Cómo sabré cómo le fue a mi hijo?' },
    a: {
      en: 'Through the Sunroom family app: meals and how much was eaten, naps, diapers or potty, photos, and a real note from the teacher, updated through the day. You can message teachers directly, and we answer within the hour during the school day.',
      es: 'Con la app familiar de Sunroom: qué comió y cuánto, siestas, pañales o idas al baño, fotos y una nota de verdad de la maestra, actualizado durante el día. Puede escribirles directamente a las maestras, y respondemos en menos de una hora durante el horario escolar.',
    },
    keywords: ['app', 'report', 'daily report', 'photos', 'updates', 'communication', 'message', 'portal', 'know', 'reporte', 'fotos', 'aplicación', 'mensaje', 'comunicación'],
  },
  {
    id: 'tour', category: 'enrollment', source: 'tour',
    q: { en: 'Can I visit before enrolling?', es: '¿Puedo visitar antes de inscribir a mi hijo?' },
    a: {
      en: 'Please do. Tours run Tuesday through Thursday at 9:30 and 10:30 a.m. (when classrooms are busiest) and 4:00 p.m. They take about 45 minutes, and your child is welcome. Virtual tours are available too. Book in three taps on our Tour page.',
      es: '¡Claro que sí! Las visitas son de martes a jueves a las 9:30 y 10:30 a. m. (cuando los salones están más activos) y a las 4:00 p. m. Duran unos 45 minutos, y su hijo es bienvenido. También hay visitas virtuales. Agéndela en tres pasos en nuestra página de Visitas.',
    },
    keywords: ['tour', 'visit', 'see', 'look around', 'appointment', 'virtual', 'book', 'schedule a tour', 'visita', 'visitar', 'conocer', 'cita', 'agendar', 'recorrido'],
  },
  {
    id: 'waitlist', category: 'enrollment', source: 'tuition',
    q: { en: 'Is there a waitlist?', es: '¿Hay lista de espera?' },
    a: {
      en: 'Infant spaces usually have a 4–6 month wait; other rooms often have openings within a month. Joining the waitlist is free and takes two minutes. A $150 registration fee is due only when a space is offered and accepted.',
      es: 'Los lugares para bebés suelen tener una espera de 4 a 6 meses; en los demás salones a menudo hay lugar en menos de un mes. Unirse a la lista de espera es gratis y toma dos minutos. La cuota de inscripción de $150 se paga solo cuando se ofrece y acepta un lugar.',
    },
    keywords: ['waitlist', 'wait list', 'waiting', 'availability', 'openings', 'space', 'spot', 'enroll', 'enrollment', 'register', 'lista de espera', 'disponibilidad', 'lugar', 'inscribir', 'inscripción'],
  },
  {
    id: 'ages', category: 'basics', source: 'programs',
    q: { en: 'What ages do you serve?', es: '¿Qué edades atienden?' },
    a: {
      en: 'From 6 weeks to 10 years: Infants (6 weeks–12 months), Toddlers (12–24 months), Preschool (2–4 years), Pre-K (4–5 years), and After-School & Summer (5–10 years).',
      es: 'Desde las 6 semanas hasta los 10 años: Bebés (6 semanas a 12 meses), Niños pequeños (12 a 24 meses), Preescolar (2 a 4 años), Pre-K (4 a 5 años) y Después de clases y verano (5 a 10 años).',
    },
    keywords: ['age', 'ages', 'old', 'infant', 'baby', 'toddler', 'preschool', 'pre-k', 'school-age', 'after school', 'summer', 'edad', 'edades', 'bebé', 'años', 'meses', 'verano'],
  },
  {
    id: 'location', category: 'basics', source: 'contact',
    q: { en: 'Where are you located?', es: '¿Dónde están ubicados?' },
    a: {
      en: 'At 1408 Arbor Light Lane, San Antonio, TX 78209 — two blocks from Olmos Park, with a covered drop-off lane and free parking. (This is a fictional address.)',
      es: 'En 1408 Arbor Light Lane, San Antonio, TX 78209, a dos cuadras de Olmos Park, con carril techado para dejar a los niños y estacionamiento gratuito. (Es una dirección ficticia).',
    },
    keywords: ['where', 'location', 'address', 'parking', 'directions', 'map', 'located', 'dónde', 'ubicación', 'dirección', 'estacionamiento', 'mapa'],
  },
];
