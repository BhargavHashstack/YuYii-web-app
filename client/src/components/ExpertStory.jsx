import React from "react";

const ExpertStory = ({ title, content }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default ExpertStory;
<ExpertStory
  title="What is Rajasthan for you? Palaces & Deserts!"
  content="Let the Aravallis mesmerise you, surprise you, clean bowl you. 
           Imagine the Hampi Boulders in Rajasthan... (rest of the content)"
/>
