// routes/amenity.route.js
import express from 'express';
import Amenity from '../models/amenity.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;