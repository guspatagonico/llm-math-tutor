import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 space-y-1.5 py-6 border-t border-slate-150 dark:border-slate-850">
      <p>© 2026 Aula Interactiva de Inteligencia Artificial - Desarrollado por <a href="https://github.com/guspatagonico" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold hover:underline">Gustavo Adrián Salvini</a>.</p>
      <p className="text-xs text-slate-400 flex flex-wrap items-center justify-center gap-1.5 font-sans">
        <span>Espacio dual: Elementos Discretos de Vocabulario</span>
        <span className="inline-flex items-center bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-indigo-300 italic">V</span>
        <span className="text-indigo-400 font-bold font-sans">→</span>
        <span>Métricas Log-Odds en Campo Real</span>
        <span className="inline-flex items-center bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[11px] font-mono gap-0.5">
          <span className="text-indigo-300 font-serif font-extrabold">ℝ</span>
          <sup className="text-purple-300 font-bold font-sans text-[9px] -mt-1">|V|</sup>
        </span>
      </p>
    </footer>
  );
}
