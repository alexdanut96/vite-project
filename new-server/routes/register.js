import express from "express";
import User from "../model/User.js";

const router = express.Router();

// Register
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const alreadyExists = await User.findOne({ email: req.body.email });

  if (alreadyExists) {
    return res.status(403).json({
      message: `${req.body.email} already registered`,
    });
  }

  const newUser = new User({
    email: email,
    adminPermission: true,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
