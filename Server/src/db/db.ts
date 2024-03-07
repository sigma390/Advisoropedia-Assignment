

import mongoose, { Schema, Document, model } from "mongoose";

import bcrypt from 'bcrypt';
import { hash, compare } from 'bcrypt';

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define mongoose schemas

/// User interface
interface User extends Document {
  username: string;
  password: string;
  checkbox: boolean;
}

// Define user schema
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  checkbox: { type: Boolean, default: false }
});
// Hash password before saving
userSchema.pre<User>('save', async function (next) {
  try {
    // Hash the password only if it's modified or new
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log("its eror")
  }
});

// Create and export User model
const User = model<User>('User', userSchema);

//=======================>  Post schema <===========================
interface Post extends Document {
    title: string;
    description: string;
   
  }
  
  const postSchema: Schema = new Schema({
    title: String,
    description: String,


  });
  
  const Post = mongoose.model<Post>('Post', postSchema);


export { User, Post };