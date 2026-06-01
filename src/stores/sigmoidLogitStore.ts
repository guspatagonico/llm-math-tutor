import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SigmoidLogitState {
  sigmoidInput: number;
  logitInput: number;
  setSigmoidInput: (value: number) => void;
  setLogitInput: (value: number) => void;
}

export const useSigmoidLogitStore = create<SigmoidLogitState>()(
  persist(
    (set) => ({
      sigmoidInput: 0,
      logitInput: 0.5,
      setSigmoidInput: (value) => set({ sigmoidInput: value }),
      setLogitInput: (value) => set({ logitInput: value }),
    }),
    {
      name: "llm-math-tutor-sigmoid-logit-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sigmoidInput: state.sigmoidInput,
        logitInput: state.logitInput,
      }),
      version: 1,
    }
  )
);
