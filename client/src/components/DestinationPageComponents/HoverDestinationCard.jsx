// HoverDestinationCard.jsx
import React, { useState } from "react";
import './HoverDestinationCard.css';
import S3ImageThumbnail from "./S3ImageThumbnail";

const HoverDestinationCard = ({ images = [], title, description, onClose, location }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    if (images.length > 0 && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    if (images.length > 0 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white font-bold hover:text-pink-500 transition"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 26.625L0.375 24L10.875 13.5L0.375 3L3 0.375L13.5 10.875L24 0.375L26.625 3L16.125 13.5L26.625 24L24 26.625L13.5 16.125L3 26.625Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Main Interactive Area */}
      <div
        className="relative flex flex-col items-center w-full max-w-5xl p-4"
        onMouseLeave={onClose}
      >
        <div className="image-container">
          {/* Main Hover Image */}
          <S3ImageThumbnail 
            destinationTitle={title}
            imageName={images[currentImageIndex]}
            altText={`${title} hover image`}
          />
          <button
            onClick={prevImage}
            className="absolute left-[-4rem] top-1/2 transform -translate-y-1/2 p-3"
          >
            {/* Left Arrow */}
            <svg
              width="32"
              height="56"
              viewBox="0 0 32 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.3343 55.8033L0.798828 28.2678L28.3343 0.732422L31.4804 3.87861L7.0912 28.2678L31.4804 52.6571L28.3343 55.8033Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-[-4rem] top-1/2 transform -translate-y-1/2 p-3"
          >
            {/* Right Arrow */}
            <svg
              width="32"
              height="56"
              viewBox="0 0 32 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.66574 0.73188L31.2012 28.2673L3.66574 55.8027L0.519558 52.6565L24.9088 28.2673L0.519558 3.87806L3.66574 0.73188Z"
                fill="white"
              />
            </svg>
          </button>
          <div className="overlay-content">
            <p>{description}</p>
            <h1>{title}, {location}</h1>
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="flex justify-center mt-4 gap-4 overflow-x-auto">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-24 h-16 sm:w-36 sm:h-24 cursor-pointer rounded-md overflow-hidden ${
                index === currentImageIndex
                  ? "border-2 border-[#DE1587]"
                  : "border border-gray-300"
              }`}
            >
              <S3ImageThumbnail 
                destinationTitle={title}
                imageName={image}
                altText={`Thumbnail ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoverDestinationCard;
