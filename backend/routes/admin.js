const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

const JWT_SECRET = "samplekey";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register first admin if none exists, or require auth for subsequent admins
router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  const { username, password } = req.body;
  try {
    const existingAdmins = await Admin.countDocuments();
    if (existingAdmins > 0) {
      // Require authentication for creating more admins
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }
      const token = authHeader.split(" ")[1];
      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    }
    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 