import React, { useState, useEffect } from 'react';
import './AttendanceCheck.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function AttendanceCheck() {
  const [punches, setPunches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPunches = async () => {
      const response = await fetch('http://localhost:3000/punch');
      const data = await response.json();
      setPunches(data);
    };
    fetchPunches();
  }, []);

  const formatTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const extractDate = (dateStr) => {
    return dateStr ? dateStr.substring(0, 10) : 'N/A';
  };

  return (
  <>
    <div className="attendance-container">
      <h1 className="attendance-title">Attendance Check</h1>

     
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          {punches.map((punch) => (
            <tr key={punch.id}>
              <td>{punch.emp.emp_code}</td>
              <td>{extractDate(punch.punch_in_time)}</td>
              <td>{formatTime(punch.punch_in_time)}</td>
              <td>{formatTime(punch.punch_out_time)}</td>
            </tr>
          ))}

          
        </tbody>
      </table>

          
    </div>
    <button className="back-button" onClick={() => navigate('/admin-dashboard')}>
        Back 
      </button>
    </>
      
);
}

export default AttendanceCheck;
