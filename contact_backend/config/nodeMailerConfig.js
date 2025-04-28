import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';

const user = process.env.user; 
const pass = process.env.pass;

const transporter = nodemailer.createTransport({
  service: 'gmail', // ✅ USE Gmail service
  auth: {
    user: user,
    pass: pass,
  },
});

export default transporter;
