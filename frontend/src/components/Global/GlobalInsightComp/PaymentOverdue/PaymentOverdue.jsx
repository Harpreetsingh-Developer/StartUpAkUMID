import React, { useState } from "react";
import "./PaymentOverdue.scss";

// Filter options for the dropdown
const FILTER_OPTIONS = [
  { label: "Present Month", value: "present1", subheading: "PRESENT MONTH" },
  { label: "Present 2 Months", value: "present2", subheading: "PRESENT 2 MONTHS" },
  { label: "Present 3 Months", value: "present3", subheading: "PRESENT 3 MONTHS" },
  { label: "Present 6 Months", value: "present6", subheading: "PRESENT 6 MONTHS" },
];

// Dummy data for demonstration
const DUMMY_DATA = {
  present1: { amount: "11,10,860 INR" },
  present2: { amount: "21,50,000 INR" },
  present3: { amount: "32,75,500 INR" },
  present6: { amount: "54,20,900 INR" },
};

const PaymentOverdue = () => {
  // Default: show the present 1 month option
  const [selectedFilter, setSelectedFilter] = useState("present1");

  // This function will be called when the filter is changed
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  // Find the current filter option for subheading
  const presentOption = FILTER_OPTIONS.find(opt => opt.value === selectedFilter);

  // Get the amount for the selected filter from the dummy data
  const amount = DUMMY_DATA[selectedFilter]?.amount;

  return (
    <div className="payment-overdue-container">
      <div className="payment-overdue-header">
        <span className="payment-overdue-title">PAYMENT OVERDUE</span>
        <div className="payment-overdue-filter" style={{ padding: 0 }}>
          <label style={{ fontSize: "11px", background: "none", border: "none", padding: "2px 6px", cursor: "pointer" }}>
            FILTER
            <select
              style={{ position: "absolute", left: 0, top: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
              value={selectedFilter}
              onChange={handleFilterChange}
              aria-label="Filter Payment Overdue"
            >
              {FILTER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="payment-overdue-subheading">
        {presentOption ? presentOption.subheading : ""}
      </div>
      <div className="payment-overdue-amount">
        {amount || ""}
      </div>
    </div>
  );
};

export default PaymentOverdue;