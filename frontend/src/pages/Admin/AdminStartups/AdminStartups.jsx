import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminStartupsComponent from "../../../components/Admin/AdminStartups/AdminStartups";

const AdminStartups = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminStartupsComponent />
    </AdminLayout>
  );
};

export default AdminStartups;
