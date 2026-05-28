import { BookOpen } from "lucide-react";

export default function PathwayBanner() {
  return (
    <div className="bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 p-4 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-inner-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-600 dark:bg-purple-900 text-white dark:text-purple-300 rounded-xl shadow-sm mt-0.5 shrink-0 border border-transparent dark:border-purple-500/20">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-350 uppercase tracking-widest block font-sans">Ruta Didáctica</span>
          <p className="text-xs text-slate-850 dark:text-slate-200 font-medium leading-relaxed font-sans">
            Recomendado comenzar por el concepto del binomio <strong className="text-indigo-950 dark:text-indigo-300">Sigmoide / Logit</strong>, pasar por la formulación termodinámica de <strong className="text-indigo-950 dark:text-indigo-300">Softmax y su Gradiente</strong>, y finalmente divertirse en el simulador de <strong className="text-indigo-950 dark:text-indigo-300">Temperatura artificial</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
