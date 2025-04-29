import React, { useState } from "react";
import { motion } from "framer-motion";

function formatDisplayDate(date) {
  if (!(date instanceof Date)) date = new Date(date);
  const opts = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', opts);
}

export default function RoomModal({
  isOpen,
  onClose,
  room,
  checkIn,
  checkOut
}) {
  const [activeTab, setActiveTab] = useState("tariff");
  if (!isOpen) return null;

  // Pull data from the nested roomdetail object
  const {
    room_view,
    beds,
    rate,
    note,
    inclusions = [],
    extra_bed = {},
    gst = {},
    prices = [],
    gstprices = [],
    suggestions = []
  } = room.roomdetail || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-2xl rounded-lg shadow-lg relative"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600"
        >&times;</button>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-6 px-6">
          <button
            onClick={() => setActiveTab("tariff")}
            className={`mr-4 text-sm font-poppins focus:outline-none ${
              activeTab === "tariff"
                ? "border-t-2 border-r-2 pr-2 border-l-2 pl-2 border-[#DE1587] pt-2 text-[#DE1587]"
                : "text-gray-700"
            }`}
          >
            Tariff from {formatDisplayDate(checkIn)} to {formatDisplayDate(checkOut)}
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`text-sm font-poppins focus:outline-none ${
              activeTab === "details"
                ? "border-b-4 border-[#DE1587] pb-2 text-[#DE1587]"
                : "text-gray-700"
            }`}
          >
            Room Details
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto text-[#505459] text-sm leading-relaxed">

          {activeTab === "tariff" && (
            <>
              <h3 className="text-lg font-semibold mb-4">Detailed Tariff</h3>

              {/* Basic Info */}
              <div className="mb-4 space-y-1">
                <p><strong>Room Rate:</strong> ₹{rate}</p>
                <p><strong>GST:</strong> CGST {gst.cgst}%&nbsp;SGST {gst.sgst}%&nbsp;IGST {gst.igst}%</p>
                <p><strong>Extra Bed Available:</strong> {extra_bed.availability ? 'Yes' : 'No'}</p>
                <p><strong>Extra Bed Rate:</strong> {extra_bed.rate ? `₹${extra_bed.rate}` : 'N/A'}</p>
              </div>

              {/* Room Prices */}
              {prices.length > 0 && (
                <>
                  <h4 className="text-md font-semibold mb-2">Room Prices</h4>
                  <table className="w-full table-auto text-left mb-4">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Dates</th>
                        <th className="pb-2">Price (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prices.map((p, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2">{p.name || p.type}</td>
                          <td className="py-2">
                            {p.startDate
                              ? `${formatDisplayDate(p.startDate)} – ${formatDisplayDate(p.endDate)}`
                              : 'Anyday'}
                          </td>
                          <td className="py-2 font-semibold">{p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {/* GST Inclusive Prices */}
              {gstprices.length > 0 && (
                <>
                  <h4 className="text-md font-semibold mb-2">GST Inclusive Prices</h4>
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Dates</th>
                        <th className="pb-2">Price incl. GST (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gstprices.map((g, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2">{g.name || g.type}</td>
                          <td className="py-2">
                            {g.startDate
                              ? `${formatDisplayDate(g.startDate)} – ${formatDisplayDate(g.endDate)}`
                              : 'Anyday'}
                          </td>
                          <td className="py-2 font-semibold">{g.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}

          {activeTab === "details" && (
            <>

{/* Special Suggestions */}
{suggestions.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Special Suggestions</h3>
                  <ul className="list-disc pl-6 mb-4">
                    {suggestions.map((s, idx) => (
                      <li key={idx} className="mb-2">
                        <strong>{s.name}:</strong> {s.suggestion}
                      </li>
                    ))}
                  </ul>
                </>
              )}


              {/* General Information */}
              <h3 className="text-lg font-semibold mb-2">General Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>View:</strong> {room_view}</li>
                <li><strong>Beds:</strong> {beds}</li>
                {note && <li><strong>Note:</strong> {note}</li>}
              </ul>

              
              {/* Inclusions/Amenities */}
              {inclusions.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-inside pl-4">
                    {inclusions.map((inc, idx) => (
                      <li key={idx} className="marker:text-pink-500">
                        {inc}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
}
