import React from "react";

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  blue:     { bg: "bg-blue-500/10",     text: "text-blue-600 dark:text-blue-400",     border: "border-blue-500/20" },
  purple:   { bg: "bg-purple-500/10",   text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/20" },
  indigo:   { bg: "bg-indigo-500/10",   text: "text-indigo-600 dark:text-indigo-300", border: "border-indigo-500/20" },
  emerald:  { bg: "bg-emerald-500/10",  text: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-500/20" },
  amber:    { bg: "bg-amber-500/10",    text: "text-amber-600 dark:text-amber-400",   border: "border-amber-500/20" },
};

interface ModuleHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  color: keyof typeof COLOR_CLASSES;
  title: string;
  subtitle: string;
  srTitle?: string;
}

export default function ModuleHeader({ icon: Icon, color, title, subtitle, srTitle }: ModuleHeaderProps) {
  const c = COLOR_CLASSES[color] ?? COLOR_CLASSES.indigo;

  return (
    <>
      {srTitle && <h1 className="sr-only">{srTitle}</h1>}
      <div className="flex items-center gap-3">
        <div className={`p-3 ${c.bg} ${c.text} ${c.border} rounded-xl`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-display font-medium text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">{subtitle}</p>
        </div>
      </div>
    </>
  );
}
