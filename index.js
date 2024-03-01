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

// Adding a middleware to check for authentication
app.use((req, res, next) => {
  // Check if the request has an Authorization header
  if (!req.headers.authorization) {
    // If not, send a 401 status code with a WWW-Authenticate header
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    return res.status(401).send("Unauthorized");
  }
  // If the request has an Authorization header, continue to the next middleware
  next();
});

startServer();
