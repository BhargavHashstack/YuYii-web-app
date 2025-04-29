import React from "react";

const FilterButton = ({ label, icon, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-4 py-2 rounded-full font-poppins font-[500] text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg transition-all duration-300 ease-in-out 
        ${
          isSelected
            ? "bg-[#DE1587] text-white shadow-md"
            : "bg-white border border-[#96989B] text-[#505459] hover:bg-pink-100"
        }`}
    >
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default FilterButton;
