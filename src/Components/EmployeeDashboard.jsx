import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const location = useLocation();
  const employee = location.state?.employee;  
  const navigate = useNavigate();
  console.log('Employee Data:', employee);
  console.log(employee.employee.emp_code);  

  const [punchStatus, setPunchStatus] = useState(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false); 

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  if (!employee) {
    return <p>No employee data found. Please log in again.</p>;
  }

  const emp_code = employee.employee.emp_code; 

  const handlePunch = async (type) => {
    try {
      const response = await fetch(`http://localhost:3000/punch/${type}/${emp_code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPunchStatus(`Punch ${type} successful`);

       
        if (type === 'in') {
          setIsPunchedIn(true); 
        } else {
          setIsPunchedIn(false); 
        }
      } else {
        alert('Punch failed');
      }
    } catch (error) {
      console.error('Error during punch:', error);
      alert('Punch failed');
    }
  };

  return (
    <div>
      <h2>Welcome, {employee.employee.name}</h2> 
      <p>Employee Code: {emp_code}</p>
      <p>Today Date: {formattedDate}</p>
      
      <button onClick={() => handlePunch('in')} disabled={isPunchedIn}>Punch In</button>
      <button onClick={() => handlePunch('out')} disabled={!isPunchedIn}>Punch Out</button>

      {punchStatus && <p>{punchStatus}</p>}

  
      <button onClick={() => navigate("/employee-login")}>Log Out</button>
    </div>
  );
};

export default EmployeeDashboard;
