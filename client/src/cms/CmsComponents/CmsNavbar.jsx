// src/components/Navbar.jsx
import React from "react";

function Navbar({ onLogout }) {
  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow">
      <div className="text-xl font-bold text-pink-600">Yuyiii</div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <button
          onClick={onLogout}
          className="text-sm text-pink-500 border border-pink-500 rounded px-2 py-1 hover:bg-pink-500 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
