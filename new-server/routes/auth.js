import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("local"), (req, res) => {
  res.status(200).send(req.user);
});

router.get("/status", (req, res) => {
  console.log("inside auth status", req.user);
  console.log(req.sessionStore.sessions);
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized. Please login" });
  }
  res.status(200).send(req.user);
});

router.post("/logout", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  req.logOut((error) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.sendStatus(200);
  });
});

export default router;
