import express from "express";
import Hub from "../models/hub.model.js";

const router = express.Router();

// Get all hubs (with cities info)
router.get("/", async (req, res) => {
  try {
    const hubs = await Hub.find();
    res.json(hubs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hubs" });
  }
});

export default router;
