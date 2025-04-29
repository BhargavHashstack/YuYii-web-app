import React from "react";
import { useNavigate } from "react-router-dom";
import HeadingSection from "../reusable_components/HeadingSection";
import Title from "../reusable_components/Title";

const SeasonWeekendStays = () => {
  const navigate = useNavigate();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  
  // When Explore is clicked, navigate to the Stays page while
  // passing the current month as the default selected month.
  const handleExplore = () => {
    navigate("/stays", { state: { selectedMonths: [currentMonth] } });
  };

  return (
    <div className="max-w-7xl mx-auto py-24 pb-0 px-4 mt-36 md:mt-28 sm:mt-28 lg:mt-2 text-center">
      <div className="mb-4">
        <HeadingSection text="NOT SURE?" color="pink" />
      </div>
      
      <Title text="Enjoy Yuyiii's Hand-picked stays this Festive Season" />
      <p className="text-gray-900 font-poppins text-base mb-6">
        Let Yuyiii recommend some {currentMonth} weekend stays.
      </p>
      <button
        onClick={handleExplore}
        className="bg-pink-600 text-white font-poppins text-base px-8 py-2 rounded-lg transition-colors"
      >
        Explore
      </button>
    </div>
  );
};

export default SeasonWeekendStays;
