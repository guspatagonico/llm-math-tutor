---
children_hash: 59bd9ffa4d1898e372cb2ee9ffeff0c77fdefa0058aa1455ef06caf56535bbfc
compression_ratio: 0.4855595667870036
condensation_order: 2
covers: [token_prediction/_index.md, tutor_chat/_index.md]
covers_token_total: 554
summary_level: d2
token_count: 269
type: summary
---
## API Routes

This domain documents the application's API endpoints, which are primarily responsible for interacting with the Gemini AI service.

### Token Prediction
-   **`token_prediction_endpoint.md`**: Details the token prediction endpoint implemented in `routes/predict.ts`. The `handlePredictTokens` function simulates an LLM's prediction head by sending a detailed meta-prompt to the Gemini API to generate token candidates with logits. A key architectural feature is the inclusion of hardcoded fallback candidates to ensure functionality even if the Gemini API call fails or the API key is not configured.

### Tutor Chat
-   **`ai_tutor_chat_endpoint.md`**: Covers the core AI tutor chat functionality, controlled by the `handleTutorChat` function in `routes/tutor.ts`. The endpoint processes user chat history, formats it for the Gemini API, and uses a detailed system instruction in Spanish to define the tutor's persona. Similar to the prediction endpoint, it provides a pre-canned response if the `GEMINI_API_KEY` is missing, ensuring a graceful user experience.