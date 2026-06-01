import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Candidate } from "../types";
import { predictTokens } from "../services/api";

const DEFAULT_PROMPT = "Había una vez un";
const DEFAULT_TEMPERATURE = 0.7;

interface TemperatureState {
  prompt: string;
  candidates: Candidate[];
  temperature: number;
  isPredicting: boolean;
  warningMsg: string;
  setPrompt: (prompt: string) => void;
  setTemperature: (value: number) => void;
  fetchCandidates: (textPrompt: string) => Promise<void>;
}

export const useTemperatureStore = create<TemperatureState>()(
  persist(
    (set) => ({
      prompt: DEFAULT_PROMPT,
      candidates: [],
      temperature: DEFAULT_TEMPERATURE,
      isPredicting: false,
      warningMsg: "",
      setPrompt: (prompt) => set({ prompt }),
      setTemperature: (value) => set({ temperature: value }),
      fetchCandidates: async (textPrompt: string) => {
        set({ isPredicting: true, warningMsg: "" });
        try {
          const data = await predictTokens(textPrompt);
          if (data.candidates && data.candidates.length > 0) {
            set({
              candidates: data.candidates,
              warningMsg: data.warning || "",
            });
          }
        } catch (err: any) {
          console.error(err);
          set({ warningMsg: "Error al obtener candidatos. Usando datos de simulación local." });
        } finally {
          set({ isPredicting: false });
        }
      },
    }),
    {
      name: "llm-math-tutor-temperature-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        prompt: state.prompt,
        temperature: state.temperature,
      }),
      version: 1,
    }
  )
);
