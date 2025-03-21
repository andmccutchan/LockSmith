import React from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("token"); //Check for token
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
