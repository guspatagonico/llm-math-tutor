import React from "react";

interface ModuleCardProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ModuleCard({ id, children, className = "" }: ModuleCardProps) {
  return (
    <div
      id={id}
      className={`bg-white dark:bg-slate-900/60 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-xl dark:backdrop-blur-sm transition-colors duration-300 space-y-8 font-sans ${className}`}
    >
      {children}
    </div>
  );
}
