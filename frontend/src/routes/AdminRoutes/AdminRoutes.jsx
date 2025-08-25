// ✅ AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import GlobalUserDashboard from '../../pages/Global/GlobalHome/Dashboard/Dashboard.jsx';

const AdminRoutes = () => (
  <Routes>
    <Route path="/home" element={<AdminDashboard />} />

  </Routes>
);

export default AdminRoutes;
