// src/cms/CmsComponents/HowToReachDestination.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { motion } from "framer-motion";
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

export default function HowToReachDestination({
  howToReach: propHowToReach = {},
  destinationName = "",
  onChange,
}) {
  // initialize per-tab data
  const defaults = { map: "", note: "", routes: [], eatery: [], scenic: [] };
  const initial = {
    air: { ...defaults, ...(propHowToReach.air || {}) },
    rail: { ...defaults, ...(propHowToReach.rail || {}) },
    road: { ...defaults, ...(propHowToReach.road || {}) },
  };
  const [local, setLocal] = useState(initial);
  const [activeTab, setActiveTab] = useState("air");

  // cache of presigned URLs & blob previews
  const [urlCache, setUrlCache] = useState({}); // { [itemId]: url }

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("new"); // "new" or "edit"
  const [editingItem, setEditingItem] = useState(null);

  // propagate changes up
  useEffect(() => {
    onChange?.(local);
  }, [local, onChange]);

  // build S3 key
  const buildKey = (fileName) => {
    const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
    return `${prefix}/destination/${folder}/${fileName}`;
  };

  // fetch presigned URL
  const fetchUrl = async (fileName, id) => {
    try {
      const cmd = new GetObjectCommand({ Bucket: bucket, Key: buildKey(fileName) });
      const url = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
      setUrlCache((p) => ({ ...p, [id]: url }));
    } catch (e) {
      console.error("Presign error:", e);
    }
  };

  // presign missing banners
  useEffect(() => {
    const { eatery, scenic } = local[activeTab];
    [...eatery, ...scenic].forEach((it) => {
      if (it.banner && !urlCache[it.id] && !/^blob:/.test(urlCache[it.id] || "")) {
        fetchUrl(it.banner, it.id);
      }
    });
  }, [local, activeTab, destinationName]);

  // basic field updaters
  const updateField = (field, value) =>
    setLocal((p) => ({
      ...p,
      [activeTab]: { ...p[activeTab], [field]: value },
    }));

  const addRoute = () => updateField("routes", [...local[activeTab].routes, ""]);
  const changeRoute = (i, v) =>
    updateField(
      "routes",
      local[activeTab].routes.map((r, idx) => (idx === i ? v : r))
    );
  const removeRoute = (i) =>
    updateField(
      "routes",
      local[activeTab].routes.filter((_, idx) => idx !== i)
    );

  // modal openers
  const openNewModal = () => {
    setModalMode("new");
    setEditingItem({ id: Date.now(), place: "", map: "", banner: "", type: "eatery" });
    setShowModal(true);
  };
  const openEditModal = (item, type) => {
    setModalMode("edit");
    setEditingItem({ ...item, type });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  // image upload + preview
  const handleBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const folder = destinationName.toLowerCase().replace(/\s+/g, "_");
      await uploadToS3(folder, file);
      const blobUrl = URL.createObjectURL(file);
      setUrlCache((p) => ({ ...p, [editingItem.id]: blobUrl }));
      setEditingItem((it) => ({ ...it, banner: file.name }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not upload image: " + err.message);
    }
  };

  // modal saver
  const saveModal = () => {
    const { id, place, map, banner, type } = editingItem;
    setLocal((p) => {
      const list = p[activeTab][type];
      const item = { id, place, map, banner };
      const updatedList = modalMode === "new" ? [...list, item] : list.map((it) => (it.id === id ? item : it));
      return { ...p, [activeTab]: { ...p[activeTab], [type]: updatedList } };
    });
    closeModal();
  };

  // merged items
  const mergedItems = [
    ...local[activeTab].eatery.map((it) => ({ ...it, type: "eatery" })),
    ...local[activeTab].scenic.map((it) => ({ ...it, type: "scenic" })),
  ];

  // render cards
  const renderCards = () =>
    mergedItems.map((it) => (
      <div key={it.id} className="bg-white shadow rounded p-4 flex flex-col space-y-2">
        {it.banner ? (
          <img src={urlCache[it.id] || it.banner} alt={it.place} className="w-full h-32 object-cover rounded" />
        ) : (
          <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
        <h4 className="font-semibold text-gray-700">{it.place}</h4>
        {it.map && (
          <a href={it.map} target="_blank" rel="noreferrer" className="text-sm text-pink-600">
            View on map
          </a>
        )}
        <div className="flex justify-end space-x-2">
          <button onClick={() => openEditModal(it, it.type)} className="text-gray-400 hover:text-blue-500"><FaEdit /></button>
          <button onClick={() => setLocal((p) => ({
              ...p,
              [activeTab]: {
                ...p[activeTab],
                [it.type]: p[activeTab][it.type].filter((x) => x.id !== it.id),
              },
            }))} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
        </div>
      </div>
    ));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">How to reach</h2>
      <div className="flex space-x-4 border-b mb-4">
        {['air','rail','road'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 px-2 ${activeTab===tab ? 'text-pink-600 border-pink-600 border-b-2 font-semibold' : 'text-gray-600'}`}>By {tab.charAt(0).toUpperCase()+tab.slice(1)}</button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Google map location URL</label>
        <input type="text" value={local[activeTab].map} onChange={e=>updateField('map',e.target.value)} className="mt-1 mb-3 block w-full border rounded px-3 py-2 text-sm" />

        <label className="block text-sm font-medium text-gray-700">Note</label>
        <textarea rows="3" value={local[activeTab].note} onChange={e=>updateField('note',e.target.value)} className="mt-1 mb-3 block w-full border rounded px-3 py-2 text-sm" />

        <label className="block text-sm font-medium text-gray-700 mb-1">Routes</label>
        {local[activeTab].routes.map((r,i)=>(
          <div key={i} className="flex items-center space-x-2 mb-2">
            <input type="text" value={r} onChange={e=>changeRoute(i,e.target.value)} className="flex-1 border rounded px-3 py-2 text-sm" />
            <button onClick={()=>removeRoute(i)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
          </div>
        ))}
        <button onClick={addRoute} className="bg-pink-50 text-pink-600 border border-pink-600 hover:bg-pink-100 px-3 py-1 rounded text-sm">Add route</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Picturesque locations & recommended eateries</h3>
          <button onClick={openNewModal} className="border border-pink-600 text-pink-600 px-4 py-1 rounded hover:bg-pink-50 text-sm">Add new</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {renderCards()}
        </div>
      </div>

      {showModal && editingItem && (
        <motion.div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}}>
          <motion.div className="bg-white rounded-lg p-6 w-full max-w-lg relative" initial={{scale:0.8}} animate={{scale:1}}>
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">×</button>
            <h2 className="text-xl font-semibold mb-4">{modalMode==='new'? 'Add new':'Edit'} {editingItem.type==='eatery'? 'Eatery':'Scenic spot'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium">Name</label><input type="text" value={editingItem.place} onChange={e=>setEditingItem(it=>({...it,place:e.target.value}))} placeholder="Eg: Rao Hotel" className="mt-1 block w-full border rounded px-3 py-2 text-sm"/></div>
              <div><label className="block text-sm font-medium">Category</label><select value={editingItem.type} onChange={e=>setEditingItem(it=>({...it,type:e.target.value}))} className="mt-1 block w-full border rounded px-3 py-2 text-sm"><option value="eatery">Food</option><option value="scenic">Scenic</option></select></div>
            </div>
            <div className="mt-4"><label className="block text-sm font-medium">Google map URL</label><input type="text" value={editingItem.map} onChange={e=>setEditingItem(it=>({...it,map:e.target.value}))} placeholder="Eg: https://goo.gl/..." className="mt-1 block w-full border rounded px-3 py-2 text-sm"/></div>
            <div className="mt-4"><label className="block text-sm font-medium">Upload image</label><input type="file" accept="image/*" onChange={handleBannerChange} className="mt-1 block w-full text-sm"/></div>
            <div className="mt-4"><img src={urlCache[editingItem.id]||editingItem.banner} alt="Preview" className="w-full h-48 object-cover rounded"/></div>
            <div className="mt-6 flex justify-end space-x-3"><button onClick={saveModal} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Save</button><button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancel</button></div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
