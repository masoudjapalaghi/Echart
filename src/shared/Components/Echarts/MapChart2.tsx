import React from 'react'
import ReduceBundleSize from './ReduceBundleSize'
import rawData from  "./dataMapThree2.json"
import ReactECharts from 'echarts-for-react';

const MapChart2 = () => {


  function convert(source, target, basePath) {
    for (let key in source) {
      let path = basePath ? basePath + '.' + key : key;
      if (!key.match(/^\$/)) {
        target.children = target.children || [];
        const child = {
          name: path
        };
        target.children.push(child);
        convert(source[key], child, path);
      }
    }
    if (!target.children) {
      target.value = source.$count || 1;
    } else {
      target.children.push({
        name: basePath,
        value: source.$count
      });
    }
  }
  const data = {
    children: []
  };
  convert(rawData, data, '');
    const sunburstOption = {
      series: [
        {
          name: 'option',
          type: 'treemap',
          visibleMin: 300,
          data: data.children,
          leafDepth: 2,
          levels: [
            {
              itemStyle: {
                borderColor: '#555',
                borderWidth: 4,
                gapWidth: 4
              }
            },
            {
              colorSaturation: [0.3, 0.6],
              itemStyle: {
                borderColorSaturation: 0.7,
                gapWidth: 2,
                borderWidth: 2
              }
            },
            {
              colorSaturation: [0.3, 0.5],
              itemStyle: {
                borderColorSaturation: 0.6,
                gapWidth: 1
              }
            },
            {
              colorSaturation: [0.3, 0.5]
            }
          ]
        }
      ]
      };
  return (
    <ReduceBundleSize option={sunburstOption}/>
  )
}

export default MapChart2