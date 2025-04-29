import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Slide-in variants for each modal
const modalVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

export default function PackagesSection() {
  // Control each modal
  const [showMealModal, setShowMealModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showPopularModal, setShowPopularModal] = useState(false);

  /* ----------------------------------------------------
   * 1) Meal Package States
   * ---------------------------------------------------- */
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealAdultPrice, setMealAdultPrice] = useState("");
  const [mealTeenPrice, setMealTeenPrice] = useState("");

  // Save meal package
  const handleSaveMeal = () => {
    console.log("Saving Meal Package:", {
      mealName,
      mealType,
      adultPrice: mealAdultPrice,
      teenPrice: mealTeenPrice,
    });
    setShowMealModal(false);
  };

  /* ----------------------------------------------------
   * 2) Activity Package States
   * ---------------------------------------------------- */
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityDayOfWeek, setActivityDayOfWeek] = useState("Anyday");
  const [activityAdultPrice, setActivityAdultPrice] = useState("");
  const [activityTeenPrice, setActivityTeenPrice] = useState("");

  // Save activity package
  const handleSaveActivity = () => {
    console.log("Saving Activity Package:", {
      activityName,
      activityType,
      dayOfWeek: activityDayOfWeek,
      adultPrice: activityAdultPrice,
      teenPrice: activityTeenPrice,
    });
    setShowActivityModal(false);
  };

  /* ----------------------------------------------------
   * 3) Popular Package States
   * ---------------------------------------------------- */
  const [popularName, setPopularName] = useState("");
  const [popularPrice, setPopularPrice] = useState("");
  const [popularNights, setPopularNights] = useState("");
  const [popularFrom, setPopularFrom] = useState("");
  const [popularTo, setPopularTo] = useState("");
  const [popularInfo, setPopularInfo] = useState("");
  const [popularRooms, setPopularRooms] = useState("");
  const [popularMeals, setPopularMeals] = useState("");

  // For uploading an image (single example)
  const [popularImage, setPopularImage] = useState(null);
  const handlePopularImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPopularImage(URL.createObjectURL(file));
    }
  };

  // Save popular package
  const handleSavePopular = () => {
    console.log("Saving Popular Package:", {
      name: popularName,
      price: popularPrice,
      nights: popularNights,
      fromDate: popularFrom,
      toDate: popularTo,
      info: popularInfo,
      availableRooms: popularRooms,
      availableMeals: popularMeals,
      image: popularImage,
    });
    setShowPopularModal(false);
  };

  /* ----------------------------------------------------
   * Render
   * ---------------------------------------------------- */
  return (
    <div className="p-4 bg-white space-y-6 max-w-6xl mx-auto">
      {/* Row 1: Meal Packages */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-md font-semibold">Add Meal Packages</h2>
          <button
            type="button"
            onClick={() => setShowMealModal(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Add Meal Package
          </button>
        </div>
        <button
          type="button"
          onClick={() => console.log("Saving meal packages...")}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Save
        </button>
      </div>

      <hr />

      {/* Row 2: Activity Packages */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-md font-semibold">Add Activity Packages</h2>
          <button
            type="button"
            onClick={() => setShowActivityModal(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Add Activity Package
          </button>
        </div>
        <button
          type="button"
          onClick={() => console.log("Saving activity packages...")}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Save
        </button>
      </div>

      <hr />

      {/* Row 3: Popular Packages */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-md font-semibold">Add Popular Packages</h2>
          <button
            type="button"
            onClick={() => setShowPopularModal(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Add Popular Package
          </button>
        </div>
        <button
          type="button"
          onClick={() => console.log("Saving popular packages...")}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Save
        </button>
      </div>

      {/* AnimatePresence for all three modals */}
      <AnimatePresence>
        {/* 1) Meal Package Modal */}
        {showMealModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-1/2 md:w-1/3 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Add Meal Packages</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowMealModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Meal Name */}
                <div>
                  <label className="block font-semibold mb-1">Meal Name *</label>
                  <input
                    type="text"
                    placeholder="Eg: Lunch"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                {/* Meal Type */}
                <div>
                  <label className="block font-semibold mb-1">Meal Type *</label>
                  <input
                    type="text"
                    placeholder="Eg: Buffet"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-500">
                * Meal name should define meal like Lunch/Dinner/Breakfast + One
                Meal, All Meals etc.
              </p>

              {/* Age wise pricing */}
              <h4 className="font-semibold mt-4">Add age wise pricing</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Adults</label>
                  <input
                    type="text"
                    placeholder="Eg: 1500"
                    value={mealAdultPrice}
                    onChange={(e) => setMealAdultPrice(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Teenager</label>
                  <input
                    type="text"
                    placeholder="Eg: 1500"
                    value={mealTeenPrice}
                    onChange={(e) => setMealTeenPrice(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={handleSaveMeal}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}

        {/* 2) Activity Package Modal */}
        {showActivityModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-1/2 md:w-1/3 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Add Activity Packages</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowActivityModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Activity Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Activity Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Horse Riding"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                {/* Activity Type */}
                <div>
                  <label className="block font-semibold mb-1">
                    Activity Type *
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: indoor activity"
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Day Of Week */}
              <div>
                <label className="block font-semibold mb-1">Day Of Week *</label>
                <select
                  value={activityDayOfWeek}
                  onChange={(e) => setActivityDayOfWeek(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                >
                  <option value="Anyday">Anyday</option>
                  <option value="Weekday">Weekday</option>
                  <option value="Weekend">Weekend</option>
                </select>
              </div>

              {/* Age wise pricing */}
              <h4 className="font-semibold mt-4">Add age wise pricing</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Adults</label>
                  <input
                    type="text"
                    placeholder="Eg: 1500"
                    value={activityAdultPrice}
                    onChange={(e) => setActivityAdultPrice(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Teenager</label>
                  <input
                    type="text"
                    placeholder="Eg: 1500"
                    value={activityTeenPrice}
                    onChange={(e) => setActivityTeenPrice(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={handleSaveActivity}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}

        {/* 3) Popular Package Modal */}
        {showPopularModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white h-screen shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Add Popular package</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowPopularModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Package Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Royalty Package"
                    value={popularName}
                    onChange={(e) => setPopularName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                {/* Price */}
                <div>
                  <label className="block font-semibold mb-1">Price *</label>
                  <input
                    type="text"
                    placeholder="Eg: 2000"
                    value={popularPrice}
                    onChange={(e) => setPopularPrice(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                {/* How many nights */}
                <div>
                  <label className="block font-semibold mb-1">
                    How many nights *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={popularNights}
                    onChange={(e) => setPopularNights(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* From / To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">From *</label>
                  <input
                    type="date"
                    placeholder="eg: 03/30/2019"
                    value={popularFrom}
                    onChange={(e) => setPopularFrom(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">To *</label>
                  <input
                    type="date"
                    placeholder="eg: 03/30/2019"
                    value={popularTo}
                    onChange={(e) => setPopularTo(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Upload image */}
              <div>
                <label className="block font-semibold mb-1">Upload image</label>
                <label className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600">
                  Choose file
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePopularImageChange}
                  />
                </label>
                {popularImage && (
                  <div className="mt-4">
                    <img
                      src={popularImage}
                      alt="Preview"
                      className="w-48 h-32 object-cover border border-gray-300 rounded"
                    />
                  </div>
                )}
              </div>

              {/* Package Info */}
              <div>
                <label className="block font-semibold mb-1">Package Info</label>
                <div className="flex items-center space-x-4">
                  <textarea
                    rows={2}
                    placeholder="Add Info"
                    value={popularInfo}
                    onChange={(e) => setPopularInfo(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Available Rooms / Available Meals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">
                    Available Rooms
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Deluxe, Suite"
                    value={popularRooms}
                    onChange={(e) => setPopularRooms(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Available Meals
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Breakfast, Lunch"
                    value={popularMeals}
                    onChange={(e) => setPopularMeals(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={handleSavePopular}
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
