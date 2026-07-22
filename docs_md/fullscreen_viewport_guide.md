# Guía de Arquitectura: Patrón de Viewport de Pantalla Completa (Full-Screen Viewport Pattern)

Este documento establece el estándar técnico y la arquitectura de diseño para la renderización de bloques a pantalla completa en la plataforma **Smart-Fest**. Su objetivo es garantizar que la portada y las secciones principales abarquen el 100% del área visible en cualquier dispositivo (móvil y escritorio), eliminando huecos blancos, recortes de botones y saltos visuales en navegadores móviles.

---

## 🎯 El Problema del Viewport Móvil (`100vh`)

En navegadores móviles (como Google Chrome o Samsung Internet en Android, y Safari en iOS), la altura de la ventana cambia dinámicamente según la visibilidad de las barras de navegación (barra de URL superior y barra de herramientas inferior).

* **El problema de `100vh`:** La unidad tradicional `100vh` calcula la altura máxima posible (cuando las barras de navegación están colapsadas/ocultas). Cuando el usuario entra por primera vez a la invitación y las barras están **visibles**, `100vh` sobrepasa la pantalla real, provocando:
  1. Recorte o desbordamiento de los elementos situados en la parte inferior (como el botón *"Presione para abrir"* o las tarjetas de la cita bíblica).
  2. Aparecimiento de barras de desplazamiento vertical no deseadas en bloques que deberían ser fijos.
  3. Destellos blancos o saltos bruscos cuando el navegador intenta recalcular el alto durante el scroll.

---

## 🛠️ Reglas del Patrón de Arquitectura

Para solucionar este problema de forma consistente y declarativa en todos los bloques modularizados de la invitación, se aplican 4 reglas de oro:

### 1. Uso de Unidades de Viewport Dinámicas (`h-screen h-[100dvh]`)
Cada bloque que requiera ocupar la totalidad de la pantalla debe declarar en su elemento `<section>` raíz la combinación de clases:

```tsx
<section 
  className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center overflow-hidden select-none bg-black"
>
```

* **`h-screen`:** Funciona como *fallback* para navegadores antiguos que no soportan la especificación de viewport dinámico.
* **`h-[100dvh]`:** *(Dynamic Viewport Height)* Recalcula en tiempo real la altura exactamente visible entre las barras de la interfaz móvil, asegurando un encuadre perfecto.

---

### 2. Jerarquía de Layout y Eliminación de `bg-white` Invasivo
Para evitar que se vean bordes blancos o destellos en transiciones de scroll o durante la contracción de la interfaz del navegador:

1. **`html` y `body`:** Heredan el fondo orgánico del sistema de diseño (`var(--background)` / `#FFF2E6` *Mashed Potatoes*).
2. **Contenedor Raíz `<main>` ([page.tsx](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/app/page.tsx)):**
   ```tsx
   <main className="min-h-screen min-h-[100dvh] relative">
   ```
   **Importante:** Se prohíbe el uso de la clase `bg-white` en la etiqueta `<main>`. De esta forma, si existe algún micro-desfase de subpíxel al deslizar en móviles, se expondrá el color crema del tema y no un fondo blanco contrastante.

---

### 3. Contención de Elementos Fijos (`CSS Transform Containing Block`)
Cuando un widget o componente flotante (como [MusicWidget.tsx](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/components/MusicWidget.tsx)) utiliza internamente posicionamiento fijo (`position: fixed`) y se requiere que pertenezca **exclusivamente a un bloque** (ej. la portada) sin flotar sobre el resto de la invitación:

* Se aplica la clase de transformación `transform translate-x-0` a la `<section>` contenedora del bloque.
* **Especificación W3C CSS:** Un elemento con una propiedad `transform` distinta de `none` crea un nuevo *contenedor de bloque* local (*containing block*). Esto obliga a los elementos hijos con `position: fixed` a comportarse como `position: absolute` respecto a esa sección.

```tsx
/* Ejemplo en CoverBlock.tsx */
<section className="relative w-full h-screen h-[100dvh] ... transform translate-x-0">
  {/* MusicWidget usará la sección como referencia y subirá con el scroll */}
  {musicUrl && <MusicWidget url={musicUrl} autoplay={musicAutoplay} />}
</section>
```

---

### 4. Preservación del Brillo y Fotografía
Para mantener la calidad visual y calidez de las fotografías de fondo (como `/images/foto_novios.avif`):

* Los elementos de fondo se posicionan con `absolute inset-0 z-0 w-full h-full object-cover`.
* **Regla de Degradados (*Overlays*):** Queda prohibido aplicar overlays oscuros densos (ej. `bg-black/70`). Se debe priorizar el brillo original de la toma, utilizando únicamente sombras tenues en la parte superior si la legibilidad del texto lo exige:
  ```tsx
  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent pointer-events-none" />
  ```

---

## 📋 Lista de Chequeo para Nuevos Bloques

Al construir un nuevo bloque para la invitación (ejemplo: Ubicación, Formulario RSVP, Cuenta Regresiva), verifica el cumplimiento de esta lista:

- [ ] La etiqueta raíz es un `<section>` con las clases `w-full h-screen h-[100dvh] flex flex-col justify-between items-center overflow-hidden`.
- [ ] Las imágenes o videos de fondo usan `object-cover` y conservan su luminosidad natural.
- [ ] Los contenedores internos emplean `flex-grow` para mantener un espacio respirable (*whitespace*) en el centro.
- [ ] No se agregan fondos blancos rígidos (`bg-white`) en los contenedores principales.
- [ ] El bloque se probó en vista móvil emulada con la barra de navegación activa.
