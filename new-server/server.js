import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import requestRoute from "./routes/request.js";
import oauthRoute from "./routes/oauth.js";
import regsiterRoute from "./routes/register.js";
import googleOauthRouter from "./routes/googleOauth.js";
import testRouter from "./routes/test.js";
import clientRouter from "./routes/client.js";
import localLoginRouter from "./routes/localLogin.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./strategies/local-strategy.js";

const app = express();
const PORT = process.env.PORT || 5000;

//database
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));

//routes
// app.use("/", googleOauthRouter);
// app.use("/api/login", requestRoute);
app.use("/oauth", oauthRoute);
app.use("/api/register", regsiterRoute);
app.use("/api/test", testRouter);
app.use("/api/login", localLoginRouter);
app.use("/api/client", clientRouter);

//authenticate
app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log("inside auth status", req.user);
  console.log(req.sessionStore.sessions);
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized. Please login" });
  }
  res.status(200).send(req.user);
});

app.post("/api/auth/logout", (req, res) => {
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

// app.get("/", (req, res) => {
//   console.log(req);
//   res.send("API Working");
// });

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
