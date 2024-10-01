import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isPunch, setIsPunch] = useState(false);
  

  useEffect(() => {
    const storedEmployee = JSON.parse(localStorage.getItem('employee'));
    const token = localStorage.getItem('token');
    
    if (!storedEmployee || !token) {
      alert("No Token is created for the user");
      navigate('/');
    } else {
      setEmployee(storedEmployee);
      
      
      const punchStatus = localStorage.getItem('isPunch') === 'true'; 
      setIsPunch(punchStatus);
    }
  }, []);

  const handlePunch = async (type) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/punch/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
      
        if (type === 'in') {
          setIsPunch(true);
          localStorage.setItem('isPunch', 'true'); 
        } else if (type === 'out') {
          setIsPunch(false);
          localStorage.setItem('isPunch', 'false'); 
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    localStorage.removeItem('isPunch'); 
    navigate('/');
  };

  if (!employee) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, {employee.name}</h2>
      
      <button className="dashboard-button" onClick={() => handlePunch('in')} disabled={isPunch}>
        Punch In
      </button>
      <button className="dashboard-button" onClick={() => handlePunch('out')} disabled={!isPunch}>
        Punch Out
      </button>
      <button className='dashboard-button' onClick={()=>{navigate('/navigate-attendance')}}>
        View Attendance
      </button>
    

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default EmployeeDashboard;
