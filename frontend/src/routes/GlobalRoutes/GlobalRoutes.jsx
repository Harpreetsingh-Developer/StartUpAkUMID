// ✅ GlobalRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalUserDashboard from '../../pages/Global/GlobalHome/Dashboard/Dashboard.jsx';
import GlobalIncubations from '../../pages/Global/GlobalIncubations/GlobalIncubations.jsx';
import GlobalAppsInt from '../../pages/Global/GlobalAppsInt/GlobalAppsInt.jsx';
import GlobalUserMessage from '../../pages/Global/GlobalMessage/GlobalMessage.jsx';
import GlobalUserReport from '../../pages/Global/GlobalReport/GlobalReport.jsx';
import GlobalUserWebsite from '../../pages/Global/GlobalWebsite/GlobalWebsite.jsx';
import GlobalUserSettings from '../../pages/Global/GlobalSettings/GlobalSettings.jsx';
import GlobalUserInsights from '../../pages/Global/GlobalHome/Insights/Insights.jsx';
import GlobalUserCalendar from '../../pages/Global/GlobalHome/Calendar/Calendar.jsx';
import GlobalUserUpdates from '../../pages/Global/GlobalHome/Updates/Updates.jsx';
import GlobalUserOnBoarding from '../../pages/Global/GlobalOnBoarding/GlobalOnBoarding.jsx';
import { FormProvider } from '../../context/FormContext.jsx';
import GlobalUserIncubationOverview from '../../pages/Global/GlobalIncuationDetails/Overview/Overview.jsx';

// Import SuperAdminSettings components
import RoleAndAccessSettings from '../../components/Global/GlobalSettingsPanel/SuperAdminSettings/RoleAndAccessControlSettings/RoleAndAccessSettings';
import AdminManagementSettings from '../../components/Global/GlobalSettingsPanel/SuperAdminSettings/AdminManagementSettings/AdminManagementSettings';
import ModuleSettings from '../../components/Global/GlobalSettingsPanel/SuperAdminSettings/ModuleSettings/ModuleSettings';
import SubscriptionPlanSettings from '../../components/Global/GlobalSettingsPanel/SuperAdminSettings/SubscriptionPlanSettings/SubscriptionPlanSettings';
import BrandingSettings from '../../components/Global/GlobalSettingsPanel/SuperAdminSettings/BrandingSettings/BrandingSettings';
import OnboardingStagesSettings from '../../components/Global/GlobalSettingsPanel/SuperAdminSettings/OnboardingStagesSettings/OnboardingStagesSettings';

const GlobalRoutes = () => (
  <Routes>
    <Route path="/home" element={<GlobalUserDashboard />} />
    <Route path="/home/dashboard" element={<GlobalUserDashboard />} />
    <Route path="/home/insights" element={<GlobalUserInsights />} />
    <Route path="/home/calendar" element={<GlobalUserCalendar />} />
    <Route path="/home/updates" element={<GlobalUserUpdates />} />

    <Route path ="/messages" element ={<GlobalUserMessage/>}/>

    <Route path ="/report" element ={<GlobalUserReport/>}/>
    
    <Route path ="/apps" element ={<GlobalAppsInt/>}/>
    
    <Route path ="/website" element ={<GlobalUserWebsite/>}/>
    
    <Route path ="/settings" element ={<GlobalUserSettings/>}/>
    
    {/* SuperAdmin Settings Routes */}
    <Route path="/settings/role-access" element={<GlobalUserSettings />} />
    <Route path="/settings/admin-management" element={<GlobalUserSettings />} />
    <Route path="/settings/module-settings" element={<GlobalUserSettings />} />
    <Route path="/settings/subscription-plan" element={<GlobalUserSettings />} />
    <Route path="/settings/branding" element={<GlobalUserSettings />} />
    <Route path="/settings/onboarding-stages" element={<GlobalUserSettings />} />
    
    {/* Admin Settings Routes */}
    <Route path="/settings/onboarding-stages-admin" element={<GlobalUserSettings />} />
    <Route path="/settings/hierarchy-settings" element={<GlobalUserSettings />} />
    <Route path="/settings/automation" element={<GlobalUserSettings />} />
    <Route path="/settings/evaluate-review" element={<GlobalUserSettings />} />
    <Route path="/settings/add-startups" element={<GlobalUserSettings />} />
    
    {/* Messaging Settings Routes */}
    <Route path="/settings/ai-chatbot" element={<GlobalUserSettings />} />
    <Route path="/settings/chat-logs-archiving" element={<GlobalUserSettings />} />
    
    {/* Notification Settings Routes */}
    <Route path="/settings/system-alerts" element={<GlobalUserSettings />} />
    <Route path="/settings/evaluation-stage-alerts" element={<GlobalUserSettings />} />
    <Route path="/settings/check-list" element={<GlobalUserSettings />} />
    
    {/* User Settings Routes */}
    <Route path="/settings/team-members" element={<GlobalUserSettings />} />
    <Route path="/settings/profile-management" element={<GlobalUserSettings />} />
    <Route path="/settings/document-upload-view" element={<GlobalUserSettings />} />
    <Route path="/settings/startup-graph" element={<GlobalUserSettings />} />
    <Route path="/settings/stage-history" element={<GlobalUserSettings />} />
    
    {/* Customize Settings Routes */}
    <Route path="/settings/field-builder" element={<GlobalUserSettings />} />
    <Route path="/settings/event-workshop" element={<GlobalUserSettings />} />
    
    {/* Miscellaneous Settings Routes */}
    <Route path="/settings/feedback-system" element={<GlobalUserSettings />} />
    <Route path="/settings/security" element={<GlobalUserSettings />} />
    <Route path="/settings/support-ticket" element={<GlobalUserSettings />} />
    
    <Route path="/incubations" element={<GlobalIncubations />} />

    <Route path="/incubations/:id" element={<GlobalUserIncubationOverview/>} />

    <Route path="/incubations/:id/overview" element={<GlobalUserIncubationOverview/>} />

    {/* <Route path="/incubations/:id/startup" element={<Startup />} />

    <Route path="/incubations/:id/labs-facilities" element={<LabsFacilities />} /> */}

    <Route path="/incubations/onboard" element={
      <FormProvider>
      <GlobalUserOnBoarding />
      </FormProvider>
    } />

     
    
  </Routes>
);

export default GlobalRoutes;
