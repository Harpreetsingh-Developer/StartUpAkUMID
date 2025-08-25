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
          onClick={() => handleNavigation('/global/home')}
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
          onClick={() => handleNavigation('/global/incubations')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.IncubationIcon}
            alt="Incubation"
            className="side-navbar__icon side-navbar__icon--incubation"
          />
          <span className="side-navbar__label side-navbar__label--incubation">Incubations</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--message"
          onClick={() => handleNavigation('/global/messages')}
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
          className="side-navbar__option side-navbar__option--report"
          onClick={() => handleNavigation('/global/report')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.ReportIcon}
            alt="Report"
            className="side-navbar__icon side-navbar__icon--report"
          />
          <span className="side-navbar__label side-navbar__label--report">Report</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--apps"
          onClick={() => handleNavigation('/global/apps')}
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
        <div
          className="side-navbar__option side-navbar__option--website"
          onClick={() => handleNavigation('/global/website')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.WebsiteIcon}
            alt="Website"
            className="side-navbar__icon side-navbar__icon--website"
          />
          <span className="side-navbar__label side-navbar__label--website">Website</span>
        </div>
      </div>
      <div className="side-navbar__bottom">
        <div
          className="side-navbar__option side-navbar__option--settings"
          onClick={() => handleNavigation('/global/settings')}
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
