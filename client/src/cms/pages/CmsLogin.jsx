// CmsLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CmsLogin({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // This hook lets us navigate programmatically
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      navigate("/cms/dashboard"); // redirect to the dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-pink-500 text-3xl font-bold mb-6 text-center">
          Yuyiii
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default CmsLogin;
