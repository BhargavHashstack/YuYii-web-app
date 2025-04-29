// src/models/review.model.js
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    stay_id: { type: Number, required: true },
    booking_id: { type: Number, required: true },
    stay_name: { type: String, required: true },  // stored as JSON string or plain string
    checkin: { type: Date, required: true },
    review: { type: String, required: true },     // stored as JSON string or plain string
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_pic: { type: String, required: true },
    user_location: { type: String, required: true },
    status: { type: String, required: true },     // "Accepted" or "Rejected"
    gallery: { type: String, required: true },    // stored as JSON string or plain string
  },
  { timestamps: true }
);

// IMPORTANT: make sure the third argument matches your actual collection name in MongoDB.
export default mongoose.model("Review", ReviewSchema, "review");
