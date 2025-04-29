import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookCardDatePicker.css';

function BookCardDatePicker({ checkIn, checkOut, setCheckIn, setCheckOut }) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleStartDateChange = (date) => {
    setCheckIn(date);
    if (date > checkOut) {
      setCheckOut(date);
    }
  };

  const handleEndDateChange = (date) => {
    setCheckOut(date);
    if (date < checkIn) {
      setCheckIn(date);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return (
      <span className="custom-date">
        <span className="custom-day">{day}</span>
        <span className="custom-month">{month}</span>
        <span className="custom-year">{year}</span>
      </span>
    );
  };

  return (
    <div className="bg-[#FFFFFF]">
      <div className="flex flex-row items-start justify-between mt-2">
        {/* Start Date */}
        <div className="flex flex-col items-start">
          <p className="text-black text-sm sm:text-lg mb-2 font-[400]">Checkin</p>
          <div
            className="flex items-center cursor-pointer border py-2 sm:gap-4 lg:gap-2 xl:gap-8 px-2"
            onClick={() => startDateRef.current.setFocus()}
          >
            <DatePicker
              ref={startDateRef}
              selected={checkIn}
              onChange={handleStartDateChange}
              customInput={<div>{formatDate(checkIn)}</div>}
              dateFormat="MMM dd yyyy"
              minDate={today}
            />
            <svg className="w-[10px] h-[8px] sm:w-[12px] sm:h-[12px]" width="13" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.67383 1.87402L8.94165 9.14184L16.2095 1.87402" stroke="#1E1E1E" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col items-start">
          <p className="text-black text-sm sm:text-lg font-[400] font-poppins mb-2">Checkout</p>
          <div
            className="flex items-center cursor-pointer border py-2 sm:gap-4 lg:gap-2 xl:gap-8 px-2"
            onClick={() => endDateRef.current.setFocus()}
          >
            <DatePicker
              ref={endDateRef}
              selected={checkOut}
              onChange={handleEndDateChange}
              customInput={<div>{formatDate(checkOut)}</div>}
              dateFormat="MMM dd yyyy"
              minDate={checkIn}
            />
            <svg className="w-[10px] h-[8px] sm:w-[12px] sm:h-[12px]" width="13" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.67383 1.87402L8.94165 9.14184L16.2095 1.87402" stroke="#1E1E1E" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCardDatePicker;
