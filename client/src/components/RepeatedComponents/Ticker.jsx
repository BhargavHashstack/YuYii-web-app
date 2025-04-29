import React from 'react';
import staywhite from "../../assets/images/Images/stay-white2.svg";

const Ticker = () => {
  const tickerItems = [
    'Yuyiii, a platform for you to Discover & Book Curated Stays',
    'In-house Rating System - only Stays with a minimum rating of 3.5/5 are featured on Yuyiii',
    '1000+ Registered Travellers',
    'Partners - Fern Hotels, Kamat Hotels, Saffron Stays',
    'On Call support - Room Recommendations, Road Conditions, understanding Cancellation Policy, Anything you need clarity on',
    'Best Price Guarantee (Terms and Conditions Apply)'
  ];
  
  // Duplicate items for seamless loop
  const allItems = [...tickerItems, ...tickerItems];
  
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {allItems.map((item, index) => (
          <div key={index} className="ticker__item">
            <img 
              src={staywhite}
              alt="stay icon" 
              className="stay-icon"
              style={{width: '22px', height: '20px'}}
            />
            {item}
          </div>
        ))}
      </div>
      <style jsx>{`
        .ticker-wrap {
          overflow: hidden;
          width: 100%;
          background-color: #de1587;
        }
        .ticker {
          display: flex;
          align-items: center;
          animation: ticker 45s linear infinite;
          width: max-content;
          height: 32px;
        }
        .ticker__item {
          display: flex;
          padding: 0 2rem;
          font-size: 12px;
          color: white;
          align-items: center;
        }
        .stay-icon {
          margin-right: 10px;
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
