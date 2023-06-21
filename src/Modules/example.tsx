import React from "react";
import Graph from "./../shared/Components/Echarts/Graph";
import Gauge from "../shared/Components/Echarts/Gauage";
import { ReactEChartsProps } from "../shared/Components/Echarts/ReactECharts";
import MapChart from "./../shared/Components/Echarts/MapChart";
import MapChart2 from "../shared/Components/Echarts/MapChart2";

const Example = () => {
  const option: ReactEChartsProps["option"] = {
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, "#67e0e3"],
              [0.7, "#37a2da"],
              [1, "#fd666d"],
            ],
          },
        },
        pointer: {
          width:1,
          keepAspect:true,
          length:3,
          icon:"asdasdasdasdasd",
          offsetCenter:[23,10],
          show:true,
          showAbove:true,
          itemStyle: {
            color: "inherit",
            borderColor: "red",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 4,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} km/h",
          color: "inherit",
        },
        data: [
          {
            value: 70,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <Gauge option={option} />
      <Graph />
      <MapChart />
      <MapChart2 />
    </div>
  );
};

export default Example;
