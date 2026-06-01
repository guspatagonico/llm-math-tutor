import React from "react";
import IconBox from "./IconBox";

const COLORS = ["blue", "purple", "indigo", "emerald", "amber"] as const;

interface ModuleHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  color: (typeof COLORS)[number];
  title: string;
  subtitle: string;
  srTitle?: string;
}

export default function ModuleHeader({ icon, color, title, subtitle, srTitle }: ModuleHeaderProps) {
  return (
    <>
      {srTitle && <h1 className="sr-only">{srTitle}</h1>}
      <div className="flex items-center gap-3">
        <IconBox icon={icon} color={color} size="lg" />
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
