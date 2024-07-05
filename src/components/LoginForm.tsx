// src/components/Login.tsx

import React, { useContext, useState } from 'react';
import Input from './global/Input';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/loginService';
import { setAuthToken } from '../api/api';
import { UserContext } from '../context/UserContext';

const Login: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

    const [state, dispatch] = userContext;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const response = await loginUser(email, password);
        setError('');
        // setAuthToken(response.data.token);
        dispatch({
          type: 'USER_SUCCESS',
          payload: response.data,
        });
        // localStorage.setItem('token', response.data.token);
        console.log(response, "response")

        if (response.data.isAdmin){
          navigate('/admin-page')
        }else {
          navigate('/user-page')
        }
      } catch (err) {
        setError('Invalid credentials');
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Do you not have Account?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
