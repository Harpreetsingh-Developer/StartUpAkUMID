import React from "react";
import "./SalesInCurM.scss";

// Dummy data for demonstration
const SALES_PRESENT_MONTH = {
  amount: "18,75,000 INR"
};

const SalesInCurM = () => {
  return (
    <div className="sales-curm-container">
      <div className="sales-curm-header">
        <span className="sales-curm-title">SALES IN PRESENT MONTH</span>
      </div>
      <div className="sales-curm-amount">
        {SALES_PRESENT_MONTH.amount}
      </div>
    </div>
  );
};

export default SalesInCurM;
