import React, { useState, useEffect } from 'react';
import { fetchStates } from '../../utils/api';
import "./FilterDropdown.css";
const StateFilter = ({ selectedStates = [], setSelectedStates }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const states = await fetchStates();
        setStateOptions(Array.isArray(states) ? states.map(state => ({
          value: state.value,
          label: state.label,
        })) : []); // ✅ Always an array
      } catch (error) {
        console.error("❌ Error fetching states:", error);
        setStateOptions([]); // ✅ Fallback to an empty array
      }
    };
  
    loadStates();
  }, []);
  
  const toggleStateSelection = (stateValue) => {
    if (selectedStates.includes(stateValue)) {
      setSelectedStates(selectedStates.filter((state) => state !== stateValue));
    } else {
      setSelectedStates([...selectedStates, stateValue]);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mt-6 mb-6">
      <p className="text-base font-[500] font-poppins mb-2">Select State</p>
      <div className="relative">
        <button
          onClick={handleDropdownToggle}
          className="w-full p-2 border rounded bg-white flex justify-between items-center"
        >
          <div className="flex flex-wrap gap-2">
            {selectedStates.length > 0 ? (
              selectedStates.map((state) => (
                <div
                  key={state}
                  className="flex items-center bg-[#F1F1F1] text-black rounded-sm py-1 px-4 text-sm"
                >
                  {state}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStateSelection(state);
                    }}
                    className="ml-2 text-white hover:text-gray-900"
                  >
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.66497 5.72732C6.8319 5.89415 6.92572 6.12046 6.92579 6.35646C6.92586 6.59246 6.83218 6.81883 6.66535 6.98575C6.49852 7.15268 6.27222 7.2465 6.03622 7.24657C5.80021 7.24664 5.57385 7.15296 5.40692 6.98613L3.51985 5.0983L1.63201 6.98613C1.54957 7.06903 1.45156 7.13481 1.34361 7.1797C1.23566 7.22459 1.1199 7.2477 1.00299 7.2477C0.886078 7.2477 0.770319 7.22459 0.662369 7.1797C0.554418 7.13481 0.456405 7.06903 0.373963 6.98613C0.20705 6.8192 0.113281 6.5928 0.113281 6.35673C0.113281 6.12066 0.20705 5.89426 0.373963 5.72732L2.26104 3.84025L0.373963 1.95317C0.217089 1.78437 0.131792 1.5613 0.136012 1.33089C0.140231 1.10049 0.233638 0.880695 0.396588 0.717745C0.559537 0.554796 0.779329 0.461389 1.00974 0.457169C1.24014 0.45295 1.46321 0.538247 1.63201 0.695121L3.51985 2.5822L5.40692 0.695121C5.48953 0.612516 5.58759 0.546991 5.69552 0.502285C5.80345 0.45758 5.91913 0.43457 6.03595 0.43457C6.15277 0.43457 6.26845 0.45758 6.37637 0.502285C6.4843 0.546991 6.58237 0.612516 6.66497 0.695121C6.74758 0.777726 6.8131 0.875792 6.85781 0.98372C6.90251 1.09165 6.92553 1.20733 6.92553 1.32415C6.92553 1.44097 6.90251 1.55664 6.85781 1.66457C6.8131 1.7725 6.74758 1.87057 6.66497 1.95317L4.7779 3.84025L6.66497 5.72732Z" fill="black"/>
</svg>
                  </button>
                </div>
              ))
            ) : (
              <span className='text-gray-500'>States</span>
            )}
          </div>
          <span>{isDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 border rounded bg-white">
            <div className="flex flex-col p-2">
              {stateOptions.map((option) => (
                <label key={option.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedStates.includes(option.value)}
                    onChange={() => toggleStateSelection(option.value)}
                    className="mr-2 rounded  focus:ring-black custom-checkbox"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateFilter;
