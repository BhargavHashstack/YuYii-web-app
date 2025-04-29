import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bookingbanner from '../assets/images/Images/banners/booking-banner.jpg';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Ensure we call the backend server (port 3000) and send credentials
        const res = await axios.get('http://localhost:3000/property-api/booking', { withCredentials: true });
        if (res.data && res.data.bookings && res.data.bookings.length > 0) {
          setBookings(res.data.bookings);
        } else {
          console.log("No bookings returned:", res.data);
        }
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <div className="banner">
        <img 
          src={bookingbanner}
          alt="Booking History Banner"
          className="banner-img"
        />
        <div className="banner-content">
          <p className="banner-subtitle">Stays</p>
          <h1 className="banner-title">Booking History</h1>
        </div>
      </div>
      <div className="bookings-container">
        <div className="bookings-grid">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-image-container">
                  <img 
                    src="/api/placeholder/400/220"
                    alt={booking.stayName}
                    className="booking-image"
                  />
                  <span className={`booking-status ${booking.status}`}>
                    {booking.status === 'confirmed'
                      ? 'Booking Confirmed'
                      : booking.status === 'pending'
                      ? 'Booking Pending'
                      : 'Cancelled'}
                  </span>
                </div>
                <div className="booking-details">
                  <p className="booking-location">{booking.state}, {booking.destination}</p>
                  <h4 className="booking-title">{booking.stayName}</h4>
                  <p className="booking-dates">
                    <span>{booking.bookingDates}</span>
                    <span className="guests-count">{booking.guests}</span>
                  </p>
                  <div className="booking-actions">
                    <button className="btn-primary">View Details</button>
                    <button className="btn-secondary">Cancel Booking</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
      <style jsx>{`
        .banner { position: relative; width: 100%; height: 40vh; overflow: hidden; }
        .banner-img { width: 100%; height: 100%; object-fit: cover; }
        .banner-content { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: white; width: 100%; max-width: 1140px; padding: 0 15px; }
        .banner-subtitle { text-transform: uppercase; font-size: 12px; margin-bottom: 5px; }
        .banner-title { font-size: 35px; font-weight: 700; margin: 0; font-family: "Merriweather", serif; }
        .bookings-container { max-width: 1140px; margin: 0 auto; padding: 40px 15px; }
        .bookings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
        .booking-card { background: white; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .booking-image-container { position: relative; height: 220px; }
        .booking-image { width: 100%; height: 100%; object-fit: cover; }
        .booking-status { position: absolute; bottom: 0; left: 0; padding: 4px 15px; color: white; font-size: 12px; font-weight: 500; }
        .booking-status.confirmed { background: #30aa03; }
        .booking-status.pending { background: #fbb922; }
        .booking-status.cancelled { background: #ea0025; }
        .booking-details { padding: 15px; border: 1px solid #d3d3d3; border-top: none; }
        .booking-location { font-size: 12px; color: #666; margin: 0; }
        .booking-title { font-size: 18px; margin: 8px 0; font-family: "Merriweather", serif; }
        .booking-dates { font-size: 14px; color: #666; margin: 0 0 15px; display: flex; align-items: center; }
        .guests-count { margin-left: 10px; padding-left: 10px; border-left: 1px solid #d3d3d3; }
        .booking-actions { display: flex; gap: 10px; }
        .btn-primary { background: #de1587; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 14px; }
        .btn-secondary { background: white; color: #666; border: 1px solid #d3d3d3; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 14px; }
        @media (max-width: 768px) {
          .banner-title { font-size: 28px; }
          .bookings-grid { grid-template-columns: 1fr; }
          .booking-actions { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BookingHistory;
