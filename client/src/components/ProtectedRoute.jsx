import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You must be logged in to view this page.</p>
          <Navigate to="/login" />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
