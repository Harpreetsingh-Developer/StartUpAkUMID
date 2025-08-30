import React from "react";
import "./HelpIcon.scss";

const HelpIcon = ({ onClick, title = "Help & Support" }) => {
  return (
    <button 
      className="admin-help-icon" 
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      <span className="admin-help-icon__question">?</span>
    </button>
  );
};

export default HelpIcon;
