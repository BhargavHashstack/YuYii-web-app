// src/CmsComponents/YuyiiiFriendDestination.jsx
import React, { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadToS3 } from "../utils/s3Upload";

// ——— S3 CONFIG ———
const s3Client = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});
const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;

export default function YuyiiiFriendDestination({
  yuyiiiFriend = {},
  destinationName = "",
  onChange,
}) {
  // Initialize with any existing values, plus blank preview slots
  const [data, setData] = useState({
    title:             yuyiiiFriend.title       || "",
    aboutText:         yuyiiiFriend.aboutText   || "",
    friendName:        yuyiiiFriend.friendName  || "",
    friendJob:         yuyiiiFriend.friendJob   || "",
    videoURL:          yuyiiiFriend.videoURL    || "",
    coverImage:        yuyiiiFriend.coverImage  || "",
    coverPreview:      yuyiiiFriend.coverPreview|| "",
    friendImage:       yuyiiiFriend.friendImage || "",
    friendPreview:     yuyiiiFriend.friendPreview|| "",
    videoCover:        yuyiiiFriend.videoCover  || "",
    videoCoverPreview: yuyiiiFriend.videoCoverPreview|| "",
  });

  // We'll use this to hold signed URLs for existing images
  const [signed, setSigned] = useState({
    cover: "",
    friend: "",
    videoCover: "",
  });

  // Whenever any of the filenames change, fetch a presigned URL
  useEffect(() => {
    if (!destinationName) return;

    const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
    (async () => {
      const urls = {};

      if (data.coverImage && !data.coverPreview) {
        const cmd = new GetObjectCommand({ Bucket: bucket, Key: `${prefix}/destination/${folder}/${data.coverImage}` });
        urls.cover = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
      }
      if (data.friendImage && !data.friendPreview) {
        const cmd = new GetObjectCommand({ Bucket: bucket, Key: `${prefix}/destination/${folder}/${data.friendImage}` });
        urls.friend = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
      }
      if (data.videoCover && !data.videoCoverPreview) {
        const cmd = new GetObjectCommand({ Bucket: bucket, Key: `${prefix}/destination/${folder}/${data.videoCover}` });
        urls.videoCover = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
      }

      setSigned(urls);
    })();
  }, [
    data.coverImage,
    data.friendImage,
    data.videoCover,
    destinationName,
  ]);

  // Send only the cleaned data (no previews) back to parent
  const notifyParent = (updated) => {
    setData(updated);
    const {
      title,
      aboutText,
      friendName,
      friendJob,
      videoURL,
      coverImage,
      friendImage,
      videoCover,
    } = updated;
    onChange?.({ title, aboutText, friendName, friendJob, videoURL, coverImage, friendImage, videoCover });
  };

  // Handle plain text fields
  const handleField = (field) => (e) =>
    notifyParent({ ...data, [field]: e.target.value });

  // Handle file uploads + local preview
  const handleUpload = (field, previewField) => async (e) => {
    const file = e.target.files?.[0];
    if (!file || !destinationName) return;

    const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
    try {
      // 1. Upload to S3
      await uploadToS3(folder, file);

      // 2. Create a blob URL for immediate preview
      const previewUrl = URL.createObjectURL(file);

      // 3. Update both filename and preview in our state
      notifyParent({ ...data, [field]: file.name, [previewField]: previewUrl });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not upload image: " + err.message);
    }
  };

  const placeholder = "https://via.placeholder.com/80";

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">Yuyiii Friend</h2>
      
      {/* Title & Cover Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={handleField("title")}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload("coverImage", "coverPreview")}
            className="w-full border rounded cursor-pointer"
          />
          {data.coverImage && (
            <>
              <p className="mt-1 text-sm text-gray-500">{data.coverImage}</p>
              <img
                src={data.coverPreview || signed.cover || placeholder}
                alt="Cover Preview"
                className="mt-2 w-32 h-20 object-cover rounded border"
              />
            </>
          )}
        </div>
      </div>

      {/* About Text */}
      <div className="mb-6">
        <label className="block text-sm font-medium">About Yuyiii Friend</label>
        <textarea
          rows="4"
          value={data.aboutText}
          onChange={handleField("aboutText")}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Friend Name, Job & Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={data.friendName}
            onChange={handleField("friendName")}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Job</label>
          <input
            type="text"
            value={data.friendJob}
            onChange={handleField("friendJob")}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Friend Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload("friendImage", "friendPreview")}
            className="w-full border rounded cursor-pointer"
          />
          {data.friendImage && (
            <>
              <p className="mt-1 text-sm text-gray-500">{data.friendImage}</p>
              <img
                src={data.friendPreview || signed.friend || placeholder}
                alt="Friend Preview"
                className="mt-2 w-32 h-20 object-cover rounded border"
              />
            </>
          )}
        </div>
      </div>

      {/* Video URL & Cover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Video URL</label>
          <input
            type="text"
            value={data.videoURL}
            onChange={handleField("videoURL")}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Video Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload("videoCover", "videoCoverPreview")}
            className="w-full border rounded cursor-pointer"
          />
          {data.videoCover && (
            <>
              <p className="mt-1 text-sm text-gray-500">{data.videoCover}</p>
              <img
                src={data.videoCoverPreview || signed.videoCover || placeholder}
                alt="Video Cover Preview"
                className="mt-2 w-32 h-20 object-cover rounded border"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
