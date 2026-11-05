import type { Bi } from '@/i18n';

export interface SunroomEvent {
  date: string; // ISO yyyy-mm-dd
  end?: string;
  title: Bi<string>;
  note: Bi<string>;
  kind: 'family' | 'closed' | 'class' | 'community';
}

/** 2026–27 school-year calendar (fictional). The strip shows upcoming events only. */
export const EVENTS: SunroomEvent[] = [
  { date: '2026-10-30', kind: 'community', title: { en: 'Día de los Muertos ofrenda workshop', es: 'Taller de ofrenda de Día de Muertos' }, note: { en: 'Families bring a photo; we make papel picado together.', es: 'Las familias traen una foto; hacemos papel picado juntos.' } },
  { date: '2026-11-13', kind: 'family', title: { en: 'Harvest family picnic', es: 'Picnic familiar de la cosecha' }, note: { en: 'Under the pecan tree, 4:30 p.m. Bring a blanket.', es: 'Bajo el nogal, 4:30 p. m. Traiga una cobija.' } },
  { date: '2026-11-20', kind: 'family', title: { en: 'Grandfriends breakfast', es: 'Desayuno con los abuelos' }, note: { en: 'Grandparents and special grown-ups, 8:00 a.m.', es: 'Abuelos y adultos especiales, 8:00 a. m.' } },
  { date: '2026-11-26', end: '2026-11-27', kind: 'closed', title: { en: 'Closed for Thanksgiving', es: 'Cerrado por Acción de Gracias' }, note: { en: 'We reopen Monday, Nov. 30.', es: 'Reabrimos el lunes 30 de noviembre.' } },
  { date: '2026-12-11', kind: 'family', title: { en: 'Winter lantern walk', es: 'Caminata de faroles de invierno' }, note: { en: 'Children carry the lanterns they made in the atelier.', es: 'Los niños llevan los faroles que hicieron en el atelier.' } },
  { date: '2026-12-24', end: '2027-01-01', kind: 'closed', title: { en: 'Winter break', es: 'Vacaciones de invierno' }, note: { en: 'Back on Monday, Jan. 4.', es: 'Regresamos el lunes 4 de enero.' } },
  { date: '2027-01-15', kind: 'family', title: { en: 'Pajama story night', es: 'Noche de cuentos en pijama' }, note: { en: 'Bilingual stories and warm atole, 6:00 p.m.', es: 'Cuentos bilingües y atole calientito, 6:00 p. m.' } },
  { date: '2027-02-12', kind: 'class', title: { en: 'Kindness week begins', es: 'Comienza la semana de la amabilidad' }, note: { en: 'Each room makes cards for a neighbor.', es: 'Cada salón hace tarjetas para un vecino.' } },
  { date: '2027-03-05', kind: 'class', title: { en: 'Little Rodeo day', es: 'Día del pequeño rodeo' }, note: { en: 'Boots welcome. Stick horses provided.', es: 'Se valen las botas. Nosotros ponemos los caballitos de palo.' } },
  { date: '2027-04-16', kind: 'community', title: { en: 'Mini Fiesta parade', es: 'Desfile de Mini Fiesta' }, note: { en: 'Our own Fiesta: flower crowns and a lap of the block.', es: 'Nuestra propia Fiesta: coronas de flores y una vuelta a la cuadra.' } },
  { date: '2027-05-07', kind: 'family', title: { en: 'Family tea in the garden', es: 'Té familiar en el jardín' }, note: { en: 'Children host; grown-ups are guests.', es: 'Los niños son anfitriones; los adultos, invitados.' } },
  { date: '2027-06-04', kind: 'family', title: { en: 'Kestrels sunset send-off', es: 'Despedida al atardecer de los Kestrels' }, note: { en: 'Pre-K graduation at golden hour.', es: 'Graduación de Pre-K a la hora dorada.' } },
];

