import React, { useState, useEffect } from 'react';
import { PostCard } from './PostCard'; // Assuming PostCard is in the same directory
import { baseURL } from '../Signup/Signup';

interface Post {
  id:string;
  title: string;
  description: string;
  image: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          throw new Error('Authorization token not found in localStorage');
        }

        const response = await fetch(baseURL + '/posts', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include authorization token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} description={post.description} image={post.image} />
      ))}
    </div>
  );
};

export default Posts;