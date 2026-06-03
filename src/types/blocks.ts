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

// Conforme agreguemos más bloques (Ubicación, Formulario), los uniremos aquí:
export const AnyBlockSchema = z.discriminatedUnion('_type', [
  HeroBlockSchema,
  CoverBlockSchema,
]);

export type AnyBlockData = z.infer<typeof AnyBlockSchema>;
