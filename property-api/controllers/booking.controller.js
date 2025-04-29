import Booking from '../models/booking.model.js';
import mongoose from 'mongoose';

// Create a new booking from a protected endpoint or via the payment callback
export const createBooking = async (req, res) => {
  console.log('createBooking called');
  console.log('Request body:', req.body);
  console.log('Authenticated user:', req.user);

  // Use the token's id (as shown in the logs) or fallback to req.body.userId
  const userId = req.user && req.user.id ? req.user.id : req.body.userId;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  const { stayId, bookingDates, totalAmount, guests, state, destination, productinfo } = req.body;

  try {
    const newBooking = new Booking({
      userId,
      stayId,
      bookingDates,
      totalAmount,
      guests,
      state,
      destination,
      stayName: productinfo,
      status: 'pending'
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: 'Failed to create booking' });
  }
};

// Get bookings for the current authenticated user
export const getUserBookings = async (req, res) => {
  try {
    console.log("getUserBookings called. Decoded token:", req.user);
    // Use req.user.id (since the token decodes with key "id")
    const tokenUserId = req.user.id;
    // Convert tokenUserId to a Mongoose ObjectId using the new keyword
    const bookings = await Booking.find({ userId: new mongoose.Types.ObjectId(tokenUserId) }).populate('stayId');
    console.log("Bookings found:", bookings);
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ success: false, message: 'Failed to retrieve bookings' });
  }
};
