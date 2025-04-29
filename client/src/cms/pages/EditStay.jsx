// src/pages/EditStay.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

function EditStay() {
  const { stayId } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);

  // We no longer strip HTML from the story field; we want to preserve the rich text.
  const getStory = (html) => {
    return html || "";
  };

  useEffect(() => {
    fetch(`/property-api/newselectedstay/${stayId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const foundStay = data.data;
          // details might be JSON in string form; parse it if needed.
          let details = foundStay.details;
          if (typeof details === "string") {
            try {
              details = JSON.parse(details);
            } catch (e) {
              details = {};
            }
          }

          // Get banner preview: use the first image from the banner array.
          const bannerImages = Array.isArray(foundStay.banner) ? foundStay.banner : [];
          const bannerImage = bannerImages.length > 0 ? bannerImages[0] : "";

          // Convert array fields to comma-separated strings for form inputs.
          const tripTypeStr = Array.isArray(foundStay.tripType) ? foundStay.tripType.join(", ") : "";
          const stayTypeStr = Array.isArray(foundStay.stayType) ? foundStay.stayType.join(", ") : "";
          const weekdayStr = details && Array.isArray(details.weekday) ? details.weekday.join(", ") : "";
          const weekendStr = details && Array.isArray(details.weekend) ? details.weekend.join(", ") : "";

          // Build the updatedStay object for local state.
          const updatedStay = {
            id: foundStay._id,
            name: foundStay.name || "",
            destination: foundStay.destination || "",
            state: foundStay.state || "",
            price: foundStay.best_price || "",
            tripType: tripTypeStr,
            stayType: stayTypeStr,
            zone: foundStay.zone || "",
            address: (details && details.address) || "",
            checkIn: (details && details.checkInTime) || "",
            checkOut: (details && details.checkOutTime) || "",
            rooms: foundStay.room
              ? foundStay.room.length
              : foundStay.rooms
              ? foundStay.rooms.length
              : "",
            guests: (details && details.guestsCount) || "",
            phone: (details && details.phoneNumber) || "",
            mealType: "", // Not provided in data.
            marketingPitch: "", // Not provided.
            travellerName: foundStay.traveller || "",
            oneLineDescription: (foundStay.overview && foundStay.overview.text) || "",
            date: foundStay.timestamp || "",
            // Preserve the full story including HTML.
            story: getStory(foundStay.story),
            weekdays: weekdayStr,
            weekend: weekendStr,
            featuredVideo: foundStay.featured_video || {},
            highlight: foundStay.highlight || {},
            friend: foundStay.friend || {},
            rating: foundStay.rating || {},
            expertReview: foundStay.expert_review || {},
            // Policy is assumed to be a proper array of objects.
            policy: Array.isArray(foundStay.policy) ? foundStay.policy : [],
            amenities: foundStay.amenities || [],
            activities: foundStay.activities || [],
            overview: foundStay.overview || {},
            images: foundStay.images || [],
            room: foundStay.room || [],
            gallery: foundStay.gallery || {},
            status: foundStay.status || "",
            bannerImage, // banner preview.
          };

          setStay(updatedStay);
        } else {
          console.error("Stay not found");
        }
      })
      .catch((err) => console.error("Error fetching stay: ", err));
  }, [stayId]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
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
      // Policy is sent as an array of objects.
      policy: stay.policy,
      amenities: stay.amenities,
      activities: stay.activities,
      overview: stay.overview,
      images: stay.images,
      room: stay.room,
      gallery: stay.gallery,
      status: stay.status,
      timestamp: stay.date,
      // Banner is sent as an array.
      banner: stay.bannerImage ? [stay.bannerImage] : [],
      // Note: story is sent as is (with HTML) so that rich text is preserved.
      story: stay.story,
    };

    fetch(`/property-api/newselectedstay/${stayId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Navigate to /cms/AllStays after a successful update.
          navigate("/cms/AllStays");
        }
      })
      .catch((err) => console.error("Error updating stay: ", err));
  };

  if (!stay) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <CmsNavbar />
      <div className="flex flex-1">
        <CmsSidebar />
        <div className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Edit Stay</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 shadow rounded">
            {/* Various form fields below (omitted for brevity) */}

            {/* Status Toggle */}
            <div className="col-span-2 flex items-center mb-2">
              <label className="mr-2 font-semibold">Status</label>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={stay.status === "active"}
                onChange={(e) =>
                  setStay({ ...stay, status: e.target.checked ? "active" : "inactive" })
                }
              />
            </div>

            {/* Starting Price */}
            <div>
              <label className="block mb-1 font-semibold">Starting Price</label>
              <input
                type="number"
                name="price"
                value={stay.price}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block mb-1 font-semibold">Destination</label>
              <input
                type="text"
                name="destination"
                value={stay.destination}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* State */}
            <div>
              <label className="block mb-1 font-semibold">State</label>
              <input
                type="text"
                name="state"
                value={stay.state}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Trip Type */}
            <div>
              <label className="block mb-1 font-semibold">Trip Type</label>
              <input
                type="text"
                name="tripType"
                value={stay.tripType}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
                placeholder="e.g. Solo, Wildlife, Bird Watching"
              />
            </div>

            {/* Stay Type */}
            <div>
              <label className="block mb-1 font-semibold">Stay Type</label>
              <input
                type="text"
                name="stayType"
                value={stay.stayType}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
                placeholder="e.g. Pet Friendly, Colonial Bungalow"
              />
            </div>

            {/* Zone */}
            <div>
              <label className="block mb-1 font-semibold">Zone</label>
              <input
                type="text"
                name="zone"
                value={stay.zone}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Actual Name */}
            <div>
              <label className="block mb-1 font-semibold">Actual Name</label>
              <input
                type="text"
                name="name"
                value={stay.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={stay.address}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Banner Image */}
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              {stay.bannerImage && (
                <div className="mt-4">
                  <img
                    src={stay.bannerImage}
                    alt="Banner Preview"
                    className="w-48 h-32 object-cover border border-gray-200 rounded"
                  />
                </div>
              )}
            </div>

            {/* Check-In / Check-Out Times */}
            <div>
              <label className="block mb-1 font-semibold">Check-In Time</label>
              <input
                type="time"
                name="checkIn"
                value={stay.checkIn}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Check-Out Time</label>
              <input
                type="time"
                name="checkOut"
                value={stay.checkOut}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Number of Rooms / Guests */}
            <div>
              <label className="block mb-1 font-semibold">Number of Rooms</label>
              <input
                type="number"
                name="rooms"
                value={stay.rooms}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={stay.guests}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1 font-semibold">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={stay.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Meal Type */}
            <div>
              <label className="block mb-1 font-semibold">Meal Type</label>
              <select
                name="mealType"
                value={stay.mealType}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              >
                <option value="">--Select--</option>
                <option value="MLOS">MLOS</option>
                <option value="EP">EP</option>
                <option value="CP">CP</option>
              </select>
            </div>

            {/* One-Line Description */}
            <div>
              <label className="block mb-1 font-semibold">One-Line Description</label>
              <input
                type="text"
                name="oneLineDescription"
                value={stay.oneLineDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={stay.date}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Story of the Stay (HTML stripped) */}
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Story of the Stay</label>
              <textarea
                name="story"
                value={stay.story}
                onChange={handleChange}
                rows={4}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Weekdays / Weekend */}
            <div>
              <label className="block mb-1 font-semibold">Weekdays</label>
              <input
                type="text"
                name="weekdays"
                value={stay.weekdays}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Weekend</label>
              <input
                type="text"
                name="weekend"
                value={stay.weekend}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Featured Video */}
            <div className="col-span-2">
              <FeaturedVideoUpload initialVideo={stay.featuredVideo} />
            </div>
            {/* Image Uploader */}
            <div className="col-span-2">
              <ImageUploader initialImages={stay.images} />
            </div>

            {/* Amenities & Activities */}
            <div className="col-span-2">
              <AmenitiesActivitiesSelector
                initialAmenities={stay.amenities}
                initialActivities={stay.activities}
              />
            </div>

            {/* Yuyiii Highlight Form */}
            <div className="col-span-2">
              <YuYiiiHighlightForm initialHighlight={stay.highlight} />
            </div>

            {/* Customisable Weekend */}
            <div className="col-span-2">
              <CustomisableWeekend />
            </div>

            {/* Platform Fee */}
            <div className="col-span-2">
              <PlatformFee />
            </div>

            {/* Add Rooms */}
            <div className="col-span-2">
              <AddRooms initialRooms={stay.room} />
            </div>

            {/* Add Age Groups */}
            <div className="col-span-2">
              <AddAgeGroups />
            </div>

            {/* Stay Preferences */}
            <div className="col-span-2">
              <StayPreferences />
            </div>

            {/* Yuyiii Friend */}
            <div className="col-span-2">
              <YuyiiiFriend initialFriend={stay.friend} />
            </div>

            {/* Ratings & Reviews */}
            <div className="col-span-2">
              <RatingsReviewsSection
                initialRating={stay.rating}
                initialExpertReview={stay.expertReview}
              />
            </div>

            {/* Policies Section */}
            <div className="col-span-2">
              <PoliciesSection
                initialPolicy={stay.policy}
                onPolicyChange={(updatedPolicies) =>
                  setStay({ ...stay, policy: updatedPolicies })
                }
              />
            </div>

            {/* Extra Bed Charges */}
            <div className="col-span-2">
              <ExtraBedCharges />
            </div>

            {/* Packages Section */}
            <div className="col-span-2">
              <PackagesSection />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStay;
