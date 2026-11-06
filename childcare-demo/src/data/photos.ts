import type { ImageMetadata } from 'astro';
import type { Bi } from '@/i18n';
import hero from '@/assets/photos/hero.jpg';
import arrival from '@/assets/photos/day-arrival.jpg';
import circle from '@/assets/photos/day-circle.jpg';
import outdoors from '@/assets/photos/day-outdoors.jpg';
import lunch from '@/assets/photos/day-lunch.jpg';
import rest from '@/assets/photos/day-rest.jpg';
import studio from '@/assets/photos/day-studio.jpg';
import pickup from '@/assets/photos/day-pickup.jpg';
import infants from '@/assets/photos/program-infants.jpg';
import safety from '@/assets/photos/safety.jpg';
import portal from '@/assets/photos/portal-photo.jpg';
import gallery from '@/assets/photos/gallery.jpg';

export interface Photo { src: ImageMetadata; alt: Bi<string> }

/** AI-generated (Higgsfield API) photography for the fictional demo — disclosed in the footer. */
export const PHOTOS = {
  hero: { src: hero, alt: { en: 'Two toddlers seen from behind building with wooden blocks at a low oak table while a teacher adds a block, in a sunlit classroom with an arched window.', es: 'Dos niños pequeños, de espaldas, construyen con bloques de madera en una mesa baja mientras una maestra agrega un bloque, en un salón soleado con una ventana en arco.' } },
  arrival: { src: arrival, alt: { en: 'A father kneels to hug his preschool daughter goodbye beside the classroom cubbies.', es: 'Un papá se arrodilla para despedirse de su hija con un abrazo junto a los casilleros del salón.' } },
  circle: { src: circle, alt: { en: 'Preschoolers sit on a round woven rug while their teacher plays guitar for morning circle.', es: 'Niños de preescolar sentados en un tapete redondo mientras su maestra toca la guitarra en el círculo de la mañana.' } },
  outdoors: { src: outdoors, alt: { en: 'Two children in rain boots play at a wooden mud kitchen under a large pecan tree.', es: 'Dos niños con botas de lluvia juegan en una cocinita de lodo de madera bajo un gran nogal.' } },
  lunch: { src: lunch, alt: { en: 'Family-style lunch on a long oak table: bowls of soup, warm tortillas and a child pouring water from a small pitcher.', es: 'Almuerzo en estilo familiar en una mesa larga de roble: tazones de sopa, tortillas calientitas y un niño sirviendo agua de una jarrita.' } },
  rest: { src: rest, alt: { en: 'Children asleep on low cots under linen sheets while a teacher reads quietly nearby.', es: 'Niños dormidos en catres bajos con sábanas de lino mientras una maestra lee en silencio cerca de ellos.' } },
  studio: { src: studio, alt: { en: 'A child’s hand paints with watercolor at a low easel in the art studio.', es: 'La mano de un niño pinta con acuarela en un caballete bajo del taller de arte.' } },
  pickup: { src: pickup, alt: { en: 'At golden hour, a father and his toddler walk hand in hand past the studio’s arched blue door.', es: 'A la hora dorada, un papá y su hijo pequeño caminan de la mano frente a la puerta azul en arco del estudio.' } },
  infants: { src: infants, alt: { en: 'An infant teacher holds a smiling baby during floor play beside a low mirror.', es: 'Una maestra de bebés carga a un bebé sonriente durante el juego en el piso, junto a un espejo bajo.' } },
  safety: { src: safety, alt: { en: 'A teacher checks the photo-ID pick-up list on a tablet at the studio entrance.', es: 'Un maestro revisa en una tableta la lista de personas autorizadas con foto en la entrada del estudio.' } },
  portal: { src: portal, alt: { en: 'A toddler’s small hands tip a watering can over seedlings in a raised garden bed.', es: 'Las manitas de un niño pequeño inclinan una regadera sobre unas plántulas en una cama de cultivo.' } },
  gallery: { src: gallery, alt: { en: 'A wide view of a light-filled classroom with low shelves of natural materials and children at play.', es: 'Vista amplia de un salón lleno de luz con repisas bajas de materiales naturales y niños jugando.' } },
} satisfies Record<string, Photo>;
export type PhotoKey = keyof typeof PHOTOS;
