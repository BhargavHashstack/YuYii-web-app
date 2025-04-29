// src/models/home.model.js
import mongoose from 'mongoose';

const HomeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    // Note: these fields are stored as JSON strings in the DB.
    banner: { type: String, required: true },
    destinations: { type: String, required: true },
    trip_types: { type: String, required: true },
    rooms: { type: String, required: true },
    stays: { type: String, required: true },
    experiences: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Home", HomeSchema, "home");
