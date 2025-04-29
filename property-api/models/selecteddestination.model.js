import mongoose from "mongoose";
const { Schema } = mongoose;

// Define a sub-schema for a weather entry.
const weatherSchema = new Schema(
  {
    note: String,
    weather: {
      type: String,
      enum: ["snowy", "rainy", "sunny", "cloudy", "windy"],
    },
  },
  { _id: false }
);

const selectedDestinationSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    zone: String,
    featured_video: { type: Schema.Types.Mixed }, // Can be a URL string or an object
    state: String,
    // Updated weather field using a Map whose values follow the weatherSchema
    weather: { type: Map, of: weatherSchema },
    review: String,
    backgroundImage: String,
    description: { text: String },
    subdescription: { text: String },
    activities: [String],
    images: {
      lifeStyle: [String],
      fun: [String],
      foodAndDrink: [String],
      places: [String],
    },
    mustTry: [
      {
        experience: String,
        image: String,
      },
    ],
    mustVisit: {
      name: String,
      Story: String,
      images: [String],
      video: String,
      ownerjob: String,
      ownername: String,
      thumbnail: String,
    },
    reviewer: String,
    reviewerName: String,
    designation: String,
    transport: {
      air: String,
      rail: String,
      road: String,
    },
    airLocations: { type: Schema.Types.Mixed }, // Stored as an object
    roadLocations: { type: Schema.Types.Mixed }, // Stored as an object
    destinationstay: [String],
    stays: { type: Schema.Types.Mixed },
    friend: String, // Original friend field (JSON string)
    yuyiiiFriend: { type: Schema.Types.Mixed }, // Already migrated object
  },
  { timestamps: true }
);

export default mongoose.model("SelectedDestination", selectedDestinationSchema);
