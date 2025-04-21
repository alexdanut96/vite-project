import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String },
    phoneNumber: { type: String, required: false },
    countryCode: { type: String, required: false },
    adminPermission: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
