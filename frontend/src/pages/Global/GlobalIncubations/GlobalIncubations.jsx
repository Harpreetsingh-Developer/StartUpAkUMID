import React from 'react';
import Incubation from '../../../components/Global/GlobalIncubationComp/GlobalIncubationMain/GlobalIncubationMain';
import GlobalLayout from '../../../layouts/GlobalLayout/GlobalLayout';

const GlobalUserIncubation = () => {
  return (
    <GlobalLayout>
      <div className="incubation-content">
          <Incubation/>
        </div>
    </GlobalLayout>
  );
};

export default GlobalUserIncubation;
