import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ Component }) {
  const { isAuthenticatedUser } = useSelector((state) => state.user);

  if (!isAuthenticatedUser) {
    return <Navigate to="/login" />;
  }

  return <Component />;
}
