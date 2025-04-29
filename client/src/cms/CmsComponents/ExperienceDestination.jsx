// src/CmsComponents/ExperienceDestination.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadToS3 } from "../utils/s3Upload";

// AWS S3 client config
const s3Client = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});
const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;

export default function ExperienceDestination({
  mustTry = [],
  destinationName = "",
  onChange
}) {
  const placeholder = "https://via.placeholder.com/300x200.png?text=No+Image";

  // Map incoming mustTry to include preview state
  const [localExperiences, setLocalExperiences] = useState(
    mustTry.map((exp, idx) => ({
      ...exp,
      id: idx,
      imageFile: null,
      imagePreview: exp.image || "",
      tempPreview: ""
    }))
  );
  const [signedUrls, setSignedUrls] = useState({});

  // Build S3 key helper
  const buildKey = (fileName) => {
    const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
    return `${prefix}/destination/${folder}/${fileName}`;
  };

  // Presign all existing images
  useEffect(() => {
    if (!destinationName || !localExperiences.length) return;
    (async () => {
      const urlMap = {};
      await Promise.all(
        localExperiences.map(async (exp) => {
          const name = exp.imagePreview;
          if (exp.imageFile || !name || /^\w+:\/\//.test(name)) return;
          try {
            const cmd = new GetObjectCommand({ Bucket: bucket, Key: buildKey(name) });
            urlMap[name] = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
          } catch (e) {
            console.error(`Signing failed for ${name}:`, e);
          }
        })
      );
      setSignedUrls(urlMap);
    })();
  }, [localExperiences, destinationName]);

  // Modal & form state
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    experience: "",
    location: "",
    description: "",
    imagePreview: "",
    imageFile: null,
    tempPreview: ""
  });

  // Open empty form
  const handleAddNew = () => {
    setFormData({
      id: null,
      experience: "",
      location: "",
      description: "",
      imagePreview: "",
      imageFile: null,
      tempPreview: ""
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  // Open form pre-filled
  const handleEdit = (id) => {
    const exp = localExperiences.find((e) => e.id === id);
    if (!exp) return;
    setFormData({ ...exp, tempPreview: "" });
    setIsEditMode(true);
    setShowModal(true);
  };

  // Upload to S3 and set preview
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
      await uploadToS3(folder, file);
      const blobUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: file.name,
        tempPreview: blobUrl
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not upload image: " + err.message);
    }
  };

  // Save (new or edit)
  const handleSave = () => {
    const updated = isEditMode
      ? localExperiences.map(exp => exp.id === formData.id ? formData : exp)
      : [...localExperiences, { ...formData, id: Date.now() }];

    setLocalExperiences(updated);
    setShowModal(false);

    // Bubble up only the fields your API expects, renaming imagePreview → image
    const payload = updated.map(({ imagePreview, imageFile, tempPreview, id, ...rest }) => ({
      ...rest,
      image: imagePreview
    }));
    onChange?.(payload);
  };

  // Delete experience
  const handleDelete = (id) => {
    const filtered = localExperiences.filter(e => e.id !== id);
    setLocalExperiences(filtered);
    const payload = filtered.map(({ imagePreview, imageFile, tempPreview, id: expId, ...rest }) => ({
      ...rest,
      image: imagePreview
    }));
    onChange?.(payload);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Experience at this destination</h2>
        <button
          onClick={handleAddNew}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded"
        >
          Add new
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {localExperiences.map(exp => {
          const src = exp.imageFile
            ? exp.tempPreview
            : signedUrls[exp.imagePreview] ||
              (/^(https?:)?\/\//.test(exp.imagePreview)
                ? exp.imagePreview
                : placeholder);

          return (
            <div key={exp.id} className="bg-white shadow rounded p-4 flex flex-col">
              <img src={src} alt={exp.experience} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 text-base font-medium text-gray-700">{exp.experience}</h3>
              <div className="flex justify-between mt-3">
                <button onClick={() => handleDelete(exp.id)} className="text-gray-400 hover:text-red-500">
                  <FaTrash />
                </button>
                <button onClick={() => handleEdit(exp.id)} className="text-gray-400 hover:text-blue-500">
                  <FaEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white w-full max-w-md mx-auto rounded p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">{isEditMode ? "Edit" : "Add"} Experience</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500">&times;</button>
            </div>

            <input
              type="text"
              placeholder="Title"
              value={formData.experience}
              onChange={e => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-2 py-1 border rounded mt-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-2 py-1 border rounded mt-2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full"
            />
            {(formData.imageFile || formData.imagePreview) && (
              <img
                src={
                  formData.tempPreview ||
                  signedUrls[formData.imagePreview] ||
                  placeholder
                }
                alt="Preview"
                className="mt-2 w-full h-40 object-cover rounded"
              />
            )}

            <button
              onClick={handleSave}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
