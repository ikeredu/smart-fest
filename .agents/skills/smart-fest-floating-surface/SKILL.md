---
name: smart-fest-floating-surface
description: Estándar obligatorio de arquitectura y diseño para popovers y superficies flotantes en Smart-Fest. Garantiza anclaje directo con pico conector (caret), borde institucional esmeralda continuo, esbeltez geométrica (anti-regordete), separación homogénea con scrim ligero y accesibilidad WAI-ARIA.
---

# Estándar Oficial de Popovers y Superficies Flotantes (Smart-Fest)

Este documento define la arquitectura técnica y los estándares de diseño mandatorios para construir cualquier menú emergente, popover contextual o selector flotante en el panel y vistas de **Smart-Fest**.

---

## 1. El Principio Fundamental: Popover Anclado con Pico Conector (*Caret / Beak*)

> [!IMPORTANT]
> **Regla de Oro de Anclaje:**
> **Todo Popover debe nacer y proyectarse DIRECTAMENTE desde el elemento que lo detonó (el botón disparador), tanto en pantallas móviles como de escritorio.**
> Queda estrictamente prohibido secuestrar la pantalla móvil con hojas inferiores (*bottom sheets*) o cajones invasivos cuando el usuario solo espera un menú contextual o de perfil anclado a su botón.

```text
               ┌──────────┐
               │  Trigger │ <-- Botón Disparador activo (border-emerald-500/40)
               └────┬─────┘
                    │
                   ╱ ╲       <-- Pico Caret (border-t border-l border-emerald-500/30)
 ┌────────────────┘   └────────────────┐
 │  POPOVER ANCLADO Y ESBELTO          │ <-- Despliegue con origin-top-right
 │  w-64 max-w-[calc(100vw-2rem)]      │
 │  bg-[var(--bg-card)]/95             │
 │  backdrop-blur-md                   │
 │  border-emerald-500/30              │
 └─────────────────────────────────────┘
```

---

## 2. Intencionalidad Geométrica (Slim Axis vs. Componentes Regordetes)

Para evitar el efecto visual de "caja hinchada" o bloque cuadrado amorfo (~1:1):

1. **Silueta Vertical Esbelta:**
   - La tarjeta contenedora adopta una anchura contenida de `w-64` (256px) con un padding exterior refinado de `p-2` (evitar `p-3` o `p-4` que engordan la silueta).
   - Su proporción general es marcadamente vertical y estilizada.
2. **Controles Internos como Tiras Horizontales Finas:**
   - Todo selector o elemento interno debe ser estrictamente horizontal y delgado:
     - Selectores segmentados (ej. tema visual): Franja ultra-slim de `h-7` con padding mínimo.
     - Filas de menú y acciones: Líneas esbeltas de `py-1.5 px-2.5 rounded-xl text-xs`.
   - Quedan terminantemente prohibidos los bloques de botones cuadrados o inflados con *padding fat*.

---

## 3. Homogeneización de Bordes: Esmeralda Institucional y Pico Continuo

1. **Borde Institucional Continuo:**
   - La tarjeta flotante comparte el mismo ADN perimetral de los modales y tarjetas maestras:
     `border border-emerald-500/30 dark:border-emerald-500/40`.
2. **Geometría del Pico (*Caret*):**
   - Un rombo rotado a 45° colocado en el borde superior:
     ```tsx
     <div className="absolute -top-1.5 right-5 w-3 h-3 rotate-45 bg-[var(--bg-card)] border-t border-l border-emerald-500/30 dark:border-emerald-500/40" />
     ```
   - Al usar el mismo fondo `bg-[var(--bg-card)]` y bordes selectivos superior e izquierdo, la línea horizontal se funde sin costuras hacia el botón disparador.
3. **Divisores Interiores Inset:**
   - Los separadores de secciones internas son sutiles, flotantes y no tocan los bordes exteriores:
     `mx-1.5 border-t border-slate-200/80 dark:border-slate-800/80 shrink-0 my-1.5`.

