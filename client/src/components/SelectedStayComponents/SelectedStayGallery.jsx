// SelectedStayGallery.jsx
import React, { useState, useEffect } from "react";
import "../SelectedStayComponents/GalleryContainer.css";

const SelectedStayGallery = ({ stayId }) => {
  const [galleryData, setGalleryData] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (!stayId) {
      console.error("stayId is undefined!");
      return;
    }
    fetch(`/property-api/staygallery/${stayId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        return res.json();
      })
      .then((data) => {
        // data.gallery is an object mapping category to an array of signed URLs
        const gallery = data.gallery ? data.gallery : {};
        setGalleryData(gallery);
        const tabs = Object.keys(gallery);
        if (tabs.length > 0) {
          setActiveTab(tabs[0]);
        }
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, [stayId]);

  const categories = Object.keys(galleryData);
  const images = galleryData[activeTab] || [];

  return (
    <div id="gallery-section" className="gallery-container px-2 sm:px-2 lg:px-12">
      {/* Tab Navigation */}
      <div className="tabs flex sm:space-x-2 lg:space-x-4 border-b-2 pb-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${
              activeTab === category
                ? "text-[#DE1587] text-poppins font-[500] border-b-4 border-[#DE1587] text-xs sm:text-base lg:text-xl"
                : "text-xs sm:text-base lg:text-xl text-[#717171]"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${activeTab} ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No images available for {activeTab}.
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectedStayGallery;
