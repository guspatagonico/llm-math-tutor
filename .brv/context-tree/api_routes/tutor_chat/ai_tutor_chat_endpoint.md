---
title: AI Tutor Chat Endpoint
summary: Defines the API endpoint for handling chat interactions with the AI math tutor, using the Gemini API.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-05-29T12:21:54.989Z'
updatedAt: '2026-05-29T12:21:54.989Z'
---
## Reason
Documenting the AI tutor chat API endpoint from routes/tutor.ts

## Raw Concept
**Task:**
Implement AI Tutor Chat API Endpoint

**Files:**
- routes/tutor.ts

**Flow:**
Receive chat history -> Get Gemini client -> Format messages -> Call Gemini API with system instruction -> Return AI reply

**Timestamp:** 2026-05-29T12:21:38.214Z

## Narrative
### Structure
The `handleTutorChat` function in `routes/tutor.ts` serves as the controller for the tutor chat endpoint. It validates the incoming message history, interacts with the Gemini service, and formats the response.

### Dependencies
express
../services/gemini

### Highlights
- Defines a detailed system instruction in Spanish to set the AI tutor's persona.
- Checks for the `GEMINI_API_KEY` and provides a helpful fallback response if it is not configured.
- Maps the incoming message format to the format required by the Gemini API (`contents`).
- Handles errors gracefully by returning a 500 status with an error message.

---

import type { Request, Response } from "express";
import { getGeminiClient, MODEL } from "../services/gemini";

const SYSTEM_INSTRUCTION =
  "Eres un tutor experto en Inteligencia Artificial y Matemáticas Especializadas. " +
  "Explicas conceptos complejos como sigmoid, logit, softmax, gradientes de softmax, entropía, y temperatura " +
  "de manera sumamente didáctica, clara, y amigable, utilizando analogías accesibles y expresiones matemáticas limpias en formato LaTeX si es necesario. " +
  "Mantén tus respuestas bien estructuradas, lúdicas y en español.";

export async function handleTutorChat(req: Request, res: Response) {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Historial de mensajes inválido." });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      reply:
        "Hola! Soy tu tutor matemático. No tengo configurada la clave `GEMINI_API_KEY` en este momento, por lo que responderé de forma simplificada: recuerda que la probabilidad $P_i$ en Softmax se calcula como $P_i = \\frac{e^{z_i/T}}{\\sum e^{z_j/T}}$. ¡Prueba a configurar tu secretos para habilitar respuestas personalizadas completas de IA!",
      warning: "Clave GEMINI_API_KEY no configurada. Respuestas pregrabadas.",
    });
  }

  try {
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    return res.json({
      reply: response.text || "No logré generar una respuesta. Por favor reintenta.",
      warning: "",
    });
  } catch (error: any) {
    console.error("Error llamando a Gemini para tutoría:", error);
    return res.status(500).json({
      error: `Error al procesar tu pregunta con la IA Tutor: ${error.message || error}`,
    });
  }
}

