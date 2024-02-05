//import for packages
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

import morgan from "morgan";
import mongoose from "mongoose";

//import routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//import middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
app.use(express.json());

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

//Job router and handler
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port} `);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
