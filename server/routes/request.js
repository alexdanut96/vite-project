import express from "express";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

router.post("/google", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.header("Access-Control-Allow-Credentials", "true");
  // res.header("Referrer-Policy", "no-referrer-when-donwgrade");
  const redirectUrl = process.env.GOOGLE_AUTH_REDIRECT_URL;

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile", // get user info
      "https://www.googleapis.com/auth/userinfo.email", // get user email ID and if its verified or not
      "openid",
    ],
    // prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

export default router;
