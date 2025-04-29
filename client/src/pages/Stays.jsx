import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StaysListing from "../components/StayPageComponents/StaysListing";
import SortingButtons from "../components/StayPageComponents/SortingButton";
import StaysSidebar from "../components/StayPageComponents/StaysSidebar";
import PartnerSection from "../components/RepeatedComponents/Partners";

const Stays = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedStayType, setSelectedStayType] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedTripType, setSelectedTripType] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedHubs, setSelectedHubs] = useState([]);

  // Price range
  const [priceRangeValue, setPriceRangeValue] = useState(200000);

  // Distance from hub
  const [distanceFromHub, setDistanceFromHub] = useState(1000);
  // Controls whether distance filter is active
  const [filterDistance, setFilterDistance] = useState(false);

  // Month filter
  const location = useLocation();
  const initialMonths = location.state?.selectedMonths || [];
  const [selectedMonths, setSelectedMonths] = useState(initialMonths);

  // Sorting
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    navigate(`/stays?page=${newPage}`);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
        {/* Sidebar (Desktop Only) */}
        <div className="md:mt-28 px-2">
          <div className="hidden md:block bg-white border border-[#CFCFCF] shadow-lg lg:p-4 overflow-y-auto sticky top-0">
            <StaysSidebar
              selectedStates={selectedStates}
              setSelectedStates={setSelectedStates}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              selectedHubs={selectedHubs}
              setSelectedHubs={setSelectedHubs}
              distanceFromHub={distanceFromHub}
              setDistanceFromHub={setDistanceFromHub}
              filterDistance={filterDistance}
              setFilterDistance={setFilterDistance}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              selectedStayType={selectedStayType}
              setSelectedStayType={setSelectedStayType}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              selectedTripType={selectedTripType}
              setSelectedTripType={setSelectedTripType}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              priceRangeValue={priceRangeValue}
              setPriceRangeValue={setPriceRangeValue}
              selectedMonths={selectedMonths}
              setSelectedMonths={setSelectedMonths}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-1 xs:col-span-1 sm:col-span-3 md:col-span-3 bg-white rounded-lg md:py-6">
          <div className="flex items-center justify-between mb-4 px-4 md:px-0">
            <div className="flex gap-4 ml-auto">
              <SortingButtons onSort={handleSort} />
            </div>
            <div>
              <button
                className="flex items-center md:block md:hidden bg-[#DE1587] text-white px-3 py-3 gap-2 rounded-md transition focus:outline-none"
                onClick={() => setShowFilters(true)}
              >
                Filters
              </button>
            </div>
          </div>

          <StaysListing
            selectedActivities={selectedActivities}
            selectedStayType={selectedStayType}
            selectedAmenities={selectedAmenities}
            selectedTripType={selectedTripType}
            selectedPropertyType={selectedPropertyType}
            selectedStates={selectedStates}
            selectedCities={selectedCities}
            selectedHubs={selectedHubs}
            // If user toggled on distance filter + selected hub(s), pass the distance; otherwise null
            distanceRangeValue={filterDistance && selectedHubs.length > 0 ? distanceFromHub : null}
            priceRangeValue={priceRangeValue}
            sortOption={sortOption}
            selectedMonths={selectedMonths}
          />
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-64 h-full overflow-y-auto p-6">
            <button
              className="font-bold mt-24 flex items-center rounded-md py-2 px-2 bg-[#DE1587] hover:bg-pink-700 hover:text-white transition"
              onClick={() => setShowFilters(false)}
            >
              Close Filters
            </button>
            <StaysSidebar
              selectedStates={selectedStates}
              setSelectedStates={setSelectedStates}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              selectedHubs={selectedHubs}
              setSelectedHubs={setSelectedHubs}
              distanceFromHub={distanceFromHub}
              setDistanceFromHub={setDistanceFromHub}
              filterDistance={filterDistance}
              setFilterDistance={setFilterDistance}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              selectedStayType={selectedStayType}
              setSelectedStayType={setSelectedStayType}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              selectedTripType={selectedTripType}
              setSelectedTripType={setSelectedTripType}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              priceRangeValue={priceRangeValue}
              setPriceRangeValue={setPriceRangeValue}
              selectedMonths={selectedMonths}
              setSelectedMonths={setSelectedMonths}
            />
          </div>
        </div>
      )}
      <PartnerSection />
    </div>
  );
};

export default Stays;
