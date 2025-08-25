import React from "react";
import { useLogo } from "../../../../components/Global/GlobalSettingsPanel/SuperAdminSettings/BrandingSettings/LogoContext";
import "./CompanyLogo.scss";

const CompanyLogo = () => {
  const { logoUrl } = useLogo();
  
  return (
    <img src={logoUrl} alt="Company Logo" className="header-company-logo" />
  );
};

export default CompanyLogo; 