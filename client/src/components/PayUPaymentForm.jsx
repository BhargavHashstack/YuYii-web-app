import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PAYU_CONFIG = {
  KEY: "5EMeYI",
  PAYMENT_URL: "https://secure.payu.in/_payment"
};

const PayUPaymentForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [formData, setFormData] = useState({
    bookingId: '',
    userId: '',
    stayId: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    amount: '',
    productinfo: '',
    bookingDates: '',
    guests: '',
    state: '',
    destination: ''
  });

  const [isPromiseChecked, setIsPromiseChecked] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill user data from Redux.
  useEffect(() => {
    if (currentUser) {
      const cleanedPhone = currentUser.phone ? currentUser.phone.replace(/\D/g, '').slice(-10) : '';
      setFormData(prev => ({
        ...prev,
        userId: currentUser._id || '',
        firstname: currentUser.username || '',
        email: currentUser.email || '',
        phone: cleanedPhone,
      }));
    }
  }, [currentUser]);

  // Prefill booking details from location.state if available.
  useEffect(() => {
    if (location.state && location.state.booking) {
      const { booking, checkIn, checkOut, guests, totalPrice, stayDetails } = location.state;
      setFormData(prev => ({
        ...prev,
        bookingId: booking._id || '',
        stayId: stayDetails?._id || '',
        productinfo: stayDetails?.name || stayDetails?.title || '',
        bookingDates: `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`,
        guests: `${guests.adults} Adults, ${guests.children} Children, ${guests.pets} Pets`,
        amount: totalPrice ? totalPrice.toString() : '',
        state: stayDetails?.state || '',
        destination: stayDetails?.destination || '',
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!isPromiseChecked) {
      setError('Please accept the promise before proceeding');
      return false;
    }
    const requiredFields = [
      'userId',
      'stayId',
      'bookingId',
      'firstname',
      'email',
      'phone',
      'amount',
      'productinfo',
      'bookingDates',
      'guests',
      'state',
      'destination'
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in ${field}`);
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    try {
      const txnid = `TXN_${Date.now()}`;
      // Include udf1 and udf2 in the hash data, corresponding to bookingDates and guests
      const hashData = {
        txnid,
        amount: parseFloat(formData.amount).toFixed(2),
        productinfo: formData.productinfo,
        firstname: formData.firstname,
        email: formData.email,
        udf1: formData.bookingDates, // Pass booking dates as udf1
        udf2: formData.guests,       // Pass guests info as udf2
      };

      const hashResponse = await axios.post('/property-api/generate-hash', hashData);
      const { hash } = hashResponse.data;

      // Pass the udf fields in the data going to PayU
      const payuData = {
        key: PAYU_CONFIG.KEY,
        txnid,
        amount: parseFloat(formData.amount).toFixed(2),
        firstname: formData.firstname,
        lastname: formData.lastname || '',
        email: formData.email,
        phone: formData.phone,
        productinfo: formData.productinfo,
        udf1: formData.bookingDates,  // bookingDates passed as udf1
        udf2: formData.guests,        // guests passed as udf2
        state: formData.state,
        destination: formData.destination,
        userId: formData.userId,
        stayId: formData.stayId,
        bookingId: formData.bookingId,
        surl: `${window.location.origin}/property-api/paymentsuccess`,
        furl: `${window.location.origin}/property-api/paymentfailure`,
        hash,
        service_provider: 'payu_paisa'
      };

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = PAYU_CONFIG.PAYMENT_URL;
      Object.entries(payuData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value || '';
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Payment error:', error);
      setError(`Payment processing failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="hidden">
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} />
          <input type="text" name="stayId" value={formData.stayId} onChange={handleChange} />
          <input type="text" name="bookingId" value={formData.bookingId} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name*</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount (INR)*</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="1"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stay Description (Name)*</label>
          <textarea
            name="productinfo"
            value={formData.productinfo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Booking Dates*</label>
          <input
            type="text"
            name="bookingDates"
            value={formData.bookingDates}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 14 Dec 2023 - 20 Dec 2023"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Guests*</label>
          <input
            type="text"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 2 Adults, 0 Children, 0 Pets"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State*</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. Maharashtra"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Destination*</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. Mulshi"
            required
          />
        </div>

        <div className="flex items-center space-x-2 py-4">
          <input
            type="checkbox"
            id="promise"
            checked={isPromiseChecked}
            onChange={(e) => setIsPromiseChecked(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="promise">
            I will not litter. I will not drink and drive
          </label>
        </div>

        <button
          type="submit"
          disabled={!isPromiseChecked}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default PayUPaymentForm;
