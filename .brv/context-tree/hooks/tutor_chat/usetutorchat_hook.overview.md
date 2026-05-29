- **Key Points**
    - Defines a React hook, `useTutorChat`, for managing the AI tutor chat functionality.
    - Manages the complete state of the chat, including message history, loading status, and error handling.
    - Exposes functions to the UI for sending new messages and submitting user feedback.
    - Specifically designed to handle streaming API responses for a real-time chat experience.
    - Interacts with an API service defined in `src/services/api.ts`.
    - Utilizes type definitions from `src/types/index.ts`.

- **Structure / Sections Summary**
    - **Reason:** Explains the document's origin as curated context for the `src/hooks` directory.
    - **Raw Concept:** Summarizes the hook's task (handle chat logic), its file location (`src/hooks/useTutorChat.ts`), and the basic interaction flow (user sends message, API is called, history is updated).
    - **Narrative:** Details the hook's responsibilities, such as state management and exposing functions, and highlights key features like streaming and feedback.

- **Notable Entities, Patterns, or Decisions**
    - **Entity:** `useTutorChat` React hook.
    - **Pattern:** A custom hook that encapsulates complex state management and side effects (API calls) for a specific feature, abstracting the logic away from the UI components.
    - **Decision:** The architecture supports streaming responses, which is a key decision for creating a responsive and interactive chat UI.
    - **Decision:** Separating the API call logic into a dedicated `services` module promotes a clean separation of concerns.