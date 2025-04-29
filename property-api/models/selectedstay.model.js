// models/selectedstay.model.js
import mongoose from "mongoose";

const SelectedstaySchema = new mongoose.Schema({
  stayId: { type: String, unique: true },
  name: String,
  destination: { type: String, required: true },  // <-- Added destination field
  overview: {
    text: String,
    badge: String,
    rating: String,
    staytags: [String],
    activitytags: [String]
  },
  stayvideo: String,
  images: [String],
  room: [
    {
      id: String,
      name: String,
      image: String,
      description: String,
      amenities: [String],
      availability: String
    }
  ],
  amenities: [
    {
      icon: String,
      label: String
    }
  ],
  activities: [
    {
      icon: String,
      label: String
    }
  ],
  gallery: {
    type: Map,
    of: [String],
    default: {},
  },
  availability: {
    calendar: String,
    status: String
  },
  review: {
    image: String,
    reviewerName: String,
    location: String,
    review: String,
    improvement: String,
    highlight: String,
    experience: String,
    reviewerdesignation: String,
    tip: String,
    suitable: String,
    ratings: [
      {
        category: String,
        score: Number
      }
    ],
    propertyImage: [String],
    socialLinks: [
      {
        icon: String,
        url: String
      }
    ]
  },
  maplocation: String,
  location: {
    name: String,
    description: String,
    mapUrl: String,
    latitude: Number,
    longitude: Number
  },
  faqs: [
    {
      question: String,
      answer: String
    }
  ],
  price: {
    currency: String,
    amount: Number,
    details: String
  }
});

const Selectedstay = mongoose.model("Selectedstay", SelectedstaySchema, "selectedstay");
export default Selectedstay;
