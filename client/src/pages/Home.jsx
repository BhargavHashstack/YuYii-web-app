import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import backgroundVideo from '../assets/images/Video/boating.mp4'; // Import the video
import Carousel from '../components/FutureComponents/Carousel';
import LocationMarker from '../components/HomePageComponents/LocationMarker';
import HighlightsSection from '../components/RepeatedComponents/Highlights';
import PartnerSection from '../components/RepeatedComponents/Partners';
import { FaInstagram } from 'react-icons/fa';
import RoomSpace from '../components/HomePageComponents/RoomSpace';

import Testimonials from '../components/RepeatedComponents/Testimonials';   
// Import the VideoOverlay component
import VideoOverlay from '../components/HomePageComponents/VideoOverlay';
import SeasonWeekendStays from '../components/HomePageComponents/SeasonWeekendStay';
import UnspoiltDestinations from '../components/HomePageComponents/UnspoiltDestinations';
import NextTravelPlan from '../components/HomePageComponents/NextTravelPlan';
import UniqueMemories from '../components/HomePageComponents/UniqueMemories';
import YuyiiiVip from '../components/HomePageComponents/YuyiiiVip';
import YuyiiiQuality from '../components/HomePageComponents/YuyiiiQuality';
import NewCarousel from '../components/FutureComponents/NewCarousel'
import AboutYuyiii from '../components/HomePageComponents/YuyiiiAbout';
import DestinationTravelExp from '../components/RepeatedComponents/DestinationTravelExp';
export default function Home() {
  
  return (
    <div className="home-container relative bg-[#FFFFFF]">
    
      <div className="highlights">
        <div className="partners-icon">
          <div>
            {/* Video and Overlay Section */}
           
              {/* Video Background */}
              

              {/* Video Overlay */}
              <VideoOverlay />
            
            <SeasonWeekendStays />
            <UnspoiltDestinations />
            <RoomSpace />
            <NextTravelPlan />
            <UniqueMemories />
            <AboutYuyiii />
            <YuyiiiVip />
            

            
            
            {/* User Carousel Section */}
            
            
              
          </div>
          <HighlightsSection />
          <Testimonials />
          <DestinationTravelExp />  
          <PartnerSection />
        </div>
        
      </div>
    </div>
  );
}
