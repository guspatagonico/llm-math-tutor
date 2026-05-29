import React from "react";

interface RangeSliderProps {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  accentColor?: string;
  onChange: (value: number) => void;
  ariaLabel: string;
  /** Extra info below slider, e.g. exp and prob values */
  footer?: React.ReactNode;
}

export default function RangeSlider({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  accentColor = "purple",
  onChange,
  ariaLabel,
  footer,
}: RangeSliderProps) {
  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">{label}</span>
        <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 rounded">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={ariaLabel}
        className={`w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-${accentColor}-500`}
      />
      {footer && <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">{footer}</div>}
    </div>
  );
}
