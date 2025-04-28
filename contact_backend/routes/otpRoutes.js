import express from 'express'
import { sendOTP, verifyOTP } from '../controllers/otp-controller.js'
const router = express.Router();

// Route to send the otp 
router.post("/send-otp", sendOTP);

// Route to verify the otp 
router.post("/verify-otp", verifyOTP);

export default router;