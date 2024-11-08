import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    try {
    
      console.log('Attempting to login with:', email, password);

    
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      
      const { token } = response.data;
      console.log('Token received:', token);


localStorage.setItem('token', token);


console.log('Stored token in localStorage:', localStorage.getItem('token'));

    
      navigate('/dashboard');
    } catch (error) {
    
      console.error('Login error:', error);

    
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="create-account">
        <p>Don't have an account?</p>
        <Link to="/create-account">Create Account</Link>
      </div>
    </div>
  );
}

export default Login;
