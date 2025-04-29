import express from "express";
import { Client } from "../model/Client.js";
import CryptoJS from "crypto-js";

const router = express.Router();

router.post("/local", async (req, res) => {
  const { body } = req;

  if (!body || !body.email || !body.password) {
    return res.status(400).send({ message: "password or email is missing" });
  }

  try {
    const foundClient = await Client.findOne({ email: req.body.email });
    if (!foundClient) {
      throw Error("Client not found");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      foundClient.password,
      process.env.HASHED_PASSWORD
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword !== body.password) {
      return res.status(401).send({ message: "Wrong password" });
    }
    req.session.client = foundClient.id;
    return res.status(200).send(foundClient);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

router.get("/local/status", (req, res) => {
  return req.session.client
    ? res.status(200).send(req.session.client)
    : res.status(401).send({ message: "Not Authenticated" });
});

export default router;
