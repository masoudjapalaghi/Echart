import React, { CSSProperties } from "react";
// import the core library.
import ReactEChartsCore from 'echarts-for-react/esm/core.js';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import {
  // LineChart,
  BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  SunburstChart,
  // CustomChart,
} from "echarts/charts";
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";
import { LiquidFillGaugeOption } from "./typeEchart";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  MapChart,
  CanvasRenderer,
  TreeChart,
  TreemapChart,
  SunburstChart
]);

// The usage of ReactEChartsCore are same with above.
export interface LiquidFillGaugeProps {
  option: LiquidFillGaugeOption;
  style?: CSSProperties;
}
const ReduceBundleSize = ({ option, ...rest }:LiquidFillGaugeProps) => {
  return (
    <ReactEChartsCore
      option={option}
      echarts={echarts}
       notMerge={true}
       lazyUpdate={true}
       theme={"theme_name"}
      // option={this.getOption()}
      //  onChartReady={this.onChartReadyCallback}
      //  onEvents={EventsDict}
      //  opts={}
      {...rest}
    />
  );
};

export default ReduceBundleSize;
