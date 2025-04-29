// src/CmsComponents/YuyiiiHighlightForm.jsx
import React, { useState, useEffect } from "react";

// Helper to safely parse a JSON string; if already an object, returns it
const parseHighlight = (hl) => {
  if (!hl) return {};
  if (typeof hl === "string") {
    try {
      return JSON.parse(hl);
    } catch (e) {
      console.error("Error parsing highlight:", e);
      return {};
    }
  }
  return hl;
};

export default function YuyiiiHighlightForm({ initialHighlight = {} }) {
  const parsedHighlight = parseHighlight(initialHighlight);

  const [isHighlight, setIsHighlight] = useState(true);
  const [title, setTitle] = useState(parsedHighlight.title || "");
  const [description, setDescription] = useState(parsedHighlight.summary || "");
  const [note, setNote] = useState(parsedHighlight.note || "");
  const [videoURL, setVideoURL] = useState(parsedHighlight.video || "");
  const [imagePreview, setImagePreview] = useState(
    parsedHighlight.gallery &&
      Array.isArray(parsedHighlight.gallery) &&
      parsedHighlight.gallery[1]
      ? parsedHighlight.gallery[1]
      : null
  );

  useEffect(() => {
    const hl = parseHighlight(initialHighlight);
    setTitle(hl.title || "");
    setDescription(hl.summary || "");
    setNote(hl.note || "");
    setVideoURL(hl.video || "");
    setImagePreview(
      hl.gallery &&
        Array.isArray(hl.gallery) &&
        hl.gallery[1]
        ? hl.gallery[1]
        : null
    );
  }, [initialHighlight]);

  const handleImageChange = (e) => {
    const file = e.target.files[1];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  };

  return (
    <div className="p-4 bg-white space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Yuyiii Highlight</h2>
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-2 text-gray-700">Highlight Enabled</span>
          <input
            type="checkbox"
            className="h-5 w-5 text-pink-500"
            checked={isHighlight}
            onChange={(e) => setIsHighlight(e.target.checked)}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Any additional note"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Video URL</label>
            <input
              type="text"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Video URL (if any)"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Upload Image</label>
            <label className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer">
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
                  alt="Highlight Preview"
                  className="w-64 h-40 object-cover border border-gray-200 rounded"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
