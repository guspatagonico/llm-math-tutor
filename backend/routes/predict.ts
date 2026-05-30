import type { Request, Response } from "express";
import { Type } from "@google/genai";
import { getGeminiClient, MODEL } from "../services/gemini";

const FALLBACK_CANDIDATES = [
  { token: " gato", logit: 8.5, explanation: "Sujeto común y altamente probable en este contexto lingüístico." },
  { token: " perro", logit: 7.2, explanation: "Otro animal doméstico muy común con alta probabilidad." },
  { token: " ratón", logit: 6.1, explanation: "Menos común, pero lógicamente posible según el verbo de acción." },
  { token: " tejado", logit: 5.4, explanation: "Un lugar físico al que se puede saltar o subir." },
  { token: " sofá", logit: 4.8, explanation: "Un objeto casero típico que sirve de destino para un salto." },
];

export async function handlePredictTokens(req: Request, res: Response) {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "El prompt es requerido." });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      prompt,
      candidates: FALLBACK_CANDIDATES,
      warning: "Clave GEMINI_API_KEY no configurada. Usando candidatos didácticos predefinidos.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `El usuario quiere entender el funcionamiento de probabilidades en un LLM. 
Te dará una frase o palabra incompleta. Tu tarea es actuar como la cabeza de predicción de un LLM (la capa final de pre-proyección antes de softmax).
Genera exactamente los 5 siguientes tokens MÁS probables en ESPAÑOL y asígnales valores de 'logits' realistas (pueden ser positivos o negativos, típicamente en un rango de -5 a +15, donde la diferencia entre el mejor logit y el resto represente visualmente la confianza).
Asigna también una breve explicación didáctica de una oración para cada uno de por qué obtuvo ese puntaje bruto.

Frase incompleta: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candidates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  token: { type: Type.STRING, description: "El token propuesto (debe incluir el espacio inicial si corresponde, p. ej. ' gato')" },
                  logit: { type: Type.NUMBER, description: "Logit (puntuación flotante cruda en escala log-odds, de -5.0 a 15.0)" },
                  explanation: { type: Type.STRING, description: "Explicación breve didáctica en español sobre su pertinencia semántica" },
                },
                required: ["token", "logit", "explanation"],
              },
            },
          },
          required: ["candidates"],
        },
      },
    });

    if (response && response.text) {
      const resultObj = JSON.parse(response.text.trim());
      return res.json({ prompt, candidates: resultObj.candidates, warning: "" });
    }

    throw new Error("No se obtuvo respuesta válida del modelo");
  } catch (error: any) {
    console.error("Error llamando a Gemini para predicción de tokens:", error);
    return res.json({
      prompt,
      candidates: FALLBACK_CANDIDATES,
      warning: `Error al conectar con la API de Gemini (${error.message || error}). Usando candidatos de respaldo.`,
    });
  }
}
