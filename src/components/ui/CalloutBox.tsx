import React from "react";

const COLOR_VARIANTS = {
  indigo:  "border-indigo-200 dark:border-indigo-900/40 bg-indigo-50 dark:bg-indigo-950/20",
  emerald: "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20",
  amber:   "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20",
  blue:    "border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/20",
  purple:  "border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20",
} as const;

interface CalloutBoxProps {
  color?: keyof typeof COLOR_VARIANTS;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CalloutBox({ color = "indigo", title, children, className = "" }: CalloutBoxProps) {
  const bg = COLOR_VARIANTS[color] ?? COLOR_VARIANTS.indigo;

  return (
    <div className={`p-4 rounded-xl border ${bg} text-sm text-slate-700 dark:text-slate-300 leading-relaxed ${className}`}>
      {title && <span className="font-semibold text-slate-900 dark:text-slate-100">{title}</span>}
      {children}
    </div>
  );
}
