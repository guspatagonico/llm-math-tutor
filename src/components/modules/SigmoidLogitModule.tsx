import React, { useState, useMemo } from "react";
import { Activity, HelpCircle, Award } from "lucide-react";
import { sigmoid, logit } from "../../utils/math";
import ModuleHeader from "../ui/ModuleHeader";
import ModuleCard from "../ui/ModuleCard";
import RangeSlider from "../ui/RangeSlider";
import ChartContainer from "../ui/ChartContainer";
import AreaChartWidget from "../ui/AreaChartWidget";
import CalloutBox from "../ui/CalloutBox";
import MathEquation from "../shared/MathEquation";
import MathMarkdownRenderer from "../shared/MathMarkdownRenderer";

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
    <div className="space-y-8">
      <ModuleCard id="sigmoid-logit-module">
        <ModuleHeader
          icon={Activity}
          color="blue"
          title="¿Por qué Sigmoide y Logit?"
          subtitle="El puente matemático entre puntajes libres continuos e índices binarios probabilísticos"
          srTitle="Funcion Sigmoide y Logit para modelos de lenguaje"
        />

        <div className="bg-slate-50/50 dark:bg-slate-950/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800/80 space-y-4 font-sans">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ¿Qué tipo de distribución estamos analizando en LLMs?
          </h3>
          <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">
            <MathMarkdownRenderer content="Un LLM predice el próximo token seleccionando una palabra de un vocabulario finito y fijo $V$ de tamaño (generalmente discreto)." textClassName="text-slate-800 dark:text-slate-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/30 transition-all duration-200 shadow-sm">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider block mb-1">1. Espacio de Distribución</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Elementos Discretos en Espacio Discreto</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                La salida es una <strong>distribución categórica</strong>. Las palabras son elementos discretos; no hay estados continuos entre ellas.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 transition-all duration-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1">2. El Desafío Neural</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Cómputo en Espacio Continuo</p>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                <MathMarkdownRenderer content="Las redes de aprendizaje profundo calculan reales continuos. Sus últimas capas lineales producen números flotantes ilimitados (**logits**) en $(-\infty, \infty)$." textClassName="text-slate-600 dark:text-slate-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80 hover:border-rose-500/30 transition-all duration-200 shadow-sm">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider block mb-1">3. El Vínculo de Mapeo</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">El Log-Odds (Logit)</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Mapear lo continuo con la escala probabilística requiere un filtro matemático. Los logits actúan como el logaritmo de odds, facilitando la optimización.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-800 dark:text-white leading-relaxed">
            Para entender el caso de distribuciones multiclase generalizado (Softmax), primero debemos estudiar el caso binario de <strong>2 estados alternativos</strong>, gobernado por la función logística (<strong>Sigmoide</strong>) y su inverso multiplicativo, el <strong>Logit</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-display font-medium text-slate-800 dark:text-slate-200 text-lg flex items-center justify-between">
              <span>Función Sigmoide: σ(x)</span>
              <span className="text-xs text-blue-700 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full font-bold">Mapeo [0, 1]</span>
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Recibe un número real continuo sin límites, x ∈ (-∞, ∞), y lo confina a una escala de probabilidad segura, P ∈ (0, 1).
            </p>

            <MathEquation
              title="Cómputo de la Sigmoide"
              htmlLayout={
                <div className="flex items-center gap-1 font-mono text-xl">
                  <span>σ(x) = </span>
                  <div className="flex flex-col items-center">
                    <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-3">1</span>
                    <span className="pt-0.5 px-3">1 + e<sup>-x</sup></span>
                  </div>
                </div>
              }
              termExplanations={[
                { term: "x (Logit)", explanation: "El valor real de entrada (score bruto continuo). Si es alto positivo, la sigmoide tiende a 1. Si es muy negativo, tiende a 0.", colorClass: "text-blue-500 bg-blue-500/10 border-blue-500/25" },
                { term: "e^-x (Filtro exponencial)", explanation: "La base de crecimiento rápido exponencial desbarata las escalas lineales y asegura que el resultado nunca salga de los límites de (0,1).", colorClass: "text-rose-500 bg-rose-500/10 border-rose-500/25" },
              ]}
            />

            <RangeSlider
              label="Entrada Bruta (x):"
              value={sigmoidInput}
              displayValue={sigmoidInput.toFixed(2)}
              min={-6}
              max={6}
              step={0.1}
              accentColor="blue"
              onChange={setSigmoidInput}
              ariaLabel="Entrada bruta x para la función Sigmoide"
              footer={
                <>
                  <span className="text-slate-600 dark:text-slate-400 font-medium font-sans">Probabilidad de Salida:</span>
                  <span className="text-base font-mono font-bold text-emerald-700 dark:text-emerald-400">{outputSigmoid.toFixed(4)} ({(outputSigmoid * 100).toFixed(1)}%)</span>
                </>
              }
            />

            <ChartContainer height={158}>
              <AreaChartWidget
                data={sigmoidData}
                xKey="x"
                yKey="y"
                gradientId="colorYSigmoid"
                gradientColor="#3b82f6"
                strokeColor="#3b82f6"
                yDomain={[0, 1]}
                yTicks={[0, 0.25, 0.5, 0.75, 1]}
                referenceLines={[
                  { axis: "x", value: 0 },
                  { axis: "y", value: 0.5 },
                ]}
                currentLine={{ value: sigmoidInput, stroke: "#10b981" }}
                tooltipLabel="σ(x)"
                tooltipFormatter={(value: any) => [`Probabilidad: ${value}`, "σ(x)"]}
              />
            </ChartContainer>
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-display font-medium text-slate-800 dark:text-slate-200 text-lg flex items-center justify-between">
              <span>Función Logit: L(p)</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">Odds Expansion</span>
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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

            <RangeSlider
              label="Probabilidad de entrada (p):"
              value={logitInput}
              displayValue={`${(logitInput * 100).toFixed(0)}% (${logitInput.toFixed(2)})`}
              min={0.05}
              max={0.95}
              step={0.01}
              accentColor="emerald"
              onChange={setLogitInput}
              ariaLabel="Probabilidad de entrada p para la función Logit"
              footer={
                <>
                  <span className="text-slate-600 dark:text-slate-400 font-medium font-sans">Log-Odds (Valor de Logit):</span>
                  <span className="text-base font-mono font-bold text-blue-700 dark:text-blue-400">{outputLogit.toFixed(4)}</span>
                </>
              }
            />

            <ChartContainer height={158}>
              <AreaChartWidget
                data={logitData}
                xKey="p"
                yKey="y"
                gradientId="colorLogit"
                gradientColor="#10b981"
                strokeColor="#10b981"
                yDomain={[-4, 4]}
                yTicks={[-3, -1.5, 0, 1.5, 3]}
                referenceLines={[
                  { axis: "x", value: 0.5 },
                  { axis: "y", value: 0 },
                ]}
                currentLine={{ value: logitInput, stroke: "#6366f1" }}
                tooltipLabel="L(p)"
                tooltipFormatter={(value: any) => [`Logit bruto: ${value}`, "L(p)"]}
              />
            </ChartContainer>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200">Resumen de Mapeo:</span> Al representar los scores antes de la salida como logits (reales infinitos), las redes entrenan linealmente y con facilidad. La Sigmoide actúa como el portal de traducción de probabilidades binarias. Para vocabularios masivos multiclase, generalizamos este patrón con <strong>Softmax</strong>, regulando el reparto probabilístico.
          </div>
        </div>

        <CalloutBox color="indigo" title="Nota de rigor:">
          {" "}en la práctica, para evitar inestabilidad numérica, se implementan variantes estables de Sigmoide y Logit (por ejemplo, evitando evaluar directamente extremos como p≈0 o p≈1). Esta recomendación está alineada con textos clásicos de aprendizaje profundo.
        </CalloutBox>
      </ModuleCard>
    </div>
  );
}
