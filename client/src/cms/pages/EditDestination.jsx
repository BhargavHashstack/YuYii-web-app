import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CmsNavbar from "../CmsComponents/CmsNavbar";
import CmsSidebar from "../CmsComponents/CmsSidebar";
import GalleryDestination from "../CmsComponents/GalleryDestination";
import ExperienceDestination from "../CmsComponents/ExperienceDestination";
import YuyiiiFriendDestination from "../CmsComponents/YuyiiiFriendDestination";
import Season from "../CmsComponents/Season";
import ReviewDestination from "../CmsComponents/ReviewDestination";
import HowToReachDestination from "../CmsComponents/HowToReachDestination";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadToS3 } from "../utils/s3Upload";
import DestinationStays from "../CmsComponents/Destinationstays";
// Configure S3 client
const s3Client = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});
const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;


function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTripType, setNewTripType] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
 // Background image states
 const [bgFile, setBgFile] = useState(null);
 const [bgPreviewUrl, setBgPreviewUrl] = useState("");
 const [bgSignedUrl, setBgSignedUrl] = useState("");
 const [states, setStates] = useState([]); 
// Featured Video Banner states
const [videoBannerFile, setVideoBannerFile] = useState(null);
const [videoBannerPreview, setVideoBannerPreview] = useState("");
const [videoBannerSignedUrl, setVideoBannerSignedUrl] = useState("");


  // Fetch the destination from the database using your API
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await fetch(`/property-api/selecteddestinations/${id}`);
        if (!res.ok) throw new Error("Destination not found");
        const data = await res.json();
        if (typeof data.featured_video === 'string') {
          try { data.featured_video = JSON.parse(data.featured_video); } catch { data.featured_video = {}; }
        }
        setDestinationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]);

 
 
  // define buildBgKey *before* this useEffect
const buildBgKey = (fileName) => {
  const folder = destinationData?.name
    .toLowerCase()
    .replace(/\s+/g, "_");
  return `${prefix}/destination/${folder}/${fileName}`;
};

useEffect(() => {
  // only fire when we have a name + image, no file‐upload in play,
  // and we haven't already signed one
  if (
    !destinationData?.backgroundImage ||
    bgFile ||
    bgSignedUrl
  ) return;

  const fetchBgUrl = async () => {
    try {
      const key = buildBgKey(destinationData.backgroundImage);
      const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
      const url = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
      setBgSignedUrl(url);
    } catch (e) {
      console.error("Failed signing background image:", e);
      setBgSignedUrl("");
    }
  };

  fetchBgUrl();
}, [
  destinationData?.backgroundImage,
  destinationData?.name,
  bgFile,
  bgSignedUrl,
]);

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

