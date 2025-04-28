import Otp from '../models/otp.js';
import transporter from "../config/nodeMailerConfig.js";

const user = process.env.user;
const pass = process.env.pass;

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

// Function to send the otp   
export const sendOTP = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    const otp = generateOTP();
  
    // Mail options
    const mailOptions = {
      from: user,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. Please use this code to verify your account. The code is valid for 10 minutes.`,
    };
  
    try {
      const existingOtp = await Otp.findOne({ email });
  
      if (existingOtp) {
        existingOtp.otp = otp;
        existingOtp.expiresAt = new Date(new Date().getTime() + 10 * 60000); // 10 minutes from now
        await existingOtp.save();
      } else {
        const newOtp = new Otp({
          email,
          otp,
          expiresAt: new Date(new Date().getTime() + 10 * 60000),
        });
        await newOtp.save();
      }
  
      // Send OTP by email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ error: "Failed to send OTP. Please try again later" });
    }
  };

// Function to verify the otp 
export const verifyOTP = async (req, res)=>{
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
  
    try {
      const otpEntry = await Otp.findOne({ email, otp });
  
      if (!otpEntry) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }
  
      // OTP is valid; proceed with the operation (e.g., user registration, password reset)
      res.status(200).json({ message: "OTP verified successfully" });
  
      // Optionally, delete the OTP entry after successful verification
      await Otp.deleteMany({ email });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  }

