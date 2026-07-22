# Reglas del Sistema de Diseño: Estilo, Layout y Snapping (Smart Fest)

Esta documentación define las directrices de interfaz de usuario (UI) y experiencia de usuario (UX) que todo agente de Inteligencia Artificial debe seguir estrictamente al desarrollar o modificar elementos visuales en **Smart Fest**.

---

## 1. Sistema de Diseño Visual y Tematización

La arquitectura está diseñada para soportar **múltiples estilos visuales**. No se debe asumir un único diseño estático o un único contexto temático (como bodas).
*   **Temas Flexibles:** Las variables de colores y tipografías deben ser capaces de adaptarse a los requerimientos del JSON configurado.
*   **Variables CSS Semánticas:** Los componentes deben preferir el uso de variables CSS semánticas (ej: `--background`, `--foreground`) configuradas en [globals.css](../../src/app/globals.css) en lugar de valores hexadecimales hardcodeados. Esto facilita la tematización instantánea.

### Configuración del Tema de Demostración (Organic Elegance)
Como caso de uso preconfigurado, el proyecto incluye un estilo demo en el archivo [globals.css](../../src/app/globals.css) con las siguientes variables:
*   `potatoes` ("Mashed Potatoes"): `#fff2e6` (Fondo cálido, crema).
*   `cranberry` ("Cranberry"): `#734141` (Rojo arándano, acentos y textos principales).
*   `artichoke` ("Artichoke"): `#586357` (Verde alcachofa, bordes y textos secundarios).
*   `greenbean` ("Green Bean"): `#052102` (Verde oscuro para textos de máximo contraste).
*   `cabernet` ("Cabernet"): `#3D0000` (Rojo vino oscuro).
*   `mulledwine` ("Mulled Wine"): `#280D08` (Rojo oscuro terroso para degradados).
*   **Tipografía:** `font-serif` (mapeada a *Playfair Display* para títulos) y `font-sans` (mapeada a *Manrope* para cuerpo de texto).

---

## 2. Reglas de Layout y Scroll Snapping

Para lograr una presentación inmersiva y de pantalla completa de cada sección:

1.  **Alto de Pantalla:** Cada sección raíz de un bloque debe abarcar exactamente `h-screen w-full` y contener la clase `snap-start`.
2.  **Scroll Snapping Mandatorio:** El contenedor principal `<main>` de la aplicación gestiona el snap de CSS:
    `className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white relative"`
    *Nota:* Ningún bloque de desarrollo individual debe alterar la directiva del contenedor `<main>`.

---

## 3. Reglas de Transiciones y Scroll Automático

*   **Prohibición de `scrollIntoView`:** Queda prohibido el uso del método del DOM `nextSection.scrollIntoView({ behavior: 'smooth' })` para programar saltos de scroll automáticos. Este método causa saltos instantáneos o abruptos que interfieren con la configuración `snap-mandatory` de CSS en múltiples navegadores.
*   **Solución Autorizada:** Para deslizar la pantalla de forma sutil, continua e imitando la rueda del ratón, se debe calcular la distancia del bloque destino y desplazar programáticamente al contenedor principal usando `scrollTo` en el contenedor padre:
    ```typescript
    const parentContainer = currentSection?.parentElement;
    if (nextSection && parentContainer) {
      parentContainer.scrollTo({
        top: nextSection.offsetTop,
        behavior: 'smooth',
      });
    }
    ```

---

## 4. Reglas de Posicionamiento de Widgets Flotantes

*   Cualquier widget dinámico (como reproductores de audio, barras de progreso, etc.) **no debe flotar sobre toda la aplicación de manera global (`fixed`)** a menos que se solicite explícitamente.
*   Deben estar anclados de manera local utilizando posicionamiento **`absolute`** dentro del bloque donde corresponden (ej: en [CoverBlock.tsx](../../src/blocks/CoverBlock.tsx)), asegurando que la sección padre tenga la clase `relative`. Esto garantiza que los widgets suban y dejen de verse de forma fluida junto con su sección cuando el usuario hace scroll hacia abajo.
