import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//Register User
router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create Password
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "User Registered Successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

//Login User
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid credentials"});

        //Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        //Generate JWT token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({token, userId: user._id});
    } catch (error) {
        res.status(500).json({message: "Error connecting to server"});
    }
});

export default router;