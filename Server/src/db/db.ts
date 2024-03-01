

import mongoose, { Schema, Document } from "mongoose";


import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define mongoose schemas

//===============>  User schema <====================
interface User extends Document {
  username: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String },
  password: String
});
