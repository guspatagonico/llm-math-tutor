### Key Points
- The document describes a Node.js/Express API endpoint (`handleTutorChat`) for an AI math tutor.
- It uses the Google Gemini API as the backend for generating chat responses.
- A detailed system instruction in Spanish is used to define the AI's persona as a didactic, friendly expert in AI and advanced mathematics.
- The endpoint includes a graceful fallback mechanism: if the `GEMINI_API_KEY` is not configured, it returns a pre-canned, helpful response instead of failing.
- The implementation validates the incoming chat history and maps its structure to the format required by the Gemini API.
- Robust error handling is in place to catch issues during the API call and return a 500 status with an informative message.

### Structure / Sections Summary
- **Metadata:** Provides context like title, summary, and importance.
- **Reason & Raw Concept:** States the purpose is to document the `routes/tutor.ts` endpoint and outlines the high-level data flow (receive history -> format -> call Gemini -> return reply).
- **Narrative:** Details the function's structure, its dependencies (`express`, `../services/gemini`), and highlights key implementation features.
- **Code Implementation:** The full TypeScript source code for the `handleTutorChat` function, including the system prompt, request/response logic, Gemini API interaction, and error handling.

### Notable Entities, Patterns, or Decisions
- **Entities:**
    - `handleTutorChat`: The main Express controller function for the endpoint.
    - `routes/tutor.ts`: The file containing the endpoint logic.
    - `Gemini API`: The external AI service used for generating responses.
    - `SYSTEM_INSTRUCTION`: A constant string that defines the AI tutor's persona and expertise in Spanish.
    - `GEMINI_API_KEY`: The environment variable required to authenticate with the Gemini service.
- **Patterns & Decisions:**
    - **Persona Definition via System Prompt:** A key decision was to craft a detailed system instruction to strictly control the AI's tone, language (Spanish), expertise (AI, Math), and teaching style (didactic, friendly, uses LaTeX).
    - **Graceful Degradation:** The endpoint is designed to function in a limited capacity even without a configured API key. It returns a static, helpful message, which is a better user experience than a hard failure.
    - **Data Transformation:** The code explicitly maps the application's internal message format (e.g., `{ sender: 'user' }`) to the Gemini API's required format (e.g., `{ role: 'user' }`).
    - **Defensive Programming:** The code includes input validation to ensure the `messages` payload is a non-empty array and a `try...catch` block to handle potential failures from the external API call.