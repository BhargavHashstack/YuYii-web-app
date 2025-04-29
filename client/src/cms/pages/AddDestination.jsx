// src/cms/CmsComponents/AddDestination.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  S3Client,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadToS3 } from "../utils/s3Upload";
import CmsNavbar from "../CmsComponents/CmsNavbar";
import CmsSidebar from "../CmsComponents/CmsSidebar";
import GalleryDestination from "../CmsComponents/GalleryDestination";
import ExperienceDestination from "../CmsComponents/ExperienceDestination";
import YuyiiiFriendDestination from "../CmsComponents/YuyiiiFriendDestination";
import Season from "../CmsComponents/Season";
import ReviewDestination from "../CmsComponents/ReviewDestination";
import HowToReachDestination from "../CmsComponents/HowToReachDestination";
import DestinationStays from "../CmsComponents/Destinationstays"; 

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

export default function AddDestination() {
  const navigate = useNavigate();

  // Basic fields :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
  const [destinationName, setDestinationName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [zone, setZone] = useState("");
  const [tripTypes, setTripTypes] = useState([]);
  const [oneLinePitch, setOneLinePitch] = useState("");
  const [summary, setSummary] = useState("");
  const [states, setStates] = useState([]);
  // Background image upload & preview
  const [bgFile, setBgFile] = useState(null);
  const [bgPreviewUrl, setBgPreviewUrl] = useState("");
  const [bgSignedUrl, setBgSignedUrl] = useState(""); // not used for new, but kept for symmetry

  // Featured video URL + banner
  const [featuredVideo, setFeaturedVideo] = useState("");
  const [videoBannerFile, setVideoBannerFile] = useState(null);
  const [videoBannerPreview, setVideoBannerPreview] = useState("");
  const [videoBannerSignedUrl, setVideoBannerSignedUrl] = useState("");

  // Sub-component state :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}
  const [images, setImages] = useState({
    lifeStyle: [], fun: [], foodAndDrink: [], places: []
  });
  const [mustTry, setMustTry] = useState([]);
  const [stays, setStays] = useState([]);
  const [yuyiiiFriend, setYuyiiiFriend] = useState({});
  const [weather, setWeather] = useState({});
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState({
    reviewerName: "", reviewer: "", designation: "", place: ""
  });
  const [howToReach, setHowToReach] = useState({
    air: {}, rail: {}, road: {}
  });

  // Modal for name :contentReference[oaicite:4]{index=4}&#8203;:contentReference[oaicite:5]{index=5}
  const [showNameModal, setShowNameModal] = useState(true);
  const [tempName, setTempName] = useState("");
  const handleSaveName = () => {
    if (tempName.trim()) setDestinationName(tempName.trim());
    setShowNameModal(false);
  };
  const handleCancel = () => navigate("/cms/AllDestination");

  // Helpers to upload & preview
  const buildKey = (fileName) =>
    `${prefix}/destination/${destinationName.toLowerCase().replace(/\s+/g, "_")}/${fileName}`;

  const handleBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !destinationName) return;
    try {
      await uploadToS3(destinationName, file);
      setBgFile(file);
      setBgPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      console.error(err);
      alert("Could not upload background image: " + err.message);
    }
  };


   // fetch all destinations to populate states dropdown
   useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch('/property-api/selecteddestinations');
        if (!res.ok) throw new Error('Couldn’t load states');
        const all = await res.json();
        const unique = Array.from(new Set(all.map(d => d.state).filter(Boolean)));
        setStates(unique);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStates();
  }, []);

  const handleVideoBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !destinationName) return;
    try {
      await uploadToS3(destinationName, file);
      setVideoBannerFile(file);
      setVideoBannerPreview(URL.createObjectURL(file));
    } catch (err) {
      console.error(err);
      alert("Could not upload video banner: " + err.message);
    }
  };

  // Add trip types
  const handleTripTypeChange = (e) => {
    const opts = Array.from(e.target.options);
    setTripTypes(opts.filter(o => o.selected).map(o => o.value));
  };

  // Submit
  const handleSaveAllDetails = async () => {
    const payload = {
      id: Date.now(),
      name: destinationName,
      state: selectedState,
      zone,
      tripTypes,
      description: { text: oneLinePitch },
      subdescription: { text: summary },
      backgroundImage: bgFile?.name || "",
      featured_video: {
        video: featuredVideo,
        banner: videoBannerFile?.name || ""
      },
      images,
      mustTry,
      stays,
      yuyiiiFriend,
      weather,
      review,
      reviewerName: reviewData.reviewerName,
      reviewer: reviewData.reviewer,
      designation: reviewData.designation,
      place: reviewData.place,
      airLocations: howToReach.air,
      railLocations: howToReach.rail,
      roadLocations: howToReach.road,
    };

    try {
      const res = await fetch("/property-api/selecteddestinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add destination");
      navigate("/cms/AllDestination");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CmsSidebar />
      <div className="flex-1 flex flex-col">
        <CmsNavbar onLogout={() => {}} />
        <main className="p-4">
          <h1 className="text-2xl font-bold">
            {destinationName || "New Destination"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
            {/* Name (disabled once set) */}
            <div>
              <label>Name</label>
              <input
                type="text"
                value={destinationName}
                disabled
                className="w-full border rounded px-2 py-1"
              />
            </div>
            {/* State */}
             <div>
      <label>State</label>
      <select
        value={selectedState}
        onChange={e => setSelectedState(e.target.value)}
        className="w-full border rounded px-2 py-1"
      >
        <option value="">Select state</option>
        {states.map(st => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>
    </div>
            {/* Zone */}
            <div>
              <label>Zone</label>
              <select
                value={zone}
                onChange={e => setZone(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Select zone</option>
                {["North","South","East","West"].map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
            {/* Trip Types */}
            <div>
              <label>Trip Types</label>
              <select
                multiple
                value={tripTypes}
                onChange={handleTripTypeChange}
                className="w-full border rounded px-2 py-1"
              >
                {["Solo","Wildlife","Mountains","Family"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            {/* Pitch */}
            <div className="md:col-span-2">
              <label>One-line pitch</label>
              <input
                type="text"
                value={oneLinePitch}
                onChange={e => setOneLinePitch(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            {/* Summary */}
            <div className="md:col-span-2">
              <label>Summary</label>
              <textarea
                rows="3"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            {/* Background Image */}
            <div className="md:col-span-2">
              <label>Background Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="w-full text-sm border rounded cursor-pointer"
              />
              {(bgFile || bgPreviewUrl) && (
                <img
                  src={bgPreviewUrl}
                  alt="Background preview"
                  className="mt-2 w-full h-48 object-cover rounded"
                />
              )}
            </div>
            {/* Featured Video */}
            <div>
              <label>Featured Video URL</label>
              <input
                type="text"
                value={featuredVideo}
                onChange={e => setFeaturedVideo(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            {/* Featured Video Banner */}
            <div>
              <label>Video Banner</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleVideoBannerChange}
                className="w-full text-sm border rounded cursor-pointer"
              />
              {(videoBannerFile || videoBannerPreview) && (
                <img
                  src={videoBannerPreview}
                  alt="Video banner preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          {/* Sub-components :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7} */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <GalleryDestination
              images={images}
              destinationName={destinationName}
              onChange={setImages}
            />
            <ExperienceDestination
              mustTry={mustTry}
              destinationName={destinationName}
              onChange={setMustTry}
            />
            <DestinationStays
              stays={stays}
              destinationName={destinationName}
              onChange={setStays}
            />
            <YuyiiiFriendDestination
              yuyiiiFriend={yuyiiiFriend}
              destinationName={destinationName}
              onChange={setYuyiiiFriend}
            />
            <Season
              weather={weather}
              onChange={setWeather}
            />
            <ReviewDestination
              destinationName={destinationName}
              review={review}
              reviewData={reviewData}
              onChange={({ review: r, reviewData: rd }) => {
                setReview(r);
                setReviewData(rd);
              }}
            />
            <HowToReachDestination
              destinationName={destinationName}
              howToReach={howToReach}
              onChange={setHowToReach}
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleSaveAllDetails}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
            >
              Save All Details
            </button>
          </div>
        </main>
      </div>

      {/* Name-prompt modal */}
      {showNameModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <motion.div className="bg-white p-6 rounded w-96"
            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-2">Destination Name</h2>
            <p className="mb-4 text-sm text-gray-600">
              Enter a name (cannot be changed later)
            </p>
            <input
              type="text"
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSaveName}
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
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
