import express, { Request, Response } from 'express';

const app = express();

const port  = 3000;
app.listen(port,()=>{
    console.log(`staretd on ${port}`)
})