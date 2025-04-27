import session from "express-session";
import { google } from "googleapis";
import CryptoJS from "crypto-js";
import express from "express";
import url from "url";

const router = express.Router();

/**
 * To get these credentials for your application, visit
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  // process.env.GOOGLE_AUTH_REDIRECT_URL
  "http://localhost:5000/test"
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

  // Store state in the session
  req.session.state = state;
  // Generate a url that asks permissions for the Drive activity and Google Calendar scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: state,
  });
  // res.redirect(authorizationUrl);
  res.json({
    url: authorizationUrl,
  });
});

router.get("/oauth2callback", async (req, res) => {
  // Handle the OAuth 2.0 server response
  let q = url.parse(req.url, true).query;
  console.log(req.query);
  if (q.error) {
    // An error response e.g. error=access_denied
    console.log("Error:" + q.error);
  } else if (q.state !== req.session.state) {
    // console.log(q.state);
    // console.log(req.session.state);
    //check state value
    console.log("State mismatch. Possible CSRF attack");
    res.end("State mismatch. Possible CSRF attack");
  } else {
    let { tokens } = await oauth2Client.getToken(q.code);
    console.log(tokens);
  }
});

export default router;
