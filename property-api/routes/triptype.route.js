
// routes/tripType.route.js
import express from 'express';
import Triptype from '../models/triptype.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const triptypes = await Triptype.find();
    res.json(triptypes);
  } catch (error) {
    console.error('Error fetching trip types:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;