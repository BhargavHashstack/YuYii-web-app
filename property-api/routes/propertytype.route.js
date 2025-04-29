// routes/propertyTypeRoutes.js

import express from 'express';
import Propertytype from '../models/propertytype.model.js';

const router = express.Router();

// Route to get all property types
router.get('/', async (req, res) => {
  try {
    const propertytypes = await Propertytype.find();
    res.json(propertytypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
