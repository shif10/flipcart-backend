import express from "express";
import { SignUpController, loginUser } from "../Controller/SignUpController.js";
import {
  getProductById,
  productController,
} from "../Controller/productsController.js";

const app = express();

app.post("/signUp", SignUpController);
app.post("/login", loginUser);
app.get("/products", productController);
app.get("/product/:id", getProductById);
export default app;
