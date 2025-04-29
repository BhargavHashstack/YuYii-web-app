import React from 'react';

const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 px-4 sm:px-6 md:px-32">
      {/* Highlight 1 */}
      <div className="p-10 border border-dashed border-[#DE1587]">
        <h3 className="font-[400] text-2xl sm:text-3xl md:text-4xl text-[#000000] mt-4">1,500+</h3>
        <p className="font-[600] text-[#000000] text-lg mt-4">Properties to explore</p>
        <p className="text-[#000000] font[400] text-lg mt-2">
          Whether you're seeking adventure, relaxation, or a touch of luxury, we have the perfect place for you.
        </p>
      </div>

      {/* Highlight 2 */}
      <div className="p-10 border xl:border-l-0 border-dashed border-[#DE1587]">
        <h3 className="font-[400] text-2xl sm:text-3xl md:text-4xl text-[#000000] mt-4">1200+</h3>
        <p className="font-[600] text-[#000000] text-lg mt-4">Registered users</p>
        <p className="text-[#000000] font[400] text-lg mt-2">
          Yuyiii has quickly grown to serve a community, demonstrating its appeal and value to travelers.
        </p>
      </div>

      {/* Highlight 3 */}
      <div className="p-10 border xl:border-l-0 border-dashed border-[#DE1587]">
        <h3 className="font-[400] text-2xl sm:text-3xl md:text-4xl text-[#000000] mt-4">700+</h3>
        <p className="font-[600] text-[#000000] text-lg mt-4">Nights booked</p>
        <p className="text-[#000000] font[400] text-lg mt-2">
          We connect you with a wide range of accommodations, from budget-friendly to luxurious places.
        </p>
      </div>

      {/* Highlight 4 */}
      <div className="p-10 border xl:border-l-0 border-dashed border-[#DE1587]">
        <h3 className="font-[400] text-2xl sm:text-3xl md:text-4xl text-[#000000] mt-4">4.3 star</h3>
        <p className="font-[600] text-[#000000] text-lg mt-4">on Google</p>
        <p className="text-[#000000] font[400] text-lg mt-2">
          Boasting a top rating on Google, our travel booking website is your one-stop shop for all your travel needs.
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
