import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-links">
        <li>
          <NavLink to="/super/startups" end className={({ isActive }) => isActive ? "active" : ""}>
            Startups
          </NavLink>
        </li>
        <li>
          <NavLink to="/super/startups/score-card" className={({ isActive }) => isActive ? "active" : ""}>Score Card</NavLink>
        </li>
        <li>
          <NavLink to="/super/startups/reviews" className={({ isActive }) => isActive ? "active" : ""}>Reviews</NavLink>
        </li>
        <li>
          <NavLink to="/super/startups/analytics" className={({ isActive }) => isActive ? "active" : ""}>Analytics</NavLink>
        </li>
        <li>
          <NavLink to="/super/startups/automations" className={({ isActive }) => isActive ? "active" : ""}>Automations</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
