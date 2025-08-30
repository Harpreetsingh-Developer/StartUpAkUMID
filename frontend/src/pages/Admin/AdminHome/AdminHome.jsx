import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminHomeComponent from "../../../components/Admin/AdminHome/AdminHome";

const AdminHome = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminHomeComponent />
    </AdminLayout>
  );
};

export default AdminHome;
