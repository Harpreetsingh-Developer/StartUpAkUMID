import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminReportsComponent from "../../../components/Admin/AdminReports/AdminReports";

const AdminReports = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminReportsComponent />
    </AdminLayout>
  );
};

export default AdminReports;
