import React, { useState } from "react";
import "./DocOverdue.scss";

// Filter options for the dropdown
const FILTER_OPTIONS = [
  { label: "Present Month", value: "present1", subheading: "PRESENT MONTH" },
  { label: "Present 2 Months", value: "present2", subheading: "PRESENT 2 MONTHS" },
  { label: "Present 3 Months", value: "present3", subheading: "PRESENT 3 MONTHS" },
  { label: "Present 6 Months", value: "present6", subheading: "PRESENT 6 MONTHS" },
];

// Dummy data for demonstration
const DUMMY_DATA = {
  present1: { docsLeft: "50 DOC LEFT" },
  present2: { docsLeft: "120 DOC LEFT" },
  present3: { docsLeft: "200 DOC LEFT" },
  present6: { docsLeft: "350 DOC LEFT" },
};

const DocOverdue = () => {
  // Default: show the present 1 month option
  const [selectedFilter, setSelectedFilter] = useState("present1");

  // This function will be called when the filter is changed
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  // Find the current filter option for subheading
  const presentOption = FILTER_OPTIONS.find(opt => opt.value === selectedFilter);

  // Get the docs left for the selected filter from the dummy data
  const docsLeft = DUMMY_DATA[selectedFilter]?.docsLeft;

  return (
    <div className="doc-overdue-container">
      <div className="doc-overdue-header">
        <span className="doc-overdue-title">DOCUMENT OVERDUE</span>
        <div className="doc-overdue-filter" style={{ padding: 0 }}>
          <label style={{ fontSize: "11px", background: "none", border: "none", padding: "2px 6px", cursor: "pointer" }}>
            FILTER
            <select
              style={{ position: "absolute", left: 0, top: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
              value={selectedFilter}
              onChange={handleFilterChange}
              aria-label="Filter Document Overdue"
            >
              {FILTER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="doc-overdue-subheading">
        {presentOption ? presentOption.subheading : ""}
      </div>
      <div className="doc-overdue-amount">
        {docsLeft || ""}
      </div>
    </div>
  );
};

export default DocOverdue;
