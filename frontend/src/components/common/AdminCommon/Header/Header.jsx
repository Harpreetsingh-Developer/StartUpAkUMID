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

const Header = ({ 
  companyName = "StartUp Ak Umid",
  onSearch,
  onCustomize,
  onIntegration,
  onHelp,
  onUserClick,
  user 
}) => {
  return (
    <header className="admin-header-bar">
      {/* Left: Logo and Name */}
      <div className="admin-header-left">
        <CompanyLogo />
        <CompanyName name={companyName} />
      </div>
      
      {/* Center: Search Bar */}
      <div className="admin-header-center">
        <SearchBarMain onSearch={onSearch} />
      </div>
      
      {/* Right: Buttons, Help, Avatar, Logout */}
      <div className="admin-header-right">
        <CustomizeButton onClick={onCustomize} />
        <IntegrationButton onClick={onIntegration} />
        <HelpIcon onClick={onHelp} />
        <UserAvatar user={user} onClick={onUserClick} />
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
