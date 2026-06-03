# Guía para Colaboradores (Contributing Guide)

¡Gracias por querer colaborar en **Smart Fest**! Nos emociona construir una plataforma modular, estética y escalable para invitaciones inteligentes.

Para mantener la calidad y consistencia del código, sigue las siguientes directrices y reglas del proyecto.

---

## 🏗️ Flujo de Desarrollo de Nuevos Bloques (Legos)

Smart Fest utiliza **Configuration-Driven UI**. Si quieres agregar una nueva sección (ej. un mapa de ubicación, formulario RSVP, mesa de regalos, etc.), debes seguir estos **4 pasos**:

### Paso 1: Definir el Esquema de Validación y Tipos
Abre [src/types/blocks.ts](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/types/blocks.ts) y:
1.  Define el esquema Zod para tu nuevo bloque. El campo `_type` es obligatorio y debe ser un literal único.
2.  Extrae el tipo TypeScript con `z.infer`.
3.  Agrega tu esquema a la unión discriminada `AnyBlockSchema`.

*Ejemplo:*
```typescript
export const RsvpBlockSchema = z.object({
  _type: z.literal('rsvpBlock'),
  title: z.string(),
  deadline: z.string(),
});

export type RsvpBlockData = z.infer<typeof RsvpBlockSchema>;

// En AnyBlockSchema agregar:
export const AnyBlockSchema = z.discriminatedUnion('_type', [
  CoverBlockSchema,
  StoryBlockSchema,
  RsvpBlockSchema, // <-- Agregado aquí
]);
```

### Paso 2: Crear el Componente Visual (React)
Crea tu archivo en la carpeta `src/blocks/` (ej. `src/blocks/RsvpBlock.tsx`):
*   Debe ser un componente puro que reciba la data del bloque como props.
*   Debe ser responsivo (móviles, tabletas, laptops).
*   **Regla de Pantalla Completa:** Añade las clases `h-screen w-full snap-start` a la sección principal de tu componente para asegurar que encuadre perfectamente en el flujo de scrolling.

### Paso 3: Registrar el Bloque en el Renderizador Dinámico
Abre [src/app/page.tsx](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/app/page.tsx) e integra tu nuevo componente en el enrutador dinámico (`switch`):
```typescript
case 'rsvpBlock':
  return <RsvpBlock key={index} {...block} />;
```

### Paso 4: Añadir la Configuración en los Mocks
Abre [src/mocks/invitation.json](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/mocks/invitation.json) y añade el objeto de configuración correspondiente a tu bloque en el arreglo `"blocks"` para probarlo.

---

## 🎨 Consistencia de Estilo (Tailwind CSS v4)

Para garantizar la armonía estética de la plantilla "Organic Elegance", utiliza únicamente las variables de tema configuradas en [globals.css](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/app/globals.css):
*   **Fondos:** `bg-potatoes` (Mashed potatoes cálido).
*   **Textos Destacados:** `text-cranberry` (Rojo arándano).
*   **Textos de Alto Contraste:** `text-greenbean` (Verde oscuro forestal).
*   **Bordes o Textos Secundarios:** `border-artichoke` o `text-artichoke` (Verde alcachofa).
*   **Acentos y Capas Profundas:** `bg-cabernet` o `bg-mulledwine` (Vino/Mulled wine).
*   **Tipografía:** Usa `font-serif` para títulos/manuscritos elegantes y `font-sans` para lecturas de cuerpo o etiquetas de UI.

---

## 🌿 Flujo de Trabajo en Git

1.  **Ramas (Branches):**
    *   Para nuevas características: `feature/nombre-de-la-tarea` (ej. `feature/rsvp-block`).
    *   Para errores o parches: `bugfix/nombre-del-error` (ej. `bugfix/scroll-ios`).
2.  **Mensajes de Commit (Conventional Commits):**
    Intentamos mantener los mensajes estructurados para facilitar la lectura del historial:
    *   `feat: ...` para nuevas funcionalidades.
    *   `fix: ...` para corrección de errores.
    *   `docs: ...` para cambios en documentación.
    *   `style: ...` para cambios de diseño y estilos que no afecten lógica.
3.  **Pull Requests:**
    *   Asegúrate de ejecutar `npm run build` en tu entorno local antes de subir tus cambios para garantizar que todo compila exitosamente.
