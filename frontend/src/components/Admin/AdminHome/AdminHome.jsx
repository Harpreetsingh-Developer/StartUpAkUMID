import React, { useState } from "react";
import icons from "../../../constants/icons";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminUpdates from "./AdminUpdates/AdminUpdates";
import AdminAboutUs from "./AdminAboutUs/AdminAboutUs";
import AdminCalender from "./AdminCalender/AdminCalender";
import AdminProfile from "./AdminProfile/AdminProfile";
import "./AdminHome.scss";

const AdminHome = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const sections = [
    { key: "dashboard", label: "Dashboard"},
    { key: "updates", label: "Updates"},
    { key: "aboutus", label: "About Us"},
    { key: "calendar", label: "Calendar"},
    { key: "profile", label: "Profile"}
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "updates":
        return <AdminUpdates />;
      case "aboutus":
        return <AdminAboutUs />;
      case "calendar":
        return <AdminCalender />;
      case "profile":
        return <AdminProfile />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-home">
      {/* Top Navigation Bar */}
      <div className="admin-home__top-nav">
        {sections.map((section) => (
          <div
            key={section.key}
            className={`admin-home__nav-item ${
              activeSection === section.key ? "admin-home__nav-item--active" : ""
            }`}
            onClick={() => setActiveSection(section.key)}
          >
            <span className="admin-home__nav-label">{section.label}</span>
          </div>
        ))}
      </div>
      {/* Section Content */}
      <div className="admin-home__content">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default AdminHome;
