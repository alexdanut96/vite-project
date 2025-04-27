import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.cookie("testCookie", "ALEX BURCEA 96", { maxAge: 60000 * 2 });
  res.status(200).send({ message: "cookie test done" });
});

export default router;
