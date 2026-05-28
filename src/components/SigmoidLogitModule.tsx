import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Activity, HelpCircle, Award } from "lucide-react";
import { sigmoid, logit } from "../utils/math";
import MathEquation from "./MathEquation";
import MathMarkdownRenderer from "./MathMarkdownRenderer";

export default function SigmoidLogitModule() {
  const [sigmoidInput, setSigmoidInput] = useState<number>(0);
  const [logitInput, setLogitInput] = useState<number>(0.5);

  const sigmoidData = useMemo(() => {
    const data = [];
    for (let x = -6; x <= 6; x += 0.25) {
      data.push({
        x: Number(x.toFixed(2)),
        y: Number(sigmoid(x).toFixed(4)),
        isCurrent: Math.abs(x - sigmoidInput) < 0.13,
      });
    }
    return data;
  }, [sigmoidInput]);

  const logitData = useMemo(() => {
    const data = [];
    for (let p = 0.02; p <= 0.98; p += 0.02) {
      data.push({
        p: Number(p.toFixed(2)),
        y: Number(logit(p).toFixed(4)),
        isCurrent: Math.abs(p - logitInput) < 0.011,
      });
    }
    return data;
  }, [logitInput]);

  const outputSigmoid = useMemo(() => sigmoid(sigmoidInput), [sigmoidInput]);
  const outputLogit = useMemo(() => logit(logitInput), [logitInput]);

  return (
    <div id="sigmoid-logit-module" className="space-y-8">
      <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-xl dark:backdrop-blur-sm transition-colors duration-300 font-sans">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-2.5">
            <h2 className="text-xl md:text-2xl font-display font-medium text-slate-900 dark:text-white tracking-tight">
              ¿Por qué Sigmoide y Logit?
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              El puente matemático entre puntajes libres continuos e índices binarios probabilísticos
            </p>
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-950/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800/80 mb-6 space-y-4 font-sans">
          <h3 className="text-sm font-semibold text-slate-850 dark:text-slate-200 flex items-center gap-2 font-mono">
            <HelpCircle className="w-4 h-4 text-blue-650 dark:text-blue-400" />
            ¿Qué tipo de distribución estamos analizando en LLMs?
          </h3>
          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed">
            <MathMarkdownRenderer content="Un LLM predice el próximo token seleccionando una palabra de un vocabulario finito y fijo $V$ de tamaño (generalmente discreto)." textClassName="text-slate-800 dark:text-slate-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/30 transition-all duration-200 shadow-sm">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider block mb-1 font-mono">1. Espacio de Distribución</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Elementos Discretos en Espacio Discreto</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                La salida es una <strong>distribución categórica</strong>. Las palabras son elementos discretos; no hay estados continuos entre ellas.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 transition-all duration-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1 font-mono">2. El Desafío Neural</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Cómputo en Espacio Continuo</p>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                <MathMarkdownRenderer content="Las redes de aprendizaje profundo calculan reales continuos. Sus últimas capas lineales producen números flotantes ilimitados (**logits**) en $(-\infty, \infty)$." textClassName="text-slate-650 dark:text-slate-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80 hover:border-rose-500/30 transition-all duration-200 shadow-sm font-sans">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-450 uppercase tracking-wider block mb-1 font-mono">3. El Vínculo de Mapeo</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">El Log-Odds (Logit)</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Mapear lo continuo con la escala probabilística requiere un filtro matemático. Los logits actúan como el logaritmo de odds, facilitando la optimización.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 dark:text-white leading-relaxed">
            Para entender el caso de distribuciones multiclase generalizado (Softmax), primero debemos estudiar el caso binario de <strong>2 estados alternativos</strong>, gobernado por la función logística (<strong>Sigmoide</strong>) y su inverso multiplicativo, el <strong>Logit</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          {/* SIGMOID CARD */}
          <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 font-sans">
            <h3 className="font-display font-medium text-slate-800 dark:text-slate-200 text-lg flex items-center justify-between">
              <span>Función Sigmoide: σ(x)</span>
              <span className="text-xs text-blue-700 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full font-mono font-bold">Mapeo [0, 1]</span>
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Recibe un número real continuo sin límites, x ∈ (-∞, ∞), y lo confina a una escala de probabilidad segura, P ∈ (0, 1).
            </p>

            <MathEquation
              title="Cómputo de la Sigmoide"
              htmlLayout={
                <div className="flex items-center gap-1 font-mono text-xl">
                  <span>σ(x) = </span>
                  <div className="flex flex-col items-center">
                    <span className="border-b border-slate-300 dark:border-slate-705 pb-0.5 px-3">1</span>
                    <span className="pt-0.5 px-3">1 + e<sup>-x</sup></span>
                  </div>
                </div>
              }
              termExplanations={[
                { term: "x (Logit)", explanation: "El valor real de entrada (score bruto continuo). Si es alto positivo, la sigmoide tiende a 1. Si es muy negativo, tiende a 0.", colorClass: "text-blue-500 bg-blue-500/10 border-blue-500/25" },
                { term: "e^-x (Filtro exponencial)", explanation: "La base de crecimiento rápido exponencial desbarata las escalas lineales y asegura que el resultado nunca salga de los límites de (0,1).", colorClass: "text-rose-500 bg-rose-500/10 border-rose-500/25" },
              ]}
            />

            <div className="p-4 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400 font-mono">Entrada Bruta (x):</span>
                <span className="text-sm font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 rounded">{sigmoidInput.toFixed(2)}</span>
              </div>
              <input type="range" min="-6" max="6" step="0.1" value={sigmoidInput} onChange={(e) => setSigmoidInput(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium font-mono">Probabilidad de Salida:</span>
                <span className="text-base font-mono font-bold text-emerald-700 dark:text-emerald-400">{outputSigmoid.toFixed(4)} ({(outputSigmoid * 100).toFixed(1)}%)</span>
              </div>
            </div>

            <div className="h-44 w-full bg-slate-100/40 dark:bg-slate-950/80 rounded-xl p-2 border border-slate-200 dark:border-slate-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sigmoidData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="dark:stroke-slate-800" />
                  <XAxis dataKey="x" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: "11px", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", color: "#f8fafc" }} formatter={(value: any) => [`Probabilidad: ${value}`, "σ(x)"]} />
                  <ReferenceLine x={0} stroke="#94a3b8" className="dark:stroke-slate-700" strokeDasharray="2 2" />
                  <ReferenceLine y={0.5} stroke="#94a3b8" className="dark:stroke-slate-700" strokeDasharray="2 2" />
                  <Area type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorY)" />
                  <ReferenceLine x={sigmoidInput} stroke="#10b981" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LOGIT CARD */}
          <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 font-sans">
            <h3 className="font-display font-medium text-slate-800 dark:text-slate-200 text-lg flex items-center justify-between">
              <span>Función Logit: L(p)</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono font-bold">Odds Expansion</span>
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Es el inverso matemático de la Sigmoide. Recibe un límite de probabilidad de p ∈ (0, 1), y lo estira para expandirlo a toda la recta real (-∞, ∞).
            </p>

            <MathEquation
              title="Cómputo del Logit (Log-Odds)"
              htmlLayout={
                <div className="flex items-center gap-1 font-mono text-xl">
                  <span>L(p) = ln</span>
                  <div className="flex flex-col items-center">
                    <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-3">p</span>
                    <span className="pt-0.5 px-3">1 - p</span>
                  </div>
                </div>
              }
              termExplanations={[
                { term: "p / (1 - p)", explanation: "Llamado 'odds' o ventaja. Representa la proporción de qué tan probable es que el token suceda versus que no suceda.", colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25" },
                { term: "ln (Logaritmo natural)", explanation: "Comprime de forma asimétrica los extremos. Si p es cercano a 1, odds tiende al infinito, y logit a +infinito. Si p es cercano a 0, odds es 0 y logit a -infinito.", colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/25" },
              ]}
            />

            <div className="p-4 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400 font-mono">Probabilidad de entrada (p):</span>
                <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 rounded">{(logitInput * 100).toFixed(0)}% ({logitInput.toFixed(2)})</span>
              </div>
              <input type="range" min="0.05" max="0.95" step="0.01" value={logitInput} onChange={(e) => setLogitInput(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium font-mono">Log-Odds (Valor de Logit):</span>
                <span className="text-base font-mono font-bold text-blue-700 dark:text-blue-400">{outputLogit.toFixed(4)}</span>
              </div>
            </div>

            <div className="h-44 w-full bg-slate-100/40 dark:bg-slate-950/80 rounded-xl p-2 border border-slate-200 dark:border-slate-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={logitData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLogit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="dark:stroke-slate-800" />
                  <XAxis dataKey="p" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[-4, 4]} ticks={[-3, -1.5, 0, 1.5, 3]} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: "11px", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", color: "#f8fafc" }} formatter={(value: any) => [`Logit bruto: ${value}`, "L(p)"]} />
                  <ReferenceLine x={0.5} stroke="#94a3b8" className="dark:stroke-slate-700" strokeDasharray="2 2" />
                  <ReferenceLine y={0} stroke="#94a3b8" className="dark:stroke-slate-700" strokeDasharray="2 2" />
                  <Area type="monotone" dataKey="y" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorLogit)" />
                  <ReferenceLine x={logitInput} stroke="#6366f1" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">Resumen de Mapeo:</span> Al representar los scores antes de la salida como logits (reales infinitos), las redes entrenan linealmente y con facilidad. La Sigmoide actúa como el portal de traducción de probabilidades binarias. Para vocabularios masivos multiclase, generalizamos este patrón con <strong>Softmax</strong>, regulando el reparto probabilístico.
          </div>
        </div>
      </div>
    </div>
  );
}
