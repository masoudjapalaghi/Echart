import React from "react";
import "echarts-liquidfill";
import type { CSSProperties } from "react";
import { ReactECharts } from "./ReactECharts";
import type { LiquidFillGaugeOption } from "./typeEchart";

export interface LiquidFillGaugeProps {
  option: LiquidFillGaugeOption;
  style?: CSSProperties;
}

export function LiquidFillGauge({
  option,
  style,
}: LiquidFillGaugeProps): JSX.Element {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReactECharts option={option} style={style} />
    </div>
  );
}
