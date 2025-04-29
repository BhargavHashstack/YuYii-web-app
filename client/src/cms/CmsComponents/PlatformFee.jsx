import React, { useState } from "react";

export default function PlatformFee() {
  // Example state for each field
  const [contentFee, setContentFee] = useState("1000");
  const [igst, setIgst] = useState("18");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");

  return (
    <div className="p-4 bg-white max-w-6xl mx-auto space-y-4">
      {/* Heading */}
      <h2 className="text-xl font-bold">Platform fee</h2>

      {/* Grid of inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Content & Convenience Fees */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">
            Content and Convenience Fees
          </label>
          <input
            type="text"
            value={contentFee}
            onChange={(e) => setContentFee(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* IGST% */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">IGST%</label>
          <input
            type="text"
            value={igst}
            onChange={(e) => setIgst(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* CGST% */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">CGST%</label>
          <input
            type="text"
            value={cgst}
            onChange={(e) => setCgst(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* SGST% */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">SGST%</label>
          <input
            type="text"
            value={sgst}
            onChange={(e) => setSgst(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
      </div>
    </div>
  );
}
