---
title: useTutorChat Hook
summary: Manages the state and interactions for the AI tutor chat.
tags: []
related: []
keywords: []
createdAt: '2026-05-29T12:31:19.800Z'
updatedAt: '2026-05-29T12:31:32.874Z'
---
## Reason
Curate from RLM context for src/hooks

## Raw Concept
**Task:**
Handle AI tutor chat logic

**Files:**
- src/hooks/useTutorChat.ts

**Flow:**
User sends message -> call API service -> update chat history with response

**Timestamp:** 2026-05-29T12:31:05.180Z

## Narrative
### Structure
A React hook that manages chat history, loading states, and error handling for the tutor chat. It exposes functions to send messages and post feedback.

### Dependencies
src/services/api.ts, src/types/index.ts

### Highlights
Handles streaming responses, user feedback, and maintains message history.
