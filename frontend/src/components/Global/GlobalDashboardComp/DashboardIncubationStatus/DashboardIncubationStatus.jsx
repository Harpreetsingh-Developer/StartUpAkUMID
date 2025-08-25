import React from 'react';
import './DashboardIncubationStatus.scss';

const DashboardIncubationStatus = () => {
  // Dummy data, this can be passed as props later
  const statusData = {
    active: 5,
    inactive: 2,
  };

  return (
    <div className="incubation-status-card">
      <h3 className="incubation-status-title">INCUBATION STATUS</h3>
      <div className="status-container">
        <div className="status-item active">
          <span className="status-count">{statusData.active}</span>
          <span className="status-label">ACTIVE</span>
        </div>
        <div className="status-divider" />
        <div className="status-item inactive">
          <span className="status-count">{statusData.inactive}</span>
          <span className="status-label">INACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardIncubationStatus;
