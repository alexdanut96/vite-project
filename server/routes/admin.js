import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  return res.status(200).json({});
});

export default router;
