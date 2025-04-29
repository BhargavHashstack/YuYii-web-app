import Stay from '../models/stay.model.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

// Utility function to extract numeric price from strings like "Starting From : Rs 20000"
const extractPriceNumber = (priceString) => {
  if (!priceString) return 0;
  const priceMatch = priceString.match(/\d+/g); // Extract all numbers
  return priceMatch ? parseInt(priceMatch.join(""), 10) : 0; // Convert to integer
};

export const getFilteredStays = async (req, res) => {
  try {
    const {
      activities,
      stayType,
      amenities,
      tripType,
      propertyType, // This will be used to filter on the overview.badge field
      maxPrice, // If provided, used for price filtering
      state,
      city,
      hub,
      distanceFromHub,
      months // New query parameter for month filtering (e.g., "November" or "November,December")
    } = req.query;

    let filterConditions = {};

    // Helper to parse comma-separated values or arrays
    const parseArray = (param) => {
      if (!param) return [];
      return Array.isArray(param) ? param : param.split(",");
    };

    if (activities) filterConditions.activities = { $all: parseArray(activities) };
    if (stayType) filterConditions.stayType = { $all: parseArray(stayType) };
    if (amenities) filterConditions.amenities = { $all: parseArray(amenities) };
    if (tripType) filterConditions.tripType = { $all: parseArray(tripType) };

    // *** NEW: Update property type filter to use the overview.badge field ***
    if (propertyType) {
      // For each selected property type (e.g., "Silver", "Gold", "Platinum"), build a case-insensitive regex to match the corresponding badge file (e.g. "Silver.svg")
      filterConditions["overview.badge"] = {
        $in: parseArray(propertyType).map(
          (pt) => new RegExp(`${pt}\\.svg$`, "i")
        )
      };
    }

    // Case-insensitive matching for state and city
    if (state) {
      const stateArray = parseArray(state).map((s) => new RegExp(`^${s}$`, "i"));
      filterConditions.state = { $in: stateArray };
    }

    if (city) {
      const cityArray = parseArray(city).map((c) => new RegExp(`^${c}$`, "i"));
      filterConditions.city = { $in: cityArray };
    }

    if (hub) {
      filterConditions.hub = { $in: parseArray(hub).map(h => new RegExp(`^${h}$`, "i")) };
    }

    // Handle distance filtering
    if (distanceFromHub) {
      filterConditions.distanceFromHub = { $lte: parseInt(distanceFromHub, 10) };
    }

    // *** NEW: Month Filtering ***
    if (months) {
      // Parse the months query parameter into an array of month names
      filterConditions.suprisemonths = { $in: parseArray(months) };
    }

    // Fetch stays matching the filter conditions
    let stays = await Stay.find(filterConditions);

    // Apply manual price filtering if maxPrice is provided
    if (maxPrice) {
      const maxPriceValue = parseInt(maxPrice, 10);
      stays = stays.filter((stay) => extractPriceNumber(stay.price) <= maxPriceValue);
    }

    console.log("🔍 Applied Filters:", filterConditions);
    console.log("✅ Stays Found:", stays.length);

    res.json(stays);
  } catch (error) {
    console.error("❌ Error fetching stays:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getStayImageFromS3 = async (req, res) => {
  try {
    const { key } = req.query;
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // put your actual key
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // put your actual secret key
      }
    });

    const command = new GetObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key });
    const s3Response = await s3Client.send(command);

    res.setHeader('Content-Type', s3Response.ContentType);
    s3Response.Body.pipe(res);
  } catch (error) {
    console.error("Detailed Stays S3 Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
};
