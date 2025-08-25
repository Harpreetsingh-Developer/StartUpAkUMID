// GlobalIncubationCards.jsx
import React from 'react';
import './GlobalIncubationCards.scss';
import icons from '../../../../constants/icons';
import { Link } from 'react-router-dom';


const GlobalIncubationCards = ({
  id,
  name,
  isOnline,
  planStatus,
  startupCount,
  documentsFilled,
  totalDocuments,
  establishedDate,
  activeStartups,
  inactiveStartups,
  expertise,
  location,
  viewMode // Accept viewMode prop
}) => {
  const getStatusColor = () => {
    switch (planStatus) {
      case 'active': return '#28a745';
      case 'expiring': return '#ffc107';
      case 'expired': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <Link to={`/global/incubations/${id}`} className="card-link-wrapper">
      <div className={`incubation-card ${viewMode === 'list' ? 'list-card' : ''}`}> {/* Apply list-card class conditionally */}
        <div className="card-header">
          <h2>{name}</h2>
          <span className="status-dot" style={{ backgroundColor: getStatusColor() }}></span>
        </div>

        <div className="card-subheading">
          <span>{expertise}</span>
          <span className="divider">|</span>
          <span>{location}</span>
        </div>

        <div className="card-row">
          <div className="item">
            <img src={icons.Person} alt="person" />
            <span>{startupCount}</span>
          </div>
          <div className="item">
            <img src={icons.CheckMark} alt="checkmark" />
            <span>{documentsFilled}/{totalDocuments}</span>
          </div>
          <div className="item">
            <img src={icons.TCalendar} alt="Calendar" />
            <span>{establishedDate}</span>
          </div>
        </div>

        <hr />

        <div className="card-footer">
          <div className="left">
            <span className="count">{activeStartups}</span>
            <span className="label">Active Startup</span>
          </div>
          <div className="center">
            <span className="count">{inactiveStartups}</span>
            <span className="label">Inactive Startup</span>
          </div>
          <div className="right">
            <span className={`online-dot ${isOnline ? 'green' : 'gray'}`}></span>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GlobalIncubationCards;