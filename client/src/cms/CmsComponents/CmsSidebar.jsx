import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaHotel,
  FaMapSigns,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function CmsSidebar() {
  // Track expanded/collapsed state for each menu
  const [homeOpen, setHomeOpen] = useState(false);
  const [staysOpen, setStaysOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      {/* Header with Logo and a "collapse" icon (optional) */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        
        <button className="text-gray-600 hover:text-gray-900 ">
          <FaArrowLeft />
        </button>
      </div>

      <div className="p-4 overflow-y-auto">
        <ul className="space-y-4">

          {/* Home Section */}
          <li>
            <div
              onClick={() => setHomeOpen(!homeOpen)}
              className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pink-600"
            >
              <div className="flex items-center space-x-2">
                <FaHome />
                <span>Home</span>
              </div>
              {homeOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {homeOpen && (
              <ul className="mt-2 ml-6 space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/cms/LandingPage"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - Landing Page
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cms/TripTypes"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - Trip Types
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Stays Section */}
          <li>
            <div
              onClick={() => setStaysOpen(!staysOpen)}
              className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pink-600"
            >
              <div className="flex items-center space-x-2">
                <FaHotel />
                <span>Stays</span>
              </div>
              {staysOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {staysOpen && (
              <ul className="mt-2 ml-6 space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/cms/AllStays"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - All Stays
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cms/addstay"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - Add New Stay
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cms/StayTypes"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - Stay Types
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Destinations Section */}
          <li>
            <div
              onClick={() => setDestinationsOpen(!destinationsOpen)}
              className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pink-600"
            >
              <div className="flex items-center space-x-2">
                <FaMapSigns />
                <span>Destinations</span>
              </div>
              {destinationsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {destinationsOpen && (
              <ul className="mt-2 ml-6 space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/cms/AllDestination"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - All Destinations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cms/AddDestination"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - Add New
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Manage Zones Section */}
          <li>
            <div
              onClick={() => setZonesOpen(!zonesOpen)}
              className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pink-600"
            >
              <div className="flex items-center space-x-2">
                <FaCog />
                <span>Manage Zones</span>
              </div>
              {zonesOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {zonesOpen && (
              <ul className="mt-2 ml-6 space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/cms/AllZones"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - All Zones
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Manage Reviews Section */}
          <li>
            <div
              onClick={() => setReviewsOpen(!reviewsOpen)}
              className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pink-600"
            >
              <div className="flex items-center space-x-2">
                <FaCog />
                <span>Manage Reviews</span>
              </div>
              {reviewsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {reviewsOpen && (
              <ul className="mt-2 ml-6 space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/cms/AllReviews"
                    className={({ isActive }) =>
                      `block hover:text-pink-600 ${
                        isActive ? "text-pink-600" : ""
                      }`
                    }
                  >
                    - All Reviews
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CmsSidebar;
