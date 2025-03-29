import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/home";
import { useAuth } from "../context/AuthContext";

const Router = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/home" /> : <Register />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/home" /> : <Login />}
      />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
