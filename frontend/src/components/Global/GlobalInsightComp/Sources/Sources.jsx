// DonutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Sources.scss';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register only the required Chart.js components (no datalabels)
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * DonutChart component
 * @param {Object} props
 * @param {string[]} [props.labels] - Array of label names for the chart
 * @param {number[]} [props.data] - Array of data values for the chart
 * @param {string[]} [props.backgroundColor] - Array of background colors for each segment
 * @param {string} [props.title] - Title to display above the chart
 * @param {Object} [props.options] - Additional Chart.js options to override defaults
 */
const DonutChart = ({
  labels = ['LinkedIn', 'Google Ads', 'Events', 'Workshops', 'Referral', 'Others'],
  data = [30, 25, 20, 10, 10, 5],
  backgroundColor = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#C9CBCF'
  ],
  title = 'SOURCES',
  options: userOptions = {}
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 2,
        borderColor: '#fff'
      },
    ],
  };

  const defaultOptions = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = labels[tooltipItem.dataIndex];
            const value = data[tooltipItem.dataIndex];
            return `${label}: ${value}%`;
          },
        },
      },
      // No datalabels plugin here
    },
  };

  // Merge userOptions into defaultOptions (shallow merge for plugins)
  const mergedOptions = {
    ...defaultOptions,
    ...userOptions,
    plugins: {
      ...defaultOptions.plugins,
      ...(userOptions.plugins || {})
    }
  };

  return (
    <div className="donut-chart-container">
      <div className="donut-chart-header">
        <div className="sources-heading">{title}</div>
      </div>
      <div className="donut-chart-main">
        <div className="donut-chart-wrapper">
          <Doughnut data={chartData} options={mergedOptions} />
        </div>
        <div className="donut-chart-legend">
          <ul className="source-list">
            {labels.map((label, index) => (
              <li key={index}>
                <span className="dot" style={{ backgroundColor: backgroundColor[index] }}></span>
                {label} <strong>{data[index]}%</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;