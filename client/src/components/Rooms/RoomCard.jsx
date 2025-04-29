// RoomCard.jsx
import React, { useState, useEffect } from "react";
import RoomModal from "./RoomModal";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const RoomCard = ({ room, destination, onQuantityChange, checkIn, checkOut }) => {
  const [roomsCount, setRoomsCount] = useState(0);
  const [bedsCount, setBedsCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [roomImageUrl, setRoomImageUrl] = useState("");
  const [mealPlan, setMealPlan] = useState(room.mealPlan || "Breakfast");

  useEffect(() => {
    const fetchRoomImageUrl = async () => {
      try {
        // use import.meta.env instead of process.env
        const region = import.meta.env.REACT_APP_AWS_REGION || import.meta.env.AWS_REGION;
        const accessKey = import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID || import.meta.env.AWS_ACCESS_KEY_ID;
        const secretKey = import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY || import.meta.env.AWS_SECRET_ACCESS_KEY;
        const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET || import.meta.env.AWS_S3_BUCKET;
        const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX || import.meta.env.AWS_S3_KEY_PREFIX;

        const s3 = new S3Client({
          region,
          credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
        });

        const folder = destination.toLowerCase().replace(/ /g, "_");
        const imgName = room.images?.[0] || room.image;
        const key = `${prefix}/destination/${folder}/${imgName}`;

        const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
        const url = await getSignedUrl(s3, cmd, { expiresIn: 900 });
        setRoomImageUrl(url);
      } catch (err) {
        console.error("Error generating room image URL:", err);
      }
    };

    fetchRoomImageUrl();
  }, [room, destination]);

  const handleRoomIncrement = () => {
    const newCount = roomsCount + 1;
    setRoomsCount(newCount);
    if (onQuantityChange) {
      onQuantityChange(room, newCount);
    }
  };

  const handleRoomDecrement = () => {
    if (roomsCount > 0) {
      const newCount = roomsCount - 1;
      setRoomsCount(newCount);
      if (onQuantityChange) {
        onQuantityChange(room, newCount);
      }
    }
  };

  const handleBedIncrement = () => setBedsCount(bedsCount + 1);
  const handleBedDecrement = () => bedsCount > 0 && setBedsCount(bedsCount - 1);

  return (
    <div className="rounded-lg">
      {/* Outer border */}
      <div className="border-2 p-3 rounded-xl">
        {/* Top image with overlay */}
        <div className="relative">
          {roomImageUrl ? (
            <img
              src={roomImageUrl}
              alt={room.name}
              className="w-full h-72 object-cover rounded-lg"
              style={{ borderRadius: "15px" }}
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
              Loading image...
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 text-white p-4 rounded-b-xl">
            <p className="text-base font-semibold">{room.name}</p>
            <p className="text-sm">{room.description}</p>
          </div>
        </div>

        {/* Body content */}
        <div className="mt-4">
          {/* Price Display */}
          <p className="text-base text-[#3D8EFF] font-[600] mb-3">
            Starting From{" "}
            <span className="text-[#DE1587] font-semibold text-sm">
              ₹ {room.price || 8250}
            </span>{" "}
            <HiOutlineInformationCircle className="inline-block text-[#DE1587] text-xs" />
          </p>

          {/* Select Rooms */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-poppins font-[500]">Select rooms</p>
            <div className="flex items-center border overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoomDecrement();
                }}
                className="px-2 py-1 text-[#DE1587]"
              >
                {/* Minus Icon */}
                <svg width="10" height="2" viewBox="0 0 24 3" fill="none">
                  <path
                    d="M2.13 2.85h20.6c.63 0 1.14-.51 1.14-1.14 0-.63-.51-1.14-1.14-1.14H2.13C1.5.57.99 1.08.99 1.71c0 .63.51 1.14 1.14 1.14z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <span className="px-3">{roomsCount}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoomIncrement();
                }}
                className="px-2 py-1 text-[#DE1587]"
              >
                {/* Plus Icon */}
                <svg width="10" height="10" viewBox="0 0 23 24" fill="none">
                  <path
                    d="M10.39 10.56V1.4c0-.63.51-1.14 1.14-1.14.63 0 1.14.51 1.14 1.14v9.16h9.16c.63 0 1.14.51 1.14 1.14 0 .63-.51 1.14-1.14 1.14h-9.16v9.16c0 .63-.51 1.14-1.14 1.14-.63 0-1.14-.51-1.14-1.14V12.85H1.23c-.63 0-1.14-.51-1.14-1.14 0-.63.51-1.14 1.14-1.14h9.16z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Additional Beds */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-poppins font-[500]">Additional Beds</p>
            <div className="flex items-center border overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBedDecrement();
                }}
                className="px-2 py-1 text-[#DE1587]"
              >
                {/* Minus Icon */}
                <svg width="10" height="2" viewBox="0 0 24 3" fill="none">
                  <path
                    d="M2.13 2.85h20.6c.63 0 1.14-.51 1.14-1.14 0-.63-.51-1.14-1.14-1.14H2.13C1.5.57.99 1.08.99 1.71c0 .63.51 1.14 1.14 1.14z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <span className="px-3">{bedsCount}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBedIncrement();
                }}
                className="px-2 py-1 text-[#DE1587]"
              >
                {/* Plus Icon */}
                <svg width="10" height="10" viewBox="0 0 23 24" fill="none">
                  <path
                    d="M10.39 10.56V1.4c0-.63.51-1.14 1.14-1.14.63 0 1.14.51 1.14 1.14v9.16h9.16c.63 0 1.14.51 1.14 1.14 0 .63-.51 1.14-1.14 1.14h-9.16v9.16c0 .63-.51 1.14-1.14 1.14-.63 0-1.14-.51-1.14-1.14V12.85H1.23c-.63 0-1.14-.51-1.14-1.14 0-.63.51-1.14 1.14-1.14h9.16z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Meal Plan Dropdown */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-poppins font-[500]">Meal Plan</p>
            <div className="flex items-center border overflow-hidden">
              <select
                className="px-3 text-[#DE1587] outline-none"
                value={mealPlan}
                onChange={(e) => setMealPlan(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Half Board">Half Board</option>
                <option value="Full Board">Full Board</option>
              </select>
            </div>
          </div>

          {/* More Details */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="block mt-4 text-[#DE1587] underline text-sm cursor-pointer"
          >
            More Details
          </div>
        </div>
      </div>

      {modalOpen && (
        <RoomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          room={room}
          checkIn={checkIn}
        checkOut={checkOut}
          tariff={{
            startDate: room.bookingStartDate,
            endDate: room.bookingEndDate,
            price: room.price,
          }}
        />
      )}
    </div>
  );
};

export default RoomCard;
