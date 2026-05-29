import React, { useState } from "react";
import { Network, RefreshCw, Info } from "lucide-react";
import { useSoftmax } from "../../hooks/useSoftmax";
import ModuleHeader from "../ui/ModuleHeader";
import ModuleCard from "../ui/ModuleCard";
import CalloutBox from "../ui/CalloutBox";
import MathEquation from "../shared/MathEquation";

const INITIAL_LOGITS = [3.0, 1.5, 0.5];
const TOKEN_LABELS = ["Token 1 (gato)", "Token 2 (perro)", "Token 3 (tejado)"];

const toSubscript = (num: number): string => {
  const subs = "₀₁₂₃₄₅₆₇₈₉";
  return String(num).split("").map((char) => {
    const d = parseInt(char, 10);
    return isNaN(d) ? char : subs[d];
  }).join("");
};

export default function SoftmaxGradientModule() {
  const { logits, probs, jacobian, handleLogitChange, resetLogits } = useSoftmax(INITIAL_LOGITS);
  const [correctTokenIdx, setCorrectTokenIdx] = useState<number>(0);

  const softmaxOut = logits.map((z, idx) => ({
    logit: z,
    exp: Math.exp(z),
    prob: probs[idx],
  }));

  return (
    <ModuleCard id="softmax-gradient-module">
      <ModuleHeader
        icon={Network}
        color="purple"
        title="Física Estadística y el Gradiente de Softmax"
        subtitle="Del origen termodinámico del reparto energético al asombroso gradiente de retropropagación"
        srTitle="Softmax, Jacobiano y gradientes en modelos de lenguaje"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 dark:bg-slate-950/40 rounded-xl p-5 border border-slate-200 dark:border-slate-800/80">
        <div>
          <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 font-mono">Marco físico-matemático</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            La función Softmax puede interpretarse como una versión normalizada de la distribución de Boltzmann-Gibbs. Esta conexión no es meramente histórica: explica por qué un exponencial seguido de normalización produce una distribución válida sobre clases discretas.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            En física, la probabilidad de encontrar una partícula en un estado cuántico <span className="font-serif italic text-purple-600 dark:text-purple-400 font-bold">i</span> con energía <span className="font-serif italic text-purple-600 dark:text-purple-400 font-bold">E<sub>i</sub></span> es proporcional a:
            <span id="boltzmann-prob-formula" className="block my-3 py-2.5 bg-slate-100 dark:bg-slate-950 text-center rounded-xl text-purple-700 dark:text-purple-300 border border-slate-200 dark:border-slate-800/60 shadow-sm">
              <span className="inline-flex items-center gap-1.5 font-serif text-lg select-none">
                <span className="font-bold italic">P<sub>i</sub></span>
                <span className="text-xl">∝</span>
                <span className="italic">e</span>
                <span className="inline-flex flex-col items-center text-[10px] relative -top-1.5">
                  <span className="border-b border-purple-500/50 pb-0.5 px-0.5">-E<sub>i</sub></span>
                  <span className="pt-0.5 px-0.5">k<sub>B</sub>T</span>
                </span>
              </span>
            </span>
            Donde <span className="font-serif italic">k<sub>B</sub></span> es la constante de Boltzmann y <span className="font-serif italic">T</span> la temperatura absoluta. Estados de menor energía tienen mayor masa de probabilidad bajo la misma escala térmica.
          </p>
          <CalloutBox color="purple" className="mt-3 p-3 text-xs !rounded-lg">
            <strong>Traducción a LLMs:</strong> si modelamos <span className="font-serif italic font-semibold">z<sub>i</sub></span> como energía negativa efectiva (<span className="font-serif italic">z<sub>i</sub> = -E<sub>i</sub></span>), la normalización Softmax emerge de forma natural. En práctica moderna (Transformers), esto se aplica sobre scores de atención y logits de salida.
          </CalloutBox>
        </div>

        <div>
          <MathEquation
            title="La Ecuación de Softmax"
            htmlLayout={
              <div className="flex items-center gap-1 font-mono text-xl">
                <span>P(i) = </span>
                <div className="flex flex-col items-center">
                  <span className="border-b border-slate-300 dark:border-slate-800 pb-0.5 px-3">e<sup>z<sub>i</sub></sup></span>
                  <span className="pt-0.5 px-3">∑ e<sup>z<sub>j</sub></sup></span>
                </div>
              </div>
            }
            termExplanations={[
               { term: "e^zi (Exponencial local)", explanation: "Garantiza positividad y aumenta la separación relativa entre scores. Diferencias aditivas en logits se convierten en cocientes multiplicativos de probabilidad.", colorClass: "text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/25" },
               { term: "∑ e^zj (Partición normalizadora)", explanation: "Es la constante de normalización (función de partición discreta) que asegura una distribución categórica con suma total 1.", colorClass: "text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/25" },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display font-medium text-slate-800 dark:text-white text-lg">La Elegancia de su Gradiente (La Matriz Jacobiana)</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-prose">
          En optimización, interesa la sensibilidad local de <span className="font-serif italic text-purple-600 dark:text-purple-400 font-bold">p<sub>i</sub></span> frente a perturbaciones en <span className="font-serif italic text-rose-600 dark:text-rose-400 font-bold">z<sub>j</sub></span>. Esa sensibilidad está dada por la Jacobiana de Softmax, estructura central para backpropagation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="p-4 bg-teal-500/5 dark:bg-teal-500/5 border border-teal-200 dark:border-teal-500/20 rounded-xl space-y-2">
            <h4 className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-widest">Caso 1: En la Diagonal (i = j)</h4>
            <div className="font-serif text-base font-semibold text-teal-700 dark:text-teal-300 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 select-none h-12">
              <div className="inline-flex flex-col items-center text-xs">
                <span className="border-b border-teal-500/30 pb-0.5 px-1">∂p<sub>i</sub></span>
                <span className="pt-0.5 px-1">∂z<sub>i</sub></span>
              </div>
              <span className="text-base font-sans">=</span>
              <span className="italic">p<sub>i</sub></span>
              <span className="font-sans">(1 - <span className="italic">p<sub>i</sub></span>)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Término de auto-sensibilidad. Es positivo y alcanza máximo cuando p_i≈0.5 en el caso binario análogo; en multiclase, decrece al saturar la probabilidad.</p>
          </div>

          <div className="p-4 bg-rose-500/5 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-xl space-y-2">
            <h4 className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-widest">Caso 2: Fuera de la Diagonal (i ≠ j)</h4>
            <div className="font-serif text-base font-semibold text-rose-700 dark:text-rose-300 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 select-none h-12">
              <div className="inline-flex flex-col items-center text-xs">
                <span className="border-b border-rose-500/30 pb-0.5 px-1">∂p<sub>i</sub></span>
                <span className="pt-0.5 px-1">∂z<sub>j</sub></span>
              </div>
              <span className="text-base font-sans">=</span>
              <span className="font-sans">-</span>
              <span className="italic">p<sub>i</sub></span>
              <span className="italic">p<sub>j</sub></span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Término de acoplamiento competitivo. Es negativo por conservación de masa de probabilidad: aumentar una clase redistribuye peso y reduce otras.</p>
          </div>
        </div>

        <div className="mt-6 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/40">
          <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">Estación de Prueba Interactiva</span>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Ajusta los Logits y observa la Matriz Jacobiana de Gradientes</h4>
            </div>
            <button onClick={resetLogits} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium shadow-sm active:scale-95 transition-all font-mono">
              <RefreshCw className="w-3 h-3" /> ReestablecerBase
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900/40">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">Entrada Logit (z)</span>
              {softmaxOut.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">{TOKEN_LABELS[idx]}</span>
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 rounded">{item.logit.toFixed(1)}</span>
                  </div>
                  <input type="range" min="-2" max="6" step="0.1" value={item.logit} onChange={(e) => handleLogitChange(idx, parseFloat(e.target.value))} aria-label={`Logit bruto del ${TOKEN_LABELS[idx]}`} className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <span>Exp: {item.exp.toFixed(2)}</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">Prob: {(item.prob * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 text-center sm:text-left">Matriz Jacobiana de Gradientes de Softmax [ J ]</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 text-center sm:text-left">
                El valor representa la derivada instantánea de la probabilidad <span className="text-purple-700 dark:text-purple-400 font-bold">P<sub>fila</sub></span> con respecto al logit <span className="text-rose-600 dark:text-rose-500 font-bold">Z<sub>columna</sub></span>.
              </p>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950/40 p-4">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  <div>Prob \ Logit</div>
                  <div className="text-rose-700 dark:text-rose-400 font-bold">Z<sub>1</sub></div>
                  <div className="text-rose-600 dark:text-rose-400 font-bold">Z<sub>2</sub></div>
                  <div className="text-rose-700 dark:text-rose-400 font-bold">Z<sub>3</sub></div>
                </div>

                <div className="space-y-2">
                  {jacobian.map((row, iIdx) => (
                    <div key={iIdx} className="grid grid-cols-4 gap-2 items-center">
                      <div className="text-[10px] sm:text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 text-left truncate">
                        P<sub>{iIdx + 1}</sub> ({ (probs[iIdx] * 100).toFixed(0) }%)
                      </div>
                      {row.map((val, jIdx) => {
                        const isDiag = iIdx === jIdx;
                        return (
                          <div key={jIdx} className={`p-3 rounded-lg border text-xs font-mono font-bold transition-all duration-150 ${isDiag ? "bg-teal-500/10 dark:bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-200 dark:border-teal-500/20" : "bg-rose-500/5 dark:bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-500/20"}`} title={`Derivada de P${toSubscript(iIdx+1)} con respecto a Z${toSubscript(jIdx+1)}: ${val.toFixed(6)}`}>
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-normal mb-0.5">
                              {isDiag ? <span>p<sub>i</sub>(1-p<sub>i</sub>)</span> : <span>-p<sub>i</sub>p<sub>j</sub></span>}
                            </span>
                            {val >= 0 ? "+" : ""}{val.toFixed(4)}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <CalloutBox color="purple" className="mt-4 p-3 text-xs !rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-left">
                  <strong>Intuición matemática:</strong> cada columna de la Jacobiana suma <strong>0</strong>. Esto refleja la restricción del simplex: el vector de probabilidades siempre debe conservar suma unitaria.
                </p>
              </CalloutBox>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-slate-900 dark:border-slate-800 text-white rounded-xl p-5 md:p-6 mt-6 shadow-md dark:shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="space-y-2 md:w-2/3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-300 font-mono">¿Cómo Funciona el Entrenamiento Real?</h4>
          <h5 className="font-display font-medium text-lg text-white">Softmax + Entropía cruzada: simplificación del gradiente</h5>
          <p className="text-xs text-indigo-200 leading-relaxed">
            En entrenamiento supervisado, la salida Softmax suele combinarse con <strong>entropía cruzada categórica</strong>:
            <span className="font-serif italic text-white"> L = -log(P<sub>correcto</sub>)</span>. Aplicando regla de la cadena sobre logits, el gradiente se reduce a una forma compacta:
          </p>
          <div className="py-2 px-4 bg-white/10 rounded-lg border border-white/10 text-center text-sm text-indigo-150 font-serif flex items-center justify-center gap-1.5 select-none font-bold">
            <div className="inline-flex flex-col items-center text-xs">
              <span className="border-b border-indigo-200/40 pb-0.5 px-1">∂L</span>
              <span className="pt-0.5 px-1">∂z<sub>i</sub></span>
            </div>
            <span className="text-base font-sans">=</span>
            <span className="italic">P<sub>i</sub></span>
            <span className="mx-0.5 font-sans">-</span>
            <span className="italic">Y<sub>i</sub></span>
          </div>
          <p className="text-xs text-indigo-200 leading-relaxed">
            Donde <span className="font-serif italic text-white font-semibold">Y<sub>i</sub></span> es el objetivo one-hot. El término
            <strong> P<sub>i</sub> - Y<sub>i</sub></strong> mide error probabilístico por clase y fundamenta la eficiencia numérica de implementaciones modernas.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl md:w-1/3 w-full space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase font-mono">Simulador de Error de Pérdida</span>
          <div className="space-y-2">
            <label className="text-xs text-slate-300 block font-medium">Token Correcto:</label>
            <div className="grid grid-cols-3 gap-1">
              {TOKEN_LABELS.map((_, idx) => (
                <button key={idx} onClick={() => setCorrectTokenIdx(idx)} className={`p-1.5 rounded text-xs font-semibold transition-all ${correctTokenIdx === idx ? "bg-emerald-700 text-white shadow" : "bg-white/10 hover:bg-white/15 text-slate-200"}`}>
                  T{idx + 1}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1">
              <span className="text-[11px] text-indigo-300 block">Gradientes para Backprop (P<sub>i</sub> - Y<sub>i</sub>):</span>
              {probs.map((prob, idx) => {
                const target = correctTokenIdx === idx ? 1.0 : 0.0;
                const gradValue = prob - target;
                return (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">T<sub>{idx + 1}</sub>:</span>
                    <span className={gradValue < 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                      {gradValue >= 0 ? "+" : ""}{gradValue.toFixed(4)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <CalloutBox color="emerald" title="Nota de rigor:">
        {" "}en Transformers, Softmax aparece tanto en atención (sobre scores escalados) como en la capa de salida (sobre logits). En ambos casos se implementa con el truco de estabilidad <strong>Softmax(z - max(z))</strong> para evitar overflow y pérdida de precisión en coma flotante.
      </CalloutBox>
    </ModuleCard>
  );
}
