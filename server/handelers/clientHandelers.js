import { User } from "../model/User.js";
import { hashPassword } from "../utils/functions.js";
import { matchedData, validationResult } from "express-validator";

const getUserByIdHandler = async (req, res) => {
  // const { findUserIndex } = request;
  // const findUser = mockUsers[findUserIndex];
  // if (!findUser) return response.sendStatus(404);
  // return response.send(findUser);
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(410).json({
        message: `User with ID "${req.params.id}" is no longer available!`,
      });
    }
    res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      err = { message: `User ID "${req.params.id}" is invalid!` };
    }
    res.status(500).json(err);
  }
};

const createUserHandler = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);

  //   const alreadyExists = await User.findOne({ email: req.body.email });

  //   if (alreadyExists) {
  //     return res.status(403).json({
  //       message: `${req.body.email} already registered`,
  //     });
  //   }

  const newUser = new User({
    email: data.email,
    password: hashPassword(data.password),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createUserHandler, getUserByIdHandler };
