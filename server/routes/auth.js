import jwt from "jsonwebtoken";
import express from "express";
import User from "../model/User.js";
import CryptoJS from "crypto-js";

const router = express.Router();

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email and passowd are required!" });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: `Cannot associate a user with the email address ${req.body.email}!`,
      });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.HASHED_PASSWORD
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: "Wrong passwod!" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err); // Unauthorized
  }
});

// module.exports = router;
export default router;
