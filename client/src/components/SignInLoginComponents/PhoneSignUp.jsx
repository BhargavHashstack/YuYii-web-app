import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Phone Sign Up</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <div className="mb-4">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div id="recaptcha-container"></div>
          </div>

          <div className="flex justify-between">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-600">
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </div>
        </form>

        <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-600">
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneSignUp;
