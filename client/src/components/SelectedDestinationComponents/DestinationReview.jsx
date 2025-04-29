import React from "react";

// Card Component
const ReviewCard = ({ review }) => {
  return (
    <div className="relative w-full max-w-3xl p-4">
      <div className="bg-pink-400 shadow-lg rounded-lg p-6 relative before:content-[''] before:absolute before:bottom-[-20px] before:left-1/2 before:w-10 before:h-10 before:transform before:rotate-45 before:bg-pink-400 before:shadow-lg before:-translate-x-1/2">
        <p className="text-center text-white text-lg font-medium">{review}</p>
      </div>
    </div>
  );
};

const DestinationReview = ({ review, reviewer, reviewerName, designation }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-8 p-4">
      {/* Review Card */}
      <ReviewCard review={review} />

      {/* Reviewer Details */}
      <div className="flex flex-col items-center mt-8">
        {/* Reviewer Image */}
        <img
          src={reviewer}
          alt={reviewerName}
          className="w-20 h-20 rounded-full object-cover border-2 border-pink-500"
        />
        {/* Reviewer Name */}
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {reviewerName}
        </h3>
        {/* Reviewer Designation */}
        <p className="text-gray-500 text-sm">{designation}</p>
      </div>
    </div>
  );
};

export default DestinationReview;
