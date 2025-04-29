import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Logo from '../../assets/images/Images/Logo.png';
import WhatsAppIcon from '../../assets/images/Images/Whatsapp.png';
import DropDownCard from '../../components/RepeatedComponents/DropDownSignIn';
import Ticker from './Ticker';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  // Search & menu states
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  // New: track profile menu state
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // New: reference for the profile menu container
  const profileMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Functions for navigation or register
  const handlePhoneRegister = () => {
    navigate('/register-otp');
  };

  const handleGoogleRegister = () => {
    navigate('/Register');
  };

  // Search logic
  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/property-api/search?query=${query}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults([...data.stays, ...data.destinations]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSearchResults(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted with term:', searchTerm);
    // Implement form submission logic
  };

  // Toggles
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If user clicks outside the mobile menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      // If user clicks outside the sign-in dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
      // If user clicks outside the search form
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      // If user clicks outside the profile menu
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setShowDropDown(false);
    setSearchOpen(false);
    setShowProfileMenu(false);
  }, [location]);

  return (
    <header className="bg-[#FFFFFF] shadow-md z-50 sticky top-0">
      {/* Ticker at top */}
      <div className="overflow-hidden whitespace-nowrap w-full">
        <Ticker />
      </div>

      <div className="flex justify-between items-center p-3 px-4 sm:px-10 max-w-9xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10 sm:h-12" />
          </Link>
        </div>

        {/* Right side: search, menu, avatar, etc */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Form */}
          {searchOpen && (
            <form
              onSubmit={handleSubmit}
              ref={searchRef}
              className="relative bg-pink-50 border flex items-center p-2 rounded-lg shadow-lg"
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none flex-grow px-2 text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <div className="absolute top-10 left-0 w-full bg-white shadow-md rounded-lg max-h-60 overflow-y-auto z-50 border">
                  {loading ? (
                    <div className="p-4 text-center">Loading...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No results found
                    </div>
                  ) : (
                    searchResults.map((result, index) => {
                      const imageSrc =
                        result.images &&
                        Array.isArray(result.images) &&
                        result.images.length > 0
                          ? `/assets/images/${result.images[0]}`
                          : result.image
                          ? `/assets/images/${result.image}`
                          : '/path/to/default-image.jpg';

                      return (
                        <Link
                          to={
                            result.category === 'stay'
                              ? `/Stays/${encodeURIComponent(result.title)}`
                              : `/destination/${encodeURIComponent(result.title)}`
                          }
                          key={index}
                          className="flex items-center p-2 hover:bg-gray-100"
                        >
                          {/* Display Image */}
                          <img
                            src={imageSrc}
                            alt={result.title || result.name}
                            className="w-12 h-12 object-cover rounded-full mr-4"
                          />
                          {/* Display Name */}
                          <div className="flex flex-col">
                            <span className="font-poppins text-sm">
                              {result.title || result.name}
                            </span>
                            <span className="text-xs font-poppins text-gray-500">
                              {result.location}
                            </span>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </form>
          )}
          <button onClick={toggleSearch} className="py-2">
            <FaSearch className="text-slate-600" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-700 p-2 rounded-md hover:bg-[#de1587] hover:text-white transition"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Main Nav Links */}
          <ul
            ref={menuRef}
            className={`${
              menuOpen ? 'block' : 'hidden'
            } lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-1 xl:space-x-4 absolute lg:static top-24 left-0 w-full bg-[#FFFFFF] lg:bg-transparent z-40 p-2 lg:p-0`}
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/918657519123"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="text-slate-700 flex items-center rounded-lg py-2 px-2 hover:bg-[#de1587] hover:text-white transition lg:text-sm xl:text-base">
                <img
                  src={WhatsAppIcon}
                  alt="WhatsApp"
                  className="h-5 w-5 xl:h-8 xl:w-8 mr-1 xl:mr-2"
                />
                WhatsApp
              </li>
            </a>
            {/* Phone */}
            <a href="tel:+918657519123">
              <li className="text-slate-700 gap-2 flex items-center rounded-lg py-2 px-2 hover:bg-[#de1587] hover:text-white transition lg:text-sm xl:text-base">
                <svg
                  className="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px] mr-1 xl:mr-2"
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8195 13.3682C15.5896 14.018 14.6772 14.557 13.9494 14.7144C13.4516 14.8205 12.8012 14.9051 10.612 13.9965C7.81174 12.8352 6.00842 9.98656 5.86787 9.80174C5.73327 9.61692 4.73633 8.29338 4.73633 6.92452C4.73633 5.55567 5.43074 4.88913 5.71064 4.60296C5.94053 4.36806 6.32048 4.26074 6.68496 4.26074C6.80288 4.26074 6.90889 4.2667 7.00417 4.27147C7.28408 4.2834 7.42463 4.30009 7.60925 4.74246C7.83913 5.29692 8.39895 6.66578 8.46565 6.80648C8.53354 6.94718 8.60143 7.13796 8.50614 7.32278C8.41681 7.51356 8.3382 7.59822 8.19765 7.76038C8.0571 7.92255 7.9237 8.04656 7.78315 8.22064C7.65451 8.37208 7.5092 8.53424 7.67119 8.81445C7.83318 9.0887 8.39299 10.0033 9.21723 10.7378C10.2809 11.6857 11.1432 11.9886 11.4517 12.1173C11.6816 12.2127 11.9556 12.1901 12.1235 12.0112C12.3367 11.7811 12.5999 11.3995 12.8679 11.0239C13.0585 10.7545 13.2991 10.7211 13.5516 10.8165C13.8089 10.9059 15.1703 11.5796 15.4502 11.7191C15.7301 11.8598 15.9148 11.9266 15.9826 12.0446C16.0493 12.1627 16.0493 12.7171 15.8195 13.3682Z"
                    fill="#505459"
                  />
                  <path
                    d="M10.3594 0C15.6061 0 19.8594 4.25329 19.8594 9.5C19.8594 14.7467 15.6061 19 10.3594 19C5.11267 19 0.859375 14.7467 0.859375 9.5C0.859375 4.25329 5.11267 0 10.3594 0ZM10.3594 0.690909C5.49425 0.690909 1.55028 4.63487 1.55028 9.5C1.55028 14.3651 5.49425 18.3091 10.3594 18.3091C15.2245 18.3091 19.1685 14.3651 19.1685 9.5C19.1685 4.63487 15.2245 0.690909 10.3594 0.690909Z"
                    fill="#505459"
                  />
                </svg>
                91-8657519123
              </li>
            </a>
            {/* Regular Nav Links */}
            <Link to="/">
              <li className="text-slate-700 rounded-lg py-2 px-2 hover:bg-[#de1587] hover:text-white transition lg:text-sm xl:text-base">
                Home
              </li>
            </Link>
            <Link to="/Stays">
              <li className="text-slate-700 rounded-lg py-2 px-2 hover:bg-[#de1587] hover:text-white transition lg:text-sm xl:text-base">
                Stays
              </li>
            </Link>
            <Link to="/Destination">
              <li className="text-slate-700 rounded-lg py-2 px-2 hover:bg-[#de1587] hover:text-white transition lg:text-sm xl:text-base">
                Destination
              </li>
            </Link>
            <Link to="/Blog">
              <li className="text-slate-700 rounded-lg py-2 px-2 hover:bg-[#de1587] hover:text-white transition lg:text-sm xl:text-base">
                Blog
              </li>
            </Link>

            {/* If user is logged in, show avatar + profile menu */}
            {currentUser ? (
              <div className="relative" ref={profileMenuRef}>
                <div
                // hover:bg-[#de1587]
                  className="flex items-center gap-2 text-slate-700 cursor-pointer rounded-lg px-4  hover:text-white transition lg:text-sm xl:text-base"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <img
                    src={
                      currentUser?.avatar ||
                      currentUser?.phoneAvatar ||
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
                  />
                </div>
                {/* Speech-bubble dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-4 w-44 bg-white rounded-lg shadow-xl py-2 z-50">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/bookings');
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Booking history
                    </button>
                    <button
                      onClick={() => {
                        navigate('/sign-in');
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Otherwise, show "Sign In" button
              <div
                className="relative"
                onMouseEnter={() => setShowDropDown(true)}
                onMouseLeave={() => setShowDropDown(false)}
                ref={dropdownRef}
              >
                <li className="text-[#FFFFFF] bg-[#DE1587] rounded-lg py-2 px-2 sm:py-2 sm:px-4 hover:bg-[#de1587] hover:text-white transition whitespace-nowrap flex items-center justify-center lg:text-sm xl:text-base">
                  Sign In
                </li>
                {showDropDown && (
                  <DropDownCard
                    message="Welcome to Yuyiii!"
                    onPhoneRegister={handlePhoneRegister}
                    onGoogleRegister={handleGoogleRegister}
                  />
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
