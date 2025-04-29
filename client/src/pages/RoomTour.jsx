import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWifi, FaSwimmingPool, FaSpa, FaParking, FaDumbbell, FaConciergeBell, FaUtensils, FaBed } from "react-icons/fa";


const RoomTour = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState(null);
  const [stayAmenities, setStayAmenities] = useState([]);
  const [roomPhotos, setRoomPhotos] = useState([]);

  useEffect(() => {
    const stay = Object.values(StayDetail).find(stay =>
      stay.rooms.some(room => room.id === roomId)
    );

    if (stay) {
      const room = stay.rooms.find(room => room.id === roomId);
      setRoomDetails(room);
      setStayAmenities(stay.amenities || []);
      setRoomPhotos(room.photos || []); // Use room-specific photos
    } else {
      navigate("/404");
    }
  }, [roomId, navigate]);

  if (!roomDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Room Details...</h1>
      </div>
    );
  }

  const iconMapping = {
    wifi: <FaWifi />,
    pool: <FaSwimmingPool />,
    spa: <FaSpa />,
    parking: <FaParking />,
    fitness: <FaDumbbell />,
    "room-service": <FaBed />,
    restaurant: <FaUtensils />,
    concierge: <FaConciergeBell />
  };

  const renderDiv1 = () => (
    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
      <img src={roomDetails.image} alt="Main" className="w-full md:w-2/3 rounded-lg p-4" />
      <div className="grid grid-cols-2 gap-4">
        {stayAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="text-xl">{iconMapping[amenity.icon]}</div>
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiv2 = (photos) => (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {photos.slice(0, 3).map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index}`} className="w-full object-cover" />
      ))}
    </div>
  );

  const renderDiv3 = (photos) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {photos.length > 0 && <img src={photos[0]} alt="Left" className="md:col-span-1 object-cover" />}
      {photos.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-2 gap-2">
          {photos.slice(1).map((photo, index) => (
            <img key={index} src={photo} alt={`Right ${index}`} className="object-cover" />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="room-tour bg-pink-50">
      <div className="max-w-6xl mx-auto p-6 space-y-12">
        <h2 className="text-3xl font-bold">{roomDetails.name}</h2>
        <p className="text-lg text-gray-600">Enjoy a luxurious stay with all the comforts you desire.</p>

        {/* Display Room Details */}
        {roomPhotos.length > 0 && (
          <>
            {renderDiv1()}
            {renderDiv2(roomPhotos)}
            {renderDiv3(roomPhotos)}
          </>
        )}
      </div>
    </div>
  );
};

export default RoomTour;
