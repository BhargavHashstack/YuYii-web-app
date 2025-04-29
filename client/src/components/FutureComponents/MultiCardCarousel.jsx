import React, { useState } from 'react';

const MultiCardCarousel = ({ items, cardsToShow = 4 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + cardsToShow < items.length) {
      setCurrentIndex(currentIndex + cardsToShow);
    }
  };

  const handlePrev = () => {
    if (currentIndex - cardsToShow >= 0) {
      setCurrentIndex(currentIndex - cardsToShow);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Previous
      </button>

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${(currentIndex / cardsToShow) * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              className="flex-none w-1/4 p-4 bg-gray-100 rounded shadow-md"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={handleNext}
        disabled={currentIndex + cardsToShow >= items.length}
      >
        Next
      </button>
    </div>
  );
};

export default MultiCardCarousel;

// Example Usage
// import MultiCardCarousel from './MultiCardCarousel';
// const items = [
//   <div>Card 1</div>,
//   <div>Card 2</div>,
//   <div>Card 3</div>,
//   <div>Card 4</div>,
//   <div>Card 5</div>,
//   <div>Card 6</div>,
//   <div>Card 7</div>,
//   <div>Card 8</div>,
// ];
// <MultiCardCarousel items={items} cardsToShow={4} />;