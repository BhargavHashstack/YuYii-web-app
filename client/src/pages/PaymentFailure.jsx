import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment Failed
        </h1>
        <p className="mb-4">
          Unfortunately, your payment could not be processed.
          Please try again or contact support if the problem persists.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;