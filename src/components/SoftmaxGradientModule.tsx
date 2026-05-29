import React, { useState } from "react";
import { Network, RefreshCw, Info } from "lucide-react";
import { useSoftmax } from "../hooks/useSoftmax";
import MathEquation from "./MathEquation";

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
    <div id="softmax-gradient-module" className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-xl dark:backdrop-blur-sm transition-colors duration-300 space-y-8 font-sans">
      <h1 className="sr-only">Softmax, Jacobiano y gradientes en modelos de lenguaje</h1>
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl">
          <Network className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-display font-medium text-slate-900 dark:text-white tracking-tight">Física Estadística y el Gradiente de Softmax</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">Del origen termodinámico del reparto energético al asombroso gradiente de retropropagación</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 dark:bg-slate-950/40 rounded-xl p-5 border border-slate-200 dark:border-slate-800/80">
        <div>
          <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 font-mono">El Origen Práctico</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            La función Softmax no fue inventada al azar en el aprendizaje profundo; proviene de la <strong>física de la termodinámica del siglo XIX</strong> (distribución de Boltzmann/Gibbs).
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
            Donde <span className="font-serif italic">k<sub>B</sub></span> es la constante de Boltzmann y <span className="font-serif italic">T</span> es la temperatura. Los estados de menor energía son exponencialmente más probables.
          </p>
          <div className="mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300">
            <strong>Traducción a LLMs:</strong> Si definimos los logits <span className="font-serif italic font-semibold">z<sub>i</sub></span> de la red como el negativo de la energía molecular de un token (<span className="font-serif italic">-E<sub>i</sub> = z<sub>i</sub></span>), obtenemos exactamente la fórmula Softmax estándar con Temperatura.
          </div>
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
              { term: "e^zi (Exponencial local)", explanation: "Amplifica la diferencia entre puntajes reales (hace que diferencias pequeñas en valores brutos sean distinciones grandes de probabilidad, garantizando positivos absolutos).", colorClass: "text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/25" },
              { term: "∑ e^zj (Sumatoria normalizadora)", explanation: "La suma de los exponenciales de todo el vocabulario actúa como divisor común de forma que la suma total sea exactamente 1.", colorClass: "text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/25" },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4 font-sans">
        <h3 className="font-display font-medium text-slate-800 dark:text-white text-lg">La Elegancia de su Gradiente (La Matriz Jacobiana)</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-prose">
          En optimización, necesitamos saber cómo varía la probabilidad calculada del token <span className="font-serif italic font-semibold">i</span> (<span className="font-serif italic text-purple-600 dark:text-purple-400 font-bold">p<sub>i</sub></span>) cuando alteramos la entrada bruta (logit) del token <span className="font-serif italic font-semibold">j</span> (<span className="font-serif italic text-rose-600 dark:text-rose-400 font-bold">z<sub>j</sub></span>). La derivada matemática de Softmax con respecto a su entrada posee una belleza singular:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="p-4 bg-teal-500/5 dark:bg-teal-500/5 border border-teal-200 dark:border-teal-500/20 rounded-xl space-y-2">
            <h4 className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-widest font-sans">Caso 1: En la Diagonal (i = j)</h4>
            <div className="font-serif text-base font-semibold text-teal-700 dark:text-teal-300 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 select-none h-12">
              <div className="inline-flex flex-col items-center text-xs">
                <span className="border-b border-teal-500/30 pb-0.5 px-1">∂p<sub>i</sub></span>
                <span className="pt-0.5 px-1">∂z<sub>i</sub></span>
              </div>
              <span className="text-base font-sans">=</span>
              <span className="italic">p<sub>i</sub></span>
              <span className="font-sans">(1 - <span className="italic">p<sub>i</sub></span>)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Es una tasa positiva. Si aumentas el logit de un token, aumentas directamente su propia probabilidad. ¡Tiene exactamente el mismo formato de derivada que la Sigmoide!</p>
          </div>

          <div className="p-4 bg-rose-500/5 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-xl space-y-2">
            <h4 className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-widest font-sans">Caso 2: Fuera de la Diagonal (i ≠ j)</h4>
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
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Es una tasa negativa. Indica competencia: dado que las probabilidades deben sumar exactamente <span className="font-serif">1</span>, si aumentas el logit de un token rival <span className="font-serif italic font-semibold">j</span>, restas probabilidad al token actual <span className="font-serif italic font-semibold">i</span>.</p>
          </div>
        </div>

        <div className="mt-6 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/40 font-sans">
          <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block font-sans">Estación de Prueba Interactiva</span>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-sans">Ajusta los Logits y observa la Matriz Jacobiana de Gradientes</h4>
            </div>
            <button onClick={resetLogits} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium shadow-sm active:scale-95 transition-all font-mono">
              <RefreshCw className="w-3 h-3" /> ReestablecerBase
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900/40">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono font-bold">Entrada Logit (z)</span>
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
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 text-center sm:text-left font-sans">Matriz Jacobiana de Gradientes de Softmax [ J ]</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 text-center sm:text-left font-sans">
                El valor representa la derivada instantánea de la probabilidad <span className="font-sans text-purple-700 dark:text-purple-400 font-bold">P<sub>fila</sub></span> con respecto al logit <span className="font-sans text-rose-600 dark:text-rose-500 font-bold">Z<sub>columna</sub></span>.
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
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-normal mb-0.5 font-sans">
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

              <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5 font-bold" />
                <p className="font-sans leading-relaxed text-left">
                  <strong>Intuición Matemática: </strong>
                  Observa que todas las columnas de gradiente suman exactamente <strong>0</strong>. Si sumas verticalmente, es 0 porque al final, cualquier pequeño aumento en la suma del logit se contrarresta perfectamente ya que la suma total de las probabilidades está atada a ser siempre 1.0!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-slate-900 dark:border-slate-800 text-white rounded-xl p-5 md:p-6 mt-6 shadow-md dark:shadow-xl flex flex-col md:flex-row items-center gap-6 font-sans">
        <div className="space-y-2 md:w-2/3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-300 font-mono">¿Cómo Funciona el Entrenamiento Real?</h4>
          <h5 className="font-display font-medium text-lg text-white">El Milagro de Softmax con Entropía Cruzada</h5>
          <p className="text-xs text-indigo-200 leading-relaxed font-sans">
            En LLMs, Softmax se asocia siempre con la función de pérdida de <strong>Entropía Cruzada</strong>: <span className="font-serif italic text-white">L = -log(P<sub>correcto</sub>)</span>. Al aplicar la regla de la cadena para calcular el mapa de retropropagación con respecto a los logits, los descritos <span className="font-serif italic text-white font-semibold">p<sub>i</sub></span> y <span className="font-serif italic text-white font-semibold">p<sub>j</sub></span> se cancelan mágicamente dando:
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
          <p className="text-xs text-indigo-200 leading-relaxed font-sans">
            Donde <span className="font-serif italic text-white font-semibold">Y<sub>i</sub></span> es el vector objetivo verdadero (<span className="font-serif text-white">1.0</span> para el token correcto, <span className="font-serif text-white">0.0</span> para los demás). El gradiente es sencillamente la <strong>"Probabilidad calculada menos la Probabilidad esperada"</strong>. ¡Esta elegante simplicidad es lo que permite entrenar LLMs gigantes muy rápido!
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl md:w-1/3 w-full space-y-3 font-sans">
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
              <span className="text-[11px] text-indigo-300 block font-sans">Gradientes para Backprop (P<sub>i</sub> - Y<sub>i</sub>):</span>
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

      <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-900 dark:text-slate-100">Nota de rigor:</span> la formulación coincide con la atención escalada usada en Transformers:
        la normalización Softmax se aplica sobre scores y conserva suma total 1. En entrenamiento, se combina con entropía cruzada y se calcula con versiones numéricamente estables.
      </div>
    </div>
  );
}
