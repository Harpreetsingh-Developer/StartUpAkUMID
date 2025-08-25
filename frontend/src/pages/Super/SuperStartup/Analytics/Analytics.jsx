import React from 'react';
import SuperLayout from '../../../../layouts/SuperLayout/SuperLayout';
import './Analytics.scss';
import NavBar from '../../../../components/Super/SuperStartupComp/NavBar/NavBar';

const SuperUserAnalytics = () => {
  return (
    <SuperLayout>
      <div className="analytics-content">
        <NavBar/>
      </div>
    </SuperLayout>
  );
};

export default SuperUserAnalytics;