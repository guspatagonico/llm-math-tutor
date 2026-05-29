### Key Points
- **Singleton Client:** The module provides a singleton instance of the `GoogleGenAI` client to interact with the Google Gemini API.
- **Configuration:** The client is configured using the `GEMINI_API_KEY` environment variable.
- **Model:** The implementation is hardcoded to use the `"gemini-3.5-flash"` model.
- **Core Function:** The primary export is the `getGeminiClient()` function, which initializes and returns the client instance.
- **Error Handling:** If the `GEMINI_API_KEY` is not set, `getGeminiClient()` returns `null`.
- **Dependencies:** The module relies on the `@google/genai` and `dotenv` packages.

### Structure / Sections Summary
- **Reason:** States the document's purpose is to describe the Gemini AI client service located in `services/gemini.ts`.
- **Raw Concept:** Outlines the basic task (provide a singleton client) and the logical flow for creating and returning the client instance.
- **Narrative:** Expands on the implementation, detailing the file's structure (the `getGeminiClient` function and `MODEL` constant), its dependencies, and key highlights.
- **Code Block:** Provides the full TypeScript source code for `gemini.ts`.

### Notable Entities, Patterns, & Decisions
- **Entities:**
    - `getGeminiClient()`: The exported function that provides access to the singleton client.
    - `MODEL`: An exported constant with the value `"gemini-3.5-flash"`.
    - `GEMINI_API_KEY`: The environment variable required for authentication.
    - `GoogleGenAI`: The client class imported from the `@google/genai` library.
- **Patterns:**
    - **Singleton Pattern:** Explicitly used to ensure only one instance of the `GoogleGenAI` client is created and reused throughout the application's lifecycle. The instance is stored in a module-level variable `ai`.
- **Decisions:**
    - **Fixed Model:** The decision was made to hardcode the model to `"gemini-3.5-flash"` rather than making it configurable.
    - **Environment Variable Configuration:** API key management is handled via environment variables, a standard practice for separating configuration and secrets from code.
    - **Custom User-Agent:** A specific `User-Agent` header (`aistudio-build`) is set during client initialization, likely for tracking or identification purposes.