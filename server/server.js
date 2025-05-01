import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import requestRoute from "./routes/request.js";
import oauthRoute from "./routes/oauth.js";
import googleOauthRouter from "./routes/googleOauth.js";
import testRouter from "./routes/test.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
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
app.use("/api/test", testRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   console.log(req);
//   res.send("API Working");
// });

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
