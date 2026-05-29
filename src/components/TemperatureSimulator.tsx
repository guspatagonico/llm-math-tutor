import React, { useState } from "react";
import { Sparkles, Sliders, Play, PlusCircle, AlertTriangle, Flame } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTemperature } from "../hooks/useTemperature";
import { EXAMPLE_PROMPTS } from "../constants/temperature";

const DEFAULT_PROMPT = "Había una vez un";
const DEFAULT_TEMP = 0.7;
const TEMPERATURE_INTERPRETATIONS: { min: number; max: number; badge: string; text: string; color: string }[] = [
  { min: 0, max: 0.3, badge: "Baja entropía (casi Argmax)", text: "La distribución se concentra en los tokens de mayor logit. Disminuye la varianza del muestreo y aumenta la repetibilidad de salida.", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { min: 0.3, max: 0.8, badge: "Régimen balanceado", text: "Mantiene coherencia sintáctica y semántica con diversidad moderada. Suele ser una zona robusta para texto general.", color: "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/20" },
  { min: 0.8, max: 1.4, badge: "Alta diversidad controlada", text: "Reduce diferencias relativas entre logits, incrementa entropía y permite explorar continuaciones menos dominantes.", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { min: 1.4, max: 99, badge: "Entropía extrema", text: "La distribución se aproxima a una casi uniforme. Aumenta cobertura léxica, pero también el riesgo de incoherencia local.", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
];

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
    <div id="temperature-simulator" className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-xl dark:backdrop-blur-sm transition-colors duration-300 space-y-8 font-sans">
      <h1 className="sr-only">Temperatura de inferencia y sampling en LLMs</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-display font-medium text-slate-900 dark:text-white">Inferencia de Temperatura en Acción</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-sans">Reescala logits en tiempo real y analiza cómo varían entropía, diversidad y estabilidad en el proceso de decoding</p>
          </div>
        </div>
        {warningMsg && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 rounded-lg text-xs font-medium max-w-xs font-mono">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400 shrink-0" />
            <span className="truncate">{warningMsg}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 font-sans">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-sans">Paso 1: Escribe tu Prompt de Inicio para el Modelo</span>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-inner" placeholder="Escribe el inicio de una frase en español..." />
          <button onClick={() => fetchCandidates(prompt)} disabled={isPredicting} className="px-5 py-3 bg-purple-700 hover:bg-purple-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-sm font-semibold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-mono">
            {isPredicting ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Pensando...</>) : (<><Sparkles className="w-4 h-4" />Predecir Logits</>)}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium font-sans">Sugerencias rápidas:</span>
          {EXAMPLE_PROMPTS.map((p, idx) => (
            <button key={idx} onClick={() => handlePresetClick(p)} className="text-xs bg-slate-100 dark:bg-slate-950 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300 px-3 py-1 rounded-full transition-colors text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-850 hover:border-purple-500/20">{p}...</button>
          ))}
        </div>
      </div>

      <hr className="border-slate-150 dark:border-slate-800/80" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-4 shadow-sm dark:shadow-xl">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block font-sans">Paso 2: Ajusta la Temperatura (T)</span>
            <div className="flex justify-between items-center font-sans">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Factor T:</span>
              <span className="text-lg font-mono font-extrabold text-purple-600 dark:text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-0.5 rounded-lg shadow-sm">{temperature.toFixed(2)}</span>
            </div>
            <input type="range" min="0.1" max="2.5" step="0.05" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} aria-label="Factor de temperatura T para escalar los logits" className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-sans">
              <span className="font-bold text-teal-600 dark:text-teal-400">0.1 (Fuerte)</span>
              <span>1.0 (Humano)</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">2.5 (Caótico)</span>
            </div>
            <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-colors duration-200 font-sans ${interpretation.color}`}>
              <div className="font-bold uppercase tracking-widest text-xs font-sans">Régimen: {interpretation.badge}</div>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">{interpretation.text}</p>
            </div>
          </div>

          <div className="space-y-2 font-sans">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-sans">Cómputo Matemático de Probabilidades Escaladas</h3>
            <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden text-xs bg-slate-50 dark:bg-slate-950/40 backdrop-blur-sm shadow-sm dark:shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[360px]">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-300 font-sans uppercase">
                    <th className="p-3 font-sans">Siguiente Token</th>
                    <th className="p-3 text-center">Logit (z<sub>i</sub>)</th>
                    <th className="p-3 text-center">Escalado (z<sub>i</sub>/T)</th>
                    <th className="p-3 text-center">Exp (e<sup>z<sub>i</sub>/T</sup>)</th>
                    <th className="p-3 text-right">Prob (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-900 font-mono">
                  {steps.map((step, idx) => {
                    const isSelected = highlightedIdx === idx;
                    return (
                      <tr key={idx} className={`transition-colors duration-150 ${isSelected ? "bg-purple-500/10 font-bold" : "hover:bg-slate-100/30 dark:hover:bg-slate-900/20"}`}>
                        <td className="p-3 font-sans text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                          <span className={`inline-block py-0.5 px-2 bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded font-bold text-slate-650 dark:text-slate-350 ${isSelected ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-300" : ""}`}>"{step.token}"</span>
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

        <div className="lg:col-span-7 space-y-6 font-sans">
          <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-sans">Distribución de probabilidad resultante</span>
            <div className="h-56 w-full bg-slate-50 dark:bg-slate-950/80 rounded-xl p-3 border border-slate-200 dark:border-slate-800/60 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={steps} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" className="dark:stroke-slate-800" vertical={false} />
                  <XAxis dataKey="token" stroke="#64748b" tickFormatter={(value) => `"${value}"`} fontSize={11} fontWeight={500} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} formatter={(value: any) => [`Probabilidad: ${(value * 100).toFixed(1)}%`, "Softmax"]} />
                  <Bar dataKey="probability" maxBarSize={38} radius={[4, 4, 0, 0]}>
                    {steps.map((_, index) => {
                      let barColor = "#8b5cf6";
                      if (highlightedIdx === index) barColor = "#db2777";
                      else if (index === 0) barColor = "#4f46e5";
                      return <Cell key={`cell-${index}`} fill={barColor} className="transition-all duration-300" />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-4">
              <div className="flex justify-between items-center bg-purple-500/5 p-3 rounded-lg border border-purple-500/15">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5 font-sans uppercase tracking-wider"><Flame className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />Paso 3: Muestreador Estocástico de LLM</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold font-sans uppercase tracking-wider">Muestreo ponderado de Monte Carlo</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
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
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block tracking-widest font-sans">Token Seleccionado:</span>
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

      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-900 dark:text-slate-100">Nota de rigor:</span> la temperatura de esta página actúa en decoding (inferencia),
        no en entrenamiento. Su efecto principal es reescalar logits antes de Softmax, alterando entropía y diversidad de muestreo; no corrige por sí sola sesgos del modelo.
      </div>
    </div>
  );
}