export type Allergen = 'dairy' | 'egg' | 'wheat' | 'soy' | 'fish';
export const ALLERGEN_LABEL: Record<Allergen, Bi<string>> = {
  dairy: { en: 'Dairy', es: 'Lácteos' },
  egg: { en: 'Egg', es: 'Huevo' },
  wheat: { en: 'Wheat', es: 'Trigo' },
  soy: { en: 'Soy', es: 'Soya' },
  fish: { en: 'Fish', es: 'Pescado' },
};

export interface MenuDay {
  day: Bi<string>;
  short: Bi<string>;
  breakfast: { dish: Bi<string>; allergens: Allergen[] };
  lunch: { dish: Bi<string>; allergens: Allergen[] };
  snack: { dish: Bi<string>; allergens: Allergen[] };
}

export const MENU_WEEK: Bi<string> = { en: 'Week of November 2', es: 'Semana del 2 de noviembre' };

export const MENU: MenuDay[] = [
  {
    day: { en: 'Monday', es: 'Lunes' }, short: { en: 'Mon', es: 'Lun' },
    breakfast: { dish: { en: 'Steel-cut oats, cinnamon & stewed apples', es: 'Avena integral con canela y manzana cocida' }, allergens: ['dairy'] },
    lunch: { dish: { en: 'Black-bean & sweet-potato tacos, pico, rice', es: 'Tacos de frijol negro y camote, pico de gallo y arroz' }, allergens: ['wheat'] },
    snack: { dish: { en: 'Cucumber coins & hummus', es: 'Rodajas de pepino con hummus' }, allergens: [] },
  },
  {
    day: { en: 'Tuesday', es: 'Martes' }, short: { en: 'Tue', es: 'Mar' },
    breakfast: { dish: { en: 'Scrambled eggs, whole-wheat toast, berries', es: 'Huevo revuelto, pan integral y moras' }, allergens: ['egg', 'wheat'] },
    lunch: { dish: { en: 'Chicken & vegetable caldo, warm corn tortillas', es: 'Caldo de pollo con verduras y tortillas de maíz' }, allergens: [] },
    snack: { dish: { en: 'Yogurt with mango', es: 'Yogur con mango' }, allergens: ['dairy'] },
  },
  {
    day: { en: 'Wednesday', es: 'Miércoles' }, short: { en: 'Wed', es: 'Mié' },
    breakfast: { dish: { en: 'Banana-oat pancakes', es: 'Hotcakes de plátano y avena' }, allergens: ['egg', 'wheat', 'dairy'] },
    lunch: { dish: { en: 'Baked salmon, lemony orzo, roasted carrots', es: 'Salmón al horno, orzo al limón y zanahorias asadas' }, allergens: ['fish', 'wheat'] },
    snack: { dish: { en: 'Apple slices & sunflower butter', es: 'Rebanadas de manzana con crema de girasol' }, allergens: [] },
  },
  {
    day: { en: 'Thursday', es: 'Jueves' }, short: { en: 'Thu', es: 'Jue' },
    breakfast: { dish: { en: 'Breakfast tacos: egg, potato & beans', es: 'Tacos mañaneros: huevo, papa y frijoles' }, allergens: ['egg', 'wheat'] },
    lunch: { dish: { en: 'Turkey picadillo, brown rice, green beans', es: 'Picadillo de pavo, arroz integral y ejotes' }, allergens: [] },
    snack: { dish: { en: 'Jícama sticks & cheese', es: 'Palitos de jícama y queso' }, allergens: ['dairy'] },
  },
  {
    day: { en: 'Friday', es: 'Viernes' }, short: { en: 'Fri', es: 'Vie' },
    breakfast: { dish: { en: 'Chia pudding with peaches', es: 'Pudín de chía con durazno' }, allergens: ['dairy'] },
    lunch: { dish: { en: 'Rosa’s fideo soup & cheese quesadillas', es: 'Sopa de fideo de Rosa y quesadillas' }, allergens: ['wheat', 'dairy'] },
    snack: { dish: { en: 'Watermelon & whole-grain crackers', es: 'Sandía y galletas integrales' }, allergens: ['wheat'] },
  },
];

