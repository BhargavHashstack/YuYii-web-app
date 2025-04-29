import express from 'express';
import { getFilteredStays, getStayImageFromS3 } from '../controllers/stay.controller.js';
import Stay from '../models/stay.model.js';

const router = express.Router();

// Get filtered stays, now including month filtering via the "months" query parameter
router.get('/filtered', getFilteredStays);
router.get("/image", getStayImageFromS3);
// Get all stays (if needed)
router.get('/', async (req, res) => {
  try {
    const stays = await Stay.find();
    res.json(stays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
