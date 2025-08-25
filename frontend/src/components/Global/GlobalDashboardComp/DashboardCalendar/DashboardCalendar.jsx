import React, { useState } from 'react';
import './DashboardCalendar.scss';

const DashboardCalendar = () => {
  // Initialize state to the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeMonth = (offset) => {
    // Set the new date to the first of the target month to avoid day-related issues
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date(); // Get the actual current date

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust to make Monday the first day of the week
    const startingDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    const days = [];
    // Add blank days for the previous month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-start-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      // Check if the day being rendered is the actual current date
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      
      days.push(
        // Apply 'selected' class if it's the current day
        <div key={day} className={`calendar-day ${isToday ? 'selected' : ''}`}>
          {day}
        </div>
      );
    }
    
    // Add blank days for the next month to fill the grid
    const totalDays = startingDay + daysInMonth;
    const remainingDays = 42 - totalDays;
    for (let i = 1; i <= remainingDays; i++) {
        days.push(<div key={`empty-end-${i}`} className="calendar-day other-month">{i}</div>);
    }

    return days;
  };

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <h3 className="calendar-month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="calendar-nav">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default DashboardCalendar;
