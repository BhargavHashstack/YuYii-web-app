import mongoose from 'mongoose';

const StaySchema = new mongoose.Schema({
  id: String,
  images: [String],
  description: String,
  title: String,
  price: String,
  location: String,
  state: String,
  city: String,
  hub: String,
  distanceFromHub: Number,
  travelInfo: String,
  activities: [String],
  stayType: String,
  amenities: [String],
  tripType: [String],
  nearestAirport: String,
  nearestCity: String,
  // Field for month filtering:
  surprisemonths: [String],
  overview: {
    badge: String
  }
});

export default mongoose.model('Stay', StaySchema);
