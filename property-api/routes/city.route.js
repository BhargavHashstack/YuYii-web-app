import express from "express";
import City from "../models/city.model.js";

const router = express.Router();

// Get all cities (with state info)
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

export default router;
