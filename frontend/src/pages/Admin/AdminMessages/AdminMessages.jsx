import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminMessagesComponent from "../../../components/Admin/AdminMessages/AdminMessages";

const AdminMessages = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminMessagesComponent />
    </AdminLayout>
  );
};

export default AdminMessages;
