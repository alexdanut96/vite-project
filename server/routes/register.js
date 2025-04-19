import express from "express";
import User from "../model/User.js";
import CryptoJS from "crypto-js";

const router = express.Router();

// Register
router.post("/", async (req, res) => {
  const { username, email, password, phoneNumber, countryCode } = req.body;
  if (!username || !email || !password || !phoneNumber || !countryCode) {
    return res.status(400).json({ message: "All the fields are required!" });
  }

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.HASHED_PASSWORD
    ).toString(),
    phoneNumber: phoneNumber,
    countryCode: countryCode,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
