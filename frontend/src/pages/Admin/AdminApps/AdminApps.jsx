import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminAppsComponent from "../../../components/Admin/AdminApps/AdminApps";

const AdminApps = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminAppsComponent />
    </AdminLayout>
  );
};

export default AdminApps;
