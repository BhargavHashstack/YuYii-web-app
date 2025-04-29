// routes/stayGallery.route.js
import express from 'express';
import { getStayGallery } from '../controllers/stayGallery.controller.js';

const router = express.Router();

router.get('/:stayId', getStayGallery);

export default router;
