import React, { useState, useEffect } from 'react';
import HolidayService from '../../../../services/holidayService.js';
import './DashboardUpcomingHolidays.scss';

const DashboardUpcomingHolidays = () => {
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingHolidays = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await HolidayService.getUpcomingHolidays();
        
        if (response.success) {
          setUpcomingHolidays(response.data);
        } else {
          setError('Failed to fetch upcoming holidays');
        }
      } catch (err) {
        console.error('Error fetching upcoming holidays:', err);
        setError('Failed to load upcoming holidays');
        setUpcomingHolidays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingHolidays();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const holidayDate = new Date(dateString);
    const diffTime = holidayDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="upcoming-holidays-card">
      <h3 className="upcoming-holidays-title">UPCOMING HOLIDAYS</h3>
      <div className="upcoming-holidays-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading upcoming holidays...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <small>Check your connection</small>
          </div>
        ) : upcomingHolidays.length > 0 ? (
          <ul className="upcoming-holidays-list">
            {upcomingHolidays.slice(0, 5).map((holiday, index) => {
              const daysUntil = getDaysUntil(holiday.date);
              return (
                <li key={holiday._id || index} className="upcoming-holiday-item">
                  <div className="holiday-info">
                    <span className="holiday-name">{holiday.name}</span>
                    <span className="holiday-date">{formatDate(holiday.date)}</span>
                  </div>
                  <div className="holiday-meta">
                    <span className={`holiday-type ${holiday.type}`}>
                      {holiday.type}
                    </span>
                    <span className="days-until">
                      {daysUntil === 0 ? 'Today' : 
                       daysUntil === 1 ? 'Tomorrow' : 
                       `${daysUntil} days`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-upcoming-holidays-message">No upcoming holidays in the next 30 days</p>
        )}
      </div>
    </div>
  );
};

export default DashboardUpcomingHolidays;
