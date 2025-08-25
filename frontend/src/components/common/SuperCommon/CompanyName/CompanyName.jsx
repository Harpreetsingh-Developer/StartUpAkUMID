import React from "react";
import "./CompanyName.scss";

const CompanyName = ({ name = "" }) => (
  <span className="header-company-name">{name}</span>
);

export default CompanyName; 