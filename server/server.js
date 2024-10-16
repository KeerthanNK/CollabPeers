import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDb from "./config/Db.js";
import userRoutes from './routes/userRoutes.js'; //illi error anthe nodale nange
                                                  //yen anthane artha aghilla
dotenv.config();

const app = express();

const PORT = process.env.PORT  ;


app.use(cors());
app.use(express.json()); 
app.use('/api/user',userRoutes);

connectDb();


app.get('/', (req, res) => {
  res.send('Landing Page');
});



app.get('*', (req, res) => {
  res.status(404).send("404 error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
