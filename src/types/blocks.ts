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

// Conforme agreguemos más bloques (Ubicación, Formulario), los uniremos aquí:
export const AnyBlockSchema = z.discriminatedUnion('_type', [
  HeroBlockSchema,
  CoverBlockSchema,
  EventDetailsBlockSchema,
  ParentsBlockSchema,
]);

export type AnyBlockData = z.infer<typeof AnyBlockSchema>;

