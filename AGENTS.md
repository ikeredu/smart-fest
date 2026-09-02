# Smart-Fest — Directrices Maestras para Agentes de IA

Bienvenido a la base de código de **Smart-Fest**, una plataforma SaaS de alto rendimiento para la creación, personalización y gestión de invitaciones digitales interactivas con confirmación de asistencia (RSVP) en tiempo real.

---

## 1. Regla Mandatoria de Herramientas (Suite NPX)

> [!IMPORTANT]
> **Queda terminantemente prohibido el uso de comandos `npm run ...` si existe el ejecutable directo en la suite `npx`.** Todo agente de IA debe ejecutar las herramientas utilizando **`npx`** para garantizar determinismo y paridad de entorno.

### Comandos Oficiales de la Suite:
- **Linter:** `npx eslint`
- **Verificación de Tipos:** `npx tsc --noEmit`
- **Compilación / Build:** `npx next build`
- **Servidor de Desarrollo:** `npx next dev`
- **Supabase CLI:** `npx supabase ...`

### Puerta de Verificación Obligatoria (Pre-Completion Gate):
Antes de dar por concluida cualquier tarea o responder al usuario sobre un cambio de código, el agente **debe ejecutar y verificar que ambos comandos pasen con 0 errores**:
```powershell
npx eslint ; npx tsc --noEmit
```

---

## 2. Reglas de Git y Flujo de Repositorio

> [!CAUTION]
> **PROHIBICIÓN ABSOLUTA DE TOCAR LA RAMA `main`:**
> - **NUNCA** hacer commits directamente sobre `main`.
> - **NUNCA** hacer push directo ni merges hacia `main` por terminal o código.
> - Todo paso a `main` se realiza **exclusivamente mediante Pull Request (PR) desde la interfaz web de GitHub**, a menos que exista una instrucción directa y explícita del usuario.

### Estándares de Trabajo Git:
- **Ramas de desarrollo:** Todo el trabajo se integra y prueba en **`develop`** o ramas de características (`feature/...`, `fix/...`).
- **Commits 100% en INGLÉS:** Todos los mensajes de commit deben redactarse obligatoriamente en inglés siguiendo la convención **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`).

---

## 3. Visión del Proyecto y los Dos Mundos de Smart-Fest

Smart-Fest se compone de dos áreas arquitectónicas fundamentales:

### A. El Visualizador Público de Invitaciones (Frontend de Invitados)
- **Configuration-Driven UI (CDUI):** La invitación se define mediante esquemas y contratos de datos JSON. Los componentes visuales son "piezas de Lego" modulares y reutilizables.
- **Dynamic Viewport (100dvh):** Cada sección principal ocupa el 100% exacto del área visible del dispositivo móvil mediante `h-screen h-[100dvh]` y contención de bloques con `transform translate-x-0`.
- **Slim Glassmorphism:** Superficies de cristal fino, paleta semántica orgánica y tipografía editorial (`font-serif` y `font-sans`).

### B. El Panel de Control del Anfitrión (Dashboard SaaS)
- **Gestión de Eventos y Lista Plana de Invitados:** Directorios de datos limpios y planos (`divide-y`), sin tarjetas anidadas ni bordes redondeados pesados que ahoguen el contenido.
- **Tokens Inteligentes:** Los códigos de acceso (`#ABC123`) absorben el color del estado RSVP (verde = confirmado, ámbar = pendiente, rojo = no asistirá).
- **Acciones Táctiles y Mobile Action Sheets:** En pantallas móviles (`< sm`), los menús contextuales (`⋯`) se abren como un Bottom Sheet deslizante con opciones de 44px+ de altura.
- **Estandarización de Modales:** Todos los diálogos comparten el mismo backdrop (`bg-black/60 backdrop-blur-xs`), bloqueo de scroll y cierre con tecla `Escape`.

---

## 4. Directorio de Reglas Invariantes (`.agents/rules/`)

Todo agente debe respetar las normas detalladas en los siguientes documentos de referencia:

1. **[Git & Repository Workflow](.agents/rules/git-workflow.md):** Prohibición de tocar `main`, commits en inglés y trabajo en `develop`.
2. **[Tooling & Verification](.agents/rules/tooling-and-verification.md):** Mandato de la suite `npx`, linters y reglas de pre-entrega.
3. **[CDUI Architecture](.agents/rules/cdui-architecture.md):** Esquemas Zod obligatorios (`BlockSchema`), unión discriminada `AnyBlockSchema` y principio de retiro de tipos.
4. **[Design System & Glassmorphism](.agents/rules/design-system.md):** Variables CSS semánticas, colores de estado, tipografías y listas continuas.
5. **[Viewport & Mobile Optimization](.agents/rules/viewport-mobile.md):** Especificación `100dvh`, scroll snapping y contención de widgets `position: fixed`.
6. **[Modal Standard](.agents/rules/modal-standard.md):** Especificación canónica para diálogos, backdrops, cabeceras, cuerpos con scroll y botones de acción.

---

## 5. Habilidades Disponibles (`.agents/skills/`)

- **`smart-fest-block-creator`** (`.agents/skills/smart-fest-block-creator/SKILL.md`): Guía paso a paso y plantilla para crear y registrar nuevos bloques Lego en la invitación.
