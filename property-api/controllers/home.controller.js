// src/controllers/home.controller.js
import Home from "../models/home.model.js";

// Helper to safely parse a JSON field that might be double-encoded.
const parseJSONField = (field) => {
  try {
    let parsed = JSON.parse(field);
    // If the parsed value is still a string, try parsing once more.
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    return parsed;
  } catch (err) {
    return field;
  }
};

export const getHomeData = async (req, res, next) => {
  try {
    // Assume there is one document with id: 1.
    const homeDoc = await Home.findOne({ id: 1 });
    if (!homeDoc) {
      return res.status(404).json({ success: false, message: "Home data not found" });
    }
    // Transform (and parse) the JSON-encoded fields.
    const transformed = {
      id: homeDoc.id,
      banner: parseJSONField(homeDoc.banner),
      destinations: parseJSONField(homeDoc.destinations),
      trip_types: parseJSONField(homeDoc.trip_types),
      rooms: parseJSONField(homeDoc.rooms),
      stays: parseJSONField(homeDoc.stays),
      experiences: parseJSONField(homeDoc.experiences),
    };
    res.status(200).json({ success: true, data: transformed });
  } catch (error) {
    next(error);
  }
};

export const updateHomeData = async (req, res, next) => {
  try {
    // Expect the client to send the home data as proper objects/arrays.
    const { banner, destinations, trip_types, rooms, stays, experiences } = req.body;
    const updateData = {
      banner: JSON.stringify(banner),
      destinations: JSON.stringify(destinations),
      trip_types: JSON.stringify(trip_types),
      rooms: JSON.stringify(rooms),
      stays: JSON.stringify(stays),
      experiences: JSON.stringify(experiences),
    };
    const updatedHome = await Home.findOneAndUpdate({ id: 1 }, updateData, { new: true, runValidators: true });
    if (!updatedHome) {
      return res.status(404).json({ success: false, message: "Home data not found" });
    }
    res.status(200).json({ success: true, data: updatedHome });
  } catch (error) {
    next(error);
  }
};
