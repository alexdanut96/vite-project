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
import MongoStore from "connect-mongo";

//For https, uncomment the following lines

// import https from "https";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url"; // Import fileURLToPath to get __dirname equivalent

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const privateKey = fs.readFileSync(
//   path.join(__dirname, "certs", "localhost-key.pem"), // Ensure 'certs' folder is correct relative path
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   path.join(__dirname, "certs", "localhost.pem"), // Ensure 'certs' folder is correct relative path
//   "utf8"
// );
// const credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = process.env.PORT || 5000;

//database
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
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

app.get("/", (req, res) => {
  console.log(req);
  res.send("API Working");
});

//For https, uncomment the following lines and comment the app.listen line
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(PORT, () => {
//   console.log(`The server is up and running on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
