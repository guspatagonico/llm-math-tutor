import React from "react";
import { GraduationCap, Github } from "lucide-react";
import { fullPath } from "../../constants/routes";

function LogoIcon() {
  return (
    <a
      href={fullPath("/")}
      className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-md shrink-0"
      aria-label="Ir al inicio"
    >
      <GraduationCap className="w-5 h-5" />
    </a>
  );
}

export default function Logo() {
  return (
    <div className="flex items-start gap-2 sm:gap-3 w-full min-[1133px]:w-auto">
      <LogoIcon />
      <div className="min-w-0">
        <div className="text-lg sm:text-xl md:text-2xl font-display font-bold text-slate-200 dark:text-white tracking-tight flex items-center gap-1.5 flex-wrap">
          <a href={fullPath("/")} className="hover:underline whitespace-nowrap">LLM Math Tutor</a>
          <span className="text-[10px] bg-indigo-950/40 text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans border border-purple-500/10 whitespace-nowrap">
            Aula Interactiva
          </span>
        </div>
        <a
          href="https://github.com/guspatagonico"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium items-center gap-1 hover:underline whitespace-nowrap"
        >
          <Github className="w-3.5 h-3.5 shrink-0" />
          Gustavo A. Salvini
        </a>
        <p className="text-[11px] sm:text-xs text-slate-400 font-medium font-sans leading-relaxed hidden sm:block">
          Logit, Sigmoide, Softmax, Gradientes y Temperatura de Inferencia
        </p>
      </div>
    </div>
  );
}
