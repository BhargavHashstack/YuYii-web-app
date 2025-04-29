// src/CmsComponents/RatingReviewSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple fade/slide transition for the modals
const modalVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

// Helper to parse JSON strings if needed
const parseJson = (data) => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return {};
    }
  }
  return data;
};

export default function RatingsReviewsSection({
  initialRating = {},
  initialExpertReview = {},
}) {
  // Toggles for guest reviews and expert review
  const [guestReviewsOn, setGuestReviewsOn] = useState(false);
  const [expertReviewOn, setExpertReviewOn] = useState(true);
  // Control modals
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Initialize rating states (all as strings)
  const [overall, setOverall] = useState("");
  const [location, setLocation] = useState("");
  const [roomSpace, setRoomSpace] = useState("");
  const [roomDesign, setRoomDesign] = useState("");
  const [roomAmenities, setRoomAmenities] = useState("");
  const [roomView, setRoomView] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [propertyGreenery, setPropertyGreenery] = useState("");
  const [propertyAmenities, setPropertyAmenities] = useState("");
  const [propertyBeauty, setPropertyBeauty] = useState("");
  const [cleanlinessRooms, setCleanlinessRooms] = useState("");
  const [cleanlinessBathrooms, setCleanlinessBathrooms] = useState("");
  const [cleanlinessDining, setCleanlinessDining] = useState("");
  const [cleanlinessStaff, setCleanlinessStaff] = useState("");
  const [foodTaste, setFoodTaste] = useState("");
  const [foodVariety, setFoodVariety] = useState("");
  const [foodUnique, setFoodUnique] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [serviceRoom, setServiceRoom] = useState("");
  const [serviceCourtesy, setServiceCourtesy] = useState("");
  const [hospitality, setHospitality] = useState("");
  const [valueFood, setValueFood] = useState("");
  const [valueRooms, setValueRooms] = useState("");

  // Initialize expert review states
  const [reviewName, setReviewName] = useState("");
  const [reviewExperience, setReviewExperience] = useState("");
  const [reviewHighlight, setReviewHighlight] = useState("");
  const [reviewIssues, setReviewIssues] = useState("");
  const [reviewTip, setReviewTip] = useState("");
  const [reviewPlace, setReviewPlace] = useState("");
  const [reviewPhoto, setReviewPhoto] = useState(null);
  const [reviewWebsite, setReviewWebsite] = useState("");
  const [reviewTwitter, setReviewTwitter] = useState("");
  const [reviewInstagram, setReviewInstagram] = useState("");
  const [reviewFacebook, setReviewFacebook] = useState("");
  const [reviewGallery, setReviewGallery] = useState([]);

  // Initialize rating states from initialRating
  useEffect(() => {
    const ratingData = parseJson(initialRating);
    setOverall(ratingData.overall ? ratingData.overall.toString() : "");
    setLocation(ratingData.location ? ratingData.location.toString() : "");
    setRoomSpace(ratingData.rooms?.space ? ratingData.rooms.space.toString() : "");
    setRoomDesign(ratingData.rooms?.design ? ratingData.rooms.design.toString() : "");
    setRoomAmenities(ratingData.rooms?.amenities ? ratingData.rooms.amenities.toString() : "");
    setRoomView(ratingData.rooms?.view ? ratingData.rooms.view.toString() : "");
    setPropertySize(ratingData.property?.size ? ratingData.property.size.toString() : "");
    setPropertyGreenery(ratingData.property?.greenery ? ratingData.property.greenery.toString() : "");
    setPropertyAmenities(ratingData.property?.amenities ? ratingData.property.amenities.toString() : "");
    // Assuming "architecture" holds beauty/architecture/landscaping data
    setPropertyBeauty(ratingData.property?.architecture ? ratingData.property.architecture.toString() : "");
    setCleanlinessRooms(ratingData.cleanliness?.rooms ? ratingData.cleanliness.rooms.toString() : "");
    setCleanlinessBathrooms(ratingData.cleanliness?.bathrooms ? ratingData.cleanliness.bathrooms.toString() : "");
    setCleanlinessDining(ratingData.cleanliness?.restaurant ? ratingData.cleanliness.restaurant.toString() : "");
    setCleanlinessStaff(ratingData.cleanliness?.staff ? ratingData.cleanliness.staff.toString() : "");
    setFoodTaste(ratingData.food?.taste ? ratingData.food.taste.toString() : "");
    setFoodVariety(ratingData.food?.variety ? ratingData.food.variety.toString() : "");
    setFoodUnique(ratingData.food?.unqiue ? ratingData.food.unqiue.toString() : "");
    setFoodQuantity(ratingData.food?.quantity ? ratingData.food.quantity.toString() : "");
    setServiceRoom(ratingData.service?.room_service ? ratingData.service.room_service.toString() : "");
    setServiceCourtesy(ratingData.service?.courtesy ? ratingData.service.courtesy.toString() : "");
    setHospitality(ratingData.hospitality ? ratingData.hospitality.toString() : "");
    setValueFood(ratingData.value?.food ? ratingData.value.food.toString() : "");
    setValueRooms(ratingData.value?.rooms ? ratingData.value.rooms.toString() : "");
  }, [initialRating]);

  // Initialize expert review states from initialExpertReview
  useEffect(() => {
    const expertData = parseJson(initialExpertReview);
    setReviewName(expertData.expert || "");
    setReviewExperience(expertData.experience || "");
    setReviewHighlight(expertData.highlight || "");
    setReviewIssues(expertData.improvements || "");
    setReviewTip(expertData.tip || "");
    setReviewPlace(expertData.location || "");
    setReviewPhoto(expertData.profile_picture || null);
    setReviewWebsite(expertData.website || "");
    setReviewTwitter(expertData.twitter || "");
    setReviewInstagram(expertData.instagram || "");
    setReviewFacebook(expertData.facebook || "");
    setReviewGallery(expertData.gallery || []);
  }, [initialExpertReview]);

  // Handlers for saving (for now, simply log to console)
  const handleSaveRatings = () => {
    const ratingsToSave = {
      overall,
      location,
      rooms: {
        space: roomSpace,
        design: roomDesign,
        amenities: roomAmenities,
        view: roomView,
      },
      property: {
        size: propertySize,
        greenery: propertyGreenery,
        amenities: propertyAmenities,
        architecture: propertyBeauty,
      },
      cleanliness: {
        rooms: cleanlinessRooms,
        bathrooms: cleanlinessBathrooms,
        restaurant: cleanlinessDining,
        staff: cleanlinessStaff,
      },
      food: {
        taste: foodTaste,
        variety: foodVariety,
        unqiue: foodUnique,
        quantity: foodQuantity,
      },
      service: {
        room_service: serviceRoom,
        courtesy: serviceCourtesy,
      },
      hospitality,
      value: {
        food: valueFood,
        rooms: valueRooms,
      },
    };
    console.log("Saving Ratings:", ratingsToSave);
    setShowRatingsModal(false);
  };

  const handleSaveReview = () => {
    const reviewToSave = {
      expert: reviewName,
      experience: reviewExperience,
      highlight: reviewHighlight,
      improvements: reviewIssues,
      tip: reviewTip,
      location: reviewPlace,
      profile_picture: reviewPhoto,
      website: reviewWebsite,
      twitter: reviewTwitter,
      instagram: reviewInstagram,
      facebook: reviewFacebook,
      gallery: reviewGallery,
    };
    console.log("Saving Expert Review:", reviewToSave);
    setShowReviewModal(false);
  };

  // Handlers for review photo and gallery
  const handleReviewPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleReviewGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      src: URL.createObjectURL(file),
    }));
    setReviewGallery((prev) => [...prev, ...newImages]);
  };

  const handleRemoveGalleryImage = (id) => {
    setReviewGallery((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="p-4 bg-white space-y-4 max-w-6xl mx-auto">
      {/* Row 1: Ratings by In house Experts */}
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold">Ratings by In house Experts</h2>
        <button
          type="button"
          className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
          onClick={() => setShowRatingsModal(true)}
        >
          Manage ratings
        </button>
      </div>

      {/* Guest Reviews toggle */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Guest Reviews</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={guestReviewsOn}
            onChange={(e) => setGuestReviewsOn(e.target.checked)}
          />
          <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-pink-500 transition-colors" />
        </label>
      </div>
      <hr className="my-2" />
      {/* Row 2: Expert review by Traveller */}
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold">Expert Review by Traveller</h2>
        <button
          type="button"
          className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
          onClick={() => setShowReviewModal(true)}
        >
          Manage review
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={expertReviewOn}
            onChange={(e) => setExpertReviewOn(e.target.checked)}
          />
          <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-pink-500 transition-colors" />
        </label>
      </div>

      <AnimatePresence>
        {showRatingsModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Ratings by In house Expert</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowRatingsModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto space-y-6">
              <div className="space-y-2">
                <label className="block font-semibold">Overall</label>
                <input
                  type="text"
                  value={overall}
                  onChange={(e) => setOverall(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />

                <label className="block font-semibold mt-4">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>

              <div>
                <h4 className="font-bold mb-2">Rooms</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Space</label>
                    <input
                      type="text"
                      value={roomSpace}
                      onChange={(e) => setRoomSpace(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">
                      Design, Décor and Lighting
                    </label>
                    <input
                      type="text"
                      value={roomDesign}
                      onChange={(e) => setRoomDesign(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Amenities</label>
                    <input
                      type="text"
                      value={roomAmenities}
                      onChange={(e) => setRoomAmenities(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">View</label>
                    <input
                      type="text"
                      value={roomView}
                      onChange={(e) => setRoomView(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Property</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Size</label>
                    <input
                      type="text"
                      value={propertySize}
                      onChange={(e) => setPropertySize(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Greenery</label>
                    <input
                      type="text"
                      value={propertyGreenery}
                      onChange={(e) => setPropertyGreenery(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Amenities</label>
                    <input
                      type="text"
                      value={propertyAmenities}
                      onChange={(e) => setPropertyAmenities(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">
                      Beauty, Architecture & Landscaping
                    </label>
                    <input
                      type="text"
                      value={propertyBeauty}
                      onChange={(e) => setPropertyBeauty(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Cleanliness</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Rooms</label>
                    <input
                      type="text"
                      value={cleanlinessRooms}
                      onChange={(e) => setCleanlinessRooms(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Bathrooms</label>
                    <input
                      type="text"
                      value={cleanlinessBathrooms}
                      onChange={(e) => setCleanlinessBathrooms(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Dining Area/Restaurant</label>
                    <input
                      type="text"
                      value={cleanlinessDining}
                      onChange={(e) => setCleanlinessDining(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Staff</label>
                    <input
                      type="text"
                      value={cleanlinessStaff}
                      onChange={(e) => setCleanlinessStaff(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Food</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Taste</label>
                    <input
                      type="text"
                      value={foodTaste}
                      onChange={(e) => setFoodTaste(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Variety</label>
                    <input
                      type="text"
                      value={foodVariety}
                      onChange={(e) => setFoodVariety(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Quirk/Unique/Local</label>
                    <input
                      type="text"
                      value={foodUnique}
                      onChange={(e) => setFoodUnique(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Quantity</label>
                    <input
                      type="text"
                      value={foodQuantity}
                      onChange={(e) => setFoodQuantity(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Service</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Room Service</label>
                    <input
                      type="text"
                      value={serviceRoom}
                      onChange={(e) => setServiceRoom(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Courtesy</label>
                    <input
                      type="text"
                      value={serviceCourtesy}
                      onChange={(e) => setServiceCourtesy(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Hospitality</h4>
                <input
                  type="text"
                  value={hospitality}
                  onChange={(e) => setHospitality(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>

              <div>
                <h4 className="font-bold mb-2">Value for Money</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Food</label>
                    <input
                      type="text"
                      value={valueFood}
                      onChange={(e) => setValueFood(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Rooms</label>
                    <input
                      type="text"
                      value={valueRooms}
                      onChange={(e) => setValueRooms(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mb-2 border-t flex justify-end">
              <button
                type="button"
                onClick={handleSaveRatings}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
        {showReviewModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Expert Review by Traveller</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowReviewModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Name of the friend</label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Place</label>
                  <input
                    type="text"
                    value={reviewPlace}
                    onChange={(e) => setReviewPlace(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload Traveler's Photo</label>
                <label className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600">
                  Choose file
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleReviewPhotoChange}
                  />
                </label>
                {reviewPhoto && (
                  <div className="mt-4">
                    <img
                      src={reviewPhoto}
                      alt="Traveler"
                      className="w-40 h-40 object-cover border border-gray-200 rounded"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Website</label>
                  <input
                    type="text"
                    value={reviewWebsite}
                    onChange={(e) => setReviewWebsite(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Twitter</label>
                  <input
                    type="text"
                    value={reviewTwitter}
                    onChange={(e) => setReviewTwitter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Instagram</label>
                  <input
                    type="text"
                    value={reviewInstagram}
                    onChange={(e) => setReviewInstagram(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Facebook</label>
                  <input
                    type="text"
                    value={reviewFacebook}
                    onChange={(e) => setReviewFacebook(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Experience</label>
                <textarea
                  rows={4}
                  value={reviewExperience}
                  onChange={(e) => setReviewExperience(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Highlight</label>
                <textarea
                  rows={3}
                  value={reviewHighlight}
                  onChange={(e) => setReviewHighlight(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Issues/Improvements</label>
                <textarea
                  rows={3}
                  value={reviewIssues}
                  onChange={(e) => setReviewIssues(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Tip</label>
                <textarea
                  rows={3}
                  value={reviewTip}
                  onChange={(e) => setReviewTip(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload Gallery Images</label>
                <label className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600">
                  Choose files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleReviewGalleryChange}
                  />
                </label>
                {reviewGallery.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {reviewGallery.map((img) => (
                      <div
                        key={img.id}
                        onDoubleClick={() => handleRemoveGalleryImage(img.id)}
                        className="relative cursor-pointer border-2 border-pink-300 p-1 rounded group"
                      >
                        <img
                          src={img.src}
                          alt="Gallery"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-40 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 mb-2 border-t flex justify-end">
              <button
                type="button"
                onClick={handleSaveReview}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
