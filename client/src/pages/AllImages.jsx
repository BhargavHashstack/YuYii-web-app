import React from "react";
import i1 from "../assets/images/Images/i1.jpeg";
import i2 from "../assets/images/Images/i2.jpeg";
import i3 from "../assets/images/Images/i3.jpeg";
import i4 from "../assets/images/Images/i4.jpeg";
import i5 from "../assets/images/Images/i5.jpeg";
import i6 from "../assets/images/Images/i6.jpeg";
import i7 from "../assets/images/Images/i7.jpeg";
import i8 from "../assets/images/Images/i8.jpeg";
import i9 from "../assets/images/Images/i9.jpeg";

export default function AllImages() {
  const images = [
    i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      ))}
    </div>
  );
}
