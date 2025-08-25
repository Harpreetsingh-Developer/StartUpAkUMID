import React from 'react';
import SuperLayout from '../../../../layouts/SuperLayout/SuperLayout';
import './SuperStartup.scss';
import NavBar from '../../../../components/Super/SuperStartupComp/NavBar/NavBar';

const SuperUserStartup = () => {
  return (
    <SuperLayout>
      <div className="startup-content">
        <NavBar/>
      </div>
    </SuperLayout>
  );
};

export default SuperUserStartup;