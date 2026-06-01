---
title: PHP Proxy Endpoints
summary: Defines the API endpoints for token prediction, tutor chat, and debugging provided by api-proxy.php.
tags: []
related: [architecture/backend/php_api_proxy.md]
keywords: []
createdAt: '2026-05-31T00:13:34.653Z'
updatedAt: '2026-05-31T00:13:34.653Z'
---
## Reason
Documenting the specific API endpoints exposed by the PHP proxy.

## Raw Concept
**Task:**
Define the API routes handled by the PHP proxy.

**Files:**
- backend/api-proxy.php

**Timestamp:** 2026-05-31T00:12:19.318Z

**Author:** ByteRover Agent

## Narrative
### Structure
The proxy uses a single entry point (`api-proxy.php`) with a `?action=` query parameter for routing.

### Highlights
POST ?action=predict-tokens: Accepts a prompt and returns 5 likely next tokens with logits.
POST ?action=tutor-chat: Accepts message history and returns a conversational AI response.
GET ?action=debug=1: Returns server environment and configuration details for diagnostics.

### Rules
Handles HTTP OPTIONS method for CORS preflight checks.\nReturns a 400 Bad Request for invalid actions.
