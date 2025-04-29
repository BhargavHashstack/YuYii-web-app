import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram } from 'react-icons/fa';
import image1 from "../../assets/images/Images/image1.jpg";
import image2 from "../../assets/images/Images/image2.jpg";
import image3 from "../../assets/images/Images/image3.jpg";
import image4 from "../../assets/images/Images/image4.jpg";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-1 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full cursor-pointer z-10 shadow-lg"
    onClick={onClick}
  >
    <span className="text-white text-2xl">{">"}</span>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-1 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full cursor-pointer z-10 shadow-lg"
    onClick={onClick}
  >
    <span className="text-white text-2xl">{"<"}</span>
  </div>
);

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const users = [
    { name: 'Suzana', image: image1 , instagram: 'https://instagram.com' },
    { name: 'Lívia', image: image2, instagram: 'https://instagram.com' },
    { name: 'Kátia', image: image3, instagram: 'https://instagram.com' },
    { name: 'Matheus', image: image4, instagram: 'https://instagram.com' },
  ];

  return (
    <div className="w-[100%] mx-auto py-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 underline mb-10">
        What our users say about us?
      </h2>

      <Slider {...settings}>
        {users.map((user, index) => (
          <div key={index} className="px-4">
            <div className="relative w-full h-80 rounded-md shadow-md overflow-hidden border border-black">
              {/* Split Background */}
              <div className="absolute inset-0">
                <div className="h-2/3 "></div>
                <div className="h-1/3 bg-pink-500"></div>
              </div>

              {/* Quote Section - Positioned at the top */}
              <div className="absolute top-0 left-0 p-6">
                <p className="text-4xl text-black font-serif">"</p>
              </div>

              {/* Text Section - Positioned below the quote */}
              <div className="absolute top-1/4 w-full px-6">
                <p className="text-gray-600 italic text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Profile Image - Positioned in the middle of the gray and black part */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 w-24 h-24 rounded-full bg-gray-200 overflow-hidden z-10">
                <img
                  src={user.image} // Replace with the user's image
                  alt={user.name} // Replace with the user's name
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Name and Instagram Icon */}
              <div className="absolute bottom-1 left-3">
                <p className="text-white text-4xl font-semibold">{user.name}</p>
              </div>
              <div className="absolute bottom-1 right-3">
                <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-white w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
