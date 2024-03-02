import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const baseURL =  'http://localhost:3000/user'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate()

  const [passChnage, setPassChange]  =useState('password');

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleResetPassword = () => {
    setPassword('');
  };
  const handleShowPassword = () => {
    if (passChnage=== 'email') {
      setPassChange("password");

      
    }else{
      setPassChange("email")

    }
    
  };
  

  const handleSubmit = async () => {
    // Form data (assuming you have state variables for username and password)
    const formData = {
      username: username,
      password: password
    };
  
    try {
      const response: AxiosResponse = await axios.post(baseURL+'/signup', formData);
      console.log('Signup response:', response.data);
      localStorage.setItem("token",response.data.token)
      toast.success(`Welcome!!! email has been sent to ${username}`,{
        position:'top-center'
      });
      navigate("/post")
      // Handle successful login response here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Signup error:', axiosError.response.data);
          // Handle error response from the server
        } else {
          console.error('Signup error:', axiosError.message);
          // Handle other types of errors
        }
      }
       
    }
  };

  return (


    <>
    <div className=" shadow-lg shadow-slate-400 hover:scale-105 duration-200 signup-card ">
      <h2 className='text-2xl text-center hover:scale-110 duration-200' >Sign up</h2>
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
          type={passChnage}
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className=' flex justify-between'>
        <button className=' mt-1 hover:text-orange-500 duration-200' onClick={handleResetPassword}>Clear Password</button>
        <button className=' mt-1 hover:text-orange-500 duration-200' onClick={handleShowPassword} >Show Password</button>
        </div>
       
      </div>
      <div className=" flex-row inline">
        <input
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={handleTermsChange}
        />
        <label className='ml-5' htmlFor="terms">I agree to the terms and conditions</label>
      </div>
      <div className='flex mt-5 justify-center items-center'>
      <button className=' pb-1 w-32 flex p-2 bg-orange-700 
      rounded-xl justify-center items-center text-center
       text-xl text-white
        hover:bg-orange-500
         duration-200 hover:scale-110 ' onClick={handleSubmit}>Signup</button>



      </div>
      
     
      
      
      
    </div>
    <ToastContainer/>
    
    
    
    </>
    
  );
};

export default Signup;