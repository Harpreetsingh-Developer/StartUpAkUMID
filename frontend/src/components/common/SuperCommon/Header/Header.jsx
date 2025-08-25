import React from "react";
import CompanyLogo from "../CompanyLogo/CompanyLogo";
import CompanyName from "../CompanyName/CompanyName";
import SearchBarMain from "../SearchBarMain/SearchBarMain";
import CustomizeButton from "../CustomizeButton/CustomizeButton";
import IntegrationButton from "../IntegrationButton/IntegrationButton";
import HelpIcon from "../HelpIcon/HelpIcon";
import UserAvatar from "../UserAvatar/UserAvatar";
import LogoutButton from "../../LogoutButton/LogoutButton";
import "./Header.scss";

const Header = ({ companyName = "KPB Supports Solutions" }) => {
  return (
    <header className="header-bar">
      {/* Left: Logo and Name */}
      <div className="header-left">
        <CompanyLogo />
        <CompanyName name={companyName} />
      </div>
      {/* Center: Search Bar */}
      <div className="header-center">
        <SearchBarMain />
      </div>
      {/* Right: Buttons, Help, Avatar, Logout */}
      <div className="header-right">
        <CustomizeButton />
        <IntegrationButton />
        <HelpIcon />
        <UserAvatar />
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
