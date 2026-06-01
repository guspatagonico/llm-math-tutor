---
title: Frontend Constants
summary: Defines and provides an overview of the centralized constants for charts, learning paths, routes, SEO, and AI temperature settings used throughout the frontend application.
tags: [constants, frontend, configuration]
keywords: [charts, learning-path, routes, seo, temperature-settings]
related: []
createdAt: '2026-05-31T00:12:04.663Z'
updatedAt: '2026-05-31T00:31:57.162Z'
consolidated_at: '2026-05-31T00:32:15.142Z'
consolidated_from: [{date: '2026-05-31T00:32:15.142Z', path: frontend/constants/frontend_constants_overview.md, reason: 'These files are highly redundant and cover the same topic: the organization and content of frontend constants. The set includes two primary documents with significant overlap, multiple generated summaries/overviews of those documents, and a topic context file whose concepts are covered in the main files. Consolidating them into a single, comprehensive document will eliminate redundancy and create a canonical source of information for this topic.'}, {date: '2026-05-31T00:32:15.142Z', path: frontend/constants/context.md, reason: 'These files are highly redundant and cover the same topic: the organization and content of frontend constants. The set includes two primary documents with significant overlap, multiple generated summaries/overviews of those documents, and a topic context file whose concepts are covered in the main files. Consolidating them into a single, comprehensive document will eliminate redundancy and create a canonical source of information for this topic.'}, {date: '2026-05-31T00:32:15.142Z', path: frontend/constants/frontend_constants.overview.md, reason: 'These files are highly redundant and cover the same topic: the organization and content of frontend constants. The set includes two primary documents with significant overlap, multiple generated summaries/overviews of those documents, and a topic context file whose concepts are covered in the main files. Consolidating them into a single, comprehensive document will eliminate redundancy and create a canonical source of information for this topic.'}, {date: '2026-05-31T00:32:15.142Z', path: frontend/constants/frontend_constants_overview.abstract.md, reason: 'These files are highly redundant and cover the same topic: the organization and content of frontend constants. The set includes two primary documents with significant overlap, multiple generated summaries/overviews of those documents, and a topic context file whose concepts are covered in the main files. Consolidating them into a single, comprehensive document will eliminate redundancy and create a canonical source of information for this topic.'}, {date: '2026-05-31T00:32:15.142Z', path: frontend/constants/frontend_constants_overview.overview.md, reason: 'These files are highly redundant and cover the same topic: the organization and content of frontend constants. The set includes two primary documents with significant overlap, multiple generated summaries/overviews of those documents, and a topic context file whose concepts are covered in the main files. Consolidating them into a single, comprehensive document will eliminate redundancy and create a canonical source of information for this topic.'}, {date: '2026-05-31T00:32:15.142Z', path: frontend/constants/frontend_constants.abstract.md, reason: 'These files are highly redundant and cover the same topic: the organization and content of frontend constants. The set includes two primary documents with significant overlap, multiple generated summaries/overviews of those documents, and a topic context file whose concepts are covered in the main files. Consolidating them into a single, comprehensive document will eliminate redundancy and create a canonical source of information for this topic.'}]
---
## Reason
To curate and document the structure and purpose of frontend constants from RLM context, consolidating multiple overlapping entries into a single source of truth.

## Raw Concept
**Task:**
Document the structure and purpose of frontend constants

**Files:**
- src/constants/charts.ts
- src/constants/learningPath.ts
- src/constants/routes.ts
- src/constants/seo.ts
- src/constants/temperature.ts

**Flow:**
Constants are defined in dedicated files by feature and are imported by components and hooks where needed.

**Timestamp:** 2026-05-31T00:14:33.871Z

## Narrative
### Structure
Constants are organized by feature into separate files within the `src/constants` directory. This modular approach is a key architectural choice that ensures components only import the constants they need, improving code organization, clarity, and maintainability.

### Highlights
This centralized system covers a wide range of application settings, from UI elements to core logic and routing:

- **src/constants/charts.ts:** Defines configuration for chart components, including aspect ratios and margins.
- **src/constants/learningPath.ts:** Contains the structured learning path for math topics, defining stages and concepts.
- **src/constants/routes.ts:** Maps application routes to their corresponding paths for consistent navigation.
- **src/constants/seo.ts:** Contains SEO metadata for different application routes to be used by the `useRouteSeo` hook.
- **src/constants/temperature.ts:** Defines the temperature settings for the AI model, including user-facing labels and corresponding numerical values.