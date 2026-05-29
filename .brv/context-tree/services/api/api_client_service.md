---
title: API Client Service
summary: A typed API client wrapper for making requests to the backend. It handles POST requests and JSON parsing for the /api/predict-tokens and /api/tutor-chat endpoints.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-05-29T12:24:43.163Z'
updatedAt: '2026-05-29T12:24:43.163Z'
---
## Reason
Documenting the API client service from src/services/api.ts

## Raw Concept
**Task:**
Create a client for the backend API

**Files:**
- src/services/api.ts

**Flow:**
A generic `request` function handles the fetch logic, which is then used by specific functions like `predictTokens` and `tutorChat` for different endpoints.

## Narrative
### Structure
The service exports async functions for each API endpoint. It uses a base `request` function to encapsulate common logic like setting headers, stringifying the body, and handling errors.

### Dependencies
Depends on types defined in `../types`.

### Highlights
Provides a strongly-typed interface for interacting with the backend API, reducing the chance of runtime errors.
