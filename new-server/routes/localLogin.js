import express from "express";
import { User } from "../model/User.js";
import { hashPassword } from "../utils/functions.js";

const router = express.Router();

router.post("/local", async (req, res) => {
  console.log(req);
  const { body } = req;

  if (!body || !body.email || !body.password) {
    return res.status(400).send({ message: "password or email is missing" });
  }

  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      throw Error("User not found");
    }

    if (hashPassword(foundUser.password) !== body.password) {
      return res.status(401).send({ message: "Wrong password" });
    }
    req.session.user = foundUser.id;
    return res.status(200).send(foundUser);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

router.get("/local/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (error, sessionData) => {
    console.log(sessionData);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ message: "Not Authenticated" });
});

export default router;
