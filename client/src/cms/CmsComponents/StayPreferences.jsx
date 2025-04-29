import React, { useState } from "react";

export default function StayPreferences() {
  // Default preferences
  const [preferences, setPreferences] = useState([
    {
      label: "Pet",
      checked: true,
      text: "Pet friendly: You can bring along your furry friends.",
    },
    {
      label: "Pure Veg",
      checked: false,
      text: "",
    },
    {
      label: "Special Occasion",
      checked: true,
      text: "For Birthdays and Anniversaries: Celebrate Birthdays, Anniversaries, etc.",
    },
    {
      label: "Alcohol",
      checked: true,
      text: "They do not serve alcohol but you can bring your own, also they do not charge you.",
    },
    {
      label: "Infant",
      checked: true,
      text: "For Young Mothers and their little Angels: It's on a flat ground and at a pleasant altitude.",
    },
    {
      label: "Senior Citizen",
      checked: false,
      text: "You will enjoy being in the midst of nature. View of the Aravallis all around.",
    },
  ]);

  // Add more preferences
  const handleAddPreference = () => {
    setPreferences((prev) => [
      ...prev,
      { label: "", checked: false, text: "" },
    ]);
  };

  // Toggle checkbox or update text
  const handleCheckboxChange = (index) => {
    setPreferences((prev) =>
      prev.map((pref, i) =>
        i === index ? { ...pref, checked: !pref.checked } : pref
      )
    );
  };

  const handleTextChange = (index, newText) => {
    setPreferences((prev) =>
      prev.map((pref, i) =>
        i === index ? { ...pref, text: newText } : pref
      )
    );
  };

  const handleLabelChange = (index, newLabel) => {
    setPreferences((prev) =>
      prev.map((pref, i) =>
        i === index ? { ...pref, label: newLabel } : pref
      )
    );
  };

  return (
    <div className="p-4 bg-white space-y-4 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-xl font-bold">Stay Preferences</h2>

      {/* Preferences list */}
      <div className="space-y-4">
        {preferences.map((pref, index) => (
          <div key={index} className="flex items-start space-x-2">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-pink-500"
              checked={pref.checked}
              onChange={() => handleCheckboxChange(index)}
            />

            <div className="flex-1">
              {/* Label (always visible) */}
              <input
                type="text"
                value={pref.label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                placeholder="Preference Label"
                className="font-semibold focus:outline-none focus:ring-1 focus:ring-pink-500 border border-gray-300 rounded px-2 py-1 mb-1"
              />

              {/* Text area only appears if checkbox is checked */}
              {pref.checked && (
                <textarea
                  rows={2}
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  value={pref.text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add other preferences */}
      <div className="flex items-center space-x-4 mt-4">
        <span className="font-semibold">Add Other Preferences</span>
        <button
          type="button"
          onClick={handleAddPreference}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Add More
        </button>
      </div>
    </div>
  );
}
