import React, { useState } from "react";
import "./SalesInPv.scss";

// Helper to format date as "15th July 2025"
function formatDateWithSuffix(date) {
  if (!(date instanceof Date)) return "";
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Get ordinal suffix
  function getOrdinal(n) {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  return `${day}${getOrdinal(day)} ${month} ${year}`;
}

// Helper to get duration string like "1 Year 2 Months 3 Days"
function getDurationString(startDate, endDate) {
  // Ensure startDate <= endDate
  let start = new Date(startDate);
  let end = new Date(endDate);
  if (start > end) [start, end] = [end, start];

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    // borrow days from previous month
    months -= 1;
    // get days in previous month
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Only show non-zero units
  const parts = [];
  if (years > 0) parts.push(`${years} Year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} Month${months > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} Day${days > 1 ? "s" : ""}`);
  if (parts.length === 0) parts.push("0 Day");

  return parts.join(" ");
}

// Dummy data for demonstration (simulate sales for a date range)
function getSalesDataForRange(startDate, endDate) {
  // In a real app, fetch from API using startDate and endDate
  // Here, just return a dummy value based on the number of days
  const msInDay = 24 * 60 * 60 * 1000;
  const days = Math.max(1, Math.round((endDate - startDate) / msInDay) + 1);
  // Fake calculation: 10,000 INR per day
  const amount = `${(days * 10000).toLocaleString("en-IN")} INR`;
  return {
    // label: `FROM ${formatDateWithSuffix(startDate)} TO ${formatDateWithSuffix(endDate)}`,
    amount,
  };
}

const SalesInPv = () => {
  // Default: last 30 days
  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setDate(today.getDate() - 29);

  const [dateRange, setDateRange] = useState({
    start: defaultStart,
    end: today,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));
  };

  // Ensure start <= end
  const startDate = dateRange.start > dateRange.end ? dateRange.end : dateRange.start;
  const endDate = dateRange.end < dateRange.start ? dateRange.start : dateRange.end;

  const currentData = getSalesDataForRange(startDate, endDate);
  const durationLabel = getDurationString(startDate, endDate);

  return (
    <div className="sales-pv-container">
      <div className="sales-pv-header">
        <span className="sales-pv-title">SALES</span>
        <button
          className="sales-pv-filter"
          style={{ border: "1px solid #e5e7eb", borderRadius: 4, background: "#fff", padding: "2px 8px" }}
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <span role="img" aria-label="calendar" style={{ marginRight: 4 }}>📅</span>
          FILTER DATE
        </button>
        {showCalendar && (
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 16,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(30,30,47,0.08)",
              padding: 12,
              zIndex: 10,
              display: "flex",
              gap: 8,
              flexDirection: "column",
            }}
          >
            <label style={{ fontSize: 11, color: "#374151" }}>
              Start:
              <input
                type="date"
                name="start"
                value={startDate.toISOString().slice(0, 10)}
                max={endDate.toISOString().slice(0, 10)}
                onChange={handleDateChange}
                style={{ marginLeft: 6, fontSize: 11, fontFamily: "Poppins, sans-serif" }}
              />
            </label>
            <label style={{ fontSize: 11, color: "#374151" }}>
              End:
              <input
                type="date"
                name="end"
                value={endDate.toISOString().slice(0, 10)}
                min={startDate.toISOString().slice(0, 10)}
                max={today.toISOString().slice(0, 10)}
                onChange={handleDateChange}
                style={{ marginLeft: 14, fontSize: 11, fontFamily: "Poppins, sans-serif" }}
              />
            </label>
            <button
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 4,
                border: "1px solid #10B981",
                background: "#10B981",
                color: "#fff",
                cursor: "pointer",
                marginTop: 4,
              }}
              onClick={() => setShowCalendar(false)}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <div className="sales-pv-subheading">{durationLabel}</div>
      <div className="sales-pv-amount">{currentData.amount}</div>
    </div>
  );
};

export default SalesInPv;
