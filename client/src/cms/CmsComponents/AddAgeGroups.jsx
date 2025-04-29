import React, { useState } from "react";

export default function AddAgeGroups() {
  // Example state
  const [adult, setAdult] = useState("6");
  const [teenage, setTeenage] = useState("0");
  const [child, setChild] = useState("-");
  const [infant, setInfant] = useState("-");

  return (
    <div className="p-4 bg-white space-y-4 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-xl font-bold">Add age Groups</h2>

      {/* Row of 4 inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Adult >= */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Adult &gt;=</label>
          <input
            type="text"
            value={adult}
            onChange={(e) => setAdult(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* Teenage >= */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Teenage &gt;=</label>
          <input
            type="text"
            value={teenage}
            onChange={(e) => setTeenage(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* Child >= */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Child &gt;=</label>
          <input
            type="text"
            value={child}
            onChange={(e) => setChild(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* Infant <= */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Infant &lt;=</label>
          <input
            type="text"
            value={infant}
            onChange={(e) => setInfant(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
      </div>
    </div>
  );
}
