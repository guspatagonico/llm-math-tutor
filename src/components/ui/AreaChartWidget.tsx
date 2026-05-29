import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { CHART_TOOLTIP_STYLE } from "../../constants/charts";

interface AreaChartWidgetProps {
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  gradientId: string;
  gradientColor: string;
  strokeColor: string;
  yDomain: [number, number];
  yTicks: number[];
  referenceLines: Array<{ axis: "x" | "y"; value: number; stroke?: string }>;
  currentLine?: { value: number; stroke: string };
  tooltipLabel: string;
  tooltipFormatter: (value: any) => [string, string];
}

export default function AreaChartWidget({
  data, xKey, yKey, gradientId, gradientColor, strokeColor,
  yDomain, yTicks, referenceLines, currentLine,
  tooltipLabel, tooltipFormatter,
}: AreaChartWidgetProps) {
  return (
    <ResponsiveContainer width="100%" height={158}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="dark:stroke-slate-800" />
        <XAxis dataKey={xKey} stroke="#64748b" fontSize={10} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={10} domain={yDomain} ticks={yTicks} tickLine={false} />
        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={tooltipFormatter} />
        {referenceLines.map((ref, idx) => (
          <ReferenceLine
            key={idx}
            x={ref.axis === "x" ? ref.value : undefined}
            y={ref.axis === "y" ? ref.value : undefined}
            stroke={ref.stroke ?? "#94a3b8"}
            className="dark:stroke-slate-700"
            strokeDasharray="2 2"
          />
        ))}
        <Area type="monotone" dataKey={yKey} stroke={strokeColor} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId})`} />
        {currentLine && (
          <ReferenceLine x={currentLine.value} stroke={currentLine.stroke} strokeWidth={2} />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
