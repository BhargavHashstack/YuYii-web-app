import React, { useState } from 'react';
import HeadingSection from '../reusable_components/HeadingSection';
import Title from '../reusable_components/Title';
import nidhi from '../../assets/images/Images/nidhi-sharma.jpg';
import playvidico from "../../assets/images/Images/play-video-ico.png";
import nidhi1 from "../../assets/images/Images/home-nidhi-1.jpg";
import nidhi2 from "../../assets/images/Images/home-nidhi-2.jpg";
import nidhi3 from "../../assets/images/Images/home-nidhi-3.jpg";
import nidhi4 from "../../assets/images/Images/home-nidhi-4.jpg";
import nidhi5 from "../../assets/images/Images/home-nidhi-5.jpg";
import nidhi6 from "../../assets/images/Images/home-nidhi-6.jpg";
import nidhithumb from "../../assets/images/Images/about-nidhi-thumb.jpg";
import nextico from "../../assets/images/Images/reusable_icons/next-icon.svg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Poppins:wght@400;500;600&display=swap');

  :root {
    --primary-color: #de1587;
    --hover-color: #ff4557;
    --text-color: #000000;
  }

  .font-merriweather {
    font-family: 'Merriweather', serif;
  }

  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  .animation-button {
    transition: all 0.3s ease;
  }

  .animation-button:hover {
    transform: scale(1.05);
  }

  .ease-p2s {
    transition: all 0.2s ease;
  }

  .carousel img {
    transition: all 0.5s ease-in-out;
  }

  .opac {
    transition: opacity 0.3s ease;
  }

  .opac:hover {
    opacity: 0.9;
  }
`;

const AboutYuyiii = () => {
  const galleryImages = [nidhi1, nidhi2, nidhi3, nidhi4, nidhi5, nidhi6];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <>
      <style>{styles}</style>

      {/* About Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap">
          {/* Left Column - Image */}
          <div className="w-full md:w-1/2 px-4 mt-8 md:mt-20 relative">
            <div className="relative w-full flex justify-center md:justify-end">
              <img
                className="w-full md:w-[358px] h-[456px] object-cover shadow-md"
                src={nidhi}
                alt="Nidhi Sharma"
              />
              <span className="absolute bottom-4 right-4 md:hidden">
                <button
                  onClick={() => setShowVideo(true)}
                  type="button"
                  className="flex items-center bg-[#de1587] text-white rounded-3xl px-5 py-2.5 text-sm shadow-lg hover:bg-[#ff4557] transition-all animation-button font-poppins"
                >
                  <img
                    className="mr-2 w-4 h-4"
                    src={playvidico}
                    alt="Play"
                  />
                  Play video
                </button>
              </span>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-1/2 px-4 mt-8 md:mt-20">
            
            <HeadingSection text="The Yuyiii Quality" color="black" />
            <Title>
            You see it because <span style={{ display: "block" }}>we love it!</span>
          </Title>
            <div className="mb-2 md:mb-4">
              <p className="mt-4 text-sm md:text-[14px] leading-relaxed font-poppins">
                Everything you witness here on our website is real; pictures and videos, not 
                photoshopped or manipulated. Also, we have physically verified all properties 
                listed here. The Yuyiii motto is to deliver the best experience to our users, 
                not just on this virtual space, but at the physical destinations too.
              </p>
            </div>

            <div className="mt-2 md:mt-6">
              <h4 className="font-merriweather text-lg md:text-[18px] font-bold text-black mb-1">
                Nidhi Sharma
              </h4>
              <p className="text-sm md:text-[12px] font-poppins">
                Founder, Yuyiii and an ardent Traveller.
              </p>
              <p className="mt-4 text-sm md:text-[14px] leading-relaxed font-poppins">
                Nidhi travels to the best of the properties in the country, stays there, 
                experiences the destinations like any passionate traveller. Also, she shares 
                only those that she loved the most, with a secure and straightforward provision 
                to book online, without the gimmicks of graphics or discounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery & Video Section */}
      <div className="container px-4 mx-auto hidden lg:block">
        <div className="mt-[150px] bg-gradient-to-r from-[#fff8fa] to-white">
          <div className="flex flex-wrap">
            {/* Left Column - Gallery */}
            <div className="w-full md:w-5/12 pr-0">
              <div className="inline-block overflow-hidden -mt-[125px] ml-[80px]">
                <div className="carousel">
                  <img
                    className="w-[414px] h-[247px] object-cover"
                    src={galleryImages[currentSlide]}
                    alt={`Gallery ${currentSlide + 1}`}
                  />
                </div>
                <div className="flex mt-3">
                  <div className="ml-[73%] mr-[2%]">
                    <button
                      onClick={handlePrev}
                      className="ease-p2s hover:scale-110 transition-transform mr-3"
                    >
                      <img src={nextico} alt="Previous" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="ease-p2s hover:scale-110 transition-transform"
                    >
                      <img
                        className="rotate-180"
                        src={nextico}
                        alt="Next"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="w-full md:w-7/12">
              <div className="relative -mt-[180px] mb-10">
                <button
                  onClick={() => setShowVideo(true)}
                  type="button"
                  className="opac w-full relative"
                >
                  <img
                    className="object-cover"
                    src={nidhithumb}
                    alt="Video Thumbnail"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={playvidico}
                      alt="Play"
                      className="w-10 h-10 transform hover:scale-110 transition-transform"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowVideo(false);
          }}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              className="absolute -top-10 right-0 text-white text-3xl font-thin hover:opacity-80 font-poppins"
              onClick={() => setShowVideo(false)}
            >
              ×
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/sy98s8Gt49U?autoplay=1"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AboutYuyiii;
