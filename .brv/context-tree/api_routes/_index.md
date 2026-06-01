---
children_hash: 314e7001931eb49b335d322b606083b8c05d1abfbe77a8863f8937ee5bb7d9f0
compression_ratio: 0.44654088050314467
condensation_order: 2
covers: [proxy/_index.md, token_prediction/_index.md, tutor_chat/_index.md]
covers_token_total: 795
summary_level: d2
token_count: 355
type: summary
---
This domain covers the application's API endpoints, which are handled by both a Node.js/Express backend and a PHP proxy for routing flexibility.

### Core API Endpoints

The primary application logic is implemented in two main endpoints:

*   **Tutor Chat**: The core of the conversational AI, detailed in `ai_tutor_chat_endpoint.md`. The `handleTutorChat` controller in `routes/tutor.ts` formats chat history for the Gemini API. It uses a detailed system instruction in Spanish to define the AI's expert persona and includes a crucial check for the `GEMINI_API_KEY`, returning a pre-canned response if the key is missing to ensure functionality.

*   **Token Prediction**: As documented in `token_prediction_endpoint.md`, the `handlePredictTokens` controller (`routes/predict.ts`) simulates an LLM's prediction head. It uses the Gemini API to generate 5 token candidates with logits and explanations, enforcing a specific JSON output schema. For didactic purposes, it provides hardcoded fallback candidates if the API key is not configured.

### PHP Proxy

A PHP proxy (`backend/api-proxy.php`), described in `php_proxy_endpoints.md`, offers a simplified routing layer. It uses a `?action=` query parameter to direct traffic to the `tutor-chat` and `predict-tokens` endpoints. This architecture simplifies routing and explicitly handles CORS `OPTIONS` requests and provides a `?action=debug=1` endpoint for diagnostics.