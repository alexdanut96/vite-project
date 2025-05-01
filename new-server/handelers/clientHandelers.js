import { Client } from "../model/Client.js";
import { hashPassword } from "../utils/functions.js";
import { matchedData, validationResult } from "express-validator";

const getClientByIdHandler = async (req, res) => {
  // const { findUserIndex } = request;
  // const findUser = mockUsers[findUserIndex];
  // if (!findUser) return response.sendStatus(404);
  // return response.send(findUser);
  try {
    const foundClient = await Client.findById(req.params.id);
    if (!foundClient) {
      return res.status(410).json({
        message: `User with ID "${req.params.id}" is no longer available!`,
      });
    }
    res.status(200).json(foundClient);
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      err = { message: `User ID "${req.params.id}" is invalid!` };
    }
    res.status(500).json(err);
  }
};

const createClientHandler = async (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);

  //   const alreadyExists = await Client.findOne({ email: req.body.email });

  //   if (alreadyExists) {
  //     return res.status(403).json({
  //       message: `${req.body.email} already registered`,
  //     });
  //   }

  const newClient = new Client({
    email: data.email,
    password: hashPassword(data.password),
  });

  try {
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createClientHandler, getClientByIdHandler };
