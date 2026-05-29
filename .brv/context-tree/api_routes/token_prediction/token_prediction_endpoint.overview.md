### Key Points
- The document describes a `handlePredictTokens` API endpoint that simulates an LLM's next-token prediction.
- It uses the Google Gemini API as the backend to generate 5 likely token candidates based on a user-provided prompt.
- A detailed "meta-prompt" is used to instruct the Gemini model to act as a prediction head, generating tokens, realistic logit scores, and didactic explanations.
- The endpoint enforces a strict JSON output structure from Gemini using the `responseSchema` feature, ensuring reliable parsing.
- It includes a set of hardcoded `FALLBACK_CANDIDATES` for didactic purposes, which are returned if the `GEMINI_API_KEY` is missing or if the API call fails.
- The response for each candidate includes the token string, a simulated `logit` (raw score), and a human-readable `explanation`.

### Structure / Sections Summary
1.  **Metadata & Reason**: Defines the document's purpose: to specify the token prediction API endpoint located in `routes/predict.ts`.
2.  **Raw Concept**: Outlines the high-level flow: receive a prompt, construct a meta-prompt for the Gemini client, call the API with a JSON schema, and return the parsed candidates.
3.  **Narrative & Highlights**: Details the implementation, noting the use of a meta-prompt, JSON schema enforcement, and the didactic fallback mechanism.
4.  **Code Implementation (`handlePredictTokens`)**:
    - Defines the `FALLBACK_CANDIDATES` constant.
    - The `handlePredictTokens` function validates the incoming `prompt`.
    - It checks for the `GEMINI_API_KEY` via `getGeminiClient()`. If absent, it returns the fallback data with a warning.
    - It constructs a detailed prompt in Spanish, instructing the model on its task.
    - It calls the Gemini `generateContent` method, specifying `application/json` as the `responseMimeType` and providing a `responseSchema` to structure the output.
    - A `try...catch` block handles potential API errors, returning the fallback data if an error occurs.

### Notable Entities, Patterns, or Decisions
- **Entities**:
    - `handlePredictTokens`: The main Express controller function for the endpoint.
    - `Gemini API`: The external LLM service used for the core logic.
    - `FALLBACK_CANDIDATES`: A hardcoded array of token objects used for demonstration and error handling.
- **Patterns**:
    - **Meta-Prompting**: The core design pattern is using one LLM (Gemini) to simulate a specific internal component (the prediction head) of another LLM. The prompt is highly instructional.
    - **Graceful Degradation / Didactic Fallback**: The decision to return a useful, hardcoded example on failure (e.g., missing API key) makes the endpoint more robust and educational.
- **Decisions**:
    - **Schema Enforcement over String Parsing**: The choice to use Gemini's built-in `responseSchema` feature is a key decision that ensures reliable, structured JSON output, avoiding fragile manual parsing of a model's text response.
    - **Logit Simulation**: The endpoint doesn't calculate true logits but explicitly asks the LLM to *simulate* realistic logit values to help users understand the concept of raw model scores before a softmax function is applied.