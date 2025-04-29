// src/routes/home.route.js
import express from "express";
import { getHomeData, updateHomeData } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/", getHomeData);
router.put("/", updateHomeData);

export default router;
