import React, { useState } from "react";

const BookCardGuestSelection = ({ guests, setGuests }) => {
  const { adults, children, pets } = guests;
  const [showDropdown, setShowDropdown] = useState(false);
  const [childrenAges, setChildrenAges] = useState(Array(children).fill(null));
  const [adultsAges, setAdultsAges] = useState(Array(adults).fill(null));

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleGuestsChange = (type, count) => {
    setGuests((prev) => ({ ...prev, [type]: count }));
    if (type === "children") {
      setChildrenAges(Array(count).fill(null));
    } else if (type === "adults") {
      setAdultsAges(Array(count).fill(null));
    }
  };

  const handleAgeChange = (index, value, type) => {
    const newAges = type === "children" ? [...childrenAges] : [...adultsAges];
    newAges[index] = value;
    type === "children" ? setChildrenAges(newAges) : setAdultsAges(newAges);
  };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-[#222222] text-sm sm:text-lg font-poppins font-[400] mb-4">Guests</p>
      <div className="relative w-full text-xl">
        <button
          onClick={toggleDropdown}
          className="w-full border p-2 text-left bg-white text-sm lg:text-base rounded-sm focus:outline-none"
        >
          {adults + children + pets} Guests
          <span className="float-right p-1 lg:pt-2">
            {showDropdown ? "▲" : "▼"}
          </span>
        </button>

        {showDropdown && (
          <div className="absolute z-20 w-full bg-white border mt-1 p-4 rounded-sm shadow-md">
            {/* Adults Section */}
            <div className="flex items-center justify-between mb-4">
              <span>Adults</span>
              <div className="flex items-center border px-2 space-x-2">
                <button onClick={() => handleGuestsChange("adults", Math.max(1, adults - 1))}>-</button>
                <span>{adults}</span>
                <button onClick={() => handleGuestsChange("adults", adults + 1)}>+</button>
              </div>
            </div>

            {/* Adults Ages Section */}
            {adults > 0 && (
              <div className="mb-4">
                {adultsAges.map((age, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm font-poppins mb-2">Adult {index + 1} Age</label>
                    <input
                      type="number"
                      min="18"
                      value={age || ""}
                      onChange={(e) => handleAgeChange(index, e.target.value, "adults")}
                      className="w-full border p-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Children Section */}
            <div className="flex items-center justify-between mb-4">
              <span>Children</span>
              <div className="flex items-center border px-2 space-x-2">
                <button onClick={() => handleGuestsChange("children", Math.max(0, children - 1))}>-</button>
                <span>{children}</span>
                <button onClick={() => handleGuestsChange("children", children + 1)}>+</button>
              </div>
            </div>

            {/* Children Ages Section */}
            {children > 0 && (
              <div className="mb-4">
                {childrenAges.map((age, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm font-poppins mb-2">Child {index + 1} Age</label>
                    <input
                      type="number"
                      min="0"
                      value={age || ""}
                      onChange={(e) => handleAgeChange(index, e.target.value, "children")}
                      className="w-full border p-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pets Section */}
            <div className="flex items-center justify-between">
              <span>Pets</span>
              <div className="flex items-center border px-2 space-x-2">
                <button onClick={() => handleGuestsChange("pets", Math.max(0, pets - 1))}>-</button>
                <span>{pets}</span>
                <button onClick={() => handleGuestsChange("pets", pets + 1)}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCardGuestSelection;
