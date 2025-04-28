import express from "express";

const router = express.Router();

router.post("/local", (req, res) => {
  const {
    body: { email, password },
  } = req;
  console.log(email);
  console.log(password);
  console.log(req.session.id);
  res.status(200).send({ message: "client logged in" });
});

export default router;
