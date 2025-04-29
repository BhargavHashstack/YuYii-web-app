import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import CmsNavbar from "../CmsComponents/CmsNavbar";
import CmsSidebar from "../CmsComponents/CmsSidebar";


// AWS S3 imports & presigner
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default function LandingPage() {
  const [homeData, setHomeData] = useState(null);

  // ===============================
  // Banner State
  // ===============================
  const [selectedBannerState, setSelectedBannerState] = useState("Sultan Bathery");
  const [bannerImage, setBannerImage] = useState(null);


  const [bannerImgUrl,   setBannerImgUrl]   = useState(null);
const [unspoilImgUrls, setUnspoilImgUrls] = useState({});
const [memoryImgUrls,  setMemoryImgUrls]  = useState([]);

  // ===============================
  // Unspoil Destinations
  // ===============================
  const [selectedDestDoc, setSelectedDestDoc] = useState(null);

  const [unspoilDestinations, setUnspoilDestinations] = useState([]);
  const [showUnspoilModal, setShowUnspoilModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [tempUnspoilForm, setTempUnspoilForm] = useState({
    destination: "",
    stateName: "",
    experience: "",
    featuredStay: "",
    banner: "",
  });


  const [cities, setCities] = useState([]);
  const [allDestOptions, setAllDestOptions] = useState([]);    // list of { id, name }
  const [experienceOptions, setExperienceOptions] = useState([]); // strings
  const [stayOptions, setStayOptions] = useState([]);   
  
  // ===============================
  // Travel Plan Tags
  // ===============================
  const [tripTypes, setTripTypes] = useState([
    "Solo",
    "Wildlife",
    "Heritage",
    "Bird Watching",
    "Rainforest",
    "Waterfront",
    "Romantic",
    "Mountains",
  ]);
  const [newTripType, setNewTripType] = useState("");

  // ===============================
  // Featured Rooms
  // ===============================
  const [featuredRooms, setFeaturedRooms] = useState([
    { stay: "", room: "" },
    { stay: "", room: "" },
    { stay: "", room: "" },
  ]);
   // Will hold [{ id, name }] for all stays
   const [staysOptions, setStaysOptions] = useState([]);
   // Parallel array of room‑name lists for each row
   const [roomOptions, setRoomOptions] = useState([[], [], []]);
    // 🚀 1) Fetch all stays on mount
  useEffect(() => {
    fetch("/property-api/selectedstay")
      .then((res) => res.json())
      .then((data) =>
        setStaysOptions(
          data.map((s) => ({ id: s.stayId, name: s.name }))
        )
      )
      .catch((err) => console.error("Error loading stays:", err));
  }, []);


   /* 2️⃣  ⬇️ NEW / RESTORED EFFECT — restore Featured Rooms from DB */
   useEffect(() => {
    if (!homeData || !homeData.rooms) return;

    let parsed = [];
    try {
      parsed = typeof homeData.rooms === "string"
        ? JSON.parse(homeData.rooms)
        : homeData.rooms;
    } catch {
      parsed = [];
    }
    if (!Array.isArray(parsed) || !parsed.length) return;

    // populate dropdowns with saved selections
    setFeaturedRooms(parsed);

    // for each saved stay, grab its room list so the “Select room”
    // dropdown shows the proper options immediately
    parsed.forEach((fr, idx) => {
      if (!fr.stay) return;
      fetch(`/property-api/selectedstay/${encodeURIComponent(fr.stay)}`)
        .then(r => r.json())
        .then(stayDoc => {
          const names = (stayDoc.room || []).map(rm => rm.name);
          setRoomOptions(prev => {
            const next = [...prev];
            next[idx] = names;
            return next;
          });
        })
        .catch(err => console.error("Error loading rooms:", err));
    });
  }, [homeData]);
  /* 2️⃣  ─────────────────────────────────────────────────────────── */

  // 2) When user picks a stay, load its rooms
  const handleStayChange = (idx, stayId) => {
    const next = [...featuredRooms];
    next[idx] = { stay: stayId, room: "" };
    setFeaturedRooms(next);

    fetch(`/property-api/selectedstay/${encodeURIComponent(stayId)}`)
      .then(r => r.json())
      .then(stayDoc => {
        const names = (stayDoc.room || []).map(rm => rm.name);
        setRoomOptions(prev => {
          const nextRO = [...prev];
          nextRO[idx] = names;
          return nextRO;
        });
      })
      .catch(err => console.error("Error loading rooms:", err));
  };

  const handleRoomChange = (idx, room) => {
    const next = [...featuredRooms];
    next[idx].room = room;
    setFeaturedRooms(next);
  };
   // ===============================
  // Featured Stays
  // ===============================
  const [featuredStays, setFeaturedStays] = useState([
    "Lost in the Wilderness",
    "Wilderness Stay",
    "Luxury Hill Getaway",
  ]);

  // ===============================
  // Memories (Experiences)
  // ===============================
  const [memories, setMemories] = useState([]);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [isMemoryEditMode, setIsMemoryEditMode] = useState(false);
  const [editMemoryIndex, setEditMemoryIndex] = useState(null);
  const [tempMemoryForm, setTempMemoryForm] = useState({
    destination: "",
    experience: "",
  });

  const [selectedMemoryDestDoc, setSelectedMemoryDestDoc] = useState(null);
  const [memoryExperienceOptions, setMemoryExperienceOptions] = useState([]);

  // ===============================
  // 1) Fetch data from backend
  // ===============================
  useEffect(() => {
    fetch("/property-api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const doc = Array.isArray(data.data) ? data.data[0] : data.data;

          // Parse banner
          let banner = doc.banner;
          if (typeof banner === "string") {
            try {
              banner = JSON.parse(banner);
            } catch {
              banner = {};
            }
          }

          // Parse destinations
          let destinations = doc.destinations;
          if (typeof destinations === "string") {
            try {
              destinations = JSON.parse(destinations);
            } catch {
              destinations = [];
            }
          }

          // Parse experiences => memories
          let experiences = doc.experiences;
          if (typeof experiences === "string") {
            try {
              experiences = JSON.parse(experiences);
            } catch {
              experiences = [];
            }
          }

          setHomeData(doc);
          setSelectedBannerState(banner.link || "Sultan Bathery");
          setUnspoilDestinations(destinations);
          setMemories(experiences);
          // If needed, parse trip_types, rooms, or stays from doc as well
          // if doc.trip_types is present, etc.
        }
      })
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

   // Fetch initial home data
  useEffect(() => {
    fetch("/property-api/home")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const doc = Array.isArray(data.data) ? data.data[0] : data.data;
          setHomeData(doc);
          setUnspoilDestinations(doc.destinations || []);
        }
      })
      .catch(err => console.error("Error fetching home data:", err));

    // Fetch all destination options for selector
    fetch("/property-api/selecteddestinations")
      .then(res => res.json())
      .then(data => {
        const opts = data.map(d => ({ id: d.id, name: d.name }));
        setAllDestOptions(opts);
      })
      .catch(err => console.error("Error loading destinations:", err));
  }, []);


  // AWS S3 client factory
  const makeS3 = () =>
    new S3Client({
      region: import.meta.env.REACT_APP_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      },
    });

  const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
  const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;

  // 2) Fetch S3 URL for main banner
  useEffect(() => {
    if (!homeData?.banner?.banner) return;
    const s3 = makeS3();
    const fetchBanner = async () => {
      try {
        const key = `${prefix}/${homeData.banner.banner}`;
        const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
        const url = await getSignedUrl(s3, cmd, { expiresIn: 900 });
        setBannerImgUrl(url);
      } catch (e) {
        console.error("Failed signing banner:", e);
        setBannerImgUrl(null);
      }
    };
    fetchBanner();
  }, [homeData]);

  // 3) Fetch S3 URLs for each unspoil destination thumbnail
  useEffect(() => {
    if (!unspoilDestinations.length) return;
    const s3 = makeS3();
    const fetchAll = async () => {
      const urlMap = {};
      await Promise.all(
        unspoilDestinations.map(async (dest) => {
          const folder = dest.destination.toLowerCase().replace(/ /g, "_");
          const key = `${prefix}/destination/${folder}/${dest.banner}`;
          try {
            const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
            urlMap[dest.id] = await getSignedUrl(s3, cmd, { expiresIn: 900 });
          } catch (e) {
            console.error(`Failed signing ${dest.banner}:`, e);
            urlMap[dest.id] = null;
          }
        })
      );
      setUnspoilImgUrls(urlMap);
    };
    fetchAll();
  }, [unspoilDestinations]);

  // 4) Fetch S3 URLs for each memory banner
  useEffect(() => {
    if (!memories.length) return;
    const s3 = makeS3();
    const fetchAll = async () => {
      const urls = await Promise.all(
        memories.map(async (mem) => {
          const folder = mem.destination.toLowerCase().replace(/ /g, "_");
          const key = `${prefix}/destination/${folder}/${mem.banner}`;
          try {
            const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
            return await getSignedUrl(s3, cmd, { expiresIn: 900 });
          } catch (e) {
            console.error(`Failed signing ${mem.banner}:`, e);
            return null;
          }
        })
      );
      setMemoryImgUrls(urls);
    };
    fetchAll();
  }, [memories]);


  useEffect(() => {
    fetch("/property-api/cities")
      .then(res => res.json())
      .then(data => {
        // data is an array of { _id, value, label }
        setCities(data);
      })
      .catch(err => console.error("Error loading cities:", err));
  }, []);
  
  useEffect(() => {
    fetch("/property-api/selecteddestinations")
      .then((res) => res.json())
      .then((data) => {
        // data: array of full destination docs
        // we only need id & name for the selector
        const opts = data.map((d) => ({ id: d.id, name: d.name }));
        setAllDestOptions(opts);
      })
      .catch((err) => console.error("Error loading destinations:", err));
  }, []);
  
  // ===============================
  // 2) Banner image & dropdown
  // ===============================
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      // Optionally update local banner object
    }
  };

  // ===============================
  // 3) Unspoil Destinations
  // ===============================
  const handleAddUnspoilClick = () => {
    setIsEditMode(false);
    setEditId(null);
    setTempUnspoilForm({
      destination: "",
      stateName: "",
      experience: "",
      featuredStay: "",
      banner: "",
    });
    setExperienceOptions([]);
    setStayOptions([]);
    setShowUnspoilModal(true);
  };

  const handleEditUnspoil = (destId) => {
    const found = unspoilDestinations.find((d) => d.id === destId);
    if (!found) return;
    setIsEditMode(true);
    setEditId(destId);
    // We assume found.destination is the name; we need the numeric id
    // So fetch by name to get the full doc:
    fetch(`/property-api/selecteddestinations/${found.destination}`)
      .then((res) => res.json())
      .then((d) => {
        setTempUnspoilForm({
          destination: d.id.toString(),
          stateName: d.state,
          experience: found.experience,
          featuredStay: found.featuredStay,
          banner: d.backgroundImage,
        });
        setExperienceOptions(d.mustTry.map((m) => m.experience));
        setStayOptions(d.stays.map((s) => s.name));
      });
    setShowUnspoilModal(true);
  };

  const handleDeleteUnspoil = (destId) => {
    setUnspoilDestinations((prev) =>
      prev.filter((d) => d.id !== destId)
    );
  };

  // When the user selects a destination from the dropdown:
  const handleDestinationChange = async (e) => {
    const selId = Number(e.target.value);
    
    // Update selected destination
    setTempUnspoilForm((f) => ({ ...f, destination: selId }));
    
    try {
      const res = await fetch(`/property-api/selecteddestinations/${selId}`);
      const d = await res.json();
      setSelectedDestDoc(d); // Ensure this state is set properly
      
      setTempUnspoilForm((f) => ({
        ...f,
        stateName: d.state,
        banner: d.backgroundImage,
        experience: "", // reset experience
        featuredStay: "", // reset featuredStay
        title: d.description?.text || "", // Safely use description.text
      }));
  
      setExperienceOptions(d.mustTry.map((m) => m.experience));
      setStayOptions(d.stays.map((s) => s.name));
    } catch (err) {
      console.error("Error loading selected destination:", err);
    }
  };
  
  const sel = allDestOptions.find(o => o.id === Number(tempUnspoilForm.destination));
  // Save from the modal into our local unspoilDestinations list
  const handleSaveUnspoil = () => {
    if (!selectedDestDoc) {
      alert("Please select a destination first!");
      return;
    }
  
    const expObj =
      selectedDestDoc.mustTry.find((m) => m.experience === tempUnspoilForm.experience) || {};
    const stayObj =
      selectedDestDoc.stays.find((s) => s.name === tempUnspoilForm.featuredStay) || {};
  
    const payload = {
      banner: selectedDestDoc.backgroundImage,
      destination: selectedDestDoc.name,
      id: selectedDestDoc.id,
      title: selectedDestDoc.description?.text || "",
      state: selectedDestDoc.state,
      experience: {
        banner: expObj.image || "",
        title: expObj.experience || "",
      },
      stay: {
        banner: stayObj.image || "",
        featured_video: selectedDestDoc.featured_video || "",
        id: stayObj.id || stayObj.name || "",
        title: stayObj.name || "",
        type: (stayObj.category || []).join(", "),
      },
    };
  
    if (isEditMode) {
      setUnspoilDestinations((prev) => prev.map((d) => (d.id === editId ? payload : d)));
    } else {
      setUnspoilDestinations((prev) => [...prev, payload]);
    }
    setShowUnspoilModal(false);
  };
  

  // ===============================
  // 4) Travel Plan Tags
  // ===============================
  const handleRemoveTripType = (tag) => {
    setTripTypes((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddTripType = () => {
    const trimmed = newTripType.trim();
    if (trimmed && !tripTypes.includes(trimmed)) {
      setTripTypes((prev) => [...prev, trimmed]);
    }
    setNewTripType("");
  };

  // ===============================
  // 5) Memories (Experiences)
  // ===============================
  const handleEditMemory = (index) => {
    const mem = memories[index];
    setIsMemoryEditMode(true);
    setEditMemoryIndex(index);
    // we assume mem.title === experience text, but no dest stored so user must reselect
    setTempMemoryForm({ destination: "", experience: mem.title });
    setMemoryExperienceOptions([]);
    setShowMemoryModal(true);
  };

  const handleAddMemoryClick = () => {
    setIsMemoryEditMode(false);
    setEditMemoryIndex(null);
    setTempMemoryForm({ destination: "", experience: "" });
    setMemoryExperienceOptions([]);
    setShowMemoryModal(true);
  };

  const handleDeleteMemory = (index) => {
    setMemories((prev) => prev.filter((_, i) => i !== index));
  };
  const handleMemoryDestinationChange = async (e) => {
    const selId = Number(e.target.value);
    setTempMemoryForm(f => ({ ...f, destination: selId, experience: "" }));
    const res = await fetch(`/property-api/selecteddestinations/${selId}`);
    const d = await res.json();
    setSelectedMemoryDestDoc(d);
    setMemoryExperienceOptions(d.mustTry.map(m => m.experience));
  };
  const handleSaveMemory = () => {
    const { destination: destId, experience } = tempMemoryForm;
  
    if (!destId) {
      alert("Please select a destination");
      return;
    }
    if (!experience) {
      alert("Please select an experience");
      return;
    }
  
    const expObj = selectedMemoryDestDoc.mustTry.find(
      m => m.experience === experience
    );
    if (!expObj) {
      alert("Selected experience not found!");
      return;
    }
  
    const newMem = {
      title:       expObj.experience,               // <-- add this
      banner:      expObj.image,
      description: expObj.experience,
      destination: selectedMemoryDestDoc.name,
      location:    selectedMemoryDestDoc.state
    };
  
    if (isMemoryEditMode && editMemoryIndex != null) {
      setMemories(prev =>
        prev.map((m, i) => (i === editMemoryIndex ? newMem : m))
      );
    } else {
      setMemories(prev => [...prev, newMem]);
    }
  
    setShowMemoryModal(false);
  };
  // ===============================
  // 6) Final Save All Details
  // ===============================
  const handleSaveAllDetails = () => {
    // Prepare a payload with the updated data from local states
    // If the banner changed, you'd handle that separately or store in homeData
    const payload = {
      banner: homeData.banner, // or JSON.stringify(homeData.banner)
      destinations: JSON.stringify(unspoilDestinations),
      trip_types: JSON.stringify(tripTypes),
      rooms: JSON.stringify(featuredRooms),
      stays: JSON.stringify(featuredStays),
      experiences: JSON.stringify(memories),
    };

    fetch("/property-api/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("All details saved successfully!");
        } else {
          alert("Failed to save details.");
        }
      })
      .catch((err) => console.error("Error saving all details:", err));
  };

  if (!homeData) {
    return (
      <div className="flex">
        <CmsSidebar />
        <div className="flex-1">
          <CmsNavbar />
          <div className="p-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <CmsSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <CmsNavbar />

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* PAGE TITLE */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Landing Page</h1>
          </div>

          {/* BANNER SECTION */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-md font-semibold">Banner Image</h2>
                <button className="bg-pink-100 border border-pink-500 text-pink-500 px-3 py-1 rounded text-sm hover:bg-pink-200">
                  Change Image
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  Image size should be at least 1300x700 pixels
                </p>
              </div>
              <div>
                {/* Banner preview area with overlay */}
                <div className="relative w-72 h-40 border border-gray-200 rounded overflow-hidden bg-gray-50">
                <img
                src={
                  bannerImage
                    ? URL.createObjectURL(bannerImage)
                    : bannerImgUrl || `/assets/images/${homeData.banner.banner}`
                }
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
               
                  </div>
                </div>
              </div>
            </div>
            {/* File input + dropdown */}
            <div className="flex items-center space-x-4">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
                className="text-sm"
              />
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Select state to link from banner
                </label>
                <select
                  value={selectedBannerState}
                  onChange={(e) => setSelectedBannerState(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="Sultan Bathery">Sultan Bathery</option>
                  
                </select>
              </div>
            </div>
          </div>

          {/* UNSPOIL DESTINATIONS SECTION */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold">Unspoil Destinations</h2>
              <button
                onClick={handleAddUnspoilClick}
                className="bg-pink-100 border border-pink-500 text-pink-500 px-3 py-1 rounded text-sm hover:bg-pink-200"
              >
                Select another destination
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {unspoilDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="relative border border-gray-200 p-2 rounded hover:shadow"
                >
                  <img
                    src={
                      unspoilImgUrls[dest.id] ||
                      `/assets/images/${dest.banner}`
                    }
                    alt={dest.destination}
                    className="w-full h-20 object-cover rounded"
                  />
                  <div className="mt-2 text-xs">
                    <p className="font-semibold">{dest.destination}</p>
                    <p className="text-gray-500">
                      {dest.stateName || dest.state}
                    </p>
                  </div>
                  <div className="absolute top-1 right-1 flex space-x-2 text-gray-400">
                    <button
                      title="Edit"
                      onClick={() => handleEditUnspoil(dest.id)}
                    >
                      <FaEdit className="text-black hover:text-blue-500" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDeleteUnspoil(dest.id)}
                    >
                      <FaTrash className="text-black hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRAVEL PLAN TAGS SECTION */}
          <div className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="text-md font-semibold">
              What’s your next travel plan?
            </h2>
            <div className="flex flex-wrap gap-2">
              {tripTypes.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-pink-100 border border-pink-500 text-pink-600 px-2 py-1 rounded text-sm flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <button
                    className="font-bold text-pink-600 hover:text-pink-800"
                    onClick={() => handleRemoveTripType(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add new triptype"
                value={newTripType}
                onChange={(e) => setNewTripType(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handleAddTripType}
                className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* FEATURED ROOMS SECTION */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-md font-semibold">Featured rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredRooms.map((fr, idx) => (
                <div key={idx} className="space-y-3">
                  {/* Select stay */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Select stay {idx + 1}
                    </label>
                    <select
                      value={fr.stay}
                      onChange={(e) => handleStayChange(idx, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                    >
                      <option value="">-- Select stay --</option>
                      {staysOptions.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select room */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Select room
                    </label>
                    <select
                      value={fr.room}
                      onChange={(e) => handleRoomChange(idx, e.target.value)}
                      disabled={!fr.stay}
                      className="border border-gray-300 rounded px-2 py-1 w-full text-sm disabled:opacity-50"
                    >
                      <option value="">-- Select room --</option>
                      {(roomOptions[idx] || []).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FEATURED STAYS SECTION */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-md font-semibold">Featured Stays</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredStays.map((stay, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold mb-1">
                    {stay}
                  </label>
                  <select
                    value={stay}
                    onChange={(e) => {
                      const updated = [...featuredStays];
                      updated[idx] = e.target.value;
                      setFeaturedStays(updated);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                  >
                    <option value="Lost in the Wilderness">
                      Lost in the Wilderness
                    </option>
                    <option value="Wilderness Stay">Wilderness Stay</option>
                    <option value="Luxury Hill Getaway">
                      Luxury Hill Getaway
                    </option>
                    <option value="Majestic Palace Retreat">
                      Majestic Palace Retreat
                    </option>
                  </select>
                </div>
              ))}
            </div>
          </div>

            {/* MEMORIES (EXPERIENCES) SECTION */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold">Create unique and unforgettable memories</h2>
              <button
                onClick={handleAddMemoryClick}
                className="bg-pink-100 border border-pink-500 text-pink-500 px-3 py-1 rounded text-sm hover:bg-pink-200"
              >
                Add memory
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {memories.map((mem, idx) => (
                <div
                  key={idx}
                  className="relative border border-gray-200 p-2 rounded hover:shadow"
                >
                 <img
                    src={
                      memoryImgUrls[idx] ||
                      `/assets/images/${mem.banner}`
                    }
                    alt={mem.title}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="mt-2 text-xs text-gray-700">
                    <p className="font-semibold">{mem.title}</p>
                    {mem.description && (
                      <p className="text-gray-500">{mem.description}</p>
                    )}
                    {mem.location && (
                      <p className="text-gray-500">Location: {mem.location}</p>
                    )}
                    {mem.destination && (
                      <p className="text-gray-500">Destination: {mem.destination}</p>
                    )}
                  </div>
                  <div className="absolute top-1 right-1 flex space-x-2 text-black">
                    <button title="Edit" onClick={() => handleEditMemory(idx)}>
                      <FaEdit className="text-black hover:text-blue-500" />
                    </button>
                    <button title="Delete" onClick={() => handleDeleteMemory(idx)}>
                      <FaTrash className= " text-black hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FINAL SAVE BUTTON */}
          <div className="text-right">
            <button
              onClick={handleSaveAllDetails}
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
            >
              Save All Details
            </button>
          </div>
        </div>
      </div>

      {/* =============== MODAL FOR ADD/EDIT UNSPOIL DESTINATION =============== */}
      <AnimatePresence>
        {showUnspoilModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md mx-auto rounded p-4 shadow-lg relative"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  {isEditMode
                    ? "Edit Unspoil Destination"
                    : "Select another destination"}
                </h2>
                <button
                  onClick={() => setShowUnspoilModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              {/* Modal Form Fields */}
              <div className="space-y-4">
  <div>
    <label className="block text-sm font-semibold mb-1">
      Select destination
    </label>
    <select
      value={tempUnspoilForm.destination}
      onChange={handleDestinationChange}
      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
    >
      <option value="">-- Select destination --</option>
      {allDestOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-semibold mb-1">
      Select experience
    </label>
    <select
      value={tempUnspoilForm.experience}
      onChange={(e) =>
        setTempUnspoilForm((prev) => ({ ...prev, experience: e.target.value }))
      }
      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
    >
      <option value="">-- Select experience --</option>
      {experienceOptions.map((exp) => (
        <option key={exp} value={exp}>
          {exp}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-semibold mb-1">
      Featured stay
    </label>
    <select
      value={tempUnspoilForm.featuredStay}
      onChange={(e) =>
        setTempUnspoilForm((f) => ({ ...f, featuredStay: e.target.value }))
      }
      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
    >
      <option value="">-- Select featured stay --</option>
      {stayOptions.map((st) => (
        <option key={st} value={st}>
          {st}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-semibold mb-1">
      State name
    </label>
    <input
      type="text"
      readOnly
      value={tempUnspoilForm.stateName}
      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-1">
      Banner (image path or file)
    </label>
    <input
      type="text"
      placeholder="sariskaBanner.jpg"
      value={tempUnspoilForm.banner}
      onChange={(e) =>
        setTempUnspoilForm((prev) => ({ ...prev, banner: e.target.value }))
      }
      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
    />
  </div>
</div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleSaveUnspoil}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowUnspoilModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     {/* MEMORY MODAL */}
      <AnimatePresence>
        {showMemoryModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md mx-auto rounded p-4 shadow-lg relative"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  {isMemoryEditMode ? "Edit Experience" : "Add Unique Experience"}
                </h2>
                <button
                  onClick={() => setShowMemoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Select destination
                  </label>
                  <select
                    value={tempMemoryForm.destination}
                    onChange={handleMemoryDestinationChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                  >
                    <option value="">-- Select destination --</option>
                    {allDestOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Select experience
                  </label>
                  <select
                    value={tempMemoryForm.experience}
                    disabled={!tempMemoryForm.destination}
                    onChange={(e) =>
                      setTempMemoryForm((f) => ({
                        ...f,
                        experience: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm disabled:opacity-50"
                  >
                    <option value="">-- Select experience --</option>
                    {memoryExperienceOptions.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleSaveMemory}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowMemoryModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
