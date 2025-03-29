import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { token, setToken } = useAuth();

  if (token) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("authToken");
        setToken(null);
        return <Navigate to="/login" />;
      }
      return <Outlet />;
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("authToken");
      setToken(null);
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
