import { useState, useEffect } from "react";
import axios from "axios";

function StartingPoint({ onStartingPointChange, initialStartingPoint }) {
  const [startingPoint, setStartingPoint] = useState(
    initialStartingPoint || { state: "", stateLabel: "", city: "" }
  );
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch states from your backend API
    axios
      .get("/property-api/states")
      .then((res) => {
        setStates(res.data); // API returns an array of state objects { _id, value, label }
      })
      .catch((err) => console.error("Error fetching states", err));
  }, []);

  useEffect(() => {
    if (startingPoint.state) {
      axios
        .get(`/property-api/cities?state=${startingPoint.state}`)
        .then((res) => {
          setCities(res.data); // API returns an array of city objects { _id, value, label }
        })
        .catch((err) => console.error("Error fetching cities", err));
    }
  }, [startingPoint.state]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const selectedOption = states.find((s) => s.value === newState);
    const newStartingPoint = {
      ...startingPoint,
      state: newState,
      stateLabel: selectedOption ? selectedOption.label : "",
      city: "",
    };
    setStartingPoint(newStartingPoint);
    onStartingPointChange && onStartingPointChange(newStartingPoint);
  };

  const handleCityChange = (e) => {
    const newStartingPoint = {
      ...startingPoint,
      city: e.target.value,
    };
    setStartingPoint(newStartingPoint);
    onStartingPointChange && onStartingPointChange(newStartingPoint);
    setShowDropdown(false);
  };

  const selectedStateLabel =
    states.find((state) => state.value === startingPoint.state)?.label || "";
  const selectedCity = startingPoint.city;

  return (
    <div className="font-poppins">
      <h4 className="text-[#828282] text-sm font-poppins font-semibold mb-4">
        Starting from
      </h4>
      {!showDropdown ? (
        <div
          className="border p-1 px-2 py-2 sm:py-2.5 cursor-pointer h-[70px] sm:h-12 flex items-center justify-center"
          onClick={() => setShowDropdown(true)}
        >
          <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
            {selectedCity || "Select City"}, {selectedStateLabel || "Select State"}
          </span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-2 items-center justify-center">
          <select
            value={startingPoint.state}
            onChange={handleStateChange}
            className="bg-[#FFFFFF] w-full sm:w-24 text-gray-700"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>

          <select
            value={startingPoint.city}
            onChange={handleCityChange}
            className="bg-[#FFFFFF] w-full sm:w-24 text-gray-700"
            disabled={!startingPoint.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.label}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default StartingPoint;
