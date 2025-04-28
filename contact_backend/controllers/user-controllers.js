import User from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const phoneNumberRegex = /^(\+?\d{1,4})\s+\d{9,10}$/;
const nameRegex = /^(?!\s*$)[a-zA-Z\s]{3,100}$/;

// Function to get all the users
export const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Fetching users failed. Please try again later",
    });
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// Function to create a user
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Invalid inputs passed. Please check your data!",
    });
  }

  const { name, phone, email, password, confirmPassword } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create a new account. Please try again later",
    });
  }

  if (existingUser) {
    return res.status(422).json({
      success: false,
      message: "User exists already. Please login instead!",
    });
  }

  if (!phoneNumberRegex.test(phone)) {
    return res.status(400).json({
      error: "Invalid phone number format.",
    });
  }

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      error: "Name must contain at least 2 characters and only letters and spaces are allowed.",
    });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      success: false,
      message: "Password must be at least 6 characters long and include at least one uppercase letter, one digit, and one special character.",
    });
  }

  let hashedPassword;
  try {
    if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "Passwords do not match. Please check your inputs!",
      });
    }
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user. Please try again later!",
    });
  }

  const createdUsers = new User({
    name,
    phone,
    email,
    password: hashedPassword,
  });

  try {
    await createdUsers.save();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Signing up failed, Please try again!",
    });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUsers.id, email: createdUsers.email },
      process.env.JWT_KEY,
      { expiresIn: "3h" }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Signing up failed, Please try again",
    });
  }

  res.status(201).json({
    userId: createdUsers.id,
    email: createdUsers.email,
    token: token,
  });
};

// Function to login a user
export const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again",
    });
  }

  if (!existingUser) {
    return res.status(403).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Could not log you in, please check your credentials and try again",
    });
  }

  if (!isValidPassword) {
    return res.status(403).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, name: existingUser.name, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "3h" }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failed, Please try again",
    });
  }

  return res.status(200).json({
    name: existingUser.name,
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

// Function to reset the forgotten password
export const forgetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Could not find the account for this email",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot reset the password, Please try again",
    });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      success: false,
      message: "Password must be at least 6 characters long and include at least one uppercase letter, one digit, and one special character.",
    });
  }

  let hashedPassword;
  try {
    if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "Passwords do not match. Please check your inputs!",
      });
    }
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to reset password. Please try again later!",
    });
  }

  existingUser.password = hashedPassword;
  try {
    await existingUser.save();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot reset the password, Please try again",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Password has been reset",
  });
};
