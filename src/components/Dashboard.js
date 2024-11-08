import React from 'react';
import './Dashboard.css';
function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard. Here, you can view recent activities.</p>
      <ul>
        <li>Activity 1: Logged in</li>
        <li>Activity 2: Updated profile</li>
        <li>Activity 3: Changed password</li>
      </ul>
    </div>
  );
}

export default Dashboard;
