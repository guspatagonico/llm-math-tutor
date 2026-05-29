---
children_hash: 1ebea3dc5fe159e1a65af8315e1c80be3b902b795d4314a73720a8440f136bed
compression_ratio: 0.2973273942093541
condensation_order: 1
covers: [ai_tutor_chat_endpoint.md, context.md]
covers_token_total: 898
summary_level: d1
token_count: 267
type: summary
---
## Topic: Tutor Chat API

This topic covers the API endpoints that power the LLM Math Tutor application, handling user interactions for the chat tutor. Key concepts include request handling, response formatting, and integration with the Gemini API.

### AI Tutor Chat Endpoint
As detailed in `ai_tutor_chat_endpoint.md`, this endpoint is the core of the chat functionality.

-   **Implementation**: The `handleTutorChat` function in `routes/tutor.ts` serves as the controller.
-   **Workflow**: It receives a user's chat history, formats the messages into the structure required by the Gemini API, and calls the service to generate a response.
-   **Key Features**:
    -   A detailed system instruction in Spanish is used to define the AI tutor's expert, friendly, and didactic persona.
    -   The system includes a crucial check for the `GEMINI_API_KEY`. If the key is not configured, it returns a helpful, pre-canned response to the user, ensuring the application remains functional.
    -   Includes error handling to manage issues during the API call to Gemini.