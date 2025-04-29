import React from "react";

const RatingCard = ({ expertName, ratings }) => {
  return (
    <div className="bg-pink-500 text-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">Rating by Travel Expert {expertName}</h3>
      <ul className="space-y-1">
        {ratings.map((rating) => (
          <li key={rating.category} className="flex justify-between">
            <span>{rating.category}</span>
            <span>{"★".repeat(rating.stars)}{"☆".repeat(5 - rating.stars)}</span>
          </li>
        ))}
      </ul>
      <a href="#" className="text-sm underline mt-2 inline-block">View Details</a>
    </div>
  );
};

export default RatingCard;
<RatingCard
  expertName="Sakshi Gandhi"
  ratings={[
    { category: "Overall", stars: 4 },
    { category: "Location", stars: 5 },
    { category: "Rooms", stars: 4 },
    { category: "Property", stars: 5 },
    { category: "Cleanliness", stars: 4 },
  ]}
/>
