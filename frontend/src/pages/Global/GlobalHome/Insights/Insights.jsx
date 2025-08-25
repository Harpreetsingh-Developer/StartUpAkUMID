import './Insights.scss';
import GlobalLayout from '../../../../layouts/GlobalLayout/GlobalLayout';
import DashboardNavBar from '../../../../components/Global/GlobalInsightComp/DashboardNavBar/DashboardNavBar';
import DashboardSalesHealth from '../../../../components/Global/GlobalInsightComp/DashboardSalesHealth/DashboardSalesHealth';
import PvSalesHealth from '../../../../components/Global/GlobalInsightComp/PvSalesHealth/PvSalesHealth';
import PaymentOverdue from '../../../../components/Global/GlobalInsightComp/PaymentOverdue/PaymentOverdue';
import DocOverdue from '../../../../components/Global/GlobalInsightComp/DocOverdue/DocOverdue';
import SalesInCurM from '../../../../components/Global/GlobalInsightComp/SalesInCurM/SalesInCurM';
import PaymentOfInovation from '../../../../components/Global/GlobalInsightComp/PaymentOfInovation/PaymentOfInovation';
import OnBoardingTime from '../../../../components/Global/GlobalInsightComp/OnBordingTime/OnBoardingTime';
import SalesInPv from '../../../../components/Global/GlobalInsightComp/SalesInPv/SalesInPv';
import Sources from '../../../../components/Global/GlobalInsightComp/Sources/Sources';



function GlobalUserInsights() {
  return (
    <GlobalLayout>
      <div className="insights-content-col">
          <DashboardNavBar />
          <div className="sales-row">
            <DashboardSalesHealth />
            <PvSalesHealth />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <PaymentOverdue />
            <DocOverdue />
            <SalesInCurM />
            <SalesInPv />
            <OnBoardingTime />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>

            <PaymentOfInovation/>
            <Sources />
          </div>

        </div>
    </GlobalLayout>
  );
}

export default GlobalUserInsights;