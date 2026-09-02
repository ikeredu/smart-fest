# Estándar Oficial de Modales y Diálogos (Smart-Fest)

Esta documentación define la especificación canónica para todos los modales, diálogos y ventanas emergentes del sistema.

---

## 1. Principios de Estandarización

Todos los modales en Smart-Fest deben compartir la misma experiencia visual, comportamental y accesible:

1. **Backdrop Unificado:**
   - Contenedor fijo a pantalla completa: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none`.
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

---

## 2. Anatomía de la Tarjeta Modal

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [Icono]  Título del Modal                                          [✕] │  <-- Header
│          Subtítulo explicativo                                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Cuerpo del formulario / contenido (con scroll si excede max-h-[85vh]) │  <-- Body
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                  [ Cancelar ]  [ Acción Principal ✨ ] │  <-- Footer
└────────────────────────────────────────────────────────────────────────┘
```

### A. Encabezado (Header):
- Divisor inferior: `border-b border-slate-200 dark:border-slate-800 px-6 py-4.5 flex items-center justify-between`.
- Icono temático dentro de cápsula sutil (`w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`).
- Título en negrita `text-base font-bold text-[var(--text-main)]` + subtítulo `text-[11px] text-[var(--text-muted)]`.
- Botón de cierre estandarizado: `w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer`.

### B. Cuerpo (Body):
- `p-6 overflow-y-auto max-h-[75vh] space-y-4 text-xs`.
- Inputs estilizados con `bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-[var(--text-main)] focus:border-emerald-500`.

### C. Pie de Página (Footer):
- Divisor superior: `pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2.5`.
- **Botón Cancelar Secundario:** `py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer`.
- **Botón Principal de Éxito:** `py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md active:scale-95 transition-all cursor-pointer`.
- **Botón Destructivo:** `py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-md active:scale-95 transition-all cursor-pointer`.
