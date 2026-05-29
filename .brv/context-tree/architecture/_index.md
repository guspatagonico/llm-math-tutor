---
children_hash: 01ccf847448c75a1a534f88b862959a83ef513f724e94aa3ec5d3f5f54f4103d
compression_ratio: 0.35130848532910386
condensation_order: 2
covers: [centralized-gemini-api-client-with-graceful-degradation.md, llm_math_tutor/_index.md, type-safe-client-server-api-layer.md]
covers_token_total: 1261
summary_level: d2
token_count: 443
type: summary
---
An architectural analysis detailed in **architectural_analysis_and_refactoring_plan.md** identified significant DRY, SOLID, and KISS violations in the project's initial monolithic structure. This prompted a major refactoring effort to establish a modular architecture with a clear separation of concerns, resulting in key patterns for API communication and external service integration.

### Key Architectural Patterns

*   **Type-Safe Client-Server API Layer**: A strict, type-safe boundary is enforced between the client and server. This pattern, detailed in **type-safe-client-server-api-layer.md**, uses three core components:
    *   `types/api`: Centralizes shared data structures (e.g., `Candidate`, `Message`) that act as the data contract.
    *   `api_routes`: Defines the server-side endpoints.
    *   `services/api`: Provides a strongly-typed client-side wrapper (`src/services/api.ts`) for all frontend-backend communication.

*   **Centralized Gemini API Client with Graceful Degradation**: As documented in **centralized-gemini-api-client-with-graceful-degradation.md**, all interactions with the Google Gemini AI are managed by a single, centralized singleton client in `services/gemini.ts`. To handle dependency failures, API routes like `handlePredictTokens` and `handleTutorChat` implement graceful degradation, providing hardcoded fallback responses if the `GEMINI_API_KEY` is missing, ensuring application stability.

### Refactoring Priorities

The refactoring plan outlined several high-priority actions, including:
*   Replacing a custom markdown parser with `react-markdown`.
*   Decomposing complex UI into single-responsibility hooks (`useSoftmax`, `useTutorChat`).
*   Extracting constants to dedicated files (e.g., `constants/temperature.ts`).