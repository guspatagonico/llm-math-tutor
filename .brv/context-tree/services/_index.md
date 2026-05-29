---
children_hash: f911783749d0103a740413275cc2b24c96b9d2310fbebd2fa2e228eebe9412f2
compression_ratio: 0.4309978768577495
condensation_order: 2
covers: [api/_index.md, gemini/_index.md]
covers_token_total: 471
summary_level: d2
token_count: 203
type: summary
---
The `services` domain encapsulates client-side services for interacting with both the application's backend and external AI providers.

- **API Client (`services/api`)**: A type-safe API client, detailed in **api_client_service.md**, provides functions for backend communication. It uses a centralized `request` function to handle POST requests to endpoints like `/api/predict-tokens` and `/api/tutor-chat`, ensuring type safety with definitions from `../types`.

- **Gemini AI Client (`services/gemini`)**: A singleton client, described in **gemini_ai_client.md**, manages all interactions with the Google Gemini API. The `getGeminiClient()` function in `services/gemini.ts` ensures a single instance, configured via the `GEMINI_API_KEY` environment variable and hardcoded to use the `"gemini-3.5-flash"` model.