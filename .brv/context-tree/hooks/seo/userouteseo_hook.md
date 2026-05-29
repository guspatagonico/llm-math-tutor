---
title: useRouteSeo Hook
summary: Manages SEO metadata based on the current route.
tags: []
related: []
keywords: []
createdAt: '2026-05-29T12:31:19.792Z'
updatedAt: '2026-05-29T12:31:32.856Z'
---
## Reason
Curate from RLM context for src/hooks

## Raw Concept
**Task:**
Manage SEO metadata for different routes

**Files:**
- src/hooks/useRouteSeo.ts

**Flow:**
Detect route change -> lookup SEO constants -> update document head

**Timestamp:** 2026-05-29T12:31:05.180Z

## Narrative
### Structure
A React hook that uses `useLocation` to track the current path and applies corresponding title and description from `SEO_METADATA` constant.

### Dependencies
react-router-dom, src/constants/seo.ts

### Highlights
Dynamically updates page title and meta description for SEO.
