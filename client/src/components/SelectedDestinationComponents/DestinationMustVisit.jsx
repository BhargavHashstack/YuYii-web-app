// src/components/SelectedDestinationComponents/DestinationMustVisit.jsx
import React, { useState } from 'react';
import HeadingSection from '../reusable_components/HeadingSection';
import Title from '../reusable_components/Title';
import S3Image from "./S3Image";
import playvideo from "../../assets/images/Images/reusable_icons/play_video_icon.png";

const DestinationMustVisit = ({ yuyiiiFriend = {}, destinationFolder = '' }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const {
    title,
    aboutText,
    friendName,
    friendJob,
    videoURL,
    coverImage,    // banner
    videoCover,    // thumbnail for desktop video
    friendImage    // profile
  } = yuyiiiFriend;

  const getEmbedUrl = url =>
    url?.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url || '';
  const embedUrl = getEmbedUrl(videoURL);

  const hasContent =
    title ||
    aboutText ||
    friendName ||
    friendJob ||
    videoURL ||
    coverImage ||
    videoCover ||
    friendImage;

  if (!hasContent) return null;

  return (
    <div className="max-w-8xl mx-auto px-4 py-16 lg:px-[220px]">
      <div className="flex flex-col md:flex-row md:h-96 gap-4 lg:gap-2">
        {/* Left Text */}
        <div className="md:w-1/4 flex flex-col justify-center">
          <HeadingSection text={title} color="black" />
          <Title text={title} />
          <p className="mt-2 text-[#000000] font-poppins text-base md:text-xs">
            {aboutText}
          </p>
        </div>

        {/* Right Content */}
        <div className="md:w-3/4 bg-[#F6F6F6] border-[16px] border-[#F6F6F6]">
          <div className="flex flex-col md:flex-row h-full gap-4">
            {/* Banner */}
            <div className="hidden md:block md:w-1/4 h-full">
              {coverImage ? (
                <S3Image
                  folder={destinationFolder}
                  imageName={coverImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>

            {/* Profile */}
            <div className="md:w-1/4 flex flex-col">
              <div className="h-3/4">
                {friendImage ? (
                  <S3Image
                    folder={destinationFolder}
                    imageName={friendImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
              <div className="bg-white p-2 h-1/4">
                <h4 className="font-[700] text-[#000] font-Merriweather">
                  {friendName}
                </h4>
                <p className="text-sm font-poppins">{friendJob}</p>
                {/* Mobile Play */}
                {videoURL && (
                  <button
                    className="mt-2 md:hidden flex items-center bg-pink-600 text-white px-3 py-2 rounded-full shadow hover:bg-pink-700"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <img src={playvideo} alt="Play" className="w-6 h-6 mr-2" />
                    Play Video
                  </button>
                )}
              </div>
            </div>

            {/* Video Thumbnail */}
            {videoURL && (
              <div className="hidden md:block md:w-1/2 h-full">
                <button
                  className="relative w-full h-full hover:scale-105 transition-transform"
                  onClick={() => setIsVideoOpen(true)}
                >
                  {videoCover ? (
                    <S3Image
                      folder={destinationFolder}
                      imageName={videoCover}
                      alt="Video Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 flex items-center justify-center">
                      <img src={playvideo} alt="Play" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-[90%] max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white p-2 bg-gray-800 rounded hover:bg-gray-700"
              onClick={() => setIsVideoOpen(false)}
            >
              ✕
            </button>
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title="Yuyiii Friend Video"
              className="w-full h-[400px] md:h-[500px] rounded-lg shadow-lg"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationMustVisit;
