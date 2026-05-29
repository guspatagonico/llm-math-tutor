import React from "react";
import { GraduationCap, Github } from "lucide-react";
import TabNav from "./TabNav";

interface HeaderProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export default function Header({ activeTab, onNavigate }: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800/80 sticky top-0 z-30 shadow-subtle backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <a href="/" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-md shrink-0" aria-label="Ir al inicio">
            <GraduationCap className="w-5 h-5" />
          </a>
          <div>
            <div className="text-xl md:text-2xl font-display font-bold text-slate-200 dark:text-white tracking-tight flex items-center gap-1.5 flex-wrap">
              <a href="/" className="hover:underline">LLM Math Tutor</a>
              <span className="text-[10px] bg-indigo-950/40 text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans border border-purple-500/10">
                Aula Interactiva
              </span>
              <a href="https://github.com/guspatagonico" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1 ml-2 border-l border-slate-700 pl-2.5 hover:underline">
                <Github className="w-3.5 h-3.5 shrink-0" />
                Gustavo A. Salvini
              </a>
            </div>
            <p className="text-xs text-slate-400 font-medium font-sans leading-relaxed">
              Logits, Sigmoid, Softmax, Gradientes y Temperatura de Inferencia
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <TabNav activeTab={activeTab} onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}
