import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay', required: true },
  bookingDates: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  guests: { type: String, required: true },
  state: { type: String, required: true },
  destination: { type: String, required: true },
  stayName: { type: String, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
