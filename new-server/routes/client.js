import expresss from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { createClientValidationSchema } from "../utils/validationSchemas.js";
import { createClientHandler } from "../handelers/clientHandelers.js";

const router = expresss.Router();

router.get("/", (req, res) => {
  res.send({ message: "client router" });
});

router.post(
  "/",
  checkSchema(createClientValidationSchema, ["body"]),
  createClientHandler
);

export default router;
