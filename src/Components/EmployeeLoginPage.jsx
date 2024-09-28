import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployyLoginPage.css';

const EmployeeLoginPage = () => {
  const [empCode, setEmpCode] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      alert('A user is already logged in. Please log out first.');
      navigate('/employee-dashboard');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emp_code: empCode, dob }),
      });

      if (response.ok) {
        const { token, employee } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('employee', JSON.stringify(employee));
        navigate('/employee-dashboard');
      } else if (response.status === 401) {
        alert('Invalid credentials');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Employee Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Employee Code:</label>
          <input
            type="text"
            className="login-input"
            value={empCode}
            onChange={(e) => setEmpCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth (YYYY-MM-DD):</label>
          <input
            type="text"
            className="login-input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Log in</button>
      </form>

      <p>Don't have an account?</p>
      
      <button className="create-account-button" onClick={() => navigate('/user-creation-EMP')}>Create Account</button>
      <button className="login-button" onClick={() => navigate('/')}>Back</button>
     
    </div>
  );
};

export default EmployeeLoginPage;
  