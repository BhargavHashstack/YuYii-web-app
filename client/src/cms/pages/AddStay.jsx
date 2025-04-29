// src/pages/AddStay.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CmsSidebar from "../CmsComponents/CmsSidebar";
import CmsNavbar from "../CmsComponents/CmsNavbar";
import ImageUploader from "../CmsComponents/EditStayImageVideo";
import FeaturedVideoUpload from "../CmsComponents/FeaturedVideoUpload";
import AmenitiesActivitiesSelector from "../CmsComponents/AmenitiesAcitivitiesSelector";
import YuYiiiHighlightForm from "../CmsComponents/YuyiiiHighlightForm";
import CustomisableWeekend from "../CmsComponents/CustomisableWeekend";
import PlatformFee from "../CmsComponents/PlatformFee";
import AddAgeGroups from "../CmsComponents/AddAgeGroups";
import StayPreferences from "../CmsComponents/StayPreferences";
import YuyiiiFriend from "../CmsComponents/YuyiiiFriend";
import RatingsReviewsSection from "../CmsComponents/RatingReviewSection";
import PoliciesSection from "../CmsComponents/PoliciesSection";
import ExtraBedCharges from "../CmsComponents/ExtraBedCharges";
import PackagesSection from "../CmsComponents/PackagesSection";
import AddRooms from "../CmsComponents/AddRooms";

