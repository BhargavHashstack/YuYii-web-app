import React, { useState, useEffect } from "react";
import StateFilter from "./StaysStateFilter";
import CityFilter from "./StaysCityFilter";
import StaysHubFilter from "./StaysHubFilter";
import MonthFilter from "./StaysMonthFilter";
import "./SidebarCheckbox.css";
import {
  fetchActivities,
  fetchAmenities,
  fetchStayTypes,
  fetchTripTypes,
  fetchPropertyTypes,
} from "../../utils/api";

const StaysSidebar = ({
  selectedStates,
  setSelectedStates,
  selectedCities,
  setSelectedCities,
  selectedHubs,
  setSelectedHubs,
  distanceFromHub,
  setDistanceFromHub,
  filterDistance,
  setFilterDistance,
  selectedActivities,
  setSelectedActivities,
  selectedStayType,
  setSelectedStayType,
  selectedAmenities,
  setSelectedAmenities,
  selectedTripType,
  setSelectedTripType,
  selectedPropertyType,
  setSelectedPropertyType,
  priceRangeValue,
  setPriceRangeValue,
  selectedMonths,
  setSelectedMonths,
}) => {
  const [showMore, setShowMore] = useState({
    activities: false,
    stayTypes: false,
    amenities: false,
    tripTypes: false,
    propertyTypes: false,
  });

  const [filterCityState, setFilterCityState] = useState(false);

  // Activities, Amenities, etc.
  const [activities, setActivities] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [stayTypes, setStayTypes] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [
          activitiesData,
          amenitiesData,
          stayTypesData,
          tripTypesData,
          propertyTypesData,
        ] = await Promise.all([
          fetchActivities(),
          fetchAmenities(),
          fetchStayTypes(),
          fetchTripTypes(),
          fetchPropertyTypes(),
        ]);

        setActivities(activitiesData || []);
        setAmenities(amenitiesData || []);
        setStayTypes(stayTypesData || []);
        setTripTypes(tripTypesData || []);
        setPropertyTypes(propertyTypesData || []);
      } catch (error) {
        console.error("❌ Error loading filters:", error);
      }
    };

    loadFilters();
  }, []);

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRangeValue(value);
  };

  const handleDistanceChange = (e) => {
    const value = Number(e.target.value);
    setDistanceFromHub(value);
    // Optionally, log it for debugging:
    console.log("Slider distance changed to:", value);
  };

  const toggleSelection = (array, setArray, item) => {
    const exists = array.some((i) => i._id === item._id);
    if (exists) {
      setArray(array.filter((i) => i._id !== item._id));
    } else {
      setArray([...array, item]);
    }
  };

  const removeSelectedItem = (item, type) => {
    switch (type) {
      case "activity":
        setSelectedActivities(selectedActivities.filter((i) => i._id !== item._id));
        break;
      case "stayType":
        setSelectedStayType(selectedStayType.filter((i) => i._id !== item._id));
        break;
      case "propertyType":
        setSelectedPropertyType(selectedPropertyType.filter((i) => i._id !== item._id));
        break;
      case "amenity":
        setSelectedAmenities(selectedAmenities.filter((i) => i._id !== item._id));
        break;
      case "tripType":
        setSelectedTripType(selectedTripType.filter((i) => i._id !== item._id));
        break;
      default:
        break;
    }
  };

  const allSelectedItems = [
    ...selectedActivities.map((item) => ({ ...item, type: "activity" })),
    ...selectedStayType.map((item) => ({ ...item, type: "stayType" })),
    ...selectedPropertyType.map((item) => ({ ...item, type: "propertyType" })),
    ...selectedAmenities.map((item) => ({ ...item, type: "amenity" })),
    ...selectedTripType.map((item) => ({ ...item, type: "tripType" })),
  ];

  const renderOptions = (options, selected, setSelected, key) => (
    <>
      {options.length > 0 ? (
        options.slice(0, showMore[key] ? options.length : 3).map((option) => (
          <label key={option._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selected.some((i) => i._id === option._id)}
              onChange={() => toggleSelection(selected, setSelected, option)}
              className="mr-2 rounded focus:ring-black custom-staycheckbox"
            />
            {option.name}
          </label>
        ))
      ) : (
        <p className="text-gray-500">No options available</p>
      )}

      {options.length > 3 && (
        <button
          onClick={() => setShowMore((prev) => ({ ...prev, [key]: !prev[key] }))}
          className="text-[#DE1587] text-sm flex items-center mt-2"
        >
          {showMore[key] ? "See Less" : "See More"}
        </button>
      )}
    </>
  );

  return (
    <div className="p-4">
      {/* Selected Keywords */}
      <div className="mb-6">
        <p className="text-poppins text-[#222222] font-[600] mb-2">Keywords</p>
        <div className="flex flex-wrap gap-2">
          {allSelectedItems.length > 0 ? (
            allSelectedItems.map((item) => (
              <div key={item._id} className="flex items-center bg-[#F1F1F1] text-black rounded-sm py-1 px-2 text-sm">
                {item.name}
                <button
                  onClick={() => removeSelectedItem(item, item.type)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.59271 5.8865C6.75964 6.05333 6.85346 6.27964 6.85353 6.51564C6.8536 6.75164 6.75991 6.97801 6.59309 7.14493C6.42626 7.31186 6.19995 7.40568 5.96395 7.40575C5.72795 7.40582 5.50159 7.31214 5.33466 7.14531L3.44758 5.25748L1.55975 7.14531C1.47731 7.22821 1.37929 7.29399 1.27134 7.33888C1.16339 7.38377 1.04763 7.40688 0.930723 7.40688C0.813812 7.40688 0.698053 7.38377 0.590103 7.33888C0.482153 7.29399 0.384139 7.22821 0.301698 7.14531C0.134784 6.97838 0.0410156 6.75198 0.0410156 6.51591C0.0410156 6.27984 0.134784 6.05344 0.301698 5.8865L2.18877 3.99943L0.301698 2.11235C0.144824 1.94355 0.0595265 1.72048 0.0637459 1.49007C0.0679654 1.25967 0.161373 1.03987 0.324322 0.876925C0.487272 0.713976 0.707064 0.620568 0.937471 0.616349C1.16788 0.612129 1.39094 0.697427 1.55975 0.854301L3.44758 2.74138L5.33466 0.854301C5.41726 0.771696 5.51533 0.70617 5.62326 0.661465C5.73118 0.616759 5.84686 0.59375 5.96368 0.59375C6.0805 0.59375 6.19618 0.616759 6.30411 0.661465C6.41204 0.70617 6.5101 0.771696 6.59271 0.854301C6.67531 0.936905 6.74084 1.03497 6.78554 1.1429C6.83025 1.25083 6.85326 1.36651 6.85326 1.48333C6.85326 1.60015 6.83025 1.71582 6.78554 1.82375C6.74084 1.93168 6.67531 2.02975 6.59271 2.11235L4.70563 3.99943L6.59271 5.8865Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No filters selected</p>
          )}
        </div>
      </div>

      {/* Price Filter */}
      <p className="text-base font-[500] font-poppins">Price</p>
      <div className="price-filter-container">
        <input
          type="range"
          min="0"
          max="200000"
          value={priceRangeValue || 0}
          onChange={handlePriceRangeChange}
          className="price-range"
          style={{
            background: `linear-gradient(to right, #DE1587 ${
              priceRangeValue ? priceRangeValue / 2000 : 0
            }%, #f8d7da ${priceRangeValue ? priceRangeValue / 2000 : 0}%)`,
          }}
        />
        <div className="price-range-values text-[#5E5E5E]">
          <span>Rs 0</span>
          <span>Rs {(priceRangeValue || 0).toLocaleString()}</span>
        </div>
      </div>

      {/* Month Filter */}
      <MonthFilter selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} />

      {/* Activities */}
      <div className="mb-6">
        <p className="text-base font-[500] font-poppins mb-2">Activities</p>
        {renderOptions(activities, selectedActivities, setSelectedActivities, "activities")}
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <p className="text-base font-[500] font-poppins mb-2">Amenities</p>
        {renderOptions(amenities, selectedAmenities, setSelectedAmenities, "amenities")}
      </div>

      {/* Stay Types */}
      <div className="mb-6">
        <p className="text-base font-[500] font-poppins mb-2">Stay Type</p>
        {renderOptions(stayTypes, selectedStayType, setSelectedStayType, "stayTypes")}
      </div>

      {/* Filter by City/State */}
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filterCityState}
            onChange={() => {
              setFilterCityState((prev) => {
                if (prev) {
                  setSelectedStates([]);
                  setSelectedCities([]);
                }
                return !prev;
              });
            }}
            className="mr-2 rounded custom-staycheckbox"
          />
          <span className="text-base font-[500] font-poppins">Filter by City/State</span>
        </label>
        {filterCityState && (
          <>
            <StateFilter selectedStates={selectedStates} setSelectedStates={setSelectedStates} />
            <CityFilter selectedCities={selectedCities} setSelectedCities={setSelectedCities} />
          </>
        )}
      </div>

      {/* Filter by Distance from Hub */}
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filterDistance}
            onChange={(e) => {
              setFilterDistance(e.target.checked);
              if (!e.target.checked) {
                // Reset everything if user unchecks
                setSelectedHubs([]);
                setDistanceFromHub(10000);
              }
            }}
            className="mr-2 rounded custom-staycheckbox"
          />
          <span className="text-base font-medium">Filter by Distance from Hub</span>
        </label>
        {filterDistance && (
          <>
            <StaysHubFilter selectedHubs={selectedHubs} setSelectedHubs={setSelectedHubs} />
            {selectedHubs.length > 0 && (
              <div className="mt-4 distance-filter-container">
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={distanceFromHub}
                  onChange={handleDistanceChange}
                  className="distance-range"
                  style={{
                    background: `linear-gradient(to right, #DE1587 ${
                      (distanceFromHub / 1000) * 100
                    }%, #e0e0e0 ${(distanceFromHub / 1000) * 100}%)`,
                  }}
                />
                <div className="distance-range-values flex justify-between text-sm">
                  <span>0 km</span>
                  <span>{distanceFromHub} km</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Trip Types */}
      <div className="mb-6">
        <p className="text-base font-[500] font-poppins mb-2">Trip Type</p>
        {renderOptions(tripTypes, selectedTripType, setSelectedTripType, "tripTypes")}
      </div>

      {/* Property Types */}
      <div className="mb-6">
        <p className="text-base font-[500] font-poppins mb-2">Property Type</p>
        {renderOptions(propertyTypes, selectedPropertyType, setSelectedPropertyType, "propertyTypes")}
      </div>
    </div>
  );
};

export default StaysSidebar;
