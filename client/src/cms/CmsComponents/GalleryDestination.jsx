import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadToS3 } from "../utils/s3Upload";

// AWS S3 client
const s3Client = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});
const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;

function GalleryDestination({ images = {}, destinationName = "", onChange }) {
  // Define gallery categories
  const galleryCategories = [
    { key: "lifeStyle", title: "Life Style" },
    { key: "foodAndDrink", title: "Food & Drink" },
    { key: "places", title: "Places" },
    { key: "fun", title: "Fun" },
  ];

  // Signed URLs cache keyed by filename
  const [signedUrls, setSignedUrls] = useState({});
  const placeholder = "https://via.placeholder.com/80";

  // Generate signed URLs for all image strings
  useEffect(() => {
    if (!destinationName) return;
    const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
    const allFiles = [];
    Object.values(images || {}).forEach(arr => arr.forEach(img => allFiles.push(img)));

    const fetchUrls = async () => {
      const urlMap = {};
      await Promise.all(
        allFiles.map(async (file) => {
          if (!file || /^(https?:)?\/\//.test(file)) return;
          try {
            const key = `${prefix}/destination/${folder}/${file}`;
            const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
            urlMap[file] = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
          } catch (err) {
            console.error(`Failed to sign gallery file ${file}:`, err);
          }
        })
      );
      setSignedUrls(urlMap);
    };

    fetchUrls();
  }, [images, destinationName]);

  // State for modals
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategoryKey, setEditingCategoryKey] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Open category modal
  const openCategoryModal = (catKey) => {
    const arr = images[catKey] || [];
    const items = arr.map((imgStr, idx) => ({
      id: Date.now() + idx,
      title: "",
      imagePreview: imgStr,
      imageFile: null,
    }));
    setEditingCategoryKey(catKey);
    setCategoryItems(items);
    setShowCategoryModal(true);
  };

  // Convert back to string array
  const convertToStrings = (items) => items.map(it => it.imagePreview);

  // Item handlers
  const handleAddItem = () => setCategoryItems(prev => [...prev, { id: Date.now(), title: "", imagePreview: "", imageFile: null }]);
  const handleRemoveItem = id => setCategoryItems(prev => prev.filter(it => it.id !== id));
  const handleOpenItemModal = id => {
    const item = categoryItems.find(it => it.id === id);
    if (item) {
      setEditingItem({ ...item });
      setShowItemModal(true);
    }
  };
  const handleItemFileChange = async (e) => {
    if (!editingItem) return;
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
      await uploadToS3(folder, file);
  
      const previewUrl = URL.createObjectURL(file);
      setEditingItem(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: file.name,  // what you’ll save in your metadata
        tempPreview: previewUrl    // for showing the preview immediately
      }));
    } catch (err) {
      console.error("S3 upload failed:", err);
      alert("Could not upload image: " + err.message);
    }
  };
  
  const handleSaveItemModal = () => {
    setCategoryItems(prev => prev.map(it => it.id === editingItem.id ? editingItem : it));
    setShowItemModal(false);
    setEditingItem(null);
  };
  const handleCancelItemModal = () => { setShowItemModal(false); setEditingItem(null); };

  // Category modal handlers
  const handleSaveCategoryModal = () => {
    if (!editingCategoryKey) return;
    const updated = { ...images, [editingCategoryKey]: convertToStrings(categoryItems) };
    onChange(updated);
    setShowCategoryModal(false);
    setEditingCategoryKey(null);
    setCategoryItems([]);
  };
  const handleCancelCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategoryKey(null);
    setCategoryItems([]);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>
        <button className="border border-pink-500 text-pink-600 px-4 py-1 rounded hover:bg-pink-50">Add new</button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {galleryCategories.map(cat => {
          const arr = images[cat.key] || [];
          const previewItems = arr.slice(0, 3);
          const extraCount = arr.length - previewItems.length;
          return (
            <div key={cat.key} className="bg-white rounded shadow p-3 flex flex-col space-y-2">
              <div className="flex flex-wrap gap-2">
                {previewItems.map((imgStr, idx) => {
                  const src = signedUrls[imgStr] || (/^(https?:)?\/\//.test(imgStr) ? imgStr : placeholder);
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <img src={src} alt="preview" className="w-16 h-16 object-cover rounded" />
                      <p className="text-xs mt-1 break-all max-w-16">{imgStr}</p>
                    </div>
                  );
                })}
                {extraCount > 0 && (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-600">+{extraCount}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">{cat.title}</h3>
                <button onClick={() => openCategoryModal(cat.key)} className="text-gray-400 hover:text-gray-600" title="Edit Category">
                  <FaEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Modal */}
      {showCategoryModal && editingCategoryKey && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <motion.div className="bg-white w-full max-w-3xl mx-auto rounded p-4 overflow-y-auto max-h-[80vh]" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">{editingCategoryKey} Images</h2>
              <button onClick={handleCancelCategoryModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              {categoryItems.map((item, idx) => {
                const src = item.imageFile ? item.imagePreview : (signedUrls[item.imagePreview] || (/^(https?:)?\/\//.test(item.imagePreview) ? item.imagePreview : placeholder));
                return (
                  <div key={item.id} className="border rounded p-3 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={src} alt="item preview" className="w-16 h-16 object-cover rounded" />
                      <div className="text-sm">
                        <p className="font-semibold break-all max-w-xs">{item.title || 'Untitled'}</p>
                        <p className="text-xs break-all max-w-xs">{item.imagePreview}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 md:mt-0">
                      <button onClick={() => handleOpenItemModal(item.id)} className="text-gray-400 hover:text-blue-500" title="Edit Item"><FaEdit /></button>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500" title="Remove Item"><FaTrash /></button>
                    </div>
                  </div>
                );
              })}
              <button onClick={handleAddItem} className="inline-flex items-center space-x-1 text-pink-600 hover:text-pink-700 mt-2"><FaPlus /><span>Add</span></button>
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button onClick={handleSaveCategoryModal} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={handleCancelCategoryModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancel</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Item Modal */}
      {showItemModal && editingItem && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <motion.div className="bg-white w-full max-w-md mx-auto rounded p-4" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Gallery Item</h2>
              <button onClick={handleCancelItemModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" placeholder="Enter title" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="mt-1 block w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" accept="image/*" onChange={handleItemFileChange} className="mt-1 block w-full text-sm border rounded cursor-pointer" />
                {(() => {
  let src;
  if (editingItem.imageFile) {
    // show the just‐uploaded blob
    src = editingItem.tempPreview;
  } else {
    // existing logic: signed URL or placeholder
    src = signedUrls[editingItem.imagePreview] ||
          (/^(https?:)?\/\//.test(editingItem.imagePreview)
            ? editingItem.imagePreview
            : placeholder);
  }
  return <img src={src} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />;
})()}

                <p className="text-xs mt-1 break-all">URL: {editingItem.imagePreview}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button onClick={handleSaveItemModal} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={handleCancelItemModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancel</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default GalleryDestination;
