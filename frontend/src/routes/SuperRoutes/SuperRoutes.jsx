// ✅ SuperRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperUserHome from '../../pages/Super/SuperHome/SuperHome';
import SuperUserStartup from '../../pages/Super/SuperStartup/Startup/SuperStartup';
import SuperUserInvestor from '../../pages/Super/SuperInvestor/SuperInvestor';
import SuperUserMentor from '../../pages/Super/SuperMentor/SuperMentor';
import SuperUserTeamInfra from '../../pages/Super/SuperTeamInfra/SuperTeamInfra';
import SuperUserApp from '../../pages/Super/SuperApp/SuperApp';
import SuperUserSettings from '../../pages/Super/SuperSettings/SuperSettings';
import SuperUserMessage from '../../pages/Super/SuperMessage/SuperMessage';
import SuperUserScoreCard from '../../pages/Super/SuperStartup/ScoreCard/ScoreCard';
import SuperUserReviews from '../../pages/Super/SuperStartup/Reviews/Reviews';
import SuperUserAnalytics from '../../pages/Super/SuperStartup/Analytics/Analytics';
import SuperUserAutomations from '../../pages/Super/SuperStartup/Automations/Automations';
import ProfileManagementSettings from '../../components/Global/GlobalSettingsPanel/UserSettings/ProfileManagementSettings/ProfileManagementSettings';


const SuperRoutes = () => (
  <Routes>
    <Route path="/home" element={<SuperUserHome/>} />
    <Route path="/startups" element={<SuperUserStartup/>} />
    <Route path="/investor" element={<SuperUserInvestor/>} />
    <Route path="/mentor" element={<SuperUserMentor/>} />
    <Route path="/team&infra" element={<SuperUserTeamInfra/>} />
    <Route path ="/message" element={<SuperUserMessage/>}/>
    <Route path="/apps" element={<SuperUserApp/>} />
    <Route path="/settings" element={<SuperUserSettings/>} />
    <Route path="/startups/score-card" element={<SuperUserScoreCard/>} />
    <Route path="/startups/reviews" element={<SuperUserReviews/>} />
    <Route path="/startups/analytics" element={<SuperUserAnalytics/>} />
    <Route path="/startups/automations" element={<SuperUserAutomations/>} />
    <Route path="/startups/profile-management" element={<ProfileManagementSettings/>} />

  </Routes>
);

export default SuperRoutes;
