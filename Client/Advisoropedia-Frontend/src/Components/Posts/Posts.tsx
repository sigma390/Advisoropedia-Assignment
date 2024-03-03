import React, { useState, useEffect } from 'react';
import { PostCard } from './PostCard'; // Assuming PostCard is in the same directory
import { baseURL } from '../Signup/Signup';
import axios from 'axios';

interface Post {
  id:string;
  title: string;
  description: string;
  images: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const init = async () => {
    try {
      const response = await axios.get(`${baseURL}/posts`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };





  useEffect(() => {
    

    init();
  }, []);

  return (
    <div className="grid mt-10 ml-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mr-24">
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} description={post.description} image={post.images} />
      ))}
    </div>
  );
};

export default Posts;