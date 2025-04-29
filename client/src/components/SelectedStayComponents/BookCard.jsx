import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import BookCardGuestSelection from "../SelectedStayComponents/BookCardGuestSelection";
import BookCardDatePicker from "../SelectedStayComponents/BookCardDatePicker";
import TotalPriceComponent from "../SelectedStayComponents/TotalPriceBreakdown";

const BookCard = ({ stayDetails, selectedRooms,checkIn,checkOut, setCheckIn, setCheckOut }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  if (!stayDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Stay not found!</h1>
      </div>
    );
  }

  const currency = stayDetails.price?.currency || "₹";

  const [guests, setGuests] = useState({ adults: 2, children: 0, pets: 0 });
  const [totalPrice, setTotalPrice] = useState(0);

  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (selectedRooms && selectedRooms.length > 0) {
      const total = selectedRooms.reduce(
        (acc, room) => acc + nights * room.quantity * (room.price || 0),
        0
      );
      setTotalPrice(total);
    } else {
      const defaultPrice = stayDetails.price?.amount || 0;
      const totalGuests = guests.adults + guests.children;
      const total = nights * totalGuests * defaultPrice;
      setTotalPrice(total);
    }
  }, [checkIn, checkOut, guests, nights, selectedRooms, stayDetails.price]);

  const handleBookNow = async () => {
    if (!currentUser || !currentUser._id) {
      alert("Please log in to continue booking.");
      return;
    }

    const bookingDetails = {
      userId: currentUser._id, // explicitly include userId
      stayId: stayDetails._id,
      bookingDates: `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`,
      totalAmount: totalPrice,
      guests: `${guests.adults} Adults, ${guests.children} Children, ${guests.pets} Pets`,
      state: stayDetails.state || "",
      destination: stayDetails.destination || "",
      productinfo: stayDetails.name || stayDetails.title || "",
    };

    try {
      // Debug: log booking details
      console.log("Booking details to be sent:", bookingDetails);

      const res = await axios.post(
        "http://localhost:3000/property-api/booking",
        bookingDetails,
        { withCredentials: true } // send cookies (JWT)
      );

      const booking = res.data.booking;

      navigate("/make-payment", {
        state: {
          booking,
          checkIn,
          checkOut,
          guests,
          totalPrice,
          stayDetails,
          selectedRooms,
        },
      });
    } catch (err) {
      console.error("Error creating booking record:", err);
      alert(`Error creating booking record: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg max-w-md mx-auto bg-white">
      {selectedRooms && selectedRooms.length > 0 ? (
        <div className="mb-4">
          {selectedRooms.map((room) => (
            <div key={room.id} className="mb-2">
              <h3 className="text-base font-semibold text-[#000000]">
                {room.name} (x{room.quantity})
              </h3>
              <p className="text-sm text-[#000000]">
                ₹ {room.price ? room.price.toLocaleString() : "0"} per night
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex">
          <p className="text-sm sm:text-base text-[#000000]">~ {currency}</p>
          <p className="text-sm sm:text-base text-[#000000]">
            {stayDetails.price?.amount?.toLocaleString() || "0"} per night
          </p>
        </div>
      )}

      <div className="mt-8">
        <BookCardDatePicker
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
      </div>

      <div className="mt-4 w-full">
        <BookCardGuestSelection guests={guests} setGuests={setGuests} />
      </div>

      <div className="mt-4 w-full">
        <TotalPriceComponent
          currency={currency}
          totalPrice={totalPrice}
          guests={guests}
          nights={nights}
          checkIn={checkIn}
          checkOut={checkOut}
          selectedRooms={selectedRooms} 
          pricePerNight={stayDetails.price?.amount}
        />
      </div>

      <button
        className="mt-4 w-full bg-[#DE1587] text-white py-2 rounded-lg hover:bg-pink-600"
        onClick={handleBookNow}
      >
        Book Now
      </button>

      <p className="mt-4 text-sm text-gray-500 text-center">
        <a href="#" className="text-xs text-[#000000] font-[500]">
          Terms and Conditions
        </a>
      </p>
    </div>
  );
};

export default BookCard;