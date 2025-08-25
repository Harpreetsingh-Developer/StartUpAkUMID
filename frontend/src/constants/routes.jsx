import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import AdminUserLogin from "../pages/Admin/AdminLogin/AdminLogin";
import GlobalUserLogin from "../pages/Global/GlobalLogin/GlobalLogin";
import SuperUserLogin from "../pages/Super/SuperLogin/SuperLogin";
import GlobalRoutes from '../routes/GlobalRoutes/GlobalRoutes.jsx';
import RoleBasedHome from "../pages/RoleSelection/RoleBasedHome.jsx";
import SuperRoutes from "../routes/SuperRoutes/SuperRoutes.jsx";
import AdminRoutes from "../routes/AdminRoutes/AdminRoutes.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute.jsx";
import { LogoProvider } from "../components/Global/GlobalSettingsPanel/SuperAdminSettings/BrandingSettings/LogoContext";

const RoutesComponent = () => (
  <LogoProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login/global" element={<GlobalUserLogin />} />
        <Route path="/login/super" element={<SuperUserLogin />} />
        <Route path="/login/admin" element={<AdminUserLogin />} />
        <Route path="/home" element={<RoleBasedHome />} />
        <Route path="/global/*" element={
          <ProtectedRoute requiredRole="global">
            <GlobalRoutes />
          </ProtectedRoute>
        } />
        <Route path="/super/*" element={
          <ProtectedRoute requiredRole="super">
            <SuperRoutes />
          </ProtectedRoute>
        } />
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </LogoProvider>
);

export default RoutesComponent;
