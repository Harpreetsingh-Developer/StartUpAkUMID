import React from "react";
import "./OverviewManagerDetails.scss";
import icons from "../../../../constants/icons";

const OverviewManagerDetails = ({ manager }) => {
  return (
    <div className="manager-details-container">
      <div className="manager-image-section">
        <h3>MANAGER</h3>
        <img src={manager.image} alt="Manager" />
      </div>

      <div className="manager-info-section">
        <h2>{manager.name}</h2>
        <h4>{manager.title}</h4>

        <div className="manager-info-item">
          <img src={icons.Location} alt="Location Icon" />
          <span>{manager.location}</span>
        </div>
        <div className="manager-info-item">
          <img src={icons.Mail} alt="Email Icon" />
          <span>{manager.email}</span>
        </div>
        <div className="manager-info-item">
          <img src={icons.Telephone} alt="Phone Icon" />
          <span>{manager.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewManagerDetails;
