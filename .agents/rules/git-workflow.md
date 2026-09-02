# Reglas de Git y Flujo de Repositorio (Smart-Fest)

Este documento define las políticas obligatorias de control de versiones, ramas y commits que todo agente de IA debe acatar sin excepción.

---

## 1. Política Estricta sobre la Rama `main`

> [!CAUTION]
> **QUEDA ESTRICTAMENTE PROHIBIDO TOCAR LA RAMA `main` DIRECTAMENTE.**
> - NUNCA realizar commits directamente sobre `main`.
> - NUNCA hacer merge local hacia `main` desde la terminal o scripts.
> - NUNCA hacer push directo a `main`.

### Procedimiento de Integración a Producción:
- La rama `main` es el entorno de producción protegido.
- Toda integración hacia `main` se realiza exclusivamente mediante **Pull Request (PR) desde la interfaz web de GitHub**.
- Ningún agente de IA debe abrir PRs o hacer merge hacia `main` por terminal, a menos que exista una instrucción **explícita, directa e inequívoca** del usuario en la sesión actual.

---

## 2. Ramas de Trabajo Autorizadas

- **`develop`**: Rama principal de integración y desarrollo continuo. Es la rama base donde se prueban y sincronizan las funcionalidades activas.
- **Ramas de Funcionalidad / Tareas**: Para desarrollos aislados, utilizar ramas que deriven de `develop`:
  - `feature/nombre-de-la-funcionalidad`
  - `fix/descripcion-del-bug`
  - `refactor/nombre-del-modulo`

---

## 3. Idioma y Formato Obligatorio de Commits (English Only)

> [!IMPORTANT]
> **Todos los mensajes de commit deben redactarse 100% en INGLÉS**, utilizando la convención estándar **Conventional Commits**.

### Estructura:
```text
<tipo>(<alcance opcional>): <descripción concisa en imperativo y en inglés>

[cuerpo opcional explicando el porqué y contexto]
```

### Tipos de Commit Permitidos:
- **`feat:`** Una nueva característica o funcionalidad (ej. `feat: implement guest action sheet drawer for mobile devices`).
- **`fix:`** Corrección de un error (ej. `fix: resolve overflow issue in event guest list`).
- **`refactor:`** Reestructuración de código sin alterar su comportamiento externo (ej. `refactor: unify modal backdrop and escape key listener`).
- **`style:`** Cambios cosméticos o de espaciado que no afectan lógica (ej. `style: remove contact avatar and align guest row items`).
- **`docs:`** Documentación o reglas de agentes (ej. `docs: add git workflow and repository rules in AGENTS.md`).
- **`chore:`** Tareas de mantenimiento, dependencias o tooling (ej. `chore: configure npx verification gates`).

---

## 4. Puerta de Validación Pre-Commit (Pre-Commit Gate)

Antes de crear cualquier commit o fusionar cambios hacia `develop`, el agente debe verificar de forma mandatoria:
```powershell
npx eslint ; npx tsc --noEmit
```
Si hay algún error de ESLint o TypeScript, **el commit queda bloqueado** hasta solucionar las fallas.