export interface DayChapter {
  id: string;
  time: string;
  /** hour as a decimal, used to place the sun on its arc */
  hour: number;
  title: Bi<string>;
  body: Bi<string>;
  learning: Bi<string>;
  scene: 'door' | 'circle' | 'garden' | 'table' | 'rest' | 'studio' | 'sunset';
}

export const DAY: DayChapter[] = [
  {
    id: 'arrival', time: '7:00', hour: 7, scene: 'door',
    title: { en: 'Arrival', es: 'La llegada' },
    body: {
      en: 'Elena is at the door, every morning, by name. You sign in with a fingerprint; your child hangs up their own backpack (or tries to). Breakfast is warm and waiting, so nobody starts the day rushed.',
      es: 'Elena está en la puerta todas las mañanas y saluda a cada niño por su nombre. Usted registra la entrada con su huella; su hijo cuelga su propia mochila (o lo intenta). El desayuno está calientito y esperando, para que nadie empiece el día con prisa.',
    },
    learning: { en: 'Separation with trust · independence · routine', es: 'Separarse con confianza · autonomía · rutina' },
  },
  {
    id: 'circle', time: '8:30', hour: 8.5, scene: 'circle',
    title: { en: 'Morning circle', es: 'Círculo de la mañana' },
    body: {
      en: 'A song in English, a song in Spanish, and the most important question of the day: “What do we want to find out?” For the youngest it lasts five minutes. For Pre-K it is a real class meeting, run by a different child each week.',
      es: 'Una canción en inglés, otra en español y la pregunta más importante del día: “¿Qué queremos descubrir?”. Para los más pequeños dura cinco minutos. En Pre-K es una asamblea de verdad, dirigida por un niño distinto cada semana.',
    },
    learning: { en: 'Listening · bilingual vocabulary · turn-taking', es: 'Escuchar · vocabulario bilingüe · respetar turnos' },
  },
  {
    id: 'outdoors', time: '9:45', hour: 9.75, scene: 'garden',
    title: { en: 'Outdoors, in all weather', es: 'Afuera, con cualquier clima' },
    body: {
      en: 'Ninety minutes in our garden yard under the old pecan: a mud kitchen, raised beds the children plant, a balance-log trail and a shaded infant meadow. Texas heat means mist stations in summer and an early-morning schedule.',
      es: 'Noventa minutos en nuestro jardín bajo el viejo nogal: una cocinita de lodo, camas de cultivo que siembran los niños, un sendero de troncos para equilibrio y un pradito con sombra para los bebés. Con el calor de Texas hay rociadores en verano y un horario más temprano.',
    },
    learning: { en: 'Risk assessment · gross motor · science', es: 'Medir riesgos · motricidad gruesa · ciencia' },
  },
  {
    id: 'lunch', time: '11:30', hour: 11.5, scene: 'table',
    title: { en: 'Lunch at the long table', es: 'Almuerzo en la mesa larga' },
    body: {
      en: 'Rosa cooks from scratch every morning in our nut-free kitchen. Children serve themselves from small pitchers and bowls, teachers eat with them, and conversation is the main course.',
      es: 'Rosa cocina desde cero cada mañana en nuestra cocina libre de nueces. Los niños se sirven solos con jarritas y tazones pequeños, las maestras comen con ellos y la plática es el plato fuerte.',
    },
    learning: { en: 'Fine motor · nutrition · conversation', es: 'Motricidad fina · nutrición · conversación' },
  },
  {
    id: 'rest', time: '12:30', hour: 12.5, scene: 'rest',
    title: { en: 'Rest', es: 'Descanso' },
    body: {
      en: 'Curtains drawn, white noise, a back rub if they want one. Infants sleep on their own schedule, always on their backs in a bare crib. Children who do not sleep rest with books after 45 minutes.',
      es: 'Cortinas cerradas, ruido blanco y una sobadita en la espalda si la quieren. Los bebés duermen a su propio ritmo, siempre boca arriba y en una cuna sin objetos. Los niños que no duermen descansan con libros después de 45 minutos.',
    },
    learning: { en: 'Self-regulation · rest · safe sleep', es: 'Autorregulación · descanso · sueño seguro' },
  },
  {
    id: 'studio', time: '2:45', hour: 14.75, scene: 'studio',
    title: { en: 'Atelier & enrichment', es: 'Atelier y enriquecimiento' },
    body: {
      en: 'Afternoons belong to the atelier: clay, watercolor, the light table, and weekly visiting teachers for music, Spanish storytelling and movement. Nothing is “for the fridge” — work is revisited, extended and displayed with care.',
      es: 'Las tardes son del atelier: barro, acuarela, la mesa de luz y maestros invitados cada semana para música, cuentos en español y movimiento. Nada es “para el refri”: el trabajo se retoma, se amplía y se expone con cuidado.',
    },
    learning: { en: 'Creativity · persistence · representation', es: 'Creatividad · perseverancia · representación' },
  },
  {
    id: 'pickup', time: '4:30', hour: 17, scene: 'sunset',
    title: { en: 'Golden hour pick-up', es: 'Salida a la hora dorada' },
    body: {
      en: 'By the time you arrive, your phone already holds the day: meals, naps, photos and one real sentence from the teacher. At the door you get the story behind it. Doors close at 6:00.',
      es: 'Cuando usted llega, su teléfono ya tiene el día completo: comidas, siestas, fotos y una frase de verdad de la maestra. En la puerta le contamos la historia detrás. Cerramos a las 6:00.',
    },
    learning: { en: 'Family partnership · reflection', es: 'Alianza con la familia · reflexión' },
  },
];

