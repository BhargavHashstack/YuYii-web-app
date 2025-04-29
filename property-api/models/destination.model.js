// destination.model.js
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  imagehover: [String],  // Updated field name for hover images
  description: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  travelInfo: String,
  activities: [String],
  stayType: String,
  amenities: [String],
  tripType: [String],
});

export default mongoose.model("Destination", destinationSchema);
