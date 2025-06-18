import { google } from "googleapis";
import CryptoJS from "crypto-js";
import express from "express";
import session from "express-session";
import url from "url";

const router = express.Router();

/**
 * To get these credentials for your application, visit
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // process.env.GOOGLE_AUTH_REDIRECT_URL
  "http://localhost:5000/api/tools/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile", // get user info
  "https://www.googleapis.com/auth/userinfo.email", // get user email ID and if its verified or not
  "openid",
];

/* Global variable that stores user credential in this code example.
 * ACTION ITEM for developers:
 *   Store user's refresh token in your data store if
 *   incorporating this code into your real app.
 *   For more information on handling refresh tokens,
 *   see https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
 */

// router.use(
//   session({
//     secret: process.env.SESSION_SECRET, // Replace with a strong secret
//     resave: false,
//     saveUninitialized: false,
//   })
// );

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

router.get("/callback", async (req, res) => {
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

router.post("/", async (req, res) => {
  console.log(req);
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    // Example: Extract user info
    const { email, name, picture, sub: googleId } = payload;

    // ✅ Create session (you can store user in DB first if needed)
    req.session.user = {
      googleId,
      email,
      name,
      picture,
    };

    return res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Token verification failed" });
  }
});

export default router;
