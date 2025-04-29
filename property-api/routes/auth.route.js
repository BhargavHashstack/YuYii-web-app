import express from 'express';
import { google, signOut, signin, signup, verifyOtp } from '../controllers/auth.controller.js';
import { setPassword } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/set-password", setPassword);
router.post('/google', google);
router.get('/signout', signOut);
router.post('/verifyOtp', verifyOtp);

export default router;
