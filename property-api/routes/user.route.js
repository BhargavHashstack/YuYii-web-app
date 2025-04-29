import express from 'express';
import {
  deleteUser,
  test,
  updateUser,
  getUserListings,
  getUser,
    getUserByPhone,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

/**
 * Test Route
 * GET /property-api/user/test
 */
router.get('/test', test);

/**
 * Update User
 * POST /property-api/user/update/:id
 * Requires authentication (verifyToken middleware)
 */
router.put('/update/:id', verifyToken, updateUser); // Changed to PUT for semantic correctness

/**
 * Delete User
 * DELETE /property-api/user/delete/:id
 * Requires authentication (verifyToken middleware)
 */
router.delete('/delete/:id', verifyToken, deleteUser);

/**
 * Get User Listings
 * GET /property-api/user/listings/:id
 * Requires authentication (verifyToken middleware)
 */
router.get('/listings/:id', verifyToken, getUserListings);

/**
 * Get User Details
 * GET /property-api/user/:id
 * Requires authentication (verifyToken middleware)
 */
router.get('/:id', verifyToken, getUser);


// Get User by Phone
router.get('/phone/:phone', getUserByPhone);


export default router;
