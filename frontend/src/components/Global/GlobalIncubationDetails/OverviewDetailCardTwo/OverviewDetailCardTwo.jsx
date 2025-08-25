import React from 'react';
import './OverviewDetailCardTwo.scss';

const OverviewDetailCardTwo = ({ incubationData }) => {
  const details = [
    { 
      label: 'Industry Focus', 
      value: incubationData?.industryFocus || 'Not specified' 
    },
    { 
      label: 'Location', 
      value: incubationData?.location || 'Not specified' 
    },
    { 
      label: 'About Campus', 
      value: incubationData?.aboutCampus || 'Not specified' 
    },
    { 
      label: 'Specialized Labs', 
      value: incubationData?.specializedLabs?.labName || 'Not available' 
    },
    { 
      label: 'IT Infrastructure', 
      value: incubationData?.itDigitalInfra?.infrastructureName || 'Not specified' 
    },
    { 
      label: 'Payment Mode', 
      value: incubationData?.paymentDetails?.paymentMode || 'Not specified' 
    },
  ];

  return (
    <div className="details-card">
      <h3 className="details-card-title">Additional Details</h3>
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

export default OverviewDetailCardTwo;
