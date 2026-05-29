---
children_hash: bb3fe60b24119c082e0f74cef50f0f31ced0f57561575bb15d4f5f15ad8a4ac7
compression_ratio: 0.527027027027027
condensation_order: 1
covers: [context.md, userouteseo_hook.md]
covers_token_total: 222
summary_level: d1
token_count: 117
type: summary
---
# SEO Hooks

This section covers React hooks responsible for managing Search Engine Optimization (SEO) metadata.

- **useRouteSeo Hook**: Detailed in `userouteseo_hook.md`, this hook dynamically manages page title and meta description. It listens for route changes using `useLocation` from `react-router-dom` and applies the corresponding metadata from the `SEO_METADATA` constant located in `src/constants/seo.ts`. The implementation is in `src/hooks/useRouteSeo.ts`.