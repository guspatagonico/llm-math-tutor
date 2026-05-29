---
children_hash: 51a317a1b0a7253d2703ad384fc9f0284f0e6abe3df6b9ea85ba525a08d62a26
compression_ratio: 0.6457564575645757
condensation_order: 1
covers: [api_client_service.md]
covers_token_total: 271
summary_level: d1
token_count: 175
type: summary
---
The `services/api` domain details the API client service, a typed wrapper for backend requests originating from `src/services/api.ts`, as documented in **api_client_service.md**.

- **Core Functionality**: Provides strongly-typed async functions (`predictTokens`, `tutorChat`) for making POST requests to the `/api/predict-tokens` and `/api/tutor-chat` endpoints.
- **Architecture**: A generic `request` function centralizes common logic such as setting headers, handling the fetch process, and managing errors. This promotes code reuse for specific endpoint clients.
- **Dependencies**: The service relies on type definitions from `../types` to ensure type safety across the client-server boundary.