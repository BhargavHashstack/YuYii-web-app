import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Helper function to generate the pagination range
  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = generatePagination();

  return (
    <div className="flex mt-4 space-x-2 ml-auto">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg ${
          currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-white text-gray-700 border border-gray-300"
        }`}
      >
        &lt; {/* The "<" character, escaped as &lt; for HTML */}
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-1 rounded-lg ${
            page === currentPage
              ? "bg-pink-300 text-pink-800"
              : page === "..."
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg ${
          currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-white text-gray-700 border border-gray-300"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
