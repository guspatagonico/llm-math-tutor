---
children_hash: 7bb8290a6a1686ca891c522bd088dfd0add96060caa142407323618b87674a21
compression_ratio: 0.48333333333333334
condensation_order: 2
covers: [constants/_index.md, context.md, types/_index.md, utils/_index.md]
covers_token_total: 720
summary_level: d2
token_count: 348
type: summary
---
# Frontend Domain

As defined in `context.md`, the frontend domain covers the application's structure, components, and logic, including React components, hooks, services, utilities, constants, and types. It is owned by the Frontend Team and excludes backend and infrastructure concerns.

### Constants
The application uses a centralized system for frontend configurations, with constants organized by feature within the `src/constants` directory to enhance maintainability. As detailed in `frontend_constants.md`, this includes:
- **`charts.ts`**: Configuration for chart components.
- **`learningPath.ts`**: The structured learning path for math topics.
- **`routes.ts`**: Application route-to-path mappings.
- **`seo.ts`**: SEO metadata used by the `useRouteSeo` hook.
- **`temperature.ts`**: AI model temperature settings.

### Types
Application-wide TypeScript definitions are located in the `src/types` directory, as summarized in `frontend_types.md`.
- **`api.ts`**: Defines types for API request and response payloads.
- **`math.ts`**: Contains types and enums for mathematical concepts.
- **`index.ts`**: Serves as the primary export point for all application types.

### Utilities
Global utility functions are located in `src/utils`, with further details in `frontend_utilities.md`.
- **`math.ts`**: Provides mathematical calculation functions, including softmax, sigmoid, and logit.