useEffect(() => {
  // need a banner name, no local file in play, and not already signed
  if (
    !destinationData?.featured_video?.banner ||
    videoBannerFile ||
    videoBannerSignedUrl
  ) return;

  const fetchVideoBannerUrl = async () => {
    try {
      const key = buildBgKey(destinationData.featured_video.banner);
      const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
      const url = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
      setVideoBannerSignedUrl(url);
    } catch (e) {
      console.error("Failed signing featured video banner:", e);
    }
  };

  fetchVideoBannerUrl();
}, [
  destinationData?.featured_video?.banner,
  destinationData?.name,
  videoBannerFile,
  videoBannerSignedUrl,
]);


  const handleFieldChange = (field, value) => {
    setDestinationData(prev => ({ ...prev, [field]: value }));
  };


  // replace your old handleBannerChange with this:
  const handleBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !destinationData) return;
    
    try {
      const folder = destinationData.name.toLowerCase().replace(/\s+/g, "_");
      await uploadToS3(folder, file);
      
      const preview = URL.createObjectURL(file);
      setBgFile(file);
      setBgPreviewUrl(preview);
      
      handleFieldChange("backgroundImage", file.name);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not upload background image: " + err.message);
    }
  };
  

  const bgUrl = bgFile ? bgPreviewUrl : bgSignedUrl;
 
  const handleAddTripType = () => {
    if (!newTripType) return;
    const updated = Array.from(new Set([...(destinationData.activities || []), newTripType]));
    handleFieldChange('activities', updated);
    setNewTripType("");
  };
  const handleRemoveTripType = (type) => {
    const updated = (destinationData.activities || []).filter(t => t !== type);
    handleFieldChange('activities', updated);
  };

  const updateDescriptionText = (text) => {
    setDestinationData((prev) => ({
      ...prev,
      description: { ...prev.description, text },
    }));
  };

  const updateSubdescriptionText = (text) => {
    setDestinationData((prev) => ({
      ...prev,
      subdescription: { ...prev.subdescription, text },
    }));
  };

  // Save changes by sending a PUT request to the backend
  const handleSaveAllDetails = async () => {
    try {
      const res = await fetch(`/property-api/selecteddestinations/${destinationData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destinationData),
      });
      if (!res.ok) {
        throw new Error("Failed to update destination");
      }
      const updatedData = await res.json();
      console.log("Update successful:", updatedData);
      navigate("/cms/AllDestination");
    } catch (err) {
      console.error("Error updating destination:", err);
      alert("Error updating destination: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !destinationData) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-white relative">
      <CmsSidebar />
      <div className="flex-1 flex flex-col">
        <CmsNavbar onLogout={() => console.log("Logged out")} />
        <main className="p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {destinationData.name || "Edit Destination"}
            </h1>
            <p className="text-sm text-gray-500">
              Destinations &gt; {destinationData.name || "Edit Destination"}
            </p>
          </div>
          <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name of the destination
              </label>
              <input
                type="text"
                value={destinationData.name}
                disabled={!!destinationData.name}
                className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            {/* State */}
            <div>
      <label className="block text-sm font-medium text-gray-700">
        State
      </label>
      <select
        value={destinationData.state}
        onChange={e => handleFieldChange("state", e.target.value)}
        className="mt-1 block w-full border rounded px-3 py-2 text-sm"
      >
        <option value="" disabled>Select state</option>
        {states.map(st => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>
    </div>
            {/* Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zone
              </label>
              <select
                value={destinationData.zone}
                onChange={(e) => handleFieldChange("zone", e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Select Zone</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
            {/* Trip Types as keyword buttons */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Trip Types</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(destinationData.activities || []).map(type => (
                  <span
                    key={type}
                    className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                  >
                    {type}
                    <button
                      onClick={() => handleRemoveTripType(type)}
                      className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add trip type"
                  value={newTripType}
                  onChange={e => setNewTripType(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  onClick={handleAddTripType}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
                >Add</button>
              </div>
            </div>
            {/* One line pitch */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                One line pitch for the destination
              </label>
              <input
                type="text"
                value={destinationData.description?.text || ""}
                onChange={(e) => updateDescriptionText(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            {/* Summary */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Summary about this destination
              </label>
              <textarea
                rows="3"
                value={destinationData.subdescription?.text || ""}
                onChange={(e) => updateSubdescriptionText(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          {/* Background Image with Preview */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700">
    Background Image
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={handleBannerChange}
    className="mt-1 block w-full text-sm border rounded cursor-pointer"
  />

  {(bgFile || bgSignedUrl) && (
    <div className="mt-2">
      <img
        src={bgFile ? bgPreviewUrl : bgSignedUrl}
        alt="Background Preview"
        className="w-full max-h-48 object-cover rounded"
      />
      <p className="mt-1 text-sm text-gray-500">
        {bgFile ? bgFile.name : destinationData.backgroundImage}
      </p>
    </div>
  )}
</div>


         {/* Featured Video fields */}
         <div className="md:col-span-2 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Featured Video URL</label>
                <input
                  type="text"
                  value={destinationData.featured_video?.video || ""}
                  onChange={e => handleFieldChange("featured_video", { ...(destinationData.featured_video || {}), video: e.target.value })}
                  className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Featured Video Banner</label>
                
               {/* replace your featured-video-banner <input> with this: */}
               <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file || !destinationData) return;

    try {
      const folder = destinationData.name.toLowerCase().replace(/\s+/g, "_");
      await uploadToS3(folder, file);
      
      const preview = URL.createObjectURL(file);
      setVideoBannerFile(file);
      setVideoBannerPreview(preview);
      
      handleFieldChange("featured_video", {
        ...(destinationData.featured_video || {}),
        banner: file.name,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not upload video banner: " + err.message);
    }
  }}
  className="mt-1 block w-full text-sm border rounded cursor-pointer"
/>


{/* show only once we have either a fresh file or a signed URL */}
{(videoBannerFile || videoBannerSignedUrl) && (
  <div className="mt-2">
    <img
      src={videoBannerFile ? videoBannerPreview : videoBannerSignedUrl}
      alt="Featured Banner Preview"
      className="w-full max-h-48 object-cover rounded"
    />
    <p className="mt-1 text-sm text-gray-500">
      {videoBannerFile
        ? videoBannerFile.name
        : destinationData.featured_video.banner}
    </p>
  </div>
)}

              </div>
            </div>

            {/* Subcomponents */}
            <div className="md:col-span-2">
            <GalleryDestination
  images={destinationData.images}
  destinationName={destinationData.name}
  onChange={(newImages) => handleFieldChange("images", newImages)}
/>
            </div>
            <div className="md:col-span-2">
            <ExperienceDestination
  mustTry={destinationData.mustTry}
  destinationName={destinationData.name}
  onChange={(newMustTry) => handleFieldChange("mustTry", newMustTry)}
/>
            </div>
            <div className="md:col-span-2">
              <DestinationStays
                stays={destinationData.stays || []}
                destinationName={destinationData.name}  
                onChange={(newStays) => handleFieldChange("stays", newStays)}
              />
            </div>
            <div className="md:col-span-2">
              <YuyiiiFriendDestination
                yuyiiiFriend={destinationData.yuyiiiFriend}
                destinationName={destinationData.name}
                onChange={(newData) => handleFieldChange("yuyiiiFriend", newData)}
              />
            </div>
            <div className="md:col-span-2">
              <Season
                weather={destinationData.weather}
                onChange={(newWeather) => handleFieldChange("weather", newWeather)}
              />
            </div>
            <div className="md:col-span-2">
              <ReviewDestination
              destinationName={destinationData.name}
                review={destinationData.review}
                reviewData={{
                  reviewerName: destinationData.reviewerName,
                  reviewer: destinationData.reviewer,
                  designation: destinationData.designation,
                  place: destinationData.place || ""
                }}
                onChange={(newReviewData) => {
                  handleFieldChange("review", newReviewData.review);
                  handleFieldChange("reviewerName", newReviewData.reviewData.reviewerName);
                  handleFieldChange("reviewer", newReviewData.reviewData.reviewer);
                  handleFieldChange("designation", newReviewData.reviewData.designation);
                  handleFieldChange("place", newReviewData.reviewData.place);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <HowToReachDestination
                destinationName={destinationData.name}  
                howToReach={{
                  air: destinationData.airLocations,
                  rail: destinationData.railLocations,
                  road: destinationData.roadLocations,
                }}
                eatery={destinationData.eatery || destinationData.airLocations?.eatery || []}
                scenic={destinationData.scenic || destinationData.airLocations?.scenic || []}
                onChange={(updated) => {
                  handleFieldChange("airLocations", updated.air);
                  handleFieldChange("roadLocations", updated.road);
                  if (updated.eatery) handleFieldChange("eatery", updated.eatery);
                  if (updated.scenic) handleFieldChange("scenic", updated.scenic);
                }}
              />
            </div>
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
    </div>
  );
}

export default EditDestination;
