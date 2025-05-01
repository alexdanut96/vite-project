import expresss from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.js";
import { createUserHandler } from "../handelers/clientHandelers.js";

const router = expresss.Router();

router.get("/", (req, res) => {
  res.send({ message: "client router" });
});

router.post(
  "/",
  checkSchema(createUserValidationSchema, ["body"]),
  createUserHandler
);

export default router;
