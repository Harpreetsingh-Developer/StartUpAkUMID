
import React from "react";
import Announcement from "../../components/common/AdminCommon/Annoucement/Announcement";
import Header from "../../components/common/AdminCommon/Header/Header";
import SideNavbar from "../../components/common/AdminCommon/SideNavbar/SideNavbar";
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Announcement announcements={["All the future updates and notification will be shown here."]} />
        <Header />
      </div>
      <div className="body-container">
        <div className="side-navbar">
          <SideNavbar />
        </div>
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;