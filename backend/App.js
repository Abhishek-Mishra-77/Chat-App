import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import mongodb from "./db/MongoDb.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user/auth", authRoutes);
app.use("/user/message", messageRoutes);

app.listen(process.env.PORT, () => {
  mongodb();
  console.log(`Server running at ${process.env.PORT}`);
});
