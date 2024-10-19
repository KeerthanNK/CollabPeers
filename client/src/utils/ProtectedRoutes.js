import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
