import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import requestRoute from "./routes/request.js";
import oauthRoute from "./routes/oauth.js";
import regsiterRoute from "./routes/register.js";
import googleOauthRouter from "./routes/googleOauth.js";
import testRouter from "./routes/test.js";
import localLoginRouter from "./routes/localLogin.js";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", googleOauthRouter);
app.use("/api/login", requestRoute);
app.use("/oauth", oauthRoute);
app.use("/api/register", regsiterRoute);
app.use("/api/test", testRouter);
app.use("/api/login", localLoginRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
