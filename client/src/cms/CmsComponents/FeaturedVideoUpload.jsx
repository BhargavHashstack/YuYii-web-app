// src/CmsComponents/FeaturedVideoUpload.jsx
import React, { useState } from "react";

function FeaturedVideoUpload({ initialVideo }) {
  const [videoURL, setVideoURL] = useState(
    (initialVideo && initialVideo.video) ||
      "https://www.youtube.com/watch?v=zqLy2TvKN4Q"
  );

  const getBannerPath = (banner) => {
    if (!banner) return null;
    return banner.startsWith("/") ? banner : `/assets/images/${banner}`;
  };

  const [coverImage, setCoverImage] = useState(
    initialVideo && initialVideo.banner ? getBannerPath(initialVideo.banner) : null
  );

  const handleURLChange = (e) => {
    setVideoURL(e.target.value);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setCoverImage(fileURL);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Featured Video URL
        </label>
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=zqLy2TvKN4Q"
          value={videoURL}
          onChange={handleURLChange}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Featured Video Cover
        </label>
        <label className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600">
          Choose file
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
        </label>
        {coverImage && (
          <div className="mt-4">
            <img
              src={coverImage}
              alt="Cover Preview"
              className="w-72 h-48 object-cover border border-gray-300 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedVideoUpload;
