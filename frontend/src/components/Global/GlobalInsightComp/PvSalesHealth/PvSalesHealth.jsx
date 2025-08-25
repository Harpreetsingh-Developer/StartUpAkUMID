import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./PvSalesHealth.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const accomplished = 18;
const notCovered = 12;
const total = 30;
const percentage = 60.0;

const getDonutColor = (percentage) => {
  if (percentage <= 25) return "#ef4444";   // Red
  if (percentage <= 50) return "#f97316";   // Orange
  if (percentage <= 75) return "#facc15";   // Yellow
  return "#22c55e";                         // Green
};

const chartData = {
  labels: ["Accomplished", "Not Covered"],
  datasets: [
    {
      data: [percentage, 100 - percentage],
      backgroundColor: [getDonutColor(percentage), "#e5e7eb"],
      borderWidth: 0,
      cutout: "88%",
      borderRadius: 10,
      circumference: 180,
      rotation: 270,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          if (context.dataIndex === 0) {
            return `Accomplished: ${percentage}%`;
          } else {
            return `Not Covered: ${(100 - percentage).toFixed(1)}%`;
          }
        },
      },
    },
  },
  rotation: 270,
  circumference: 180,
};

const PVSalesHealth = () => {
  const chartRef = useRef();
  return (
    <div className="pv-sales-health-container">
      <div className="pv-left-info">
        <h3 className="pv-sales-health-heading">PREVIOUS MONTH</h3>
        <div className="pv-info-rows">
          <div className="pv-info-item">
            <span className="pv-label">TARGET ACCOMPLISHRD</span>
            <span className="pv-value pv-green">{accomplished}</span>
          </div>
          <div className="pv-info-item">
            <span className="pv-label">TARGET NOT COVERED</span>
            <span className="pv-value pv-orange">{notCovered}</span>
          </div>
          <div className="pv-info-item">
            <span className="pv-label">TOTAL NUMBER TARGET</span>
            <span className="pv-value pv-blue">{total}</span>
          </div>
        </div>
      </div>
      <div className="pv-center-meter" style={{ height: 80, width: 100, position: "relative" }}>
        <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
        <div
            style={{
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 32,
                fontWeight: 700,
                color: "#000", // Changed to black
                textAlign: "center",
                width: "100%",
                pointerEvents: "none",
                userSelect: "none",
            }}
            >
            <div style={{ fontSize: 12, fontWeight: 500, color: "#000", marginTop: "10%" }}>
                OVERALL <br /> PERFORMANCE
            </div>
            <div style={{ marginTop: "-4%", color: "#000" }}> {/* Also added color here */}
                {percentage}%
            </div>
            </div>

      </div>
    </div>
  );
};

export default PVSalesHealth;
