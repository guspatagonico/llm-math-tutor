### Key Points
- The document outlines the structure and purpose of frontend constants.
- Constants are centralized and organized by feature into separate files within `src/constants`.
- This modular approach improves code organization and maintainability.
- Components and hooks import only the specific constants they require.
- The constants cover a wide range of application settings: charts, learning paths, routes, SEO, and temperature.

### Structure / Sections Summary
- **Reason:** Briefly states the goal is to document the frontend constants.
- **Raw Concept:** Lists the specific files where constants are defined (`charts.ts`, `learningPath.ts`, etc.) and describes the basic flow of their usage (definition and import).
- **Narrative:** Provides a more detailed explanation of the organizational structure and highlights the broad scope of the constants.

### Notable Entities, Patterns, or Decisions
- **Entities:** The five specific constant files are the key entities: `src/constants/charts.ts`, `src/constants/learningPath.ts`, `src/constants/routes.ts`, `src/constants/seo.ts`, and `src/constants/temperature.ts`.
- **Pattern:** The core pattern is the modularization of constants by feature. Instead of a single global constants file, each distinct area of the application has its own dedicated constants file.
- **Decision:** The architectural decision to segregate constants into a dedicated `src/constants` directory and further into feature-specific files was made to enhance code clarity, maintainability, and reusability.