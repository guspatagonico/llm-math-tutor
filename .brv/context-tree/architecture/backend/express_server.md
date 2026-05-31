---
title: Express Dev Server
summary: Express server (Node.js/TypeScript) on port 3000 with Vite middleware in dev, SPA static serving in prod. Routes predict-tokens and tutor-chat via GoogleGenAI SDK.
tags: [express, nodejs, typescript, vite, dev-server]
related: [backend/routes/predict.ts, backend/routes/tutor.ts, services/gemini/gemini_ai_client.md, architecture/backend/php_api_proxy.md]
keywords: [express, vite, middleware, SPA, HMR, GoogleGenAI]
createdAt: '2026-05-31T00:20:00.000Z'
updatedAt: '2026-05-31T00:20:00.000Z'
---
## Reason
Documenting the Express/Node.js development server architecture from backend/server.ts.

## Raw Concept
**Task:**
Provide a dev server that serves both Vite HMR and API routes on the same port.

**Files:**
- backend/server.ts
- backend/routes/predict.ts
- backend/routes/tutor.ts
- backend/services/gemini.ts

**Flow:**
Browser → Express (port 3000) → route handler → GoogleGenAI SDK → Gemini API → route handler → Browser

**Timestamp:** 2026-05-31T00:20:00.000Z

**Author:** system

## Narrative
### Structure
The Express server (`backend/server.ts`, 35 lines) creates an Express app on port 3000 (bound to 0.0.0.0 for LAN access). It registers `express.json()` middleware and two POST routes: `/api/predict-tokens` and `/api/tutor-chat`.

### Dependencies
Depends on `express`, `vite`, `@google/genai`, and `dotenv`. Route handlers in `backend/routes/predict.ts` and `backend/routes/tutor.ts` use the Gemini client singleton from `backend/services/gemini.ts`.

### Highlights
In development mode (`NODE_ENV !== "production"`): mounts Vite as middleware (`createViteServer` with `middlewareMode: true`), enabling HMR and fast refresh on the same port as the API.
In production mode: serves static files from `dist/` directory with SPA fallback (`*` → `index.html`).
Graceful degradation: if `GEMINI_API_KEY` is missing, returns predefined educational fallback data instead of errors.

### Rules
The server always listens on `0.0.0.0:3000`.\nVite and Express share the same port — Vite proxies non-asset requests through to Express.\nAPI key is read from root `.env` via `dotenv.config()` in `services/gemini.ts`.

## Facts
- **express_server**: Express app created in backend/server.ts, listens on port 3000 on all interfaces.
- **vite_middleware**: In development, Vite is mounted as Express middleware for HMR and fast refresh.
- **spa_fallback**: In production, all non-API requests serve index.html for client-side routing.
- **gemini_singleton**: The GoogleGenAI client is a singleton (services/gemini.ts), initialized once with the API key from root .env.
- **model_gemini_3_5_flash**: Express uses gemini-3.5-flash (hardcoded constant MODEL in services/gemini.ts:22).
- **fallback_candidates**: Predefined array of 5 Spanish tokens with logits and explanations when API key is missing.
- **fallback_tutor_reply**: Hardcoded Spanish tutor message with Softmax formula when API key is missing.
- **predict_route**: handlePredictTokens in routes/predict.ts validates prompt, calls Gemini with JSON response schema, parses candidates.
- **tutor_route**: handleTutorChat in routes/tutor.ts maps message senders to Gemini roles, adds system instruction for Spanish AI/math tutor.
