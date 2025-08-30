// ✅ AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from '../../pages/Admin/AdminHome/AdminHome';
import AdminStartups from '../../pages/Admin/AdminStartups/AdminStartups';
import AdminInvestors from '../../pages/Admin/AdminInvestors/AdminInvestors';
import AdminMentors from '../../pages/Admin/AdminMentors/AdminMentors';
import AdminMessages from '../../pages/Admin/AdminMessages/AdminMessages';
import AdminReports from '../../pages/Admin/AdminReports/AdminReports';
import AdminApps from '../../pages/Admin/AdminApps/AdminApps';
import AdminWebsite from '../../pages/Admin/AdminWebsite/AdminWebsite';
import AdminSettings from '../../pages/Admin/AdminSettings/AdminSettings';

const AdminRoutes = () => (
  <Routes>
    <Route path="/home" element={<AdminHome />} />
    <Route path="/startups" element={<AdminStartups />} />
    <Route path="/investors" element={<AdminInvestors />} />
    <Route path="/mentors" element={<AdminMentors />} />
    <Route path="/messages" element={<AdminMessages />} />
    <Route path="/reports" element={<AdminReports />} />
    <Route path="/apps" element={<AdminApps />} />
    <Route path="/website" element={<AdminWebsite />} />
    <Route path="/settings" element={<AdminSettings />} />
  </Routes>
);

export default AdminRoutes;
