import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [userName, setUsetName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decodeToken = jwtDecode(token);
      setUsetName(decodeToken.name);
    }
  }, []);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Bienvenido :{userName}</h1>
      <button onClick={handleLogout}>Deslogear</button>
    </div>
  );
};

export default Home;
