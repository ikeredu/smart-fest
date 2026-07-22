# Reglas de Arquitectura: CDUI y Legos (Smart Fest)

Esta documentación define las directrices arquitectónicas que todo agente de Inteligencia Artificial debe seguir estrictamente al interactuar o extender la base del código de **Smart Fest**.

---

## 1. Filosofía del Patrón CDUI (Configuration-Driven UI)

En Smart Fest, **ningún componente de bloque debe contener datos estáticos o contenido del evento hardcodeado**. Toda la interfaz se genera a partir de la configuración definida en el JSON de mocks ([invitation.json](../../src/mocks/invitation.json)).
*   Los datos fluyen jerárquicamente desde el JSON a través de un enrutador dinámico.
*   Los bloques deben actuar puramente como "vistas" o "presentadores" acoplados a las propiedades que reciben.

---

## 2. Flujo Obligatorio para Añadir un Nuevo Bloque (Lego)

Cuando se solicite o sea necesario implementar un nuevo bloque visual en la invitación, el agente de IA **debe seguir estos pasos en orden estricto**:

### Paso A: Definición y Validación de Esquema (Zod)
1.  Abre [blocks.ts](../../src/types/blocks.ts).
2.  Define un esquema de validación Zod con el sufijo `BlockSchema`.
3.  El esquema **debe contener obligatoriamente** el campo `_type` como un literal de tipo `z.literal('nombreDelBloque')`.
4.  Infiere el tipo de datos TypeScript con el sufijo `BlockData` usando `z.infer`.
5.  Agrega el esquema a la unión discriminada `AnyBlockSchema`.

*Ejemplo:*
```typescript
export const MapBlockSchema = z.object({
  _type: z.literal('mapBlock'),
  title: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type MapBlockData = z.infer<typeof MapBlockSchema>;

// En AnyBlockSchema:
export const AnyBlockSchema = z.discriminatedUnion('_type', [
  CoverBlockSchema,
  EventDetailsBlockSchema,
  MapBlockSchema, // <-- Incluir aquí
]);
```

### Paso B: Creación del Componente de Bloque
1.  Crea el componente visual bajo la carpeta [src/blocks/](../../src/blocks/) (ej: `MapBlock.tsx`).
2.  Importa el tipo de datos correspondiente (ej: `MapBlockData`).
3.  El componente debe recibir las propiedades tipadas de forma destructurada.
4.  Agrega la directiva `'use client';` al inicio del archivo únicamente si el bloque requiere interactividad del cliente (hooks como `useState`, `useEffect`, etc.).
5.  **Estructura del Contenedor:** El contenedor raíz (`<section>`) debe ocupar el alto de pantalla completo y alinearse con scroll snapping.
    ```tsx
    return (
      <section className="relative w-full h-screen snap-start overflow-hidden">
        {/* Contenido */}
      </section>
    );
    ```

### Paso C: Registro en el Enrutador Dinámico
1.  Abre [page.tsx](../../src/app/page.tsx).
2.  Importa el nuevo componente de bloque.
3.  Añade el caso correspondiente dentro del switch de renderizado:
    ```typescript
    case 'mapBlock':
      return <MapBlock key={index} {...block} />;
    ```

### Paso D: Pruebas de Configuración
1.  Abre [invitation.json](../../src/mocks/invitation.json).
2.  Inserta la configuración del nuevo bloque respetando la firma tipada de su esquema Zod.

---

## 3. Principio de Limpieza de Tipos
Si un bloque o componente es descartado o eliminado de la interfaz, el agente de IA **debe**:
1.  Eliminar físicamente el archivo del componente.
2.  Borrar sus definiciones de esquema y tipos de Zod en `blocks.ts`.
3.  Remover su importación y caso de renderizado en `page.tsx`.
4.  Ejecutar `npm run build` para certificar que no quedan referencias rotas en el código.
