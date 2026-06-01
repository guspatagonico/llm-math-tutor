import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const INITIAL_LOGITS = [3.0, 1.5, 0.5];

interface SoftmaxState {
  logits: number[];
  correctTokenIdx: number;
  setLogit: (idx: number, val: number) => void;
  setCorrectTokenIdx: (idx: number) => void;
  resetLogits: () => void;
}

export const useSoftmaxStore = create<SoftmaxState>()(
  persist(
    (set) => ({
      logits: INITIAL_LOGITS,
      correctTokenIdx: 0,
      setLogit: (idx, val) => {
        set((state) => {
          const next = [...state.logits];
          next[idx] = Number(val.toFixed(1));
          return { logits: next };
        });
      },
      setCorrectTokenIdx: (idx) => set({ correctTokenIdx: idx }),
      resetLogits: () => set({ logits: INITIAL_LOGITS }),
    }),
    {
      name: "llm-math-tutor-softmax-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        logits: state.logits,
        correctTokenIdx: state.correctTokenIdx,
      }),
      version: 1,
    }
  )
);
