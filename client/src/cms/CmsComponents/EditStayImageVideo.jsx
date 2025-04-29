// src/CmsComponents/EditStayImageVideo.jsx
import React, { useState } from "react";

function ImageUploader({ initialImages = [] }) {
  // For banner image preview
  const [bannerImage, setBannerImage] = useState(null);
  // For multiple featured images
  const [featuredImages, setFeaturedImages] = useState(
    initialImages.map((img, index) => ({
      id: index,
      src: img,
    }))
  );

  // Handle banner image selection
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  // Handle multiple featured images selection
  const handleFeaturedChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      src: URL.createObjectURL(file),
    }));
    setFeaturedImages((prev) => [...prev, ...newImages]);
  };

  // Remove a featured image on double-click
  const handleRemoveFeaturedImage = (id) => {
    setFeaturedImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="p-4 space-y-8">
      {/* Banner Image Section */}
      <div>
        <h2 className="text-xl font-bold mb-2">Banner Image</h2>
        <label className="block mb-2 font-semibold">Choose file</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
        {bannerImage && (
          <div className="mt-4">
            <img
              src={bannerImage}
              alt="Banner Preview"
              className="w-48 h-32 object-cover border border-gray-200 rounded"
            />
          </div>
        )}
      </div>

      {/* Featured Images Section */}
      <div>
        <h2 className="text-xl font-bold mb-2">Featured Images</h2>
        <label className="block mb-2 font-semibold">
          Upload featured images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFeaturedChange}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
        <p className="text-sm text-gray-500 mt-2">
          (Double click an image to remove it)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {featuredImages.map((img) => (
            <div
              key={img.id}
              onDoubleClick={() => handleRemoveFeaturedImage(img.id)}
              className="relative cursor-pointer border-2 border-pink-300 p-1 rounded group"
            >
              <img
                src={img.src}
                alt="Featured"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
