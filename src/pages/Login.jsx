import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/state';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting:', { email, password });

      const response =  await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });


      if (!response.ok) {
        let errorData = 'Login failed';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const jsonError = await response.json();
          errorData = jsonError.message || 'Login failed';
        } else {
          const textError = await response.text();
          errorData = textError;
        }
        throw new Error(errorData);
      }

      const loggedIn = await response.json();
      console.log('Logged in:', loggedIn);

      if (loggedIn) {
        dispatch(setLogin({
           user: loggedIn.user,
            token: loggedIn.token
           }));
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err.message);
      alert(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flexCenter'>
      <div>
        <form onSubmit={handleSubmit} className='bg-white flex flex-col gap-3 w-[400px] rounded-xl my-6 shadow-md text-[15px] px-5 py-5'>
          <h3 className='h3 text-center'>Login</h3>
          <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' className='p-2.5 pl-3 rounded-md border-none bg-primary outline-none' />
          <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className='p-2.5 pl-3 rounded-md border-none bg-primary outline-none' />
          <button type='submit' className='btn-secondary rounded-md my-2.5'>Login</button>
          <div>
            Don't have an account?
            <Link to={'/register'} className='text-secondary cursor-pointer underline'> register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
