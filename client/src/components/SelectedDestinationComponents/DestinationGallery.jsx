// DestinationGallery.jsx
import React, { useState } from "react";
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { BsColumnsGap } from "react-icons/bs";
import { RiGalleryFill } from "react-icons/ri";
import S3Image from "../SelectedDestinationComponents/S3Image";

const DestinationGallery = ({
  images = {},
  activeCategory,
  setActiveCategory,
  destinationFolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [gridView, setGridView] = useState(false);

  // Instead of auto-generating names, define them explicitly:
  const categories = [
    {
      key: "lifeStyle",
      label: "LIFE STYLE",
      iconNormal: "lifestyle-ico.png",
      iconActive: "lifestyle-active-ico.png",
    },
    {
      key: "fun",
      label: "FUN",
      iconNormal: "fun-ico.png",
      iconActive: "fun-active-ico.png",
    },
    {
      key: "foodAndDrink",
      label: "FOOD & DRINK",
      // IMPORTANT: Matches your actual S3 filenames with the ampersand
      iconNormal: "food&drink-ico.png",
      iconActive: "food&drink-active-ico.png",
    },
    {
      key: "places",
      label: "PLACES",
      iconNormal: "places-ico.png",
      iconActive: "places-active-ico.png",
    },
  ];

  const currentImages = images[activeCategory] || [];

  const openModal = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
    setGridView(false);
  };

  const nextImage = () => {
    setPhotoIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setPhotoIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row items-center px-4 md:px-16 py-8 gap-6 max-w-4xl mx-auto">
      {/* Image Grid */}
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 md:mt-16 items-end">
          {currentImages[0] && (
            <div onClick={() => openModal(0)} className="cursor-pointer">
              <S3Image
                folder={destinationFolder}
                imageName={currentImages[0]}
                alt="Destination 1"
                style={{ objectFit: "cover", height: "240px", width: "240px" }}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
          {currentImages[1] && (
            <div onClick={() => openModal(1)} className="cursor-pointer">
              <S3Image
                folder={destinationFolder}
                imageName={currentImages[1]}
                alt="Destination 2"
                style={{ objectFit: "cover", height: "240px", width: "240px" }}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {currentImages[2] && (
            <div onClick={() => openModal(2)} className="cursor-pointer">
              <S3Image
                folder={destinationFolder}
                imageName={currentImages[2]}
                alt="Destination 3"
                style={{ objectFit: "cover", height: "240px", width: "240px" }}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
          {currentImages[3] && (
            <div onClick={() => openModal(3)} className="cursor-pointer">
              <S3Image
                folder={destinationFolder}
                imageName={currentImages[3]}
                alt="Destination 4"
                style={{ objectFit: "cover", height: "240px", width: "240px" }}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="w-full flex flex-wrap justify-center md:w-1/2 md:grid md:grid-cols-2 gap-x-10 gap-y-10 order-first md:order-last">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-4 py-2 md:px-4 md:py-12 rounded-md shadow-xl transition-transform duration-200 flex flex-col items-center justify-center text-center font-poppins ${
              activeCategory === category.key
                ? "bg-[#DE1587] text-white border-[#DE1587] scale-110 shadow-xl"
                : "bg-white text-black drop-shadow-xl"
            }`}
          >
            <S3Image
              // Use the correct icon file based on active/inactive state
              imageName={
                activeCategory === category.key
                  ? category.iconActive
                  : category.iconNormal
              }
              alt={`${category.label} icon`}
              className="w-5 md:w-10 h-5 md:h-10"
              // Pass a custom basePath (no folder) so we look in assets/assets-2025-03-16/img
              basePath="assets/assets-2025-03-16/img"
            />
            <span className="mt-2 lg:text-base font-[300] font-poppins">
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox Implementation */}
      {isOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          {/* Grid View & Close Buttons */}
          <div className="absolute top-0 left-0 lg:top-4 lg:left-4 flex gap-4">
            <button
              className="p-1 rounded-full"
              onClick={() => setGridView(!gridView)}
            >
              {gridView ? (
                <RiGalleryFill className="w-10 h-10 text-white" />
              ) : (
                <BsColumnsGap className="w-10 h-10 text-white" />
              )}
            </button>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-0 right-0 lg:top-4 lg:right-4 p-1 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="w-10 h-10 text-white" />
          </button>

          {gridView ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 p-10 overflow-y-auto max-h-[90vh]">
              {currentImages.map((img, index) => (
                <S3Image
                  key={index}
                  folder={destinationFolder}
                  imageName={img}
                  alt={`Grid Image ${index}`}
                  className="sm:w-30 sm:h-30 lg:w-40 lg:h-40 object-cover cursor-pointer rounded-lg"
                  onClick={() => {
                    setPhotoIndex(index);
                    setGridView(false);
                  }}
                />
              ))}
            </div>
          ) : (
            <>
              {/* Previous Image Button */}
              <button
                className="absolute left-4 bg-opacity-90 p-3 rounded-full shadow-md"
                onClick={prevImage}
              >
                <ChevronLeftIcon className="w-16 h-16 text-white" />
              </button>

              {/* Main Image Display */}
              <S3Image
                folder={destinationFolder}
                imageName={currentImages[photoIndex]}
                alt={`Selected image ${photoIndex}`}
                className="h-[96vh] object-contain cursor-pointer"
              />

              {/* Next Image Button */}
              <button
                className="absolute right-4 bg-opacity-90 p-3 rounded-full shadow-md"
                onClick={nextImage}
              >
                <ChevronRightIcon className="w-16 h-16 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationGallery;
