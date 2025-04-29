// Import React
import React, { useState } from 'react';

const CodeVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Code verification</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter 6-digit code that has been sent to your mobile number <span className="font-bold">84537784354</span>
        </p>

        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Code
        </label>
        <div className="flex justify-between mb-4">
          {code.map((_, index) => (
            <input
              key={index}
              type="text"
              id={`code-input-${index}`}
              maxLength="1"
              value={code[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-xl"
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center mb-6">00:51</p>

        <button
          className="w-full bg-pink-500 text-white font-medium py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default CodeVerification;
