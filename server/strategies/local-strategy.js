import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../model/User.js";
import CryptoJS from "crypto-js";

passport.serializeUser((user, done) => {
  console.log("inside serialize user", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserialize user", id);
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      throw Error("User not found");
    }
    done(null, foundUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    try {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser) {
        throw Error("User not found");
      }

      const hashedPassword = CryptoJS.AES.decrypt(
        foundUser.password,
        process.env.HASHED_PASSWORD
      ).toString(CryptoJS.enc.Utf8);

      if (hashedPassword !== password) {
        throw Error("Wrong password");
      }
      done(null, foundUser);
      //   req.session.user = foundUser.id;
      //   return res.status(200).send(foundUser);
    } catch (error) {
      done(error, null);
    }
  })
);
