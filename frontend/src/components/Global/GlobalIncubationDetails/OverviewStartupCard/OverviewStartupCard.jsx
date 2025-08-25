import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './OverviewStartupCard.scss';

const defaultStartups = [
  { name: 'No Startups Available', domain: 'N/A', stage: 'N/A' },
];

const StartupRow = ({ startup }) => (
  <tr className="startup-table-row">
    <td className="startup-table-cell">{startup.name}</td>
    <td className="startup-table-cell">{startup.domain}</td>
    <td className="startup-table-cell">{startup.stage}</td>
  </tr>
);

// The component now accepts incubationData and extracts startup information
const OverviewStartupCard = ({ incubationData }) => {
  const { id } = useParams();
  
  // Create dummy startups based on the incubation data or show empty state
  const startups = incubationData?.startupCount > 0 ? 
    Array.from({ length: Math.min(incubationData.startupCount, 5) }, (_, index) => ({
      name: `Startup ${index + 1}`,
      domain: incubationData.expertise || 'General',
      stage: index % 3 === 0 ? 'Early' : index % 3 === 1 ? 'Growth' : 'Scaling'
    })) : defaultStartups;

  return (
    <div className="startup-card">
      {/* Card Header */}
      <div className="startup-card-header">
        <h1 className="startup-card-title">Startups</h1>
        {/* Use Link to navigate to the startups tab for the current incubation */}
        <Link to={`/global/incubations/${id}/startup`} className="startup-card-view-all">
          View All
        </Link>
      </div>

      {/* Startups Table */}
      <div className="startup-table-wrapper">
        <table className="startup-table">
          <thead className="startup-table-head">
            <tr>
              <th className="startup-table-header-cell">Name</th>
              <th className="startup-table-header-cell">Domain</th>
              <th className="startup-table-header-cell">Stage</th>
            </tr>
          </thead>
          <tbody className="startup-table-body">
            {startups.slice(0, 5).map((startup, index) => (
              <StartupRow key={index} startup={startup} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewStartupCard;
