import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import S3Image from "../SelectedDestinationComponents/S3Image"; // Adjust the import path as needed

const DestinationWeather = ({
  weather,
  review,
  reviewer,
  reviewerName,
  designation,
  destinationFolder,
}) => {
  // Convert the weather map into entries.
  const weatherEntries = Object.entries(weather);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerSlide, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + itemsPerSlide, weatherEntries.length - itemsPerSlide)
    );
  };

  const visibleEntries = weatherEntries.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  // Helper to choose the correct weather icon.
  // The weather icons are stored directly within the "img" folder.
  // For example: assets/assets-2025-03-16/img/sunny.png, etc.
  const getWeatherIcon = (type) => {
    const lowerType = type.toLowerCase();
    const weatherIcons = {
      rainy: "rainy.png",
      sunny: "sunny.png",
      snowy: "snowy.png",
      cloudy: "cloudy.png",
      windy: "windy.png",
    };
    return (
      <S3Image
        // No subfolder is used since the icons are directly in the img folder.
        folder=""
        imageName={weatherIcons[lowerType] || "sunny.png"}
        alt={`${lowerType} icon`}
        className="h-10 w-10"
        // Set the basePath to the img directory.
        basePath="assets/assets-2025-03-16/img"
      />
    );
  };

  return (
    <div className="max-w-8xl mx-auto px-4 lg:px-[220px] py-12">
      <h2 className="text-3xl font-bold text-black">Things to keep in mind</h2>
      <h3 className="text-xl font-semibold mt-6">Weather</h3>
      <div className="flex flex-col md:flex-row gap-10 mt-4">
        <div className="relative md:w-7/12">
          {weatherEntries.length > 2 ? (
            <>
              <div className="flex gap-2">
                {visibleEntries.map(([period, info]) => (
                  <div
                    key={period}
                    className="bg-white shadow-lg rounded-lg p-6 flex-1 min-h-[180px]"
                  >
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(info.weather)}
                      <h4 className="text-lg font-bold">
                        {period.replace(/-/g, " - ")}
                      </h4>
                    </div>
                    <p className="text-black font-poppins font-[300] mt-2 text-sm">
                      {info.note}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-[-2rem] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + itemsPerSlide >= weatherEntries.length}
                className="absolute right-[-2rem] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
              >
                <ChevronRight />
              </button>
            </>
          ) : (
            <div className="flex gap-6">
              {weatherEntries.map(([period, info]) => (
                <div
                  key={period}
                  className="bg-white shadow-lg rounded-lg p-6 flex-1 min-h-[180px]"
                >
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(info.weather)}
                    <h4 className="text-lg font-bold">
                      {period.replace(/-/g, " - ")}
                    </h4>
                  </div>
                  <p className="text-black font-poppins font-[300] mt-2 text-sm">
                    {info.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {review && reviewer && reviewerName && (
  <div className="relative md:w-5/12">
    <div className="bg-red-400 text-white rounded-lg p-4 relative">
      <p className="text-sm font-poppins font-[400] md:text-sm">
        {review}
      </p>
      <div className="absolute left-6 bottom-[-10px] w-6 h-6 bg-red-400 rotate-45"></div>
    </div>
    <div className="flex items-center mt-6">
      <S3Image
        folder={destinationFolder}
        imageName={reviewer}
        alt="Reviewer"
        className="w-12 h-12 rounded-full object-cover border-2 border-white"
      />
      <div className="ml-4">
        <h4 className="font-bold text-black">{reviewerName}</h4>
        <p className="text-gray-600 text-sm">{designation}</p>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default DestinationWeather;
