# Guía de Estilos y Sistema de Diseño: Organic Elegance

Este documento establece las directrices visuales, paleta de colores, tipografías y reglas estéticas para las invitaciones del proyecto **Smart-Fest**. Todas las implementaciones y bloques futuros deben seguir esta guía para asegurar una experiencia de usuario coherente, sofisticada y premium.

---

## 🎨 Paleta de Colores

La paleta se aleja de los neutros digitales puros (blanco/negro estéril) y adopta tonos inspirados en elementos botánicos y orgánicos:

| Nombre | Color Hex | Uso Principal |
| :--- | :--- | :--- |
| **Mashed Potatoes** | `#FFF2E6` | Fondo claro principal, textos sobre fondos oscuros, paspartús. |
| **Artichoke** | `#586357` | Bordes sutiles (20% opacidad), iconos secundarios y textos de apoyo. |
| **Green Bean** | `#052102` | Textos primarios de alta legibilidad sobre fondos claros. |
| **Cranberry** | `#734141` | Acentuación romántica, tags, elementos interactivos (hover). |
| **Cabernet** | `#3D0000` | Overlays de video/fotos de fondo, fondos oscuros e interactivos destacados. |
| **Mulled Wine** | `#280D08` | Sombras, degradados inferiores y capas de profundidad extrema. |

---

## ✍️ Tipografía

Se establece una jerarquía tipográfica contrastada entre una fuente Serif de gran elegancia y una Sans-Serif moderna y altamente legible:

### 1. Serif: **Playfair Display**
*   **Uso:** Títulos principales (`h1`, `h2`), nombres de los novios, leyendas de portada.
*   **Estilo:** Itálica en la última palabra del título para dar un toque editorial.
*   **Variable CSS:** `var(--font-playfair)`

### 2. Sans-Serif: **Plus Jakarta Sans**
*   **Uso:** Cuerpo de texto, detalles del evento (ubicación, fecha), etiquetas y botones.
*   **Estilo:** En etiquetas y subtextos, se prefiere usar mayúsculas (`uppercase`) con tracking espaciado (`tracking-[0.3em]`) para mantener la sofisticación.
*   **Variable CSS:** `var(--font-plus-jakarta)`

---

## ✨ Componentes y Capas Visuales

### 1. Efecto Cristal Templado (`.glass-dark` y `.glass-crystalline`)
Tarjetas translúcidas que permiten vislumbrar la imagen de fondo con acabado de vidrio pulido y bisel de luz:
*   **`.glass-dark` (Cristal Oscuro Cabernet):**
    *   Fondo: `rgba(61, 0, 0, 0.40)` (`bg-cabernet/40`)
    *   Desenfoque: `backdrop-filter: blur(24px)` (`backdrop-blur-xl`)
    *   Boleamiento / Bisel: `border: 1px solid rgba(255, 242, 230, 0.30)` (`border-potatoes/30`)
*   **`.glass-crystalline` (Cristal Claro Cristalino - 30% Opacidad):**
    *   Fondo: `rgba(255, 255, 255, 0.30)` (`bg-white/30` - sin densidad de porcelana)
    *   Desenfoque: `backdrop-filter: blur(12px)` (`backdrop-blur-md`)
    *   Bisel de Luz: `border: 1px solid rgba(255, 255, 255, 0.45)` con reflejo especular en los bordes.
*   **`.glass-botanical-dark` (Cristal Verde Botánico Oscuro):**
    *   Fondo: `rgba(29, 38, 28, 0.65)` (Verde Artichoke/Greenbean oscurecido)
    *   Desenfoque: `backdrop-filter: blur(14px)` (`backdrop-blur-md`)
    *   Bisel de Luz: `border: 1px solid rgba(255, 242, 230, 0.35)` con destello Mashed Potatoes.
    *   Tipografía asociada: `text-potatoes` (`#FFF2E6`) radiante para 100% de contraste nítido.

### 2. Overlays de Fondo (`.hero-overlay`)
Utilizado para oscurecer videos e imágenes cinematográficas en portadas, permitiendo que la tipografía de color *Mashed Potatoes* destaque:
*   **Degradado:** De `rgba(115, 65, 65, 0.15)` (Cranberry) en la parte superior a `rgba(88, 99, 87, 0.25)` (Artichoke) o `rgba(61, 0, 0, 0.65)` (Cabernet) en la inferior.

### 3. Marcos Perimetrales (Paspartú)
Para evocar una invitación física impresa, los bloques principales deben estar contenidos dentro de un marco sutil:
*   **Estilo:** `border border-potatoes/20` o `border-artichoke/20` con un espaciado (`padding`) generoso.

### 4. Patrón "Combo Editorial" (Legibilidad en Bloques Oscuros/Planos)
Para garantizar una homogeneidad visual y legibilidad impecable en bloques que usan texto flotante sobre imágenes fotográficas oscurecidas (como `ParentsBlock` y `DressAndGiftsBlock`), se DEBE implementar el siguiente patrón estricto sin usar tarjetas (cards):
1. **Spotlight Base:** Incluir siempre un div de sombra difuminada detrás del contenedor de texto flex central:
   `<div className="absolute inset-0 bg-black/45 blur-[80px] -z-10 rounded-[100%] scale-[1.3] md:scale-[1.8] pointer-events-none" />`
2. **Opacidad Nula:** Está PROHIBIDO usar transparencias medias en textos (ej. `text-potatoes/60`). Todo el texto principal debe ser cercano al 100% opaco (`text-potatoes`).
3. **Sombras Pesadas:** 
   - Títulos principales (Serif): `drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]`
   - Textos secundarios y leyendas (Sans): `drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]` o `drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]`
4. **Pesos Tipográficos:** Reforzar las fuentes secundarias con `font-medium` o `font-bold` para combatir el fondo visual y mantener solidez cromática.

---

## 🎬 Multimedia e Interacciones

*   **Video de Portada:** Debe reproducirse en bucle (`loop`), de forma automática (`autoPlay`), estar silenciado (`muted`) y tener habilitada la reproducción interna (`playsInline`) para evitar bloqueos del navegador en iOS y Android.
*   **Controles Musicales:** Flotantes en la esquina superior derecha (`fixed top-6 right-6`). Deben tener controles mínimos (retroceder, pausar/reproducir, adelantar) y un indicador visual de progreso usando la paleta de colores correspondiente (`cranberry/potatoes`).
