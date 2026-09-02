# Reglas del Sistema de Diseño y Glassmorphism (Smart-Fest)

Esta documentación define las directrices visuales, tokens de estilo y normas de interfaz que todo agente de IA debe cumplir en **Smart-Fest**.

---

## 1. Filosofía Visual: Glassmorphism Slim & Editorial

Smart-Fest combina **elegancia editorial y modernidad traslúcida**:
- **Slim Glassmorphism:** Superficies de cristal fino con desenfoque (`backdrop-blur-sm` / `backdrop-blur-xs`), bordes tenues (`border-slate-200/80 dark:border-slate-800/80`) y sombras suaves (`shadow-xs` / `shadow-sm`).
- **Prohibición de Cards Chunky / Burbujas Gruesas:** Quedan prohibidas las cajas infladas con bordes toscos o tarjetas dentro de tarjetas.
- **Principio de Intencionalidad Geométrica (Anti-Regordete):**
  - **Eje de Intención Definido:** Si un elemento es vertical (menús, popovers, drawers), debe ser marcadamente vertical y esbelto (anchuras contenidas como `w-60` o `w-64`, con ritmo estilizado). Si un elemento o control es horizontal (filas, selectores segmentados, tiras de acciones), debe ser una franja horizontal fina y nítida (`h-7`, `h-8`, padding vertical mínimo).
  - **Estándar de Tarjetas (Dashboard Cards):** Las tarjetas maestras (eventos, banners de bienvenida) deben usar bordes arquitectónicos `rounded-xl` (12px) en lugar de esquinas bulbosas `rounded-2xl`, con acolchados contenidos (`p-4 sm:p-5`) y metadatos en una sola línea fluida, erradicando cajas pesadas inertes.
  - **Divisores Sutiles de Línea vs. Puntos:** En metadatos continuos, barras de herramientas y grupos de acciones, se prohíbe el uso de puntos tipográficos (`•`); se debe emplear micro-líneas verticales sutiles (`h-2.5` a `h-3 w-px bg-slate-300/80 dark:bg-slate-700/80`) para lograr un acabado arquitectónico y de alta precisión.
  - Quedan prohibidos los bloques amorfos con proporciones casi cuadradas (~1:1), rellenos desmedidos (*padding fat*) o botones sobredimensionados que parezcan almohadas infladas.
- **Tipografía Editorial:**
  - Títulos principales: `font-serif` (Playfair Display) con toques cursivos para acentos poéticos.
  - Textos de lectura y datos: `font-sans` (Plus Jakarta Sans / Manrope) limpios y legibles.
  - Nombres Propios en Title Case Canónico: Todo nombre de persona (anfitrión, usuario o invitado) debe renderizarse obligatoriamente con la primera letra de cada palabra en mayúscula sostenida (`formatPersonName`), respetando tildes y caracteres en español (ej. `"Iker Méndez"`). Queda prohibido mostrar nombres en minúsculas directas o mayúsculas sostenidas en banners, menús o listas.
  - Etiquetas y códigos: `font-mono text-xs uppercase tracking-wider`.

---

## 2. Paleta Semántica y Modo Claro / Oscuro

Los componentes deben preferir variables CSS semánticas definidas en `src/app/globals.css`:
- `--background` / `--foreground`: Colores base del lienzo.
- `--bg-card`: Color de fondo de tarjetas y superficies modales.
- `--bg-input`: Fondo de campos de formulario.
- `--text-main`: Texto principal de alto contraste.
- `--text-muted`: Texto secundario / metadatos.

### Colores de Estado Semántico:
- 🟢 **Confirmado / Éxito:** Esmeralda (`bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30`).
- 🟡 **Pendiente / Advertencia:** Ámbar (`bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30`).
- 🔴 **No asistirá / Destructivo:** Rosa/Rojo (`bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30`).

---

## 3. Iconografía del Dashboard SaaS (Estándar `lucide-react`)

> [!IMPORTANT]
> **En todo el Panel de Control SaaS, la iconografía debe implementarse obligatoriamente con `lucide-react`.** Queda prohibido copiar SVGs inline crudos, usar entidades HTML (`&rarr;`) o incrustar emojis para botones y acciones operativas.

### Especificaciones de Escala y Estilo:
- **Microacciones y Metadatos:** `w-3.5 h-3.5` (ej. fechas en `<Calendar />`, acciones en `<Pencil />`, `<Link2 />`, `<Check />`).
- **Botones y Modales:** `w-3.5 h-3.5` o `w-4 h-4` (ej. `<Plus />` en creación de eventos, `<X />` en cierre de modal).
- **Popovers y Menús Desplegables:** `w-3 h-3` a `w-3.5 h-3.5` (ej. `<Sun />`, `<Moon />`, `<Monitor />`, `<LayoutGrid />`, `<LogOut />`).
- **Estados Vacíos (Empty States):** `w-6 h-6` (ej. `<Sparkles />` dentro de contenedores circulares).
- **Color y Transiciones:** Los iconos heredan automáticamente la paleta semántica mediante `currentColor` y soportan animaciones sutiles (ej. `<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />`).

---

## 4. Listas y Directorios de Datos (Flat List Standard)

- **Sin tarjetas envolventes pesadas:** Las listas de registros (invitados, eventos) habitan sobre el fondo plano, separadas por divisores horizontales sutiles (`divide-y divide-slate-200/70 dark:divide-slate-800/80`).
- **Sin avatares innecesarios:** En directorios operacionales de eventos, evitar avatares que consuman espacio horizontal en móviles.
- **Tokens inteligentes:** Los identificadores únicos (`#ABC123`) deben absorber el color del estado de confirmación.

---

## 4. Transiciones y Scroll Automático

- **Prohibición de `scrollIntoView`:** Causa saltos bruscos incompatibles con `snap-mandatory`.
- **Desplazamiento Programático Autorizado:**
  ```typescript
  const parentContainer = currentSection?.parentElement;
  if (nextSection && parentContainer) {
    parentContainer.scrollTo({
      top: nextSection.offsetTop,
      behavior: 'smooth',
    });
  }
  ```
