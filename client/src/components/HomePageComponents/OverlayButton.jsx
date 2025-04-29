import React from "react";
import { useNavigate } from "react-router-dom";
import "./OverlayButton.css";

const OverlayButton = ({ startingPoint }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Build query parameters using both state and city values.
    const params = new URLSearchParams();
    if (startingPoint?.state) {
      // Use stateLabel for display consistency in the filter
      params.set("state", startingPoint.stateLabel || startingPoint.state);
    }
    if (startingPoint?.city) {
      params.set("city", startingPoint.city);
    }
    navigate(`/Destination?${params.toString()}`);
  };

  return (
    <button className="overlay-button" onClick={handleClick}>
      Can't wait to see places
    </button>
  );
};

export default OverlayButton;
