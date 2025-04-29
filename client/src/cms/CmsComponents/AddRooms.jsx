// src/CmsComponents/AddRooms.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

const AddRooms = ({ initialRooms = [] }) => {
  // -- State for existing rooms (cards) --
  const [rooms, setRooms] = useState(initialRooms);

  // -- Modal visibility --
  const [showModal, setShowModal] = useState(false);

  // -- Edit mode state --
  const [editMode, setEditMode] = useState(false);
  const [editRoomId, setEditRoomId] = useState(null);

  // -- Basic Info Fields --
  const [roomName, setRoomName] = useState("");
  const [disableRoom, setDisableRoom] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [title, setTitle] = useState("");

  // -- Room Only (EP) fields --
  const [roomOnlyAnyday, setRoomOnlyAnyday] = useState("");
  const [roomOnlyCGST, setRoomOnlyCGST] = useState("");
  const [roomOnlyIGST, setRoomOnlyIGST] = useState("");
  const [roomOnlySGST, setRoomOnlySGST] = useState("");
  const [roomOnlySpecialPrice, setRoomOnlySpecialPrice] = useState([]);

  // -- Extra Beds (Room Only) fields --
  const [extraBedRoomOnlySpecialPrice, setExtraBedRoomOnlySpecialPrice] =
    useState([]);

  // -- Room + Breakfast (CP) fields --
  const [roomBreakfastAnyday, setRoomBreakfastAnyday] = useState("");
  const [roomBreakfastCGST, setRoomBreakfastCGST] = useState("");
  const [roomBreakfastIGST, setRoomBreakfastIGST] = useState("");
  const [roomBreakfastSGST, setRoomBreakfastSGST] = useState("");
  const [roomBreakfastSpecialPrice, setRoomBreakfastSpecialPrice] = useState([]);

  // -- Extra Beds (Room + Breakfast) fields --
  const [extraBedBreakfastSpecialPrice, setExtraBedBreakfastSpecialPrice] =
    useState([]);

  // -- Room + All Meals (AP) fields --
  const [roomAllMealsAnyday, setRoomAllMealsAnyday] = useState("");
  const [roomAllMealsCGST, setRoomAllMealsCGST] = useState("");
  const [roomAllMealsIGST, setRoomAllMealsIGST] = useState("");
  const [roomAllMealsSGST, setRoomAllMealsSGST] = useState("");
  const [roomAllMealsSpecialPrice, setRoomAllMealsSpecialPrice] = useState([]);

  // -- Extra Beds (Room + All Meals) fields --
  const [extraBedAllMealsSpecialPrice, setExtraBedAllMealsSpecialPrice] =
    useState([]);

  // -- Room Preferences checkboxes --
  const [preferences, setPreferences] = useState({
    pet: false,
    pureVeg: false,
    specialOccasion: false,
    alcohol: false,
    infant: false,
    seniorCitizen: false,
  });

  // -- Amenities, note, extra bed availability --
  const [roomAmenities, setRoomAmenities] = useState("");
  const [note, setNote] = useState("");
  const [extraBedAvailable, setExtraBedAvailable] = useState(false);
  const [numExtraBeds, setNumExtraBeds] = useState("");

  // -- Room Images --
  const [roomImages, setRoomImages] = useState([]);

  // -- Global Tax fields (if needed) --
  const [taxCGST, setTaxCGST] = useState("");
  const [taxIGST, setTaxIGST] = useState("");
  const [taxSGST, setTaxSGST] = useState("");

  // -- Handlers for "Add More" special price fields --
  const handleAddRoomOnlySpecialPrice = () => {
    setRoomOnlySpecialPrice([...roomOnlySpecialPrice, ""]);
  };
  const handleRoomOnlySpecialPriceChange = (value, index) => {
    const updated = [...roomOnlySpecialPrice];
    updated[index] = value;
    setRoomOnlySpecialPrice(updated);
  };

  const handleAddExtraBedRoomOnlySpecialPrice = () => {
    setExtraBedRoomOnlySpecialPrice([...extraBedRoomOnlySpecialPrice, ""]);
  };
  const handleExtraBedRoomOnlySpecialPriceChange = (value, index) => {
    const updated = [...extraBedRoomOnlySpecialPrice];
    updated[index] = value;
    setExtraBedRoomOnlySpecialPrice(updated);
  };

  // For Room + Breakfast
  const handleAddRoomBreakfastSpecialPrice = () => {
    setRoomBreakfastSpecialPrice([...roomBreakfastSpecialPrice, ""]);
  };
  const handleRoomBreakfastSpecialPriceChange = (value, index) => {
    const updated = [...roomBreakfastSpecialPrice];
    updated[index] = value;
    setRoomBreakfastSpecialPrice(updated);
  };

  const handleAddExtraBedBreakfastSpecialPrice = () => {
    setExtraBedBreakfastSpecialPrice([...extraBedBreakfastSpecialPrice, ""]);
  };
  const handleExtraBedBreakfastSpecialPriceChange = (value, index) => {
    const updated = [...extraBedBreakfastSpecialPrice];
    updated[index] = value;
    setExtraBedBreakfastSpecialPrice(updated);
  };

  // For Room + All Meals
  const handleAddRoomAllMealsSpecialPrice = () => {
    setRoomAllMealsSpecialPrice([...roomAllMealsSpecialPrice, ""]);
  };
  const handleRoomAllMealsSpecialPriceChange = (value, index) => {
    const updated = [...roomAllMealsSpecialPrice];
    updated[index] = value;
    setRoomAllMealsSpecialPrice(updated);
  };

  const handleAddExtraBedAllMealsSpecialPrice = () => {
    setExtraBedAllMealsSpecialPrice([...extraBedAllMealsSpecialPrice, ""]);
  };
  const handleExtraBedAllMealsSpecialPriceChange = (value, index) => {
    const updated = [...extraBedAllMealsSpecialPrice];
    updated[index] = value;
    setExtraBedAllMealsSpecialPrice(updated);
  };

  // -- Room Preferences checkbox handler --
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // -- Open Modal for Add Room --
  const handleAddRoomClick = () => {
    resetForm();
    setEditMode(false);
    setEditRoomId(null);
    setShowModal(true);
  };

  // -- Open Modal for Edit Room --
  const handleEditClick = (room) => {
    setEditMode(true);
    setEditRoomId(room.id);
    // Populate form fields with room data from seed mapping:
    setRoomName(room.name || ""); // Use seed's "name" field
    setDisableRoom(room.disableRoom || false);
    setFromDate(room.fromDate || "");
    setToDate(room.toDate || "");
    setTitle(room.title || "");
    setRoomOnlyAnyday(room.roomOnly?.anyday || "");
    setRoomOnlyCGST(room.roomOnly?.cgst || "");
    setRoomOnlyIGST(room.roomOnly?.igst || "");
    setRoomOnlySGST(room.roomOnly?.sgst || "");
    setRoomOnlySpecialPrice(room.roomOnly?.specialPrices || []);
    setExtraBedRoomOnlySpecialPrice(room.extraBedRoomOnly?.specialPrices || []);
    setRoomBreakfastAnyday(room.roomBreakfast?.anyday || "");
    setRoomBreakfastCGST(room.roomBreakfast?.cgst || "");
    setRoomBreakfastIGST(room.roomBreakfast?.igst || "");
    setRoomBreakfastSGST(room.roomBreakfast?.sgst || "");
    setRoomBreakfastSpecialPrice(room.roomBreakfast?.specialPrices || []);
    setExtraBedBreakfastSpecialPrice(room.extraBedBreakfast?.specialPrices || []);
    setRoomAllMealsAnyday(room.roomAllMeals?.anyday || "");
    setRoomAllMealsCGST(room.roomAllMeals?.cgst || "");
    setRoomAllMealsIGST(room.roomAllMeals?.igst || "");
    setRoomAllMealsSGST(room.roomAllMeals?.sgst || "");
    setRoomAllMealsSpecialPrice(room.roomAllMeals?.specialPrices || []);
    setExtraBedAllMealsSpecialPrice(room.extraBedAllMeals?.specialPrices || []);
    setPreferences(
      room.preferences || {
        pet: false,
        pureVeg: false,
        specialOccasion: false,
        alcohol: false,
        infant: false,
        seniorCitizen: false,
      }
    );
    // Map seed's amenities (array) to a string – if it's an array, join with commas.
    setRoomAmenities(
      Array.isArray(room.amenities)
        ? room.amenities.join(", ")
        : room.amenities || ""
    );
    setNote(room.note || "");
    setExtraBedAvailable(room.extraBedAvailable || false);
    setNumExtraBeds(room.numExtraBeds || "");
    // Use seed's "images" field instead of roomImages
    setRoomImages(room.images || []);
    setTaxCGST(room.globalTax?.cgst || "");
    setTaxIGST(room.globalTax?.igst || "");
    setTaxSGST(room.globalTax?.sgst || "");
    setShowModal(true);
  };

  // -- Close Modal & reset form --
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // -- Image Upload --
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    // Append new images to current room images
    setRoomImages((prev) => [...prev, ...urls]);
  };

  // -- Save New Room or Update Existing Room --
  const handleSaveRoom = () => {
    if (!roomName.trim()) return;

    const roomData = {
      name: roomName, // Save as "name" for seed mapping
      disableRoom,
      fromDate,
      toDate,
      title,
      roomOnly: {
        anyday: roomOnlyAnyday,
        cgst: roomOnlyCGST,
        igst: roomOnlyIGST,
        sgst: roomOnlySGST,
        specialPrices: roomOnlySpecialPrice,
      },
      extraBedRoomOnly: {
        specialPrices: extraBedRoomOnlySpecialPrice,
      },
      roomBreakfast: {
        anyday: roomBreakfastAnyday,
        cgst: roomBreakfastCGST,
        igst: roomBreakfastIGST,
        sgst: roomBreakfastSGST,
        specialPrices: roomBreakfastSpecialPrice,
      },
      extraBedBreakfast: {
        specialPrices: extraBedBreakfastSpecialPrice,
      },
      roomAllMeals: {
        anyday: roomAllMealsAnyday,
        cgst: roomAllMealsCGST,
        igst: roomAllMealsIGST,
        sgst: roomAllMealsSGST,
        specialPrices: roomAllMealsSpecialPrice,
      },
      extraBedAllMeals: {
        specialPrices: extraBedAllMealsSpecialPrice,
      },
      preferences,
      // Save amenities as provided
      amenities: roomAmenities,
      note,
      extraBedAvailable,
      numExtraBeds,
      // Save images from seed mapping
      images: roomImages,
      globalTax: {
        cgst: taxCGST,
        igst: taxIGST,
        sgst: taxSGST,
      },
    };

    if (editMode && editRoomId) {
      // Update existing room
      setRooms((prev) =>
        prev.map((room) =>
          room.id === editRoomId ? { id: editRoomId, ...roomData } : room
        )
      );
    } else {
      // Add new room with generated id
      const newRoom = { id: Date.now().toString(), ...roomData };
      setRooms((prev) => [...prev, newRoom]);
    }

    handleCloseModal();
  };

  // -- Reset form fields --
  const resetForm = () => {
    setRoomName("");
    setDisableRoom(false);
    setFromDate("");
    setToDate("");
    setTitle("");

    setRoomOnlyAnyday("");
    setRoomOnlyCGST("");
    setRoomOnlyIGST("");
    setRoomOnlySGST("");
    setRoomOnlySpecialPrice([]);

    setExtraBedRoomOnlySpecialPrice([]);

    setRoomBreakfastAnyday("");
    setRoomBreakfastCGST("");
    setRoomBreakfastIGST("");
    setRoomBreakfastSGST("");
    setRoomBreakfastSpecialPrice([]);

    setExtraBedBreakfastSpecialPrice([]);

    setRoomAllMealsAnyday("");
    setRoomAllMealsCGST("");
    setRoomAllMealsIGST("");
    setRoomAllMealsSGST("");
    setRoomAllMealsSpecialPrice([]);

    setExtraBedAllMealsSpecialPrice([]);

    setPreferences({
      pet: false,
      pureVeg: false,
      specialOccasion: false,
      alcohol: false,
      infant: false,
      seniorCitizen: false,
    });
    setRoomAmenities("");
    setNote("");
    setExtraBedAvailable(false);
    setNumExtraBeds("");
    setRoomImages([]);
    setTaxCGST("");
    setTaxIGST("");
    setTaxSGST("");
    setEditMode(false);
    setEditRoomId(null);
  };

  // -- Delete a room card --
  const handleDeleteRoom = (id) => {
    setRooms((prev) => prev.filter((room) => room.id !== id));
  };

  return (
    <div className="p-6">
      {/* Heading & Add Button */}
      <div className="flex items-center space-x-4">
        <h2 className="text-[22px] font-semibold">Add rooms</h2>
        <button
          type="button"
          onClick={handleAddRoomClick}
          className="bg-pink-100 text-pink-500 text-[16px] font-medium px-5 py-2.5 rounded-lg border border-pink-500 hover:bg-pink-200"
        >
          Add rooms
        </button>
      </div>

      {/* Room Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
          >
            {room.images && room.images.length > 0 && (
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-[150px] object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-[18px] font-medium text-gray-800">
                {room.name}
              </h3>
              {room.title && (
                <p className="text-sm text-gray-500 mt-1">{room.title}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">Price: ₹{room.price}</p>
              {room.amenities && (
                <p className="text-sm text-gray-500 mt-1">
                  Amenities: {room.amenities}
                </p>
              )}
              <div className="flex space-x-3 mt-3 text-gray-500">
                <FiEdit
                  onClick={() => handleEditClick(room)}
                  className="cursor-pointer hover:text-gray-700 text-[18px]"
                />
                <FiTrash2
                  onClick={() => handleDeleteRoom(room.id)}
                  className="cursor-pointer hover:text-red-500 text-[18px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg relative overflow-y-auto max-h-[90vh]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-[22px] font-bold mb-4">
                {editMode ? "Edit Room" : "Add Rooms"}
              </h2>

              {/* BASIC INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 text-sm mb-1">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
                    placeholder="E.g. Executive Suite"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <label className="font-semibold text-gray-700 text-sm">
                    Disable Room
                  </label>
                  <input
                    type="checkbox"
                    checked={disableRoom}
                    onChange={(e) => setDisableRoom(e.target.checked)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 text-sm mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 text-sm mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex flex-col sm:col-span-2">
                  <label className="font-semibold text-gray-700 text-sm mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
                    placeholder="E.g. A beautiful room with garden view"
                  />
                </div>
              </div>

              {/* ROOM ONLY (EP) */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">Room Only (EP)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Anyday</label>
                    <input
                      type="number"
                      value={roomOnlyAnyday}
                      onChange={(e) => setRoomOnlyAnyday(e.target.value)}
                      placeholder="e.g. 1500"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">CGST%</label>
                    <input
                      type="number"
                      value={roomOnlyCGST}
                      onChange={(e) => setRoomOnlyCGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">IGST%</label>
                    <input
                      type="number"
                      value={roomOnlyIGST}
                      onChange={(e) => setRoomOnlyIGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">SGST%</label>
                    <input
                      type="number"
                      value={roomOnlySGST}
                      onChange={(e) => setRoomOnlySGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                {/* Special Price array */}
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Price
                  </label>
                  {roomOnlySpecialPrice.map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleRoomOnlySpecialPriceChange(e.target.value, idx)
                      }
                      placeholder="e.g. 1200"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddRoomOnlySpecialPrice}
                    className="text-pink-600 text-sm"
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* EXTRA BEDS (ROOM ONLY) */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">
                  Extra Beds (Room Only - EP)
                </h3>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Price
                  </label>
                  {extraBedRoomOnlySpecialPrice.map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleExtraBedRoomOnlySpecialPriceChange(
                          e.target.value,
                          idx
                        )
                      }
                      placeholder="e.g. 700"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddExtraBedRoomOnlySpecialPrice}
                    className="text-pink-600 text-sm"
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* ROOM + BREAKFAST (CP) */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">Room + Breakfast (CP)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Anyday</label>
                    <input
                      type="number"
                      value={roomBreakfastAnyday}
                      onChange={(e) => setRoomBreakfastAnyday(e.target.value)}
                      placeholder="e.g. 2000"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">CGST%</label>
                    <input
                      type="number"
                      value={roomBreakfastCGST}
                      onChange={(e) => setRoomBreakfastCGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">IGST%</label>
                    <input
                      type="number"
                      value={roomBreakfastIGST}
                      onChange={(e) => setRoomBreakfastIGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">SGST%</label>
                    <input
                      type="number"
                      value={roomBreakfastSGST}
                      onChange={(e) => setRoomBreakfastSGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                {/* Special Price array */}
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Price
                  </label>
                  {roomBreakfastSpecialPrice.map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleRoomBreakfastSpecialPriceChange(
                          e.target.value,
                          idx
                        )
                      }
                      placeholder="e.g. 1800"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddRoomBreakfastSpecialPrice}
                    className="text-pink-600 text-sm"
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* EXTRA BEDS (ROOM + BREAKFAST) */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">
                  Extra Beds (Room + Breakfast - CP)
                </h3>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Price
                  </label>
                  {extraBedBreakfastSpecialPrice.map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleExtraBedBreakfastSpecialPriceChange(
                          e.target.value,
                          idx
                        )
                      }
                      placeholder="e.g. 900"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddExtraBedBreakfastSpecialPrice}
                    className="text-pink-600 text-sm"
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* ROOM + ALL MEALS (AP) */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">Room + All Meals (AP)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Anyday</label>
                    <input
                      type="number"
                      value={roomAllMealsAnyday}
                      onChange={(e) => setRoomAllMealsAnyday(e.target.value)}
                      placeholder="e.g. 2500"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">CGST%</label>
                    <input
                      type="number"
                      value={roomAllMealsCGST}
                      onChange={(e) => setRoomAllMealsCGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">IGST%</label>
                    <input
                      type="number"
                      value={roomAllMealsIGST}
                      onChange={(e) => setRoomAllMealsIGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">SGST%</label>
                    <input
                      type="number"
                      value={roomAllMealsSGST}
                      onChange={(e) => setRoomAllMealsSGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                {/* Special Price array */}
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Price
                  </label>
                  {roomAllMealsSpecialPrice.map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleRoomAllMealsSpecialPriceChange(e.target.value, idx)
                      }
                      placeholder="e.g. 2200"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddRoomAllMealsSpecialPrice}
                    className="text-pink-600 text-sm"
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* EXTRA BEDS (ROOM + ALL MEALS) */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">
                  Extra Beds (Room + All Meals - AP)
                </h3>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Price
                  </label>
                  {extraBedAllMealsSpecialPrice.map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleExtraBedAllMealsSpecialPriceChange(
                          e.target.value,
                          idx
                        )
                      }
                      placeholder="e.g. 1000"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddExtraBedAllMealsSpecialPrice}
                    className="text-pink-600 text-sm"
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* ROOM PREFERENCES */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">Room Preferences</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(preferences).map((key) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={key}
                        checked={preferences[key]}
                        onChange={handlePreferenceChange}
                      />
                      <span className="text-sm capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* AMENITIES, NOTE, EXTRA BED INFO */}
              <div className="border-t pt-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      Room amenities
                    </label>
                    <textarea
                      rows={2}
                      value={roomAmenities}
                      onChange={(e) => setRoomAmenities(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="E.g. TV, Wifi, AC..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Note</label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="E.g. 'Room + Breakfast, Floor 1, Garden view'"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <label className="text-sm font-medium">
                    Extra bed availability?
                  </label>
                  <input
                    type="checkbox"
                    checked={extraBedAvailable}
                    onChange={(e) => setExtraBedAvailable(e.target.checked)}
                  />
                </div>
                {extraBedAvailable && (
                  <div className="mt-2">
                    <label className="text-sm font-medium">
                      No. of Extra bed available
                    </label>
                    <input
                      type="number"
                      value={numExtraBeds}
                      onChange={(e) => setNumExtraBeds(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm ml-2 w-24"
                    />
                  </div>
                )}
              </div>

              {/* ROOM IMAGES */}
              <div className="border-t pt-4 mb-4">
                <label className="text-sm font-medium mb-1 block">
                  Room Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-sm"
                />
              </div>

              {/* GLOBAL TAX FIELDS */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">Tax</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">CGST%</label>
                    <input
                      type="number"
                      value={taxCGST}
                      onChange={(e) => setTaxCGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">IGST%</label>
                    <input
                      type="number"
                      value={taxIGST}
                      onChange={(e) => setTaxIGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">SGST%</label>
                    <input
                      type="number"
                      value={taxSGST}
                      onChange={(e) => setTaxSGST(e.target.value)}
                      placeholder="e.g. 8"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* SAVE / CANCEL BUTTONS */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveRoom}
                  className="px-4 py-2 bg-pink-500 text-white rounded text-sm hover:bg-pink-600"
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddRooms;
