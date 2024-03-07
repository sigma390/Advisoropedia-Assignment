

import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJwt, SECRET } from "../middleware/Auth";
import { Post, User} from "../db/db";
import { Request, Response, Router } from 'express';
import validate from '../middleware/validate-middleware';
import {loginSchema, signUpSchema} from '../validator/auth-Val';

import bcrypt from 'bcrypt';
import { hash, compare } from 'bcrypt';


const router = express.Router();

// router.post('/signup',validate(signUpSchema), async (req:Request, res:Response) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (user) {
//       res.status(403).json({ message: 'User already exists' });
//     } else {
//       const newUser = new User({ username, password });
//       await newUser.save();
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'User created successfully', token });
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// //========================> Login Route <===================



// let attempts:any = {};

// router.post('/login', async (req: Request, res: Response) => {
    
    
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password });
//     if (user) {
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       return res.json({ message: 'Logged in successfully', token });
//     } else {
//         attempts[username] = (attempts[username] || 0) + 1;
      
//       if (attempts[username] > 3) {
//         return res.status(403).json({ message: 'Max Attempts Reached Try in 10 minutes' });
        
//       }else{
//         return res.status(403).json({ message: 'Invalid username or password' });
//       }
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


//=====================================> Encryption Testing <======================
router.post('/signup', validate(signUpSchema), async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Check if the user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    // Encrypt the password using bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const newUser = new User({ username, password });
    console.log(password);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    return res.json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login Route
let attempts: any = {};

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      // User not found
      attempts[username] = (attempts[username] || 0) + 1;
      if (attempts[username] > 3) {
        return res.status(403).json({ message: 'Max Attempts Reached. Try again in 10 minutes' });
      } else {
        return res.status(403).json({ message: 'Invalid username or password' });
      }
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      attempts[username] = (attempts[username] || 0) + 1;
      if (attempts[username] > 3) {
        return res.status(403).json({ message: 'Max Attempts Reached. Try again in 10 minutes' });
      } else {
        return res.status(403).json({ message: 'Invalid username or password' });
      }
    }

    // Password matched, generate JWT token
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

















//===========================> Get all posts Route <=============
//=================>  proper Authentication is applied on this route <===================

router.get('/posts', authenticateJwt,async (req, res) => {
    const posts= await Post.find({});
    res.json({ posts });
  });
  



  // just for testing purpse i have added this create Post route
  router.post('/post', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.json({ message: 'Post created successfully', postId: post.id });
  });

export default router;



function middleware() {
  throw new Error('Function not implemented.');
}

