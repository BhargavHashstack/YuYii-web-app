import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { uploadToS3 } from '../utils/s3Upload';

// AWS S3 client setup
const s3Client = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});
const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;

export default function DestinationStays({ stays = [], destinationName = '', onChange }) {
  const [signedUrls, setSignedUrls] = useState({});
  const placeholder = 'https://via.placeholder.com/150';

  // Fetch signed URLs for stay images
  useEffect(() => {
    if (!destinationName) return;
    const folder = destinationName.toLowerCase().replace(/\s+/g, '_');
    const fetchUrls = async () => {
      const urlMap = {};
      await Promise.all(
        stays.map(async (stay) => {
          const file = stay.image;
          if (!file || /^(https?:)?\/\//.test(file)) return;
          try {
            const key = `${prefix}/destination/${folder}/${file}`;
            const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
            urlMap[file] = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
          } catch (err) {
            console.error(`Failed to sign stay image ${file}:`, err);
          }
        })
      );
      setSignedUrls(urlMap);
    };
    fetchUrls();
  }, [stays, destinationName]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingStay, setEditingStay] = useState(null);

  const isEditing = editingStay
    ? stays.some((s) => s.id === editingStay.id)
    : false;

  // Open modal for add/edit
  const openModal = (stay = null) => {
    if (stay) {
      setEditingStay({
        ...stay,
        imageFile: null,
        tempPreview: null,
      });
    } else {
      setEditingStay({
        id: Date.now(),
        name: '',
        category: [],
        imagePreview: '',
        imageFile: null,
        tempPreview: null,
        price: '',
      });
    }
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingStay(null);
  };

  // Handlers
  const handleFieldChange = (field, value) => {
    setEditingStay((prev) => ({ ...prev, [field]: value }));
  };
  const handleCategoryChange = (e) => {
    const categories = e.target.value
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c);
    handleFieldChange('category', categories);
  };
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !destinationName) return;
    try {
      const folder = destinationName.toLowerCase().replace(/\s+/g, '_');
      await uploadToS3(folder, file);
      const tempPreview = URL.createObjectURL(file);
      setEditingStay((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: file.name,
        tempPreview,
      }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Could not upload image: ' + err.message);
    }
  };
  const handleSave = () => {
    const { id, name, category, imagePreview, price } = editingStay;
    const newStays = [...stays];
    const stayData = { id, name, category, image: imagePreview, price: Number(price) };
    const idx = newStays.findIndex((s) => s.id === id);
    if (idx > -1) newStays[idx] = stayData;
    else newStays.push(stayData);
    onChange(newStays);
    closeModal();
  };
  const handleRemove = (id) => {
    const newStays = stays.filter((s) => s.id !== id);
    onChange(newStays);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Stays</h2>
        <button
          onClick={() => openModal()}
          className="border border-pink-500 text-pink-600 px-4 py-1 rounded hover:bg-pink-50"
        >
          <FaPlus className="inline mr-1" /> Add Stay
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stays.map((stay) => {
          const src =
            signedUrls[stay.image] ||
            (/^(https?:)?\/\//.test(stay.image) ? stay.image : placeholder);
          return (
            <div key={stay.id} className="bg-white rounded shadow p-4 flex flex-col">
              <img
                src={src}
                alt={stay.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-lg">{stay.name}</h3>
              <p className="text-sm text-gray-600 mb-2">₹{stay.price}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {stay.category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-200 rounded-full px-2 py-1"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex space-x-2">
                <button
                  onClick={() => openModal(stay)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleRemove(stay.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for add/edit stay */}
      {showModal && editingStay && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white w-full max-w-md rounded p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Stay' : 'Add Stay'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editingStay.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categories (comma separated)
                </label>
                <input
                  type="text"
                  value={editingStay.category.join(', ')}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={editingStay.price}
                  onChange={(e) => handleFieldChange('price', e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm border rounded cursor-pointer"
                />
                {(editingStay.imageFile || editingStay.imagePreview) && (
                  <img
                    src={
                      editingStay.imageFile
                        ? editingStay.tempPreview
                        : signedUrls[editingStay.imagePreview] || placeholder
                    }
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded"
                  />
                )}
                <p className="text-xs mt-1 break-all">
                  URL: {editingStay.imagePreview}
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleSave}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
