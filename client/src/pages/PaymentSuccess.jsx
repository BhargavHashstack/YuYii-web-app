import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="mb-4">
          Your transaction has been completed successfully.
          You will receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate('/bookings')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Bookings section
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;