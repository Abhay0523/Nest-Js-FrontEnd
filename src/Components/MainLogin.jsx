import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainLogin.css'; // Import the CSS file for styling

const MainLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="main-login-container">
      <h1 className="main-login-title">Select Login Role</h1>
      <div className="main-login-buttons">
        <button className="role-button" onClick={() => navigate('/admin-login')}>
          Log in as Admin
        </button>
        <button className="role-button" onClick={() => navigate('/employee-login')}>
          Log in as Employee
        </button>
      </div>
    </div>
  );
};

export default MainLogin;
