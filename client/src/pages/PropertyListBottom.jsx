import React from "react";
import Carousel from "../components/FutureComponents/Carousel"; // Adjust the import path as needed
import Highlights from "../components/RepeatedComponents/Highlights"; // Adjust the import path as needed
import Testimonials from "../components/RepeatedComponents/Testimonials"; // Adjust the import path as needed
import DestinationTravelExp from "../components/RepeatedComponents/DestinationTravelExp";
import Partners from "../components/RepeatedComponents/Partners"; // Adjust the import path as needed
const PropertyListingBottom = () => {
  return (
    <div className="container mx-auto mt-8">
      {/* Top Section */}
      <div className="flex flex-wrap  justify-between gap-4">
        {/* Left: Carousel */}
        

        {/* Right: Partners */}
        <div className="w-full h-full rounded-lg">
          <Highlights />

        </div>

      </div>
      <Testimonials /> 

      
      
      {/* Bottom Section */}
      
      <DestinationTravelExp />
      <Partners />
      
    </div>
  );
};

export default PropertyListingBottom;
