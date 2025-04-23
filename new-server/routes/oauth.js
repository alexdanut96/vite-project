import express from "express";
import { OAuth2Client } from "google-auth-library";
// import User from "../model/User.js";
import CryptoJS from "crypto-js";

const router = express.Router();

const getUserData = async (access_token) => {
  const fetchOptions = {
    endpoint: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    request: {
      method: "GET",
    },
  };
  const response = await fetch(fetchOptions.endpoint);
  return await response.json();
};

router.get("/", async (req, res) => {
  // const asasa = CryptoJS.AES.encrypt(
  //   "crypto",
  //   process.env.HASHED_PASSWORD
  // ).toString();
  // console.log(asasa);
  const code = req.query.code;
  try {
    const redirectUrl = process.env.GOOGLE_AUTH_REDIRECT_URL;

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const response = await oAuth2Client.getToken(code);

    await oAuth2Client.setCredentials(response.tokens);

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: oAuth2Client.credentials.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const userInfo = {
      uid: payload["sub"],
      name: payload["name"],
      email: payload["email"],
      profilePicture: payload["picture"],
    };

    // const alreadyExists = await User.findOne({ email: userInfo.email });

    // if (!alreadyExists) {
    //   res.redirect(303, `${process.env.WEBSITE_DOMAIN}/login`);
    //   return res.status(401).json({
    //     message: `You need admin permission for this account`,
    //   });
    // }
  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
  }

  res.redirect(303, process.env.WEBSITE_DOMAIN);
});

export default router;
