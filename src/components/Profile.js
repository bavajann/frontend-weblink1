// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; 

function Profile() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userEmails, setUserEmails] = useState([]); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
      
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const response = await axios.get('http://localhost:5000/api/auth/profile', config);
        setEmail(response.data.email);

        
        const emailsResponse = await axios.get('http://localhost:5000/api/auth/users');
        setUserEmails(emailsResponse.data); 
      } catch (err) {
        setError('Error fetching profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
    
      const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
};


      await axios.post(
        'http://localhost:5000/api/auth/update-password',
        { oldPassword, newPassword },
        config
      );

      setSuccessMessage('Password updated successfully');
    } catch (err) {
      setError('Error updating password. Please check your old password.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='profile-container'>
      <h2>Profile Page</h2>
      <p>View and edit your profile information.</p>
      <ul>
        <li>Email: {email}</li>
      </ul>

      <h3>User Emails</h3>
      <ul>
        {userEmails.map((userEmail, index) => (
          <li key={index}>{userEmail.email}</li>
        ))}
      </ul>

      <form onSubmit={handlePasswordChange}>
        <h3>Change Password</h3>
        <div>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default Profile;
