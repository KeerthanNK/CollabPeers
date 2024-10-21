import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDb from "./config/Db.js";
import userRoutes from "./routes/userRoutes.js";
import { projRouter } from "./routes/projRoutes.js";

dotenv.config();

const app = express();

connectDb();

//port
const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json({ strict: false }));
app.use("/api/user", userRoutes);
app.use("/api", projRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
