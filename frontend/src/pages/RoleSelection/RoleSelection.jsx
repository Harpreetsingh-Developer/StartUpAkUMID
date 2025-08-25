import React from 'react';
import './RoleSelection.scss'
import { useNavigate } from 'react-router-dom';
import icons from '../../constants/icons.js';

// Helper Button component to allow passing icon src as prop
const RoleButton = ({ onClick, iconSrc, children }) => (
  <button onClick={onClick} className="role-selection-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* Icon at the top of the button */}
    {iconSrc && (
      <span className="role-selection-icon-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <img
          src={iconSrc}
          alt=""
          className="role-selection-icon"
          style={{ width: 40, height: 40 }}
        />
      </span>
    )}
    <span>{children}</span>
  </button>
);

const RoleSelection = () => {
  const navigate = useNavigate();

  // Set the image path here for each role (replace with your actual icon paths)
  const globalAdminIcon = icons.Global;
  const superAdminIcon = icons.Super;
  const normalAdminIcon = icons.Admin;

  const handleGlobalAdmin = () => {
    navigate('login/global');
  };

  const handleSuperAdmin = () => {
    navigate('login/super');
  };

  const handleNormalAdmin = () => {
    navigate('login/admin');
  };

  return (
    <div>
      <div className="role-selection-container">
        <div className="role-selection-main">
          <h1 className="role-selection-h1">WELCOME TO KPB SUPPORT SOLUTIONS</h1>
          <h2 className="role-selection-h2">Select Your Profile</h2>
          <div className="role-selection-buttons">
            <RoleButton onClick={handleGlobalAdmin} iconSrc={globalAdminIcon}>
              GLOBAL ADMIN
            </RoleButton>
            <RoleButton onClick={handleSuperAdmin} iconSrc={superAdminIcon}>
              SUPER ADMIN
            </RoleButton>
            <RoleButton onClick={handleNormalAdmin} iconSrc={normalAdminIcon}>
              ADMIN USER
            </RoleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;