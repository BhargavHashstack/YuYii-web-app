import React from "react";

export default function ConfirmationVoucher() {
  return (
    <div className="w-full max-w-lg mx-auto bg-white border shadow-lg font-sans text-[#000]">
      {/* Top Image / Header */}
      <div className="relative">
        {/* Replace this image URL with your actual scenic/brand image */}
        <img
          src="https://via.placeholder.com/600x250?text=Yuyiii+Scenic+View"
          alt="Yuyiii Scenic"
          className="w-full h-auto object-cover"
        />
        {/* If you need the Yuyiii logo/text overlay, you can absolutely position it here */}
        {/* Example:
        <div className="absolute top-4 w-full text-center text-white font-bold text-2xl">
          Yuyiii
        </div>
        */}
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Greeting */}
        <h2 className="text-lg font-medium mb-1">Hello Natalie Singh,</h2>
        <p className="text-sm text-gray-700 mb-4">
          Your host has approved your stay at Palghar
        </p>

        {/* Pink Bar for Dates */}
        <div className="bg-pink-600 text-white text-sm font-semibold p-2 rounded-sm mb-4">
          Friday, 14 March 2025 to Sunday, 16 March 2025
        </div>

        {/* Row: Total Price + Guests */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">
            Total <span className="block text-lg font-bold">₹49,650</span>
            <span className="text-xs font-normal">Tariff + Tax</span>
          </div>
          <div className="text-sm font-semibold">
            <span className="block text-lg font-bold">3</span>
            <span className="text-xs font-normal">Guests</span>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="mt-4 mb-2">
          <h3 className="text-base font-semibold mb-2">Rooms</h3>
          <p className="text-sm font-bold">The Little Neil</p>
          <p className="text-xs text-gray-700">
            Hill Rates <br />
            14 March to 16 March (Room + Breakfast)
          </p>
          <p className="text-xs text-gray-700">
            <span className="font-bold">₹36,000</span> <br />
            18% Tax <span className="ml-2">₹6,480</span>
          </p>
        </div>

        {/* Extra Bed Charges */}
        <div className="mt-4 mb-2">
          <h3 className="text-base font-semibold mb-2">Extra Bed Charges</h3>
          <p className="text-xs text-gray-700">
            14 March to 15 March <br />
            2500 x 2 nights x 1 Adults <span className="ml-2">₹5,000</span>
          </p>
          <p className="text-xs text-gray-700">
            Extra Bed Taxes <br />
            18% IGST
          </p>
        </div>

        {/* Note Section */}
        <p className="text-xs text-gray-700 mt-4">
          Kindly make the payment by 5 PM, for 2 Adults your son of 13 years and
          your pet Pluto for Check In -14th March and Check Out- 16th March for
          Room with Breakfast.
        </p>

        {/* Buttons */}
        <div className="flex items-center space-x-4 mt-6">
          <button className="bg-pink-600 text-white px-4 py-2 text-sm rounded-sm hover:bg-pink-700">
            Make Payment
          </button>
          <button className="border border-gray-400 text-gray-700 px-4 py-2 text-sm rounded-sm hover:bg-gray-100">
            Cancel Booking
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-8">©Yuyiii 2025</p>
      </div>
    </div>
  );
}
