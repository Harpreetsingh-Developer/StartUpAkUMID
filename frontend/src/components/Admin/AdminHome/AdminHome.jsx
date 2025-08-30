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
    { key: "profile", label: "Profile"},
    { key: "calendar", label: "Calendar"},
    { key: "updates", label: "Updates"},
    { key: "aboutus", label: "About Us"}
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "profile":
        return <AdminProfile />;
      case "calendar":
        return <AdminCalender />;
      case "updates":
        return <AdminUpdates />;
      case "aboutus":
        return <AdminAboutUs />;
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
