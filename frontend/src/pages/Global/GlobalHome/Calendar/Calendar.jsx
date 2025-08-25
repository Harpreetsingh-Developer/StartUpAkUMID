import React from 'react';
import GlobalLayout from '../../../../layouts/GlobalLayout/GlobalLayout';
import DashboardNavBar from '../../../../components/Global/GlobalInsightComp/DashboardNavBar/DashboardNavBar';
import './Calendar.scss';

const GlobalUserCalendar = () => {
  return (
    <GlobalLayout>
      <div className="calendar-content">
        <DashboardNavBar />
        <div>
          <h2>Calendar Page</h2>
          <p>Under Construction Sorry for inconvenience.</p>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default GlobalUserCalendar;
