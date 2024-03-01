import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import cors from 'cors';

import userRouter from "./Routes/user"
import path from "path";
import mongoose from 'mongoose';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

const port  = process.env.PORT ;
app.listen(port,()=>{
    console.log(`staretd on ${port}`)
})




  // ================> Connect to MongoDB <======================
  const MONGODB_URI = process.env.MONGODB_URI!

  mongoose.connect(MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));