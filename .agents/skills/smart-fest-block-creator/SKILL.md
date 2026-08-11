---
name: smart-fest-block-creator
description: Estándar y guía obligatoria para crear y modificar bloques modulares (piezas de Lego) en Smart-Fest. Garantiza el cumplimiento del patrón de Viewport Dinámico (100dvh), el sistema de diseño Glassmorphism y la arquitectura Configuration-Driven UI (CDUI).
---

# Guía Estándar para la Creación de Bloques en Smart-Fest

Este documento establece las reglas técnicas y estéticas obligatorias para construir cualquier bloque modular (piezas de Lego) en el proyecto **Smart-Fest**. Todo bloque debe seguir esta estructura para evitar inconsistencias de diseño, saltos visuales en móviles y alucinaciones en el código.

---

## 📌 Punto 1: Patrón de Viewport Dinámico Obligatorio (`100dvh`)

### El Problema
En navegadores móviles (Safari iOS, Chrome/Samsung Internet Android), la altura `100vh` calcula la pantalla considerando la barra de navegación oculta. Cuando el usuario entra y las barras de URL/herramientas están **visibles**, `100vh` sobrepasa la pantalla real, provocando:
1. Botones y elementos inferiores tapados o cortados.
2. Barras de scroll vertical no deseadas en bloques fijos.
3. Desplazamientos y saltos visuales bruscos al deslizar.

### 🛡️ Regla Inamovible: Esqueleto Raíz del Bloque
Cada bloque que sea una sección principal debe utilizar **exactamente** la siguiente configuración en su etiqueta `<section>` raíz:

```tsx
<section
  id={id}
  className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center px-4 py-6 md:py-10 text-center select-none bg-black text-potatoes overflow-hidden transform translate-x-0"
>
```

#### Desglose de Clases Críticas:
* **`w-full`**: Ocupa el 100% del ancho del viewport.
* **`h-screen`**: Fallback para navegadores antiguos que no soportan unidades dinámicas.
* **`h-[100dvh]`**: *(Dynamic Viewport Height)* Recalcula en tiempo real el área exactamente visible entre las barras de la interfaz móvil.
* **`flex flex-col justify-between items-center`**: Mantiene la estructura tripartita del bloque (Header superior, Main central flotante con `my-auto`, Footer inferior).
* **`overflow-hidden`**: Evita cualquier desbordamiento de contenido o imágenes que genere scroll interno involuntario.
* **`transform translate-x-0`**: Crea un *Containing Block* local (especificación W3C CSS) para que cualquier elemento hijo con `position: fixed` o `absolute` se acote strictly a esta sección.
* **`select-none`**: Evita la selección accidental de texto al hacer swipe/scroll en dispositivos táctiles.

---

## 🎨 Punto 2: Capas de Fondo y Velos Estandarizados

### 1. Imágenes y Videos de Fondo
Cualquier media de fondo debe posicionarse de la siguiente manera:
```tsx
<div className="absolute inset-0 z-0 overflow-hidden">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src={bgImage}
    alt="Descripción del fondo"
    className="w-full h-full object-cover origin-center scale-105"
  />
  {/* Velo Botánico Oscuro Oficial */}
  <div className="absolute inset-0 glass-botanical-dark" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
</div>
```

### 2. Prohibiciones de Fondo
- ❌ **Prohibido usar `bg-white`** en el contenedor `<main>` o en la sección principal.
- ❌ **Prohibido aplicar overlays oscuros planos y densos** (ej. `bg-black/80`) que apaguen la fotografía de fondo.

---

## 💎 Punto 3: Estética de Tarjetas de Cristal Editorial (*Slim Glass Design*)

Queda **estrictamente prohibido** usar estilos de cristal abultados o "regordetes" (`rounded-3xl`, cápsulas gruesas anidadas, rellenos pesados).

### Reglas de Estilización para Tarjetas Internas:
1. **Geometría Paspartú (`rounded-2xl`)**:
   - Usar curvaturas elegantes `rounded-2xl` con bordes ultrafinos `border border-potatoes/20` o `border-white/15`. Evitar `rounded-3xl` que genera apariencia de burbuja o botón de app informal.
2. **Iconografía Etérea de Línea Fina**:
   - Usar iconos SVG flotantes con trazo fino (`strokeWidth={1.0}`) sin envoltorios o badges circulares pesados.
