import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const app = express();



const port  = process.env.PORT ;
app.listen(port,()=>{
    console.log(`staretd on ${port}`)
})