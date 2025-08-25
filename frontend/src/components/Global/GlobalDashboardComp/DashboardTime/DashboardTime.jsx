import React, { useState, useEffect } from 'react';
import './DashboardTime.scss';

const DashboardTime = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    // --- Time Formatting ---
    const timeString = currentDateTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const [time, ampm] = timeString.split(' ');
  
    // --- Date Formatting ---
    const day = currentDateTime.getDate();
    const month = currentDateTime.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const weekday = currentDateTime.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
    const year = currentDateTime.getFullYear();
  
    return (
      <div className="datetime-card">
        <div className="time-container">
          <span className="time-main">{time}</span>
          <span className="time-ampm">{ampm}</span>
        </div>
        <div className="date-container">
          <div className="date-day-month">{`${day} ${month}`}</div>
          <div className="date-weekday">{weekday}</div>
          <div className="date-year">{year}</div>
        </div>
      </div>
    );
};

export default DashboardTime;
