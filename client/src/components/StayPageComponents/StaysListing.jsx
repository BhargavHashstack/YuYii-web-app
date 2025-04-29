import React, { useEffect, useState } from "react";
import StaysCard from "./StaysCard";
import Pagination from "../RepeatedComponents/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";

function parsePriceString(priceStr = "") {
  const numericPart = priceStr.replace(/[^\d]/g, "").trim();
  return Number(numericPart) || 0;
}

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"></div>
);

const StaysListing = ({
  selectedActivities,
  selectedStayType,
  selectedAmenities,
  selectedTripType,
  selectedPropertyType,
  priceRangeValue,
  distanceRangeValue,
  selectedStates,
  selectedCities,
  selectedHubs,
  sortOption,             // "Expert Review" or "Highest to Lowest Price"
  selectedMonths,
}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (selectedHubs?.length) {
      selectedHubs.forEach((hub) => params.append("hub", hub.label));
    }
    if (distanceRangeValue !== null && selectedHubs?.length) {
      params.append("distanceFromHub", distanceRangeValue);
    }
    if (selectedActivities?.length) {
      selectedActivities.forEach((act) => params.append("activities", act.name || act));
    }
    if (selectedStayType?.length) {
      selectedStayType.forEach((st) => params.append("stayType", st.name || st));
    }
    if (selectedAmenities?.length) {
      selectedAmenities.forEach((am) => params.append("amenities", am.name || am));
    }
    if (selectedTripType?.length) {
      selectedTripType.forEach((tp) => params.append("tripType", tp.name || tp));
    }
    if (selectedPropertyType?.length) {
      selectedPropertyType.forEach((pt) => params.append("propertyType", pt.name || pt));
    }
    if (selectedStates?.length) {
      selectedStates.forEach((s) => params.append("state", s));
    }
    if (selectedCities?.length) {
      selectedCities.forEach((c) => params.append("city", c));
    }
    if (priceRangeValue !== undefined && priceRangeValue !== null) {
      params.append("maxPrice", priceRangeValue);
    }
    if (selectedMonths?.length) {
      params.append("months", selectedMonths.join(","));
    }

    return params.toString();
  };

  const fetchFilteredStays = debounce(() => {
    setLoading(true);
    const queryParams = buildQueryParams();
    const apiUrl = `/property-api/stays/filtered?${queryParams}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setProperties(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setProperties([]);
      })
      .finally(() => setLoading(false));
  }, 300);

  useEffect(() => {
    fetchFilteredStays();
    return () => fetchFilteredStays.cancel();
  }, [
    selectedActivities,
    selectedStayType,
    selectedAmenities,
    selectedTripType,
    selectedPropertyType,
    selectedStates,
    selectedCities,
    selectedHubs,
    priceRangeValue,
    distanceRangeValue,
    selectedMonths,
  ]);

  // Pagination
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const propertiesPerPage = 15;

  // ** Sorting **
  let sortedProperties = [...properties];
  if (sortOption === "Expert Review") {
    sortedProperties.sort((a, b) => (b.expertrating || 0) - (a.expertrating || 0));
  } else if (sortOption === "Highest to Lowest Price") {
    sortedProperties.sort((a, b) => parsePriceString(b.price) - parsePriceString(a.price));
  }

  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);
  const currentProperties = sortedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  useEffect(() => {
    navigate(`/Stays?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const handleCardClick = (id) => navigate(`/Stays/${id}`);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-4">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: propertiesPerPage }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : currentProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <div
                key={property._id || property.id}
                onClick={() => handleCardClick(property.id)}
                className="cursor-pointer"
              >
                <StaysCard {...property} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No properties found.
        </div>
      )}
    </div>
  );
};

export default StaysListing;
