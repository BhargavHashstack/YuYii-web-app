import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";





export default function Bookingcard() {
  // State Variables

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState([
    { roomType: "King", amenities: [], adults: 0, children: 0, guests: 1, guestAges: [] },
  ]);
  
  const [total, setTotal] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const navigate = useNavigate();
  
  // Pricing based on Room Type
  const roomPrices = {
    King: 5000,
    Suite: 8000,
    Deluxe: 7000,
    Standard: 4000,
  };

  // Amenity Prices
  const amenityPrices = {
    WiFi: 500,
    Breakfast: 1000,
    Parking: 700,
    Pool: 1200,
  };

  // Initialize Check-in and Check-out Dates
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    setCheckIn(today);
    setCheckOut(tomorrow);
  }, []);

  // Calculate Total Cost
  useEffect(() => {
    const totalCost = rooms.reduce((acc, room) => {
      const daysStayed =
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24) || 1; // Minimum 1 day
      const roomCost = roomPrices[room.roomType] || 0;
      const amenityCost = room.amenities.reduce(
        (acc, amenity) => acc + amenityPrices[amenity],
        0
      );
      const guestCost = room.guests * 200; // Example cost per guest
      return acc + daysStayed * (roomCost + amenityCost) + guestCost;
    }, 0);

    setTotal(totalCost);
  }, [checkIn, checkOut, rooms]);

  const handleAddRoom = () => {
    setRooms([
      ...rooms,
      { roomType: "King", amenities: [], adults: 0, children: 0, guests: 1, guestAges: [] },
    ]);
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  const handleAmenityChange = (roomIndex, amenity) => {
    setRooms((prev) =>
      prev.map((room, index) =>
        index === roomIndex
          ? {
              ...room,
              amenities: room.amenities.includes(amenity)
                ? room.amenities.filter((item) => item !== amenity)
                : [...room.amenities, amenity],
            }
          : room
      )
    );
  };

  const handleGuestAgeChange = (roomIndex, guestIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].guestAges[guestIndex] = age;
    setRooms(updatedRooms);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        checkIn,
        checkOut,
        rooms,
        total,
      },
    });
  };

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md border">
      {/* Price Section */}
      <div className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <span className="text-2xl font-bold">₹ {total}</span>
        <span className="text-gray-500 text-sm">Total</span>
      </div>
      <hr className="mb-4" />

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="space-y-4">
        {/* Check-In and Check-Out Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>
        {/* Room Section */}
        {rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="border-b-2 pb-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Room {roomIndex + 1}</h3>
              {rooms.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRoom(roomIndex)}
                  className="text-black bg-pink-100 border border-black rounded-md p-2 hover:bg-pink-600 hover:border border-black"
                >
                  Remove Room
                </button>
              )}
            </div>
            {/* Room Type */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Room Type</label>
              <select
                value={room.roomType}
                onChange={(e) => {
                  const updatedRooms = [...rooms];
                  updatedRooms[roomIndex].roomType = e.target.value;
                  setRooms(updatedRooms);
                }}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {Object.keys(roomPrices).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Guests</label>
              <input
                type="number"
                value={room.guests}
                min="1"
                onChange={(e) => {
                  const updatedRooms = [...rooms];
                  updatedRooms[roomIndex].guests = Number(e.target.value);
                  setRooms(updatedRooms);
                }}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {room.guests > 1 && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-gray-600 text-sm">Number of Adults</label>
                    <input
                      type="number"
                      value={room.adults}
                      min="0"
                      onChange={(e) => {
                        const updatedRooms = [...rooms];
                        updatedRooms[roomIndex].adults = Number(e.target.value);
                        setRooms(updatedRooms);
                      }}
                      className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">Number of Children</label>
                    <input
                      type="number"
                      value={room.children}
                      min="0"
                      onChange={(e) => {
                        const updatedRooms = [...rooms];
                        updatedRooms[roomIndex].children = Number(e.target.value);
                        setRooms(updatedRooms);
                      }}
                      className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>

                  {/* Age Fields for Each Guest */}
                  {room.guests > 0 && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Guest Ages</h4>
                      {Array.from({ length: room.guests }).map((_, guestIndex) => (
                        <div key={guestIndex} className="mt-2">
                          <label className="block text-gray-600 text-sm">
                            Age of Guest {guestIndex + 1}
                          </label>
                          <input
                            type="number"
                            placeholder="Enter age"
                            value={room.guestAges[guestIndex] || ""}
                            onChange={(e) =>
                              handleGuestAgeChange(roomIndex, guestIndex, e.target.value)
                            }
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        

        {/* Breakdown */}
        <p
          onClick={toggleBreakdown}
          className="text-sm text-gray-500 mt-2 cursor-pointer"
        >
          <span className="font-bold">See Breakdown..</span>..
        </p>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-500 transition"
        >
          Book Now
        </button>
      </form>

      {/* Breakdown Modal */}
      {showBreakdown && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold">Invoice Breakdown</h3>
          {rooms.map((room, index) => (
            <div key={index} className="mt-2">
              <h4 className="font-medium">Room {index + 1}: {room.roomType}</h4>
              <ul>
                <li>Room Cost: ₹{roomPrices[room.roomType]}</li>
                <li>Amenities: ₹{room.amenities.reduce(
                  (acc, amenity) => acc + amenityPrices[amenity],
                  0
                )}</li>
                <li>Guest Cost: ₹{room.guests * 200}</li>
                <li>Guest Ages: {room.guestAges.join(", ")}</li>
              </ul>
            </div>
          ))}
          <div className="mt-4 font-bold">
            Total: ₹{total}
          </div>
        </div>
      )}
    </div>
  );
}
