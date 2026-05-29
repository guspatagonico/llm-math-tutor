### Key Points
*   The document's purpose is to define and document the core data structures used for API communication.
*   The primary data structures defined are `Candidate`, `Message`, `PredictTokensResponse`, and `TutorChatResponse`.
*   `Candidate` represents a single token prediction, while `Message` represents a chat message.
*   Type definitions are located in the file `src/types/api.ts`.
*   These types are exported via `src/types/index.ts` for application-wide consumption.
*   A key design choice is the separation of API types into a dedicated module for maintainability and reusability.

### Structure / Sections Summary
*   **Reason:** States the goal of the document, which is to formally record the API type definitions from `src/types/api.ts`.
*   **Raw Concept:** Provides technical details, including the specific task (defining API data structures), the relevant source files (`api.ts`, `index.ts`), and the data flow (defined in `api.ts`, exported from `index.ts`).
*   **Narrative:** Gives a high-level overview of the API payload interfaces and highlights the design decision to isolate API types into their own module.

### Notable Entities, Patterns, or Decisions
*   **Entities:**
    *   `Candidate`: An interface representing a single token prediction.
    *   `Message`: An interface for a chat message.
    *   `PredictTokensResponse`: The main response type for token prediction endpoints.
    *   `TutorChatResponse`: The main response type for tutor chat endpoints.
    *   `src/types/api.ts`: The source file where these API types are defined.
*   **Patterns / Decisions:**
    *   **Module Separation:** The decision to place API-specific type definitions in their own file (`api.ts`) is a deliberate choice to improve code organization, maintenance, and reuse.
    *   **Centralized Export:** The use of an `index.ts` file to export the types creates a single, clear entry point for the `types` module, a common and effective pattern in TypeScript projects.