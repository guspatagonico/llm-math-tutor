import { Candidate, PredictTokensResponse, TutorChatResponse } from "../types";

const API_BASE = "";

async function request<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error en el servidor");
  }

  return data as T;
}

export async function predictTokens(prompt: string): Promise<PredictTokensResponse> {
  return request<PredictTokensResponse>("/api/predict-tokens", { prompt });
}

export async function tutorChat(messages: { sender: string; text: string }[]): Promise<TutorChatResponse> {
  return request<TutorChatResponse>("/api/tutor-chat", { messages });
}