---

## 4. Separación de Capas y Scrim Homologado (Capa Universal de Modal)

Para que el popover flote con claridad visual impecable y sin que los textos del fondo compitan con su lectura, se homologa el telón con la **misma capa exacta del modal canónico**:

```text
CAPA 3 (z-50):  Cabecera y Popover Activo (Nítidos e iluminados, anclaje directo)
─────────────────────────────────────────────────────────────────────────────
CAPA 2 (z-40):  Telón Scrim Global de Modal (Portal a document.body)
                fixed inset-0 bg-black/30 backdrop-blur-xs animate-fade-in
─────────────────────────────────────────────────────────────────────────────
CAPA 1 (z-0):   Contenido de la aplicación (Difuminado en penumbra suave y limpia)
```

### Por qué el Scrim debe montarse con `createPortal`:
Debido al *Containing Block Trap* de CSS, si el telón `fixed inset-0` se renderizara dentro de un `<header>` con `backdrop-blur-md`, quedaría atrapado dentro de la barra.
Montar el telón mediante `createPortal(..., document.body)` a `z-40` garantiza que:
1. Permite cerrar el popover al tocar cualquier parte de la pantalla (*light dismiss* con `cursor-pointer`).
2. Genera una atmósfera homogénea e idéntica a la de los modales (`bg-black/30 backdrop-blur-xs`), eliminando el ruido del fondo.
3. No altera ni desubica el Popover, el cual permanece cómodamente anclado al trigger en `z-50`.

---

## 5. Comportamientos y Accesibilidad Mandatorios

Todo popover debe implementar:
1. **Origen de Animación Top-Right:** `origin-top-right animate-in fade-in zoom-in-95 duration-150` para que se expanda físicamente desde el botón disparador.
2. **Cierre con Clic en el Scrim:** Al tocar el telón global se ejecuta `setIsOpen(false)`.
3. **Cierre al Clic Fuera (*Click Outside*):** Listener `mousedown` en `document` para cerrar si se pulsa fuera de la referencia.
4. **Cierre con Tecla `Escape`:** Listener `keydown` global para accesibilidad de teclado WAI-ARIA.
5. **Aislamiento de Clics Internos:** `onClick={(e) => e.stopPropagation()}` en la tarjeta para evitar que interactuar con controles internos cierre el menú.
6. **No Bloqueo de Scroll:** El scroll del navegador no se bloquea forzosamente.

---

## 6. Plantilla Canónica de Código (Copy-Paste Ready)

```tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PopoverMenuProps {
  userName: string;
}

const emptySubscribe = () => () => {};

export default function PopoverMenu({ userName }: PopoverMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative select-none" ref={containerRef}>
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`cursor-pointer flex items-center space-x-2 p-1.5 rounded-full border transition-all duration-200 ${
          isOpen
            ? 'bg-slate-100 dark:bg-slate-800/90 border-emerald-500/40 shadow-xs'
            : 'bg-transparent border-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
        }`}
      >
        <span className="text-xs font-semibold">{userName}</span>
      </button>

      {/* 1. TELÓN DE FONDO (Homologado con Modales vía Portal) */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs animate-fade-in select-none cursor-pointer transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />,
        document.body
      )}

      {/* 2. POPOVER ANCLADO ESBELTO CON PICO CONTINUO */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2.5 w-64 max-w-[calc(100vw-2rem)] rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl p-2 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-150 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* PICO CONECTOR (Caret rotado a 45° con borde continuo) */}
          <div className="absolute -top-1.5 right-5 w-3 h-3 rotate-45 bg-[var(--bg-card)] border-t border-l border-emerald-500/30 dark:border-emerald-500/40" />

          {/* CONTENIDO INTERNO: FILAS Y TIRAS HORIZONTALES FINAS */}
          <div className="relative z-10 space-y-1">
            {/* Secciones del popover */}
          </div>
        </div>
      )}
    </div>
  );
}
```
