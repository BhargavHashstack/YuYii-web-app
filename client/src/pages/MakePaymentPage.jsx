// src/pages/MakePaymentPage.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import bookingbanner from '../assets/images/cancel-booking-banner.jpg';
import { FaHandshake } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
// custom PNG icons
import peopleIcon from '../assets/images/people-ico.png';
import doorIcon    from '../assets/images/door-ico.png';
import calIcon     from '../assets/images/cal-ico.png';
import dividerIcon from '../assets/images/cal-divider-ico.png';
import promiseIcon from '../assets/images/promise-ico.png'; 
import PartnerSection from '../components/RepeatedComponents/Partners';
const PAYU_CONFIG = {
  KEY: "5EMeYI",
  PAYMENT_URL: "https://secure.payu.in/_payment"
};

// format “22 Apr 2025”
const formatFullDate = (iso) => {
  const d = new Date(iso);
  const day = d.getDate();
  const mon = d.toLocaleString('default',{month:'short'});
  const year = d.getFullYear();
  return `${day} ${mon} ${year}`;
};

export default function MakePaymentPage() {
  const { currentUser } = useSelector(s => s.user);
  const { state } = useLocation();
  if (!state) return null;

  const {
    booking,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    stayDetails,
    selectedRooms = []
  } = state;

  const [promiseChecked, setPromiseChecked] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24)
  );

  const room = selectedRooms[0] || {
    name: stayDetails.name || stayDetails.title,
    price: stayDetails.price?.amount || 0,
    quantity: 1
  };

  const baseAmount   = room.price * nights * room.quantity;
  const igst         = +((baseAmount * 0.18).toFixed(2));
  const platformFee  = +((totalPrice - baseAmount - igst).toFixed(2));

  const handleReviewPay = async () => {
    if (!promiseChecked) return;

    const txnid        = `TXN_${Date.now()}`;
    const firstname    = currentUser.username || '';
    const email        = currentUser.email    || '';
    const cleanedPhone = (currentUser.phone||'').replace(/\D/g,'').slice(-10);

    const bookingDates = `${formatFullDate(checkIn)} - ${formatFullDate(checkOut)}`;
    const guestsStr    = `${guests.adults} Adults, ${guests.children} Children, ${guests.pets} Pets`;
    const productinfo  = room.name;

    const { data } = await axios.post('/property-api/generate-hash', {
      txnid,
      amount: totalPrice.toFixed(2),
      productinfo,
      firstname,
      email,
      udf1: bookingDates,
      udf2: guestsStr
    });
    const hash = data.hash;

    const payuData = {
      key: PAYU_CONFIG.KEY,
      txnid,
      amount: totalPrice.toFixed(2),
      firstname, lastname: '',
      email, phone: cleanedPhone,
      productinfo,
      udf1: bookingDates, udf2: guestsStr,
      state: stayDetails.state,
      destination: stayDetails.destination,
      userId:    currentUser._id,
      stayId:    stayDetails._id,
      bookingId: booking._id,
      surl: `${window.location.origin}/property-api/paymentsuccess`,
      furl: `${window.location.origin}/property-api/paymentfailure`,
      hash,
      service_provider: 'payu_paisa'
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = PAYU_CONFIG.PAYMENT_URL;
    Object.entries(payuData).forEach(([k,v]) => {
      const inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = k; inp.value = v;
      form.appendChild(inp);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const policies = stayDetails.policy || [];


  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative w-full h-60 md:h-80 overflow-hidden">
        <img
          src={bookingbanner}
          alt="Make Payment Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6 md:p-10">
          <p className="text-sm lg:ml-40 uppercase text-white mb-1">Review &amp;</p>
          <h1 className="text-3xl lg:ml-40 md:text-4xl font-serif text-white">Make payment</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:flex md:space-x-8">
        {/* LEFT */}
        <div className="md:w-2/3 space-y-6">
          {/* Promise + Button */}
          <div>
            <div className="flex items-center space-x-2">
            <img src={promiseIcon} className="w-10 h-8 mr-2" alt="Calendar" />
              <h3 className="font-semibold text-gray-900">Your promise</h3>
            </div>
            <div className="flex items-center space-x-2 ml-14 mt-2">
              <input
                type="checkbox"
                checked={promiseChecked}
                onChange={e => setPromiseChecked(e.target.checked)}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
              />
              <span className="text-sm font-[400] text-gray-700">
                I will not litter. I will not drink and drive
              </span>
            </div>
            <button
              onClick={handleReviewPay}
              disabled={!promiseChecked}
              className="mt-4 bg-[#DE1587] font-[300] text-poppins hover:bg-[#C41377] text-white px-16 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review and pay
            </button>
          </div>

          
          {/* Policies List */}
          <div className="bg-[#F6F6F6] p-8 py-16">
            <h2 className="font-[600] mb-4">Policies</h2>
            <ul className="space-y-6">
              {policies.map(p => (
                <li key={p.title}>
                  <button
                    onClick={() => setPolicyModalOpen(true)}
                    className="text-[#DE1587] font-[400] text-sm hover:underline"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* RIGHT */}
        <div className="md:w-1/3 mt-8 md:mt-0">
          <div className="bg-white shadow-2xl p-6 space-y-2">
            {/* Location & Title */}
            <div>
              <p className="text-xs font-[300] text-black mb-1">
                {stayDetails.destination}, {stayDetails.state}
              </p>
              <h3 className="text-md font-[600]">{stayDetails.name}</h3>
            </div>

            {/* Dates / Guests / Rooms */}
            <div className="border-t border-gray-300 pt-2 space-y-2 text-black text-sm">
              <div className="flex font-[300] items-center">
                <img src={calIcon} className="w-5 h-5 mr-2" alt="Calendar" />
                <span>
                  {formatFullDate(checkIn)}
                  <img src={dividerIcon} className="inline-block w-5 h-5 mx-1" alt="→" />
                  {formatFullDate(checkOut)}
                </span>
              </div>
              <div className="flex font-[300] items-center">
                <img src={peopleIcon} className="w-5 h-5 mr-2" alt="Guests" />
                <span>{guests.adults} Adults</span>
              </div>
              <div>
                <div className="flex font-[300] items-center">
                  <img src={doorIcon} className="w-5 h-5 mr-2" alt="Room" />
                  <span className="font-[600]">Rooms</span>
                </div>
                <p className="ml-7 font-[300] mt-1">{room.name} x {room.quantity}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 text-gray-700">
              <p className="font-[300] text-sm text-black">{room.name}</p>
              <div className="flex font-[300] text-sm text-black justify-between mt-2">
                <span>
                  ₹{room.price.toLocaleString()} × {nights} night{nights>1?'s':''} × {room.quantity} Room
                </span>
                <span>₹{baseAmount.toLocaleString()}</span>
              </div>
              <div className="flex font-[300] text-sm text-black justify-between mt-1">
                <span>18% IGST</span>
                <span>₹{igst.toLocaleString(undefined,{minimumFractionDigits:2})}</span>
              </div>
              <p className="font-[600] text-sm text-black mt-4">Extra Bed Taxes</p>
              <div className="flex font-[300] text-sm text-black justify-between mt-2">
                <span>Platform Fee</span>
                <span>₹{platformFee.toLocaleString(undefined,{minimumFractionDigits:2})}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-sm font-[400]">Total (INR)</span>
              <span className="text-sm font-semibold">
                ₹{totalPrice.toLocaleString(undefined,{minimumFractionDigits:2})}
              </span>
            </div>
          </div>
        </div>
       
      </div>
      {/* All-Policies Modal */}
      <AnimatePresence>
        {policyModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20 px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded p-6"
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
            >
              {/* Close */}
              <button
                onClick={() => setPolicyModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

              {/* Render all policies */}
              {policies.map(({ title, text }) => (
                <div key={title} className="mb-8 last:mb-0">
                  <h2 className="text-2xl font-semibold text-pink-600 mb-3">{title}</h2>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
       <PartnerSection />
    </div>
  );
}
