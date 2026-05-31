# Topic: backend

## Overview
Dual backend architecture: Express (Node.js) for development with Vite middleware and GoogleGenAI SDK; PHP proxy for production with cURL to Gemini API. Both implement the same two endpoints (predict-tokens, tutor-chat) with identical fallback behavior.

## Key Concepts
- Express Dev Server (Vite middleware, HMR, port 3000)
- PHP API Proxy (self-contained, zero dependencies, cURL)
- Server-Side API Key (never exposed to browser)
- CORS
- Fallback Logic (FALLBACK_CANDIDATES, FALLBACK_TUTOR_REPLY)
- Environment Selection (import.meta.env.DEV in api.ts)
- Gemini API (generateContent endpoint)
- Graceful Degradation
