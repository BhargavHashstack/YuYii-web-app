import React, { useState } from "react";
import StaysCollage from "./StaysCollage";
import StayDescription from "./StayDescription";
import Location from "./Location";

const SelectedStay = () => {
  const [selectedStay, setSelectedStay] = useState("Bangalore Wilderness");

  // Example stays
  const stays = ["Bangalore Wilderness", "Mumbai Retreat", "Marwar Stay"];

  return (
    <div className="p-4 bg-pink-50">
      {/* Stay Selection */}
      <div className="flex space-x-4 mb-6">
        {stays.map((stay) => (
          <button
            key={stay}
            onClick={() => setSelectedStay(stay)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition 
              ${
                selectedStay === stay
                  ? "bg-pink-500 text-white border-black"
                  : "bg-pink-100 text-gray-700 border-black hover:bg-pink-300"
              }`}
          >
            {stay}
          </button>
        ))}
      </div>

      {/* Dynamic Sections */}
      <StaysCollage selectedStay={selectedStay} />
      <StayDescription selectedStay={selectedStay} />
      <Location selectedStay={selectedStay} />
    </div>
  );
};

export default SelectedStay;

