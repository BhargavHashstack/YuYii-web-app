import React, { useState } from "react";

export default function ExtraBedCharges() {
  // Example state for the fields
  const [adultsCharge, setAdultsCharge] = useState("3540");
  const [teenCharge, setTeenCharge] = useState("0");

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saving extra bed charges:", {
      adults: adultsCharge,
      teenager: teenCharge,
    });
  };

  return (
    <div className="p-4 bg-white space-y-4 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-lg font-bold">Extra bed charges age wise</h2>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Adults */}
        <div>
          <label className="block font-semibold mb-1">Adults</label>
          <input
            type="text"
            value={adultsCharge}
            onChange={(e) => setAdultsCharge(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* Teenager */}
        <div>
          <label className="block font-semibold mb-1">Teenager</label>
          <input
            type="text"
            value={teenCharge}
            onChange={(e) => setTeenCharge(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Save button aligned bottom-right */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
