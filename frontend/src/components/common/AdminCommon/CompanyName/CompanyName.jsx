import React from "react";
import "./CompanyName.scss";

const CompanyName = ({ name = "StartUp Ak Umid" }) => {
  return (
    <div className="admin-company-name">
      <span className="admin-company-name__startup">STARTUP</span>
      <span className="admin-company-name__akumid">Ak Umid</span>
    </div>
  );
};

export default CompanyName;
