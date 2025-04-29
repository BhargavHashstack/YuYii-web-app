import React from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import styles

const CalendarComponent = ({ availableDates = [] }) => {
  // Ensure availableDates is an array before using .includes
  const checkAvailability = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    // Check if the date exists in availableDates array
    return availableDates && Array.isArray(availableDates) && availableDates.includes(formattedDate);
  };

  return (
    <div>
      <Calendar
        tileClassName={({ date, view }) => 
          checkAvailability(date) ? "bg-green-300" : "bg-red-300"
        }
        onChange={(date) => console.log("Selected date:", date)}
      />
    </div>
  );
};

export default CalendarComponent;
