import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./DashboardSalesHealth.scss";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Simulated API call
const fetchSalesHealth = async () => {
  // Replace this with your real API later
  return {
    accomplished: 25,
    total: 30,
  };
};

const DashboardSalesHealth = () => {
  const [data, setData] = useState({ accomplished: 0, total: 0 });
  const chartRef = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchSalesHealth();
        setData({
          accomplished: result.accomplished,
          total: result.total,
        });
      } catch (err) {
        console.error("Failed to fetch sales data:", err);
      }
    };
    getData();
  }, []);

  const percentage =
    data.total > 0
      ? parseFloat(((data.accomplished / data.total) * 100).toFixed(1))
      : 0;

  const status =
    percentage >= 75
      ? "EXCELLENT"
      : percentage >= 50
      ? "BETTER"
      : "NEEDS WORK";

  // Fallback colors for stability
  // Dynamic color based on percentage
  const getDonutColor = (percentage) => {
    if (percentage <= 25) return "#ef4444";   // Red
    if (percentage <= 50) return "#f97316";   // Orange
    if (percentage <= 75) return "#facc15";   // Yellow
    return "#22c55e";                         // Green
  };

  const chartData = {
    labels: ["Accomplished", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [getDonutColor(percentage), "#e5e7eb"],
        borderWidth: 0,
        cutout: "88%", // thickness
        borderRadius: 10, // rounded ends
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
              return `Remaining: ${(100 - percentage).toFixed(1)}%`;
            }
          },
        },
      },
    },
    rotation: 270,
    circumference: 180,
  };

  return (
    <div className="sales-health-container">
      <div className="left-info">
        <h3 className="sales-health-heading">SALES HEALTH</h3>
        <div className="info-rows">
          <div className="info-item">
            <span className="label">TARGET ACCOMPLISHED</span>
            <span className="value green">{data.accomplished}</span>
          </div>
          <div className="info-item">
            <span className="label">TARGET NEED TO COVER</span>
            <span className="value red">
              {data.total - data.accomplished}
            </span>
          </div>
          <div className="info-item">
            <span className="label">TOTAL NUMBER OF TARGET</span>
            <span className="value blue">{data.total}</span>
          </div>
        </div>
      </div>

      <div className="center-meter" style={{ height: 80, width: 100, position: "relative" }}>
        <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 32,
            fontWeight: 700,
            color: "#1e293b",
            textAlign: "center",
            width: "100%",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div style={{fontSize: 12, fontWeight: 500, color: "#00000", marginTop: "14%" }}>
          OVERALL <br />PERFORMANCE
          </div>
          <div style={{ marginTop: "-4%" }}>
            {percentage}%
          </div>
        
        </div>
      </div>

      <div className="right-status">
        <h5>SALES STATUS</h5>
        <h2>{status}</h2>
      </div>
    </div>
  );
};

export default DashboardSalesHealth;
