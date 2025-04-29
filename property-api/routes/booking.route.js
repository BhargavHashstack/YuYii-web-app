import express from 'express';
import { createBooking, getUserBookings } from '../controllers/booking.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createBooking);
router.get('/', isAuthenticated, getUserBookings);

export default router;
