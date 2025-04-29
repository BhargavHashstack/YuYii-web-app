// routes/selectedstay.route.js
import express from "express";
import Selectedstay from "../models/selectedstay.model.js";

const router = express.Router();

// 1️⃣ GET /property-api/selectedstay  → list all stays
router.get("/", async (req, res, next) => {
  try {
    const all = await Selectedstay.find({});
    res.json(all);
  } catch (err) {
    next(err);
  }
});

// 2️⃣ GET /property-api/selectedstay/:stayId  → detail of one stay
router.get("/:stayId", async (req, res, next) => {
  try {
    const doc = await Selectedstay.findOne({ stayId: req.params.stayId });
    if (!doc) return res.status(404).json({ message: "Selected Stay not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

export default router;
