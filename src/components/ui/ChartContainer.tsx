import React from "react";

interface ChartContainerProps {
  width?: string;
  height: number;
  children: React.ReactNode;
}

export default function ChartContainer({ width = "100%", height, children }: ChartContainerProps) {
  return (
    <div className={`h-44 w-full bg-slate-100/40 dark:bg-slate-950/80 rounded-xl p-2 border border-slate-200 dark:border-slate-800/80`}>
      {children}
    </div>
  );
}
