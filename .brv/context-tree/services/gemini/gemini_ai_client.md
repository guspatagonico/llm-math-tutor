---
title: Gemini AI Client
summary: Singleton client for Google Gemini API (gemini-3.5-flash), configured via GEMINI_API_KEY.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-05-29T12:20:17.091Z'
updatedAt: '2026-05-29T12:20:17.091Z'
consolidated_at: '2026-05-29T12:48:55.824Z'
consolidated_from: [{date: '2026-05-29T12:48:55.824Z', path: services/gemini/gemini_ai_client.overview.md, reason: The file `gemini_ai_client.overview.md` is a detailed summary of `gemini_ai_client.md` and is therefore redundant. The file `gemini_ai_client.abstract.md` is empty and contains no useful information. The content from `gemini_ai_client.md` is the most complete and serves as the single source of truth.}, {date: '2026-05-29T12:48:55.824Z', path: services/gemini/gemini_ai_client.abstract.md, reason: The file `gemini_ai_client.overview.md` is a detailed summary of `gemini_ai_client.md` and is therefore redundant. The file `gemini_ai_client.abstract.md` is empty and contains no useful information. The content from `gemini_ai_client.md` is the most complete and serves as the single source of truth.}]
related: [services/gemini/context.md]
---
## Reason
Documenting the Gemini AI client service from services/gemini.ts

## Raw Concept
**Task:**
Provide a singleton client for the Google Gemini API.

**Flow:**
1. Check for existing client instance. 2. If none, read GEMINI_API_KEY from env. 3. Initialize GoogleGenAI client. 4. Return client instance.

**Timestamp:** 2026-05-29T12:20:09.598Z

**Author:** system

## Narrative
### Structure
The file exports a singleton function `getGeminiClient()` and a constant `MODEL`. The `getGeminiClient` function ensures only one instance of the `GoogleGenAI` client is created. It uses the `GEMINI_API_KEY` environment variable for authentication. The model is fixed to "gemini-3.5-flash".

### Dependencies
Depends on `@google/genai` and `dotenv` packages. Requires `GEMINI_API_KEY` environment variable to be set.

### Highlights
Singleton pattern for the Gemini client.
Uses "gemini-3.5-flash" model.
API key is configurable via environment variable.

---

```typescript
// File: gemini.ts
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let ai: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (ai) return ai;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  ai = new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } },
  });

  return ai;
}

const MODEL = "gemini-3.5-flash";

export { MODEL };

```