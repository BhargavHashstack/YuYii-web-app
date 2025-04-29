import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterDropdown from "../components/StayPageComponents/Filter";
import DestinationListing from "../components/DestinationPageComponents/DestinationListing";

const Destination = () => {
  // All destinations from the server
  const [destinations, setDestinations] = useState([]);
  // Filtered results (null indicates no filter has been applied yet)
  const [filteredDestinations, setFilteredDestinations] = useState(null);
  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch all destinations initially
  useEffect(() => {
    axios
      .get("/property-api/destinations")
      .then((response) => {
        setDestinations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      });
  }, []);

  // Called by FilterDropdown after each filter request.
  const updateFilteredDestinations = (filteredData) => {
    setFilteredDestinations(filteredData);
  };

  // Use filtered results if filters have been applied.
  const destinationsToShow = filteredDestinations !== null ? filteredDestinations : destinations;

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="grid grid-cols-1 gap-4 p-4">
        {/* Filter panel */}
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="flex-grow"></div>
          <FilterDropdown updateFilteredDestinations={updateFilteredDestinations} />
        </div>

        {/* Content area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="animate-pulse p-4 border border-gray-200 rounded-md">
                <div className="bg-gray-300 h-48 mb-4 rounded-md"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <DestinationListing filteredDestinations={destinationsToShow} />
        )}
      </div>
    </div>
  );
};

export default Destination;
