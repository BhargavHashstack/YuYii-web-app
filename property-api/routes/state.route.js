import express from "express";
import State from "../models/state.model.js";

const router = express.Router();

// Get all states
router.get("/", async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch states" });
  }
});

export default router;
