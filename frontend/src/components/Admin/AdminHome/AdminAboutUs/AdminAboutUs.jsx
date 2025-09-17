import React from "react";
import icons from "../../../../constants/icons";
import "./AdminAboutUs.scss";

const AdminAboutUs = () => {
  return (
    <div className="admin-about-us">
      <div className="admin-about-us__container">
       <div className="admin-about-Who-and-image1">
        <div className="flexing-text-and-image">
        <p className="who-are-we">Who we are?</p>
        <p className="admin-about-us__section-text">We are a team of developers who are passionate about creating software solutions that are both functional and user-friendly.</p>
        </div>
        <img src={icons.AboutMe2} alt="About Us" />
       </div>
      </div>
    </div>
  );
};

export default AdminAboutUs;