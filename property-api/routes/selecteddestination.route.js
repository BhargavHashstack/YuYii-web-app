// In selecteddestination.route.js
import express from "express";
import {
  getSelectedDestinationById,
  updateSelectedDestination,
  addSelectedDestination,
  getAllSelectedDestinations,
  deleteSelectedDestination,
} from "../controllers/selecteddestination.controller.js";

const router = express.Router();

// GET all selected destinations
router.get("/", getAllSelectedDestinations);

// GET a selected destination by id or name
router.get("/:id", getSelectedDestinationById);

// PUT to update an existing destination
router.put("/:id", updateSelectedDestination);

// POST to add a new destination
router.post("/", addSelectedDestination);

// DELETE a destination by numeric id
router.delete("/:id", deleteSelectedDestination);

export default router;
