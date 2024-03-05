import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { object, string,  ZodError } from 'zod';

export const baseURL =  'http://localhost:3000/user'


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate()

  const [passChnage, setPassChange]  =useState('password');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    clearValidationError('username');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    clearValidationError('password');
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

  const clearValidationError = (fieldName: string) => {
    setValidationErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
    clearValidationError('rememberMe');
  };

  // Input validation Schema

  const schema = object({
    username: string().email({ message: 'Please enter a valid email address' }),
    password: string().min(6, { message: 'Password must be at least 6 characters long' }),

   
  });
  

  const handleSubmit = async () => {
    // Form data (assuming you have state variables for username and password)
   
  
    try {
      schema.parse({ username, password });
      const formData = {
        username: username,
        password: password,
        rememberMe:rememberMe
      };
      const response: AxiosResponse = await axios.post(baseURL+'/signup', formData);
      
      console.log('Login response:', response.data);
      localStorage.setItem("token",response.data.token)
      toast.success("Login Successfull!",{
        position:'top-center'
      });
      navigate("/posts")
      // Handle successful login response here
    } catch (error) {
      

        // Handle Zod validation errors
        
        if (error instanceof ZodError) {
          const validationErrors: { [key: string]: string } = {};
          error.errors.forEach((validationError) => {
            const field = validationError.path.join('_');
            validationErrors[field] = validationError.message;
          });
        setValidationErrors(validationErrors);

        }
        // Handle axios errors
        else if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            const responseData = axiosError.response.data as Record<string, unknown>;
            const errorMessage = responseData.message;
            toast.error(`${errorMessage}`, { position: 'top-center' });
          } else {
            console.error('Login error:', axiosError.message);
            toast.error('An error occurred. Please try again later.', { position: 'top-center' });
            
          }
        
      }
    }
  };

  return (


    <>
    <ToastContainer/>
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
        {validationErrors.username && (
          <div className="error-message  text-red-600">{validationErrors.username}</div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="password">Password (Min 6 characters)</label>
        <input
          type={passChnage}
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {validationErrors.password && (
          <div className="error-message text-red-600">{validationErrors.password}</div>
        )}
        <div className=' flex justify-between'>
        <button className=' mt-1 hover:text-orange-500 duration-200' onClick={handleResetPassword}>Clear Password</button>
        <button className=' mt-1 hover:text-orange-500 duration-200' onClick={handleShowPassword} >Show Password</button>
        </div>
       
      </div>
      <div className=" flex-row inline">
      <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        <label className='ml-5' htmlFor="rememberMe">I agree to the terms and conditions</label>
        {validationErrors.rememberMe && (
            <div className="error-message text-red-600">{validationErrors.rememberMe}</div>
          )}
      </div>
      <div className='flex mt-5 justify-center items-center'>
      <button className=' pb-1 w-32 flex p-2 bg-orange-700 
      rounded-xl justify-center items-center text-center
       text-xl text-white
        hover:bg-orange-500
         duration-200 hover:scale-110 ' onClick={handleSubmit}>Signup</button>



      </div>
      
     
      
      
      
    </div>
    
    
    
    
    </>
    
  );
};

export default Signup;