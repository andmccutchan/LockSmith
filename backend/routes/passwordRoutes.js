import express from "express";
import UserPasswords from "../models/SavedPasswords.js"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

dotenv.config();

const router = express.Router();

// Middleware to verify JWT and attach user ID to request object
const verifyToken = (req, res, next) => {
  // console.log("Authorization Header:", req.headers["authorization"]);

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // console.log("Decoded token:", decoded);
    req.userId = decoded.id; // Attach userId from token
    next();
  });
};

// Route to get all saved passwords for the authenticated user
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const passwords = await UserPasswords.find({ userId: req.userId });
    res.json(passwords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving passwords" });
  }
});

// Route to add a new password for the authenticated user
router.post("/dashboard", verifyToken, async (req, res) => {
  try {
    const { website, username, password } = req.body;
    
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log("Hashed Password:", hashedPassword);
    console.log("UserId:", req.userId);

    const newPassword = new UserPasswords({
      userId: req.userId,
      website,
      username,
      password: hashedPassword
    });

    await newPassword.save();
    res.status(201).json({ message: "Password added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding password" });
  }
});

// Route to delete a password
router.delete("/dashboard/:id", verifyToken, async (req, res) => {
  console.log("Delete is tried");
    try {
      const { id } = req.params; // Get the password ID from the URL
  
      // Find and delete the password for the current user
      const password = await UserPasswords.findOneAndDelete({
        _id: id,
        userId: req.userId, // Ensure the user is authorized to delete this password
      });
  
      if (!password) {
        return res.status(404).json({ message: "Password not found" });
      }
  
      res.status(200).json({ message: "Password deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting password", error: err.message });
    }
  });
  

export default router;
