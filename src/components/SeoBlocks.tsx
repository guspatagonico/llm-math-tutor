import React from "react";
import { ROUTE_META, TODAY_ISO, type RouteSeoKey } from "../constants/seo";

interface SeoBlocksProps {
  routeKey: RouteSeoKey;
}

export default function SeoBlocks({ routeKey }: SeoBlocksProps) {
  const meta = ROUTE_META[routeKey];

  return (
    <section className="mt-8 space-y-5" aria-label="Contenido SEO y GEO">
      <article className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Resumen rápido (TL;DR)</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">{meta.tldr}</p>
      </article>

      <article className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Preguntas frecuentes</h2>
        <div className="space-y-3 mt-3">
          {meta.faq.map((item) => (
            <details key={item.question} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/40">
              <summary className="text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">{item.question}</summary>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </article>

      <article className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Referencias y autoría</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          Contenido creado por <strong>Gustavo Adrián Salvini</strong> para explicar matemáticas de modelos de lenguaje con foco en aplicación práctica y rigor técnico.
        </p>
        <ul className="mt-2 space-y-1">
          {meta.references.map((ref) => (
            <li key={ref.href} className="text-sm">
              <a className="text-indigo-600 dark:text-indigo-300 hover:underline" href={ref.href} target="_blank" rel="noopener noreferrer">
                {ref.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Última actualización: {TODAY_ISO}</p>
      </article>
    </section>
  );
}
