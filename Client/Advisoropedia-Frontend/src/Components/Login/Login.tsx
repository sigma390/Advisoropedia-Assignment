import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { object, string,  ZodError } from 'zod';

const baseURL =  'http://localhost:3000/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passChnage, setPassChange]  =useState('password');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate()
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    clearValidationError('username');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    clearValidationError('password');
  };


  const handleSignup = ()=>{
    navigate('/signup')
  }


  const handleShowPassword = () => {
    if (passChnage=== 'email') {
      setPassChange("password");

      
    }else{
      setPassChange("email")

    }
    
  };


  //input validation
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
        password: password
      };
      const response: AxiosResponse = await axios.post(baseURL+'/login', formData);
      
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
  const clearValidationError = (fieldName: string) => {
    setValidationErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };


  return (
    <>
    <ToastContainer/>
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
        <div className=' flex justify-end'>
        <button className=' mt-1 hover:text-orange-500 
        duration-200' onClick={handleShowPassword}>Show Password</button>

        </div>
        
      </div>
      <div className='flex mt-2 justify-center items-center'>
      <button className=' w-32 flex p-2 bg-orange-700 
      rounded-xl justify-center items-center text-center
       text-xl text-white
        hover:bg-orange-500
         duration-200 hover:scale-110 ' onClick={handleSubmit}>Login</button>



      </div>
      <div className='mt-2 flex justify-center items-center'><p>Dont have Account? </p><button onClick={handleSignup} className=' ml-2 text-blue-500'>Signup Here</button></div>
      
     
      
      
      
    </div>
    
    
    
    </>
   
  );
};

export default Login;