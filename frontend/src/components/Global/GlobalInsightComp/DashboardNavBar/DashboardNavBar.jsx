import React, { useState } from "react";
import "./DashboardNavBar.scss";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "DASHBOARD", route: "/global/home/dashboard" },
  { label: "INSIGHTS", route: "/global/home/insights" },
  { label: "CALENDAR", route: "/global/home/calendar" },
  { label: "UPDATES", route: "/global/home/updates" },
];

const DashboardNavBar = () => {
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate();

  const handleNavClick = (item) => {
    setActiveItem(item.label);
    navigate(item.route);
  };

  return (
    <div className="dashboard-nav-outer">
      <div className="dashboard-nav-container">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`nav-item${activeItem === item.label ? " active" : ""}`}
            onClick={() => handleNavClick(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNavBar;
