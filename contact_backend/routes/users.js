import express from "express";
import { check } from "express-validator";
import {
  getUsers,
  signup,
  login,
  forgetPassword
} from "../controllers/user-controllers.js";

const router = express.Router();

// Route to get all the users 
router.get("/", getUsers);

// Route to create a user
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

// Route to login a user
router.post("/login", login);

// Route to reset the password
router.put("/forget-password", forgetPassword);

export default router;
