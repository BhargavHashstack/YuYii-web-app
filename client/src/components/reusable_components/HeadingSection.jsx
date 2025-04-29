import React from "react";

const HeadingSection = ({ text = "NOT SURE?", color = "black" }) => {
  const textColorClass = color === "pink" ? "text-pink-600" : "text-black";
  
  return (
    <section className={`${textColorClass} uppercase font-poppins text-sm mb-1`}>
      {text}
    </section>
  );
};

export default HeadingSection;
