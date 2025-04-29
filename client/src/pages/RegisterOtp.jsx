import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Firebase config
import OAuth from '../components/SignInLoginComponents/OAuth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneInput.css';

const RegisterOtp = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [hasFilled, setHasFilled] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      let newCode = [...otp];
      newCode[index] = value;
      setOtp(newCode);
      if (value !== '' && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const TIMEOUT = 60000; // 60 seconds timeout

  useEffect(() => {
    if (window.recaptchaVerifier) {
      return;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => console.log(response),
        'expired-callback': () => {},
      }
    );
    window.recaptchaVerifier.render();
  }, []);

  useEffect(() => {
    let interval;
    if (hasFilled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasFilled, timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    // Format phone number to E.164 format
    const formattedPhone = `+${phone}`;
    const sendOtpPromise = signInWithPhoneNumber(auth, formattedPhone, appVerifier);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OTP sending timed out')), TIMEOUT)
    );
    try {
      const confirmationResult = await Promise.race([sendOtpPromise, timeoutPromise]);
      window.confirmationResult = confirmationResult;
      setHasFilled(true);
      setTimer(60);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }
    try {
      // Confirm the OTP with Firebase
      const result = await window.confirmationResult.confirm(otpString);
      const firebaseUser = result.user; // Contains phoneNumber but not full DB data
      
      // Call backend verifyOtp endpoint to get the full user details (including _id)
      const res = await fetch('/property-api/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          phone: firebaseUser.phoneNumber,
          // Optionally include an avatar URL if needed
          avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Dispatch signInSuccess to update Redux store with full user data
        dispatch(signInSuccess(data.user));
        navigate('/profile');
      } else {
        dispatch(signInFailure(data.message));
        alert(data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      dispatch(signInFailure(error.message || 'Failed to verify OTP'));
      alert('Invalid OTP or request timed out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        {!hasFilled ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Login/SignUp</h2>
            <p className="text-gray-600 text-sm mb-6">
              India's 1st Travel Platform to help you Discover a Unique Weekend Getaway
            </p>
            <div className="mb-6">
              <label
                htmlFor="mobile-number"
                className="w-full block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile number
              </label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                placeholder="Enter your phone number"
                className="phone-input w-full mb-6 rounded-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`w-full bg-[#DF1A89] text-white font-medium py-2 px-4 rounded-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  loading ? 'bg-gray-400' : 'bg-[#DF1A89]'
                }`}
              >
                {loading ? 'Login...' : 'Login'}
              </button>
            </div>
            <div id="recaptcha-container" className="mt-4"></div>
            <div className="flex items-center justify-center my-4">
              <span className="h-px bg-gray-300 flex-grow"></span>
              <span className="text-gray-500 px-2 text-sm">OR</span>
              <span className="h-px bg-gray-300 flex-grow"></span>
            </div>
            <OAuth />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Code verification</h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter 6-digit code that has been sent to your mobile number{' '}
              <span className="font-semibold">{phone}</span>
            </p>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Code
            </label>
            <div className="flex justify-between mb-4">
              {otp.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-input-${index}`}
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-xl"
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {timer > 0 ? (
                <span>00 : {timer}</span>
              ) : (
                <span className="text-red-500">OTP expired</span>
              )}
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={loading || timer <= 0}
              className={`w-full bg-pink-500 text-white font-medium py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                loading ? 'bg-gray-400' : 'bg-[#DF1A89]'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterOtp;
