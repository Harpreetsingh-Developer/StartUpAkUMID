import React from 'react';
import './OverviewDetailCardOne.scss';

const OverviewDetailCardOne = ({ incubationData }) => {
  const details = [
    { 
      label: 'Expertise:', 
      value: incubationData?.expertise || 'Not specified' 
    },
    { 
      label: 'Date of Foundation:', 
      value: incubationData?.establishedDate || 'Not specified' 
    },
    { 
      label: 'Total Area:', 
      value: incubationData?.totalArea || 'Not specified' 
    },
    { 
      label: 'Inactive Startup:', 
      value: incubationData?.inactiveStartups || '0' 
    },
    { 
      label: 'Total Startup:', 
      value: incubationData?.startupCount || '0' 
    },
    { 
      label: 'Active Startup:', 
      value: incubationData?.activeStartups || '0' 
    },
  ];

  return (
    <div className="details-card">
      <h3 className="details-card-title">Details</h3>
      <div className="details-list">
        {details.map(detail => (
          <div className="detail-item" key={detail.label}>
            <span className="detail-label">{detail.label}</span>
            <span className="detail-value">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewDetailCardOne;
