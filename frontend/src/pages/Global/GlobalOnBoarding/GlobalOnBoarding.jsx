import './GlobalOnBoarding.scss';
import GlobalLayout from '../../../layouts/GlobalLayout/GlobalLayout';
import OnBoardingMain from '../../../components/Global/GlobalOnboardingComp/OnBoardingMain/OnBoardingMain';


function GlobalUserOnBoarding() {
  return (
    <GlobalLayout>
      <div className="onboarding-content">
        <OnBoardingMain/>
      </div>
    </GlobalLayout>
  );
}

export default GlobalUserOnBoarding; 