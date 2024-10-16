import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDb from "./config/Db.js";
import userRoutes from "./routes/userRoutes.js";
import { projRouter } from "./routes/projRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api", projRouter);

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
