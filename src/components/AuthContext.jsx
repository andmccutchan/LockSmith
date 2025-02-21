import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime) {
      if (Date.now() > parseInt(expirationTime, 10)) {
        logout();
      } else {
        setIsLoggedIn(true);
        const timeout = setTimeout(
          logout,
          parseInt(expirationTime, 10) - Date.now()
        );
        return () => clearTimeout(timeout);
      }
    }
  }, []);

  const login = (token, expiresIn) => {
    const expirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);
    setIsLoggedIn(true);

    setTimeout(logout, expiresIn * 1000);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
