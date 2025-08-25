// RoleBasedHome.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleBasedHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "global") navigate("/global/home");
    else if (role === "super") navigate("/super/home");
    else if (role === "admin") navigate("/admin/home");
    else navigate("/"); // fallback to role selection
  }, [navigate]);

  return null; // or <Loading /> spinner
};

export default RoleBasedHome;
