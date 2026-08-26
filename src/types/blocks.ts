import { z } from 'zod';

// 1. Definimos el esquema de validación para el "Header" / Hero
export const HeroBlockSchema = z.object({
  // El '_type' es vital. Es la llave que le dirá a nuestro motor qué componente de React renderizar.
  _type: z.literal('heroBlock'), 
  title: z.string(), // Ej: "María & Juan"
  subtitle: z.string().optional(), // Ej: "¡Nos casamos!"
  date: z.string(), // La fecha del evento
  backgroundImage: z.string().url().optional(), // URL de la foto de fondo
  effects: z.object({
    glowEffect: z.boolean().optional(),
  }).optional(),
});

// 2. Extraemos el tipo de TypeScript directamente de Zod (¡Cero código duplicado!)
export type HeroBlockData = z.infer<typeof HeroBlockSchema>;

// 3. Definimos el esquema para el bloque de Portada (Cover)
export const CoverBlockSchema = z.object({
  _type: z.literal('coverBlock'),
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().url().optional(),
  scrollLabel: z.string().optional(), // Ej: "Deslice para abrir"
});

export type CoverBlockData = z.infer<typeof CoverBlockSchema>;

// 4. Definimos el esquema para el bloque de Detalles de Evento (EventDetails)
export const EventDetailsBlockSchema = z.object({
  _type: z.literal('eventDetailsBlock'),
  title: z.string(),
  label: z.string().optional(),
  date: z.string(),
  location: z.string(),
  backgroundImage: z.string().url().optional(),
});

export type EventDetailsBlockData = z.infer<typeof EventDetailsBlockSchema>;

// 5. Definimos el esquema para el bloque de Presentación de Padres y Novios (Parents)
export const ParentsBlockSchema = z.object({
  _type: z.literal('parentsBlock'),
  headerLabel: z.string().optional().default('Nuestra Unión'),
  brideParents: z.object({
    label: z.string().default('Padres de la Novia'),
    father: z.string(),
    mother: z.string(),
  }),
  groomParents: z.object({
    label: z.string().default('Padres del Novio'),
    father: z.string(),
    mother: z.string(),
  }),
  brideFullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  groomFullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  invitationMessage: z.string(),
  ctaButtonText: z.string().optional(),
  yearText: z.string().optional().default('Dos Mil Veintiséis'),
  backgroundImage: z.string().optional(),
});

export type ParentsBlockData = z.infer<typeof ParentsBlockSchema>;

// 6. Definimos el esquema para el bloque de Confirmación (RSVP)
export const RSVPBlockSchema = z.object({
  _type: z.literal('rsvpBlock'),
  title: z.string().default('Confirmar Asistencia'),
  subtitle: z.string().optional().default('RSVP'),
  backgroundImage: z.string().optional(),
  maxGuests: z.number().default(2),
  deadlineText: z.string().optional(),
  submitButtonText: z.string().default('Confirmar'),
  guestName: z.string().optional().default('Familia Invitada'),
});

export type RSVPBlockData = z.infer<typeof RSVPBlockSchema>;

// 7. Definimos el esquema para los ítems individuales de ubicación (Ceremonia, Recepción, etc.)
export const LocationItemSchema = z.object({
  id: z.string(),
  type: z.enum(['ceremony', 'reception', 'party', 'other']).default('ceremony'),
  title: z.string(), // Ej: "Ceremonia Religiosa"
  venueName: z.string(), // Ej: "Parroquia de San Miguel Arcángel"
  time: z.string(), // Ej: "17:00 HRS"
  address: z.string(), // Ej: "Av. Universidad 120, Col. Centro, Querétaro"
  mapsUrl: z.string().url().optional(), // URL universal de navegación (Google Maps / Apple Maps / Universal)
  googleMapsUrl: z.string().url().optional(), // Fallback legacy
  wazeUrl: z.string().url().optional(), // Fallback legacy opcional
});

export type LocationItemData = z.infer<typeof LocationItemSchema>;

// 8. Definimos el esquema para el bloque de Ubicaciones (Locations)
export const LocationsBlockSchema = z.object({
  _type: z.literal('locationsBlock'),
  title: z.string().default('Ubicaciones'),
  subtitle: z.string().optional().default('Dónde & Cuándo'),
  backgroundImage: z.string().optional(),
  locations: z.array(LocationItemSchema),
});

export type LocationsBlockData = z.infer<typeof LocationsBlockSchema>;

// 9. Definimos el esquema para el bloque unificado de Vestimenta y Regalos
export const DressAndGiftsBlockSchema = z.object({
  _type: z.literal('dressAndGiftsBlock'),
  backgroundImage: z.string().optional(),
  
  // Dress Code
  dressCodeTitle: z.string().default('Código de Vestimenta'),
  dressCodeSubtitle: z.string().default('Formal'),
  mensDressCode: z.string().default('Sugerimos traje oscuro o de etiqueta para acompañar la elegancia de la noche.'),
  womensDressCode: z.string().default('Les invitamos a lucir sus mejores galas en vestido largo o de noche.'),
  
  // Gifts
  giftsTitle: z.string().default('Mesa de Regalos'),
  giftsDescription: z.string().default('Tu presencia es el mejor regalo, pero si deseas tener un detalle con nosotros, agradecemos regalo en efectivo.'),
});

export type DressAndGiftsBlockData = z.infer<typeof DressAndGiftsBlockSchema>;

// 10. Definimos el esquema para el bloque de Galería (Carrusel de imágenes)
export const GalleryBlockSchema = z.object({
  _type: z.literal('galleryBlock'),
  title: z.string().default('Nuestros Momentos'),
  images: z.array(z.string().url().or(z.string().startsWith('/'))),
});

export type GalleryBlockData = z.infer<typeof GalleryBlockSchema>;

// Conforme agreguemos más bloques (Ubicación, Formulario), los uniremos aquí:
export const AnyBlockSchema = z.discriminatedUnion('_type', [
  HeroBlockSchema,
  CoverBlockSchema,
  EventDetailsBlockSchema,
  ParentsBlockSchema,
  RSVPBlockSchema,
  LocationsBlockSchema,
  DressAndGiftsBlockSchema,
  GalleryBlockSchema,
]);

export type AnyBlockData = z.infer<typeof AnyBlockSchema>;

