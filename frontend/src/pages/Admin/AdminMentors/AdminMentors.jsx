import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminMentorsComponent from "../../../components/Admin/AdminMentors/AdminMentors";

const AdminMentors = () => {
  const adminUser = { name: "Admin User", initials: "AU" };

  return (
    <AdminLayout user={adminUser}>
      <AdminMentorsComponent />
    </AdminLayout>
  );
};

export default AdminMentors;
