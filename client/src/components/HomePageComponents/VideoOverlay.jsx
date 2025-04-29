import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StartingPoint from "./StartingPoint";
import { FaMapMarkerAlt } from "react-icons/fa";
import OverlayButton from "./OverlayButton";
import boatingvideo from '../../assets/images/Video/boating.mp4';
import InOutDatePicker from "./InOutDatePicker";
import GuestSelection from "./GuestSelection";
import banner from "../../assets/images/bannerPic.jpg";
import './TextOverlay.css';

const VideoOverlay = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [travelBy, setTravelBy] = useState("plane");
  const [distance, setDistance] = useState(100);
  const [overlayPosition, setOverlayPosition] = useState("bottom-6");

  // Lift the starting point state so it can be shared with OverlayButton
  const [startingPoint, setStartingPoint] = useState({ state: "", stateLabel: "", city: "" });

  const videoRef = useRef(null);

  const handleChildrenChange = (newChildrenCount) => {
    setChildren(newChildrenCount);
    if (newChildrenCount > childrenAges.length) {
      setChildrenAges([...childrenAges, ...Array(newChildrenCount - childrenAges.length).fill("")]);
    } else {
      setChildrenAges(childrenAges.slice(0, newChildrenCount));
    }
  };

  const handleAgeChange = (index, value) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = value;
    setChildrenAges(updatedAges);
  };

  useEffect(() => {
    const updateOverlayPosition = () => {
      if (videoRef.current) {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1024) {
          setOverlayPosition("top-[300px]");
        } else {
          setOverlayPosition("top-[600px]");
        }
      }
    };

    updateOverlayPosition();
    window.addEventListener("resize", updateOverlayPosition);
    return () => {
      window.removeEventListener("resize", updateOverlayPosition);
    };
  }, []);

  return (
    <div className="relative h-[400px] md:h-[400px] lg:h-[700px]">
      <div className="relative h-[400px] md:h-[400px] lg:h-[670px]">
        <a 
          href="/destination/Sultan Bathery"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img
            ref={videoRef}
            src={banner}
            className="absolute top-0 left-0 w-full h-full object-cover -z-100"
          />
        </a>
      </div>

      <div className="text-overlay">
        India's 1st Travel Platform to help you Discover a Unique Weekend Getaway
      </div>

      <div
        className={`absolute bg-[#FFFFFF] ${overlayPosition} left-1/2 transform -translate-x-1/2 shadow-lg p-1 py-4 z-10 max-w-6xl w-full`}
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="bg-[#FFFFFF] p-4 border-b-2 border-[#DE1587] border-r-2 lg:border-l-0 lg:border-b-0 lg:border-r-0 lg:border-t-0">
              <InOutDatePicker />
            </div>
            <div className="bg-[#FFFFFF] border-[#DE1587] border-t-2 border-r-2 sm:border-t-2 sm:border-r-2 sm:border-l-0 sm:border-b-0 lg:border-l-2 lg:border-b-0 lg:border-r-0 lg:border-t-0">
              <GuestSelection />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="bg-[#FFFFFF] border-[#DE1587] border-b-2 border-l-2 sm:border-b-2 sm:border-l-2 sm:border-r-0 sm:border-t-0 lg:border-l-2 lg:border-b-0 lg:border-r-0 lg:border-t-0 p-4">
              <StartingPoint onStartingPointChange={setStartingPoint} />
            </div>
            <div className="bg-[#FFFFFF] border-l-2 border-t-2 border-[#DE1587] sm:border-t-2 lg:border-t-0 p-4">
              <h4 className="text-sm text-[#828282] font-poppins font-semibold">Travel By</h4>
              <div className="flex gap-0 sm:gap-2 md:gap-6 lg:gap-2 mt-5">
                <button
                  className={`p-2 rounded-full border ${travelBy === "plane" ? "bg-[#DE1587] text-white" : "bg-white border border-gray-400"}`}
                  onClick={() => setTravelBy("plane")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9.19097 23.1572L6.33797 17.7401L0.884766 14.851L2.14875 13.587L7.06025 14.4176L11.6828 9.79504L1.02922 5.24469L2.72658 3.58345L15.6915 5.7864L20.2057 1.23604C20.5669 0.874906 21.0062 0.694336 21.5239 0.694336C22.0415 0.694336 22.4809 0.874906 22.842 1.23604C23.2032 1.59718 23.3837 2.03657 23.3837 2.5542C23.3837 3.07184 23.2032 3.51122 22.842 3.87236L18.2917 8.3866L20.4946 21.3515L18.7973 23.0489L14.283 12.3952L9.66045 17.0178L10.455 21.8932L9.19097 23.1572Z" fill="#DBDBDB" />
                  </svg>
                </button>
                <button
                  className={`p-3 rounded-full border ${travelBy === "car" ? "bg-[#DE1587] text-white" : "bg-white border border-gray-400"}`}
                  onClick={() => setTravelBy("car")}
                >
                  <svg width="14" height="14" viewBox="0 0 28 18" fill="none">
                    <path d="M6.65015 16.4247C5.77042 16.4247 5.02262 16.1169 4.40676 15.5012C3.79089 14.8854 3.48296 14.1376 3.48296 13.2578H0.705078V1.70139C0.705078 1.30414 0.846524 0.964067 1.12942 0.681175C1.41231 0.398282 1.75238 0.256836 2.14964 0.256836H21.0401L28.8739 7.64647V13.2578H26.5403C26.5403 14.1376 26.2324 14.8854 25.6168 15.5012C25.001 16.1169 24.2532 16.4247 23.3734 16.4247C22.4937 16.4247 21.746 16.1169 21.1304 15.5012C20.5145 14.8854 20.2066 14.1376 20.2066 13.2578H9.81698C9.81698 14.1282 9.50905 14.8736 8.89319 15.494C8.27733 16.1145 7.52965 16.4247 6.65015 16.4247ZM18.0398 6.86857H25.9292L20.4287 1.70139H18.0398V6.86857ZM10.0947 6.86857H16.5952V1.70139H10.0947V6.86857ZM2.14964 6.86857H8.65014V1.70139H2.14964V6.86857ZM6.65015 15.0635C7.15575 15.0635 7.5831 14.889 7.9322 14.5399C8.2813 14.1908 8.45585 13.7634 8.45585 13.2578C8.45585 12.7523 8.2813 12.3249 7.9322 11.9758C7.5831 11.6267 7.15575 11.4522 6.65015 11.4522C6.14456 11.4522 5.71721 11.6267 5.36811 11.9758C5.01901 12.3249 4.84446 12.7523 4.84446 13.2578C4.84446 13.7634 5.01901 14.1908 5.36811 14.5399C5.71721 14.889 6.14456 15.0635 6.65015 15.0635ZM23.3734 15.0635C23.879 15.0635 24.3064 14.889 24.6555 14.5399C25.0046 14.1908 25.1791 13.7634 25.1791 13.2578C25.1791 12.7523 25.0046 12.3249 24.6555 11.9758C24.3064 11.6267 23.879 11.4522 23.3734 11.4522C22.8678 11.4522 22.4405 11.6267 22.0914 11.9758C21.7423 12.3249 21.5677 12.7523 21.5677 13.2578C21.5677 13.7634 21.7423 14.1908 22.0914 14.5399C22.4405 14.889 22.8678 15.0635 23.3734 15.0635ZM2.14964 11.8133H3.86071C4.06632 11.3799 4.42012 10.9845 4.9221 10.6269C5.42409 10.2697 6.0001 10.091 6.65015 10.091C7.3002 10.091 7.86226 10.2558 8.33631 10.5854C8.81037 10.915 9.17801 11.3243 9.43923 11.8133H20.5843C20.79 11.3799 21.1438 10.9845 21.6457 10.6269C22.1475 10.2697 22.7234 10.091 23.3734 10.091C24.0235 10.091 24.5855 10.2558 25.0596 10.5854C25.5339 10.915 25.9015 11.3243 26.1625 11.8133H27.4294V8.31313H2.14964V11.8133Z" fill="#DBDBDB" />
                  </svg>
                </button>
                <div className="flex items-center lg:pl-3">
                  <div className="relative text-xs sm:text-sm">
                    <input
                      type="text"
                      value={`${distance} kms`}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setDistance(value);
                      }}
                      className="w-16 sm:w-20 md:w-16 py-1 bg-[#FFFFFF] border border-[#DBDBDB] text-center"
                      placeholder="Distance"
                    />
                  </div>
                </div>
              </div>
            </div>
            <OverlayButton startingPoint={startingPoint} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
