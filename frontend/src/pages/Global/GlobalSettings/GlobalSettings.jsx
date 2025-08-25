import './GlobalSettings.scss';
import React, { useState } from 'react';
import GlobalLayout from '../../../layouts/GlobalLayout/GlobalLayout';
import CommonSettingsLayout from '../../../components/Global/GlobalSettingsPanel/CommonSettings/CommonSettings';

function GlobalUserSettings() {
  return (
    <GlobalLayout>
      <div className="settings-placeholder">
        <CommonSettingsLayout>
        <h1>This is Settings Panel</h1>
        </CommonSettingsLayout>
      
      </div>
    </GlobalLayout>
  );
}

export default GlobalUserSettings; 