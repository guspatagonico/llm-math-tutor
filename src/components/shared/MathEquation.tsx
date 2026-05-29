/**
 * @file MathEquation.tsx
 * @author Gustavo Adrián Salvini
 * @license MIT
 * 
 * Permiso otorgado, de forma gratuita, a cualquier persona que obtenga una copia
 * de este software para utilizarlo, modificarlo, distribuirlo y sublicenciarlo
 * sin restricciones, sujeto a la inclusión de este aviso de derechos de autor.
 * 
 * Contacto:
 * - GitHub: https://github.com/guspatagonico
 * - X (Twitter): https://x.com/guspatagonico
 * - Web: https://gustavosalvini.com.ar
 */

import React, { useState } from "react";

interface MathEquationProps {
  title?: string;
  latex?: string; // Descriptive fallback text
  htmlLayout: React.ReactNode;
  termExplanations: {
    term: string;
    explanation: string;
    colorClass: string;
  }[];
}

export default function MathEquation({ title, htmlLayout, termExplanations }: MathEquationProps) {
  const [activeTermIdx, setActiveTermIdx] = useState<number | null>(null);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200 shrink-0 font-sans">
      {title && (
        <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 font-sans">
          {title}
        </h4>
      )}
      
      {/* Mathematical display area */}
      <div className="flex flex-col items-center justify-center py-6 px-4 bg-slate-100/60 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/60 rounded-lg shadow-inner-sm overflow-x-auto min-h-[80px]">
        <div className="text-2xl font-display text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1 select-none">
          {htmlLayout}
        </div>
      </div>

      {/* Breakdown explanations */}
      <div className="mt-4">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">Fórmula interactiva: toca o pasa el cursor sobre los términos para explorar su lógica</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {termExplanations.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveTermIdx(idx)}
              onMouseLeave={() => setActiveTermIdx(null)}
              onClick={() => setActiveTermIdx(activeTermIdx === idx ? null : idx)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                activeTermIdx === idx
                  ? `${item.colorClass} border-current bg-opacity-20 scale-[1.01]`
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block px-1.5 py-0.5 text-xs font-mono font-bold rounded ${item.colorClass} bg-opacity-20`}>
                  {item.term}
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
