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
import rootRouter from "./routes/root.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./strategies/local-strategy.js";
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || 5000;
const WEBSITE_DOMAINS = process.env.DOMAINS.split(",");

//database
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middlewares;
app.use(
  cors({
    origin: function (origin, callback) {
      if (WEBSITE_DOMAINS.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
      secure: process.env.IN_PRODUCTION,
      httpOnly: true,
      sameSite: process.env.IN_PRODUCTION ? "None" : "Lax",
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));

//routes\
app.use("/api/tools/auth/google", googleOauthRouter);
// app.use("/api/tools/auth/google/callback", testRouter);
// app.use("/api/login", requestRoute);
app.use("/oauth", oauthRoute);
app.use("/api/user", userRouter);
app.use("/api/auth/local", authRouter);
app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
