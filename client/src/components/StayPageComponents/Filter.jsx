import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./FilterDropdown.css";

const FilterDropdown = ({ updateFilteredDestinations }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeOption, setActiveOption] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    activities: [],
    amenities: [],
    stayType: [],
    tripType: [],
    states: [],
    cities: [] // cities stored as an array
  });

  // Fetched lists from backend.
  const [filters, setFilters] = useState({
    activities: [],
    amenities: [],
    stayType: [],
    tripType: [],
    states: [],
    cities: []
  });

  const dropdownRef = useRef(null);
  const [searchParams] = useSearchParams();

  // Build & apply query string to /property-api/destinations.
  const applyFilters = (updatedFilters) => {
    const queryParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryParams.set(key, value.join(","));
        }
      } else if (typeof value === "string" && value.trim().length > 0) {
        queryParams.set(key, value.trim());
      }
    });
    console.log("Generated Query Params:", queryParams.toString());
    fetch(`/property-api/destinations?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => updateFilteredDestinations(data))
      .catch((error) => console.error("Error fetching filtered data:", error));
  };

  // Close filter panel when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // Fetch data for activities, amenities, stay types, trip types, states, and cities.
  useEffect(() => {
    const fetchData = async (endpoint) => {
      try {
        const response = await fetch(`/property-api/${endpoint}`);
        const result = await response.json();
        return Array.isArray(result) ? result : [];
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
      }
    };

    (async () => {
      const [activities, amenities, staytypes, triptypes, states, cities] =
        await Promise.all([
          fetchData("activities"),
          fetchData("amenities"),
          fetchData("staytypes"),
          fetchData("triptypes"),
          fetchData("states"),
          fetchData("cities") // fetch cities from MongoDB
        ]);

      setFilters({
        activities,
        amenities,
        stayType: staytypes,
        tripType: triptypes,
        states,
        cities,
      });
    })();
  }, []);

  // Auto-select state and city from URL query parameters.
  useEffect(() => {
    const stateFromUrl = searchParams.get("state");
    const cityFromUrl = searchParams.get("city");
    let updated = false;
    let updatedFilters = { ...selectedFilters };

    if (stateFromUrl && filters.states && filters.states.length > 0) {
      if (!updatedFilters.states.includes(stateFromUrl)) {
        updatedFilters.states = [...updatedFilters.states, stateFromUrl];
        updated = true;
      }
    }
    if (cityFromUrl) {
      if (!updatedFilters.cities.includes(cityFromUrl)) {
        updatedFilters.cities = [...updatedFilters.cities, cityFromUrl];
        updated = true;
      }
    }
    if (updated) {
      setSelectedFilters(updatedFilters);
      const updatedSelectedKeywords = [...Object.values(updatedFilters).flat(Infinity)].filter(Boolean);
      setSelectedKeywords(updatedSelectedKeywords);
      applyFilters(updatedFilters);
    }
  }, [searchParams, filters.states, filters.cities]);

  // List of filter options.
  const filterOptions = [
    {
      name: "Activities",
      key: "activities",
      items: filters.activities?.map((a) => a.name) || [],
    },
    {
      name: "Stay Type",
      key: "stayType",
      items: filters.stayType?.map((s) => s.name) || [],
    },
    {
      name: "Amenities",
      key: "amenities",
      items: filters.amenities?.map((a) => a.name) || [],
    },
    {
      name: "Trip Type",
      key: "tripType",
      items: filters.tripType?.map((t) => t.name) || [],
    },
    {
      name: "States",
      key: "states",
      items: filters.states?.map((st) => st.label) || [],
    },
    {
      name: "Cities",
      key: "cities",
      items: filters.cities?.map((ct) => ct.label) || [],
    },
  ];

  // Map category names to the corresponding keys.
  const categoryToKey = (categoryName) => {
    switch (categoryName) {
      case "Activities":
        return "activities";
      case "Stay Type":
        return "stayType";
      case "Amenities":
        return "amenities";
      case "Trip Type":
        return "tripType";
      case "States":
        return "states";
      case "Cities":
        return "cities";
      default:
        return categoryName;
    }
  };

  // Handle checkbox toggle.
  const handleCheckboxChange = (categoryName, item) => {
    const key = categoryToKey(categoryName);
    setSelectedFilters((prev) => {
      let updatedValue;
      if (Array.isArray(prev[key])) {
        if (prev[key].includes(item)) {
          updatedValue = prev[key].filter((v) => v !== item);
        } else {
          updatedValue = [...prev[key], item];
        }
      } else {
        updatedValue = item;
      }
      const updatedFilters = { ...prev, [key]: updatedValue };
      const updatedSelectedKeywords = [...Object.values(updatedFilters).flat(Infinity)].filter(Boolean);
      setSelectedKeywords(updatedSelectedKeywords);
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  // Remove a keyword from filters.
  const removeKeyword = (keyword) => {
    setSelectedFilters((prev) => {
      const updatedFilters = Object.entries(prev).reduce((acc, [cat, value]) => {
        if (Array.isArray(value)) {
          acc[cat] = value.filter((v) => v !== keyword);
        } else if (typeof value === "string") {
          acc[cat] = value === keyword ? "" : value;
        }
        return acc;
      }, {});
      const updatedSelectedKeywords = [...Object.values(updatedFilters).flat(Infinity)].filter(Boolean);
      setSelectedKeywords(updatedSelectedKeywords);
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="relative px-8" ref={dropdownRef}>
      {/* Display selected keywords */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3 px-3 flex-wrap">
          {selectedKeywords.map((keyword, index) => (
            <div key={index} className="flex items-center bg-[#F1F1F1] text-gray-800 rounded-sm px-3 py-1 text-sm">
              {keyword}
              <button className="ml-2 text-gray-600" onClick={() => removeKeyword(keyword)}>
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.66497 5.8865C6.8319 6.05333 6.92572 6.27964 6.92579 6.51564C6.92586 6.75164 6.83218 6.97801 6.66535 7.14493C6.49852 7.31186 6.27222 7.40568 6.03622 7.40575C5.80021 7.40582 5.57385 7.31214 5.40692 7.14531L3.51985 5.25748L1.63201 7.14531C1.54957 7.22821 1.45156 7.29399 1.34361 7.33888C1.23566 7.38377 1.1199 7.40688 1.00299 7.40688C0.886078 7.40688 0.770319 7.38377 0.662369 7.33888C0.554418 7.29399 0.456405 7.22821 0.373963 7.14531C0.20705 6.97838 0.113281 6.75198 0.113281 6.51591C0.113281 6.27984 0.20705 6.05344 0.373963 5.8865L2.26104 3.99943L0.373963 2.11235C0.217089 1.94355 0.131792 1.72048 0.136012 1.49007C0.140231 1.25967 0.233638 1.03987 0.396588 0.876925C0.559537 0.713976 0.779329 0.620568 1.00974 0.616349C1.24014 0.612129 1.46321 0.697427 1.63201 0.854301L3.51985 2.74138L5.40692 0.854301C5.48953 0.771696 5.58759 0.70617 5.69552 0.661465C5.80345 0.616759 5.91913 0.59375 6.03595 0.59375C6.15277 0.59375 6.26845 0.616759 6.37637 0.661465C6.4843 0.70617 6.58237 0.771696 6.66497 0.854301C6.74758 0.936905 6.8131 1.03497 6.85781 1.1429C6.90251 1.25083 6.92553 1.36651 6.92553 1.48333C6.92553 1.60015 6.90251 1.71582 6.85781 1.82375C6.8131 1.93168 6.74758 2.02975 6.66497 2.11235L4.7779 3.99943L6.66497 5.8865Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Button to open/close the filter panel */}
        <button
          onClick={toggleFilter}
          className="flex items-center bg-[#D0D0D0] border rounded-md px-3 py-3 gap-2 shadow-md hover:shadow-lg transition focus:outline-none"
        >
          <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.84583 8.49945H0.830078M2.84583 8.49945C2.84583 9.03406 3.0582 9.54678 3.43622 9.9248C3.81425 10.3028 4.32696 10.5152 4.86157 10.5152C5.39618 10.5152 5.9089 10.3028 6.28692 9.9248C6.66495 9.54678 6.87732 9.03406 6.87732 8.49945M2.84583 8.49945C2.84583 7.96484 3.0582 7.45213 3.43622 7.0741C3.81425 6.69608 4.32696 6.48371 4.86157 6.48371C5.39618 6.48371 5.9089 6.69608 6.28692 7.0741C6.66495 7.45213 6.87732 7.96484 6.87732 8.49945M13.9324 8.49945H6.87732M13.9324 3.46008H11.9167M11.9167 3.46008C11.9167 3.99469 11.7043 4.50741 11.3263 4.88543C10.9483 5.26346 10.4356 5.47583 9.90094 5.47583C9.36633 5.47583 8.85362 5.26346 8.4756 4.88543C8.09757 4.50741 7.8852 3.99469 7.8852 3.46008M11.9167 3.46008C11.9167 2.92547 11.7043 2.41276 11.3263 2.03473C10.9483 1.65671 10.4356 1.44434 9.90094 1.44434C9.36633 1.44434 8.85362 1.65671 8.4756 2.03473C8.09757 2.41276 7.8852 2.92547 7.8852 3.46008M7.8852 3.46008H0.830078M13.9324 13.5388H11.9167M11.9167 13.5388C11.9167 14.0734 11.7043 14.5861 11.3263 14.9642C10.9483 15.3422 10.4356 15.5546 9.90094 15.5546C9.36633 15.5546 8.85362 15.3422 8.4756 14.9642C8.09757 14.5861 7.8852 14.0734 7.8852 13.5388M11.9167 13.5388C11.9167 13.0042 11.7043 12.4915 11.3263 12.1135C10.9483 11.7354 10.4356 11.5231 9.90094 11.5231C9.36633 11.5231 8.85362 11.7354 8.4756 12.1135C8.09757 12.4915 7.8852 13.0042 7.8852 13.5388H0.830078"
              stroke="#222222"
              strokeWidth="1.51181"
            />
          </svg>
          Filters
        </button>
      </div>

      {isFilterOpen && (
        <div className="absolute top-full right-0 bg-white shadow-lg z-40 flex max-w-[calc(100vw-16px)] overflow-x-auto">
          {/* Left side: filter categories */}
          <div className="p-2 w-50 border-r border-gray-300">
            <h7 className="px-8 text-sm font-semibold text-[#44546F] mb-4 font-popins">
              OPTIONS
            </h7>
            {filterOptions.map((option) => (
              <div
                key={option.name}
                className={`cursor-pointer py-2 pr-16 p-5 rounded-sm ${
                  activeOption === option.name
                    ? "bg-pink-200 text-[#DE1587]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveOption(option.name)}
              >
                {option.name}
              </div>
            ))}
          </div>

          {/* Right side: checkboxes for the active category */}
          {activeOption && (
            <div className="p-3 pl-4 w-52 max-h-80 overflow-y-auto">
              <h7 className="text-sm px-7 font-semibold text-[#44546F] mb-2">
                {activeOption}
              </h7>
              {(filterOptions.find((o) => o.name === activeOption)?.items || []).map((item, index) => (
                <label key={index} className="flex items-center space-x-3 py-2">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={Array.isArray(selectedKeywords) && selectedKeywords.includes(item)}
                    onChange={() => handleCheckboxChange(activeOption, item)}
                  />
                  <span className="text-[#222222] text-xs">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
