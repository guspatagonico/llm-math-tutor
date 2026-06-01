---
children_hash: 17d709843d7669f4aefac7198d99c3f15240e9b032ca62c4b10d18c95a20c699
compression_ratio: 0.13841113841113842
condensation_order: 1
covers: [context.md, dual_backend_architecture.md, express_server.md, php_api_proxy.md]
covers_token_total: 3663
summary_level: d1
token_count: 507
type: summary
---
# Backend Architecture

The project features a **dual backend architecture** to support different environments, as detailed in `dual_backend_architecture.md`. The frontend automatically selects the appropriate backend at runtime by checking `import.meta.env.DEV` in `src/services/api.ts`.

Both backends are functionally equivalent, sharing no code but implementing the same API contract for two endpoints:
-   `predict-tokens`: Generates the five most likely next tokens for a given prompt.
-   `tutor-chat`: Provides a conversational response from an AI math tutor.

Key shared principles include:
-   **Security**: The `GEMINI_API_KEY` is always managed server-side and never exposed to the client.
-   **Graceful Degradation**: If the API key is missing or an API call fails, both backends return predefined fallback data (`FALLBACK_CANDIDATES`, `FALLBACK_TUTOR_REPLY`) to ensure a consistent user experience.

### Express Development Server
Detailed in `express_server.md`, this backend is for development.
-   **File**: `backend/server.ts`
-   **Stack**: Node.js, Express, and TypeScript.
-   **Integration**: Uses Vite as middleware (`createViteServer`) to serve the API and frontend with HMR on the same port (3000).
-   **API Client**: Interacts with the Gemini API via the `@google/genai` SDK, using a singleton client.
-   **Model**: Hardcodes the `gemini-3.5-flash` model.

### PHP Production Proxy
Detailed in `php_api_proxy.md`, this is the production-ready backend.
-   **File**: `backend/api-proxy.php`
-   **Stack**: A self-contained PHP script with no external libraries, requiring only the cURL extension.
-   **Functionality**: Acts as a secure proxy, routing requests based on an `action` query parameter (`?action=predict-tokens`). It includes custom functions for loading `.env` files and making cURL requests.
-   **API Client**: Makes direct HTTP POST requests to the Gemini API using cURL.
-   **Model**: Defaults to `gemini-2.5-flash`, but is configurable via the `GEMINI_MODEL` environment variable.