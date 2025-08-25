import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardQuickLink.scss';

const DashboardQuickLink = () => {
  // Dummy data for the links. This can be made dynamic later.
  const links = [
    { text: 'Onboard', path: '/global/incubations/onboard' },
    { text: 'Insight', path: '/global/home/insights' },
    { text: 'List of Incubation', path: '/global/incubations' },
    { text: 'Settings', path: '/global/settings' },
    { text: 'Apps', path: '/global/apps' },
    { text:  'Report', path: '/global/report' },
  ];

  return (
    <div className="quick-links-card">
      <h3 className="quick-links-title">QUICK LINKS</h3>
      <div className="links-grid">
        {links.map((link, index) => (
          <Link key={index} to={link.path} className="quick-link-item">
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardQuickLink;
