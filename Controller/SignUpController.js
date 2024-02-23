import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response as res } from "express";
import { signUp } from "../models/sign-up-schema.js";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const SignUpController = async (req, res) => {
  try {
    console.log(req.body, "req");
    const existUser = await signUp.findOne({ email: req.body.email });
    if (existUser) {
      console.log("user already exists");
      return res.status(401).json({ message: "User already exists" });
    } else {
      const hashedPassword = await hashPassword(req.body.password);
      const user = new signUp({
        ...req.body,
        password: hashedPassword,
      });
      await user.save();
      console.log("saved signup");
      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await signUp.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ email: user.email }, "your_secret_key");
        return res.status(200).json({
          message: `${user.firstName} login successful`,
          token,
          user,
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
