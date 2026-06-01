---
children_hash: 5663ce73dee8abc993ef7a21f56247f57907744d8eb07564edb0f94c65b4936e
compression_ratio: 0.16124260355029585
condensation_order: 1
covers: [frontend_constants.md]
covers_token_total: 1352
summary_level: d1
token_count: 218
type: summary
---
### Frontend Constants

As detailed in `frontend_constants.md`, the application employs a centralized system for managing frontend configurations, with a key architectural choice of organizing constants by feature into separate files within the `src/constants` directory. This modular approach enhances maintainability and clarity.

The primary constant files include:
- **`charts.ts`**: Defines configuration for chart components, including aspect ratios and margins.
- **`learningPath.ts`**: Contains the structured learning path for math topics.
- **`routes.ts`**: Maps application routes to their paths for consistent navigation.
- **`seo.ts`**: Holds SEO metadata for application routes, which is utilized by the `useRouteSeo` hook.
- **`temperature.ts`**: Specifies the temperature settings for the AI model, including user-facing labels and their numerical values.