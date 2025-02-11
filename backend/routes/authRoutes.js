import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import dotenv from "dotenv";
import SavedPasswords from "../models/SavedPasswords.js";

const SALT_ROUNDS = 10;

dotenv.config();

const router = express.Router();

//Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "Email and password are required"});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "Email already in use"});
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword});
        await newUser.save();
        
        res.status(201).json({message: "User Registered!"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({error: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({error: "Password does not match"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h"});

        res.json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Store user password in database
router.post("/dashboard", async (req, res) => {
    try {
        const { website, username, password, userId } = req.body;
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
        if (!token) return res.status(401).json({ error: "No token provided" });

        // Validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ error: "Invalid token" });

        // Ensure the userId from the request matches the decoded token's userId
        if (decoded.id !== userId) {
            return res.status(400).json({ error: "User ID does not match" });
        }

        if (!website || !username || !password || !userId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newSavedPassword = new SavedPasswords({
            userId,
            website,
            username,
            password: encryptedPassword,
        });

        await newSavedPassword.save();
        res.status(201).json({ message: "Password saved successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve user password from database
router.get("/dashboard/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const savedPasswords = await SavedPasswords.find({userId});

        if (!savedPasswords.length) {
            return res.status(404).json({ error: "No saved passwords found"})
        }

        res.json(savedPasswords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;