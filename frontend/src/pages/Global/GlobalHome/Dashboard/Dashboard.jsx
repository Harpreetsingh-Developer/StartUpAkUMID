import React from 'react';
import GlobalLayout from '../../../../layouts/GlobalLayout/GlobalLayout';
import DashboardNavBar from '../../../../components/Global/GlobalInsightComp/DashboardNavBar/DashboardNavBar';
import './Dashboard.scss';
import DashboardMain from '../../../../components/Global/GlobalDashboardComp/DashboardMain/DashboardMain';

const GlobalUserDashboard = () => {
  return (
    <GlobalLayout>
      <div className="dashboard-content">
      <DashboardNavBar />
        <div>
          <DashboardMain/>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default GlobalUserDashboard;
