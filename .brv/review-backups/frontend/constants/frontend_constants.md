---
title: Frontend Constants
summary: Defines various constants used throughout the frontend application, including chart configs, learning paths, routes, SEO metadata, and AI temperature settings.
tags: []
related: []
keywords: []
createdAt: '2026-05-31T00:12:04.663Z'
updatedAt: '2026-05-31T00:12:04.663Z'
---
## Reason
Curate from RLM context about frontend constants

## Raw Concept
**Task:**
Document frontend constants

**Files:**
- src/constants/charts.ts
- src/constants/learningPath.ts
- src/constants/routes.ts
- src/constants/seo.ts
- src/constants/temperature.ts

**Flow:**
Constants are defined in dedicated files and imported where needed.

## Narrative
### Structure
Constants are organized by feature (charts, routes, etc.) in the `src/constants` directory.

### Highlights

- src/constants/charts.ts: Defines configuration for chart components, including aspect ratios and margins.
- src/constants/learningPath.ts: Contains the structured learning path for math topics, defining stages and concepts.
- src/constants/routes.ts: Maps application routes to their corresponding paths.
- src/constants/seo.ts: SEO metadata for different application routes.
- src/constants/temperature.ts: Defines the temperature settings for the AI model, including labels and values.
