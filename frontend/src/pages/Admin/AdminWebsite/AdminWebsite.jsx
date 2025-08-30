import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminWebsiteComponent from "../../../components/Admin/AdminWebsite/AdminWebsite";

const AdminWebsite = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminWebsiteComponent />
    </AdminLayout>
  );
};

export default AdminWebsite;
