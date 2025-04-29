import React, { useState } from "react";
import HeadingSection from "../reusable_components/HeadingSection";
import Title from "../reusable_components/Title";
import cover from "../../assets/images/Images/yuyiii_vip/cover.jpg";
import sumedh from "../../assets/images/Images/yuyiii_vip/sumedh.jpg";
import thumbnail from "../../assets/images/Images/yuyiii_vip/thumbnail.jpg";
import playvideo from "../../assets/images/Images/reusable_icons/play_video_icon.png";

const YuyiiiVip = () => {
  // State to control the modal
  const [showVideo, setShowVideo] = useState(false);

  // Handler to open the modal
  const openVideoModal = () => {
    setShowVideo(true);
  };

  // Handler to close the modal
  const closeVideoModal = () => {
    setShowVideo(false);
  };

  return (
    <div className="max-w-8xl mx-auto px-6 py-16 md:px-32 relative">
      {/* Page Content */}
      <div className="flex flex-col md:flex-row md:h-96 gap-4 lg:gap-2">
        {/* Left Section */}
        <div className="md:w-1/4 flex flex-col justify-center">
          <HeadingSection text="Yuyiii VIP" color="black" />
          <Title text="Everyone needs a Friend" />
          <p className="text-[#000000] font-poppins font-[400] sm:font-[300] text-base md:text-xs xl:text-sm sm:mt-2">
            Yuyiii introduces "friends" to our esteemed customers booking the stays through us.
            Loving warm people who are at the Property and can help with your travel expedition
            or for just a curious chat on the philosophy behind the Property or the history of
            the destination in the folklore instead of the textbook way. Who is better than a
            local to talk about their culture and cuisine?
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-3/4 bg-[#F6F6F6] border-[#F6F6F6] border-[16px]">
          <div className="flex flex-col md:flex-row h-full gap-4">
            {/* Cover Image */}
            <div className="hidden md:block md:w-1/4 h-full">
              <img
                src={cover}
                alt="Friend cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Section */}
            <div className="md:w-1/4">
              <div className="h-3/4">
                <img
                  src={sumedh}
                  alt="Pune friend"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white xl:p-4 h-1/4">
                <h4 className="text-sm lg:text-sm xl:text-lg font-[700] text-[#000000] font-Merriweather">
                  Sumedh
                </h4>
                <h5 className="text-sm lg:text-sm xl:text-sm font-[700] text-[#000000] font-Merriweather">
                  aka The Birdman!
                </h5>
                <p className="text-xs text-[#000000] font-poppins">
                  Your friend in Saswad
                </p>
                <span className="block md:hidden mt-2">
                  <button
                    className="flex items-center bg-pink-600 text-white px-3 py-2 rounded-full shadow-md hover:bg-pink-700 transition-colors"
                    onClick={openVideoModal}
                  >
                    <img
                      src={playvideo}
                      alt="Play"
                      className="mr-2 w-4 h-4"
                    />
                    Play video
                  </button>
                </span>
              </div>
            </div>

            {/* Video Section (desktop) */}
            <div className="hidden md:block md:w-1/2 h-full">
              <div className="relative h-full transform hover:scale-105 transition-transform">
                <button
                  className="w-full h-full relative"
                  onClick={openVideoModal}
                >
                  <img
                    src={thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all">
                      <img
                        src={playvideo}
                        alt="Play"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showVideo && (
        <div
          className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeVideoModal} // Close if user clicks the overlay
        >
          {/* 
            onClick is on the parent overlay. 
            We use e.stopPropagation() on the child container 
            so clicks inside the video won't close the modal.
          */}
          <div
            className="relative w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/2 max-h-[90%] aspect-video"
            onClick={(e) => e.stopPropagation()} // Don't close if clicking inside the video
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
            {/* Embedded YouTube iframe */}
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/7dC2IzA1a6s?autoplay=1"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default YuyiiiVip;
