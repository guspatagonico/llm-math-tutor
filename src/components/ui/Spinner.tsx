import React from "react";

interface SpinnerProps {
  size?: "sm" | "md";
  className?: string;
}

export default function Spinner({ size = "sm", className = "" }: SpinnerProps) {
  const sizeClass = size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div
      className={`${sizeClass} border-2 border-white/30 border-t-white rounded-full animate-spin ${className}`}
    />
  );
}
