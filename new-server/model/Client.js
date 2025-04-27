import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const Client = mongoose.model("Client", ClientSchema);
