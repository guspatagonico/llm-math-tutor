---
confidence: 1
sources: [services/_index.md, types/_index.md, api_routes/_index.md]
synthesized_at: '2026-05-29T12:49:32.428Z'
type: synthesis
title: Type-Safe Client-Server API Layer
summary: A dedicated `api` service client provides a type-safe interface for the frontend to interact with backend API routes, using shared data structures from the `types` domain.
tags: [api-layer, type-safety, client-server, data-contracts, typescript]
related: []
keywords: [api, types, client, service, wrapper, typescript, interface, payload, data structure, contract]
createdAt: '2026-05-29T12:49:32.428Z'
updatedAt: '2026-05-29T12:49:32.428Z'
---

# Type-Safe Client-Server API Layer

The application maintains a strict, type-safe boundary between the frontend and backend. The `api_routes` domain defines the server endpoints, the `services/api` domain provides a typed client-side wrapper for those endpoints, and the `types/api` domain provides the shared, centralized data structures (e.g., `Candidate`, `Message`) that serve as the contract for all communication.

## Evidence

- **services**: The API client service is a 'typed wrapper' in `src/services/api.ts` that provides strongly-typed functions like `predictTokens` and `tutorChat`.
- **types**: The `types/api` domain 'centralizes core data structures for API communication' and defines the primary interfaces for API payloads, such as `PredictTokensResponse`.
- **api_routes**: This domain documents the server-side API endpoints, such as the token prediction and AI tutor chat endpoints, which the client-side service consumes.
