import React from "react";
import { AlertTriangle } from "lucide-react";

const VARIANT_CLASSES = {
  purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  amber:  "bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/40 text-amber-700 dark:text-amber-400",
} as const;

interface WarningBannerProps {
  message: string;
  variant?: keyof typeof VARIANT_CLASSES;
}

export default function WarningBanner({ message, variant = "purple" }: WarningBannerProps) {
  const classes = VARIANT_CLASSES[variant];

  if (variant === "amber") {
    return (
      <div className={`p-2 text-center text-xs font-medium ${classes}`}>
        {message}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 ${classes} rounded-lg text-xs font-medium max-w-xs font-mono`}>
      <AlertTriangle className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400 shrink-0" />
      <span className="truncate">{message}</span>
    </div>
  );
}
