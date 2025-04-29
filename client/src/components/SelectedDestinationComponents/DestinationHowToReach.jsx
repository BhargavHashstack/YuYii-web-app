import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import S3Image from "../SelectedDestinationComponents/S3Image"; // Adjust the path as necessary

const DestinationHowToReach = ({ airLocations, roadLocations, destinationFolder }) => {
  const [selectedMode, setSelectedMode] = useState("air");
  const sliderRef = useRef(null);

  const selectedData = (selectedMode === "air" ? airLocations : roadLocations) || {};

  const getArray = (data) => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  };

  const hasValidData = (data) => {
    if (!data) return false;
    return (
      data.note ||
      (Array.isArray(data.routes) && data.routes.length > 0) ||
      getArray(data.scenic).length > 0 ||
      getArray(data.Eatery).length > 0 ||
      getArray(data.eatery).length > 0
    );
  };

  const hasAnyData = hasValidData(airLocations) || hasValidData(roadLocations);

  if (!hasAnyData) return null;

  const combinedLocations = [
    ...getArray(selectedData.scenic),
    ...getArray(selectedData.Eatery),
    ...getArray(selectedData.eatery),
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div className="mt-8 p-4 w-full max-w-8xl mx-auto lg:px-[220px]">
      <h2 className="text-xl text-black font-bold mb-4">How to reach?</h2>

      <div className="flex text-xl gap-4">
        <button
          onClick={() => handleModeChange("air")}
          className={`flex items-center hover:border border-[#DE1587] gap-2 px-4 py-2 rounded-md font-Merriweather ${
            selectedMode === "air" ? "bg-[#DE1587] text-white" : "text-black"
          }`}
        >
          <span className="text-2xl">✈️</span>
          <h3
            className={`flex items-center font-[600] rounded-md font-Merriweather ${
              selectedMode === "air" ? "text-white" : "text-black"
            }`}
          >
            By Air
          </h3>
        </button>

        <button
          onClick={() => handleModeChange("road")}
          className={`flex items-center hover:border border-[#DE1587] gap-2 px-4 py-2 rounded-md font-Merriweather ${
            selectedMode === "road" ? "bg-[#DE1587] text-white" : "text-black"
          }`}
        >
          <span className="text-2xl">🚌</span>
          <h3
            className={`flex items-center font-[600] rounded-md font-Merriweather ${
              selectedMode === "road" ? "text-white" : "text-black"
            }`}
          >
            By Road
          </h3>
        </button>
      </div>

      {selectedData?.note && (
        <p className="mt-4 text-black text-sm font-[300] font-poppins">
          {selectedData.note}
        </p>
      )}

      {selectedData?.routes &&
        Array.isArray(selectedData.routes) &&
        selectedData.routes.length > 0 && (
          <div className="mt-2">
            <h3 className="text-base font-[600]">Time & Distance</h3>
            <ul>
              {selectedData.routes.map((route, index) => (
                <li key={index} className="text-black text-sm font-[300] font-poppins">
                  {route}
                </li>
              ))}
            </ul>
            {selectedData?.map && (
              <a
                href={selectedData.map}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Explore on Google Maps
              </a>
            )}
          </div>
        )}

      {combinedLocations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-[600]">
            Picturesque locations & recommended eateries (with washrooms) enroute
          </h3>

          {/* Carousel for mobile */}
          <div className="relative mt-4 block md:hidden px-4">
            <button
              className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow-md"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <ChevronLeftIcon className="w-10 h-10 text-white" />
            </button>

            <Slider ref={sliderRef} {...sliderSettings}>
              {combinedLocations.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <a href={item.map} target="_blank" rel="noopener noreferrer">
                    <S3Image
                      folder={destinationFolder}
                      imageName={item.banner}
                      alt={item.place}
                      className="w-full h-48 object-cover rounded-md shadow-md"
                    />
                  </a>
                  <p className="mt-2 text-xs font-poppins">{item.place}</p>
                </div>
              ))}
            </Slider>

            <button
              className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow-md"
              onClick={() => sliderRef.current.slickNext()}
            >
              <ChevronRightIcon className="w-10 h-10 text-white" />
            </button>
          </div>

          {/* Grid for desktop */}
          <div className="hidden md:grid grid-cols-4 gap-4 mt-4">
            {combinedLocations.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <a href={item.map} target="_blank" rel="noopener noreferrer">
                  <S3Image
                    folder={destinationFolder}
                    imageName={item.banner}
                    alt={item.place}
                    className="w-60 h-40 object-cover rounded-md shadow-md"
                  />
                </a>
                <p className="mt-2 text-xs font-poppins">{item.place}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationHowToReach;
