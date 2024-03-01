

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
const UserModel = mongoose.model<User>('User', userSchema);


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
  
  const PostModel = mongoose.model<Post>('Post', postSchema);

  // ================> Connect to MongoDB <======================
const MONGODB_URI = process.env.MONGODB_URI!

mongoose.connect(MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

export { UserModel, PostModel };