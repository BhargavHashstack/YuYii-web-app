import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import CalendarComponent from "../components/SelectedStayComponents/Calendar";
import StaysCollage from "../components/SelectedStayComponents/StaysCollage";
import StayDescription from "../components/StayDescription";
import Location from "../components/SelectedStayComponents/Location";
import Rooms from "../components/Rooms/RoomSection";
import Partners from "../components/RepeatedComponents/Partners";
import ContentHeader from "../components/SelectedStayComponents/ContentHeader";
import BookCard from "../components/SelectedStayComponents/BookCard";
import ReviewCard from "../components/ReviewCard";
import SelectedStayGallery from "../components/SelectedStayComponents/SelectedStayGallery";
import FaqSection from "../components/SelectedStayComponents/FaqSection";
import GuestReviewCard from "../components/SelectedStayComponents/GuestReviewCard";

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const SelectedStay = () => {
  const { stayId } = useParams();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const sectionsRef = useRef({});

  // Local states
  const [showContentHeader, setShowContentHeader] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [stayDetails, setStayDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreActivities, setShowMoreActivities] = useState(false);
  // New state to hold fetched amenity icon URLs
  const [amenityUrls, setAmenityUrls] = useState([]);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));

  const HEADER_SECTIONS = [
    "overview",
    "room",
    "amenities",
    "gallery",
    "review",
    "location",
    "faqs",
  ];


  // Fetch stay details from backend
  useEffect(() => {
    fetch(`/property-api/selectedstay/${encodeURIComponent(stayId)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch stay details");
        }
        return res.json();
      })
      .then((data) => {
        setStayDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [stayId]);

  // Function to generate a signed URL for an image stored on AWS S3
  const fetchSignedUrl = async (imgRef) => {
    try {
      // switch to import.meta.env
      const region = import.meta.env.REACT_APP_AWS_REGION || import.meta.env.AWS_REGION;
      const accessKey = import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID || import.meta.env.AWS_ACCESS_KEY_ID;
      const secretKey = import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY || import.meta.env.AWS_SECRET_ACCESS_KEY;
      const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET || import.meta.env.AWS_S3_BUCKET;
      const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX || import.meta.env.AWS_S3_KEY_PREFIX;

      const s3 = new S3Client({
        region,
        credentials: { accessKeyId: accessKey, secretAccessKey: secretKey }
      });

      const key = `${prefix}/amenity/${imgRef}`;
      const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
      return await getSignedUrl(s3, cmd, { expiresIn: 900 });
    } catch (err) {
      console.error("Error fetching signed URL:", err);
      return imgRef;
    }
  };

  useEffect(() => {
    if (stayDetails?.amenities?.length) {
      Promise.all(
        stayDetails.amenities.map(a => fetchSignedUrl(a.icon))
      )
      .then(urls => {
        setAmenityUrls(stayDetails.amenities.map((a, i) => ({
          label: a.label,
          iconUrl: urls[i]
        })));
      })
      .catch(console.error);
    }
  }, [stayDetails]);

  // Scroll handling for header and active section
  useEffect(() => {
    const handleScroll = () => {
      const overviewEl = sectionsRef.current["overview"];
      if (overviewEl) {
        const top = overviewEl.getBoundingClientRect().top;
        setShowContentHeader(top <= 0);
      }
      Object.entries(sectionsRef.current).forEach(([sec, ref]) => {
        const rect = ref.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(sec);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle functions
  const toggleShowMore = () => setShowMore((prev) => !prev);
  const toggleShowMoreAmenities = () => setShowMoreAmenities((prev) => !prev);
  const toggleShowMoreActivities = () => setShowMoreActivities((prev) => !prev);

  // Update selectedRooms when room quantity changes
  const handleRoomQuantityChange = (room, quantity) => {
    setSelectedRooms((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === room.id);
      if (quantity > 0) {
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], quantity };
          return updated;
        } else {
          return [...prev, { ...room, quantity }];
        }
      } else {
        if (existingIndex > -1) {
          return prev.filter((item) => item.id !== room.id);
        } else {
          return prev;
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (error || !stayDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">{error || "Stay not found!"}</h1>
      </div>
    );
  }

  const handleSectionClick = (section) => {
    const sectionRef = sectionsRef.current[section];
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="stay-page bg-white overflow-x-hidden">
      {/* Header */}
      <div ref={headerRef}>{/* Header content here */}</div>

      <StaysCollage selectedStay={stayId} stayDetails={stayDetails} />

      {showContentHeader && (
        <div className="fixed top-0 w-full z-50 bg-white">
          <ContentHeader
            sections={HEADER_SECTIONS}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Content Section */}
        <div className="w-full lg:w-2/3">
          <div
            ref={(el) => (sectionsRef.current["overview"] = el)}
            className="p-4" style={{ scrollMarginTop: '84px' }}
          >
            <p className="text-lg sm:text-xl lg:text-2xl font-poppins font-[500] mb-2 px-6 lg:px-16">
              Story of Stay
            </p>
            <p className="text-[#222222] font-[400] font-poppins text-xs sm:text-sm lg:text-base px-6 lg:px-16">
              {showMore
                ? stayDetails.overview.text
                : `${stayDetails.overview.text.slice(0, 1022)}...`}
            </p>
            <button
              onClick={toggleShowMore}
              className="text-[#DE1587] text-sm lg:text-base underline mt-2 px-6 lg:px-16"
            >
              {showMore ? "< Show less" : "Show more >"}
            </button>
          </div>
        </div>

        {/* Booking Card Section */}
        <div className="w-full lg:w-1/3">
          <div className="px-10 sm:px-6 xl:pr-20">
            <BookCard 
            stayDetails={stayDetails} 
            selectedRooms={selectedRooms}
            checkIn={checkIn}
              checkOut={checkOut}
             setCheckIn={setCheckIn}
             setCheckOut={setCheckOut}
            
            />
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <p className="text-lg sm:text-xl lg:text-2xl font-[500] font-poppins mt-4 p-4 px-10 lg:px-20 mb-2">
        Rooms
      </p>
      <div
        ref={(el) => (sectionsRef.current["room"] = el)}
        className="px-10 lg:px-20" style={{ scrollMarginTop: '124px' }}
      >
        <Rooms
          stayDetails={stayDetails}
          onRoomQuantityChange={handleRoomQuantityChange}
          checkIn={checkIn}
  checkOut={checkOut}
        />
      </div>

      {/* Amenities Section */}
      <div
        ref={(el) => (sectionsRef.current["amenities"] = el)}
        className="p-4" style={{ scrollMarginTop: '84px' }}
      >
        <p className="text-lg sm:text-xl lg:text-2xl font-[500] mb-8 px-6 sm:px-6 lg:px-16 text-poppins">
          Amenities
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-6 lg:px-16 max-w-full overflow-x-hidden">
          {amenityUrls.length > 0 ? (
            amenityUrls
              .slice(0, showMoreAmenities ? amenityUrls.length : 9)
              .map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <img
                    src={amenity.iconUrl}
                    alt={amenity.label}
                    style={{
                      width: "25px", height: "25px", objectFit:"cover" , boxShadow: "none"
                    }}
                    className="w-6 h-6 noshadow"
                  />
                  <span className="text-xs sm:text-sm lg:text-xl">
                    {amenity.label}
                  </span>
                </div>
              ))
          ) : (
            <div>Loading icons...</div>
          )}
        </div>
        {stayDetails.amenities.length > 9 && (
          <div className="mt-[-1rem] sm:mt-[-1.5rem] lg:mt-[-2rem] flex justify-end px-20 lg:px-40">
            <button
              onClick={toggleShowMoreAmenities}
              className="text-[#DE1587] underline text-sm sm:text-base lg:text-lg"
            >
              {showMoreAmenities ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Activities Section */}
      <div
        ref={(el) => (sectionsRef.current["activities"] = el)}
        className="p-4"
      >
        <p className="text-lg sm:text-xl lg:text-2xl font-[500] mb-8 px-6 sm:px-6 lg:px-16 text-poppins">
          Activities
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-6 lg:px-16">
          {stayDetails.activities
            .slice(0, showMoreActivities ? stayDetails.activities.length : 9)
            .map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                
                <span className="text-xs sm:text-sm lg:text-xl">
                  {activity.label || activity.name}
                </span>
              </div>
            ))}
        </div>
        {stayDetails.activities.length > 9 && (
          <div className="mt-[-1rem] sm:mt-[-1.5rem] lg:mt-[-2rem] flex justify-end px-20 lg:px-40">
            <button
              onClick={toggleShowMoreActivities}
              className="text-[#DE1587] underline text-sm sm:text-base lg:text-lg"
            >
              {showMoreActivities ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div
  ref={(el) => (sectionsRef.current["gallery"] = el)}
  className="mt-8 p-4" style={{ scrollMarginTop: '84px' }}
>
  <p className="text-lg sm:text-xl lg:text-2xl font-[500] mb-2 px-6 sm:px-6 lg:px-16">
    Gallery
  </p>
  <SelectedStayGallery stayId={stayDetails._id} />
</div>

      {/* Review Section */}
      <div
        ref={(el) => (sectionsRef.current["review"] = el)}
        className="p-4" style={{ scrollMarginTop: '84px' }}
      >
        <div className="px-6 lg:px-16">
        <GuestReviewCard stayId={stayId} />
        </div>
        <ReviewCard
          image={stayDetails.review.image}
          reviewerName={stayDetails.review.reviewerName}
          location={stayDetails.review.location}
          review={stayDetails.review.review}
          improvement={stayDetails.review.improvement}
          tip={stayDetails.review.tip}
          reviewerdesignation={stayDetails.review.reviewerdesignation}
          suitable={stayDetails.review.suitable}
          ratings={stayDetails.review.ratings}
          highlight={stayDetails.review.highlight}
          experience={stayDetails.review.experience}
          propertyImage={stayDetails.review.propertyImage}
          socialLinks={stayDetails.review.socialLinks}
          destination={stayDetails.destination}
        />
      </div>

      {/* Location Section */}
      <div
        ref={(el) => (sectionsRef.current["location"] = el)}
        className="lg:p-4" style={{ scrollMarginTop: '84px' }}
      >
        <p className="text-lg sm:text-xl lg:text-2xl font-poppins font-[500] text-[#222222] mb-2 lg:mb-4 px-10 sm:px-10 lg:px-16">
          Where you'll be
        </p>
        <p className="px-10 sm:px-10 lg:px-16 text-base sm:text-xl font-poppins font-[400] text-[#222222] mb-2 lg:mb-4">
          {stayDetails.maplocation}
        </p>
        <div className="px-6 sm:px-6 lg:px-12">
          <Location stayDetails={stayDetails} />
        </div>
      </div>

      {/* FAQs Section */}
      <div
        ref={(el) => (sectionsRef.current["faqs"] = el)}
        className="p-4" style={{ scrollMarginTop: '84px' }}
      >
        <FaqSection faqs={stayDetails.faqs} />
      </div>

      <Partners />
    </div>
  );
};

export default SelectedStay;
