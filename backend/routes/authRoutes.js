import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//Register User
router.post("/register", (req, res) => {
    const { username, password, email } = req.body;
    const saltRounds = 10;

    try {
        const salt = bcrypt.genSalt(saltRounds);
        const hashedPassword = bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword, email});
        newUser.save();
        
        res.json({message: "User Registered!"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({error: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({error: "Password does not match"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h"});

        res.json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({error: "Access Denied"});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }
}



export default router;