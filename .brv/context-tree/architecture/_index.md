---
children_hash: 15e8c85d76a23d6d039d15610236e476a4fccfb0378ae981836f4be9e6dca742
compression_ratio: 0.28927410617551463
condensation_order: 2
covers: [backend/_index.md, centralized-gemini-api-client-with-graceful-degradation.md, llm_math_tutor/_index.md, type-safe-client-server-api-layer.md]
covers_token_total: 1846
summary_level: d2
token_count: 534
type: summary
---
# Architecture Overview

The project's architecture evolved from a monolithic 9-file structure to a modular, ~30-file system to resolve critical DRY, SOLID, and KISS principle violations. This refactoring, detailed in **architectural_analysis_and_refactoring_plan.md**, established a clear separation of concerns with dedicated domains for services, hooks, components, and types.

### Dual Backend System
The application employs a **dual backend architecture** to serve different environments, with the frontend selecting the appropriate backend at runtime via `src/services/api.ts`. Both backends are functionally equivalent, implementing the same API contract for `predict-tokens` and `tutor-chat` endpoints.
-   **Development Server**: A Node.js/Express server (`backend/server.ts`) integrated with Vite for HMR, as described in `express_server.md`.
-   **Production Proxy**: A dependency-free PHP script (`backend/api-proxy.php`) that acts as a secure proxy using cURL, detailed in `php_api_proxy.md`.

### Core Architectural Patterns
Two key patterns govern service interaction and client-server communication:

1.  **Centralized API Client with Graceful Degradation**: As outlined in **centralized-gemini-api-client-with-graceful-degradation.md**, all interactions with the Gemini AI service are managed by a single, centralized singleton client in the `services` domain. To handle dependency failures, API routes implement a graceful degradation pattern, returning hardcoded fallback data if the `GEMINI_API_KEY` is missing, ensuring a stable user experience.

2.  **Type-Safe API Layer**: The application enforces a strict, type-safe boundary between the client and server, as documented in **type-safe-client-server-api-layer.md**. This is achieved through three components:
    -   **`api_routes`**: Defines the server-side endpoints.
    -   **`types/api`**: Provides shared, centralized data structures (e.g., `Candidate`, `Message`) that form the API contract.
    -   **`services/api`**: A typed client-side wrapper (`src/services/api.ts`) that provides strongly-typed functions for the frontend to consume the backend API.