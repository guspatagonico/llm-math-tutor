import { useMemo, useState, useCallback } from "react";
import { softmax, softmaxJacobian } from "../utils/math";

export function useSoftmax(initialLogits: number[]) {
  const [logits, setLogits] = useState<number[]>(initialLogits);

  const probs = useMemo(() => softmax(logits), [logits]);

  const jacobian = useMemo(() => softmaxJacobian(logits), [logits]);

  const handleLogitChange = useCallback((idx: number, val: number) => {
    setLogits((prev) => {
      const next = [...prev];
      next[idx] = Number(val.toFixed(1));
      return next;
    });
  }, []);

  const resetLogits = useCallback(() => {
    setLogits(initialLogits);
  }, [initialLogits]);

  return { logits, probs, jacobian, handleLogitChange, resetLogits };
}
