import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../firebase"; // Adjust import path if necessary
import "react-phone-number-input/style.css"; // Ensure you have this for styling
import PhoneInput from "react-phone-number-input"; // Install using `npm install react-phone-number-input`

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null); // Holds confirmation result for OTP verification
  const navigate = useNavigate();

  // Set up the reCAPTCHA verifier
  const setupRecaptcha = () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container", 
      {
        size: "invisible", // invisible reCAPTCHA
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        }
      },
      auth
    );
    recaptchaVerifier.render();
    return recaptchaVerifier;
  };

  // Function to send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!phoneNumber) {
      setError("Please enter a valid phone number!");
      return;
    }
    
    try {
      const recaptchaVerifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
    } catch (err) {
      setError("Error sending OTP: " + err.message);
    }
  };

  // Function to verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!otp) {
      setError("Please enter the OTP!");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      navigate("/Home"); // Redirect to home page or any other protected route
    } catch (err) {
      setError("OTP verification failed: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Phone Login</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Send OTP Form */}
      {!confirmationResult ? (
        <form onSubmit={sendOtp}>
          <div className="mb-4">
            <PhoneInput
              defaultCountry="US"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter phone number"
            />
          </div>

          <div id="recaptcha-container" className="mb-4"></div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Send OTP
          </button>
        </form>
      ) : (
        // OTP Verification Form
        <form onSubmit={verifyOtp}>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneSignIn;
