
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
  
    if (email) {
      alert('Password reset link sent to your email!');
    } else {
      alert('Please enter your email');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordReset}>Send Reset Link</button>
    </div>
  );
}

export default ForgotPassword;
