// SelectedDestination.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DestinationOverview from "../components/SelectedDestinationComponents/DestinationOverview";
import DestinationGallery from "../components/SelectedDestinationComponents/DestinationGallery";
import DestinationStayCarousel from "../components/SelectedDestinationComponents/DestinationStayCarousel";
import DestinationMustVisit from "../components/SelectedDestinationComponents/DestinationMustVisit";
import DestinationWeather from "../components/SelectedDestinationComponents/DestinationWeather";
import MustTryExperiences from "../components/SelectedDestinationComponents/MustTryExperiences";
import DestinationHowToReach from "../components/SelectedDestinationComponents/DestinationHowToReach";
import DestinationReview from "../components/SelectedDestinationComponents/DestinationReview";
import PartnerSection from "../components/RepeatedComponents/Partners";
import S3Image from "../components/SelectedDestinationComponents/S3Image";

const SelectedDestination = () => {
  const { DestinationId } = useParams();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("lifeStyle");
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const fetchSelectedDestination = async () => {
      try {
        const res = await fetch(`/property-api/selecteddestinations/${DestinationId}`);
        if (!res.ok) {
          throw new Error("Selected destination not found");
        }
        const data = await res.json();
        setSelectedDestination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedDestination();
  }, [DestinationId]);

  if (loading) return <div>Loading...</div>;
  if (error || !selectedDestination)
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-pink-600">Error</h1>
        <p className="mt-4 text-gray-700 text-lg">
          {error || "Selected destination not found"}
        </p>
      </div>
    );

  const {
    name,
    state,
    zone,
    description,
    subdescription,
    backgroundImage,
    activities = [],
    images = {},
    mustTry = [],
    amenities = [],
    stays = [],
    availability = {},
    mustVisit = {},
    weather = {},
    review = "",
    reviewer = "",
    reviewerName = "",
    designation = "",
    transport = {},
    yuyiiiFriend = {},  
    airLocations = {},
    roadLocations = {},
    featured_video, // e.g. '{"video": "https://www.youtube.com/watch?v=1_9-OLeDPKU", ...}'
  } = selectedDestination;

  // Derive folder name from destination name (e.g. "Sariska" -> "sariska")
  const folderName = name.toLowerCase().replace(/ /g, "_");

  // Parse the featured_video field (if exists) and retrieve the video URL.
  let featuredVideoObj = null;
  if (featured_video) {
    try {
      featuredVideoObj =
        typeof featured_video === "string"
          ? JSON.parse(featured_video)
          : featured_video;
    } catch (e) {
      console.error("Error parsing featured_video:", e);
    }
  }

  // Helper function to convert a YouTube URL to an embeddable URL.
  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);
      // Standard youtube.com/watch URL
      if (urlObj.hostname.includes("youtube.com") && urlObj.pathname === "/watch") {
        const videoId = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      // youtu.be short link
      if (urlObj.hostname.includes("youtu.be")) {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    } catch (e) {
      console.error("Invalid URL", e);
    }
    return url;
  };

  // Get the embed URL for the featured video (if available).
  const embedUrl = featuredVideoObj?.video ? getEmbedUrl(featuredVideoObj.video) : null;

  // Toggle function to show/hide the video modal.
  const toggleVideoModal = () => {
    setShowVideoModal(!showVideoModal);
  };

  return (
    <div className="bg-[#FFFFFF] mx-auto relative">
      {/* Banner Image */}
      <div className="relative h-[600px] shadow-lg">
        <S3Image
          folder={folderName}
          imageName={backgroundImage}
          alt={`${name} background`}
          className="w-full h-full object-cover"
        />

        {/* For large screens: Play Video Button in bottom-right */}
        {embedUrl && (
          <div className="hidden lg:block absolute bottom-5 right-5 z-10">
            <button
              onClick={toggleVideoModal}
              className="relative overflow-hidden flex items-center bg-pink-600 text-white font-medium px-4 py-2 rounded-full hover:bg-pink-700 transition"
            >
              {/* Ripple effect element inside the button */}
              <span
                className="absolute left-1/2 top-1/2 w-5 h-5 bg-white rounded-full opacity-50 animate-ripple"
                style={{ transform: "translate(-50%, -50%)" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-3.034A1 1 0 008 9.034v5.932a1 1 0 001.555.832l5.197-3.034a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="relative z-10">Play video</span>
            </button>
          </div>
        )}

        {/* For screens smaller than lg: Show Play Video Icon in the center */}
        {embedUrl && (
          <div className="block lg:hidden absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={toggleVideoModal}
              className="relative overflow-hidden flex items-center bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition"
            >
              <span
                className="absolute left-1/2 top-1/2 w-5 h-5 bg-white rounded-full opacity-50 animate-ripple"
                style={{ transform: "translate(-50%, -50%)" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-3.034A1 1 0 008 9.034v5.932a1 1 0 001.555.832l5.197-3.034a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Destination Overview Overlaid on Background */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-100px] w-full lg:max-w-3xl">
          <DestinationOverview
            destination={{ name, state, zone, description }}
            stays={stays}
          />
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            {/* Close Button */}
            <button
              onClick={toggleVideoModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            {/* Embedded YouTube video */}
            <div className="relative pb-[56.25%]">
              <iframe
                src={embedUrl}
                title="Featured Video"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* The rest of your components remain unchanged */}
      <div className="pt-[130px]">
        <div className="flex flex-wrap gap-3 justify-center">
          {activities.map((activity, index) => (
            <button
              key={index}
              className="px-4 py-1.5 bg-[#F1F1F1] font-[300] text-gray-500 text-sm rounded-lg"
            >
              {activity}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[#000000] text-sm sm:text-base lg:text-lg xl:text-xl text-center md:px-40 font-[300] px-4 lg:px-60 xl:px-80">
          {subdescription?.text}
        </p>
      </div>

      <DestinationGallery
        images={images}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        destinationFolder={folderName}
      />
      <MustTryExperiences mustTry={mustTry} destination={{ name, folder: folderName }} />
      <DestinationStayCarousel stays={stays} destinationFolder={folderName} />
     
     
      <DestinationMustVisit yuyiiiFriend={yuyiiiFriend} destinationFolder={folderName} />


      <div className="flex flex-col md:flex-row gap-4">
        <DestinationWeather
          weather={weather}
          review={review}
          reviewer={reviewer} // e.g. "Sariska_Traveller_Review.jpg"
          reviewerName={reviewerName}
          designation={designation}
          destinationFolder={folderName}
        />
      </div>
      <DestinationHowToReach
        airLocations={airLocations}
        roadLocations={roadLocations}
        destinationFolder={folderName}
      />
      <PartnerSection />

      {/* Inline styles for the ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 2.0s infinite;
        }
      `}</style>
    </div>
  );
};

export default SelectedDestination;
