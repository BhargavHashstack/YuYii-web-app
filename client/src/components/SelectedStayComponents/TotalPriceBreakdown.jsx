import React, { useState } from "react";
import { motion } from "framer-motion";

const formatDate = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) return "";
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day} ${month}`;
};

const BookingDetailsModal = ({
  isOpen,
  onClose,
  guests,
  totalPrice,
  checkIn,
  checkOut,
  nights,
  selectedRooms = [],
  pricePerNight = 0,
}) => {
  if (!isOpen) return null;

  
  

  const days = nights + 1;
  const dow = checkIn.getDay();
  const dayLabel = dow === 0 || dow === 6 ? "Weekend" : "Weekday";
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    ><div className=" overflow:hidden">
      <motion.div
        className="bg-white w-[300px] shadow-lg py-4 px-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-[500] mb-4">Booking Details</h2>
        <div className="flex gap-1">
        <svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.598 13.0525C18.9781 11.6529 19.7475 9.76358 19.7377 7.79805C19.728 5.83253 18.94 3.95091 17.5462 2.56505C16.152 1.17922 14.2661 0.401367 12.3004 0.401367C10.3346 0.401367 8.44875 1.17922 7.05459 2.56505C5.66118 3.95085 4.87344 5.83218 4.86373 7.79736C4.85402 9.76254 5.62314 11.6516 7.00279 13.0511C5.06012 13.8142 3.39176 15.1437 2.21438 16.8671C1.03699 18.5905 0.404971 20.6281 0.400391 22.7153C0.400391 23.5357 1.06679 24.2007 1.88859 24.2007H22.7122C23.534 24.2007 24.2004 23.5357 24.2004 22.7139C24.1952 20.6272 23.563 18.5902 22.3856 16.8674C21.2083 15.1445 19.5402 13.8154 17.598 13.0525ZM12.3004 3.38685C12.8929 3.37617 13.4816 3.48362 14.0321 3.70293C14.5826 3.92223 15.0839 4.249 15.5067 4.66416C15.9296 5.07932 16.2655 5.57455 16.4948 6.12094C16.7242 6.66734 16.8424 7.25394 16.8426 7.84653C16.8428 8.43911 16.7249 9.02579 16.4959 9.57233C16.2669 10.1189 15.9313 10.6143 15.5087 11.0297C15.0861 11.4452 14.585 11.7722 14.0347 11.9919C13.4843 12.2115 12.8957 12.3194 12.3032 12.3091C11.1337 12.2887 10.019 11.8099 9.19901 10.9758C8.37903 10.1417 7.91938 9.01898 7.91901 7.84933C7.91864 6.67967 8.37759 5.55664 9.19704 4.72202C10.0165 3.8874 11.1309 3.40793 12.3004 3.38685ZM3.52379 21.2271C3.86962 19.5486 4.78346 18.0407 6.11133 16.9574C7.43919 15.8741 9.09989 15.2816 10.8136 15.2799H13.7886C15.502 15.2819 17.1624 15.8745 18.49 16.9578C19.8176 18.0411 20.7312 19.5488 21.077 21.2271H3.52379Z" fill="#505459"/>
</svg>

<p className="text-xs text-[#505459] font-poppins font-[300] mb-2">
              {guests.adults} Adults, {guests.children} Children, {guests.pets} Pets
            </p>
        </div>
        
        {/* Nights & Days */}
        <p className="text-xs text-[#505459] font-poppins font-[300] mb-4">
          {nights} Night{nights > 1 ? "s" : ""}, {days} Day{days > 1 ? "s" : ""}
        </p>

        <div className="border-t pt-2">
        <h3 className="font-[400] text-sm mb-2">Rooms</h3>

{selectedRooms.length > 0
  ? selectedRooms.map((room) => {
      const perNight = room.price ?? pricePerNight;
      const lineTotal = perNight * nights * room.quantity;
      return (
        <div key={room.id} className="mb-4">
          {/* Room Name & Quantity */}
          <p className="text-sm text-[#505459]">
            {room.name}
            {room.quantity > 1 ? ` (x${room.quantity})` : ""}
          </p>
          {/* Weekday/Weekend */}
          <p className="text-xs text-[#000000] font-poppins font-[300]">
            ({dayLabel})
          </p>
          {/* Date Range & Meal Plan */}
          <p className="text-xs text-[#505459] font-poppins font-[300] mb-2">
            {formatDate(checkIn)} - {formatDate(checkOut)}{" "}
            (Room + {room.mealPlan ?? "Breakfast"})
          </p>
          {/* Price × Nights × Rooms */}
          <div className="flex justify-between">
            <p className="text-xs text-[#505459] font-poppins font-[300]">
              ₹{perNight.toLocaleString()} × {nights} Night
              {nights > 1 ? "s" : ""} × {room.quantity} Room
              {room.quantity > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-[#505459] font-poppins font-[300]">
              ₹{lineTotal.toLocaleString()}
            </p>
          </div>
        </div>
      );
    })
  : (
    // Fallback if no rooms selected
    <div className="mb-4">
      <p className="text-sm text-[#505459]">1 Room</p>
      <p className="text-xs text-[#000000] font-poppins font-[300]">
        ({dayLabel})
      </p>
      <p className="text-xs text-[#505459] font-poppins font-[300] mb-2">
        {formatDate(checkIn)} - {formatDate(checkOut)} (Room + Breakfast)
      </p>
      <div className="flex justify-between">
        <p className="text-xs text-[#505459] font-poppins font-[300]">
          ₹{pricePerNight.toLocaleString()} × {nights} Night
          {nights > 1 ? "s" : ""} × 1 Room
        </p>
        <p className="text-sm text-[#505459] font-poppins font-[300]">
          ₹{(pricePerNight * nights).toLocaleString()}
        </p>
      </div>
    </div>
  )}

{/* Tax, Totals, etc. */}
<h3 className="font-poppins text-sm">Tax</h3>
<p className="text-xs text-[#505459] font-poppins font-[300] mb-4">
  Taxes Included
</p>
<div className="border-t pt-2">
            <div className="flex justify-between text-[#505459] font-[600] text-sm mb-2">
              <span>Total Tariff & Taxes</span>
              <span className="font-[500]">
                ₹{(totalPrice - 1180).toLocaleString()}
              </span>
            </div>
          </div>
            <div className="border-t pt-2">
            <div className="flex justify-between text-[#505459] font-[600] text-sm mb-2">
              <span>Platform Fees</span>
              <span  className="font-[500]">₹1180</span>
            </div>
            </div>
            <div className="border-t pt-2">
            <div className="flex justify-between font-[600] ">
              <span  className="text-[#505459] text-sm font-[600]">Total Amount</span>
              
            </div>
            </div>
            
          

          <div className= "flex  justify-between text-center text-xs text-pink-600 font-medium mb-6">
          
<span className="flex gap-1"> <svg width="16" height="16" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9937 25.4671C11.2437 25.4671 9.59901 25.1342 8.05967 24.4685C6.52056 23.8027 5.18068 22.9 4.04001 21.7605C2.89934 20.6209 1.99634 19.2808 1.33101 17.7401C0.665675 16.1997 0.333008 14.5537 0.333008 12.8021C0.333008 11.0506 0.665563 9.40401 1.33067 7.86246C1.99556 6.3209 2.89801 4.98001 4.03801 3.83979C5.17801 2.69957 6.51856 1.79679 8.05967 1.13146C9.60079 0.466344 11.2475 0.133789 12.9997 0.133789C14.4041 0.133789 15.733 0.3449 16.9863 0.767122C18.2397 1.18934 19.3895 1.77823 20.4357 2.53379L18.9893 4.01346C18.1278 3.42012 17.1946 2.95857 16.1897 2.62879C15.1848 2.29879 14.1215 2.13379 12.9997 2.13379C10.0441 2.13379 7.52745 3.17268 5.44967 5.25046C3.3719 7.32823 2.33301 9.8449 2.33301 12.8005C2.33301 15.756 3.3719 18.2727 5.44967 20.3505C7.52745 22.4282 10.0441 23.4671 12.9997 23.4671C13.745 23.4671 14.4681 23.3919 15.169 23.2415C15.8699 23.091 16.5442 22.8808 17.192 22.6108L18.692 24.1311C17.8322 24.5585 16.9258 24.888 15.9727 25.1198C15.0198 25.3513 14.0268 25.4671 12.9937 25.4671ZM11.1073 18.4721L5.90234 13.2671L7.30734 11.8621L11.1073 15.6621L24.2613 2.48779L25.6663 3.89279L11.1073 18.4721Z" fill="#DE1587"/>
</svg>Best-Price Guarantee</span>
            <span  className="font-[500] text-[#505459] text-sm">₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2">
            <p className="text-xs text-[#505459] font-[500]">Yuyiii is a community of 10,000+
registered Travellers. Please reach out
to us at 8657519123 for any queries.</p>
          </div>

          
        </div>
      </motion.div>
      <div className=" ml-[62.23%]">
      <button
  className=" ml-auto bg-[#DE1587] text-white p-3 border font-[300] font-poppins text-xs hover:bg-pink-600 "
  onClick={() => alert("Make Payment")}
>
  Make Payment
</button>
      </div>
      

      </div>
    </div>
  );
};

const TotalPriceComponent = ({
  currency,
  totalPrice,
  guests,
  nights,
  checkIn,
  checkOut,
  selectedRooms,
  pricePerNight,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="mt-6 text-sm sm:text-lg flex justify-between items-start font-[400]">
        <span>Total</span>
        <div className="text-right">
          <span>
            {currency}
            {totalPrice.toLocaleString()}
          </span>
          <p
            className="text-xs sm:text-sm font-[500] text-[#B3B3B3] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            See breakdown
          </p>
        </div>
      </div>

      <BookingDetailsModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         guests={guests}
         totalPrice={totalPrice}
         checkIn={checkIn}
         checkOut={checkOut}
         nights={nights}
         selectedRooms={selectedRooms}
         pricePerNight={pricePerNight}
        
      />
    </div>
  );
};

export default TotalPriceComponent;
