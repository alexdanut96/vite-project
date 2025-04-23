import session from "express-session";
import { google } from "googleapis";
import CryptoJS from "crypto-js";
import express from "express";

const router = express.Router();

/**
 * To get these credentials for your application, visit
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.GOOGLE_AUTH_REDIRECT_URL
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile", // get user info
  "https://www.googleapis.com/auth/userinfo.email", // get user email ID and if its verified or not
  "openid",
];

let userCredential = null;

/* Global variable that stores user credential in this code example.
 * ACTION ITEM for developers:
 *   Store user's refresh token in your data store if
 *   incorporating this code into your real app.
 *   For more information on handling refresh tokens,
 *   see https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
 */

router.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
  })
);

router.get("/", async (req, res) => {
  const state = CryptoJS.AES.encrypt(
    "crypto",
    process.env.HASHED_PASSWORD
  ).toString();

  req.session.state = state;
  res.redirect("/test");
});

router.get("/test", async (req, res) => {
  console.log(req.session);
});

export default router;
