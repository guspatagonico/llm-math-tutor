export interface Candidate {
  token: string;
  logit: number;
  explanation: string;
}

export interface Message {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
}

export interface PredictTokensResponse {
  prompt: string;
  candidates: Candidate[];
  warning: string;
}

export interface TutorChatResponse {
  reply: string;
  warning: string;
}

export interface ApiError {
  error: string;
}
