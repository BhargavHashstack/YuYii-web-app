import React, { useState } from "react";
import Bookingcard from "./SelectedStayComponents/Bookingcard";
import ContentHeader from "./SelectedStayComponents/ContentHeader";

const stays = {
  "Bangalore Wilderness": {
    Overview: "Serene nature stay with luxurious rooms in Bangalore.",
    Amenities: "WiFi, pool, spa, concierge.",
    Rooms: "Spacious rooms with modern decor.",
    Location: "Heart of Bangalore near attractions.",
    Activities: "Hiking, yoga, cultural tours.",
    Review: "Highly rated by guests.",
    Availability: "Check availability for your dates.",
    FAQS: "FAQs about the stay.",
    price: 5000,
  },
  "Mumbai Retreat": {
    Overview: "Urban luxury in Mumbai.",
    Amenities: "Free breakfast, rooftop pool, gym.",
    Rooms: "Contemporary rooms with city views.",
    Location: "Close to South Mumbai attractions.",
    Activities: "Beach tours, heritage walks.",
    Review: "Known for excellent service.",
    Availability: "Rooms available year-round.",
    FAQS: "FAQs about the stay.",
    price: 6000,
  },
};

export default function StayDescription({ selectedStay }) {
  const [activeSection, setActiveSection] = useState("Overview");
  const stay = stays[selectedStay];
  const sections = Object.keys(stay).filter((section) => section !== "price");

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row p-4 bg-pink-50 lg:space-x-6">
        {/* Description Div */}
        <div className="content-description">
          <div className="mt-4">
            <p className="text-gray-800">{stay[activeSection]}</p>
          </div>
        </div>

        {/* Booking Div */}
        <div className="booking">
          <Bookingcard price={stay.price} />
        </div>
      </div>
    </div>
  );
}
