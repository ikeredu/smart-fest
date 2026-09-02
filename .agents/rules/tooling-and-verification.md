# Reglas de Herramientas y Verificación (Suite NPX)

Este documento define la política obligatoria de ejecución de comandos, linters y verificación de código en **Smart-Fest**.

---

## 1. Regla Mandatoria: Uso Exclusivo de la Suite NPX

> [!IMPORTANT]
> **Queda terminantemente prohibido el uso de comandos `npm run ...` si existe el ejecutable directo en la suite `npx`.** Todo agente de IA debe ejecutar las herramientas utilizando **`npx`** para garantizar determinismo y paridad de entorno.

### Comandos Autorizados de la Suite:

| Operación | Comando Autorizado | Prohibido |
| :--- | :--- | :--- |
| **Linter / ESLint** | `npx eslint` | `npm run lint` |
| **Verificación de Tipos** | `npx tsc --noEmit` | `npm run typecheck` |
| **Compilación / Build** | `npx next build` | `npm run build` |
| **Servidor de Desarrollo** | `npx next dev` | `npm run dev` |
| **Supabase CLI** | `npx supabase ...` | `npm supabase ...` |

---

## 2. Puerta de Verificación Obligatoria (Pre-Completion Gate)

Antes de dar por concluida cualquier modificación de código, el agente de IA **debe ejecutar en la terminal de forma estricta**:

```powershell
npx eslint ; npx tsc --noEmit
```

### Criterio de Aceptación:
- **0 errores de ESLint.**
- **0 errores de TypeScript (`tsc --noEmit`).**
- Si se detecta cualquier advertencia de importación rota, propiedad ausente o tipo `any` implícito, debe corregirse de inmediato antes de notificar al usuario.
