import React, { useState } from "react";

export default function CustomisableWeekend() {
  // Track whether "Weekday" or "Weekend" is selected in the dropdown
  const [mode, setMode] = useState("Weekday");

  // Days array with a column property for layout
  const DAYS = [
    { name: "Monday", col: 1 },
    { name: "Tuesday", col: 2 },
    { name: "Wednesday", col: 3 },
    { name: "Thursday", col: 1 },
    { name: "Friday", col: 2 },
    { name: "Saturday", col: 3 },
    { name: "Sunday", col: 1 },
  ];

  // Keep track of which days are selected
  const [selectedDays, setSelectedDays] = useState([]);

  // Toggle day selection
  const handleDayChange = (dayName) => {
    setSelectedDays((prev) =>
      prev.includes(dayName)
        ? prev.filter((d) => d !== dayName)
        : [...prev, dayName]
    );
  };

  return (
    <div className="p-4 bg-white space-y-4 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-xl font-bold">Customisable Weekend</h2>

      {/* Dropdown */}
      <div className="flex items-center space-x-4">
        <label className="font-semibold">Select Weekdays or Weekends*</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <option value="Weekday">Weekday</option>
          <option value="Weekend">Weekend</option>
        </select>
      </div>

      {/* Days grid (3 columns) */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Column 1 */}
        <div className="space-y-2">
          {DAYS.filter((day) => day.col === 1).map((day) => (
            <label
              key={day.name}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-500"
                checked={selectedDays.includes(day.name)}
                onChange={() => handleDayChange(day.name)}
              />
              <span>{day.name}</span>
            </label>
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          {DAYS.filter((day) => day.col === 2).map((day) => (
            <label
              key={day.name}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-500"
                checked={selectedDays.includes(day.name)}
                onChange={() => handleDayChange(day.name)}
              />
              <span>{day.name}</span>
            </label>
          ))}
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          {DAYS.filter((day) => day.col === 3).map((day) => (
            <label
              key={day.name}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-500"
                checked={selectedDays.includes(day.name)}
                onChange={() => handleDayChange(day.name)}
              />
              <span>{day.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
