// routes/stayType.route.js
import express from 'express';
import Staytype from '../models/staytype.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const staytypes = await Staytype.find();
    res.json(staytypes);
  } catch (error) {
    console.error('Error fetching stay types:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;