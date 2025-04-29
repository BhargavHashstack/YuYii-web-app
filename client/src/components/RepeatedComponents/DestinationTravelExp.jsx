import React from 'react';
import Destinationt1 from '../../assets/images/Images/Destinationt1.jpeg';
import Destinationt2 from '../../assets/images/Images/Destinationt2.jpeg';
import Destinationt3 from '../../assets/images/Images/Destinationt3.jpeg';
import Destinationt4 from '../../assets/images/Images/Destinationt4.jpeg';
import { GoStarFill } from "react-icons/go";

const TravelExperienceCard = ({ date, rating, description, image, isDark }) => {
  return (
    <div
      className={`relative rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl ${
        isDark ? "bg-black text-white " : "bg-white text-[#131316] "
      } hover:bg-black hover:text-white`} // Added hover styles for black background and white text
      style={{ fontFamily: isDark ? 'Merriweather, serif' : 'Poppins, sans-serif' }}
    >
      {image && (
       <div className="p-3 sm:p-5 sm:px-6 rounded-lg">
  <img
    src={image}
    alt="Travel"
    style={{borderRadius:'12px'}}
    className="w-full h-48 sm:h-64 object-cover rounded-lg "
  />
</div>

      )}
      <div className="p-3 sm:p-5 group">
        {date && <p className="text-xs sm:text-sm mb-2 font-[400] font-poppins text-[#5E5F6E] group-hover:text-white transition-colors ">{date}</p>}
        {rating && (
          <p className="text-sm sm:text-lg font-bold mb-2 flex items-center font-poppins">
            <GoStarFill className="mr-1" /> {rating}
          </p>
        )}
        {description && <p className="text-sm sm:text-base  font-poppins">{description}</p>}
      </div>
    </div>
  );
};

const TravelExperiences = () => {
  return (
    <section className="py-6 sm:py-12 px-2 sm:px-6 md:px-16 bg-white">
      <h2 className="text-[#000000] text-2xl sm:text-3xl md:text-4xl font-[700] text-center mb-4 sm:mb-6 px-4 lg:px-12 font-merriweather">
        Real Travel Experiences: Hear From<br /> Our Users
      </h2>
      <p className="text-center text-[#5E5F6E] text-xs sm:text-base mb-6 sm:mb-12 sm:px-10  font-poppins">
        Read inspiring stories and valuable insights from real users who have <br/>
        experienced the magic of travel with our platform.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <TravelExperienceCard 
            date="20th August 2024"
            rating="4.94"
            description="A fort surrounded by mountains. A must visit for everybody from kids to adults. Activities like rifle, ziplining & many more."
            image={Destinationt1}
          />
          <TravelExperienceCard
            date="25th September 2024"
            rating="4.94"
            description="A fort surrounded by mountains. A must visit for everybody from kids to adults. Activities like rifle, ziplining & many more."
          />
        </div>
        <div className="flex flex-col gap-4">
          <TravelExperienceCard
            date="18th June 2024"
            rating="4.94"
            description="A fort surrounded by mountains. A must visit for everybody from kids to adults. Activities like rifle, ziplining & many more."
            image={Destinationt2}
          />
   
          <div className="flex gap-4 py-2 sm:py-4 items-center p-2 group bg-white rounded-lg shadow-lg font-poppins transition duration-300 hover:scale-105 hover:shadow-2xl  hover:bg-black hover:text-white">

          <img
  src={Destinationt4}
  alt="Travel"
  style={{ height: '160px', width: '150px', borderRadius:'12px' }}
  className="rounded-lg group-hover:text-white transition-colors"
/>



  
  
<div className="w-2/3 h-full ">
  <p className="text-[#5E5F6E] font-[400] text-xs sm:text-sm font-poppins group-hover:text-white transition-colors">
    24th April 2024
  </p>
  <p className="text-sm sm:text-lg font-[700] font-poppins mb-2 flex items-center group-hover:text-white transition-colors">
    <GoStarFill className="mr-1" /> 4.94
  </p>
  <p className="text-[#131316] text-xs sm:text-sm md:text-base  font-poppins group-hover:text-white transition-colors">
  A fort surrounded by mountains. A must visit for everybody from kids to adults. Activities like rifle, ziplining
  </p>
</div>

</div>

        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <TravelExperienceCard
            date="2nd March 2024"
            rating="4.94"
            description="A fort surrounded by mountains. A must visit for everybody from kids to adults. Activities like rifle, ziplining & many more."
          />
          <TravelExperienceCard
            date="14th June 2024"
            rating="4.94"
            description="A fort surrounded by mountains. A must visit for everybody from kids to adults. Activities like rifle, ziplining & many more."
            image={Destinationt3}
        
          />
        </div>
      </div>
    </section>
  );
};

export default TravelExperiences;
