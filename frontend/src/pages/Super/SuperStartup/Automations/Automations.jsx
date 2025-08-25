import React from 'react';
import SuperLayout from '../../../../layouts/SuperLayout/SuperLayout';
import './Automations.scss';
import NavBar from '../../../../components/Super/SuperStartupComp/NavBar/NavBar';

const SuperUserAutomations = () => {
  return (
    <SuperLayout>
      <div className="automations-content">
        <NavBar/>
      </div>
    </SuperLayout>
  );
};

export default SuperUserAutomations;