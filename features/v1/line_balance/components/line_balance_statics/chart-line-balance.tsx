"use client";

import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  LabelList,
  YAxis,
  XAxis,
  ReferenceLine,
  TooltipProps,
  Tooltip,
} from "recharts";
import { ValueType } from "tailwindcss/types/config";
import { NameType } from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip  font-semibold bg-secondary  flex flex-col p-4 rounded-lg">
        <h3>{label}</h3>
        <div className="flex flex-row gap-2">
          <h3>CT:</h3>
          <h3>{payload[0].payload.ct}</h3>
        </div>
      </div>
    );
  }
  return null;
};

const ChartLineBalance = ({
  data,
  ct_meta,
}: {
  data: { name: string; ct: number; has_updated: boolean }[];
  ct_meta: number;
}) => {
  const getBarColor = (ct: number) => {
    if (ct >= ct_meta * 0.99) return "url(#gradien_red)";
    // if (ct >= bottleneck * 0.8) return "#CC3333";

    return "url(#gradient_green)";
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <defs>
          <linearGradient id="gradient_green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={"#84cc16"} stopOpacity={0.8} />
            <stop offset="90%" stopColor={"#3f6212"} stopOpacity={1} />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient id="gradien_red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={"#dc2626"} stopOpacity={0.8} />
            <stop offset="90%" stopColor={"#7f1d1d"} stopOpacity={1} />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient id="gradien_blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={"#0284c7"} stopOpacity={0.8} />
            <stop offset="90%" stopColor={"#1e40af"} stopOpacity={1} />
          </linearGradient>
        </defs>

        <YAxis
          domain={[
            0,
            ct_meta > Math.max(...data.map((f) => f.ct))
              ? ct_meta + 3
              : Math.max(...data.map((f) => f.ct)) + 3,
          ]}
          hide
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
          hide
        />

        <Bar dataKey="ct" radius={[6, 6, 6, 6]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.ct)} />
          ))}

          <LabelList
            position="top"
            offset={12}
            stroke="gray"
            fontSize={15}
            formatter={(label: number) => label.toFixed(1)}
          />
        </Bar>

        <ReferenceLine
          y={ct_meta}
          stroke="gray" // "#166534"
          strokeDasharray="4 2"
          strokeWidth={2}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "transparent", stroke: "gray" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartLineBalance;
