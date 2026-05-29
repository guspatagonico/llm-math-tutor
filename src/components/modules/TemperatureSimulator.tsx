import React, { useState } from "react";
import { Sparkles, Play, PlusCircle, Flame } from "lucide-react";
import { Cell } from "recharts";
import { useTemperature } from "../../hooks/useTemperature";
import { EXAMPLE_PROMPTS, TEMPERATURE_INTERPRETATIONS } from "../../constants/temperature";
import ModuleHeader from "../ui/ModuleHeader";
import ModuleCard from "../ui/ModuleCard";
import RangeSlider from "../ui/RangeSlider";
import BarChartWidget from "../ui/BarChartWidget";
import WarningBanner from "../ui/WarningBanner";
import CalloutBox from "../ui/CalloutBox";
import Spinner from "../ui/Spinner";

const DEFAULT_PROMPT = "Había una vez un";
const DEFAULT_TEMP = 0.7;

export default function TemperatureSimulator() {
  const {
    prompt, setPrompt,
    temperature, setTemperature,
    isPredicting, warningMsg,
    steps, fetchCandidates,
  } = useTemperature(DEFAULT_PROMPT, DEFAULT_TEMP);

  const [isSampling, setIsSampling] = useState(false);
  const [sampledToken, setSampledToken] = useState<string | null>(null);
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);

  const handlePresetClick = (p: string) => {
    setPrompt(p);
    fetchCandidates(p);
  };

  const executeSampling = () => {
    if (isSampling) return;
    setIsSampling(true);
    setSampledToken(null);
    let flashCount = 0;

    const interval = setInterval(() => {
      setHighlightedIdx(Math.floor(Math.random() * steps.length));
      flashCount++;
      if (flashCount >= 12) {
        clearInterval(interval);
        const rand = Math.random();
        let cumulativeProb = 0;
        let selectedIdx = 0;
        for (let i = 0; i < steps.length; i++) {
          cumulativeProb += steps[i].probability;
          if (rand <= cumulativeProb) { selectedIdx = i; break; }
          if (i === steps.length - 1) selectedIdx = i;
        }
        setHighlightedIdx(selectedIdx);
        setSampledToken(steps[selectedIdx].token);
        setIsSampling(false);
      }
    }, 120);
  };

  const appendSampledToPrompt = () => {
    if (!sampledToken) return;
    const nextPrompt = prompt + sampledToken;
    setPrompt(nextPrompt);
    setSampledToken(null);
    setHighlightedIdx(null);
    fetchCandidates(nextPrompt);
  };

  const interpretation = TEMPERATURE_INTERPRETATIONS.find((r) => temperature >= r.min && temperature < r.max) || TEMPERATURE_INTERPRETATIONS[3];

  return (
    <ModuleCard id="temperature-simulator">
      <ModuleHeader
        icon={Flame}
        color="purple"
        title="Inferencia de Temperatura en Acción"
        subtitle="Reescala logits en tiempo real y analiza cómo varían entropía, diversidad y estabilidad en el proceso de decoding"
        srTitle="Temperatura de inferencia y sampling en LLMs"
      />

      {warningMsg && (
        <div className="flex justify-end">
          <WarningBanner message={warningMsg} variant="purple" />
        </div>
      )}

      <div className="space-y-3 font-sans">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Paso 1: Escribe tu Prompt de Inicio para el Modelo</span>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-inner" placeholder="Escribe el inicio de una frase en español..." />
          <button onClick={() => fetchCandidates(prompt)} disabled={isPredicting} className="px-5 py-3 bg-purple-700 hover:bg-purple-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-sm font-semibold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-mono">
            {isPredicting ? (<><Spinner /> Pensando...</>) : (<><Sparkles className="w-4 h-4" />Predecir Logits</>)}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Sugerencias rápidas:</span>
          {EXAMPLE_PROMPTS.map((p, idx) => (
            <button key={idx} onClick={() => handlePresetClick(p)} className="text-xs bg-slate-100 dark:bg-slate-950 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300 px-3 py-1 rounded-full transition-colors text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-purple-500/20">{p}...</button>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800/80" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm dark:shadow-xl">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">Paso 2: Ajusta la Temperatura (T)</span>
            <RangeSlider
              label="Factor T:"
              value={temperature}
              displayValue={temperature.toFixed(2)}
              min={0.1}
              max={2.5}
              step={0.05}
              accentColor="purple"
              onChange={setTemperature}
              ariaLabel="Factor de temperatura T para escalar los logits"
              footer={
                <>
                  <span className="text-teal-600 dark:text-teal-400 font-bold">0.1 (Fuerte)</span>
                  <span>1.0 (Humano)</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">2.5 (Caótico)</span>
                </>
              }
            />
            <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-colors duration-200 ${interpretation.color}`}>
              <div className="font-bold uppercase tracking-widest text-xs">Régimen: {interpretation.badge}</div>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">{interpretation.text}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Cómputo Matemático de Probabilidades Escaladas</h3>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs bg-slate-50 dark:bg-slate-950/40 backdrop-blur-sm shadow-sm dark:shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[360px]">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-300 uppercase">
                    <th className="p-3">Siguiente Token</th>
                    <th className="p-3 text-center">Logit (z<sub>i</sub>)</th>
                    <th className="p-3 text-center">Escalado (z<sub>i</sub>/T)</th>
                    <th className="p-3 text-center">Exp (e<sup>z<sub>i</sub>/T</sup>)</th>
                    <th className="p-3 text-right">Prob (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-900 font-mono">
                  {steps.map((step, idx) => {
                    const isSelected = highlightedIdx === idx;
                    return (
                      <tr key={idx} className={`transition-colors duration-150 ${isSelected ? "bg-purple-500/10 font-bold" : "hover:bg-slate-100/30 dark:hover:bg-slate-900/20"}`}>
                        <td className="p-3 text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                          <span className={`inline-block py-0.5 px-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-bold text-slate-600 dark:text-slate-400 ${isSelected ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-300" : ""}`}>"{step.token}"</span>
                        </td>
                        <td className="p-3 text-center text-slate-500 dark:text-slate-400">{step.logit.toFixed(1)}</td>
                        <td className="p-3 text-center text-slate-600 dark:text-slate-300">{step.scaledLogit.toFixed(2)}</td>
                        <td className="p-3 text-center text-slate-500 dark:text-slate-300">{step.exponential > 10000 ? "Huge" : step.exponential.toFixed(2)}</td>
                        <td className="p-3 text-right font-extrabold text-purple-600 dark:text-purple-400">{(step.probability * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Distribución de probabilidad resultante</span>
            <div className="h-56 w-full bg-slate-50 dark:bg-slate-950/80 rounded-xl p-3 border border-slate-200 dark:border-slate-800/60 relative">
              <BarChartWidget
                data={steps}
                xKey="token"
                yKey="probability"
                xTickFormatter={(value: string) => `"${value}"`}
                yTickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
              >
                {steps.map((_, index) => {
                  let barColor = "#8b5cf6";
                  if (highlightedIdx === index) barColor = "#db2777";
                  else if (index === 0) barColor = "#4f46e5";
                  return <Cell key={`cell-${index}`} fill={barColor} className="transition-all duration-300" />;
                })}
              </BarChartWidget>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-4">
              <div className="flex justify-between items-center bg-purple-500/5 p-3 rounded-lg border border-purple-500/15">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5 uppercase tracking-wider"><Flame className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />Paso 3: Muestreador Estocástico de LLM</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Muestreo ponderado de Monte Carlo</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                En inferencia autoregresiva, el siguiente token se obtiene mediante muestreo sobre la distribución Softmax (no necesariamente por Argmax). Esta simulación aproxima ese mecanismo con una extracción discreta ponderada por probabilidad.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 py-1">
                <button onClick={executeSampling} disabled={isSampling || isPredicting} className="w-full sm:w-auto px-5 py-3 bg-purple-700 hover:bg-purple-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-sm font-semibold shadow-lg inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] font-mono cursor-pointer">
                  <Play className={`w-4 h-4 ${isSampling ? "animate-spin" : ""}`} />
                  {isSampling ? "Haciendo Girar Ruleta..." : "¡Muestrear Siguiente Token!"}
                </button>
                {sampledToken ? (
                  <div className="bg-slate-100 dark:bg-slate-900 border border-purple-500/20 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 flex-1 w-full animate-fade-in animate-bounce">
                    <div className="text-left">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block tracking-widest">Token Seleccionado:</span>
                      <span className="text-sm font-mono font-bold text-purple-600 dark:text-purple-300">"{sampledToken}"</span>
                    </div>
                    <button onClick={appendSampledToPrompt} className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow transition-all hover:translate-x-0.5">
                      Añadir al Prompt <PlusCircle className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 dark:text-slate-300 italic text-center sm:text-left flex-1 py-2">
                    {isSampling ? "Ejecutando muestreo ponderado sobre la distribución..." : "Ejecuta una muestra para observar el efecto estocástico."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalloutBox color="amber" title="Nota de rigor:">
        {" "}la temperatura de esta página actúa en decoding (inferencia), no en entrenamiento. Su efecto principal es reescalar logits antes de Softmax, alterando entropía y diversidad de muestreo; no corrige por sí sola sesgos del modelo.
      </CalloutBox>
    </ModuleCard>
  );
}
