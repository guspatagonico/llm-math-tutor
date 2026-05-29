---
children_hash: e8dbf6e40e85502f373fcf1c5e10983dbc93217670c0e80fc8dcc806ca1a6615
compression_ratio: 0.2348804500703235
condensation_order: 1
covers: [context.md, gemini_ai_client.md]
covers_token_total: 711
summary_level: d1
token_count: 167
type: summary
---
The `services/gemini` domain manages interaction with Google Gemini AI services.

The core of this domain is a singleton client for the Google Gemini API, detailed in **gemini_ai_client.md**. This client ensures only one instance of the `GoogleGenAI` client is created and used throughout the application.

Key architectural points:
- **Singleton Pattern**: Implemented via the `getGeminiClient()` function in `services/gemini.ts`.
- **Authentication**: The client is configured using the `GEMINI_API_KEY` environment variable.
- **Model**: It is hardcoded to use the `"gemini-3.5-flash"` model.
- **Dependencies**: Relies on the `@google/genai` and `dotenv` packages.