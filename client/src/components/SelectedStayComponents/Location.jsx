import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Circle, OverlayView } from "@react-google-maps/api";
import yicon from '../../assets/images/Images/yuyiiiicon.jpg';
import HomeIcon from '../../assets/images/Images/circularHomeIcon.png';
import YuyiiiIcon from './YuyiiiIcon';

const containerStyle = {
  width: "100%",
  height: "500px",
};

const RED_ZONE_RADIUS = 200;
const TRANSLUCENT_ZONE_RADIUS = 1000;

const RED_ZONE_MAP_STYLES = [
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "" }] },
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "on" }] },
  { featureType: "poi.business", elementType: "all", stylers: [{ visibility: "off" }] },
];

const mapStyles = [
  { featureType: "poi.business", elementType: "all", stylers: [{ visibility: "on" }] },
];

export default function Location({ stayDetails }) {
  // Destructure latitude and longitude from the dynamic stayDetails data
  const { latitude, longitude } = stayDetails.location;
  const center = { lat: latitude, lng: longitude };

  const googleMapsApiKey = "AIzaSyAgR3fEBFaKiUzG9LlG0CNtnXkRIRQLWBg";
  const [isInRedZone, setIsInRedZone] = useState(false);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const checkRedZone = () => {
    const distance = calculateDistance(center.lat, center.lng, latitude, longitude);
    return distance <= RED_ZONE_RADIUS;
  };

  useEffect(() => {
    setIsInRedZone(checkRedZone());
  }, [latitude, longitude]);

  return (
    <div className="w-full p-4 bg-white">
      <div className="border rounded-md shadow-lg overflow-hidden">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
              styles: isInRedZone ? RED_ZONE_MAP_STYLES : mapStyles,
            }}
          >
            <Circle
              center={center}
              radius={RED_ZONE_RADIUS}
              options={{
                fillColor: "red",
                fillOpacity: 0.4,
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
            <Circle
              center={center}
              radius={TRANSLUCENT_ZONE_RADIUS}
              options={{
                fillColor: "#808080",
                fillOpacity: 0.4,
                strokeColor: "#808080",
                strokeOpacity: 0.3,
                strokeWeight: 1,
              }}
            />
            <OverlayView position={center} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <YuyiiiIcon
                position={center}
                homeIcon={HomeIcon}
                hoverIcon={yicon}
              />
            </OverlayView>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
