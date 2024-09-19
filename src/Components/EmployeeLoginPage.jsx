import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeLoginPage = () => {
  const [empCode, setEmpCode] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/employees/employee-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emp_code: empCode, dob }),
      });

      if (response.ok) {
        const employee = await response.json(); // Retrieve the full employee object
        console.log('Login successful:', employee);
        navigate('/employee-dashboard', { state: { employee:employee } });  // Pass entire employee object to the dashboard
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Employee Code:</label>
          <input
            type="text"
            value={empCode}
            onChange={(e) => setEmpCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth (YYYY-MM-DD):</label>
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate('/user-creation-EMP')}>Create Employee</button>
    </div>
  );
};

export default EmployeeLoginPage;
