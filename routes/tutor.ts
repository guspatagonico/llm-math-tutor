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
