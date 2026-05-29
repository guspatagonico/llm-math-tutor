---
confidence: 1
sources: [services/_index.md, api_routes/_index.md, architecture/_index.md]
synthesized_at: '2026-05-29T12:49:32.425Z'
type: synthesis
title: Centralized Gemini API Client with Graceful Degradation
summary: A singleton Gemini client in the `services` domain is the single point of interaction for all AI features, while `api_routes` implement fallbacks for graceful degradation when the API key is missing.
tags: [gemini-api, service-client, dependency-management, graceful-degradation, api-integration]
related: []
keywords: [gemini, api, client, singleton, fallback, degradation, service, dependency, api key]
createdAt: '2026-05-29T12:49:32.425Z'
updatedAt: '2026-05-29T12:49:32.425Z'
---

# Centralized Gemini API Client with Graceful Degradation

The architecture enforces a strict pattern for external AI service interaction: a single, centralized Gemini API client (`services`) prevents logic duplication and standardizes communication. To manage this critical dependency, the `api_routes` domain implements a graceful degradation pattern, providing hardcoded fallbacks that ensure core application functionality persists even if the `GEMINI_API_KEY` is not configured.

## Evidence

- **services**: The `gemini` service manages interactions with Google Gemini AI via a singleton client, using the `GEMINI_API_KEY` for authentication.
- **api_routes**: Both the `handlePredictTokens` and `handleTutorChat` functions provide a pre-canned, hardcoded response if the `GEMINI_API_KEY` is missing, ensuring a stable user experience.
- **architecture**: The architectural refactoring plan explicitly includes 'centralizing the Gemini client into a singleton service' as a high-priority task to improve maintainability.
