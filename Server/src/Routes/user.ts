

import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJwt, SECRET } from "../middleware/Auth";
import { Post, User} from "../db/db";
import { Request, Response, Router } from 'express';


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//========================> Login Route <===================



let attempts:any = {};

router.post('/login', async (req: Request, res: Response) => {
    
    
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      return res.json({ message: 'Logged in successfully', token });
    } else {
        attempts[username] = (attempts[username] || 0) + 1;
      
      if (attempts[username] > 3) {
        return res.status(403).json({ message: 'Max Attempts Reached Try in 10 minutes' });
        
      }else{
        return res.status(403).json({ message: 'Invalid username or password' });
      }
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


//===========================> Get all posts Route <=============
//=================>  proper Authentication is applied on this route <===================

router.get('/posts', authenticateJwt, async (req, res) => {
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



