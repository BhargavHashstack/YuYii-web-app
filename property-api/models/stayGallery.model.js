// models/StayGallery.js
import mongoose from 'mongoose';

const StayGallerySchema = new mongoose.Schema({
  // Reference to the SelectedStay document (must be a valid ObjectId)
  stayId: { type: mongoose.Schema.Types.ObjectId, ref: 'SelectedStay', required: true },
  // Gallery data: a Map where each key is a tab name and its value is an array of image URLs
  gallery: {
    type: Map,
    of: [String],
    default: {},
  },
}, { timestamps: true });

export default mongoose.model('StayGallery', StayGallerySchema);
