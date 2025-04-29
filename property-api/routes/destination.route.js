import express from "express";
import { getFilteredDestinations, getImageFromS3 } from "../controllers/destination.controller.js";

const router = express.Router();

router.get("/", getFilteredDestinations);
router.get("/image", getImageFromS3); // new route

export default router;
