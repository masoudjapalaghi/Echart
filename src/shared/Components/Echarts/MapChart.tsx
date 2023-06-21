import React, { useEffect, useState } from "react";
import ReduceBundleSize from "./ReduceBundleSize";
import data from "./dataMapThree.json";

const MapChart = () => {
  const [currentOption, setCurrentOption] = useState(false);

  const handleToggle = (e) => {
    setCurrentOption(e.target.checked);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <label>تغییر</label>
        <input className="w" type="checkbox" onChange={handleToggle} />
      </div>
      <ReduceBundleSize
        option={currentOption ? treemapOption : sunburstOption}
      />
    </div>
  );
};

export default MapChart;

const treemapOption = {
  series: [
    {
      type: "treemap",
      id: "echarts-package-size",
      animationDurationUpdate: 1000,
      roam: false,
      nodeClick: undefined,
      data: data.children,
      universalTransition: true,
      label: {
        show: true,
      },
      breadcrumb: {
        show: false,
      },
    },
  ],
};
const sunburstOption = {
  series: [
    {
      type: "sunburst",
      id: "echarts-package-size",
      radius: ["20%", "90%"],
      animationDurationUpdate: 1000,
      nodeClick: undefined,
      data: data.children,
      universalTransition: true,
      itemStyle: {
        borderWidth: 1,
        borderColor: "rgba(255,255,255,.5)",
      },
      label: {
        show: false,
      },
    },
  ],
};
