import React from "react";

const SIZES = {
  sm: { box: "p-1.5", icon: "w-3.5 h-3.5" },
  md: { box: "p-2", icon: "w-4 h-4" },
  lg: { box: "p-3", icon: "w-6 h-6" },
} as const;

const ROUNDED = {
  lg: "rounded-lg",
  xl: "rounded-xl",
} as const;

const SUBTLE_COLORS: Record<string, string> = {
  blue:    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  purple:  "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
  indigo:  "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  amber:   "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
};

const SOLID_COLORS: Record<string, string> = {
  blue:    "bg-blue-600 text-white",
  purple:  "bg-purple-600 text-white",
  indigo:  "bg-indigo-600 text-white",
  emerald: "bg-emerald-600 text-white",
  amber:   "bg-amber-600 text-white",
};

interface IconBoxProps {
  icon: React.ComponentType<{ className?: string }>;
  color?: keyof typeof SUBTLE_COLORS;
  variant?: "solid" | "subtle";
  size?: keyof typeof SIZES;
  rounded?: keyof typeof ROUNDED;
  className?: string;
}

export default function IconBox({
  icon: Icon,
  color = "indigo",
  variant = "subtle",
  size = "md",
  rounded = "xl",
  className = "",
}: IconBoxProps) {
  const s = SIZES[size];
  const r = ROUNDED[rounded];
  const colors = variant === "solid" ? (SOLID_COLORS[color] ?? SOLID_COLORS.indigo) : (SUBTLE_COLORS[color] ?? SUBTLE_COLORS.indigo);

  return (
    <div className={`${s.box} ${r} ${colors} flex items-center justify-center ${className}`}>
      <Icon className={s.icon} />
    </div>
  );
}
