import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

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
  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="signup-card ">
      <h2 className='text-2xl text-center'>Login</h2>
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
        <button className=' hover:text-orange-500 duration-200' onClick={handleResetPassword}>Reset Password</button>
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
      <div className='flex'>
      <button className='m-2 w-32  p-2 bg-orange-700 
      rounded-xl justify-center text-center
       text-xl text-white
        hover:bg-orange-500
         duration-200 ' onClick={handleSubmit}>Submit</button>



      </div>
     
      
      
      
    </div>
  );
};

export default Signup;