---
children_hash: 4d88c3e82afb46aff5f78c175b30e783c173d7654d7aa91f00695c7be2f616c7
compression_ratio: 0.12822647793505412
condensation_order: 1
covers: [token_prediction_endpoint.md]
covers_token_total: 1201
summary_level: d1
token_count: 154
type: summary
---
## API Routes

This domain covers the API endpoints for the application.

### Token Prediction

-   **`token_prediction_endpoint.md`**: Documents the token prediction API endpoint located in `routes/predict.ts`. The `handlePredictTokens` function acts as the controller, using the Gemini API to simulate an LLM's prediction head. It constructs a detailed meta-prompt to generate 5 token candidates with logits and explanations, enforcing a specific JSON output schema. A key feature is the inclusion of hardcoded fallback candidates for didactic purposes if the Gemini API call fails or the API key is not configured.