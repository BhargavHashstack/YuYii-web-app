// DestinationOverview.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DestinationOverview = ({ destination, stays }) => {
  const { name, state, zone, description } = destination;
  const navigate = useNavigate();

  // Navigate to one of the stays (chosen at random)
  const handleGoToStay = () => {
    if (stays && stays.length > 0) {
      const randomIndex = Math.floor(Math.random() * stays.length);
      const chosenStay = stays[randomIndex];
      navigate(`/Stays/${chosenStay.id}`);
    } else {
      console.log("No stay available to navigate");
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Overlay Card */}
      <div className="bg-white rounded-lg shadow-lg p-4 lg:px-8 lg:py-10 w-full max-w-[300px] sm:max-w-2xl z-20">
        <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl mb-2 font-semibold text-black text-center">
          {name}
        </h2>
        <p className="text-sm text-center text-gray-500 font-light font-poppins">
          {state}, {zone}
        </p>
        <p className="text-[#000000] font-light lg:text-lg sm:text-base text-sm text-center">
          {description?.text || "No description available."}
        </p>
        <div className="mt-4 flex justify-center">
          {/* Button container with relative positioning for the ripple effect */}
          <div className="relative inline-block">
            <button
              onClick={handleGoToStay}
              className="relative z-10 px-5 py-2 text-sm font-light font-poppins bg-[#DE1587] text-white rounded-full hover:bg-pink-600 transition"
            >
              Go to Stay
            </button>
            {/* Ripple element positioned at the geometric center */}
            <span className="absolute left-1/2 top-1/2 w-5 h-5 bg-white rounded-full opacity-50 animate-ripple z-10"></span>
          </div>
        </div>
      </div>
      {/* Inline styles for the ripple animation.
          Alternatively, you can add these keyframes to your global CSS */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 2.0s infinite;
        }
      `}</style>
    </div>
  );
};

export default DestinationOverview;
