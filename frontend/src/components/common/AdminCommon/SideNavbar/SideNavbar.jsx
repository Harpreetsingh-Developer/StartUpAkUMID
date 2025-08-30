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
          onClick={() => handleNavigation('/admin/home')}
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
          className="side-navbar__option side-navbar__option--startups"
          onClick={() => handleNavigation('/admin/startups')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.IncubationIcon}
            alt="Incubation"
            className="side-navbar__icon side-navbar__icon--startups"
          />
          <span className="side-navbar__label side-navbar__label--incubation">Startups</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--investors"
          onClick={() => handleNavigation('/admin/investors')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.Investor}
            alt="Investors"
            className="side-navbar__icon side-navbar__icon--investors"
          />
          <span className="side-navbar__label side-navbar__label--investors">Investors</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--mentors"
          onClick={() => handleNavigation('/admin/mentors')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.Mentor}
            alt="Mentors"
            className="side-navbar__icon side-navbar__icon--mentors"
          />
          <span className="side-navbar__label side-navbar__label--mentors">Mentors</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--reports"
          onClick={() => handleNavigation('/admin/reports')}
          tabIndex={0}
          role="button"
        >
          <img
            src={icons.ReportIcon}
            alt="Reports"
            className="side-navbar__icon side-navbar__icon--reports"
          />
          <span className="side-navbar__label side-navbar__label--reports">Reports</span>
        </div>
        <div
          className="side-navbar__option side-navbar__option--apps"
                onClick={() => handleNavigation('/admin/apps')}
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
          onClick={() => handleNavigation('/admin/settings')}
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
