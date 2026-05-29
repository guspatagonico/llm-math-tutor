import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { CHART_TOOLTIP_STYLE } from "../../constants/charts";

interface BarChartWidgetProps {
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  maxBarSize?: number;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  children: React.ReactNode;
}

export default function BarChartWidget({
  data, xKey, yKey, maxBarSize = 38, xTickFormatter, yTickFormatter, children,
}: BarChartWidgetProps) {
  return (
    <ResponsiveContainer width="100%" height={198}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" className="dark:stroke-slate-800" vertical={false} />
        <XAxis dataKey={xKey} stroke="#64748b" tickFormatter={xTickFormatter} fontSize={11} fontWeight={500} />
        <YAxis stroke="#64748b" fontSize={10} domain={[0, 1]} tickFormatter={yTickFormatter} />
        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
        <Bar dataKey={yKey} maxBarSize={maxBarSize} radius={[4, 4, 0, 0]}>
          {children}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
