import { z } from 'zod';

// 1. Definimos el esquema para el bloque de Portada (Cover)
export const CoverBlockSchema = z.object({
  _type: z.literal('coverBlock'),
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().url().optional(),
  scrollLabel: z.string().optional(), // Ej: "Deslice para abrir"
  music: z.object({
    url: z.string(),
    autoplay: z.boolean().optional(),
  }).optional(),
});

export type CoverBlockData = z.infer<typeof CoverBlockSchema>;

// 2. Definimos el esquema para el bloque de Historia (Story)
export const StoryBlockSchema = z.object({
  _type: z.literal('storyBlock'),
  label: z.string().optional(), // Ej: "Nuestra Historia"
  date: z.string(), // La fecha del evento
  location: z.string(), // Lugar del evento
  backgroundImage: z.string().url().optional(), // URL de la foto de los novios
});

export type StoryBlockData = z.infer<typeof StoryBlockSchema>;

// Conforme agreguemos más bloques (Ubicación, Formulario), los uniremos aquí:
export const AnyBlockSchema = z.discriminatedUnion('_type', [
  CoverBlockSchema,
  StoryBlockSchema,
]);

export type AnyBlockData = z.infer<typeof AnyBlockSchema>;
