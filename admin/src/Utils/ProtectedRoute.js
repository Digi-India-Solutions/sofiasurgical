import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
     
      const token = localStorage.getItem("superAdminToken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.post(
          "https://api.sofiasurgicals.com/api/verify-super-admin",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      } catch (err) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


 if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/super-admin-login" />;
};

export default ProtectedRoute;
