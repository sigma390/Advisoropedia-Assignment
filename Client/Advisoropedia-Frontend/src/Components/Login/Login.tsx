import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const baseURL =  'http://localhost:3000/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };


  const handleResetPassword = () => {
    setPassword('');
  };
  const handleSubmit = async () => {
    // Form data (assuming you have state variables for username and password)
    const formData = {
      username: username,
      password: password
    };
  
    try {
      const response: AxiosResponse = await axios.post(baseURL+'/login', formData);
      
      console.log('Login response:', response.data);
      toast.success("Login Successfull!",{
        position:'top-center'
      });
      // Handle successful login response here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Login error:', axiosError.response.data);
          // Handle error response from the server
        } else {
          console.error('Login error:', axiosError.message);
          // Handle other types of errors
        }
      }
       
    }
  };

  return (
    <>
     <div className=" shadow-lg shadow-slate-400 hover:scale-105 duration-200 signup-card ">
      <h2 className='text-2xl text-center hover:scale-110 duration-200' >Login</h2>
      <div className="input-group">
        <label htmlFor="username">Username (Email)</label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password (Min 6 characters)</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className=' mt-1 hover:text-orange-500 duration-200' onClick={handleResetPassword}>Reset Password</button>
      </div>
      <div className='flex mt-5 justify-center items-center'>
      <button className=' w-32 flex p-2 bg-orange-700 
      rounded-xl justify-center items-center text-center
       text-xl text-white
        hover:bg-orange-500
         duration-200 hover:scale-110 ' onClick={handleSubmit}>Login</button>



      </div>
      
     
      
      
      
    </div>
    <ToastContainer/>
    
    
    </>
   
  );
};

export default Login;