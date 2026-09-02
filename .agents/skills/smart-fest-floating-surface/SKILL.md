---
name: smart-fest-floating-surface
description: Estándar obligatorio de arquitectura y diseño para popovers y superficies flotantes en Smart-Fest. Garantiza anclaje directo al botón disparador, separación homogénea de capas con telón scrim mediante React Portals, diseño responsivo unificado y accesibilidad WAI-ARIA.
---

# Estándar Oficial de Popovers y Superficies Flotantes (Smart-Fest)

Este documento define la arquitectura técnica y los estándares de diseño mandatorios para construir cualquier menú emergente, popover contextual o selector flotante en el panel y vistas de **Smart-Fest**.

---

## 1. El Principio Fundamental: Popover Anclado Puro

> [!IMPORTANT]
> **Regla de Oro de Anclaje:**
> **Todo Popover debe nacer y desprenderse DIRECTAMENTE desde el elemento que lo detonó (el botón disparador), tanto en pantallas móviles como de escritorio.**
> Queda estrictamente prohibido secuestrar la pantalla móvil con hojas inferiores (*bottom sheets*) o cajones invasivos cuando el usuario solo espera un menú contextual o de perfil anclado a su botón.

```text
┌─────────────────────────────────────────────────────────┐
│ Smart-Fest [ANFITRIÓN]                       [Botón ▾]  │ <-- Trigger
└────────────────────────────────────────────────────┬────┘
                                                     │
                             ┌───────────────────────┴────┐
                             │  POPOVER ANCLADO           │ <-- Nace directamente aquí
                             │  absolute top-full right-0 │
                             │  w-72 max-w-[calc(100vw-2rem)]
                             │  bg-[var(--bg-card)]/95    │
                             │  backdrop-blur-md          │
                             │  shadow-2xl border         │
                             └────────────────────────────┘
```

---

## 2. Homogeneización y Separación de Capas (El Scrim con Portal)

Para que el popover flote con claridad visual sin que el fondo compita con el menú, se aplica una **separación homogénea de capas en dos niveles**:

```text
CAPA 3 (z-50):  Cabecera y Popover Activo (Totalmente nítidos e iluminados)
─────────────────────────────────────────────────────────────────────────────
CAPA 2 (z-40):  Telón Scrim Global (Portal a document.body)
                fixed inset-0 bg-black/30 backdrop-blur-xs
─────────────────────────────────────────────────────────────────────────────
CAPA 1 (z-0):   Contenido de la aplicación (Atenuado uniformemente en segundo plano)
```

### Por qué el Scrim debe montarse con `createPortal`:
Debido al *Containing Block Trap* de CSS, si el telón `fixed inset-0` se renderizara dentro de un `<header>` con `backdrop-blur-md`, quedaría atrapado dentro de la barra.
Montar el telón de fondo mediante `createPortal(..., document.body)` a `z-40` garantiza que:
1. Oscurece y desenfoca suavemente todo el fondo de la pantalla de forma uniforme.
2. Al hacer clic o tocar en cualquier parte del fondo atenuado, el popover se cierra (*light dismiss*).
3. No altera ni desubica el Popover, el cual permanece cómodamente anclado al trigger en `z-50`.

---

## 3. Especificaciones Visuales de Estilo

- **Contenedor del Popover:**
  ```tsx
  className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 select-none"
  ```
- **Contención en Pantallas Móviles:**
  La clase `max-w-[calc(100vw-2rem)]` evita que el popover se desborde fuera del borde izquierdo en teléfonos estrechos (320px – 375px), dejando siempre un margen de respiro de 1rem a los bordes.
- **Telón de Fondo (*Scrim*):**
  ```tsx
  className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs animate-fade-in select-none cursor-pointer transition-opacity"
  ```

---

## 4. Comportamientos y Accesibilidad Mandatorios

Todo popover debe implementar:
1. **Cierre con Clic en el Fondo:** Al tocar el scrim se ejecuta `setIsOpen(false)`.
2. **Cierre al Clic Fuera (*Click Outside*):** Listener en `document` para cerrar si se hace clic fuera del contenedor.
3. **Cierre con Tecla `Escape`:** Listener de `keydown` global para cerrar con accesibilidad de teclado.
4. **Contención de Eventos:** `onClick={(e) => e.stopPropagation()}` en la tarjeta del popover para evitar que interactuar con sus botones internos cierre el menú.
5. **No Bloqueo Agresivo de Scroll:** A diferencia de un modal de formulario complejo, un popover no necesita secuestrar el scroll del navegador; solo flota y se despide al tocar fuera.

---

## 5. Plantilla Canónica de Código (Copy-Paste Ready)

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
        className="cursor-pointer flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span>{userName}</span>
      </button>

      {/* 1. TELÓN DE FONDO (Portal a document.body para homogeneizar capas) */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs animate-fade-in select-none cursor-pointer transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />,
        document.body
      )}

      {/* 2. POPOVER ANCLADO (Nace directamente debajo del botón) */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Contenido del popover */}
        </div>
      )}
    </div>
  );
}
```
