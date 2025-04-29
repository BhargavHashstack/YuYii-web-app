import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram } from "react-icons/fa";
import p1 from "../../assets/images/Images/p1.png";


const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-1 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full cursor-pointer z-10 shadow-lg"
    onClick={onClick}
  >
    <span className="text-white text-2xl">{">"}</span>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-1 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full cursor-pointer z-10 shadow-lg"
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
    slidesToShow: 4, // Show 4 cards per row
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // For medium devices
        settings: {
          slidesToShow: 2, // Show 2 cards
        },
      },
      {
        breakpoint: 768, // For small devices
        settings: {
          slidesToShow: 1, // Show 1 card
        },
      },
    ],
  };

  const users = [
    {
      name: "Software Engineer by Day",
      description:
        "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all.",
      subDescription:
        "Now it's almost like having a designer right here with me. I just choose the page, make the change and click save. It's so simple. Thanks, guys!",
      image: p1,
      instagram: "https://instagram.com",
    },
    {
        name: "Software Engineer by Day",
        description:
          "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all.",
        subDescription:
          "Now it's almost like having a designer right here with me. I just choose the page, make the change and click save. It's so simple. Thanks, guys!",
        image: p1,
        instagram: "https://instagram.com",
      },
      {
        name: "Software Engineer by Day",
        description:
          "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all.",
        subDescription:
          "Now it's almost like having a designer right here with me. I just choose the page, make the change and click save. It's so simple. Thanks, guys!",
        image: p1,
        instagram: "https://instagram.com",
      },
    {
      name: "Software Engineer by Day",
      description:
        "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all.",
      subDescription:
        "Now it's almost like having a designer right here with me. I just choose the page, make the change and click save. It's so simple. Thanks, guys!",
      image: p1,
      instagram: "https://instagram.com",
    },
  ];

  return (
    <div className=" ">
      

      <Slider {...settings}>
        {users.map((user, index) => (
          <div key={index} className="p-4">
            <div className="relative border border-pink-500 shadow-md p-10 ">
              {/* Profile Image */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2  w-28 h-28  overflow-hidden ">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Testimonial Content */}
              <p className="text-pink-500 text-4xl mb-10 ">“</p>
              <p className="text-gray-600 text-sm mb-1 ">
                {user.description}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {user.subDescription}
              </p>

              {/* User Info */}
              <div className="mt-6 text-center">
                <p className="text-gray-800 text-base font-semibold">
                  {user.name}
                </p>
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 flex justify-center items-center space-x-2"
                >
                  <FaInstagram className="w-4 h-4" />
                  <span>Traveller by passion</span>
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
