// Load .env into process.env
import dotenv from "dotenv";
dotenv.config();

import Destination from "../models/destination.model.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const getFilteredDestinations = async (req, res) => {
  try {
    let { activities, amenities, stayType, tripType, states, cities } = req.query;
    let query = {};

    if (activities) {
      query.activities = { $all: activities.split(",").map((item) => item.trim()) };
    }
    if (amenities) {
      query.amenities = { $all: amenities.split(",").map((item) => item.trim()) };
    }
    if (stayType) {
      query.stayType = { $all: stayType.split(",").map((item) => item.trim()) };
    }
    if (tripType) {
      query.tripType = { $all: tripType.split(",").map((item) => item.trim()) };
    }
    if (states) {
      query.location = { $in: states.split(",").map((item) => item.trim()) };
    }
    if (cities) {
      query.id = { $in: cities.split(",").map((item) => item.trim()) };
    }

    console.log("Generated Query:", JSON.stringify(query, null, 2));

    const destinations = await Destination.find(query).collation({
      locale: "en",
      strength: 2,
    });

    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching destinations" });
  }
};

export const getImageFromS3 = async (req, res) => {
  try {
    const { key } = req.query;

    // Pull region and credentials from environment
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });
    const s3Response = await s3Client.send(command);

    res.setHeader("Content-Type", s3Response.ContentType);
    s3Response.Body.pipe(res);
  } catch (error) {
    console.error("Failed fetching image from S3:", error);
    res.status(500).json({ message: error.message });
  }
};
