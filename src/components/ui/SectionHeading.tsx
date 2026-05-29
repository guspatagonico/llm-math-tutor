import React from "react";

interface SectionHeadingProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  colorClass?: string;
}

export default function SectionHeading({ icon: Icon, title, colorClass = "text-slate-800 dark:text-slate-200" }: SectionHeadingProps) {
  return (
    <h2 className={`text-sm font-bold uppercase tracking-widest ${colorClass} mb-3 flex items-center gap-2`}>
      <Icon className="w-4 h-4" />
      {title}
    </h2>
  );
}
