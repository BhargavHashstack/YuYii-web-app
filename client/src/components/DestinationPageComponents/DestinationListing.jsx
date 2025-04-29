import React, { useEffect, useState } from "react";
import DestinationCard from "./DestinationCard";
import Pagination from "../RepeatedComponents/Pagination";
import { Link } from "react-router-dom";

// Skeleton Loader Component
const SkeletonLoader = () => {
  return <div className="animate-pulse bg-gray-200 rounded-lg h-72 w-full"></div>;
};

const DestinationListing = ({ filteredDestinations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const destinations = Array.isArray(filteredDestinations) ? filteredDestinations : [];
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = destinations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-5 md:gap-y-14">
        {destinations.length === 0 ? (
          <p className="text-center text-xl mt-8">No destinations match your filters.</p>
        ) : (
          currentProperties.map((property) => (
            <Link to={`/Destination/${property.id}`} key={property.id}>
              <DestinationCard
                image={property.image ? property.image : "default.jpg"}
                description={property.description || "No description available"}
                title={property.title || "No title"}
                location={property.location || "Unknown location"}
                hoveredImage={property.imagehover || []}
                id={property.id}
              />
            </Link>
          ))
        )}
      </div>
      <div className="flex justify-end mt-4">
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default DestinationListing;
