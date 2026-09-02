# Reglas de Viewport Dinámico y Optimización Móvil (Smart-Fest)

Esta documentación define la arquitectura para garantizar encuadre perfecto a pantalla completa en dispositivos móviles y de escritorio.

---

## 1. El Problema del Viewport Móvil (`100vh`)

En navegadores móviles (Chrome, Safari, Samsung Internet), la altura de la ventana cambia cuando las barras de navegación colapsan o se expanden. La unidad tradicional `100vh` sobrepasa la pantalla real, causando:
1. Recorte de botones y elementos inferiores.
2. Barras de scroll no deseadas.
3. Destellos blancos o saltos al deslizar.

---

## 2. Reglas Obligatorias de Viewport

### A. Uso Mandatorio de `100dvh`
Todo bloque que deba ocupar la pantalla completa debe declarar en su `<section>` raíz:
```tsx
<section className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center overflow-hidden select-none">
```
- `h-screen`: Fallback para navegadores antiguos.
- `h-[100dvh]`: Ajuste dinámico en tiempo real entre las barras móviles.

### B. Contención de Elementos Fijos (`Containing Block`)
Cuando un widget flotante (como `MusicWidget.tsx`) use `position: fixed` pero deba pertenecer exclusivamente a un bloque sin invadir el resto de la página:
- Se añade `transform translate-x-0` a la `<section>` raíz.
- Por especificación W3C CSS, una propiedad `transform` convierte a la sección en el *containing block* local de los elementos hijos.

### C. Prohibición de `bg-white` en Contenedores Raíz
El contenedor `<main>` debe usar `min-h-screen min-h-[100dvh] relative` sin clases de fondo blanco duro, permitiendo que se vea el tono orgánico del tema (`--background`) ante cualquier subpíxel de movimiento.

### D. Ergonomía Táctil Móvil
- **Objetivos táctiles mínimos:** 44px de altura/ancho en botones interactivos.
- **Action Sheets en lugar de popups flotantes:** En pantallas móviles (`< sm`), los menús contextuales (`⋯`) deben desplegarse como láminas inferiores con backdrop oscuro y botones grandes.
