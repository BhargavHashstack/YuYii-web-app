import React, { useState } from "react";

const SortingButtons = ({ onSort }) => {
  const [selected, setSelected] = useState("");

  // List of buttons – updated to "Expert Review"
  const buttons = ["Expert Review", "Highest to Lowest Price"];

  const handleButtonClick = (button) => {
    setSelected(button);
    if (onSort) {
      onSort(button);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:p-4 sm:gap-4 ">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(button)}
          className={`flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-[500] border rounded-md font-poppins transition-all 
            ${
              selected === button
                ? "bg-[#DE1587] border-[#DBDBDB] text-white"
                : "bg-[#FBFBFB] border-[#DBDBDB] text-black hover:bg-pink-300 focus:ring-2 focus:ring-pink-500"
            }`}
          aria-pressed={selected === button}
        >
          <span>{button}</span>
          {selected === button && (
            <span className="ml-2">
              <svg
                width="17"
                height="13"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.35137 12.5895L0.651367 6.88945L2.07637 5.46445L6.35137 9.73945L15.5264 0.564453L16.9514 1.98945L6.35137 12.5895Z"
                  fill="white"
                />
              </svg>
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SortingButtons;
