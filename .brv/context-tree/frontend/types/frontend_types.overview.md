### Key Points
- This document describes the TypeScript types and interfaces used in the frontend.
- Type definitions are organized by domain (API, math) to maintain a clear structure.
- The primary purpose is to ensure type safety for data structures, especially for API payloads and mathematical concepts.
- The `src/types` directory serves as the central location for all frontend type definitions.

### Structure / Sections Summary
- **Reason**: To document the TypeScript types used in the frontend.
- **Raw Concept**: Identifies the task and lists the relevant source files (`api.ts`, `index.ts`, `math.ts`).
- **Narrative**:
    - **Structure**: Explains that types are organized by domain within the `src/types` directory.
    - **Highlights**: Briefly describes the content of each file:
        - `api.ts`: Types for API request and response payloads.
        - `index.ts`: The main entry point for exporting application-wide types.
        - `math.ts`: Types and enums related to mathematical concepts.

### Notable Entities & Decisions
- **Directory Structure**: The decision to separate types by domain (`api.ts`, `math.ts`) within a `src/types` folder is a common pattern for organizing large TypeScript projects.
- **Entities**:
    - `src/types/api.ts`: Defines the contract between the frontend and backend.
    - `src/types/index.ts`: Acts as a barrel file for convenient imports.
    - `src/types/math.ts`: Encapsulates the data structures for mathematical concepts.