// src/routes/review.route.js
import express from "express";
import { getAllReviews, updateReviewStatus } from "../controllers/review.controller.js";

const router = express.Router();

// GET all reviews
router.get("/", getAllReviews);

// PUT update the status of a single review
router.put("/:id/status", updateReviewStatus);

export default router;
