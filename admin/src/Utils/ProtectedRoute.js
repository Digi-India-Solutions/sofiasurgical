import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem(
    "93e4c022f3abd59b1354b07b61c933fdb1b92a94395e53378190cfaacad485caa656e3853d874f418265e5eaca3ccfe623f68f3b478f7d4be822336a8e0803ab"
  );

  return token ? <Outlet /> : <Navigate to="/super-admin-login" />;
};

export default ProtectedRoute;
