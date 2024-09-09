import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_HOST = process.env.REACT_APP_API_HOST;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_HOST}/api/login`, {
        user_name: username,
        password: password,
      });      
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
