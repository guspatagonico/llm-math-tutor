import React from "react";
import { Compass, Route, BookOpenCheck } from "lucide-react";
import { PATH_STEPS, MODULE_MAP } from "../../constants/learningPath";
import { fullPath } from "../../constants/routes";
import ModuleHeader from "../ui/ModuleHeader";
import SectionHeading from "../ui/SectionHeading";

export default function HomeLearningPath() {
  return (
    <section className="space-y-8" aria-label="Ruta de aprendizaje LLM Math Tutor">
      <article className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/80 shadow-md">
        <div className="flex items-start gap-3">
          <ModuleHeader
            icon={Compass}
            color="indigo"
            title="Ruta de aprendizaje para matemáticas de LLMs"
            subtitle="Esta página ubica cada módulo dentro del panorama completo IA → ML → Deep Learning → Transformers → Inferencia. Está diseñada para estudiantes con nivel intermedio que ya cursaron álgebra, cálculo y probabilidad básica."
          />
        </div>
      </article>

      <article className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80">
        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300 mb-4">
          Learning Path (visión macro)
        </h2>
        <ol className="space-y-4">
          {PATH_STEPS.map((step, idx) => (
            <li key={step.title} className="grid grid-cols-[24px_1fr] gap-3">
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {idx < PATH_STEPS.length - 1 ? <span className="w-px h-full bg-indigo-400/50 mt-1" /> : null}
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{step.title}</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{step.detail}</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">{step.focus}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>

      <article className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80">
        <SectionHeading icon={Route} title="Dónde encaja cada módulo" colorClass="text-emerald-700 dark:text-emerald-300" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODULE_MAP.map((module) => {
            const Icon = module.icon;
            return (
              <a
                key={module.href}
                href={fullPath(module.href)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400/60 dark:hover:border-indigo-400/40 bg-slate-50/60 dark:bg-slate-950/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{module.title}</h3>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{module.summary}</p>
              </a>
            );
          })}
        </div>
      </article>

      <article className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80">
        <SectionHeading icon={BookOpenCheck} title="Objetivos didácticos y prerrequisitos a reforzar" colorClass="text-amber-700 dark:text-amber-300" />
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <li>- Entender la diferencia entre puntaje interno (logit) y probabilidad observable.</li>
          <li>- Interpretar Softmax como normalización exponencial y no como simple "fórmula de salida".</li>
          <li>- Conectar derivadas locales (Jacobiano) con gradientes usados en entrenamiento real.</li>
          <li>- Diferenciar temperatura de calibración: aquí se usa para decoding en inferencia, no para entrenar pesos.</li>
          <li>- Reforzar: variables aleatorias discretas, esperanza y varianza, producto matriz-vector, derivadas parciales y regla de la cadena.</li>
          <li>- Extensión sugerida: revisar procesos estocásticos simples (cadenas de Markov) para comprender muestreo secuencial token a token.</li>
        </ul>
      </article>

      <article className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-2">
          Referencias base (rigurosidad científica)
        </h2>
        <ul className="space-y-1 text-sm">
          <li>
            <a className="text-indigo-600 dark:text-indigo-300 hover:underline" href="https://arxiv.org/html/1706.03762v7" target="_blank" rel="noopener noreferrer">
              Vaswani et al. (2017) - Attention Is All You Need
            </a>
          </li>
          <li>
            <a className="text-indigo-600 dark:text-indigo-300 hover:underline" href="https://aiengineeringfromscratch.com/lesson.html?path=phases%2F01-math-foundations%2F06-probability-and-distributions" target="_blank" rel="noopener noreferrer">
              AI Engineering from Scratch - Probability and Distributions
            </a>
          </li>
          <li>
            <a className="text-indigo-600 dark:text-indigo-300 hover:underline" href="https://www.deeplearningbook.org/" target="_blank" rel="noopener noreferrer">
              Goodfellow, Bengio, Courville - Deep Learning
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
}
