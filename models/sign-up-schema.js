import mongoose from "mongoose";

const UserData = new mongoose.Schema({
  userName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  phone: {
    type: "string",
    require: true,
  },
});
export const signUp = mongoose.model("signUp", UserData);
