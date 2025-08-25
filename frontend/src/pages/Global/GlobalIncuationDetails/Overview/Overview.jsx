import React from 'react';
import OverviewMain from '../../../../components/Global/GlobalIncubationDetails/OverviewMain/OverviewMain';
import GlobalLayout from '../../../../layouts/GlobalLayout/GlobalLayout';
import './Overview.scss';

const GlobalUserIncubationOverview = () => {
  return (
    <GlobalLayout>
      <div className="incubation-details-content">
          <OverviewMain/>
        </div>
    </GlobalLayout>
  );
};

export default GlobalUserIncubationOverview;
