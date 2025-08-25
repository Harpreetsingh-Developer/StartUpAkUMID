import React from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../../../constants/icons';
import './SideNavbar.scss';

const SideNavbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="side-navbar">
      <div className="side-navbar__top">
        <div
          className="side-navbar__option side-navbar__option--home"
          onClick={() => handleNavigation('/super/home')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.HomeIcon}
            alt="Home"
            className="side-navbar__icon side-navbar__icon--home"
          />
          <span className="side-navbar__label side-navbar__label--home">Home</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--incubation"
          onClick={() => handleNavigation('/super/startups')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.IncubationIcon}
            alt="Incubation"
            className="side-navbar__icon side-navbar__icon--startup"
          />
          <span className="side-navbar__label side-navbar__label--startup">Startups</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--investor"
          onClick={() => handleNavigation('/super/investor')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.Investor}
            alt="Investor"
            className="side-navbar__icon side-navbar__icon--investor"
          />
          <span className="side-navbar__label side-navbar__label--investor">Investor</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--mentor"
          onClick={() => handleNavigation('/super/mentor')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.Mentor}
            alt="Mentor"
            className="side-navbar__icon side-navbar__icon--Mentor"
          />
          <span className="side-navbar__label side-navbar__label--Mentor">Mentor</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--team"
          onClick={() => handleNavigation('/super/team&infra')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.TeamInfra}
            alt="TeamInfra"
            className="side-navbar__icon side-navbar__icon--team"
          />
          <span className="side-navbar__label side-navbar__label--team">Team & Infra</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--message"
          onClick={() => handleNavigation('/super/message')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.MessageIcon}
            alt="Message"
            className="side-navbar__icon side-navbar__icon--message"
          />
          <span className="side-navbar__label side-navbar__label--message">Message</span>
        </div>
        
        <div
          className="side-navbar__option side-navbar__option--apps"
          onClick={() => handleNavigation('/super/apps')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.AppsIcon}
            alt="Apps"
            className="side-navbar__icon side-navbar__icon--apps"
          />
          <span className="side-navbar__label side-navbar__label--apps">Apps</span>
        </div>
       
      </div>
      <div className="side-navbar__bottom">
        <div
          className="side-navbar__option side-navbar__option--settings"
          onClick={() => handleNavigation('/super/settings')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.SettingsIcon}
            alt="Settings"
            className="side-navbar__icon side-navbar__icon--settings"
          />
          <span className="side-navbar__label side-navbar__label--settings">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
