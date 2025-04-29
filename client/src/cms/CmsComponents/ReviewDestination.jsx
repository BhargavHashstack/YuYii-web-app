// src/CmsComponents/ReviewDestination.jsx
import React, { useState, useEffect } from "react";
import { uploadToS3 } from "../utils/s3Upload";
import S3Image from "./S3Image";

export default function ReviewDestination({
  review = "",
  reviewData = {},
  destinationName = "",
  onChange,
}) {
  // local pieces of state
  const [reviewerName, setReviewerName] = useState(reviewData.reviewerName || "");
  const [designation, setDesignation]   = useState(reviewData.designation   || "");
  const [place, setPlace]               = useState(reviewData.place         || "");
  const [reviewText, setReviewText]     = useState(review     || "");
  const [fileName, setFileName]         = useState(reviewData.reviewer      || "");
  const [previewUrl, setPreviewUrl]     = useState("");        // local blob preview
  const folder = destinationName.toLowerCase().replace(/\s+/g, "_");

  // notify parent whenever any field changes
  useEffect(() => {
    onChange?.({
      review: reviewText,
      reviewData: {
        reviewerName,
        designation,
        place,
        reviewer: fileName,
      },
    });
  }, [reviewerName, designation, place, reviewText, fileName, onChange]);

  // handle image file selection → upload → preview
  const handleProfileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // upload and get back the filename
      const uploadedName = await uploadToS3(folder, file);
      setFileName(uploadedName);
      // show immediate preview
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not upload image: " + err.message);
    }
  };

  return (
    <div className="mt-6">
      {/* name + picture row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={reviewerName}
            onChange={e => setReviewerName(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          {/* preview order: local blob → existing S3 → placeholder */}
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Reviewer Preview"
              className="w-24 h-24 object-cover rounded border mb-2"
            />
          ) : fileName ? (
            <S3Image
              folder={folder}
              imageName={fileName}
              alt="Reviewer"
              className="w-24 h-24 object-cover rounded border mb-2"
            />
          ) : (
            <img
              src="https://via.placeholder.com/80"
              alt="Placeholder"
              className="w-24 h-24 object-cover rounded border mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
            className="block w-full text-sm border rounded cursor-pointer"
          />
        </div>
      </div>

      {/* designation + place */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Job</label>
          <input
            type="text"
            value={designation}
            onChange={e => setDesignation(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Place</label>
          <input
            type="text"
            value={place}
            onChange={e => setPlace(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* review text */}
      <div className="mb-6">
        <label className="block text-sm font-medium">Review</label>
        <textarea
          rows="3"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
