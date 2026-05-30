import { Candidate, PredictTokensResponse, TutorChatResponse } from "../types";

const isDev = import.meta.env.DEV;

async function request<T>(action: string, body: unknown): Promise<T> {
  const url = isDev
    ? `/api/${action}`
    : `/backend/api-proxy.php?action=${action}`;

  const response = await fetch(url, {
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
  return request<PredictTokensResponse>("predict-tokens", { prompt });
}

export async function tutorChat(messages: { sender: string; text: string }[]): Promise<TutorChatResponse> {
  return request<TutorChatResponse>("tutor-chat", { messages });
}
