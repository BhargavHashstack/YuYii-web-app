import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  description: { type: String },
  location: { type: String, required: true },
  price: { type: String },
  video: { type: String },
  images: [String],
  amenities: [String],
  activities: [String],
  ratings: [
    {
      category: String,
      stars: Number,
    },
  ],
  expertStory: {
    title: String,
    content: String,
  },
  story: String,
  expert: {
    image: String,
    name: String,
    description: String,
    instagram: String,
  },
  tip: {
    icon: String,
    heading: String,
    text: String,
  },
  highlight: {
    icon: String,
    heading: String,
    text: String,
  },
});

// Check if the model already exists to prevent OverwriteModelError
const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

export default Property;
