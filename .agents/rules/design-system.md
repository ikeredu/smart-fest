# Reglas del Sistema de Diseño y Glassmorphism (Smart-Fest)

Esta documentación define las directrices visuales, tokens de estilo y normas de interfaz que todo agente de IA debe cumplir en **Smart-Fest**.

---

## 1. Filosofía Visual: Glassmorphism Slim & Editorial

Smart-Fest combina **elegancia editorial y modernidad traslúcida**:
- **Slim Glassmorphism:** Superficies de cristal fino con desenfoque (`backdrop-blur-sm` / `backdrop-blur-xs`), bordes tenues (`border-slate-200/80 dark:border-slate-800/80`) y sombras suaves (`shadow-xs` / `shadow-sm`).
- **Prohibición de Cards Chunky / Burbujas Gruesas:** Quedan prohibidas las cajas infladas con bordes toscos o tarjetas dentro de tarjetas.
- **Tipografía Editorial:**
  - Títulos principales: `font-serif` (Playfair Display) con toques cursivos para acentos poéticos.
  - Textos de lectura y datos: `font-sans` (Plus Jakarta Sans / Manrope) limpios y legibles.
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

## 3. Listas y Directorios de Datos (Flat List Standard)

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
