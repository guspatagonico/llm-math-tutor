import { useState, useEffect, useMemo, useCallback } from "react";
import { normalizeSteps } from "../utils/math";
import { Candidate } from "../types";
import { predictTokens } from "../services/api";

export function useTemperature(defaultPrompt: string, defaultTemperature: number) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [temperature, setTemperature] = useState(defaultTemperature);
  const [isPredicting, setIsPredicting] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const fetchCandidates = useCallback(async (textPrompt: string) => {
    setIsPredicting(true);
    setWarningMsg("");
    try {
      const data = await predictTokens(textPrompt);
      if (data.candidates && data.candidates.length > 0) {
        setCandidates(data.candidates);
        if (data.warning) setWarningMsg(data.warning);
      }
    } catch (err: any) {
      console.error(err);
      setWarningMsg("Error al obtener candidatos. Usando datos de simulación local.");
    } finally {
      setIsPredicting(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates(defaultPrompt);
  }, []);

  const steps = useMemo(
    () => normalizeSteps(candidates, Math.max(0.01, temperature)),
    [candidates, temperature]
  );

  return {
    prompt,
    setPrompt,
    candidates,
    temperature,
    setTemperature,
    isPredicting,
    warningMsg,
    steps,
    fetchCandidates,
  };
}