3. **Composición Tipográfica sin Cápsulas Anidadas**:
   - Reemplazar badges tipo cápsula (`bg-potatoes/10 rounded-full`) por divisores de hilo en degradado (`h-[1px] bg-gradient-to-r from-transparent via-potatoes/35 to-transparent`) y tipografía con espaciado amplio (`tracking-[0.25em] font-sans`).
4. **Botón "Ghost" de Cristal**:
   - Usar botones de cristal sutil (`bg-potatoes/[0.08] hover:bg-potatoes hover:text-black border border-potatoes/30 tracking-[0.25em]`).

### Clases CSS Oficiales (`src/app/globals.css`)

| Clase CSS | Uso |
| :--- | :--- |
| **`.glass-botanical-dark`** | Velo principal de fondo botánico oscuro con desenfoque de 14px y bisel `potatoes/35`. |
| **`.glass-crystalline`** | Tarjetas claras de contenido (30% de opacidad cristalina con desenfoque y bisel especular). |
| **`.glass-dark`** | Tarjetas oscuras tono Cabernet (40% de opacidad con desenfoque de 24px). |

---

## ✍️ Punto 4: Jerarquía Tipográfica y Estilo Editorial

### 1. Títulos Principales (`h1`, `h2`)
- **Fuente**: `font-serif` ([Playfair Display](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/app/globals.css#L10)).
- **Estilo Editorial**: Aplica itálica (`italic font-normal font-serif text-potatoes`) a la última palabra del título cuando contenga más de una palabra.

### 2. Subtítulos y Labels Superiores
- **Fuente**: `font-sans` ([Plus Jakarta Sans](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/app/globals.css#L9)).
- **Estilo**: Mayúsculas con espaciado amplio: `text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-potatoes/70`.

---

## 🗺️ Punto 5: Enlaces Universales de Navegación (GPS)

### Principio de Acción Única
- ❌ **No crear múltiples botones por aplicación** (ej. botones independientes para Google Maps, Waze, Apple Maps).
- ✅ **Usar un único botón destacado "Cómo llegar"** que apunte a una URL universal de navegación (`mapsUrl`).

### Mecanismo NATIVO del Sistema Operativo (Intent Filters)
Al usar el formato universal de Google Maps Direction API:
`https://www.google.com/maps/dir/?api=1&destination=UBICACION_O_DIRECCION`

- **En Android**: El sistema operativo intercepta la URL y despliega automáticamente la ventana emergente nativa del teléfono: *"Abrir con: Google Maps / Waze / Uber"*.
- **En iOS (iPhone)** y **Desktop**: Redirige limpiamente a las direcciones del mapa sin romper la experiencia del usuario.

---

## 🔄 Punto 6: Flujo Completo de Integración CDUI

Cuando crees un nuevo bloque en el sistema, debes completar estos 4 pasos obligatorios:

1. **Definir el Esquema Zod** en [`src/types/blocks.ts`](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/types/blocks.ts).
2. **Crear el Componente React** en `src/blocks/MyNewBlock.tsx` siguiendo el esqueleto dinámico de este documento.
3. **Registrar el Bloque en el Motor de Renderizado** en [`src/app/page.tsx`](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/app/page.tsx).
4. **Añadir el Bloque de Prueba** en [`src/mocks/invitation.json`](file:///e:/Proyectos_Utilitarios/smart-fest/smart-fest/src/mocks/invitation.json).

---

## ✅ Checklist de Validación Final antes de Entregar un Bloque

- [ ] La etiqueta raíz es un `<section>` con `w-full h-screen h-[100dvh] flex flex-col justify-between items-center overflow-hidden transform translate-x-0`.
- [ ] Las tarjetas internas usan geometría paspartú `rounded-2xl` y bisel delgado `border border-potatoes/20`.
- [ ] No existen tarjetas abultadas (`rounded-3xl`) ni cápsulas gruesas anidadas.
- [ ] Los botones usan el estilo "Ghost" de cristal etéreo (`bg-potatoes/[0.08]` con `tracking-[0.25em]`).
- [ ] El título principal aplica el estilo itálico en la última palabra.
- [ ] El esquema Zod y el registro en `page.tsx` y `invitation.json` están completos.
