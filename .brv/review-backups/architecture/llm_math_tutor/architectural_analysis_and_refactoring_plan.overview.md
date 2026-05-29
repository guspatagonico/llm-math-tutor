### Key Points
- The LLM Math Tutor project's initial architecture was monolithic (9 files), leading to violations of core software design principles.
- The analysis identified 3 critical DRY violations (e.g., duplicated API logic), 6 SOLID violations (primarily Single Responsibility Principle), and 2 KISS violations (e.g., a 614-line custom markdown parser).
- A major refactoring is proposed to transition the project to a modular structure with approximately 30 organized files.
- The new structure introduces clear separation of concerns with dedicated directories for services, hooks, components, constants, types, and utils.
- The highest priority (P0) refactoring task is to replace the over-engineered custom markdown parser with standard libraries like `react-markdown` and `rehype-katex`.

### Structure / Sections Summary
- **Reason & Raw Concept:** Outlines the task of analyzing and refactoring the LLM Math Tutor application. It details the flow from analysis of the monolithic structure to the proposal of a modular one and the prioritization of tasks.
- **Narrative (Structure & Dependencies):** Describes the initial 9-file monolithic structure and the proposed ~30-file modular architecture. It also lists the core technologies: React, TypeScript, and Vite for the frontend; Express for the backend; and the Gemini API for AI functionality.
- **Highlights:** Summarizes the key findings of the architectural analysis, quantifying the number of DRY, SOLID, and KISS principle violations discovered.
- **Rules:** Provides a list of specific, actionable fixes for the identified violations. This includes centralizing API clients, creating single-responsibility hooks, and replacing custom implementations with established libraries.

### Notable Entities, Patterns, & Decisions
- **Entities:**
    - **Project:** LLM Math Tutor
    - **Files (Before):** `server.ts`, `App.tsx`, `MathMarkdownRenderer.tsx`, `AITutorChat.tsx`
    - **Files (After):** `services/gemini.ts`, `services/api.ts`, `constants/temperature.ts`
    - **Hooks (Proposed):** `useSoftmax`, `useTemperature`, `useTutorChat`
    - **Technologies:** React, Express, Gemini API, `react-markdown`, `rehype-katex`
- **Patterns:**
    - **Initial Pattern:** Monolithic architecture.
    - **Proposed Pattern:** Modular architecture with clear separation of concerns.
    - **Design Principles Violated:** DRY (Don't Repeat Yourself), SOLID, KISS (Keep It Simple, Stupid).
- **Decisions:**
    - **Refactor Monolith to Modular:** The core decision is to abandon the monolithic structure in favor of a more maintainable and scalable modular design.
    - **Centralize API Logic:** Create a singleton for the Gemini client in `services/gemini.ts` and a typed fetch wrapper in `src/services/api.ts` to fix DRY violations.
    - **Replace Custom Parser:** A key decision is to replace a complex, 614-line custom markdown parser with the combination of `react-markdown` and `rehype-katex` to simplify the codebase (KISS).
    - **Extract Business Logic into Hooks:** Logic will be moved from components into single-responsibility hooks to adhere to SOLID principles.