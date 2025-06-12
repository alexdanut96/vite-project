import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req);
  res.send("API Working");
});

export default router;
