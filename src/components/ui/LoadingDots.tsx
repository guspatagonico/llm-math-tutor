import React from "react";

interface LoadingDotsProps {
  color?: string;
}

export default function LoadingDots({ color = "teal" }: LoadingDotsProps) {
  return (
    <div className="flex items-center gap-1.5 min-w-[64px] justify-center">
      <span className={`w-2 h-2 rounded-full bg-${color}-500 dark:bg-${color}-400 animate-[bounce_1s_infinite_100ms]`} />
      <span className={`w-2 h-2 rounded-full bg-${color}-500 dark:bg-${color}-400 animate-[bounce_1s_infinite_200ms]`} />
      <span className={`w-2 h-2 rounded-full bg-${color}-500 dark:bg-${color}-400 animate-[bounce_1s_infinite_300ms]`} />
    </div>
  );
}
