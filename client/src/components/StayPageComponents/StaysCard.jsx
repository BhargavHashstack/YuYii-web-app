// StaysCard.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "./StaysCard.css";

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, display: "block", left: "20px", zIndex: 2 }}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <button className="rounded-full border bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-1">
        <svg
          width="15"
          height="16"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3199 21.052L0.267578 10.9996L10.3199 0.947266L11.4685 2.09584L2.56474 10.9996L11.4685 19.9034L10.3199 21.052Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

// Custom Next Arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style, display: "block", right: "20px", zIndex: 2 }}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <button className="rounded-full border bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-1">
        <svg
          width="15"
          height="16"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.6801 0.947266L11.7324 10.9996L1.6801 21.052L0.531555 19.9034L9.43532 10.9996L0.531555 2.09584L1.6801 0.947266Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

const StaysCard = ({
  images = [],      // array of image filenames from MongoDB
  title,
  city,            // city is used to build the S3 folder name
  price,
  location,
  description,
  nearestAirport,
  nearestCity,
  stayType,
  tripType,
  id,
}) => {
  // We'll store the final presigned image URLs in state
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!images.length || !city) {
      setImageUrls([]);
      return;
    }

    const prefix     = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
    const folderName = city.toLowerCase().replace(/ /g, "_");

    Promise.all(
      images.map(imageName => {
        // build exactly the same key your backend expects
        const key = `${prefix}/destination/${folderName}/${imageName}`;
        // stream through your stay-image endpoint
        return fetch(`/property-api/stays/image?key=${encodeURIComponent(key)}`)
          .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.blob();
          })
          .then(blob => URL.createObjectURL(blob));
      })
    )
      .then(urls => setImageUrls(urls))
      .catch(err => {
        console.error("Error fetching stay images:", err);
        setImageUrls([]);
      });
  }, [images, city]);

  // Slick carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Truncate the description to a maximum of 100 characters
  const truncatedDescription =
    description && description.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  return (
    <div className="rounded-container">
      {/* Carousel Section with Price Tag */}
      <div className="relative">
        <Slider {...settings}>
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <img
                key={index}
                className="w-full h-56 sm:h-64 md:h-72 rounded-container-img rounded-lg"
                src={url}
                alt={`${title} - Image ${index + 1}`}
              />
            ))
          ) : (
            <div>No images available</div>
          )}
        </Slider>
        <button className="rounded-button">{price}</button>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <p className="text-lg font-poppins font-[400] text-[#DE1587]">
          {title}, {location}
        </p>
        <div className="text-sm text-[#717171] font-poppins font-[400] mb-2">
          {/* stayType and tripType might be arrays */}
          {[
            Array.isArray(stayType) ? stayType.join(" | ") : stayType,
            Array.isArray(tripType) ? tripType.join(" | ") : tripType,
          ]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div className="text-sm text-[#717171] font-poppins font-[400] mb-2">
          {truncatedDescription}
        </div>

        <div className="text-sm text-[#717171] font-poppins font-[400] flex items-center">
          {/* Airport Icon */}
          <svg
            width="21"
            height="18"
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M2.49973 17.3326V15.8326H19.4997V17.3326H2.49973ZM4.03823 12.3711L0.615234 6.65963L2.54398 6.14413L5.27673 8.45563L9.09398 7.45388L4.04398 0.698132L6.42473 0.0673828L13.717 6.21738L17.9767 5.07688C18.4331 4.95255 18.8667 5.01022 19.2775 5.24988C19.6885 5.48972 19.9562 5.8378 20.0805 6.29413C20.2048 6.75063 20.1536 7.1843 19.9267 7.59513C19.6997 8.00597 19.3581 8.27355 18.9017 8.39788L4.03823 12.3711Z"
              fill="#717171"
            />
          </svg>
          {nearestAirport}
        </div>
        <div className="text-sm text-[#717171] font-poppins font-[400] flex pl-1 items-center">
          {/* City Icon */}
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M0.0195312 19.41V5.91001H5.25028V3.27526L8.00028 0.583008L10.7503 3.27526V9.91001H15.981V19.41H0.0195312ZM1.51953 17.91H4.01953V15.41H1.51953V17.91ZM1.51953 13.91H4.01953V11.41H1.51953V13.91ZM1.51953 9.91001H4.01953V7.41001H1.51953V9.91001ZM6.75028 17.91H9.25028V15.41H6.75028V17.91ZM6.75028 13.91H9.25028V11.41H6.75028V13.91ZM6.75028 9.91001H9.25028V7.41001H6.75028V9.91001ZM6.75028 5.91001H9.25028V3.41001H6.75028V5.91001ZM11.981 17.91H14.481V15.41H11.981V17.91ZM11.981 13.91H14.481V11.41H11.981V13.91Z"
              fill="#717171"
            />
          </svg>
          {nearestCity}
        </div>
      </div>
    </div>
  );
};

export default StaysCard;
