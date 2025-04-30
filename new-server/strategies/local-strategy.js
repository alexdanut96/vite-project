import passport from "passport";
import { Strategy } from "passport-local";
import { Client } from "../model/Client.js";
import CryptoJS from "crypto-js";

passport.serializeUser((user, done) => {
  console.log("inside serialize user", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserialize user", id);
  try {
    const foundClient = await Client.findById(id);
    if (!foundClient) {
      throw Error("Client not found");
    }
    done(null, foundClient);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    try {
      const foundClient = await Client.findOne({ email: email });
      if (!foundClient) {
        throw Error("Client not found");
      }

      const hashedPassword = CryptoJS.AES.decrypt(
        foundClient.password,
        process.env.HASHED_PASSWORD
      ).toString(CryptoJS.enc.Utf8);

      if (hashedPassword !== password) {
        throw Error("Wrong password");
      }
      done(null, foundClient);
      //   req.session.client = foundClient.id;
      //   return res.status(200).send(foundClient);
    } catch (error) {
      done(error, null);
    }
  })
);
