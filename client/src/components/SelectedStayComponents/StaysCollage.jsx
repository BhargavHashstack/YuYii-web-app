// StaysCollage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IoIosInformationCircleOutline } from "react-icons/io";

// Load AWS config from Vite env variables
const AWS_REGION = import.meta.env.REACT_APP_AWS_REGION || import.meta.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID || import.meta.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY || import.meta.env.AWS_SECRET_ACCESS_KEY;
const S3_BUCKET = import.meta.env.REACT_APP_AWS_S3_BUCKET || import.meta.env.AWS_S3_BUCKET;
const S3_PREFIX = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX || import.meta.env.AWS_S3_KEY_PREFIX;
export default function StaysCollage({ selectedStay, stayDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [bannerUrls, setBannerUrls] = useState([]);
  const [featuredVideoBannerUrl, setFeaturedVideoBannerUrl] = useState("");

  if (!stayDetails) {
    return <p>Stay details not found.</p>;
  }

  const {
    name,
    banner,
    destination,
    overview = {},
    maplocation,
    featured_video,
  } = stayDetails;

  // Memoize bannerImages to avoid re-creating a new array each render
  const bannerImages = useMemo(() => {
    if (stayDetails.banner) {
      return typeof stayDetails.banner === "string"
        ? JSON.parse(stayDetails.banner)
        : stayDetails.banner;
    }
    return [];
  }, [stayDetails.banner]);

  // Memoize featured video object to avoid unnecessary re-renders
  const featuredVideoObj = useMemo(() => {
    if (stayDetails.featured_video) {
      try {
        return typeof stayDetails.featured_video === "string"
          ? JSON.parse(stayDetails.featured_video)
          : stayDetails.featured_video;
      } catch (e) {
        console.error("Error parsing featured_video:", e);
      }
    }
    return null;
  }, [stayDetails.featured_video]);

  // Create an S3 client with env-based credentials
  const s3Client = useMemo(
    () =>
      new S3Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      }),
    []
  );

  // Generate presigned URLs for banner images
  useEffect(() => {
    async function fetchBannerUrls() {
      try {
        const folderName = destination.toLowerCase().replace(/ /g, '_');
        const urls = await Promise.all(
          bannerImages.map(async (img) => {
            const key = `${S3_PREFIX}/destination/${folderName}/${img}`;
            const cmd = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
            return await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
          })
        );
        setBannerUrls(urls);
      } catch (err) {
        console.error("Error generating banner URLs:", err);
      }
    }

    fetchBannerUrls();
  }, [s3Client, bannerImages, destination]);

  // Generate presigned URL for featured video banner
  useEffect(() => {
    async function fetchFeaturedVideoBanner() {
      if (!featuredVideoObj || !featuredVideoObj.banner) return;
      try {
        const folderName = destination.toLowerCase().replace(/ /g, '_');
        const key = `${S3_PREFIX}/destination/${folderName}/${featuredVideoObj.banner}`;
        const cmd = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
        const url = await getSignedUrl(s3Client, cmd, { expiresIn: 900 });
        setFeaturedVideoBannerUrl(url);
      } catch (err) {
        console.error("Error generating featured video banner URL:", err);
      }
    }

    fetchFeaturedVideoBanner();
  }, [s3Client, featuredVideoObj, destination]);


  // For collage, show up to 4 images (the first image is used for the video thumbnail)
  const imagesToShow = bannerUrls.slice(0, 4);
  const extraImagesCount = bannerUrls.length - 4;

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    if (bannerUrls.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerUrls.length);
    }
  };

  const handlePrevImage = () => {
    if (bannerUrls.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + bannerUrls.length) % bannerUrls.length
      );
    }
  };

  // Handlers to open/close the video modal
  const openVideoModal = () => {
    setShowVideo(true);
  };

  const closeVideoModal = () => {
    setShowVideo(false);
  };

  return (
    <div className="relative p-4 bg-white">
      {/* Wishlist and Share Buttons */}
      <div className="absolute md:flex lg:top-6 top-5 right-4 lg:right-16 lg:pr-2 lg:gap-4">
        <button className="p-2 gap-1 items-center flex text-sm underline bg-white">
          <svg
            className="w-[10px] lg:w-[16px] lg:h-[20px]"
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0992 11.2002V17.5002C16.0992 18.2734 15.4724 18.9002 14.6992 18.9002H2.09922C1.32602 18.9002 0.699219 18.2734 0.699219 17.5002V11.2002M8.39922 0.700195V15.4002M1.39922 7.7002L7.90425 1.19517C8.1776 0.921801 8.62084 0.921801 8.89419 1.19517L15.3992 7.7002"
              stroke="#222222"
              strokeWidth="1.4"
            />
          </svg>
          Share
        </button>
        <button className="p-2 flex gap-1 items-center underline text-sm bg-white">
          <svg
            className="w-[11px] lg:w-[22px] lg:h-[18px]"
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4231 17.6997C16.3231 14.3887 21.2231 10.6997 21.2231 5.79974C21.2249 5.15574 21.0994 4.51773 20.8538 3.9224C20.6082 3.32707 20.2474 2.78617 19.792 2.33079C19.3366 1.87542 18.7957 1.51456 18.2004 1.26896C17.6051 1.02337 16.967 0.897889 16.3231 0.899737C15.0631 0.899737 13.8171 1.37574 12.8581 2.33474L11.4231 3.76974L9.98805 2.33474C9.53398 1.878 8.99409 1.51555 8.39943 1.26821C7.80478 1.02088 7.16709 0.893555 6.52305 0.893555C5.87901 0.893555 5.24132 1.02088 4.64667 1.26821C4.05201 1.51555 3.51212 1.878 3.05805 2.33474C2.60243 2.78932 2.24112 3.32944 1.99486 3.92407C1.74859 4.5187 1.62224 5.15613 1.62305 5.79974C1.62305 10.6997 6.52305 14.3887 11.4231 17.6997Z"
              stroke="#222222"
              strokeWidth="1.4"
            />
          </svg>
          Wishlist
        </button>
      </div>

      {/* Header */}
      <header className="mb-6 px-4 lg:px-14">
        <div className="md:flex items-center gap-2 lg:gap-4">
          <p className="text-lg flex items-center gap-2 sm:text-2xl lg:text-3xl font-[600] font-poppins text-[#222222] p-2">
            {stayDetails.name}{" "}
            <IoIosInformationCircleOutline className="text-black text-lg lg:text-2xl" />
          </p>
          <div className="flex md:flex-nowrap">
            <div className="flex items-center px-2 md:px-2 gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-md font-poppins font-[500]">
                {overview.ratingoverall}
              </span>
              <span className="text-gray-400 text-sm">/5</span>
            </div>
            <div className="flex px-2 md:px-2 items-center">
              {overview.badge && (
                <img
                  src={overview.badge}
                  alt="Badge"
                  className="inline-block w-24 h-10"
                />
              )}
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm lg:text-lg underline font-poppins text-[#DE1587] px-2">
          {maplocation}
        </p>
        <div className="md:flex px-2 md:px-2">
          {/* Tags */}
          <div className="flex">
            {overview.staytags && (
              <div className="flex flex-wrap gap-2 mt-1 lg:mt-3">
                <span>
                  <svg
                    className="w-[18px] h-[18px] md:w-[27px] md:h-[24px]"
                    width="27"
                    height="24"
                    viewBox="0 0 27 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.3755 22.7754H25.8313C25.5308 22.7754 25.2871 23.019 25.2871 23.3196C25.2871 23.6202 25.5308 23.8638 25.8313 23.8638H26.3755C26.6761 23.8638 26.9197 23.6202 26.9197 23.3196C26.9197 23.019 26.6761 22.7754 26.3755 22.7754Z"
                      fill="#DE1587"
                    />
                    <path
                      d="M1.27841 23.8637H24.4435C24.699 23.8637 24.9061 23.6542 24.9061 23.3957C24.9061 23.1372 24.699 22.9277 24.4435 22.9277H23.0558V12.6313H25.3687C25.5065 12.6313 25.6371 12.5691 25.7249 12.4616C25.8128 12.3542 25.8487 12.2127 25.8229 12.0758L23.9726 2.24744C23.9311 2.02673 23.7404 1.86702 23.5184 1.86694H22.5932V0.930907C22.5932 0.672429 22.3861 0.462891 22.1306 0.462891H18.43C18.1746 0.462891 17.9675 0.672429 17.9675 0.930907V1.86694H5.94046C5.7184 1.86702 5.52773 2.02673 5.48621 2.24744L3.6359 12.0758C3.61013 12.2127 3.64606 12.3542 3.7339 12.4616C3.82174 12.5691 3.95235 12.6313 4.09015 12.6313H6.40303V22.9277H1.27841C1.06676 23.0837 0.960938 23.2397 0.960938 23.3957C0.960938 23.5517 1.06676 23.7077 1.27841 23.8637ZM18.8926 1.39892H21.6681V1.86694H18.8926V1.39892ZM6.32347 2.80297H23.1354L24.8099 11.6953H4.64894L6.32347 2.80297ZM9.64107 22.9277V17.7795H11.954V22.9277H9.64107ZM12.8791 22.9277V17.3115C12.8791 17.053 12.672 16.8435 12.4165 16.8435H9.1785C8.92302 16.8435 8.71592 17.053 8.71592 17.3115V22.9277H7.32819V12.6313H22.1306V22.9277H12.8791Z"
                      fill="#DE1587"
                      stroke="#DE1587"
                      strokeWidth="0.0961429"
                    />
                  </svg>
                </span>
                {overview.staytags.map((tag, index) => (
                  <span key={index} className="py-1 text-xs sm:text-sm font-poppins text-[#000000]">
                    {tag}
                    {index < overview.staytags.length - 1 && ","}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex">
            {overview.activitytags && (
              <div className="flex flex-wrap gap-2 mt-1 lg:mt-3">
                <span className="md:pl-8">
                  <svg
                    className="w-[18px] h-[18px] md:w-[27px] md:h-[24px]"
                    width="24"
                    height="27"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.8883 6.0969H16.6795V3.91943C16.6795 3.19921 16.0933 2.61296 15.3731 2.61296H7.0987V1.30648C7.0987 0.586256 6.51245 0 5.79222 0C5.072 0 4.48575 0.586256 4.48575 1.30648V23.5166H2.07042L1.19944 26.1296H0.207031V27.0005H11.3774V26.1296H10.385L9.51403 23.5166H7.0987V13.0648H14.0666V15.2422C14.0666 15.9627 14.6528 16.5487 15.3731 16.5487H23.8883L21.5127 11.3228L23.8883 6.0969ZM5.79222 0.870985C6.03209 0.870985 6.22772 1.06619 6.22772 1.30648V1.74197H5.35673V1.30648C5.35673 1.06619 5.55236 0.870985 5.79222 0.870985ZM6.22772 2.61296V13.0648H5.35673V2.61296H6.22772ZM9.4664 26.1296H2.11805L2.69857 24.3876H8.88631L9.4664 26.1296ZM5.35673 23.5166V13.9358H6.22772V23.5166H5.35673ZM7.0987 3.48394H15.3731C15.6129 3.48394 15.8086 3.67915 15.8086 3.91943V12.274C15.6718 12.2253 15.5264 12.1938 15.3731 12.1938H7.0987V3.48394ZM15.3731 13.0648C15.6129 13.0648 15.8086 13.26 15.8086 13.5003C15.8086 13.7408 15.6129 13.9358 15.3731 13.9358C15.2197 13.9358 15.0743 13.9672 14.9376 14.0159V13.0648H15.3731ZM22.5355 15.6777H15.3731C15.1332 15.6777 14.9376 15.4827 14.9376 15.2422C14.9376 15.002 15.1332 14.8068 15.3731 14.8068C16.0933 14.8068 16.6795 14.2207 16.6795 13.5003V6.96788H22.5355L20.5562 11.3228L22.5355 15.6777Z"
                      fill="#DE1587"
                    />
                  </svg>
                </span>
                {overview.activitytags.map((tag, index) => (
                  <span key={index} className="py-1 text-xs sm:text-sm">
                    {tag}
                    {index < overview.activitytags.length - 1 && ","}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Collage Section */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 px-6 lg:px-16">
        {/* Left Div (Video Thumbnail) */}
        <div className="relative flex-1 h-[456px] overflow-hidden">
          {/* Clickable Video Thumbnail */}
          <div
            className="w-full h-full cursor-pointer relative"
            onClick={openVideoModal}
          >
            <img
              src={
                featuredVideoBannerUrl ||
                (featuredVideoObj && featuredVideoObj.banner
                  ? featuredVideoObj.banner
                  : "https://img.youtube.com/vi/default/maxresdefault.jpg")
              }
              alt="Video Thumbnail"
              className="w-full h-full object-cover shadow-lg"
            />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform">
              <svg
                width="54"
                height="65"
                viewBox="0 0 54 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 64.8191V0L53.9576 32.4096L0 64.8191Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Div (Image Grid) */}
        <div className="flex-1 grid grid-cols-2 gap-2 md:gap-4 h-[450px]">
          {imagesToShow.slice(1).map((url, index) => (
            <div
              key={index}
              className="relative h-[220px] overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(index + 1)}
            >
              <img
                src={url}
                alt={`Stay ${index + 1}`}
                className="w-full h-full object-cover shadow-lg"
              />
            </div>
          ))}
          {extraImagesCount > 0 && (
            <div
              className="relative h-[220px] bg-gray-300 overflow-hidden cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={bannerUrls[4]} // Use the fifth image as background for overlay
                alt="More Stays"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <a href="#gallery-section" className="block font-bold text-white text-lg">
                  view more
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal Overlay */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-11/12 md:w-3/4 lg:w-1/2 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={
                featuredVideoObj && featuredVideoObj.video
                  ? featuredVideoObj.video.replace("watch?v=", "embed/")
                  : ""
              }
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Existing modal for images if needed */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          {/* ... additional modal code for image gallery ... */}
        </div>
      )}
    </div>
  );
}