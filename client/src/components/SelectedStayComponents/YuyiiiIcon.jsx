import React, { useState } from "react";

const YuyiiiIcon = ({ position, onClick, homeIcon, hoverIcon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: isHovered ? 2 : 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? hoverIcon : homeIcon} // Switch between home and hover icon
        alt={isHovered ? "Hover Icon" : "Home Icon"}
        style={{
          width: isHovered ? "50px" : "40px", // Enlarge icon on hover
          height: isHovered ? "50px" : "40px",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </div>
  );
};

export default YuyiiiIcon;
