import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const ChartComponent = ({ chartData, mode }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartData) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      Chart.register(...registerables);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Compounded Amount',
              backgroundColor: 'rgb(255, 255, 255)',
              borderColor: 'rgb(0, 150, 255)',
              borderWidth: 1,
              data: chartData.datasets[0].data,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.4)',
              },
              ticks: {
                color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              },
            },
            y: {
              grid: {
                color: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.4)',
              },
              ticks: {
                color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              },
            },
          },
        },
      });
    }
  }, [chartData, mode]);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas
        id="myChart"
        className="text-center"
        style={{ minHeight: '200px', minWidth: '300px', maxWidth: '1000px', maxHeight: '500px' }}
        ref={chartRef}
      />
    </div>
  );
};

export default ChartComponent;

