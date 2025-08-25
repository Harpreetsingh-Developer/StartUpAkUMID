import React from "react";
import "./IncubationDetailsNavBar.scss";
import { NavLink, useParams } from "react-router-dom";

const IncubationDetailsNavBar = () => {
  const { id } = useParams();

  if (!id) return null; // Prevent rendering if id isn't available

  const navItems = [
    { label: "OVERVIEW", route: `/global/incubations/${id}/overview` },
    { label: "STARTUPS", route: `/global/incubations/${id}/startup` },
    { label: "LABS & FACILITIES", route: `/global/incubations/${id}/labs-facilities` },
  ];

  return (
    <div className="overview-nav-outer">
      <div className="overview-nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.route}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default IncubationDetailsNavBar;
