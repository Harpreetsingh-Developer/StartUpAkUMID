import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminSettingsComponent from "../../../components/Admin/AdminSettings/AdminSettings";

const AdminSettings = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminSettingsComponent />
    </AdminLayout>
  );
};

export default AdminSettings;
