// src/pages/LandingPage.jsx
import React, { useState } from "react";

function LandingPage() {
  const [banner, setBanner] = useState("Hand-Picked Stays");
  const [destination, setDestination] = useState("Sultan Bathery");

  // Example "Unspoil Destinations" data
  const destinations = [
    { name: "Kishangarh", state: "Rajasthan" },
    { name: "Panchgani", state: "Maharashtra" },
    { name: "Sariska", state: "Rajasthan" },
    { name: "Karjat", state: "Maharashtra" },
    { name: "NathuLaank", state: "Uttarakhand" },
    { name: "Sultan Bathery", state: "Kerala" },
    { name: "Lakkidi", state: "Kerala" },
    { name: "Sitlakhet", state: "Uttarakhand" },
    // Add more as needed
  ];

  const handleBannerChange = () => {
    // Logic to change banner image
    alert("Change Banner Image (Not implemented)");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Landing Page</h2>
      <div className="bg-white shadow p-4 rounded mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Banner Image</h3>
            <p className="text-sm text-gray-500">Image size should be at least 1300x700 pixels</p>
            <div className="mt-2">
              <span className="text-gray-700">Currently linked from:</span>{" "}
              <span className="font-semibold">{destination}</span>
            </div>
          </div>
          <button
            onClick={handleBannerChange}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Change Image
          </button>
        </div>
        <div className="relative h-40 bg-gray-200 flex items-center justify-center text-xl font-bold">
          {banner}
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Unspoil Destinations</h3>
          <button className="bg-gray-100 border border-gray-300 px-4 py-2 rounded hover:bg-gray-200">
            Select another destination
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 p-2 rounded shadow-sm hover:shadow transition"
            >
              <div className="text-gray-800 font-semibold">{dest.name}</div>
              <div className="text-sm text-gray-600">{dest.state}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
