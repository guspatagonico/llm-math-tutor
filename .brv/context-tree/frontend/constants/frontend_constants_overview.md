---
title: Frontend Constants Overview
summary: Centralized constants for charts, learning paths, routes, SEO, and temperature settings.
tags: []
related: []
keywords: []
createdAt: '2026-05-31T00:14:44.887Z'
updatedAt: '2026-05-31T00:14:44.887Z'
---
## Reason
Curate from RLM context, documenting frontend constants.

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
Constants are defined in dedicated files and imported by components/hooks.

**Timestamp:** 2026-05-31T00:14:33.871Z

## Narrative
### Structure
Constants are organized by feature into separate files within `src/constants`. This modular approach ensures that components only import the constants they need, improving code organization and maintainability.

### Highlights
Covers a wide range of application settings from UI (charts) to core logic (learning paths, temperature) and routing/SEO.
