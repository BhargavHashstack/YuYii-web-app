import React from 'react';
import blusalzz from "../../assets/images/Images/trusted_partners/blusalzz.png";
import cgh from "../../assets/images/Images/trusted_partners/cgh-hotels.png";
import fern from "../../assets/images/Images/trusted_partners/fern-hotel.png";
import kamat from "../../assets/images/Images/trusted_partners/kamat-hotels.png";
import little from "../../assets/images/Images/trusted_partners/little-earth.png";
import privy from "../../assets/images/Images/trusted_partners/privy-stays.png";
import saffron from "../../assets/images/Images/trusted_partners/saffron-stays.png";


const PartnerSection = () => {
  const partners = [
    { id: 1, name: "Fern Hotel", image: fern},
    { id: 2, name: "Saffron Stays", image: saffron},
    { id: 3, name: "Blusalzz", image: blusalzz},
    { id: 4, name: "Kamat Hotels", image: kamat},
    { id: 5, name: "Privy Stays", image: privy},
    { id: 6, name: "Little Earth", image: little},
    { id: 7, name: "CGH Hotels", image: cgh}
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <style>
        {`
          .line-separator {
            width: 100%;
            height: 1px;
            background-color: #000;
            margin-top: 3rem;
          }
          .hotel-logo {
            width: 130px;
            height: 130px;
          }
          .partners-container {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 0 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .partners-grid {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            margin-top: 0rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
          }
          .partner-heading {
            font-family: "Merriweather", serif;
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            margin: 1.5rem 0 0 0;
          }
          @media (max-width: 768px) {
            .partners-grid {
              gap: 1rem;
            }
          }
        `}
      </style>
      <div className="container">
        <div className="line-separator"></div>
        <div className="partners-container">
          <h4 className="partner-heading">
            Some of our Trusted Partners
          </h4>
          <div className="partners-grid">
            {partners.map((partner) => (
              <img
                key={partner.id}
                src={partner.image}
                alt={partner.name}
                className="hotel-logo object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;


// import React from "react";
// import Partnerslogo from "../assets/images/Images/partnerslogo.png"; // Corrected the path

// const PartnerSection = () => {
//   // Array of partner data (image URL and name)
//   const partners = [
//     { id: 1, name: "Partner 1", image: Partnerslogo }, // Use imported image for local assets
//     { id: 2, name: "Partner 2", image: Partnerslogo },
//   ];

//   return (
//     <div className="relative h-40 sm:h-60 overflow-hidden bg-white">
//       {/* Heading */}
//       <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 underline mb-4 text-center">
//         Trusted Partners
//       </h3>

//       {/* Marquee Container */}
//       <div className="relative w-full h-full overflow-hidden">
//         <div className="flex items-center animate-horizontal-marquee space-x-4">
//           {/* First set of images */}
//           {partners.map((partner) => (
//             <img
//               key={partner.id}
//               src={partner.image}
//               alt={partner.name}
//               className="h-40 sm:h-40 md:h-40 mx-2 sm:mx-4 object-contain"
//             />
//           ))}

//           {/* Second set of images (to create seamless looping effect) */}
//           {partners.map((partner) => (
//             <img
//               key={`duplicate-${partner.id}`}
//               src={partner.image}
//               alt={partner.name}
//               className="h-10 sm:h-14 md:h-16 mx-2 sm:mx-4 object-contain"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Custom CSS for animation */}
//       <style>{`
//         @keyframes horizontal-marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-horizontal-marquee {
//           animation: horizontal-marquee 30s linear infinite;
//           display: flex;
//           width: calc(200% + 4rem); /* Ensures the looping effect works seamlessly */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PartnerSection;
