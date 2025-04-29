// UnspoiltDestinations.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HeadingSection from "../reusable_components/HeadingSection";
import Title from "../reusable_components/Title";
import arrowImg from "../../assets/images/Images/reusable_icons/next-icon.svg";
import playvideo from "../../assets/images/Images/reusable_icons/play_video_icon.png";

// Import S3 Client libraries.
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// VideoModal component renders the video in a modal overlay.
// Clicking on the backdrop (outside the video container) will trigger onClose.
const VideoModal = ({ videoUrl, onClose }) => {
  const handleBackdropClick = (e) => {
    // If the click target is the backdrop, close the modal.
    if (e.target.className.includes("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "80%",
          maxWidth: "800px",
          background: "#000",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <div
          style={{
            paddingTop: "56.25%", // 16:9 aspect ratio
            position: "relative",
          }}
        >
          <iframe
            src={videoUrl}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Helper: transforms a YouTube watch URL to an embeddable URL.
const getEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com") && urlObj.pathname === "/watch") {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    if (urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return url;
  } catch (err) {
    return url;
  }
};

const UnspoiltDestinations = () => {
  // CMS & carousel state
  const [homeData, setHomeData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const carouselRef = useRef(null);

  // State for S3 image URLs.
  const [destinationImgUrl, setDestinationImgUrl] = useState("");
  const [experienceImgUrl, setExperienceImgUrl] = useState("");
  const [stayImgUrl, setStayImgUrl] = useState("");

  // State for Video Modal.
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // Fetch CMS home data on component mount.
  useEffect(() => {
    axios
      .get("http://localhost:3000/property-api/home")
      .then((response) => {
        if (response.data.success) {
          setHomeData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching home data", error);
      });
  }, []);

  // Responsive adjustments for the carousel.
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleCount(7);
      } else if (width >= 1024) {
        setVisibleCount(5);
      } else if (width >= 768) {
        setVisibleCount(4);
      } else if (width >= 640) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const selectDestination = (idx) => {
    setCurrentIndex(idx);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextCarousel = () => {
    if (homeData?.destinations) {
      setCarouselIndex((prev) =>
        Math.min(prev + 1, homeData.destinations.length - visibleCount)
      );
    }
  };

  // Disable carousel buttons appropriately.
  const isPrevDisabled = carouselIndex === 0;
  const isNextDisabled =
    homeData?.destinations
      ? carouselIndex >= homeData.destinations.length - visibleCount
      : true;

  const destinations =
    homeData && Array.isArray(homeData.destinations)
      ? homeData.destinations
      : [];
 // 3) Fetch S3 images whenever destination changes
 useEffect(() => {
  if (!destinations.length) return;
  const dest = destinations[currentIndex];
  const folder = dest.destination.toLowerCase().replace(/ /g, "_");

  const s3 = new S3Client({
    region: import.meta.env.REACT_APP_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  const fetchOne = async (fileName, setter) => {
    if (!fileName) return setter("");
    try {
      const key = `${import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX}/destination/${folder}/${fileName}`;
      const cmd = new GetObjectCommand({
        Bucket: import.meta.env.REACT_APP_AWS_S3_BUCKET,
        Key: key,
      });
      const url = await getSignedUrl(s3, cmd, { expiresIn: 900 });
      setter(url);
    } catch (e) {
      console.error(`Failed loading ${fileName}:`, e);
      setter("");
    }
  };

  fetchOne(dest.banner, setDestinationImgUrl);
  fetchOne(dest.experience.banner, setExperienceImgUrl);
  fetchOne(dest.stay.banner, setStayImgUrl);
}, [homeData, currentIndex]);

  // When "Play Video" is clicked, extract the featured video URL, convert to embed URL, and show the modal.
  const handlePlayVideo = () => {
    const currentDest = destinations[currentIndex];
    if (currentDest && currentDest.stay && currentDest.stay.featured_video) {
      const embedUrl = getEmbedUrl(currentDest.stay.featured_video);
      setVideoUrl(embedUrl);
      setOpenVideoModal(true);
    }
  };

  return (
    <div className="max-w-8xl px-6 md:px-32 py-24">
      <div className="mb-8">
        <HeadingSection text="ROAD LESS TRAVELLED" color="black" />
        <Title>Unspoilt Destinations</Title>
      </div>
      {!homeData ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex items-center gap-2 sm:gap-4 mb-8">
            <button
              onClick={handlePrevCarousel}
              disabled={isPrevDisabled}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-full transition ${
                isPrevDisabled
                  ? "bg-gray-200 opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <img className="w-[28px] h-[28px]" src={arrowImg} alt="Previous" />
            </button>
            <div className="flex-1 overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${(100 / destinations.length) * carouselIndex}%)`,
                  width: `${(100 / visibleCount) * destinations.length}%`,
                }}
              >
                {destinations.map((dest, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectDestination(idx)}
                    className={`cursor-pointer text-center px-2 sm:px-4 ${
                      idx === currentIndex
                        ? "text-pink-600 font-semibold"
                        : "text-gray-700"
                    }`}
                    style={{ width: `${100 / destinations.length}%` }}
                  >
                    <p className="text-sm">{dest.destination}</p>
                    <p className="text-xs text-gray-500">{dest.state}{dest.stateName}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNextCarousel}
              disabled={isNextDisabled}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-full transition ${
                isNextDisabled
                  ? "bg-gray-200 opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <img className="w-[28px] h-[28px] rotate-180" src={arrowImg} alt="Next" />
            </button>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div>
                <img
                  src={destinationImgUrl}
                  alt="Destination View"
                  className="w-full h-64 lg:h-40 object-cover shadow-md transition-transform hover:scale-105"
                />
                <p className="text-sm text-gray-600 mt-3">
                  {destinations[currentIndex]?.destination}
                </p>
                <h3 className="text-lg font-semibold mt-2">
                  {destinations[currentIndex]?.title}{}
                </h3>
              </div>
              <div>
                <img
                  src={experienceImgUrl}
                  alt="Experience"
                  className="w-full h-64 lg:h-40 object-cover shadow-md transition-transform hover:scale-105"
                />
                <h3 className="text-lg font-semibold mt-2">
                  {destinations[currentIndex]?.experience?.title}
                </h3>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex flex-col">
              <img
                src={stayImgUrl}
                alt="Stay"
                className="w-full h-64 lg:h-[432px] object-cover shadow-lg"
              />
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm text-gray-600">
                    {destinations[currentIndex]?.stay?.type}
                  </p>
                  <h3 className="text-lg font-semibold">
                    {destinations[currentIndex]?.stay?.title}
                  </h3>
                </div>
                <button
                  onClick={handlePlayVideo}
                  className="bg-pink-600 text-white text-sm py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 transition flex items-center gap-2"
                >
                  <img src={playvideo} alt="Play Video" className="w-5 h-5" />
                  <span className="whitespace-nowrap">Play Video</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {openVideoModal && (
        <VideoModal videoUrl={videoUrl} onClose={() => setOpenVideoModal(false)} />
      )}
    </div>
  );
};

export default UnspoiltDestinations;
