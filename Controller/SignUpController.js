import { response as res } from "express";
import { signUp } from "../models/sign-up-schema.js";

export const SignUpController = async (req, res) => {
  try {
    console.log(req.body, "req");
    const existUser = await signUp.findOne({ email: req.body.email });
    if (existUser) {
      console.log("user already exist");
      return res.status(401).json({ message: "user already exist" });
    } else {
      const user = new signUp(req.body);
      await user.save();
      console.log("saved signup");

      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log("itttt", error);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await signUp.findOne({ email, password });
    if (user) {
      return res
        .status(200)
        .json({ message: `${user.firstName} login successful`, user });
    } else {
      return res.status(401).json({ message: "invalid user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
