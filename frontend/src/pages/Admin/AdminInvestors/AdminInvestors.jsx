import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminInvestorsComponent from "../../../components/Admin/AdminInvestors/AdminInvestors";

const AdminInvestors = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminInvestorsComponent />
    </AdminLayout>
  );
};

export default AdminInvestors;
