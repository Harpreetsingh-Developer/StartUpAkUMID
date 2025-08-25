import './GlobalAppsInt.scss';
import GlobalLayout from '../../../layouts/GlobalLayout/GlobalLayout';
import AppIntegrationPanel from '../../../components/Global/GlobalAppInt/GlobalAppInt';



function GlobalAppsInt() {
  return (
    <GlobalLayout>
          <div className="App">
      <AppIntegrationPanel />
    </div>
  
    </GlobalLayout>
  );
}

export default GlobalAppsInt;