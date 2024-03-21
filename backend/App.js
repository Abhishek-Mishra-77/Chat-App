import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mongodb from "./db/MongoDb.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/user/auth", authRoutes);

app.listen(process.env.PORT, () => {
  mongodb();
  console.log(`Server running at ${process.env.PORT}`);
});
