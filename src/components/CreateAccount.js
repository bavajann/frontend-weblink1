// src/components/CreateAccount.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    
    if (email && password) {
      try {
      
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          email,
          password,
        });

    
        if (response.data.token) {
          alert('Account created successfully!');
          navigate('/login');
        }
      } catch (error) {

        if (error.response) {
          alert(error.response.data.message || 'Error occurred while creating account');
        } else {
          alert('Something went wrong, please try again');
        }
      }
    } else {
      alert('Please enter valid details');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
}

export default CreateAccount;
