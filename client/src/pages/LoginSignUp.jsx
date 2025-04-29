// Import React
import React from 'react';
import OAuth from '../components/SignInLoginComponents/OAuth';
const LoginSignup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login/SignUp</h2>
        <p className="text-gray-600 text-sm mb-6">
          India's 1st Travel Platform to help you Discover a Unique Weekend Getaway
        <br />
        </p>

        <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile number
        </label>
        <input
          type="text"
          id="mobile-number"
          placeholder="Enter your 10 digit mobile number"
          className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          className="w-full bg-[#DF1A89] text-white font-medium py-2 px-4 rounded-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Login
        </button>

        <div className="flex items-center justify-center my-4">
          <span className="h-px bg-gray-300 flex-grow"></span>
          <span className="text-gray-500 px-2 text-sm">OR</span>
          <span className="h-px bg-gray-300 flex-grow"></span>
        </div>
          <OAuth />       
      </div>
    </div>
  );
};

export default LoginSignup;
