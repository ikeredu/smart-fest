# Contexto del Proyecto: snart-fest

**Fest Smart** es una plataforma para la creación y visualización de invitaciones digitales interactivas. El sistema está diseñado bajo el concepto de **"piezas de Lego"**, permitiendo que cada sección de la invitación sea un bloque modular y reutilizable.

---

## 🎯 Propósito del Proyecto

El objetivo principal es construir una aplicación basada en **Configuration-Driven UI (CDUI)** y **Component-Driven Design (CDD)**. 

Esto permite:
1. **Desacoplar contenido y estructura:** Las invitaciones se definen mediante un archivo de configuración JSON. El orden, el contenido y los efectos visuales de cada sección se leen dinámicamente.
2. **Modularidad absoluta (Legos):** Cada componente visual (Hero, Ubicación, RSVP, Cuenta Regresiva) es independiente, agnóstico de dónde se renderiza y altamente personalizable.
3. **Escalabilidad:** Crear nuevos tipos de bloques sin alterar el motor de renderizado principal, simplemente añadiendo un esquema de validación y su correspondiente vista React.

---

## 🛠️ Stack Tecnológico

El proyecto está construido sobre las siguientes tecnologías base:

*   **Framework:** [Next.js v16.2.6](https://nextjs.org/) (utilizando el **App Router** para la estructura de rutas y optimización).
*   **Biblioteca de UI:** [React v19.2.4](https://react.dev/).
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un tipado estático robusto y autocompletado en el desarrollo de bloques.
*   **Estilos:** [Tailwind CSS v4.0.0](https://tailwindcss.com/) para un desarrollo ágil de la interfaz visual con soporte nativo moderno.

---

## 📦 Dependencias Clave

A nivel de desarrollo y ejecución, se utilizan las siguientes herramientas:

*   **[Zod (v4.4.3)](https://zod.dev/):** Utilizado para definir esquemas de validación de datos en tiempo de ejecución para cada bloque. Permite la inferencia de tipos de TypeScript automática, garantizando que el JSON configurado sea correcto antes de renderizar la UI.
*   **[clsx (v2.1.1)](https://github.com/lukeed/clsx) & [tailwind-merge (v3.6.0)](https://github.com/dcastil/tailwind-merge):** Herramientas utilizadas en conjunto para la concatenación dinámica y segura de clases CSS de Tailwind, evitando colisiones de estilos y permitiendo personalizaciones limpias por bloque.
*   **PostCSS:** Integración con Tailwind v4 mediante `@tailwindcss/postcss`.

---

## 📂 Arquitectura de Carpetas Actual

*   **`docs_md/`**: Documentación técnica del proyecto.
*   **`src/types/`**: Contratos de datos y esquemas de validación Zod para los bloques.
*   **`src/mocks/`**: Datos simulados en formato JSON que imitan la respuesta de una base de datos o CMS.
*   **`src/blocks/`**: Componentes visuales puros (piezas de Lego) que renderizan cada bloque.
*   **`src/app/`**: Rutas y páginas de la aplicación Next.js, donde reside el motor de renderizado que itera sobre los bloques.
