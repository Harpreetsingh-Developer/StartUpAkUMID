import React from 'react';
import './OverviewStats2.scss';

// This component can also be updated later to accept data via props.
const OverviewStats2 = ({ incubationData }) => {
  const stats = [
    { 
      value: incubationData?.totalMentors || 'N/A', 
      label: 'Total Mentors' 
    },
    { 
      value: incubationData?.meetingRooms || 'N/A', 
      label: 'Meetings Rooms' 
    },
    { 
      value: incubationData?.staffCount || 'N/A', 
      label: 'Staffs' 
    },
  ];

  return (
    <div className="secondary-stats-card">
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

export default OverviewStats2;
