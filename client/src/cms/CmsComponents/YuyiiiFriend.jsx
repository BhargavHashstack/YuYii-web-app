// src/CmsComponents/YuyiiiFriend.jsx
import React, { useState, useEffect } from "react";

// Helper to safely parse a JSON string for friend data
const parseFriend = (fr) => {
  if (!fr) return {};
  if (typeof fr === "string") {
    try {
      return JSON.parse(fr);
    } catch (e) {
      console.error("Error parsing friend:", e);
      return {};
    }
  }
  return fr;
};

export default function YuyiiiFriend({ initialFriend = {} }) {
  const parsedFriend = parseFriend(initialFriend);

  // Helper to get proper image path if needed
  const getProfilePicturePath = (pic) => {
    if (!pic) return null;
    return pic.startsWith("/") ? pic : `/assets/images/${pic}`;
  };

  const [friendName, setFriendName] = useState(parsedFriend.name || "");
  const [occupation, setOccupation] = useState(parsedFriend.job || "");
  const [videoURL, setVideoURL] = useState(parsedFriend.video || "");
  const [aboutFriend, setAboutFriend] = useState(parsedFriend.story || "");
  const [imagePreview, setImagePreview] = useState(
    getProfilePicturePath(parsedFriend.profile_picture)
  );

  useEffect(() => {
    const fr = parseFriend(initialFriend);
    setFriendName(fr.name || "");
    setOccupation(fr.job || "");
    setVideoURL(fr.video || "");
    setAboutFriend(fr.story || "");
    setImagePreview(getProfilePicturePath(fr.profile_picture));
  }, [initialFriend]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  };

  return (
    <div className="p-4 bg-white space-y-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold">Yuyiii Friend</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Name of the Friend</label>
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Occupation</label>
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">Video URL</label>
        <input
          type="text"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">About the Friend</label>
        <textarea
          rows={4}
          value={aboutFriend}
          onChange={(e) => setAboutFriend(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Upload Image</label>
        <label className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600">
          Upload image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Friend Preview"
              className="w-64 h-48 object-cover border border-gray-200 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
