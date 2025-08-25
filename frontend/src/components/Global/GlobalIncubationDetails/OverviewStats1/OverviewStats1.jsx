import React from 'react';
import './OverviewStats1.scss';

// This component can later be modified to accept stats as props
const OverviewStats1 = ({ incubationData }) => {
  const stats = [
    { 
      value: incubationData?.startupCount || '0', 
      label: 'Total Startup Incubated' 
    },
    { 
      value: incubationData?.fundRaised || 'N/A', 
      label: 'Fund Raised' 
    },
    { 
      value: incubationData?.jobsCreated || 'N/A', 
      label: 'Job Created' 
    },
  ];

  return (
    <div className="incubation-stats-card">
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <div className="stat-item">
            <h2 className="stat-value">{stat.value}</h2>
            <p className="stat-label">{stat.label}</p>
          </div>
          {index < stats.length - 1 && <div className="stat-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OverviewStats1;
