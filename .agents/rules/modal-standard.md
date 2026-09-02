# Estándar Oficial de Modales y Diálogos (Smart-Fest)

Esta documentación define la especificación canónica para todos los modales, diálogos y ventanas emergentes del sistema.

---

## 1. Principios de Estandarización

Todos los modales en Smart-Fest deben compartir la misma experiencia visual, comportamental y accesible:

1. **Backdrop Unificado (Homologado con Popovers):**
   - Contenedor fijo a pantalla completa: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-fade-in select-none`.
   - Clic en el backdrop cierra el modal (con `stopPropagation` en la caja interior).
2. **Bloqueo Automático de Scroll:**
   - Mientras el modal esté abierto, el scroll de `document.body` debe bloquearse (`overflow: hidden`) y restablecerse al cerrar.
3. **Cierre Accesible con Tecla `Escape`:**
   - Todo modal debe escuchar el evento `keydown` y cerrarse al presionar `Escape`.
4. **Dimensiones Estandarizadas (`max-w-*`):**
   - `'sm'`: `max-w-sm` (384px) - Diálogos simples o confirmaciones cortas.
   - `'md'`: `max-w-md` (448px) - Acciones destructivas o alertas (ej. `DeleteEventModal`).
   - `'lg'`: `max-w-lg` (512px) - Formularios estándar (ej. `CreateEventModal`, `GuestModal`).
   - `'xl'`: `max-w-2xl` (672px) - Configuraciones complejas o editores avanzados.
5. **Cero Padding en Contenedor Raíz:**
   - La tarjeta principal no debe tener padding global (`p-0 overflow-hidden rounded-2xl`). Cada una de las 3 zonas (Header, Body, Footer) gestiona su propio padding interno para que las líneas divisorias toquen los bordes de 0 a 100%.

---

## 2. Anatomía de la Tarjeta Modal (Divisores Sutiles Flotantes)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [Icono]  Título del Modal                                          [✕] │  <-- 1. Header (px-6 pt-5 pb-4)
│                                                                        │
│ ────────────────────────────────────────────────────────────────────── │  <-- Línea sutil inset (mx-6 h-px, NO toca bordes)
│                                                                        │
│ Cuerpo del formulario / contenido (px-6 py-5, max-h-[70vh] overflow-y)│  <-- 2. Body con scroll
│                                                                        │
│ ────────────────────────────────────────────────────────────────────── │  <-- Línea sutil inset (mx-6 h-px, NO toca bordes)
│                                                                        │
│                                  [ Cancelar ]  [ Acción Principal ✨ ] │  <-- 3. Footer (px-6 py-4)
└────────────────────────────────────────────────────────────────────────┘
```

### A. Encabezado (Header):
- Sin borde directo en el contenedor exterior: `px-6 pt-5 pb-4 flex items-center justify-between`.
- Icono temático en cápsula sutil (`w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-base`).
- Título conciso en negrita `text-lg font-bold text-[var(--text-main)]` (sin micro-etiquetas redundantes arriba).
- Botón de cierre estandarizado: `w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer`.
- **Línea divisoria sutil flotante:** `<div className="mx-6 border-t border-slate-300 dark:border-slate-600 shrink-0" />` (nunca toca los bordes exteriores del modal, visible y grisácea).

### B. Cuerpo (Body):
- `px-6 py-5 overflow-y-auto max-h-[70vh] space-y-4.5 text-xs`.
- Inputs estilizados con `bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-[var(--text-main)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30`.
- **Línea divisoria sutil flotante:** `<div className="mx-6 border-t border-slate-300 dark:border-slate-600 shrink-0" />` (al final del body, separando del footer).

### C. Pie de Página (Footer):
- Sin divisor pegado a los bordes: `px-6 py-4 flex items-center justify-end space-x-3`.
- **Botón Cancelar Secundario:** `py-2 px-4 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-colors cursor-pointer`.
- **Botón Principal de Éxito:** `py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm hover:shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer`.
- **Botón Destructivo:** `py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-sm hover:shadow-rose-600/20 active:scale-95 transition-all cursor-pointer`.
