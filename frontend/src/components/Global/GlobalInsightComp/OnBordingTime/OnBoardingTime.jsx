import React from "react";
import "./OnBoardingTime.scss";

const OnBoardingTime = ({ companyName = "Acme Corp", onboardingTime = 12 }) => {
  // onboardingTime is in days, you can adjust as needed

  return (
    <div className="onboarding-time-container">
      <div className="onboarding-header">
        <h3>ONBOARDING TIME</h3>
      </div>
      <div className="onboarding-content">
        
        <div className="onboarding-metric">
          <span className="onboarding-days">{onboardingTime}</span>
          <span className="onboarding-unit">days</span>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingTime;