/** What is happening at Sunroom at a given local hour (for the time-aware hero). */
export const NOW_LINES: { from: number; to: number; text: Bi<string> }[] = [
  { from: 0, to: 7, text: { en: 'Doors open at 7:00. The garden is still asleep.', es: 'Abrimos a las 7:00. El jardín todavía duerme.' } },
  { from: 7, to: 8.5, text: { en: 'Breakfast and free play. Elena is greeting families at the door.', es: 'Desayuno y juego libre. Elena recibe a las familias en la puerta.' } },
  { from: 8.5, to: 9.75, text: { en: 'Morning circle: one song in English, one in Spanish.', es: 'Círculo de la mañana: una canción en inglés y otra en español.' } },
  { from: 9.75, to: 11.5, text: { en: 'Outdoors: the Larks are running a mud-kitchen bakery.', es: 'Afuera: los Larks atienden una panadería en la cocinita de lodo.' } },
  { from: 11.5, to: 12.5, text: { en: 'Lunch at the long table: Rosa’s caldo is on.', es: 'Almuerzo en la mesa larga: hoy hay caldo de Rosa.' } },
  { from: 12.5, to: 14.5, text: { en: 'Rest time. Curtains drawn, white noise on.', es: 'Hora del descanso. Cortinas cerradas y ruido blanco.' } },
  { from: 14.5, to: 16.5, text: { en: 'Atelier: the Kestrels are painting with watercolor.', es: 'Atelier: los Kestrels pintan con acuarela.' } },
  { from: 16.5, to: 18, text: { en: 'Golden-hour pick-up. Daily reports are on their way to phones.', es: 'Salida a la hora dorada. Los reportes del día van rumbo a los teléfonos.' } },
  { from: 18, to: 24, text: { en: 'Doors are closed. The Wrens are dreaming; see you at 7:00.', es: 'Ya cerramos. Los Wrens están soñando; nos vemos a las 7:00.' } },
];

export const WEEKEND_LINE: Bi<string> = {
  en: 'It’s the weekend. The garden is resting until Monday at 7:00.',
  es: 'Es fin de semana. El jardín descansa hasta el lunes a las 7:00.',
};
