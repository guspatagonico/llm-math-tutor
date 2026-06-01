---
title: PHP Proxy Endpoints
summary: Defines the API endpoints for token prediction, tutor chat, and debugging provided by api-proxy.php.
tags: []
related: [architecture/backend/php_api_proxy.md]
keywords: [API Endpoints, Routing, Token Prediction, Tutor Chat]
createdAt: '2026-05-31T00:13:34.653Z'
updatedAt: '2026-05-31T00:13:34.653Z'
consolidated_at: '2026-05-31T00:32:54.941Z'
consolidated_from: [{date: '2026-05-31T00:32:54.941Z', path: api_routes/proxy/context.md, reason: 'All four files pertain to the same topic: the PHP proxy endpoints. ''php_proxy_endpoints.md'' is the primary document, ''context.md'' and ''php_proxy_endpoints.overview.md'' are redundant summaries or analyses of it, and ''php_proxy_endpoints.abstract.md'' is empty. Merging consolidates this duplicated information into a single, comprehensive file.'}, {date: '2026-05-31T00:32:54.941Z', path: api_routes/proxy/php_proxy_endpoints.abstract.md, reason: 'All four files pertain to the same topic: the PHP proxy endpoints. ''php_proxy_endpoints.md'' is the primary document, ''context.md'' and ''php_proxy_endpoints.overview.md'' are redundant summaries or analyses of it, and ''php_proxy_endpoints.abstract.md'' is empty. Merging consolidates this duplicated information into a single, comprehensive file.'}, {date: '2026-05-31T00:32:54.941Z', path: api_routes/proxy/php_proxy_endpoints.overview.md, reason: 'All four files pertain to the same topic: the PHP proxy endpoints. ''php_proxy_endpoints.md'' is the primary document, ''context.md'' and ''php_proxy_endpoints.overview.md'' are redundant summaries or analyses of it, and ''php_proxy_endpoints.abstract.md'' is empty. Merging consolidates this duplicated information into a single, comprehensive file.'}]
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
- **POST ?action=predict-tokens:** Accepts a prompt and returns 5 likely next tokens with logits.
- **POST ?action=tutor-chat:** Accepts message history and returns a conversational AI response.
- **GET ?action=debug=1:** Returns server environment and configuration details for diagnostics.

### Rules
- Handles HTTP OPTIONS method for CORS preflight checks.
- Returns a 400 Bad Request for invalid actions.

### Notable Entities, Patterns, and Decisions
- **Entities**: `api-proxy.php`, `predict-tokens` action, `tutor-chat` action.
- **Patterns**:
    - **Query Parameter Routing**: The decision to use a query parameter (`?action=...`) for routing is a simple pattern that avoids the need for complex server-side routing rules (like `.htaccess`) or a dedicated routing library, making it ideal for a single-file API.
- **Decisions**:
    - **Explicit CORS Handling**: The decision to explicitly handle `OPTIONS` requests is crucial for allowing cross-origin communication from a web-based frontend.
    - **Dedicated Debug Endpoint**: Providing a specific `debug=1` endpoint is a deliberate choice to facilitate easier diagnostics and environment checks without making a live API call to the external service.
    - **Clear Error Signaling**: The rule to return a `400 Bad Request` for invalid actions provides a clear and standard-compliant way for clients to understand when they have made an invalid request.