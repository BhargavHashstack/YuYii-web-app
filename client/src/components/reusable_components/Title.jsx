import React from "react";

const Title = ({ children, text }) => {
  return (
    <h2 className="font-merriweather text-3xl font-bold text-gray-900 mb-4">
      {children || text}
    </h2>
  );
};

export default Title;