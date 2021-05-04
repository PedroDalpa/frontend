import ReactEcharts from 'echarts-for-react';
import { GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { LaunchContext } from '../../context/Production/LaunchContext';
import { api } from '../../services/api';
import styles from '../../styles/Components/Production/LaunchProductionChart.module.scss';

interface IProduction {
  production_line_name: string;
  total: string;
  percent: string;
}
export default function VelocimeterChart() {
  const [production, setProduction] = useState([{} as IProduction]);
  useEffect(() => {
    api.get('production').then((response) => {
      console.log(response);

      setProduction(response.data.production);
    });
  }, []);
  const productions = production.map((productionPerLine) => {
    return {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#fd666d'],
                [0.7, '#37a2da'],
                [1, '#67e0e3'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'rgb(70, 74, 79)',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 0,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 0,
            },
          },
          axisLabel: {
            color: 'rgb(70, 74, 79, 0.0)',
          },
          detail: {
            fontSize: 16,
            valueAnimation: true,
            formatter: `${productionPerLine.production_line_name}: ${productionPerLine.total}`,
            color: 'rgb(70, 74, 79)',
          },
          data: [
            {
              value: productionPerLine.percent,
            },
          ],
        },
      ],
    };
  });

  return (
    <div className={styles.container}>
      {production &&
        productions.map((productionPerLine) => {
          return (
            <ReactEcharts option={productionPerLine} className={styles.chart} />
          );
        })}
    </div>
  );
}
