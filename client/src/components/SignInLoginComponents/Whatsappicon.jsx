import React from 'react'; 
import Whatsapp from '../../assets/images/Images/WhatsappL.png'; // Import the image

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/+918003995300" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 p-3 z-50"
    >
      {/* WhatsApp logo with image */}
      <img
        src={Whatsapp} // Use the imported image
        alt="WhatsApp"
        className="w-16 h-16 object-cover sm:w-20 sm:h-20 md:w-20 md:h-20" // Tailwind CSS for size and object fitting
      />
    </a>
  );
};

export default WhatsAppIcon;
