import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaSun, FaSnowflake, FaCloudRain, FaWind, FaEdit, FaTrash } from "react-icons/fa";

// Helper to title-case weather values
const capitalize = (s = "") =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// Converts weatherObj → array of seasons
const convertWeatherObjectToArray = (weatherObj) =>
  Object.entries(weatherObj || {}).map(([period, info], index) => {
    const parts = period.split("-").map((p) => p.trim());
    return {
      id: index,
      startMonth: parts[0] || "",
      endMonth: parts.length > 1 ? parts[parts.length - 1] : "",
      note: info.note || "",
      // Title-case whatever was in the DB
      weatherType: capitalize(info.weather),
    };
  });

// Back into the original shape
const convertArrayToWeatherObject = (arr) =>
  arr.reduce((obj, { startMonth, endMonth, note, weatherType }) => {
    const key = `${startMonth}-${endMonth}`;
    // store lowercase again
    obj[key] = { note, weather: weatherType.toLowerCase() };
    return obj;
  }, {});

function Season({ weather, onChange }) {
  const [seasons, setSeasons] = useState(() => convertWeatherObjectToArray(weather));
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    startMonth: "",
    endMonth: "",
    weatherType: "",
    note: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const icons = {
    Sunny: <FaSun className="text-yellow-400" />,
    Snowy: <FaSnowflake className="text-blue-400" />,
    Rainy: <FaCloudRain className="text-blue-500" />,
    Cloudy: <FaCloud className="text-gray-400" />,
    Windy: <FaWind className="text-gray-500" />,
  };

  const handleAdd = () => {
    setFormData({ id: null, startMonth: "", endMonth: "", weatherType: "", note: "" });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const s = seasons.find((s) => s.id === id);
    if (!s) return;
    setFormData(s);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updated = seasons.filter((s) => s.id !== id);
    setSeasons(updated);
    onChange && onChange(convertArrayToWeatherObject(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    let updated;
    if (isEditMode) {
      updated = seasons.map((s) => (s.id === formData.id ? formData : s));
    } else {
      updated = [...seasons, { ...formData, id: Date.now() }];
    }
    setSeasons(updated);
    setShowModal(false);
    onChange && onChange(convertArrayToWeatherObject(updated));
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Season</h2>
        <button onClick={handleAdd} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded">
          Add new
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {seasons.map((s) => (
          <div key={s.id} className="bg-white shadow rounded p-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              {icons[s.weatherType] || icons.Cloudy}
              <h3 className="font-semibold text-gray-700">
                {s.startMonth} - {s.endMonth}
              </h3>
            </div>
            <p className="text-sm text-gray-500">{s.note}</p>
            <div className="flex justify-end space-x-3 pt-2 text-gray-400">
              <button onClick={() => handleEdit(s.id)} className="hover:text-blue-500" title="Edit Season">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(s.id)} className="hover:text-red-500" title="Delete Season">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white w-full max-w-md mx-auto rounded p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Season</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Period</label>
                <div className="grid grid-cols-2 gap-2">
                  {["startMonth","endMonth"].map((field) => (
                    <select
                      key={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-pink-500"
                    >
                      <option value="">{field === 'startMonth' ? 'Starting month' : 'Ending month'}</option>
                      {["January","February","March","April","May","June","July","Aug","September","October","November","December"].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Weather</label>
                <select
                  name="weatherType"
                  value={formData.weatherType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-pink-500"
                >
                  <option value="">Select Weather Type</option>
                  {["Sunny","Cloudy","Rainy","Snowy","Windy"].map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  name="note"
                  rows="2"
                  placeholder="Enter note..."
                  value={formData.note}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Season;
