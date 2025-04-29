import React from 'react';
import BackgroundSVG from '../../assets/backgroundSVG'; // Adjust the path as needed
import SquiglybackgroundSVG from '../../assets/SquiglybackgroundSVG';

const HighlightsSection = () => {
  return (
    <section className="relative bg-white px-6 xl:px-4 md:px-12 overflow-hidden">
      {/* Squiggly Background for large screens only */}
      <div className="absolute inset-0 z-0  hidden xl:block">
        <SquiglybackgroundSVG className="w-full h-full object-cover" />
      </div>

      {/* Main Section */}
      <div className="relative z-10 container mx-auto px-6 2xl:px-32 md:px-6">
        <div className="flex flex-col h-auto lg:flex-row items-center justify-between space-y-10 lg:space-y-1">
          {/* Left Div */}
          <div className="lg:w-5/12 text-center lg:text-left sm:px-12 lg:mb-36">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Yuyiii?
            </h2>
            <p className="text-black max-w-2xl mx-auto lg:mx-0 mt-4">
              We’re thrilled to celebrate the impact our platform has had on making travel more accessible and enjoyable for thousands of users. We’ve empowered travelers to explore the world with greater ease and confidence.
            </p>
          </div>

          {/* Right Div */}
          <div className="lg:w-5/12 flex justify-center lg:justify-end">
            <BackgroundSVG className="w-full max-w-xs md:max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
