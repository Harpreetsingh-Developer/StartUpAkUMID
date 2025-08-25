import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import navigate
import './OnBoardingMain.scss';
 import { useFormContext } from "../../../../context/FormContext.jsx";; 
 import axios_client from '../../../../utils/axiosconfigure.jsx';

import OnBoardingStepper from '../OnBoardingStepper/OnBoardingStepper';
import GeneralDetails from '../OnBoardingSteps/GeneralDetails/GeneralDetails';
import OnboardingHeader from '../OnBoardingHeader/OnBoardingHeader';
import PhysicalSpaceRequirement from '../OnBoardingSteps/PhysicalSpaceRequirement/PhysicalSpaceRequirement';
import ITDigitalInfra from '../OnBoardingSteps/IT&DigitalInfra/IT&DigitalInfra';
import OperationalServices from '../OnBoardingSteps/OperationalServices/OperationalServices';
import SpecializedLabs from '../OnBoardingSteps/SpecializedLabs/SpecializedLabs';
import AdditionalFacilities from '../OnBoardingSteps/AdditionalFacilities/AdditionalFacilites';
import Payment from '../OnBoardingSteps/Payment/Paymenet';
import DigitalToolsSoftware from '../OnBoardingSteps/DigitalTools&Software/DigitalTools&Software';


const OnBoardingMain = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
    const { formData, updateStepData } = useFormContext();

  const steps = [
    GeneralDetails,
    PhysicalSpaceRequirement,
    ITDigitalInfra,
    OperationalServices,
    DigitalToolsSoftware,
    SpecializedLabs,
    AdditionalFacilities,
    Payment,
  ];

  const StepComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async() => {
    try {
      const response = await axios_client.post('/api/college', formData);
      console.log("Response:", response.data);
      
      if (response.data.success) {
        setShowPopup(true);
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('Error submitting form: ' + (error.response?.data?.message || error.message));
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/global/incubations'); // redirect to incubations page
  };

  return (
    <div className="onboarding-main">
      <OnboardingHeader />
      <OnBoardingStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />

      <div className="step-container">
        <StepComponent />
      </div>

      {currentStep === steps.length - 1 ? (
        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="step-navigation">
          <button onClick={handleBack} disabled={currentStep === 0}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Incubation Onboard Successful</h2>
            <button onClick={handlePopupClose}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnBoardingMain;