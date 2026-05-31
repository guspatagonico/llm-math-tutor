---
title: Dual Backend Architecture
summary: The project supports two independent but functionally equivalent backends — Express (Node.js) for development and PHP for production — with automatic runtime selection via import.meta.env.DEV.
tags: [architecture, dual-backend, express, php, nodejs, proxy]
related: [architecture/backend/express_server.md, architecture/backend/php_api_proxy.md, services/api/api_client_service.md]
keywords: [dual, backend, Express, PHP, environment, selection, proxy]
createdAt: '2026-05-31T00:20:00.000Z'
updatedAt: '2026-05-31T00:20:00.000Z'
---
## Reason
Documenting the dual-backend architecture where Express serves development and PHP serves production.

## Raw Concept
**Task:**
Describe the two-backend approach and the runtime selection mechanism.

**Files:**
- backend/server.ts
- backend/api-proxy.php
- src/services/api.ts

**Flow:**
Frontend (api.ts) → check import.meta.env.DEV → { dev: POST /api/{action} → Express → GoogleGenAI SDK → Gemini } OR { prod: POST /backend/api-proxy.php?action={action} → PHP proxy → cURL → Gemini }

**Timestamp:** 2026-05-31T00:20:00.000Z

**Author:** system

## Narrative
### Structure
The application has two completely independent backend implementations for the same two API endpoints (predict-tokens and tutor-chat). There is no shared code between them — each reimplements env loading, HTTP calling, response parsing, and fallback data.

### Dependencies
- **Express**: express, vite, @google/genai, dotenv (npm packages)
- **PHP**: PHP with cURL extension (zero external libraries)

### Highlights
Environment selection: `src/services/api.ts` checks `import.meta.env.DEV` to route API calls to the correct backend. In Vite dev mode → Express on same port. In production build → PHP proxy at `/backend/api-proxy.php`.
Both backends have identical graceful degradation logic — missing API key or API error returns predefined educational fallback data.
Security: the `GEMINI_API_KEY` is read server-side in both implementations and never exposed to the browser.
Model discrepancy: Express uses gemini-3.5-flash (hardcoded), PHP defaults to gemini-2.5-flash (configurable via GEMINI_MODEL env var).

### Rules
The two backends are completely independent — no shared code.\nSame two endpoints, same JSON contracts, same fallback behavior.\nAPI key always stays server-side.\nProduction deployment uses PHP proxy exclusively (Express server bundled by esbuild but not the primary production path).

## Facts
- **dual_backend**: Two independent backends (Express dev, PHP prod) implementing the same endpoints.
- **environment_selection**: Frontend auto-selects backend via import.meta.env.DEV (api.ts:3-5).
- **express_dev_url**: POST /api/{action} (api.ts:7).
- **php_prod_url**: POST /backend/api-proxy.php?action={action} (api.ts:8).
- **no_shared_code**: Express and PHP backends share no code — only the API contract (PredictTokensResponse, TutorChatResponse) and .env format.
- **model_discrepancy**: Express uses gemini-3.5-flash, PHP uses gemini-2.5-flash (configurable). Noted as intentional development vs. production model choice.
- **security**: GEMINI_API_KEY is never transmitted to the browser; read server-side by dotenv (Express) or loadEnv() (PHP).
- **build_artifacts**: pnpm build copies api-proxy.php to dist-backend/ for PHP deployment, bundles server.ts to dist/server.cjs for optional Node deployment.
- **deployment**: Production uses PHP proxy at /backend/api-proxy.php, parallel to frontend at /webapps/llm-math-tutor/.
