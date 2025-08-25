import React from 'react';
import './DashboardMain.scss';

// Import all your dashboard components
import DashboardTime from '../DashboardTime/DashboardTime';
import DashboardHoliday from '../DashboardHoliday/DashboardHoliday';
import DashboardQuickLink from '../DashboardQuickLink/DashboardQuickLink';
import DashboardLoginSummary from '../DashboardLoginSummary/DashboardLoginSummary';
import DashboardCreatePost from '../DashboardCreatePost/DashboardCreatePost';
import DashboardYourPost from '../DashboardYourPost/DashboardYourPost';
import DashboardTodoList from '../DashboardTodoList/DashboardTodoList';
import DashboardIncubationStatus from '../DashboardIncubationStatus/DashboardIncubationStatus';
import DashboardCalendar from '../DashboardCalendar/DashboardCalendar';

const DashboardMain = () => {
  return (
    <div className="dashboard-main-container">
      <div className="home-dashboard-grid">
        {/* --- Column 1 --- */}
        <div className="dashboard-column">
          <DashboardTime/>
          <DashboardHoliday />
          <DashboardQuickLink />
          <DashboardLoginSummary />
        </div>

        {/* --- Column 2 --- */}
        <div className="dashboard-column">
          <DashboardCreatePost />
          <DashboardYourPost />
        </div>

        {/* --- Column 3 --- */}
        <div className="dashboard-column">
          <DashboardTodoList />
          <DashboardIncubationStatus />
          <DashboardCalendar />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
