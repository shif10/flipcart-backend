import express from "express";
import { Connection } from "./database/db.js";
import dotenv from "dotenv";
import routes from "./routers/routes.js";
import defaultData from "./defaultdata.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

const startServer = async () => {
  try {
    await Connection();
    console.log("connected to database");
    app.listen(5000, () => {
      console.log("server started on port 5000 ");
    });
    // defaultData();
    app.use("/", routes);
  } catch (error) {
    console.log(error, "error connecting to database");
  }
};

startServer();
