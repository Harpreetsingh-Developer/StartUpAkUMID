import React from 'react';
import './OnBoardingStepper.scss';



const steps = [
  'General Details',
  'Physical Space Requirements',
  'IT & Digital Infrastructure',
  'Operational Services',
  'Digital Tools & Software',
  'Specialized Labs',
  'Additional Facilities',
  'Payment',
];

const OnBoardingStepper = ({ currentStep, setCurrentStep }) => {
  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="onboarding-stepper">
      <div className="stepper-track">
        {steps.map((step, index) => (
          <div
            key={index}
            className="step-wrapper"
            onClick={() => handleStepClick(index)}
          >
            <div
              className={`step-circle ${currentStep === index ? 'active' : ''}`}
            />
            <div className={`step-label ${index % 2 === 0 ? 'bottom' : 'top'}`}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnBoardingStepper;
