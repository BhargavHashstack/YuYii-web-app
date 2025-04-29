import React from 'react';
import LocationMark from '../../assets/images/Images/locationmark.png'; // Replace with the path to your image

const LocationMarker = () => {
  return (
    <div className="absolute top-16 right-32 flex items-center z-40 bg-gray-800 bg-opacity-75 p-2 rounded-lg">
      <a
        href="https://goo.gl/maps/example" // Replace with the actual map link
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <img
          src={LocationMark}
          alt="Shikara Boats in Nigeen Lake"
          className="w-8 h-8 object-contain transition-transform hover:scale-110"
        />
        <span className="text-white font-semibold text-sm">
          Houseboats in Nigeen Lake
        </span>
      </a>
    </div>
  );
};

export default LocationMarker;
