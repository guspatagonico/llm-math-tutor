---
title: API Data Structures
summary: Defines the core data structures for API communication, including Candidate, Message, and response types for token prediction and tutor chat.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-05-29T12:24:43.154Z'
updatedAt: '2026-05-29T12:24:43.154Z'
---
## Reason
Documenting API type definitions from src/types/api.ts

## Raw Concept
**Task:**
Define API data structures

**Files:**
- src/types/api.ts
- src/types/index.ts

**Flow:**
Types are defined in api.ts and exported via index.ts for application-wide use.

## Narrative
### Structure
Contains interfaces for API request and response payloads. `Candidate` represents a single token prediction. `Message` is a chat message. `PredictTokensResponse` and `TutorChatResponse` are the main response types.

### Highlights
Clear separation of API types into their own module for easy maintenance and reuse.
