

import mongoose, { Schema, Document } from "mongoose";


import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define mongoose schemas

//===============>  User schema <====================
interface User extends Document {
  username: string;
  password: string;
  checkbox:boolean;
}

const userSchema: Schema = new Schema({
  username: { type: String },
  password: String,
  checkbox: Boolean
});
const User = mongoose.model<User>('User', userSchema);


//=======================>  Post schema <===========================
interface Post extends Document {
    title: string;
    description: string;
    images: string; // Assuming images are stored as URLs
  }
  
  const postSchema: Schema = new Schema({
    title: String,
    description: String,
    images: String
  });
  
  const Post = mongoose.model<Post>('Post', postSchema);


export { User, Post };