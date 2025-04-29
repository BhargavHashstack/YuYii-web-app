import React, { useState } from "react";
import HoverDestinationCard from "./HoverDestinationCard";
import { useNavigate } from "react-router-dom";
import S3ImageComponent from "./S3ImageComponent";

const DestinationCard = ({ image, title, location, hoveredImage, description, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSingleClick = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    navigate(`/destination/${id}`);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };

  return (
    <div
      className="relative"
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden">
        <S3ImageComponent 
          destinationTitle={title} 
          imageName={image} 
          altText={`${title} image`}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent text-white p-4 rounded-xl">
          <p className="flex font-[500] font-poppins text-base">
            {title}, {location}
          </p>
        </div>
      </div>
      {isHovered && (
        <HoverDestinationCard
          images={hoveredImage}
          title={title}
          description={description}
          onClose={handleClose}
          location={location}
        />
      )}
    </div>
  );
};

export default DestinationCard;
