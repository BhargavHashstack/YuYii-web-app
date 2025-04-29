// CmsDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../CmsComponents/CmsNavbar";
import Sidebar from "../CmsComponents/CmsSidebar";
import LandingPage from "./CmsLandingPage";

function CmsDashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Log out
    setIsLoggedIn(false);
    // Optionally navigate back to /login
    navigate("/cms/login");
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          <LandingPage />
        </div>
      </div>
    </div>
  );
}

export default CmsDashboard;
