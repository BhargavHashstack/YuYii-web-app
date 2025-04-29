import express from 'express';
import {
  addProperty,
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyById,
} from '../controllers/property.controller.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Routes
router.post('/add', upload.single('propertyImage'), addProperty);
router.get('/', getAllProperties);
router.post('/create', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.get('/:id', getPropertyById);

export default router;