function AddStay() {
  const navigate = useNavigate();

  // Set initial state for all fields. For required fields (like story, traveller, timestamp) we provide empty strings,
  // and you may enforce client-side validation.
  const [stay, setStay] = useState({
    name: "",
    destination: "",
    state: "",
    price: "",
    tripType: "",
    stayType: "",
    zone: "",
    address: "",
    checkIn: "",
    checkOut: "",
    rooms: "",
    guests: "",
    phone: "",
    mealType: "",
    marketingPitch: "",
    travellerName: "",
    oneLineDescription: "",
    date: "",
    story: "", // required; rich text preserved
    weekdays: "",
    weekend: "",
    featuredVideo: {},
    highlight: {},
    friend: {},
    rating: {},
    expertReview: {},
    policy: [],
    amenities: [],
    activities: [],
    overview: {},
    images: [],
    room: [],
    gallery: {},
    status: "active",
    bannerImage: "",
  });

  const navigateToAllStays = () => {
    navigate("/cms/AllStays");
  };

  const handleChange = (e) => {
    setStay({ ...stay, [e.target.name]: e.target.value });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStay({ ...stay, bannerImage: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // (Optional) Validate required fields
    if (!stay.story.trim()) {
      alert("Please enter the story of the stay.");
      return;
    }
    if (!stay.travellerName.trim()) {
      alert("Please enter the traveller name.");
      return;
    }
    if (!stay.date.trim()) {
      alert("Please enter the date.");
      return;
    }

    // Construct new stay object.
    const newStayData = {
      name: stay.name,
      destination: stay.destination,
      state: stay.state,
      best_price: stay.price,
      tripType: stay.tripType ? stay.tripType.split(",").map((t) => t.trim()) : [],
      stayType: stay.stayType ? stay.stayType.split(",").map((t) => t.trim()) : [],
      zone: stay.zone,
      details: {
        address: stay.address,
        checkInTime: stay.checkIn,
        checkOutTime: stay.checkOut,
        phoneNumber: stay.phone,
        guestsCount: stay.guests,
        weekday: stay.weekdays ? stay.weekdays.split(",").map((t) => t.trim()) : [],
        weekend: stay.weekend ? stay.weekend.split(",").map((t) => t.trim()) : [],
      },
      featured_video: stay.featuredVideo,
      highlight: stay.highlight,
      friend: stay.friend,
      rating: stay.rating,
      expert_review: stay.expertReview,
      policy: stay.policy,
      amenities: stay.amenities,
      activities: stay.activities,
      overview: stay.overview,
      images: stay.images,
      room: stay.room,
      gallery: stay.gallery,
      status: stay.status,
      timestamp: stay.date,
      banner: stay.bannerImage ? [stay.bannerImage] : [],
      story: stay.story,
      oneLineDescription: stay.oneLineDescription,
      traveller: stay.travellerName,
    };
    try{
      const res = await axios.post("/property-api/newselectedstay",newStayData);
        if (res.data.success) {
          navigateToAllStays();
        } else {
          alert("Error creating stay: " + data.message);
        }
    } catch(error) {
        console.error("Error creating stay: ", err)
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <CmsNavbar />
      <div className="flex flex-1">
        <CmsSidebar />
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Stay</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 shadow rounded">
            {/* Basic Stay Details */}
            <div>
              <label className="block mb-1 font-semibold">Starting Price</label>
              <input type="number" name="price" value={stay.price} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Destination</label>
              <input type="text" name="destination" value={stay.destination} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">State</label>
              <input type="text" name="state" value={stay.state} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Trip Type</label>
              <input type="text" name="tripType" value={stay.tripType} onChange={handleChange} placeholder="e.g. Solo, Wildlife" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Stay Type</label>
              <input type="text" name="stayType" value={stay.stayType} onChange={handleChange} placeholder="e.g. Pet Friendly" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Zone</label>
              <input type="text" name="zone" value={stay.zone} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Actual Name</label>
              <input type="text" name="name" value={stay.name} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Address</label>
              <input type="text" name="address" value={stay.address} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Check In Time</label>
              <input type="time" name="checkIn" value={stay.checkIn} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Check Out Time</label>
              <input type="time" name="checkOut" value={stay.checkOut} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">No. of Rooms</label>
              <input type="number" name="rooms" value={stay.rooms} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">No. of Guests</label>
              <input type="number" name="guests" value={stay.guests} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Phone Number</label>
              <input type="text" name="phone" value={stay.phone} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Meal Type</label>
              <select name="mealType" value={stay.mealType} onChange={handleChange} className="border rounded px-2 py-1 w-full">
                <option value="">Select Meal Type</option>
                <option value="MLOS">MLOS</option>
                <option value="EP">EP</option>
                <option value="CP">CP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Marketing Pitch</label>
              <input type="text" name="marketingPitch" value={stay.marketingPitch} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Traveller Name</label>
              <input type="text" name="travellerName" value={stay.travellerName} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">One Line Description</label>
              <input type="text" name="oneLineDescription" value={stay.oneLineDescription} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input type="date" name="date" value={stay.date} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Story of the Stay</label>
              <textarea name="story" value={stay.story} onChange={handleChange} rows={3} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Weekdays</label>
              <input type="text" name="weekdays" value={stay.weekdays} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Weekend</label>
              <input type="text" name="weekend" value={stay.weekend} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
            {/* Shared Components */}
            <div className="col-span-2">
              <ImageUploader initialImages={[]} />
            </div>
            <div className="col-span-2">
              <FeaturedVideoUpload initialVideo={{ video: "", banner: "" }} />
            </div>
            <div className="col-span-2">
              <AmenitiesActivitiesSelector initialAmenities={[]} initialActivities={[]} />
            </div>
            <div className="col-span-2">
              <YuYiiiHighlightForm initialHighlight={{}} />
            </div>
            <div className="col-span-2">
              <CustomisableWeekend />
            </div>
            <div className="col-span-2">
              <PlatformFee />
            </div>
            <div className="col-span-2">
              <AddRooms initialRooms={[]} />
            </div>
            <div className="col-span-2">
              <AddAgeGroups />
            </div>
            <div className="col-span-2">
              <StayPreferences />
            </div>
            <div className="col-span-2">
              <YuyiiiFriend initialFriend={{}} />
            </div>
            <div className="col-span-2">
              <RatingsReviewsSection />
            </div>
            <div className="col-span-2">
              <PoliciesSection initialPolicy={[]} />
            </div>
            <div className="col-span-2">
              <ExtraBedCharges />
            </div>
            <div className="col-span-2">
              <PackagesSection />
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                Save Stay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStay;
