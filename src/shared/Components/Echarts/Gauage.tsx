import React from "react";
import type { CSSProperties } from "react";
import ReactECharts from 'echarts-for-react';

import type { LiquidFillGaugeOption } from "./typeEchart";

export interface LiquidFillGaugeProps {
  option: LiquidFillGaugeOption;
  style?: CSSProperties;
}

const Gauge = ({ option, style }: LiquidFillGaugeProps): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReactECharts option={option}     style={{ height: '700px', width: '100%' }}
 />
    </div>
  );
};

export default Gauge;