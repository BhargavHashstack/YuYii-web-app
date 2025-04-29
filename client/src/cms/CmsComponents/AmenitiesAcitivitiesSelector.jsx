import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Extended list of amenities (based on your screenshots and prior expansions).
const AMENITIES = [
  "Accessible by Lift",
  "Air Conditioning",
  "Alarm",
  "Ayurvedic Massage",
  "Balcony",
  "Barbeque",
  "Bathroom",
  "Bathroom amenities (free toiletries)",
  "Bathrobe",
  "Bathtub",
  "Bed Sheets",
  "Board Games",
  "Cable Television",
  "Car Rental",
  "Carroms",
  "Ceiling Fan",
  "Children crib/cots",
  "Closet",
  "Closets in room",
  "Coffee/Tea Maker",
  "Conference Hall",
  "Dental Kit",
  "Desk",
  "Dining",
  "Dishwasher",
  "Doctor on Call",
  "DTH",
  "Electric Kettle",
  "Entire unit wheelchair accessible",
  "Fan",
  "First Aid",
  "Fitness",
  "Footwear",
  "Hair Dryer",
  "Heater",
  "Hot Water",
  "In-room Dining",
  "In-room Safe",
  "Intercom",
  "Internet access",
  "Internet facilities",
  "Iron Box",
  "Jacuzzi",
  "Kitchen",
  "Large Table",
  "Library",
  "Lift",
  "Locker",
  "Microwave",
  "Mini Bar",
  "Mini fridge",
  "Mobile Connectivity",
  "Multi Cuisine Restaurant",
  "News Paper",
  "Nightclub/DJ",
  "Outdoor furniture",
  "Outdoor Pool",
  "Paper",
  "Parking",
  "Patio",
  "Pickup and Drop",
  "Power Backup",
  "Private Garden",
  "Private bathroom",
  "Radio",
  "Recliner Chair",
  "Room Service",
  "Safe",
  "Safe Deposit Box",
  "Sewing Kit",
  "Shaving Kit",
  "Shower",
  "Shuttlecock",
  "Snooker",
  "Sofa",
  "Sofa Bed",
  "Sound Proofing",
  "Spa",
  "Swimming Pool",
  "Tea",
  "Tea/Coffee Maker",
  "Telephone",
  "Terrace",
  "Tiled / Marble floor",
  "Toaster",
  "Towels",
  "TV",
  "Wakeup Service",
  "Wardrobe/Closet",
  "Wifi",
  "Wireless internet connection (Wifi)",
];

// Extended list of activities (from your latest screenshot).
const ACTIVITIES = [
  "Indoor Games",
  "Football",
  "Swimming",
  "Cycling",
  "Gymnasium",
  "Kayaking",
  "ATV Bike Ride",
  "Boating",
  "Riverside Picnic",
  "Riverside Celebrations",
  "Raft Dining",
  "Tunnel Dining",
  "Nature Trails",
  "Bird Watching",
  "Bicycle Ride",
  "Organic Farming",
  "Nature Safari",
  "Zipline",
  "Herbal Garden",
  "Horse Riding",
  "Farm",
  "Hi-Tea experience",
  "Tractor Ride",
  "Archery",
  "Petting Farm",
  "Trekking",
  "Star Gazing",
  "Bonfire",
  "Spa",
  "Candle light Dinner by the pool upon request",
  "Campfire",
  "Kids Play Area",
  "Decorations on Request",
  "Zorbing",
  "Cooking Classes",
  "Plantation Tour",
  "Greenhouse Visit",
  "Museum Tour",
  "Tea Factory Visit",
  "Bamboo Rafting",
  "Sundowner",
  "Movie under the Stars",
  "Proposal by the River",
  "Artisanal Cheesemaking",
  "Self discovery with Horses",
  "Gazebo Dining",
  "Outdoor Movie",
  "Movie On Raft",
  "Poolside Celebrations",
  "Rifle Shooting",
  "Jet Ski",
  "Aqua Cycling",
  "Polo",
  "Cricket",
];

const modalVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

export default function AmenitiesActivitiesSelector({
  initialAmenities = [],
  initialActivities = [],
}) {
  // Normalize items: if item is an object with "label", use that; else assume it's a string.
  const normalizeItems = (items) =>
    items.map((item) =>
      typeof item === "object" && item.label ? item.label : item
    );

  // Pre-check any amenities/activities found in the seed data
  const initialAmenityLabels = normalizeItems(initialAmenities);
  const initialActivityLabels = normalizeItems(initialActivities);

  const [selectedAmenities, setSelectedAmenities] = useState(initialAmenityLabels);
  const [selectedActivities, setSelectedActivities] = useState(initialActivityLabels);

  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);

  // Toggle amenity selection
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // Toggle activity selection
  const handleActivityChange = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="p-4 bg-gray-50">
      {/* Display currently selected amenities and activities (optional) */}
      <div className="mb-4">
        <h3 className="font-semibold">Selected Amenities:</h3>
        <p>{selectedAmenities.join(", ") || "None selected"}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Selected Activities:</h3>
        <p>{selectedActivities.join(", ") || "None selected"}</p>
      </div>

      {/* Amenities Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Amenities</h2>
        <button
          type="button"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          onClick={() => setShowAmenitiesModal(true)}
        >
          Choose Amenities
        </button>
      </div>

      {/* Activities Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Activities</h2>
        <button
          type="button"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          onClick={() => setShowActivitiesModal(true)}
        >
          Choose Activities
        </button>
      </div>

      {/* Amenities Modal */}
      <AnimatePresence>
        {showAmenitiesModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">Select Amenities</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAmenitiesModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pink-500"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activities Modal */}
      <AnimatePresence>
        {showActivitiesModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">Select Activities</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowActivitiesModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ACTIVITIES.map((activity) => (
                  <label
                    key={activity}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pink-500"
                      checked={selectedActivities.includes(activity)}
                      onChange={() => handleActivityChange(activity)}
                    />
                    <span>{activity}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
